import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactions';

const rootReducer = {
    transactions: transactionsReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
