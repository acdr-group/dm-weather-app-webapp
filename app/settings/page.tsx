"use client"
import React from 'react';
import PageLayoutComponent from "@/components/shared/PageLayoutComponent";
import {Box, Stack} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import {useTheme} from "@mui/joy/styles";
import Switch from '@mui/joy/Switch';
import {SxProps} from "@mui/system";
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import StorageIcon from '@mui/icons-material/Storage';
import SatelliteAltOutlinedIcon from '@mui/icons-material/SatelliteAltOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';

type Props = {

}

const SettingPage: React.FC<Props> = (props: Props) => {
    return (
        <PageLayoutComponent title={"Einstellungen"}>
            <DataSourceSettings/>
            <ThemeSettings/>
            <AppInfo/>
        </PageLayoutComponent>
    )
}

function ThemeSettings() {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: 4,
            }}
        >
            {([undefined] as const).map(
                (inset) => (
                    <div key={inset || 'default'}>
                        <Typography level="body-lg" mb={2}>
                            Farbshema
                        </Typography>
                        <List
                            variant="outlined"
                            sx={{
                                minWidth: 240,
                                borderRadius: 'md',
                            }}
                        >
                            <ListItem
                                endAction={
                                    <Stack direction={"row"} spacing={2} alignItems={"center"} sx={{
                                        px: 3
                                    }}>
                                        <Typography>{theme.palette.primary[500]}</Typography>
                                        <Box sx={{
                                            backgroundColor: theme.vars.palette.primary[500],
                                            height: 30,
                                            width: 30,
                                            borderRadius: "20%",
                                        }}></Box>
                                    </Stack>
                                }
                                sx={listItem}
                            >
                                <ListItemDecorator>
                                    <PaletteOutlinedIcon/>
                                </ListItemDecorator>
                                Hauptfarbe
                            </ListItem>
                            <ListDivider inset={inset} />
                            <ListItem
                                sx={listItem}
                                endAction={
                                    <Switch
                                        sx={{
                                            px: 3,
                                            '--Switch-thumbSize': '27px',
                                            '--Switch-trackWidth': '50px',
                                            '--Switch-trackHeight': '25px',
                                        }}
                                    />
                                }
                            >
                                <ListItemDecorator>
                                    <LightModeOutlinedIcon/>
                                </ListItemDecorator>
                                Modus
                            </ListItem>
                        </List>
                    </div>
                ),
            )}
        </Box>
    )
}

const DataSourceSettings: React.FC = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: 4,
            }}
        >
            {([undefined] as const).map(
                (inset) => (
                    <div key={inset || 'default'}>
                        <Typography level="body-lg" mb={2}>
                            Datenquelle
                        </Typography>
                        <List
                            variant="outlined"
                            sx={{
                                minWidth: 240,
                                borderRadius: 'md',
                            }}
                        >
                            <ListItem
                                endAction={
                                    <Box sx={{ px: 3}}>
                                        <Typography>Karlsruhe</Typography>
                                    </Box>
                                }
                                sx={listItem}
                            >
                                <ListItemDecorator>
                                    <SouthAmericaIcon/>
                                </ListItemDecorator>
                                Anzeigeregion
                            </ListItem>
                            <ListDivider inset={inset} />
                            <ListItem
                                sx={listItem}
                                endAction={
                                    <Box sx={{ px: 3}}>
                                        <Typography>Heidelberg Universität</Typography>
                                    </Box>
                                }
                            >
                                <ListItemDecorator>
                                    <StorageIcon/>
                                </ListItemDecorator>
                                Datenherkunft
                            </ListItem>
                            <ListDivider inset={inset} />
                            <ListItem
                                sx={listItem}
                                endAction={
                                    <Box sx={{ px: 3}}>
                                        <Typography>Karlsruhe dmTECH</Typography>
                                    </Box>
                                }
                            >
                                <ListItemDecorator>
                                    <SatelliteAltOutlinedIcon/>
                                </ListItemDecorator>
                                Wetterstation
                            </ListItem>
                        </List>
                    </div>
                ),
            )}
        </Box>
    )
}

const AppInfo: React.FC = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: 4,
            }}
        >
            {([undefined] as const).map(
                (inset) => (
                    <div key={inset || 'default'}>
                        <Typography level="body-lg" mb={2}>
                            Anwendungsstammdaten
                        </Typography>
                        <List
                            variant="outlined"
                            sx={{
                                minWidth: 240,
                                borderRadius: 'md',
                            }}
                        >
                            <ListItem
                                endAction={
                                    <Box sx={{ px: 3}}>
                                        <Typography>1.0.0</Typography>
                                    </Box>
                                }
                                sx={listItem}
                            >
                                <ListItemDecorator>
                                    <InfoOutlinedIcon/>
                                </ListItemDecorator>
                                App-Version
                            </ListItem>
                            <ListDivider inset={inset} />
                            <ListItem
                                sx={listItem}
                                endAction={
                                    <Box sx={{ px: 3}}>
                                        <Typography>01.01.2024</Typography>
                                    </Box>
                                }
                            >
                                <ListItemDecorator>
                                    <NewReleasesOutlinedIcon/>
                                </ListItemDecorator>
                                Letzter Release
                            </ListItem>
                        </List>
                    </div>
                ),
            )}
        </Box>
    )
}
const listItem: SxProps = {
    px: 3,
    py: 2,
}
export default SettingPage
