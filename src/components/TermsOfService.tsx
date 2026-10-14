import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const TermsOfService: FC = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const service = params.get('service')

  useEffect(() => {
    if (service) {
      const element = document.getElementById(service)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [service])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-900 dark:to-primary-800 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-lg ">
            Please read our terms carefully. By using our services, you agree to these terms and conditions.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="#bus-car-hire" className="p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-primary-600 dark:text-primary-400">Bus Charter & Car Hire</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Terms for vehicle rental services</p>
            </a>
            <a href="#water-trips" className="p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-primary-600 dark:text-primary-400">Water Recreational Trips</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Terms for water-based activities</p>
            </a>
            <a href="#shipping" className="p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-primary-600 dark:text-primary-400">Global Shipping</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Terms for freight and cargo services</p>
            </a>
            <a href="#towing-equipment" className="p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-primary-600 dark:text-primary-400">Towing & Heavy Equipment</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Terms for towing and equipment hire</p>
            </a>
            <a href="#storage" className="p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-primary-600 dark:text-primary-400">Storage Services</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Terms for storage solutions</p>
            </a>
            <a href="#moving-haulage" className="p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-primary-600 dark:text-primary-400">Moving & Haulage</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Terms for moving and haulage services</p>
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 lg:px-8 py-16">
        {/* Bus Charter & Car Hire */}
        <section id="bus-car-hire" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service (Bus Charter and Car Hire)
          </h2>
          
          <div className="prose dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-700 dark:text-gray-300">
              These terms and conditions govern the use of Ridera Mobility services, including but not limited to bus hire, coaster bus hire, and car hire. By booking a service with Ridera Mobility, the client agrees to the following terms:
            </p>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">GENERAL TERMS</h3>
              
              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Service Scope</h4>
              <p className="text-gray-700 dark:text-gray-300">Ridera Mobility provides vehicle hire services with a professional driver. Self-drive options are not available.</p>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Vehicle Condition</h4>
              <p className="text-gray-700 dark:text-gray-300">All vehicles provided by Ridera Mobility are in good working condition, and clients are expected to treat them with care and respect.</p>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Punctuality</h4>
              <p className="text-gray-700 dark:text-gray-300">Clients are advised to be ready at the agreed pickup time to avoid delays or additional charges.</p>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Safety Compliance</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>All passengers must wear seat belts during transit.</li>
                <li>The number of passengers must not exceed the vehicle's maximum capacity.</li>
                <li>Clients must comply with all traffic regulations and instructions from the driver for safety purposes.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Prohibited Activities</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Smoking, alcohol consumption, and drug use are strictly prohibited inside the vehicles.</li>
                <li>Vehicles must not be used for illegal activities or reckless behavior.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CLIENT RESPONSIBILITIES</h3>
              
              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Payment</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Clients must make full or agreed-upon payments before the trip commences.</li>
                <li>Additional charges apply for overtime use beyond the agreed duration.</li>
                <li>Clients are responsible for covering any toll fees, parking fees, or additional expenses incurred during the trip.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Property & Belongings</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ridera Mobility is not responsible for personal belongings left in the vehicle.</li>
                <li>Clients must ensure they remove all personal items before the end of the trip.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Route & Special Requests</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Any special requests, such as multiple stops or detours, must be communicated in advance.</li>
                <li>Additional charges may apply for deviations from the agreed route.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Delays & Cancellations</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Clients must inform Ridera Mobility at least 24 hours before cancellation to avoid penalties.</li>
                <li>Delays caused by the client beyond the agreed schedule may attract extra charges.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">LIMITATIONS TO LIABILITY</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ridera Mobility is not liable for delays due to unforeseen circumstances such as traffic, roadblocks, or adverse weather conditions.</li>
                <li>Ridera Mobility is not liable for loss or damage to any client's property during transit.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">DAMAGE LIABILITY</h3>
              
              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Breakdowns</h4>
              <p className="text-gray-700 dark:text-gray-300">If a vehicle breaks down, Ridera Mobility will provide an alternative vehicle or necessary repairs at its discretion.</p>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Damage Fees</h4>
              <p className="text-gray-700 dark:text-gray-300">Clients are responsible for any damage caused to the interior or exterior of the vehicle due to negligence or reckless behaviour.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">DISPUTES & TERMINATION</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ridera Mobility reserves the right to terminate any service if the client violates these terms or engages in misconduct.</li>
                <li>Any disputes arising from these terms will be resolved amicably or through legal proceedings in accordance with applicable Nigerian laws.</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4">By proceeding with a booking, the client agrees to these terms and conditions.</p>
            </div>
          </div>
        </section>

        <hr className="my-12 border-gray-200 dark:border-gray-800" />

        {/* Water Recreational Trips */}
        <section id="water-trips" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ridera Water Recreational Trips – Terms of Service
          </h2>
          
          <div className="prose dark:prose-invert max-w-none space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Service Overview</h3>
              <p className="text-gray-700 dark:text-gray-300">Ridera Water Recreational Trips provides water-based leisure experiences including boat cruises, mini yacht rentals, kayaking, and other water activities. All bookings are subject to availability, weather conditions, and Ridera's operational guidelines.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Booking & Payment</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Bookings must be made in advance and confirmed with full or partial payment as stipulated by Ridera.</li>
                <li>Payment confirms reservation and acknowledgment of all terms stated herein.</li>
                <li>Balance (if applicable) must be paid before the trip begins.</li>
                <li>Prices are based on time duration and selected package. Extension of trip time will attract additional charges.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Cancellation & Rescheduling</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Cancellations made 48 hours before scheduled time attract a 25% charge.</li>
                <li>Cancellations made within 24 hours of the trip attract a 50% charge.</li>
                <li>No refunds for no-shows or cancellations after trip commencement.</li>
                <li>Trips may be rescheduled due to bad weather or technical issues. In such cases, Ridera will provide a new date or issue a credit voucher.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Guest Conduct & Safety</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>All guests must follow crew instructions at all times.</li>
                <li>Life jackets must be worn when on deck or as directed by the crew.</li>
                <li>Disorderly conduct, intoxication, or behavior that endangers others may result in immediate termination of the trip without refund.</li>
                <li>Only authorized persons may operate Ridera's watercrafts or equipment.</li>
                <li>Children must be accompanied and supervised by adults.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Damage & Liability</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Guests are liable for any damage to the vessel, equipment, or facilities resulting from negligence, misconduct, or non-compliance with safety instructions.</li>
                <li>Ridera will not be responsible for loss or damage to guests' personal items during the trip.</li>
                <li>Ridera shall not be held liable for injuries, accidents, or incidents caused by disregard of safety instructions or natural occurrences beyond its control.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Weather & Emergency Policy</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ridera reserves the right to postpone or cancel any trip in the event of unsafe weather or sea conditions.</li>
                <li>In emergencies, the crew's instructions must be strictly followed to ensure passenger safety.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Alcohol & Smoking Policy</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Moderate alcohol consumption is permitted only on select packages and within safe limits.</li>
                <li>Illegal substances and smoking (except in designated areas) are strictly prohibited.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">8. Media & Content Rights</h3>
              <p className="text-gray-700 dark:text-gray-300">Ridera may capture photos or videos during trips for promotional use unless a guest requests otherwise in writing prior to the trip.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">9. Time & Return Policy</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Trips start counting from the scheduled departure time, not guest arrival.</li>
                <li>Late arrival does not extend the reserved trip duration.</li>
                <li>Overtime will attract hourly charges at Ridera's prevailing rate.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">10. Acceptance of Terms</h3>
              <p className="text-gray-700 dark:text-gray-300">By confirming a booking and making payment, guests agree to abide by these terms and conditions. Ridera reserves the right to modify these terms as necessary to ensure safety and service quality.</p>
            </div>
          </div>
        </section>

        <hr className="my-12 border-gray-200 dark:border-gray-800" />

        {/* Global Shipping */}
        <section id="shipping" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ridera Global Shipping – Terms of Service
          </h2>
          
          <div className="prose dark:prose-invert max-w-none space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Service Overview</h3>
              <p className="text-gray-700 dark:text-gray-300">Ridera Global Shipping offers international and domestic freight forwarding, customs clearance, cargo handling, and delivery services. We handle shipments via air, sea, and land, ensuring secure and timely transportation from origin to destination.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Booking & Documentation</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>All shipments must be booked in advance through approved Ridera channels.</li>
                <li>Clients are responsible for providing accurate shipment details, including weight, dimensions, contents, and declared value.</li>
                <li>Required documentation (invoices, IDs, waybills, export/import permits, etc.) must be provided before shipment.</li>
                <li>False declaration or incomplete documentation may lead to delays, penalties, or confiscation by authorities.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Payment Terms</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Full payment or agreed deposit must be made before shipment dispatch.</li>
                <li>Payment covers standard shipping, documentation, and basic handling unless otherwise stated.</li>
                <li>Additional charges may apply for customs duties, demurrage, storage, repackaging, or special handling.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Prohibited & Restricted Items</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">The following items are strictly prohibited unless officially cleared for transport:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Explosives, flammable substances, or hazardous materials</li>
                <li>Illegal drugs or contraband</li>
                <li>Perishable goods without prior approval</li>
                <li>Currency, jewelry, or valuables without proper insurance</li>
                <li>Live animals or human remains (except by approved arrangement)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Packaging & Handling</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Customers must ensure items are properly packed to withstand handling and transport.</li>
                <li>Ridera may repackage items that pose a safety risk or violate shipping standards; additional fees may apply.</li>
                <li>Fragile or high-value items must be clearly labeled and declared before dispatch.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Delivery & Transit Time</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Transit times are estimated and may vary due to customs, weather, or carrier conditions.</li>
                <li>Ridera shall not be held liable for delays caused by third-party carriers, customs clearance, or unforeseen circumstances.</li>
                <li>Clients will be notified promptly in the event of a significant delay or rescheduling.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Insurance & Liability</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ridera provides basic liability coverage for loss or damage caused by proven negligence during handling.</li>
                <li>Clients are encouraged to purchase additional insurance for high-value shipments.</li>
                <li>Ridera is not liable for losses caused by natural disasters, war, strikes, customs actions, or other force majeure events.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">8. Customs & Clearance</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ridera facilitates customs documentation and clearance where applicable.</li>
                <li>Clients are responsible for payment of all applicable duties, taxes, and government fees.</li>
                <li>Failure to provide complete and accurate information may result in delay, seizure, or return of goods.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">9. Claims & Disputes</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Any claim for loss or damage must be reported within 48 hours of delivery and supported by relevant documents and photos.</li>
                <li>Ridera will investigate claims and communicate resolution within a reasonable time frame.</li>
                <li>Approved claims will be settled in accordance with declared value and liability limits.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">10. Storage & Uncollected Items</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Shipments uncollected after 7 days of arrival may attract storage fees.</li>
                <li>Items left beyond 30 days without communication may be disposed of in accordance with company policy.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">11. Amendments & Acceptance</h3>
              <p className="text-gray-700 dark:text-gray-300">By making a booking or shipment payment, clients acknowledge and agree to these terms and conditions. Ridera reserves the right to update or modify these terms as necessary for compliance and operational efficiency.</p>
            </div>
          </div>
        </section>

        <hr className="my-12 border-gray-200 dark:border-gray-800" />

        {/* Towing & Heavy Equipment */}
        <section id="towing-equipment" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ridera Towing & Heavy Equipment Hire – Terms of Service
          </h2>
          
          <div className="prose dark:prose-invert max-w-none space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Service Overview</h3>
              <p className="text-gray-700 dark:text-gray-300">Ridera provides reliable towing services for vehicles of various sizes and heavy equipment hire for construction, logistics, and industrial purposes. All services are handled by trained professionals, ensuring safety, efficiency, and timely delivery.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Booking & Confirmation</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>All towing and equipment hire requests must be confirmed through Ridera's official communication channels.</li>
                <li>Clients must provide accurate service details, including location, vehicle or equipment specifications, duration, and intended use.</li>
                <li>Bookings are subject to availability and confirmation of payment or deposit.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Payment Terms</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Full payment or an agreed deposit is required before service commencement.</li>
                <li>Extra charges may apply for overtime use, delays, fuel, or extended distance beyond the agreed service scope.</li>
                <li>Cancellations within 2 hours of scheduled service time may attract a 30% cancellation fee.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Towing Services</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ridera shall tow vehicles safely and professionally to the agreed destination.</li>
                <li>The client is responsible for ensuring vehicle access and safe conditions for towing operations.</li>
                <li>Ridera will not be liable for pre-existing damages or mechanical faults before towing.</li>
                <li>Additional fees may apply for off-road recovery or special towing requirements (e.g., accident-damaged or immobilized vehicles).</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Heavy Equipment Hire</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Equipment is rented strictly for the agreed purpose and duration.</li>
                <li>The client is responsible for proper handling and care of the equipment during use.</li>
                <li>Any damage, loss, or misuse of equipment while under hire shall be charged to the client.</li>
                <li>Equipment must not be sub-leased, moved, or modified without written approval from Ridera.</li>
                <li>All hired equipment must be returned in the same condition as received (excluding normal wear and tear).</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Operator & Safety Guidelines</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Where applicable, Ridera provides trained operators for safe use of hired equipment.</li>
                <li>Clients must ensure safety compliance at work sites, including necessary permits and clear working areas.</li>
                <li>Ridera reserves the right to withdraw equipment or operators from unsafe conditions without refund.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Liability & Insurance</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ridera maintains insurance coverage for its equipment and operators; however, clients are responsible for site-related risks or third-party incidents during usage.</li>
                <li>Ridera shall not be liable for loss, delay, or damages caused by natural disasters, poor terrain, or client negligence.</li>
                <li>Clients are advised to secure additional coverage for specific high-risk projects.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">8. Delays, Breakdowns & Force Majeure</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>In the event of equipment breakdown, Ridera will repair or replace the unit promptly where possible.</li>
                <li>Ridera shall not be liable for project delays due to unforeseen mechanical or environmental factors beyond its control.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">9. Claims & Disputes</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Any complaint or claim must be reported within 24 hours of service completion.</li>
                <li>Claims will be reviewed and resolved in line with service records and contractual agreements.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">10. Acceptance of Terms</h3>
              <p className="text-gray-700 dark:text-gray-300">By confirming a booking or making payment, clients acknowledge and agree to the above terms and conditions. Ridera reserves the right to amend these terms when necessary to improve service delivery and compliance.</p>
            </div>
          </div>
        </section>

        <hr className="my-12 border-gray-200 dark:border-gray-800" />

        {/* Storage Services */}
        <section id="storage" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ridera Storage Services – Terms of Service
          </h2>
          
          <div className="prose dark:prose-invert max-w-none space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Service Overview</h3>
              <p className="text-gray-700 dark:text-gray-300">Ridera offers secure short-term and long-term storage solutions for personal, household, and business items. Our facilities are monitored, organized, and maintained to ensure the safety and integrity of stored belongings.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Booking & Access</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>All storage bookings must be made through official Ridera channels and confirmed with payment.</li>
                <li>Clients must declare the contents of all stored items and provide an inventory list upon check-in.</li>
                <li>Access to storage units or items is available only during Ridera's operational hours or by prior appointment.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Payment Terms</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Payment for storage must be made in advance based on the agreed duration.</li>
                <li>Late payments may attract daily storage fees or penalties.</li>
                <li>Ridera reserves the right to deny access or release of items until outstanding balances are cleared.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Prohibited & Restricted Items</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">For safety and regulatory reasons, the following items are not allowed in storage:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Flammable, toxic, or hazardous materials</li>
                <li>Illegal goods, weapons, or contraband</li>
                <li>Perishable food items or live animals</li>
                <li>Currency, jewelry, or valuables without prior written agreement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Packing & Condition of Items</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Clients are responsible for properly packing their items before storage.</li>
                <li>Fragile or delicate items must be clearly labeled.</li>
                <li>Ridera may refuse storage of items considered unsafe, leaking, or improperly packed.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Liability & Insurance</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ridera ensures reasonable care and security of all stored items under its custody.</li>
                <li>However, Ridera is not liable for loss or damage arising from fire, flood, pest infestation, or other natural causes beyond its control.</li>
                <li>Clients are encouraged to obtain insurance coverage for high-value or irreplaceable items.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Duration & Retrieval</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Clients must clearly state the intended duration of storage.</li>
                <li>Early retrieval is allowed upon notice and settlement of all dues.</li>
                <li>Items left unclaimed for 30 days after the agreed storage period may incur additional fees or be disposed of according to company policy.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">8. Termination of Storage Agreement</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ridera reserves the right to terminate a storage agreement if items are found to violate these terms or pose a safety risk.</li>
                <li>Clients will be notified prior to removal, except in urgent safety situations.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">9. Claims & Disputes</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Any claim regarding missing or damaged items must be made within 24 hours of retrieval.</li>
                <li>Valid claims will be reviewed and settled in line with Ridera's liability terms and documentation.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">10. Acceptance of Terms</h3>
              <p className="text-gray-700 dark:text-gray-300">By booking a storage unit or making payment, clients acknowledge and agree to these terms. Ridera reserves the right to update these terms periodically to ensure safety, compliance, and operational efficiency.</p>
            </div>
          </div>
        </section>

        <hr className="my-12 border-gray-200 dark:border-gray-800" />

        {/* Moving & Haulage Services */}
        <section id="moving-haulage" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ridera Moving & Haulage Service – Terms of Service
          </h2>
          
          <div className="prose dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-700 dark:text-gray-300">
              The following are the terms and conditions that will govern the agreement between Ridera Technologies Limited hereinafter called "the company or Ridera" and "The User" hereinafter the called "client or customer".
            </p>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">GENERAL</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Although the company endeavours to reasonably protect and secure all items fragile or otherwise, the onus lies with the client to ensure that loose and/or fragile pieces for example china, sensitive electronics, etc. are properly packed, padded and labeled accordingly, prior to our handling. (We highly recommend using our packing and pre-move services which include wrapping, packing, etc., to avoid possible overtime charges and ensure optimum protection of items).
              </p>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Client's Responsibility:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>To properly prepare for pending relocation (i.e. all small pieces etc., should be cleared from surfaces, properly packed in boxes or bins and fragile pieces properly padded, labeled and secured).</li>
                <li>To pay all fees and charges as required.</li>
                <li>To properly protect and secure valuables and important documents and personally carry these items if possible (The Company is not responsible for valuables not properly secured by client).</li>
                <li>To reasonably protect items that can be easily soiled (if our services are not required to do so) as the company is not responsible for incidental soiling to items reasonably handled by movers.</li>
                <li>To inspect the back of the truck upon completion of job, and confirm that all pertinent items have been offloaded.</li>
                <li>To inform the office of any special items (pianos, safes etc) or any special requirements that may have an impact on the handling of such items.</li>
                <li>To ensure all estate or house clearance are made before arrival to avoid overtime charges.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">LIMITATIONS TO LIABILITY</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">In particular, the company accepts no liability in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Where an item being transported exhibits what can be reasonably deemed as a pre-existing fault or defect.</li>
                <li>Free and easy passage is not available for furniture items, i.e. items have to be forced or undergo excessive maneuvering to pass.</li>
                <li>Items are such that normal routes to enter/leave buildings cannot be used but alternate abnormal routes have to be used, e.g. balcony, window, etc.</li>
                <li>Terrain is such a nature that free and unhindered passage is not possible (slippery, rocky, steep, etc.)</li>
                <li>Item is such a shape or size that it cannot pass entrance/exit but has to be disassembled or have parts removed to enable it to pass.</li>
                <li>Items inefficiently packed or prepared by client e.g. boxes containing fragile pieces not properly padded, cushioned and labeled.</li>
                <li>Items not packed by the company.</li>
                <li>Items that were prepared for relocation by persons other than Ridera personnel (i.e. items that have been disconnected, disassembled or dismounted from walls or otherwise altered in preparation for relocation).</li>
                <li>Items that have been altered from their original state.</li>
                <li>Stacking of furniture as requested by the customer.</li>
                <li>Furniture made of compressed wood, particle-board, Halogen lamps and any other items which by their nature are required to travel disassembled.</li>
                <li>Items such as filing cabinets, refrigerators, desks, etc. that are required to travel with their contents intact as requested by the customer, are not covered for damages to items or contents.</li>
                <li>If we are required to carry items which in and of themselves pose a threat to other items such as washing machines, refrigerator, etc. (due to leakage of water and other substances).</li>
                <li>If a client insists on us wrapping, packing or stacking furniture or items in a way which we consider to be inimical to the safety of that item and others and this fact is related to the client.</li>
                <li>Aquaria and other similarly constructed items, and potted plants, are not covered under this warranty.</li>
                <li>It is the client's responsibility to ensure that complex electrical equipment is properly prepared prior to the move, by authorized service personnel. This includes disassembly, reassembly and protection or, as circumstances may dictate, detailed briefing of our staff so that necessary precautions can be employed.</li>
                <li>Items under warranty by a third party.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">PAYMENT</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Payment must be in Nigerian currency, cash, transfer. If another currency is to be used, then prior authorization must be obtained from our office. Exchange rate to be used will be determined by us.</li>
                <li>The company reserves the right to request reservation payment in advance of job completion.</li>
                <li>Estimates are not absolutely binding and can be adjusted as circumstances dictate. Additionally, costs given over the phone are approximate and may change when the moving team arrives or upon completion.</li>
                <li>The company reserves the right to request a deposit for moves with the expectation that estimated balance will be paid upon arrival at pickup location before loading or at final destination, and before offloading.</li>
                <li>All outstanding amounts must be paid by the due date. Failure to do so will result in interest charges being applied and the rate applicable is dependent on overdraft interest charges prevailing at the time of default.</li>
                <li>In the event of a claim, all payments must be settled before the claim can be dealt with.</li>
                <li>Deviation from any of the foregoing requires expressed permission from a named member of management.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Overtime and Miscellaneous Charges:</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Unless otherwise stated, cost given for move is on a per trip basis. When there is a case where the actual items to be moved is more than the items listed, or the actual move address is more and different from the address stated or sent to our representative. Extra charges would be incurred based on weight, volume, value of the item, and distance. The extra cost will be determined by Ridera.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">UNDERSIZED VEHICLE</h3>
              <p className="text-gray-700 dark:text-gray-300">
                If a customer confirms a specific vehicle size and the vehicle arrives at the pickup location but cannot accommodate all the items, no refund will be issued. However, an alternative vehicle can be arranged subject to mutual agreement and adjusted costs. If the client declines or opts out of the alternative arrangement, 50% of the moving cost will be charged, and the remaining balance will be refunded.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">EXTRAORDINARY CIRCUMSTANCES</h3>
              <p className="text-gray-700 dark:text-gray-300">
                In the event of rain, acts of God or any other similar circumstances outside of the control of the company, then the customer or client agrees to share in equal proportion any overtime charges. In the case of riots, public disturbance or any other circumstances whatsoever outside of the control of the company then the company is not responsible for any liability or any loss suffered by the customer.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">RESERVATION DEPOSIT POLICY</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                At Ridera, we value trust and ethical relationships with our customers. For years, we operated without a reservation deposit, relying on common courtesy for advance cancellation or rescheduling notices. However, a recent increase in last-minute cancellations and "no-shows" has led to significant losses, including missed opportunities, paid wages, fuel costs, and vehicle depreciation. To address this, we have introduced a Reservation Deposit to mitigate these expenses and protect our business.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                <strong>Note:</strong> Cancellations, rescheduling, and similar requests will only be accepted and processed during our working hours: Monday to Saturday, 8:00 AM to 6:00 PM.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                A reservation deposit is required for each move to secure your moving date. Once your booking request is received, our customer service representative will issue a deposit invoice. The reservation deposit amounts to 80% of the total moving cost, with the remaining 20% payable upon arrival at the pickup location before loading, or as otherwise arranged with our customer service representative based on the complexity of the move.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">RE-SCHEDULING POLICY</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">We aim to provide flexibility to our customers while maintaining operational efficiency.</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Rescheduling for Advance Bookings:</strong> For bookings made more than 72 hours in advance, rescheduling requests must be made in writing via WhatsApp with our agents at least 72 hours before the scheduled move. Approval is subject to crew availability and potential pricing changes.</li>
                <li><strong>Rescheduling for Short-Notice Bookings:</strong> For bookings made within 72 hours of the move date, rescheduling requests must be submitted at least 24 hours before the scheduled move time and are also subject to crew availability and pricing adjustments.</li>
                <li><strong>Conditional Same-Day Rescheduling:</strong> Same-day rescheduling requests will be considered based on the availability of crew and vehicles. A fee equivalent to 10% of the service cost will apply to offset the disruptions caused to our schedule.</li>
                <li><strong>Rescheduling After Departure Time:</strong> For rescheduling requests made at or after the scheduled move time, or after Departure Time (the actual time the driver begins their trip to the pickup location), or if the vehicle is already en route to the pickup address, a fee equivalent to 30% of the service cost will be charged. This fee reflects operational adjustments and resources deployed after the trip has commenced.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">"NO SHOW" POLICY</h3>
              <p className="text-gray-700 dark:text-gray-300">
                When you book a moving reservation with Ridera and pay the reservation deposit, we commit our movers and resources to serve you as scheduled. It is expected that our movers will meet you at your designated location on time. In the event that our movers arrive at the location, and you are unavailable or unable to proceed with the move, the reservation deposit will not be refunded. This policy accounts for the allocation of resources and the disruptions caused to our schedule.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CANCELLATION POLICY</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">At Ridera, we understand that plans may change. To ensure smooth operations, cancellations are subject to the following terms:</p>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Standard Cancellations</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>To receive a refund of your reservation deposit, cancellations must be submitted in writing via WhatsApp at least 72 hours before the scheduled moving date.</li>
                <li>Refunds will incur a 10% administrative fee deducted from the total moving cost and will be processed within 3–5 business days.</li>
                <li>For bookings made within 72 hours of the scheduled moving date, cancellations must be made 24 hours in advance to qualify for a refund.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Last-Minute or On-Day Cancellations</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Cancellations made less than 24 hours before the move date will incur an administrative fee of 20% of the total moving cost.</li>
                <li>If cancellation occurs on the moving day and the truck has already arrived at the pickup location, no refund or credit will be issued.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Same-Day Cancellations</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>If you place a same-day order, we will make every effort to accommodate your request. A reservation deposit is required at the time of booking.</li>
                <li>If we are unable to schedule a crew, your deposit will be fully refunded.</li>
                <li>However, if a crew is confirmed and a cancellation is made after the driver has begun their journey to the pickup location, the deposit will not be refunded.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Pending Status - Short-Term Cancel Option</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2">If your plans change and you're uncertain about your moving dates or destination, you can shift your reservation to a Pending Status. This option:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Cancels your current order(s) and allows rescheduling within six months without penalty.</li>
                <li>Permits rescheduling to any location, whether in or outside the original state. Rescheduling is subject to crew availability and updated pricing at the new location.</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                For example, if your original reservation was for Ikoyi, Lagos, and you later decide to move to Wuse, Abuja, you can still utilize the reservation under these terms.
              </p>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Rescheduling Terms for Pending Status</h4>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Rescheduling Fee:</strong> Moving a reservation to Pending Status is free within the first 72 hours before the move. However, rescheduling at a later date would incur additional fees based on our rescheduling policy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">RIDERA CLAIM COMPENSATION AND GOODS-IN-TRANSIT INSURANCE POLICY</h3>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">1. Introduction</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Ridera is committed to providing a seamless and secure moving experience for all clients. To ensure the safety of your goods during transit, we have developed a comprehensive Claim Compensation Policy and partnered with an Insurance Provider for a robust Goods-in-Transit (GIT) Insurance Policy. These policies outline the terms of compensation, eligibility, and coverage.
              </p>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">2. Claim Compensation Policy</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Eligibility for Compensation</strong></p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Only customers who opt for Ridera's Goods-in-Transit (GIT) Insurance are eligible for: Access to GIT Insurance cover for protection.</li>
                <li>To be eligible for GIT Insurance: Customers must provide an accurate valuation of their items. Items must be wrapped by Ridera to ensure optimal protection.</li>
              </ul>

              <p className="text-gray-700 dark:text-gray-300 mt-3 mb-2"><strong>Repair, Replacement, or Reimbursement</strong></p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Repair: Damaged items may be repaired by an approved service provider.</li>
                <li>Replacement: For irreparable items, replacements will reflect the closest equivalent value within Nigeria.</li>
                <li>Reimbursement: Claims will be based on the resale value of the item, factoring in depreciation.</li>
              </ul>

              <p className="text-gray-700 dark:text-gray-300 mt-3 mb-2"><strong>Exclusions from Claims</strong></p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Items excluded in the GIT policy (e.g., cash, jewelry, perishable goods).</li>
                <li>Damage or loss due to customer negligence or failure to comply with terms.</li>
                <li>Claims submitted after 48 hours of the moving date.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">3. Goods-in-Transit Insurance Policy</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Coverage</strong></p>
              <p className="text-gray-700 dark:text-gray-300">
                Goods-in-Transit Insurance offers protection for moveable property during transit within Nigeria. Customers opting for this cover can ensure higher financial security for their goods.
              </p>

              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-left">Sum Insured (₦)</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-left">Premium (₦)</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-left">Excess</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">0 - 99,999</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">600 (including Ridera fee)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">10,000 or 10%, whichever is greater</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">100,000 - 249,999</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">1,200 (including Ridera fee)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">10,000 or 10%, whichever is greater</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">250,000 - 499,999</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">1,800 (including Ridera fee)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">10,000 or 10%, whichever is greater</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">500,000 - 1,249,999</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">2,800 (including Ridera fee)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">25,000 or 10%, whichever is greater</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">1,250,000 - 5,000,000</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">0.22% of value</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">50,000 or 10%, whichever is greater</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">5,000,000 - 9,999,999</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">0.32% of value</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">50,000 or 10%, whichever is greater</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">10,000,000 - 19,999,999</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">0.345% of value</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">50,000 or 15%, whichever is greater</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">20,000,000 - 30,000,000</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">0.37% of value</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-2">50,000 or 15%, whichever is greater</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mt-4 mb-2"><strong>Policy Exclusions</strong></p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Damages from riots, terrorism, or natural disasters.</li>
                <li>Deterioration due to rust, vermin, or improper storage.</li>
                <li>High-risk items (e.g., explosives, glassware, perishables).</li>
              </ul>

              <p className="text-gray-700 dark:text-gray-300 mt-4 mb-2"><strong>Claims Documentation</strong></p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Completed claim form.</li>
                <li>Delivery waybill and debit note.</li>
                <li>Police report (in case of theft).</li>
                <li>Supplier's invoice and driver's statement of loss.</li>
                <li>Photographs and written loss report.</li>
                <li>Policy document and repair/replacement cost estimates.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">4. Reporting and Investigation</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Claims must be reported within 48 hours of the move.</li>
                <li>False claims will result in the client bearing all investigation-related costs.</li>
                <li>Ridera reserves the right to verify claims through thorough investigations.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">5. Ridera's GIT Insurance Policy Benefits</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Affordable premiums tailored to customer needs.</li>
                <li>Insurance cover options for maximum protection.</li>
              </ul>

              <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Customer Responsibility</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Accurately declare the value of items.</li>
                <li>Ensure items are adequately secured and wrapped by Ridera.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">ACCEPTANCE OF THESE TERMS</h3>
              <p className="text-gray-700 dark:text-gray-300">
                You acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing and using the Website or Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Website or Services.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                This document was last updated on January 1st, 2025.
              </p>
            </div>

            <div>
              <p className="text-gray-700 dark:text-gray-300 mt-6">
                For more information or to submit a cancellation request, contact our WhatsApp line at 08136153906.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TermsOfService
