/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

import { useTokens } from '@/hooks/useTokens'

export type FancyBadgeCommandItemProps = {
  Icon: any
  label: string
  className?: string
  setSelectedToken?: React.Dispatch<React.SetStateAction<string>>
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const FancyBadgeCommandItem = ({
  Icon,
  label,
  className,
  setSelectedToken,
  setModalOpen
}: FancyBadgeCommandItemProps) => {
  return (
    <CommandItem
      className={cn('cursor-pointer', className)}
      onSelect={label => {
        setSelectedToken && setSelectedToken(label.toUpperCase())
        setModalOpen && setModalOpen(false)
      }}
    >
      <img src={Icon} alt={label} loading='lazy' className='mr-2 h-4 w-4' />
      <span>{label}</span>
    </CommandItem>
  )
}

export const LoadingSpinner = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='animate-spin rounded-full h-6 w-6 border-4 border-violet-800/50' />
    </div>
  )
}

export const FancySelectTokenModal = React.memo(
  ({
    setSelectedToken,
    setModalOpen
  }: {
    setSelectedToken: React.Dispatch<React.SetStateAction<string>>
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
    const { tokens, suggestedTokens, isLoading } = useTokens()

    return (
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Select token</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div id='select-token' className='grid gap-4 py-4'>
            <Command className='rounded-xl '>
              <CommandInput placeholder='Type a command or search...' />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {suggestedTokens.map(
                    (
                      { Icon, label }: FancyBadgeCommandItemProps,
                      index: number
                    ) => (
                      <div key={index}>
                        <FancyBadgeCommandItem
                          Icon={Icon}
                          label={label}
                          className='rounded-full border hover:border-primary bg-secondary shadow-sm pr-3'
                          setSelectedToken={setSelectedToken}
                          setModalOpen={setModalOpen}
                        />
                      </div>
                    )
                  )}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading='Popular tokens'>
                  {tokens.map(
                    (
                      { Icon, label }: FancyBadgeCommandItemProps,
                      index: number
                    ) => (
                      <div key={index}>
                        <FancyBadgeCommandItem
                          Icon={Icon}
                          label={label}
                          setSelectedToken={setSelectedToken}
                          setModalOpen={setModalOpen}
                        />
                      </div>
                    )
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </DialogContent>
    )
  }
)
