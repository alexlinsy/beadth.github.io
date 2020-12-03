import * as constants from './constants';
import { fromJS} from 'immutable';

const defaultState = fromJS({
  somaHolDataStatus: true,
  somaHolDataList: [{},],
  weiStatus: true,
  weiDatalist: [],
  OliCopperGoldRatioStatus: true,
  OliCopperGoldRatioData: [],
  treasuryRealRatesStatus: true,
  treasuryRealRatesData: [],
});

const updateSomeHold = (state, action) => {
  return state.merge({
    somaHolDataStatus: action.somaHolDataStatus,
    somaHolDataList: action.somaHolDataList,
  })
}


const updateWei = (state, action) => {
  return state.merge({
    weiStatus: action.weiStatus,
    weiDatalist: action.weiDatalist,
  })
}

const updateOliCopperGoldRatio = (state, action) => {
  return state.merge({
    OliCopperGoldRatioStatus: action.OliCopperGoldRatioStatus,
    OliCopperGoldRatioData: action.OliCopperGoldRatioData,
  })
}

const updateTreasuryRealRates = (state, action) => {
  return state.merge({
    treasuryRealRatesStatus: action.treasuryRealRatesStatus,
    treasuryRealRatesData: action.treasuryRealRatesData,
  })
}


// state    整个DOM的数据库
// action
// reducer 可以接收state，但是不可以在修改stacurrentCityte
const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case constants.GET_NEWYORKFED_SOMA_HOLD:
      return updateSomeHold(state, action)
    case constants.GET_NEWYORKFED_WEI:
      return updateWei(state, action)
    case constants.GET_OLI_COPPER_GOLD_RATIO:
      return updateOliCopperGoldRatio(state, action)
    case constants.GET_TREASURY_REAL_RATES:
      return updateTreasuryRealRates(state, action)
    default:
      return state;
  }
}


export default reducer;