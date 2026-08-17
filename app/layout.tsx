import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {title:'TradeDeck',description:'MT4, MT5 and cTrader account monitor',viewport:'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>}
