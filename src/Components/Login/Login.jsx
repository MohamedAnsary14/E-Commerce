import { useFormik } from 'formik'
import React, { useContext } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import style from '../Login/Login.module.css'
import { authContext } from '../../context/authentication'
import { BallTriangle } from 'react-loader-spinner'



export default function Login() {
  const { setToken } = useContext(authContext);

  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setsuccessMsg] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();

  let user = {
    email: "",
    password: "",
  }
  async function loginToAccount(values) {
    setisLoading(true);
    console.log("sending to backend");
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      console.log(data);
      if (data.message === "success") {
        localStorage.setItem("tkn",data.token)
        setToken(data.token)
        setsuccessMsg('Welcome Back')
        setTimeout(() => {
          navigate('/products')
        }, 1000);


      }
    }
    catch (err) {
      console.log("error", err.response.data.message);
      setErrMsg(err.response.data.message)
    }
    setisLoading(false);
  }
  const formikobj = useFormik({
    initialValues: user,
    onSubmit: loginToAccount,

    validate: function (values) {
      setErrMsg(null);
      const errors = {};

      if (values.email.includes('@') === false || values.email.includes('.') === false) {
        errors.email = "email is required"
      }

      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = `must be
        * Start with a letter (either uppercase or lowercase).
        * Be between 6 and 9 characters in total.
        * Can only contain letters (A-Z or a-z) and numbers (0-9)`
      }

      return errors;
    }

  });







  return <>

    <div className="w-75 m-auto my-5 py-5 ">
      {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}
      {successMsg ? <div className="alert alert-success">{successMsg}</div> : ""}

      <h2>login now</h2>
      <form onSubmit={formikobj.handleSubmit}>



        <label htmlFor="email">Email :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.email} id='email' type="Email" className='form-control mb-3' />
        {formikobj.errors.email && formikobj.touched.email ? <div className="alert alert-danger">{formikobj.errors.email}</div> : ""}

        <label htmlFor="password">Password :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.password} id='password' type="Password" className='form-control mb-3' />
        {formikobj.errors.password && formikobj.touched.password ? <div className="alert alert-danger">{formikobj.errors.password}</div> : ""}





        <div className='w-100 d-flex justify-content-between'>
          <div><Link id={style.link} to={'/forget'} >forget your password ?</Link></div>
          <button type='submit' disabled={formikobj.isValid === false || formikobj.dirty == false} className='btn btn-success '>
          {isLoading ? <BallTriangle
              height={40}
              width={40}
              radius={5}
              color="#fff"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            /> : 'login now'}
            

            </button>
        </div>

      </form>


    </div>

  </>
}

