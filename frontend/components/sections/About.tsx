'use client'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function About() {
  return (
    <section id="about" style={{ width:'100%', borderTop:'1px solid var(--line)' }}>
      <div className="sec-wrap" style={{ paddingTop:96, paddingBottom:96 }}>
        <div style={{ textAlign:'center' }}>

          <motion.div style={{ marginBottom:40 }}
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:.55}}>
            <h2 className="display font-bold" style={{ fontSize:'clamp(2.2rem,5vw,3.5rem)', color:'var(--text)', marginBottom:8 }}>
              About Me
            </h2>
            <p className="sec-label">
              <span className="grad">Get to know</span>{' '}
              <span style={{ color:'var(--muted)' }}>me</span>
            </p>
          </motion.div>

          <motion.div style={{ maxWidth:780, margin:'0 auto', marginBottom:48 }}
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:.55,delay:.1}}>
            <div style={{ display:'flex', flexDirection:'column', gap:20, color:'var(--sub)', fontSize:'clamp(14px,2vw,16px)', lineHeight:1.9, textAlign:'center' }}>
              <p>
                Hi there! I'm <strong style={{ color:'var(--text)' }}>Sagar Vashist</strong>, a full stack web developer specializing in React.js, Next.js, Node.js, and MongoDB. With a passion for building clean, performant web applications, I'm dedicated to helping businesses create powerful digital products.
              </p>
              <p>
                I bring a blend of technical expertise and hands-on experience to every project. Currently working as Frontend Developer at{' '}
                <a href="https://srs-real-estate.vercel.app/" target="_blank" rel="noopener noreferrer"
                  className="ulink font-semibold" style={{ color:'var(--teal)' }}>
                  SRS Real Estate <ExternalLink size={12} style={{ display:'inline', verticalAlign:'middle' }}/>
                </a>
                {' '}(Nov 2025 – Present), building their complete website with React, Tailwind & Framer Motion.
              </p>
              <p>
                Let's work together to build something great. Whether it's a new product, a redesign, or a technical challenge — I'm here to help you bring your vision to life.
              </p>
            </div>
          </motion.div>

          <motion.a href="/resume.pdf" target="_blank" className="btn-outline"
            style={{ display:'inline-flex' }}
            initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:.5,delay:.2}}
            whileHover={{scale:1.05,y:-2}} whileTap={{scale:.96}}>
            Download Resume
          </motion.a>
        </div>
      </div>
    </section>
  )
}
