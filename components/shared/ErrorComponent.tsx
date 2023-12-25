import React from "react";
import Alert from "@mui/joy/Alert";
import WarningIcon from "@mui/icons-material/Warning";

type Props = {
    message: string
}
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
