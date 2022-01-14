import {compile} from "path-to-regexp"

export function reverse(pattern, params = {}) {
  try {
    return compileWithParams(pattern, params)
  } catch (err) {
    return pattern
  }
}

function compileWithParams(pattern, params = {}) {
  const reversed = compile(pattern)

  return reversed(params)
}

export const getApiUrl = (endpoint) => {
  //const baseApiUrl = 'http://localhost:8080/cloud-endpoint';
  const baseApiUrl = 'https://filecloud-back.azuremicroservices.io/cloud-endpoint';
  return `${baseApiUrl}${endpoint}`;
};