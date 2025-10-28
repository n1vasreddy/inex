import { useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'expo-router';
import { View, FlatList, StyleSheet, useColorScheme } from 'react-native';
import { Avatar, IconButton, Button, useTheme } from 'react-native-paper';
import { StyledText as Text } from '@/components/styled-text/StyledText';
import { ITag } from '@/store/tags';
import useTags from '@/hooks/useTags';
import colors from '@/constants/Colors';
import { labels } from '@/constants/constants';

export default function Tags() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const tags: ITag[] = useAppSelector((state) => state.tags.data);
    const theme = useTheme();
    const { removeTag, refreshTags } = useTags();

    useEffect(() => {
        if (!tags.length) refreshTags();
    }, []);

    const handleDelete = async (id: string) => {
        await removeTag(id);
    };

    const handleAdd = () => {
        router.navigate('./newTag');
    };

    const renderItem = ({ item }: { item: ITag }) => (
        <View
            style={[
                {
                    backgroundColor:
                        colors[colorScheme ?? 'light'].tileBackground,
                },
                styles.row,
            ]}
        >
            <Avatar.Text
                size={36}
                label={item.tagEmoji}
                style={[
                    {
                        backgroundColor:
                            colors[colorScheme ?? 'light'].avatarBackground,
                    },
                    styles.avatar,
                ]}
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
        <View
            style={[
                {
                    backgroundColor: colors[colorScheme ?? 'light'].background,
                },
                styles.container,
            ]}
        >
            <Button
                mode="contained"
                onPress={handleAdd}
                color={colors[colorScheme ?? 'light'].text}
                style={[
                    {
                        backgroundColor: colors.fuchsia,
                    },
                    styles.addBtn,
                ]}
            >
                {labels.addTagButton}
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
    },
    addBtn: {
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        paddingHorizontal: 12,
        elevation: 1,
    },
    avatar: {
        marginRight: 16,
    },
    text: {
        flex: 1,
    },
    delete: {
        marginLeft: 8,
    },
});
