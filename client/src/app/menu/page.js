"use client";
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Search, Filter, ShoppingCart, Plus, Minus, Calendar, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

// Food image lookup: check item name first, then fall back to category
const FOOD_IMAGES = {
  // By exact name (lowercase)
  'idli sambar': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80',
  'masala dosa': 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80',
  'veg thali': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
  'chicken biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80',
  'paneer butter masala': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80',
  'cold coffee': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
  'veg burger': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80',
  'cheese sandwich': 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&q=80',
  'chocolate brownie': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
  'protein shake': 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=400&q=80',
  'fruit salad': 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80',
  'oats bowl': 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&q=80',
};

// Fallback by category (lowercase)
const CATEGORY_IMAGES = {
  'breakfast': 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80',
  'lunch': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
  'dinner': 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80',
  'snacks': 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80',
  'beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
  'dessert': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
};

function getFoodImage(name, category) {
  const nameLower = (name || '').toLowerCase();
  const catLower = (category || '').toLowerCase();
  return FOOD_IMAGES[nameLower] || CATEGORY_IMAGES[catLower] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80';
}

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [outlets, setOutlets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedOutlet, setSelectedOutlet] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [menuRes, outletsRes] = await Promise.all([
                    api.get('/menu'),
                    api.get('/menu/outlets')
                ]);
                setMenuItems(menuRes.data);
                setFilteredItems(menuRes.data);
                setOutlets(outletsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let result = menuItems;

        // Filter by search term
        if (searchTerm) {
            result = result.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Filter by category
        if (selectedCategory !== 'All') {
            result = result.filter(item => item.category === selectedCategory);
        }

        // Filter by outlet
        if (selectedOutlet !== 'All') {
            result = result.filter(item => item.outletId === selectedOutlet);
        }

        setFilteredItems(result);
    }, [searchTerm, selectedCategory, selectedOutlet, menuItems]);

    const addToCart = (item) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find((i) => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
        alert('Added to cart!');
    };

    const categories = ['All', ...new Set(menuItems.map(item => item.category))];

    if (loading) return (
        <div style={{
            textAlign: 'center',
            marginTop: '100px',
            fontSize: '1.2rem',
            color: 'var(--gray-dark)'
        }}>
            Loading delicious items...
        </div>
    );

    return (
        <div style={{ padding: '40px 20px' }}>
            <div className="container">
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: '3rem',
                        marginBottom: '10px',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Our Menu
                    </h2>
                    <p style={{ color: 'var(--gray-dark)', fontSize: '1.2rem' }}>
                        Explore our delicious offerings
                    </p>
                </div>

                {/* Search and Filter - Modern Card Design */}
                <div style={{
                    marginBottom: '50px',
                    maxWidth: '900px',
                    margin: '0 auto 50px'
                }}>
                    {/* Search Bar */}
                    <div style={{
                        position: 'relative',
                        marginBottom: '24px',
                        background: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        overflow: 'hidden'
                    }}>
                        <Search
                            size={20}
                            style={{
                                position: 'absolute',
                                left: '20px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#9CA3AF'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search for delicious food..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '18px 20px 18px 52px',
                                border: 'none',
                                borderRadius: '16px',
                                fontSize: '1rem',
                                color: '#1F2937',
                                outline: 'none',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </div>

                    {/* Filters Card */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        {/* Outlet Selector */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            paddingBottom: '20px',
                            borderBottom: '1px solid #F3F4F6'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                minWidth: '120px',
                                color: '#6B7280',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                <MapPin size={18} style={{ color: 'var(--primary)' }} />
                                <span>Location</span>
                            </div>

                            <select
                                value={selectedOutlet}
                                onChange={(e) => setSelectedOutlet(e.target.value === 'All' ? 'All' : parseInt(e.target.value))}
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #E5E7EB',
                                    fontSize: '0.95rem',
                                    fontWeight: '500',
                                    color: '#1F2937',
                                    backgroundColor: '#F9FAFB',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none',
                                    appearance: 'none',
                                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 12px center',
                                    backgroundSize: '20px',
                                    paddingRight: '40px'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.borderColor = 'var(--primary)';
                                    e.target.style.backgroundColor = 'white';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.borderColor = '#E5E7EB';
                                    e.target.style.backgroundColor = '#F9FAFB';
                                }}
                            >
                                <option value="All">All Outlets</option>
                                {outlets.map(outlet => (
                                    <option key={outlet.id} value={outlet.id}>
                                        {outlet.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Category Filters */}
                        <div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '16px',
                                color: '#6B7280',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                <Filter size={18} style={{ color: 'var(--primary)' }} />
                                <span>Category</span>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '10px',
                                flexWrap: 'wrap'
                            }}>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        style={{
                                            padding: '10px 20px',
                                            borderRadius: '10px',
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            border: selectedCategory === cat ? 'none' : '2px solid #E5E7EB',
                                            background: selectedCategory === cat
                                                ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'
                                                : '#F9FAFB',
                                            color: selectedCategory === cat ? 'white' : '#6B7280',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            boxShadow: selectedCategory === cat
                                                ? '0 4px 12px rgba(99, 102, 241, 0.3)'
                                                : 'none',
                                            transform: selectedCategory === cat ? 'translateY(-2px)' : 'none'
                                        }}
                                        onMouseOver={(e) => {
                                            if (selectedCategory !== cat) {
                                                e.target.style.borderColor = 'var(--primary)';
                                                e.target.style.backgroundColor = '#F3F4F6';
                                                e.target.style.transform = 'translateY(-1px)';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (selectedCategory !== cat) {
                                                e.target.style.borderColor = '#E5E7EB';
                                                e.target.style.backgroundColor = '#F9FAFB';
                                                e.target.style.transform = 'none';
                                            }
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="grid">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="card" style={{
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 0
                        }}>
                            {/* Food Image */}
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '200px',
                                overflow: 'hidden',
                                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                                flexShrink: 0
                            }}>
                                <img
                                    src={getFoodImage(item.name, item.category)}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.4s ease'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.07)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    onError={e => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80';
                                    }}
                                />
                                {/* Category Badge on image */}
                                <span className="badge badge-warning" style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    zIndex: 1,
                                    backdropFilter: 'blur(8px)',
                                    background: 'rgba(253, 203, 110, 0.9)'
                                }}>
                                    {item.category}
                                </span>
                                {/* Unavailable overlay */}
                                {!item.isAvailable && (
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(0,0,0,0.5)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: '700',
                                        fontSize: '1.1rem',
                                        letterSpacing: '1px'
                                    }}>
                                        UNAVAILABLE
                                    </div>
                                )}
                            </div>

                            {/* Card Body */}
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ marginBottom: '10px' }}>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        marginBottom: '6px',
                                        color: 'var(--dark)',
                                        fontWeight: '700'
                                    }}>
                                        {item.name}
                                    </h3>

                                    {item.outlet && (
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '13px',
                                            color: 'var(--gray-dark)',
                                            marginBottom: '6px'
                                        }}>
                                            <MapPin size={14} />
                                            {item.outlet.name}
                                        </div>
                                    )}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginBottom: '16px',
                                    fontSize: '14px',
                                    color: 'var(--gray-dark)'
                                }}>
                                    <Clock size={16} />
                                    {item.preparationTime || 'N/A'}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: 'auto'
                                }}>
                                    <span style={{
                                        fontWeight: '800',
                                        fontSize: '1.6rem',
                                        color: 'var(--primary)'
                                    }}>
                                        ₹{item.price}
                                    </span>

                                    <button
                                        onClick={() => addToCart(item)}
                                        className="btn btn-secondary"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '10px 20px',
                                            borderRadius: '50px'
                                        }}
                                        disabled={!item.isAvailable}
                                    >
                                        <ShoppingCart size={18} />
                                        {item.isAvailable ? 'Add' : 'Unavailable'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {filteredItems.length === 0 && (
                    <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--gray-dark)' }}>
                        <p>No items found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
