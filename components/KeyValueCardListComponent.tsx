import React from "react";
import {Box} from "@mui/joy";
import {SxProps} from "@mui/system";
import {KeyValue} from "@/app/page";
import KeyValueCardComponent from "@/components/KeyValueCardComponent";

type Props = {
    keyValues: KeyValue[]
}

/**
 * KeyValueCardListComponent is a functional component that renders a list of KeyValueCardComponents.
 *
 * @param {Object} props - The props object that contains the keyValues property.
 * @param {Array<Object>} props.keyValues - An array of objects representing the key-value pairs to be rendered.
 *
 * @returns {ReactElement} The rendered KeyValueCardListComponent.
 */
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
    gap: 3,
}
const keyValueListContainer: SxProps = {
    display: "grid",
    gridTemplateColumns: {
        lg: "repeat(3, 1fr)",
        xs: "1fr",
    },
    gap: 2,
}

export default KeyValueCardListComponent
