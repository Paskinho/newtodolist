import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>


type ActionsType = RemoveTaskActionType | AddTaskActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]:state[action.todolistId].filter(task=> task.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistID]:[{id:v1(), title:action.title,isDone:false},...state[action.todolistID]]
            }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId,todolistId} as const
}
export const addTaskAC = (title: string, todolistID: string)=> {
    return { type: 'ADD-TASK', title, todolistID} as const
}
