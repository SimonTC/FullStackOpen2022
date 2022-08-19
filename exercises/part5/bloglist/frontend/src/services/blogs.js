import axios from 'axios'
const baseUrl = '/api/blogs'

let requestConfig = null

const setToken = newToken => {
  const token = `bearer ${newToken}`
  requestConfig = {
    headers: {Authorization: token}
  }
}

const removeToken = () => {
  requestConfig = null
}

const getAll = () => {
  const request = axios.get(baseUrl, requestConfig)
  return request.then(response => response.data)
}

const createNew = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, requestConfig)
  return response.data
}

const update = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, requestConfig)
  return response.data
}

export default { getAll, createNew, setToken, removeToken, update }