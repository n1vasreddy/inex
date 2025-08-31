import { createSlice } from '@reduxjs/toolkit';
import { TransactionType } from '@/constants/constants';

interface ITransactionInfo {
    id: string;
    amount: number;
    trxType: string | TransactionType;
    date: string;
    paymentMethod: string | undefined;
    category: (string | undefined)[];
    note: string;
}

interface ITransactionState {
    data: ITransactionInfo[];
}

interface IAction {
    type: string;
    payload: ITransactionInfo;
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: { data: [] },
    reducers: {
        transactionEntry: (state: ITransactionState, action: IAction) => {
            state.data = [...state.data, action.payload];
        },
    },
});

export const { transactionEntry } = transactionsSlice.actions;
export default transactionsSlice.reducer;
