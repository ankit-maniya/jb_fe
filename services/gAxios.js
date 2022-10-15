import axios from "axios";
import constants from "../static/global";
import { handleResponseError } from "./utils";

const gAxios = axios.create({
  baseURL: constants.apiUrl,
});

gAxios.CancelToken = axios.CancelToken;
gAxios.isCancel = axios.isCancel;

gAxios.interceptors.request.use(async (config) => {
  const authToken = localStorage.getItem("token");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

gAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (gAxios.isCancel(error)) {
      error.message = "Aborted";
      throw Error(error);
    }

    let response = {};
    if (error.response) {
      response = error.response;
    } else if (error.request) {
      response = {
        data: {
          type: "error",
          message: error.responseText || error.message,
        },
      };
    } else {
      response = {
        data: {
          type: "error",
          message: error.message,
        },
      };
    }

    await handleResponseError(response);
  }
);

export default gAxios;
