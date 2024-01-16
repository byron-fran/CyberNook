import Slides from "../../components/slides/Slides"
import Categories from "../../components/categories/Categories";
import Lottie from "lottie-react";
import AnimationShipping from '../../libs/ShippingAnimation.json'
import Oferts from "../../components/products/Oferts";
const Home = () => {
  return (
    <main >
      <Oferts />
      <div className="w-[95%] md:w-[80%] mx-auto">
        <Slides />

        <Categories />
        <div className="md:w-[50%] mx-auto">
          <h2 className="text-center font-bold md:text-2xl uppercase text-blue-800 my-2">Free shipping over $300 worldwide</h2>
          <Lottie animationData={AnimationShipping} />
        </div>
      </div>

    </main>
  )
}

export default Home