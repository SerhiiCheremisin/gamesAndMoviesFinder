import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';


const Span = styled.span`
    background-color: red;
    transition: all .5s ease;
    cursor: pointer;

    &:hover{
     background-color: black;
    }
`
const HomeWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 50px 10%;
`

export default function Home():JSX.Element {
  
    return (
       <HomeWrapper>
          <h1>You can chose either  <Span><Link to='/movie'>movie search</Link></Span> of <Span><Link to='/game'>game search</Link> </Span> for now.
           May be i will add a new pages in the future</h1>
       </HomeWrapper> 
   
  )
}
