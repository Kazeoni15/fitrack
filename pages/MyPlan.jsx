import HeadHtml from "../components/headhtml";
import Nav from "../components/nav";
import Create from "../components/create";
import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
  Button,
  Box,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
export default function MyPlan(props) {
  let content;

  if (props.follow === false) {
    content = (
      <div className="userpage">
        <Text pb="1rem" fontSize="20px">
          You are currently not following any plans.
        </Text>
        <Button
          as="a"
          href="/plans"
          bg={"linear-gradient(to top right, #99ccff 0%, #009933 100%)"}
          colorScheme="teal"
        >
          {"Check'em out!"}
        </Button>
        <Text fontSize="20px" p="1rem">
          or
        </Text>

        <Create />
      </div>
    );
  } else {
    const pay = props.data.following.plan;
    const creator = pay.createdBy;
    const title = pay.Title;
    const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    content = (
      <Container>
        <Text className="userpage letter-spacing4">{title}</Text>
        
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {week[0]}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {pay.Mon.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} color="green.500" />
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
                  {week[1]}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {pay.Tue.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} color="green.500" />
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
                  {week[2]}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {pay.Wed.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} color="green.500" />
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
                  {week[3]}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {pay.Thu.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} color="green.500" />
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
                  {week[4]}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {pay.Fri.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} color="green.500" />
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
                  {week[5]}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {pay.Sat.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} color="green.500" />
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
                  {week[6]}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List>
                {pay.Sun.map((i) => {
                  return (
                    <ListItem key={i}>
                      <ListIcon as={ChevronRightIcon} color="green.500" />
                      {i}
                    </ListItem>
                  );
                })}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Text className="userpage letter-spacing4">Plan by {creator} </Text>
        <div className="userpage">
      <Create />
      </div>
        
        
      </Container>
    );
  }

  return (
    <>
      <HeadHtml content="personal plan page" />
      <Nav user={props.message} />
      <div className="userpage letter-spacing4">
        <Text fontSize={["15px", "20px", "20px", "25px"]}>
          Hello, {props.data.userID}
        </Text>
      </div>
      {content}
      
      
    </>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.cookies.jwt;

  if (cookie) {
    const option = {
      method: "POST",
      headers: {
        token: cookie,
      },
    };

    const url = process.env.URL+"/api/user"
    const res = await fetch(url, option);
    const data = await res.json();

    console.log(data);
    if (data.name) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    } else if (data.userID) {
      if (data.following.plan === "none") {
        return { props: { message: "true", follow: false, data: data } };
      } else {
        return { props: { message: "true", follow: true, data: data } };
      }
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/signup",
      },
      props: {},
    };
  }
}
