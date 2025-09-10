import { addTransaction, updateTransaction } from '@/db/database';

export default function useTransactions() {
    return {
        add: async (trx: any) => {
            await addTransaction(trx);
        },
        update: async (trx: any) => {
            await updateTransaction(trx);
        },
    };
}
