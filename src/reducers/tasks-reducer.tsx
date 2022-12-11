import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'

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
export type ChangeTodolistTitleAT = {
    type: typeof CHANGE_TODOLIST_TITLE
    title: string,
    id: string
}

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

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

        case 'CHANGE_TODOLIST_TITLE' :
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title}: tl)

        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({type: REMOVE_TODOLIST, id}) //можно записать id:id
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: ADD_TODOLIST,title})
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterAT => ({type: CHANGE_TODOLIST_FILTER,filter,id})
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleAT => ({type: CHANGE_TODOLIST_TITLE,title,id})

