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
  timeout,
  url,
}: {
  body?: Record<string, unknown>
  method: keyof typeof methodsNames
  query?: Record<string, unknown>
  timeout?: number
  url: string
}): Promise<XMLHttpRequest> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      resolve(xhr)
    }

    xhr.onabort = reject
    xhr.onerror = reject
    xhr.ontimeout = reject
    xhr.timeout = timeout ?? 5000

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
        xhr.send(JSON.stringify(body ?? {}))
        break
      }
      case methodsNames.PUT: {
        xhr.open(method, url)
        xhr.send(JSON.stringify(body ?? {}))
        break
      }
      case methodsNames.DELETE: {
        xhr.open(method, url)
        xhr.send(JSON.stringify(body ?? {}))
        break
      }
      default: {
        break
      }
    }
  })
}
