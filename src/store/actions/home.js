import { ADD_MEETING_SUCCESS, EDIT_MEETING_SUCCESS } from "../types/home";
export const addMeeting = (data) => {
  return { type: ADD_MEETING_SUCCESS, body: data };
};

export const editMeeting = (data) => {
  return { type: EDIT_MEETING_SUCCESS, body: data };
};
