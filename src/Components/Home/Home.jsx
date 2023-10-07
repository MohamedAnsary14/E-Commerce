import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import style from '../Home/Home.module.css'
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';


export default function Home() {
  const { addProductToCart } = useContext(cartContext)
  async function addProduct(id) {
    const res = await addProductToCart(id)
    console.log("Response From Product", res);
    if (res.status === "success"){

      toast.success(res.message, {
        position: 'top-center',
        duration: 2000,
      })
      
    }
    else {
      toast.error("Erroe Happend..")
    }
  }
  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')

  }
  const { isErorr, isFetching, isLoading, data } = useQuery("allProducts", getAllProducts, {

  });



  // const [AllProducts, setAllProducts] = useState(null)
  // async function getAllProducts() {
  //   const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   setAllProducts(data.data);
  // }

  // useEffect(function () {
  //   getAllProducts()

  // }, []);


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

    <div className="container  py-5 my-5">
      <input type="text" className='w-75 mx-auto form-control my-5 ' placeholder='search....' />
      <div className="row  gx-0 justify-content-center ">
        <div className="col-sm-3  ">
          <HomeSlider />
        </div>
        <div className="col-sm-3">
          <img style={{ width: "100%", height: "200px" }} src={require('../../Images/5.jpg')} alt="" />
          <img style={{ width: "100%", height: "200px" }} src={require('../../Images/4.jpg')} alt="" />
        </div>
      </div>
      <CategoriesSlider />
      <div className="row my-4 g-5">

        {data?.data.data.map(function (product, idx) {
          return <div key={idx} className="col-md-3 ">

            <div className="product p-3" id={style.product} >
              <Link to={`/productDetails/${product.id}`}>
                <img src={product.imageCover} className='w-100' alt="product" />
                <h6 className='main-color'>{product.category.name}</h6>
                <h5>{product.title.split(' ').slice(0, 3).join(" ")}</h5>

                <div className="d-flex justify-content-between align-items-center mb-5">
                  <p>{product.price} EGP </p>
                  <p> <span><i className="fa-solid fa-star text-warning"></i></span>{product.ratingsAverage}</p>
                </div>
              </Link>
              <i className="fa-solid fa-heart fa-2x d-flex justify-content-end align-items-center "></i>
              <button onClick={() => addProduct(product.id)} id={style.btn} className='btn btn-success w-75 mx-4 my-4 '>+ Add</button>


            </div>
          </div>
        })}



      </div>
    </div>

  </>
}

