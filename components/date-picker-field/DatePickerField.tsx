import { formatDate } from '@/utils/utils';
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    StyleProp,
    Pressable,
    useColorScheme,
} from 'react-native';
import { StyledText as Text } from '@/components/styled-text/StyledText';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import colors from '@/constants/Colors';

interface IDatePickerFieldProps {
    label: string;
    trxDate: Date;
    onDateChange: (date: any) => void;
    style?: StyleProp<any>;
}

type ITimePicked = { hours: number; minutes: number };

export default function DatePickerField(props: IDatePickerFieldProps) {
    const colorScheme = useColorScheme();
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
            props?.onDateChange((date: Date) => {
                date.setHours(hours);
                date.setMinutes(minutes);
                return date;
            });
        },
        [setVisible],
    );

    const onTimeDismiss = React.useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const backgroundColor = {
        backgroundColor: colors[colorScheme ?? 'light'].background,
    };

    return (
        <>
            <View style={[backgroundColor, styles.container, props?.style]}>
                <View
                    style={[
                        styles.labelContainer,
                        { width: props.label.length * 6.5 },
                    ]}
                >
                    <Text style={styles.label}>{props.label}</Text>
                    <View style={styles.topHalf} />
                    <View style={[backgroundColor, styles.bottomHalf]} />
                </View>
                <Text>{formatDate(props.trxDate)}</Text>
                <Pressable onPress={() => setOpen(true)} style={styles.icon}>
                    <EvilIcons
                        name="calendar"
                        size={34}
                        color={colors.fuchsia}
                    />
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
    },
    icon: {
        height: 34,
    },
});
