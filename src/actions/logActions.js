import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
} from "./types";

// export const getLogs = () => {
//   return async (dispatch /* , getState */) => {
//     setLoading();
//     const res = await fetch("/logs");
//     const data = await res.json();

//     dispatch({
//       type: GET_LOGS,
//       payload: data,
//     });
//   };
// };

// GET LOGS FROM SERVER
export const getLogs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch("/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};

// ADD NEW LOG TO THE DB
export const addLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};

// DELETE LOG FORM DB
export const deleteLog = id => async dispatch => {
  try {
    setLoading();
    await fetch(`/logs/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};

// SET LOADING TO TRUE
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
