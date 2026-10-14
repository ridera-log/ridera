import { FC } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import { parseMarkdownLinks } from '../utils/markdownParser'

type BlogPostProps = {
  slug: string
}

const BlogPost: FC<BlogPostProps> = ({ slug }) => {
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) {
    return (
      <section className="bg-white py-20 dark:bg-gray-950 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Blog</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Post not found</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">The blog post you are looking for does not exist.</p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center rounded-full bg-primary-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-950/25 transition-all hover:bg-primary-900 hover:shadow-xl hover:shadow-primary-950/30"
          >
            Back to Blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-10 dark:bg-gray-950 lg:py-18">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <Link to="/blog" className="inline-flex items-center text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          &larr; Back to all posts
        </Link>

        <article className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="h-72 w-full overflow-hidden sm:h-96">
            <img
              src={`/drive-download-20260304T223405Z-3-001/${encodeURIComponent(post.image)}`}
              alt={post.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {post.category}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{post.title}</h1>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500">{post.date}</p>

            <div className="mt-8 space-y-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              {post.content.map((paragraph, index) => {

              

                // Check if it's a numbered list item (starts with number and parenthesis)
                const isListItem = /^\d+\)/.test(paragraph)

                // Check if it's a section header (like "8 weeks before move:" or "7 proven ways...")
                // const isSectionHeader = /^(\d+\s(weeks?|proven)|[A-Z][^:]*:$)/.test(paragraph)
                const isSectionHeader = /^(\d+\s(weeks?|proven)|[A-Z][^[]*:$)/.test(paragraph)

                // Check if it's an author line
                const isAuthor = /^Author:/.test(paragraph)

                // Check if it's a subtitle (like "Mistake 1:", "Tip:", "Bonus tip:", etc.)
                // const isSubtitle = /^(Mistake|Tip|Bonus|Red|Smart|Common|Final|Also|Why|How|Typical|Area|Frequently|Good|Poor)\s/.test(paragraph) && /:/.test(paragraph)
                const isSubtitle = /^(Mistake|Tip|Bonus|Red|Smart|Common|Final|Also|Why|How|Typical|Area|Frequently|Good|Poor)\s[^[]*:/.test(paragraph)

                // Skip rendering author line, it will show below
                if (isAuthor) return null

                if (isSectionHeader) {
                  const colonIndex = paragraph.indexOf(':')
                  const headerPart = paragraph.substring(0, colonIndex + 1)
                  const contentPart = paragraph.substring(colonIndex + 1).trim()

                  return (
                    <div key={`${post.slug}-${index}`}>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">
                        {headerPart}
                      </h3>
                      {contentPart && <p>{parseMarkdownLinks(contentPart)}</p>}
                    </div>
                  )
                }

                if (isSubtitle) {
                  return (
                    <h4 key={`${post.slug}-${index}`} className="text-base font-semibold text-gray-900 dark:text-white mt-4">
                      {paragraph}
                    </h4>
                  )
                }

                if (isListItem) {
                  return (
                    <li key={`${post.slug}-${index}`} className="ml-6 list-decimal">
                      {parseMarkdownLinks(paragraph)}
                    </li>
                  )
                }

                return <p key={`${post.slug}-${index}`}>{parseMarkdownLinks(paragraph)}</p>
              })}
            </div>

            {/* Author Section */}
            <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <img
                  src="/drive-download-20260304T223405Z-3-001/ben.jpeg"
                  alt="Ben Nnaemeka"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Ben Nnaemeka</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Founder of Ridera Logistics</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default BlogPost
