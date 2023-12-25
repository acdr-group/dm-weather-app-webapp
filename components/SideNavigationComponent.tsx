"use client";
import React, {useState} from "react";
import {ColorPaletteProp} from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import {Theme} from "@mui/joy";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Sheet from "@mui/joy/Sheet";
import {SxProps} from "@mui/system";
import {usePathname, useRouter} from "next/navigation";
import Typography from "@mui/joy/Typography";
import {useCustomNavigation} from "@/hooks/useCustomNavigation";

const SideNavigationComponent = () => {
    const { navButtons } = useCustomNavigation();

    return (
        <Box sx={sideNavigationContainer}>
            <Sheet
                variant="solid"
                color="neutral"
                sx={sideNavigationContent}
            >
                <List sx={navigationButtonListContainer}>
                    {navButtons.map((button) =>
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
                            <ListItemDecorator sx={{ color: "inherit", fontWeight: "inherit" }}>
                                <button.icon/>
                            </ListItemDecorator>
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
    display: "flex",
    "@media screen and (max-width: 1200px)": {
        display: "none",
        position: "unset",
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
    width: "100%",
}

export default SideNavigationComponent