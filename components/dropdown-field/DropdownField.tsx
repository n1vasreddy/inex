import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';

interface IDropdownPicker extends React.ComponentProps<typeof Dropdown> {}

export const DropdownField = (props: IDropdownPicker) => {
    return (
        <PaperProvider>
            <View style={styles.container}>
                <Dropdown
                    {...props}
                    mode="outlined"
                    statusBarHeight={-110}
                    hideMenuHeader={true}
                />
            </View>
        </PaperProvider>
    );
};

export default DropdownField;

const styles = StyleSheet.create({
    container: {
        width: 280,
        maxHeight: 40,
        margin: 16,
    },
});
