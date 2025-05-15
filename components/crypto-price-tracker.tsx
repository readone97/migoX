import Image from 'next/image';

interface CryptoCurrency {
	name: string;
	symbol: string;
	price: string;
	change: string;
	icon: string;
}

export const cryptos: CryptoCurrency[] = [
	{
		name: 'Solana',
		symbol: 'SOL',
		price: '$286.86',
		change: '+0.29%',
		icon: '/Sol.png',
	},
	{
		name: 'USDC',
		symbol: 'USDC',
		price: '$2,064.06',
		change: '+0.20%',
		icon: '/USDC.png',
	},
	{
		name: 'Tether',
		symbol: 'USDT',
		price: '$1,546.664',
		change: '+0.01%',
		icon: '/USDT.png',
	},
	{
		name: 'Bitcoin',
		symbol: 'BTC',
		price: '$1,124.09',
		change: '+0.40%',
		icon: '/btc.png',
	},
	{
		name: 'Binance Coin',
		symbol: 'BNB',
		price: '$326.45',
		change: '+0.15%',
		icon: '/bnb.png',
	},
	{
		name: 'Ethereum',
		symbol: 'ETH',
		price: '$1,746.32',
		change: '+0.25%',
		icon: '/ethereum.png',
	},
];

export function CryptoPriceTracker() {
	return (
		<div
			className="p-[1px] rounded-3xl"
			style={{
				background:
					'linear-gradient(135deg, #23C69A 0%, #1b1b1b 10%, #1b1b1b 80%, #23C69A 100%)',
			}}
		>
			<div className="w-full h-full rounded-3xl border border-zinc-800 bg-[#202020] p-4">
				<div className="space-y-2">
					{cryptos.slice(0, 4).map(crypto => (
						<div
							key={crypto.symbol}
							className="flex items-center justify-between rounded-full border border-[#c3c3c3] border-opacity-30 bg-[#262626] p-3 pr-6"
						>
							<div className="flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c3c3c3]">
									<Image
										src={crypto.icon}
										alt={crypto.name}
										width={32}
										height={32}
										className="h-8 w-8"
									/>
								</div>
								<div>
									<p className="font-bold text-[]#c3c3c3[">{crypto.name}</p>
									<p className="text-sm text-[#c3c3c3]">{crypto.symbol}</p>
								</div>
							</div>
							<div className="text-right">
								<p className="text-lg font-medium text-[#c3c3c3]">
									{crypto.price}
								</p>
								<p className="text-sm text-primary">{crypto.change}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}