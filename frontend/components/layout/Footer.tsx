'use client'
import { motion } from 'framer-motion'
import { Github, Linkedin, Globe, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ width:'100%', borderTop:'1px solid var(--line)', background:'var(--surface)' }}>
      <div className="sec-wrap" style={{ paddingTop:64, paddingBottom:64 }}>
        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:24 }}>
          <motion.div
            initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}}
            viewport={{once:true}} transition={{duration:.5}}>
            <h2 className="display font-bold" style={{ fontSize:'clamp(2rem,5vw,3.2rem)', color:'var(--text)', lineHeight:1.2 }}>
              Let's<br/>Work Together -
            </h2>
          </motion.div>
          <motion.a href="mailto:sagarheromail10@gmail.com"
            className="btn-outline" style={{ display:'flex', alignItems:'center', gap:10 }}
            initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}}
            viewport={{once:true}} transition={{duration:.5,delay:.1}}
            whileHover={{scale:1.04}}>
            <Mail size={16}/>
            sagarheromail10@gmail.com
          </motion.a>
        </div>
      </div>

      <div style={{ borderTop:'1px solid var(--line)' }}>
        <div className="sec-wrap" style={{ paddingTop:20, paddingBottom:20, display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:16 }}>
          <p style={{ fontSize:13, color:'var(--muted)' }}>
            © {new Date().getFullYear()} all rights reserved.
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            {[
              {icon:Linkedin, href:'https://linkedin.com/in/sagar-vashist'},
              {icon:Github,   href:'https://github.com/Lagectus'},
              {icon:Globe,    href:'https://sagar-folio.netlify.app'},
              {icon:Mail,     href:'mailto:sagarheromail10@gmail.com'},
            ].map(({icon:Icon,href},i) => (
              <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                style={{ width:36, height:36, borderRadius:'50%', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', textDecoration:'none', transition:'all .2s' }}
                whileHover={{scale:1.1,y:-2}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color='var(--teal)';(e.currentTarget as HTMLElement).style.borderColor='var(--teal)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color='var(--muted)';(e.currentTarget as HTMLElement).style.borderColor='var(--border)'}}>
                <Icon size={16}/>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
