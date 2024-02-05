import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'

export const FancyTooltip = ({ text }: { text: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <QuestionMarkCircledIcon />
        </TooltipTrigger>
        <TooltipContent side='left'>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
