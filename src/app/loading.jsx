
"use client"
import styles from './home..module.scss'
import { BeatLoader } from 'react-spinners'

const loading = () => {
  return (
    <div className={styles.loading}>
      <BeatLoader color="#E3242B" size={8} />
    </div>
  )
}

export default loading
