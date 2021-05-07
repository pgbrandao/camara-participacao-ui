import { XYChart, BarSeries, BarStack, lightTheme, Axis, Grid, Tooltip } from "@visx/xychart";

import useSWR from "swr"
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

const ThemesChart = ({ data }) => {
  const animationTrajectory = "outside";

  console.log(data)
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
      </BarStack>
      {/* <Axis
        key={`time-axis-${animationTrajectory}`}
        orientation="bottom"
        // numTicks={4}
        rangePadding={5}
        // tickFormat={stackOffset === "wiggle" ? () => "" : undefined}
        tickFormat={undefined}
      />
      <Axis
        key={`temp-axis-${animationTrajectory}`}
        label={"Price per quota (US$)"}
        orientation={"left"}
        numTicks={4}
        // values don't make sense in stream graph
      />
      <Tooltip
        // <Tooltip<CityTemperature>
        showHorizontalCrosshair={false}
        showVerticalCrosshair={true}
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
                {nearestDatum.datum['sampledDate']}
                <br />
                <br />
                {Object.entries(nearestDatum.datum['allocation']).map(([key, value]) => {
                  return (
                    // TODO: what should the key here be?
                    <div key={key}>
                      <em
                        style={{
                          color: colorScale?.(key),
                          textDecoration:
                            nearestDatum.key === key ? 'underline' : undefined,
                        }}
                      >
                        {`${key}`}
                      </em>
                      {' '}
                      {`US$ ${Number(value).toFixed(2)}`}
                      <br />
                    </div>
                  )
                })}
              </>
            )
          }
        }}
      /> */}
    </XYChart>
  );
};

export { ThemesChart };
