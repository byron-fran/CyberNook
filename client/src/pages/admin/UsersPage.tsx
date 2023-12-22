import { useAppSelector } from "../../redux/hooks/hooks"
import { useAppDispatch } from "../../redux/hooks/hooks";
import { deleteUserByIdThunk } from "../../redux/thunks/UsersThunk";

const UsersPage = () => {
    const { users } = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    const handleDeleteUserById = (id: string | number) => {
      dispatch(deleteUserByIdThunk(id))
    }
    return (
<>
  <main className="col-span-3 w-full md:w-[90%] mx-auto mt-10 overflow-x-scroll no-scrollbar">
    <div className="overflow-x-auto no-scrollbar">
      <table className="min-w-full bg-white border border-slate-300">
        <thead>
          <tr className="bg-slate-100 text-slate-500 uppercase text-sm leading-normal">
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ?
            users.map((user) => (
              <tr key={user.id} className="text-gray-600">
                <td className="py-2 px-4 border-b text-left">{user?.name}</td>
                <td className="py-2 px-4 border-b text-left">{user.email}</td>
                <td className="py-2 px-4 border-b text-left">{user.phone}</td>
                <td className="py-2 px-4 border-b text-left">
                  <button
                    onClick={() => handleDeleteUserById(user.id)}
                  ><img className="w-[17px]" src="/images/basura.png" alt="icon-trash" /></button>
                </td>
              </tr>
            )) : (
            <tr>
              <td></td>
              <td></td>
              <td><p className=' uppercase font-bold text-2xl '>There are no users registers yet</p></td>
              <td></td>
            </tr>)}
        </tbody>
      </table>
    </div>
  </main>
</>

    )
}

export default UsersPage