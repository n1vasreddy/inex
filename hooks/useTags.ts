import { addTag } from '@/db/queries';
import { AppDispatch, useAppDispatch } from '@/store/store';

export default function useTransactions() {
    const dispatch: AppDispatch = useAppDispatch();

    const refresh = async () => {
        // dispatch(loadTransactions());
    };

    return {
        addTag: async (trx: any) => {
            await addTag(trx);
        },
        // remove: async (id: string) => {
        //     await deleteTransaction(id);
        // },
        refresh,
    };
}
