import { FC, useState } from 'react'

type RoleKey = 'driver' | 'assistant' | 'vehicle' | 'business' | 'city'

const roleMeta: Record<RoleKey, { title: string; subtitle: string; bullets?: string[], href?:string }> = {
  driver: {
    title: 'Driver', 
    href:'https://docs.google.com/forms/d/e/1FAIpQLSfMMSCxXwRQ_-v6skdldd_ZGMtnGhrVpV9zZa6B6LhTJH4dvA/viewform?usp=publish-editor',
    subtitle: 'Join Ridera as a professional driver responsible for operating our fleet of vehicles, e.g vans, minitrucks, trucks, etc. across a variety of logistics services, including moving, deliveries, and transportation. We are looking for experienced drivers with valid driver’s licenses, strong knowledge of road safety, and familiarity with city routes. Applicants should have a clean driving record, a professional attitude, and the ability to represent the Ridera brand responsibly while delivering excellent customer service. If you are disciplined, reliable, and passionate about driving, we invite you to apply and grow with our team',
    bullets: [
      'Valid driver’s license',
      'Minimum of 5 years driving experience',
      'Good knowledge of city routes and road safety',
      'Clean driving record',
      'Professional attitude and communication skills',
    ],
  },
assistant: { title: 'Driver Assistant / Movers Crew', href:'https://docs.google.com/forms/d/e/1FAIpQLSfFVPitP8HJawOXQphCXi8NxY2gb6gmoc7ilzE2KpmCLNRxKg/viewform?usp=publish-editor', subtitle: "Become part of Ridera’s moving crew and assist in delivering smooth and efficient relocation experiences for our customers. Driver assistants help with loading, unloading, packing, and handling items with care during moves and deliveries. This role is ideal for hardworking individuals who enjoy teamwork and want to earn while supporting professional logistics operations." },
vehicle: { title: 'Vehicle Partner', href:'https://docs.google.com/forms/d/e/1FAIpQLSe0GNSQA8yDP-eeQZdBL_1j72x3eIZ7KBejiKccr91-XZjUbw/viewform?usp=publish-editor', subtitle: 'Put your vehicle to work by partnering with Ridera and earning from a steady flow of logistics jobs. We work with owners of cars, vans, trucks, buses, towing vehicles, and other transport equipment who want to generate income from their assets. As a vehicle partner, you’ll gain access to verified customers and a growing logistics network.' },
business: { title: 'Business / Corporate Partner', href:'https://docs.google.com/forms/d/e/1FAIpQLSdcaTcRsEbbeRm3PD8OkkTRA6wUJ3Y5FtrzpQEY8KFY5f5gKg/viewform?usp=publish-editor', subtitle: 'Partner with Ridera to support your business logistics with reliable transportation and delivery services. This opportunity is ideal for real estate companies, e-commerce stores, event planners, marketplace sellers, and other organizations that require consistent logistics support. Our business partners enjoy priority service, flexible solutions, and a trusted team that understands their operational needs.' },
city: { title: 'City Partner (Future-ready)', href:'https://docs.google.com/forms/d/e/1FAIpQLSfhTuf41aAZWPaGoC_2iDR8jKvmPN3UX_oze-Ou_I7tcDLFNQ/viewform?usp=publish-editor', subtitle: 'Help Ridera expand its operations into new cities while building a strong logistics network in your region. City partners work closely with Ridera to coordinate local drivers, vehicles, and service delivery within their area. This opportunity is ideal for entrepreneurs, fleet owners, or logistics professionals who want to grow with a fast-rising mobility and logistics brand.' },
}

const EarnCard: FC<{ roleKey: RoleKey; imgSrc: string }> = ({ roleKey, imgSrc }) => {
  const [expanded, setExpanded] = useState(false)
  const role = roleMeta[roleKey]
  const href = role.href || '#'

  return (
    <article className="group rounded-2xl border border-gray-200 bg-white p-0 overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
      <div className="w-full overflow-hidden">
        <img src={`/drive-download-20260304T223405Z-3-001/${encodeURIComponent(imgSrc)}`} alt={role.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{role.title}</h3>
        <p className={`mt-2 text-sm text-gray-600 dark:text-gray-400 ${expanded ? '' : 'line-clamp-3'}`}>
          {role.subtitle}
        </p>
        {expanded && role.bullets && (
          <ul className="mt-4 space-y-2">
            {role.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-500 dark:bg-primary-400 flex-shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-sm font-medium underline text-primary-950 hover:text-primary-950 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
        <div className="mt-6 flex justify-end">
          <a href={href} className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-accent-600">Apply Now →</a>
        </div>
      </div>
    </article>
  )
}

const Earn: FC = () => {
  return (
    <section id="earn" className="bg-white py-10 dark:bg-gray-950 lg:py-18">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">Earn With Ridera</div>
          {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Join our network — earn with Ridera</h2> */}
          <h6 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Join our network —   <span className="text-gradient"> earn with Ridera</span>

          </h6>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Join our growing network of drivers, vehicle owners, and logistics professionals.</p>
          {/* <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => handleSelect('driver')} className="rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow">Become a Driver</button>
            <button onClick={() => handleSelect('assistant')} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold">Become a Driver Assistant / Movers Crew</button>
            <button onClick={() => handleSelect('vehicle')} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold">Become a Vehicle Partner</button>
            <button onClick={() => handleSelect('business')} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold">Become a Business / Corporate Partner</button>
            <button onClick={() => handleSelect('city')} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold">Become a City Partner</button>
          </div> */}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(roleMeta) as RoleKey[]).map((k) => {
            const imgMap: Record<RoleKey, string> = {
              driver: 'driver.jpeg',
              assistant: 'vehicle_a.jpeg',
              vehicle: 'vehicle_assitant.jpeg',
              business: 'business_partner.jpeg',
              city: 'citi_partner.jpeg',
            }

            return <EarnCard key={k} roleKey={k} imgSrc={imgMap[k]} />
          })}
        </div>

        {/* Forms removed — cards now link to dedicated pages for each role. */}
      </div>
    </section>
  )
}

export default Earn
