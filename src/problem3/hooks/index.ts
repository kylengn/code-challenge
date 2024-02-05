import { useState, useEffect } from 'react'

class Datasource {
  url: string

  constructor(url: string) {
    this.url = url
  }

  async getData() {
    try {
      const response = await fetch(this.url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error // Re-throw to allow caller to handle it
    }
  }
}

type Balance = {
  currency: string
  amount: number
}

const BALANCES_API_URL = 'https://interview.switcheo.com/prices.json'

export const useWalletBalances = () => {
  const [balances, setBalances] = useState<Balance[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBalances = async () => {
      setIsLoading(true)
      try {
        const datasource = new Datasource(BALANCES_API_URL)
        const balances = await datasource.getData()
        setBalances(balances)
      } catch (error) {
        setError(error)
      }
      setIsLoading(false)
    }

    fetchBalances()

    const intervalId = setInterval(fetchBalances, 5000) // Refresh every 5 seconds

    return () => clearInterval(intervalId) // Clean up on unmount
  }, [])

  return { balances, isLoading, error }
}
