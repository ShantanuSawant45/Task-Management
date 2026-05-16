import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0a0a0f;
    --surface:   #13131a;
    --border:    rgba(255,255,255,0.07);
    --accent:    #c8f04a;
    --accent2:   #6e56cf;
    --text:      #f0f0f5;
    --muted:     #6b6b80;
    --danger:    #ff5c5c;
    --card-h:    320px;
    --radius:    16px;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

  /* ── Layout ── */
  .dash-root {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 80% 50% at 20% -10%, rgba(110,86,207,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 110%, rgba(200,240,74,0.08) 0%, transparent 55%);
  }

  /* ── Nav ── */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 48px;
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(12px);
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,10,15,0.75);
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 1.3rem;
    letter-spacing: -0.5px;
    color: var(--text);
  }
  .nav-logo span { color: var(--accent); }
  .nav-actions { display: flex; gap: 12px; align-items: center; }

  /* ── Buttons ── */
  .btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem; font-weight: 500;
    padding: 10px 20px; border-radius: 10px;
    border: none; cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex; align-items: center; gap: 7px;
  }
  .btn-primary {
    background: var(--accent); color: #0a0a0f;
    font-weight: 700;
  }
  .btn-primary:hover { background: #d8ff5a; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(200,240,74,0.25); }
  .btn-ghost {
    background: transparent; color: var(--muted);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
  .btn-danger { background: rgba(255,92,92,0.12); color: var(--danger); border: 1px solid rgba(255,92,92,0.2); }
  .btn-danger:hover { background: rgba(255,92,92,0.22); }

  /* ── Hero strip ── */
  .hero {
    padding: 56px 48px 40px;
    display: flex; align-items: flex-end; justify-content: space-between;
    gap: 24px;
  }
  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800; line-height: 1.1;
    letter-spacing: -1px;
  }
  .hero-title em { color: var(--accent); font-style: normal; }
  .hero-sub { margin-top: 10px; color: var(--muted); font-size: 0.95rem; font-weight: 300; }
  .hero-stat {
    font-family: 'Syne', sans-serif;
    font-size: 3.5rem; font-weight: 800;
    color: var(--accent); line-height: 1;
  }
  .hero-stat-label { font-size: 0.8rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; }

  /* ── Grid ── */
  .grid-wrap { padding: 0 48px 80px; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  /* ── Project Card ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    cursor: pointer;
    position: relative;
    height: var(--card-h);
    display: flex; flex-direction: column; justify-content: flex-end;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    animation: fadeUp 0.5s ease both;
  }
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,240,74,0.15);
    border-color: rgba(200,240,74,0.2);
  }
  .card:hover .card-arrow { opacity: 1; transform: translate(0,0); }
  .card:hover .card-glow { opacity: 1; }

  .card-glow {
    position: absolute; inset: 0;
    background: radial-gradient(circle at top right, rgba(200,240,74,0.06), transparent 65%);
    opacity: 0; transition: opacity 0.3s;
    pointer-events: none;
  }

  .card-color-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
  }

  .card-body { padding: 28px; position: relative; z-index: 1; }

  .card-tag {
    display: inline-block;
    font-size: 0.7rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 1.2px;
    padding: 4px 10px; border-radius: 6px;
    margin-bottom: 14px;
    background: rgba(255,255,255,0.07); color: var(--muted);
  }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem; font-weight: 700;
    line-height: 1.3; margin-bottom: 10px;
    color: var(--text);
  }

  .card-desc {
    font-size: 0.85rem; color: var(--muted);
    line-height: 1.6; font-weight: 300;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
    margin-bottom: 20px;
  }

  .card-footer {
    display: flex; align-items: center; justify-content: space-between;
  }

  .card-meta { display: flex; align-items: center; gap: 8px; }
  .card-avatar {
    width: 26px; height: 26px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; font-weight: 700; color: #fff;
  }
  .card-date { font-size: 0.75rem; color: var(--muted); }

  .card-arrow {
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--accent); color: #0a0a0f;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    opacity: 0; transform: translate(-4px, 4px);
    transition: all 0.25s ease;
  }

  /* card color accent variants */
  .card-bar-0 { background: linear-gradient(90deg, #c8f04a, #6e56cf); }
  .card-bar-1 { background: linear-gradient(90deg, #6e56cf, #c084fc); }
  .card-bar-2 { background: linear-gradient(90deg, #f04a7a, #ff9a5c); }
  .card-bar-3 { background: linear-gradient(90deg, #4ac8f0, #6e56cf); }
  .card-bar-4 { background: linear-gradient(90deg, #f0c84a, #f04a7a); }

  /* ── Modal overlay ── */
  .overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: fadeIn 0.2s ease;
  }
  .modal {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px;
    width: 100%; max-width: 480px;
    animation: slideUp 0.25s ease;
  }
  .modal h2 {
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem; font-weight: 800; margin-bottom: 6px;
  }
  .modal p { color: var(--muted); font-size: 0.875rem; margin-bottom: 28px; }

  .field { margin-bottom: 18px; }
  .field label {
    display: block; font-size: 0.8rem; font-weight: 500;
    color: var(--muted); text-transform: uppercase; letter-spacing: 1px;
    margin-bottom: 8px;
  }
  .field input, .field textarea {
    width: 100%; background: rgba(255,255,255,0.04);
    border: 1px solid var(--border); border-radius: 10px;
    color: var(--text); font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; padding: 12px 16px;
    outline: none; resize: vertical;
    transition: border-color 0.2s;
  }
  .field input:focus, .field textarea:focus { border-color: var(--accent); }
  .field textarea { min-height: 90px; }

  .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 28px; }

  /* ── States ── */
  .state-center {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    min-height: 55vh; gap: 14px; color: var(--muted);
    font-size: 0.9rem;
  }
  .spinner {
    width: 36px; height: 36px; border-radius: 50%;
    border: 2px solid var(--border); border-top-color: var(--accent);
    animation: spin 0.7s linear infinite;
  }
  .empty-icon { font-size: 3rem; opacity: 0.4; }

  /* ── Error toast ── */
  .toast {
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
    background: rgba(255,92,92,0.15); border: 1px solid rgba(255,92,92,0.3);
    color: var(--danger); border-radius: 10px; padding: 12px 22px;
    font-size: 0.875rem; z-index: 300; backdrop-filter: blur(8px);
    animation: fadeIn 0.2s ease;
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* staggered card delays */
  .card:nth-child(1) { animation-delay: 0.05s; }
  .card:nth-child(2) { animation-delay: 0.1s; }
  .card:nth-child(3) { animation-delay: 0.15s; }
  .card:nth-child(4) { animation-delay: 0.2s; }
  .card:nth-child(5) { animation-delay: 0.25s; }
  .card:nth-child(6) { animation-delay: 0.3s; }

  @media (max-width: 640px) {
    .nav, .hero, .grid-wrap { padding-left: 20px; padding-right: 20px; }
    .hero { flex-direction: column; align-items: flex-start; padding-top: 36px; }
  }
`;

const PALETTE = ["card-bar-0","card-bar-1","card-bar-2","card-bar-3","card-bar-4"];

function initials(name = "") {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "PR";
}

function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick }) {
  return (
    <article className="card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick()}
      aria-label={`Open project: ${project.title}`}>
      <div className="card-glow" />
      <div className={`card-color-bar ${PALETTE[index % PALETTE.length]}`} />
      <div className="card-body">
        <span className="card-tag">Project</span>
        <h2 className="card-title">{project.title}</h2>
        <p className="card-desc">{project.description || "No description provided."}</p>
        <div className="card-footer">
          <div className="card-meta">
            <div className="card-avatar">{initials(project.title)}</div>
            <span className="card-date">{fmtDate(project.created_at)}</span>
          </div>
          <div className="card-arrow">→</div>
        </div>
      </div>
    </article>
  );
}

// ── New Project Modal ─────────────────────────────────────────────────────────
function NewProjectModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/projects/", { title, description }, {
        headers: { Authorization: `Bearer ${token}`},
      });
      onCreate(res.data);
      onClose();
    } catch {
      // parent can handle errors
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title">New Project</h2>
        <p>Fill in the details to create your project.</p>

        <div className="field">
          <label htmlFor="proj-title">Title</label>
          <input id="proj-title" type="text" placeholder="e.g. Marketing Redesign"
            value={title} onChange={e => setTitle(e.target.value)}
            autoFocus />
        </div>
        <div className="field">
          <label htmlFor="proj-desc">Description</label>
          <textarea id="proj-desc" placeholder="What's this project about?"
            value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving || !title.trim()}>
            {saving ? "Creating…" : "+ Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch {
        setError("Could not load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleCreate = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">

        {/* Nav */}
        <nav className="nav">
          <div className="nav-logo">work<span>space</span></div>
          <div className="nav-actions">
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + New Project
            </button>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div>
            <h1 className="hero-title">Your <em>Projects</em></h1>
            <p className="hero-sub">Click any card to dive in, or create something new.</p>
          </div>
          {!loading && (
            <div style={{ textAlign: "right" }}>
              <div className="hero-stat">{projects.length}</div>
              <div className="hero-stat-label">Total Projects</div>
            </div>
          )}
        </section>

        {/* States */}
        {loading && (
          <div className="state-center">
            <div className="spinner" />
            <span>Loading your projects…</span>
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="state-center">
            <div className="empty-icon">◻</div>
            <span>No projects yet. Create your first one!</span>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + New Project
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && projects.length > 0 && (
          <section className="grid-wrap">
            <div className="grid">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => navigate(`/projects/${project.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Modal */}
        {showModal && (
          <NewProjectModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
        )}

        {/* Error toast */}
        {error && <div className="toast">⚠ {error}</div>}
      </div>
    </>
  );
}