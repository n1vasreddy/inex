import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactions';

const rootReducer = {
    transactions: transactionsReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
