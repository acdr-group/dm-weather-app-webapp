export interface SensorMeasurement {
    id: number,
    avg: number,
    max: number,
    min: number,
    name: string,
    unit: string,
    values: number[],
    description: string,
    max_abs: number,
    min_abs: number,
    the_sums: number,
    public_name: string,
    running_sum: number[]
}

export interface SensorMeasurementWithTimestamps {
    sensorMeasurements: SensorMeasurement[]
    time: string[]
}