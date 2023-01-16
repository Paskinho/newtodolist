import {AppRootStateType} from "../store";

export const todolistsSelector = (state: AppRootStateType) => {
return state.todolists
}