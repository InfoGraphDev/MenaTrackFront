import React from 'react'
import NoteComponent from '../../Layout/Note';
import image from "@/Assets/animations/Empty.gif";
import styles from "./styles.module.scss";
import LazyLoadImage from '../LazyImage';

function EmptySelectionNotice({ShowNotSelect}) {
  return (
    <div className={styles.container}>
        {ShowNotSelect&&
          <div style={{marginTop:"1rem"}}>
              <NoteComponent text='moreDetails.Noitemselected'/>
              <LazyLoadImage alt='No-Detail' src={image} style={{height:"17rem",marginLeft:"auto",marginRight:"auto"}}/>
          </div>}
    </div>
  )
}

export default EmptySelectionNotice
