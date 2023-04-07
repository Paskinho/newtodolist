import {
	AddTaskArgType,
	TaskPriorities,
	TaskStatuses,
	TaskType,
	todolistsAPI,
	UpdateTaskModelType
} from 'api/todolists-api'
import { AppThunk } from 'app/store'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { appActions } from 'app/app.reducer';
import { todolistsActions } from 'features/TodolistsList/todolists.reducer';
import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearTasksAndTodolists } from 'common/actions/common.actions';
import {Dispatch} from "redux";
import {createAppAsyncThunk} from "utils/create-app-async-thunk";

type AsyncThunkConfig = {
	state?: unknown
	dispatch?: Dispatch
	extra?: unknown
	rejectValue?: unknown
	serializedErrorType?: unknown
	pendingMeta?: unknown
	fulfilledMeta?: unknown
	rejectedMeta?: unknown
}


const fetchTasks = createAppAsyncThunk<{tasks: TaskType[], todolistId: string},string>
('tasks/fetchTasks', async (todolistId, thunkAPI)=> {
	const {dispatch, rejectWithValue} = thunkAPI
	try {
		dispatch(appActions.setAppStatus({status: 'loading'}))
		const res = await todolistsAPI.getTasks(todolistId)
		const tasks = res.data.items
		dispatch(appActions.setAppStatus({status: 'succeeded'}))
		return {tasks, todolistId}
	} catch (e) {
		debugger
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}

	// dispatch(tasksActions.setTasks({tasks, todolistId}))
})



const addTask = createAppAsyncThunk<{ task: TaskType},AddTaskArgType>('tasks/addTask',
	async (arg, thunkAPI) => {
	    const {dispatch, rejectWithValue} = thunkAPI
	try {
	dispatch(appActions.setAppStatus({status: 'loading'}))
		const res = await todolistsAPI.createTask(arg)
				if (res.data.resultCode === 0) {
					const task = res.data.data.item
					dispatch(appActions.setAppStatus({status: 'succeeded'}))
				return {task}
				} else {
					handleServerAppError(res.data, dispatch);
					return rejectWithValue(null)
				}
	}
			catch(e)  {
				handleServerNetworkError(e, dispatch)
				return rejectWithValue(null)
			}
})

type UpdateTaskArgType = {
	taskId: string,
	domainModel: UpdateDomainTaskModelType,
	todolistId: string
}

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>
('tasks/updateTask', async (arg,thunkAPI) => {
	const {dispatch,rejectWithValue,getState} = thunkAPI
	try {
		const state = getState()
		const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
		if (!task) {
			//TODO
			console.warn('task not found in the state')
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
		const res = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
		if (res.data.resultCode === 0) {
			return arg
		}
		else {
			handleServerAppError(res.data, dispatch);
			return rejectWithValue(null)
		}
	} catch(e) {
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
		updateTask: (state, action: PayloadAction<{
			taskId: string,
			model: UpdateDomainTaskModelType,
			todolistId: string
		}>) => {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex(t => t.id === action.payload.taskId)
			if (index !== -1) {
				tasks[index] = {...tasks[index], ...action.payload.model}
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTasks.fulfilled, (state, action)=> {
				state[action.payload.todolistId] = action.payload.tasks
			})
			.addCase(addTask.fulfilled, (state, action)=> {
				const tasks = state[action.payload.task.todoListId]
				tasks.unshift(action.payload.task)
			})
			.addCase(fetchTasks.rejected, (state, action) => {

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
	todolistsAPI.deleteTask(todolistId, taskId)
		.then(() => {
			dispatch(tasksActions.removeTask({taskId, todolistId}))
		})
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const task = state.tasks[todolistId].find(t => t.id === taskId)
		if (!task) {
			//throw new Error("task not found in the state");
			console.warn('task not found in the state')
			return
		}

		const apiModel: UpdateTaskModelType = {
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
			title: task.title,
			status: task.status,
			...domainModel
		}

		todolistsAPI.updateTask(todolistId, taskId, apiModel)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(tasksActions.updateTask({taskId, model: domainModel, todolistId}))
				} else {
					handleServerAppError(res.data, dispatch);
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch);
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
