"use client"
import React from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import {SxProps} from "@mui/system";
import CompanyLogoComponent from "@/components/shared/CompanyLogoComponent";
import {Theme} from "@mui/joy";
import {useFullScreen} from "@/hooks/useFullScreen";
import NotificationDrawerComponent from "@/components/NotificationDrawerComponent";
import {AppNotification} from "@/models/notification";

const HeaderComponent: React.FC = () => {
    const { enterFullScreen } = useFullScreen()

    const notifications: AppNotification[] = [
        {
            id: "f01c2015-fb8b-4b0f-ac67-a07fc1b5b55b",
            title: "Willkommen in der dmTech-Wetter-App",
            message: "Willkommen! Entdecke das Wetter mit uns – immer aktuell und zuverlässig",
            type: "info",
            creationDate: new Date(),
        },
    ]

    return (
        <Sheet
            variant="solid"
            color="primary"
            invertedColors
            sx={headerContainer}
        >
            <CompanyLogoComponent/>
            {/*<Input*/}
            {/*    placeholder="Search"*/}
            {/*    variant="soft"*/}
            {/*    size="md"*/}
            {/*    startDecorator={<SearchIcon fontSize="small"/>}*/}
            {/*    sx={searchInput}*/}
            {/*/>*/}
            <Box sx={iconListContainer}>
                <IconButton size="sm" onClick={() => enterFullScreen()}>
                    <FullscreenIcon fontSize="small"/>
                </IconButton>
                <NotificationDrawerComponent notifications={notifications}/>
            </Box>
        </Sheet>
    )
}

const headerContainer: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    justifyItems: "space-between",
    justifyContent: "space-between",
    flexGrow: 1,
    px: 4,
    py: 1.5,
    position: "sticky",
    top: 0,
    right: 0,
    left: 0,
    minWidth: 'min-content',
    background: theme =>
        `linear-gradient(to top, ${theme.vars.palette.primary[600]}, ${theme.vars.palette.primary[500]})`,
}
const searchInput: SxProps = {
    '--Input-paddingInline': '12px',
    width: "30%",
    display: {
        xs: 'none',
        lg: 'flex',
    },
}
const iconListContainer: SxProps = {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    gap: 2,
}

export default HeaderComponent
