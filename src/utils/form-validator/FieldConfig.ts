import { TErrorText, TValueType } from "./types"

type TRuleBase<TRuleName, TRuleValue> = {
  ruleName: TRuleName
  errorText?: TErrorText | null
  value: TRuleValue
}

type TRule_isRequired = TRuleBase<"isRequired", boolean>
type TRule_matches = TRuleBase<"matches", RegExp>
type TRule_maximumLength = TRuleBase<"maximumLength", number>
type TRule_minimumLength = TRuleBase<"minimumLength", number>
type TRule_prohibitedWords = TRuleBase<"prohibitedWords", string[]>
type TRule_type = TRuleBase<"type", TValueType>

type TRule = TRule_isRequired | TRule_matches | TRule_maximumLength | TRule_minimumLength | TRule_prohibitedWords | TRule_type

type TRuleRegistrationParams<TFieldRule extends TRuleBase<unknown, unknown>> = Pick<TFieldRule, "value" | "errorText">

export class FieldConfig {
  public rules: TRule[]

  constructor({ type }: { type: TValueType }) {
    this.rules = [
      {
        ruleName: "type",
        value: type,
        errorText: null,
      },
    ]
  }

  public isRequired(params: TRuleRegistrationParams<TRule_isRequired>) {
    this.rules.push({ ruleName: "isRequired", ...params })
    return this
  }

  public matches(params: TRuleRegistrationParams<TRule_matches>) {
    this.rules.push({ ruleName: "matches", ...params })
    return this
  }

  public maximumLength(params: TRuleRegistrationParams<TRule_maximumLength>) {
    this.rules.push({ ruleName: "maximumLength", ...params })
    return this
  }

  public minimumLength(params: TRuleRegistrationParams<TRule_minimumLength>) {
    this.rules.push({ ruleName: "minimumLength", ...params })
    return this
  }

  public prohibitedWords(params: TRuleRegistrationParams<TRule_prohibitedWords>) {
    this.rules.push({ ruleName: "prohibitedWords", ...params })
    return this
  }
}
