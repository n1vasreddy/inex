import { configureStore } from '@reduxjs/toolkit';
import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
} from 'react-redux';
import transactionsReducer from './transactions';
import tagsReducer from './tags';
import accountsReducer from './accounts';

const rootReducer = {
    transactions: transactionsReducer,
    tags: tagsReducer,
    accounts: accountsReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
