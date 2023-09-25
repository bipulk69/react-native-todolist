import { Text, TouchableOpacity } from "react-native";
import { styles } from "./Button.style";

export function ButtonAdd({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.txt}> + New todo</Text>
    </TouchableOpacity>
  );
}
