import React from 'react'
import { Carousel } from 'antd';
const contentStyle = {
    height: '60vmin',
    color: '#fff',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background: '#364d79',
    width: 'full'
};
const ImageCarousel = () => {
    return (
        <div className='flex justify-center'>
            <Carousel style={{ width: '98vw' , height:'60vmin' }} autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        </div>
    )
}

export default ImageCarousel
