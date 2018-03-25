import React from 'react';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { curveMonotoneX } from '@vx/curve';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { GlyphDot } from '@vx/glyph';
import { extent, max, min } from 'd3-array';
import moment from 'moment';

const DaysGraph = (props) => {

  if (props.gotData) {
    function numTicksForHeight(height) {
      if (height <= 300) return 3;
      if (300 < height && height <= 600) return 5;
      return 10;
    }
    
    function numTicksForWidth(width) {
      if (width <= 300) return 2;
      if (300 < width && width <= 400) return 5;
      return 10;
    }

    const data = [];
    props.city.list.forEach((item) => {
      if (item.dt_txt.substring(11, 13) === "12") {
        data.push(item)
      }
    });

    const width = 1000;
    const height = 500;
    const margin = {
      top: 60,
      bottom: 60,
      left: 80,
      right: 80
    };

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = d => moment(d.dt_txt)._d;
    const y = d => d.main.temp_max;

    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(data, x)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [min(data, y) - 5, max(data, y) + 5]
    });

    return (
      <svg width={width} height={height}>
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={xScale}
          yScale={yScale}
          stroke="#ccc"
          fill="#eee"
          width={xMax}
          height={yMax}
          numTicksRows={numTicksForHeight(height)}
          numTicksColumns={numTicksForWidth(width)}
        />
        <Group top={margin.top} left={margin.left}>
          <AxisBottom
            scale={xScale}
            top={yMax}
            label={'Hours'}
            stroke={'black'}
            tickTextFill={'#ccc'}
          />
          <AxisLeft
            scale={yScale}
            top={0}
            left={0}
            label={'Temperature (°C)'}
            stroke={'black'}
            tickTextFill={'#ccc'} />
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            stroke='#0099ff'
            strokeWidth={2}
            curve={curveMonotoneX}
            glyph={(d,i) => {
              return (
                <g key={`line-point-${i}`}>
                  <GlyphDot
                    cx={xScale(x(d))}
                    cy={yScale(y(d))}
                    r={8}
                    fill='rgb(221,241,249)
                    '
                  >
                    <text
                      x={xScale(x(d))}
                      y={yScale(y(d))}
                      dx={-5}
                      dy={-15}
                      fill={"#0099ff"}
                      fontSize={14}
                    >
                      {d.main.temp_max}
                    </text>
                  </GlyphDot>
                  <GlyphDot
                    cx={xScale(x(d))}
                    cy={yScale(y(d))}
                    r={4}
                    fill='#0099ff'
                  />
                </g>
              );
            }}
          />
        </Group>
      </svg>
    );
  }
  return null;
}

export default DaysGraph;