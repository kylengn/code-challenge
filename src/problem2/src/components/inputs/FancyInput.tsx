/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  FancySelectTokenModal,
  LoadingSpinner
} from '../modals/FancySelectTokenModal'
import { CaretDownIcon } from '@radix-ui/react-icons'
import React, { SetStateAction, useEffect } from 'react'
import { useTokens } from '@/hooks/useTokens'
import { cn } from '@/lib/utils'
import { useExchangeRate } from '@/hooks/useExchangeRate'
import { Img } from 'react-image'

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const FancyInput = React.memo(
  ({
    tab,
    placeholder,
    amount,
    setAmount,
    label,
    selectedToken,
    setSelectedToken
  }: {
    tab?: string
    placeholder?: string
    amount?: number
    setAmount?: React.Dispatch<SetStateAction<number>>
    label: string
    selectedToken?: string
    setSelectedToken?: React.Dispatch<React.SetStateAction<string>>
  }) => {
    const { isLoading, tokens } = useTokens()
    const [activeTokenLogo, setActiveTokenLogo] = React.useState<string>('')
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const { exchangeRate } = useExchangeRate(selectedToken!, amount!)

    useEffect(() => {
      const temp: any = tokens.find(token => token.label === selectedToken)
      if (temp) {
        setActiveTokenLogo(temp.Icon)
      }

      return () => {
        setActiveTokenLogo('')
      }
    }, [selectedToken, tokens])

    if (isLoading) <LoadingSpinner />

    const defaultInput = () => {
      return (
        <>
          <div className='flex justify-center w-full'>
            <div className='w-[60%]'>
              <Input
                type='number'
                min={0}
                id='amount'
                placeholder='0'
                className='border-none px-0 bg-transparent w-full text-4xl font-bold text-neutral-500 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'
                value={amount}
                onChange={e => {
                  e.preventDefault()
                  setAmount && setAmount(Number(e.target.value))
                }}
              />
            </div>
            <div className='w-[40%] flex self-center justify-end'>
              <Dialog
                open={modalOpen}
                onOpenChange={modalOpen => setModalOpen(modalOpen)}
              >
                <DialogTrigger asChild>
                  <Button
                    className={cn(
                      'rounded-full bg-violet-800/50 hover:bg-violet-600 gap-1',
                      activeTokenLogo && 'px-2'
                    )}
                  >
                    {selectedToken && (
                      <Img
                        src={activeTokenLogo}
                        alt={selectedToken}
                        loader={<LoadingSpinner />}
                        className='h-6 w-6'
                      />
                    )}
                    {selectedToken || 'Select Token'}
                    <CaretDownIcon className='ml-2 h-4 w-4' />
                  </Button>
                </DialogTrigger>
                <FancySelectTokenModal
                  setSelectedToken={setSelectedToken!}
                  setModalOpen={setModalOpen}
                />
              </Dialog>
            </div>
          </div>
          {!selectedToken ? (
            <span className='h-4'></span>
          ) : exchangeRate ? (
            <span className='text-xs text-neutral-500'>
              {formatCurrency(exchangeRate)}
            </span>
          ) : (
            <span className='h-4 text-xs text-destructive'></span>
          )}
        </>
      )
    }

    const addressInput = () => {
      return (
        <div className='flex justify-center w-full'>
          <Input
            type='text'
            id='address'
            placeholder={placeholder}
            className='border-none px-0 bg-transparent w-full text-base font-bold text-neutral-500 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'
            defaultValue={''}
            onChange={e => {
              e.preventDefault()
              console.log(e.target.value)
            }}
          />
        </div>
      )
    }

    const sendInput = () => {
      return (
        <div className='flex flex-col justify-center w-full gap-4'>
          <div className='w-full flex item-center justify-center'>
            <Input
              type='number'
              min={0}
              id='amount'
              placeholder='0'
              className='border-none px-0 bg-transparent w-full text-4xl font-bold text-neutral-500 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'
              value={amount}
              onChange={e => {
                e.preventDefault()
                setAmount && setAmount(Number(e.target.value))
              }}
            />
          </div>
          <div className='w-full flex item-center justify-center'>
            <Dialog
              open={modalOpen}
              onOpenChange={modalOpen => setModalOpen(modalOpen)}
            >
              <DialogTrigger asChild>
                <Button
                  className={cn(
                    'rounded-xl bg-violet-800/50 hover:bg-violet-600 gap-1 w-full',
                    activeTokenLogo && 'px-2'
                  )}
                >
                  {selectedToken && (
                    <Img
                      src={activeTokenLogo}
                      alt={selectedToken}
                      loader={<LoadingSpinner />}
                      className='h-6 w-6'
                    />
                  )}
                  {selectedToken || 'Select Token'}
                  <CaretDownIcon className='ml-2 h-4 w-4' />
                </Button>
              </DialogTrigger>
              <FancySelectTokenModal
                setSelectedToken={setSelectedToken!}
                setModalOpen={setModalOpen}
              />
            </Dialog>
          </div>
        </div>
      )
    }

    return (
      <div
        className={cn(
          'grid w-full h-[20vh] items-center gap-1.5 rounded-2xl border border-violet-500/50 shadow-sm bg-secondary p-4',
          tab !== 'send' && 'h-[15vh]',
          placeholder && 'h-fit'
        )}
      >
        <Label className='text-xs text-neutral-500' htmlFor='amount'>
          {label}
        </Label>
        {tab === 'send'
          ? sendInput()
          : placeholder
          ? addressInput()
          : defaultInput()}
        {/* {placeholder && addressInput()} */}
      </div>
    )
  }
)
