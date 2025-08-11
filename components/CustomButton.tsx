import { Button } from 'react-native';

type ICustomButton = {
    title: string;
    onPress: () => void;
    color?: string;
};

export const CustomButton = (props: ICustomButton) => {
    return <Button {...props} />;
};