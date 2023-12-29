import { ChangeEvent, useState } from 'react'
import { useAppSelector } from '../../redux/hooks/hooks';
import { NavLink } from 'react-router-dom';

const SearchBar = () => {
  const [searhTerm, setSearchTerm] = useState<string>('');
  const { products } = useAppSelector(state => state.products)

  // filter products by name
  const productsFileryName = products.filter(product => {
    if (searhTerm.length >= 1) {
      return product.name.toLowerCase().includes(searhTerm)
    }

  });

  // limit search results to 10
  const productsFileryNameLimit = productsFileryName.slice(0, 10);

  // filter products by category
  const productsFilterByCategory = products.filter(product => {
    if (searhTerm.length >= 1) {
      return product.category.toLowerCase().includes(searhTerm);
    }
  });

  // limit search results to 10
  const productsFilterByCategoryLimit = productsFilterByCategory.slice(0, 10);

  // filter products by mark
  const producstFilterByMark = products.filter(product => {
    if(searhTerm.length >=1) {
      return product.mark?.toLowerCase().includes(searhTerm)
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
          placeholder='buscar, producto, marca, etc.'
          onChange={onChangeTerm} />
      </div>
      {/* list search */}
      {productsFileryName.length >= 1 ? (

        <li className='bg-white w-[95%] md:w-[70%] lg:w-[60%] mx-auto  absolute left-0 right-0 top-[7rem] z-10 rounded-md no-style'>
          {productsFileryNameLimit.map(product => {
            return (
              <ul key={product.id}>

                <NavLink to={`/store/${'name'}/${product.name}/${searhTerm}`} onClick={() => setSearchTerm('')}>{product.name} </NavLink>
              </ul>
            )
          })}
        </li>
      ) :
        <li className='bg-white w-[95%] md:w-[70%] lg:w-[60%] mx-auto  absolute left-0 right-0 top-[7rem] z-10 rounded-md no-style'>
          {productsFilterByCategory.length > 0 ?productsFilterByCategoryLimit.map(product => {
            return (
              <ul key={product.id}>
                <NavLink to={`/store/${'category'}/${product.name}/${searhTerm}`} onClick={() => setSearchTerm('')}>{product.category} </NavLink>
              </ul>
            )
          }) : (
            producstFilterByMarkLimit.map(product => {
              return (
                <ul key={product.id}>
                   <NavLink to={`/store/${'mark'}/${product.name}/${searhTerm}`} onClick={() => setSearchTerm('')} >{product.mark} - <span>{product.name}</span></NavLink>
                </ul>
              )
            })
          )}
        </li>}

    </>

  )
}

export default SearchBar