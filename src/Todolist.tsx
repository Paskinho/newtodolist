import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";

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
}

export const TodoList = (props: TodoListPropsType) => {

    const tasksJSXItemsList = props.tasks.length
        ? <ul>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id, props.todoListId)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                    const isDoneClass = task.isDone ? "isDone" : ""
                    return (
                        <li key={task.id} className={isDoneClass}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeTaskStatus}
                            />
                            <span>{task.title}</span>
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


    const allBtnClass = props.filter === "all" ? "btn-active" : ""
    const activeBtnClass = props.filter === "active" ? "btn-active" : ""
    const completedBtnClass = props.filter === "completed" ? "btn-active" : ""

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={removeTodoList}>X</button>
            <AddItemForm addItem={addTask}/>
            {tasksJSXItemsList}
            <div>
                <button
                    className={allBtnClass}
                    onClick={changeFilterHandlerCreator("all")}
                >All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={changeFilterHandlerCreator("active")}
                >Active
                </button>
                <button
                    className={completedBtnClass}
                    onClick={changeFilterHandlerCreator("completed")}
                >Completed
                </button>
            </div>
        </div>
    );
}