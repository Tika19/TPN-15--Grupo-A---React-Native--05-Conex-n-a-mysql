import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.100.47:3000/alumnos');
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {alumnos.length > 0 ? (
        <ScrollView horizontal={true}>
          <View>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Apellido</Text>
              <Text style={styles.columnHeader}>Email</Text>
              <Text style={styles.columnHeader}>Fecha de Nacimiento</Text>
              <Text style={styles.columnHeader}>Móvil</Text>
              <Text style={styles.columnHeader}>DNI</Text>
            </View>
            {alumnos.map((alumno) => (
              <View style={styles.row} key={alumno.Id_alumno}>
                <Text>{alumno.Apellido_alumno}</Text>
                <Text>{alumno.Email_alumno}</Text>
                <Text>{alumno.Fnac_alumno}</Text>
                <Text>{alumno.Mobile_alumno}</Text>
                <Text>{alumno.Dni_alumno}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text>No hay alumnos disponibles.</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 30
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 5,
    marginBottom: 10,
  },
  columnHeader: {
    fontWeight: 'bold',
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 5,
    marginBottom: 10,
  },
});
