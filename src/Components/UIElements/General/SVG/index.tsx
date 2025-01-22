import React from 'react';
import DrawSvg from './Icons/draw';
import HospitalSvg from './Icons/hosital';
import SearchPlaceSvg from './Icons/searchPlace';
import MedicalEquipmentSvg from './Icons/medicalEquipment';
import DashboardSvg from './Icons/dashboard';
import MainChartSvg from './Icons/MainChartSvg';
import UserDetailSvg from './Icons/userDetail';
import MeasurmentSvg from './Icons/measurment';
import LocationSvg from './Icons/location';
import SearchEarthSvg from './Icons/searchEarth';
import ZoomInSvg from './Icons/zoomIn';
import ZoomOutSvg from './Icons/zoomOut';
import PrintSvg from './Icons/print';
import FullScreenSvg from '@/Assets/Icons/fullScreen';
import ListOptionsSvg from './Icons/list';
import OffersSvg from './Icons/Offers';
import SubscribersSvg from './Icons/Subscribers';
import PermissionSvg from './Icons/permission';
import RemoveUserSvg from './Icons/remove';
import EditeUserSvg from './Icons/edite';
import coverageSvg from '@/Assets/Icons/ASC copy';


const svgMapping = {
  SubscribersSvg,
  OffersSvg,
  HospitalSvg,
  DrawSvg,
  SearchPlaceSvg,
  MedicalEquipmentSvg,
  DashboardSvg,
  MainChartSvg,
  UserDetailSvg,
  MeasurmentSvg,
  LocationSvg,
  SearchEarthSvg,
  ZoomInSvg,
  ZoomOutSvg,
  PrintSvg,
  FullScreenSvg,
  ListOptionsSvg,
  PermissionSvg,
  RemoveUserSvg,
  EditeUserSvg,
  coverageSvg
};

interface SvgComponentProps {
  svgName: string;
  className?: string;
}

const SvgComponent: React.FC<SvgComponentProps> = ({ svgName, className, ...props }) => {
  const SvgIcon = svgMapping[svgName];
  if (!SvgIcon) {
    return null;
  }
  return <SvgIcon className={className} {...props} />;
};

export default SvgComponent;
