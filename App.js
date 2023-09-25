import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./App.style";
import { Header } from "./Component/Header/Header";
import { CardTodo } from "./Component/CardTodo/CardTodo";
import { useEffect, useState } from "react";
import { TabBottomMenu } from "./Component/TabBottomMenu/TabBottomMenu";
import { ButtonAdd } from "./Component/ButtonAdd/Button";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {AsyncStorage} from 'react-native';

let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [isAddDialogDisplayed, setIsAddDialogDisplayed] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // this will run atleast once when application starts
    loadTodoList();
  }, []);

  useEffect(() => {
    if (!isLoadUpdate) {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    } else {
      isLoadUpdate = false;
    }
  }, [todoList]);

  async function loadTodoList() {
    console.log("LOAD");
    try {
      const todoListString = await AsyncStorage.getItem("@todoList");
      const parsedTodoList = JSON.parse(todoListString);
      setTodoList(parsedTodoList);
      isLoadUpdate = true;
    } catch (err) {
      alert(err);
    }
  }

  // setTodoList(parsedTodoList || []);
  // we should control parsedTodoList
  // If parsedTodoList is undefined of null, we should send an empty array in setTodoList instead.

  async function saveTodoList() {
    console.log("SAVE");
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList)); // it only store string thats why we convert object into string
    } catch (err) {
      alert(err);
    }
  }
  function getFilteredList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => todo.isCompleted === false); //ES6 filter, for returning new array
      case "done":
        return todoList.filter((todo) => todo.isCompleted === true);
    }
  }

  function deleteTodo(todoToDelete) {
    Alert.alert(
      "Delete todo",
      "Are you sure you want to delete this ? ", // react native alert
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setTodoList(todoList.filter((t) => t.id !== todoToDelete.id));
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  }
  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View key={todo.id} style={styles.cardItem}>
        <CardTodo onLongPress={deleteTodo} onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

  function updateTodo(todo) {
    const updateTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    const updateTodoList = [...todoList];
    const indexToUpdate = updateTodoList.findIndex(
      (t) => t.id === updateTodo.id
    );
    updateTodoList[indexToUpdate] = updateTodo;
    setTodoList(updateTodoList);
    console.log(updateTodo);
  }
  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogDisplayed(false);
    setInputValue(""); //for clean the input value
  }
  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={isAddDialogDisplayed}
        onBackdropPress={() => isAddDialogDisplayed} // when press outside the dialog then then it hide the dialog
      >
        <Dialog.Title>Add todo</Dialog.Title>
        <Dialog.Description>Choose a name for your todo</Dialog.Description>
        <Dialog.Input
          onChangeText={(text) => setInputValue(text)}
          placeholder="Ex: Go to the gym"
        />
        <Dialog.Button
          label="Cancel"
          color="grey"
          onPress={() => setIsAddDialogDisplayed(false)}
        />
        <Dialog.Button
          disabled={inputValue.length === 0} //it's empty so it's disabled
          label="Save"
          onPress={addTodo}
        />
      </Dialog.Container>
    );
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.App}>
          <View style={styles.haeder}></View>
          <Header />
          <View style={styles.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
          <ButtonAdd onPress={() => setIsAddDialogDisplayed(true)} />
        </SafeAreaView>
      </SafeAreaProvider>

      <View style={styles.footer}>
        <TabBottomMenu
          todoList={todoList}
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
        />
      </View>
      {renderAddDialog()}
    </>
  );
}
