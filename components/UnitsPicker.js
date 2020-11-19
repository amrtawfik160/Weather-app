import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default function UnitsPicker({ unitSystem, setunitSystem }) {
    return (
        <View style={styles.unitSystem}>
            <Picker
                selectedValue={unitSystem}
                onValueChange={item => setunitSystem(item)}
                mode='dropdown'
            >
                <Picker.Item label='C°' value='metric' />
                <Picker.Item label='F°' value='imperial' />
            </Picker>
        </View>
    );
}
const styles = StyleSheet.create({
    unitSystem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -30,
            },
            android: {
                top: 30,
            },
        }),
        left: 20,
        height: 50,
        width: 100,
        fontSize: 12,
    },
});
