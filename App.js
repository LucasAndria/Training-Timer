import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import EditTime from './components/EditTime';
import Timer from './components/Timer';

export default function App() {

  const [serie, setSerie] = useState(60)
  const [interval, setInterval] = useState(10)
  const [pause, setPause] = useState(120)

  const [start, setStart] = useState(false)

  //countdown for the app
  function countdown(func, targetedTime) {

    const a = setTimeout(() => {
      func(prevNumber => (prevNumber - 1))
      // func(prevNumber => (prevNumber - 1 < 10 ? '0' + prevNumber - 1 : prevNumber - 1))
    }, 1000);

    targetedTime === 0 && clearTimeout(a)

  }

  function changeTime(number) {
    setTime(number)
  }

  function fstart() {
    setStart(true)
  }

  // countdown(setTime, time)

  return (
    <View style={styles.container}>
      {/* <TextInput style={styles.input} onChangeText={(e) => changeTime(e)} />
      <Text>{time}</Text> */}
      {start && <Timer />}
      {!start && <EditTime s={serie} fS={setSerie} i={interval} fI={setInterval} p={pause} fP={setPause} start={fstart} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marigin: 15,
    heigth: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  }
});
