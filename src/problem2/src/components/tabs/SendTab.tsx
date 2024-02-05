import { Card, CardContent } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { FancyInput } from '../inputs/FancyInput'
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

export const SendTab = ({
  value,
  fromCurrency,
  setFromCurrency,
  fromSelectedToken,
  setFromSelectedToken
}: ITabProps) => {
  return (
    <TabsContent value={value}>
      <Card className='w-full border-none shadow-none'>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-1'>
              <div className='flex flex-col space-y-1.5'>
                <FancyInput
                  tab='send'
                  amount={fromCurrency}
                  setAmount={setFromCurrency}
                  label='You are sending'
                  selectedToken={fromSelectedToken}
                  setSelectedToken={setFromSelectedToken}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <FancyInput
                  placeholder='Wallet Address or ENS name'
                  label='To'
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
