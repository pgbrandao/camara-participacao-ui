import { XYChart, AreaSeries, lightTheme, Axis, Grid, Tooltip } from "@visx/xychart";
import { timeParse, timeFormat, timeFormatDefaultLocale } from 'd3-time-format';
import { schemeTableau10 } from 'd3-scale-chromatic';

import { formatPercentagePrecise, formatPercentage, formattedNumber} from '../formattedNumber'
import useSWR from "swr"
import { Center, HStack, Text } from "@chakra-ui/layout";
import * as locale from '../d3/pt-BR-locale.json';

export const TimelineChart = ({ data, dateAccessor, metrics }) => {
  const animationTrajectory = "outside";
  const legendGlyphSize = 15;

  const parseDate = timeParse('%Y-%m-%dT%H:%M:%S');
  const format = timeFormat('%d/%b/%Y');  
  const formatDate = (date: string) => format(parseDate(date) as Date);

  // const sourceColorSet = schemeTableau10
  // const numberOfKeys = Object.keys(themesCount).length
  // const slicedColors = sourceColorSet.slice(0, sourceColorSet.length-1)
  // const extraColors = Array(numberOfKeys - slicedColors.length).fill(sourceColorSet[sourceColorSet.length-1])

  // lightTheme.colors = slicedColors.concat(extraColors)
  const firstDate = data[0].date;
  const lastDate = data[data.length-1].date;

  const theme =  {...lightTheme}
  theme.colors= schemeTableau10

  return (
    <XYChart
      theme={theme}
      xScale={{ type: "band", paddingInner: 0.3 }}
      yScale={{ type: "linear" }}
      height={220}
      captureEvents={true}
      // onPointerUp={(d) => {
      //   setAnnotationDataKey(d.key as City);
      //   setAnnotationDataIndex(d.index);
      // }}
    >
      <>
        {metrics.map((metric) => {
          return (<AreaSeries
            dataKey={metric.label}
            data={data}
            xAccessor={(t) => dateAccessor(t)}
            yAccessor={(t) => metric.accessor(t)}
            fillOpacity={0.4}
          />)
        })}
      </>
      <Axis
        key={`time-axis-${animationTrajectory}`}
        orientation="bottom"
        numTicks={1000}
        rangePadding={5}
        // tickFormat={stackOffset === "wiggle" ? () => "" : undefined}
        // tickFormat={formatDate}
        tickFormat={(date: string) => {
          if (date == firstDate || date == lastDate) {
            const d = parseDate(date) as Date;
            return format(d);
          } else {
            return "";
          }
        }}

      />
      <Axis
        key={`temp-axis-${animationTrajectory}`}
        orientation={"left"}
        numTicks={3}
        tickFormat={formattedNumber}
      />
      <Tooltip
        // <Tooltip<CityTemperature>
        showHorizontalCrosshair={false}
        showVerticalCrosshair={false}
        snapTooltipToDatumX={true}
        snapTooltipToDatumY={false}
        showDatumGlyph={true
          // (snapTooltipToDatumX || snapTooltipToDatumY) && !renderBarGroup
        }
        showSeriesGlyphs={true}
        renderTooltip={({ tooltipData, colorScale }) => {
          const nearestDatum = tooltipData?.nearestDatum;

          if (nearestDatum.datum) {
            return (
              <>
                {formatDate(dateAccessor(nearestDatum.datum))}
                <br />
                <br />
                <HStack>
                  <Text>
                    {metrics.map((metric) => {
                      return (
                      <>
                        <HStack>
                          <svg width={legendGlyphSize} height={legendGlyphSize} style={{ margin: '2px 0' }}>
                            <circle
                              fill={colorScale(metric.label)}
                              r={legendGlyphSize / 2}
                              cx={legendGlyphSize / 2}
                              cy={legendGlyphSize / 2}
                              />
                          </svg>
                          <b>{metric.label}{`:`} </b>
                          <i>{formattedNumber(metric.accessor(nearestDatum.datum))}</i>
                          <br />
                        </HStack>
                      </>)
                    })}
                  </Text>
                </HStack>
              </>
            )
          }
        }}
      />
    </XYChart>
  );
};

