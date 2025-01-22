import React from 'react'
import { useNavigate } from 'react-router-dom';
import ResultComponent from '@/Components/UIElements/Feedback/Result';

function PageNotFound() {
    const Navigation=useNavigate();
    const handelClick=()=>{
        Navigation("/")
    }
  return (
    <ResultComponent 
      icons='notFound' Submit='pageNotFound.backtohome'  
      handleSubmit={handelClick} title="pageNotFound.404" 
      text="pageNotFound.Maybethispage"/>
    )
}

export default PageNotFound
