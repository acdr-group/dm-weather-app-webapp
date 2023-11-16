export interface AppNotification {
    id: string
    message: string
    title: string
    type?: "info" | "warning" | "error"
    creationDate: Date
}