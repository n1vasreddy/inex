import { AppDispatch, useAppDispatch } from '@/store/store';
import { loadTransactions } from '@/store/transactions';
import {
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactions,
} from '@/db/queries';
import { ITransactionInfo } from '@/store/transactions';
import { openDatabase } from '@/db/database';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';

export default function useTransactions() {
    const dispatch: AppDispatch = useAppDispatch();

    const refresh = async () => {
        await dispatch(loadTransactions());
    };

    const exportToExcel = async () => {
        await openDatabase();
        try {
            const allTransactions: ITransactionInfo[] = await getTransactions();

            const ws = XLSX.utils.json_to_sheet(allTransactions);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Transactions');

            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

            const fileName = 'transactions.xlsx';
            const localUri = FileSystem.cacheDirectory + fileName;

            await FileSystem.writeAsStringAsync(localUri, wbout, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const permissions =
                await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permissions.granted) {
                alert('You need to allow directory access.');
                return;
            }

            const fileUri = await StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                fileName,
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            );
            if (!fileUri)
                throw new Error('Could not create file in Downloads directory');

            const fileContent = await FileSystem.readAsStringAsync(localUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            await FileSystem.writeAsStringAsync(fileUri, fileContent, {
                encoding: FileSystem.EncodingType.Base64,
            });

            alert('Excel file exported to selected folder!');
        } catch (error) {
            console.error('Error exporting transactions:', error);
        }
    };

    return {
        add: async (trx: any) => {
            await addTransaction(trx);
            await refresh();
        },
        update: async (trx: any) => {
            await updateTransaction(trx);
            await refresh();
        },
        remove: async (id: string) => {
            await deleteTransaction(id);
            await refresh();
        },
        exportToExcel,
        refresh,
    };
}
