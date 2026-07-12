import { useEffect, useRef, useState } from 'react'

// Le decimos a TypeScript que "paypal" existe en window,
// porque lo carga un script externo, no un import normal.
declare global {
  interface Window {
    paypal?: any
  }
}

export default function PaymentSection() {
  const [monto, setMonto] = useState('')
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'exito' | 'error' } | null>(null)
  const [sdkListo, setSdkListo] = useState(false)
  const contenedorBotonRef = useRef<HTMLDivElement>(null)
  const montoRef = useRef(monto)
  montoRef.current = monto

  // Carga el SDK de PayPal una sola vez
  useEffect(() => {
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID

    if (!clientId) {
      console.error('Falta configurar VITE_PAYPAL_CLIENT_ID')
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
    script.onload = () => setSdkListo(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Renderiza el botón una vez el SDK está listo
  useEffect(() => {
    if (!sdkListo || !window.paypal || !contenedorBotonRef.current) return

    contenedorBotonRef.current.innerHTML = ''

    window.paypal
      .Buttons({
        style: { color: 'black', shape: 'rect', label: 'pay' },

        createOrder: (_data: any, actions: any) => {
          const valor = parseFloat(montoRef.current)
          if (!valor || valor <= 0) {
            setMensaje({ texto: 'Escribe un monto válido antes de pagar.', tipo: 'error' })
            return Promise.reject(new Error('Monto inválido'))
          }
          setMensaje(null)
          return actions.order.create({
            purchase_units: [
              {
                description: 'Servicio KCN Studio',
                amount: { value: valor.toFixed(2) },
              },
            ],
          })
        },

        onApprove: (_data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            setMensaje({
              texto: `¡Pago recibido! Gracias, ${details.payer.name.given_name}.`,
              tipo: 'exito',
            })
          })
        },

        onError: (err: unknown) => {
          console.error(err)
          setMensaje({ texto: 'Ocurrió un error al procesar el pago. Intenta de nuevo.', tipo: 'error' })
        },
      })
      .render(contenedorBotonRef.current)
  }, [sdkListo])

  return (
    <section id="pago" className="py-24 bg-apple-dark border-t border-white/6">
      <div className="max-w-md mx-auto px-6 p-8 rounded-2xl bg-[#111] border border-white/8">
        <h3 className="text-xl font-semibold mb-2 text-white">Realizar pago</h3>
        <p className="text-white/50 text-sm mb-6">
          Escribe el monto acordado y paga de forma segura con PayPal.
        </p>

        <label htmlFor="monto-pago" className="block text-sm text-white/70 mb-2">
          Monto a pagar (USD)
        </label>
        <input
          id="monto-pago"
          type="number"
          min="1"
          step="0.01"
          placeholder="Ej: 150.00"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white mb-5 outline-none focus:border-white/30"
        />

        <div ref={contenedorBotonRef} />

        {mensaje && (
          <p className={`mt-4 text-sm ${mensaje.tipo === 'exito' ? 'text-green-400' : 'text-red-400'}`}>
            {mensaje.texto}
          </p>
        )}
      </div>
    </section>
  )
}
