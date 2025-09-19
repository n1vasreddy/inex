import { openDatabase } from './database';
import { ITransactionInfo } from '@/store/transactions';
import {
    deleteTransactionQuery,
    getAllTransactionsQuery,
    postTransactionQuery,
    updateTransactionQuery,
} from './schema';

export const getTransactions = async (): Promise<ITransactionInfo[]> => {
    try {
        const db = await openDatabase();
        return await db.getAllAsync(getAllTransactionsQuery);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
};

export const addTransaction = async (trx: ITransactionInfo) => {
    try {
        const db = await openDatabase();
        await db.runAsync(postTransactionQuery, [
            trx.id,
            trx.amount,
            trx.trxType,
            trx.trxDate,
            trx.paymentMethod,
            trx.category,
            trx.note,
        ]);
    } catch (error) {
        console.error('Error adding transaction:', error);
        return [];
    }
};

export const updateTransaction = async (trx: ITransactionInfo) => {
    try {
        const db = await openDatabase();
        await db.runAsync(updateTransactionQuery, [
            trx.amount,
            trx.trxType,
            trx.trxDate,
            trx.paymentMethod,
            trx.category,
            trx.note,
            trx.id,
        ]);
    } catch (error) {
        console.error('Error updating transaction:', error);
        return [];
    }
};

export const deleteTransaction = async (id: string) => {
    try {
        const db = await openDatabase();
        await db.runAsync(deleteTransactionQuery, [id]);
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return [];
    }
};
