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
