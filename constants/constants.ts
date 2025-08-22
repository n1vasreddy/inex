export const labels = {
    amount: 'Amount',
    transactionType: 'Transaction Type',
    date: 'Date',
    source: 'Source',
    category: 'Category',
    note: 'Note',
    submit: 'Submit',
};

export const options = {
    transactionType: [
        { label: 'Debit', value: 'debit' },
        { label: 'Credit', value: 'credit' },
    ],
    category: [
        { label: 'Food', value: 'food' },
        { label: 'Grocery', value: 'grocery' },
        { label: 'Bike', value: 'bike' },
        { label: 'Fuel', value: 'fuel' },
    ],
    source: [
        { label: 'HDFC Bank Debit Card', value: 'hdfc1' },
        { label: 'HDFC Moneyback Plus Credit Card', value: 'hdfc2' },
        { label: 'HDFC Bank UPI Credit Card', value: 'hdfc3' },
        { label: 'SBI Bank', value: 'sbi' },
    ],
};
