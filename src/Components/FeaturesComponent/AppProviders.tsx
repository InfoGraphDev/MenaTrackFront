import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import EsriTokenComponent from '../EsriToken';
import ModalComponent from '../UIElements/Feedback/Modal';
import { useTranslation } from 'react-i18next';
// import withLazyLoading from '@/Utils/LazyLoading';
// const ErrorBoundary = withLazyLoading(() => import('../Layout/ErrorBoundary'),{PageLoading:false});

function AppProviders() {
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('language');
    return {language};
  };

  const { language} = getQueryParams();
  const {i18n}=useTranslation()

  useEffect(()=>{
    const handelChange = (language: string) => {
      i18n.changeLanguage(language);
      document.dir = language === 'ar' ? 'rtl' : 'ltr'; 
    };
    handelChange(language=="ar"?"ar":"en")
  },[language]);
  
  return (
    <>
      <Outlet />
      <Toaster />
      <ModalComponent/>
    </>
  );
}

export default AppProviders;
