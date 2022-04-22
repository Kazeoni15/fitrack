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
import axios from "axios";
import { useRouter } from "next/router";


export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const submit = async () => {
    await axios.post("/api/login", {username: username, password: password}, {withCredentials: true})
    .then((res)=>{
      if(res.data=="auth failed"){
        
        onOpen()
      } else{
        router.push("/")
      }

     
    })
  };

  return (
    <Flex pb="30rem" bg="linear-gradient(to top right, #99ccff 0%, #009933 100%)">
      
      <HeadHtml content="login page" />
      <Container mt="5rem">
        <VStack spacing={4}>
        <Link href="/">
            <Image width={70} src="/BlogLogo.png" alt="logo" />
          </Link>
          <h1 className="logo">Fitrack</h1>
          <h1 className="loginText">Log in to Fitrack</h1>
          <Input
            placeholder="Username"
            _placeholder={{ opacity: 0.5, color: "black" }}
            required
            variant="flushed"
            type={"text"}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            placeholder="Password"
            required
            _placeholder={{ opacity: 0.5, color: "black" }}
            variant="flushed"
            type="password"
            value={password}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              submit();
            }}
            type="submit"
          >
            {"Log in"}
          </Button>
          <Flex pt="1rem" align="center">
            Want to sign up?
            <Link href="/signup" pl=".5rem">
              Signup here
            </Link>
          </Flex>
        </VStack>
        
      </Container>
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
            Incorrect Username or Password
            <br />
            Please try again!
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

