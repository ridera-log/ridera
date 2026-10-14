import { FC } from 'react'

const Hero: FC = () => {
    return (
        <>
            <div className="h-[72px]"></div>
            <section className="relative overflow-hidden  bg-gray-800">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-cover bg-center opacity-20"  />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-900 to-gray-900"></div>
                    {/* <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-accent-500/20 blur-[100px]"></div> */}
                    <div className="absolute -left-20 bottom-20 h-96 w-96 rounded-full bg-primary-500/20 blur-[100px]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
                </div>
                <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-300">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500"></span>
                                </span>
                                Nigeria’s All-in-One Mobility Platform

                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Move <span className="text-accent-500">Anywhere</span>
                                , Anytime
                            </h1>
                            <p className="mt-6 max-w-xl text-lg text-gray-300 lg:text-xl">Why Download 5 Apps When One Can Move Your World?
                                From home relocation to vehicle rental, towing, boat rental and global shipping — Ridera moves people and businesses seamlessly. </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a href="#calculator" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/30">
                                    Get Instant Quote

                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a>
                                <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10">Explore Services
                                </a>
                            </div>
                            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>Transparent Pricing</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>Dedicated support</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>Same-Day Booking Available </span>
                                </div>
                            </div>
                        </div>
                        {/* <div className="relative">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-white">Track Your Shipment</h3>
                                    <p className="mt-1 text-sm text-gray-400">Enter your tracking number to get real-time updates</p>
                                </div>
                                <form id="tracking-form" className="space-y-4">
                                    <div>
                                        <label htmlFor="tracking-number" className="sr-only">Tracking Number</label>
                                        <div className="relative">
                                            <input type="text" id="tracking-number" name="tracking-number" placeholder="Enter tracking number (e.g., SC123456789)" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full rounded-xl bg-primary-950 px-6 py-4 font-semibold text-white shadow-lg shadow-primary-950/25 transition-all hover:bg-primary-900 hover:shadow-xl hover:shadow-primary-950/30">Track Package
                                    </button>
                                </form>
                                <div id="tracking-result" className="mt-6 hidden">
                                    <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                                                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-green-400">In Transit</p>
                                                <p className="text-xs text-gray-400">Est. delivery: Tomorrow, 2:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-center gap-4 border-t border-white/10 pt-6">
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                                        </svg>
                                        <span>Air</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                                        </svg>
                                        <span>Ground</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                        </svg>
                                        <span>Ocean</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -left-6 -top-4 hidden rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl lg:block">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                                        <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-white">Delivered</p>
                                        <p className="text-xs text-gray-400">2 mins ago</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="mt-20 grid grid-cols-2 gap-8 border-t py-10 border-white/10 sm:grid-cols-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white lg:text-4xl">15,000+ </div>
                            <div className="mt-1 text-sm text-gray-400">Moves & Trips Completed </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white lg:text-4xl">6 Core</div>
                            <div className="mt-1 text-sm text-gray-400">Mobility Services in One Platform </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white lg:text-4xl">3 Major Cities</div>
                            <div className="mt-1 text-sm text-gray-400">Lagos • Abuja • Port Harcourt </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white lg:text-4xl">98% </div>
                            <div className="mt-1 text-sm text-gray-400">Customer Satisfaction Rate </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
