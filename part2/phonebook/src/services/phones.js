import axios from "axios";

const baseUrl = "/api/persons";
//

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((resp) => resp.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((resp) => resp.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((resp) => resp.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((resp) => resp.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  deletePerson,
  update,
};
