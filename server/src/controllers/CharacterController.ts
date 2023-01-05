import type { Character, StarterCredential } from '../content/types'

import { Get, JsonController, NotFoundError, Param } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import characters from '../content/Characters'

import { CredDefService } from './CredDefService'

@JsonController('/characters')
@Service()
export class CharacterController {
  @Inject()
  private service: CredDefService

  public constructor(service: CredDefService) {
    this.service = service
  }

  private getCreds = (initCreds: Record<number, StarterCredential>) => {
    const lol: Record<number, StarterCredential> = {}
    Object.entries(initCreds).forEach((entry) => {
      const [key, x] = entry
      const index = parseInt(key)
      lol[index] = {
        ...x,
        credentialDefinitionId: this.service.getCredentialDefinitionIdByTag(x.name),
      }
    })
    return lol
  }

  /**
   * Retrieve character by id
   */
  @Get('/:characterId')
  public async getCharacterById(@Param('characterId') characterId: string) {
    const character = characters.find((x) => x.id === characterId)

    if (!character) {
      throw new NotFoundError(`character with characterId "${characterId}" not found.`)
    }

    character.starterCredentials = this.getCreds(character.starterCredentials)
    return character
  }

  /**
   * Retrieve all characters
   */
  @Get('/')
  public async getCharacters() {
    const arr: Character[] = []
    characters.forEach((char) => {
      arr.push({
        ...char,
        starterCredentials: this.getCreds(char.starterCredentials),
      })
    })
    return arr
  }
}
