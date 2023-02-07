export function formatAmount(amount?: number): string {
  if (!amount) return ''
  return `${amount.toFixed(2)} CHF`
}

/**
 * Number.toLocalString don't work fine !
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 *
 * This is no consistant between node and browsers... 🥲
 *
 * let v = 80
 * let res = v.toLocaleString(undefined, { style: 'currency', currency: 'chf' }
 *
 * NODEJS => "CHF 18.00"
 * CHROME => "18,00 CHF"
 * EDGE   => "18.00 CHF"
 */
