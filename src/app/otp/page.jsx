"use client"
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './otp.scss'; // Import the CSS file
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';



const OTP = () => {
// import ReactGA from 'react-ga';
  const [values, setValues] = useState(['', '', '', '']);



  const [err,seterr] = useState()


  const [user, setUser] = useState()

  const router = useRouter()


  useEffect(() => {
    // Check if user is authenticated by accessing user information from local storage
    const storedUser = localStorage.getItem('jiabailiuser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login page if user is not authenticated
      router.replace('/register');
    }
  }, []);


  const handleInputChange = (e, index) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);

    // Auto-focus the next input
    if (newValue !== '' && index < values.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
  const onSubmit = async () => {
    setLoader(true)
    try {
      const otpValue = values.join('');
      const res = await axios.post("https://api.jiabaili.shop/api/user/register/"+otpValue+"/"+user.phonenumber, user);
      if(res.data.useravailableOTP){
          setLoader(false)
          seterr("Invalid code")
      }else if(res.data.useravailable){
        setLoader(false)
         seterr("Phonenumber already exist")
      }else{
        const user = {
            _id: res.data._id,
            phonenumber: res.data.phonenumber
        }
        localStorage.setItem('jiabailikho', JSON.stringify(user));
        localStorage.removeItem('jiabailiuser');
                        // console.log(res.data)
                        setLoader(false)
                        router.replace("/")

      }
    //   console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const [loader, setLoader] = useState(false)



  return (
    <div className='life'>
    {loader && <div className="loaderb">
            <BeatLoader color="hsla(42, 89%, 65%, 1)" />
        </div>}
    <div className="otp-container">
        
      <div className='h2'>Enter Code to Continue</div>
      {err && <div className="error">{err}</div>}
      <div className="otp-input-container">
        {values.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            className="otp-input"
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleInputChange(e, index)}
          />
        ))}
      </div>
      <button className='buttonotp' onClick={onSubmit}>Submit</button>
    </div>
    </div>
  );
};

export default OTP;
