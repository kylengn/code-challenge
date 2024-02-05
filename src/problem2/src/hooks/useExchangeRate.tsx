/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

interface ICurrencyDataItem {
  currency: string
  price: number
  date: string
}

export const useExchangeRate = (currency: string, amount: number) => {
  const [exchangeRate, setExchangeRate] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const calculateExchangeRate = async () => {
      try {
        const response = await fetch(
          'https://interview.switcheo.com/prices.json'
        )
        const data = await response.json()

        // Find the currency in the data
        const currencyData = data.find(
          (item: ICurrencyDataItem) => item.currency === currency
        )

        if (!currencyData) {
          throw new Error('Currency not found')
        } else {
          setExchangeRate(currencyData.price * amount)
          setIsLoading(false)
        }
        setIsLoading(false)
      } catch (error: any) {
        setError(error.message)
        setIsLoading(false)
      }
    }

    calculateExchangeRate()
  }, [currency, amount])

  return { exchangeRate, isLoading, error }
}
