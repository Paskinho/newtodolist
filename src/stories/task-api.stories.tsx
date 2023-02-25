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



