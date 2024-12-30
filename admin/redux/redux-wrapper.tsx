"use client"
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const ReduxWrapper = ({children}:PropsWithChildren) => {
  return (
    <Provider store={store}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >{children}
          <Toaster/>
        </ThemeProvider>
    </Provider>
  )
}

export default ReduxWrapper