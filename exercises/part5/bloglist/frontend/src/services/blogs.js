import axios from 'axios'
const baseUrl = '/api/blogs'

let requestConfig = null

const setToken = newToken => {
  const token = `bearer ${newToken}`
  requestConfig = {
    headers: {Authorization: token}
  }
}

const getAll = () => {
  const request = axios.get(baseUrl, requestConfig)
  return request.then(response => response.data)
}

export default { getAll, setToken }