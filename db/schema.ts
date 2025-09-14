export const transactionsTableSchema = `
    CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY NOT NULL,
        amount REAL NOT NULL DEFAULT 0,
        trxType TEXT NOT NULL,
        date string NOT NULL,
        paymentMethod TEXT NOT NULL,
        category TEXT,
        note TEXT
    );
`;

export const getAllTransactionsQuery = 'SELECT * FROM transactions';

export const postTransactionQuery =
    'INSERT INTO transactions (id, amount, trxType, date, paymentMethod, category, note) VALUES (?, ?, ?, ?, ?, ?, ?)';

export const updateTransactionQuery =
    'UPDATE transactions SET amount = ?, trxType = ?, date = ?, paymentMethod = ?, category = ?, note = ? WHERE id = ?';

export const deleteTransactionQuery = 'DELETE FROM transactions WHERE id = ?';
