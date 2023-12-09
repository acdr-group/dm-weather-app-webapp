import React, {useState} from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import IconButton from "@mui/joy/IconButton";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Badge from "@mui/joy/Badge";
import {AppNotification} from "@/models/notification";
import {SxProps} from "@mui/system";
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

type PropsNotificationDrawer = {
    notifications: AppNotification[]
}
const NotificationDrawerComponent: React.FC<PropsNotificationDrawer> = (props: PropsNotificationDrawer) => {

    const [open, setOpen] = useState<boolean>(false)

    const getNotificationIcon = (notificationType: AppNotification["type"]) => {
        switch (notificationType) {
            case "info": return <InfoIcon color="info" />
            case "warning": return <WarningIcon color="warning" />
            case "error": return <WarningIcon color="error" />
            default: return <InfoIcon color="info" />
        }
    }

    return (
        <>
            <Badge badgeContent={props.notifications.length} variant="solid" color="danger" size="sm">
                <IconButton variant="soft" sx={iconButton} size="sm" onClick={() => setOpen(true)}>
                    <NotificationsOutlinedIcon fontSize="small" />
                </IconButton>
            </Badge>
            <Drawer
                size="md"
                anchor="right"
                variant="plain"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    content: {
                        sx: drawerSlot,
                    },
                }}
            >
                <Sheet sx={drawerContent}>
                    <DialogTitle>Benachrichtigungen</DialogTitle>
                    <ModalClose/>
                    <Divider sx={divider}/>
                    <DialogContent sx={dialogContent}>
                        <FormControl>
                            <Box sx={notificationListContainer}>
                                {props.notifications.map((item) => <NotificationCardComponent key={item.id} {...item}/>)}
                            </Box>
                        </FormControl>
                    </DialogContent>
                </Sheet>
            </Drawer>
        </>
    )
}

type PropsNotificationCard = AppNotification & {}
const NotificationCardComponent: React.FC<PropsNotificationCard> = (props: PropsNotificationCard) => {
    return (
        <Card sx={notificationCardItem}>
            <CardContent>
                <Stack direction={"row"} spacing={2}>
                    <Box>{props.icon}</Box>
                    <Stack spacing={1}>
                        <Stack direction="row" spacing={2}>
                            <Typography level="title-sm" sx={notificationTitle}>{props.title}</Typography>
                            <Typography level="title-sm">
                                {props.creationDate.toLocaleDateString()}
                            </Typography>
                        </Stack>
                        <Typography level="body-sm">{props.message}</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

const iconButton: SxProps = {
    borderRadius: "20%",
}
const drawerSlot: SxProps = {
    bgcolor: 'transparent',
    p: {
        md: 3,
        sm: 0
    },
    boxShadow: 'none',
}
const drawerContent: SxProps = {
    borderRadius: 'md',
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    height: '100%',
    overflow: 'auto',
}
const divider: SxProps = {
    mt: 'auto'
}
const dialogContent: SxProps = {
    gap: 2
}
const notificationListContainer: SxProps = {
    display: 'grid',
    gap: 1.5,
}
const notificationCardItem: SxProps = {
    boxShadow: 'none',
    '&:hover': { bgcolor: 'background.level1' },
}
const notificationTitle: SxProps = {
    fontWeight: "600",
    flex: 1,
}

export default NotificationDrawerComponent