import { deepmerge } from "deepmerge-ts"
import urlcat from 'urlcat'
import { Config, ContentType } from "./Contants"

type Options = {
  baseUrl: string,
  acquireAccessToken?: () => string | undefined,
  requestInit: RequestInit,
  authorizationHeader: string,
  authorizationMethod: string
}

const buildQueryString = <P extends Record<string, any>>(prefix: string, resource: string | [string, P]) => {
  const endpoint = Array.isArray(resource) ? resource[0] : resource
  const params = Array.isArray(resource) ? resource[1] : undefined
  return urlcat(prefix, endpoint, params || {})
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
  const { baseUrl, authorizationHeader, authorizationMethod } = deepmerge(defaultOpts, initOpts) as Options

  async function request<P extends Record<string, any>>(resource: string | [string, P], options?: RequestInit): Promise<undefined> {
    let token

    if (initOpts.acquireAccessToken) {
      token = initOpts.acquireAccessToken()
    }

    const requestInit = deepmerge(
      initOpts.requestInit,
      token && {
        headers: {
          [authorizationHeader]: `${authorizationMethod} ${token}`.trim(),
        },
      },
      options
    )

    const headers = new Headers(requestInit?.headers)

    if (!headers.has(Config.AcceptKey)) {
      headers.set(Config.AcceptKey, ContentType.Json)
    }

    if (!headers.has(Config.ContentTypeKey)) {
      headers.set(Config.ContentTypeKey, ContentType.Json)
    }

    const body = getBody(
      headers.get(Config.ContentTypeKey) || undefined,
      requestInit?.body as any
    )

    if (headers.get(Config.ContentTypeKey) === ContentType.Multipart) {
      headers.delete(Config.ContentTypeKey)
    }

    return new Promise<undefined>((resolve, reject) =>
      fetch(buildQueryString(baseUrl, resource), {
        ...requestInit,
        headers,
        body,
      }).then(async (response) => {
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
      }).catch((error) => {
        reject(new Error(error.status || 500, error.message))
      })
    )
  }

  return {
    request,

    async get<P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], options?: RequestInit) {
      return request(
        resource,
        deepmerge(
          options,
          {
            method: "GET"
          }
        )
      )
    },

    async post<T = unknown, P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], body?: T, options?: RequestInit) {
      return request(
        resource,
        deepmerge(
          options,
          {
            method: "POST",
            body: body as any
          }
        )
      )
    },

    async put<T = unknown, P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], body?: T, options?: RequestInit) {
      return request(
        resource,
        deepmerge(
          options,
          {
            method: "PUT",
            body: body as any
          }
        )
      )
    },

    async patch<T = unknown, P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], body?: T, options?: RequestInit) {
      return request(
        resource,
        deepmerge(
          options,
          {
            method: "PATCH",
            body: body as any
          }
        )
      )
    },

    async delete<P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], options?: RequestInit) {
      return request(
        resource,
        deepmerge(
          options,
          {
            method: "DELETE"
          }
        )
      )
    },

    async upload<T = unknown, P extends Record<string, any> = Record<string, any>>(resource: string | [string, P], body?: T, options?: RequestInit) {
      if (!body) {
        return Promise.reject(new Error("Upload body is empty"))
      }

      return this.put(
        resource,
        body,
        deepmerge(
          options,
          {
            headers: {
              [Config.ContentTypeKey]: ContentType.Multipart
            }
          }
        )
      )
    },
  }
}
