// import { Link } from 'react-router-dom'
// import React, { ReactNode } from 'react'

// export const parseMarkdownLinks = (text: string): ReactNode => {
//   // Regex to match markdown links: [text](url)
//   const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g

//   let lastIndex = 0
//   const elements: ReactNode[] = []

//   let match

//   while ((match = markdownLinkRegex.exec(text)) !== null) {
//     // Add text before the link
//     if (match.index > lastIndex) {
//       elements.push(text.substring(lastIndex, match.index))
//     }

//     const linkText = match[1]
//     const linkUrl = match[2]

//     // Check if it's an internal link or external
//     if (linkUrl.startsWith('/')) {
//       // Internal link using React Router
//       elements.push(
//         <Link key={`link-${match.index}`} to={linkUrl} className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline">
//           {linkText}
//         </Link>
//       )
//     } else {
//       // External link
//       elements.push(
//         <a key={`link-${match.index}`} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline">
//           {linkText}
//         </a>
//       )
//     }

//     lastIndex = markdownLinkRegex.lastIndex
//   }

//   // Add remaining text
//   if (lastIndex < text.length) {
//     elements.push(text.substring(lastIndex))
//   }

//   // If no links found, return original text
//   if (elements.length === 0) {
//     return text
//   }

//   return <>{elements}</>
// }

// utils/markdownParser.ts
import { JSX } from 'react'
import { Link } from 'react-router-dom'

export function parseMarkdownLinks(text: string): (string | JSX.Element)[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: (string | JSX.Element)[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = linkRegex.exec(text)) !== null) {
    // Push text before this match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const [, label, href] = match
    const isExternal = href.startsWith('http')

    parts.push(
      isExternal ? (
          <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {label}
        </a>
      ) : (
        <Link
          key={match.index}
          to={href}
          className="font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {label}
        </Link>
      )
    )

    lastIndex = match.index + match[0].length
  }

  // Push any remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}