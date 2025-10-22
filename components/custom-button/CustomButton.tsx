import * as React from 'react';
import { Button } from 'react-native-paper';

interface ICustomButtonProps extends React.ComponentProps<typeof Button> {}

const CustomButton = (props: ICustomButtonProps) => (
    <Button {...props} mode="contained">
        {props.children}
    </Button>
);

export default CustomButton;
