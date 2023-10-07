import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1 ,
        arrows:false
    };


    return <>

        <div>
            
            <Slider {...settings}>
                <div>
                    <img  style={{width:"100%",height:"400px"}} src={require('../../Images/1.jpg')} alt="SliderImage" />
                </div>
                <div>
                    <img style={{width:"100%",height:"400px"}} src={require('../../Images/2.jpg')} alt="SliderImage" />
                </div>
                <div>
                    <img style={{width:"100%",height:"400px"}} src={require('../../Images/3.jpg')} alt="SliderImage" />
                </div>
              


            </Slider>
        </div>

    </>
}
