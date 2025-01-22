import React from 'react';
import { toast, ToastOptions } from 'react-hot-toast';
import styles from "./style.module.scss";
import "./style.scss";
import FailedSvg from '@/Assets/Icons/Failed';
import SucsessSvg from '@/Assets/Icons/sucsess';
import WarningSvg from '@/Assets/Icons/Warning';
import InfoSvg from '@/Assets/Icons/info';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import { useTranslation } from 'react-i18next';
import CloseSmallSvg from '@/Assets/Icons/CloseSmall';

type NotificationType = 'success' | 'fail' | 'warning' | 'info' | 'custom';

interface NotificationProps {
  icon?: React.ReactNode;
  message: React.ReactNode;
  closeToast?: () => void;
  type?: NotificationType; 
  title?:React.ReactNode
}

const NotificationComponent: React.FC<NotificationProps> = ({ icon, message, closeToast, type = 'custom',title }) => {
  const TypeNotification = {
    success: {
      border: "1px solid #0BB884",
      backgroundColor: "#BDEFE0",
      icon: <SucsessSvg style={{ height: "1rem", width: "1rem"}}/>,
      textColor: "#005F56" 
    },
    fail: {
      border: "1px solid #F04848",
      backgroundColor: "#FFD2D2",
      icon: <FailedSvg style={{ height: "1rem", width: "1rem"}}/>,
      textColor: "#8B0000" 
    },
    warning: {
      border: "1px solid #F18725",
      backgroundColor: "#FFF6E0",
      icon: <WarningSvg style={{ height: "1rem", width: "1rem"}}/>,
      textColor: "#A45A00"
    },
    info: {
      border: "1px solid rgb(22, 119, 255)",
      backgroundColor: "rgb(145, 202, 255)",
      icon: <InfoSvg style={{ height: "1rem", width: "1rem"}} />,
      textColor: "#003C8F" 
    },
    custom: {
      border: "1px solid white",
      backgroundColor: 'white',
      icon: <InfoSvg style={{ height: "1rem", width: "1rem"}} />,
      textColor: "#000000"
    }, 
}

  const typeStyle = TypeNotification[type];
  const style = { ...typeStyle};
  const IsArabic=useIsArabicLanguage();
  const {t}=useTranslation();

  return (
    <div style={{...style,color:typeStyle.textColor}} className={styles.container} >
      {icon||typeStyle.icon&& <span className={`${styles.icon} ${IsArabic?styles.arabic:styles.english}`}>{icon||typeStyle.icon}</span>}
      <div>
        {title&&<p className={styles.title}>{t(`${title}`)}</p>}
        {message&&<p className={styles.message}>{t(`${message}`)}</p>}
      </div>
      {closeToast && (<button onClick={closeToast} className={`${styles.close} ${title&&styles.active} `}><CloseSmallSvg/></button>)}
    </div>
  );
};

export default NotificationComponent;

interface ShowToastOptions extends ToastOptions {
  message: React.ReactNode;
  icon?: React.ReactNode;
  type?: NotificationType; 
  title?:React.ReactNode
}

export const useNotification = () => {
  const showToast = ({
    message,
    icon,
    title,
    type = 'custom',
    position = 'top-center', 
    duration = 10000, 
    ...toastOptions
  }: ShowToastOptions) => {
    toast((t) => (
      <NotificationComponent
        icon={icon}
        message={message}
        type={type}
        title={title}
        closeToast={() => toast.dismiss(t.id)}/>
    ), {
      position,
      duration,
      ...toastOptions
    });
  };

  return showToast;
};
