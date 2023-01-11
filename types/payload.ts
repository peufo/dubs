export type ValueWithRelation = {
  relationTo: string
  value: string | number
}

export interface FileInterface {
  id: string
  storage: string
  filename_disk: string
  filename_download: string
  title: string
  type: string
  folder: string
  uploaded_by: string
  uploaded_on: string
  modified_by: string
  modified_on: string
  charset: null
  filesize: number
  width: number
  height: number
  duration: null
  embed: null
  description: null
  location: null
  tags: null
}
