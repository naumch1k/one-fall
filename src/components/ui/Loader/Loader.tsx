import styles from './Loader.module.css'

export const Loader = () => (
  <div className={styles.root}>
    <svg viewBox='0 0 52 50' xmlns='http://www.w3.org/2000/svg'>
      <circle fill='currentColor' cx='6' cy='25' r='6'>
        <animate
          attributeName='opacity'
          dur='1.2s'
          values='0.3;1;0.3'
          repeatCount='indefinite'
          begin='0.12'
        />
      </circle>
      <circle fill='currentColor' cx='26' cy='25' r='6'>
        <animate
          attributeName='opacity'
          dur='1.2s'
          values='0.3;1;0.3'
          repeatCount='indefinite'
          begin='0.24'
        />
      </circle>
      <circle fill='currentColor' cx='46' cy='25' r='6'>
        <animate
          attributeName='opacity'
          dur='1.2s'
          values='0.3;1;0.3'
          repeatCount='indefinite'
          begin='0.36'
        />
      </circle>
    </svg>
  </div>
)
