import React from 'react'
import { Task } from '../Task'
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: "TODOLIST/TASK",
    component: Task
} as ComponentMeta<typeof Task>


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

export const TaskIsDoneStory = Template.bind({})

TaskIsDoneStory.args = {
    task: {id: "aaasd", isDone: true, title: "JS"},
    todolistId: "sadgasdg",
    changeTaskStatus: action ("changeTaskStatus"),
        changeTaskTitle: action ("changeTaskTitle"),
    removeTask: action ("removeTask")
}