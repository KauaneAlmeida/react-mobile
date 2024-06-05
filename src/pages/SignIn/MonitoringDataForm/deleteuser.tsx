import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

const DeleteData = () => {
  const [id, setID] = useState('');

  const handleDeleteData = async () => {
    try {
      await axios.delete(`https://fakeapi.com/data/${id}`);
  
    } catch (error) {
      console.error('Erro ao excluir dados de monitoramento:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="ID do Dado a Excluir"
        value={id}
        onChangeText={setID}
      />
      <Button title="Excluir" onPress={handleDeleteData} />
    </View>
  );
};

export default DeleteData;
