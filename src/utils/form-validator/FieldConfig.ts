import { TErrorText, TValueType } from "./types"

interface IFieldConfigParameter<TValue> {
  errorText?: TErrorText | null
  value: TValue
}

type TFieldConfig = {
  isRequired: IFieldConfigParameter<boolean>
  matches: IFieldConfigParameter<RegExp>
  maximumLength: IFieldConfigParameter<number>
  minimumLength: IFieldConfigParameter<number>
  prohibitedWords: IFieldConfigParameter<string[]>
  type: IFieldConfigParameter<TValueType>
}

export class FieldConfig {
  public config: TFieldConfig

  constructor({ type }: { type: TValueType }) {
    this.config = {
      isRequired: { errorText: null, value: false },
      matches: { errorText: "", value: /.*/ },
      maximumLength: { errorText: null, value: Infinity },
      minimumLength: { errorText: null, value: 0 },
      prohibitedWords: { errorText: null, value: [] },
      type: { errorText: null, value: type },
    }
  }

  public isRequired(params: TFieldConfig["isRequired"]) {
    this.config.isRequired = params
    return this
  }

  public matches(params: TFieldConfig["matches"]) {
    this.config.matches = params
    return this
  }

  public maximumLength(params: TFieldConfig["maximumLength"]) {
    this.config.maximumLength = params
    return this
  }

  public minimumLength(params: TFieldConfig["minimumLength"]) {
    this.config.minimumLength = params
    return this
  }

  public prohibitedWords(params: TFieldConfig["prohibitedWords"]) {
    this.config.prohibitedWords = params
    return this
  }
}
