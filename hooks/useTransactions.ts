import { addTransaction } from '@/db/database';

export default function useTransactions() {
    return {
        add: async (trx: any) => {
            await addTransaction(trx);
        },
    };
}
