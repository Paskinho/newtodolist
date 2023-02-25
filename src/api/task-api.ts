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
        return instance.post(`todo-lists/${todolistId}/tasks`, {title},
            settings)
    }
}
