import React, { useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import TextInput from '@/components/text-input-field/TextInputField';
import Button from '@/components/custom-button/CustomButton';
import { useNavigation } from 'expo-router';
import useTags from '@/hooks/useTags';
import colors from '@/constants/Colors';
import { labels } from '@/constants/constants';
import { PaperProvider } from 'react-native-paper';

const AddNewTag = () => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const { addTag } = useTags();
    const [tagName, setTagName] = useState('');
    const [tagEmoji, setTagEmoji] = useState('');

    const handleAddTag = async () => {
        if (tagName && tagEmoji) {
            const tagInfo = {
                id: tagName.split(' ').join('-').trim(),
                tagName,
                tagEmoji,
            };
            await addTag(tagInfo);
        }
        navigation.goBack();
    };

    return (
        <PaperProvider>
            <View
                style={[
                    {
                        backgroundColor:
                            colors[colorScheme ?? 'light'].background,
                    },
                    addNewTagStyles.container,
                ]}
            >
                <TextInput
                    label={labels.tagName}
                    value={tagName}
                    onChangeText={(text) => setTagName(text)}
                />
                <TextInput
                    label={labels.tagEmoji}
                    value={tagEmoji}
                    onChangeText={(text) => setTagEmoji(text)}
                />
                <Button
                    mode="contained"
                    onPress={handleAddTag}
                    labelStyle={{ color: colors.babyBlue }}
                    style={{ backgroundColor: colors.fuchsia, marginTop: 16 }}
                >
                    {labels.addTag}
                </Button>
            </View>
        </PaperProvider>
    );
};

export default AddNewTag;

const addNewTagStyles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 16,
        flexDirection: 'column',
        rowGap: 10,
        justifyContent: 'center',
    },
});
