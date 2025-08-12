
// Function to format currency
export const formatCurrency = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    });
    return formatter.format(amount);
}

// Function to format date along with HH:MM
export const formatDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    return formatter.format(date);
}