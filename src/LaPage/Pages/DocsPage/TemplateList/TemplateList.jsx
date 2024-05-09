import React from 'react'
import style from './TemplateList.module.scss'
import TemplateCard from '../TemplateCard/TemplateCard'
import IPcontract from '../TemplateImages/IPcontract.png'




const TemplateList = () => {

  return (
    <div className={style.wrapper}>
      <TemplateCard name={'Договор юридических услуг с ИП'} image={IPcontract} doc={'IPcontract'}/>
      <TemplateCard name={'Заявка в банк'} image={IPcontract} doc={'IPcontract'}/>
      <TemplateCard name={'Договор юридических услуг'} image={IPcontract} doc={'IPcontract'}/>
      <TemplateCard name={'Исковое заявление'} image={IPcontract} doc={'IPcontract'}/>
      <TemplateCard name={'Заявление в арбитражный суд'} image={IPcontract} doc={'IPcontract'}/>
    </div>
  )
}

export default TemplateList