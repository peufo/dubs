export interface DirectusFile {
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
  metadata: Metadata
}

export interface Metadata {
  ifd0: Ifd0
  exif: Exif
}

export interface Exif {
  FNumber: number
  ExposureTime: number
  FocalLength: number
  ISO: number
}

export interface Ifd0 {
  Make: string
  Model: string
}
