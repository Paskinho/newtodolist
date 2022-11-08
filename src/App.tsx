import React, {useState} from 'react'
import './App.css'
import {TodoList} from "./TodoList"
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"
// Create +
// Read => +, filtration
// Update +
// Delete +

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType ={
    [todoListId: string]: Array<TaskType>
}




function App() {
    // BLL:

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodolists] = useState<Array<TodolistType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "REACT & TS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "COLA", isDone: true},
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "WATER", isDone: false},
        ]
    })

    //
    // const todoListTitle: string = "What to learn"

    const removeTask = (taskId: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType>=tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.filter(t=> t.id !== taskId)
        const copyTasks ={...tasks}
        tasks[todoListId]=resultOfUpdate
        setTasks(copyTasks)

        // короткая запись:
        setTasks({...tasks,[todoListId]: tasks[todoListId].filter(t=> t.id !== taskId)})

    }
    const addTask = (title: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const newTask: TaskType = {
            id: v1(),
            title, // title: title
            isDone: false
        }
        const resultOfUpdate: Array<TaskType> = [...tasksForUpdate,newTask]
        const copyTasks: TasksStateType={...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)

        //короткая запись
      setTasks({...tasks,[todoListId]:[...tasks[todoListId], newTask]})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.map(t => t.id === todoListId ? {...t, isDone: isDone}: t)
    const copyTasks: TasksStateType={...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)

    }


    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodolists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter}: tl))
    }

    const removeTodolist = (todoListId: string) => {

        setTodolists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }


    const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
        let filteredTasks = tasks
        if (filterValue === "active") {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === "completed") {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }

    const filteredTasks = getFilteredTasks(tasksForTodoList, filter)

    //GUI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                filter={filter}

                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;

