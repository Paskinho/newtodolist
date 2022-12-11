import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type SecondActionType = {
    type: ''
}


type ActionsType = RemoveTaskActionType | SecondActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]:state[action.todolistId].filter(task=> task.id !== action.taskId)
            }
        case '':
            return state
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId,todolistId} as const
}
export const secondAC = (title: string)=> {
    return { type: '', title}
}
