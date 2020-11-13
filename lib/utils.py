import time
import json
import os
import copy
import datetime
import logging
from uuid import uuid4
from functools import wraps, partial
from pprint import pprint as pr
from decimal import Decimal
import base64

import tushare as ts
from retrying import retry
from dateutil.relativedelta import relativedelta

import config

def extract_context_info(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        logging.info("func name: {}".format(func.__name__))
        return func(*args, **kwargs)

    return wrapper

class ToJsonEncoder(json.JSONEncoder):

    def default(self, obj):
        "datetime.datetime.fromisoformat(t)"
        if isinstance(obj, (datetime.date, datetime.datetime)):
            return obj.isoformat()

@extract_context_info
def check_tradecal():
    if config.DEBUG:
        return  True
    t = today().strftime("%Y%m%d")
    if t in get_ts_us_tradecal():
        return True
    return False


def set_us_tradecal(days): pass


@retry(stop_max_attempt_number=3, wait_fixed=90 * 1000)
@extract_context_info
def get_ts_us_tradecal():
    pro = ts.pro_api(config.TOKEN)
    start_date, end_date = gen_range_mouth()
    start_date, end_date = start_date.strftime("%Y%m%d"), end_date.strftime("%Y%m%d")
    logging.info("query ...")
    df = pro.us_tradecal(start_date=start_date, end_date=end_date)
    logging.info("res: {}".format(df))
    d = df.to_dict('records')
    tradecal_days = [i['cal_date'] for i in d if i['is_open'] == 1]
    set_us_tradecal(tradecal_days)
    logging.info('tradecal_days: {}'.format(tradecal_days))
    return tradecal_days


def get_cache_tradecal():
    pass


def is_dst():
    return bool(time.localtime().tm_isdst)


def gen_range_mouth():
    now = datetime.date.today()
    year = now.year
    month = now.month
    month_day = datetime.date(year, month, 1)
    days = []
    for i in range(31):
        if i == 0:
            days.append(month_day)
        else:
            month_day = month_day + relativedelta(days=1)
            if month_day.month > month:
                break
            else:
                days.append(month_day)
    return days[0], days[-1]


def is_market_open(offset=1):
    """夏令时是 21：30－4：00，非夏令时是22：30－5：00
    当地时间： 9：30  16：30
    :return 2, 开盘前等 1, 开盘run，0, 结束
    """
    # if is_summer():
    #     offset = 0
    # ---
    if config.DEBUG:
        return 1
    open_time = now().replace(hour=9, minute=30, second=0)
    close_time = now().replace(hour=16, minute=30, second=0)
    current = now()
    # if current < open_time:
    #     return 2
    # if current >= open_time and current <= close_time:
    #     return 1
    return current < open_time


def is_market_close():
    #  没用了
    if not today() > get_winter():
        return False
    tz = config.STOCK_MARKET["TZ"]
    tz_now = now().astimezone(tz)
    # ---
    open_time = now().replace(hour=16, minute=30, second=0)
    print(open_time)
    print(open_time, now())
    if now() > open_time:
        return True
    return False


def is_summer():
    "是否夏令时"
    t = today()
    if t > get_summer() and t < get_winter():
        return True
    return False


def now(tz=config.US_TIMEZONE):
    now = datetime.datetime.now(tz=config.CN_TIMEZONE)
    return now.astimezone(tz)

def read_json_file(path):
    with open(path, 'r') as f:
        all_list = json.load(f)
        f.close()
    all_dict = dict()
    for i in all_list:
        all_dict[i["time"]] = i['data']
    return all_dict

def save_to_json(path, content):
    f = open(path, 'w')
    data = sort_data(content)
    json.dump(data, f)
    f.flush()
    f.close()

def sort_data(data):
    res = list()
    for k,v in data.items():
        res.append(
            {
                'time':k,
                'data': v,
            }
        )
    last_data = sorted(res, key=lambda i: datetime.datetime.strptime(i['time'], "%Y-%m-%d"), reverse=False)
    return last_data

def split_save_json(data, f=None, ft=None, sp=[30,100,360]):
    li = sort_data(data)
    tmp = dict(
        code=1000,
        encryption="AES",
        data = None,
    )
    for i in sp:
        last_sp = copy.deepcopy(li[-i:])
        for j in last_sp:
            j['TOTAL'] = total_dict(j['data'], 'close')
            j['LOW_TOTAL'] = total_dict(j['data'], 'low')
            j['OPEN_TOTAL'] = total_dict(j['data'], 'open')
            j['HIGH_TOTAL'] = total_dict(j['data'], 'high')
        path = os.path.join(f, ft.format(str(i)))
        fb = open(path, 'w')
        tt = json.dumps(last_sp)
        tmp['data'] = str(base64.b64encode(tt.encode("utf-8")), encoding='utf-8')
        json.dump(tmp, fb)
        fb.flush()
        fb.close()

def total_dict(data, data_key):
    num = Decimal(0.00)
    for k,v in data.items():
        if k == "SPX":continue
        num += Decimal(v[data_key])
    return float(num.quantize(Decimal('0.00')))

def today():
    n = now()
    today = datetime.date(year=n.year, month=n.month, day=n.day)
    return today


def get_summer():
    st = datetime.date(2020, 3, 1)
    _ = []
    for i in range(15):
        if st.weekday() == 6 and len(_) < 2:
            _.append(st)
            st += relativedelta(days=1)
    return _[-1]


def get_winter():
    st = datetime.date(2020, 11, 1)
    _ = []
    for i in range(8):
        if st.weekday() == 6:
            _.append(st)
            break
        st += relativedelta(days=1)
    return _[-1]


def init_sentry():
    import sentry_sdk
    sentry_sdk.init(
        config.SENTRY_SDN,
        traces_sample_rate=1.0,
    )

# def is_summer():
#     today = datetime.datetime.today()
#     if today.month == 3 and today.weekday() == 2:
#         return True
#     return False
#
# def is_winter():
#     today = datetime.datetime.today()
#     if today.month == 11 and today.weekday() == 1:
#         return True
#     return False


if __name__ == '__main__':
    # print(is_market_open())
    # print(datetime.datetime.today().tzinfo)
    # print(is_dst())
    # datetime.datetime.today().weekday()
    # gen_range_mouth()
    # print(is_summer())
    from pytz import timezone
    # n = datetime.datetime.now(tz=config.CN_TIMEZONE)
    # us = n.astimezone(config.US_TIMEZONE)
    # print(n, "/n", us)
    # utc = datetime.datetime.utcnow()
    # print(utc)
    # utc_us = utc.astimezone(config.US_TIMEZONE)
    # print(utc_us)
    # print(datetime.datetime.now(config.CN_TIMEZONE))
    print(is_market_open())
    print(today())
    # from pytz import timezone
    # n = datetime.datetime.now
    # a = datetime.datetime.now(tz=timezone("Asia/Shanghai"))
    # print(a, "===", a.timetz())
    # a = a.astimezone(config.STOCK_MARKET["TZ"])
    # print(a, "===", a.timetz())
    # # print(n(config.STOCK_MARKET["TZ"]))
    # # print(n(tz=timezone("Asia/Shanghai")))
    # # ------------------
    # a = datetime.datetime.now(tz=timezone("Asia/Shanghai"))
    # a = a.replace(month=12)
    # print(a, "===", a.timetz())
    # a = a.astimezone(config.STOCK_MARKET["TZ"])
    # print(a, "===", a.timetz())

    # print(datetime.date.today().month)

