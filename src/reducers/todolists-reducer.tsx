import {TodolistType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const ADD_TODOLIST = 'ADD-TODOLIST'

export type RemoveTodolistAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}

export type AddTodolistAT = {
    type: typeof ADD_TODOLIST
    title: string
}



export const todolistsReducer = (todolists:Array<TodolistType>, action: RemoveTodolistAT | AddTodolistAT) : Array<TodolistType>=> {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodolistId: string = v1()
            const newTodolist: TodolistType = {
                id: newTodolistId,
                title: action.title,
                filter: "all"
            }
            return [...todolists,newTodolist]


        default:
            return todolists
    }
}

