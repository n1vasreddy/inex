import React from 'react';
import { Dropdown } from 'react-native-paper-dropdown';

interface IDropdownPicker extends React.ComponentProps<typeof Dropdown> {}

export const DropdownField = (props: IDropdownPicker) => {
    return (
        <Dropdown
            {...props}
            mode="outlined"
            statusBarHeight={-110}
            hideMenuHeader={true}
        />
    );
};

export default DropdownField;
