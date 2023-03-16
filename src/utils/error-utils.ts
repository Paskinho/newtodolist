import {setErrorAC, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";


export const handleServerNetworkError = (dispatch: Dispatch<any>, error: {message: string}) => {
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error.message))
}
