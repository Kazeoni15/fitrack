import HeadHtml from "../components/headhtml";
import Nav from "../components/nav";
import { useState, useEffect } from "react";
import {
  Flex,
  Container,
  Text,
  Image,
  Stack,
  Button,
  Divider,
  List,
  ListItem,
  ListIcon,
  Link,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import { motion } from "framer-motion";

export default function Home(props) {
  return (
    <>
      <HeadHtml content="main page" />
      <Nav user={props.message} />
      <Image src="/cover.jpg" width="100%" alt="Cover photo" />
      <motion.div>
        <div className="text">
          <Text fontSize={["20px", "30px", "50px", "50px"]}>
            Track your workouts with Fitrack
          </Text>
          <Container p="1rem">
            <Divider />
          </Container>

          
            <Button
              as = "a"
              href="#information"
              colorScheme="teal"
              bg="linear-gradient(to top right, #99ccff 0%, #009933 100%)"
              size="md"
              className="letter-spacing0"
            >
              Find out more
            </Button>
          
        </div>
      </motion.div>

      <Container maxW="100%" id="information">
        <Text
          pt="2rem"
          pb="3rem"
          className="contentTexthead"
          fontSize={["15px", "25px", "40px", "50px"]}
        >
          Features
        </Text>
        <div className="grid-container">
          <Image className="grid-item" src="pushups.svg" alt="tracker" />
          <List className="grid-item" spacing={3}>
            <ListItem fontSize={["15px", "22px", "25px", "30px"]}>
              <ListIcon as={CheckIcon} color="green.500" />
              Create your own workout menu.
            </ListItem>
            <ListItem fontSize={["15px", "22px", "25px", "30px"]}>
              <ListIcon as={CheckIcon} color="green.500" />
              Share with your friends.
            </ListItem>
            <ListItem fontSize={["15px", "22px", "25px", "30px"]}>
              <ListIcon as={CheckIcon} color="green.500" />
              Follow the plans made by your trainers.
            </ListItem>
            <ListItem fontSize={["15px", "22px", "25px", "30px"]}>
              <ListIcon as={CheckIcon} color="green.500" />
              Get Fit!
            </ListItem>
            <ListItem>
                <Button
              as = "a"
              href="/MyPlan"
              colorScheme="teal"
              bg="linear-gradient(to top right, #99ccff 0%, #009933 100%)"
              size="md"
              className="letter-spacing0"
            >
              Try it!
            </Button>

                </ListItem>
          
          </List>
        </div>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.cookies.jwt;

  if (cookie) {
    const option = {
      method: "POST",
      headers: {
       'Content-Type': 'application/json',
        token: cookie,
      },
    };

    const url = process.env.URL+"/api/user"
    
    const res = await fetch(url, option);
  
    const data = await res.json();

  
    if (data.name) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    } else if (data.userID) {
      return { props: { message: "true", data: data } };
    }
  } else {
    return { props: { message: "false" } };
  }
}