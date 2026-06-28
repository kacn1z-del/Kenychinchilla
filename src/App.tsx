import { useState, useEffect, useRef } from 'react'
import { 
  Globe, Smartphone, Monitor, ShoppingCart, Palette, TrendingUp,
  Check, X, Star, ChevronDown, ArrowRight, Phone, Mail, MapPin,
  Menu, MessageCircle, Calculator, Users, Clock, Award
} from 'lucide-react'

// ─── TYPES ───────────────────────────────────────────────
interface FaqItem { q: string; a: string }
interface Service { icon: React.ReactNode; title: string; desc: string; price: string; color: string; features: string[] }
interface Testimonial { name: string; role: string; company: string; text: string; project: string; initial: string; gradient: string }

// ─── DATA ────────────────────────────────────────────────
const SERVICES: Service[] = [
  {
    icon: <Globe size={22} />, title: 'Diseño Web', desc: 'Sitios web únicos, rápidos y optimizados para convertir visitantes en clientes.',
    price: 'Desde $120 USD', color: 'blue',
    features: ['Diseño 100% personalizado','Hosting incluido','Dominio .com incluido','Certificado SSL','Optimización Google','Botón WhatsApp','Soporte incluido']
  },
  {
    icon: <Smartphone size={22} />, title: 'Apps Móviles', desc: 'Aplicaciones nativas para Android e iOS que se publican en las tiendas oficiales.',
    price: 'Desde $699 USD', color: 'green',
    features: ['Android y iOS','Flutter / React Native','Backend y APIs','Publicación en stores','Panel de administración','Notificaciones push','Soporte post-lanzamiento']
  },
  {
    icon: <Monitor size={22} />, title: 'Software Empresarial', desc: 'CRM, ERP y sistemas POS a medida para automatizar tu empresa.',
    price: 'Desde $999 USD', color: 'yellow',
    features: ['Windows y Linux','Gestión de inventario','Facturación electrónica','Reportes automáticos','Multi-usuario','Base de datos segura','Capacitación incluida']
  },
  {
    icon: <ShoppingCart size={22} />, title: 'Tiendas Online', desc: 'E-commerce completo con pasarela de pagos para vender 24/7.',
    price: 'Desde $499 USD', color: 'red',
    features: ['Catálogo de productos','Carrito de compras','Pagos BAC y BN','PayPal incluido','Panel admin','Gestión de pedidos','SEO integrado']
  },
  {
    icon: <Palette size={22} />, title: 'Diseño de Marca', desc: 'Identidad visual profesional que diferencia tu negocio de la competencia.',
    price: 'Consultame', color: 'purple',
    features: ['Logo profesional','Manual de marca','Paleta de colores','Tipografías','Material gráfico','Social media kit','Archivos editables']
  },
  {
    icon: <TrendingUp size={22} />, title: 'Marketing Digital', desc: 'SEO, Google Ads y Meta Ads para atraer clientes todos los días.',
    price: 'Consultame', color: 'blue',
    features: ['SEO avanzado','Google Ads','Facebook e Instagram Ads','Google Analytics','Reportes mensuales','Estrategia de contenido','Optimización continua']
  },
]

const TESTIMONIALS: Testimonial[] = [
  { name: 'Mario Quesada', role: 'CEO', company: 'Restaurantes MQ', text: 'KCN nos desarrolló el sistema POS para nuestra cadena de restaurantes. El trabajo superó nuestras expectativas. Muy profesional y siempre disponible.', project: 'Sistema POS + Inventario · San José, CR', initial: 'M', gradient: 'from-blue-500 to-green-500' },
  { name: 'Andrea Mora', role: 'Fundadora', company: 'DeliveryCR', text: 'La app de delivery transformó nuestro negocio. Las ventas aumentaron un 40% en el primer mes. Keny entiende exactamente lo que el cliente necesita.', project: 'App Delivery Android & iOS · Heredia, CR', initial: 'A', gradient: 'from-purple-500 to-pink-500' },
  { name: 'Carlos Jiménez', role: 'Dueño', company: 'TiendaTec', text: 'Nuestra tienda online quedó increíble. Profesional, rápido y con precios justos. El mejor desarrollador web de Costa Rica sin dudas.', project: 'E-commerce con pasarela de pagos · Alajuela, CR', initial: 'C', gradient: 'from-green-500 to-blue-500' },
]

const FAQS: FaqItem[] = [
  { q: '¿Cuánto tiempo tarda en estar listo mi proyecto?', a: 'Una página básica: 3 a 7 días. Sitio profesional: 1 a 2 semanas. E-commerce: 2 a 3 semanas. App móvil: 3 a 6 semanas. Siempre damos un cronograma exacto antes de empezar.' },
  { q: '¿Necesito saber de tecnología?', a: 'No. Nos encargamos de todo el proceso técnico. Solo necesitás tener clara tu idea de negocio. Te explicamos todo en lenguaje sencillo y te capacitamos para usar tu plataforma.' },
  { q: '¿Cómo puedo pagar?', a: 'Aceptamos SINPE Móvil, transferencia bancaria, PayPal y efectivo. Para proyectos grandes podemos hacer 50% al inicio y 50% al entregar.' },
  { q: '¿Puedo pedir cambios después de entregado?', a: 'Sí. Durante el período de soporte incluido en cada plan podés solicitar ajustes sin costo adicional.' },
  { q: '¿Trabajan con clientes fuera de Costa Rica?', a: 'Sí. Trabajamos con clientes en toda Latinoamérica y el mundo. Todo se maneja remotamente por WhatsApp y videollamada.' },
  { q: '¿Mi página va a aparecer en Google?', a: 'Sí. Todas las páginas incluyen SEO básico desde el día 1. Para aparecer en los primeros resultados recomendamos el Plan Profesional con SEO avanzado.' },
]

const PLANS = [
  { name: 'PYME', price: '$120', note: 'USD · Pago único', featured: false, features: ['Página web 1 página','Diseño 100% personalizado','Hosting incluido','Dominio .com incluido','Certificado SSL gratis','Optimización Google','Botón WhatsApp','Soporte 1 mes'] },
  { name: 'BÁSICO', price: '$299', note: 'USD · Pago único', featured: false, features: ['Hasta 5 páginas','Todo del plan PYME','Formulario de contacto','SEO básico','Google Analytics','Google Business Profile','Mapa de ubicación','Soporte 1 mes'] },
  { name: 'PROFESIONAL', price: '$699', note: 'USD · Pago único', featured: true, features: ['Hasta 15 páginas','Todo del plan Básico','Panel de administración','SEO avanzado','Blog integrado','Chat en vivo','Integración redes sociales','Soporte 3 meses'] },
  { name: 'ENTERPRISE', price: '$1,499', note: 'USD · Pago único', featured: false, features: ['Todo del plan Profesional','E-commerce completo','Pasarela de pagos BAC/BN','App móvil Android & iOS','Sistema POS integrado','Marketing digital 1 mes','Capacitación del equipo','Soporte 6 meses'] },
]

const TECH = ['React','Flutter','Node.js','Python','Firebase','Android','iOS','Linux','Docker','AWS','Next.js','WordPress','MySQL','PostgreSQL']

// ─── HOOKS ───────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useScrollProgress() {
  const [prog, setProg] = useState(0)
  useEffect(() => {
    const handler = () => setProg((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return prog
}

function useCounter(target: number, suffix = '') {
  const [val, setVal] = useState('0' + suffix)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let current = 0
        const inc = target / 60
        const timer = setInterval(() => {
          current = Math.min(current + inc, target)
          setVal(Math.floor(current) + suffix)
          if (current >= target) clearInterval(timer)
        }, 16)
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, suffix])
  return { val, ref }
}

// ─── COMPONENTS ──────────────────────────────────────────

function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#portafolio', label: 'Portafolio' },
    { href: '#precios', label: 'Precios' },
    { href: '#testimonios', label: 'Clientes' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-12 px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/8' : 'bg-black/80 backdrop-blur-xl'}`}>
        <a href="#" className="text-white font-bold text-[17px] tracking-tight">KCN</a>
        <ul className="hidden md:flex gap-7 list-none">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-[13px] text-white/75 hover:text-white transition-colors duration-200">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <a href="https://wa.me/50687359034" target="_blank" rel="noreferrer" className="hidden md:block text-[13px] text-blue-400 hover:text-white transition-colors">Contactar →</a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-1">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 top-12 z-40 bg-black/97 backdrop-blur-2xl flex flex-col gap-1 px-6 pt-10">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
               className="text-[22px] font-semibold text-white py-4 border-b border-white/7 block">
              {l.label}
            </a>
          ))}
          <a href="https://wa.me/50687359034" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}
             className="text-[22px] font-semibold text-green-400 py-4 mt-5 block">
            Hablar con Keny →
          </a>
        </div>
      )}
    </>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(0,113,227,0.2) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'glowPulse 8s ease-in-out infinite' }} />

      <style>{`@keyframes glowPulse{0%,100%{opacity:.3;transform:translate(-50%,-50%) scale(1)}50%{opacity:.5;transform:translate(-50%,-50%) scale(1.15)}} @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}} @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.4}}`}</style>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/6 border border-white/12 rounded-full px-4 py-1.5 text-[12px] text-white/70 font-medium mb-8">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full" style={{ animation: 'pulseDot 2s ease infinite' }} />
          Disponible para nuevos proyectos
        </div>

        <h1 className="text-[clamp(36px,8vw,88px)] font-extrabold leading-[1.02] tracking-[-0.05em] mb-6"
            style={{ animation: 'fadeUp 0.9s ease forwards 0.3s', opacity: 0 }}>
          <span className="text-white block">Desarrollamos software,</span>
          <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">apps y páginas web</span>
          <span className="text-white block">que hacen crecer empresas.</span>
        </h1>

        <p className="text-[clamp(15px,2.5vw,20px)] text-white/50 font-light mb-4 leading-relaxed"
           style={{ animation: 'fadeUp 0.9s ease forwards 0.5s', opacity: 0 }}>
          Soluciones digitales de alto impacto para negocios que quieren resultados reales.
        </p>

        <p className="text-[14px] text-blue-400 font-medium mb-12"
           style={{ animation: 'fadeUp 0.9s ease forwards 0.6s', opacity: 0 }}>
          🇨🇷 Diseñado en Costa Rica · Trabajamos con clientes en toda Latinoamérica
        </p>

        <div className="flex gap-3 justify-center flex-wrap"
             style={{ animation: 'fadeUp 0.9s ease forwards 0.7s', opacity: 0 }}>
          <a href="https://wa.me/50687359034?text=Hola%20Keny,%20quiero%20hablar%20sobre%20mi%20proyecto"
             target="_blank" rel="noreferrer"
             className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-full text-[15px] font-medium transition-all duration-200 hover:scale-[1.02] flex items-center gap-2">
            Iniciar mi proyecto <ArrowRight size={16} />
          </a>
          <a href="#portafolio"
             className="border border-blue-400/30 hover:border-blue-400/70 text-blue-400 hover:text-white px-7 py-3.5 rounded-full text-[15px] font-medium transition-all duration-200 flex items-center gap-2">
            Ver proyectos →
          </a>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const c1 = useCounter(100, '+')
  const c2 = useCounter(98, '%')
  const c3 = useCounter(10, '+')

  return (
    <div ref={c1.ref} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/7">
      {[
        { val: c1.val, label: 'Proyectos entregados', color: 'text-blue-400' },
        { val: c2.val, label: 'Clientes satisfechos', color: 'text-green-400' },
        { val: c3.val, label: 'Años de experiencia', color: 'text-purple-400' },
        { val: '24h', label: 'Respuesta garantizada', color: 'text-yellow-400' },
      ].map((s, i) => (
        <div key={i} className="bg-[#0a0a0a] py-12 px-6 text-center">
          <div className={`text-[clamp(36px,6vw,56px)] font-bold tracking-tight leading-none mb-2 ${s.color}`}>{s.val}</div>
          <div className="text-[13px] text-white/40">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

function TechStrip() {
  return (
    <div className="py-10 overflow-hidden bg-[#050505] border-y border-white/6">
      <div className="tech-track">
        {[...TECH, ...TECH].map((t, i) => (
          <span key={i} className="text-[12px] font-semibold text-white/25 uppercase tracking-[0.08em] flex-shrink-0">{t}</span>
        ))}
      </div>
    </div>
  )
}

function Logos() {
  const clients = ['Restaurantes MQ', 'DeliveryCR', 'TiendaTec', 'BoxCR Casilleros', 'Distribuidora LV', 'Consultoría RS']
  return (
    <div className="py-16 px-6 bg-[#050505] border-b border-white/6">
      <p className="text-center text-[13px] text-white/25 uppercase tracking-[0.08em] font-medium mb-10">Empresas que confían en KCN</p>
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-px bg-white/4">
        {clients.map(c => (
          <div key={c} className="bg-[#050505] px-10 py-7 hover:bg-[#111] transition-colors border border-white/4 min-w-[160px] text-center">
            <span className="text-[15px] font-bold text-white/20 hover:text-white/60 transition-colors">{c}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Portfolio() {
  const projects = [
    { tag: 'Sistema POS · Windows', title: 'Restaurantes MQ', desc: 'Punto de venta con facturación electrónica y control de inventario.', bg: 'from-[#030d1a] to-[#051528]', emoji: '🏪' },
    { tag: 'App Móvil · Android & iOS', title: 'DeliveryCR App', desc: 'Plataforma de delivery con tracking en tiempo real. +40% ventas.', bg: 'from-[#031a08] to-[#041a0a]', emoji: '🚀' },
    { tag: 'E-commerce · Web', title: 'TiendaTec Online', desc: 'Tienda online con pasarela BAC y Banco Nacional. Ventas 24/7.', bg: 'from-[#1a031a] to-[#150215]', emoji: '🛒' },
    { tag: 'ERP · Linux', title: 'GestorInventario Pro', desc: 'Sistema ERP con módulos de inventario, ventas y reportes automáticos.', bg: 'from-[#0d0d00] to-[#1a1400]', emoji: '⚙️' },
  ]

  return (
    <section id="portafolio" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">Portafolio</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-4 text-white">Proyectos reales.<br />Resultados reales.</h2>
        <p className="reveal text-[17px] text-white/40 font-light mb-16 max-w-lg">Más de 100 proyectos completados en Costa Rica y Latinoamérica.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6">
          {projects.map((p, i) => (
            <div key={i} className="reveal group relative overflow-hidden aspect-video bg-[#0a0a0a] cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${p.bg} flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-500`}>
                {p.emoji}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent translate-y-12 group-hover:translate-y-0 transition-transform duration-400 flex flex-col justify-end p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-blue-400 mb-2">{p.tag}</p>
                <h3 className="text-[20px] font-semibold text-white mb-1">{p.title}</h3>
                <p className="text-[13px] text-white/60 leading-relaxed mb-3">{p.desc}</p>
                <a href="https://wa.me/50687359034" target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-1.5 text-[13px] text-blue-400 hover:gap-3 transition-all duration-200">
                  Ver detalles <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a href="https://wa.me/50687359034?text=Quiero%20ver%20más%20proyectos" target="_blank" rel="noreferrer"
             className="border border-blue-400/30 hover:border-blue-400/70 text-blue-400 hover:text-white px-7 py-3 rounded-full text-[15px] font-medium transition-all duration-200">
            Ver más proyectos →
          </a>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const colorMap: Record<string, { icon: string; border: string; bg: string }> = {
    blue:   { icon: 'text-blue-400',   border: 'border-blue-400/20',   bg: 'bg-blue-400/10' },
    green:  { icon: 'text-green-400',  border: 'border-green-400/20',  bg: 'bg-green-400/10' },
    yellow: { icon: 'text-yellow-400', border: 'border-yellow-400/20', bg: 'bg-yellow-400/10' },
    red:    { icon: 'text-red-400',    border: 'border-red-400/20',    bg: 'bg-red-400/10' },
    purple: { icon: 'text-purple-400', border: 'border-purple-400/20', bg: 'bg-purple-400/10' },
  }

  return (
    <section id="servicios" className="py-24 bg-[#050505] border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">Servicios</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-4 text-white">Todo lo que necesitás<br />para crecer digitalmente.</h2>
        <p className="reveal text-[17px] text-white/40 font-light mb-16 max-w-lg">Desarrollamos soluciones completas desde cero — sin plantillas, sin atajos.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6">
          {SERVICES.map((s, i) => {
            const c = colorMap[s.color]
            return (
              <div key={i} className="reveal service-card-glow relative bg-[#0a0a0a] hover:bg-[#111] transition-colors duration-300 p-11"
                   onMouseMove={e => {
                     const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
                     const el = e.currentTarget as HTMLElement
                     el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%')
                     el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%')
                   }}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${c.bg} ${c.border} ${c.icon}`}>
                  {s.icon}
                </div>
                <h3 className="text-[19px] font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-[14px] text-white/40 leading-relaxed mb-5">{s.desc}</p>
                <p className="text-[22px] font-bold text-white mb-5">{s.price}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] text-white/40">
                      <span className="text-green-400 mt-0.5 flex-shrink-0"><Check size={13} /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/50687359034?text=Quiero%20cotizar%20${encodeURIComponent(s.title)}`}
                   target="_blank" rel="noreferrer"
                   className={`inline-flex items-center gap-1.5 text-[13px] ${c.icon} hover:gap-3 transition-all duration-200`}>
                  Solicitar cotización <ArrowRight size={13} />
                </a>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center gap-3 mt-12 flex-wrap">
          <a href="https://wa.me/50687359034?text=Quiero%20agendar%20una%20videollamada" target="_blank" rel="noreferrer"
             className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3 rounded-full text-[15px] font-medium transition-all duration-200">
            Agendar videollamada gratis
          </a>
          <a href="#precios" className="border border-white/15 hover:border-white/40 text-white/70 hover:text-white px-7 py-3 rounded-full text-[15px] font-medium transition-all duration-200">
            Ver precios →
          </a>
        </div>
      </div>
    </section>
  )
}

function WhyKCN() {
  const others = [
    { text: 'Plantillas genéricas', sub: 'Tu página se parece a miles de otras' },
    { text: 'Soporte limitado', sub: 'Responden en días o no responden' },
    { text: 'Solo hacen páginas web', sub: 'Sin apps ni software' },
    { text: 'Cargos mensuales', sub: 'Pagás siempre aunque no quieras' },
    { text: 'Velocidad mediocre', sub: 'Sitios lentos que pierden clientes' },
  ]
  const kcn = [
    { text: 'Diseño 100% personalizado', sub: 'Único para tu negocio, nadie más lo tiene' },
    { text: 'Soporte en minutos', sub: 'Respondemos por WhatsApp en menos de 5 min' },
    { text: 'Web + Apps + Software', sub: 'Todo en un solo lugar, sin intermediarios' },
    { text: 'Pago único', sub: 'Sin mensualidades sorpresa' },
    { text: 'Optimización máxima', sub: 'Velocidad A+ y SEO desde el día 1' },
  ]

  return (
    <section className="py-24 bg-black border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">Diferencia</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-4 text-white">¿Por qué elegir KCN?</h2>
        <p className="reveal text-[17px] text-white/40 font-light mb-16 max-w-lg">No usamos plantillas. No tercerizamos. Todo lo hacemos nosotros.</p>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6">
          <div className="bg-[#0a0a0a] p-12">
            <p className="text-[12px] font-bold text-red-400 uppercase tracking-[0.1em] mb-7 pb-4 border-b border-white/8">✕ Otros proveedores</p>
            <div className="space-y-0">
              {others.map((o, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0">
                  <X size={16} className="text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[15px] font-medium text-white mb-1">{o.text}</p>
                    <p className="text-[13px] text-white/35">{o.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#070d14] p-12">
            <p className="text-[12px] font-bold text-green-400 uppercase tracking-[0.1em] mb-7 pb-4 border-b border-white/8">✓ KCN · Keny Chinchilla</p>
            <div className="space-y-0">
              {kcn.map((k, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0">
                  <Check size={16} className="text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[15px] font-medium text-white mb-1">{k.text}</p>
                    <p className="text-[13px] text-white/35">{k.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <a href="https://wa.me/50687359034?text=Quiero%20una%20cotización%20personalizada" target="_blank" rel="noreferrer"
             className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3 rounded-full text-[15px] font-medium transition-all">
            Solicitar cotización →
          </a>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-[#050505] border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">Clientes</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-4 text-white">Lo que dicen<br />nuestros clientes.</h2>
        <p className="reveal text-[17px] text-white/40 font-light mb-16 max-w-lg">Más de 100 proyectos completados. 98% de satisfacción.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="reveal bg-[#0a0a0a] p-9">
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, j) => <Star key={j} size={13} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-[15px] text-white/80 leading-[1.7] mb-6 font-light italic">"{t.text}"</p>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-[14px] font-bold text-black`}>
                  {t.initial}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">{t.name}</p>
                  <p className="text-[12px] text-white/40">{t.role} · {t.company}</p>
                </div>
              </div>
              <div className="bg-white/3 rounded-lg p-3 border border-white/6">
                <p className="text-[11px] text-white/30 uppercase tracking-[0.05em] mb-1 font-medium">Proyecto</p>
                <p className="text-[13px] text-blue-400">{t.project}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    { num: '01', title: 'Consulta gratuita', desc: 'Hablamos por WhatsApp o videollamada. Entendemos tu idea, definimos el alcance y entregamos cotización en 24 horas.' },
    { num: '02', title: 'Diseño y aprobación', desc: 'Creamos el diseño visual completo. Vos aprobás antes de que empecemos a programar. Sin sorpresas.' },
    { num: '03', title: 'Desarrollo ágil', desc: 'Programamos con las mejores tecnologías. Entregas parciales para que siempre sepas cómo va tu proyecto.' },
    { num: '04', title: 'Lanzamiento y soporte', desc: 'Publicamos, te capacitamos y te acompañamos con soporte post-lanzamiento incluido en todos los planes.' },
  ]

  return (
    <section id="proceso" className="py-24 bg-black border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">Proceso</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-16 text-white">Simple, claro<br />y sin sorpresas.</h2>

        <div className="border-t border-white/8">
          {steps.map((s, i) => (
            <div key={i} className="reveal grid grid-cols-[72px_1fr_1fr] md:grid-cols-[80px_1fr_1fr] gap-8 py-9 border-b border-white/8 items-start group">
              <span className="text-[44px] font-bold text-white/8 group-hover:text-white/15 transition-colors leading-none tracking-tight">{s.num}</span>
              <h3 className="text-[20px] font-semibold text-white tracking-tight">{s.title}</h3>
              <p className="text-[14px] text-white/40 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a href="https://wa.me/50687359034?text=Quiero%20agendar%20una%20videollamada%20gratis" target="_blank" rel="noreferrer"
             className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3 rounded-full text-[15px] font-medium transition-all">
            Agendar videollamada →
          </a>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="precios" className="py-24 bg-[#050505] border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">Precios</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-4 text-white">Transparentes.<br />Sin letra chica.</h2>
        <p className="reveal text-[17px] text-white/40 font-light mb-16 max-w-lg">Pago único. Sin mensualidades. SINPE · PayPal · Transferencia · Efectivo.</p>

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
          {PLANS.map((p, i) => (
            <div key={i} className={`flex flex-col p-9 ${p.featured ? 'bg-[#070d14]' : 'bg-[#0a0a0a]'}`}>
              {p.featured && (
                <span className="bg-blue-600 text-white text-[11px] font-semibold uppercase tracking-[0.05em] px-3 py-1 rounded-full mb-5 w-fit">
                  Más popular
                </span>
              )}
              <p className="text-[12px] font-semibold text-blue-400 uppercase tracking-[0.08em] mb-3">{p.name}</p>
              <p className="text-[44px] font-bold text-white tracking-tight leading-none mb-1">{p.price}</p>
              <p className="text-[12px] text-white/30 mb-6">{p.note}</p>
              <ul className="flex-1 space-y-2.5 mb-7">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-[13px] text-white/40">
                    <Check size={13} className="text-green-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={`https://wa.me/50687359034?text=Me%20interesa%20el%20${encodeURIComponent(p.name)}%20${p.price}`}
                 target="_blank" rel="noreferrer"
                 className={`block text-center py-3 rounded-full text-[14px] font-medium transition-all ${p.featured ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'border border-white/15 hover:border-white/40 text-white/70 hover:text-white'}`}>
                Empezar →
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-12 flex-wrap">
          <a href="https://wa.me/50687359034?text=Quiero%20una%20cotización%20personalizada" target="_blank" rel="noreferrer"
             className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3 rounded-full text-[15px] font-medium transition-all">
            Cotización personalizada →
          </a>
          <a href="https://wa.me/50687359034?text=Tengo%20dudas%20sobre%20los%20precios" target="_blank" rel="noreferrer"
             className="border border-white/15 hover:border-white/40 text-white/70 hover:text-white px-7 py-3 rounded-full text-[15px] font-medium transition-all">
            Tengo dudas →
          </a>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-black border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">FAQ</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-16 text-white">Preguntas frecuentes.</h2>

        <div className="border-t border-white/8">
          {FAQS.map((f, i) => (
            <div key={i} className="reveal border-b border-white/8">
              <button onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex justify-between items-center gap-4 py-6 text-left group">
                <span className="text-[17px] font-medium text-white group-hover:text-white/70 transition-colors">{f.q}</span>
                <ChevronDown size={20} className={`text-white/30 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${open === i ? 'max-h-60 pb-6' : 'max-h-0'}`}>
                <p className="text-[15px] text-white/40 leading-[1.7]">{f.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a href="https://wa.me/50687359034?text=Tengo%20una%20pregunta%20antes%20de%20contratar" target="_blank" rel="noreferrer"
             className="border border-white/15 hover:border-white/40 text-white/70 hover:text-white px-7 py-3 rounded-full text-[15px] font-medium transition-all">
            Tengo más preguntas →
          </a>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="py-40 text-center bg-black border-t border-white/6 relative overflow-hidden">
      <div className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(0,113,227,0.12) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h2 className="reveal text-[clamp(32px,7vw,68px)] font-bold tracking-tight leading-[1.05] mb-5 text-white">
          ¿Listo para llevar tu<br />empresa al siguiente nivel?
        </h2>
        <p className="reveal text-[19px] text-white/40 font-light mb-3">Agendá una consulta gratuita de 30 minutos.</p>
        <p className="reveal text-[14px] text-white/25 mb-12">Sin compromiso. Keny responde en menos de 5 minutos.</p>
        <div className="reveal flex gap-3 justify-center flex-wrap">
          <a href="https://wa.me/50687359034?text=Hola%20Keny,%20quiero%20agendar%20una%20consulta%20gratuita%20de%2030%20minutos"
             target="_blank" rel="noreferrer"
             className="bg-blue-600 hover:bg-blue-500 text-white px-9 py-4 rounded-full text-[17px] font-medium transition-all hover:scale-[1.02] flex items-center gap-2">
            Agendar consulta gratuita <ArrowRight size={18} />
          </a>
          <a href="tel:+50687359034"
             className="border border-white/15 hover:border-white/40 text-white/70 hover:text-white px-9 py-4 rounded-full text-[17px] font-medium transition-all flex items-center gap-2">
            <Phone size={18} /> 8735-9034
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const cols = [
    { title: 'Servicios', links: [['#servicios','Diseño Web'],['#servicios','Apps Móviles'],['#servicios','Software'],['#servicios','Tiendas Online'],['#servicios','Marketing Digital']] },
    { title: 'Empresa', links: [['#portafolio','Portafolio'],['#precios','Precios'],['#testimonios','Clientes'],['#proceso','Proceso'],['#faq','FAQ']] },
    { title: 'Contacto', links: [['https://wa.me/50687359034','WhatsApp'],['mailto:kchinchilla.pos@gmail.com','Email'],['https://www.instagram.com/kenneth_chinchilla','Instagram'],['https://github.com/kacn1z-del','GitHub'],['https://www.facebook.com/kenneth.chinchilla','Facebook']] },
  ]

  return (
    <footer className="bg-[#080808] border-t border-white/8 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="text-[18px] font-bold text-white mb-3">KCN</p>
            <p className="text-[13px] text-white/30 leading-relaxed mb-5">Desarrollamos software, apps y páginas web que hacen crecer empresas. Diseñado en Costa Rica para el mundo.</p>
            <div className="space-y-1">
              {[
                { icon: <Mail size={13} />, text: 'kchinchilla.pos@gmail.com' },
                { icon: <Phone size={13} />, text: '+506 8735-9034' },
                { icon: <MapPin size={13} />, text: 'San José, Costa Rica' },
              ].map((item, i) => (
                <p key={i} className="flex items-center gap-2 text-[13px] text-white/25">
                  {item.icon} {item.text}
                </p>
              ))}
            </div>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <p className="text-[12px] font-semibold text-white uppercase tracking-[0.05em] mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map(([href, label], j) => (
                  <li key={j}>
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                       className="text-[13px] text-white/30 hover:text-white transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/6 pt-6 flex justify-between items-center flex-wrap gap-3">
          <p className="text-[12px] text-white/20">© 2026 KCN · Keny Chinchilla Navarro · Costa Rica · kenychinchilla.com</p>
          <div className="flex gap-4">
            {[['https://wa.me/50687359034','WhatsApp'],['https://www.instagram.com/kenneth_chinchilla','Instagram'],['mailto:kchinchilla.pos@gmail.com','Email']].map(([href, label]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                 className="text-[12px] text-white/20 hover:text-white transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function WaButton() {
  return (
    <a href="https://wa.me/50687359034" target="_blank" rel="noreferrer"
       className="fixed bottom-7 right-7 z-50 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110"
       style={{ width: 52, height: 52 }}>
      <MessageCircle size={26} className="text-white" />
    </a>
  )
}

function ExitPopup() {
  const [show, setShow] = useState(false)
  const shown = useRef(false)

  useEffect(() => {
    const handleLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown.current && !sessionStorage.getItem('kcn_exit')) {
        shown.current = true
        setShow(true)
      }
    }
    const timer = setTimeout(() => {
      if (!shown.current && !sessionStorage.getItem('kcn_exit')) {
        shown.current = true
        setShow(true)
      }
    }, 45000)
    document.addEventListener('mouseleave', handleLeave)
    return () => { document.removeEventListener('mouseleave', handleLeave); clearTimeout(timer) }
  }, [])

  const close = () => { setShow(false); sessionStorage.setItem('kcn_exit', '1') }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/88 backdrop-blur-xl flex items-center justify-center px-6">
      <div className="bg-[#111] border border-white/10 rounded-3xl p-12 max-w-sm w-full text-center relative">
        <button onClick={close} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">✕</button>
        <p className="text-4xl mb-4">👋</p>
        <h3 className="text-2xl font-bold tracking-tight text-white mb-3">¡Antes de irte!</h3>
        <p className="text-[15px] text-white/40 leading-relaxed mb-7">Tenés una consulta <strong className="text-white">gratis de 30 minutos</strong> esperándote. Sin compromiso.</p>
        <a href="https://wa.me/50687359034?text=Hola%20Keny,%20quiero%20mi%20consulta%20gratuita%20de%2030%20minutos"
           target="_blank" rel="noreferrer" onClick={close}
           className="block bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-full text-[15px] font-medium mb-3 transition-all">
          Quiero mi consulta gratis →
        </a>
        <button onClick={close} className="text-[13px] text-white/25 hover:text-white/50 transition-colors">No gracias</button>
      </div>
    </div>
  )
}

// ─── APP ─────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const prog = useScrollProgress()
  useReveal()

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="fixed top-12 left-0 h-[2px] bg-blue-400 z-[9998] transition-all duration-100"
           style={{ width: prog + '%' }} />
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Stats />
      <TechStrip />
      <Logos />
      <Portfolio />
      <Services />
      <WhyKCN />
      <Testimonials />
      <Process />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WaButton />
      <ExitPopup />
    </div>
  )
}
