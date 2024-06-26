import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks'
import { formaterDinero } from '../../helpers';
import { deleteProductByIdThunk } from '../../redux/thunks/ProductsThunk';
import ListButtons from '../../components/buttons/ListButtons';

const ProductsPage = (): JSX.Element => {
    const { products } = useAppSelector(state => state.products);

    const dispatch = useAppDispatch();
    const Navigate = useNavigate()

    const handleDeleteProduct = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await dispatch(deleteProductByIdThunk(id))
            return
        }

    }

    const handleUpdateProduct = (id: string) => {
        Navigate(`/admin/update-product/${id}`)
    };
    
    return (
        <>
            <main className='w-[95%] md:w-[85%] mx-auto mt-10 col-span-3  '>
                <div className='h-[55vh] md:h-[80vh] overflow-y-scroll no-scrollbar'>
                    <div className='grid md:grid-cols-2 w-full gap-4'>
                        {products.length > 0 ? products?.map(product => {
                            return (
                                <div key={product.id} className='flex w-full justify-between border border-slate-300 p-2'>
                                    <div className='flex items-center'>
                                        <img className='w-[100px] mx-auto h-[100px] object-contain' src={product.image} alt="img-product" />
                                        <div className='flex flex-col ml-4'>
                                            <p className=' font-thin text-[13px]'>{product.name}</p>
                                            <p className=' font-thin text-[13px]'>{formaterDinero(product.price)}</p>
                                            <p className=' font-thin text-[13px]'>{product.stock}</p>
                                            <p className=' font-thin text-[13px]'>{product.category}</p>

                                        </div>
                                    </div>
                                    <div className='flex items-center flex-col justify-around'>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id!)}><img className='w-[20px]' src="/images/basura.png" alt="icon-trash" /></button>

                                        <button
                                            onClick={() => handleUpdateProduct(product.id!)}
                                        ><img className='w-[20px]' src="/images/edit.png" alt="img-edit" /></button>
                                    </div>

                                </div>
                            )
                        }) : (<p className=' uppercase font-bold text-2xl text-center '>There are no users registers yet</p>)}
                    </div>
                </div>

                <ListButtons />

            </main>
        </>
    )
}

export default ProductsPage