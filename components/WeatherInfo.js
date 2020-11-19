import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../utils/index';

const { primary, secondary } = colors;

export default function WeatherInfo({ currentWeather }) {
    const {
        main: { temp },
        weather: [details],
        name,
    } = currentWeather;
    const { icon, description, main } = details;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    return (
        <View style={styles.root}>
            <Text style={styles.city}>{name}</Text>
            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
            <Text style={styles.textPrimary}>{temp}°</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.texSecondary}>{main}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
    city: {
        fontSize: 21,
    },
    weatherDescription: {
        textTransform: 'capitalize',
    },
    weatherIcon: {
        width: 110,
        height: 110,
    },
    textPrimary: {
        fontSize: 40,
        color: primary,
    },
    texSecondary: {
        fontSize: 20,
        color: secondary,
        fontWeight: '500',
        marginTop: 10,
    },
});
