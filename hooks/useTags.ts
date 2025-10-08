import { AppDispatch, useAppDispatch } from '@/store/store';
import { ITag, loadTags } from '@/store/tags';
import { addTag, deleteTag } from '@/db/queries';

export default function useTags() {
    const dispatch: AppDispatch = useAppDispatch();

    const refreshTags = async () => {
        dispatch(loadTags());
    };

    return {
        addTag: async (tag: ITag) => {
            await addTag(tag);
            await refreshTags();
        },
        removeTag: async (id: string) => {
            await deleteTag(id);
            await refreshTags();
        },
        refreshTags,
    };
}
