import { ITransactionInfo } from '@/store/transactions';
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function openDatabase() {
    try {
        if (!db) {
            db = await SQLite.openDatabaseAsync('inex.db');
        }
    } catch (error) {
        console.error('Error opening database:', error);
    } finally {
        return db!;
    }
}

export async function setupDatabase() {
    try {
        const db = await openDatabase();
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS transactions (
            id TEXT PRIMARY KEY NOT NULL,
            amount REAL NOT NULL DEFAULT 0,
            trxType TEXT NOT NULL,
            date string NOT NULL,
            paymentMethod TEXT NOT NULL,
            category TEXT,
            note TEXT
            );
        `);
    } catch (error) {
        console.error('Error setting up database:', error);
        return [];
    }
}

export const getTransactions = async (): Promise<ITransactionInfo[]> => {
    try {
        const db = await openDatabase();
        return await db.getAllAsync('SELECT * FROM transactions');
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
};

export const addTransaction = async (trx: ITransactionInfo) => {
    try {
        const db = await openDatabase();
        await db.runAsync(
            'INSERT INTO transactions (id, amount, trxType, date, paymentMethod, category, note) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                trx.id,
                trx.amount,
                trx.trxType,
                trx.date,
                trx.paymentMethod,
                trx.category,
                trx.note,
            ],
        );
    } catch (error) {
        console.error('Error adding transaction:', error);
        return [];
    }
};
