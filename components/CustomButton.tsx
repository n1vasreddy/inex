import { Button } from 'react-native-button';

type ICustomButton = {
    title: string;
    onPress: () => void;
    color?: string;
};

export const CustomButton = (props: ICustomButton) => {
    return <Button {...props} />;
};