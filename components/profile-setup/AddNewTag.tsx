import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const AddNewTag = () => {
    const [tagName, setTagName] = useState('');
    const [tagEmoji, setTagEmoji] = useState('');

    const handleAddTag = () => {
        if (tagName && tagEmoji) {
            // Call the API to add the tag
            console.log(`Adding tag: ${tagName} with emoji: ${tagEmoji}`);
        }
    };

    return (
        <View>
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
