/* eslint-disable @typescript-eslint/no-explicit-any */
import { deepMergeObjects } from "@utils/deepMergeObjects"

export const setToObject = ({ object, keyPath, value }: { object: Record<string, any>; keyPath: string; value: any }) => {
  const result = keyPath.split(".").reduceRight((acc, key) => {
    return { [key]: acc }
  }, value)
  return deepMergeObjects(object, result)
}
