import * as React from 'react';
import { TextInput } from 'react-native-paper';

interface ITextInputField extends React.ComponentProps<typeof TextInput> {}

const TextInputField = (props: ITextInputField) => {
    return <TextInput {...props} mode="outlined" />;
};

export default TextInputField;
