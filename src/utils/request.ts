const methodsNames = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
}

export const request = ({
  body,
  method,
  query,
  url,
}: {
  body?: Record<string, unknown>
  method: keyof typeof methodsNames
  query?: Record<string, unknown>
  url: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<{ request: XMLHttpRequest; data: any }> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      resolve({
        request: xhr,
        data: JSON.parse(xhr.response),
      })
    }

    xhr.onabort = reject
    xhr.onerror = reject
    xhr.ontimeout = reject
    xhr.timeout = 5000
    xhr.withCredentials = true

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
        xhr.open(method, url + queryString)
        xhr.send()
        break
      }
      case methodsNames.POST: {
        xhr.open(method, url)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify(body ?? {}))
        break
      }
      case methodsNames.PUT: {
        xhr.open(method, url)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify(body ?? {}))
        break
      }
      case methodsNames.DELETE: {
        xhr.open(method, url)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify(body ?? {}))
        break
      }
      default: {
        break
      }
    }
  })
}
