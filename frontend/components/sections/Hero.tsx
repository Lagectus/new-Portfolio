'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const roles = ['Full Stack Developer','React Developer','Next.js Developer','UI Craftsman']

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let idx = 0
    const cycle = () => {
      if (!roleRef.current) return
      roleRef.current.style.opacity='0'; roleRef.current.style.transform='translateY(-12px)'
      setTimeout(() => {
        idx=(idx+1)%roles.length
        if (!roleRef.current) return
        roleRef.current.textContent=roles[idx]
        roleRef.current.style.transition='opacity .4s,transform .4s'
        roleRef.current.style.opacity='1'; roleRef.current.style.transform='translateY(0)'
      }, 300)
    }
    const iv=setInterval(cycle,2800)
    return ()=>clearInterval(iv)
  },[])

  return (
    <section id="hero" style={{ width:'100%', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 20px 48px' }}>
      <div style={{ width:'100%', maxWidth:680, margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center' }}>

        {/* Photo */}
        <motion.div style={{ position:'relative', marginBottom:28 }}
          initial={{opacity:0,scale:.75}} animate={{opacity:1,scale:1}}
          transition={{duration:.6,ease:[.16,1,.3,1]}}>
          <div style={{ width:140, height:140, borderRadius:'50%', overflow:'hidden', border:'4px solid white', boxShadow:'0 20px 50px rgba(43,108,176,.25)', background:'linear-gradient(135deg,var(--teal),var(--p))', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {/* Replace with: <img src="/photo.jpg" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}} alt="Sagar" /> */}
            <img src="/photo.jpg" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}} alt="Sagar" />
          </div>
          <div style={{ position:'absolute', bottom:8, right:8, width:20, height:20, borderRadius:'50%', background:'var(--green)', border:'3px solid white', boxShadow:'0 0 8px var(--green)' }} />
        </motion.div>

        {/* Name */}
        <motion.h1 className="display font-bold"
          style={{ fontSize:'clamp(2.6rem,7vw,4.5rem)', letterSpacing:'-0.02em', lineHeight:1.1, color:'var(--text)', marginBottom:12 }}
          initial={{opacity:0,y:28}} animate={{opacity:1,y:0}}
          transition={{duration:.65,delay:.15,ease:[.16,1,.3,1]}}>
          Sagar Vashist
        </motion.h1>

        {/* Role */}
        <motion.div style={{ marginBottom:20 }}
          initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
          transition={{duration:.5,delay:.28}}>
          <span ref={roleRef} className="display font-semibold grad"
            style={{ fontSize:'clamp(1.2rem,3.5vw,1.8rem)' }}>
            Full Stack Developer
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p style={{ color:'var(--muted)', lineHeight:1.8, maxWidth:560, fontSize:'clamp(14px,2vw,16px)', marginBottom:40 }}
          initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}
          transition={{delay:.38}}>
          As a passionate full stack developer with expertise in React, Next.js, Node.js, and MongoDB,
          I build beautiful, scalable web applications that your users will love.
        </motion.p>

        {/* CTA */}
        <motion.button className="btn-outline"
          style={{ fontSize:15, padding:'14px 40px' }}
          onClick={() => document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}
          initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          transition={{delay:.48}}
          whileHover={{scale:1.05,y:-2}} whileTap={{scale:.96}}>
          Contact Me
        </motion.button>
      </div>

      <motion.div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', color:'var(--muted)' }}
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.1}}>
        <motion.div animate={{y:[0,7,0]}} transition={{duration:1.6,repeat:Infinity}}>
          <ArrowDown size={18}/>
        </motion.div>
      </motion.div>
    </section>
  )
}
