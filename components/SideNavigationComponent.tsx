"use client"
import React, {useState} from 'react';
import {ColorPaletteProp} from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import {Button} from "@mui/joy";
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Sheet from '@mui/joy/Sheet';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {SxProps} from "@mui/system";
import {useRouter, usePathname} from "next/navigation";

type SideNavigationButton = {
    label: string
    icon: React.ReactNode
    chip?: React.ReactNode
    isActive: boolean
    onClick: () => void
}
const SideNavigationComponent = () => {

    const router = useRouter()
    const pathname = usePathname()
    const [color, setColor] = useState<ColorPaletteProp>('primary')

    const sideNavigationButtons: SideNavigationButton[] = [
        {
            label: 'Start',
            icon: <HomeOutlinedIcon />,
            isActive: pathname === "/",
            onClick: () => router.push("/"),
        },
        {
            label: 'Analysen',
            icon: <AssessmentOutlinedIcon />,
            isActive: pathname === "/analysis",
            onClick: () => router.push("/analysis"),
        },
        {
            label: 'Einstellungen',
            icon: <SettingsOutlinedIcon />,
            isActive: pathname === "/settings",
            onClick: () => router.push("/settings"),
        }
    ]

    return (
        <Box sx={sideNavigationContainer}>
            <Sheet
                variant="solid"
                color="neutral"
                //invertedColors
                sx={sideNavigationContent}
            >
                <List sx={navigationButtonListContainer}>
                    {sideNavigationButtons.map((button, index) =>
                        <ListItemButton
                            key={button.label}
                            selected={button.isActive}
                            onClick={button.onClick}
                            //variant="soft"
                        >
                            <ListItemDecorator>{button.icon}</ListItemDecorator>
                            {button.label}
                            {button.chip ?? null}
                        </ListItemButton>
                    )}
                </List>
            </Sheet>
        </Box>
    )
}

const sideNavigationContainer: SxProps = {
    display: {
        lg: "flex",
        xs: "none",
    },
    overflow: 'auto',
    position: "sticky",
    top: 0,
    left: 0,
    bottom: 0,
}
const sideNavigationContent: SxProps = {
    display: "grid",
    p: 2,
    bgcolor: "white",
    borderRight: "0.1px solid #cdd7e1",
}
const navigationButtonListContainer: SxProps = {
    '--ListItem-radius': '8px',
    '--List-gap': '4px',
    flexGrow: 0,
    minWidth: 200,
}

export default SideNavigationComponent