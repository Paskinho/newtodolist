import { AppThunk } from 'app/store'
import { appActions } from 'app/app.reducer';
import { todolistsActions } from 'features/TodolistsList/todolists.reducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearTasksAndTodolists } from 'common/actions/common.actions';
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk';
import { handleServerNetworkError } from 'common/utils';
import { handleServerAppError } from 'common/utils';
import {
	AddTaskArgType,
	TaskType,
	todolistsApi,
	UpdateTaskArgType,
	UpdateTaskModelType
} from 'features/TodolistsList/todolists.api';
import { ResultCode, TaskPriorities, TaskStatuses } from 'common/enums';


const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>
('tasks/fetchTasks', async (todolistId, thunkAPI) => {
	const {dispatch, rejectWithValue} = thunkAPI
	try {
		dispatch(appActions.setAppStatus({status: 'loading'}))
		const res = await todolistsApi.getTasks(todolistId)
		const tasks = res.data.items
		dispatch(appActions.setAppStatus({status: 'succeeded'}))
		return {tasks, todolistId}
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}
})

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>
('tasks/addTask', async (arg, thunkAPI) => {
	const {dispatch, rejectWithValue} = thunkAPI
	try {
		dispatch(appActions.setAppStatus({status: 'loading'}))
		const res = await todolistsApi.createTask(arg)
		if (res.data.resultCode === ResultCode.Success) {
			const task = res.data.data.item
			dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return {task}
		} else {
			handleServerAppError(res.data, dispatch);
			return rejectWithValue(null)
		}
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}
})


const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>
('tasks/updateTask', async (arg, thunkAPI) => {
	const {dispatch, rejectWithValue, getState} = thunkAPI
	try {
		dispatch(appActions.setAppStatus({status: 'loading'}))
		const state = getState()
		const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
		if (!task) {
			dispatch(appActions.setAppError({error: 'Task not found in the state'}))
			return rejectWithValue(null)
		}

		const apiModel: UpdateTaskModelType = {
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
			title: task.title,
			status: task.status,
			...arg.domainModel
		}

		const res = await todolistsApi.updateTask(arg.todolistId, arg.taskId, apiModel)
		if (res.data.resultCode === ResultCode.Success) {
			dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return arg
		} else {
			handleServerAppError(res.data, dispatch);
			return rejectWithValue(null)
		}
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}
})

const initialState: TasksStateType = {}

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		removeTask: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex(t => t.id === action.payload.taskId)
			if (index !== -1) tasks.splice(index, 1)
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state[action.payload.todolistId] = action.payload.tasks
			})
			.addCase(addTask.fulfilled, (state, action) => {
				const tasks = state[action.payload.task.todoListId]
				tasks.unshift(action.payload.task)
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const tasks = state[action.payload.todolistId]
				const index = tasks.findIndex(t => t.id === action.payload.taskId)
				if (index !== -1) {
					tasks[index] = {...tasks[index], ...action.payload.domainModel}
				}
			})
			.addCase(todolistsActions.addTodolist, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(todolistsActions.removeTodolist, (state, action) => {
				delete state[action.payload.id]
			})
			.addCase(todolistsActions.setTodolists, (state, action) => {
				action.payload.todolists.forEach((tl) => {
					state[tl.id] = []
				})
			})
			.addCase(clearTasksAndTodolists, () => {
				return {}
			})
	}
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {fetchTasks, addTask, updateTask}


// thunks
export const removeTaskTC = (taskId: string, todolistId: string): AppThunk => (dispatch) => {
	todolistsApi.deleteTask(todolistId, taskId)
		.then(() => {
			dispatch(tasksActions.removeTask({taskId, todolistId}))
		})
}


// types
export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
export type TasksStateType = {
	[key: string]: Array<TaskType>
}
