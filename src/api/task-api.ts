import axios from "axios"



const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": 'aeefc5de-7fbe-47c0-93be-ce3a4d1e3ad8',
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'aeefc5de-7fbe-47c0-93be-ce3a4d1e3ad8',
    },
})


export const taskApi = {
    createTask(title: string, todolistId: string) {
        return instance.post<CreateTaskType>(`todo-lists/${todolistId}/tasks`, {title},
            settings)
    },
    updateTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        return instance.put<UpdateTaskTitleType>(`/todo-lists/${todolistId}/tasks/${taskId}`,{newTitle},
            settings)
    },
    changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        return instance.put<changeTaskStatusType>(`/todo-lists/${todolistId}/tasks/${taskId}`,{isDone},
            settings)
    },
    deleteTask(taskId: string, todolistId: string){
        return instance.delete<deleteTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`, settings)
    }
}


type CreateTaskType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type UpdateTaskTitleType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type changeTaskStatusType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type deleteTaskType = {
    resultCode: number
    messages: Array<string>
    data: {}
}