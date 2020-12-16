import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  TouchableHighlight,
  View,
  Text,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [inpuTexto, guardarInputTexto] = useState('');
  const [nombreStorage, guardarNombreStorage] = useState('');
  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  const guardarDatos = async () => {
    console.log('guardando...', inpuTexto);

    try {
      await AsyncStorage.setItem('nombre', inpuTexto);
      guardarNombreStorage(inpuTexto);
    } catch (e) {
      console.log(e);
    }
  };
  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre');
      guardarNombreStorage('');
    } catch (e) {
      console.log(e);
    }
  };
  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre');
      console.log(nombre);
      guardarNombreStorage(nombre);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <View style={styles.contenedor}>
        {nombreStorage ? <Text> Hola: {nombreStorage} </Text> : null}

        <TextInput
          placeholder="Escribe tu Nombre"
          style={styles.input}
          onChangeText={(texto) => guardarInputTexto(texto)}
        />

        <Button title="Guardar" color="#333" onPress={() => guardarDatos()} />

        {nombreStorage ? (
          <TouchableHighlight
            onPress={() => eliminarDatos()}
            style={styles.btnEliminar}>
            <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>
          </TouchableHighlight>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  textoEliminar: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300,
  },
});

export default App;
