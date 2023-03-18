import React from "react";
import { StyleSheet, View, Text} from 'react-native';
import { defaultStyles } from "../styles/styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        justifyContent: 'center',
        alignItems: 'center',
      },
    square: {
        width: '60%',
        aspectRatio: '1/1',
        backgroundColor: 'grey',
        borderRadius: 5,
    },
    scanme: {
        marginTop: 10,
        fontSize: 20,
    }

});

const Camera = () => {
    return (
        <View style={{
            ...defaultStyles.container,
            ...styles.container
        }}>
            <View style={styles.square}/>
            <Text style={{
                ...defaultStyles.text,
                ...styles.scanme
            }}>Scan QR Code</Text>
        </View>
    );
};

export default Camera;