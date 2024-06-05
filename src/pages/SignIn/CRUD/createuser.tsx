import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

const CreateData = () => {
  const [temperature, setTemperature] = useState('');
  const [salinity, setSalinity] = useState('');
  const [pH, setPH] = useState('');
  const [pollutants, setPollutants] = useState('');

  const handleCreateData = async () => {
    try {
      const newData = { temperature, salinity, pH, pollutants };
      await axios.post('https://fakeapi.com/data', newData);
      // Adicionar lógica adicional, como atualizar o estado ou navegar para outra tela após a criação bem-sucedida
    } catch (error) {
      console.error('Erro ao criar dados de monitoramento:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Temperatura da Água"
        value={temperature}
        onChangeText={setTemperature}
      />
      <TextInput
        placeholder="Salinidade"
        value={salinity}
        onChangeText={setSalinity}
      />
      <TextInput
        placeholder="pH"
        value={pH}
        onChangeText={setPH}
      />
      <TextInput
        placeholder="Poluentes"
        value={pollutants}
        onChangeText={setPollutants}
      />
      <Button title="Salvar" onPress={handleCreateData} />
    </View>
  );
};

export default CreateData;
