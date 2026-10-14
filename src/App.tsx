import { ReactNode, useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme.tsx'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import Services from './components/Services.tsx'
import Features from './components/Features.tsx'
import Earn from './components/Earn.tsx'
import Footer from './components/Footer.tsx'
import Testimonials from './components/Testimonials.tsx'
import Contact from './components/Contact.tsx'
import Community from './components/Community.tsx'
import Blog from './components/Blog.tsx'
import BlogPost from './components/BlogPost.tsx'
import About from './components/About.tsx'
import TermsOfService from './components/TermsOfService.tsx'
import Login from './components/Login.tsx'
import QuoteDashboard from './components/QuoteDashboard.tsx'
import QuoteDetails from './components/QuoteDetails.tsx'
import SocialLinksPage from './components/SocialLinksPage.tsx'
import PhoneNumbersPage from './components/PhoneNumbersPage'

function MarketingLayout(): React.ReactElement {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <>
      <Header />
      <main className={!isHomePage ? 'pt-20' : ''}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function HomePage(): React.ReactElement {
  return (
    <>
      <div data-animate>
        <Hero />
      </div>
      <div data-animate style={{ animationDelay: '100ms' }}>
        <Services />
      </div>
      <Features />
      <div data-animate style={{ animationDelay: '180ms' }}>
        <Testimonials />
      </div>
      <div data-animate style={{ animationDelay: '200ms' }}>
        <Contact />
      </div>
    </>
  )
}

function App(): React.ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('ridera-auth') === 'true')
  const [userEmail, setUserEmail] = useState<string>(() => localStorage.getItem('ridera-email') ?? '')
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogin = (email: string) => {
    localStorage.setItem('ridera-auth', 'true')
    localStorage.setItem('ridera-email', email)
    setIsAuthenticated(true)
    setUserEmail(email)
    navigate('/dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('ridera-auth')
    localStorage.removeItem('ridera-email')
    setIsAuthenticated(false)
    setUserEmail('')
    navigate('/login')
  }

  useEffect(() => {
    const animatedElements = Array.from(document.querySelectorAll<HTMLElement>('[data-animate]'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -15% 0px' },
    )

    animatedElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // When navigating to a new page without hash, smoothly scroll to the beginning of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [location.hash, location.pathname])

  const ProtectedRoute = ({ children }: { children: ReactNode }) =>
    isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />

  const BlogPostRoute = () => {
    const { slug = '' } = useParams()
    return <BlogPost slug={slug} />
  }

  const QuoteDetailsRoute = () => <QuoteDetails userEmail={userEmail || 'team@ridera.com'} onLogout={handleLogout} />
  const SocialLinksRoute = () => <SocialLinksPage userEmail={userEmail || 'team@ridera.com'} onLogout={handleLogout} />
  const PhoneNumbersRoute = () => <PhoneNumbersPage userEmail={userEmail || 'team@ridera.com'} onLogout={handleLogout} />

  return (
    <ThemeProvider>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostRoute />} />
        </Route>

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <QuoteDashboard userEmail={userEmail || 'team@ridera.com'} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/quotes/:quoteId"
          element={
            <ProtectedRoute>
              <QuoteDetailsRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/social-links"
          element={
            <ProtectedRoute>
              <SocialLinksRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/phone-numbers"
          element={
            <ProtectedRoute>
              <PhoneNumbersRoute />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <a
        href="https://wa.me/+2348136153906?text=Hi%2C%20i%20want%20to%20learn%20more%20about%20ridera.%20thank%20you."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 animate-heartbeat"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-14 h-14 px-1"
        />
      </a>
    </ThemeProvider>
  )
}

export default App
