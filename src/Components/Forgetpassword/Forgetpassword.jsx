import React from 'react'

export default function Forgetpassword() {
    return <>
        <div className="container my-5 py-5">
            <h1>please enter your verification code</h1>
       
            <input id='email' type="Email" className='form-control mb-3' placeholder='Email' />
            <button className='btn btn-lg me-auto btn-outline-success' type='submit'>verify</button>
        </div>
    </>
}
