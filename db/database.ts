import * as SQLite from 'expo-sqlite';
import { transactionsTableSchema } from './schema';

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

export async function setupDatabase(schema: string) {
    try {
        const db = await openDatabase();
        await db.execAsync(schema);
    } catch (error) {
        console.error('Error setting up database:', error);
        return [];
    }
}
