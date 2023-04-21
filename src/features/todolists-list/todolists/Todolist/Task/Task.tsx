import React, { ChangeEvent, useCallback } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums';
import {useActions} from "common/hooks";
import {tasksThunks} from "features/todolists-list/tasks/tasks.reducer";
import {TaskType} from "features/todolists-list/tasks/tasks.api";

type TaskPropsType = {
	task: TaskType
	todolistId: string
	changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
	removeTask: (taskId: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

	const {removeTask} = useActions(tasksThunks)

	const removeTaskHandler = useCallback(() => removeTask({
		taskId: props.task.id,
		todolistId: props.todolistId
	}), [props.task.id, props.todolistId]);

	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
	}, [props.task.id, props.todolistId]);

	const onTitleChangeHandler = useCallback((newValue: string) => {
		props.changeTaskTitle(props.task.id, newValue, props.todolistId)
	}, [props.task.id, props.todolistId]);

	return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
		<Checkbox
			checked={props.task.status === TaskStatuses.Completed}
			color="primary"
			onChange={onChangeHandler}
		/>

		<EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
		<IconButton onClick={removeTaskHandler}>
			<Delete/>
		</IconButton>
	</div>
})
