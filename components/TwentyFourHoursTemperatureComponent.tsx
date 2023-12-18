import React, { useEffect, useMemo, useRef, useState } from 'react';
import Card from "@mui/joy/Card";
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import { Box, Stack } from "@mui/joy";
import { SxProps } from "@mui/system";
import Typography from "@mui/joy/Typography";
import { mapTimeLabelToValues } from "@/contexts/applicationContext";

type HourlyTemperature = {
    date: Date,
    icon: any,
    temp: string,
}

type Props = {
    hours: string[]
    values: number[]
}

const TwentyFourHoursTemperatureComponent: React.FC<Props> = (props: Props) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const [isPaused, setIsPaused] = useState(false);

    const cardContent: SxProps = {
        overflowX: "hidden",
        display: "flex",
        whiteSpace: "nowrap",
        animation: `scroll 60s linear infinite ${isPaused ? 'paused' : 'running'}`,
    };

    const hourlyTemperatures: HourlyTemperature[] = useMemo<HourlyTemperature[]>(() => {
        return mapTimeLabelToValues(props.hours, props.values)
            .map(d => {
                return {
                    date: d.date,
                    icon: <CloudOutlinedIcon />,
                    temp: `${d.value?.toFixed(0)}°C`,
                }
            })
    }, [props.hours, props.values])

    const pauseScrolling = () => {
        setIsPaused(true);
    }

    const resumeScrolling = () => {
        setIsPaused(false);
    }

    useEffect(() => {
        const scrollContent = () => {
            if (scrollRef.current && !isPaused) {
                scrollRef.current.scrollLeft = (scrollRef.current.scrollLeft || 0) + 1;
                if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth || 0)) {
                    scrollRef.current.scrollLeft = 0;
                }
            }
        };

        const intervalId = setInterval(scrollContent, 50);

        return () => {
            clearInterval(intervalId);
        };
    }, [isPaused]);

    return (
        <Card orientation="horizontal" sx={cardContainer} data-cy="twenty-four-hours-temperature-wrapper">
            <Stack
                id="hours-scrolling-element"
                ref={scrollRef}
                direction="row"
                sx={cardContent}
                data-cy="twenty-four-hours-temperature-container"
                onMouseEnter={pauseScrolling}
                onMouseLeave={resumeScrolling}
            >
                {hourlyTemperatures.map((entry, index) => (
                    <Box key={`entry-${index}`} sx={dayContainer}>
                        <Typography noWrap>
                            {entry.date.toLocaleString([], { hour: "2-digit" })}
                        </Typography>
                        {entry.icon}
                        <Typography level="title-md">{entry.temp}</Typography>
                    </Box>
                ))}
                {hourlyTemperatures.map((entry, index) => (
                    <Box key={`entry-${index + hourlyTemperatures.length}`} sx={dayContainer}>
                        <Typography noWrap>
                            {entry.date.toLocaleString([], { hour: "2-digit" })}
                        </Typography>
                        {entry.icon}
                        <Typography level="title-md">{entry.temp}</Typography>
                    </Box>
                ))}
            </Stack>
        </Card>
    )
}

const cardContainer: SxProps = {
    display: "flex",
    overflowX: "hidden",
}

const dayContainer: SxProps = {
    display: "grid",
    justifyContent: "center",
    justifyItems: "center",
    px: 2.2,
    borderRadius: 3,
}

export default TwentyFourHoursTemperatureComponent;
