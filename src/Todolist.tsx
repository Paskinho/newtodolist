import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button} from "@mui/material";


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodolist: (todoListId: string) => void
    changeTaskTitle : (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle : (title: string, todoListId: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const tasksJSXItemsList = props.tasks.length
        ? <ul>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id, props.todoListId)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                    const changeTaskTitle =(nextTitle: string) => {
                        props.changeTaskTitle(task.id, nextTitle, props.todoListId)

                    }

                    const isDoneClass = task.isDone ? "isDone" : ""
                    return (
                        <li key={task.id} className={isDoneClass}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeTaskStatus}
                            />
                            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>

                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        : <span>Your list is empty</span>


    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.todoListId)
    }


    const removeTodoList = () => props.removeTodolist(props.todoListId)
    const addTask = (title: string) => props.addTask(title, props.todoListId)
const changeTitle = (nextTitle: string) => props.changeTodolistTitle(nextTitle, props.todoListId)

    // const allBtnClass = props.filter === "all" ? "btn-active" : ""
    // const activeBtnClass = props.filter === "active" ? "btn-active" : ""
    // const completedBtnClass = props.filter === "completed" ? "btn-active" : ""
const btnStyle = {marginRight: "2px"}


    return (
        <div>
            <h3>
            <EditableSpan title={props.title} changeTitle={changeTitle}/>
            </h3>
            <button onClick={removeTodoList}>X</button>
            <AddItemForm addItem={addTask}
            placeholder={"Add new Task"}/>
            {tasksJSXItemsList}
            <div>
                <Button
                    style={btnStyle}
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size={"small"}
                    disableElevation
                    onClick={changeFilterHandlerCreator("all")}
                >All
                </Button>
                <Button
                    style={btnStyle}
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size={"small"}
                    disableElevation
                    onClick={changeFilterHandlerCreator("active")}
                >Active
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    size={"small"}
                    disableElevation
                    onClick={changeFilterHandlerCreator("completed")}
                >Completed
                </Button>
            </div>
        </div>
    );
}