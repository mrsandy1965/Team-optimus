import Link from 'next/link';
import { Utensils, Clock, QrCode, TrendingUp, Users, Award, ArrowRight, CheckCircle, Star, Quote } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        padding: '120px 20px 160px',
        textAlign: 'center',
        borderRadius: '0 0 60px 60px',
        marginBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}>
        {/* Animated background circles */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          top: '-200px',
          right: '-100px',
          animation: 'pulse 10s infinite ease-in-out'
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
          bottom: '-100px',
          left: '-50px',
          animation: 'pulse 8s infinite ease-in-out reverse'
        }} />

        <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge badge-warning" style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Star size={12} fill="currentColor" />
            #1 Campus Dining App
          </div>
          <h1 style={{
            fontSize: '4.5rem',
            marginBottom: '24px',
            fontWeight: '800',
            letterSpacing: '-2px',
            lineHeight: '1.1',
            textShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            Dining, <span style={{ color: 'var(--accent)', position: 'relative' }}>Reimagined
              <svg style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: '10px' }} viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="var(--accent)" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h1>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '40px',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            Skip the queues, order ahead, and enjoy delicious meals from your favorite campus outlets.
            Experience the future of dining today.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/menu"
              className="btn"
              style={{
                fontSize: '1.1rem',
                padding: '16px 36px',
                background: 'white',
                color: 'var(--primary)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              }}
            >
              Order Now
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/register"
              className="btn"
              style={{
                fontSize: '1.1rem',
                padding: '16px 36px',
                background: 'white',
                color: 'var(--primary)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                fontWeight: '700'
              }}
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section - Floating Cards */}
      <div className="container" style={{ marginTop: '-120px', position: 'relative', zIndex: 10 }}>
        <div className="grid animate-fade-in delay-1">
          <div className="card glass" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              color: 'var(--primary)',
              marginBottom: '5px',
              lineHeight: 1
            }}>
              3+
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--gray-dark)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Campus Outlets</p>
          </div>

          <div className="card glass" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              color: 'var(--secondary)',
              marginBottom: '5px',
              lineHeight: 1
            }}>
              50+
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--gray-dark)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Menu Items</p>
          </div>

          <div className="card glass" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              color: 'var(--accent)',
              marginBottom: '5px',
              lineHeight: 1
            }}>
              1k+
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--gray-dark)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Happy Students</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container" style={{ padding: '100px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '15px', display: 'inline-block' }}>Features</span>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            fontWeight: '800',
            color: 'var(--dark)'
          }}>
            Why Choose MessMate?
          </h2>
          <p style={{ color: 'var(--gray-dark)', maxWidth: '600px', margin: '0 auto' }}>
            We've streamlined the entire dining process to make your life easier.
          </p>
        </div>

        <div className="grid">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{
              background: 'rgba(108, 92, 231, 0.1)',
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 25px',
              color: 'var(--primary)'
            }}>
              <Utensils size={36} />
            </div>
            <h3 style={{ marginBottom: '15px', fontSize: '1.4rem', fontWeight: '700' }}>Diverse Menu</h3>
            <p style={{ color: 'var(--gray-dark)' }}>
              Explore a variety of cuisines from different outlets. From breakfast to dinner,
              we've got you covered.
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{
              background: 'rgba(0, 206, 201, 0.1)',
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 25px',
              color: 'var(--secondary)'
            }}>
              <Clock size={36} />
            </div>
            <h3 style={{ marginBottom: '15px', fontSize: '1.4rem', fontWeight: '700' }}>Quick Service</h3>
            <p style={{ color: 'var(--gray-dark)' }}>
              Pre-order your meals and skip the long queues. Your food will be ready
              when you arrive.
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{
              background: 'rgba(253, 203, 110, 0.1)',
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 25px',
              color: '#e67e22'
            }}>
              <QrCode size={36} />
            </div>
            <h3 style={{ marginBottom: '15px', fontSize: '1.4rem', fontWeight: '700' }}>Digital Access</h3>
            <p style={{ color: 'var(--gray-dark)' }}>
              Use QR codes for seamless meal redemption. Go paperless and enjoy
              a contactless experience.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ background: 'var(--white)', padding: '100px 20px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="badge badge-warning" style={{ marginBottom: '15px', display: 'inline-block' }}>Testimonials</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: '800' }}>What Students Say</h2>
          </div>

          <div className="grid">
            {[
              { name: "Alex Johnson", role: "Computer Science", text: "MessMate has completely changed how I eat on campus. No more waiting in lines!" },
              { name: "Sarah Williams", role: "Engineering", text: "The pre-order feature is a lifesaver during exam weeks. Highly recommend it." },
              { name: "Michael Chen", role: "Business", text: "Love the rewards system! Getting free coffee just for eating lunch is amazing." }
            ].map((t, i) => (
              <div key={i} className="card" style={{ padding: '30px' }}>
                <Quote size={32} color="var(--primary)" style={{ opacity: 0.2, marginBottom: '20px' }} />
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '20px', color: 'var(--dark)' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--gray-dark)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{t.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container" style={{ padding: '100px 20px' }}>
        <div className="card" style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
          padding: '80px 40px',
          textAlign: 'center',
          color: 'white',
          borderRadius: '40px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: '800' }}>
              Ready to Transform Your Dining?
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 40px' }}>
              Join thousands of students already enjoying hassle-free campus dining.
            </p>
            <Link
              href="/register"
              className="btn"
              style={{
                fontSize: '1.2rem',
                padding: '18px 48px',
                background: 'white',
                color: 'var(--primary)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
            >
              Sign Up Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
