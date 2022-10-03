import {
  Container,
  Box,
  Text,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Card from "../components/card";
import HeadHtml from "../components/headhtml";
import Nav from "../components/nav";

export default function Plans(props) {
  const plans = props.data.docs;

  return (
    <>
      <HeadHtml content="plans page" />
      <Nav user={props.message} />
      <div className="cards">
        <Container>
          <Text pt="2rem" fontSize={"2rem"} className="contentTexthead">
            Plans to Follow{" "}
          </Text>

          {plans.map((i) => {
            return (
              <Card
                cls={"card"}
                id={i._id}
                key={i._id}
                title={i.Title}
                createdBy={i.createdBy}
                mon={i.Mon}
                tue={i.Tue}
                wed={i.Wed}
                thu={i.Thu}
                fri={i.Fri}
                sat={i.Sat}
                sun={i.Sun}
              />
            );
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

    // make requests to api
    const res = await fetch(
      "http://localhost:3000/api/plans",
      option
    );
    const data = await res.json();

    // serve up data
    return { props: { message: "true", data: data } };
  } else if (!cookie) {
    //  no cookie exists redirect to login page
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
}
