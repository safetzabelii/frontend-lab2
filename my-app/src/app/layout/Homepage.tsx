import { observer } from "mobx-react";
import Footer from "./footer";
import MostOrderedItems from "./MostOrderedItems";
import Slider from "./Slider";



export default observer(function HomePage() {
  
  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center"
        style={{ backgroundImage: `url(hommmmme_2.png)` }}
      >
        <div className="min-h-screen bg-cover bg-center bg-food-delivery flex flex-col justify-center items-center">
          <h1 className="text-5xl text-white font-bold mb-8 text-center">
            <p>Welcome to Food Delivery</p>
          </h1>
          <p className="text-xl text-white mb-12 text-center">
            We offer a wide range of delicious and healthy meals delivered right to
            your doorstep!
          </p>
          <button className="bg-white hover:bg-green-800 text-green-800 hover:text-white font-bold py-6 px-10 rounded-full shadow-lg transition duration-300">
            Order Now
          </button>
          <div className="mt-20">
            <p className="text-xl text-white text-center">
              Free delivery on orders over $30
            </p>
            <p className="text-xl text-white text-center">
              24/7 customer support available
            </p>
          </div>
          
        </div>
    </div>

    <Slider/>

    <MostOrderedItems/>
    <Footer/>
    </div>
    

  );
});

