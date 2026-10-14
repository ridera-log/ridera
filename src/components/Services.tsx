import { FC, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

type ServiceImageCarouselProps = {
    images: string[]
    alt: string
}

type ServiceQuoteType = 'moving' | 'carHire' | 'busCharter' | 'towing' | 'heavyEquipment' | 'shipping' | 'water' | 'storage'

const ServiceImageCarousel: FC<ServiceImageCarouselProps> = ({ images, alt }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1 })

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())

        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi])

    return (
        <div className="relative mb-6 -mx-8 -mt-8 overflow-hidden rounded-t-2xl">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {images.map((image) => (
                        <div key={image} className="min-w-0 flex-[0_0_100%]">
                            <img
                                src={`/drive-download-20260304T223405Z-3-001/${encodeURIComponent(image)}`}
                                alt={alt}
                                className="h-56 w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={() => emblaApi?.scrollPrev()}
                        aria-label={`Previous ${alt} image`}
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition-colors hover:bg-black/60"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={() => emblaApi?.scrollNext()}
                        aria-label={`Next ${alt} image`}
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition-colors hover:bg-black/60"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                        {images.map((image, index) => (
                            <span
                                key={`${image}-${index}`}
                                className={`h-1.5 rounded-full transition-all ${index === selectedIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/60'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

// ,'Prado(1).jpg'
const serviceImageGroups = {
    moving: ['Moving2.jpeg','Moving .jpg','Moving3.jpeg', 'c.jpg', 'b.jpg'],
    charter: ['img14.jpg', 'car2.jpeg', 'Hiace.jpg', 'car.jpeg', 'Hilux.jpg','toyota.jpeg'],
    shipping: ['Shipping.jpg', 'Shipping(1).jpg', 'Shipping(2).jpg'],
    waterTrips: ['boat1.jpeg', 'Boat(2).JPG','Boat.jpg', 'Boat(1).JPG', 'Boat(2).JPG'],
    towing: ['Towing .jpg', 'toll1.jpeg', 'toll2.jpeg', 'heavy1.jpeg', 'heavy2.jpeg', 'heavy3.jpeg'],
    storage: ['storage1.jpeg', 'storage2.jpeg'],
}

const Services: FC = () => {
    const selectQuoteType = (quoteType: ServiceQuoteType) => {
        sessionStorage.setItem('ridera:selectedQuoteType', quoteType)
        window.dispatchEvent(new CustomEvent('ridera:quoteTypeSelected', { detail: { quoteType } }))
    }

    return (
        <>
        {/* border-y border-gray-200 */}
            <section className=" bg-white py-8 dark:border-gray-800 dark:bg-gray-950">
                <div className="relative w-full overflow-hidden">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

                    <div className="flex w-max marquee animate-marquee-rtl gap-12 hover:[animation-play-state:paused]">
                        {[
                            'microsoft.PNG', 'lbs.PNG', 'glebaba.PNG', 'lensforgood.PNG', 'lg.PNG',
                            'access.PNG', 'avl.PNG', 'spazio.PNG', 'Madisonjay Logo.png', 'Majeurs Logo.png',
                            // Duplicate for seamless loop
                            'microsoft.PNG', 'lbs.PNG', 'glebaba.PNG', 'lensforgood.PNG', 'lg.PNG',
                            'access.PNG', 'avl.PNG', 'spazio.PNG', 'Madisonjay Logo.png', 'Majeurs Logo.png',
                        ].map((file, i) => (
                            <div key={`${file}-${i}`} className="flex shrink-0 items-center justify-center">
                                <img
                                    src={`/drive-download-20260304T223405Z-3-001/${encodeURIComponent(file)}`}
                                    alt={file.replace(/\.[^.]+$/, '')}
                                    className={`object-contain opacity-70 transition-opacity hover:opacity-100 ${['Madisonjay Logo.png', 'Majeurs Logo.png'].includes(file)
                                            ? 'h-32 w-52'
                                            : 'h-24 w-auto'
                                        }`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            <section id="services" className="bg-white py-10 dark:bg-gray-950 lg:py-18">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">Our Services
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            All Your Mobility. <span className="text-gradient">One Platform.</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">From home relocation, vehicle rental, towing and global shipping, we provide complete mobility solutions tailored to individuals and businesses.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-800" data-animate style={{ animationDelay: "0ms" }}>
                            <div className="flex-1">
                                <ServiceImageCarousel images={serviceImageGroups.moving} alt="Moving" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Moving & Haulage Service</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">We provide professional relocation and goods transportation services using well-equipped trucks and vans.</p>
                            </div>
                            {/* <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Same-day delivery options
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Temperature-controlled cargo
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Customs clearance
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Real-time tracking
                                </li>
                            </ul> */}
                            <div className="mt-6">
                                <a href="#calculator" onClick={() => selectQuoteType('moving')} className="inline-flex items-center gap-2 rounded-full bg-primary-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-950/25 transition-all hover:bg-primary-900 hover:shadow-xl hover:shadow-primary-950/30">
                                    Get Quote

                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a>
                                {/* <a href="#calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                                    Get Quote

                                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a> */}
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                        <div className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-800" data-animate style={{ animationDelay: "100ms" }}>
                            <div className="flex-1">
                                <ServiceImageCarousel images={serviceImageGroups.charter} alt="Bus Charter" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Bus Charter & Car Rental</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Enjoy reliable mobility with Ridera's fleet of vehicles — Hiace, Coaster, and Coach buses for group trips, plus car rentals like Prados for personal use.</p>
                            </div>
                            {/* <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    FCL &amp;LCL options
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Port-to-port service
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Door-to-door delivery
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Hazmat certified
                                </li>
                            </ul> */}
                            <div className="mt-6">
                                <a href="#calculator" onClick={() => selectQuoteType('busCharter')} className="inline-flex items-center gap-2 rounded-full bg-primary-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-950/25 transition-all hover:bg-primary-900 hover:shadow-xl hover:shadow-primary-950/30">
                                    Get Quote

                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a>
                                {/* <a href="#calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                                    Get Quote

                                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a> */}
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                        <div className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-800" data-animate style={{ animationDelay: "200ms" }}>
                            <div className="flex-1">
                                <ServiceImageCarousel images={serviceImageGroups.shipping} alt="Global Shipping" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Global Shipping</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">We offer secure and efficient international shipping from Nigeria to the UK, USA, Canada, Dubai and beyond.</p>
                            </div>
                            {/* <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    FTL &amp;LTL shipping
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Cross-docking
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Expedited delivery
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    GPS tracking
                                </li>
                            </ul> */}
                            <div className="mt-6">
                                <a href="#calculator" onClick={() => selectQuoteType('shipping')} className="inline-flex items-center gap-2 rounded-full bg-primary-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-950/25 transition-all hover:bg-primary-900 hover:shadow-xl hover:shadow-primary-950/30">
                                    Get Quote

                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a>
                                {/* <a href="#calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                                    Get Quote

                                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a> */}
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                        <div className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-800" data-animate style={{ animationDelay: "300ms" }}>
                            <div className="flex-1">
                                <ServiceImageCarousel images={serviceImageGroups.waterTrips} alt="Water Trips" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Water Recreational Trips</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Experience relaxation and adventure with Ridera's water trips and boat cruises — perfect for families, friends, and corporate outings.</p>
                            </div>
                            {/* <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Climate-controlled storage
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Pick &amp;pack services
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Inventory management
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Returns processing
                                </li>
                            </ul> */}
                            <div className="mt-6">
                                <a href="#calculator" onClick={() => selectQuoteType('water')} className="inline-flex items-center gap-2 rounded-full bg-primary-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-950/25 transition-all hover:bg-primary-900 hover:shadow-xl hover:shadow-primary-950/30">
                                    Get Quote

                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a>
                                {/* <a href="#calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                                    Get Quote

                                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a> */}
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                        <div className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-800" data-animate style={{ animationDelay: "400ms" }}>
                            <div className="flex-1">
                                <ServiceImageCarousel images={serviceImageGroups.towing} alt="Towing" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Towing & Heavy Equipment Hire</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Reliable towing services and heavy-duty equipment rental such as excavators, cranes, and forklifts.</p>
                            </div>
                            {/* <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Import/export documentation
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Duty optimization
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Regulatory compliance
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Trade consulting
                                </li>
                            </ul> */}
                            <div className="mt-6">
                                <a href="#calculator" onClick={() => selectQuoteType('towing')} className="inline-flex items-center gap-2 rounded-full bg-primary-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-950/25 transition-all hover:bg-primary-900 hover:shadow-xl hover:shadow-primary-950/30">
                                    Get Quote

                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a>
                                {/* <a href="#calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                                    Get Quote

                                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a> */}
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                        <div className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-800" data-animate style={{ animationDelay: "500ms" }}>
                            <div className="flex-1">
                                <ServiceImageCarousel images={serviceImageGroups.storage} alt="Storage" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Storage Services</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Secure short- and long-term storage solutions for individuals and businesses during relocation or renovation.</p>
                            </div>
                            {/* <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Same-day delivery
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Scheduled delivery windows
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Proof of delivery
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    White-glove service
                                </li>
                            </ul> */}
                            <div className="mt-6">
                                <a href="#calculator" onClick={() => selectQuoteType('storage')} className="inline-flex items-center gap-2 rounded-full bg-primary-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-950/25 transition-all hover:bg-primary-900 hover:shadow-xl hover:shadow-primary-950/30">
                                    Get Quote

                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a>
                                {/* <a href="#calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                                    Get Quote

                                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a> */}
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                    </div>
                    <div className="mt-16 text-center">
                        <a href="#contact" className="inline-flex items-center gap-2 text-primary-500 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                            Need a custom solution? Contact our team

                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-white pt-0 pb-16 dark:bg-gray-950 lg:pt-0 lg:pb-16">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                        <div data-animate>
                            <div className="mb-4 inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                                Some Facts
                            </div>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <p>Ridera has grown into a one-stop mobility and logistics brand serving homes, businesses, and industries across Lagos and beyond.</p>
                                <p>We’re proudly in every neighborhood, handling multiple moves daily and giving individuals and companies a smoother, stress-free experience- anytime, anywhere.</p>
                            </div>

                            <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-950 text-white">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Call for any query!</p>
                                    <a href="tel:08136153906" className="text-xl font-bold text-primary-950 transition-colors hover:text-primary-950 dark:text-primary-400 dark:hover:text-primary-300">08136153906</a>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2" data-animate style={{ animationDelay: '100ms' }}>
                            <div className="rounded-2xl bg-primary-950 p-6 text-white shadow-lg shadow-primary-500/20">
                                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5V4H2v16h5m10 0v-2a3 3 0 00-3-3H10a3 3 0 00-3 3v2m10 0H7m5-10a3 3 0 110-6 3 3 0 010 6z" />
                                    </svg>
                                </div>
                                <p className="text-3xl font-bold">2,200+</p>
                                <p className="mt-1 text-sm text-white/90">Complete Moves</p>
                            </div>

                            <div className="rounded-2xl p-6 text-white shadow-lg" style={{ backgroundColor: '#ffb100' }}>
                                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <p className="text-3xl font-bold">784</p>
                                <p className="mt-1 text-sm text-white/90">Customer Reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="bg-gray-50 py-20 dark:bg-gray-900 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700 dark:border-accent-800 dark:bg-accent-900/30 dark:text-accent-300">About Us
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Logistics  Made <span className="text-gradient">Simple</span>
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">We’ve built our reputation on reliability, transparency, and exceptional service. That’s why individuals and businesses trust Ridera for their mobility, moving, and shipping needs.
                            </p>
                            <div className="mt-10 space-y-6">
                                <div className="flex gap-4" data-animate style={{ animationDelay: "0ms" }}>
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Reliability </h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">We deliver every service on time, every time — with professionalism and consistency. </p>
                                    </div>
                                </div>
                                <div className="flex gap-4" data-animate style={{ animationDelay: "0ms" }}>
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0110.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Well-Maintained Fleet </h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">Our vehicles and equipment are modern, safe, and regularly serviced for top performance.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4" data-animate style={{ animationDelay: "200ms" }}>
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Professional Team
                                        </h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">Trained, courteous, and efficient staff dedicated to ensuring customer satisfaction.</p>
                                    </div>
                                </div>
                                {/* <div className="flex gap-4" data-animate style={{ animationDelay: "300ms" }}>
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Versatile Solutions </h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">From moving to mobility, shipping to storage — we provide end-to-end logistics support. </p>
                                    </div>
                                </div>
                                <div className="flex gap-4" data-animate style={{ animationDelay: "300ms" }}>
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Transparent Communication </h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">We keep clients informed every step of the way, with clear pricing and timely updates. </p>
                                    </div>
                                </div> */}
                                <div className="flex gap-4" data-animate style={{ animationDelay: "300ms" }}>
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Wide Coverage </h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">Serving clients across Lagos, Abuja, Portharcourt , and beyond with seamless nationwide and global reach. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <a href="#calculator" className="inline-flex items-center gap-2 rounded-full bg-primary-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-950/25 transition-all hover:bg-primary-900 hover:shadow-xl hover:shadow-primary-950/30">
                                    Get Started Today

                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="relative m-1">
                            <div className="relative rounded-2xl bg-primary-600 lg:p-10">
                                <div className="aspect-video overflow-hidden rounded-xl bg-primary-900/50">
                                    <div className="relative h-full w-full">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <svg className="h-full w-full text-primary-400/30" viewBox="0 0 400 200" fill="currentColor">
                                                <path d="M50 100 Q150 50 200 100 T350 100" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent-400" stroke-dasharray="4 4"></path>
                                                <path d="M80 150 Q200 80 320 130" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary-300/50" stroke-dasharray="4 4"></path>
                                                <circle cx="50" cy="100" r="6" className="text-accent-500"></circle>
                                                <circle cx="200" cy="100" r="4" className="text-primary-300"></circle>
                                                <circle cx="350" cy="100" r="6" className="text-accent-500"></circle>
                                                <circle cx="80" cy="150" r="4" className="text-primary-300"></circle>
                                                <circle cx="320" cy="130" r="4" className="text-primary-300"></circle>
                                                <circle cx="50" cy="100" r="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-400 animate-ping opacity-50"></circle>
                                                <circle cx="350" cy="100" r="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-400 animate-ping opacity-50" style={{ animationDelay: "0.5s" }}></circle>
                                            </svg>
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                                            <div className="rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
                                                <p className="text-xs text-primary-200">Active Trips</p>
                                                <p className="text-lg font-bold text-white">35</p>
                                            </div>
                                            <div className="rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
                                                <p className="text-xs text-primary-200">Jobs Completed</p>
                                                <p className="text-lg font-bold text-white">2,200+</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:mt-6 grid grid-cols-3 gap-4 p-2 pb-5 lg:pb-2">
                                    <div className="text-center">
                                        <p className="lg:text-3xl font-bold text-white">15+</p>
                                        <p className="text-xs text-primary-200">States</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="lg:text-3xl font-bold text-white">150+</p>
                                        <p className="text-xs text-primary-200">Partners</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="lg:text-3xl font-bold text-white">24/7</p>
                                        <p className="text-xs text-primary-200">Support</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-4 -top-4 rounded-xl border border-green-200 bg-white p-4 shadow-lg dark:border-green-800 dark:bg-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                        <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">98.5%</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">On-Time Rate</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-14 -left-4 lg:-left-10 lg:-bottom-8 rounded-xl border border-blue-200 bg-white p-4 shadow-lg dark:border-blue-800 dark:bg-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                        <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">250+</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Fleet Vehicles</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}

export default Services
