import React from 'react'
import useFetch from '../hooks/useFetch'

const MainPage = () => {
    
  const {response,loading,error} = useFetch({url: `http://localhost:3001`, method: 'GET'})

  if (error){
    return <div>error</div>
  }
  if(loading || !response){
    return <div>Loading</div>
  }

  return <div>{response.Text}</div>; 
}

export default MainPage