import axios from "axios/index";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": 'aeefc5de-7fbe-47c0-93be-ce3a4d1e3ad8',
    }
}

export const todolistApi = {

    updateTodolist(id: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists${id}`,{title},
            settings)

    }
}