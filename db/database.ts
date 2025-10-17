import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function openDatabase() {
    if (!db) {
        db = await SQLite.openDatabaseAsync('inex.db');
    }
    return db;
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
