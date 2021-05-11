import { XYChart, BarSeries, BarStack, lightTheme, Axis, Grid, Tooltip } from "@visx/xychart";
import { timeParse, timeFormat, timeFormatDefaultLocale } from 'd3-time-format';
import { scaleOrdinal } from "@visx/scale";
import { schemeSet1 } from 'd3-scale-chromatic';

import useSWR from "swr"
import { Center, HStack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import * as locale from './d3/pt-BR-locale.json';

const ThemesChart = ({ data }) => {
  const animationTrajectory = "outside";
  const legendGlyphSize = 15;

  const groupedByTheme = data['dimension'].reduce((accumulator, currentValue) => {
    accumulator[currentValue['proposicao__tema__nome']] = accumulator[currentValue['proposicao__tema__nome']] || []
    accumulator[currentValue['proposicao__tema__nome']].push(currentValue)

    return accumulator
  }, {})

  const totalByDate = data['dimension'].reduce((accumulator, currentValue) => {
    accumulator[currentValue['date']] = accumulator[currentValue['date']] || 0
    accumulator[currentValue['date']] += currentValue['ficha_pageviews']

    return accumulator
  }, {})

  const themesCount = data['dimension'].reduce((accumulator, currentValue) => {
    const theme = currentValue['proposicao__tema__nome']

    accumulator[theme] = accumulator[theme] || 0
    accumulator[theme] += currentValue['ficha_pageviews']

    return accumulator
  }, {})

  const themesCountArray = Object.keys(themesCount).map((key) => { return {'proposicao__tema__nome': key, 'ficha_pageviews': themesCount[key]}})

  const sortedThemesCountArray = themesCountArray.sort((first, second) => {
    return second['ficha_pageviews'] - first['ficha_pageviews']
  })

  timeFormatDefaultLocale(locale);
  const parseDate = timeParse('%Y-%m-%dT%H:%M:%S');
  const format = timeFormat('%b %Y');  
  const formatDate = (date: string) => format(parseDate(date) as Date);
  const formatPercentage = (percentage: number) => String((percentage*100).toFixed(0)) + " %";
  const formatPercentagePrecise = (percentage: number) => String((percentage*100).toFixed(2)) + " %";

  const sourceColorSet = schemeSet1
  const numberOfKeys = Object.keys(themesCount).length
  const slicedColors = sourceColorSet.slice(0, sourceColorSet.length-1)
  const extraColors = Array(numberOfKeys - slicedColors.length).fill(sourceColorSet[sourceColorSet.length-1])
  console.log(slicedColors.concat(extraColors))
  lightTheme.colors = slicedColors.concat(extraColors)
  return (
    <XYChart
      theme={lightTheme}
      xScale={{ type: "band", paddingInner: 0.3 }}
      yScale={{ type: "linear" }}
      height={400}
      captureEvents={true}
      // onPointerUp={(d) => {
      //   setAnnotationDataKey(d.key as City);
      //   setAnnotationDataIndex(d.index);
      // }}
    >
      <Grid
        key={`grid-${animationTrajectory}`} // force animate on update
        rows={false}
        columns={true}
        numTicks={4}
      />
      <BarStack
        offset="expand"
      >
        {sortedThemesCountArray.map((t) => {
          const theme = t['proposicao__tema__nome'];

          return (
            <BarSeries
              
              dataKey={theme}
              data={groupedByTheme[theme]}
              xAccessor={(t) => t["date"]}
              yAccessor={(t) => t["ficha_pageviews"]}
          />
          );
        })}
      </BarStack>
      <Axis
        key={`time-axis-${animationTrajectory}`}
        orientation="bottom"
        // numTicks={4}
        rangePadding={5}
        // tickFormat={stackOffset === "wiggle" ? () => "" : undefined}
        tickFormat={formatDate}
      />
      <Axis
        key={`temp-axis-${animationTrajectory}`}
        label={"Percentual"}
        orientation={"left"}
        numTicks={3}
        tickFormat={formatPercentage}
      />
      <Tooltip
        // <Tooltip<CityTemperature>
        showHorizontalCrosshair={false}
        showVerticalCrosshair={false}
        snapTooltipToDatumX={true}
        snapTooltipToDatumY={true}
        showDatumGlyph={true
          // (snapTooltipToDatumX || snapTooltipToDatumY) && !renderBarGroup
        }
        showSeriesGlyphs={true}
        renderTooltip={({ tooltipData, colorScale }) => {
          const nearestDatum = tooltipData?.nearestDatum;

          if (nearestDatum.datum) {
            return (
              <>
                {formatDate(nearestDatum.datum['date'])}
                <br />
                <br />
                <HStack>
                  <svg width={legendGlyphSize} height={legendGlyphSize} style={{ margin: '2px 0' }}>
                    <circle
                      fill={colorScale(nearestDatum.key)}
                      r={legendGlyphSize / 2}
                      cx={legendGlyphSize / 2}
                      cy={legendGlyphSize / 2}
                    />
                  </svg>
                  <Text>
                    {`${nearestDatum.datum['proposicao__tema__nome']}`}:
                    {' '}
                    <i>{formatPercentagePrecise(nearestDatum.datum['ficha_pageviews'] / totalByDate[nearestDatum.datum['date']])}</i>
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

export { ThemesChart };
