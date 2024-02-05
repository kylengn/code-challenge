/* eslint-disable @typescript-eslint/no-explicit-any */
import { FancyBadgeCommandItemProps } from '@/components/modals/FancySelectTokenModal'
import { useEffect, useState, useMemo } from 'react'

export const useTokens = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [tokens, setTokens] = useState<FancyBadgeCommandItemProps[]>([])
  const [suggestedTokens, setSuggestedTokens] = useState<
    FancyBadgeCommandItemProps[]
  >([])

  useEffect(() => {
    const loadTokens = async () => {
      const tokensImport = import.meta.glob('../assets/tokens/*.svg')

      const allTokens = await Promise.all(
        Object.entries(tokensImport).map(async ([path, importFn]) => {
          const module: any = await importFn()
          return {
            label: path.split('/').pop()?.split('.').shift() || '',
            Icon: module.default
          }
        })
      )

      setTokens(allTokens)
      setIsLoading(false)
    }

    loadTokens()
  }, [])

  const filteredTokens = useMemo(() => {
    const suggestedTokenLabels = ['ETH', 'BLUR', 'BUSD', 'WBTC', 'LUNA', 'ZIL']
    return tokens.filter(token => suggestedTokenLabels.includes(token.label))
  }, [tokens])

  useEffect(() => {
    setSuggestedTokens(filteredTokens)
  }, [filteredTokens])

  return { isLoading, tokens, suggestedTokens }
}
