import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTags } from '@/db/queries';
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

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: { data: [] } as ITags,
    reducers: {
        tagEntry: (state: ITags, action: ITagEntry) => {
            state.data = [...state.data, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            loadTags.fulfilled,
            (state, action: PayloadAction<ITag[]>) => {
                state.data = action.payload;
            },
        );
    },
});

export const loadTags = createAsyncThunk(
    'tags/loadTags',
    async (): Promise<ITag[]> => {
        return await getTags();
    },
);

export const { tagEntry } = tagsSlice.actions;
export default tagsSlice.reducer;
