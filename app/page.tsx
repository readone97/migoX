import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {ArrowRightIcon, CheckCircle, CheckCircle2} from 'lucide-react';
import GetStartedButton from '@/components/ui/get-started-button';
import {Instagram, Linkedin} from '@/components/icons';
import {CryptoConverter} from '@/components/crypto-converter';
import {CryptoPriceTracker, cryptos} from '@/components/crypto-price-tracker';

export default function Home() {
	return (
		<main className="font-mulish">
			<div className="bg-[#1b1b1b] fixed top-0 left-0 right-0 z-50">
				<nav className="px-5 py-5 max-w-[1500px] mx-auto relative overflow-hidden">
					<div className="flex items-center justify-between gap-x-3">
						<div className="flex items-center justify-between">
							<Image src={'/logo.svg'} alt="logo" width={50} height={50} />
							<span className="text-2xl font-bricolage font-extrabold text-white ml-2">
								AMIGO
							</span>
						</div>
						<div className="hidden lg:flex items-center space-x-8 h">
							<Link href="/" className="text-zinc-400 hover:text-white">
								Home
							</Link>
							<Link href="/about" className="text-zinc-400 hover:text-white">
								About
							</Link>
							<Link href="/contact" className="text-zinc-400 hover:text-white">
								Contact
							</Link>
						</div>
						<div>
							<GetStartedButton />
						</div>
					</div>
					<div className="absolute top-1/3 left-1/3 w-96 h-20 bg-[#828282] bg-opacity-80 rounded-full blur-[120px] z-10"></div>
				</nav>
			</div>

			{/* Hero Section */}
			<div className="flex flex-col items-center justify-center lg:min-h-screen bg-[url('/hero-bg.png')] text-white">
				<section className="pt-40 px-4 overflow-hidden relative">
					<div className="max-w-6xl mx-auto lg:text-center relative z-10 flex flex-col">
						<div className="absolute -top-2 left-1/3 w-96 h-20 bg-[#828282] bg-opacity-80 rounded-full blur-[120px] z-10"></div>
						<div className="relative">
							{/* Floating dark elements in background */}
							<div className="absolute top-0 left-16 -z-10 lg:z-20 blur-sm hover:blur-none transition-all duration-500 ease-in-out">
								<Image src={'/swap.svg'} alt="" width={120} height={120} />
							</div>
							<div className="absolute top-16 -right-5 -z-10 lg:z-20 blur-sm hover:blur-none transition-all duration-500 ease-in-out">
								<Image src={'/swap.svg'} alt="" width={120} height={120} />
							</div>
							<div className="absolute -bottom-40 left-10 -z-10 lg:z-20 blur-sm hover:blur-none transition-all duration-500 ease-in-out">
								<Image src={'/convert.svg'} alt="" width={120} height={120} />
							</div>
							<div className="absolute -bottom-10 right-64 -z-10 lg:z-20 blur-sm hover:blur-none transition-all duration-500 ease-in-out">
								<Image src={'/convert.svg'} alt="" width={120} height={120} />
							</div>
							<div className="flex lg:justify-center">
								<div className="pr-3 rounded-full bg-[#575757] text-sm mb-4 md:mb-6 flex gap-x-3">
									<span className="bg-[#c3c3c3] rounded-full py-2 px-3 text-black font-urbanist font-semibold">
										New
									</span>
									<div className="text-white py-2 font-medium">
										Welcome to AmigoXchange 🎉
									</div>
								</div>
							</div>
							<h1 className="text-4xl md:text-6xl font-black mb-3 md:mb-4 bg-gradient-to-r from-[rgb(195,195,195)] to-[rgba(195,195,195, 30%)] text-transparent bg-clip-text">
								Smooth Crypto-to-Fiat
								<br />
								Trading on Solana
							</h1>
							<p className="text-[#c3c3c3] text-opacity-70 mb-6 md:mb-8 max-w-lg lg:mx-auto text-sm md:text-xl font-semibold">
								Convert your{' '}
								<span className="text-[#c3c3c3] font-black">
									USDT, USDC & SOL
								</span>{' '}
								directly to your
								<span className="text-[#c3c3c3] font-black">
									{' '}
									local bank account
								</span>{' '}
								in your locality
							</p>
							<div className="flex lg:justify-center">
								<GetStartedButton />
							</div>
						</div>
						<div className="lg:-mt-40 pointer-events-none">
							<Image
								src={'/illustration.png'}
								alt=""
								width={2500}
								height={700}
							/>
							<Image
								src={'/rectangle.svg'}
								alt=""
								width={2500}
								height={700}
								className="lg:-mt-72"
							/>
						</div>
					</div>
				</section>
			</div>

			{/* Solana Banner */}
			<section className="py-10 flex flex-col items-center bg-[#262626] gap-y-10">
				<div className="relative flex items-center justify-center">
					<div className="bg-gradient-to-r from-[#C3C3C3] to-[#1b1b1b] opacity-30 py-2 px-20 rounded-full border-[0.5px] border-[#919191]">
						<span className="invisible">Powered by</span>
					</div>
					<span className="absolute text-center text-[#c3c3c3] font-semibold">
						Powered by
					</span>
				</div>
				<div className="flex items-center space-x-2 max-w-[40vw]">
					{/* <Image src="/solana.svg" alt="Solana" width={400} height={24} /> */}
					<svg xmlns="http://www.w3.org/2000/svg" width="198" height="30" viewBox="0 0 198 30" fill="none">
<path d="M33.2647 23.4871L27.8335 29.3106C27.7161 29.4371 27.5738 29.538 27.4156 29.6071C27.2574 29.6762 27.0867 29.712 26.914 29.7121H1.1679C1.04511 29.712 0.924997 29.6762 0.822276 29.6089C0.719558 29.5416 0.638691 29.4458 0.589574 29.3333C0.540457 29.2207 0.525224 29.0963 0.545741 28.9752C0.566258 28.8542 0.621631 28.7417 0.705085 28.6516L6.13016 22.8281C6.24764 22.7016 6.38989 22.6007 6.54811 22.5316C6.70629 22.4625 6.87705 22.4268 7.04967 22.4266H32.7958C32.9196 22.424 33.0416 22.4582 33.1461 22.5247C33.2506 22.5913 33.3334 22.6873 33.3834 22.8007C33.4336 22.914 33.449 23.0397 33.4278 23.1618C33.4067 23.284 33.35 23.3971 33.2647 23.4871ZM27.8335 11.7572C27.7156 11.6313 27.5733 11.5308 27.4152 11.4618C27.2571 11.3927 27.0865 11.3567 26.914 11.3558H1.1679C1.04511 11.3558 0.924997 11.3917 0.822276 11.459C0.719558 11.5263 0.638691 11.6221 0.589574 11.7346C0.540457 11.8471 0.525224 11.9716 0.545741 12.0926C0.566258 12.2137 0.621631 12.3262 0.705085 12.4163L6.13016 18.2429C6.24807 18.3688 6.39044 18.4693 6.54854 18.5384C6.70663 18.6074 6.87717 18.6434 7.04967 18.6443H32.7958C32.9184 18.6437 33.0379 18.6074 33.1403 18.5399C33.2427 18.4724 33.323 18.3765 33.3717 18.2641C33.4204 18.1517 33.4355 18.0275 33.4146 17.9067C33.3941 17.7859 33.3389 17.6737 33.2556 17.5839L27.8335 11.7572ZM1.1679 7.5735H26.914C27.0867 7.57335 27.2574 7.53758 27.4156 7.46849C27.5738 7.39944 27.7161 7.29848 27.8335 7.17199L33.2647 1.34847C33.35 1.25852 33.4067 1.14536 33.4278 1.02322C33.449 0.90108 33.4336 0.775424 33.3834 0.662061C33.3334 0.548699 33.2506 0.452696 33.1461 0.386132C33.0416 0.319568 32.9196 0.285416 32.7958 0.287976H7.04967C6.87705 0.288158 6.70629 0.323903 6.54811 0.392984C6.38989 0.462065 6.24764 0.563 6.13016 0.689493L0.705085 6.51301C0.621631 6.60309 0.566258 6.71557 0.545741 6.83664C0.525224 6.95771 0.540457 7.08212 0.589574 7.19467C0.638691 7.30721 0.719558 7.403 0.822276 7.47027C0.924997 7.53758 1.04511 7.57344 1.1679 7.5735Z" fill="url(#paint0_linear_1500_2706)"/>
<path d="M64.6534 12.7319H50.8793V8.19571H68.2334V3.65949H50.8333C50.2387 3.65627 49.6496 3.77017 49.0991 3.99468C48.5486 4.21922 48.0475 4.54997 47.6251 4.96807C47.2025 5.38617 46.8662 5.88343 46.6357 6.43143C46.4053 6.97945 46.2848 7.56751 46.2817 8.162V12.7595C46.2842 13.3545 46.4037 13.9433 46.6339 14.492C46.8641 15.0407 47.2 15.5387 47.6227 15.9574C48.0457 16.3762 48.5468 16.7075 49.0976 16.9324C49.6484 17.1573 50.2384 17.2714 50.8333 17.2682H64.6259V21.8044H46.6097V26.3406H64.6534C65.2481 26.3439 65.8372 26.2299 66.3876 26.0054C66.9381 25.7809 67.4392 25.4501 67.8616 25.032C68.2843 24.6139 68.6205 24.1167 68.851 23.5687C69.0815 23.0206 69.2019 22.4326 69.205 21.8381V17.2406C69.2025 16.6456 69.083 16.0569 68.8528 15.5081C68.6226 14.9594 68.2867 14.4614 67.864 14.0427C67.4411 13.6239 66.9399 13.2926 66.3892 13.0677C65.8384 12.8428 65.2484 12.7287 64.6534 12.7319Z" fill="white"/>
<path d="M91.3374 3.65933H77.5111C76.9155 3.65449 76.3249 3.76719 75.7729 3.99099C75.2212 4.2148 74.7188 4.54527 74.295 4.96355C73.8708 5.38181 73.5336 5.8796 73.3025 6.42842C73.0711 6.97724 72.9503 7.5663 72.9473 8.16184V21.8379C72.9503 22.4335 73.0711 23.0225 73.3025 23.5714C73.5336 24.1202 73.8708 24.618 74.295 25.0362C74.7188 25.4545 75.2212 25.785 75.7729 26.0088C76.3249 26.2326 76.9155 26.3453 77.5111 26.3404H91.3374C91.932 26.3437 92.5211 26.2298 93.0715 26.0053C93.622 25.7807 94.1232 25.45 94.5455 25.0319C94.9682 24.6138 95.3044 24.1165 95.5349 23.5685C95.7654 23.0205 95.8858 22.4324 95.8889 21.8379V8.16184C95.8858 7.56735 95.7654 6.97929 95.5349 6.43127C95.3044 5.88327 94.9682 5.38601 94.5455 4.96791C94.1232 4.54981 93.622 4.21906 93.0715 3.99452C92.5211 3.77001 91.932 3.65611 91.3374 3.65933ZM91.3036 21.8042H77.5448V8.19555H91.2975L91.3036 21.8042Z" fill="white"/>
<path d="M139.765 3.65951H126.279C125.684 3.6563 125.095 3.77019 124.544 3.99471C123.994 4.21925 123.493 4.54999 123.07 4.96809C122.648 5.38619 122.312 5.88346 122.081 6.43145C121.851 6.97948 121.73 7.56753 121.727 8.16202V26.3406H126.325V18.8896H139.749V26.3406H144.347V8.16202C144.344 7.56493 144.222 6.97436 143.99 6.42431C143.757 5.87429 143.419 5.37568 142.993 4.95715C142.567 4.53865 142.063 4.20855 141.508 3.98585C140.954 3.76314 140.362 3.65225 139.765 3.65951ZM139.731 14.3534H126.306V8.19574H139.731V14.3534Z" fill="white"/>
<path d="M193.449 3.65949H179.962C179.368 3.65627 178.779 3.77017 178.228 3.99468C177.678 4.21922 177.177 4.54997 176.754 4.96807C176.332 5.38617 175.995 5.88343 175.765 6.43143C175.534 6.97945 175.414 7.56751 175.411 8.162V26.3406H180.008V18.8896H193.403V26.3406H198V8.162C197.997 7.56751 197.877 6.97945 197.646 6.43143C197.416 5.88343 197.079 5.38617 196.657 4.96807C196.234 4.54997 195.733 4.21922 195.183 3.99468C194.632 3.77017 194.043 3.65627 193.449 3.65949ZM193.403 14.3533H179.978V8.19571H193.403V14.3533Z" fill="white"/>
<path d="M166.737 21.8044H164.898L158.323 5.55977C158.098 4.99933 157.71 4.51902 157.21 4.18045C156.71 3.84186 156.12 3.66044 155.516 3.65946H151.436C151.04 3.65744 150.647 3.73354 150.28 3.88339C149.913 4.03327 149.579 4.25395 149.297 4.53287C149.015 4.81182 148.791 5.14348 148.638 5.50902C148.484 5.87452 148.404 6.26672 148.402 6.66318V26.3406H152.999V8.19569H154.838L161.41 24.4403C161.639 24.9996 162.03 25.478 162.532 25.8143C163.034 26.1506 163.625 26.3295 164.23 26.3283H168.309C168.706 26.3303 169.099 26.2543 169.466 26.1044C169.833 25.9545 170.167 25.7338 170.449 25.4549C170.73 25.176 170.954 24.8443 171.108 24.4788C171.261 24.1133 171.341 23.7211 171.344 23.3246V3.65946H166.737V21.8044Z" fill="white"/>
<path d="M104.548 3.65942H99.9502V21.838C99.9533 22.4338 100.074 23.0231 100.306 23.5722C100.537 24.1212 100.875 24.6191 101.299 25.0374C101.723 25.4557 102.226 25.7861 102.778 26.0098C103.33 26.2334 103.921 26.3458 104.517 26.3405H118.31V21.8043H104.548V3.65942Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_1500_2706" x1="3.31341" y1="30.414" x2="30.3101" y2="-0.021591" gradientUnits="userSpaceOnUse">
<stop offset="0.08" stop-color="#9945FF"/>
<stop offset="0.3" stop-color="#8752F3"/>
<stop offset="0.5" stop-color="#5497D5"/>
<stop offset="0.6" stop-color="#43B4CA"/>
<stop offset="0.72" stop-color="#28E0B9"/>
<stop offset="0.97" stop-color="#19FB9B"/>
</linearGradient>
</defs>
</svg>
				</div>
			</section>

			{/* Bridging the Gap Section */}
			<section className="py-10 lg:py-48 px-4 bg-[#1b1b1b] relative overflow-hidden">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative max-w-[1500px] mx-auto">
					<div className="flex-1">
						<div className="flex mb-6">
							<div className="relative flex items-center justify-center">
								<div className="bg-gradient-to-r from-[#C3C3C3] to-[#1b1b1b] opacity-30 py-2 px-10 rounded-full border-[0.5px] border-[#919191]">
									<span className="invisible">About Amigo Exchange</span>
								</div>
								<span className="absolute text-center text-[#c3c3c3] font-semibold">
									About Amigo Exchange
								</span>
							</div>
						</div>
						<h2 className="text-2xl md:text-5xl font-black bg-gradient-to-r from-[rgb(195,195,195)] to-[rgba(195,195,195, 30%)] text-transparent bg-clip-text mb-4">
							Bridging the gap between
							<br />
							digital and traditional
							<br />
							finance.
						</h2>
						<p className="text-sm lg:text-base text-[#c3c3c3] mb-8">
							Amigoxchange makes decentralized finance (DeFi) accessible to
							everyone, simplifying the process of trading crypto assets for
							local currencies. Amigo Exchange aims to bridge the gap between
							digital and traditional finance, providing users with a secure and
							efficient platform for asset swaps (crypto-to-crypto) and
							crypto-to-fiat conversion.
						</p>

						<div className="grid grid-cols-2 gap-y-4 mb-8 text-[#c3c3c3] font-medium">
							<div className="flex items-center space-x-2">
								<CheckCircle2 color="#1b1b1b" fill="#23c69a" />
								<span>Connect Wallet</span>
							</div>
							<div className="flex items-center space-x-2">
								<CheckCircle2 color="#1b1b1b" fill="#23c69a" />

								<span>Payment</span>
							</div>
							<div className="flex items-center space-x-2">
								<CheckCircle2 color="#1b1b1b" fill="#23c69a" />

								<span>Swap</span>
							</div>
							<div className="flex items-center space-x-2">
								<CheckCircle2 color="#1b1b1b" fill="#23c69a" />
								<span>Security</span>
							</div>
							<div className="flex items-center space-x-2">
								<CheckCircle2 color="#1b1b1b" fill="#23c69a" />

								<span>Convert</span>
							</div>
						</div>

						<GetStartedButton />
					</div>

					<div className="relative flex-1 flex justify-center items-center">
						<div className="relative z-10">
							<Image
								src="/star.png"
								alt=""
								width={200}
								height={200}
								className="object-contain absolute left-1/3 -top-1/4"
							/>
							<Image
								src="/wallet.gif"
								alt=""
								width={600}
								height={600}
								className="object-contain"
							/>
						</div>
					</div>
				</div>
				<div className="absolute top-1/3 -right-20 w-64 h-72 bg-[#828282] bg-opacity-50 rounded-full blur-[200px] z-10"></div>
			</section>

			{/* 4 Easy Steps Section */}
			<section className="py-12 md:py-20 px-4 relative overflow-hidden">
				<div className="absolute -top-10 left-1/4 w-1/2 h-96 bg-[#23C69A] bg-opacity-40 rounded-full blur-[200px] -z-10"></div>

				<div className="max-w-[1500px] mx-auto">
					<div className="relative flex items-center justify-center mb-6">
						<div className="bg-gradient-to-r from-[#C3C3C3] to-[#1b1b1b] opacity-30 py-2 px-10 rounded-full border-[0.5px] border-[#919191]">
							<span className="invisible">How Amigo Exchange Works</span>
						</div>
						<span className="absolute text-center text-[#c3c3c3] font-semibold">
							How Amigo Exchange Works
						</span>
					</div>
					<h2 className="text-2xl md:text-4xl font-black mb-8 md:mb-12 text-center">
						3 Easy Steps to Convert Your
						<br />
						Crypto to Naira
					</h2>

					<div className="flex flex-col space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0 text-[#c3c3c3] font-medium max-w-6xl mx-auto">
						<div className="bg-[#202322] shadow-sm shadow-[#23C69A] p-6 rounded-3xl relative flex flex-col gap-y-2">
							<div className="ml-auto">
								<Image src="/wallet.svg" alt="wallet" width={60} height={60} />
							</div>
							<div className="mb-4 flex justify-center">
								<Image
									src="/step1.svg"
									alt="Connect Wallet"
									width={350}
									height={350}
								/>
							</div>
							<h3 className="text-xl font-bold">Connect Wallet</h3>
							<p className="text-[#c3c3c3] text-opacity-70 w-3/4">
								Connect your Phantom, Backpack or Solflare to access your
								assets.
							</p>
						</div>
						<div className="bg-[#202322] shadow-sm shadow-[#23C69A] p-6 rounded-3xl relative flex flex-col gap-y-2">
							<div className="ml-auto">
								<Image src="/switch.svg" alt="wallet" width={60} height={60} />
							</div>
							<div className="mb-4 flex justify-center">
								<Image
									src="/step2.svg"
									alt="Connect Wallet"
									width={350}
									height={350}
								/>
							</div>
							<h3 className="text-xl font-bold">Swap</h3>
							<p className="text-[#c3c3c3] text-opacity-70 w-3/4">
								AmigoXchange enables you to swap authorized tokens on Solana
								(Crypto-To-Crypto).
							</p>
						</div>
						<div className="bg-[#202322] shadow-sm shadow-[#23C69A] p-6 rounded-3xl relative flex flex-col gap-y-2">
							<div className="ml-auto">
								<Image src="/rotate.svg" alt="wallet" width={60} height={60} />
							</div>
							<div className="mb-4 flex justify-center">
								<Image
									src="/step3.svg"
									alt="Connect Wallet"
									width={350}
									height={350}
								/>
							</div>
							<h3 className="text-xl font-bold">Convert to Fiat</h3>
							<p className="text-[#c3c3c3] text-opacity-70 w-3/4">
								Easily convert your USDT, USDC & SOL to Fiat with immediate
								effect.
							</p>
						</div>
					</div>
				</div>
				<Image
					src="/line.svg"
					alt=""
					width={1000}
					height={1000}
					className="w-full h-full absolute bottom-0 pointer-events-none"
				/>
			</section>

			{/* Features Section */}
			<section className="py-20 px-4 bg-[#262626]">
				<div className="max-w-[1500px] mx-auto">
					<div className="relative flex items-center justify-center mb-20">
						<div className="bg-gradient-to-r from-[#C3C3C3] to-[#1b1b1b] opacity-30 py-2 px-10 rounded-full border-[0.5px] border-[#919191]">
							<span className="invisible">
								Benefits of using Amigo Exchange
							</span>
						</div>
						<span className="absolute text-center text-[#c3c3c3] font-semibold">
							Benefits of using Amigo Exchange
						</span>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						<div
							className="p-[1px] rounded-xl"
							style={{
								background:
									'linear-gradient(135deg, #23C69A 0%, #1b1b1b 20%, #1b1b1b 80%, #23C69A 100%)',
							}}
						>
							<div className="bg-[#1b1b1b] h-full py-16 px-10 lg:px-20 rounded-xl relative flex flex-col overflow-hidden">
								<div className="absolute top-1/4 -right-20 w-80 h-72 bg-[#1b1b1b] hover:bg-primary transition-colors duration-500 hover:bg-opacity-70 rounded-full blur-[100px] z-10"></div>
								<div className="ml-auto flex justify-center items-center relative">
									<div className="ml-auto w-12 h-14 bg-gradient-to-r from-[#C3C3C3] to-[#1b1b1b] opacity-30 rounded-full flex items-center justify-center"></div>
									<span className="absolute text-[#c3c3c3] font-medium text-3xl">
										1
									</span>
								</div>
								<div className="mb-4">
									<Image
										src="/benefit1.svg"
										alt="Low Fees"
										width={200}
										height={200}
									/>
								</div>
								<h3 className="text-3xl font-bold mb-2">Low Fees</h3>
								<p className="text-[#c3c3c3] text-2xl text-opacity-70 w-3/4">
									Leverage Solana's low-cost network infrastructure offerings.
								</p>
							</div>
						</div>

						<div className="grid grid-rows-2 gap-6">
							<div
								className="p-[1px] rounded-xl"
								style={{
									background:
										'linear-gradient(135deg, #23C69A 0%, #1b1b1b 15%, #1b1b1b 85%, #23C69A 100%)',
								}}
							>
								<div className="bg-[#1b1b1b] h-full py-5 px-7 lg:px-14 rounded-xl relative flex flex-col overflow-hidden">
									<div className="absolute top-1/4 -right-20 w-80 h-72 bg-[#1b1b1b] hover:bg-primary transition-colors duration-500 hover:bg-opacity-40 rounded-full blur-[100px] z-10"></div>
									<div className="ml-auto flex justify-center items-center relative">
										<div className="ml-auto w-8 h-10 bg-gradient-to-r from-[#C3C3C3] to-[#1b1b1b] opacity-30 rounded-full flex items-center justify-center"></div>
										<span className="absolute text-[#c3c3c3] font-medium">
											2
										</span>
									</div>
									<div className="mb-4">
										<Image
											src="/benefit2.svg"
											alt="Low Fees"
											width={80}
											height={80}
										/>
									</div>
									<h3 className="text-xl font-bold mb-2">No Wallet Lock-In</h3>
									<p className="text-zinc-400 text-sm w-1/2">
										You use your own wallet — no need to create a new one.
									</p>
								</div>
							</div>

							<div
								className="p-[1px] rounded-xl"
								style={{
									background:
										'linear-gradient(135deg, #23C69A 0%, #1b1b1b 15%, #1b1b1b 85%, #23C69A 100%)',
								}}
							>
								<div className="bg-[#1b1b1b] h-full py-5 px-7 lg:px-14 rounded-xl relative flex flex-col overflow-hidden">
									<div className="absolute top-1/4 -right-20 w-80 h-72 bg-[#1b1b1b] hover:bg-primary transition-colors duration-500 hover:bg-opacity-40 rounded-full blur-[100px] z-10"></div>
									<div className="ml-auto flex justify-center items-center relative">
										<div className="ml-auto w-8 h-10 bg-gradient-to-r from-[#C3C3C3] to-[#1b1b1b] opacity-30 rounded-full flex items-center justify-center"></div>
										<span className="absolute text-[#c3c3c3] font-medium">
											3
										</span>
									</div>
									<div className="mb-4">
										<Image
											src="/benefit3.svg"
											alt="Low Fees"
											width={80}
											height={80}
										/>
									</div>
									<h3 className="text-xl font-bold mb-2">Security</h3>
									<p className="text-zinc-400 text-sm w-1/2">
										Advanced security measures to protect your assets.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Crypto Market Section */}
			<section className="pt-20 pb-72 px-4 bg-[#1b1b1b]">
				<div className="max-w-[1500px] mx-auto">
					<div className="relative flex items-center justify-center mb-5">
						<div className="bg-gradient-to-r from-[#C3C3C3] to-[#1b1b1b] opacity-30 py-2 px-10 rounded-full border-[0.5px] border-[#919191]">
							<span className="invisible">Current Crypto Rate</span>
						</div>
						<span className="absolute text-center text-[#c3c3c3] font-semibold">
							Current Crypto Rate
						</span>
					</div>
					<h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[rgb(195,195,195)] to-[rgba(195,195,195, 30%)] text-transparent bg-clip-text text-center mb-10">
						Today's Crypto Market
					</h2>
					<div className="flex flex-col lg:flex-row gap-6">
						<div className="flex-1 flex flex-col gap-6 justify-between">
							<CryptoConverter />
							<CryptoPriceTracker />
						</div>

						<div
							className="flex-1 p-[1px] rounded-xl"
							style={{
								background:
									'linear-gradient(135deg, #23C69A 0%, #1b1b1b 20%, #1b1b1b 80%, #23C69A 100%)',
							}}
						>
							<div className="w-full h-full bg-[#202020] p-6 pt-0 rounded-xl overflow-hidden">
								<div className="">
									<div className="flex justify-center lg:-mt-12">
										<Image
											src="/market.svg"
											alt=""
											width={500}
											height={500}
											className="lg:w-[70%] h-full "
										/>
									</div>

									<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 -mt-24">
										{cryptos.map(crypto => (
											<div
												key={crypto.symbol}
												className="bg-[#1b1b1b] border-[#c3c3c3] border border-opacity-30 p-3 rounded-lg"
											>
												<div className="flex items-center gap-2 mb-3">
													<div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[#c3c3c3]">
														<Image
															src={crypto.icon}
															alt={crypto.name}
															width={8}
															height={8}
															className="h-8 w-8"
														/>
													</div>
													<div className="text-xs text-zinc-400">
														{crypto.symbol}
													</div>
												</div>
												<div className="text-xs">{crypto.price}</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Newsletter Section */}
			<section className="py-32 px-4 bg-zinc-100 text-[#1b1b1b] max-w-6xl rounded-3xl mx-auto -mt-52 -mb-32 z-10 relative">
				<div className="max-w-5xl mx-auto text-center">
					<h2 className="text-2xl lg:text-6xl font-bold mb-2">
						Subscribe to our Newsletter
					</h2>
					<p className="lg:text-2xl mb-6 lg:-[60%] mx-auto text-center">
						Join our newsletter to stay up to date on features and releases
					</p>

					<div className="flex flex-col lg:flex-row gap-x-2 gap-y-5 max-w-md mx-auto shadow-sm">
						<Input
							type="email"
							placeholder="Enter your email"
							className="bg-[#1B1B1B] bg-opacity-10 border-[#c3c3c3] p-5 relative z-10"
						/>
						<Button className="bg-primary hover:bg-emerald-500 text-black px-8 py-5 relative z-10">
							Subscribe
						</Button>
					</div>
				</div>
				<Image
					src="/line2.svg"
					alt=""
					width={300}
					height={300}
					className="absolute top-0 left-0"
				/>
				<Image
					src="/spin.svg"
					alt=""
					width={150}
					height={150}
					className="absolute bottom-0 right-0"
				/>
			</section>

			{/* Footer */}
			<footer className="bg-[#262626] py-8 pt-52 md:pb-12 px-4">
				<div className="max-w-[1500px] mx-auto">
					<div className="flex flex-col md:flex-row gap-5 justify-between mb-8 md:mb-12">
						<div className="mb-8 md:mb-0 flex-1">
							<div className="flex items-center">
								<Image src={'/logo.svg'} alt="logo" width={50} height={50} />
								<span className="text-2xl font-bricolage font-extrabold text-white ml-2">
									AMIGO
								</span>
							</div>
							<p className="max-w-xs mt-5 text-[#c3c3c3]">
								Amigo Exchange aims to bridge the gap between digital and
								traditional finance, providing users with a secure and efficient
								platform for crypto to fiat and assets swap.
							</p>
						</div>

						<div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
							<div>
								<h4 className="font-medium mb-3 md:mb-4">Company</h4>
								<ul className="space-y-2 text-sm text-zinc-400">
									<li>
										<Link href="#">About us</Link>
									</li>
									<li>
										<Link href="#">Contact us</Link>
									</li>
								</ul>
							</div>

							<div>
								<h4 className="font-medium mb-3 md:mb-4">Product</h4>
								<ul className="space-y-2 text-sm text-zinc-400">
									<li>
										<Link href="#">Crypto-to-Fiat</Link>
									</li>
									<li>
										<Link href="#">Swap (Crypto-to-Crypto)</Link>
									</li>
								</ul>
							</div>

							<div className="col-span-2 lg:col-span-1 mt-6 md:mt-0 lg:min-w-72">
								<h4 className="font-medium mb-3 md:mb-4">Subscribe</h4>
								<p className="text-zinc-400 text-sm mb-3 md:mb-4">
									Join our newsletter to stay up to date on features and
									releases.
								</p>
								<div className="flex gap-2">
									<Input
										type="email"
										placeholder="Enter your email"
										className="bg-white border-zinc-700 h-9"
									/>
									<Button className="bg-primary hover:bg-emerald-500 text-black h-9 px-3">
										Subscribe
									</Button>
								</div>
							</div>
						</div>
					</div>

					<div className="border-t border-[#c3c3c3] pt-6 flex flex-col-reverse md:flex-row gap-5 justify-between items-center">
						<div className="text-[#c3c3c3] text-sm md:mb-0">
							&copy; {new Date().getFullYear()} Amigo Exchange - All rights
							reserved
						</div>
						<div className="flex items-center space-x-4">
							<Link href="#" className="text-zinc-400 hover:text-white">
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
										clipRule="evenodd"
									/>
								</svg>
							</Link>
							<Link href="#" className="text-zinc-400 hover:text-white">
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
								</svg>
							</Link>
							<Link href="#" className="text-zinc-400 hover:text-white">
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
								</svg>
							</Link>
							<Link href="#" className="text-zinc-400 hover:text-white">
								<Instagram />
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</main>
	);
}