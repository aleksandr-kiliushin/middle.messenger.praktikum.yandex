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
    {
      object1: { foo: { bar: 1 }, baz: 2 },
      object2: { foo: { qux: 3 }, quux: 4 },
      output: { foo: { bar: 1, qux: 3 }, baz: 2, quux: 4 },
    },
    {
      object1: { foo: { bar: 1, baz: { qux: 2 } }, quux: 3 },
      object2: { foo: { baz: { quux: 3 } }, quux: 4 },
      output: { foo: { bar: 1, baz: { qux: 2, quux: 3 } }, quux: 4 },
    },
    {
      object1: { foo: { bar: [1, 2, 3] } },
      object2: { foo: { bar: [4, 5] } },
      output: { foo: { bar: [4, 5, 3] } },
    },
  ])("$object1 and $object2", ({ object1, object2, output }) => {
    expect(deepMergeObjects(object1, object2)).toEqual(output)
  })
})
