import { useMemo, useState } from 'react'
import { Activity, ArrowDownToLine, ArrowRight, Boxes, Check, ChevronDown, CircleHelp, Cloud, Code2, Command, Copy, FileCode2, GitBranch, Layers3, LockKeyhole, LogIn, LogOut, Menu, Plus, Search, Settings2, ShieldCheck, Sparkles, Terminal, X } from 'lucide-react'

const API_URL = (import.meta.env.VITE_API_URL || 'https://localhost:7091').replace(/\/$/, '')
type Service = { name: string; description: string; version: string; category: string; icon: string; color: string }
const services: Service[] = [
  { name: 'PostgreSQL', description: 'Relational database for structured application data.', version: '16', category: 'Database', icon: 'PG', color: 'purple' },
  { name: 'Redis', description: 'In-memory data store for caching and queues.', version: '7', category: 'Cache', icon: 'R', color: 'red' },
  { name: 'Nginx', description: 'Web server and reverse proxy for your applications.', version: '1.27', category: 'Web server', icon: 'N', color: 'green' },
  { name: 'MongoDB', description: 'Document database for flexible JSON-like data.', version: '7', category: 'Database', icon: 'M', color: 'green' },
  { name: 'RabbitMQ', description: 'Message broker for reliable asynchronous workflows.', version: '3.13', category: 'Messaging', icon: 'RMQ', color: 'orange' },
  { name: 'MySQL', description: 'Popular open-source relational database.', version: '8.4', category: 'Database', icon: 'MY', color: 'blue' },
]
type Page = 'Overview' | 'Service catalog' | 'My configurations' | 'Versions'

async function authRequest(path: string, payload: Record<string, string>) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    credentials: 'include', body: JSON.stringify(payload),
  })
  const body = await response.text()
  if (!response.ok) {
    let message = body || `Request failed (${response.status})`
    try { const parsed = JSON.parse(body); message = parsed.error || parsed.message || body } catch { /* response is not JSON */ }
    throw new Error(message)
  }
  return body
}

export default function App() {
  const [page, setPage] = useState<Page>('Overview')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All services')
  const [selected, setSelected] = useState<Service[]>([services[0]])
  const [configName, setConfigName] = useState('my-infrastructure')
  const [generated, setGenerated] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const [authError, setAuthError] = useState(false)
  const [busy, setBusy] = useState(false)
  const [userLabel, setUserLabel] = useState('Guest workspace')
  const [mobileNav, setMobileNav] = useState(false)
  const [toast, setToast] = useState('')

  const filtered = useMemo(() => services.filter(s => (category === 'All services' || s.category === category) && `${s.name} ${s.description}`.toLowerCase().includes(search.toLowerCase())), [search, category])
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }
  const toggleService = (service: Service) => setSelected(old => old.some(s => s.name === service.name) ? old.filter(s => s.name !== service.name) : [...old, service])
  const makeYaml = () => `name: ${configName || 'my-infrastructure'}\nversion: 1\nservices:\n${selected.map(s => `  ${s.name.toLowerCase()}:\n    image: ${s.name.toLowerCase()}:${s.version}\n`).join('')}`
  const navItems: { label: Page; icon: typeof Activity }[] = [{ label: 'Overview', icon: Layers3 }, { label: 'Service catalog', icon: Boxes }, { label: 'My configurations', icon: FileCode2 }, { label: 'Versions', icon: GitBranch }]

  async function submitAuth(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setAuthMessage(''); setAuthError(false)
    try {
      await authRequest(authMode === 'login' ? '/auth/login' : '/auth/reg', authMode === 'login' ? { email, password } : { name, email, password })
      setUserLabel(name || email.split('@')[0] || 'Signed-in user'); setAuthMessage('Authentication request succeeded.'); setAuthOpen(false); notify('Connected to backend')
    } catch (error) { setAuthError(true); setAuthMessage(error instanceof Error ? error.message : 'Could not connect to backend.') }
    finally { setBusy(false) }
  }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Command size={21}/></div><div><b>devinit</b><span>INFRASTRUCTURE STUDIO</span></div><button className="mobile-close icon-btn" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18}/></button></div>
      <div className="workspace-label">WORKSPACE</div><button className="workspace-switch"><div className="workspace-avatar">D</div><span><b>DevInit project</b><small>{userLabel}</small></span><ChevronDown size={15}/></button>
      <div className="nav-label">BUILD</div><nav>{navItems.map(item => { const Icon = item.icon; return <button key={item.label} className={`nav-item ${page === item.label ? 'active' : ''}`} onClick={() => { setPage(item.label); setMobileNav(false) }}><Icon size={17}/><span>{item.label}</span>{item.label === 'Versions' && <span className="nav-soon">BETA</span>}</button> })}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><b>Need a hand?</b><p>Build and ship your infrastructure with confidence.</p><button onClick={() => notify('Documentation will be connected here.')}>Explore docs <ArrowRight size={14}/></button></div><button className="nav-item" onClick={() => notify('Settings are not connected yet.')}><Settings2 size={17}/>Settings</button><div className="profile-row"><div className="profile-avatar">{userLabel.charAt(0).toUpperCase()}</div><div className="profile-text"><b>{userLabel}</b><small>{userLabel === 'Guest workspace' ? 'Not signed in' : 'Workspace member'}</small></div><button className="icon-btn" title="Sign in" onClick={() => { setAuthMode('login'); setAuthOpen(true) }}><LogIn size={16}/></button></div></div>
    </aside>
    {mobileNav && <button className="scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation"/>}
    <main className="main-area">
      <header className="topbar"><button className="mobile-menu icon-btn" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={19}/></button><div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><b>{page}</b></div><div className="top-actions"><span className="status-pill"><span className="status-dot"/> Local workspace</span><button className="avatar-button" onClick={() => { setAuthMode('login'); setAuthOpen(true) }} title="Sign in">{userLabel.charAt(0).toUpperCase()}</button></div></header>
      <div className="page-content">
        {page === 'Overview' && <>
          <div className="hero-row"><div><div className="eyebrow"><Sparkles size={14}/> YOUR INFRASTRUCTURE, SIMPLIFIED</div><h1>Build your stack.<br/><span>Not the boilerplate.</span></h1><p className="hero-copy">Define your infrastructure once. Generate clean, consistent configuration files whenever you need them.</p><div className="hero-buttons"><button className="primary-btn" onClick={() => setPage('Service catalog')}><Plus size={17}/> Create configuration <ArrowRight size={16}/></button><button className="secondary-btn" onClick={() => { setPage('My configurations'); notify('Your local workspace is ready.') }}><Terminal size={16}/> View workspace</button></div></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-core"><Command size={39}/></div><div className="float-card float-top"><Code2 size={15}/><span>Declarative config</span><Check size={14}/></div><div className="float-card float-bottom"><GitBranch size={15}/><span>Version-ready</span><span className="mini-live"/></div></div></div>
          <div className="stats-grid"><div className="stat-card"><div className="stat-icon violet"><Boxes size={18}/></div><span>Available services</span><strong>06</strong><small>Starter catalog <span>·</span> sample data</small></div><div className="stat-card"><div className="stat-icon cyan"><FileCode2 size={18}/></div><span>Configurations</span><strong>{generated ? '01' : '00'}</strong><small>{generated ? 'Created in this session' : 'Ready for your first build'}</small></div><div className="stat-card"><div className="stat-icon green"><ShieldCheck size={18}/></div><span>Generation mode</span><strong className="stat-word">Declarative</strong><small><span className="status-dot"/> YAML-based workflow</small></div></div>
          <div className="section-heading"><div><h2>Start with a building block</h2><p>Popular services to kick off your infrastructure.</p></div><button className="text-link" onClick={() => setPage('Service catalog')}>Browse catalog <ArrowRight size={15}/></button></div>
          <div className="service-grid">{services.slice(0,3).map(s => <ServiceCard key={s.name} service={s} selected={selected.some(x => x.name === s.name)} onSelect={() => toggleService(s)} compact/>)}</div>
          <div className="bottom-banner"><div className="banner-icon"><Terminal size={20}/></div><div><b>Prefer the terminal?</b><p>DevInit is designed to bring the same declarative workflow to your CLI.</p></div><span className="banner-tag">CLI + WEB</span></div>
        </>}
        {page === 'Service catalog' && <><div className="page-heading"><div className="eyebrow"><Boxes size={14}/> COMPONENT LIBRARY</div><h1>Service catalog</h1><p>Choose the building blocks for your next environment.</p></div><div className="catalog-toolbar"><div className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search services..."/><kbd>⌘ K</kbd></div><select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter by category"><option>All services</option><option>Database</option><option>Cache</option><option>Web server</option><option>Messaging</option></select><span className="results-count">{filtered.length} services</span></div><div className="service-grid catalog-grid">{filtered.map(s => <ServiceCard key={s.name} service={s} selected={selected.some(x => x.name === s.name)} onSelect={() => toggleService(s)}/>)}</div>{filtered.length === 0 && <div className="empty-state">No services found. Try another search.</div>}<div className="sticky-selection"><div><b>{selected.length} selected</b><span>{selected.length ? selected.map(s => s.name).join(', ') : 'Choose at least one service'}</span></div><button className="primary-btn" disabled={!selected.length} onClick={() => setPage('My configurations')}>Configure selection <ArrowRight size={16}/></button></div></>}
        {page === 'My configurations' && <><div className="page-heading"><div className="eyebrow"><FileCode2 size={14}/> CONFIGURATION BUILDER</div><h1>My configurations</h1><p>Compose a stack and preview a starter YAML configuration.</p></div><div className="builder-layout"><section className="panel builder-form"><div className="panel-title"><div><h2>Configuration details</h2><p>Set a name and choose services.</p></div><span className="step-tag">STEP 01</span></div><label className="field-label" htmlFor="configName">Configuration name</label><input id="configName" className="text-input" value={configName} onChange={e => { setConfigName(e.target.value); setGenerated(false) }} placeholder="my-infrastructure"/><div className="field-row"><label className="field-label">Selected services <span>{selected.length}</span></label><button className="text-link" onClick={() => setPage('Service catalog')}><Plus size={14}/> Add service</button></div><div className="selected-list">{selected.map(s => <div className="selected-service" key={s.name}><div className={`service-icon ${s.color}`}>{s.icon}</div><div className="selected-name"><b>{s.name}</b><small>Image tag :{s.version}</small></div><button className="icon-btn remove-btn" onClick={() => toggleService(s)} aria-label={`Remove ${s.name}`}><X size={16}/></button></div>)}{!selected.length && <div className="empty-inline">No services selected yet. Add one from the catalog.</div>}</div><button className="primary-btn full-btn" disabled={!selected.length || !configName.trim()} onClick={() => { setGenerated(true); notify('YAML preview generated') }}><Sparkles size={16}/> Generate YAML preview</button><p className="note"><LockKeyhole size={13}/> Preview is generated in your browser. It is not saved to the backend yet.</p></section><section className="panel code-panel"><div className="code-top"><div><span className="code-dot"/><span className="code-file">devinit.yaml</span><span className="code-language">YAML</span></div><button className="code-copy" onClick={() => { void navigator.clipboard?.writeText(makeYaml()); notify('YAML copied to clipboard') }}><Copy size={14}/> Copy</button></div><pre className="yaml-code">{makeYaml().split('\n').map((line, i) => <div key={i} className="code-line"><span className="line-no">{String(i + 1).padStart(2,'0')}</span><span className={line.trim().endsWith(':') ? 'yaml-key' : line.includes('image:') ? 'yaml-value' : ''}>{line || ' '}</span></div>)}</pre><div className="code-footer"><span><span className="status-dot"/> {generated ? 'Preview generated' : 'Preview updates as you edit'}</span><button onClick={() => { void navigator.clipboard?.writeText(makeYaml()); notify('YAML copied to clipboard') }}><ArrowDownToLine size={14}/> Export later via CLI</button></div></section></div></>}
        {page === 'Versions' && <><div className="page-heading"><div className="eyebrow"><GitBranch size={14}/> CHANGE HISTORY</div><h1>Version management</h1><p>Track configuration changes and keep releases predictable.</p></div><div className="panel versions-panel"><div className="empty-illustration"><div><GitBranch size={29}/></div></div><h2>Version history is coming next</h2><p>The backend currently contains service-version database models, but version API endpoints are not implemented yet. This page is a UI placeholder until those endpoints are ready.</p><button className="secondary-btn" onClick={() => setPage('My configurations')}>Open configuration builder <ArrowRight size={15}/></button></div></>}
        <footer className="footer"><span>© 2026 DevInit</span><span><span className="footer-dot"/> Built for predictable infrastructure</span><span>Frontend preview · React + TypeScript</span></footer>
      </div>
    </main>
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    {authOpen && <div className="modal-backdrop" onClick={() => setAuthOpen(false)}><div className="auth-modal" onClick={e => e.stopPropagation()}><button className="modal-close icon-btn" onClick={() => setAuthOpen(false)} aria-label="Close"><X size={18}/></button><div className="modal-logo"><Command size={22}/></div><h2>{authMode === 'login' ? 'Welcome back' : 'Create your workspace'}</h2><p>{authMode === 'login' ? 'Sign in to continue to DevInit.' : 'One account to manage your infrastructure.'}</p><form onSubmit={submitAuth}>{authMode === 'register' && <label className="form-field">Full name<input required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" maxLength={100}/></label>}<label className="form-field">Email address<input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" maxLength={200}/></label><label className="form-field">Password<input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" minLength={8}/></label>{authMode === 'register' && <small className="password-hint">Use uppercase, lowercase, a number and a special character (!@#$%^&amp;*).</small>}{authMessage && <div className={authError ? 'auth-message error' : 'auth-message'}>{authMessage}</div>}<button className="primary-btn full-btn" disabled={busy}>{busy ? 'Please wait...' : authMode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={15}/></button></form><div className="auth-switch">{authMode === 'login' ? 'New to DevInit?' : 'Already have an account?'} <button onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthMessage(''); setAuthError(false) }}>{authMode === 'login' ? 'Create account' : 'Sign in'}</button></div><div className="api-footnote"><Activity size={13}/> API: {API_URL}</div></div></div>}
  </div>
}

function ServiceCard({ service, selected, onSelect, compact = false }: { service: Service; selected: boolean; onSelect: () => void; compact?: boolean }) {
  return <article className={`service-card ${selected ? 'service-selected' : ''} ${compact ? 'compact-card' : ''}`}><div className="service-card-top"><div className={`service-icon ${service.color}`}>{service.icon}</div><span className="version-tag">v{service.version}</span></div><div className="service-card-title"><h3>{service.name}</h3>{selected && <span className="selected-check"><Check size={12}/></span>}</div><p>{service.description}</p><div className="service-card-bottom"><span className="category-tag">{service.category}</span><button className={selected ? 'selected-btn' : 'add-btn'} onClick={onSelect}>{selected ? <><Check size={14}/> Added</> : <><Plus size={14}/> Add service</>}</button></div></article>
}
