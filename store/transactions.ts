import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTransactions } from '../db/queries';

export interface ITransactionInfo {
    id: string;
    amount: number;
    trxType: string;
    date: string;
    paymentMethod: string;
    category: string;
    note: string;
}

interface ITransactionState {
    data: ITransactionInfo[];
}

interface IActionTransactionEntry {
    type: string;
    payload: ITransactionInfo;
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: { data: [] } as ITransactionState,
    reducers: {
        transactionEntry: (
            state: ITransactionState,
            action: IActionTransactionEntry,
        ) => {
            state.data = [...state.data, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            loadTransactions.fulfilled,
            (state, action: PayloadAction<ITransactionInfo[]>) => {
                state.data = action.payload;
            },
        );
    },
});

export const loadTransactions = createAsyncThunk(
    'transactions/loadTransactions',
    async (): Promise<ITransactionInfo[]> => {
        return await getTransactions();
    },
);

export const { transactionEntry } = transactionsSlice.actions;
export default transactionsSlice.reducer;
