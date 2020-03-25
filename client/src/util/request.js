// import { API_BASE_URL } from "../constant";

export const requestAPI = async(options) => {
  const apiBaseUrl = process.env.REACT_APP_REMOTE_SERVER + "/api";

  const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json"
  });

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return requestBase({
    url: apiBaseUrl + options.url,
    options
  });
};

export const requestBase = async(options) => {
  // const headers = new Headers({
  //   "Content-Type": "application/x-www-form-urlencoded"
  // });

  // const defaults = { headers: headers };
  // options = Object.assign({}, defaults, options);

  const response = await fetch(options.url, options);
  const json = await response.json();

  if (!response.ok) {
    console.log(response);
    throw(json);
  }

  return json;
}
