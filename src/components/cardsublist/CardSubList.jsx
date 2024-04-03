import SingleCategory from '../singlecategory/SingleCategory'
import SingleSubCard from '../singleforsubcard/SingleSubCard'
import './cardsublis.scss'

const CardSubList = ({name}) => {
  return (
    <div className='cardcategory'>
    <div className="cctop">
      <h1 className="cctopleft">{name}</h1>
    </div>
      <div className="imageproductsarae">
              <SingleSubCard/>
              <SingleSubCard/>
              <SingleSubCard/>
              <SingleSubCard/>
              <SingleSubCard/>
              <SingleSubCard/>
              <SingleSubCard/>
              <SingleSubCard/>
              <SingleSubCard/>
              <SingleSubCard/>

      </div>
  </div>
  )
}

export default CardSubList
