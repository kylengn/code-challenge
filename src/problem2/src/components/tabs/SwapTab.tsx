import { Card, CardContent } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { FancyInput } from '../inputs/FancyInput'
import { Button } from '@/components/ui/button'
import { HeightIcon } from '@radix-ui/react-icons'
import { FancyGasAccordion } from '../accordions/FancyGasAccordion'
import { SetStateAction } from 'react'

export interface ITabProps {
  value: string
  fromCurrency: number
  setFromCurrency: React.Dispatch<SetStateAction<number>>
  toCurrency: number
  setToCurrency: React.Dispatch<SetStateAction<number>>
  toggleSwap: boolean
  setToggleSwap: (value: boolean) => void
  toSelectedToken: string
  setToSelectedToken: React.Dispatch<SetStateAction<string>>
  fromSelectedToken: string
  setFromSelectedToken: React.Dispatch<SetStateAction<string>>
}

export const SwapTab = ({
  value,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  toggleSwap,
  setToggleSwap,
  toSelectedToken,
  setToSelectedToken,
  fromSelectedToken,
  setFromSelectedToken
}: ITabProps) => {
  return (
    <TabsContent value={value}>
      <Card className='w-full border-none shadow-none relative'>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-1'>
              <div className='flex flex-col space-y-1.5'>
                <FancyInput
                  amount={!toggleSwap ? fromCurrency : toCurrency}
                  setAmount={!toggleSwap ? setFromCurrency : setToCurrency}
                  label='You pay'
                  selectedToken={
                    !toggleSwap ? fromSelectedToken : toSelectedToken
                  }
                  setSelectedToken={
                    !toggleSwap ? setFromSelectedToken : setToSelectedToken
                  }
                />
              </div>
              <div className='absolute left-[46%] top-[38%] w-full'>
                <Button
                  variant='outline'
                  size='icon'
                  className='border-violet-500/50 shadow-sm bg-secondary rounded-lg'
                  onClick={e => {
                    e.preventDefault()
                    setToggleSwap(!toggleSwap)
                  }}
                >
                  <HeightIcon className='w-4 h-4' />
                </Button>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <FancyInput
                  amount={!toggleSwap ? toCurrency : fromCurrency}
                  setAmount={!toggleSwap ? setToCurrency : setFromCurrency}
                  label='You receive'
                  selectedToken={
                    !toggleSwap ? toSelectedToken : fromSelectedToken
                  }
                  setSelectedToken={
                    !toggleSwap ? setToSelectedToken : setFromSelectedToken
                  }
                />
              </div>
            </div>
          </form>
          {toSelectedToken !== '' && (
            <FancyGasAccordion
              toSelectedToken={toSelectedToken}
              fromSelectedToken={fromSelectedToken}
              toCurrency={toCurrency}
            />
          )}
        </CardContent>
      </Card>
    </TabsContent>
  )
}
