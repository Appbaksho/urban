"use client"
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { Toaster } from '@/components/ui/toaster'

const ReduxWrapper = ({children}:React.PropsWithChildren) => {
  return (
    <Provider store={store}>
        {children}
        <Toaster/>
    </Provider>
  )
}

export default ReduxWrapper