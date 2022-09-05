import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import EditTime from './components/EditTime';
import Show from './components/Show';
import Title from './components/Title';
import { Audio } from 'expo-av';

export default function App() {

  const [default_serie, setDefSerie] = useState(60)
  const [default_interval, setDefInterval] = useState(10)
  const [default_pause, setDefPause] = useState(120)
  const [default_nbrSerie, setDefNbrSerie] = useState(4)

  const [serie, setSerie] = useState(default_serie)
  const [interval, setInterval] = useState(default_interval)
  const [pause, setPause] = useState(default_pause)
  const [nbrSerie, setNbrSerie] = useState(default_nbrSerie)

  const [start, setStart] = useState(false)
  const [toShow, setToShow] = useState('s')
  const [stop, setStop] = useState(false)
  const [pre, setPre] = useState(false)
  const [assetReady, setAssetReady] = useState(false)
  const [sound, setSound] = useState();
  const [image, setImage] = useState({
    serie1: require('./public/images/training1.jpg'),
    serie2: require('./public/images/training2.jpg'),
    serie3: require('./public/images/training3.jpg'),
    serie4: require('./public/images/training4.jpg'),
    interval1: require('./public/images/interval1.jpg'),
    interval2: require('./public/images/interval2.jpg'),
    interval3: require('./public/images/interval3.jpg'),
    drink: require('./public/images/drink.jpg'),
  })

  useEffect(() => {
    default_serie !== serie && setSerie(default_serie)
    default_interval !== interval && setInterval(default_interval)
    default_pause !== pause && setPause(default_pause)
    default_nbrSerie !== nbrSerie && setNbrSerie(default_nbrSerie)
  }, [default_serie, default_interval, default_pause, default_nbrSerie])

  useEffect(() => {
    if (serie < 0) {
      finSerie()
    }
    if (interval < 0) {
      finInterval()
    }
    if (pause < 0) {
      finPause()
    }
  }, [serie, interval, pause])

  function reset(target = null) {
    target === 's' && setSerie(default_serie)
    target === 'i' && setInterval(default_interval)
    target === 'p' && setPause(default_pause)
    target === null && (setSerie(default_serie), setInterval(default_interval), setPause(default_pause))
  }

  function finSerie() {
    setStop(true)
    setPre(true)

    const tmp = setTimeout(() => {

      setPre(false)
      setStop(false)

      clearTimeout(tmp)
    }, 1000);

    setNbrSerie(prev => prev - 1)
    if (nbrSerie <= 1) {
      setToShow('p')
      setNbrSerie(default_nbrSerie)
    } else {
      setToShow('i')
    }
    reset()
  }

  function finInterval() {
    setStop(true)
    setPre(true)

    const tmp = setTimeout(() => {

      setPre(false)
      setStop(false)

      clearTimeout(tmp)
    }, 3000);
    setToShow('s')
    reset()
  }

  function finPause() {
    setStop(true)
    setPre(true)

    const tmp = setTimeout(() => {

      setPre(false)
      setStop(false)

      clearTimeout(tmp)
    }, 3000);
    setToShow('s')
    reset()
  }

  function countdown(timerId = "s", timerStop = false) {

    const timer_id = setTimeout(() => {
      timerId === 's' && setSerie(prevNumber => (prevNumber - 1))
      timerId === 'i' && setInterval(prevNumber => (prevNumber - 1))
      timerId === 'p' && setPause(prevNumber => (prevNumber - 1))
    }, 1000);

    timerStop && clearTimeout(timer_id)

  }

  function funcStart() {
    setStart(true)
    setStop(false)
  }

  function funcStop() {
    setStart(false)
  }

  function stopStart() {
    setStop(prev => !prev)
  }

  start && countdown(toShow, stop)

  //////////////////////////////////////////////// THE SOUND //////////////////////////////////

  async function recupSound() {
    // console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./public/songs/beep_3_sec.mp3')
    );
    setSound(sound);
  }

  //call the function recup on the component mount
  useEffect(() => {
    recupSound()
  }, [])

  async function playSound() {
    // console.log('Playing Sound');
    await sound.playAsync();
  }

  async function stopSound() {
    // console.log('stoping Sound');
    // sound.unloadAsync();
    sound.stopAsync();
  }

  useEffect(() => {
    if (!sound) return
    setAssetReady(true)
  }, [sound])

  return (
    <View style={styles.container}>
      {!start && <Title />}
      {start && <Show
        txt={toShow === 's' ? 'serie' : (toShow === 'i' ? 'interval' : 'pause')} time={toShow === 's' ? serie : (toShow === 'i' ? interval : pause)}
        setToShow={setToShow}
        stop={stop}
        stopStart={stopStart}
        pre={pre}
        funcStop={funcStop}
        playSound={playSound}
        stopSound={stopSound}
        image={image}
      />}

      {!start && <EditTime
        s={default_serie}
        fS={setDefSerie}
        i={default_interval}
        fI={setDefInterval}
        p={default_pause}
        fP={setDefPause}
        ns={default_nbrSerie}
        fNS={setDefNbrSerie}
        c={toShow}
        fC={setToShow}
        start={funcStart}
        assetReady={assetReady}
      />}
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
