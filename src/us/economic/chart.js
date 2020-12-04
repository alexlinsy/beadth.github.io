import React from 'react';
import {
  Annotation,
  Chart,
  Line,
  Axis,
  Tooltip,
  LineAdvance,
  Legend,
  Interaction,
} from 'bizcharts';
import {CHART_COPYRIGHT, FED_SOMA_KEY_MAP} from "../../constants";

// agencies: "10000000"
// asOfDate: "2003-11-19"
// bills: "242958086000"
// cmbs: "0.00"
// frn: ""
// mbs: "0.00"
// notesbonds: "404669247000"
// tips: "13454483000"
// tipsInflationCompensation: "1621412000"
// total: "661091816000.00"

export const MarketSomaHoldChart = (props) => {

  props.somaHolDataList.transform({
    type: 'fold',
    fields: ['agencies', 'bills', 'cmbs', 'frn', 'mbs', 'notesbonds', 'tips', 'tipsInflationCompensation', 'total'], // 展开字段集
    key: 'type', // key字段
    value: 'value', // value字段
  })
  props.somaHolDataList.transform({
    type: "pick",
    fields: ["asOfDate", "type", "value"],
  })
  props.somaHolDataList.transform({
    type: "map",
    callback(row) {
      row.type = FED_SOMA_KEY_MAP[row.type] || row.type
      row.value = isNaN(row.value)
        ? 0
        : (parseFloat(row.value) / 10 ** 9).toFixed(4);
      return row;
    },
  })
  const scale = {
    value: {
      type: "linear",
      min:0,
    },
    asOfDate:{
      type: 'timeCat',
      alias:'日期'
    }
  }

  return (
    <React.Fragment>
      <Chart padding="auto" scale={scale} height={500} data={props.somaHolDataList.rows} autoFit>
        <Tooltip shared showCrosshairs/>
        <Line shape="line" position="asOfDate*value" color="type" />
      </Chart>
    </React.Fragment>

  );
}


export const WeiChart = (props) => {
  const minVal = props.weiDatalist.min("value")
  const maxVal = props.weiDatalist.max("value")
  const last_two = props.weiDatalist.rows[props.weiDatalist.rows.length-2]
  const current = props.weiDatalist.rows[props.weiDatalist.rows.length-1]
  var flagStr = "▲"
  var flagClo = "#0B6121"
  if (current.value < last_two.value){
    flagStr = "▼"
    flagClo = "#FF0000"
  }

  for (var i=0; i<props.weiDatalist.rows.length;i++){
    if (props.weiDatalist.rows[i].value === minVal){
      var minTime = props.weiDatalist.rows[i].time
    }
    if (props.weiDatalist.rows[i].value === maxVal){
      var maxTime = props.weiDatalist.rows[i].time
    }
  }

  const scale = {
    value:{
      min: -15,
      max: 8,
      alias: '经济指数'
    },
    time:{
      tickCount:15,
    }
  }

  return (
    <div>
      <Chart padding={[10, 20, 70, 40]} scale={scale} autoFit height={500} data={props.weiDatalist.rows}>
        <Line shape="line" position="time*value" color="type" />
        <Tooltip shared showCrosshairs />
        <Annotation.DataMarker
          position={[current.time, current.value]}
          text={{
            content: flagStr + current.value,
            style: {
              textAlign: 'right',
              fontSize: 13,
              fill: flagClo,
            },
          }}
          line={{
            length: 20,
          }}
          direction="upward"
        />
        <Annotation.DataMarker
          position={[minTime, minVal]}
          text={{
            content: 'Low: ' + minVal,
            style: {
              textAlign: 'right',
              fontSize: 13
            },
          }}
          line={{
            length: 10,
          }}
          direction="downward"
        />
        <Annotation.DataMarker
          position={[maxTime, maxVal]}
          text={{
            content: 'Hi: ' + maxVal,
            style: {
              textAlign: 'left',
              fontSize: 13
            },
          }}
          line={{
            length: 20,
          }}
          direction="upward"
        />
        <Annotation.Line
          start={['min', 2]}
          end={['max', 2]}
          style={{
            lineDash: [4, 2],
            stroke: '#FF4D4F'
          }}
          text={{
            position: 'start',
            content: '2.00 ▼',
            style: {
              fill: '#FF4D4F'
            },
            offsetX: -20,
            offsetY: -5,
          }}
        />
        <Annotation.Line
          start={['min', -3.76]}
          end={['max', -3.76]}
          style={{
            lineDash: [4, 2],
            stroke: '#0080FF'
          }}
          text={{
            position: 'start',
            content: '-3.76 ▼',
            style: {
              fill: '#0080FF'
            },
            offsetX: -20,
            offsetY: -5,
          }}
        />
        <Annotation.Text {...CHART_COPYRIGHT}/>
      </Chart>
    </div>)
}

export const OliCopperGoldRatio = (props) => {

  const scale = {
    copper_gold_ratio: {
      min: 0.00006,
      max: 0.00019,
      alias: "铜金比",
    },
    interest_rates: {
      min: 0,
      max: 3.5,
      alias: "利率",
    },
    oil_gold_ratio: {
      min: -0.03,
      max: 0.07,
      alias: "油金比",
    },
    t:{
      alias: "日期"
    }
  }


  return (
    <React.Fragment>
      <Chart padding="auto" scale={scale} height={400} data={props.OliCopperGoldRatioData.rows}  autoFit>
        <Tooltip shared showCrosshairs />
        <Axis name="copper_gold_ratio" label={null}/>
        <Axis name="interest_rates" label={null}/>
        <Axis name="oil_gold_ratio" label={null}/>
        <Line position="t*copper_gold_ratio" color={"#FF8C00"}/>
        <Line position="t*interest_rates" color={"#000000"}/>
        <Line position="t*oil_gold_ratio" color={"#7CFC00"}/>
      </Chart>
    </React.Fragment>
  );
}

export const TreasuryRealRates = (props) => {
  props.treasuryRealRatesData.transform({
    type: 'fold',
    fields: ['5 YR', '7 YR', '10 YR', '20 YR', '30 YR'], // 展开字段集
    key: 'year', // key字段
    value: 'value', // value字段
  })
  return (
    <React.Fragment>
      <Chart padding="auto" height={400} data={props.treasuryRealRatesData.rows}  autoFit>
        <Tooltip shared showCrosshairs />
        {/*<Line shape="smooth" position="Date*value" color="year" />*/}
        <LineAdvance
          shape="smooth"
          position="DATE*value"
          color="year"
        />
        <Legend
          name='year'
          filter={year => {
            return year === '5 YR' | year === '10 YR'
          }}
          itemName={{
            style: {
              fill: "#333"
            }
          }} />
        <Interaction type='legend-filter' />
      </Chart>
    </React.Fragment>
  );
}