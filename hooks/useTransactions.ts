import { useState, useEffect } from 'react';
import { getTransactions, addTransaction } from '@/db/database';

export default function useTransactions() {
    const [transactions, setTransactions] = useState<any>([]);

    const refresh = async () => {
        const trxs = await getTransactions();
        console.log('TRXs from DB >>> ', trxs);
        setTransactions(trxs);
    };

    useEffect(() => {
        refresh();
    }, []);

    return {
        transactions,
        add: async (trx: any) => {
            await addTransaction(trx);
            refresh();
        },
        refresh,
    };
}
