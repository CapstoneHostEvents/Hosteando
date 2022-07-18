export interface IEventResponse {
  name: string
  description: string
  date: Date
}

export interface IEventRequest extends IEventResponse {
  user?: any
}

export interface IEventUpdateResponse {
  name?: string
  description?: string
  date?: Date
  user?: any
}

export interface IEventUpdate extends IEventUpdateResponse{
  id?: any
}