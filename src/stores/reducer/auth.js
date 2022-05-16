const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  pageInfo: {},
  msg: ""
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    }
    case "REGISTER_USER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg
      };
    }
    case "REGISTER_USER_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
