export interface IEventRequest {
  name: string
  description: string
  date: Date
  user?: any
}

export interface IEventResponse {
  name: string
  description: string
  date: Date
}