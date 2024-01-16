import React from "react";
import Alert from "@mui/joy/Alert";
import WarningIcon from "@mui/icons-material/Warning";

type Props = {
    message: string
}

/**
 * Represents an error message component.
 * @param {Object} props - The properties for the error component.
 * @param {string} props.message - The error message to display.
 * @returns {ReactElement} - The error component.
 */
const ErrorComponent: React.FC<Props> = (props: Props) => {
    return (
        <Alert
            startDecorator={<WarningIcon />}
            variant="solid"
            color="danger"
            size="sm"
        >
            {props.message}
        </Alert>

    )
}

export default ErrorComponent
