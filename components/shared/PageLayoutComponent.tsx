import React, {PropsWithChildren} from 'react';
import {Box} from "@mui/joy";
import {SxProps} from "@mui/system";
import Typography from "@mui/joy/Typography";

type Props = PropsWithChildren & {
    title?: string
    subtitle?: string
}
const PageLayoutComponent: React.FC<Props> = (props: Props) => {
    return (
        <Box sx={pageWrapper}>
            <Box>
                {props.title ?
                    <Typography level="h3" data-cy={"page-title"}>{props.title}</Typography>
                    : null
                }
                {props.subtitle ?
                    <Typography level="body-lg">{props.subtitle}</Typography>
                    : null
                }
            </Box>
            <Box sx={pageContentWrapper}>
                {props.children}
            </Box>
        </Box>
    )
}

const pageWrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 3,
    justifyItems: "flex-start",
    justifyContent: "flex-start",
    py: 5,
    px: {
        lg: 5,
        xs: 1.5,
    },
}
const pageContentWrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    justifySelf: "center",
    gap: 5,
}
export default PageLayoutComponent
