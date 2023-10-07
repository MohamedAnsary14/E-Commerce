import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'



export default function Register() {
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setsuccessMsg] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();

  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }
  async function registerNewUser(values) {
    setisLoading(true);
    console.log("sending to backend");
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      console.log(data);
      if (data.message === "success") {
        setsuccessMsg('Account has created successfully')
        setTimeout(() => {
          navigate('/login')
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
    onSubmit: registerNewUser,

    validate: function (values) {
      setErrMsg(null);
      const errors = {};
      if (values.name.length < 4 || values.name.length > 10) {
        errors.name = "name is required"
      }
      if (values.email.includes('@') === false || values.email.includes('.') === false) {
        errors.email = "email is required"
      }
      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
        errors.phone = "phone is required"
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = `must be
        * Start with a letter (either uppercase or lowercase).
        * Be between 6 and 9 characters in total.
        * Can only contain letters (A-Z or a-z) and numbers (0-9)`
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "re-Password is required"
      }
      return errors;
    }

  });







  return <>

    <div className="w-75 m-auto my-5 py-5 ">
      {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}
      {successMsg ? <div className="alert alert-success">{successMsg}</div> : ""}

      <h2>register now</h2>
      <form onSubmit={formikobj.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.name} id='name' type="text" className='form-control mb-3' />
        {formikobj.errors.name && formikobj.touched.name ? <div className="alert alert-danger">{formikobj.errors.name}</div> : ""}


        <label htmlFor="email">Email :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.email} id='email' type="Email" className='form-control mb-3' />
        {formikobj.errors.email && formikobj.touched.email ? <div className="alert alert-danger">{formikobj.errors.email}</div> : ""}

        <label htmlFor="password">Password :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.password} id='password' type="Password" className='form-control mb-3' />
        {formikobj.errors.password && formikobj.touched.password ? <div className="alert alert-danger">{formikobj.errors.password}</div> : ""}


        <label htmlFor="rePassword">Re-password:</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.rePassword} id='rePassword' type="Password" className='form-control mb-3' />
        {formikobj.errors.rePassword && formikobj.touched.rePassword ? <div className="alert alert-danger">{formikobj.errors.rePassword}</div> : ""}

        <label htmlFor="phone">Phone :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.phone} id='phone' type="tel" className='form-control mb-3' />
        {formikobj.errors.phone && formikobj.touched.phone ? <div className="alert alert-danger">{formikobj.errors.phone}</div> : ""}
        <div className='w-100 d-flex justify-content-end'>
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
            /> : 'Register now'}



          </button>
        </div>

      </form>


    </div>

  </>
}
