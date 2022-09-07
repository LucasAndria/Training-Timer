import * as React from 'react';
import { View, Text, Button, StyleSheet, Picker } from 'react-native'
import { TextInput } from 'react-native-paper';
import SmoothPicker from "react-native-smooth-picker";

const EditTime = ({ s, i, p, ns, fS, fI, fP, fNS, c, fC, start, assetReady }) => {

    function handleChange(index) {
        fC(index)
    }

    return (

        <View style={styles.containerPrincipale}>
            <View style={styles.section_modif}>
                <TextInput
                    label="serie"
                    keyboardType='number-pad'
                    value={s.toString()}
                    onChangeText={(e) => fS(e)}
                    activeUnderlineColor='blue'
                    style={styles.input}
                />
                <TextInput
                    label="interval"
                    keyboardType='number-pad'
                    value={i.toString()}
                    onChangeText={(e) => fI(e)}
                    activeUnderlineColor='blue'
                    style={styles.input}
                />
                <TextInput
                    label="pause"
                    keyboardType='number-pad'
                    value={p.toString()}
                    onChangeText={(e) => fP(e)}
                    activeUnderlineColor='blue'
                    style={styles.input}
                />
                <TextInput
                    label="Nombre series"
                    keyboardType='number-pad'
                    value={ns.toString()}
                    onChangeText={(e) => fNS(e)}
                    activeUnderlineColor='blue'
                    style={styles.input}
                />
                <Picker style={styles.dropdown} selectedValue={c} onValueChange={handleChange}>
                    <Picker.Item label='serie' value='s' />
                    <Picker.Item label='intervalle' value='i' />
                    <Picker.Item label='pause' value='p' />
                </Picker>
            </View>

            <Button disabled={assetReady ? false : true} title="Commencer" onPress={start} />
        </View>
    )
}

const styles = StyleSheet.create({
    containerPrincipale: {
        marginTop: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        //     flex: 1,
        //     backgroundColor: '#fff',
        //     alignItems: 'center',
        //     justifyContent: 'center',
    },
    input: {
        height: 50,
        width: 200,
        margin: 5
    },
    section_modif: {
        padding: 20,
        alignItems: 'center',
    },
    edition: {
        display: 'flex',
        flexDirection: 'row'
    },
    dropdown: {
        height: 50,
        width: 200,
        marginBottom: 10,
        marginTop: 10,
    }
});

export default EditTime

