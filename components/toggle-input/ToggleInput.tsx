import React, { ComponentProps } from 'react';
import { View, StyleSheet, StyleProp } from 'react-native';
import { Text, Switch } from 'react-native-paper';

interface IToggleInput
    extends Omit<ComponentProps<typeof Switch>, 'value' | 'onValueChange'> {
    value: string;
    onValueChange: (value: string) => void;
    options: IOption[];
    style?: StyleProp<any>;
    trackColor: { true: string; false: string };
}

interface IOption {
    label: string;
    value: boolean;
    color: string;
}

const ToggleInput = (props: IToggleInput) => {
    const targetOption: IOption =
        props.options.find((option: IOption) => props.value == option.label) ??
        props.options[0];

    const onValueChange = (value: boolean) => {
        const targetOption =
            props.options.find((option: IOption) => option.value == value) ??
            props.options[0];
        props.onValueChange(targetOption.label);
    };

    return (
        <>
            <View style={[props?.style, styles.container]}>
                <Text variant="titleMedium" style={{}}>
                    {targetOption.label}
                </Text>
                <Switch
                    {...props}
                    value={targetOption.value}
                    onValueChange={onValueChange}
                    thumbColor={targetOption.color}
                    trackColor={props?.trackColor}
                    style={{}}
                />
            </View>
        </>
    );
};

export default ToggleInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
});
