import React from 'react';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';

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
            // endDecorator={
            //     <IconButton variant="solid" size="sm" color="danger">
            //         <CloseIcon fontSize="small"/>
            //     </IconButton>
            // }
        >
            {props.message}
        </Alert>

    )
}

export default ErrorComponent
