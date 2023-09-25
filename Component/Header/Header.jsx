import { Image, Text } from "react-native";
import {styles} from "./Header.style";
import logImg from "../../assets/logo.png";

export function Header() {
    return (
    <>
    {/* resizeMode is used to contain all the size. */}
    <Image style={styles.imag} source={logImg} resizeMode="contain"/> 
    <Text style={styles.subtitle}>You probably have something to do..!</Text>
    </>
    );
}