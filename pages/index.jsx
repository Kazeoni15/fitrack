import HeadHtml from "../components/headhtml";
import Nav from "../components/nav";
import { useState, useEffect } from "react";
import {
  Flex,
  Container,
  Text,
  Stack,
  Button,
  Divider,
  List,
  ListItem,
  ListIcon,
  Link,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import Image from "next/image"
import { motion } from "framer-motion";
import pushups from "../public/pushups.svg"
import tracker from "../public/tracker.svg"
import cover from "../public/cover.jpg"

export default function Home(props) {
  return (
    <>
      <HeadHtml content="main page" />
      <Nav user={props.message} />
      <Image priority  src={cover} layout="responsive" alt="Cover photo" />
     
        <div className="text">
        {/* change fontsize for different breakpoints */}
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
    

      <Container pb="5rem" maxW="100%" id="information">
        <Text
          pt="2rem"
          pb="3rem"
          className="contentTexthead"
          fontSize={["15px", "25px", "40px", "50px"]}
        >
          Features
        </Text>
        <div className="grid-container">
          <Image className="grid-item" layout="responsive" src={pushups} alt="tracker" />
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
              href="/myPlan"
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

  // if cookie exists

  if (cookie) {
    const option = {
      method: "POST",
      headers: {
       'Content-Type': 'application/json',
        token: cookie,
      },
    };

   
  const url= "http://localhost:3000/api/user"
    
    
    const res = await fetch(url, option);
  
    const data = await res.json();

  
    if (data.userID) {
      return { props: { message: "true", data: data } };
    }
  } else {
    return { props: { message: "false" } };
  }
}
