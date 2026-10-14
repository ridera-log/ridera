import { FC } from 'react'

const About: FC = () => {
  const coreValues = [
    {
      title: 'Responsibility',
      description: "I'm responsible. We take ownership of our actions and are committed to delivering the best service to our clients. Every move we make reflects our dedication to maintaining high standards and ensuring a smooth transition for our clients.",
    },
    {
      title: 'Innovation & Excellence',
      description: 'We are committed to staying innovative, embracing new ideas and technologies that enhance our services. Our goal is to consistently improve and adapt, offering solutions that meet the evolving needs of our clients with excellence.',
    },
    {
      title: 'Safety',
      description: 'Your safety and the safety of your belongings are our top priority. We employ the best practices and precautions to ensure that every move is secure and stress-free.',
    },
    {
      title: 'Empathy & Compassion',
      description: 'We understand that moving can be a significant life event. Our approach is centered around care, empathy, and understanding to make the process as easy and comfortable as possible.',
    },
    {
      title: 'Quality & Class',
      description: 'We pride ourselves on delivering top-notch service with a touch of elegance. Every aspect of our service is designed to meet and exceed expectations, ensuring a premium experience for all our clients.',
    },
    {
      title: 'Upskill & Development',
      description: 'We believe in continuous learning and improvement. By investing in upskilling and self-development, we ensure that our team is equipped with the latest knowledge and skills to better serve our clients, staying ahead in the industry.',
    },
    {
      title: 'Integrity',
      description: 'Integrity is the foundation of our relationships with clients and within our team. We value honesty, transparency, and trustworthiness, striving to act in the best interests of our clients. This principle of integrity shapes our actions and assures clients they are in capable and dependable hands.',
    },
    {
      title: 'Collaboration (One Team Spirit)',
      description: 'We believe in the power of teamwork. Our collective effort and collaboration ensure that we deliver exceptional service every time, moving as one unit towards a common goal.',
    },
    {
      title: 'Kinship',
      description: 'We build strong connections with our clients, treating them like family and showing genuine care for their experience. By fostering trust and loyalty, we create an environment where clients feel valued and understood, making Ridera not just a service provider but a supportive partner in their moving journey.',
    },
  ]

  const team = [
    { name: 'Ben Nnaemeka', title: 'Founder / Chief Executive Officer', image: '/drive-download-20260304T223405Z-3-001/ben.jpeg' },
    { name: 'Anita Chukwuma', title: 'Chief Operating Officer', image: '/drive-download-20260304T223405Z-3-001/coo.jpeg' },
    { name: 'Anthony Morah', title: 'Chief Technical Officer', image: '/drive-download-20260304T223405Z-3-001/anthony.jpeg' },
    { name: 'Chioma Okoronkwo', title: 'Chief Finance Officer', image: '/drive-download-20260304T223405Z-3-001/cfo.jpeg' },
    { name: 'Somto Umeizuegbu', title: 'Head of HR / People & Culture', image: '/drive-download-20260304T223405Z-3-001/hr.jpeg' },
  ]

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/drive-download-20260304T223405Z-3-001/Extras(2).JPG')" }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About <span className="text-gradient">Ridera</span>
            </h1>
            <p className="mt-6 text-lg text-gray-100">
              Movement is life. It's joy, freedom, and a fundamental part of our existence. Just Keep Moving.
            </p>
          </div>
        </div>
      </section>

      {/* Background Image Section */}

      {/* Why Ridera Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 items-center lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Why Ridera?</h2>
              <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Have you ever met someone who couldn't move? Movement is life. It's joy, freedom, and a fundamental part of our existence. It's a basic right, the essence of vitality. This belief birthed Ridera, creating a service that enables people to move happily, effortlessly, and in style. After all, movement is the first sign of life—Hence, our tagline: <span className="font-semibold">Just Keep Moving.</span>
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="/drive-download-20260304T223405Z-3-001/whychooseus1.jpeg" alt="Why Ridera" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 items-center lg:grid-cols-2">
            <div className="rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <img src="/drive-download-20260304T223405Z-3-001/whychooseus3.jpeg" alt="What We Believe" className="w-full h-64 object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What We Believe</h2>
              <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We believe that movement is more than just physical activity; it's a fundamental part of life and freedom. Moving should be a joyful and liberating experience, free from stress and anxiety. At Ridera, we are dedicated to creating an environment where every move is carried out effortlessly, happily, and in style. We believe in continuous improvement, innovation, and adapting to the needs of our clients, ensuring that each move reflects our commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ridera Extended Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 items-center lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Why Choose Ridera</h2>
              <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Ridera is more than a logistics company—we are a trusted mobility and logistics partner supporting some of life's most important transitions and journeys. From relocation and transportation to global shipping, logistics equipment hire, and recreational mobility, we combine responsibility, safety, and empathy to deliver seamless experiences across every touchpoint. Our unwavering commitment to quality, class, and reliability ensures that every detail is handled with care, empowering you to move freely, confidently, and without limits—so you can <span className="font-semibold">Just Keep Moving</span> with peace of mind.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="/drive-download-20260304T223405Z-3-001/whychooseus2.jpeg" alt="Why Choose Ridera" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Core Values</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              These qualities aren't just ideals; they're the foundation upon which we build trust, deliver exceptional service, and elevate every client experience.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {coreValues.map((value, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{value.title}</h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* R.I.S.E.Q.U.I.C.K Section */}
     

      {/* Mission & Vision Section */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2">
            <div className="mx-auto max-w-md">
              <div className="rounded-lg border border-accent-200 bg-accent-50 p-8 dark:border-accent-800 dark:bg-accent-900/20">
                <h3 className="text-2xl font-bold text-accent-900 dark:text-accent-300">Our Mission</h3>
                <p className="mt-6 text-accent-800 dark:text-accent-200 leading-relaxed">
                  To enable people and businesses with seamless, safe, and high-quality logistics and mobility solutions—so they can move freely, confidently, and without limits, empowering progress for individuals and enterprises.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-md">
              <div className="rounded-lg border border-primary-200 bg-primary-50 p-8 dark:border-primary-800 dark:bg-primary-900/20">
                <h3 className="text-2xl font-bold text-primary-900 dark:text-primary-300">Our Vision</h3>
                <p className="mt-6 text-primary-800 dark:text-primary-200 leading-relaxed">
                  To lead the future of movement in Africa and beyond by defining global benchmarks for excellence, innovation, and purpose—where Ridera is synonymous with trust, quality, and the freedom to move.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Our Team</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">The talented people behind Ridera</p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <div key={index} className="rounded-lg border border-gray-200 overflow-hidden shadow-xl dark:border-gray-800">
                  <img src={member.image} alt={member.name} className="w-full md:h-64 object-contain md:object-cover" />
                  <div className="bg-white dark:bg-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
