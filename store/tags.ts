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

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: { data: [] } as ITags,
    reducers: {},
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

export default tagsSlice.reducer;
