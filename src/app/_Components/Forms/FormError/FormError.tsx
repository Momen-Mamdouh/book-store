'use client'


import styles from './FormError.module.css';


interface IErrorProp{
    errorMessage?:string,
    onClose?:() => void,
}


function FormError(errorProp: IErrorProp) {
  return (
    <span className={styles.error} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ display: 'flex', alignItems: 'center' }} className={styles.error__icon}>
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 24 24">
          <path
            fill="#393a37"
            d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
          />
        </svg>
      </span>

      <span style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: 0,}} className={styles.error__title}>{errorProp.errorMessage}</span>

      <button
        type="button"
        onClick={errorProp.onClose}
        className={styles.error__close}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: 0,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 20 20">
          <path
            fill="#393a37"
            d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
          />
        </svg>
      </button>
    </span>
  );
}


export default FormError