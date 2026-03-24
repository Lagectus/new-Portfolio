'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/lib/ThemeContext'
import { Moon, Sun, X, Menu } from 'lucide-react'

const links = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#skills' },
  { label: 'Resume',   href: '/sagar_resume_v2.pdf', external: true },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (label: string, href: string, external?: boolean) => {
    setOpen(false); setActive(label)
    if (external) { window.open(href, '_blank'); return }
    if (href === '#hero') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 4px;
          cursor: pointer;
          background: none;
          border: none;
          transition: color .2s;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: #00E5CC;
          transition: width .25s ease;
          border-radius: 1px;
        }
        .nav-link:hover::after,
        .nav-link.active-link::after { width: 100%; }

        .nav-contact-btn {
          padding: 8px 20px;
          border-radius: 8px;
          border: 1.5px solid #00E5CC;
          background: transparent;
          color: #00E5CC;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all .2s;
          font-family: 'Inter', sans-serif;
          letter-spacing: .01em;
        }
        .nav-contact-btn:hover {
          background: #00E5CC;
          color: #0a0a0a;
          box-shadow: 0 0 20px rgba(0,229,204,.35);
        }

        .nav-theme-btn {
          width: 34px; height: 34px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,.12);
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.05);
          cursor: pointer;
          transition: all .2s;
          color: rgba(255,255,255,.5);
        }
        .nav-theme-btn:hover {
          border-color: rgba(0,229,204,.4);
          color: #00E5CC;
          background: rgba(0,229,204,.08);
        }

        .nav-logo {
          font-size: 20px;
          font-weight: 800;
          background: linear-gradient(135deg, #00E5CC, #00BFA5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          cursor: pointer;
          border: none;
          font-family: 'Poppins', sans-serif;
          font-style: italic;
          letter-spacing: -.01em;
        }

        .mobile-btn {
          width: 34px; height: 34px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,.12);
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.05);
          cursor: pointer;
          color: rgba(255,255,255,.6);
        }
      `}</style>

      <motion.header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'all .3s',
          padding: scrolled ? '10px 0' : '16px 0',
          background: scrolled
            ? 'rgba(10,12,18,.92)'
            : 'rgba(10,12,18,.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,.06)'
            : '1px solid rgba(255,255,255,.04)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,.3)' : 'none',
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .5, ease: [.16, 1, .3, 1] }}
      >
        <div style={{
          width: '100%', maxWidth: 1200, margin: '0 auto',
          padding: '0 40px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          position: 'relative',
        }}>

          {/* Logo */}
          <button className="nav-logo" onClick={() => go('Home', '#hero')}>
            Sagar.
          </button>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-8"
            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {links.map((l, i) => (
              <motion.button
                key={l.label}
                onClick={() => go(l.label, l.href, l.external)}
                className={`nav-link ${active === l.label ? 'active-link' : ''}`}
                style={{ color: active === l.label ? '#00E5CC' : 'rgba(255,255,255,.65)' }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .1 + i * .05 }}
              >
                {l.label}
              </motion.button>
            ))}
          </nav>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <motion.button
              onClick={() => go('Contact', '#contact')}
              className="nav-contact-btn hidden md:flex"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: .96 }}
            >
              Contact
            </motion.button>

            <button className="nav-theme-btn" onClick={toggleTheme}>
              <AnimatePresence mode="wait">
                {theme === 'dark'
                  ? <motion.span key="s" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .15 }}><Sun size={14} /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: .15 }}><Moon size={14} /></motion.span>
                }
              </AnimatePresence>
            </button>

            <button className="mobile-btn md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X size={15} color="rgba(255,255,255,.7)" /> : <Menu size={15} color="rgba(255,255,255,.7)" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'rgba(8,10,16,.97)',
              backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 32,
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <button
              style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.5)' }}
              onClick={() => setOpen(false)}>
              <X size={22} />
            </button>

            {links.map((l, i) => (
              <motion.button key={l.label}
                onClick={() => go(l.label, l.href, l.external)}
                style={{
                  fontSize: '2rem', fontWeight: 700,
                  color: active === l.label ? '#00E5CC' : 'rgba(255,255,255,.8)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'color .2s',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * .07 }}>
                {l.label}
              </motion.button>
            ))}

            <motion.button
              onClick={() => go('Contact', '#contact')}
              className="nav-contact-btn"
              style={{ marginTop: 8 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }}>
              Contact
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}