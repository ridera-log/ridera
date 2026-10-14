import { FC } from 'react'
import { Link } from 'react-router-dom'

const Footer: FC = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-gray-200 bg-gray-900 dark:border-gray-800 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
                <div className="grid gap-12 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        <div className=' w-fit'>
                            <img src="/drive-download-20260304T223405Z-3-001/Ridera-white-logo.png" alt="Ridera" className="h-12 w-auto" />
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-gray-400">We provide moving services, bus & car rentals, towing, boat rentals and international shipping — all coordinated through one reliable system. </p>
                        <div className="mt-6 flex gap-4">
                             <a href="https://www.instagram.com/ridera_logistics" className="rounded-lg bg-gray-800 p-2.5 text-gray-400 transition-colors hover:bg-primary-500 hover:text-white" aria-label="YouTube">

                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="https://www.tiktok.com/@rideralogistics?_r=1&_t=ZS-919hu1WJzgV" className="rounded-lg bg-gray-800 p-2.5 text-gray-400 transition-colors hover:bg-primary-500 hover:text-white" aria-label="YouTube">

                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                </svg>
                            </a>
                            <a href="https://twitter.com/RideraLogistics" className="rounded-lg bg-gray-800 p-2.5 text-gray-400 transition-colors hover:bg-primary-500 hover:text-white" aria-label="Twitter">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/mwlite/company/ridera-relocation-logistics" className="rounded-lg bg-gray-800 p-2.5 text-gray-400 transition-colors hover:bg-primary-500 hover:text-white" aria-label="LinkedIn">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            
                            <a href="https://www.youtube.com/@RideraLogistics" className="rounded-lg bg-gray-800 p-2.5 text-gray-400 transition-colors hover:bg-primary-500 hover:text-white" aria-label="YouTube">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                           
                            
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Services
                        </h4>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <a href="#services" className="text-sm text-gray-400 transition-colors hover:text-primary-400">Moving & Haulage Service

                                </a>
                            </li>
                            <li>
                                <a href="#services" className="text-sm text-gray-400 transition-colors hover:text-primary-400">Bus Charter and Car Rental

                                </a>
                            </li>
                            <li>
                                <a href="#services" className="text-sm text-gray-400 transition-colors hover:text-primary-400">Global Shipping</a>
                            </li>
                            <li>
                                <a href="#services" className="text-sm text-gray-400 transition-colors hover:text-primary-400">Water Recreational Trips </a>
                            </li>
                            <li>
                                <a href="#services" className="text-sm text-gray-400 transition-colors hover:text-primary-400">Towing and Heavy Equipment Hire </a>
                            </li>
                            <li>
                                <a href="#services" className="text-sm text-gray-400 transition-colors hover:text-primary-400">Storage Services  </a>
                            </li>

                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links
                        </h4>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <a href="/#calculator" className="text-sm text-gray-400 transition-colors hover:text-primary-400">Get a Quote
                                </a>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm text-gray-400 transition-colors hover:text-primary-400">About Ridera
                                </Link>
                            </li>
                            <li>
                                <a href="/#contact" className="text-sm text-gray-400 transition-colors hover:text-primary-400">Contact Us
                                </a>
                            </li>
                            <li>
                                <Link to="/community" className="text-sm text-gray-400 transition-colors hover:text-primary-400">Community Work
                                </Link>
                            </li>
                            <li>
                                <Link to="/earn" className="text-sm text-gray-400 transition-colors hover:text-primary-400">Earn with Ridera
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-sm text-gray-400 transition-colors hover:text-primary-400">Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact
                        </h4>
                        <ul className="mt-4 space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <a href="tel:+2348136153906" className="transition-colors hover:text-primary-400">0813 615 3906 </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <a href="mailto:rideralogistics@gmail.com" className="transition-colors hover:text-primary-400">contact@rideralogistics.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2 pt-2">
                                <svg className="h-5 w-5 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <address className="not-italic leading-relaxed">
                                    66 Enitan Street, Aguda, Surulere, Lagos
                                </address>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
                    <p className="text-sm text-gray-500">&copy;{currentYear} Ridera. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">

                        <Link to="/terms" className="text-gray-500 transition-colors hover:text-primary-400">Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
