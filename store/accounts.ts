import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAccounts } from '@/db/queries';

export interface IAccountInfo {
    label: string;
    value: string;
    type: string;
    balance: number;
    isDefault: string;
}

interface IAccountsInfo {
    data: IAccountInfo[];
}

export const accountsSlice = createSlice({
    name: 'tags',
    initialState: { data: [] } as IAccountsInfo,
    reducers: {},
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
        return await getAccounts();
    },
);

export default accountsSlice.reducer;
