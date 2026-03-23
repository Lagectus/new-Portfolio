'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
type F = { name:string; email:string; subject:string; message:string }
type E = Partial<F>

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-40px' })
  const [form,setForm] = useState<F>({name:'',email:'',subject:'',message:''})
  const [errs,setErrs] = useState<E>({})
  const [loading,setLoading] = useState(false)
  const [sent,setSent] = useState(false)

  const validate = () => {
    const e:E={}
    if (!form.name.trim()||form.name.length<2) e.name='Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Valid email required'
    if (!form.subject.trim()||form.subject.length<3) e.subject='Required'
    if (!form.message.trim()||form.message.length<10) e.message='Min 10 chars'
    setErrs(e); return !Object.keys(e).length
  }
  const ch = (f:keyof F) => (ev:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setForm(p=>({...p,[f]:ev.target.value})); setErrs(p=>({...p,[f]:''}))
  }
  const submit = async (ev:React.FormEvent) => {
    ev.preventDefault(); if (!validate()) return
    setLoading(true)
    try {
      const r = await axios.post(`${API}/api/contact`,form)
      if (r.data.success) { setSent(true); setForm({name:'',email:'',subject:'',message:''}); toast.success("Sent! I'll reply within 24h 🙌") }
    } catch(err:any) { toast.error(err?.response?.data?.message||'Something went wrong.') }
    finally { setLoading(false) }
  }

  const inp = (f:keyof E) => ({
    value: form[f as keyof F],
    onChange: ch(f),
    style: {
      width:'100%', padding:'16px 20px', borderRadius:14,
      background:'var(--surface)', border:`1.5px solid ${errs[f]?'#ef4444':'var(--border)'}`,
      color:'var(--text)', fontSize:15, outline:'none',
      transition:'border-color .2s',
      fontFamily:'Inter,sans-serif',
    } as React.CSSProperties
  })

  return (
    <section id="contact" ref={ref} style={{ width:'100%', borderTop:'1px solid var(--line)' }}>
      {/* Contact form narrower but still centered */}
      <div style={{ width:'100%', maxWidth:680, margin:'0 auto', padding:'96px 40px' }}>

        <motion.div style={{ textAlign:'center', marginBottom:48 }}
          initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.55}}>
          <h2 className="display font-bold" style={{ fontSize:'clamp(2.2rem,5vw,3.5rem)', color:'var(--text)', marginBottom:8 }}>
            Get In Touch
          </h2>
          <p className="sec-label">
            <span className="grad">Lets work</span>{' '}
            <span style={{ color:'var(--muted)' }}>together</span>
          </p>
        </motion.div>

        {sent ? (
          <motion.div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'80px 0', textAlign:'center' }}
            initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}}
            transition={{type:'spring',stiffness:200}}>
            <div style={{ width:96, height:96, borderRadius:'50%', background:'rgba(34,197,94,.1)', border:'2px solid rgba(34,197,94,.3)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:28 }}>
              <CheckCircle size={40} style={{ color:'var(--green)' }}/>
            </div>
            <h3 className="display font-bold" style={{ fontSize:'1.5rem', color:'var(--text)', marginBottom:12 }}>Message sent! 🎉</h3>
            <p style={{ color:'var(--muted)', marginBottom:36 }}>I'll get back to you within 24–48 hours.</p>
            <button onClick={()=>setSent(false)} className="btn-outline">Send another</button>
          </motion.div>
        ) : (
          <motion.form onSubmit={submit}
            style={{ display:'flex', flexDirection:'column', gap:20 }}
            initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}}
            transition={{duration:.55,delay:.1}}>

            <div>
              <label style={{ display:'block', fontWeight:600, color:'var(--sub)', marginBottom:8 }}>Name</label>
              <input {...inp('name')} placeholder="full name"/>
              {errs.name && <p style={{ color:'#ef4444', fontSize:12, marginTop:4 }}>{errs.name}</p>}
            </div>

            <div>
              <label style={{ display:'block', fontWeight:600, color:'var(--sub)', marginBottom:8 }}>Email</label>
              <input type="email" {...inp('email')} placeholder="example@email.com"/>
              {errs.email && <p style={{ color:'#ef4444', fontSize:12, marginTop:4 }}>{errs.email}</p>}
            </div>

            <div>
              <label style={{ display:'block', fontWeight:600, color:'var(--sub)', marginBottom:8 }}>Service</label>
              <select {...inp('subject')} style={{ ...inp('subject').style, cursor:'pointer', appearance:'none' as any }}>
                <option value="">Select a service</option>
                <option>Full Stack Development</option>
                <option>Frontend Development</option>
                <option>Backend & API</option>
                <option>UI/UX Implementation</option>
                <option>Performance Optimization</option>
                <option>Other</option>
              </select>
              {errs.subject && <p style={{ color:'#ef4444', fontSize:12, marginTop:4 }}>{errs.subject}</p>}
            </div>

            <div>
              <label style={{ display:'block', fontWeight:600, color:'var(--sub)', marginBottom:8 }}>Message</label>
              <textarea {...inp('message')} rows={6} placeholder="" style={{ ...inp('message').style, resize:'none' }}/>
              {errs.message && <p style={{ color:'#ef4444', fontSize:12, marginTop:4 }}>{errs.message}</p>}
            </div>

            <motion.button type="submit" disabled={loading}
              className="btn-solid" style={{ marginTop:4, opacity:loading?.6:1 }}
              whileHover={!loading?{scale:1.02}:{}} whileTap={!loading?{scale:.98}:{}}>
              {loading ? <><Loader2 size={17} className="animate-spin"/> Sending…</> : 'Get in Touch'}
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
