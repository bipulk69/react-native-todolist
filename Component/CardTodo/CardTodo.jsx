import { Image, Text, TouchableOpacity } from "react-native";
import {styles} from "./CardTodo.style";
import  checkImg  from "../../assets/check.png";

export function CardTodo({ todo, onPress, onLongPress }){
    return (
        <TouchableOpacity onLongPress={()=>onLongPress(todo)} style={styles.card} onPress={()=>onPress(todo)}>
            <Text style=
                {[styles.title, 
                    todo.isCompleted && {textDecorationLine: "line-through"}]}>{todo.title}
                </Text>
            {todo.isCompleted && <Image style={styles.img} source={checkImg} />}
        </TouchableOpacity>
    );
}