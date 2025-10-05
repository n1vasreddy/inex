import { addTag } from '@/db/queries';
import { AppDispatch, useAppDispatch } from '@/store/store';
import { loadTags } from '@/store/tags';

export default function useTags() {
    const dispatch: AppDispatch = useAppDispatch();

    const refreshTags = async () => {
        dispatch(loadTags());
    };

    return {
        addTag: async (trx: any) => {
            await addTag(trx);
        },
        // remove: async (id: string) => {
        //     await deleteTransaction(id);
        // },
        refreshTags,
    };
}
