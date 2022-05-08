import HeadHtml from "../components/headhtml";
import { useState } from "react";
import {
  VStack,
  Input,
  Button,
  Container,
  Heading,
  Link,
  Image,
  Flex,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const[message, setMessage] = useState("")

  const submit = async () => {
    if (username.length <= 4 && password.length <= 4) {
      setMessage("Choose a different Username or Password.  "+
       
        "Username and Password should have at least 5 characters.")
      onOpen();
      return;
    }

    await axios
      .post("/api/register", { username: username, password: password })
      .then((r)=>{
        console.log(r)
        if(r.data=="User already exists"){
          setMessage("User already Exists! Try another username")
          onOpen()
    
        } else{
          router.push("/login")
        }
      })
      
  };

  return (
    <Flex  pb="30rem" bg="linear-gradient(to top right, #99ccff 0%, #009933 100%)">
      <HeadHtml content="register page" />
      
       
      
      <Container mt="5rem">
      
        <VStack spacing={4}>
        
        
          <Link href="/">
            <Image width={70} src="/BlogLogo.png" alt="logo" />
          </Link>
          <h2 className="logo">Fitrack</h2>
          <h2 className="loginText">Sign up to Fitrack</h2>
          <Input
            placeholder="Username"
            _placeholder={{ opacity: 0.5, color: "black" }}
            value={username}
            variant="flushed"
            onChange={(e) => {
              setUsername(e.target.value.trim());
            }}
            required
          />
          <Input
            placeholder="Password"
            _placeholder={{ opacity: 0.5, color: "black" }}
            type="password"
            value={password}
            variant="flushed"
            onChange={(e) => {
              setPass(e.target.value.trim());
            }}
            required
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              submit();
            }}
            type="submit"
          >
            {"Sign up"}
          </Button>
          <Flex pt="1rem" align="center">
            Already a user?
            <Link href="/login" pl=".5rem">
              Login here
            </Link>
          </Flex>
        </VStack>
      </Container>
{/* Modal from chakra ui */}
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {message}
            
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
