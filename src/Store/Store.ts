import { legacy_createStore as createStore } from "redux";
import { profilereducer } from "../Reducers/ProfileReducer";

export const Store = createStore(profilereducer)