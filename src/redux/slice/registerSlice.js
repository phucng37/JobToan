/* eslint-disable default-case */
// export type State = {
//   isRegisterStatus: boolean;
//   isRegisterDone: boolean;
//   phone: string;
//   password: string;
//   firstName: string;
//   lastName: string;
// };

const initState = {
  isRegisterStatus: false,
  isRegisterDone: true,
  phone: "",
  password: "",
  firstName: "",
  lastName: "",
  address: ''
};

export const START_REGISTER = "START_REGISTER";
export const END_REGISTER_SUCCESS = "END_REGISTER_SUCCESS";
export const END_REGISTER_FAILED = "END_REGISTER_FAILED";

// export type registerAction = {
//   type: registerEnum;
//   payload?: any;
// };

export const registerSlice = (state = initState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case START_REGISTER:
      newState.isRegisterDone = false;
      newState.phone = action.payload.phone;
      newState.password = action.payload.password;
      newState.firstName = action.payload.firstName;
      newState.lastName = action.payload.lastName;
      newState.address = action.payload.address;
      break;
    case END_REGISTER_SUCCESS:
      newState.isRegisterDone = true;
      newState.isRegisterStatus = true;
      break;
    case END_REGISTER_FAILED:
      newState.isRegisterDone = true;
      newState.isRegisterStatus = false;
      break;
  }
  return newState;
};

export const handleStartRegisterRedux = (payload) => ({
  type: START_REGISTER,
  payload,
});
export const handleEndRegisterSuccessRedux = () => ({
  type: END_REGISTER_SUCCESS,
});
export const handleEndRegisterFailedRedux = () => ({
  type: END_REGISTER_FAILED,
});
