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
        'API-KEY': 'aeefc5de-7fbe-47c0-93be-ce3a4d1e3ad8',
    },
})


export const todolistApi = {
    updateTodolist(id: string, title: string) {
        return instance.put(`todo-lists${id}`,{title},
            settings)

    },
    getTodolists (){
        return instance.get ('todo-lists')
    },
    createTodolist(title: string){
        return  instance.post('todo-lists',{title},
            settings)
    },
    deleteTodolist(todoId: string){
        return instance.delete(`todo-lists/${todoId}`)
    }
}