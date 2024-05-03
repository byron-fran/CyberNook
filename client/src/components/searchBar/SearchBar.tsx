import { ChangeEvent, useState } from 'react'
import { useAppSelector } from '../../redux/hooks/hooks';
import { NavLink } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { allProducts} = useAppSelector(state => state.products)

  // filter products by name
  const productsFilterByName = allProducts.filter(product => {
    if (searchTerm.trim().length >= 1) {
      return product.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
    }
  });

  // limit search results to 10
  const productsFilterByNameLimit = productsFilterByName.slice(0, 10);

  // filter products by category
  const productsFilterByCategory = allProducts.filter(product => {
    if (searchTerm.trim().length >= 1) {
      return product.category.toLowerCase().includes(searchTerm.trim());
    }
  });

  // limit search results to 10
  const productsFilterByCategoryLimit = productsFilterByCategory.slice(0, 10);


  // filter products by mark
  const producstFilterByMark = allProducts.filter(product => {
    if (searchTerm.trim().length >= 1) {

      return product.mark?.toLowerCase().includes(searchTerm.trim())
    }
  })

  // limit search results to 10
  const producstFilterByMarkLimit = producstFilterByMark.slice(0, 10);

  // onChange term for search
  const onChangeTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // set search term

  }

  return (
    <>
      <div className='w-[95%] md:w-[70%] lg:w-[60%] mx-auto mt-4 '>

        <input
          className='border border-slate-500 w-full rounded-md p-2 focus:outline-white'
          type="text"
          placeholder='Search... something'
          onChange={onChangeTerm} />
      </div>
      {/* list search */}
      {productsFilterByName.length >= 1 && productsFilterByName.length > productsFilterByCategory.length

        ? (

          <li className='bg-white w-[95%] md:w-[70%] lg:w-[60%] mx-auto pb-2 mt-10 md:mt-2 absolute left-0 right-0 top-[7rem] z-10 rounded-md no-style'>
            {productsFilterByNameLimit.map(product => {
              return (
                <ul key={product.id}>

                  <NavLink className='ml-4 flex items-center gap-2 hover:underline hover:text-blue-800'  to={`/product/${product.id}`} onClick={() => setSearchTerm('')}>
                    <img className='w-[45px] h-[45px] object-contain my-2' src={product.image} alt={product.name} />
                    <p>{product.name}</p>
                  </NavLink>
                </ul>
              )
            })}
          </li>
        ) :

        productsFilterByCategory.length >= 1
          ?

          (
            <li className='bg-white w-[95%] md:w-[70%] lg:w-[60%] mx-auto pb-2 mt-10 md:mt-2 absolute left-0 right-0 top-[7rem] z-10 rounded-md no-style'>
              {productsFilterByCategoryLimit.map(product => {
                return (
                  <ul key={product.id}>
                    <NavLink className='ml-4 flex items-center gap-2  hover:underline hover:text-blue-800'  to={`/product/${product.id}`} onClick={() => setSearchTerm('')}>
                      <img className='w-[45px] h-[45px] object-contain my-2' src={product.image} alt={product.name} />
                      <p>{product.category} - <span>{product.name}</span></p>
                    </NavLink>
                  </ul>
                )
              })}
            </li>

          ) :
          producstFilterByMark.length >= 1 ? (
            <li className='bg-white w-[95%] md:w-[70%] lg:w-[60%] mx-auto pb-2 mt-10 md:mt-2 absolute left-0 right-0 top-[7rem] z-10 rounded-md no-style'>
              {
                producstFilterByMarkLimit.map(product => {
                  return (
                    <ul key={product.id}>
                      <NavLink className='ml-4 flex items-center gap-2  hover:underline hover:text-blue-800' to={`/product/${product.id}`} onClick={() => setSearchTerm('')} >
                        <img className='w-[45px] h-[45px] object-contain my-2' src={product.image} alt={product.name} />
                        <p>{product.mark} - <span>{product.name}</span></p>
                      </NavLink>
                    </ul>
                  )
                })
              }
            </li>
          ) : null


      }

    </>

  )
}

export default SearchBar