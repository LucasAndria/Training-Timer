import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';
import SmoothPicker from "react-native-smooth-picker";

const data = [
    'Serie',
    'Interval',
    'Pause',
];

const opacities = {
    0: 1,
    1: 1,
    2: 0.6,
};
const sizeText = {
    0: 18,
    1: 13,
    2: 10,
};

const Item = React.memo(({ opacity, selected, vertical, fontSize, name }) => {
    return (
        <View
            style={[
                styles.OptionWrapper,
                {
                    opacity,
                    borderColor: selected ? '#ABC9AF' : 'transparent',
                    width: vertical ? 130 : 'auto'
                },
            ]}>
            <Text style={{ fontSize }}>{name}</Text>
        </View>
    );
});

const ItemToRender = ({ item, index }, indexSelected, vertical) => {
    const selected = index === indexSelected;
    const gap = Math.abs(index - indexSelected);

    let opacity = opacities[gap];
    if (gap > 3) {
        opacity = opacities[4];
    }
    let fontSize = sizeText[gap];
    if (gap > 1) {
        fontSize = sizeText[2];
    }

    return (
        <Item
            opacity={opacity}
            selected={selected}
            vertical={vertical}
            fontSize={fontSize}
            name={item}
        />
    );
};

const EditTime = ({ s, i, p, ns, fS, fI, fP, fNS, c, fC, start, assetReady }) => {

    function handleChange(index) {
        index === 0 && fC('s')
        index === 1 && fC('i')
        index === 2 && fC('p')
        setSelected(index);
    }
    const [selected, setSelected] = React.useState(0);

    return (

        <View style={styles.containerPrincipale}>
            <View style={styles.section_modif}>
                <TextInput
                    label="serie"
                    keyboardType='number-pad'
                    value={s}
                    onChangeText={(e) => fS(e)}
                    activeUnderlineColor='blue'
                />
                <TextInput
                    label="interval"
                    keyboardType='number-pad'
                    value={i}
                    onChangeText={(e) => fI(e)}
                    activeUnderlineColor='blue'
                />
                <TextInput
                    label="pause"
                    keyboardType='number-pad'
                    value={p}
                    onChangeText={(e) => fP(e)}
                    activeUnderlineColor='blue'
                />
                <TextInput
                    label="Nombre series"
                    keyboardType='number-pad'
                    value={ns}
                    onChangeText={(e) => fNS(e)}
                    activeUnderlineColor='blue'
                />
            </View>

            <View style={styles.wrapperVertical}>
                <SmoothPicker
                    initialScrollToIndex={selected}
                    onScrollToIndexFailed={() => { }}
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    scrollAnimation
                    onSelected={({ item, index }) => handleChange(index)}
                    renderItem={(option) => ItemToRender(option, selected, false)}
                    magnet
                    selectOnPress
                />
            </View>
            <Button disabled={assetReady ? false : true} title="Commencer" onPress={start} />
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
    section_modif: {
        padding: 20,
        alignItems: 'center',
        gap: 5
    },
    edition: {
        display: 'flex',
        flexDirection: 'row'
    },
    wrapperVertical: {
        width: 250,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        margin: 'auto',
        color: 'black',
    },
    OptionWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 30,
        paddingRight: 30,
        height: 30,
        borderWidth: 3,
        borderRadius: 10,
    },
});

export default EditTime

