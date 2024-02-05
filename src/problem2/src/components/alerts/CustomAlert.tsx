import { Alert, AlertDescription } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export const CustomAlert = () => {
  return (
    <Alert variant='destructive' className='border-none'>
      <ExclamationTriangleIcon className='h-4 w-4' />
      <AlertDescription>
        Your transaction may be frontrun. Consider increasing your slippage
      </AlertDescription>
    </Alert>
  )
}
