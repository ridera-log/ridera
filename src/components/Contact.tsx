// import { FC } from 'react'

// const Contact: FC = () => {
//     function openMailTo(
//         recipient: string,
//         subject: string,
//         body: string
//     ) {
//         const encodedSubject = encodeURIComponent(subject)
//         const encodedBody = encodeURIComponent(body)
//         window.location.href = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`
//     }
//     return (
//         <>
//             <section className="relative overflow-hidden bg-primary-950 py-20 lg:py-28">
//                 <div className="absolute inset-0">
//                     <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-500 blur-[100px]"></div>
//                     {/* <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-accent-500/30 blur-[100px]"></div> */}
//                     <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
//                 </div>
//                 <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
//                     <div className="mx-auto max-w-3xl text-center">

//                         {/* <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
//                             <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
//                             </svg>
//                         </div> */}
//                         <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Ready to Move?
//                         </h2>
//                         <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100 lg:text-xl">Book your move in minutes and experience seamless mobility backed by professional crews and 24/7 support.
//                         </p>

//                         <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
//                             <a href="#calculator" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl">
//                                 Get Instant Quote

//                                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
//                                 </svg>
//                             </a>
//                             <a href="tel:+2348136153906" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20">
//                                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
//                                 </svg>
//                                 Call 08136153906
//                             </a>
//                         </div>
//                         <div className="mt-12 flex justify-center flex-wrap items-center gap-6 text-sm text-gray-400">
//                             <div className="flex items-center gap-2">
//                                 <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                                 </svg>
//                                 <span>Transparent Pricing</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                                 </svg>
//                                 <span>Dedicated support</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                                 </svg>
//                                 <span>Same-Day Booking Available </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section id="contact" className="bg-white py-20 dark:bg-gray-950 lg:py-28">
//                 <div className="mx-auto max-w-7xl px-4 lg:px-8">
//                     <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
//                         <div>
//                             <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">Contact Us
//                             </div>
//                             <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
//                                 Let’s Move <span className="text-gradient"> Your World
//                                 </span>
//                             </h2>
//                             <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Tell us what you need — moving, truck hire, towing, boat rental or global shipping — and our team will respond within minutes.
//                             </p>
//                             <div className="mt-10 space-y-6">
//                                 <div className="flex items-start gap-4">
//                                     <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
//                                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
//                                         <div className='flex-row flex gap-1'>
//                                             <p className="mt-1 text-gray-600 dark:text-gray-400 mb-2">
//                                                 <a href="tel:+2348136153906" className="hover:text-primary-500">0813 615 3906,</a>
//                                             </p>
//                                             <p className="mt-1 text-gray-600 dark:text-gray-400 mb-2">
//                                                 <a href="tel:+2349166866995" className="hover:text-primary-500">0916 686 6995</a>
//                                             </p>
//                                         </div>
//                                         <p className="text-sm text-gray-500 dark:text-gray-500">Available 24/7</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start gap-4">
//                                     <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
//                                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
//                                         <p className="mt-1 text-gray-600 dark:text-gray-400">
//                                             <a href="mailto:contact@rideralogistics.com" className="hover:text-primary-500">
//                                                 contact@rideralogistics.com  </a>
//                                         </p>
//                                         <p className="text-sm text-gray-500 dark:text-gray-500">We reply in few hours</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start gap-4">
//                                     <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
//                                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h3 className="font-semibold text-gray-900 dark:text-white">Headquarters</h3>
//                                         <p className="mt-1 text-gray-600 dark:text-gray-400">
//                                             66 Enitan Street, Aguda, Surulere, Lagos
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
//                                 <h3 className="font-semibold text-gray-900 dark:text-white">Business Hours</h3>
//                                 <div className="mt-4 space-y-2 text-sm">
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
//                                         <span className="font-medium text-gray-900 dark:text-white">8:00 AM - 6:00 PM</span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600 dark:text-gray-400">Saturday</span>
//                                         <span className="font-medium text-gray-900 dark:text-white">8:00 AM - 2:00 PM</span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600 dark:text-gray-400">Sunday</span>
//                                         <span className="font-medium text-gray-900 dark:text-white">Limited Support </span>
//                                     </div>
//                                     <p className="mt-4 text-gray-500 dark:text-gray-500">*24/7 emergency support available for active bookings.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
//                             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Send us a message</h3>
//                             <p className="mt-2 text-gray-600 dark:text-gray-400">Fill out the form below and we'll get back to you shortly</p>
//                             <form id="contact-form" className="mt-8 space-y-6">
//                                 <div className="">
//                                     {/* grid gap-6 md:grid-cols-2 */}
//                                     <div>
//                                         <label htmlFor="first-name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Full Name
//                                         </label>
//                                         <input type="text" id="first-name" name="first-name" required className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
//                                     </div>
//                                     {/* <div>
//                                         <label htmlFor="last-name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Last Name
//                                         </label>
//                                         <input type="text" id="last-name" name="last-name" required className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
//                                     </div> */}
//                                 </div>
//                                 <div>
//                                     <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Email
//                                     </label>
//                                     <input type="email" id="email" name="email" required className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Company (Optional)
//                                     </label>
//                                     <input type="text" id="company" name="company" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="service" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Service Interested In
//                                     </label>
//                                     <div className="relative">
//                                         <select id="service" name="service" className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
//                                             <option value="">Select a service</option>
//                                             <option value="air-freight">Moving & Haulage</option>
//                                             <option value="ocean-freight">Bus Charter</option>
//                                             <option value="ground-transport"> Car Rental</option>
//                                             <option value="warehousing">Global Shipping</option>
//                                             <option value="customs">Water Recreational Trips</option>
//                                             <option value="express">Heavy Equipment Hire,</option>
//                                             <option value="other">Storage</option>
//                                             <option value="other">Other</option>
//                                         </select>
//                                         <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
//                                             <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                                             </svg>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Message
//                                     </label>
//                                     <textarea id="message" name="message" rows={4} required className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white" placeholder="Tell us about your shipping needs..."></textarea>
//                                 </div>
//                                 <button onClick={()=> openMailTo('ben@rideralogistics.com', 'Moving Quote Request', 'Hi, I would like a quote...')} className="w-full rounded-xl bg-primary-950 px-8 py-4 font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30">Send A Message
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Contact


import { FC, useState } from 'react'

const Contact: FC = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [service, setService] = useState('')
    const [message, setMessage] = useState('')

    function openMailTo(recipient: string, subject: string, body: string) {
        const encodedSubject = encodeURIComponent(subject)
        const encodedBody = encodeURIComponent(body)
        window.location.href = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`
    }

    function handleSubmit() {
        const subject = `New Enquiry from ${name} — ${service || 'General'}`
        const body = `Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Service: ${service || 'N/A'}

Message:
${message}`

        openMailTo('contact@rideralogistics.com', subject, body)
    }

    return (
        <>
            <section className="relative overflow-hidden bg-primary-950 py-20 lg:py-28">
                <div className="absolute inset-0">
                    <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-500 blur-[100px]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
                </div>
                <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Ready to Move?
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100 lg:text-xl">
                            Book your move in minutes and experience seamless mobility backed by professional crews and 24/7 support.
                        </p>
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

                            <a href="#calculator"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
                            >
                                Get Instant Quote
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>

                        </div>

                        <a href="tel:+2348136153906"
                            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call 08136153906
                        </a>
                    </div>
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Transparent Pricing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Dedicated Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Same-Day Booking Available</span>
                        </div>
                    </div>
                    </div>

            </section >

            <section id="contact" className="bg-white py-20 dark:bg-gray-950 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

                        {/* LEFT — Contact Info */}
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                                Contact Us
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Let's Move <span className="text-gradient">Your World</span>
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                                Tell us what you need — moving, truck hire, towing, boat rental or global shipping — and our team will respond within minutes.
                            </p>
                            <div className="mt-10 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                                        <div className="flex flex-row gap-1">
                                            <p className="mb-2 mt-1 text-gray-600 dark:text-gray-400">
                                                <a href="tel:+2348136153906" className="hover:text-primary-500">0813 615 3906,</a>
                                            </p>
                                            <p className="mb-2 mt-1 text-gray-600 dark:text-gray-400">
                                                <a href="tel:+2349166866995" className="hover:text-primary-500">0916 686 6995</a>
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-500">Available 24/7</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                                            <a href="mailto:contact@rideralogistics.com" className="hover:text-primary-500">
                                                contact@rideralogistics.com
                                            </a>
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500">We reply in a few hours</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Headquarters</h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                                            66 Enitan Street, Aguda, Surulere, Lagos
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Business Hours</h3>
                                <div className="mt-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                                        <span className="font-medium text-gray-900 dark:text-white">8:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                                        <span className="font-medium text-gray-900 dark:text-white">8:00 AM - 2:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                                        <span className="font-medium text-gray-900 dark:text-white">Limited Support</span>
                                    </div>
                                    <p className="mt-4 text-gray-500 dark:text-gray-500">
                                        *24/7 emergency support available for active bookings.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Contact Form */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Send us a message</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Fill out the form below and we'll get back to you shortly
                            </p>
                            <div className="mt-8 space-y-6">
                                <div>
                                    <label htmlFor="first-name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                        Company (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="service" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                        Service Interested In
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="service"
                                            value={service}
                                            onChange={(e) => setService(e.target.value)}
                                            className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        >
                                            <option value="">Select a service</option>
                                            <option value="Moving & Haulage">Moving & Haulage</option>
                                            <option value="Bus Charter">Bus Charter</option>
                                            <option value="Car Rental">Car Rental</option>
                                            <option value="Global Shipping">Global Shipping</option>
                                            <option value="Water Recreational Trips">Water Recreational Trips</option>
                                            <option value="Heavy Equipment Hire">Heavy Equipment Hire</option>
                                            <option value="Storage">Storage</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        placeholder="Tell us about your needs..."
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full rounded-xl bg-primary-950 px-8 py-4 font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30"
                                >
                                    Send A Message
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact