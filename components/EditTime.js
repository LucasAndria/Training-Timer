import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const EditTime = ({ s, i, p, fS, fI, fP, start }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>series</Text>
            <TextInput value={s} style={styles.input} onChangeText={(e) => fS(e)} />

            <Text style={styles.label}>interval</Text>
            <TextInput value={i} style={styles.input} onChangeText={(e) => fI(e)} />

            <Text style={styles.label}>pause</Text>
            <TextInput value={p} style={styles.input} onChangeText={(e) => fP(e)} />

            <button onClick={start}>commencer</button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        heigth: 40,
        width: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        margin: 5,
        marginTop: 0,
        marginBottom: 0,
        borderRadius: 40,
        textAlign: 'center'
    },
    label: {
        marginBottom: 8,
        marginTop: 15
    },
    edition: {
        display: 'flex',
        flexDirection: 'row'
    }
});

export default EditTime

