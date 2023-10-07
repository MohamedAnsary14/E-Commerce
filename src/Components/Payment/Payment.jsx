import axios from 'axios';
import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { cartContext } from '../../context/cartContext';
import { useFormik } from 'formik'

export default function Payment() {
    const { cartId, setcartProducts, settotalCartPrice, setnumOfCartItems } = useContext(cartContext);
    console.log(cartId);

    async function confirmCashPayment() {
        const phoneValue = document.querySelector('#phone').value;
        const cityValue = document.querySelector('#city').value;
        const detailsValue = document.querySelector('#details').value;
        const shippingAddress = {
            "shippingAddress": {
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityValue
            }
        }
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, shippingAddress, {
                headers: { token: localStorage.getItem('tkn') }
            })
            if (data.status === 'success') {
                toast.success('Order Successfully initalized');
                setcartProducts([]);
                setnumOfCartItems(0);
                settotalCartPrice(0);
            }

            else {
                toast('Error on creating Oreder')
            }
        } catch (error) {
            console.log("Error", error);
        }

    }
    async function confirmOnlinePayment() {
        const phoneValue = document.querySelector('#phone').value;
        const cityValue = document.querySelector('#city').value;
        const detailsValue = document.querySelector('#details').value;
        const shippingAddress = {
            "shippingAddress": {
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityValue
            }
        }
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, shippingAddress,
                {
                    headers: { token: localStorage.getItem('tkn') },
                    params: { url: "http://localhost:3005" }
                }
            );
            window.open(data.session.url, 'blank');

        } catch (error) {
            console.log("Error", error);
        }

    }
    return <>
        <div className="container py-5">


            <form   >
                <label htmlFor="phone">Phone: </label>
                
                <input  id='phone' type="tel" className='mb-3 form-control' placeholder='Phone' />
                
                <label htmlFor="">City: </label>
                <input id='city' type="text" className='mb-3 form-control' placeholder='City' />
                <label htmlFor="">Details: </label>
                <textarea id='details' type="text" className='mb-3 form-control' placeholder='Details'></textarea>
                <button type='button' onClick={confirmCashPayment} className='btn btn-primary me-2'>Confirm Cash Payment</button>
                <button type='button' onClick={confirmOnlinePayment} className='btn btn-primary'>Confirm Online Payment</button>




            </form>



        </div>


    </>
}
