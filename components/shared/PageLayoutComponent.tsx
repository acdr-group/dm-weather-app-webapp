import React, {PropsWithChildren} from "react";
import {Box, Theme} from "@mui/joy";
import {SxProps} from "@mui/system";
import Typography from "@mui/joy/Typography";

type Props = PropsWithChildren & {
    title?: string
    subtitle?: string
}

/**
 * React functional component for rendering a page layout.
 *
 * @param {Object} props - The props object containing the component's input parameters.
 * @param {string} props.title - The title of the page.
 * @param {string} props.subtitle - The subtitle of the page.
 * @param {ReactNode} props.children - The content to be rendered inside the page layout.
 * @returns {ReactElement} The rendered page layout.
 */
const PageLayoutComponent: React.FC<Props> = (props: Props) => {
    return (
        <Box sx={pageWrapper}>
            <Box sx={{
                position: "sticky",
                top: 0,
                py: 4,
                backgroundColor: (theme: Theme) => theme.vars.palette.background.body,
                zIndex: 100,
            }}
            >
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
    justifyItems: "flex-start",
    justifyContent: "flex-start",
    pb: 4,
}
const pageContentWrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    justifySelf: "center",
    gap: 5,
}
export default PageLayoutComponent
