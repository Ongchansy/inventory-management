

import { AddSupplierModal } from "./(components)/AddSupplierModal";
import SupplierButtonClient from "./(components)/SupplierButtonClint";
import SupplierTable from "./(table)/SupplierTable";



const SupplierPage = () => {
  return(
      <div>
        <div className='flex justify-between items-center my-4'>
            <h2 className='md:text-4xl text-2xl font-bold'>Supplier</h2>
            <SupplierButtonClient title="Add Supplier"/>
        </div>
        <SupplierTable />
        <AddSupplierModal />
      </div>
  )

}

export default SupplierPage