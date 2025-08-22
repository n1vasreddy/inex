import React from 'react';
import { Dropdown } from 'react-native-paper-dropdown';
import { StyleProp, View } from 'react-native';

interface IDropdownPicker extends React.ComponentProps<typeof Dropdown> {
    style?: StyleProp<any>;
}

export const DropdownField = (props: IDropdownPicker) => {
    return (
        <View style={props.style}>
            <Dropdown
                {...props}
                mode="outlined"
                statusBarHeight={0}
                hideMenuHeader={true}
            />
        </View>
    );
};

export default DropdownField;
