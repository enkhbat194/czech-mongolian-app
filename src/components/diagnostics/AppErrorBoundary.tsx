import React from 'react';

type Props = { children: React.ReactNode };
type State = { error: Error | null; info: React.ErrorInfo | null };

class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null, info: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ info });
    console.error('App render failed', error, info);
  }

  render() {
    const { error, info } = this.state;
    if (!error) return this.props.children;

    return (
      <div style={{ minHeight: '100dvh', background: '#0C0C0E', color: '#FFF', fontFamily: 'Inter,sans-serif', padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <section style={{ width: '100%', maxWidth: 430, background: '#1C1C1F', border: '1px solid #2A2A2F', borderRadius: 22, padding: 18 }}>
          <p style={{ margin: '0 0 6px', color: '#F87171', fontSize: 12, fontWeight: 900 }}>APP RUNTIME ERROR</p>
          <h1 style={{ margin: '0 0 10px', fontSize: 20 }}>Цагаан дэлгэцийн алдаа баригдлаа</h1>
          <p style={{ margin: '0 0 12px', color: '#D1D1D6', fontSize: 13, lineHeight: 1.5 }}>Доорх мессежийг screenshot хийж явуул. Энэ нь яг ямар component дээр унасныг харуулна.</p>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: '#0C0C0E', border: '1px solid #34343A', borderRadius: 14, padding: 12, color: '#FCA5A5', fontSize: 12, maxHeight: '34dvh', overflow: 'auto' }}>{error.message}\n\n{info?.componentStack || error.stack}</pre>
          <button onClick={() => window.location.reload()} className="btn-gold" style={{ width: '100%', marginTop: 14, padding: 13 }}>Дахин ачаалах</button>
        </section>
      </div>
    );
  }
}

export default AppErrorBoundary;
