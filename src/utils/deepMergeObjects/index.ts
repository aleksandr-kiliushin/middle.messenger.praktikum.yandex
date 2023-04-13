/* eslint-disable @typescript-eslint/no-explicit-any */

export const deepMergeObjects = <T extends Record<string, any>>(object1: T, object2: T): T => {
  const result: Record<string, any> = {}

  for (const key of Object.keys(object1)) {
    if (key in object2) {
      if (typeof object1[key] === "object" && typeof object2[key] === "object") {
        result[key] = deepMergeObjects(object1[key], object2[key])
      } else {
        result[key] = object2[key]
      }
    } else {
      result[key] = object1[key]
    }
  }

  for (const key of Object.keys(object2)) {
    if (!(key in object1)) {
      result[key] = object2[key]
    }
  }

  return result as T
}
