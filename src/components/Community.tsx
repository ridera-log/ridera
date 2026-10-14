import { FC } from 'react'

const Community: FC = () => {
    return (
        <section id="community" className="bg-gray-50 py-10 dark:bg-gray-900 lg:py-18">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="">
                    <div className='mx-auto max-w-3xl'>
                        <div className="mb-8 text-center">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700 dark:border-accent-800 dark:bg-accent-900/30 dark:text-accent-300">Community Work</div>
                            {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">Giving Back Initiatives</h2> */}
                             <h6 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Giving  <span className="text-gradient">Back Initiatives</span>

          </h6>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Ridera supports local communities through free moves, scholarships, and eco initiatives. Learn how to apply or get involved below.</p>
                        </div>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-3">
                        <div className="group rounded-2xl border border-gray-200 bg-white p-0 overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                            <div className="w-full overflow-hidden">
                                <img src={`/drive-download-20260304T223405Z-3-001/${encodeURIComponent('Moving .jpg')}`} alt="Free Moves" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Free Moves for Families in Crisis</h3>
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Ridera offers free moving services to families in crisis — victims of domestic violence, natural disasters, sudden evictions, or emergency demolitions. We aim to ease relocation during difficult times.</p>
                                <div className="mt-4">
                                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSe77ewHMzbDWNwh2YRgzaC2guH3WvUzdnVgTi_cV954DGXeog/viewform?usp=header" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-accent-600">Apply Now</a>
                                </div>
                            </div>
                        </div>

                        <div className="group rounded-2xl border border-gray-200 bg-white p-0 overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                            <div className="w-full overflow-hidden">
                                <img src={`/drive-download-20260304T223405Z-3-001/${encodeURIComponent('Scholarship for students.jpg')}`} alt="Scholarships" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Scholarships for Students</h3>
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Ridera awards full and partial scholarships to students from low-income backgrounds. We partner with local schools and organizations to identify candidates and support their education.</p>
                                <div className="mt-4">
                                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeg8LaYqtOF0oot2TUaBmrGCSL6x43b5htVg-2L7STvQkYFWA/viewform" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-accent-600">Apply Now</a>
                                </div>
                            </div>
                        </div>

                        <div className="group rounded-2xl border border-gray-200 bg-white p-0 overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                            <div className="w-full overflow-hidden">
                                <img src={`/drive-download-20260304T223405Z-3-001/${encodeURIComponent('Planting trees.jpg')}`} alt="Eco-Friendly" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Eco-Friendly Moving Days</h3>
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">On selected days, Ridera donates a portion of proceeds to environmental causes and runs tree-planting drives. Customers can opt into these green moves when booking.</p>
                                <div className="mt-4">
                                    <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Community
