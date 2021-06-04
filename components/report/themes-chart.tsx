import { XYChart, BarSeries, BarStack, lightTheme, Axis, Grid, Tooltip } from "@visx/xychart";
import { timeParse, timeFormat, timeFormatDefaultLocale } from 'd3-time-format';
import { schemeTableau10 } from 'd3-scale-chromatic';

import { formatPercentagePrecise, formatPercentage} from '../formattedNumber'
import useSWR from "swr"
import { Center, HStack, Text } from "@chakra-ui/layout";
import * as locale from '../d3/pt-BR-locale.json';
import { useEffect, useState } from "react";

const fetcher = url => fetch(url).then(r => r.json())

const ThemesChart = ({ year, dataAccessor, dateAccessor, dimensionAccessor, metricAccessor, setColorsMap, setColorLegends, setDefaultColor}) => {
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/api/relatorio-consolidado/?year=${year}`, fetcher);
  
  const animationTrajectory = "outside";
  const legendGlyphSize = 15;
  const [sortedThemesCountArray, setSortedThemesCountArray] = useState(new Array());
  const [groupedByTheme, setGroupedByTheme] = useState(new Object());
  const [totalByDate, setTotalByDate] = useState(new Object());
  const [themesCount, setThemesCount] = useState(new Object());
  const [colorsList, setColorsList] = useState(new Array<string>());
  
  useEffect(() => {
    const groupedByTheme = dataAccessor(data)['dimension'].reduce((accumulator, currentValue) => {
      accumulator[dimensionAccessor(currentValue)] = accumulator[dimensionAccessor(currentValue)] || []
      accumulator[dimensionAccessor(currentValue)].push(currentValue)
  
      return accumulator
    }, {})
  
    const totalByDate = dataAccessor(data)['dimension'].reduce((accumulator, currentValue) => {
      accumulator[dateAccessor(currentValue)] = accumulator[dateAccessor(currentValue)] || 0
      accumulator[dateAccessor(currentValue)] += metricAccessor(currentValue)
  
      return accumulator
    }, {})
  
    const themesCount = dataAccessor(data)['dimension'].reduce((accumulator, currentValue) => {
      const theme = dimensionAccessor(currentValue)
      accumulator[theme] = accumulator[theme] || 0
      accumulator[theme] += metricAccessor(currentValue)
  
      return accumulator
    }, {})
  
    const themesCountArray = Object.keys(themesCount).map((key) => { return {'dimension': key, 'metric': themesCount[key]}})
  
    const sortedThemesCountArray = themesCountArray.sort((first, second) => {
      return second['metric'] - first['metric']
    })

    const sourceColorSet = schemeTableau10
    const numberOfKeys = Object.keys(themesCount).length
    const slicedColors = sourceColorSet.slice(0, sourceColorSet.length-1)
    const extraColors = (numberOfKeys > 0) ? Array(numberOfKeys - slicedColors.length).fill(sourceColorSet[sourceColorSet.length-1]) : [];
    
    const colorsList = slicedColors.concat(extraColors);

    const colorsMap = new Object();
    const colorLegends = new Array();

    slicedColors.map((color, i) => {
      colorsMap[sortedThemesCountArray[i]['dimension']] = color;
      colorLegends.push({
        color: color,
        'dimension': sortedThemesCountArray[i]['dimension'],
        'metric': sortedThemesCountArray[i]['metric']
      })
    });
    const defaultColor = sourceColorSet[sourceColorSet.length-1];

    setColorsList(colorsList);
    setThemesCount(themesCount);
    setGroupedByTheme(groupedByTheme);
    setSortedThemesCountArray(sortedThemesCountArray);
    setTotalByDate(totalByDate);

    setColorsMap(colorsMap);  
    setColorLegends(colorLegends);
    setDefaultColor(defaultColor);

  }, [data]);

  timeFormatDefaultLocale(locale);
  const parseDate = timeParse('%Y-%m-%dT%H:%M:%S');
  const format = timeFormat('%b %Y');  
  const formatDate = (date: string) => format(parseDate(date) as Date);

  const theme =  {...lightTheme}
  theme.colors = colorsList;

  return (
    <XYChart
      theme={theme}
      xScale={{ type: "band", paddingInner: 0.3 }}
      yScale={{ type: "linear" }}
      height={550}
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
          const theme = t['dimension'];

          return (
            <BarSeries
              
              dataKey={theme}
              data={groupedByTheme[theme]}
              xAccessor={(t) => dateAccessor(t)}
              yAccessor={(t) => metricAccessor(t)}
          />
          );
        })}
      </BarStack>
      <Axis
        key={`time-axis-${animationTrajectory}`}
        orientation="bottom"
        // numTicks={2}
        rangePadding={5}
        // tickFormat={stackOffset === "wiggle" ? () => "" : undefined}
        tickFormat={(date: string) => {
          const d = parseDate(date) as Date;
          const month = d.getMonth();
          if (month == 0 || month == 11) {
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
                {formatDate(dateAccessor(nearestDatum.datum))}
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
                    {`${dimensionAccessor(nearestDatum.datum)}`}:
                    {' '}
                    <i>{formatPercentagePrecise(metricAccessor(nearestDatum.datum) / totalByDate[dateAccessor(nearestDatum.datum)])}</i>
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
