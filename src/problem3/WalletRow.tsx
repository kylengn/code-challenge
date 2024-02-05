import React from 'react'

export interface WalletRowProps {
  className?: string
  amount: number
  usdValue: number
  formattedAmount: string
}

const WalletRow: React.FC<WalletRowProps> = props => {
  const { className, amount, usdValue, formattedAmount } = props
  return (
    <div className={className}>
      <div>{formattedAmount}</div>
      <div>{amount}</div>
      <div>{usdValue}</div>
    </div>
  )
}

export default WalletRow
