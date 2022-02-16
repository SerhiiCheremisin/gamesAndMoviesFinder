import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/index';
import { setTitle, fetchMovie } from '../redux/store/slices/movieSlice';
import styled from 'styled-components';
import MovieItem from '../components/MovieItem';


const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px 15%;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
`

const Input = styled.input`
  height: 25px;
  margin-bottom: 10px;
  padding: 3px 5px;
`
const Button = styled.button`
  width: 150px;
  position: relative;
  left: 70%;
  cursor: pointer;
  height: 25px;
`
const InfoButton = styled.button`
  width: 100px;
  height: 25px;
  cursor: pointer;
`


export default function MovieSearch():JSX.Element {

  const dispatch = useDispatch();
  const title = useSelector((state:RootState) => state.movie.title);
  const isLoading = useSelector((state:RootState) => state.movie.isSearchAtive);
  const isSuccess = useSelector((state:RootState) => state.movie.searchSucceed);
  const movie = useSelector((state:RootState) => state.movie.foundMovie);


  const formHandler = (e:React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   if (title === '') {
     return
   }
   const correctTitle = title.replace(' ', "+").trim()
   console.log(correctTitle)
   dispatch(fetchMovie(correctTitle))
   dispatch(setTitle(''))
  }

  return (
    <MovieWrapper>
    <Form action="#" onSubmit={(e) => formHandler(e)}>
    <Input type="text" value={title} onChange={(e) => dispatch(setTitle(e.target.value))} />
    <Button type='submit'>Find movie</Button>
    </Form>
    {isLoading && <h2>Loading....</h2>}
    {isSuccess && <MovieItem/>
    }
    </MovieWrapper>
  )
}
