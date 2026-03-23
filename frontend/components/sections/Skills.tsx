'use client'
import { motion } from 'framer-motion'
import { Code2, Globe, Cpu, Database, Layers, GitBranch } from 'lucide-react'

const services = [
  { icon:Code2,     title:'Frontend Development',      desc:'From design to pixel-perfect code, I build responsive, animated frontends using React.js, Next.js, Tailwind CSS, and Framer Motion that deliver exceptional user experiences.' },
  { icon:Globe,     title:'Full Stack Web Apps',        desc:'End-to-end web application development covering both frontend and backend — REST APIs, authentication, database design, and seamless deployment.' },
  { icon:Database,  title:'Backend & API Development',  desc:'Scalable Node.js/Express backends with MongoDB, JWT authentication, REST API design, and server-side logic built for performance and security.' },
  { icon:Layers,    title:'UI/UX Implementation',       desc:'I translate Figma designs into production-ready code with smooth animations, micro-interactions, and an eye for detail that elevates the user experience.' },
  { icon:Cpu,       title:'Performance Optimization',   desc:'From lazy loading to code splitting, I optimize web apps for speed, Core Web Vitals, and SEO — ensuring fast, accessible experiences on any device.' },
  { icon:GitBranch, title:'Deployment & DevOps',        desc:'CI/CD pipelines, Vercel deployments, Git workflows, and production-ready release management to keep your product running smoothly.' },
]

const techList = ['React','Next.js','TypeScript','Node.js','MongoDB','Tailwind','GSAP','Framer Motion','Express','Redux','Vercel','Git','REST API','JWT']

export default function Skills() {
  return (
    <section id="skills" style={{ width:'100%', borderTop:'1px solid var(--line)' }}>
      <div className="sec-wrap" style={{ paddingTop:96, paddingBottom:96 }}>

        <motion.div style={{ textAlign:'center', marginBottom:56 }}
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:.55}}>
          <h2 className="display font-bold" style={{ fontSize:'clamp(2.2rem,5vw,3.5rem)', color:'var(--text)', marginBottom:8 }}>
            What I do
          </h2>
          <p className="sec-label">
            <span className="grad">My</span>{' '}
            <span style={{ color:'var(--muted)' }}>Services</span>
          </p>
        </motion.div>

        {/* 3-col grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:24, marginBottom:56 }}>
          {services.map((s,i) => (
            <motion.div key={s.title} className="card" style={{ padding:28 }}
              initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}}
              transition={{duration:.5,delay:i*.08,ease:[.16,1,.3,1]}}>
              <div className="icon-box" style={{ marginBottom:20 }}>
                <s.icon size={22} style={{ color:'var(--teal)' }}/>
              </div>
              <h3 className="display font-semibold" style={{ fontSize:16, color:'var(--text)', marginBottom:12, lineHeight:1.4 }}>
                {s.title}
              </h3>
              <p style={{ color:'var(--muted)', fontSize:14, lineHeight:1.7 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div style={{ overflow:'hidden', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', padding:'16px 0' }}>
          <style>{`@keyframes mqs2{from{transform:translateX(0)}to{transform:translateX(-50%)}} .mqs2{animation:mqs2 28s linear infinite}`}</style>
          <div className="mqs2" style={{ display:'flex', gap:12, width:'max-content' }}>
            {[...techList,...techList].map((t,i) => (
              <span key={i} className="tag" style={{ flexShrink:0 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
