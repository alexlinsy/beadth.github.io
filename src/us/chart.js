import React from "react";
import {
  Chart,
  Tooltip,
  Legend,
  Axis,
  Interaction,
  Polygon,
  Line,
  Point,
  Annotation,
  Slider,
} from 'bizcharts';
import {BREADTH_CODE_CN, DOMAIN_NAME} from "../constants";


const BreadthLeftChart = (props) => {

  const scale = {
    name: {
      type: 'cat',
      // values: ['SPX','COM','CND','CNS','ENE','FIN','HLT','IND','MAT','REI','TEC','UTL','TOTAL'],
      values: ['SPX', 'COM', 'CND', 'CNS', 'ENE', 'FIN', 'HLT', 'IND', 'MAT', 'REI', 'TEC', 'UTL'],
    },
    day: {
      type: 'cat',
      values: props.days || [],
    },
    sales: {
      nice: true,
    }
  };
  const codeLabel = {
    formatter(text, item, index) {
      return `${text}\n${BREADTH_CODE_CN[text]}`;
  }}

  return <Chart
    scale={scale}
    height={3000}
    animate={true}
    data={props.data}
    autoFit
    forceFit={true}
  >

    <Axis
      label={codeLabel}
      name={'name'}
      position='top'

      tickLine={null}
      grid={{
        alignTick: false,
        line: {
          style: {
            lineWidth: 1,
            lineDash: null,
            stroke: '#f0f0f0',
          },
        },
      }}
    />
    <Axis
      name={'day'}
      title={null}
      grid={{
        alignTick: false,
        line: {
          style: {
            lineWidth: 1,
            lineDash: null,
            stroke: '#f0f0f0',
          },
        },
      }}
    />
    <Legend position='left-top' offsetY={100} visible={false}/>

    <Tooltip shared showMarkers={false}/>
    <Polygon
      position={'name*day'}
      // color={['sales', '#BAE7FF-#1890FF-#0050B3']}
      color={['breadth', '#FB5050-#FFFFFF-#009966']}
      label={['breadth', {
        offset: -2,
        style: {
          fill: '#2E2E2E',
          shadowBlur: 50,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      }]}
      // style={{
      //   lineWidth: 0,
      //   stroke: '#fff',
      // }}
    >

    </Polygon>
    <Interaction type={'element-active'}/>
  </Chart>
}

const BreadthRightChart = (props) => {
  const scale = {
    name: {
      type: 'cat',
      values: ['TOTAL'],
    },
    day: {
      type: 'cat',
      values: props.days || [],
    },
    sales: {
      nice: true,
    }
  };
  const codeLabel = {
    formatter(text, item, index) {
      return `${text}\n${BREADTH_CODE_CN[text]}`;
    },
  }

  return <Chart
    scale={scale}
    height={3000}
    data={props.data}
    autoFit
    forceFit={true}
  >

    <Axis
      name={'name'}
      position='top'
      label={codeLabel}

      tickLine={null}
      grid={{
        alignTick: false,
        line: {
          style: {
            lineWidth: 1,
            lineDash: null,
            stroke: '#f0f0f0',
          },
        },
      }}
    />
    <Axis
      name={'day'}
      title={null}
      visible={false}
      grid={{
        alignTick: false,
        line: {
          style: {
            lineWidth: 1,
            lineDash: null,
            stroke: '#f0f0f0',
          },
        },
      }}
    />
    <Tooltip shared showMarkers={false}/>
    <Legend position='right-top' offsetY={100} visible={false}/>
    <Polygon
      position={'name*day'}
      color={['breadth', '#FB5050-#FFFFFF-#009966']}
      label={['breadth', {
        offset: -2,
        style: {
          fill: '#2E2E2E',
          shadowBlur: 50,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      }]}
      // style={{
      //   lineWidth: 0,
      //   stroke: '#fff',
      // }}
    >

    </Polygon>
    <Interaction type={'element-active'}/>
  </Chart>
}

const BreadthLineChart = (props) => {
  const styles = {
    mainTitle: {
      fontSize: 16,
      color: "black",
      textAlign: "center"
    },
    subTitle: {
      fontSize: 14,
      color: "gray",
      textAlign: "center"
    }
  }

  //可配置样式
  const grid = {
    align: 'center', // 网格顶点从两个刻度中间开始
    line: null,
  }

  const sliCfg = {
    smooth: false
  }

  const copyright = {
    position: ['median', 'max'],
    top: false,
    content: DOMAIN_NAME,
    offsetX: -50,
    style: {
      fill: "#C0C0C0",
      fontSize: 16,
    },
  }

  return (
    <div>
      <h4 className='main-title' style={styles.mainTitle}>
        S&P 500 宽度走势
      </h4>
      <h5 className='sub-title' style={styles.subTitle}>
        {props.date}
      </h5>
      <Chart scale={{breadth: {min: 0, max: 1000}}} padding={[10, 20, 38, 40]} autoFit height={220} data={props.data}>
        <Annotation.Text {...copyright}/>
        <Axis name="breadth" grid={grid}/>
        <Axis name="day" label={null}/>
        <Line shape="line" position="day*breadth" color=""/>
        <Legend visible={false}/>
        <Slider start={0.3} end={1} trendCfg={sliCfg}/>
        <Annotation.Line
          start={['min', '200']}
          end={['max', '200']}
          text={{
            position: 'end',
            content: '狩猎区',
            style: {
              fill: '#FF4D4F'
            },
            offsetX: -20,
            offsetY: 20,
          }}
        />

        <Annotation.Line
          start={['min', '949']}
          end={['max', '949']}
          text={{
            position: 'end',
            content: '走货区',
            style: {
              fill: '#FF4D4F'
            },
            offsetX: -20,
            offsetY: -5,
          }}
        />

        <Point
          position="day*breadth"
          shape={['breadth', (breadth) => {
            if (breadth < 201) {
              return 'triangle';
            }
            if (breadth > 949) {
              return 'triangle-down';
            }
            return '0'
          }]}
          color={['breadth', (breadth) => {
            if (breadth < 201 || breadth > 949) {
              return '#FB5050';
            }
            return '';
          }]}/>

      </Chart>
    </div>)
}

export {BreadthLeftChart, BreadthRightChart, BreadthLineChart};
