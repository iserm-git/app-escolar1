import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";

export default function Post() {
  const [alumno, setAlumno] = useState({
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeNombre = (value) => {
    setAlumno({ ...alumno, nombre: value });
  };

  const onChangeApellidoP = (value) => {
    setAlumno({ ...alumno, apellidoP: value });
  };

  const onChangeApellidoM = (value) => {
    setAlumno({ ...alumno, apellidoM: value });
  };

  const onChangeEmail = (value) => {
    setAlumno({ ...alumno, email: value });
  };

  const saveData = () => {
    setLoading(true);
    var myHeaders = new Headers();

    // myHeaders.append(
    //   "Authorization",
    //   "Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263"
    // );

    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.1.81:3000/alumnos", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: alumno.nombre,
        apellidoP: alumno.apellidoP,
        apellidoM: alumno.apellidoM,
        email: alumno.email,
      }),
    })
      .then((response) => {
        setLoading(false);
        response.text();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={"Nombre"}
        onChangeText={(value) => onChangeNombre(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Apellido Paterno"}
        onChangeText={(value) => onChangeApellidoP(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Apellido Materno"}
        onChangeText={(value) => onChangeApellidoM(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Email"}
        onChangeText={(value) => onChangeEmail(value)}
        style={styles.input}
      />

      <TouchableOpacity onPress={saveData}>
        <View style={{ backgroundColor: "blue", padding: 10 }}>
          <Text style={{ color: "white", textAlign: "center" }}>
            {loading ? "Cargando..." : "Guardar"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    margin: 15,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
  },
});
