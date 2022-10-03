import HeadHtml from "../components/headhtml";
import { useState } from "react";
import {
  VStack,
  Input,
  Button,
  Container,
  Heading,
  Link,
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
import Image from "next/image"
import logo from "../public/BlogLogo.png"

// login page

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const submit = async () => {
    // axios post request for login auth
    
    await axios.post("/api/login", {username: username, password: password}, {withCredentials: true})
    .then((res)=>{
      // if the auth fails open a modal with the error message
      if(res.data=="auth failed"){
        
        onOpen()
      } else{
        // redirect to the profile page
        router.push("/myPlan")
        
      }

     
    })
  };

  return (
    <Flex pb="30rem" bg="linear-gradient(to top right, #99ccff 0%, #009933 100%)">
      
      <HeadHtml content="login page" />
      <Container mt="5rem">
        <VStack spacing={4}>
        <Link href="/">
            <Image width="100" height="100" src={logo} alt="logo" />
          </Link>
          <h2 className="logo">Fitrack</h2>
          <h2 className="loginText">Log in to Fitrack</h2>
          <Input
            placeholder="Username"
            _placeholder={{ opacity: 0.5, color: "black" }}
            required
            variant="flushed"
            type={"username"}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value.trim());
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
              setPass(e.target.value.trim());
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

      {/* Modal from chakra ui */}
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

