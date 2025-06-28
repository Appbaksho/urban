import AddCategoryForm from '@/components/category/add-category-form'
import AddParentCategoryForm from '@/components/category/add-parent-category-form'
import React from 'react'

const AddCategoryPage = () => {
  return (
    <div className='p-3 md:p-5'>
      <AddCategoryForm/>
      <AddParentCategoryForm/>  
    </div>
  )
}

export default AddCategoryPage