"use client"
import React, {PropsWithChildren, useEffect, useState} from "react";
import PageLayoutComponent from "@/components/shared/PageLayoutComponent";
import {Box, Button, Stack, Theme, useColorScheme} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import {useTheme} from "@mui/joy/styles";
import Switch from "@mui/joy/Switch";
import {SxProps} from "@mui/system";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import StorageIcon from "@mui/icons-material/Storage";
import SatelliteAltOutlinedIcon from "@mui/icons-material/SatelliteAltOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {useCustomThemeContext} from "@/contexts/themeContext";
import Input from "@mui/joy/Input";
import {customThemes} from "@/theme/customThemes";

type Props = {}

const SettingPage: React.FC<Props> = (props: Props) => {
    return (
        <PageLayoutComponent title={"Einstellungen"}>
            <DataSourceSettings/>
            <ThemeSettings/>
            <AppInfo/>
        </PageLayoutComponent>
    )
}

type SettingItem = {
    icon: React.ReactNode,
    label: string,
    value: React.ReactNode,
}
type PropsSettingSection = {
    sectionTitle: string
    settingItemList: SettingItem[]
}
const SettingSectionComponent: React.FC<PropsSettingSection> = (props: PropsSettingSection) => {
    return (
        <Box sx={settingSectionContainer}>
            <Box component="div">
                <Typography level="body-lg" sx={sectionHeader}>{props.sectionTitle}</Typography>
                <List variant="outlined" sx={settingSectionItemListContainer}>
                    {props.settingItemList.map((item, index, arr) =>
                        <>
                            <ListItem key={item.label} endAction={item.value} sx={listItem}>
                                <ListItemDecorator>{item.icon}</ListItemDecorator>
                                <Typography>{item.label}</Typography>
                            </ListItem>
                            {index !== arr.length - 1 ? <ListDivider inset={undefined} /> : null}
                        </>
                    )}
                </List>
            </Box>
        </Box>
    )
}

const DataSourceSettings: React.FC = () => {

    const theme = useTheme()

    const settingItemList: SettingItem[] = [
        {
            icon: <SouthAmericaIcon/>,
            label: "Anzeigeregion",
            value: <ValueContent>Karlsruhe</ValueContent>,
        },
        {
            icon: <StorageIcon/>,
            label: "Datenherkunft",
            value: <ValueContent>{process.env.NEXT_PUBLIC_WEATHER_DATA_PROVIDER}</ValueContent>,
        },
        {
            icon: <SatelliteAltOutlinedIcon/>,
            label: "Wetterstation",
            value: <ValueContent>{process.env.NEXT_PUBLIC_WEATHER_DATA_PROVIDER}</ValueContent>,
        },
    ]

    return (
        <SettingSectionComponent
            sectionTitle={"Datenquelle"}
            settingItemList={settingItemList}
        />
    )
}

const ThemeSettings: React.FC = () => {

    const theme = useTheme()
    const { mode, setMode } = useColorScheme()

    const {
        currentTheme,
        setThemeByThemeName,
    } = useCustomThemeContext()

    const [selectedThemeName, setSelectedThemeName] = useState<string | undefined>(currentTheme?.name)

    useEffect(() => {
        setThemeByThemeName(selectedThemeName!)
    }, [selectedThemeName])

    const toggleMode = () => {
        setMode(mode === "dark" ? "light" : "dark")
    }

    const settingItemList: SettingItem[] = [
        {
            icon: <PaletteOutlinedIcon/>,
            label: "Hauptfarbe",
            value: (
                <ValueContent>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                        <Select defaultValue={currentTheme?.name} onChange={(_, value) => setSelectedThemeName(value!)}>
                            {customThemes.map(theme =>
                                <Option key={theme.name} value={theme.name}>
                                    {theme.name}
                                </Option>
                            )}
                        </Select>
                        <Box sx={colorIndicator}></Box>
                    </Stack>
                </ValueContent>
            ),
        },
        {
            icon:  <LightModeOutlinedIcon/>,
            label: "Dunkel-Modus",
            value: (
                <ValueContent>
                    <Switch checked={mode === "dark"} onClick={toggleMode} sx={switchStyle}/>
                </ValueContent>
            ),
        },
        {
            icon: <LanguageOutlinedIcon/>,
            label: "Sprache",
            value: (
                <ValueContent>
                    <Select defaultValue="Deutsch">
                        <Option value="Deutsch">Deutsch</Option>
                    </Select>
                </ValueContent>
            )
        },
    ]

    return (
        <SettingSectionComponent
            sectionTitle={"Darstellung"}
            settingItemList={settingItemList}
        />
    )
}

const AppInfo: React.FC = () => {
    const theme = useTheme()

    const settingItemList: SettingItem[] =[
        {
            icon: <InfoOutlinedIcon/>,
            label: "App-Version",
            value: <ValueContent>{process.env.NEXT_PUBLIC_APP_VERSION}</ValueContent>,
        },
        {
            icon: <NewReleasesOutlinedIcon/>,
            label: "Letzter Release",
            value: <ValueContent>{process.env.NEXT_PUBLIC_LAST_RELEASE_DATE}</ValueContent>,
        },
    ]

    return (
        <SettingSectionComponent
            sectionTitle={"Anwendungsstammdaten"}
            settingItemList={settingItemList}
        />
    )
}

const settingSectionContainer: SxProps = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 4,
}
const settingSectionItemListContainer: SxProps = {
    minWidth: 240,
    borderRadius: "md",
}
const listItem: SxProps = {
    px: {
        lg: 3,
        md: 2.2,
        sm: 2.2,
    },
    py: 2,
}
const sectionHeader: SxProps = {
    color: "grey",
    mb: 2,
}
const switchStyle: SxProps = {
    "--Switch-thumbSize": "27px",
    "--Switch-trackWidth": "50px",
    "--Switch-trackHeight": "25px",
}
const colorIndicator: SxProps<Theme> = {
    display: {
        lg: "block",
        xs: "none",
    },
    backgroundColor: theme => theme.vars.palette.primary[500],
    height: 30,
    width: 30,
    borderRadius: "20%",
    cursor: "pointer",
}
const valueContentStyle: SxProps = {
    px: {
        lg: 3,
        md: 1,
        xs: 1,
    },
}
const ValueContent = (props: PropsWithChildren) => {
    return (
        <Box sx={valueContentStyle}>
            {props.children}
        </Box>
    )
}
export default SettingPage
