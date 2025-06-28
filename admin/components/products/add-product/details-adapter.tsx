import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'
import React from 'react'

interface DetailsAdapterProps{
    name:string
    setName:React.Dispatch<React.SetStateAction<string[]>>
}

const DetailsAdapter = (props:DetailsAdapterProps) => {

    const editName = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        props.setName((prev) => prev.map((name) => name === props.name ? value : name))
    }

    const deleteName = () => {
        props.setName((prev) => prev.filter((name) => name !== props.name))
    }
    
  return (
    <Card className='my-2'>
        <div className='flex items-center gap-2 m-2'>
            <Input type="text" value={props.name} onChange={editName}/>
            <Button onClick={deleteName} size="icon" variant="destructive"><Trash2/></Button>
        </div>
    </Card>
  )
}

export default DetailsAdapter