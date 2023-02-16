import { publicApi } from '../base/BaseApi'

export const getUserList = async (requestUrl: string) => {
  return publicApi.post([requestUrl, {}])
}

export const getUser = async (requestUrl: string, payload = {}) => {
  return publicApi.get([requestUrl, {}], payload)
}

export const createUser = async (requestUrl: string, payload = {}) => {
  return publicApi.post([requestUrl, {}], payload)
}
