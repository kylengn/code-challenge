import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const FancySettingsInput = ({ label }: { label: string }) => {
  return (
    <div className='flex justify-center w-full border border-violet-500/50 px-4 bg-secondary shadow-sm rounded-xl gap-2'>
      <div className='flex-1 flex justify-end'>
        <Input
          type='number'
          min={0}
          id='deadline'
          placeholder='0'
          className='text-right border-none px-0 bg-transparent w-full text-neutral-500 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'
          defaultValue={0}
          onChange={e => console.log(e.target.value)}
        />
      </div>
      <div className='w-fit flex self-center justify-end'>
        <Label
          htmlFor='deadline'
          className='text-xs font-bold text-neutral-500'
        >
          {label}
        </Label>
      </div>
    </div>
  )
}
