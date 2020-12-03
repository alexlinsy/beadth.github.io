import axios from "axios"
import Base64 from 'base-64';
import DataSet from '@antv/data-set';

import * as constants from './constants';


export const ALLETFormat = (srcData) => {
  var data = JSON.parse(Base64.decode(srcData.data))
  const ds = new DataSet();
  const dv = ds.createView("src").source(data);
  return {
    type: constants.GET_DASHBOARD_ETF_ALL,
    allETFStatus: false,
    allETFDataSet: ds,
    allETFDataView: dv,
  }
};

export const getAllETF = () => {
  return (dispatch) => {
    axios.get("us/etf/ALL.json").then((res) => {
      dispatch(ALLETFormat(res.data))
    }).catch(() => { // ajax request error
      console.log("error")
    })
  }
}