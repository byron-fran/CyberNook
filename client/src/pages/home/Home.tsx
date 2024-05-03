import Slides from "../../components/slides/Slides"
import Categories from "../../components/categories/Categories";
import Oferts from "../../components/products/Oferts";
import Advantages from "../../components/slides/Advantages";
import About from "../../components/about/About";

const Home = () => {
  return (
    <main >
      <Oferts />
      <Categories />
      <Slides />
      <Advantages />
      <About />
    </main>
  )
}

export default Home