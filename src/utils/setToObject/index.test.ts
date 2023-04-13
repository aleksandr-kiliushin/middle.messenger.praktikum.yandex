/* eslint-disable @typescript-eslint/no-explicit-any */
import { setToObject } from "./index"

describe("setToObject", () => {
  test.each<{
    object: Record<string, any>
    keyPath: string
    value: any
    output: Record<string, any>
  }>([
    {
      object: {},
      keyPath: "age",
      value: 20,
      output: { age: 20 },
    },
    {
      object: { author: { name: "John" } },
      keyPath: "author.age",
      value: 20,
      output: { author: { age: 20, name: "John" } },
    },
    {
      object: { name: "John", age: 30, hobbies: ["reading", "swimming"] },
      keyPath: "hobbies.1",
      value: "travelling",
      output: { name: "John", age: 30, hobbies: ["reading", "travelling"] },
    },
    {
      object: {
        product: {
          name: "Smartphone",
          price: 500,
          details: { brand: "Samsung", model: "Galaxy S21" },
        },
      },
      keyPath: "product.details.brand",
      value: "Apple",
      output: {
        product: {
          name: "Smartphone",
          price: 500,
          details: { brand: "Apple", model: "Galaxy S21" },
        },
      },
    },
    {
      object: {
        country: "USA",
        states: {
          CA: { name: "California", capital: "Sacramento" },
          NY: { name: "New York", capital: "Albany" },
        },
      },
      keyPath: "states.NY.capital",
      value: "New York City",
      output: {
        country: "USA",
        states: {
          CA: { name: "California", capital: "Sacramento" },
          NY: { name: "New York", capital: "New York City" },
        },
      },
    },
  ])("$keyPath", ({ object, keyPath, value, output }) => {
    expect(setToObject({ object, keyPath, value })).toEqual(output)
  })
})
