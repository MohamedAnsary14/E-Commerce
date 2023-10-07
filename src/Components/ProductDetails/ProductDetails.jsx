import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Bars, FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'

export default function ProductDetails() {
    const { addProductToCart } = useContext(cartContext)
    const { id } = useParams();
    const [sendingLoader, setSendingLoader] = useState(false)
    async function addProduct(id) {
        setSendingLoader(true);
        const res = await addProductToCart(id)
        if (res.status === "success") {

            toast.success(res.message, {
                position: 'top-center',
                duration: 2000,
            })

        }
        else {
            toast.error("Erroe Happend..")
        }
        setSendingLoader(false);
    }
    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const { data, isLoading } = useQuery("productDetails", getProductDetails)

    if (isLoading) {
        return <div className="vh-100 d-flex justify-content-center align-items-center">

            <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            />

        </div>
    }
    return <>

        <div className="container py-5">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <figure>
                        <img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />
                    </figure>
                </div>
                <div className="col-md-9">
                    <div className="details text-center">
                        <h1>{data.data.data.title}</h1>
                        <p className='text-muted'>
                            {data.data.data.description}
                        </p>
                        <h5>Price:{data.data.data.price} EGP</h5>
                        <button onClick={() => addProduct(data.data.data.id)} className='w-100 p-3 rounded-3 d-flex justify-content-center main-bg-color border-white text-white'>
                            {sendingLoader ? <Bars
                                height="40"
                                width="40"
                                color="#fff"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            /> : "+ ADD To Cart"}
                        </button>


                    </div>
                </div>
            </div>
        </div>

    </>
}

