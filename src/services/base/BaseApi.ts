import { Config, ContentType } from "./Contants"
import { createAPI } from "./Rest"

export const getAccessToken = () => {
  const storage = sessionStorage.getItem(
    `user_id`
  )
  if (!storage) {
    return
  }
  return JSON.parse(storage)["access_token"]
}

export const publicApi = createAPI({
  baseUrl: Config.ApiEndpoint,
  requestInit: {
    headers: {
      [Config.ContentTypeKey]: ContentType.Json,
    },
  },
})

export const privateApi = createAPI({
  baseUrl: Config.ApiEndpoint,
  acquireAccessToken: getAccessToken,
  requestInit: {
    headers: {
      [Config.ContentTypeKey]: ContentType.Json,
    },
  },
})