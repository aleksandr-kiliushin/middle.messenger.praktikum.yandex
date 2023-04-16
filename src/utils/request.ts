import { isCurrentPathnameProtected } from "./isCurrentPathnameProtected"
import { router } from "./router"

const methodsNames = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
}

export const request = <T>({
  method,
  url,
  query,
  payload,
}: {
  method: keyof typeof methodsNames
  url: string
  query?: Record<string, unknown>
  payload?: FormData | Record<string, unknown>
}): Promise<{ request: XMLHttpRequest; data: T | null }> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      if (xhr.status === 401) {
        if (isCurrentPathnameProtected()) {
          router.go({ pathname: "/" })
        }
      }

      if (xhr.status >= 400) {
        try {
          reject({ request: xhr, data: JSON.parse(xhr.response) })
        } catch {
          reject({ request: xhr, data: null })
        }
      }

      try {
        resolve({ request: xhr, data: JSON.parse(xhr.response) })
      } catch {
        resolve({ request: xhr, data: null })
      }
    }

    xhr.onerror = reject
    xhr.ontimeout = reject
    xhr.timeout = 5000
    xhr.withCredentials = true

    let _url = "https://ya-praktikum.tech/api/v2" + url
    if (query !== undefined) {
      _url +=
        "?" +
        Object.entries(query)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
    }

    xhr.open(method, _url)

    if (payload !== undefined && !(payload instanceof FormData)) {
      xhr.setRequestHeader("Content-Type", "application/json")
    }

    switch (method) {
      case methodsNames.GET: {
        xhr.send()
        break
      }
      case methodsNames.POST:
      case methodsNames.PUT:
      case methodsNames.DELETE: {
        if (payload instanceof FormData) {
          xhr.send(payload)
        } else {
          xhr.send(JSON.stringify(payload ?? {}))
        }
        break
      }
      default: {
        break
      }
    }
  })
}
