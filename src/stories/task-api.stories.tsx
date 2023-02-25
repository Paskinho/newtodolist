import React, {useEffect, useState} from "react";
import {taskApi} from "../api/task-api";


export default {
    title: 'API'
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'TypeScript';
            const todolistId = 'aec989cc-ad3f-4a03-b961-43daea0380ce'
        taskApi.createTask(title, todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const updateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'TypeScript';
        const todolistId = 'aec989cc-ad3f-4a03-b961-43daea0380ce'
        const newTitle = "ReactRedux"
        taskApi.updateTaskTitle(title, todolistId, newTitle)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const changeTaskStatus = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'TypeScript';
        const isDone = true;
        const todolistId = 'aec989cc-ad3f-4a03-b961-43daea0380ce';
        taskApi.changeTaskStatus(title, isDone, todolistId,)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const deleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const taskId = '3890ff6b-1fed-4cdb-a4f9-5f25476acdb5';
        const todolistId = 'aec989cc-ad3f-4a03-b961-43daea0380ce';
        taskApi.deleteTask(taskId, todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}



