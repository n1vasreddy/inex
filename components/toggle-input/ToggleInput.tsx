import React, { ComponentProps } from 'react';
import { View, StyleSheet, StyleProp } from 'react-native';
import { Switch } from 'react-native-paper';
import { StyledText as Text } from '@/components/styled-text/StyledText';

interface IToggleInput extends ComponentProps<typeof Switch> {
    label: string;
    style?: StyleProp<any>;
    trackColor: { true: string; false: string };
}

const ToggleInput = (props: IToggleInput) => {
    return (
        <>
            <View style={[styles.container, props?.style]}>
                <Text variant="titleMedium" style={{}}>
                    {props.label}
                </Text>
                <Switch
                    {...props}
                    value={props.value}
                    onValueChange={props.onValueChange}
                    thumbColor={props.thumbColor}
                    trackColor={props?.trackColor}
                    style={{}} // DO NOT REMOVE - This is necessary for alignment
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
