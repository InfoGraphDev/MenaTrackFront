import React, { useEffect } from 'react'
import image  from "@/Assets/Images/Welcome.png";
import loadingImage from "@/Assets/Images/loading.gif"
import styles from "./style.module.scss"
import EsriTokenComponent from '@/Components/EsriToken';
import { useUserContext } from '@/Context/ContextApi/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

function MainPageNavigation() {
  const {esriToken}=useUserContext();
  const query = useLocation();
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(esriToken){
      setTimeout(() => {
        navigate(`Main/${query?.search}`)
      }, 100);
    }
  },[esriToken])
  return (
    <div className={styles.welcome}>
        <img src={image} className={styles.image}/>
        <img src={loadingImage} className={styles.LoadingImage} alt="" />
        <EsriTokenComponent/>
    </div>
  )
}

export default MainPageNavigation
