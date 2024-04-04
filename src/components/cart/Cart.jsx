"use client"
import { faCircleExclamation, faMagnifyingGlass, faShop, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react'
import './cart.scss'

import { io } from 'socket.io-client';
import { faCheckSquare, faCircleCheck, faSquare } from '@fortawesome/free-regular-svg-icons';
import { SingleCart } from '../cartpopy/SingleCart';
import axios from 'axios';
import { BeatLoader, ClipLoader, FadeLoader } from 'react-spinners';
import NavProduct from '../secondnav/NavProduct';
import { useRouter } from 'next/navigation';






const Cart = () => {
// import ReactGA from 'react-ga';
    ///viewproduct original
    const [user, setUser] = useState()

    const router = useRouter()


    useEffect(() => {
      // Check if user is authenticated by accessing user information from local storage
      const storedUser = localStorage.getItem('jiabailikho');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Redirect to login page if user is not authenticated
        router.push('/login');
      }
    }, []);

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
      

    //caculate total
    const calculateDiscountedPriceTotal = (quantity,price,discount) => {
        const nodiscount = price * quantity
        if(!discount)
            return formatNumberWithCommas(nodiscount)


        const discountAmount = (price * discount) / 100;
        const discountedPrice = price - discountAmount;
    
        return formatNumberWithCommas(discountedPrice * quantity)
      };

      
      

    
      

      



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
            //////console.log(res.data)
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

 
  const [loader,setLoader] = useState(false)

  //copied from arignal cart
  const [carts, setCarts] = useState()
    const [load,setLoad] = useState(true)


    //socket io operations
    //socket io
    const socket = useRef()

    // socketio open
    // const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(()=>{
        socket.current = io("wss://api.jiabaili.shop")
    },[])
    useEffect(()=>{
        if(user){
        socket.current.emit("addUser", user._id)
        socket.current.on("getusers", (users)=>{
          setOnlineUsers(users)
        })
        }
    },[user?._id])
    ////////console.log(onlineUsers)


    const [code, setCode] = useState(undefined)
    const [codemessage, setMessagecode] = useState()
    const [loadingtop, setLoadingTop] = useState(false)
    const [loadingtop1, setLoadingTop1] = useState(false)
    useEffect(()=>{
        socket.current.on("getMessage", (data)=>{
            setCode(data.code)
            setMessagecode(data.message)
        })
     },[])

    
 





    //socketio ends here

    const getCartDetaisl = async () => {
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/user/getcartdetails/"+user._id, {cache:"no-store"})
            setCarts(res.data)
            setLoad(false)
        }catch(err){

        }
    }
    useEffect(()=>{
        getCartDetaisl()
    },[user])

    //gwt user carts
    const [userCart, setUserCart] = useState()
    const [cartLoaded, setCartLoaded] = useState(false)
    const getUserCart = async () => {
        setCartLoaded(false)
        try{
            const res = await axios.get("https://api.jiabaili.shop/api/user/usercarts/"+user._id, {cache:"no-store"})
            setUserCart(res.data)
            setCartLoaded(true)
        }catch(err){

        }
    }
    useEffect(()=>{
        if(user){
            getUserCart()
        }
    },[user])
    const calculateTotal = (arr) => {
        if (!Array.isArray(arr) || arr.length === 0) {
          return 0; // Return 0 for an empty or non-array input
        }
      
        // Use reduce to sum up the values of the 'total' field
        const total = arr.reduce((acc, obj) => acc + (obj.cartTotal || 0), 0);
      
        return total;
      }

      const calculateTotalSub = (arr,cost) => {
        if (!Array.isArray(arr) || arr.length === 0) {
          return 0; // Return 0 for an empty or non-array input
        }
      
        // Use reduce to sum up the values of the 'total' field
        const total = arr.reduce((acc, obj) => acc + (obj.cartTotal || 0), 0);
      
        return total + (parseFloat(cost) || 0);
      }

      const calculateTotalSTD = (arr,cost) => {
        if (!Array.isArray(arr) || arr.length === 0) {
          return 0; // Return 0 for an empty or non-array input
        }
      
        // Use reduce to sum up the values of the 'total' field
        const total = arr.reduce((acc, obj) => acc + (obj.cartTotal || 0), 0);
      
        return (total + (parseFloat(cost) || 0)) * 100;
      }

      const [newData,setData] = useState(true)
      const handleRefresh = (id) => {
        const updatedCartItems = carts.filter(item => item.cartid !== id);
        getUserCart().then(() => {
            setCarts(updatedCartItems);
        });
    };
    


      //payment options
      const [selectedPay, setSelectedPay] = useState()

      const setPayOption = (id) => {
        setSelectedPay(id)
      }
      const [iframe,setIframe] = useState()
      const payOrder = async () => {

       
        if(selectedPay === "airtel"){
          
          //////console.log(calculateTotalSub(carts,cost))
            const orderinfo = {
                userid: user._id,
                cart: userCart,
                total: calculateTotalSub(carts,cost),
                status: "Waiting payment",
                phone: user.phonenumber,
                location: selectedl?.location  ? selectedl?.location : "Pick at Shop"
            }
            setLoadingTop(true)
            try{
                const res = await axios.post("https://api.jiabaili.shop/api/transaction/airtel",orderinfo, {cache:"no-store"})

                //add this
                setorderid(res.data.data.transaction.id)
            }catch(err){

            }
        }else if(selectedPay === "STD"){
            const orderinfo = {
                userid: user._id,
                cart: userCart,
                total: calculateTotalSub(carts,cost),
                status: "Waiting payment",
                phone: user.phonenumber,
                std: {
                    action: "AUTH",  
                    amount : { currencyCode : "MWK", value : calculateTotalSTD(carts,cost) },
                },
                location: selectedl?.location  ? selectedl?.location : "Pick at Shop"

            }
            setLoadingTop1(true)
            setstd(true)
            try{
                const res = await axios.post("https://api.jiabaili.shop/api/transaction/stdbank",orderinfo, {cache:"no-store"})
                setIframe(res.data.order._links.payment.href)
                setLoadingTop1(false)

            }catch(err){

            }
        }
      }
      const [std,setstd] = useState(false)

      ////////console.log(userCart)
      const [orderid, setorderid] = useState()
      const [userData, setUserData] = useState(null);
      // Function to fetch user data based on userId
      const fetchOrder = async () => {
        try {
          // Assuming you have an API call to fetch user data
          const response = await axios.get("https://api.jiabaili.shop/api/ordersubmitted/getsinglebyorderid/"+orderid, {cache:"no-store"})
          setUserData(response.data);
        } catch (error) {
          ////////console.error('Error fetching user data:', error);
        }
      };

      useEffect(() => {
        if(orderid){const fetchData = async () => {
          try {
            // Your API call to fetch data
            const response = await axios.get("https://api.jiabaili.shop/api/ordersubmitted/getsinglebyorderid/"+orderid, {cache:"no-store"})
            setUserData(response.data);
            // Your logic with the fetched data
          } catch (error) {
            ////////console.error('Error fetching data:', error);
            // Handle the error as needed
          }
        };
    
        const intervalId = setInterval(() => {
          fetchData();
        }, 3000);
    
        // Cleanup: Stop the interval after 1 minute (60,000 milliseconds)
        const timeoutId = setTimeout(() => {
          clearInterval(intervalId);
          ////////console.log('Interval stopped after 1 minute');
        }, 60000);
    
        // Return cleanup function
        return () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          ////////console.log('Cleanup: Interval cleared');
        };}
      }, [orderid]);

      ////////console.log(userData)

      useEffect(()=>{
            if(userData){
                if(userData.status === "Paid"){
                    router.push("/completed/")
                }
            }
      },[userData])




      








      //ending here to add
      useEffect(()=>{
        if(code === "TS"){
            // router.push("/completed/")
        }
      },[code])

      const [search,setSearch] = useState()
      const [searchterm,setsearchterm] = useState({
          term: ""
      })

      const SerachFu = async () => {
        //////console.log(searchterm.term)
          const res = await axios.get("https://api.jiabaili.shop/api/SHIPPING/SEARCH/"+searchterm.term)
          setSearch(res.data)
      }

      const [loca,showloca] = useState(false)

      useEffect(()=>{
          if(searchterm.term.length > 0){
            SerachFu()
          }
      },[searchterm.term])

      const handleChangee = (e) => {
        setsearchterm((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const [selectedl,setselected] = useState()
    const [cost,setcost] = useState()

      // Calculate total weight for each item and sum them up
      const calculateTotalWeight = (cat) => {
        let totalWeight = 0;
    
        cat.forEach((item) => {
          // Assuming each item in the cart has properties 'weight' and 'quantity'
          const itemWeight = item.weight * item.quantity;
          totalWeight += itemWeight;
        });
    
        return totalWeight;
      };

      //calculte charge
      const calculateCost = (chargeRanges, weight) => {
        // If weight is less than 1, assign weight as 1
        const adjustedWeight = Math.max(weight, 1);
      
        // Find the charge object that matches the weight range
        const matchingCharge = chargeRanges.find(charge => adjustedWeight >= charge.minweight && adjustedWeight < charge.maxweight);
      
        // If a matching charge is found, return its cost; otherwise, return an appropriate message or value
        return matchingCharge ? (matchingCharge.cost === 0 ? "0.00" : matchingCharge.cost) : 'No';
      };
      
    useEffect(()=>{
        if(selectedl?._id.length > 0){
            setcost(calculateCost(selectedl.charge, calculateTotalWeight(carts)))
            //////console.log(calculateCost(selectedl.charge, calculateTotalWeight(carts)))
        }
    },[selectedl])


    //continue
    const [cStatus, setCstatus] = useState(false)
    const [numberfinal, setNumberfinal] = useState(99128)

    const [typenumber, setTypenumber] = useState(true)

    useEffect(()=>{
        if((selectedPay) && (selectedPay == "airtel")){
          const nstring = user.phonenumber.toString()
          if(nstring.charAt(0) === '9'){
             setTypenumber(true)
          }else{
            setTypenumber(false)
          }
        }
    },[selectedPay])

    const [value, setValue] = useState('');
    const handleInputChangev = (e) => {
        setValue(e.target.value.replace(/[^0-9]/g, ''));
        setNumberfinal(e.target.value.replace(/[^0-9]/g, ''))

      };

      const enteranother = () => {
        if(numberfinal.length >= 9){
           setTypenumber(true)
        }
      }
    

    const closeloca = () => {
      setselected(undefined)
      // setcost(undefined)
      // setCstatus(false)
      // setTypenumber(false)
      setValue("")
      showloca(false)
      
    }


    const setpickcost = (cst) => {
      setcost("0.00")
    }

    // const  = selected1.location && selected1.location.toLowerCase().includes('lilongwe');
    console.log({usercarts: userCart})
          console.log({carts: carts})

          console.log(calculateTotalSub(userCart, 20))
          console.log(calculateTotalSub(carts, 20))
  
  return (
    <>
    {iframe && <div className="fadaiframe">
            {
                iframe && <iframe
                src={iframe}
                title="External Website"
                className='iframestd'
                frameBorder="0"
                allowFullScreen
            ></iframe>
            }
        </div>}
    {loadingtop &&  <div className="airtelpage">
            {!code && <div className="onloading">
                    <span className="icon"><ClipLoader color="#E3242B" /></span>
                    <span className="word">Waiting for payment...</span>
            </div>}
            {(code === "TF") && <div className="onfaled">
                    <span className="icon"><FontAwesomeIcon className="icon" icon={faCircleExclamation} /></span>
                    <span className="failed">Failed: {codemessage} </span>
            </div>}
            {(code === "TS") && <div className="onSuccess">
                    <span className="icon"><FontAwesomeIcon className="icon" icon={faCircleCheck} /></span>
                    <span className="failed">Payment received</span>
            </div>}
        </div>}
        {loadingtop1 &&  <div className="airtelpage">
            {!code && <div className="onloading">
                    <span className="icon"><ClipLoader color="#E3242B" /></span>
                    <span className="word">Conneting to Standard Bank...</span>
            </div>}
            {(code === "TF") && <div className="onfaled">
                    <span className="icon"><FontAwesomeIcon className="icon" icon={faCircleExclamation} /></span>
                    <span className="failed">Failed: {codemessage} </span>
            </div>}
            {(code === "TS") && <div className="onSuccess">
                    <span className="icon"><FontAwesomeIcon className="icon" icon={faCircleCheck} /></span>
                    <span className="failed">Payment received</span>
            </div>}
        </div>}
    {(loca && !(loadingtop || std)) && <div className="location">
      <div className="divbody">
        <div  className="closer"><FontAwesomeIcon onClick={()=>closeloca()} icon={faX} /> </div>
        {!cost && <div className="titlediv">Select your location</div>}
        {!cost && <input type="text" id='term' onChange={handleChangee} placeholder='Search your location...'/>}
        {(search && !cost) && <div className="divresults">
          <div className="resultstitle">Available locations</div>
          <div className="resultavailable">
          {
            search.map((item,index)=>(
                <div key={index} onClick={()=>setselected(item)} className="locationitem">{item.location}</div>
            ))
          }
          </div>
         
        </div>}
        {!cost && <div onClick={()=>setpickcost()} className="titlediv1">Pick at shop?</div>}
        {(cost && !cStatus) && <div className="info">
          {(cost != 0.00 && cost != "No") && 
              <span className="total">

                <span className="thading">Total details</span>
                <span className="tproduct">
                  <div className="leftp">
                    <div className="leutem">Total for goods</div>
                    <div className="leutem">Total KGs</div>
                    <div className="leutem">Delivery Fee | {selectedl.location}</div>
                    <div className="leutem">Delivery Period</div>
                    <div className="leutem ll">Total</div>
                  </div>
                  <div className="rightp">
                    <div className="iermhfh">MWK {formatNumberWithCommas(calculateTotal(carts))}</div>
                    <div className="iermhfh">{Math.round(calculateTotalWeight(carts) * 100) / 100} KGs</div>
                    <div className="iermhfh">MWK {formatNumberWithCommas(calculateCost(selectedl.charge, calculateTotalWeight(carts)))}</div>
                    <div className="iermhfh">{selectedl.location.toLowerCase().includes('lilongwe') ? "Within 24hrs" : "Within 48hrs"}</div>
                    <div className="iermhfh ll">MWK {formatNumberWithCommas(calculateTotalSub(carts,cost))}</div>
                  </div>
                </span>
              </span>}
          {(cost == 0.00 && cost != "No") && <span className="total">
              <span className="thading">Total details</span>
              <span className="tproduct">
                <div className="leftp">
                  <div className="leutem">Total for goods</div>
                  <div className="leutem">Total KGs</div>
                  {(selectedl?.location) &&<div className="leutem">Delivery Fee | {selectedl.location}</div>}
                  {(!selectedl?.location) &&<div className="leutem">Delivery Fee </div>}
                  {(!selectedl?.location) &&<div className="leutem">Collecting time </div>}
                  {(selectedl?.location) &&<div className="leutem">Delivery Period </div>}

                  <div className="leutem ll">Total</div>
                </div>
                <div className="rightp">
                  <div className="iermhfh">MWK {formatNumberWithCommas(calculateTotal(carts))}</div>
                  <div className="iermhfh">{Math.round(calculateTotalWeight(carts) * 100) / 100} KGs</div>
                  {(selectedl?.location) && <div className="iermhfh">Free</div>}
                  {(!selectedl?.location) && <div className="iermhfh">None | Pick at shop</div>}
                  {(!selectedl?.location) && <div className="iermhfh">8am - 5:30pm</div>}
                  {(selectedl?.location) && <div className="iermhfh">Within 24hrs</div>}

                  <div className="iermhfh ll">MWK {formatNumberWithCommas(calculateTotalSub(carts,cost))}</div>
                </div>
              </span>
              </span>}
          {(cost == "No") && <span className="total">Delivery to your location for specified weight is not available</span>}
          {(cost != "No") && <span onClick={()=>setCstatus(true)} className="btn">Continue</span>}

        </div>}
        {cStatus && <div className="paymentoptions">
                        <div className="title">Select Payment option</div>
                        <div className="tickarea">
                            <span className="optionpay">
                                <span onClick={()=>setPayOption("airtel")} className="iconpay">
                                {selectedPay === 'airtel' ? (
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                ) : (
                                    <FontAwesomeIcon icon={faSquare} />
                                )}</span>
                                <span onClick={()=>setPayOption("airtel")}  className="wordpay">Airtel Money</span>
                            </span>
                            <span className="optionpay">
                                <span onClick={()=>setPayOption("STD")} className="iconpay">{selectedPay === 'STD' ? (
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                ) : (
                                    <FontAwesomeIcon icon={faSquare} />
                                )}</span>
                                <span onClick={()=>setPayOption("STD")} className="wordpay">Standard Bank</span>
                            </span>

                        </div>
        </div>}
        {cStatus && <div className="paymentnow">
                        {(selectedPay && cartLoaded) && <button onClick={()=>payOrder()}>Pay Now</button>}
                        {(selectedPay && !cartLoaded) && <button >Loading cart...</button>}
                        {!selectedPay && <button>select payment method</button>}
        </div>}

        {!typenumber && <div className="addnumber">
          <div className="childediv">
            <input type="text"  maxLength={9} value={value} onChange={handleInputChangev} placeholder='Enter airtel number...' />
            <div onClick={()=>enteranother()} className="doneEnter">Enter</div>
          </div>

        </div>}

      </div>
    </div>}
    {
      !carts && <div className="loader">
          {/* <BeatLoader color="hsla(351, 84%, 49%, 1)" /> */}
          <BeatLoader color="#E3242B" size={8} />
          loading cart...
      </div>
    }
    {
      carts && <div className='viewproduct'>
        {loader && <div className="loaderv">
            {/* <BeatLoader color="hsla(351, 84%, 49%, 1)" /> */}
            <FadeLoader color="#007185" />
            Adding to cart...
        </div>}
      <NavProduct/>
      <div className="middlexxx">
        <div className="topperheading">
            <div className="heading">Shopping Cart</div>
            <div className="yutter">{carts.length} items in cart | Total Weight {Math.round(calculateTotalWeight(carts) * 100) / 100} (KGs)</div>
        </div>
        <div className="dsher">
            
        </div>
        <div className="cartarea">
        {carts && <div className="bodyitems">
                            {
                                carts.map((cart,index)=>(
                                    <SingleCart key={index} data={cart} onDeleteItem={handleRefresh} /> 
                                ))
                            }
                        </div>}
        </div>

      </div>
      {(carts.length > 0) && <div className="bottom">
          <div className="buttom-items">
              <span className='kkmwk'>MWK</span> {formatNumberWithCommas(calculateTotal(carts))}
          </div>
          <div onClick={()=>showloca(true)} className="bottom-word">
              Pay
          </div>
      </div>}
    
  </div>
    }
    </>
    
  )
}

export default Cart
