import { ThemedText } from '@/components/styleComponents/ThemedText';
import { ThemedView } from '@/components/styleComponents/ThemedView';
import { Room } from '@/interfaces';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';

function Chat() {
    const [chats, setChats] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const chatsData = await axios.get("https://jinis-api.vercel.app/chat/rooms");
                setChats(chatsData.data.data);
            } catch (error) {
                setError("Error al cargar los chats");
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#007bff" style={styles.loading} />;
    }

    if (error) {
        return (
            <ThemedView style={styles.errorContainer}>
                <ThemedText type="subtitle" style={styles.errorText}>
                    {error}
                </ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView lightColor='#FFFFFF' darkColor='#000000' style={styles.container}>
            <ThemedText lightColor='#000000' darkColor='#FFFFFF' type='title' style={styles.headerText}>
                Chats
            </ThemedText>
            <ScrollView contentContainerStyle={styles.list}>
                {chats.map((chat) => (
                    <Link key={chat.ID_ROOM} href={`/chat/${chat.ID_ROOM}`} style={styles.chatLink}>
                        <View style={styles.chatContainer}>
                            <Text style={styles.chatTitle}>{chat.NOMBRE}</Text>
                        </View>
                    </Link>
                ))}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f7f8fa',
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f7f8fa',
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f7f8fa',
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: 'center',
        padding: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },
    list: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
    },
    chatLink: {
        marginBottom: 8,
        borderRadius: 10,
        overflow: 'hidden',
    },
    chatContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#f8e1d4", // Warmer background color
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: "#555",
    },
});

export default Chat;
