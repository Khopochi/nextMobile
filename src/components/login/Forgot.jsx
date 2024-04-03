"use client"
import React, { useContext, useEffect, useState } from 'react';
import './login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faInfoCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';





export const Forgot = () => {

  const router = useRouter()

    // import ReactGA from 'react-ga';

    //navigate
    //habdkle digits only
    const [value, setValue] = useState('');
    const handleInputChange = (e) => {
        setValue(e.target.value.replace(/[^0-9]/g, ''));
        setError(false)
        setError2(false)

      };

      const [value1, setValue1] = useState('');
      const handleInputChange1 = (e) => {
          setValue1(e.target.value.replace(/[^0-9]/g, ''));
          setError(false)
          setError2(false)
  
        };
      //CREDETIALS
      const [credentials,setCredentials] = useState({
        password: undefined
      })
      const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
        setError1(false)
        setError3(false)

      }



      //login actions
      const [error,setError] = useState(false)
      const [error1,setError1] = useState(false)
      const [error2,setError2] = useState(false)
      const [error3,setError3] = useState(false)
      const [server,setserver] = useState(undefined)
      const [server1,setserver1] = useState(undefined)
      const [loader,setLoader] = useState(false)
      const [code, setCode] = useState()

      const [one, setone] = useState(false)
      const [two, setTwo] = useState(false)


      const getRandomNumber = () => {
        // Generate a random number between 100000 and 999999
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        return randomNumber;
    };
    

      const sendCode = async () => {
        setLoader(true)
        if(value.length <= 0){
            setError(true)
            setserver("Fill in Phonenumber")
            setLoader(false)


        }else{
            const tempuser = {
                phonenumber: value,
                code: getRandomNumber()
              }
              //console.log(tempuser)
              const res = await axios.post("https://api.jiabaili.shop/api/user/reset", tempuser)
              setLoader(false)
              if(res.data.phonenumber){
               
                setone(true)
              }else{
          
  
              }
         }
      }


      const login = async () => {

        dispatch({type:"LOGIN_START"})
        const lodinData = {
            phonenumber: value,
            password: credentials.password
        }
        setLoader(true)
        if(value.length <= 0){
            setError(true)
            setserver("Fill in Phonenumber")
            setLoader(false)


        }else{
            if(!credentials.password || credentials.password?.length <= 0){
                setError1(true)
                setserver("Fill in Password")
                setLoader(false)

            }else{
                try{
                    const res = await axios.post("https://api.jiabaili.shop/apiuser/login",lodinData)
                    if(res.data.error){
                        if(res.data.error ===  "No user"){
                            setserver("Phonenumber does not exist")
                            setError2(true)
                            setLoader(false)

                        }else{
                            setserver("Wrong Password")
                            setError3(true)
                            setLoader(false)

                        }
                    }else{
                        dispatch({type:"LOGIN_SUCCESS", payload: res.data})
                        //console.log(res.data)
                        setLoader(false)
                        navigate("/")
                            
                    }
        
        
                    
                }catch(err){
                        dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
                }
            }
        }
      }


      const onSubmit = async () => {
        setLoader(true)
        try {
          const res = await axios.post("https://api.jiabaili.shop/api/user/update/"+value1+"/"+value);
          if(res.data.useravailableOTP){
            setError(true)
            setserver("Invalid Code")
            setLoader(false)
          }else if(res.data.correct){
            setTwo(true)
            setLoader(false)
          }
        //   console.log(res.data);
        } catch (err) {
          console.error(err);
        }
      };


      const onRest = async () => {
        setLoader(true)
        try {
            const res = await axios.put("https://api.jiabaili.shop/api/user/updateuser/"+value, credentials);
            if(res.data._id){
              const user = {
                _id: res.data._id,
                phonenumber: res.data.phonenumber
            }
            localStorage.setItem('jiabailikho', JSON.stringify(user));
                              // console.log(res.data)
                              setLoader(false)
                              router.replace("/")
      
            }
          //   console.log(res.data);
          } catch (err) {
            console.error(err);
          }
      }



  return (
    <div className="loginPage">
        {loader && <div className="loaderb">
            <BeatLoader color="hsla(42, 89%, 65%, 1)" />
        </div>}
        <div className="title-t">
            <img  onClick={()=>router.push("/")} src="/image/logo.png" alt="" />
        </div>
        <div className="registerArea">
            <div className="title">
                Reset Pasword
            </div>
            {!one && <div className="fname phone">
                <div className="name">Enter phone number</div>
                {(error || error2) && <div className="error">{server}</div>}
                <div className="inputarea">
                    <span>+265</span>
                    <input type="text" maxLength={9} value={value} onChange={handleInputChange}  className="phoneinput" />
                </div>
                
            </div>}
            {!one && <div className="fname">
                <button onClick={()=>sendCode()}>Send reset code</button>
            </div>}


           {(one && !two) &&  <div className="fname phone">
                <div className="name">Enter code</div>
                {(error || error2) && <div className="error">{server}</div>}
                <div className="inputarea">
                    <span>Code</span>
                    <input type="text" maxLength={9} value={value1} onChange={handleInputChange1}  className="phoneinput" />
                </div>
                
            </div>}
            {(one && !two) && <div className="fname">
                <button onClick={()=>onSubmit()}>Submit code</button>
            </div>}

            {two && <div className="fname">
                <div className="name">Enter new password</div>
                {(error1 || error3) && <div className="error">{server}</div>}
                <input id='password' onChange={handleChange} type="text" className="fnmae" />
            </div>}
            {two && <div className="fname">
                <button onClick={()=>onRest()}>Reset password</button>
            </div>}



            <div className="fname">
                
            </div>

            <div className="fname">
                <div className="divider"></div>
                
            </div>

            <div className="fname">
                <div className="termsandconditions1">
                    New to JiaBaiLi Online? <span onClick={()=>navigate("/register/")} className='link'>Create Account</span>
                </div>
            </div>
        </div>
        <div className="conclusion">
            @JiaBaiLi.shop, 2018-2023
        </div>
    </div>
  )
}
