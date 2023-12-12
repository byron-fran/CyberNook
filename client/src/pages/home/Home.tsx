import Slides from "../../components/slides/Slides"
import Categories from "../../components/categories/Categories"
const Home = () => {
  return (
    <main className="w-[95%] md:w-[80%] mx-auto">
      <Slides/>
      <Categories/>
    </main>
  )
}

export default Home