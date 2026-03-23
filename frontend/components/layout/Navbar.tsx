'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/lib/ThemeContext'
import { Moon, Sun, X, Menu } from 'lucide-react'

const links = [
  { label:'Home',     href:'#hero' },
  { label:'About',    href:'#about' },
  { label:'Projects', href:'#projects' },
  { label:'Services', href:'#skills' },
  { label:'Resume',   href:'/resume.pdf', external:true },
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
    if (href === '#hero') { window.scrollTo({ top:0, behavior:'smooth' }); return }
    document.querySelector(href)?.scrollIntoView({ behavior:'smooth' })
  }

  return (
    <>
      <motion.header
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:50,
          transition:'all .3s',
          padding: scrolled ? '10px 0' : '18px 0',
          background: scrolled ? 'rgba(221,230,240,.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.06)' : 'none',
        }}
        initial={{ y:-60, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:.5, ease:[.16,1,.3,1] }}
      >
        <div style={{ width:'100%', maxWidth:1200, margin:'0 auto', padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative' }}>

          {/* Logo */}
          <button onClick={() => go('Home','#hero')}
            className="display font-bold text-xl italic flex-shrink-0"
            style={{ color:'var(--text)' }}>
            Sagar
          </button>

          {/* Nav links — absolutely centered in header */}
          <nav className="hidden md:flex items-center gap-8"
            style={{ position:'absolute', left:'50%', transform:'translateX(-50%)' }}>
            {links.map((l, i) => (
              <motion.button key={l.label}
                onClick={() => go(l.label, l.href, l.external)}
                className="text-sm font-medium whitespace-nowrap"
                style={{ color: active===l.label ? 'var(--teal)' : 'var(--muted)', transition:'color .2s' }}
                initial={{ opacity:0, y:-8 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:.1 + i*.05 }}
              >
                {l.label}
              </motion.button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.button
              onClick={() => go('Contact','#contact')}
              className="hidden md:flex btn-outline"
              style={{ padding:'8px 22px', fontSize:13 }}
              whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}>
              Contact
            </motion.button>
            <button onClick={toggleTheme}
              style={{ width:36, height:36, borderRadius:'50%', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', background:'transparent', cursor:'pointer', transition:'all .2s' }}>
              <AnimatePresence mode="wait">
                {theme==='dark'
                  ? <motion.span key="s" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:.15}}><Sun size={14}/></motion.span>
                  : <motion.span key="m" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:.15}}><Moon size={14}/></motion.span>}
              </AnimatePresence>
            </button>
            <button className="md:hidden" style={{ width:36, height:36, borderRadius:'50%', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', cursor:'pointer', color:'var(--muted)' }}
              onClick={() => setOpen(!open)}>
              {open ? <X size={15}/> : <Menu size={15}/>}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div style={{ position:'fixed', inset:0, zIndex:40, background:'rgba(221,230,240,.98)', backdropFilter:'blur(20px)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:28 }}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <button style={{ position:'absolute', top:20, right:20, color:'var(--muted)', background:'none', border:'none', cursor:'pointer' }} onClick={()=>setOpen(false)}><X size={22}/></button>
            {links.map((l,i) => (
              <motion.button key={l.label} onClick={()=>go(l.label,l.href,l.external)}
                className="display font-bold text-3xl"
                style={{ color:'var(--text)', background:'none', border:'none', cursor:'pointer' }}
                initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*.07}}>
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
