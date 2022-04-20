import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data)
}

const create = (newContact) => {
  const request = axios.post(baseUrl, newContact)
  return request.then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (updatedContact) => {
  const request = axios.put(`${baseUrl}/${updatedContact.id}`, updatedContact)
  return request.then(response => response.data)
}

export default {getAll, create, remove, update}