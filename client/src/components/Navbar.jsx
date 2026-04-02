"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShoppingCart, User, LogOut, Menu as MenuIcon, X, Bell, Award, MessageSquare, Utensils, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Check for user in localStorage
        const checkUser = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                // Fetch actual unread notifications count from API
                api.get('/notifications')
                    .then(res => {
                        const unread = res.data.filter(n => !n.isRead).length;
                        setUnreadCount(unread);
                    })
                    .catch(() => setUnreadCount(0));
            } else {
                setUser(null);
                setUnreadCount(0);
            }
        };

        const checkCart = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const count = cart.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(count);
        };

        checkUser();
        checkCart();

        // Listen for custom login event
        window.addEventListener('user-login', checkUser);
        // Listen for storage changes (logout in another tab)
        window.addEventListener('storage', checkUser);
        window.addEventListener('storage', checkCart);
        // Listen for custom cart update event
        window.addEventListener('cart-updated', checkCart);

        return () => {
            window.removeEventListener('user-login', checkUser);
            window.removeEventListener('storage', checkUser);
            window.removeEventListener('storage', checkCart);
            window.removeEventListener('cart-updated', checkCart);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    const isActive = (path) => pathname === path;

    return (
        <nav className="navbar glass" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="container">
                <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Utensils size={18} />
                    </div>
                    MessMate
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    
                    {/* Common Links or Role-Specific Home */}
                    {!user || user.role?.toLowerCase() === 'student' ? (
                        <Link href="/" style={{ 
                            color: isActive('/') ? 'var(--primary)' : 'var(--gray-dark)',
                            fontWeight: isActive('/') ? '700' : '500'
                        }}>
                            Home
                        </Link>
                    ) : null}

                    {/* Role Based Links */}
                    {user?.role?.toLowerCase() === 'admin' && (
                        <>
                            <Link href="/admin" style={{ 
                                color: isActive('/admin') ? 'var(--primary)' : 'var(--gray-dark)',
                                fontWeight: isActive('/admin') ? '700' : '500'
                            }}>
                                Dashboard
                            </Link>
                            <Link href="/admin/manage-menu" style={{ 
                                color: isActive('/admin/manage-menu') ? 'var(--primary)' : 'var(--gray-dark)',
                                fontWeight: isActive('/admin/manage-menu') ? '700' : '500'
                            }}>
                                Manage Menu
                            </Link>
                            <Link href="/admin/all-orders" style={{ 
                                color: isActive('/admin/all-orders') ? 'var(--primary)' : 'var(--gray-dark)',
                                fontWeight: isActive('/admin/all-orders') ? '700' : '500'
                            }}>
                                All Orders
                            </Link>
                            <Link href="/admin/feedbacks" style={{ 
                                color: isActive('/admin/feedbacks') ? 'var(--primary)' : 'var(--gray-dark)',
                                fontWeight: isActive('/admin/feedbacks') ? '700' : '500'
                            }}>
                                All Feedbacks
                            </Link>
                        </>
                    )}



                    {(!user || user.role?.toLowerCase() === 'student') && (
                        <>
                            <Link href="/menu" style={{ 
                                color: isActive('/menu') ? 'var(--primary)' : 'var(--gray-dark)',
                                fontWeight: isActive('/menu') ? '700' : '500'
                            }}>
                                Menu
                            </Link>
                            <Link href="/cart" style={{ 
                                color: isActive('/cart') ? 'var(--primary)' : 'var(--gray-dark)',
                                fontWeight: isActive('/cart') ? '700' : '500',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        fontSize: '10px',
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold'
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            {user && (
                                <Link href="/orders" style={{ 
                                    color: isActive('/orders') ? 'var(--primary)' : 'var(--gray-dark)',
                                    fontWeight: isActive('/orders') ? '700' : '500'
                                }}>
                                    My Orders
                                </Link>
                            )}
                        </>
                    )}
                    
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Link href="/notifications" style={{ position: 'relative', color: 'var(--gray-dark)' }}>
                                <Bell size={22} />
                                {unreadCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-5px',
                                        background: 'var(--danger)',
                                        color: 'white',
                                        fontSize: '10px',
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold'
                                    }}>
                                        {unreadCount}
                                    </span>
                                )}
                            </Link>

                            <div className="dropdown" style={{ position: 'relative' }}>
                                <button 
                                    className="btn"
                                    style={{ 
                                        padding: '8px 16px', 
                                        background: 'rgba(108, 92, 231, 0.1)', 
                                        color: 'var(--primary)',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <User size={18} />
                                    <span>{user.name.split(' ')[0]}</span>
                                    {user.role && (
                                        <span style={{
                                            fontSize: '0.7rem',
                                            padding: '2px 6px',
                                            background: 'var(--primary)',
                                            color: 'white',
                                            borderRadius: '10px',
                                            textTransform: 'uppercase',
                                            marginLeft: '4px'
                                        }}>
                                            {user.role}
                                        </span>
                                    )}
                                </button>
                                
                                {isMenuOpen && (
                                    <div className="glass" style={{
                                        position: 'absolute',
                                        top: '120%',
                                        right: 0,
                                        width: '220px',
                                        background: 'white',
                                        borderRadius: '16px',
                                        padding: '10px',
                                        boxShadow: 'var(--shadow-lg)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '5px'
                                    }}>
                                        <Link href="/profile" className="dropdown-item" style={{ padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--dark)', transition: 'background 0.2s' }}>
                                            <User size={16} /> Profile
                                        </Link>
                                        {user.role?.toLowerCase() === 'student' && (
                                            <Link href="/rewards" className="dropdown-item" style={{ padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--dark)', transition: 'background 0.2s' }}>
                                                <Award size={16} /> Rewards
                                            </Link>
                                        )}
                                        {user.role?.toLowerCase() === 'student' && (
                                            <Link href="/feedback" className="dropdown-item" style={{ padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--dark)', transition: 'background 0.2s' }}>
                                                <MessageSquare size={16} /> Feedback
                                            </Link>
                                        )}
                                        <div style={{ height: '1px', background: 'var(--gray)', margin: '5px 0' }}></div>
                                        <button onClick={handleLogout} className="dropdown-item" style={{ padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--danger)', background: 'transparent', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}>
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Link href="/login" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                                Login
                            </Link>
                            <Link href="/register" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
                .dropdown-item:hover {
                    background: var(--light);
                }
            `}</style>
        </nav>
    );
}
