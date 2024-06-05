import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

interface Data {
  temperature: number;
  salinity: number;
  pH: number;
  pollutants: string[];
}

const ReadData = () => {
  const [data, setData] = useState<Data[]>([]); // Especificando o tipo de dados como um array de Data

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Data[]>('https://fakeapi.com/data'); // Especificando o tipo de dados esperado na resposta da API
      setData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados de monitoramento:', error);
    }
  };

  return (
    <View>
      <Text>Dados de Monitoramento:</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>Temperatura: {item.temperature}</Text>
            <Text>pH: {item.pH}</Text>
            <Text>Poluentes: {item.pollutants.join(', ')}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ReadData;
