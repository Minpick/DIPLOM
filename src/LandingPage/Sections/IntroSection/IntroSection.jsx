import React from 'react'
import style from './IntroSection.module.scss'

const IntroSection = () => {
  return (
   <section className={style.intro} id="intro">
   <div className={style.container}>
     <div className={style.intro__inner}>
       <h3 className={style.intro__title}>
         Наш опыт - Ваше преимущество
       </h3>
       <h4 className={style.intro__text}>
         Мы решим Ваш вопрос
       </h4>
       <button className={style.intro__btn}><a href="#footer">Записаться на консультацию</a></button>
     </div>
   </div>
 </section>
  )
}

export default IntroSection