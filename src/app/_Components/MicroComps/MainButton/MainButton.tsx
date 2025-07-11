import React from 'react';
import styles from './MainButton.module.css'
import { IMainBtn } from '@/app/_Interfaces/IButtons';




const MainButton = React.memo( function MainButton({  btnTitle, btnType = 'submit', isDisabled,
      customizedBtnStyles,customWidth,icon, btnFunction}:IMainBtn) {
const buttonClass = customizedBtnStyles
  ? styles[customizedBtnStyles]
  : styles.btn
  
    return (
        <button
            type={btnType}
            className={buttonClass}
            disabled={isDisabled}
            style={{ width: customWidth }}
            onClick={btnFunction}
        >
            <div className={styles.containerStars}>
              <div className={styles.stars}></div>
            </div>
            <div className={styles.glow}>
              <div className={styles.circle}></div>
              <div className={styles.circle}></div>
            </div>
            <strong className={styles.title}>
              {icon && <span style={{ marginRight: '0.1rem' }}>{icon}</span>}
              {btnTitle}
            </strong>
        </button>
    );
});
  


export default MainButton;