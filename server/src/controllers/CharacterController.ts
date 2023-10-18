import type { CustomCharacter } from '../content/types'

import { Get, JsonController, NotFoundError, Param, QueryParam } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import characters from '../content/Characters'

@JsonController('/characters')
@Service()
export class CharacterController {
  /**
   * Retrieve character by id
   */
  @Get('/:characterId')
  public async getCharacterById(@Param('characterId') characterId: string, @QueryParam('showHidden') showHidden?: boolean) {
    const character = characters.find((x) => x.type === characterId)

    if (!character) {
      throw new NotFoundError(`character with characterId "${characterId}" not found.`)
    }

    return {...character, useCases: showHidden ? character.useCases : character.useCases.filter(useCase => !useCase.hidden)}
  }

  /**
   * Retrieve all characters
   */
  @Get('/')
  public async getCharacters(@QueryParam('showHidden') showHidden?: boolean) {
    const arr: CustomCharacter[] = []
    characters.forEach((char) => {
      const charHiddenUseCases: CustomCharacter = { ...char, useCases: showHidden ? char.useCases : char.useCases.filter(useCase => !useCase.hidden) }
      arr.push({
        ...charHiddenUseCases,
      })
    })
    return arr
  }
}
