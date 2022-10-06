import { ADD_MEETING_SUCCESS, EDIT_MEETING_SUCCESS } from "../types/home";

const initialState = {
  meetings: [],
  timeArr: [],
};

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MEETING_SUCCESS: {
      const data = action.body;
      const arr = state.meetings;
      let len = arr.length;
      if (len > 0) {
        if (len === 1 && data.startTime < arr[len - 1].startTime) {
          return {
            meetings: [data, ...state.meetings],
            timeArr: [data.startTime, ...state.timeArr],
          };
        }
        let indexVal;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].startTime > data.startTime) {
            indexVal = arr[i];
            break;
          }
        }
        if (!indexVal) {
          return {
            meetings: [...state.meetings, data],
            timeArr: [...state.timeArr, data.startTime],
          };
        }
        let indexToSplit = arr.indexOf(indexVal);
        let first = arr.slice(0, indexToSplit);
        let second = arr.slice(indexToSplit);
        return {
          meetings: [...first, data, ...second],
          timeArr: [...state.timeArr, data.startTime],
        };
      } else {
        return {
          meetings: [...state.meetings, data],
          timeArr: [...state.timeArr, data.startTime],
        };
      }
    }
    case EDIT_MEETING_SUCCESS: {
      const data = action.body;

      let tempArr = [...state.meetings];
      tempArr[data.selectedIndex] = data;
      return { ...state, meetings: tempArr };
    }
    default:
      return state;
  }
}
