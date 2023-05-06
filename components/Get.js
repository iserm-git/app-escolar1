//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

// create a component
const Get = ({ navigation }) => {
  const [alumno, setAlumno] = useState();

  const getAlumnoData = async () => {
    try {
      //   const headers = { "Content-Type": "application/json" };
      let response = await fetch("http://192.168.1.81:3000/alumnos");
      let data = await response.json();
      setAlumno(data);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getAlumnoData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Detail", {
            item: item,
          })
        }
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            padding: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {item.nombre} {item.apellidoP} {item.apellidoM}
          </Text>
          <Text>{item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alumno}
        renderItem={renderItem}
        keyExtractor={(item) => item.idAlumno}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

//make this component available to the app
export default Get;
