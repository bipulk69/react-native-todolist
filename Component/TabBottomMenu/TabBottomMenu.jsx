import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./TabMenuBottom.style";
export function TabBottomMenu({ selectedTabName, onPress, todoList }) {
  const countByStatus = todoList.reduce((acc, todo) => { // ES6 reduce function
    todo.isCompleted ? acc.done++: acc.inProgress++
    return acc;
  }, {
    all: todoList.length,
    inProgress: 0,
    done: 0,
    }
  );
  console.log(countByStatus);
  function getTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: selectedTabName === tabName ? "#2F76E5" : "black",
    };
  }
  return (
    <View style={styles.root}>
      <TouchableOpacity>
        <Text onPress={() => onPress("all")} style={getTextStyle("all")} >
          All ({countByStatus.all})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          onPress={() => onPress("inProgress")}
          style={getTextStyle("inProgress")}
        >
          In progress ({countByStatus.inProgress})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("done")}>
        <Text style={getTextStyle("done")}>Done ({countByStatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
}
