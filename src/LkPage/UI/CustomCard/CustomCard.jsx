import React from 'react'
import style from './CustomCard.module.scss'
import classNames from 'classnames';

const CustomCard = ({ heading, name, id, array, ticked, customStyle, selectedLots, setSelectedLots, children }) => {
   const toggleLotSelection = (lotId) => {
      if (selectedLots.includes(lotId)) {
         setSelectedLots(selectedLots.filter(id => id !== lotId));
      } else {
         setSelectedLots([...selectedLots, lotId]);
      }
   };
   return (
      <div className={style.wrapper} style={customStyle}>
         {/* <div className={style.box} /> */}
         <div className={style.checkboxWrapper}>
            <input
               type="checkbox"
               id='myCheckBox'
               defaultChecked={ticked}
               className={style.tick}
               checked={selectedLots?.includes(id)}
               onChange={() => toggleLotSelection(id)}
            />
            <label
               onClick={() => toggleLotSelection(id)}
               htmlFor="myCheckbox" className={ticked?classNames(style.customCheckbox,style.ticked):style.customCheckbox}><span>&#10003;</span></label>
         </div>
         <div className={style.content}>
            <div className={style.heading}>
               {heading}
               <span>
                  {name}
               </span>
            </div>
            {children}

         </div>
      </div>
   )
}

export default CustomCard