import React from 'react'
import  styles from "./style.module.scss";
import ErrorCheckFromHook from '../Error-Check/Error-Check';
import ApprovalCheckFormHook from '../Approval-Check/Approval-Check';

function ApprovalAndErrorReactHookForm({formOptions,name,check}) {
    const { errors, touchedFields } = formOptions?.formState;
  return (
    <div>
        {(errors[name] && touchedFields[name]) &&
          <ErrorCheckFromHook text={errors[name]?.message} />}

        {(!errors[name] && touchedFields[name] && check) &&
          <ApprovalCheckFormHook />}
    </div>
  )
}

export default ApprovalAndErrorReactHookForm
