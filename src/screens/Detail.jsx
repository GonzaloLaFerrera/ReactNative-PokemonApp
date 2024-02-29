import { View, Text, StyleSheet } from "react-native";

export function Detail({ route }) {
    const { name } = route.params;
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 40
    }
});