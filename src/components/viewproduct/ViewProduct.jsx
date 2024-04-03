"use client"
import { useParams, useRouter } from 'next/navigation'
import './viewproduct.scss'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import NavProduct from '../secondnav/NavProduct'
import { BeatLoader, FadeLoader } from 'react-spinners'
import Link from 'next/link'


const ViewProduct = () => {
    // import ReactGA from 'react-ga';
    const {slug} = useParams()
    const [count,setCount] = useState(0)
    const router = useRouter()

    const [user, setUser] = useState()




    useEffect(() => {
      // Check if user is authenticated by accessing user information from local storage
      const storedUser = localStorage.getItem('jiabailikho');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Redirect to login page if user is not authenticated
        // router.push('/login');
      }
    }, []);


    const [unseenmessages, setUnSeenMessages] = useState(0)
    const countUnseen = async () => {
        try{
          const res = await axios.get("https://api.jiabaili.shop/api/message/countunseen/"+user._id)
          setUnSeenMessages(res.data)
          console.log("done")
        }catch(err){

        }
    }

    // console.log(unseenmessages)

    useEffect(()=>{
        if(user){
          countUnseen()
        }
    },[user])



    const [product,setProduct] = useState()
    const [currentPhoto, setCurrentPhoto] = useState(product?.photos?.[0] ?? null);

    const getCount = async () => {
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/user/countitems/"+user._id)
            setCount(res.data.numberOfItemsInCart)
        }catch(err){

        }
    }
    useEffect(()=>{
        getCount()
    },[user])
    const [rUser,setRUser] = useState()
    const getUser = async() => {
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/user/getSingleUser/"+user._id)
            setRUser(res.data)
        }catch(err){

        }
    }

    //locations
    const [towns, setTowns] = useState()
    const [selectedTown, setSelectedTown] = useState()
    const getTowns = async () => {
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/shipping")
            setTowns(res.data)
        }catch(err){

        }
    }


    const fetchProduct = async () => {
        const res = await axios.get("https://api.jiabaili.shop/api/product/getsingleproduct/"+slug)
        if(res.data.error === "Internal Server Error"){

        }else{
            setProduct(res.data)
            setCurrentPhoto(res.data.photos[0])
        }
    }
    useEffect(()=>{
        fetchProduct()
        getTowns()
        if(user){
            getUser()
        }
    },[slug])
    const onHoover = (photo) => {
        setCurrentPhoto(photo)
    }
    //value function
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };

    //calculater discount
    const calculateDiscountedPrice = (price,discount) => {
        if(!discount)
            return formatNumberWithCommas(price)
            

        const discountAmount = (price * discount) / 100;
        const discountedPrice = price - discountAmount;
    
        return formatNumberWithCommas(discountedPrice)
      };
      //counter
        const [options, setOptions] = useState({
            items: 1,
        });
        const handleOption = (name, operation) => {
            setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
            });
        };

    //caculate total
    const calculateDiscountedPriceTotal = (quantity,price,discount) => {
        const nodiscount = price * quantity
        if(!discount)
            return formatNumberWithCommas(nodiscount)


        const discountAmount = (price * discount) / 100;
        const discountedPrice = price - discountAmount;
    
        return formatNumberWithCommas(discountedPrice * quantity)
      };

      //onadd to cart
      const addToCart = async () => {
        const datatoPost = {
            productid: product._id,
            quantity: options.items,
            weight: product.weight,
            location: finalTown
        }
        //console.log(datatoPost)
        setadding(true)
        try{
            const res = await axios.post("https://api.jiabaili.shop/api/user/addtocart/"+user._id ,datatoPost)
            getCount()
            setLoader(false)
            getUser()
            
        }catch(err){

        }
      }

      //check if item arleady in cart
      const itemInCart = (cart, productIdToCheck) => {
        if(rUser){
            return cart.some(item => item.productid === productIdToCheck);
        }
      };
      

      //pick function
      const [showLT, setLT] = useState(false)
      const [lock,setLock] = useState("pick")
      const [finalTown, setFinaltown] = useState(undefined)
      const pickLocation = (id) => {
            if(id === "pick"){
                setLock("pick")
                setLT(false)
                setCalculate(false)
                setFinaltown(undefined)
                setSelectedTown(undefined)
            }else if(id === "send"){
                setLock("send")
                setLT(true)

            }
      }

      //handle selected location
      const [costCalculate, setCalculate] = useState(false)
      const selectLocation = (_id) => {
        const selected = towns.find((location) => location._id === _id);
        setSelectedTown(selected);
        setFinaltown(selected.location)
        setLT(false)
      };

      //weight caliculations
      const getChargeByWeight = (weight) => {
        const charge = selectedTown.charge.find(
          (charge) => weight >= charge.minweight && weight <= charge.maxweight
        );
        return charge.cost
        // return charge;
      };

      const [adding,setadding] = useState(false)



      ///statyqhshwjdw












    const [searchWord, setSearchWord] = useState()

    const handleInputChange = (e) => {
        setSearchWord(e.target.value);
      };
    
    //const move to the other page
    const NavigateTo = () => {
        if(credentials.searchTerm){
            navigate("/search/"+credentials.searchTerm)
            setClick(false)


        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          NavigateTo();
        }
      };

    //search item
    const [credentials,setCredentials] = useState({
        searchTerm: ""
    })
    const [searchItems,setSearchItem] = useState()
    const getSearchItem = async () => {
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/product/search/"+credentials.searchTerm)
            setSearchItem(res.data)
            setClick(true)
            //console.log(res.data)
        }catch(err){

        }
    }
    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
    }
    useEffect(()=>{
        if (credentials.searchTerm != "") {
            const delayTimer = setTimeout(() => {
              getSearchItem();
            }, 500); // Adjust the delay based on your needs (e.g., 500 milliseconds)
      
            return () => clearTimeout(delayTimer);
          }
    },[credentials.searchTerm])

    
    const [click,setClick] = useState(false)
    const HandleAction = (word,key) => {
        setClick(false)
        if(word === "DeepCategory"){
            setClick(false)
            navigate("/categories/"+key+"/")
        }else if(word === "Product"){
            navigate("/viewproduct/"+key+"/")
        }else if(word === "Subcategory"){
            navigate("/subcategories/"+key+"/")
        }else if(word === "Category"){
            navigate("/category/"+key+"/")
        }
    }

    useEffect(()=>{
      if(credentials.searchTerm.length <= 0){
          setClick(false)
      }
    },[credentials.searchTerm])

    //after
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(null);

  const images = [
    'https://amazcart.ischooll.com/public/uploads/images/04-01-2023/63b508b5b7c35.jpeg',
    'https://amazcart.ischooll.com/public/uploads/images/05-01-2023/63b6990a4cd4d.jpeg',
    'https://amazcart.ischooll.com/public/uploads/images/03-01-2023/63b43e3b21095.jpeg'
    // Add more image URLs as needed
  ];

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : product?.photos.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex < product.photos.length - 1 ? prevIndex + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (deltaX > 50) {
      // Swipe to the right
      handleNextSlide();
    } else if (deltaX < -50) {
      // Swipe to the left
      handlePrevSlide();
    }
  };
  const [loader,setLoader] = useState(false)


  //handlce cick
  const addClicked = () => {
    if(user){
      setLoader(true)
      addToCart()
    }else{
      navigate("/login/")
    }
  }


  //handle messageing
  const masterid = "65bba67908bbe58ec8a7f1e1"
  
  const placeOrder = async () => {
    setLoaderr(false)

    // setLoad(true)
    console.log(user._id)
    let creditial = {
      senderid: masterid,
      receiverid: user._id,
      message: "Welcome to Jia Bai Li Chat"
    }
        try{
          //checking if convo alreasdy exist
          const getConvo = await axios.get("https://api.jiabaili.shop/api/convo/special/"+user?._id+"/"+masterid, {cache:"no-store"})
          //postingMessage to message document
            const now = new Date();
            const formattedDate = now.toISOString();
          //if convo exists
          if(getConvo.data){
              //posting message
              // const postMessage = await axios.post("https://api.jiabaili.shop/api/message/", message)
              // const updateThatText = await axios.put("https://api.jiabaili.shop/api/convo/update/"+getConvo.data?._id, updatedText)
              router.push("/chat")
              setLoaderr(false)

             
          }else{
              //if convo doesnt exixt
              const createConvo = await axios.post("https://api.jiabaili.shop/api/convo/", creditial, {cache:"no-store"})
              if(createConvo.data){
                //new message body based on convo
                const messageNew = {
                  conversationid: createConvo.data?._id,
                  text:"Welcome to Jia Bai LI Chat",            
                  senderid: masterid,
                  createdAt: formattedDate
                }
                const postMessage = await axios.post("https://api.jiabaili.shop/api/message/", messageNew, {cache:"no-store"})
                router.push("/chat")
                setLoaderr(false)

              }

          }
        }catch(err){
          console.log(err)
        }
}

const [loaderr, setLoaderr] = useState(false)


  return (
    <>
    {
        loader && <div className="loading">
            <BeatLoader color="#E3242B" size={8} />
      </div>
    }
    {
        !product && <div className="loading">
            <BeatLoader color="#E3242B" size={8} />
      </div>
    }
    {
      product && <div className='viewproduct'>
        <div className='staticnavbar'>
            <NavProduct />
        </div>
        {loader && <div className="loaderv">
            {/* <BeatLoader color="hsla(351, 84%, 49%, 1)" /> */}
            <BeatLoader color="#E3242B" size={8} />
            Adding to cart...
        </div>}

      <div className="middle">
      <div
    className="image-slider loading-shimmer"
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    <div className="slider-container" style={{ transform: `translateX(-${currentIndex * 100}vw)` }}>
      {product?.photos.map((image, index) => (
        <div key={index} className="slide">
          <img src={"https://api.jiabaili.shop/api/photos/"+image} alt="image" />
        </div>
      ))}
    </div>

    <div className="slider-controls">
      <button onClick={handlePrevSlide}>&lt;</button>
      <div className="slider-progress">{`${currentIndex + 1}/${product?.photos.length}`}</div>
      <button onClick={handleNextSlide}>&gt;</button>
    </div>
      </div>

      <div className="product-details">
        <div className="topper-product">
          <span className="mwk">MWK</span>
          <span className="product-price">{calculateDiscountedPrice(product.price,product.discount)}</span>
          <span className="typical-product">MWK{formatNumberWithCommas(product.price)}</span>
          <span className="product-discount">{product.discount}% Off</span>
        </div>
        <div className="taxer-inclusive">Price tax inclusive</div>
        <div className="homeseperator"></div>
        <div className="delivermessage">
          <span className="icon-deliver">
              <img src='/image/truck.svg' alt='dhdbhhj' />
          </span>
          <span className="word-deliver">
              We deliver to you
          </span>
        </div>
        <div className="homeseperator"></div>
        <div className="product-name">{product.name}</div>
        <div className="product-quantity">{product.quantity} in stock | {product.weight} KGs</div>
        <div className="product-detail">{parse (product.details)}</div>
        <div className="divider"></div>
        <div className="topper-product">
          <span className="typical-product-">Total MWK {calculateDiscountedPriceTotal(options.items,product.price,product.discount)}</span>
          
        </div>
        <div className="buttons">
                            <button className="minus" disabled={options.items <= 1} onClick={()=>handleOption("items", "d")}>-</button>
                            <span className="amount">{options.items}</span>
                            <button  disabled={options.items == product.quantity} className="plus" onClick={()=>handleOption("items", "i")}>+</button>
          </div>

      </div>
      </div>
      <div className="bottomm">
            <div className="priceLeft">
            {user && <div className="chat">
                    <div onClick={()=>placeOrder()} className="chaticon">
                        <img src='/image/message-circle.svg' />
                        {(unseenmessages != 0) && <span className="count">{(unseenmessages != 0) ? unseenmessages : ""}</span>}

                    </div>
                    <div className="chaticontext">Chat</div>
            </div>}
            {!user && <div className="chat">
                    <div onClick={()=>router.push("/login")} className="chaticon">
                        <img src='/image/message-circle.svg' />
                    </div>
                    <div className="chaticontext">Chat</div>
            </div>}
            <div className="sep"></div>
            {user && <div className="cartright">
                    <Link href="/cart">
                    <div className="chaticon">
                        <img src='/image/thirdcart.svg' />
                        {(count != 0) && <span className="count">{(count != 0) ? count : ""}</span>}
                    </div>
                    <div className="chaticontext">Cart</div>
                    </Link>
            </div>}
            {!user && <div onClick={()=>router.push("/login?redirect=${router.asPath}")} className="cartright">
                    <div className="chaticon">
                        <img src='/image/thirdcart.svg' />
                    </div>
                    <div className="chaticontext">Cart</div>
            </div>}
            </div>
            {(user && (product.quantity >= 1)) && <div onClick={()=>addClicked()} className="bottom-word">
                Add to cart
            </div>}
            {(user && (product.quantity <= 0)) && <div className="bottom-word">
                Out of Stock
            </div>}
            {!user && <div onClick={()=>router.push("/login?redirect=${router.asPath}")}  className="bottom-word">
               Add to cart
            </div>}

            </div> 
    
  </div>
    }
    </>
  )
}

export default ViewProduct




