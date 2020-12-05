export const ALI_PAY_QR = "/img/AliPayQR.png"
export const WECHAT_PAY_QR = "/img/WeChatPayQR.png"
export const PAYPAL_PAY_QR = "/img/PaypalQR.png"
export const BTC_QR = "/img/BTCQR.png"
export const BTC_WALLET = "38q6hQX3BhMpkDyQy2aVc1n3FnRS4RXqb5"
export const ROUTER_PATH = {
  INDEX: '/',
  ECONOMIC:'/economic',
  DASHBOARD:'/dashboard',
}
export const CHART_CODE_LIST = ['SPX','COM','CND','CNS','ENE','FIN','HLT','IND','MAT','REI','TEC','UTL']
export const BREADTH_CODE_CN = {
  SPX:'标普500',
  COM:'通讯',
  CND:'可选消费',
  ENE:'能源',
  CNS:'必须品',
  FIN:'金融',
  HLT:'生物医疗',
  IND:'工业',
  MAT:'材料',
  REI:'地产',
  TEC:'科技',
  UTL:'公共事业',
  TOTAL:'合计',
}
export const ALL_CHART_SP500_LIST =  ['SPX','COM','CND','CNS','ENE','FIN','HLT','IND','MAT','REI','TEC','UTL','TOTAL']
export const PAYPAL_URL = 'https://www.paypal.me/kenteb';
export const IS_LOADING_STRING = "Loading.."
export const SHOW_SPACE = " ".replace(/ /g, "\u00a0")
export const DOMAIN_NAME = "breadth.app"
export const DOMAIN_NAME_URL = "https://breadth.app"
export const SP500_SUB_CODE_CN = [
  {code: "COM 电信服务", en: "Telecom", desc: "电信服务和无线通讯"},
  {code: "CND 可选消费", en: "Consumer Discretionary", desc: "汽车、服装、休闲和媒体(可选消费)"},
  {code: "CNS 消费必需品", en: "Consumer Staples", desc: "日用产品、食品和药品零售(消费必需品)"},
  {code: "ENE 能源", en: "Energy", desc: "能源设施、冶炼、石油和天然气的开采"},
  {code: "FIN 金融", en: "Finance", desc: "银行、金融服务和所有保险"},
  {code: "HLT 医疗保健", en: "Medical & Health", desc: "经营型医疗保健服务、医疗产品、药品和生物技术"},
  {code: "IND 工业", en: "Industry", desc: "资本货物、交通、建筑、航空和国防"},
  {code: "MAT 基础材料", en: "Materials", desc: "化学品、金属采矿、纸产品和林产品"},
  {code: "REI 地产业", en: "Real Estate", desc: "房地产开发、管理及相关信托"},
  {code: "TEC 信息技术", en: "Information technology", desc: "硬件、软件和通讯设备"},
  {code: "UTL 公用事业", en: "Utilities", desc: "电力设备和天然气设备"},
  {code: "SPX 标普500", en: "S&P 500", desc: "标普500"},
]
export const LEI_SITE = "https://lonecapital.com/"
export const CHART_COPYRIGHT = {
  position: ['median', 'max'],
  top: false,
  content: DOMAIN_NAME,
  offsetX: -50,
  style: {
    fill: "#C0C0C0",
    fontSize: 16,
  },
}
export const FED_SOMA_KEY_MAP = {
  mbs: "Agency Mortgage-Backed Securities",
  cmbs: "Agency Commercial Mortgage-Backed Securities",
  tips: "US Treasury Inflation-Protected Securities (TIPS)",
  frn: "US Treasury Floating Rate Notes",
  notesbonds: "US Treasury Notes and Bonds (Notes/Bonds)",
  bills: "US Treasury Bills (T-Bills)",
  agencies: "Federal Agency Securities",
  tipsInflationCompensation: "Inflation Compensation",
  total: "Total SOMA Holdings",
};
export const US_ALL_ETF = [
  'VTI',
  'DIA',
  'OEF',
  'MDY',
  'SPY',
  'RSP',
  'QQQ',
  'QTEC',
  'IWB',
  'IWM',
  'MTUM',
  'VLUE',
  'QUAL',
  'USMV',
  'IWF',
  'IWD',
  'IVW',
  'IVE',
  'MOAT',
  'FFTY',
  'IBUY',
  'HACK',
  'SKYY',
  'IPAY',
  'FINX',
  'XT',
  'ARKK',
  'BOTZ',
  'MOO',
  'ARKG',
  'MJ',
  'ARKW',
  'ARKQ',
  'PBW',
  'BLOK',
  'SNSR',
  'XLC',
  'XLY',
  'XHB',
  'XRT',
  'XLP',
  'XLE',
  'XOP',
  'OIH',
  'TAN',
  'URA',
  'XLF',
  'KBE',
  'KIE',
  'IAI',
  'XLV',
  'IBB',
  'IHI',
  'IHF',
  'XPH',
  'XLI',
  'ITA',
  'IYT',
  'JETS',
  'XLB',
  'GDX',
  'XME',
  'LIT',
  'REMX',
  'IYM',
  'XLRE',
  'VNQ',
  'VNQI',
  'REM',
  'XLK',
  'VGT',
  'FDN',
  'SOCL',
  'IGV',
  'SOXX',
  'XLU',
]

export const US_ETF_BROAD_MARKET = US_ALL_ETF.slice(0,10)
export const US_ETF_FACTORS = US_ALL_ETF.slice(10,14)
export const US_ETF_GROWTH_OR_VALUE = US_ALL_ETF.slice(14,18)
export const US_ETF_THEMATIC = US_ALL_ETF.slice(18,36)

export const US_ETF_COM = US_ALL_ETF.slice(36,37)
export const US_ETF_CON_CNS = US_ALL_ETF.slice(37,41)
export const US_ETF_ENE = US_ALL_ETF.slice(41,46)
export const US_ETF_FIN = US_ALL_ETF.slice(46,50)
export const US_ETF_HLT = US_ALL_ETF.slice(50,55)
export const US_ETF_IND = US_ALL_ETF.slice(55,59)
export const US_ETF_MAT = US_ALL_ETF.slice(59,65)
export const US_ETF_REL = US_ALL_ETF.slice(65,69)
export const US_ETF_TEC = US_ALL_ETF.slice(69,75)
export const US_ETF_UTL = US_ALL_ETF.slice(75)

export const US_ETF_ALL_LIST = [
  US_ETF_BROAD_MARKET, US_ETF_FACTORS, US_ETF_GROWTH_OR_VALUE, US_ETF_THEMATIC,
  US_ETF_COM, US_ETF_CON_CNS, US_ETF_ENE, US_ETF_FIN, US_ETF_HLT,US_ETF_IND, US_ETF_MAT,
  US_ETF_REL, US_ETF_TEC, US_ETF_UTL
]
export const TREASURY_REAL_RATES_FIELD = ['5 YR', '7 YR', '10 YR', '20 YR', '30 YR']
export const SOMA_HOLD_FIELD = ['agencies', 'bills', 'cmbs', 'frn', 'mbs', 'notesbonds', 'tips', 'tipsInflationCompensation', 'total']