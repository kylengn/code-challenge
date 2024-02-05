import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { useExchangeRate } from '@/hooks/useExchangeRate'
import { formatCurrency } from '../inputs/FancyInput'
import { useEffect, useState } from 'react'

export const FancyGasAccordion = ({
  toSelectedToken,
  fromSelectedToken,
  toCurrency
}: {
  toSelectedToken: string
  fromSelectedToken: string
  toCurrency: number
}) => {
  // TODO: Replace with real token amount
  const [tokenAmount, setTokenAmount] = useState<number>(0)

  const [equivalentToCurrencyAmt, setEquivalentToCurrencyAmt] =
    useState<number>(0)

  const { exchangeRate, error } = useExchangeRate(fromSelectedToken, toCurrency)

  useEffect(() => {
    const newEquivalentToCurrencyAmt = tokenAmount * exchangeRate

    setEquivalentToCurrencyAmt(newEquivalentToCurrencyAmt)
  }, [toCurrency, exchangeRate, tokenAmount])

  return (
    <Accordion type='single' collapsible className='w-full mt-1'>
      <AccordionItem
        value='item-1'
        className=' rounded-2xl border border-violet-500/50 shadow-sm bg-secondary px-4'
      >
        <AccordionTrigger className='hover:no-underline'>
          1 {toSelectedToken} = {equivalentToCurrencyAmt} {fromSelectedToken} (
          {formatCurrency(exchangeRate)})
        </AccordionTrigger>
        <AccordionContent>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <div className='text-neutral-500'>Price impact</div>
                <div className='text-neutral-500'>Max. slippage</div>
                <div className='text-neutral-500'>Fee (0.15%)</div>
                <div className='text-neutral-500'>Network cost</div>
              </div>
              <div className='flex flex-col gap-2 text-right'>
                <div>~0.45%</div>
                <div>5%</div>
                <div>$0.03</div>
                <div>$4.95</div>
              </div>
            </div>
          </div>
          <Separator className='my-4' />
          <div className='flex flex-col pb-4'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <div className='text-neutral-500'>Order routing</div>
              </div>
              <div className='flex flex-col text-right'>
                <div>DopeSwapAPI</div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
