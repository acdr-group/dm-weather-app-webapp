"use client"
import React, {useState} from 'react';
import {ColorPaletteProp} from '@mui/joy/styles';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import {SxProps} from "@mui/system";
import CompanyLogoComponent from "@/components/shared/CompanyLogoComponent";

const HeaderComponent: React.FC = () => {
    const [color, setColor] = useState<ColorPaletteProp>('primary')

    return (
        <Sheet
            variant="solid"
            color={color}
            invertedColors
            sx={headerContainer}
        >
            <CompanyLogoComponent/>
            <Input
                placeholder="Search"
                variant="soft"
                size="md"
                startDecorator={<SearchIcon fontSize="small"/>}
                sx={searchInput}
            />
            <Box sx={iconListContainer}>
                <IconButton sx={iconButton} size="sm">
                    <FullscreenIcon fontSize="small"/>
                </IconButton>
                <Badge badgeContent={2} variant="solid" color="danger" size="sm">
                    <IconButton variant="soft" sx={iconButton} size="sm">
                        <NotificationsOutlinedIcon fontSize="small" />
                    </IconButton>
                </Badge>
            </Box>
        </Sheet>
    )
}

const headerContainer: SxProps = {
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
    background: (theme: any) =>
        `linear-gradient(to top, ${theme["vars"].palette["primary"][600]}, ${theme["vars"].palette["primary"][500]})`,
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
const iconButton: SxProps = {
    borderRadius: "20%",
}

export default HeaderComponent
