import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from 'expo-router';
import useTags from '@/hooks/useTags';

const AddNewTag = () => {
    const navigation = useNavigation();
    const { addTag, refreshTags } = useTags();
    const [tagName, setTagName] = useState('');
    const [tagEmoji, setTagEmoji] = useState('');

    const handleAddTag = async () => {
        if (tagName && tagEmoji) {
            await addTag({
                id: tagName.split(' ').join('-').trim(),
                tagName,
                tagEmoji,
            });
            await refreshTags();
            navigation.goBack();
        }
    };

    return (
        <View style={addNewTagStyles.container}>
            <TextInput
                label="Tag Name"
                value={tagName}
                onChangeText={(text) => setTagName(text)}
            />
            <TextInput
                label="Tag Emoji"
                value={tagEmoji}
                onChangeText={(text) => setTagEmoji(text)}
            />
            <Button mode="contained" onPress={handleAddTag}>
                Add Tag
            </Button>
        </View>
    );
};

export default AddNewTag;

const addNewTagStyles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 16,
        flexDirection: 'column',
        rowGap: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});
