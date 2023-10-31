import axios from "axios";
import { server } from "../index";

export const homeHouses =
  (keyword = "", page = 1, price = [0, 200000000], type) =>
  async (dispatch) => {
    try {
      dispatch({ type: "HOME_HOUSES_REQUEST" });

      let link = `${server}/house/filter?page=${page}&search=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (type) {
        link = `${server}/house/filter?page=${page}&type=${type}&search=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }

      const { data } = await axios.get(link, {
        withCredentials: true,
      });

      dispatch({ type: "HOME_HOUSES_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "HOME_HOUSES_FAIL",
        payload: error.response.data.message,
      });
    }
  };

export const houseDetails = (houseId) => async (dispatch) => {
  try {
    dispatch({ type: "HOUSE_DETAILS_REQUEST" });

    const { data } = await axios.get(`${server}/house/${houseId}`, {
      withCredentials: true,
    });

    dispatch({ type: "HOUSE_DETAILS_SUCCESS", payload: data.house });
  } catch (error) {
    dispatch({
      type: "HOUSE_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const createHouse = (houseData) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_HOUSE_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/house/create`,
      houseData,
      config
    );

    dispatch({ type: "CREATE_HOUSE_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "CREATE_HOUSE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getBrokerHouses = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_BROKER_HOUSES_REQUEST" });

    const { data } = await axios.get(`${server}/getloggedinuserhouses`, {
      withCredentials: true,
    });

    dispatch({ type: "GET_BROKER_HOUSES_SUCCESS", payload: data.houses });
  } catch (error) {
    dispatch({
      type: "GET_BROKER_HOUSES_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteHouse = (houseId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_HOUSE_REQUEST" });

    const { data } = await axios.delete(`${server}/house/${houseId}`, {
      withCredentials: true,
    });

    dispatch({ type: "DELETE_HOUSE_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "DELETE_HOUSE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const updateHouse = (houseId, houseData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_HOUSE_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/house/${houseId}`,
      houseData,
      config
    );

    dispatch({ type: "UPDATE_HOUSE_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_HOUSE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" });
};
