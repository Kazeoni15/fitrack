
import Head from "next/head"


export default function HeadHtml(props){
    return(<Head>
        <title>Fitrack</title>
        <meta name="description" content={props.content} />
        <link rel="icon" type="image/x-icon" href="/BlogLogo.png"/>
        
     
      </Head>)
} 