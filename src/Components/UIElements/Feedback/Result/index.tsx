import React from 'react';
import styles from "./style.module.scss";
import FlexComponent from '../../Layout/Flex';
import ButtonComponent from '../../General/Button';
import SpaceComponent from '../../Layout/Space';
import { useTranslation } from 'react-i18next';
import FailedSvg from '@/Assets/Icons/Failed';
import InfoSvg from '@/Assets/Icons/info';
import NotFoundSvg from '@/Assets/Icons/notFound';
import WarningSvg from '@/Assets/Icons/Warning';
import SomthingWrongSvg from '@/Assets/Icons/somthingWrong';
import SucsessSvg from '@/Assets/Icons/sucsess';
import AuthorizedSvg from '@/Assets/Icons/authorized';

interface ResultComponentProps {
  icons: "authorized" | "failed" | "info" | "notFound" | "somethingWrong" | "success" | "warning",
  title?: string,
  text?: string,
  Submit?: string,
  cancel?: string,
  handleSubmit?: () => void,
  handleClose?: () => void,
  style?: React.CSSProperties ,
  LoadingResult:boolean
}

function ResultComponent({ icons, title, text, cancel, Submit, handleClose, handleSubmit,style={},LoadingResult }: ResultComponentProps) {
  const {t}=useTranslation();
  const getIconComponent = () => {
    switch (icons) {
      case "authorized":
        return <AuthorizedSvg />;
      case "failed":
        return <FailedSvg style={{ height: "6.5rem", width: "6.5rem", margin: "1.5rem 0rem"}}/>;
      case "info":
        return <InfoSvg style={{ height: "6.5rem", width: "6.5rem", margin: "1.5rem 0rem"}} />;
      case "notFound":
        return <NotFoundSvg />;
      case "somethingWrong":
        return <SomthingWrongSvg />;
      case "success":
        return <SucsessSvg style={{ height: "6.5rem", width: "6.5rem", margin: "1.5rem 0rem"}}/>;
      case "warning":
        return <WarningSvg style={{ height: "6.5rem", width: "6.5rem", margin: "1.5rem 0rem"}}/>;
      default:
        return null; 
    }
  };

  return (
    <div className={styles.mainContainer}>
      <FlexComponent gap='.5rem' flexDirection='column' className={styles.container} style={style}>
        <div className={styles.icon}>{getIconComponent()}</div>
        <SpaceComponent top='.5rem'/>
          {title && <div className={styles.title}>{t(title)}</div>}
          {text && <div className={styles.text}>{t(text)}</div>}
        <SpaceComponent top='.5rem'/>
        <FlexComponent gap='.5rem'>
          <span>{cancel && <ButtonComponent loading={LoadingResult} style={{minWidth:"16rem",height:"2.4rem"}} size='small' DesignButton={2} PassingData={handleClose} text={cancel} />}</span>
          <span>{Submit && <ButtonComponent style={{minWidth:"16rem",height:"2.4rem"}} size='small' PassingData={handleSubmit} text={Submit} />}</span>
        </FlexComponent>
      </FlexComponent>
    </div>
  );
}

export default ResultComponent;
