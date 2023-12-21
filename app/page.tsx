"use client"
import React, {ReactNode} from "react";
import WeatherDataOverviewComponent from "@/components/WeatherDataOverviewComponent";
import PageLayoutComponent from "@/components/shared/PageLayoutComponent";
import {useFullScreen} from "@/hooks/useFullScreen";

export type ListEntry = {
    icon: any
    value: ReactNode
    unit: string
}
export type TemperaturesForPeriodsOfTheDay = {
    dayPeriod: string
    value: number
    unit: string
}
export type KeyValue = ListEntry & {
    title: string
    description?: string
}
export default function Home() {

    const { isFullScreen } = useFullScreen()

    return (
        <PageLayoutComponent title={isFullScreen ? undefined : "Vorhersage"}>
            <WeatherDataOverviewComponent />
        </PageLayoutComponent>
    )
}