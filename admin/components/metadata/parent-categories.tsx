import React from 'react'
import { Card } from '../ui/card'
import { MetaData } from './api/metadata.model'

const ParentCategories = (props:MetaData) => {
  return (
    <div className='mt-5'>
      <p className='font-bold text-xl'>Parent Categories (View Only)</p>
        <Card className="mt-5 p-3">
        <ul className="grid grid-cols-2 text-sm list-decimal items-center gap-2 pl-5">
          {props.parentCategory.map((category,index)=>(
            
              <li key={index}>{category.name}</li>
          ))}

        </ul>
        </Card>
    </div>
  )
}

export default ParentCategories