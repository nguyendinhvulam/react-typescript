type Options = {
  baseUrl: string,
  acquireAccessToken?: () => string | undefined,
  requestInit: RequestInit,
  authorizationHeader: string,
  authorizationMethod: string
}

export enum ContentType {
  Json = "application/json",
  Multipart = "multipart/form-data",
  FormUrlEncoded = "application/x-www-form-urlencoded"
}

export const contentTypeKey = "Content-Type"

const buildQueryString = <P extends Record<string, any>>(prefix: string, resource: string | [string, P]) => {
  const endpoint = Array.isArray(resource) ? resource[0] : resource
  const params = Array.isArray(resource) ? resource[1] : undefined
  return `${prefix}/${endpoint}`
  // return urlcat(prefix, endpoint, params || {})
}

const getBody = (contentType: string = ContentType.Json, body?: null) => {
  if (!body) return

  switch (contentType) {
    case ContentType.Json:
      return JSON.stringify(body)
    case ContentType.Multipart:
      const formData = new FormData()
      Object.keys(body).forEach((prop) => {
        const value = (body as any)[prop]
        formData.append(prop, value)
      })
      return formData
    case ContentType.FormUrlEncoded:
      return JSON.stringify(body)
    default:
      return body
  }
}

const defaultOpts: Options = {
  baseUrl: "/",
  requestInit: {},
  authorizationHeader: "Authorization",
  authorizationMethod: "Bearer",
}

export const createAPI = (initOpts: Partial<Options> = {}) => {
  const { baseUrl, authorizationHeader, authorizationMethod } = { ...defaultOpts, ...initOpts } as Options

  async function request<P extends Record<string, any>>(resource: string | [string, P], options?: RequestInit): Promise<undefined> {
    let token

    let requestInit = { ...initOpts.requestInit, ...options }

    if (initOpts.acquireAccessToken) {
      token = initOpts.acquireAccessToken()
      if (token) {
        requestInit = {
          ...requestInit,
          ...{
            headers: {
              [authorizationHeader]: `${authorizationMethod} ${token}`.trim(),
            }
          }
        }
      }
    }

    const headers = new Headers(requestInit?.headers)

    if (!headers.has(contentTypeKey)) {
      headers.set(contentTypeKey, ContentType.Json)
    }

    const body = getBody(
      headers.get(contentTypeKey) || undefined,
      requestInit?.body as any
    )

    if (headers.get(contentTypeKey) === ContentType.Multipart) {
      headers.delete(contentTypeKey)
    }

    return new Promise<undefined>((resolve, reject) =>
      fetch(buildQueryString(baseUrl, resource), {
        ...requestInit,
        headers,
        body,
      })
        .then(async (response) => {
          if (response.status < 400) {
            return resolve(
              response.status === 204 ? undefined : await response.json()
            )
          }
          const error = await response.json()
          if (error) {
            return reject(error)
          }
          if (error.status >= 400 && error.status < 500 && error.message) {
            throw new Error(error.status, error.message)
          } else {
            throw new Error(error.status, response.statusText as any)
          }
        })
        .catch((error) => {
          reject(new Error(error.status || 500, error.message))
        })
    )
  }

  return {
    request,

    async get<R, P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], options?: RequestInit) {
      return request(resource, { ...options, ...{ method: "GET" } })
    },

    async post<R, T = unknown, P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], body?: T, options?: RequestInit) {
      return request(
        resource,
        {
          ...options,
          ...{
            method: "POST",
            body: body as any,
          }
        }
      )
    },

    async put<R, T = unknown, P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], body?: T, options?: RequestInit) {
      return request(
        resource,
        {
          ...options,
          ...{
            method: "PUT",
            body: body as any,
          }
        }
      )
    },

    async patch<R, T = unknown, P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], body?: T, options?: RequestInit) {
      return request(
        resource,
        {
          ...options,
          ...{
            method: "PATCH",
            body: body as any,
          }
        }
      )
    },

    async delete<R, P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], options?: RequestInit) {
      return request(
        resource,
        {
          ...options, ...{
            method: "DELETE",
          }
        }
      )
    },

    async upload<R, T = unknown, P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], body?: T, options?: RequestInit) {
      if (!body) {
        return Promise.reject(new Error("Upload body is empty"))
      }

      return this.put<R>(resource, body, {
        ...options,
        ...{
          headers: {
            [contentTypeKey]: ContentType.Multipart,
          },
        }
      }
      )
    },
  }
}
