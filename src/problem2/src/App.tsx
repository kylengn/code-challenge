import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { GearIcon } from '@radix-ui/react-icons'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { BuySidebar } from './components/sidebar/BuySidebar'
import { SettingsPopover } from './components/popovers/SettingsPopover'
import { SwapTab } from './components/tabs/SwapTab'
import { SendTab } from './components/tabs/SendTab'

export const Home = () => {
  const [fromCurrency, setFromCurrency] = useState<number>(0)
  const [toCurrency, setToCurrency] = useState<number>(0)
  const [fromSelectedToken, setFromSelectedToken] = useState<string>('ETH')
  const [toSelectedToken, setToSelectedToken] = useState<string>('')
  const [toggleSwap, setToggleSwap] = useState<boolean>(false)

  return (
    <Sheet>
      <Card className='w-full max-w-screen-sm rounded-2xl min-h-fit'>
        <Tabs defaultValue='swap' className='w-full'>
          <div className='flex justify-between w-full'>
            <TabsList className='pl-2 md:pl-0 grid w-1/2 grid-cols-3 h-full bg-transparent'>
              <TabsTrigger
                value='swap'
                className='data-[state=active]:shadow-none data-[state=active]:bg-transparent'
              >
                Swap
              </TabsTrigger>
              <SheetTrigger asChild>
                <Button variant='ghost' className='hover:bg-transparent'>
                  Buy
                </Button>
              </SheetTrigger>
              <BuySidebar />
              <TabsTrigger
                value='send'
                className='data-[state=active]:shadow-none data-[state=active]:bg-transparent'
              >
                Send
              </TabsTrigger>
            </TabsList>
            <div className='w-auto flex justify-end pr-6'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='border-none hover:bg-transparent self-center'
                  >
                    <GearIcon className='w-6 h-6' />
                  </Button>
                </PopoverTrigger>
                <SettingsPopover />
              </Popover>
            </div>
          </div>
          {/* Swap Tab */}
          <SwapTab
            value='swap'
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            toCurrency={toCurrency}
            setToCurrency={setToCurrency}
            toggleSwap={toggleSwap}
            setToggleSwap={setToggleSwap}
            toSelectedToken={toSelectedToken}
            setToSelectedToken={setToSelectedToken}
            fromSelectedToken={fromSelectedToken}
            setFromSelectedToken={setFromSelectedToken}
          />
          {/* Send Tab */}
          <SendTab
            value='send'
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            toCurrency={toCurrency}
            setToCurrency={setToCurrency}
            toggleSwap={toggleSwap}
            setToggleSwap={setToggleSwap}
            toSelectedToken={toSelectedToken}
            setToSelectedToken={setToSelectedToken}
            fromSelectedToken={fromSelectedToken}
            setFromSelectedToken={setFromSelectedToken}
          />
        </Tabs>
        <CardFooter className='flex justify-center w-full'>
          <SheetTrigger asChild>
            <Button className='w-full rounded-2xl h-[6vh] text-xl font-bold tracking-wide bg-gradient-to-l from-violet-800 to-violet-400 hover:shadow-lg hover:bg-primary hover:scale-[1.025] transition-all'>
              Connect wallet
            </Button>
          </SheetTrigger>
        </CardFooter>
      </Card>
    </Sheet>
  )
}

export default function App() {
  return (
    <main className='bg-slate-900 w-screen h-screen flex flex-col justify-center items-center px-2 overflow-hidden box-border'>
      <Home />
    </main>
  )
}
