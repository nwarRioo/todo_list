import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";


const rooutReducer = combineReducers({
    [api.reducerPath]: api.reducer,
})

const store = configureStore({
    reducer: rooutReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store