import React, { Suspense, lazy } from 'react';
import SingleDateFormHook from "./component/Date/Single-Date";
import RangeFeildFormHook from "./component/Input-Feild/Range-Feild"
import  SingleSelectFormHook from './component/Select/Single-Select';
import  NumberFormHook from'./component/Input-Feild/Number-Feild';
import RangeDateFormHook from'./component/Date/Range-Date';
import InputFieldTextFormHook from'./component/Input-Feild/Text-Feild';
import SearchSelectFormHook from './component/Input-Feild/Search-Select/Search-Select';
import  NumberFeildWithEnter  from './component/Input-Feild/Number-Enter';
import  MultipleSelectFormHook from './component/Select/Multiple-Select';
import  CheckBoxFormHook from './component/checkBox';
import  PhoneNumberInputFeildFormHook from './component/Input-Feild/PhoneNumber';
import  InputFeildTextArea from './component/Input-Feild/Text-Area';
const HtmlSelectFormHook = lazy(() => import('./component/Select/Html-Select-Single'));
const YearMonthPickerFormHook = lazy(() => import('./component/Date/Year-month'));
const InputFieldRadioFormHook = lazy(() => import('./component/Input-Feild/Radio-button'));

interface BaseComponentProps {
  Datause: {
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
    check?: boolean;
  };
  disable?: boolean;
  formOptions: any;
  className?: string;
  style?: React.CSSProperties;
}

interface TextProps extends BaseComponentProps {
  type: 'text' | 'password';
}

interface NumberProps extends BaseComponentProps {
  type: 'number';
  Datause: {
    check?: boolean;
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
    decimal: boolean;
    negative: boolean;
  };
  moreOptions?: {
    passingOptions?: object[];
    handelSelect?: any;
    DontShowTooltip?: boolean;
  };
  textAlignCenter?: any;
}

interface HtmlSelectProps extends BaseComponentProps {
  type: 'html-select';
  Datause: {
    check?: boolean;
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
    options: Array<{ value: string, label: string }>;
  };
}

interface ReactSelectProps extends BaseComponentProps {
  type: 'react-select' | 'react-select-multi';
  isClearable?:boolean,
  moreOptions?: {
    passingOptions?: object[];
  };
  handelChangeValue?:any,
  Datause: {
    check?: boolean;
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
    options: any[];
    keyName?: string;
    valueName?: string;
  };
}

interface DateProps extends BaseComponentProps {
  type: 'single-date' | 'year-month';
}

interface DateRange extends BaseComponentProps {
  type: 'range-date';
  Datause: {
    check?: boolean;
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
    nameToDate: string;
  };
}

interface RangeProps extends BaseComponentProps {
  type: 'range-field';
}

interface CheckBoxProps extends BaseComponentProps {
  type: 'check-box-hospital-healthCenter';
  ResetValue?: boolean;
  Datause: {
    check?: boolean;
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
    options?: Array<{ value: string, label: string }>;
    nameList: string;
    value: string;
  };
}

interface PlaceSelectProps extends BaseComponentProps {
  type: 'place-select';
  moreOptions?: {
    passingOptions?: object[];
  };
  Datause: {
    check?: boolean;
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
    options: Array<{ value: string, label: string }>;
  };
}

interface TableEntry {
  url: string;
  english: string;
  arabic: string;
}


interface SearchSelectProps extends BaseComponentProps {
  type: 'search-select';
  moreOptions?: {
    passingOptions?: object[];
    handelSelect?: any;
    DontShowTooltip?: boolean;
  };
  Datause: {
    check?: boolean;
    DropDown?: string;
    SearchOption: TableEntry[];
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
  };
}

interface TextAreaProps extends BaseComponentProps {
  type: 'text-area';
  Datause: {
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
    check?: boolean;
    numberOfWord?:number
  };
}

interface RadioFieldProps extends BaseComponentProps {
  type: 'radio-field';
  Datause: {
    check?: boolean;
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
    options: Array<{ value: string, label: string }>;
  };
}

interface PhoneNumberProps extends BaseComponentProps {
  type: 'phone-number';
}

interface NumberWithEnterProps extends BaseComponentProps {
  type: 'Number-With-Enter';
  textAlignCenter?: any;
  handelPassingEnterValue?:any,
  Datause: {
    check?: boolean;
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
    decimal: boolean;
    negative: boolean;
  };
}

type ComponentProps =
  | TextProps
  | NumberProps
  | HtmlSelectProps
  | ReactSelectProps
  | DateProps
  | RangeProps
  | CheckBoxProps
  | PlaceSelectProps
  | SearchSelectProps
  | TextAreaProps
  | RadioFieldProps
  | PhoneNumberProps
  | DateRange
  |NumberWithEnterProps;

const ReusableInput = ({ type, Datause, formOptions, disable, moreOptions, ResetValue, textAlignCenter, className, style,handelChangeValue,handelPassingEnterValue,isClearable }: ComponentProps) => {
  return (
    <Suspense fallback={<div></div>}>
      <div className={className} style={style}>
        {type === 'text' || type === 'password' ? (
          <InputFieldTextFormHook type={type} Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'number' ? (
          <NumberFormHook moreOptions={moreOptions} textAlignCenter={textAlignCenter} Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'html-select' ? (
          <HtmlSelectFormHook Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'react-select' ? (
          <SingleSelectFormHook isClearable={isClearable} handelChangeValue={handelChangeValue} Datause={Datause} formOptions={formOptions} disable={disable} passingOptions={moreOptions?.passingOptions} />
        ) : null}
        {type === 'react-select-multi' ? (
          <MultipleSelectFormHook handelChangeValue={handelChangeValue} Datause={Datause} formOptions={formOptions} disable={disable} passingOptions={moreOptions?.passingOptions} />
        ) : null}
        {type === 'single-date' ? (
          <SingleDateFormHook Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'range-date' ? (
          <RangeDateFormHook Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'year-month' ? (
          <YearMonthPickerFormHook Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'range-field' ? (
          <RangeFeildFormHook Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'check-box-hospital-healthCenter' ? (
          <CheckBoxFormHook ResetValue={ResetValue} Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'text-area' ? (
          <InputFeildTextArea Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'radio-field' ? (
          <InputFieldRadioFormHook Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'phone-number' ? (
          <PhoneNumberInputFeildFormHook Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'Number-With-Enter' ? (
          <NumberFeildWithEnter moreOptions={moreOptions} textAlignCenter={textAlignCenter} handelPassingEnterValue={handelPassingEnterValue} Datause={Datause} formOptions={formOptions} disable={disable} />
        ) : null}
        {type === 'search-select' ? (
          <SearchSelectFormHook Datause={Datause} formOptions={formOptions} disable={disable} moreOptions={moreOptions} />
        ) : null}

      </div>
    </Suspense>
  );
};

export default ReusableInput;
