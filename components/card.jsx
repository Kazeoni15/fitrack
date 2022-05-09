import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";

// card component for displaying all plans  

export default function Card(props) {
  const router = useRouter();

  // executes after Follow button is clicked

  const save = () => {
    const payload = { id: props.id };

    // post request to the api

    axios
      .post(
        "/api/setPlan",
        payload,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      )
      .then((r) => {
        // Redirect to myPlan route
        router.push("/MyPlan");
      });
  };

  return (
    <>
      <Container className={props.cls}>
        {/* Title */}
        <Text className="userpage letter-spacing4">{props.title}</Text>
        {/* Accordion from Chakra ui */}

        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Monday
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {props.mon.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} />
                      {i}
                    </ListItem>
                  );
                })}
              </List>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Tuesday
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {props.tue.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} />
                      {i}
                    </ListItem>
                  );
                })}
              </List>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Wednesday
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {props.wed.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} />
                      {i}
                    </ListItem>
                  );
                })}
              </List>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Thursday
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {props.thu.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} />
                      {i}
                    </ListItem>
                  );
                })}
              </List>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Friday
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {props.fri.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} />
                      {i}
                    </ListItem>
                  );
                })}
              </List>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Sunday
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {props.sat.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} />
                      {i}
                    </ListItem>
                  );
                })}
              </List>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Sunday
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {props.sun.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} />
                      {i}
                    </ListItem>
                  );
                })}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <div className="btn">
          <Button onClick={save} colorScheme={"teal"}>
            Follow
          </Button>
        </div>

        <Text className="userpage letter-spacing4">By {props.createdBy}</Text>
      </Container>
    </>
  );
}
