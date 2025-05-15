'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

export function CryptoConverter() {
	const [amount, setAmount] = useState('120.00');
	const [selectedCurrency, setSelectedCurrency] = useState('USDT');
	const exchangeRate = 1600.0;
	const conversionFee = 0.0;

	const receivedAmount = parseFloat(amount) * exchangeRate;

	return (
		<div
			className="p-[1px] rounded-3xl"
			style={{
				background:
					'linear-gradient(135deg, #23C69A 0%, #1b1b1b 10%, #1b1b1b 80%, #23C69A 100%)',
			}}
		>
			<div className="w-full h-full rounded-3xl border border-[#262626] bg-[#202020] p-6">
				<div className="space-y-3">
					<div className="bg-[#1b1b1b] px-4 py-3 rounded-2xl">
						<p className="text-sm text-[#c3c3c3]">I will pay</p>
						<div className="flex items-center justify-between">
							<Input
								type="text"
								value={amount}
								onChange={e => setAmount(e.target.value)}
								className="w-1/2 border-none bg-transparent text-2xl font-extrabold text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
							/>
							<div className="flex gap-2">
								<Button
									variant={
										selectedCurrency === 'USDT' ? 'secondary' : 'outline'
									}
									onClick={() => setSelectedCurrency('USDT')}
									className="h-8 rounded-md bg-[#262626] px-3 text-xs font-medium text-white hover:bg-zinc-700"
								>
									USDT
								</Button>
								<Button
									variant={
										selectedCurrency === 'USDC' ? 'secondary' : 'outline'
									}
									onClick={() => setSelectedCurrency('USDC')}
									className="h-8 rounded-md bg-[#262626] px-3 text-xs font-medium text-white hover:bg-zinc-700"
								>
									USDC
								</Button>
								<Button
									variant={selectedCurrency === 'SOL' ? 'secondary' : 'outline'}
									onClick={() => setSelectedCurrency('SOL')}
									className="h-8 rounded-md bg-[#262626] px-3 text-xs font-medium text-white hover:bg-zinc-700"
								>
									SOL
								</Button>
							</div>
						</div>
					</div>

					<div className="bg-[#1b1b1b] px-4 py-3 rounded-2xl space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-sm text-zinc-400">Current rate</span>
							<span className="text-sm text-zinc-300">
								1 USDT = 1,600.00 NGN
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm text-zinc-400">Conversion fee</span>
							<span className="text-sm text-zinc-300">
								{conversionFee.toFixed(2)} USDT
							</span>
						</div>
					</div>

					<div className="bg-[#1b1b1b] px-4 py-3 rounded-2xl">
						<p className="mb-2 text-sm text-zinc-400">I will receive</p>
						<div className="flex items-center justify-between">
							<div className="rounded-md py-1">
								<span className="text-2xl font-semibold text-white">
									{receivedAmount.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
							</div>
							<span className="py-2 rounded-md bg-[#262626] px-3 text-xs font-medium text-white hover:bg-zinc-700">
								NGN
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}