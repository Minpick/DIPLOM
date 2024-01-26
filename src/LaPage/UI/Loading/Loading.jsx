import React from 'react'
import PopUpAdd from '../PopUpAdd/PopUpAdd'
import style from './Loading.module.scss'

const Loading = () => {
  return (
    <PopUpAdd noClick={true}>
      <div className={style.loader}></div>
    </PopUpAdd>
  )
}

export default Loading