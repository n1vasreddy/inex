import React from 'react';
import AddAccount from '@/components/profile-setup/AddAccount';
import { IAccountInfo } from '@/store/accounts';
import { useLocalSearchParams } from 'expo-router';

export default function addAccount() {
    const params = useLocalSearchParams<IAccountInfo>();

    return <AddAccount {...params} />;
}
