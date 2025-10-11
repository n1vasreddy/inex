import { ITag } from '@/store/tags';
import React from 'react';
import { View, StyleSheet, StyleProp } from 'react-native';
import { Chip, Text } from 'react-native-paper';

interface IChipSelectionInputProps {
    label: string;
    data: ITag[];
    style?: StyleProp<any>;
    value?: string[];
    onChange?: (value: string[]) => void;
}

const ChipSelectionInput = (props: IChipSelectionInputProps) => {
    const handleChipSelect = (chipId: string) => {
        props?.onChange &&
            props.onChange((prevChips: string[]) => {
                return prevChips.includes(chipId)
                    ? prevChips.filter((id: string) => id !== chipId)
                    : [...prevChips, chipId];
            });
    };

    return (
        <View style={[styles.container, props?.style]}>
            <Text variant="labelMedium">{props.label}</Text>
            <View style={styles.innerContainer}>
                {props?.data.map((chip) => (
                    <Chip
                        key={chip.id}
                        style={
                            props?.value?.includes(chip.id)
                                ? styles.selectedChip
                                : styles.unselectedChip
                        }
                        onPress={() => handleChipSelect(chip.id)}
                    >
                        {chip.tagEmoji} {chip.tagName}
                    </Chip>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 4,
    },
    innerContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 4,
    },
    selectedChip: {
        backgroundColor: '#e6f5fc',
    },
    unselectedChip: {
        backgroundColor: '#fff',
    },
});

export default ChipSelectionInput;
