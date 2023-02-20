import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": 'aeefc5de-7fbe-47c0-93be-ce3a4d1e3ad8',
    }
}

export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistApi.getTodolist()
           .then ((res)=> {
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
       todolistApi.createTodolist(todoName)
           .then((res)=>{
                setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "9150662c-f4cf-4118-9ca2-08c8dae71cee"
        todolistApi.deleteTodolist(todoId)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = "22529397-fdbd-450d-98b2-aaa8aaa94102"
        const todoName = "REACT&JS"
        todolistApi.updateTodolist(id,todoName)
        .then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

