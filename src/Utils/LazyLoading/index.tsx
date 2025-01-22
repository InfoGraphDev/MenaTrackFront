import React, { useState, useEffect, Suspense } from 'react';
import { ScaleLoader } from 'react-spinners';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import styles from "./style.module.scss";
import WelcomePage from '@/Features/WelcomePage';

function withLazyLoading(importFunc,defaultProp, fallback =defaultProp?.PageLoading==true?<FallbackTwo/>:<Fallback/>) {
    const LazyComponent = React.lazy(importFunc);

    return function LazyComponentWithLoading(props) {
        const [isLoading, setLoading] = useState(true);
        useEffect(() => {
            importFunc().then(() => setLoading(false));
        }, []);
        return (
            <Suspense fallback={fallback}>
                {isLoading ? fallback : <LazyComponent {...props} />}
            </Suspense>
        );
    };
}

export default withLazyLoading;

function Fallback() {
  return (
        <FlexComponent className={styles.container}>
            <li className={styles.icon}><ScaleLoader  color='#A58B48'/></li>
        </FlexComponent>
  )
}

function FallbackTwo() {
    return (
        <WelcomePage/>
    )
  }
  
