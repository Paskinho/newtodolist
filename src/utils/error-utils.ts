import {AppActionsType, setErrorAC, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: {message: string}) => {
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error.message))
}

export const handleServerAppError = <T> (data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error'))
    }
    dispatch(setStatusAC('idle'))
}


type ErrorUtilsDispatchType = Dispatch<AppActionsType>
