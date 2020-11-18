import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

const WEATHER_API_KEY = '02026f5ad728cd8e47d74c0f9518d4f9';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function App() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [unitSystem, setUnitSystem] = useState('metric');

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            // const { status } = await Location.requestPermissionsAsync();
            // if (status !== 'granted') {
            //     setErrorMessage('Access to location is needed to run the app');
            //     return;
            // }
            // const location = await Location.getCurrentPositionAsync();
            // const { latitude, longitude } = location.coords;
            // const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;
            const weatherUrl = `${BASE_WEATHER_URL}lat=-37.883642&lon=145.181741&units=${unitSystem}&appid=${WEATHER_API_KEY}`;

            const res = await fetch(weatherUrl);
            const result = await res.json();

            if (res.ok) {
                setCurrentWeather(result);
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    if (currentWeather) {
        const {
            main: { temp },
        } = currentWeather;

        return (
            <View style={styles.screen}>
                <StatusBar style='auto' />
                <View style={styles.main}>
                    <Text>{temp}</Text>
                </View>
            </View>
        );
    } else {
        // Return if there is a error
        return (
            <View style={styles.screen}>
                <StatusBar style='auto' />
                <Text>{errorMessage}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
    main: {
        justifyContent: 'center',
        flex: 1,
    },
});
