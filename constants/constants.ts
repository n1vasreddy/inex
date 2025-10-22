export const labels = {
    amount: 'Amount',
    transactionType: 'Transaction Type',
    transactionDate: 'Transaction Date & Time',
    paymentMethod: 'Payment Method',
    category: 'Category',
    note: 'Note',
    submit: 'Submit',
    tagName: 'Tag Name',
    tagEmoji: 'Tag Emoji',
    addTag: 'Add Tag',
};

export const options = {
    transactionType: {
        true: { label: 'Credit', value: true, color: '#18a558' },
        false: { label: 'Debit', value: false, color: '#f51720' },
    },
    transactionTypeTrackColor: { true: '#46b779', false: '#f7454d' },
    paymentMethods: [
        { label: 'HDFC Bank Debit Card', value: 'hdfc1' },
        { label: 'HDFC Moneyback Plus Credit Card', value: 'hdfc2' },
        { label: 'HDFC Bank UPI Credit Card', value: 'hdfc3' },
        { label: 'SBI Bank', value: 'sbi' },
    ],
};

export enum TransactionType {
    Debit = 'Debit',
    Credit = 'Credit',
}
