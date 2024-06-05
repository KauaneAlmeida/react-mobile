import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import styles from './style';

// Defina o tipo dos elementos dentro do array de monitoringData
interface MonitoringDataItem {
    temperature: number;
    salinity: number;
    pH: number;
    pollutants: string[];
}

export default function Home() {
    const [loading, setLoading] = useState(false);
    // Inicialize monitoringData como um array vazio do tipo MonitoringDataItem
    const [monitoringData, setMonitoringData] = useState<MonitoringDataItem[]>([]);

    useEffect(() => {
        fetchMonitoringData();
    }, []);

    const fetchMonitoringData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://fakeapi.com/monitoringdata');
            // Certifique-se de que o response.data é do tipo MonitoringDataItem[]
            setMonitoringData(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados de monitoramento:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={monitoringData}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>Temperatura: {item.temperature}</Text>
                            <Text style={styles.itemSubtitle}>Salinidade: {item.salinity}</Text>
                            <Text style={styles.itemSubtitle}>pH: {item.pH}</Text>
                            <Text style={styles.itemSubtitle}>Poluentes: {item.pollutants.join(', ')}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </SafeAreaView>
    );
}
