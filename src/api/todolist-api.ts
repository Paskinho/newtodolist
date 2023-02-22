import axios from "axios";

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
        'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1',
    },
})


export const todolistApi = {
    updateTodolist(id: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists${id}`,{title},
            settings)

    },
    getTodolists (){
        return axios.get ('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolist(title: string){
        return  axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title},
            settings)
    },
    deleteTodolist(todoId: string){
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, settings)
    }
}