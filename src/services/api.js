export const BASE_URL = "http://localhost:3001";

export const Recipe = {
  GET_ALL: "/recipes",
  GET_BY_ID: (id) => `/recipes/${id}`,
  DELETE: (id) => `/recipes/${id}`,
  CREATE: "/recipes",     
  UPDATE: (id) => `/recipes/${id}` 
};
