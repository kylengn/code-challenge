import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export const BuySidebar = () => {
  return (
    <SheetContent className='border rounded-lg h-full'>
      <SheetHeader>
        <SheetTitle>Connect a wallet</SheetTitle>
      </SheetHeader>
      <div className='grid gap-4 py-4'>
        <Button className='w-full rounded-2xl h-[6vh] text-base font-bold tracking-wide bg-gradient-to-l from-violet-800 to-violet-400 hover:shadow-lg hover:bg-primary hover:scale-[1.025] transition-all'>
          MetaMask
        </Button>
        <Button className='w-full rounded-2xl h-[6vh] text-base font-bold tracking-wide bg-gradient-to-l from-violet-800 to-violet-400 hover:shadow-lg hover:bg-primary hover:scale-[1.025] transition-all'>
          WalletConnect
        </Button>
        <Button className='w-full rounded-2xl h-[6vh] text-base font-bold tracking-wide bg-gradient-to-l from-violet-800 to-violet-400 hover:shadow-lg hover:bg-primary hover:scale-[1.025] transition-all'>
          Coinbase Wallet
        </Button>
      </div>
      <SheetFooter>
        <SheetDescription>
          By connecting a wallet, you agree to DopeSwap Labs' Terms of Service
          and consent to its Privacy Policy. (Last updated 6.7.23)
        </SheetDescription>
      </SheetFooter>
    </SheetContent>
  )
}
