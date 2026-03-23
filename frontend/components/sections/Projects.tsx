'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'AI Resume Builder',
    sub: 'Full Stack · Next.js + TypeScript',
    live: 'https://resume-builder-three-fawn.vercel.app/',
    github: 'https://github.com/Lagectus',
    tag: 'Full Stack',
    // Put your screenshot here: /projects/ai-resume.png
    // If no screenshot, we use a live preview via screenshot API
    img: '/projects/ai-resume.png',
    previewUrl: 'https://resume-builder-three-fawn.vercel.app/',
  },
  {
    title: 'SRS Real Estate',
    sub: 'Client Project · Web Design',
    live: 'https://srs-real-estate.vercel.app/',
    github: 'https://github.com/Lagectus',
    tag: 'Client',
    img: '/projects/srs-realestate.png',
    previewUrl: 'https://srs-real-estate.vercel.app/',
  },
  {
    title: 'Learning Management System',
    sub: 'Full Stack · Platform',
    live: 'https://lms-mocha-ten.vercel.app/',
    github: 'https://github.com/Lagectus',
    tag: 'Full Stack',
    img: '/projects/lms.png',
    previewUrl: null,
  },
  {
    title: 'Job Portal',
    sub: 'Full Stack · Web App',
    live: 'https://job-portal-green-five.vercel.app/',
    github: 'https://github.com/Lagectus',
    tag: 'Full Stack',
    img: '/projects/job-portal.png',
    previewUrl: 'https://job-portal-green-five.vercel.app/',
  },
  {
    title: 'E-commerce Frontend',
    sub: 'Frontend · UI/UX',
    live: 'https://aeroshop11.netlify.app/',
    github: 'https://github.com/Lagectus',
    tag: 'Frontend',
    img: '/projects/ecommerce.png',
    previewUrl: null,
  },
  {
    title: 'Portfolio Website',
    sub: 'Full Stack · Next.js',
    live: 'https://sagar-folio.netlify.app',
    github: 'https://github.com/Lagectus',
    tag: 'Frontend',
    img: '/projects/portfolio.png',
    previewUrl: 'https://sagar-folio.netlify.app',
  },
]

const filters = ['All', 'Full Stack', 'Frontend', 'Client']

// Fallback gradient colors per project
const gradients = [
  'linear-gradient(135deg,#8B5CF6,#3B82F6)',
  'linear-gradient(135deg,#2DD4BF,#38BDF8)',
  'linear-gradient(135deg,#EC4899,#A855F7)',
  'linear-gradient(135deg,#F59E0B,#EF4444)',
  'linear-gradient(135deg,#10B981,#14B8A6)',
  'linear-gradient(135deg,#60A5FA,#818CF8)',
]

function ProjectCard({ p, i }: { p: typeof projects[0], i: number }) {
  const [imgError, setImgError] = useState(false)

  // Screenshot service URL — uses microlink.io free tier
  const screenshotUrl = p.previewUrl
    ? `https://api.microlink.io/?url=${encodeURIComponent(p.previewUrl)}&screenshot=true&meta=false&embed=screenshot.url`
    : null

  const showFallback = imgError || (!p.img && !screenshotUrl)

  return (
    <motion.div layout
      initial={{ opacity: 0, scale: .93, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: .93 }}
      transition={{ duration: .35, delay: i * .07 }}
    >
      {/* Thumbnail */}
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '16/10',
        borderRadius: 16, overflow: 'hidden', marginBottom: 14,
        border: '1px solid var(--border)',
        boxShadow: '0 4px 20px rgba(0,0,0,.07)',
        background: gradients[i % gradients.length],
      }}>
        {!showFallback ? (
          <img
            src={p.img}
            alt={p.title}
            onError={() => setImgError(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top',
              display: 'block',
            }}
          />
        ) : (
          /* Fallback: styled gradient with project name */
          <div style={{
            width: '100%', height: '100%',
            background: gradients[i % gradients.length],
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="display font-bold"
              style={{ color: 'rgba(255,255,255,.85)', fontSize: 18, textAlign: 'center', padding: '0 16px', lineHeight: 1.3 }}>
              {p.title}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="proj-overlay" style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          transition: 'background .25s',
        }}>
          {p.live && (
            <motion.a href={p.live} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'white', color: '#1A1F2E',
                padding: '8px 16px', borderRadius: 100,
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
                opacity: 0, transform: 'translateY(8px)',
                transition: 'all .25s',
              }}
              className="proj-btn"
              whileTap={{ scale: .95 }}>
              <ExternalLink size={14} /> Live Demo
            </motion.a>
          )}
        </div>

        {/* Arrow button always visible */}
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer"
            style={{
              position: 'absolute', bottom: 10, right: 10,
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--teal)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white',
              boxShadow: '0 4px 12px rgba(56,189,248,.4)',
              textDecoration: 'none', transition: 'transform .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.12)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            <ArrowUpRight size={17} />
          </a>
        )}
      </div>

      {/* Info */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <h3 className="display font-semibold" style={{ color: 'var(--text)', marginBottom: 3, fontSize: 15 }}>
            {p.title}
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>{p.sub}</p>
        </div>
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer"
            style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'var(--teal)', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(56,189,248,.3)', transition: 'transform .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.tag === active)

  return (
    <section id="projects" style={{ width: '100%', borderTop: '1px solid var(--line)' }}>
      <style>{`
        .proj-card:hover .proj-overlay { background: rgba(0,0,0,.45) !important; }
        .proj-card:hover .proj-btn { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>

      <div className="sec-wrap" style={{ paddingTop: 96, paddingBottom: 96 }}>

        <motion.div style={{ textAlign: 'center', marginBottom: 40 }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .55 }}>
          <h2 className="display font-bold" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', color: 'var(--text)', marginBottom: 8 }}>
            Projects
          </h2>
          <p className="sec-label">
            <span className="grad">Some of my</span>{' '}
            <span style={{ color: 'var(--muted)' }}>Work</span>
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 48 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: .15 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              style={active === f
                ? { padding: '10px 28px', borderRadius: 100, background: 'var(--sub)', color: 'var(--bg)', fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'Poppins,sans-serif' }
                : { padding: '10px 28px', borderRadius: 100, background: 'transparent', color: 'var(--sub)', fontSize: 14, fontWeight: 500, cursor: 'pointer', border: '1.5px solid var(--border)', fontFamily: 'Poppins,sans-serif', transition: 'all .2s' }}
              onMouseEnter={e => { if (active !== f) { (e.currentTarget as HTMLElement).style.borderColor = 'var(--p)'; (e.currentTarget as HTMLElement).style.color = 'var(--p)' } }}
              onMouseLeave={e => { if (active !== f) { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--sub)' } }}>
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <div key={p.title} className="proj-card">
                <ProjectCard p={p} i={i} />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Info note */}
        <motion.div style={{ textAlign: 'center', marginTop: 32 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}>
          <motion.a href="https://github.com/Lagectus" target="_blank" rel="noopener noreferrer"
            className="btn-outline" style={{ display: 'inline-flex' }}
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: .96 }}>
            View all on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}