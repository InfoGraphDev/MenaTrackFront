import React from 'react'
import styles from "./styles.module.scss";

function IconReactHookForm({icon,isFocused}) {
  return (
    <div>
        {icon && <div className={`${styles.icons} ${isFocused&&styles.active}`}>{icon}</div>}
    </div>
  )
}

export default IconReactHookForm
