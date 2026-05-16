import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Share2, Sparkles, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Blog.css';

import { blogPosts } from '../data/blogData';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('tt_blogs_v9');
    if (saved) {
      try {
        const allBlogs = JSON.parse(saved);
        return allBlogs.filter(b => b.status === 'Published');
      } catch (e) {
        console.error("Error parsing blogs data", e);
        return blogPosts.filter(b => b.status === 'Published');
      }
    } else {
      // Initialize localStorage if empty
      localStorage.setItem('tt_blogs_v9', JSON.stringify(blogPosts));
      return blogPosts.filter(b => b.status === 'Published');
    }
  });

  // Sync with localStorage on changes from other tabs/navigation
  useEffect(() => {
    const syncBlogs = () => {
      const saved = localStorage.getItem('tt_blogs_v9');
      if (saved) {
        try {
          const allBlogs = JSON.parse(saved);
          setPosts(allBlogs.filter(b => b.status === 'Published'));
        } catch (e) {
          console.error("Error syncing blogs", e);
        }
      }
    };

    window.addEventListener('storage', syncBlogs);
    window.addEventListener('focus', syncBlogs);
    // Initial sync on mount
    syncBlogs(); 
    
    return () => {
      window.removeEventListener('storage', syncBlogs);
      window.removeEventListener('focus', syncBlogs);
    };
  }, []);

  const categories = [
    { name: 'All', count: posts.length },
    { name: 'AI & Innovation', count: posts.filter(p => p.category === 'AI & Innovation').length },
    { name: 'Cloud Computing', count: posts.filter(p => p.category === 'Cloud Computing').length },
    { name: 'UI/UX Design', count: posts.filter(p => p.category === 'UI/UX Design').length },
    { name: 'Web Development', count: posts.filter(p => p.category === 'Web Development').length },
    { name: 'Business Strategy', count: posts.filter(p => p.category === 'Business Strategy').length }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(p => p.featured) || (searchTerm === '' && activeCategory === 'All' ? posts[0] : null);
  const remainingPosts = filteredPosts.filter(p => !featuredPost || p.id !== featuredPost.id);

  const handleShare = (post) => {
    const url = `${window.location.origin}/blog/${post.id}`;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: url
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="blog-page">
      <section className="page-header" style={{
        backgroundColor: 'var(--bg-light)',
        backgroundImage: "linear-gradient(to right, rgba(5, 5, 5, 0.9), rgba(14, 14, 14, 0.88)), url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        borderBottom: '1px solid rgba(var(--rgb-primary), 0.1)',
        padding: '120px 0 80px',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Insights & <span className="highlight">Resources</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="header-subtitle"
          >
            Expert perspectives on technology, digital strategy, and the future of business.
          </motion.p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-content">
        <div className="container">
          <div className="blog-layout">
            
            {/* Main Articles Area */}
            <div className="articles-area">
              <AnimatePresence mode="wait">
                {filteredPosts.length > 0 ? (
                  <motion.div 
                    key={activeCategory + searchTerm}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Featured Post */}
                    {featuredPost && (
                      <motion.article 
                        className="featured-post"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div 
                          className="post-img featured-img" 
                          style={{ backgroundImage: `url(${featuredPost.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        ></div>
                        <div className="post-meta">
                          <span className="post-category">{featuredPost.category}</span>
                          <div className="post-details">
                            <span><Calendar size={14} /> {featuredPost.date}</span>
                            <span><User size={14} /> {featuredPost.author}</span>
                          </div>
                        </div>
                        <h2><Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link></h2>
                        <p>{featuredPost.excerpt}</p>
                        <div className="post-footer">
                          <Link to={`/blog/${featuredPost.id}`} className="read-more">Read Full Article <ArrowRight size={16} /></Link>
                          <button className="share-btn" onClick={() => handleShare(featuredPost)} title="Share this article"><Share2 size={18} /></button>
                        </div>
                      </motion.article>
                    )}

                    {/* Grid Posts */}
                    <div className="posts-grid">
                      {remainingPosts.map((post, i) => (
                        <motion.article 
                          key={post.id} 
                          className="grid-post"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div 
                            className="post-img regular-img"
                            style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                          ></div>
                          <div className="post-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="post-category">{post.category}</span>
                            <button className="share-btn-small" onClick={(e) => { e.preventDefault(); handleShare(post); }} title="Share" style={{ background: 'none', border: 'none', color: 'var(--accent-teal)', cursor: 'pointer' }}><Share2 size={16} /></button>
                          </div>
                          <h3><Link to={`/blog/${post.id}`}>{post.title}</Link></h3>
                          <p className="excerpt-small">{post.excerpt}</p>
                          <div className="post-details small">
                            <span>{post.date}</span> • <span>{post.author}</span>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3>No articles found</h3>
                    <p>Try matching your search with different keywords or categories.</p>
                    <button className="btn-outline mt-3" onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}>Clear All Filters</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <aside className="blog-sidebar">
              <div className="sidebar-widget">
                <h3>Search Articles</h3>
                <div className="search-box">
                  <input 
                    type="text" 
                    placeholder="Type keyword..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="search-btn-icon">
                    <Search size={18} />
                  </button>
                </div>
              </div>
              
              <div className="sidebar-widget">
                <h3>Categories</h3>
                <ul className="category-list">
                  {categories.map(cat => (
                    <li key={cat.name}>
                      <button 
                        className={`cat-link ${activeCategory === cat.name ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.name)}
                      >
                        {cat.name} <span>({cat.count})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget bg-navy">
                <h3>Subscribe to Newsletter</h3>
                <p>Get the latest tech news delivered to your inbox.</p>
                <div className="subscribe-form">
                  <input type="email" placeholder="Your email address" />
                  <button className="btn-primary w-100 mt-2" onClick={() => alert('Thank you for subscribing!')}>Subscribe</button>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
