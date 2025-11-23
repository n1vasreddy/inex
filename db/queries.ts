import { openDatabase } from './database';
import { ITransactionInfo } from '@/store/transactions';
import { ITag } from '@/store/tags';
import {
    deleteAccountInfoQuery,
    deleteTagQuery,
    deleteTransactionQuery,
    getAllAccountsQuery,
    getAllTagsQuery,
    getAllTransactionsQuery,
    postAccountQuery,
    postTagQuery,
    postTransactionQuery,
    updateAccountInfoQuery,
    updateBalanceQuery,
    updateTransactionQuery,
} from './schema';
import { IAccountInfo } from '@/store/accounts';

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

export const getTags = async (): Promise<ITag[]> => {
    try {
        const db = await openDatabase();
        return await db.getAllAsync(getAllTagsQuery);
    } catch (error) {
        console.error('Error fetching tags:', error);
        return [];
    }
};

export const addTag = async (tag: ITag) => {
    try {
        const db = await openDatabase();
        await db.runAsync(postTagQuery, [tag.id, tag.tagName, tag.tagEmoji]);
    } catch (error) {
        console.error('Error adding tag:', error);
        return [];
    }
};

export const deleteTag = async (id: string) => {
    try {
        const db = await openDatabase();
        await db.runAsync(deleteTagQuery, [id]);
    } catch (error) {
        console.error('Error deleting tag:', error);
        return [];
    }
};

export const getAccounts = async (): Promise<IAccountInfo[]> => {
    try {
        const db = await openDatabase();
        return await db.getAllAsync(getAllAccountsQuery);
    } catch (error) {
        console.error('Error fetching accounts info:', error);
        return [];
    }
};

export const addAccount = async (accountInfo: IAccountInfo) => {
    try {
        const db = await openDatabase();
        await db.runAsync(postAccountQuery, [
            accountInfo.value,
            accountInfo.label,
            accountInfo.type,
            accountInfo.balance,
            accountInfo.isDefault,
        ]);
    } catch (error) {
        console.error('Error adding account:', error);
        return [];
    }
};

export const updateAccountInfo = async (accountInfo: IAccountInfo) => {
    try {
        const db = await openDatabase();
        await db.runAsync(updateAccountInfoQuery, [
            accountInfo.label,
            accountInfo.balance,
            accountInfo.isDefault,
            accountInfo.value,
        ]);
    } catch (error) {
        console.error('Error updating account info:', error);
        return [];
    }
};

export const updateBalance = async (balance: number, value: string) => {
    try {
        const db = await openDatabase();
        await db.runAsync(updateBalanceQuery, [balance, value]);
    } catch (error) {
        console.error('Error updating account balance:', error);
        return [];
    }
};

export const deleteAccountInfo = async (value: string) => {
    try {
        const db = await openDatabase();
        await db.runAsync(deleteAccountInfoQuery, [value]);
    } catch (error) {
        console.error('Error deleting account info:', error);
        return [];
    }
};
