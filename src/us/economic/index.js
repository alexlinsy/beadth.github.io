import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col, Row,Collapse} from "antd";

import {
  getMarketSomaHold,
  geNewyorktWei,
  getOliCopperGoldRatio,
  getTreasuryRealRates,
  getJoblessClaims,
  getCPIFederalFoundsRate,
} from "./store/actionCreators";

import {Loading} from "../USUI";
import {
  MarketSomaHoldChart,
  WeiChart,
  OliCopperGoldRatio,
  TreasuryRealRates,
  JoblessClaims,
  CPIFederalFundsRate,
} from "./chart";

const { Panel } = Collapse;


class Economic extends Component{

  render() {
    return (
      <React.Fragment>
        <Row justify="center" align="top">
          <Col xs={{span: 24}} sm={{span: 24}} md={{span: 20}} lg={{span: 20}} xl={{span: 20}} align="top">
            <Collapse defaultActiveKey={['eco3',]} >
              <Panel header="美国失业金数据" key="eco1">
                {
                  this.props.joblessClaimStatus
                    ? <Loading/>
                    : <JoblessClaims {...this.props}/>
                }
              </Panel>
              <Panel header="美联储披露持仓 (十亿)" key="eco2">
                {
                  this.props.somaHolDataStatus
                    ? <Loading/>
                    : <MarketSomaHoldChart {...this.props}/>
                }
              </Panel>
              <Panel header="每周经济指数（WEI）" key="eco3">
                {
                  this.props.weiStatus
                    ? <Loading/>
                    : <WeiChart {...this.props}/>
                }
              </Panel>
              <Panel header="油金比/铜金比/利率" key="eco4" >
                {
                  this.props.OliCopperGoldRatioStatus
                    ? <Loading/>
                    : <OliCopperGoldRatio {...this.props}/>
                }
              </Panel>
              <Panel header="美国国库实际利率" key="eco5">
                {
                  this.props.treasuryRealRatesStatus
                    ? <Loading/>
                    : <TreasuryRealRates {...this.props}/>
                }
              </Panel>
              <Panel header="CPI/Federal Founds Rate" disabled key="eco6">
                {
                  this.props.cpiFederalStatus
                    ? <Loading/>
                    : <CPIFederalFundsRate {...this.props}/>
                }
              </Panel>
            </Collapse>

          </Col>
        </Row>
      </React.Fragment>);
  }
  componentDidMount() {
    this.props.getSomaHold();
    this.props.getWei();
    this.props.getOliCopperGR();
    this.props.getTreasuryRealRates();
    this.props.getJoblessClaimsDis();
    this.props.getCPIFfrDis();
  }
}

const mapState = (state) => {
  return {
    somaHolDataList: state.getIn(['usEconomic', 'somaHolDataList']),
    somaHolDataStatus: state.getIn(['usEconomic', 'somaHolDataStatus']),
    weiStatus: state.getIn(['usEconomic', 'weiStatus']),
    weiDatalist: state.getIn(['usEconomic', 'weiDatalist']),
    OliCopperGoldRatioStatus: state.getIn(['usEconomic', 'OliCopperGoldRatioStatus']),
    OliCopperGoldRatioData: state.getIn(['usEconomic', 'OliCopperGoldRatioData']),
    treasuryRealRatesStatus: state.getIn(['usEconomic', 'treasuryRealRatesStatus']),
    treasuryRealRatesData: state.getIn(['usEconomic', 'treasuryRealRatesData']),
    joblessClaimStatus: state.getIn(['usEconomic', 'joblessClaimStatus']),
    joblessClaimsData: state.getIn(['usEconomic', 'joblessClaimsData']),
    cpiFederalStatus: state.getIn(['usEconomic', 'cpiFederalStatus']),
    cpiFederalData: state.getIn(['usEconomic', 'cpiFederalData']),
  }
};

// redux 数据修改逻辑映射 store.dispatch, props
const mapDispatch = (dispatch) => ({
  // load data
  getSomaHold(){
    dispatch(getMarketSomaHold())
  },
  getWei(){
    dispatch(geNewyorktWei())
  },
  getOliCopperGR(){
    dispatch(getOliCopperGoldRatio())
  },
  getTreasuryRealRates(){
    dispatch(getTreasuryRealRates())
  },
  getJoblessClaimsDis(){
    dispatch(getJoblessClaims())
  },
  getCPIFfrDis(){
    dispatch(getCPIFederalFoundsRate())
  }
})

export default connect(mapState, mapDispatch)(Economic)