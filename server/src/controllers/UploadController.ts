import axios from 'axios'
import { Body, JsonController, Post, UploadedFile } from 'routing-controllers'
import { Service } from 'typedi'

export const apiCall = axios.create({ baseURL: 'http://localhost:5000' })

@JsonController('/uploadCharacter')
@Service()
export class UploadController {
  @Post('/')
  public async uploadCharacters(@UploadedFile('File') file: any) {
    const uploadedCharacters = JSON.parse(file.buffer.toString())
    return uploadedCharacters
  }
}
