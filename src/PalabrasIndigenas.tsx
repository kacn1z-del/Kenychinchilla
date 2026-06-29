import { useState, useEffect } from 'react'
import { initializeApp, getApps } from 'firebase/app'
import {
  getFirestore, collection, addDoc, onSnapshot,
  updateDoc, doc, serverTimestamp, query, orderBy, Timestamp
} from 'firebase/firestore'
import { Heart, CheckCircle, Send, Globe } from 'lucide-react'

// ─── FIREBASE CONFIG ────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCtSnVv5N92ongrIAKpUA5lPDOur6Cqd0o",
  authDomain: "keny-chinchilla.firebaseapp.com",
  projectId: "keny-chinchilla",
  storageBucket: "keny-chinchilla.firebasestorage.app",
  messagingSenderId: "1092421427289",
  appId: "1:1092421427289:web:b15f6e6d72ab80d348d148",
  measurementId: "G-RPG0XTZ5WZ"
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

// ─── TYPES ──────────────────────────────────────────────
interface Palabra {
  id: string
  palabraEspanol: string
  palabraIndigena: string
  lengua: string
  autor: string
  contexto: string
  votos: number
  votantes: string[]
  timestamp: Timestamp | null
}

const LENGUAS = [
  { key: 'Bribri',   color: 'text-green-400',  bg: 'bg-green-400/10',  border: 'border-green-400/20' },
  { key: 'Cabécar',  color: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/20' },
  { key: 'Ngöbe',    color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
  { key: 'Maléku',   color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  { key: 'Térraba',  color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
  { key: 'Brunca',   color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/20' },
  { key: 'Mekatelyu',color: 'text-pink-400',   bg: 'bg-pink-400/10',   border: 'border-pink-400/20' },
  { key: 'Chorotega',color: 'text-cyan-400',   bg: 'bg-cyan-400/10',   border: 'border-cyan-400/20' },
]

function getLenguaStyle(lengua: string) {
  return LENGUAS.find(l => l.key === lengua) ?? { color: 'text-white/60', bg: 'bg-white/5', border: 'border-white/10' }
}

// Genera un ID anónimo por sesión para no votar dos veces
function getVoterId(): string {
  let id = sessionStorage.getItem('kcn_voter_id')
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem('kcn_voter_id', id)
  }
  return id
}

const VOTOS_VALIDADA = 5

export default function PalabrasIndigenas() {
  const [palabras, setPalabras] = useState<Palabra[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroLengua, setFiltroLengua] = useState('Todas')
  const [showForm, setShowForm] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [exito, setExito] = useState(false)
  const voterId = getVoterId()

  const [form, setForm] = useState({
    palabraEspanol: '',
    palabraIndigena: '',
    lengua: 'Bribri',
    autor: '',
    contexto: '',
  })

  // ── Escuchar Firestore en tiempo real ──
  useEffect(() => {
    const q = query(collection(db, 'palabras_indigenas'), orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, snap => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Palabra))
      setPalabras(data)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  // ── Enviar nueva palabra ──
  async function handleSubmit() {
    if (!form.palabraEspanol.trim() || !form.palabraIndigena.trim() || !form.autor.trim()) return
    setEnviando(true)
    try {
      await addDoc(collection(db, 'palabras_indigenas'), {
        ...form,
        votos: 0,
        votantes: [],
        timestamp: serverTimestamp(),
      })
      setForm({ palabraEspanol: '', palabraIndigena: '', lengua: 'Bribri', autor: '', contexto: '' })
      setExito(true)
      setShowForm(false)
      setTimeout(() => setExito(false), 4000)
    } catch (e) {
      console.error(e)
    }
    setEnviando(false)
  }

  // ── Votar ──
  async function handleVotar(p: Palabra) {
    if (p.votantes?.includes(voterId)) return
    const ref = doc(db, 'palabras_indigenas', p.id)
    await updateDoc(ref, {
      votos: (p.votos || 0) + 1,
      votantes: [...(p.votantes || []), voterId],
    })
  }

  const filtradas = filtroLengua === 'Todas' ? palabras : palabras.filter(p => p.lengua === filtroLengua)
  const validadas = filtradas.filter(p => (p.votos || 0) >= VOTOS_VALIDADA)
  const enRevision = filtradas.filter(p => (p.votos || 0) < VOTOS_VALIDADA)

  return (
    <section id="lenguas" className="py-24 bg-[#030803] border-t border-green-500/10">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="reveal mb-16">
          <p className="text-[12px] font-semibold text-green-400 uppercase tracking-[0.1em] mb-4">
            🌿 Lenguas Vivas
          </p>
          <h2 className="text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-4 text-white">
            Palabras de nuestra tierra.<br />
            <span className="text-green-400">Aportadas por la comunidad.</span>
          </h2>
          <p className="text-[17px] text-white/40 font-light max-w-xl">
            Las lenguas indígenas de Costa Rica son patrimonio vivo. Ayudanos a preservarlas — aportá palabras en tu idioma y validá los aportes de otros.
          </p>
        </div>

        {/* Stats */}
        <div className="reveal grid grid-cols-3 gap-px bg-white/5 mb-12">
          {[
            { val: palabras.length, label: 'Palabras aportadas', color: 'text-green-400' },
            { val: validadas.length, label: 'Validadas por la comunidad', color: 'text-blue-400' },
            { val: LENGUAS.length, label: 'Lenguas representadas', color: 'text-purple-400' },
          ].map((s, i) => (
            <div key={i} className="bg-[#0a0a0a] py-8 px-4 text-center">
              <div className={`text-[36px] font-bold tracking-tight leading-none mb-1 ${s.color}`}>{s.val}</div>
              <div className="text-[12px] text-white/30">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filtros + Botón aportar */}
        <div className="reveal flex flex-wrap gap-2 mb-8 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['Todas', ...LENGUAS.map(l => l.key)].map(l => (
              <button
                key={l}
                onClick={() => setFiltroLengua(l)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border ${
                  filtroLengua === l
                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                    : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-full text-[14px] font-medium transition-all"
          >
            <Globe size={15} />
            Aportar palabra
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="reveal bg-[#0a140a] border border-green-500/20 rounded-2xl p-8 mb-10">
            <h3 className="text-[18px] font-semibold text-white mb-6 flex items-center gap-2">
              🌿 Aportar una palabra
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[12px] text-white/40 font-medium mb-1.5 block">Palabra en Español *</label>
                <input
                  value={form.palabraEspanol}
                  onChange={e => setForm({ ...form, palabraEspanol: e.target.value })}
                  placeholder="ej: Agua"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-[12px] text-white/40 font-medium mb-1.5 block">Palabra en tu lengua *</label>
                <input
                  value={form.palabraIndigena}
                  onChange={e => setForm({ ...form, palabraIndigena: e.target.value })}
                  placeholder="ej: Aba"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-[12px] text-white/40 font-medium mb-1.5 block">Tu lengua *</label>
                <select
                  value={form.lengua}
                  onChange={e => setForm({ ...form, lengua: e.target.value })}
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white focus:outline-none focus:border-green-500/50 transition-colors"
                >
                  {LENGUAS.map(l => <option key={l.key} value={l.key}>{l.key}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[12px] text-white/40 font-medium mb-1.5 block">Tu nombre o comunidad *</label>
                <input
                  value={form.autor}
                  onChange={e => setForm({ ...form, autor: e.target.value })}
                  placeholder="ej: María, Comunidad Amubri"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-colors"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="text-[12px] text-white/40 font-medium mb-1.5 block">Contexto o uso (opcional)</label>
              <input
                value={form.contexto}
                onChange={e => setForm({ ...form, contexto: e.target.value })}
                placeholder="ej: Se usa para saludar en la mañana"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={enviando || !form.palabraEspanol || !form.palabraIndigena || !form.autor}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full text-[14px] font-medium transition-all"
              >
                <Send size={15} />
                {enviando ? 'Enviando...' : 'Publicar palabra'}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="border border-white/10 hover:border-white/30 text-white/50 hover:text-white px-6 py-3 rounded-full text-[14px] transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Éxito */}
        {exito && (
          <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-4 mb-8 flex items-center gap-3">
            <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
            <p className="text-[15px] text-green-300">¡Palabra publicada! La comunidad puede validarla ahora.</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-[14px] text-white/30">Cargando palabras...</p>
          </div>
        )}

        {/* Palabras validadas */}
        {!loading && validadas.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle size={18} className="text-green-400" />
              <h3 className="text-[16px] font-semibold text-white">Validadas por la comunidad</h3>
              <span className="bg-green-500/20 text-green-400 text-[11px] font-bold px-2.5 py-1 rounded-full border border-green-500/20">
                {validadas.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {validadas.map(p => (
                <PalabraCard key={p.id} p={p} voterId={voterId} onVotar={handleVotar} validada />
              ))}
            </div>
          </div>
        )}

        {/* En revisión */}
        {!loading && enRevision.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-4 h-4 rounded-full border-2 border-white/20 flex-shrink-0" />
              <h3 className="text-[16px] font-semibold text-white/60">En revisión · Necesitan validación</h3>
              <span className="bg-white/5 text-white/30 text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                {enRevision.length}
              </span>
            </div>
            <p className="text-[13px] text-white/25 mb-6">
              Con {VOTOS_VALIDADA} validaciones de la comunidad, la palabra recibe el sello ✅
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {enRevision.map(p => (
                <PalabraCard key={p.id} p={p} voterId={voterId} onVotar={handleVotar} validada={false} />
              ))}
            </div>
          </div>
        )}

        {!loading && palabras.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <p className="text-5xl mb-4">🌿</p>
            <p className="text-[18px] font-semibold text-white mb-2">Sé el primero en aportar</p>
            <p className="text-[14px] text-white/30 mb-6">Compartí una palabra en tu lengua indígena</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full text-[14px] font-medium transition-all"
            >
              Aportar primera palabra
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── CARD ───────────────────────────────────────────────
function PalabraCard({ p, voterId, onVotar, validada }: {
  p: Palabra
  voterId: string
  onVotar: (p: Palabra) => void
  validada: boolean
}) {
  const style = getLenguaStyle(p.lengua)
  const yaVote = p.votantes?.includes(voterId)
  const progreso = Math.min(((p.votos || 0) / VOTOS_VALIDADA) * 100, 100)

  return (
    <div className={`bg-[#0a0a0a] hover:bg-[#111] transition-colors p-7 flex flex-col gap-4 ${validada ? 'border-l-2 border-green-500/40' : ''}`}>
      {/* Lengua badge */}
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full border ${style.bg} ${style.border} ${style.color}`}>
          {p.lengua}
        </span>
        {validada && (
          <span className="flex items-center gap-1 text-[11px] text-green-400 font-semibold">
            <CheckCircle size={13} /> Validada
          </span>
        )}
      </div>

      {/* Palabras */}
      <div>
        <p className="text-[28px] font-bold text-white tracking-tight leading-none mb-1">{p.palabraIndigena}</p>
        <p className="text-[15px] text-white/40">{p.palabraEspanol}</p>
      </div>

      {/* Contexto */}
      {p.contexto && (
        <p className="text-[13px] text-white/30 italic leading-relaxed">"{p.contexto}"</p>
      )}

      {/* Autor */}
      <p className="text-[12px] text-white/25">— {p.autor}</p>

      {/* Progreso + votar */}
      <div className="mt-auto pt-2 border-t border-white/5">
        {!validada && (
          <div className="mb-3">
            <div className="flex justify-between text-[11px] text-white/25 mb-1">
              <span>Validaciones</span>
              <span>{p.votos || 0} / {VOTOS_VALIDADA}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: progreso + '%' }}
              />
            </div>
          </div>
        )}
        <button
          onClick={() => onVotar(p)}
          disabled={yaVote || validada}
          className={`flex items-center gap-2 text-[13px] font-medium transition-all px-4 py-2 rounded-full border ${
            yaVote || validada
              ? 'border-white/5 text-white/20 cursor-default'
              : 'border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/60'
          }`}
        >
          <Heart size={13} className={yaVote ? 'fill-green-400/30' : ''} />
          {yaVote ? 'Ya validaste' : validada ? '✅ Validada' : 'Validar esta palabra'}
          {!validada && !yaVote && <span className="text-white/20">({p.votos || 0})</span>}
        </button>
      </div>
    </div>
  )
}
