import React from 'react';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

interface IDatePickerFieldProps {
    onDateChange: (date: any) => void;
    selectedDate: string | any;
}

export default function DatePickerField(props: IDatePickerFieldProps) {
    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            props?.onDateChange(params.date);
        },
        [setOpen, props?.onDateChange],
    );

    return (
        <>
            <Button
                onPress={() => setOpen(true)}
                uppercase={false}
                mode="outlined"
                style={{ marginTop: 18 }}
            >
                Pick single date
            </Button>
            <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={props.selectedDate}
                onConfirm={onConfirmSingle}
            />
        </>
    );
}
