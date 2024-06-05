import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

const UpdateData = () => {
  const [id, setID] = useState('');
  const [temperature, setTemperature] = useState('');
  const [salinity, setSalinity] = useState('');
  const [pH, setPH] = useState('');
  const [pollutants, setPollutants] = useState('');

  const handleUpdateData = async () => {
    try {
      const updatedData = { temperature, salinity, pH, pollutants };
      await axios.put(`https://fakeapi.com/data/${id}`, updatedData);
      // Adicionar lógica adicional, como atualizar o estado ou navegar para outra tela após a atualização bem-sucedida
    } catch (error) {
      console.error('Erro ao atualizar dados de monitoramento:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="ID do Dado a Atualizar"
        value={id}
        onChangeText={setID}
      />
      <TextInput
        placeholder="Nova Temperatura da Água"
        value={temperature}
        onChangeText={setTemperature}
      />
      <TextInput
        placeholder="Nova Salinidade"
        value={salinity}
        onChangeText={setSalinity}
      />
      <TextInput
        placeholder="Novo pH"
        value={pH}
        onChangeText={setPH}
      />
      <TextInput
        placeholder="Novos Poluentes"
        value={pollutants}
        onChangeText={setPollutants}
      />
      <Button title="Atualizar" onPress={handleUpdateData} />
    </View>
  );
};

export default UpdateData;
