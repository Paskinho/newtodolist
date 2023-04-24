import React, { FC } from "react";
import { Task } from "features/todolists-list/todolists/Todolist/Tasks/Task/Task";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/todolists-list/todolists/todolists.reducer";
import { TaskType } from "features/todolists-list/tasks/tasks.api";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Tasks: FC<Props> = ({ tasks, todolist }) => {
  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </>
  );
};
