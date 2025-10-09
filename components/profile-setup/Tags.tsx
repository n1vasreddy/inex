import { useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'expo-router';
import { View, FlatList, StyleSheet } from 'react-native';
import { Avatar, Text, IconButton, Button, useTheme } from 'react-native-paper';
import { ITag } from '@/store/tags';
import useTags from '@/hooks/useTags';

export default function Tags() {
    const router = useRouter();
    const tags: ITag[] = useAppSelector((state) => state.tags.data);
    const theme = useTheme();
    const { removeTag, refreshTags } = useTags();

    useEffect(() => {
        refreshTags();
    }, []);

    const handleDelete = async (id: string) => {
        await removeTag(id);
    };

    const handleAdd = () => {
        router.navigate('./newTag');
    };

    const renderItem = ({ item }: { item: ITag }) => (
        <View style={styles.row}>
            <Avatar.Text
                size={36}
                label={item.tagEmoji}
                style={styles.avatar}
            />
            <Text variant="titleMedium" style={styles.text}>
                {item.tagName}
            </Text>
            <IconButton
                icon="delete"
                size={20}
                onPress={() => handleDelete(item.id)}
                accessibilityLabel={`Delete ${item.tagName}`}
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
