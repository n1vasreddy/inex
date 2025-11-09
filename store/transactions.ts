import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTransactions } from '../db/queries';

export interface ITransactionInfo {
    id: string;
    amount: number;
    trxType: string;
    trxDate: string;
    paymentMethod: string;
    category: string;
    note: string;
}

interface ITransactionState {
    data: ITransactionInfo[];
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: { data: [] } as ITransactionState,
    reducers: {},
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

export default transactionsSlice.reducer;
