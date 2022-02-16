import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import styled from 'styled-components';


//components
import MovieSearch from './pages/MovieSearch';
import GamaSearch from './pages/GamaSearch';


const NavList = styled.ul`
   display: flex;
   gap : 10px;
   justify-content : center;
   padding: 15px 0;
   background-color: #1a4646;
`;

const Li = styled.li`
  background-color: #7a7a7e;
  border-radius: 15px;
  padding: 5px 10px;
  transition: all .5s ease;
  transform: scale(1);
  &:hover{
    transform: scale(1.1);
  }
  &:active{
    transform: scale(1.05);
  }
`;


function App():JSX.Element {


  return (
    <>
    <nav>
      <NavList>
       <Li><Link to ='/movie'>Search for movies</Link></Li>
       <Li><Link to ='/game'>Search for games</Link></Li>
      </NavList>
    </nav>
    <main>
    <Routes>
       <Route path='/movie' element={<MovieSearch/>}/>
       <Route path='/game' element={<GamaSearch/>}/>
    </Routes>
    </main>
    </>
  );
}

export default App;
