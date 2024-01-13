"use client"
import {Theme} from "@mui/joy";
import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {CssVarsProvider, useTheme} from "@mui/joy/styles";
import {customThemes} from "@/theme/customThemes";

export type ThemeItem = {
    name: string
    value: Theme,
}

type ContextOutput = {
    currentTheme: ThemeItem
    setThemeByThemeName: (color: string) => void
}

// @ts-ignore
const ThemeContext = createContext<ContextOutput>({})

type ContextInput = PropsWithChildren & {}

export const useCustomThemeContext = (): ContextOutput => {
    return useContext(ThemeContext)
}
export const CustomThemeContextProvider: React.FC<ContextInput> = (props: ContextInput) => {
    const initialColor = localStorage.getItem("dm-weather-color-scheme")
    const initialTheme =  customThemes.find(t => t.name === initialColor) ?? customThemes.find(t => t.name === "Deep purple")
    const [customThemeItem, setCustomThemeItem] = useState<ThemeItem>(initialTheme!)

    useEffect(() => {
        if (!localStorage.getItem("dm-weather-color-scheme")) return
        const colorSchemeName = localStorage.getItem("dm-weather-color-scheme") as string
        const colorScheme = customThemes.find(t => t.name === colorSchemeName)
        if (!colorScheme) return
        updateTheme(colorSchemeName)
    }, [])

    useEffect(() => {
        localStorage.setItem("dm-weather-color-scheme", customThemeItem.name)
    }, [customThemeItem]);

    const updateTheme = (color: string) => {
        const customThemeItemFound = customThemes.find(t => t.name === color)!
        setCustomThemeItem(customThemeItemFound)
    }

    return (
        <ThemeContext.Provider value={{
            currentTheme: customThemeItem,
            setThemeByThemeName: updateTheme,
        }}>
            <CssVarsProvider
                theme={customThemeItem?.value}
            >
                {props.children}
            </CssVarsProvider>
        </ThemeContext.Provider>
    )
}