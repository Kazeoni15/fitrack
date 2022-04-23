import { Button, Container, Divider, Heading, Text } from "@chakra-ui/react";
import HeadHtml from "../components/headhtml";
import Nav from "../components/nav";

export default function About(props){
    return(<>
        <HeadHtml content="About page"/>
        <Nav user={props.message}/>

        <Container pt="3rem">
        <Heading>Hi, I am Pranit, a web developer</Heading>
        <br/>
            <Text> and this is a personal project I have created. This website is rendered on the server-side for optimal TTI (Time-to-interactive). I have used Next.js with a REST API that is connected to a MongoDB cluster for this web app. </Text>
            
                <br/>
            <Divider/>
            <br/>
            <Text> This is a workout tracking app. You can create an account and create your own plans or follow ones created by other users. </Text>
            <br/>
            <Divider/>
            <br/>

            <Text>Email  <Button onClick={() => {navigator.clipboard.writeText("nicolet.pra@gmail.com"); alert("Email copied!")}} >Click to copy</Button> </Text>
        </Container>
    </>)
}

export async function getServerSideProps(context) {
    const cookie = context.req.cookies.jwt;
  
    if (cookie) {
     
      return { props: { message: "true" } };
    } else {
        return{ props:{message: "false"}}
    }
  }
  