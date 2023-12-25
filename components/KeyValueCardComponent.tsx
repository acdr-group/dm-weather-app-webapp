import React from "react";
import {KeyValue} from "@/app/page";
import {Box} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import Card from "@mui/joy/Card";
import {SxProps} from "@mui/system";
import {useTheme} from "@mui/joy/styles";

type Props = {
    keyValue: KeyValue
}
const KeyValueCardComponent: React.FC<Props> = (props: Props) => {
    return (
        <Card orientation="horizontal" sx={cardItemContainer}>
            <Box sx={cardItemTextBlock}>
                <Typography sx={cardTitle}>{props.keyValue.title}</Typography>
                <Typography level="body-sm">{props.keyValue.description}</Typography>
                <Typography sx={cardTitle}>{`${props.keyValue.value}${props.keyValue.unit}`}</Typography>
            </Box>
            <CircularProgress value={props.keyValue.value as number} determinate thickness={8} size="lg">
                <Box component="div" sx={circularProgressContent}>
                    <Box>{props.keyValue.value}</Box>
                </Box>
            </CircularProgress>
        </Card>
    )
}

const cardItemContainer: SxProps = {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    borderRadius: "lg",
    gap: 4,
}
const cardItemTextBlock: SxProps = {
    alignSelf: "flex-start",
}
const cardTitle: SxProps = {
    fontSize: 16,
    fontWeight: "600",
}
const circularProgressContent: SxProps = {
    textAlign: "center",
}
export default KeyValueCardComponent
