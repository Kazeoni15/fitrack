import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Heading,
  Link,
  Box,
  Image,
  Flex,
  IconButton,
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
} from "@chakra-ui/react";
import axios from "axios";
import { animate, motion } from "framer-motion";
import { useState } from "react";
import DarkMode from "./darkmode";
import { useRouter } from "next/router";

export default function Nav(props) {
  const router = useRouter();
  let loggedIn = [
    { name: "Plans", link: "/plans", key: 1 },
    { name: "My plan", link: "/myPlan", key: 2 },
    { name: "About", link: "/about", key: 3 },
  ];

  let loggedOut = [{ name: "About", link: "/about", key: 1 }];

  const [display, changeDisplay] = useState("none");
  const [visibility, setVisibility] = useState(false);

  const variants = {
    visible: { opacity: 1, transition: { duration: 0.3 } },
    hidden: { opacity: 0, transition: { duration: 0.3 } },
  };

  const logOut = () => {
    axios.get("/api/logout").then((r) => {
      router.push("/login");
    });
  };

  if (props.user == "false") {
    return (
      <Flex bg="linear-gradient(to top right, #99ccff 0%, #009933 100%)">
        <Box>
          <Link href="/">
            <Image width={70} src="/BlogLogo.png" alt="logo" />
          </Link>
        </Box>
        <Box p="1rem">
          <h2 className="nav-links">
            <Link href="/">Fitrack</Link>
          </h2>
        </Box>
        <Flex display={["none", "none", "flex", "flex"]}>
          {loggedOut.map((i) => {
            return (
              <Box p="1rem" key={i.key}>
                <h2 className="nav-links">
                  <Link href={i.link}>{i.name}</Link>
                </h2>
              </Box>
            );
          })}
          <Flex p="1rem">
            <Button as="a" href="/signup" colorScheme="black" variant="outline">
              Register / Log In
            </Button>
          </Flex>
        </Flex>

        <Flex pos="Fixed" top="1rem" right="1rem" align="center">
          <DarkMode />

          <IconButton
            colorScheme="rgb(0,0,0,0)"
            aria-label="Open Menu"
            size="lg"
            ml={2}
            icon={<HamburgerIcon />}
            onClick={() => {
              setVisibility(true);
              changeDisplay("flex");
            }}
            display={["flex", "flex", "none", "none"]}
          />
        </Flex>

        <motion.div
          variants={variants}
          animate={visibility ? "visible" : "hidden"}
        >
          <Flex
            w="100vw"
            bg="linear-gradient(to top right, #99ccff 0%, #009933 100%)"
            zIndex={20}
            h="100vh"
            pos="fixed"
            top="0"
            left="0"
            overflowY="auto"
            flexDir="column"
            display={display}
          >
            <Flex justify="flex-end">
              <IconButton
                colorScheme="rgb(0,0,0,0)"
                mt={4}
                mr={6}
                aria-label="Close Menu"
                onClick={() => {
                  setVisibility(false);
                  setTimeout(() => {
                    changeDisplay("none");
                  }, 300);
                }}
                size="lg"
                icon={<CloseIcon />}
              />
            </Flex>
            <Flex p="1rem" flexDir="column" align="center">
              <h2 className="nav-links">
                <Link href="/">Fitrack</Link>
              </h2>
            </Flex>
            <Flex flexDir="column" align="center">
              {loggedOut.map((i) => {
                return (
                  <Box p="1rem" key={i.key}>
                    <h2 className="nav-links">
                      <Link href={i.link}>{i.name}</Link>
                    </h2>
                  </Box>
                );
              })}
              <Flex p="1rem">
                <Button
                  as="a"
                  href="/signup"
                  colorScheme="black"
                  variant="outline"
                >
                  Register / Log In
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </motion.div>
      </Flex>
    );
  }

  if (props.user == "true") {
    return (
      <Flex bg="linear-gradient(to top right, #99ccff 0%, #009933 100%)">
        <Box>
          <Link href="/">
            <Image width={70} src="/BlogLogo.png" alt="logo" />
          </Link>
        </Box>
        <Box p="1rem">
          <h2 className="nav-links">
            <Link href="/">Fitrack</Link>
          </h2>
        </Box>
        <Flex display={["none", "none", "flex", "flex"]}>
          {loggedIn.map((i) => {
            return (
              <Box p="1rem" key={i.key}>
                <h2 className="nav-links">
                  <Link href={i.link}>{i.name}</Link>
                </h2>
              </Box>
            );
          })}
          <Flex p="1rem">
            <Popover>
              <PopoverTrigger>
                <Button colorScheme="black" variant="outline">
                  Log Out
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Are you sure?</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Button onClick={logOut} colorScheme="blue">Log out</Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </Flex>
        </Flex>

        <Flex pos="Fixed" top="1rem" right="1rem" align="center">
          <DarkMode />

          <IconButton
            colorScheme="rgb(0,0,0,0)"
            aria-label="Open Menu"
            size="lg"
            ml={2}
            icon={<HamburgerIcon />}
            onClick={() => {
              setVisibility(true);
              changeDisplay("flex");
            }}
            display={["flex", "flex", "none", "none"]}
          />
        </Flex>

        <motion.div
          variants={variants}
          animate={visibility ? "visible" : "hidden"}
        >
          <Flex
            w="100vw"
            bg="linear-gradient(to top right, #99ccff 0%, #009933 100%)"
            zIndex="10"
            h="100vh"
            pos="fixed"
            top="0"
            left="0"
            overflowY="auto"
            flexDir="column"
            display={display}
          >
            <Flex justify="flex-end">
              <IconButton
                colorScheme="rgb(0,0,0,0)"
                mt={4}
                mr={6}
                aria-label="Close Menu"
                onClick={() => {
                  setVisibility(false);
                  setTimeout(() => {
                    changeDisplay("none");
                  }, 300);
                }}
                size="lg"
                icon={<CloseIcon />}
              />
            </Flex>
            <Flex p="1rem" flexDir="column" align="center">
              <h2 className="nav-links">
                <Link href="/">Fitrack</Link>
              </h2>
            </Flex>
            <Flex flexDir="column" align="center">
              {loggedIn.map((i) => {
                return (
                  <Box p="1rem" key={i.key}>
                    <h2 className="nav-links">
                      <Link href={i.link}>{i.name}</Link>
                    </h2>
                  </Box>
                );
              })}
              <Flex p="1rem">
                <Popover>
                  <PopoverTrigger>
                    <Button colorScheme="black" variant="outline">
                      Log Out
                    </Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader>Are you sure?</PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Button onClick={logOut} colorScheme="blue">Log out</Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Flex>
            </Flex>
          </Flex>
        </motion.div>
      </Flex>
    );
  }
}
