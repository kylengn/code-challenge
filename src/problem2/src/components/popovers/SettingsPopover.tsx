import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { PopoverContent } from '@/components/ui/popover'
import { SketchLogoIcon } from '@radix-ui/react-icons'
import { FancySettingsAccordion } from '../accordions/FancySettingsAccordion'

export const SettingsPopover = () => {
  return (
    <PopoverContent className='w-80 rounded-xl'>
      <div className='grid gap-0'>
        <div className='flex justify-between items-center'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none text-violet-700 inline-flex gap-2 justify-center items-center'>
              <SketchLogoIcon className='w-4 h-4' />
              Swap Premium
            </h4>
            <p className='text-sm text-muted-foreground'>
              When enabled, you'll get access to premium features like lower
              fees
            </p>
          </div>
          <Switch id='premium-mode' className='scale-125' />
        </div>
        <Separator className='mt-4' />
        <div className='grid gap-2'>
          <FancySettingsAccordion />
        </div>
      </div>
    </PopoverContent>
  )
}
