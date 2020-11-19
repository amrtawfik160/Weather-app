import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '../utils/index';

export default function RefreshIcon({ onRefresh }) {
    return (
        <View style={styles.root}>
            <MaterialIcons name='refresh' size={25} color={colors.primary} onPress={onRefresh} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: 45,
        right: 30,
    },
});
