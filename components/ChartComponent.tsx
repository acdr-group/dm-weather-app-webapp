import React from "react";
import {ResponsiveLine, Serie} from '@nivo/line'
import {useTheme} from '@mui/joy/styles';
import ResponsivSizingComponent from "@/components/shared/ResponsivSizingComponent";
import {Box} from "@mui/joy"

export type ChartDataSeType = {
    x: string,
    y: number,
}
type PropsChart = {
    chartTitle: string
    dataSet: ChartDataSeType[]
    verticalAxisLabel: string
    horizontalAxisLabel: string
}
const ChartComponent: React.FC<PropsChart> = (props: PropsChart) => {

    const theme = useTheme()

    const graphData: Serie[] = [{
        id: props.chartTitle,
        data: props.dataSet
    }]

    return (
        <ResponsivSizingComponent>
            {(containerSize) =>
                <Box sx={{ width: containerSize.width, height: containerSize.height }}>
                    <ResponsiveLine
                        data={graphData}
                        curve="natural"
                        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
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
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            tickSize: 10,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: props.verticalAxisLabel,
                            legendOffset: -45,
                            legendPosition: 'middle',
                        }}
                        enablePoints={true}
                        enableCrosshair={true}

                        enableArea={true}
                        colors={theme.vars.palette.primary[500]}
                        pointSize={1}
                        pointColor={theme.vars.palette.primary[500]}
                        pointBorderWidth={1}
                        pointBorderColor={{from: 'serieColor'}}
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

export default ChartComponent