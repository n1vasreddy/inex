import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTags } from '@/db/queries';

export interface IAccountInfo {
    label: string;
    value: string;
    type: string;
    balance: number;
}

interface IAccountsInfo {
    data: IAccountInfo[];
}

interface IAccountEntry {
    type: string;
    payload: IAccountInfo;
}

export const accountsSlice = createSlice({
    name: 'tags',
    initialState: { data: [] } as IAccountsInfo,
    reducers: {
        accountEntry: (state: IAccountsInfo, action: IAccountEntry) => {
            state.data = [...state.data, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            loadAccounts.fulfilled,
            (state, action: PayloadAction<IAccountInfo[]>) => {
                state.data = action.payload;
            },
        );
    },
});

export const loadAccounts = createAsyncThunk(
    'accounts/loadAccounts',
    async (): Promise<IAccountInfo[]> => {
        return await getTags();
    },
);

export const { accountEntry } = accountsSlice.actions;
export default accountsSlice.reducer;
