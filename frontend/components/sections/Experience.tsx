'use client'
import { motion } from 'framer-motion'
import { ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react'

const exp = [{
  role:'Frontend Developer', company:'SRS Real Estate', period:'Nov 2025 – Present', type:'Freelance · Contract',
  url:'https://srs-real-estate.vercel.app/',
  desc:'Built the complete company website for a real-estate firm in South West Delhi.',
  pts:['Full website — React.js, Tailwind CSS, Framer Motion','Dynamic property listings + real-time enquiry forms','Mobile-first, Vercel deployment & CI/CD workflow','Full lifecycle: wireframe → design → dev → delivery','Smooth page transitions and micro-animations'],
  tech:['React.js','Tailwind CSS','Framer Motion','Vercel'],
}]
const edu = [
  {short:'PGDCA',full:'Post Graduate Diploma in Computer Applications',inst:'Maharaja Agarsen Himalayan University',yr:'2025'},
  {short:'BA',full:'Bachelor of Arts',inst:'Delhi University (SOL)',yr:'2024'},
]
const certs = [
  {name:'Full Stack Web Development',org:'Dice Academy',yr:'2026'},
  {name:'Technology Job Simulation (Forage)',org:'Deloitte',yr:'2025'},
]

export default function Experience() {
  return (
    <section id="experience" style={{ width:'100%', borderTop:'1px solid var(--line)', background:'var(--surface)' }}>
      <div className="sec-wrap" style={{ paddingTop:96, paddingBottom:96 }}>

        <motion.div style={{ textAlign:'center', marginBottom:56 }}
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:.55}}>
          <h2 className="display font-bold" style={{ fontSize:'clamp(2.2rem,5vw,3.5rem)', color:'var(--text)', marginBottom:8 }}>
            Experience & Education
          </h2>
          <p className="sec-label">
            <span className="grad">My</span>{' '}
            <span style={{ color:'var(--muted)' }}>Journey</span>
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:40 }} className="exp-grid">
          <style>{`@media(max-width:900px){.exp-grid{grid-template-columns:1fr!important}}`}</style>

          {/* Work */}
          <div>
            <motion.div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28 }}
              initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:.5,delay:.05}}>
              <Briefcase size={17} style={{ color:'var(--teal)' }}/>
              <span className="display font-semibold" style={{ color:'var(--text)' }}>Work Experience</span>
            </motion.div>

            {exp.map((e,i) => (
              <motion.div key={e.company}
                initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{duration:.5,delay:.1}}>
                <div className="card" style={{ padding:28 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', gap:16, marginBottom:20, flexWrap:'wrap' }}>
                    <div>
                      <h3 className="display font-bold" style={{ fontSize:18, color:'var(--text)' }}>{e.role}</h3>
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}>
                        <span className="font-semibold" style={{ color:'var(--teal)' }}>{e.company}</span>
                        <a href={e.url} target="_blank" rel="noopener noreferrer" style={{ color:'var(--muted)' }}><ExternalLink size={13}/></a>
                      </div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <span style={{ fontSize:12, background:'var(--bg)', border:'1px solid var(--border)', padding:'4px 12px', borderRadius:100, color:'var(--muted)', fontFamily:'monospace' }}>{e.period}</span>
                      <p style={{ fontSize:12, color:'var(--muted)', marginTop:6, fontFamily:'monospace' }}>{e.type}</p>
                    </div>
                  </div>
                  <p style={{ color:'var(--muted)', marginBottom:20, lineHeight:1.7 }}>{e.desc}</p>
                  <ul style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20, listStyle:'none' }}>
                    {e.pts.map((pt,j) => (
                      <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:10, color:'var(--sub)' }}>
                        <span style={{ color:'var(--teal)', fontWeight:700, flexShrink:0, marginTop:2 }}>•</span>{pt}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {e.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right */}
          <div style={{ display:'flex', flexDirection:'column', gap:40 }}>
            {/* Education */}
            <div>
              <motion.div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24 }}
                initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{duration:.5,delay:.1}}>
                <GraduationCap size={17} style={{ color:'var(--teal)' }}/>
                <span className="display font-semibold" style={{ color:'var(--text)' }}>Education</span>
              </motion.div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {edu.map((e,i) => (
                  <motion.div key={e.short} className="card" style={{ padding:20 }}
                    initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
                    viewport={{once:true}} transition={{duration:.5,delay:.14+i*.07}}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                      <span style={{ fontSize:11, background:'rgba(56,189,248,.12)', color:'var(--teal)', padding:'2px 10px', borderRadius:100, fontWeight:600 }}>{e.short}</span>
                      <span style={{ fontSize:12, color:'var(--muted)', fontFamily:'monospace' }}>{e.yr}</span>
                    </div>
                    <p style={{ color:'var(--text)', fontWeight:600, lineHeight:1.4 }}>{e.full}</p>
                    <p style={{ fontSize:13, color:'var(--muted)', marginTop:4, fontFamily:'monospace' }}>{e.inst}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certs */}
            <div>
              <motion.div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24 }}
                initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{duration:.5,delay:.2}}>
                <Award size={17} style={{ color:'var(--amber)' }}/>
                <span className="display font-semibold" style={{ color:'var(--text)' }}>Certifications</span>
              </motion.div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {certs.map((c,i) => (
                  <motion.div key={c.name} className="card" style={{ display:'flex', alignItems:'center', gap:16, padding:20 }}
                    initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
                    viewport={{once:true}} transition={{duration:.5,delay:.24+i*.07}}>
                    <div style={{ width:36, height:36, borderRadius:10, background:'rgba(245,158,11,.1)', border:'1px solid rgba(245,158,11,.25)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--amber)', fontWeight:700, flexShrink:0 }}>✓</div>
                    <div>
                      <p style={{ color:'var(--text)', fontWeight:600, lineHeight:1.3 }}>{c.name}</p>
                      <p style={{ fontSize:12, color:'var(--muted)', marginTop:3, fontFamily:'monospace' }}>{c.org} · {c.yr}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
