import { createSlice } from '@reduxjs/toolkit';
import { TransactionType } from '@/constants/constants';

interface ITransactionInfo {
    // id: string;
    amount: number;
    trxType: TransactionType;
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
            console.log(action);
            state.data = [...state.data, action.payload];
        },
    },
});

export const { transactionEntry } = transactionsSlice.actions;
export default transactionsSlice.reducer;
