import React from "react"
import Card from "@mui/joy/Card";
import Box from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import IconButton from "@mui/joy/Box";
import {SxProps} from "@mui/system";
import Typography from "@mui/joy/Typography";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import {Theme} from "@mui/joy";

type Suggestion = {
    icon: any
    message: string
}
type Props = {
    weatherIcon: string
}
export const SuggestionComponent: React.FC<Props> = (props: Props) => {
    const { weatherIcon } = props
    
    const suggestions: Suggestion[] = [
        {
            icon: <BeachAccessOutlinedIcon color="primary" />,
            message: "Nehmen Sie einen Regenschirm mit",
        },
        {
            icon: <CheckroomOutlinedIcon color="primary" />,
            message: "Ziehen Sie sich warm an",
        }
    ]
    
    return (
        <Card orientation="vertical" sx={SuggestionCardContainer}>
            <Typography level="title-lg" sx={cardHeader}>Vorschläge für Ihren Tag</Typography>
            <Stack sx={{
                display: "grid",
                gap: 2,
            }}>
                {suggestions.map(s =>
                    <Box key={s.message} sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: "max-content 1fr",
                        boxShadow: "0 0 4px grey",
                        p: 1,
                    }}>
                        <IconButton sx={SuggestionIconContainer}>{s.icon}</IconButton>
                        <Typography textAlign="left">{s.message}</Typography>
                    </Box>
                )}                
            </Stack>
        </Card>
    );
};

const SuggestionCardContainer: SxProps = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 4,
    borderRadius: "sm",
}
const cardHeader: SxProps = {
    justifySelf: "center",
}
const SuggestionIconContainer: SxProps<Theme> = {
    borderRadius: 8,
    background: "#ede7f6",
    p: 1,
    animation: "glow 0.3s ease-in-out infinite alternate",
    "-webkit-animation": "glow 0.3s ease-in-out infinite alternate",
    "-moz-animation": "glow 0.3s ease-in-out infinite alternate",
    "@keyframes glow": {
        from: {
            boxShadow: (theme: Theme) => `0 0 1px ${theme.vars.palette.primary["500"]}`,
        },
        to: {
            boxShadow: (theme: Theme) => `0 0 8px ${theme.vars.palette.primary["500"]}`
        }
    }
}