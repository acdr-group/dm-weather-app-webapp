import React from "react";
import {Box} from "@mui/joy";
import {SxProps} from "@mui/system";
import {KeyValue} from "@/app/page";
import KeyValueCardComponent from "@/components/KeyValueCardComponent";

type Props = {
    keyValues: KeyValue[]
}
const KeyValueCardListComponent: React.FC<Props> = (props: Props) => {
    return (
        <Box sx={keyValueListWrapper}>
            <Box sx={keyValueListContainer}>
                {props.keyValues.map(entry =>
                    <KeyValueCardComponent
                        key={entry.title}
                        keyValue={entry}
                    />
                )}
            </Box>
        </Box>
    )
}

const keyValueListWrapper: SxProps = {
    display: "grid",
    gap: 4,
}
const keyValueListContainer: SxProps = {
    display: "grid",
    gridTemplateColumns: {
        lg: "repeat(3, 1fr)",
        xs: "1fr",
    },
    gap: 3,
}

export default KeyValueCardListComponent
