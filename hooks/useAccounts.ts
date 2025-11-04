import { AppDispatch, useAppDispatch } from '@/store/store';
import { loadAccounts } from '@/store/accounts';
import {} from '@/db/queries';

export default function useTransactions() {
    const dispatch: AppDispatch = useAppDispatch();

    const refresh = async () => {
        await dispatch(loadAccounts());
    };

    return {
        add: async (trx: any) => {
            await refresh();
        },
        update: async (trx: any) => {
            await refresh();
        },
        remove: async (id: string) => {
            await refresh();
        },
        refresh,
    };
}
