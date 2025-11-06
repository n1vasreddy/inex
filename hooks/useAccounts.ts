import { AppDispatch, useAppDispatch } from '@/store/store';
import { IAccountInfo, loadAccounts } from '@/store/accounts';
import { addAccount, deleteAccountInfo, updateAccountInfo } from '@/db/queries';

export default function useTransactions() {
    const dispatch: AppDispatch = useAppDispatch();

    const refresh = async () => {
        await dispatch(loadAccounts());
    };

    return {
        addAccount: async (accountInfo: IAccountInfo) => {
            await addAccount(accountInfo);
            await refresh();
        },
        updateAccountInfo: async (accountInfo: IAccountInfo) => {
            await updateAccountInfo(accountInfo);
            await refresh();
        },
        deleteAccount: async (value: string) => {
            await deleteAccountInfo(value);
            await refresh();
        },
        refresh,
    };
}
