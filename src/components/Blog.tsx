import { FC } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

const Blog: FC = () => {
  return (
    <section id="blog" className="bg-white py-10 dark:bg-gray-950 lg:py-18">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700 dark:border-accent-800 dark:bg-accent-900/30 dark:text-accent-300">
            Blog
          </div>
          {/* <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
           
          </h1> */}
           <h6 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
             Insights for  <span className="text-gradient"> Better Logistics</span>

          </h6>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Practical advice and updates on moving, mobility, and shipping.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.title}
              to={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-primary-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-800"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={`/drive-download-20260304T223405Z-3-001/${encodeURIComponent(post.image)}`}
                  alt={post.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {post.category}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</h2>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{post.excerpt}</p>
                <p className="mt-6 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500">
                  {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
