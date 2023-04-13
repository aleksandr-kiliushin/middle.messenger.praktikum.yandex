/* eslint-disable @typescript-eslint/no-explicit-any */
import { deepMergeObjects } from "./index"

describe("deepMergeObjects", () => {
  test.each<{
    object1: Record<string, any>
    object2: Record<string, any>
    output: Record<string, any>
  }>([
    {
      object1: {},
      object2: {},
      output: {},
    },
    {
      object1: { age: 20 },
      object2: {},
      output: { age: 20 },
    },
    {
      object1: {},
      object2: { age: 20 },
      output: { age: 20 },
    },
    {
      object1: { a: { b: { a: 2 } }, d: 5 },
      object2: { a: { b: { c: 1 } } },
      output: { a: { b: { a: 2, c: 1 } }, d: 5 },
    },
  ])("$output", ({ object1, object2, output }) => {
    expect(deepMergeObjects(object1, object2)).toEqual(output)
  })
})
