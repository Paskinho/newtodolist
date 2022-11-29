import React, {useState} from 'react'
import './App.css'
import {TodoList} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


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

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
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
    const changeTaskTitle = (taskId: string, title: string, todolistId: string)=> {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {
                ...t, title
            }:t)})
    }


    const removeTodolist = (todoListId: string) => {

        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    const addTodolist = (title: string) => {
        const newTodolistId: string = v1()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists,newTodolist])
        setTasks({...tasks,[newTodolistId]: []})
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter}: tl))
    }
    const changeTodolistTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title}: tl))
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



    const todoListComponents = todoLists.length
        ? todoLists.map(tl => {
        const filteredTasks=getFilteredTasks(tasks[tl.id],tl.filter)
            return (
                <Grid item key={tl.id}>
                <Paper

                    elevation = {8}
                    style={{padding: "20px"}}>
                <TodoList
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    filter={tl.filter}

                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}

                    changeTodoListFilter={changeTodoListFilter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                />
                </Paper>
                </Grid>
                    )
        }
    )
: <span>Create your first TodoList!!!</span>


    //GUI:
    return (
        <div className="App">
            <AppBar position="static">

                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>

            </AppBar>
    <Container fixed style={{paddingTop: "20px"}}>
        <Grid container>
            <AddItemForm addItem={addTodolist}
            placeholder={"add new todolist"}/></Grid>
        <Grid container spacing = {4}> {todoListComponents} </Grid>

    </Container>
        </div>
    );
}

export default App;

