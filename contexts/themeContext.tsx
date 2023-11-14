"use client"
import {Theme} from "@mui/joy";
import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {CssVarsProvider, extendTheme, useTheme} from "@mui/joy/styles";
import amberTheme, {customThemes} from "@/theme/customThemes";

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

    const theme = useTheme()
    const [customThemeItem, setCustomThemeItem] = useState<ThemeItem>(customThemes.find(t => t.name === "Deep purple")!)

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