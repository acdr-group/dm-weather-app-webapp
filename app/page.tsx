"use client"
import {Box, FormControl, FormLabel, Input} from "@mui/joy";
import {SxProps} from "@mui/system";
import React, {useState} from "react";
import WeatherDataOverviewComponent from "@/components/WeatherDataOverviewComponent";
import PageLayoutComponent from "@/components/shared/PageLayoutComponent";
import {START_DATE_STAMP_OF_BACKWARDS_DELIVERY_OF_DATA} from "@/contexts/applicationContext";

const INITIAL_TIMESTAMP = START_DATE_STAMP_OF_BACKWARDS_DELIVERY_OF_DATA

export type ListEntry = {
    icon: any
    value: number
    unit: string
}
export type TemperaturesForPeriodsOfTheDay = {
    dayPeriod: string
    value: number
    unit: string
}
export type KeyValue = ListEntry & {
    title: string
    description: string
}
export default function Home() {

    const [selectedDate, setSelectedDate] = useState<string>(INITIAL_TIMESTAMP)

    return (
        <PageLayoutComponent title={"Vorhersage"}>
            <FormControl size="sm" sx={dateInput}>
                <FormLabel>Datum</FormLabel>
                <Input
                    type="date"
                    defaultValue={new Date(selectedDate).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}
                    placeholder="Datum auswählen"
                    size="md"
                    slotProps={{
                        input: {
                            min: "2022-09-07T00:00",
                            max: "2022-09-31T00:00",
                        },
                    }}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </FormControl>
            <WeatherDataOverviewComponent selectedDate={new Date(selectedDate)}/>
        </PageLayoutComponent>
    )
}

const dateInput: SxProps = {
    width: {
        lg: "300px",
        xs: "100%",
    },
    justifySelf: "start",
}
