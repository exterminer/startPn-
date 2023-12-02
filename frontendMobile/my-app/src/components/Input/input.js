import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = ({
  label,
  type,
  placeholder,
  backgroundColor,
  borderWidth,
  borderColor,
  height,
  borderRadius,
}) => {
  const styles = StyleSheet.create({
    container: {},
    label: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 14,
      fontWeight: "400",
      letterSpacing: 0.202,
    },
    input: {
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: borderWidth,
      height: height,
      borderRadius: borderRadius,
    },
  });

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={type === "email" ? "email-address" : "default"}
      />
    </View>
  );
};

export default Input;
