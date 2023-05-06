//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

// create a component
const Detail = ({ route, navigation }) => {
  const { item } = route.params;

  const [alumno, setAlumno] = useState({
    nombre: item.nombre,
    apellidoP: item.apellidoP,
    apellidoM: item.apellidoM,
    email: item.email,
  });

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

  const updateData = () => {
    var myHeaders = new Headers();

    // myHeaders.append(
    //   "Authorization",
    //   "Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263"
    // );

    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.1.81:3000/alumnos/" + item.idAlumno, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: alumno.nombre,
        apellidoP: alumno.apellidoP,
        apellidoM: alumno.apellidoM,
        email: alumno.email,
      }),
    })
      .then((response) => {
        response.text();
        navigation.push("Get");
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const deleteData = () => {
    var myHeaders = new Headers();

    // myHeaders.append(
    //   "Authorization",
    //   "Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263"
    // );

    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.1.81:3000/alumnos/" + item.idAlumno, {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: alumno.nombre,
        apellidoP: alumno.apellidoP,
        apellidoM: alumno.apellidoM,
        email: alumno.email,
      }),
    })
      .then((response) => {
        response.text();
        navigation.push("Get");
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
        value={alumno.nombre}
      />
      <TextInput
        placeholder={"Apellido Paterno"}
        onChangeText={(value) => onChangeApellidoP(value)}
        style={styles.input}
        value={alumno.apellidoP}
      />
      <TextInput
        placeholder={"Apellido Materno"}
        onChangeText={(value) => onChangeApellidoM(value)}
        style={styles.input}
        value={alumno.apellidoM}
      />
      <TextInput
        placeholder={"Email"}
        onChangeText={(value) => onChangeEmail(value)}
        style={styles.input}
        value={alumno.email}
      />

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={updateData}>
          <View style={{ backgroundColor: "blue", padding: 10 }}>
            <Text style={{ color: "white", textAlign: "center" }}>
              Guardar cambios
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteData}>
          <View style={{ backgroundColor: "red", padding: 10 }}>
            <Text style={{ color: "white", textAlign: "center" }}>Borrar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
  },
});

//make this component available to the app
export default Detail;
