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

export const accountsTableSchema = `
    CREATE TABLE IF NOT EXISTS accounts (
        value TEXT PRIMARY KEY NOT NULL,
        label TEXT NOT NULL,
        type TEXT NOT NULL,
        balance REAL NOT NULL DEFAULT 0,
        isDefault TEXT NOT NULL
    );
`;

export const getAllTransactionsQuery = 'SELECT * FROM transactions';

export const postTransactionQuery =
    'INSERT INTO transactions (id, amount, trxType, trxDate, paymentMethod, category, note) VALUES (?, ?, ?, ?, ?, ?, ?)';

export const updateTransactionQuery =
    'UPDATE transactions SET amount = ?, trxType = ?, trxDate = ?, paymentMethod = ?, category = ?, note = ? WHERE id = ?';

export const deleteTransactionQuery = 'DELETE FROM transactions WHERE id = ?';

export const getAllTagsQuery = 'SELECT * FROM tags';

export const postTagQuery =
    'INSERT INTO tags (id, tagName, tagEmoji) VALUES (?, ?, ?)';

export const deleteTagQuery = 'DELETE FROM tags WHERE id = ?';

export const getAllAccountsQuery = 'SELECT * FROM accounts';

export const postAccountQuery =
    'INSERT INTO accounts (value, label, type, balance, isDefault) VALUES (?, ?, ?, ?, ?)';

export const updateAccountInfoQuery =
    'UPDATE accounts SET label = ?, balance = ?, isDefault = ? WHERE value = ?';

export const updateBalanceQuery =
    'UPDATE accounts SET balance = ? WHERE value = ?';

export const deleteAccountInfoQuery = 'DELETE FROM accounts WHERE value = ?';
