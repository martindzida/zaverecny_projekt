import { UPDATE_USER } from "../actions/types";

//Defaultní stav
const initialState = {
  user: {},
};

//Reducer
export default function (state = initialState, action) {
  //Reducer vykoná příslušnou akci
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    //Pokud se spustí jiná akce, reducer vrátí defaultní stav
    default:
      return state;
  }
}
