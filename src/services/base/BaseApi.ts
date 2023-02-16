import { createAPI } from "./Rest"

export const config = {
  apiEndpoint: 'http://127.0.0.1:8000'
}

export const getAccessToken = () => {
  const storage = sessionStorage.getItem(
    `user_id`
  )
  if (!storage) {
    return
  }
  return JSON.parse(storage)["access_token"]
}

/* Creating a public API that is used to make requests to the backend. */
export const publicApi = createAPI({
  baseUrl: config.apiEndpoint,
  requestInit: {
    headers: {
      "Content-Type": "application/json",
    },
  },
})

/* Creating a private API that is used to make requests to the backend. */
export const privateApi = createAPI({
  baseUrl: config.apiEndpoint,
  acquireAccessToken: getAccessToken,
  requestInit: {
    headers: {
      "Content-Type": "application/json",
    },
  },
})