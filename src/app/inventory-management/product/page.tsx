
import ProductTable from "./(table)/ProductTale";
import { AddProductModal } from "./(components)/AddProductModal";
import ProductButtonClient from "./(components)/ProductButtonClient";



const ProductPage = () => {
  return(
      <div>
        <div className='flex justify-between items-center my-4'>
            <h2 className='md:text-4xl text-2xl font-bold'>Product</h2>
            <ProductButtonClient title="Add Product"/>
        </div>
        <ProductTable />
        <AddProductModal />
      </div>
  )

}

export default ProductPage