import UserTable from "@/app/inventory-management/user/(table)/UserTable";
import MainButton from "@/components/dashboard/MainButton";
import { AddUserModal } from "@/components/dashboard/MainDailog";



const UserPage = () => {
  return(
      <div>
        <div className='flex justify-between items-center my-4'>
            <h2 className='md:text-4xl text-2xl font-bold'>User</h2>
            <MainButton  />
        </div>
        <UserTable />
        <AddUserModal />
      </div>
  )

}

export default UserPage