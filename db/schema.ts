export const transactionsTableSchema = `
    CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY NOT NULL,
        amount REAL NOT NULL DEFAULT 0,
        trxType TEXT NOT NULL,
        trxDate string NOT NULL,
        paymentMethod TEXT NOT NULL,
        category TEXT,
        note TEXT
    );
`;

export const tagsTableSchema = `
    CREATE TABLE IF NOT EXISTS tags (
        id TEXT PRIMARY KEY NOT NULL,
        tagName TEXT NOT NULL,
        tagEmoji TEXT NOT NULL
    );
`;

export const getAllTransactionsQuery = 'SELECT * FROM transactions';

export const postTransactionQuery =
    'INSERT INTO transactions (id, amount, trxType, trxDate, paymentMethod, category, note) VALUES (?, ?, ?, ?, ?, ?, ?)';

export const updateTransactionQuery =
    'UPDATE transactions SET amount = ?, trxType = ?, trxDate = ?, paymentMethod = ?, category = ?, note = ? WHERE id = ?';

export const deleteTransactionQuery = 'DELETE FROM transactions WHERE id = ?';

export const postTagQuery =
    'INSERT INTO tags (id, tagName, tagEmoji) VALUES (?, ?, ?)';
