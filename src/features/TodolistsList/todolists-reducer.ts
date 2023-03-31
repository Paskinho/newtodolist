import { todolistsAPI, TodolistType } from 'api/todolists-api'
import { Dispatch } from 'redux'
import { appActions, RequestStatusType } from 'app/app-reducer'
import { handleServerNetworkError } from 'utils/error-utils'
import { AppThunk } from 'app/store';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []



const slice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		removeTodolist: (state, action: PayloadAction<{id: string}>) => {

		},
		addTodolist: (state, action: PayloadAction<{todolist: TodolistType}>) => {

		},
		changeTodolist: (state, action: PayloadAction<{id: string, title: string}>) => {

		},
		changeTodolistFilter: (state, action: PayloadAction<{id: string, filter: FilterValuesType}>) => {

		},
		changeTodolistEntityStatus: (state, action: PayloadAction<{id: string, status: RequestStatusType}>) => {

		},
		setTodolists: (state, action: PayloadAction<{todolists: TodolistType[]}>) => {

		}

	}
})


 const _todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(tl => tl.id != action.id)
		case 'ADD-TODOLIST':
			return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]

		case 'CHANGE-TODOLIST-TITLE':
			return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
		case 'CHANGE-TODOLIST-ENTITY-STATUS':
			return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
		case 'SET-TODOLISTS':
			return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
		default:
			return state
	}
}


// thunks
export const fetchTodolistsTC = (): AppThunk => {
	return (dispatch) => {
		dispatch(appActions.setAppStatus({status: 'loading'}))
		todolistsAPI.getTodolists()
			.then((res) => {
				dispatch(setTodolistsAC(res.data))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			})
			.catch(error => {
				handleServerNetworkError(error, dispatch);
			})
	}
}
export const removeTodolistTC = (todolistId: string): AppThunk => {
	return (dispatch) => {
		//изменим глобальный статус приложения, чтобы вверху полоса побежала
		dispatch(appActions.setAppStatus({status: 'loading'}))
		//изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
		dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
		todolistsAPI.deleteTodolist(todolistId)
			.then((res) => {
				dispatch(removeTodolistAC(todolistId))
				//скажем глобально приложению, что асинхронная операция завершена
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			})
	}
}
export const addTodolistTC = (title: string): AppThunk => {
	return (dispatch) => {
		dispatch(appActions.setAppStatus({status: 'loading'}))
		todolistsAPI.createTodolist(title)
			.then((res) => {
				dispatch(addTodolistAC(res.data.data.item))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			})
	}
}
export const changeTodolistTitleTC = (id: string, title: string) => {
	return (dispatch: Dispatch<ActionsType>) => {
		todolistsAPI.updateTodolist(id, title)
			.then((res) => {
				dispatch(changeTodolistTitleAC(id, title))
			})
	}
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ReturnType<typeof changeTodolistTitleAC>
	| ReturnType<typeof changeTodolistFilterAC>
	| SetTodolistsActionType
	| ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
	entityStatus: RequestStatusType
}
