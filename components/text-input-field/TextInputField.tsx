import * as React from 'react';
import { StyleProp } from 'react-native';
import { TextInput } from 'react-native-paper';

interface ITextInputField extends React.ComponentProps<typeof TextInput> {
    style?: StyleProp<any>;
}

const TextInputField = (props: ITextInputField) => {
    return <TextInput {...props} mode="outlined" />;
};

export default TextInputField;
