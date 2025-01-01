import SimpleImageSlider from "react-simple-image-slider";
export default function Home(){

    const images = [
        { url: "/assets/images/train_nepal.jpg"},
        { url: "/assets/images/emblem_of_nepal.svg"},
        { url: "/assets/images/emblem_of_nepal.svg"},
    ]

    return (
        <>
            <div className="bg-gray-600">
                <SimpleImageSlider
                    width="100%"
                    height="85vh"
                    images={images}
                    showBullets={false}
                    showNavs={false}
                    autoPlay={false}
                />
            </div>
        </>
    )
}