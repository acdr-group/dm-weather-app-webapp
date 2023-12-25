"use client";
import React from "react";
import {PointTooltipProps, ResponsiveLine, Serie} from "@nivo/line"
import {useTheme} from "@mui/joy/styles";
import ResponsivSizingComponent from "@/components/shared/ResponsivSizingComponent";
import {Box, Stack, Theme, useColorScheme} from "@mui/joy"
import {Theme as NivoTheme} from "@nivo/core";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import {SxProps} from "@mui/system";

export type ChartDataSetType = {
    x: string,
    y: number,
}
type PropsChart = {
    chartTitle: string
    dataSet: ChartDataSetType[]
    verticalAxisLabel: string
    horizontalAxisLabel: string
    unit: string
}
const ChartComponent: React.FC<PropsChart> = (props: PropsChart) => {

    const theme = useTheme()
    const { mode } = useColorScheme()

    const graphData: Serie[] = [{
        id: props.chartTitle,
        data: props.dataSet
    }]

    const chartTheme: NivoTheme = {
        axis: {
            ticks: {
                text: {
                    fill: mode === "light" ? theme.vars.palette.neutral["700"] : theme.vars.palette.neutral["400"],
                    fontFamily: "Inter",
                    fontSize: "12px",
                    outlineColor: "transparent"
                }
            },
            legend: {
                text: {
                    fill: mode === "light" ? theme.vars.palette.neutral["700"]  : theme.vars.palette.neutral["400"],
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "16px",
                    outlineColor: "transparent"
                },
            }
        }
    }

    return (
        <ResponsivSizingComponent>
            {(containerSize) =>
                <Box sx={{ position: "absolute", width: containerSize.width, height: containerSize.height }}>
                    <ResponsiveLine
                        data={graphData}
                        curve="natural"
                        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                        xScale={{ type: "point" }}
                        yScale={{
                            type: "linear",
                            min: "auto",
                            max: "auto",
                            stacked: true,
                            reverse: false
                        }}
                        yFormat=" >-.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 10,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: props.horizontalAxisLabel,
                            legendOffset: 40,
                            legendPosition: "middle"
                        }}
                        axisLeft={{
                            tickSize: 10,
                            tickPadding: 5,
                            tickRotation: 0,
                            legendOffset: -45,
                            legendPosition: "middle",
                        }}
                        tooltip={
                            (tooltipProps) => <ChartToolTipComponent point={tooltipProps.point} unit={props.unit}/>
                        }
                        enablePoints={true}
                        enableCrosshair={true}
                        theme={chartTheme}
                        enableArea={true}
                        areaOpacity={0.3}
                        areaBaselineValue={30}
                        areaBlendMode={"color-burn"}
                        colors={theme.vars.palette.primary[500]}
                        pointSize={15}
                        pointColor={theme.vars.palette.primary[500]}
                        pointBorderWidth={2}
                        pointBorderColor={"white"}
                        pointLabelYOffset={-12}
                        isInteractive={true}
                        useMesh={true}
                        legends={undefined}
                        animate={true}
                    />
                </Box>
            }
        </ResponsivSizingComponent>
    )
}

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