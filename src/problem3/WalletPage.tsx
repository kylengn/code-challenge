import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { BoxProps } from '@material-ui/core'
import { useWalletBalances } from './hooks'
import WalletRow from './WalletRow'
import classes from './WalletPage.module.scss'

/*
Data Fetching in useEffect without Dependency Control:
  The prices are fetched only once when the component mounts due to the empty dependency array []. If the prices need to be updated during the component's lifecycle, this approach won't fetch the latest prices.

  Solution: Created a custom hook useWalletBalances that fetches the prices and balances and returns them in an object. The hook is called in the component and the returned values are destructured.

Inefficient Sorting and Filtering:
  The sortedBalances computation is expensive since it involves filtering and sorting. However, it's recalculated every time the component re-renders because its dependency array includes prices, which is not used in the calculation.

Unnecessary Mapping for formattedBalances:
  There's an unnecessary mapping of sortedBalances to formattedBalances just to add a formatted property, which could be done directly within the final .map that renders the rows.
  
Key Index as React Key in .map:
  Using the index of the array as a key in .map for rows is not recommended as it can lead to performance issues and bugs with component state.

Console Error Handling:
  There's a typo in console.err (should be console.error).

Repeated Priority Calculation:
  The priority of each balance is calculated multiple times, which is inefficient.
*/

interface WalletBalance {
  currency: string
  amount: number
  blockchain: string
  priority: number
  formatted: string
}

interface Props extends BoxProps {
  children: React.ReactNode
}

// Since getPriority is a pure function that doesn't depend on any props or state, it could be defined outside of the component
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99
  }
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props
  const { balances, isLoading, error } = useWalletBalances()

  // Memoize and combine sorting and formatting
  const formattedSortedBalances = useMemo(() => {
    return balances
      .map((balance: WalletBalance) => ({
        ...balance,
        priority: getPriority(balance.blockchain),
        formatted: balance.amount.toFixed()
      }))
      .filter(
        (balance: WalletBalance) => balance.priority > -99 && balance.amount > 0
      )
      .sort(
        (lhs: { priority: number }, rhs: { priority: number }) =>
          rhs.priority - lhs.priority
      )
  }, [balances, getPriority])

  // Use currency and amount to generate a unique key for each row
  const rows = formattedSortedBalances.map((balance: WalletBalance) => {
    const usdValue = balances[balance.currency] * balance.amount
    const key = balance.currency + balance.amount
    return (
      <WalletRow
        className={classes.row}
        key={key}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.error(error)
    return <div>Something went wrong.</div>
  }

  return <div {...rest}>{rows}</div>
}

export default WalletPage
