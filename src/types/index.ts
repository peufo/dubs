export type Collections = {
  resource: Resource
}

export type Location = {
  coordinates: number[]
  type: string
}

export type Resource = {
  date_created: string
  date_updated: null
  decription: string
  id: number
  location: Location
  name: null
  sort: null
  status: string
  user_created: string
  user_updated: null
  test: null
}
