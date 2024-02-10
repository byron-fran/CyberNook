import { useAppSelector } from '../../redux/hooks/hooks'
import UserData from '../../components/user/UserData';
import NavProfile from '../../components/navbar/NavProfile';
import Orders from '../../components/user/Orders';
import UserAddress from '../../components/user/UserAdress';

const UserPage = () => {

  const { user } = useAppSelector(state => state.auth);
  if (!user) { return null }

  return (
    <>
      <NavProfile namePanel='Profile' />

      <main className='grid md:grid-cols-2 justify-center  mt-10 w-[95%] mx-auto gap-4'>
        <section className='flex flex-col gap-4 last-of-type:mb-10'>
          <UserData />
          <UserAddress />
        </section>
        <section className='flex '>
          <Orders />
        </section>
      </main>


    </>
  )
}

export default UserPage