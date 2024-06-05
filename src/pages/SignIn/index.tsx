import React, { useEffect, useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, StatusBar, Keyboard, ActivityIndicator, SafeAreaView, TouchableWithoutFeedback, Linking } from 'react-native'
import styles from "./style"
const logo = require("../../../assets/logoseaa.png")
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Animatable from "react-native-animatable"
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonComponent from '../../components/ButtonComponent';
import AuthContext from '../../contexts/Auth';
import axios from 'axios';

export default function SignIn() {

  const [login, setLogin] = useState("");
  const [pwd, setPwd] = useState("");

  const { user, userData, loading, errorMsg, handleSigned } = useContext(AuthContext)

  const [pwdWrong, setPwdWrong] = useState(false)

  const navigation = useNavigation<any>();

  const [typeInput, setTypeInput] = useState(true)

  const [checkboxState, setCheckboxState] = useState(false);

  const closeInput = () => {
    Keyboard.dismiss()
  }

  const loadFromStorage = async () => {
    const loginSaved = await AsyncStorage.getItem("@loginUser")
    const pwdSaved = await AsyncStorage.getItem("@pwdUser")
    const checkBoxStateSaved = await AsyncStorage.getItem("@checkBoxState")

    if(checkBoxStateSaved == "true") {
      setCheckboxState(true)
    } else if (checkBoxStateSaved == "false") {
      setCheckboxState(false)
    }

    if (loginSaved && pwdSaved) {
      setLogin(loginSaved)
      setPwd(pwdSaved)
    }
  }

  useEffect(() => {
    loadFromStorage()
  }, [])


  const submitForm = async () => {

    if(login.length == 0 || pwd.length == 0 ) {
      return
    }
    const fakeAPIData = {
      temperature: 25, // Temperatura da água em graus Celsius
      salinity: 35,    // Salinidade em partes por mil (ppt)
      pH: 7.5,         // pH da água
      pollutants: ['oil', 'plastic', 'chemicals'] // Lista de poluentes detectados
    };

   // Simula a resposta da chamada de API após um atraso de 1 segundo
   setTimeout(() => {
    // HandleSigned é chamado para simular o login bem-sucedido
    handleSigned(true);
    
    // UserData é chamado para fornecer os dados simulados do usuário
    userData({
      id: 2, 
      name: login,
    });

    // Salva o estado da caixa de seleção no AsyncStorage
    AsyncStorage.setItem("@checkBoxState", checkboxState.toString());
    if(checkboxState) {
      AsyncStorage.setItem("@loginUser", login);
      AsyncStorage.setItem("@pwdUser", pwd);
    } else {
      AsyncStorage.removeItem('@loginUser');
      AsyncStorage.removeItem('@pwdUser');
    }
  }, 1000); // Simula um atraso de 1 segundo

  // Simula a obtenção de dados bem-sucedida, seta pwdWrong para false
  setPwdWrong(false);
};

  useEffect(() => {
    setTimeout(() => {
      setPwdWrong(false)
    }, 3000)
  }, [user])

  const handleTypeInput = () => {

    setTypeInput(!typeInput)
  }

  const handleStateCheckbox = () => {

    setCheckboxState(!checkboxState)

  }

  return (
    <TouchableWithoutFeedback
      onPress={closeInput}
    >
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
    <KeyboardAvoidingView style={styles.conteiner}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.tittleConteiner}>
        <View style={styles.logoFather}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
      <Animatable.View style={styles.formularyConteiner} animation="fadeInUp" delay={1000}>
        {errorMsg != "" ? <View style={styles.pwdWrongConteiner}>
            <Text style={styles.pwdWrongText}>Usuário ou senha inválidos.</Text>
        </View> : <View></View>}
        <View style={styles.formFather}>
          <View style={styles.formTittle}>
            <Text style={styles.tittle}>Bem-Vindo!</Text>
            <Text style={styles.description}>Faça seu login para continuar.</Text>
          </View>
          <View style={styles.form}>
            <TextInput placeholder='Usuário' style={styles.input} placeholderTextColor="grey" onChangeText={(text) => setLogin(text)} value={login}/>
            <View style={styles.inputConteiner} >
              <TextInput placeholder='Senha' style={styles.input} placeholderTextColor="grey" onChangeText={(text) => setPwd(text)} secureTextEntry={typeInput} value={pwd}/>
              <Icon name={typeInput ? "eye" : "eye-slash"} size={30} color="grey" style={styles.icon} onPress={handleTypeInput}/>
            </View>
            <View style={styles.rememberEndForgot}>
              <BouncyCheckbox
                size={25}
                fillColor="grey"
                unfillColor="#FFFFFF"
                textStyle={{
                  textDecorationLine: "none",
                }}
                text="Lembre-me"
                iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                disableBuiltInState
                isChecked={checkboxState}
                onPress={handleStateCheckbox}
              />
              <TouchableOpacity>
                <Text style={styles.forgotPassword} onPress={() => {navigation.navigate("ForgotPwd")}}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
            <ButtonComponent label={loading ? <ActivityIndicator size={35} color="white"/> : "Acessar"} click={submitForm}  />
            <View style={{flexDirection: "row", marginTop: 20, justifyContent: "space-between",}}>
              <Text style={{marginRight: 15, color: "grey"}}>mobileapp © 2024</Text>
            </View>
          </View>
        </View>
      </Animatable.View>
      <StatusBar barStyle="dark-content"/>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}