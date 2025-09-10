import { AppDispatch, useAppDispatch } from '@/store/store';
import { loadTransactions } from '@/store/transactions';
import { addTransaction, updateTransaction } from '@/db/database';

export default function useTransactions() {
    const dispatch: AppDispatch = useAppDispatch();

    const refresh = async () => {
        dispatch(loadTransactions());
    };

    return {
        add: async (trx: any) => {
            await addTransaction(trx);
        },
        update: async (trx: any) => {
            await updateTransaction(trx);
        },
        refresh,
    };
}
