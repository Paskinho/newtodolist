import React, {ChangeEvent, useState} from 'react'
import { Task } from '../Task'
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: "TODOLIST/TASK",
    component: Task,
    args: {
        todolistId: "sadgasdg",
        changeTaskStatus: action ("changeTaskStatus"),
        changeTaskTitle: action ("changeTaskTitle"),
        removeTask: action ("removeTask")
        // task: {id: "aaasd", isDone: true, title: "JS"}, можно задать, а потом переопределить
    }
} as ComponentMeta<typeof Task>


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

export const TaskIsDoneStory = Template.bind({})

TaskIsDoneStory.args = {
    task: {id: "aaasd", isDone: true, title: "JS"},
}

export const TaskIsNotDoneStory = Template.bind({})

TaskIsNotDoneStory.args = {
    task: {id: "assadf", isDone: false, title: "CSS"},
}

const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState ({id: "aaasd", isDone: true, title: "JS"})

   const changeTaskTitle=(taskId: string, title: string, todolistId: string)  =>setTask({...task,title: title})
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
        setTask({...task, isDone: newIsDoneValue})
    }


// const removeTask = () => {
//         action("Remove Task")
// }


    return <Task
    task = {task}
    todolistId={"sdfasdf"}
    changeTaskTitle = {changeTaskTitle}
    changeTaskStatus={changeTaskStatus}
    removeTask={action("Remove Task")}
    />
}

export const WorkTaskStory = Template1.bind({})