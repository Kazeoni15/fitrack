import {useColorMode, Switch} from "@chakra-ui/react";
import {useState} from "react";




// dark mode toggle

export default function DarkMode(){
    const {colorMode, toggleColorMode} = useColorMode();
    const {isChecked, setChecked} = useState("")
    const isDark = colorMode === "dark"

 
      return <Switch onChange={toggleColorMode}/>
 


    
}