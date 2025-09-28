import { useRouter } from 'expo-router';
import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Avatar, Text, IconButton, Button, useTheme } from 'react-native-paper';

type Tag = { id: string; emoji: string; name: string };

const mockTags: Tag[] = [
    { id: '1', emoji: '🍔', name: 'Food' },
    { id: '2', emoji: '✈️', name: 'Travel' },
    { id: '3', emoji: '🏠', name: 'Rent' },
    { id: '4', emoji: '🎁', name: 'Gifts' },
];

export default function Tags() {
    const router = useRouter();
    const [tags, setTags] = React.useState<Tag[]>(mockTags);
    const theme = useTheme();

    const handleDelete = (id: string) => {
        setTags(tags.filter((tag) => tag.id !== id));
    };

    const handleAdd = () => {
        router.navigate('./newTag');
        // const nextTag: Tag = {
        //     id: (Math.random() + '').slice(2),
        //     emoji: '⭐️',
        //     name: `New Tag ${tags.length + 1}`,
        // };
        // setTags((prev) => [...prev, nextTag]);
    };

    const renderItem = ({ item }: { item: Tag }) => (
        <View style={styles.row}>
            <Avatar.Text size={36} label={item.emoji} style={styles.avatar} />
            <Text variant="titleMedium" style={styles.text}>
                {item.name}
            </Text>
            <IconButton
                icon="delete"
                size={20}
                onPress={() => handleDelete(item.id)}
                accessibilityLabel={`Delete ${item.name}`}
                style={styles.delete}
                iconColor={theme.colors.error}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Button mode="contained" onPress={handleAdd} style={styles.addBtn}>
                Add New Tag
            </Button>
            <FlatList
                data={tags}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 24 }}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#fff',
    },
    addBtn: {
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        paddingVertical: 12,
        borderRadius: 8,
        paddingHorizontal: 12,
        elevation: 1,
    },
    avatar: {
        backgroundColor: '#e0e0e0',
        marginRight: 16,
    },
    text: {
        flex: 1,
    },
    delete: {
        marginLeft: 8,
    },
});
