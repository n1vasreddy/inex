import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { getTransactions } from '../db/queries';

export interface ITag {
    id: string;
    tagName: string;
    tagEmoji: string;
}

interface ITags {
    data: ITag[];
}

interface ITagEntry {
    type: string;
    payload: ITag;
}

const mockTags: ITag[] = [
    { id: '1', tagEmoji: '🍔', tagName: 'Food' },
    { id: '2', tagEmoji: '✈️', tagName: 'Travel' },
    { id: '3', tagEmoji: '🏠', tagName: 'Rent' },
    { id: '4', tagEmoji: '🎁', tagName: 'Gifts' },
];

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: { data: mockTags } as ITags,
    reducers: {
        tagEntry: (state: ITags, action: ITagEntry) => {
            state.data = [...state.data, action.payload];
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(
    //         loadTags.fulfilled,
    //         (state, action: PayloadAction<IActionTransactionEntry[]>) => {
    //             state.data = action.payload;
    //         },
    //     );
    // },
});

// export const loadTags = createAsyncThunk(
//     'tags/loadTags',
//     async (): Promise<ITag[]> => {
//         return await getTransactions();
//     },
// );

export const { tagEntry } = tagsSlice.actions;
export default tagsSlice.reducer;
