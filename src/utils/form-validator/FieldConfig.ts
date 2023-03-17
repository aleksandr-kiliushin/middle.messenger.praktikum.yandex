import { TValueType } from "./types"

type TFieldConfig = {
  isRequired: boolean
  maximumLength: number
  minimumLength: number
  prohibitedWords: string[]
  type: TValueType
}

export class FieldConfig {
  public config: TFieldConfig

  constructor({ type }: { type: TValueType }) {
    this.config = {
      isRequired: false,
      maximumLength: Infinity,
      minimumLength: 0,
      prohibitedWords: [],
      type,
    }
  }

  public maximumLength(length: number) {
    this.config.maximumLength = length
    return this
  }

  public minimumLength(length: number) {
    this.config.minimumLength = length
    return this
  }

  public prohibitedWords(words: string[]) {
    this.config.prohibitedWords = words
    return this
  }

  public isRequired() {
    this.config.isRequired = true
    return this
  }
}