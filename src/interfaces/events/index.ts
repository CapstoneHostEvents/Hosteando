export interface IEventRequest {
  name: string
  description: string
  date: Date
  user?: any
}

export interface IEventResponse {
  id: string
  name: string
  description: string
  date: Date,
  created_at: Date
}