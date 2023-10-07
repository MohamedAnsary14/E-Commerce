import React from 'react'
import Style from '../Categories/Categories.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import { ColorRing } from 'react-loader-spinner';

export default function Categories() {

  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  const { data, isLoading } = useQuery("categorybrands", getCategories, {
    // refetchOnMount: false
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

      <div className="row g-5">
        {data?.data.data.map(function (category, idx) {
          return <div key={idx} className="col-md-4">
            <div id={Style.card} className="card">
              <div className="card-img">
                <img src={category.image} alt="" className='w-100' style={{height: "300px" }}/>
              </div>
              <div className="card-body">
                <p id= {Style.content} className="text-center second-color">{category.name}</p>
              </div>


            </div>
          </div>
        })}
      </div>

    </div>

  </>
}
