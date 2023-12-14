import React from "react";
import { PointTooltipProps, ResponsiveLine, Serie } from "@nivo/line";
import { useTheme } from "@mui/joy/styles";
import ResponsiveSizingComponent from "@/components/shared/ResponsivSizingComponent";
import { Box, Stack, Theme, useColorScheme } from "@mui/joy";
import { Theme as NivoTheme } from "@nivo/core";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { SxProps } from "@mui/system";

export type ChartDataSeType = {
    x: string,
    y: number,
};

type PropsChart = {
    chartTitle: string,
    dataSet: ChartDataSeType[],
    verticalAxisLabel: string,
    horizontalAxisLabel: string,
    unit: string,
};

const ChartComponent: React.FC<PropsChart> = (props: PropsChart) => {
    const theme = useTheme();
    const { mode } = useColorScheme();

    const graphData: Serie[] = [{
        id: props.chartTitle,
        data: props.dataSet,
    }];

    const chartTheme: NivoTheme = {
        axis: {
            ticks: {
                text: {
                    fill: mode === "light" ? theme.vars.palette.neutral["700"] : theme.vars.palette.neutral["400"],
                    fontFamily: "Inter",
                    outlineColor: "transparent",
                },
            },
            legend: {
                text: {
                    fill: mode === "light" ? theme.vars.palette.neutral["700"] : theme.vars.palette.neutral["400"],
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "15px",
                    outlineColor: "transparent",
                },
            },
        },
        grid: {
            line: {
                stroke: mode === "light" ? "#eee" : "#555",
                strokeWidth: 1,
            },
        },
    };

    const lineColor = theme.vars.palette.primary[500];
    const areaColor = mode === "dark" ? lineColor : "#ccc";

    return (
        <ResponsiveSizingComponent>
            {(containerSize) =>
                <Box sx={{ width: containerSize.width, height: containerSize.height }}>
                    <ResponsiveLine
                        data={graphData}
                        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                        xScale={{ type: "point" }}
                        yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: props.horizontalAxisLabel,
                            legendOffset: 36,
                            legendPosition: "middle",
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: props.verticalAxisLabel,
                            legendOffset: -40,
                            legendPosition: "middle",
                        }}
                        colors={lineColor}
                        theme={chartTheme}
                        enableArea={true}
                        areaBaselineValue={0}
                        areaOpacity={mode === "dark" ? 0.75 : 0.1}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabel="y"
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[]}
                    />
                </Box>
            }
        </ResponsiveSizingComponent>
    );
};

type PropsChartToolTipComponent = PointTooltipProps & {
    unit: string
}
const ChartToolTipComponent: React.FunctionComponent<PropsChartToolTipComponent> = (props: PropsChartToolTipComponent) => {

    const { point } = props
    return (
        <Card orientation="vertical" sx={chartToolTipContainer}>
            <Stack alignItems="center">
                <Typography level="body-sm">{`${point.data.x}`}</Typography>
                <Typography level="body-lg" sx={toolTipMainText}>
                    {`${point.data.y}${props.unit}`}
                </Typography>
            </Stack>
        </Card>
    )
}

const chartToolTipContainer: SxProps<Theme> = {
    px: 2,
    py: 1,
}
const toolTipMainText: SxProps<Theme> = {
    fontWeight: "700",
    color: theme => theme.vars.palette.primary[500],
}
export default ChartComponent