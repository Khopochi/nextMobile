import  styles from './singlesubcard.module.scss'

const SingleSubCard = () => {
  return (
    <div  className={styles.discountshopre + " " + styles.addition}>
    <div className={styles.shimage}>
        <img src={"https://api.jiabaili.shop/api/photos/2263641707917891249-Photoroom.jpg"} alt="" />
    </div>
    <div className={styles.shopdetails}>
        <div className={styles.nameshope}>
            terminal whatever
        </div>
    </div>
</div>
  )
}

export default SingleSubCard
