import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'



export type RemoveTodolistAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}

export type AddTodolistAT = {
    type: typeof ADD_TODOLIST
    title: string
}

export type ChangeTodolistFilterAT = {
    type: typeof CHANGE_TODOLIST_FILTER
    filter: FilterValuesType
    id: string
}

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT



export const todolistsReducer = (todolists:Array<TodolistType>, action: ActionType) : Array<TodolistType>=> {
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

        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter}: tl)


        default:
            return todolists
    }
}

