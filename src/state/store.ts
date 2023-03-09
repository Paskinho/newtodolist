import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import {combineReducers, legacy_createStore, AnyAction} from 'redux';
import {useDispatch} from "react-redux";
import thunk, {ThunkDispatch} from 'redux-thunk'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


// непосредственно создаём store
export const store = legacy_createStore(rootReducer);

type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = useDispatch<ThunkDispatchType>()

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
