import Slides from "../../components/slides/Slides"
import Categories from "../../components/categories/Categories";
// import Lottie from "lottie-react";
// import AnimationShipping from '../../libs/ShippingAnimation.json'
import Oferts from "../../components/products/Oferts";
import Advantages from "../../components/slides/Advantages";
const Home = () => {
  return (
    <main >
      <Oferts />
      <Categories />
      <Slides />
      <Advantages />
    
    
    </main>
  )
}

export default Home