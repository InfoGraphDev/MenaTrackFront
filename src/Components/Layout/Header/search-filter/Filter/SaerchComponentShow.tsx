import React from 'react'
import Governorates_Liwa_Qada from './Main-Component'
import TitleComponent from '@/Components/UIElements/Layout/Title'

function SaerchComponentShow({isLoading,formOptionsSearch,DataFetch,styles,handleClose,handleClear}) {
  return (
    <div>
      <TitleComponent title='common.Selectacity' SpecialClose={handleClose}/>
        <Governorates_Liwa_Qada 
           formOptions={formOptionsSearch} DataFetch={DataFetch} isLoading={isLoading}/>
    </div>
  )
}

export default SaerchComponentShow
