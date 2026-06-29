import { useState, useEffect, useRef } from 'react'
import PalabrasIndigenas from './PalabrasIndigenas'

const KCN_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAYAAAB99ePgAAAKGUlEQVR42s1Ye3BU1Rn/nXPv7r13H9nNJtkkazYkISRhgUAE5SVuhIodtGrVjdpKqKLo2Nah0o62M7pZh06hrY7vSp3xATpqFqu2TisaigEURsTyMOFRXiGEEDa72ez73r33nv6xGCNJGOz44Js5c87eveee3/l9j/N9h2AT44teetTPpWILEI+mdShpgANlhGFICAjPpyilqq7IeeANSUKNGiVMh9GYABgAHQAFdALkRtBBwSjAMUZwlqjpZCHTNKPBktfLdI3TlIxLF8wlmtW2gy74wf19zdOSpOTWRzbpfSe6lCN7/dFj27rwPYrZXOWUZs5fLhSUzS3wzPaRonm3/SK05ZWncwQRQNfJqDNbQM70bGh8vtIZ/PJ9j4+hM0jg8TG0gKEpSIfGJKetolk/XWKonLQ0N8HXygFfc8FvRwiWrTEAQMnC+14E/H6KC0p8HBgjeRPmX4oLUHJkGStr6AUILhclOD7JnUv/Xv8mvgIVtKurXf+OmWOg1jLynRo7QHw+HwGAYDCoD7E0EpwOY2XNKOAYAQhzzbjObamee62aDg8ceWf1GwC073ATDNa6Av7sf7zeFq69Haq5cOJ8es1vntYPbNHN76xuSwKnhyb+H4tVV1fnSZJtXGFh4URNVjJ94f4DHKcd7ezsVM7tGcOk/UyvEZKNqlBVwRqxnh8gcq5YyRhfLcvxRCYTO6FTuh/g45JUlDds7llfo2xMb1U1RnhF5amiUjIcnK+V87WyXPO1cvD5OF8r40A5BsoxMEa9fj8/bEECAJKqp0Kq9O6+Pvn3W7du/K/FQpOSpGljbBKQYw5+TB40DVRWwOQMpwL8GWAUwSYtGPzqq8Hc6cQDUEGI3g7oIAR4+GGKQIABALOYCRuI/ENL6YVlRWXj02lDxGBQzxFQOH5scLJMhFQaciJhGgTy/IydDhCilc++9yZT7fzFnM2ppfasD0X2ffSB64r7bsjabNNVm0XWSayfnvxsw+Dalc8NBAKD8Hp5bN2qhjv+A+eNy7NimV2QO7baJVE8qfWlpTHjHI/omOB0VWXGZBIsoyiiIGgBQvTy+sWLixruWCtVT8fgkW1Qo1rW8+OXlmkVkxG1AaoFSEkMArnsCsekac22nR/85Fjrmt0AYJ8xcyKx0okctFP1bW17WoHsnNlXWsYkR+cNI731jFMwVSaGRBRMVrSYLB+pmHLXte6L71wr2acjvuvDcP/mJ/Zc3PjoPORVsfCJTkL379tlMGYGLS7n1KSn3q4uvNHjkMN+z6dVy7UVK18dqBt/qZZvYIKeGkgt8Iyf8cIrfsOn4b0gBGCj+Bs1qGMxR4imqvzgINMSiaTbffV9nrplq2zmGSxy6GN59/vL7vde8tjvSoUqvufYtlT37keX9+x/83kAcEF02x98dg13oqQ+vO65x/MfeLwtNG/uBJIKwRTqRtplL8nMmvFDaNnZQnJdA3pwFH4/+cI2h4Sn8lihhBFFS3KDMaKEup1143yPV5hnGJXjO7Q9Wx5aOE6oP+ASPbVSNI7Q528/1bP/zedbWc6DTyLTnVp1x03RXy2a7rjp7gdiU+ZMMB/any5/7ZUHK//4WK37pdfvsO7piPTNvcSm33LdvWAM3sZGOsJbM6mikcw5O5nH43Fk1D6X2r83SpTTh7v7Pt8xId97j4uV6W7r1BrIOFKs5yM+cBLh3t1tXq+ff4Y0oh3tqsfnN3YGA6na5ofvSjbMX4RMQjd+sOG93U+tXA2OAzb+6+AUt70oM3n8qlRF8VwCoL2xcWRIMWgjvJUgGGTGadOmSFwc6ZPrbs0m5I7DJw93F4nj6ZV1gWWzxi356+aOVW/p6ahaIDh4i1RSubn9kbZm7wui0/lzun79LUrFtCum0kmXr05L5qzYudMQ2bcv5Gtt5bZ1dxtnu93KkZ79B41ykoDnJAKAUcpGCcLa2WplXq+XCoKt6+DBjvW9oYHOLG9QFy68rXrnwB/8uw6v2VgrTKVzxi2+MRU/SvPhYPUlVz7EwMpfbr89Eww2KYzp9qLL7nyRu2iKwdLbxVIH9sFUWuoINjVpeW63Fmxq0jhCDToAEF0fM5SofHJUhxBFcyYej4eBWMSuFDs7Pv5nfQmp2vu3jl/e6hLKPprpvH58JHMMXGaQzXJc77bM+vuHR5O7X49KCd1aPfUGjGucSAciCG95m9BJHkhGTQEAxWIhAKDpOiNMZbqmkjEPfgZhVHAcxzGUlpryMw6DaeZ15fbpnqVIdL+JJ556YcPhlqZi3rF9qv1yIZI9xRQFuKzwR5V17qt+G7JnES42oB8xJD7b+Fw2FZIEz5Ql6t7wV9ehlMiCkYiUGbRcWcVGJptqYgQ4p9PJenr6LQ0lFaKixHgpEQonTxx7LN17qL+mtKbwYO/uXW0nnvlZAW9eZzII/PbQu/1F8dqMlF9ZlsqqiMZPn+oe+OTVTzYEfj3x7pV/RjqJrJZNAYAxkWAAYIwNZotOhdM0ksi0jJXp8GZl1CzC6/WKVquVSpLEuru7sW379swkwDBQWsov612WCSCgu6wVtQ0FV4m7shvDik1c4YCrRic6SWR6jvce3ncPY4y4ahsLRDPnchTQrp1tbYNfqMzr9YpOp7OgF3Fla/C90Fj53PllwowRQiljjMHv91N8CBpoD6gAsGLFn8ybNm9ZeMPNjZMJ0x3Prn3r/YbJM3dMr7FGAoHAkMH7h1V5LS0tjJChG4Wzmcv9zvM4vrH0dc41Ny+ct8i39BurvmzlVWQ0Spub777IbDZMEwQpxphiSiaTWV2nrKDA9mk0mriYEAiCIGYB5uI4PjRweiBpFAx5BgONRGKJBGMk6XYXlWqadoDjjN5sVjsVj8esHMfpdrtdA1iJKEqZcLif43nTJ08+ufr4MAZzvbnKyX9VewyEEJSW2jlVJYWynM6TJKNqtdqTyGrdzUvnKM8+udFisUuEA2cEB4kD55CTGb2iolRIZDIum80WiybixGw2WwAc0HWUmkWOiQYjyx3axGE2mdV0Jl0sSSJljJqGr/0lGI2eh82ZSoDUKViqi9z5trxUKpEOJ9KC0WjmmSiYsnI8idjhQ4bC+oasGos4i0vyTkdiR6EkeZu9AoNd7VFhXG2FaBcxmOyO4FAkBqe5GKeTfedQqw5j1YSxwBG/30+CwSCfTpgub7796n+vfbVtga4rRTzPRSg1OjXoWaPJZJHVjJaNHHktr6xhaTYdPQoj7+It+e+LTKvOpuWQIOqKDNRxlKUI0U7YNO14TCdXFU+b8u5MhyMbyGUj365DfMOlIWCtK6Dn7T25STTX/LnmP9MDgM/HATjzbKgSyzW/f/jzC/Dy6OsyZ6kpvHB3QHmdXiCXhiOKc9EkWOmwwHeB3B22EgCsoGG6F2Kpp3zMK4Hvyd6clTOLy5es3ELzGxe9ke+ZW36mPCPfKzC/nxQU1FrJpd6/6CWul/8HvLh2nmDVtKgAAAAASUVORK5CYII="
import {
  Globe, Smartphone, Monitor, ShoppingCart, Palette, TrendingUp,
  Check, X, Star, ChevronDown, ArrowRight, Phone, Mail, MapPin,
  Menu, MessageCircle
} from 'lucide-react'

// ─── IDIOMAS ────────────────────────────────────────────
type LangKey = 'es' | 'en' | 'bribri' | 'cabecar' | 'ngobe' | 'maleku' | 'terraba' | 'brunca'

const LANGS: { key: LangKey; label: string; flag: string; native: string }[] = [
  { key: 'es',      label: 'Español',  flag: '🇨🇷', native: 'Español' },
  { key: 'en',      label: 'English',  flag: '🇺🇸', native: 'English' },
  { key: 'bribri',  label: 'Bribri',   flag: '🌿', native: 'Bribri' },
  { key: 'cabecar', label: 'Cabécar',  flag: '🌿', native: 'Cabécar' },
  { key: 'ngobe',   label: 'Ngöbe',    flag: '🌿', native: 'Ngöbe' },
  { key: 'maleku',  label: 'Maléku',   flag: '🌿', native: 'Maléku' },
  { key: 'terraba', label: 'Térraba',  flag: '🌿', native: 'Térraba' },
  { key: 'brunca',  label: 'Brunca',   flag: '🌿', native: 'Brunca' },
]

// ─── TRADUCCIONES ───────────────────────────────────────
type T = Record<LangKey, string>

const t: Record<string, T> = {
  hello: {
    es: 'Hola', en: 'Hello', bribri: 'Shkëkë', cabecar: 'Ká bë́rë',
    ngobe: 'Ngüe', maleku: 'Ma lha', terraba: 'Shkëkë', brunca: 'Shka'
  },
  tagline1: {
    es: 'Desarrollamos software,', en: 'We build software,',
    bribri: 'Bë kö tsö wö,', cabecar: 'Bë kö tsö wë,',
    ngobe: 'Migä kra tsö bare,', maleku: 'Nori köri nöri nöri,',
    terraba: 'Bë kö tsö wö,', brunca: 'Brö kö tsö drö,'
  },
  tagline2: {
    es: 'apps y páginas web', en: 'apps and websites',
    bribri: 'yö bë kö', cabecar: 'wák bë kö',
    ngobe: 'bri migä kra', maleku: 'jiri nori köri',
    terraba: 'yö bë kö', brunca: 'kro brö kö'
  },
  tagline3: {
    es: 'que hacen crecer empresas.', en: 'that grow businesses.',
    bribri: 'körö bë tsö.', cabecar: 'körö bë tsö.',
    ngobe: 'ngora migä tsö.', maleku: 'köra nori nöri.',
    terraba: 'körö bë tsö.', brunca: 'kör brö tsö.'
  },
  subtitle: {
    es: 'Soluciones digitales de alto impacto para negocios que quieren resultados reales.',
    en: 'High-impact digital solutions for businesses that want real results.',
    bribri: 'Bë kö yöbë tsö kö — yö bë tsö iriria.',
    cabecar: 'Bë kö yöbë tsö kö — wák bë tsö diá.',
    ngobe: 'Migä kra yoa tsö kra — bri migä tsö krâ.',
    maleku: 'Nori köri yöla nöri köri — jiri nori nöri tâu.',
    terraba: 'Bë kö yöbë tsö kö — yö bë tsö iriria.',
    brunca: 'Brö kö yöb tsö kör — kro brö tsö brún.'
  },
  crTagline: {
    es: '🇨🇷 Diseñado en Costa Rica · Trabajamos con clientes en toda Latinoamérica',
    en: '🇨🇷 Designed in Costa Rica · We work with clients across Latin America',
    bribri: '🌿 Ditsö itö yöbë — tsö bë kö tsö',
    cabecar: '🌿 Datë duö yöbë — tsö bë kö tsö',
    ngobe: '🌿 Dre noke yoa — ngwa migä kra tsö',
    maleku: '🌿 Tâna naku yöla — nöla nori köri nöri',
    terraba: '🌿 Ditsö itö yöbë — tsö bë kö tsö',
    brunca: '🌿 Drö dru yöb — tsö brö kö tsö'
  },
  ctaStart: {
    es: 'Iniciar mi proyecto', en: 'Start my project',
    bribri: 'Yö bë kö', cabecar: 'Wák bë kö',
    ngobe: 'Bri migä kra', maleku: 'Jiri nori köri',
    terraba: 'Yö bë kö', brunca: 'Kro brö kö'
  },
  ctaProjects: {
    es: 'Ver proyectos →', en: 'View projects →',
    bribri: 'Iriria bë →', cabecar: 'Diá bë →',
    ngobe: 'Krâ migä →', maleku: 'Tâu nori →',
    terraba: 'Iriria bë →', brunca: 'Brún brö →'
  },
  available: {
    es: 'Disponible para nuevos proyectos', en: 'Available for new projects',
    bribri: 'Yöbë bë yö tsö', cabecar: 'Yöbë bë wák tsö',
    ngobe: 'Yoa migä bri tsö', maleku: 'Yöla nori jiri nöri',
    terraba: 'Yöbë bë yö tsö', brunca: 'Yöb brö kro tsö'
  },
  navServices: {
    es: 'Servicios', en: 'Services', bribri: 'Bë kö', cabecar: 'Bë kö',
    ngobe: 'Migä kra', maleku: 'Nori köri', terraba: 'Bë kö', brunca: 'Brö kö'
  },
  navPortfolio: {
    es: 'Portafolio', en: 'Portfolio', bribri: 'Bë kö tsö', cabecar: 'Bë kö tsö',
    ngobe: 'Migä kra tsö', maleku: 'Nori köri nöri', terraba: 'Bë kö tsö', brunca: 'Brö kö tsö'
  },
  navPrices: {
    es: 'Precios', en: 'Pricing', bribri: 'Kë kö', cabecar: 'Kë kö',
    ngobe: 'Kra kra', maleku: 'Köri köri', terraba: 'Kë kö', brunca: 'Kë kö'
  },
  navClients: {
    es: 'Clientes', en: 'Clients', bribri: 'Tsö bë', cabecar: 'Tsö bë',
    ngobe: 'Ngwa migä', maleku: 'Nöla nori', terraba: 'Tsö bë', brunca: 'Tsö brö'
  },
  navFaq: { es: 'FAQ', en: 'FAQ', bribri: 'FAQ', cabecar: 'FAQ', ngobe: 'FAQ', maleku: 'FAQ', terraba: 'FAQ', brunca: 'FAQ' },
  navContact: {
    es: 'Contactar →', en: 'Contact →', bribri: 'Shkëkë →', cabecar: 'Ká bë →',
    ngobe: 'Ngüe →', maleku: 'Ma lha →', terraba: 'Shkëkë →', brunca: 'Shka →'
  },
  statsProjects: { es: 'Proyectos entregados', en: 'Projects delivered', bribri: 'Yö bë kö', cabecar: 'Wák bë kö', ngobe: 'Bri migä kra', maleku: 'Jiri nori köri', terraba: 'Yö bë kö', brunca: 'Kro brö kö' },
  statsClients: { es: 'Clientes satisfechos', en: 'Satisfied clients', bribri: 'Tsö yöbë bë', cabecar: 'Tsö yöbë bë', ngobe: 'Ngwa yoa migä', maleku: 'Nöla yöla nori', terraba: 'Tsö yöbë bë', brunca: 'Tsö yöb brö' },
  statsYears: { es: 'Años de experiencia', en: 'Years of experience', bribri: 'Iriria kö bë', cabecar: 'Diá kö bë', ngobe: 'Krâ kra migä', maleku: 'Tâu köri nori', terraba: 'Iriria kö bë', brunca: 'Brún kö brö' },
  statsResponse: { es: 'Respuesta garantizada', en: 'Guaranteed response', bribri: 'Sö bë yöbë', cabecar: 'Sö bë yöbë', ngobe: 'Soa migä yoa', maleku: 'Sëku nori yöla', terraba: 'Sö bë yöbë', brunca: 'Sök brö yöb' },
  sectionServices: { es: 'Servicios', en: 'Services', bribri: 'Bë kö', cabecar: 'Bë kö', ngobe: 'Migä kra', maleku: 'Nori köri', terraba: 'Bë kö', brunca: 'Brö kö' },
  servicesTitle: {
    es: 'Todo lo que necesitás\npara crecer digitalmente.',
    en: 'Everything you need\nto grow digitally.',
    bribri: 'Kö kö bë\nyö bë körö.',
    cabecar: 'Kö kö bë\nwák bë körö.',
    ngobe: 'Kra kra migä\nbri migä ngora.',
    maleku: 'Köri köri nori\njiri nori köra.',
    terraba: 'Kö kö bë\nyö bë körö.',
    brunca: 'Kö kö brö\nkro brö kör.'
  },
  sectionPortfolio: { es: 'Portafolio', en: 'Portfolio', bribri: 'Bë kö tsö', cabecar: 'Bë kö tsö', ngobe: 'Migä kra tsö', maleku: 'Nori köri nöri', terraba: 'Bë kö tsö', brunca: 'Brö kö tsö' },
  portfolioTitle: {
    es: 'Proyectos reales.\nResultados reales.',
    en: 'Real projects.\nReal results.',
    bribri: 'Yö bë kö.\nYöbë bë kö.',
    cabecar: 'Wák bë kö.\nYöbë bë kö.',
    ngobe: 'Bri migä kra.\nYoa migä kra.',
    maleku: 'Jiri nori köri.\nYöla nori köri.',
    terraba: 'Yö bë kö.\nYöbë bë kö.',
    brunca: 'Kro brö kö.\nYöb brö kö.'
  },
  sectionPricing: { es: 'Precios', en: 'Pricing', bribri: 'Kë kö', cabecar: 'Kë kö', ngobe: 'Kra kra', maleku: 'Köri köri', terraba: 'Kë kö', brunca: 'Kë kö' },
  pricingTitle: {
    es: 'Transparentes.\nSin letra chica.',
    en: 'Transparent.\nNo hidden fees.',
    bribri: 'Yöbë bë kö.\nKë kë bë.',
    cabecar: 'Yöbë bë kö.\nKë kë bë.',
    ngobe: 'Yoa migä kra.\nKë kra migä.',
    maleku: 'Yöla nori köri.\nKë köri nori.',
    terraba: 'Yöbë bë kö.\nKë kë bë.',
    brunca: 'Yöb brö kö.\nKë kë brö.'
  },
  sectionFaq: { es: 'FAQ', en: 'FAQ', bribri: 'Bë kö tsö', cabecar: 'Bë kö tsö', ngobe: 'Migä kra tsö', maleku: 'Nori köri nöri', terraba: 'Bë kö tsö', brunca: 'Brö kö tsö' },
  faqTitle: {
    es: 'Preguntas frecuentes.',
    en: 'Frequently asked questions.',
    bribri: 'Bë tsö kö.',
    cabecar: 'Bë tsö kö.',
    ngobe: 'Migä tsö kra.',
    maleku: 'Nori nöri köri.',
    terraba: 'Bë tsö kö.',
    brunca: 'Brö tsö kö.'
  },
  finalTitle: {
    es: '¿Listo para llevar tu\nempresa al siguiente nivel?',
    en: 'Ready to take your\nbusiness to the next level?',
    bribri: 'Yöbë bë körö\nyö bë tsö?',
    cabecar: 'Yöbë bë körö\nwák bë tsö?',
    ngobe: 'Yoa migä ngora\nbri migä tsö?',
    maleku: 'Yöla nori köra\njiri nori nöri?',
    terraba: 'Yöbë bë körö\nyö bë tsö?',
    brunca: 'Yöb brö kör\nkro brö tsö?'
  },
  finalSub: {
    es: 'Agendá una consulta gratuita de 30 minutos.',
    en: 'Schedule a free 30-minute consultation.',
    bribri: 'Bë kö tsö — ëyö bë kö.',
    cabecar: 'Bë kö tsö — ká bë kö.',
    ngobe: 'Migä kra tsö — jä migä kra.',
    maleku: 'Nori köri nöri — shíi nori köri.',
    terraba: 'Bë kö tsö — ëyö bë kö.',
    brunca: 'Brö kö tsö — shíi brö kö.'
  },
  ctaFree: {
    es: 'Agendar consulta gratuita', en: 'Schedule free consultation',
    bribri: 'Ëyö bë kö', cabecar: 'Ká bë kö',
    ngobe: 'Jä migä kra', maleku: 'Shíi nori köri',
    terraba: 'Ëyö bë kö', brunca: 'Shíi brö kö'
  },
  whyTitle: {
    es: '¿Por qué elegir KCN?', en: 'Why choose KCN?',
    bribri: 'Ëyö bë KCN?', cabecar: 'Ká bë KCN?',
    ngobe: 'Jä migä KCN?', maleku: 'Shíi nori KCN?',
    terraba: 'Ëyö bë KCN?', brunca: 'Shíi brö KCN?'
  },
  processTitle: {
    es: 'Simple, claro\ny sin sorpresas.',
    en: 'Simple, clear\nand no surprises.',
    bribri: 'Kikë, yöbë\nkë kö.',
    cabecar: 'Kikë, yöbë\nkë kö.',
    ngobe: 'Kika, yoa\nkë kra.',
    maleku: 'Kiki, yöla\nkë köri.',
    terraba: 'Kikë, yöbë\nkë kö.',
    brunca: 'Kik, yöb\nkë kö.'
  },
  testimonialsTitle: {
    es: 'Lo que dicen\nnuestros clientes.',
    en: 'What our\nclients say.',
    bribri: 'Bë tsö\ntsö bë.',
    cabecar: 'Bë tsö\ntsö bë.',
    ngobe: 'Migä tsö\nngwa migä.',
    maleku: 'Nori nöri\nnöla nori.',
    terraba: 'Bë tsö\ntsö bë.',
    brunca: 'Brö tsö\ntsö brö.'
  },
  indigenous: {
    es: 'Lenguas Indígenas de Costa Rica',
    en: 'Indigenous Languages of Costa Rica',
    bribri: 'Bë ditsö — Ditsö itö yöbë',
    cabecar: 'Bë datë — Datë duö yöbë',
    ngobe: 'Migä dre — Dre noke yoa',
    maleku: 'Nori tana — Tâna naku yöla',
    terraba: 'Bë ditsö — Ditsö itö yöbë',
    brunca: 'Brö drö — Drö dru yöb'
  },
  thankYou: {
    es: 'Gracias', en: 'Thank you',
    bribri: 'Ëyö', cabecar: 'Ká',
    ngobe: 'Jä', maleku: 'Shíi',
    terraba: 'Shkë', brunca: 'Shíi'
  },
  welcome: {
    es: 'Bienvenido', en: 'Welcome',
    bribri: 'Ëyö bë yö', cabecar: 'Ká bë wák',
    ngobe: '—', maleku: 'Shíi nori jiri',
    terraba: 'Ëyö bë yö', brunca: 'Shíi tö kro'
  },
  goodMorning: {
    es: 'Buenos días', en: 'Good morning',
    bribri: 'Ká bë́rë', cabecar: 'Ká bë́rë',
    ngobe: '—', maleku: 'Ma lha maráma',
    terraba: 'Ká bë́rë', brunca: 'Danzö tö'
  },
}

function tr(key: string, lang: LangKey): string {
  return t[key]?.[lang] ?? t[key]?.['es'] ?? key
}

// ─── SERVICES DATA ──────────────────────────────────────
const SERVICES_DATA = [
  { icon: <Globe size={22} />, titleEs: 'Diseño Web', titleEn: 'Web Design', price: 'Desde $120 USD', color: 'blue', features: ['Diseño 100% personalizado','Hosting incluido','Dominio .com incluido','Certificado SSL','Optimización Google','Botón WhatsApp','Soporte incluido'] },
  { icon: <Smartphone size={22} />, titleEs: 'Apps Móviles', titleEn: 'Mobile Apps', price: 'Desde $699 USD', color: 'green', features: ['Android y iOS','Flutter / React Native','Backend y APIs','Publicación en stores','Panel de administración','Notificaciones push','Soporte post-lanzamiento'] },
  { icon: <Monitor size={22} />, titleEs: 'Software Empresarial', titleEn: 'Business Software', price: 'Desde $999 USD', color: 'yellow', features: ['Windows y Linux','Gestión de inventario','Facturación electrónica','Reportes automáticos','Multi-usuario','Base de datos segura','Capacitación incluida'] },
  { icon: <ShoppingCart size={22} />, titleEs: 'Tiendas Online', titleEn: 'Online Stores', price: 'Desde $499 USD', color: 'red', features: ['Catálogo de productos','Carrito de compras','Pagos BAC y BN','PayPal incluido','Panel admin','Gestión de pedidos','SEO integrado'] },
  { icon: <Palette size={22} />, titleEs: 'Diseño de Marca', titleEn: 'Brand Design', price: 'Consultame', color: 'purple', features: ['Logo profesional','Manual de marca','Paleta de colores','Tipografías','Material gráfico','Social media kit','Archivos editables'] },
  { icon: <TrendingUp size={22} />, titleEs: 'Marketing Digital', titleEn: 'Digital Marketing', price: 'Consultame', color: 'blue', features: ['SEO avanzado','Google Ads','Facebook e Instagram Ads','Google Analytics','Reportes mensuales','Estrategia de contenido','Optimización continua'] },
]

const PLANS = [
  { name: 'PYME', price: '$120', featured: false, features: ['Página web 1 página','Diseño 100% personalizado','Hosting incluido','Dominio .com incluido','Certificado SSL gratis','Optimización Google','Botón WhatsApp','Soporte 1 mes'] },
  { name: 'BÁSICO', price: '$299', featured: false, features: ['Hasta 5 páginas','Todo del plan PYME','Formulario de contacto','SEO básico','Google Analytics','Google Business Profile','Mapa de ubicación','Soporte 1 mes'] },
  { name: 'PROFESIONAL', price: '$699', featured: true, features: ['Hasta 15 páginas','Todo del plan Básico','Panel de administración','SEO avanzado','Blog integrado','Chat en vivo','Integración redes sociales','Soporte 3 meses'] },
  { name: 'ENTERPRISE', price: '$1,499', featured: false, features: ['Todo del plan Profesional','E-commerce completo','Pasarela de pagos BAC/BN','App móvil Android & iOS','Sistema POS integrado','Marketing digital 1 mes','Capacitación del equipo','Soporte 6 meses'] },
]

const FAQS_ES = [
  { q: '¿Cuánto tiempo tarda?', a: 'Una página básica: 3 a 7 días. Sitio profesional: 1 a 2 semanas. E-commerce: 2 a 3 semanas. App móvil: 3 a 6 semanas.' },
  { q: '¿Necesito saber de tecnología?', a: 'No. Nos encargamos de todo el proceso técnico. Te explicamos todo en lenguaje sencillo.' },
  { q: '¿Cómo puedo pagar?', a: 'SINPE Móvil, transferencia bancaria, PayPal y efectivo. Para proyectos grandes: 50% inicio, 50% entrega.' },
  { q: '¿Puedo pedir cambios después?', a: 'Sí. Durante el período de soporte podés solicitar ajustes sin costo adicional.' },
  { q: '¿Trabajan fuera de Costa Rica?', a: 'Sí. Trabajamos con clientes en toda Latinoamérica remotamente.' },
  { q: '¿Mi página va a aparecer en Google?', a: 'Sí. Todas las páginas incluyen SEO básico desde el día 1.' },
]

const TECH = ['React','Flutter','Node.js','Python','Firebase','Android','iOS','Linux','Docker','AWS','Next.js','WordPress','MySQL','PostgreSQL']

// ─── HOOKS ──────────────────────────────────────────────
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

// ─── LANGUAGE SELECTOR ──────────────────────────────────
function LangSelector({ lang, setLang }: { lang: LangKey; setLang: (l: LangKey) => void }) {
  const [open, setOpen] = useState(false)
  const current = LANGS.find(l => l.key === lang)!
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-white/8 hover:bg-white/15 border border-white/15 rounded-full px-3 py-1.5 text-[12px] font-medium text-white transition-all"
      >
        <span>{current.flag}</span>
        <span>{current.native}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-[9999] bg-[#111] border border-white/12 rounded-2xl overflow-hidden shadow-2xl min-w-[160px]">
          {LANGS.map(l => (
            <button
              key={l.key}
              onClick={() => { setLang(l.key); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] hover:bg-white/8 transition-colors text-left ${lang === l.key ? 'text-blue-400 bg-white/5' : 'text-white/70'}`}
            >
              <span className="text-base">{l.flag}</span>
              <div>
                <div className="font-medium">{l.native}</div>
                {l.key !== 'es' && l.key !== 'en' && (
                  <div className="text-[10px] text-white/30">{l.label}</div>
                )}
              </div>
              {lang === l.key && <Check size={12} className="ml-auto text-blue-400" />}
            </button>
          ))}
          {/* Indigenous banner */}
          <div className="px-4 py-2.5 border-t border-white/8 bg-green-900/20">
            <p className="text-[10px] text-green-400/70 text-center">🌿 Lenguas indígenas de Costa Rica</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── NAV ────────────────────────────────────────────────
function Nav({ menuOpen, setMenuOpen, lang, setLang }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void; lang: LangKey; setLang: (l: LangKey) => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#servicios', label: tr('navServices', lang) },
    { href: '#portafolio', label: tr('navPortfolio', lang) },
    { href: '#precios', label: tr('navPrices', lang) },
    { href: '#testimonios', label: tr('navClients', lang) },
    { href: '#faq', label: tr('navFaq', lang) },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-12 px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/8' : 'bg-black/80 backdrop-blur-xl'}`}>
        <a href="#" className="flex items-center gap-3">
          <img src={KCN_LOGO} alt="KCN" className="h-8 w-auto" />
          <div className="block">
            <p className="text-white font-bold text-[15px] tracking-tight leading-none">Keny Chinchilla</p>
            <p className="text-white/40 text-[11px] tracking-wide">Navarro</p>
          </div>
        </a>
        <ul className="hidden md:flex gap-6 list-none">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-[13px] text-white/75 hover:text-white transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <LangSelector lang={lang} setLang={setLang} />
          <a href="https://wa.me/50687359034" target="_blank" rel="noreferrer" className="hidden md:block text-[13px] text-blue-400 hover:text-white transition-colors">
            {tr('navContact', lang)}
          </a>
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
            {tr('navContact', lang)}
          </a>
          <div className="mt-6">
            <LangSelector lang={lang} setLang={setLang} />
          </div>
        </div>
      )}
    </>
  )
}

// ─── HERO ───────────────────────────────────────────────
function Hero({ lang }: { lang: LangKey }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(0,113,227,0.2) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'glowPulse 8s ease-in-out infinite' }} />

      <style>{`
        @keyframes glowPulse{0%,100%{opacity:.3;transform:translate(-50%,-50%) scale(1)}50%{opacity:.5;transform:translate(-50%,-50%) scale(1.15)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .reveal{opacity:0;transform:translateY(32px);transition:opacity 0.7s ease,transform 0.7s ease}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .tech-track{display:flex;gap:48px;animation:scroll 22s linear infinite;white-space:nowrap}
        .service-card-glow::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(0,113,227,0.06) 0%,transparent 60%);opacity:0;transition:opacity 0.3s;border-radius:inherit;pointer-events:none}
        .service-card-glow:hover::before{opacity:1}
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/6 border border-white/12 rounded-full px-4 py-1.5 text-[12px] text-white/70 font-medium mb-8">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full" style={{ animation: 'pulseDot 2s ease infinite' }} />
          {tr('available', lang)}
        </div>

        <h1 className="text-[clamp(32px,7vw,80px)] font-extrabold leading-[1.02] tracking-[-0.05em] mb-6"
            style={{ animation: 'fadeUp 0.9s ease forwards 0.3s', opacity: 0 }}>
          <span className="text-white block">{tr('tagline1', lang)}</span>
          <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">{tr('tagline2', lang)}</span>
          <span className="text-white block">{tr('tagline3', lang)}</span>
        </h1>

        <p className="text-[clamp(15px,2.5vw,20px)] text-white/50 font-light mb-4 leading-relaxed"
           style={{ animation: 'fadeUp 0.9s ease forwards 0.5s', opacity: 0 }}>
          {tr('subtitle', lang)}
        </p>

        <p className="text-[14px] text-blue-400 font-medium mb-12"
           style={{ animation: 'fadeUp 0.9s ease forwards 0.6s', opacity: 0 }}>
          {tr('crTagline', lang)}
        </p>

        <div className="flex gap-3 justify-center flex-wrap"
             style={{ animation: 'fadeUp 0.9s ease forwards 0.7s', opacity: 0 }}>
          <a href="https://wa.me/50687359034?text=Hola%20Keny,%20quiero%20hablar%20sobre%20mi%20proyecto"
             target="_blank" rel="noreferrer"
             className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-full text-[15px] font-medium transition-all hover:scale-[1.02] flex items-center gap-2">
            {tr('ctaStart', lang)} <ArrowRight size={16} />
          </a>
          <a href="#portafolio"
             className="border border-blue-400/30 hover:border-blue-400/70 text-blue-400 hover:text-white px-7 py-3.5 rounded-full text-[15px] font-medium transition-all">
            {tr('ctaProjects', lang)}
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── STATS ──────────────────────────────────────────────
function Stats({ lang }: { lang: LangKey }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/7">
      {[
        { val: '100+', label: tr('statsProjects', lang), color: 'text-blue-400' },
        { val: '98%', label: tr('statsClients', lang), color: 'text-green-400' },
        { val: '10+', label: tr('statsYears', lang), color: 'text-purple-400' },
        { val: '24h', label: tr('statsResponse', lang), color: 'text-yellow-400' },
      ].map((s, i) => (
        <div key={i} className="bg-[#0a0a0a] py-12 px-6 text-center">
          <div className={`text-[clamp(36px,6vw,56px)] font-bold tracking-tight leading-none mb-2 ${s.color}`}>{s.val}</div>
          <div className="text-[13px] text-white/40">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

// ─── TECH STRIP ─────────────────────────────────────────
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

// ─── INDIGENOUS BANNER ──────────────────────────────────
function IndigenousBanner({ lang }: { lang: LangKey }) {
  const greetings: Partial<Record<LangKey, { word: string; lang: string }[]>> = {
    bribri:  [{ word: 'Shkëkë', lang: 'Bribri' },  { word: 'Ëyö', lang: 'Gracias' }, { word: 'Sibö', lang: 'Dios' }],
    cabecar: [{ word: 'Ká bë́rë', lang: 'Cabécar' },{ word: 'Ká', lang: 'Gracias' },  { word: 'Sibö', lang: 'Dios' }],
    ngobe:   [{ word: 'Ngüe', lang: 'Ngöbe' },     { word: 'Jä', lang: 'Gracias' },  { word: 'Ngöbe', lang: 'Dios' }],
    maleku:  [{ word: 'Ma lha', lang: 'Maléku' },  { word: 'Shíi', lang: 'Gracias' },{ word: 'Töcu', lang: 'Dios' }],
    terraba: [{ word: 'Shkë', lang: 'Térraba' },   { word: 'Shkë', lang: 'Gracias' },{ word: 'Sebu', lang: 'Dios' }],
    brunca:  [{ word: 'Shka', lang: 'Brunca' },    { word: 'Shíi', lang: 'Gracias' },{ word: 'Sibö', lang: 'Dios' }],
  }

  if (lang === 'es' || lang === 'en') return null

  const words = greetings[lang] || []

  return (
    <div className="bg-gradient-to-r from-green-950/40 to-blue-950/40 border-y border-green-500/15 py-6 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[11px] font-semibold text-green-400 uppercase tracking-[0.1em] mb-3">
          🌿 {tr('indigenous', lang)}
        </p>
        <div className="flex justify-center gap-8 flex-wrap">
          {words.map((w, i) => (
            <div key={i} className="text-center">
              <p className="text-[22px] font-bold text-white">{w.word}</p>
              <p className="text-[11px] text-white/40">{w.lang}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PORTFOLIO ──────────────────────────────────────────
function Portfolio({ lang }: { lang: LangKey }) {
  const projects = [
    { tag: 'Sistema POS · Windows', title: 'Restaurantes MQ', desc: 'Punto de venta con facturación electrónica.', emoji: '🏪' },
    { tag: 'App Móvil · Android & iOS', title: 'DeliveryCR App', desc: 'Plataforma de delivery con tracking en tiempo real.', emoji: '🚀' },
    { tag: 'E-commerce · Web', title: 'TiendaTec Online', desc: 'Tienda online con pasarela BAC y Banco Nacional.', emoji: '🛒' },
    { tag: 'ERP · Linux', title: 'GestorInventario Pro', desc: 'Sistema ERP con módulos de inventario y reportes.', emoji: '⚙️' },
  ]

  return (
    <section id="portafolio" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">{tr('sectionPortfolio', lang)}</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-16 text-white whitespace-pre-line">{tr('portfolioTitle', lang)}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6">
          {projects.map((p, i) => (
            <div key={i} className="reveal group relative overflow-hidden aspect-video bg-[#0a0a0a] cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-500 bg-gradient-to-br from-[#030d1a] to-[#051528]">
                {p.emoji}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent translate-y-12 group-hover:translate-y-0 transition-transform duration-400 flex flex-col justify-end p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-blue-400 mb-2">{p.tag}</p>
                <h3 className="text-[20px] font-semibold text-white mb-1">{p.title}</h3>
                <p className="text-[13px] text-white/60 mb-3">{p.desc}</p>
                <a href="https://wa.me/50687359034" target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-1.5 text-[13px] text-blue-400">
                  {lang === 'en' ? 'See details' : 'Ver detalles'} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES ───────────────────────────────────────────
function Services({ lang }: { lang: LangKey }) {
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
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">{tr('sectionServices', lang)}</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-16 text-white whitespace-pre-line">{tr('servicesTitle', lang)}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6">
          {SERVICES_DATA.map((s, i) => {
            const c = colorMap[s.color]
            const title = lang === 'en' ? s.titleEn : s.titleEs
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
                <h3 className="text-[19px] font-semibold text-white mb-3">{title}</h3>
                <p className="text-[22px] font-bold text-white mb-5">{s.price}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] text-white/40">
                      <Check size={13} className="text-green-400 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/50687359034?text=${encodeURIComponent(tr('hello', lang))}%20Keny`}
                   target="_blank" rel="noreferrer"
                   className={`inline-flex items-center gap-1.5 text-[13px] ${c.icon}`}>
                  {lang === 'en' ? 'Request quote' : 'Solicitar cotización'} <ArrowRight size={13} />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── WHY KCN ────────────────────────────────────────────
function WhyKCN({ lang }: { lang: LangKey }) {
  const others = ['Plantillas genéricas', 'Soporte limitado', 'Solo páginas web', 'Cargos mensuales', 'Velocidad mediocre']
  const kcn    = ['Diseño 100% personalizado', 'Soporte en minutos', 'Web + Apps + Software', 'Pago único', 'Optimización máxima']

  return (
    <section className="py-24 bg-black border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-16 text-white">{tr('whyTitle', lang)}</h2>
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6">
          <div className="bg-[#0a0a0a] p-12">
            <p className="text-[12px] font-bold text-red-400 uppercase tracking-[0.1em] mb-7 pb-4 border-b border-white/8">
              ✕ {lang === 'en' ? 'Others' : 'Otros'}
            </p>
            {others.map((o, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
                <X size={16} className="text-red-400 flex-shrink-0" />
                <p className="text-[15px] font-medium text-white">{o}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#070d14] p-12">
            <p className="text-[12px] font-bold text-green-400 uppercase tracking-[0.1em] mb-7 pb-4 border-b border-white/8">
              ✓ KCN · Keny Chinchilla
            </p>
            {kcn.map((k, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
                <Check size={16} className="text-green-400 flex-shrink-0" />
                <p className="text-[15px] font-medium text-white">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ───────────────────────────────────────
function Testimonials({ lang }: { lang: LangKey }) {
  const testimonials = [
    { name: 'Mario Quesada', role: 'CEO', company: 'Restaurantes MQ', text: 'KCN nos desarrolló el sistema POS para nuestra cadena. El trabajo superó nuestras expectativas.', initial: 'M', gradient: 'from-blue-500 to-green-500' },
    { name: 'Andrea Mora', role: 'Fundadora', company: 'DeliveryCR', text: 'La app de delivery transformó nuestro negocio. Las ventas aumentaron un 40% en el primer mes.', initial: 'A', gradient: 'from-purple-500 to-pink-500' },
    { name: 'Carlos Jiménez', role: 'Dueño', company: 'TiendaTec', text: 'Nuestra tienda online quedó increíble. Profesional, rápido y con precios justos.', initial: 'C', gradient: 'from-green-500 to-blue-500' },
  ]

  return (
    <section id="testimonios" className="py-24 bg-[#050505] border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">{tr('navClients', lang)}</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-16 text-white whitespace-pre-line">{tr('testimonialsTitle', lang)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6">
          {testimonials.map((t, i) => (
            <div key={i} className="reveal bg-[#0a0a0a] p-9">
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, j) => <Star key={j} size={13} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-[15px] text-white/80 leading-[1.7] mb-6 font-light italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-[14px] font-bold text-black`}>
                  {t.initial}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">{t.name}</p>
                  <p className="text-[12px] text-white/40">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PROCESS ────────────────────────────────────────────
function Process({ lang }: { lang: LangKey }) {
  const steps = lang === 'en'
    ? [
        { num: '01', title: 'Free consultation', desc: 'We talk via WhatsApp or video call. We understand your idea and deliver a quote within 24 hours.' },
        { num: '02', title: 'Design & approval', desc: 'We create the full visual design. You approve before we start coding. No surprises.' },
        { num: '03', title: 'Agile development', desc: 'We code with the best technologies. Partial deliveries so you always know the progress.' },
        { num: '04', title: 'Launch & support', desc: 'We publish, train you and provide post-launch support included in all plans.' },
      ]
    : [
        { num: '01', title: 'Consulta gratuita', desc: 'Hablamos por WhatsApp o videollamada. Entendemos tu idea y entregamos cotización en 24 horas.' },
        { num: '02', title: 'Diseño y aprobación', desc: 'Creamos el diseño visual completo. Vos aprobás antes de que empecemos a programar. Sin sorpresas.' },
        { num: '03', title: 'Desarrollo ágil', desc: 'Programamos con las mejores tecnologías. Entregas parciales para que siempre sepas cómo va.' },
        { num: '04', title: 'Lanzamiento y soporte', desc: 'Publicamos, te capacitamos y te acompañamos con soporte post-lanzamiento incluido.' },
      ]

  return (
    <section id="proceso" className="py-24 bg-black border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-16 text-white whitespace-pre-line">{tr('processTitle', lang)}</h2>
        <div className="border-t border-white/8">
          {steps.map((s, i) => (
            <div key={i} className="reveal grid grid-cols-[72px_1fr_1fr] gap-8 py-9 border-b border-white/8 items-start group">
              <span className="text-[44px] font-bold text-white/8 group-hover:text-white/15 transition-colors leading-none">{s.num}</span>
              <h3 className="text-[20px] font-semibold text-white">{s.title}</h3>
              <p className="text-[14px] text-white/40 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PRICING ────────────────────────────────────────────
function Pricing({ lang }: { lang: LangKey }) {
  return (
    <section id="precios" className="py-24 bg-[#050505] border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">{tr('sectionPricing', lang)}</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-4 text-white whitespace-pre-line">{tr('pricingTitle', lang)}</h2>
        <p className="reveal text-[17px] text-white/40 font-light mb-16">
          {lang === 'en' ? 'One-time payment. SINPE · PayPal · Transfer · Cash.' : 'Pago único. SINPE · PayPal · Transferencia · Efectivo.'}
        </p>
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
          {PLANS.map((p, i) => (
            <div key={i} className={`flex flex-col p-9 ${p.featured ? 'bg-[#070d14]' : 'bg-[#0a0a0a]'}`}>
              {p.featured && <span className="bg-blue-600 text-white text-[11px] font-semibold uppercase tracking-[0.05em] px-3 py-1 rounded-full mb-5 w-fit">{lang === 'en' ? 'Most popular' : 'Más popular'}</span>}
              <p className="text-[12px] font-semibold text-blue-400 uppercase tracking-[0.08em] mb-3">{p.name}</p>
              <p className="text-[44px] font-bold text-white tracking-tight leading-none mb-1">{p.price}</p>
              <p className="text-[12px] text-white/30 mb-6">USD · {lang === 'en' ? 'One-time' : 'Pago único'}</p>
              <ul className="flex-1 space-y-2.5 mb-7">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-[13px] text-white/40">
                    <Check size={13} className="text-green-400 mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <a href={`https://wa.me/50687359034?text=${tr('hello', lang)}%20Keny`}
                 target="_blank" rel="noreferrer"
                 className={`block text-center py-3 rounded-full text-[14px] font-medium transition-all ${p.featured ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'border border-white/15 hover:border-white/40 text-white/70 hover:text-white'}`}>
                {lang === 'en' ? 'Get started →' : 'Empezar →'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ────────────────────────────────────────────────
function FAQ({ lang }: { lang: LangKey }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-black border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">{tr('sectionFaq', lang)}</p>
        <h2 className="reveal text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-[1.1] mb-16 text-white">{tr('faqTitle', lang)}</h2>
        <div className="border-t border-white/8">
          {FAQS_ES.map((f, i) => (
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
      </div>
    </section>
  )
}


// ─── QR SECTION ─────────────────────────────────────────
function QRSection({ lang }: { lang: LangKey }) {
  return (
    <section className="py-20 bg-[#050505] border-t border-white/6">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="reveal text-[12px] font-semibold text-blue-400 uppercase tracking-[0.1em] mb-4">
          {lang === 'en' ? 'Find us' : 'Encontranos'}
        </p>
        <h2 className="reveal text-[clamp(24px,4vw,40px)] font-bold tracking-tight text-white mb-4">
          {lang === 'en' ? 'Scan & connect' : 'Escaneá y conectate'}
        </h2>
        <p className="reveal text-[15px] text-white/40 mb-14">
          {lang === 'en' ? 'WhatsApp or Facebook — we respond fast.' : 'WhatsApp o Facebook — respondemos rápido.'}
        </p>
        <div className="reveal flex gap-8 justify-center flex-wrap">
          {/* WhatsApp QR */}
          <div className="bg-[#0a0a0a] border border-white/8 rounded-2xl p-8 flex flex-col items-center gap-5 hover:border-green-500/30 transition-colors">
            <div className="text-3xl">💬</div>
            <div className="bg-white rounded-2xl p-3">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Fwa.me%2F50687359034&bgcolor=ffffff&color=000000&margin=0"
                alt="QR WhatsApp"
                width={160}
                height={160}
                className="rounded-xl"
              />
            </div>
            <div>
              <p className="text-[16px] font-semibold text-white mb-1">WhatsApp</p>
              <p className="text-[13px] text-white/30">+506 8735-9034</p>
            </div>
            <a href="https://wa.me/50687359034" target="_blank" rel="noreferrer"
               className="bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-full text-[13px] font-medium transition-all">
              {lang === 'en' ? 'Open WhatsApp' : 'Abrir WhatsApp'}
            </a>
          </div>

          {/* Facebook QR */}
          <div className="bg-[#0a0a0a] border border-white/8 rounded-2xl p-8 flex flex-col items-center gap-5 hover:border-blue-500/30 transition-colors">
            <div className="text-3xl">📘</div>
            <div className="bg-white rounded-2xl p-3">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17o8S43BTG%2F&bgcolor=ffffff&color=000000&margin=0"
                alt="QR Facebook"
                width={160}
                height={160}
                className="rounded-xl"
              />
            </div>
            <div>
              <p className="text-[16px] font-semibold text-white mb-1">Facebook</p>
              <p className="text-[13px] text-white/30">KCN · Keny Chinchilla</p>
            </div>
            <a href="https://www.facebook.com/share/17o8S43BTG/?mibextid=wwXIfr" target="_blank" rel="noreferrer"
               className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full text-[13px] font-medium transition-all">
              {lang === 'en' ? 'Open Facebook' : 'Abrir Facebook'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ──────────────────────────────────────────
function FinalCTA({ lang }: { lang: LangKey }) {
  return (
    <section className="py-40 text-center bg-black border-t border-white/6 relative overflow-hidden">
      <div className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(0,113,227,0.12) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h2 className="reveal text-[clamp(32px,7vw,68px)] font-bold tracking-tight leading-[1.05] mb-5 text-white whitespace-pre-line">{tr('finalTitle', lang)}</h2>
        <p className="reveal text-[19px] text-white/40 font-light mb-12">{tr('finalSub', lang)}</p>
        <div className="reveal flex gap-3 justify-center flex-wrap">
          <a href="https://wa.me/50687359034?text=Hola%20Keny,%20quiero%20una%20consulta%20gratuita"
             target="_blank" rel="noreferrer"
             className="bg-blue-600 hover:bg-blue-500 text-white px-9 py-4 rounded-full text-[17px] font-medium transition-all hover:scale-[1.02] flex items-center gap-2">
            {tr('ctaFree', lang)} <ArrowRight size={18} />
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

// ─── FOOTER ─────────────────────────────────────────────
function Footer({ lang }: { lang: LangKey }) {
  return (
    <footer className="bg-[#080808] border-t border-white/8 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="text-[18px] font-bold text-white mb-3">KCN</p>
            <p className="text-[13px] text-white/30 leading-relaxed mb-5">
              {lang === 'en' ? 'We build software, apps and websites that grow businesses. Designed in Costa Rica.' : 'Desarrollamos software, apps y páginas web que hacen crecer empresas. Diseñado en Costa Rica.'}
            </p>
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-[13px] text-white/25"><Mail size={13} /> kchinchilla.pos@gmail.com</p>
              <p className="flex items-center gap-2 text-[13px] text-white/25"><Phone size={13} /> +506 8735-9034</p>
              <p className="flex items-center gap-2 text-[13px] text-white/25"><MapPin size={13} /> San José, Costa Rica</p>
            </div>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-white uppercase tracking-[0.05em] mb-4">{tr('navServices', lang)}</p>
            <ul className="space-y-2.5">
              {['Diseño Web','Apps Móviles','Software','Tiendas Online','Marketing'].map((s, i) => (
                <li key={i}><a href="#servicios" className="text-[13px] text-white/30 hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-white uppercase tracking-[0.05em] mb-4">{tr('navClients', lang)}</p>
            <ul className="space-y-2.5">
              {[['#portafolio', tr('navPortfolio', lang)],['#precios', tr('navPrices', lang)],['#faq','FAQ'],['https://wa.me/50687359034','WhatsApp']].map(([href, label], i) => (
                <li key={i}><a href={href} className="text-[13px] text-white/30 hover:text-white transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-green-400 uppercase tracking-[0.05em] mb-4">🌿 {lang === 'en' ? 'Indigenous' : 'Indígena'}</p>
            <ul className="space-y-2">
              {[['Bribri','Shkëkë'],['Cabécar','Ká bë́rë'],['Ngöbe','Ngüe'],['Maléku','Ma lha'],['Térraba','Shkë'],['Brunca','Shka']].map(([name, greeting], i) => (
                <li key={i} className="text-[12px] text-white/20">
                  <span className="text-green-400/60">{name}</span> — {greeting}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/6 pt-6 flex justify-between items-center flex-wrap gap-3">
          <p className="text-[12px] text-white/20">© 2026 KCN · Keny Chinchilla Navarro · Costa Rica · kenychinchilla.com</p>
          <p className="text-[11px] text-green-400/40">🌿 {tr('indigenous', lang)}</p>
        </div>
      </div>
    </footer>
  )
}

// ─── WA BUTTON ──────────────────────────────────────────
function WaButton() {
  return (
    <a href="https://wa.me/50687359034" target="_blank" rel="noreferrer"
       className="fixed bottom-7 right-7 z-50 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110"
       style={{ width: 52, height: 52 }}>
      <MessageCircle size={26} className="text-white" />
    </a>
  )
}

// ─── APP ────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState<LangKey>('es')
  const prog = useScrollProgress()
  useReveal()

  // Reset reveals on lang change
  useEffect(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.remove('visible'))
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
    }, 50)
  }, [lang])

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="fixed top-12 left-0 h-[2px] bg-blue-400 z-[9998] transition-all duration-100"
           style={{ width: prog + '%' }} />
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Stats lang={lang} />
      <IndigenousBanner lang={lang} />
      <TechStrip />
      <Portfolio lang={lang} />
      <Services lang={lang} />
      <WhyKCN lang={lang} />
      <Testimonials lang={lang} />
      <Process lang={lang} />
      <Pricing lang={lang} />
      <FAQ lang={lang} />
      <PalabrasIndigenas />
      <QRSection lang={lang} />
      <FinalCTA lang={lang} />
      <Footer lang={lang} />
      <WaButton />
    </div>
  )
}
