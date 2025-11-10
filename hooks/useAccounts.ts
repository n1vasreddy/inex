import { AppDispatch, useAppDispatch } from '@/store/store';
import { IAccountInfo, loadAccounts } from '@/store/accounts';
import { addAccount, deleteAccountInfo, updateAccountInfo } from '@/db/queries';

export default function useTransactions() {
    const dispatch: AppDispatch = useAppDispatch();

    const refreshAccounts = async () => {
        await dispatch(loadAccounts());
    };

    return {
        addAccount: async (accountInfo: IAccountInfo) => {
            await addAccount(accountInfo);
            await refreshAccounts();
        },
        updateAccountInfo: async (accountInfo: IAccountInfo) => {
            await updateAccountInfo(accountInfo);
            await refreshAccounts();
        },
        deleteAccount: async (value: string) => {
            await deleteAccountInfo(value);
            await refreshAccounts();
        },
        refreshAccounts,
    };
}
