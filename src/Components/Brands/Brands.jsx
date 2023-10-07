import React from 'react'
import Style from '../Brands/Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import { ColorRing } from 'react-loader-spinner';

export default function Brands() {
  function getAllBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  const { data, isLoading } = useQuery("categorybrands", getAllBrands, {
    refetchOnMount: false
  })
  if (isLoading) {
    return <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
  }



  return <>
    <div className="container my-5 py-5">
      <h1 className='text-center main-color my-5'>All Brands</h1>
      <div className="row g-5">
        {data?.data.data.map(function (brand, idx) {
          return <div key={idx} className="col-md-3 ">
            <div id={Style.card} className="card">
              <div className="card-img">
                <img src={brand.image} alt="" className='w-100' />
              </div>
              <div className="card-body">
                <p className='text-center'>{brand.name}</p>
              </div>


            </div>

          </div>



        })}

      </div>


    </div>



  </>
}
