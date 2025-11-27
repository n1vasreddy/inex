import React from 'react';
import { StyleProp, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { StyledText as Text } from '@/components/styled-text/StyledText';

type IOption = { label: string; value: string };

interface IRadioButtonInputProps
    extends React.ComponentProps<typeof RadioButton> {
    value: string;
    onValueChange: (value: string) => void;
    options: IOption[];
    label?: string;
    style?: StyleProp<any>;
}

const RadioButtonInput = (props: IRadioButtonInputProps) => {
    return (
        <View style={props?.style}>
            {props?.label && <Text>{props.label}</Text>}
            <RadioButton.Group
                onValueChange={props.onValueChange}
                value={props.value}
            >
                {props?.options.map((option: IOption) => (
                    <View
                        key={option.value}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <RadioButton
                            value={option.value}
                            status={
                                props.value === option.value
                                    ? 'checked'
                                    : 'unchecked'
                            }
                            disabled={props.disabled}
                        />
                        <Text>{option.label}</Text>
                    </View>
                ))}
            </RadioButton.Group>
        </View>
    );
};

export default RadioButtonInput;
