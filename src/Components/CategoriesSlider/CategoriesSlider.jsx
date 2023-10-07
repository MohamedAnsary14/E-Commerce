import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { ColorRing } from 'react-loader-spinner';

export default function CategoriesSlider() {
    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    const { data, isLoading } = useQuery("categoryslider", getAllCategories, {
        refetchOnMount: false
    })


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows: false
    };

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

        <div>

            <Slider {...settings}>
                {data?.data.data.map(function (category, idx) {
                    return <div key={idx}>
                        <img style={{ width: "100%", height: "200px" }} src={category.image} alt="SliderImage" />
                        <h6>{category.name}</h6>
                    </div>
                })}




            </Slider>
        </div>

    </>
}
