import axios from "../../utils/axios";

export const getSchedule = (page, limit) => {
  return {
    type: "GET_DATA_SCHEDULE",
    payload: axios.get(`schedule?page=${page}&limit=${limit}`)
  };
};
export const getScheduleId = (id) => {
  return {
    type: "GET_DATA_SCHEDULE",
    payload: axios.get(`schedule/${id}`)
  };
};
export const postSchedule = (form) => {
  return {
    type: "POST_SCHEDULE",
    payload: axios.post("schedule", form)
  };
};

export const patchSchedule = (id, form) => {
  return {
    type: "UPDATE_SCHEDULE",
    payload: axios.patch(`schedule/${id}`, form)
  };
};

export const deleteSchedule = (id) => {
  return {
    type: "DELETE_SCHEDULE",
    payload: axios.patch(`schedule/${id}`)
  };
};
