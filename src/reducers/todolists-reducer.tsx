import {TodolistType} from "../App";

const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const ADD_TODOLIST = 'ADD-TODOLIST'

export type RemoveTodolistAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}

export type AddTodolistAT = {
    type: typeof ADD_TODOLIST
    id: string
}



export const todolistsReducer = (todolists:Array<TodolistType>, action: RemoveTodolistAT) : Array<TodolistType>=> {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        default:
            return todolists
    }
}

export const add