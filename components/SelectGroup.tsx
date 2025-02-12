import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SelectionGroupProps {
    options: string[];
    selected: string | null;
    onSelect: (value: string | null) => void;
}

const SelectionGroup: React.FC<SelectionGroupProps> = ({ options, selected, onSelect }) => {
    return (
        <View style={styles.section}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option}
                    style={[styles.button, selected === option && styles.selectedButton]}
                    onPress={() => onSelect(selected === option ? null : option)}
                >
                    <Text style={styles.buttonText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
    },
    button: {
        borderWidth: 1,
        borderColor: "red",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        margin: 5,
    },
    selectedButton: {
        backgroundColor: "red",
    },
    buttonText: {
        color: "black",
        fontSize: 20
    },
});

export default SelectionGroup;