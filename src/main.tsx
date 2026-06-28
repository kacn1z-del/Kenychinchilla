@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #F5F5F7; }
::-webkit-scrollbar-thumb { background: #D2D2D7; border-radius: 2px; }

::selection { background: rgba(0,113,227,0.15); color: #1D1D1F; }

.tech-track {
  display: flex;
  gap: 48px;
  animation: scroll 22s linear infinite;
  white-space: nowrap;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.service-card-glow::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(0,113,227,0.06) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: inherit;
  pointer-events: none;
}

.service-card-glow:hover::before {
  opacity: 1;
}
