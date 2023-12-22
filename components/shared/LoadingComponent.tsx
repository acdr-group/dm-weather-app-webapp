"use client";
import React, {useEffect, useState} from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import {Stack} from "@mui/joy";
import Typography from "@mui/joy/Typography";

type Props = {
    message?: string
}

const LoadingComponent: React.FC<Props> = (props: Props) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Stack spacing={2} sx={{ flex: 1 }}>
            <LinearProgress determinate value={progress} />
            <Typography>{props.message}</Typography>
        </Stack>
    )
}

export default LoadingComponent
