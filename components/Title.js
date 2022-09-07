import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Title = () => {
    return (
        <View style={styles.titre_container}>
            <Text style={styles.titre}>Kotrana</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titre_container: {
        backgroundColor: '#0AAFF1',
        height: 120,
        width: "100%",
        alignItems: 'center',
        marginBottom: 50
    },
    titre: {
        marginTop: 40,
        fontSize: 30,
    },
});

export default Title

