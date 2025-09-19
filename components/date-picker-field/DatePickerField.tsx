import { formatDate } from '@/utils/utils';
import React, { useState } from 'react';
import { View, StyleSheet, StyleProp, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

interface IDatePickerFieldProps {
    label: string;
    trxDate: Date;
    onDateChange: (date: any) => void;
    style?: StyleProp<any>;
}

type ITimePicked = { hours: number; minutes: number };

export default function DatePickerField(props: IDatePickerFieldProps) {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    // Set date
    const onDateConfirmSingle = React.useCallback(
        (params: { date: Date }) => {
            setOpen(false);
            props?.onDateChange(params.date);
            setVisible(true);
        },
        [setOpen, props?.onDateChange],
    );

    const onDateDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onTimeConfirm = React.useCallback(
        ({ hours, minutes }: ITimePicked) => {
            setVisible(false);
        },
        [setVisible],
    );

    const onTimeDismiss = React.useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    return (
        <>
            <View style={[styles.container, props?.style]}>
                <View
                    style={[
                        styles.labelContainer,
                        { width: props.label.length * 6.5 },
                    ]}
                >
                    <Text style={styles.label}>{props.label}</Text>
                    <View style={styles.topHalf} />
                    <View style={styles.bottomHalf} />
                </View>
                <Text>{formatDate(props.trxDate)}</Text>
                <Pressable onPress={() => setOpen(true)} style={styles.icon}>
                    <EvilIcons name="calendar" size={34} color="black" />
                </Pressable>
            </View>
            <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDateDismissSingle}
                date={props.trxDate}
                onConfirm={onDateConfirmSingle}
                label={props.label}
            />
            <TimePickerModal
                visible={visible}
                onDismiss={onTimeDismiss}
                onConfirm={onTimeConfirm}
                hours={props.trxDate.getHours()}
                minutes={props.trxDate.getMinutes()}
                label={props.label}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#777',
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 50,
    },
    labelContainer: {
        position: 'absolute',
        top: -11,
        left: 9,
        height: 20,
    },
    label: {
        fontSize: 12,
        zIndex: 1,
        position: 'absolute',
        left: 4,
        color: '#444',
    },
    topHalf: {
        height: '30%',
        width: '100%',
        flex: 1,
    },
    bottomHalf: {
        height: '70%',
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
    },
    icon: {
        height: 34,
    },
});
