import { DirectusFile } from './file'

export type Collections = {
  resource: Resource
  flow: Flow
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
  name: string
  sort: null
  status: string
  user_created: string
  user_updated: null
  test: null
  files: ManyFile[]
}

export interface Flow {
  date_created: string
  date_updated: string
  descritpion: string
  id: number
  input: number
  output: number
  product: string
  user_created: string
  user_updated: string
  files: ManyFile[]
}

export interface ManyFile {
  id: number
  resource_id: number
  directus_files_id: DirectusFile
}
