import { Container, Box, Text, Divider, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
 } from "@chakra-ui/react";
import Card from "../components/card";
import HeadHtml from "../components/headhtml";
import Nav from "../components/nav";

export default function Plans(props) {
const plans = props.data.docs
const cls = ["card card-1", "card card-2","card card-3","card card-4","card card-5"]
  
  return (
    <>
      <HeadHtml content="plans page" />
      <Nav user={props.message} />
      <div className="cards">
      <Container>
      <Text pt="2rem" fontSize={"2rem"} className="contentTexthead">Plans to Follow </Text>
     

        {plans.map((i)=>{
          return(
            <Card cls={cls[Math.floor(Math.random()*cls.length)]} id={i._id} key={i._id} title={i.Title} createdBy={i.createdBy} mon={i.Mon} tue={i.Tue} wed={i.Wed} thu={i.Thu} fri={i.Fri} sat={i.Sat} sun={i.Sun} />
          )
        })}
      </Container> 

      </div>
      
    </>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.cookies.jwt;

  if (cookie) {
    const option = {
      method: "GET",
      headers: {
        token: cookie,
      },
    };

    const url = process.env.URL+"/api/plans"

    const res = await fetch(url, option);
    const data = await res.json();

  
    
    return {props: { message: "true", data: data }}
}
}