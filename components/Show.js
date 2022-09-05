import React, { useEffect, useState } from 'react'
import { View, ImageBackground, Text, Button, StyleSheet } from 'react-native'

const Show = ({ txt, time, stop, stopStart, pre, funcStop, playSound, stopSound, image }) => {

    const [quitable, setQuitable] = useState(false)
    function pausePlay() {
        stopStart()
        !pre && setQuitable(stop ? false : true)
    }

    function addzero(chiffre) {
        return chiffre < 10 ? '0' + chiffre : chiffre
    }
    function convertTime(time) {
        return time ? `${addzero((time / 60).toString().split('.')[0])}:${addzero(time % 60)}` : '00:00'
    }

    useEffect(() => {
        pre ? playSound() : stopSound()
    }, [pre])

    const bgImage = txt === 'serie' ? image.serie3 : (txt === 'interval' ? image.interval3 : image.drink)

    return (
        <View style={styles.container}>
            <ImageBackground source={bgImage} resizeMode="fixed" style={styles.image}>
                {/* {pre && <Text>Ilay à vos marques (3, 2, 1)</Text>} */}
                <View style={styles.contenair_main}>
                    <Text style={styles.main_text}>{txt}</Text>
                    <Text style={styles.time}>{convertTime(time)}</Text>
                </View>
                <View style={styles.button}>
                    <Button disabled={pre ? true : false} title={stop ? '▶' : '⏸'} onPress={pausePlay} />
                </View>
                <View style={styles.button}>
                    <Button disabled={quitable ? false : true} title='RETOUR' onPress={funcStop} />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    contenair_main: {
        alignItems: 'center',
        width: '60%'
    },
    main_text: {

    },
    time: {
        fontSize: '200%',
        fontWeight: 'bold',

    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%'
    },
    button: {
        textSize: 50,
        marginTop: 20,
        width: 200,
    }
});

export default Show
