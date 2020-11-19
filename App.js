import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { colors } from './utils/index';

import UnitsPicker from './components/UnitsPicker';
import WeatherInfo from './components/WeatherInfo';
import RefreshIcon from './components/RefreshIcon';

const WEATHER_API_KEY = '02026f5ad728cd8e47d74c0f9518d4f9';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function App() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [unitSystem, setUnitSystem] = useState('metric');

    useEffect(() => {
        load();
    }, [unitSystem]);

    const load = async () => {
        setCurrentWeather(null);
        setErrorMessage(null);
        try {
            /** ===== This url for test in Android device ===== **/
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=30.0778&lon=31.2852&units=${unitSystem}&appid=02026f5ad728cd8e47d74c0f9518d4f9`;

            // let { status } = await Location.requestPermissionsAsync();
            // if (status !== 'granted') {
            //     setErrorMessage('Access to location is needed to run the app');
            //     return;
            // }
            // let location = await Location.getCurrentPositionAsync();
            // const { latitude, longitude } = location.coords;
            // const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;

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
        return (
            <View style={styles.screen}>
                <StatusBar style='auto' />
                <View style={styles.main}>
                    <UnitsPicker unitsSystem={unitSystem} setUnitsSystem={setUnitSystem} />
                    <RefreshIcon onRefresh={load} />
                    <WeatherInfo currentWeather={currentWeather} />
                </View>
            </View>
        );
    } else if (errorMessage) {
        // Return if there is a error
        return (
            <View style={styles.screen}>
                <StatusBar style='auto' />
                <Text>{errorMessage}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.screen}>
                <StatusBar style='auto' />
                <ActivityIndicator size='large' color={colors.primary} />
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
