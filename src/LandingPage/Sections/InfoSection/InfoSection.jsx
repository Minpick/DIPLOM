import React from 'react'
import style from './InfoSection.module.scss'
import classNames from 'classnames'
const InfoSections = () => {
   return (
      <section className={style.info} id="info">
         <div className={style.container}>
            <div className={style.info__inner}>
               <div className={style.info__box}>
                  <h3 className={style.info__title}>
                     Юридический центр<br/>
                     Legal Advice
                  </h3>
                  <p className={style.info__text}>
                     Каждый случай уникален! Мы разберем его индивидуально на консультации с профессиональным юристом,
                     специализирующимся в определенной области права.<br />
                     У нас в штате состоят сотрудники с опытом работы в государственных органах, многолетней судебной
                     практикой, которые на первой консультации определят пути решения Вашего вопроса и доведут его до
                     положительного результата
                  </p>
               </div>
               <div className={classNames(style.info__circles,style.circle_95)}>
                  <div className={style.info__circle}>
                     <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70"></circle>
                     </svg>
                     <div className={style.info__circle_number}>
                        <h5>95<span>%</span></h5>
                     </div>
                  </div>
                  <h4 className={style.info__circles_text}>Выигранных дел</h4>
                  <div className={classNames(style.info__circle,style.circle_74)}>
                     <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70"></circle>
                     </svg>
                     <div className={style.info__circle_number}>
                        <h5>74<span>%</span></h5>
                     </div>
                  </div>
                  <h4 className={style.info__circles_text}>Становятся постоянными клиентами</h4>
                  <div className={classNames(style.info__circle, style.circle_97)}>
                     <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70"></circle>
                     </svg>
                     <div className={style.info__circle_number}>
                        <h5>97<span>%</span></h5>
                     </div>
                  </div>
                  <h4 className={style.info__circles_text}>Положительных отзывов</h4>
               </div>
            </div>
         </div>
      </section>
   )
}

export default InfoSections