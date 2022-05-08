import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  IconButton,
  InputGroup,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

// create component for creating plans

export default function Create() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const week = [
    { day: "Mon", id: 0 },
    { day: "Tue", id: 1 },
    { day: "Wed", id: 2 },
    { day: "Thu", id: 3 },
    { day: "Fri", id: 4 },
    { day: "Sat", id: 5 },
    { day: "Sun", id: 6 },
  ];
  const [name, setName] = useState("");
  const [mon, setMon] = useState([]);
  const [tue, setTue] = useState([]);
  const [wed, setWed] = useState([]);
  const [thu, setThu] = useState([]);
  const [fri, setFri] = useState([]);
  const [sat, setSat] = useState([]);
  const [sun, setSun] = useState([]);
  const [input, setInput] = useState("");
  const btnRef = useRef();

  const weekPlan = [mon, tue, wed, thu, fri, sat, sun];

  // When the save button is pushed save is run

  const save = () => {
    if (
      name == "" ||
      mon.length < 1 ||
      tue.length < 1 ||
      wed.length < 1 ||
      thu.length < 1 ||
      fri.length < 1 ||
      sat.length < 1 ||
      sun.length < 1
    ) {
      alert(
        "Please fill out all the fields! Make sure you enter the title. If you don't want to schedule anything on a day, just enter 'Rest'."
      );
      return;
    }

    // if all fields are filled then post request to api
    const payload = { name: name, weekPlan: weekPlan };

    axios
      .post(
        "/api/create",
        payload,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      )
      .then((r) => {
        onClose();
        router.push("/myPlan");
      });
  };

  const addItem = (value) => {
    setInput(value);
  };

  const handleSubmit = (id) => {
    if (input == "") {
      return;
    }
    switch (id) {
      case 0:
        setMon([...mon, input]);
        break;
      case 1:
        setTue([...tue, input]);
        break;
      case 2:
        setWed([...wed, input]);
        break;
      case 3:
        setThu([...thu, input]);
        break;
      case 4:
        setFri([...fri, input]);
        break;
      case 5:
        setSat([...sat, input]);
        break;
      case 6:
        setSun([...sun, input]);
        break;
    }

    setInput("");
  };

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="teal"
        bg={"linear-gradient(to top right, #99ccff 0%, #009933 100%)"}
        onClick={onOpen}
      >
        Create your own!
      </Button>

      {/* Drawer from chakra ui */}
      <Drawer
        size={"full"}
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your Plan</DrawerHeader>

          <DrawerBody>
            <Container>
              <Input
                variant="flushed"
                placeholder="Enter Title Here"
                onChange={(e) => setName(e.target.value)}
                width={"20rem"}
              />
              <Accordion mt="2rem" allowToggle>
                {week.map((i) => {
                  return (
                    <AccordionItem key={i.id}>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="center">
                            {i.day}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Container alignItems={"center"}>
                          {weekPlan[i.id].map((j) => {
                            return (
                              <InputGroup alignItems={"center"} key={j}>
                                <Text mb="1rem">{j}</Text>
                              </InputGroup>
                            );
                          })}
                        </Container>

                        <Container>
                          <InputGroup>
                            <Input
                              variant="flushed"
                              onChange={(e) => {
                                e.preventDefault();
                                addItem(e.target.value);
                              }}
                              placeholder="10 x 10 Pushups"
                            />
                            <IconButton
                              onClick={(e) => {
                                handleSubmit(i.id);
                              }}
                              type="submit"
                            >
                              <AddIcon />
                            </IconButton>
                          </InputGroup>
                        </Container>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
              <Button variant="outline" m={"3rem"} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={save} colorScheme="blue">
              Save
            </Button>
            </Container>

            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
