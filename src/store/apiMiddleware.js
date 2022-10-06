import { Alert } from "react-native";
import { START_LOADING, STOP_LOADING } from "./types/loader";
import { USER_LOGOUT_SUCCESS } from "./types/home";
export const NETWORK_FAILED = "Network request failed";

export const DEV_URL = "https://url";
export const UAT_URL = "https://url";
export const API_ENDPOINT = "/api";

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  Pragma: "no-cache",
  Expires: 0,
};

async function invokeAPI(endpoint, token, config) {
  const headers = token
    ? { ...DEFAULT_HEADERS, Authorization: `Bearer ${token}` }
    : { ...DEFAULT_HEADERS };
  const updatedConfig = { ...config, headers };
  const response = await fetch(endpoint, updatedConfig);
  if (response.status === 401) {
    throw new Error(response.status);
  }
  if (response.status >= 500) {
    throw new Error("Something went wrong");
  }
  const body = await response.json();
  if (response.status >= 400) {
    const { __globals = [], code, ...errors } = body;
    //TODO: Fix this error so we can send errors from API directly.

    const [firstError] = [...Object.values(errors), ...__globals];
    if (!!code) {
      throw new Error(code);
    } else {
      throw new Error(firstError || "Something went wrong");
    }
  }
  return body;
}

export const CALL_API = "Call API";

export default (store) => (next) => async (action) => {
  if (typeof action[CALL_API] === "undefined") {
    return next(action);
  }

  let {
    url,
    method,
    types = [],
    showLoader = false,
    body = undefined,
    params,
  } = action[CALL_API];

  const [requestType, successType, errorType] = types;

  const { authReducer: auth } = store.getState();
  requestType && next({ type: requestType });
  try {
    if (showLoader) {
      next({ type: START_LOADING });
      //TODO: Dispatch show modal loader now.
    }

    const responseBody = await invokeAPI(
      auth.isUAT ? UAT_URL + API_ENDPOINT + url : DEV_URL + API_ENDPOINT + url,
      auth.token,
      {
        method,
        body: JSON.stringify(body),
      }
    );
    successType &&
      next({
        body: { ...responseBody },
        type: successType,
      });

    return responseBody;
  } catch (error) {
    if (Number(error.message) === 401) {
      next({ type: USER_LOGOUT_SUCCESS });
    } else {
      if (error.message === NETWORK_FAILED) {
        Alert.alert("", "Please check your internet connection");
      } else {
        throw error.message;
      }
    }
  } finally {
    if (showLoader) {
      next({ type: STOP_LOADING });
      //TODO: Dispatch hide modal loader now.
    }
  }
};
