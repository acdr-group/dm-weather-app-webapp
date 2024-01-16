"use client";
import * as React from "react";
import Drawer from "@mui/joy/Drawer";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import {Theme} from "@mui/joy";
import {SxProps} from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import {useCustomNavigation} from "@/hooks/useCustomNavigation";

/**
 * Creates a navigation drawer component.
 *
 * @returns {ReactElement} The navigation drawer component.
 */
export default function NavigationDrawer() {
    const [open, setOpen] = React.useState(false);
    const { navButtons } = useCustomNavigation();

    return (
        <React.Fragment>
            <IconButton
                variant="outlined"
                color="neutral"
                sx={drawerButton}
                onClick={() => setOpen(true)}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                size="md"
                variant="plain"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    content: {
                        sx: {
                            backgroundColor: "transparent",
                            px: 1,
                            p: 2,
                            boxShadow: "none",
                        },
                    },
                }}
            >
                <Sheet
                    sx={{
                        borderRadius: "md",
                        p: 2,
                        display: "grid",
                        gap: 2,
                        height: "100%",
                        width: "100%",
                        overflow: "auto",
                    }}
                >
                    <List sx={navigationButtonListContainer} onClick={() => setOpen(false)}>
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
            </Drawer>
        </React.Fragment>
    );
}

const drawerButton: SxProps = {
    "@media screen and (min-width: 1200px)": {
        display: "none",
    }
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