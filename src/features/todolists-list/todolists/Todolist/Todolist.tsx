import React, { useCallback, useEffect } from 'react'
import { Delete } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { Task } from './Task/Task'
import { FilterValuesType, TodolistDomainType } from 'features/todolists-list/todolists/todolists.reducer'
import { tasksThunks } from 'features/todolists-list/tasks/tasks.reducer';
import { TaskStatuses } from 'common/enums';
import { useActions, useAppDispatch } from 'common/hooks';
import { AddItemForm, EditableSpan } from 'common/components'
import {TaskType} from "features/todolists-list/tasks/tasks.api";

type PropsType = {
	todolist: TodolistDomainType
	tasks: TaskType[]
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
}

// const addTask = useCallback(function (title: string, todolistId: string) {
// 	addTaskThunk({title, todolistId})
// }, [])

export const Todolist = React.memo(function (props: PropsType) {

	const {fetchTasks, addTask} = useActions(tasksThunks)

	useEffect(() => {
		fetchTasks(props.todolist.id)
	}, [])

	const addTaskCallback = (title: string) => {
		addTask({title, todolistId: props.todolist.id})
	}

	const removeTodolist = () => {
		props.removeTodolist(props.todolist.id)
	}

	const changeTodolistTitle = useCallback((title: string) => {
		props.changeTodolistTitle(props.todolist.id, title)
	}, [props.todolist.id, props.changeTodolistTitle])

	const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.todolist.id, props.changeFilter])
	const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.todolist.id, props.changeFilter])
	const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.todolist.id, props.changeFilter])

	let tasksForTodolist = props.tasks

	if (props.todolist.filter === 'active') {
		tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
	}
	if (props.todolist.filter === 'completed') {
		tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
	}

	return <div>
		<h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
			<IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
				<Delete/>
			</IconButton>
		</h3>
		<AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === 'loading'}/>
		<div>
			{
				tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
				/>)
			}
		</div>
		<div style={{paddingTop: '10px'}}>
			<Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
					onClick={onAllClickHandler}
					color={'inherit'}
			>All
			</Button>
			<Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
					onClick={onActiveClickHandler}
					color={'primary'}>Active
			</Button>
			<Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
					onClick={onCompletedClickHandler}
					color={'secondary'}>Completed
			</Button>
		</div>
	</div>
})


