"use client";
import React, {useEffect, useState} from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import {Stack} from "@mui/joy";
import Typography from "@mui/joy/Typography";

type Props = {
    message?: string
}

/**
 * A loading component that displays a progress bar and a message.
 *
 * @component
 *
 * @param {object} props - The properties passed to the component.
 * @param {string} props.message - The message to be displayed.
 *
 * @returns {JSX.Element} The loading component UI.
 */
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
