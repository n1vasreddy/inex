import React, { useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { CustomButton } from '@/components/CustomButton';
import { Text } from 'react-native';

interface IDropdownItem {
    label: string;
    value: string;
}

interface IDropdownPicker {
    selectedValue: string;
    onValueChange: React.Dispatch<React.SetStateAction<string>>;
    dropdownItems: IDropdownItem[];
}

const DropdownPicker = (props: IDropdownPicker) => {
    const pickerRef: any = useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const open = () => {
        pickerRef.current.focus();
    };

    const close = () => {
        pickerRef.current.blur();
        setIsOpen(true);
    };

    return (
        <>
            <CustomButton
                title={'Toggle dropdown'}
                onPress={() => {
                    if (isOpen) close();
                    else open();
                }}
            />
            <Text>{props.selectedValue}</Text>
            <Picker {...props} ref={pickerRef} mode="dropdown" ColorValue="red">
                {props.dropdownItems.map((item: IDropdownItem) => (
                    <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </Picker>
        </>
    );
};

export default DropdownPicker;