import React from 'react'
import style from './TemplateList.module.scss'
import TemplateCard from '../TemplateCard/TemplateCard'
import IPcontract from '../TemplateImages/IPcontract.png'




const TemplateList = () => {

  return (
    <div className={style.wrapper}>
      <TemplateCard name={'Договор юридических услуг с ИП'} image={IPcontract} doc={'IPcontract'}/>
    </div>
  )
}

export default TemplateList