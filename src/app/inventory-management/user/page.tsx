
import UserTable from "@/app/inventory-management/user/(table)/UserTable";
import { AddUserModal } from "@/app/inventory-management/user/(components)/AddUserModal";
import UserButtonClient from "./(components)/UserButtonClient";



const UserPage = () => {
  return(
      <div>
        <div className='flex justify-between items-center my-4'>
            <h2 className='md:text-4xl text-2xl font-bold'>User</h2>
            <UserButtonClient title="Add User" />
        </div>
        <UserTable />
        <AddUserModal />
      </div>
  )

}

export default UserPage