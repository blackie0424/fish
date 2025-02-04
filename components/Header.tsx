import react from "react"
import { View, StyleSheet, Dimensions, Text } from "react-native"

export function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>nivasilan ko a among</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: Math.round(Dimensions.get("window").width),
        height: 100,
        backgroundColor: "#003F5E",
        alignContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        top: 60,
        color: "#FAF8F5",
    }
})