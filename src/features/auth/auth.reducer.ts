import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { appActions } from 'app/app.reducer';
import { authAPI, LoginParamsType } from 'features/auth/auth.api';
import { clearTasksAndTodolists } from 'common/actions';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from 'common/utils';



const login = createAppAsyncThunk<{isLoggedIn: boolean}, LoginParamsType>
('auth/login', async (arg, thunkAPI) => {
	const {dispatch, rejectWithValue} = thunkAPI
	try {
		dispatch(appActions.setAppStatus({status: 'loading'}))
		const res = await authAPI.login(arg)
		if (res.data.resultCode === 0) {
			dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return {isLoggedIn: true}
		} else {
			handleServerAppError(res.data, dispatch)
			return rejectWithValue(null)
		}
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}
})




const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false
	},
	reducers: {
		setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
			state.isLoggedIn = action.payload.isLoggedIn
		}
	},
	extraReducers: builder => {
	builder.addCase(login.fulfilled)
	}
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {login}



// thunks


export const logoutTC = (): AppThunk => (dispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	authAPI.logout()
		.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
					dispatch(clearTasksAndTodolists())
					dispatch(appActions.setAppStatus({status: 'succeeded'}))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			}
		)
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

