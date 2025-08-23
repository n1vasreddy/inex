import * as React from 'react';
import { StyleProp } from 'react-native';
import { Button } from 'react-native-paper';

interface ICustomButtonProps extends React.ComponentProps<typeof Button> {
    style?: StyleProp<any>;
}

const CustomButton = (props: ICustomButtonProps) => (
    <Button {...props} mode="contained">
        {props.children}
    </Button>
);

export default CustomButton;
