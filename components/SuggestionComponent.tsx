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
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SecurityIcon from "@mui/icons-material/Security";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type Suggestion = {
    icon: any
    message: string
}
type Props = {
    weatherIcon: string
}
export const SuggestionComponent: React.FC<Props> = (props: Props) => {
    const { weatherIcon } = props

    const resolveSuggestionFromWeatherIcon = (icon: string): Suggestion[] => {
        switch (icon) {
            case "01d":
                return [
                    {icon: <WbSunnyIcon/>, message: "Genießen Sie den Sonnenschein!"},
                ]
            case "01n":
                return [
                    {icon: <WbSunnyIcon/>, message: "Genießen Sie den Sonnenschein!"},
                ]
            case "02d":
                return [
                    {icon: <SecurityIcon/>, message: "Sonnenschutz nicht vergessen!"},
                ]
            case "02n":
                return [
                    {icon: <SecurityIcon/>, message: "Sonnenschutz nicht vergessen!"},
                ]
            case "03d":
                return [
                    {icon: <BeachAccessOutlinedIcon/>, message: "Nehmen Sie einen Regenschirm mit!"},
                ]
            case "03n":
                return [
                    {icon: <BeachAccessOutlinedIcon/>, message: "Nehmen Sie einen Regenschirm mit!"},
                ]
            case "04d":
                return [
                    {icon: <CheckroomOutlinedIcon/>, message: "Mehrere Schichten Kleidung anziehen!"},
                ]
            case "04n":
                return [
                    {icon: <CheckroomOutlinedIcon/>, message: "Mehrere Schichten Kleidung anziehen!"},
                ]
            case "09d":
                return [
                    {icon: <BeachAccessOutlinedIcon/>, message: "Regenschirm und Gummistiefel einpacken!!"},
                ]
            case "09n":
                return [
                    {icon: <BeachAccessOutlinedIcon/>, message: "Regenschirm und Gummistiefel einpacken!!"},
                ]
            case "10d":
                return [
                    {icon: <ThunderstormIcon/>, message: "Achtung, Gewitter!!"},
                ]
            case "10n":
                return [
                    {icon: <ThunderstormIcon/>, message: "Achtung, Gewitter!"},
                ]
            case "11d":
                return [
                    {icon: <DriveEtaIcon/>, message: "Vorsicht beim Fahren!!"},
                ]
            case "11n":
                return [
                    {icon: <DriveEtaIcon/>, message: "Vorsicht beim Fahren!"},
                ]
            case "13d":
                return [
                    {icon: <AcUnitIcon/>, message: "Warme Kleidung anziehen!!"},
                ]
            case "13n":
                return [
                    {icon: <AcUnitIcon/>, message: "Warme Kleidung anziehen!!"},
                ]
            case "50d":
                return [
                    {icon: <VisibilityOffIcon/>, message: "Sicht eingeschränkt!"},
                ]
            case "50n":
                return [
                    {icon: <VisibilityOffIcon/>, message: "Sicht eingeschränkt!"},
                ]
            default:
                return [
                    {icon: <WbSunnyIcon/>, message: "Genießen Sie den Sonnenschein!"},
                ];
        }
    }

    return (
        <Card orientation="vertical" sx={SuggestionCardContainer}>
            <Typography level="title-lg" sx={cardHeader}>Vorschlag für Ihren Tag</Typography>
            <Stack sx={{
                display: "grid",
                gap: 2,
            }}>
                {resolveSuggestionFromWeatherIcon(weatherIcon).map(s =>
                    <Box key={s.message} sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: "max-content 1fr",
                        boxShadow: "0 0 4px grey",
                        borderRadius: "md",
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
    borderRadius: "lg",
}
const cardHeader: SxProps = {
    justifySelf: "center",
}
const SuggestionIconContainer: SxProps<Theme> = {
    background: "#ede7f6",
    borderRadius: "md",
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