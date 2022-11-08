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


function App() {
    // BLL:

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<any>({
        [todolistId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "REACT & TS", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "COLA", isDone: true},
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "WATER", isDone: false},
        ]
    })

    //
    // const todoListTitle: string = "What to learn"
    const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS & ES6", isDone: true},
        {id: v1(), title: "REACT & TS", isDone: false},
    ])
    const removeTask = (taskId: string) => {
        setTasksForTodoList(tasksForTodoList.filter(t => t.id !== taskId))
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasksForTodoList([newTask, ...tasksForTodoList])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasksForTodoList(tasksForTodoList.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
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

