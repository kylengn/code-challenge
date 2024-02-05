import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomAlert } from '../alerts/CustomAlert'
import { FancySettingsInput } from '../inputs/FancySettingsInput'
import { FancyTooltip } from '../tooltips/FancyTooltip'

export const FancySettingsAccordion = () => {
  return (
    <Accordion type='multiple' className='w-full'>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='hover:no-underline'>
          <div className='inline-flex gap-1 items-center'>
            Max.slippage
            <FancyTooltip text='The maximum price difference you are willing to accept' />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Tabs defaultValue='auto' className='w-full'>
            <div className='flex justify-between w-full gap-2'>
              <TabsList className='w-full h-auto flex justify-center items-center gap-2 rounded-xl'>
                <TabsTrigger value='auto' className='w-full'>
                  Auto
                </TabsTrigger>
                <TabsTrigger value='custom' className='w-full'>
                  Custom
                </TabsTrigger>
              </TabsList>
              <FancySettingsInput label='%' />
            </div>
            <TabsContent value='auto'></TabsContent>
            <TabsContent value='custom'>
              <CustomAlert />
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger className='hover:no-underline'>
          <div className='inline-flex gap-1 items-center'>
            Transaction deadline
            <FancyTooltip text='The time by which the transaction must be confirmed' />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <FancySettingsInput label='minutes' />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
