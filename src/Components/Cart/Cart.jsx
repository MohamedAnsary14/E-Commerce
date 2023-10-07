import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import { FallingLines } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import style from '../Cart/Cart.module.css'

export default function Cart() {
  const { cartProducts, totalCartPrice, numOfCartItems, deletProduct, updateCount, removeCartData } = useContext(cartContext)

  async function updateElementCount(id, count) {
    const res = await updateCount(id, count);

    if (res.status === "success") {
      toast.success("Updated Successfully")
    }
    else {
      toast.error("Error on Updating ")
    }

  }
  async function deleteCart() {
    await removeCartData()
  }

  if (cartProducts === null) {
    return <>
      <div className="vh-100 d-flex justify-content-center align-items-center">

        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel='falling-lines-loading'
        />

      </div>

    </>
  }
  if (cartProducts.length === 0) {
    return <>
      <h1 className='my-5 py-5'>No Data Found in Your Cart <Link className={style.link} to="/products"> Get Some Products...</Link> </h1>
    </>

  }
  async function deletElement(id) {

    const res = await deletProduct(id)
    if (res.status === "success") {
      toast.success("Product Removed Successfully")
    }
    else {
      toast.error("Error occurred")
    }
  }
  return <div style={{ backgroundColor: "#eee" }} className='container py-5 my-5'>
    <h1>Cart Shop</h1>
    <h5>Total Price : {totalCartPrice}</h5>
    <h6>Total Items : {numOfCartItems} </h6>
    <div className="d-flex justify-content-between">
    <button onClick={deleteCart} className='btn btn-outline-danger'>Clear Cart</button>
    <Link to='/payment' className='btn btn-outline-primary'>Check Out</Link>
    </div>

    {cartProducts.map(function (product, idx) {
      return <div key={idx} className="row  my-2 border-bottom border-3 p-2 align-items-center">
        <div className="col-sm-1">
          <img src={product.product.imageCover} alt="" className='w-100' />
        </div>
        <div className="col-sm-9">
          <h2 className='h6'>{product.product.title} </h2>
          <h5 className='h6'>Price: {product.price}</h5>
          <button onClick={() => deletElement(product.product.id)} className='btn btn-outline-danger'>Remove</button>
        </div>
        <div className="col-sm-2">
          <div className="d-flex align-items-center">
            <button onClick={() => updateElementCount(product.product.id, product.count + 1)} className=' btn btn-outline-success'>+</button>
            <span className='mx-2'>{product.count}</span>
            <button onClick={() => updateElementCount(product.product.id, product.count - 1)} className=' btn btn-outline-success'>-</button>
          </div>
        </div>


      </div>
    })}
  </div>
}
