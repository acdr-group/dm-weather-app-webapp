import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
//import './globals.css'
import '@fontsource/inter';
import {PropsWithChildren} from "react";
import ThemeRegistry from "@/app/ThemeRegistry";
import HeaderComponent from "@/components/HeaderComponent";
import {Box} from "@mui/joy";
import SideNavigationComponent from "@/components/SideNavigationComponent";
import {SxProps} from "@mui/system";
import {ApplicationContextProvider} from "@/contexts/applicationContext";

const inter = Inter({
    subsets: ['latin'],
    weight: ["100", "200", "300", "400", "500", "600"],
    adjustFontFallback: true,
})

export const metadata: Metadata = {
    title: 'Weather App dmTECH',
    description: 'Weather app dmTECH',
    applicationName: 'Weather App dmTECH',
    alternates: {
        canonical: "https://fonts.googleapis.com/icon?family=Material+Icons"
    },
}

type Props = PropsWithChildren & {}
export default function RootLayout(props: Props) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ApplicationContextProvider>
            <ThemeRegistry options={{ key: 'joy' }}>
                <Box sx={pageWrapper}>
                    <HeaderComponent/>
                    <Box sx={SideNavAndMainContent}>
                        <SideNavigationComponent/>
                        <Box component="main" sx={mainContent}>
                            <Box sx={pageContent}>{props.children}</Box>
                        </Box>
                    </Box>
                </Box>
            </ThemeRegistry>
        </ApplicationContextProvider>
        </body>
        </html>
    )
}

const pageWrapper: SxProps = {
    display: "grid",
    height: "100vh",
    gridTemplateRows: "max-content 1fr",
}
const SideNavAndMainContent: SxProps = {
    display: "grid",
    gridTemplateColumns: {
        lg: "max-content 1fr",
        xs: "1fr",
    },
    position: "sticky",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    overflow: "hidden",
}
const mainContent: SxProps = {
    display: "grid",
    justifyItems: "center",
    justifySelf: "center",
    overflow: "auto",
    height: "100%",
    width: "100%",
}
const pageContent: SxProps = {
    width: "100%",
    maxWidth: "1600px",
}