"use client"
import React, {useState} from "react";
import {ColorPaletteProp} from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import {Theme} from "@mui/joy";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Sheet from "@mui/joy/Sheet";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {SxProps} from "@mui/system";
import {usePathname, useRouter} from "next/navigation";
import Typography from "@mui/joy/Typography";

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

    const sideNavigationButtons: SideNavigationButton[] = [
        {
            label: "Vorhersage",
            icon: <HomeOutlinedIcon />,
            isActive: pathname === "/",
            onClick: () => router.push("/"),
        },
        {
            label: "Analysen",
            icon: <AssessmentOutlinedIcon />,
            isActive: pathname === "/analysis",
            onClick: () => router.push("/analysis"),
        },
        {
            label: "Einstellungen",
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
                sx={sideNavigationContent}
            >
                <List sx={navigationButtonListContainer}>
                    {sideNavigationButtons.map((button) =>
                        <ListItemButton
                            key={button.label}
                            selected={button.isActive}
                            onClick={button.onClick}
                            sx={{
                                py: 1.5,
                                color: theme => button.isActive ? `${theme.vars.palette.primary[500]}` : "inherit",
                                fontWeight: button.isActive ? "bold" : "unset",
                            }}
                        >
                            <ListItemDecorator sx={{ color: "inherit", fontWeight: "inherit" }}>{button.icon}</ListItemDecorator>
                            <Typography
                                sx={{
                                    color: "inherit",
                                    fontWeight: "inherit",
                            }}>
                                {button.label}
                            </Typography>
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
    overflow: "auto",
    position: "sticky",
    top: 0,
    left: 0,
    bottom: 0,
}
const sideNavigationContent: SxProps<Theme> = {
    display: "grid",
    p: 2,
    borderRight: theme => `2.5px solid ${theme.vars.palette.divider}`,
    backgroundColor: theme => theme.vars.palette.background.body,
}
const navigationButtonListContainer: SxProps = {
    "--ListItem-radius": "8px",
    "--List-gap": "4px",
    flexGrow: 0,
    minWidth: 200,
}

export default SideNavigationComponent