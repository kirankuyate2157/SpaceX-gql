import React from "react";
import Slider from "react-slick";
// components
import PictureCarousalCard from "./PictureCarousal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Photos = ({images}) => {
    const settings = {
        arrows: true,
        infinite: true,
        dots: true,
        speed: 400,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 1490,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1133,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    center: true,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerMode: true,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                },
            },
        ],
    };

    const collectionData = [

        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq66Km0r9fuRs71-dXr2TaaF4I7W5j3JXMCQ&usqp=CAU',
        },
        {
            image: 'https://static.toiimg.com/thumb/msid-92037952,imgsize-,width-641,resizemode-4/92037952.jpg',

        }, {
            image: 'https://i.pinimg.com/736x/84/b6/8a/84b68a9299a70e45ca3630ced4ae2dd8.jpg',

        }, {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR3-934WRFkfsNikBYUp1-3jRzgfr-UXbLWQ&usqp=CAU',

        }, {
            image: 'https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2019/09/19/13193bfef3f5d09b01bd33856f744321.jpg?quality=80&zoom=1&ssl=1',

        }, {
            image: 'https://pbs.twimg.com/media/Fk9ok8AaMAAqxi2.jpg',

        }, {
            image: 'https://static.toiimg.com/thumb/msid-74425722,imgsize-,width-641,resizemode-4/74425722.jpg',

        }, {
            image: 'https://i.scdn.co/image/ab67616d0000b2731aa5adad8593923dcdf1a7d0',

        }, {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7dhcEZSAHQ5hZ_3gWPi1GYgKUBoUtDGhyDw&usqp=CAU',

        }, {
            image: 'https://static.toiimg.com/thumb/msid-93659554,width-400,resizemode-4/93659554.jpg',

        }, {
            image: 'https://wikibio.in/wp-content/uploads/2019/03/Arijit-Singh-with-his-wife-Koel.jpg',

        }, {
            image: 'https://wikibio.in/wp-content/uploads/2019/03/Arijit-Singh-Training.jpg',

        }, {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1-Ovrj5GGkjVitXdLt9Y02xzdMGz99Xq_Q&usqp=CAU',

        }, {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2mUN6zZTA9C_bVh5YjPdXAi3emvkhWK7p2A&usqp=CAU',

        }, {
            image: 'https://timesofindia.indiatimes.com/photo/57685162.cms',

        }, {
            image: 'https://www.timescontent.com/photos/preview/560900/63rd-Jio-Filmfare-Awards.jpg',
        }, {
            image: 'http://starsunfolded.com/wp-content/uploads/2018/03/Arijit-Singh-Receiving-Awards.jpg',

        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBx-uH-Dfp1gafliVgHpRDxAHF9-ixePe17-SeegTR0VRwypaeOg0hYWwhnDpN6gCufpw&usqp=CAU',
        },]

    return (
        <div className=" flex flex-col px-6 md:px-20 mb-20 mx-auto overflow-hidden">
            <h1 className="text-3xl  text-orange-700 md:text-5xl font-semibold my-8 py-5">SpaceX Launch Captured Moments</h1>

            <Slider {...settings}>
                {images?.map((img,index) => (
                    <PictureCarousalCard image={img} key={index} />
                ))}

            </Slider>
        </div>
    );
};
export default Photos;
