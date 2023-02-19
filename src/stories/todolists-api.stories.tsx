import React, {useEffect, useState} from 'react'
import axios from 'axios';



export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": 'aeefc5de-7fbe-47c0-93be-ce3a4d1e3ad8',
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const promise = axios.get ('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            promise.then ((res)=> {
                const result = res
                setState(result.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoName = 'REACT&REDUX'
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title:todoName},
            settings).then((res)=>{
                setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "c3cc581a-8929-469d-8708-eefc578238a9"
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, settings)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = "c3cc581a-8929-469d-8708-eefc578238a9"
        const todoName = "REACT&JS"
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists${id}`,{title:todoName},
            settings)
        promise.then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

