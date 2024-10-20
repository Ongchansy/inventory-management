import { AddCategoryModal } from "./(components)/AddCategoryModal"
import CategoryButtonClient from "./(components)/CategoryButtonClient"
import CategoryTable from "./(table)/CategoryTable"




const CategoryPage = () => {
  return(
      <div>
        <div className='flex justify-between items-center my-4'>
            <h2 className='md:text-4xl text-2xl font-bold'>Category</h2>
            <CategoryButtonClient title="Add Category"/>
        </div>
        <CategoryTable />
        <AddCategoryModal />
      </div>
  )

}

export default CategoryPage