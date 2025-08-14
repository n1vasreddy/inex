import React from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';

interface IDropdownItem {
    label: string;
    value: string;
}

interface IDropdownPicker {
    label: string;
    placeholder: string;
    value: string;
    onSelect: React.Dispatch<React.SetStateAction<string>>;
    options: IDropdownItem[];
}

export const DropdownField = (props: IDropdownPicker) => {
    return (
        <PaperProvider>
            <View style={{ backgroundColor: 'orange', height: 10 }}>
                <Dropdown
                    {...props}
                    mode="outlined"
                    statusBarHeight={-140}
                    hideMenuHeader={true}
                />
            </View>
        </PaperProvider>
    );
};

export default DropdownField;
