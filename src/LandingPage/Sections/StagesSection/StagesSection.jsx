import React from 'react'
import style from './StagesSection.module.scss'

const StagesSection = () => {
  return (
   <section className={style.stages} id="stage">
   <div className={style.container}>
     <h4 className={style.stages__heading}>
       Этапы предоставления услуг
     </h4>
     <div className={style.stages__content}>
       <div className={style.stages__points}>
         <ul className={style.stages__points_list}>
           <li className={style.stages__points_item}><span>1. Первичная консультация:</span> Может быть проведена лично либо
             посредством направления Вами документов на наш адрес электронной почты </li>
           <li className={style.stages__points_item}><span>2. Изучение вопроса:</span> Затем юрист изучит соответствующие
             законы и
             прецеденты, которые могут быть применимы к данному спору.</li>
           <li className={style.stages__points_item}><span>3. Переговоры:</span> Юрист проведет переговоры с Вашим оппонентом
           </li>
           <li className={style.stages__points_item}><span>4. Подготовка:</span> От Вас - доверенность. Юрист соберет
             необходимый для решения Вашего вопроса пакет документов, подготовит и направит исковое заявление в суд
           </li>
           <li className={style.stages__points_item}><span>5. Судебное разбирательство:</span> Судебный процесс под ключ.
             Юрист будет представлять Ваши интересы в суде первой инстанции, апелляции, кассации</li>
           <li className={style.stages__points_item}><span>6. Окончательное решение:</span> После вступления решения суда в
             законную силу, наш юрист сопроводит процесс по обеспечению его исполнения.</li>
           <li className={style.stages__conc}><span>Мы с Вами до положительного результата!</span></li>
         </ul>
       </div>
       <div className={style.stages__graph}>
         <div className={style.stages__graph_item}>Первичная консультация</div>
         <div className={style.stages__graph_item}>Исследование вопроса юристом</div>
         <div className={style.stages__graph_item}>Переговоры между сторонами</div>
         <div className={style.stages__graph_item}>Подготовка документов</div>
         <div className={style.stages__graph_item}>Судебное разбирательство</div>
         <div className={style.stages__graph_item}>Получение решения</div>
       </div>
     </div>
   </div>
 </section>
  )
}

export default StagesSection