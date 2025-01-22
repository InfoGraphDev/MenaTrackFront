import React from 'react'
import styles from "./style.module.scss";
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';

function ErrorCheckFromHook({text}) {
  const isArabicLanguage=useIsArabicLanguage();

  return (
    <div className={`${styles.container} ${isArabicLanguage?styles.araibc:styles.english}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 16 16" fill="none">
            <path d="M8.00016 14.6666C4.31816 14.6666 1.3335 11.682 1.3335 7.99998C1.3335 4.31798 4.31816 1.33331 8.00016 1.33331C11.6822 1.33331 14.6668 4.31798 14.6668 7.99998C14.6668 11.682 11.6822 14.6666 8.00016 14.6666ZM8.00016 13.3333C9.41465 13.3333 10.7712 12.7714 11.7714 11.7712C12.7716 10.771 13.3335 9.41447 13.3335 7.99998C13.3335 6.58549 12.7716 5.22894 11.7714 4.22874C10.7712 3.22855 9.41465 2.66665 8.00016 2.66665C6.58567 2.66665 5.22912 3.22855 4.22893 4.22874C3.22873 5.22894 2.66683 6.58549 2.66683 7.99998C2.66683 9.41447 3.22873 10.771 4.22893 11.7712C5.22912 12.7714 6.58567 13.3333 8.00016 13.3333ZM8.00016 7.05731L9.8855 5.17131L10.8288 6.11465L8.94283 7.99998L10.8288 9.88531L9.8855 10.8286L8.00016 8.94265L6.11483 10.8286L5.1715 9.88531L7.0575 7.99998L5.1715 6.11465L6.11483 5.17131L8.00016 7.05731Z" fill="#F04848"/>
        </svg>
        <p className={styles.text}>
            {text}
        </p>
    </div>
  )
}

export default ErrorCheckFromHook
