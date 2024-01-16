import {usePathname, useRouter} from "next/navigation";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import React, {ComponentType} from "react";

type SideNavigationButton = {
    label: string
    icon: ComponentType
    chip?: React.ReactNode
    isActive: boolean
    onClick: () => void
}

type Output = {
    navButtons: SideNavigationButton[]
}

/**
 * Returns custom navigation buttons based on the current pathname.
 * @returns {Output} An object containing the custom navigation buttons.
 */
export const useCustomNavigation = (): Output => {
    const router = useRouter()
    const pathname = usePathname()

    const sideNavigationButtons: SideNavigationButton[] = [
        {
            label: "Vorhersage",
            icon: HomeOutlinedIcon,
            isActive: pathname === "/",
            onClick: () => router.push("/"),
        },
        {
            label: "Analysen",
            icon: AssessmentOutlinedIcon,
            isActive: pathname === "/analysis",
            onClick: () => router.push("/analysis"),
        },
        {
            label: "Einstellungen",
            icon: SettingsOutlinedIcon,
            isActive: pathname === "/settings",
            onClick: () => router.push("/settings"),
        }
    ]

    return {
        navButtons: sideNavigationButtons,
    }
}