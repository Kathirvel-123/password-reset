// src/components/AuthLayout.js
export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-glass-root">
      <div className="auth-glass-overlay" />
      <div className="auth-glass-content">
        <div className="auth-glass-card">
          <h3 className="mb-2 text-center">{title}</h3>
          {subtitle && (
            <p className="text-white/50 text-center mb-4 small">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
