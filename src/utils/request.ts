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
  payload?: Record<string, unknown>
}): Promise<{ request: XMLHttpRequest; data: T | null }> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
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

    const _url = "https://ya-praktikum.tech/api/v2" + url

    switch (method) {
      case methodsNames.GET: {
        let queryString = ""
        if (query !== undefined) {
          queryString =
            "?" +
            Object.entries(query)
              .map(([key, value]) => `${key}=${value}`)
              .join("&")
        }
        xhr.open(method, _url + queryString)
        xhr.send()
        break
      }
      case methodsNames.POST: {
        xhr.open(method, _url)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify(payload ?? {}))
        break
      }
      case methodsNames.PUT: {
        xhr.open(method, _url)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify(payload ?? {}))
        break
      }
      case methodsNames.DELETE: {
        xhr.open(method, _url)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify(payload ?? {}))
        break
      }
      default: {
        break
      }
    }
  })
}
