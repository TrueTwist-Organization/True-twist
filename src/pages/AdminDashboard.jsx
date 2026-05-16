import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Settings, LogOut, Activity, BarChart3, Bell, Search, FileText, Plus, Star, ArrowLeft, Briefcase, PieChart, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { blogPosts as mockBlogs } from '../data/blogData';
import './AdminDashboard.css';

const defaultImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', title: 'Our Modern Workspace', isDefault: true },
  { id: 2, url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop', title: 'Collaborative Environment', isDefault: true },
  { id: 3, url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2070&auto=format&fit=crop', title: 'State-of-the-Art Labs', isDefault: true },
  { id: 4, url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', title: 'Tech Innovation Hub', isDefault: true },
  { id: 5, url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop', title: 'Brainstorming Sessions', isDefault: true },
  { id: 6, url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop', title: 'Team Growth', isDefault: true }
];

const mockReviews = [
  {
    id: 1,
    text: "True Twist completely revamped our legacy systems. Their AI-first approach didn't just digitize our process; it revolutionized our entire operational model. The ROI was visible within months.",
    name: "Prakash Desai",
    company: "FinTech Solutions Ltd",
    rating: 5,
    poster: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=1000&auto=format&fit=crop",
    status: "Published"
  },
  {
    id: 2,
    text: "Working with this team was seamless from day one. They understood our complex requirements and delivered a highly scalable cloud infrastructure that's currently handling millions of queries without a hitch.",
    name: "Shivani Patel",
    company: "Global Health Network",
    rating: 5,
    poster: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    status: "Published"
  },
  {
    id: 3,
    text: "The design philosophy at True Twist is unmatched. They created a user experience for our mobile app that is both beautiful and incredibly intuitive. Our user engagement metrics have skyrocketed.",
    name: "Rohit Shah",
    company: "NextGen Retail",
    rating: 4,
    poster: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1000&auto=format&fit=crop",
    status: "Pending Review"
  }
];

const mockProjects = [
  { id: 1, title: 'HealthTech Connect', category: 'Software', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2070&auto=format&fit=crop', desc: 'Secure patient management system with AI diagnostics.' },
  { id: 2, title: 'FinServe Portal', category: 'Web', image: 'https://images.unsplash.com/photo-1565372918675-4a2c9c8f2c52?q=80&w=2070&auto=format&fit=crop', desc: 'High-traffic financial dashboard with real-time analytics.' },
  { id: 3, title: 'EcoShop App', category: 'Mobile', image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2070&auto=format&fit=crop', desc: 'Cross-platform e-commerce app with AR product preview.' },
];



const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Persistence Layer
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('tt_reviews_v12');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : mockReviews;
      } catch (e) {
        console.error("Error parsing reviews data", e);
        return mockReviews;
      }
    }
    return mockReviews;
  });

  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('tt_blogs_v9');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : mockBlogs;
      } catch (e) {
        console.error("Error parsing blogs data", e);
        return mockBlogs;
      }
    }
    return mockBlogs;
  });

  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('tt_portfolio_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing portfolio data", e);
        return mockProjects;
      }
    }
    return mockProjects;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('tt_gallery_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [deletedDefaultImages, setDeletedDefaultImages] = useState(() => {
    const saved = localStorage.getItem('tt_deleted_defaults_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('tt_reviews_v12', JSON.stringify(reviews));
    } catch (e) {
      console.error("Failed to save reviews to localStorage", e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('tt_blogs_v9', JSON.stringify(blogs));
    } catch (e) {
      console.error("Failed to save blogs to localStorage", e);
      if (e.name === 'QuotaExceededError') {
        alert("Storage limit reached! Cannot save more blogs. Try removing some or using smaller images.");
      }
    }
  }, [blogs]);

  useEffect(() => {
    try {
      localStorage.setItem('tt_portfolio_v2', JSON.stringify(portfolio));
    } catch (e) {
      console.error("Failed to save portfolio to localStorage", e);
    }
  }, [portfolio]);

  useEffect(() => {
    try {
      localStorage.setItem('tt_gallery_v1', JSON.stringify(gallery));
    } catch (e) {
      console.error("Failed to save gallery to localStorage", e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem('tt_deleted_defaults_v1', JSON.stringify(deletedDefaultImages));
    } catch (e) {
      console.error("Failed to save deleted defaults to localStorage", e);
    }
  }, [deletedDefaultImages]);

  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: '',
    coverImage: '',
    content: '',
    author: 'Admin',
    excerpt: ''
  });


  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({ name: '', company: '', rating: 5, posterImage: '', videoUrl: '', writtenReview: '' });

  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({ title: '', category: '', image: '', desc: '' });

  const handleDeleteReview = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(prevReviews => prevReviews.filter(review => review.id !== id));
    }
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
    }
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setPortfolio(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog.id);
    setBlogForm({
      title: blog.title,
      category: blog.category,
      coverImage: blog.image || '',
      content: blog.content || '',
      author: blog.author || 'Admin',
      excerpt: blog.excerpt || ''
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handlePublishDraft = (id) => {
    try {
      setBlogs(prev => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return safePrev.map(b => b.id === id ? { ...b, status: 'Published', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) } : b);
      });
      alert('Blog published successfully!');
    } catch (e) {
      console.error("Error publishing draft:", e);
      alert("Failed to publish blog.");
    }
  };

  // Utility to compress images to save localStorage space
  const compressImage = (file, maxWidth = 1000, quality = 0.6) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleBlogImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        setBlogForm(prev => ({ ...prev, coverImage: compressed }));
      } catch (err) {
        console.error("Compression failed", err);
        alert("Failed to process image. Try a different one.");
      }
    }
  };

  const handleReviewImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 400, 0.5); // Smaller for avatars
        setReviewForm(prev => ({ ...prev, posterImage: compressed }));
      } catch (err) {
        console.error("Compression failed", err);
      }
    }
  };

  const handleProjectImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        setProjectForm(prev => ({ ...prev, image: compressed }));
      } catch (err) {
        console.error("Compression failed", err);
      }
    }
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    try {
      const draftBlog = {
        id: editingBlog || Date.now(),
        title: blogForm.title || "Untitled Draft",
        category: blogForm.category || "Uncategorized",
        status: 'Draft',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        views: 0,
        author: blogForm.author || 'Admin',
        excerpt: blogForm.excerpt || '',
        image: blogForm.coverImage || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop',
        content: blogForm.content || ''
      };

      setBlogs(prev => {
        const safePrev = Array.isArray(prev) ? prev : [];
        if (editingBlog) {
          return safePrev.map(b => b.id === editingBlog ? draftBlog : b);
        }
        return [draftBlog, ...safePrev];
      });

      alert('Blog saved as Draft!');
      setEditingBlog(null);
      setBlogForm({ title: '', category: '', coverImage: '', content: '', author: 'Admin', excerpt: '' });
    } catch (e) {
      console.error("Error saving draft:", e);
      alert("Failed to save draft. Data may be too large.");
    }
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) {
      alert("Please fill in the title and content.");
      return;
    }

    try {
      const blogData = {
        title: blogForm.title, 
        category: blogForm.category || 'General',
        image: blogForm.coverImage || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop',
        excerpt: blogForm.excerpt || (blogForm.content.substring(0, 100) + '...'),
        author: blogForm.author || 'Admin',
        content: blogForm.content,
        status: 'Published'
      };

      if (editingBlog) {
        setBlogs(prev => {
          const safePrev = Array.isArray(prev) ? prev : [];
          return safePrev.map(b => b.id === editingBlog ? { ...b, ...blogData } : b);
        });
        alert('Blog updated and published!');
        setEditingBlog(null);
      } else {
        const newBlog = { 
          ...blogData,
          id: Date.now(), 
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
          views: 0
        };
        setBlogs(prev => [newBlog, ...(Array.isArray(prev) ? prev : [])]);
        alert('New blog published!');
      }
      setBlogForm({ title: '', category: '', coverImage: '', content: '', author: 'Admin', excerpt: '' });
    } catch (error) {
      console.error("Error in handleBlogSubmit:", error);
      alert("An error occurred while publishing. Your data might be too large for storage.");
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review.id);
    setReviewForm({
      name: review.name,
      company: review.company,
      rating: review.rating,
      posterImage: review.poster || '',
      videoUrl: review.videoSource || '',
      writtenReview: review.text || ''
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handlePublishReview = (id) => {
    try {
      setReviews(prev => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return safePrev.map(r => r.id === id ? { ...r, status: 'Published' } : r);
      });
      alert('Review published successfully!');
    } catch (e) {
      console.error("Error publishing review:", e);
      alert("Failed to publish review.");
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        setReviews(prev => {
          const safePrev = Array.isArray(prev) ? prev : [];
          return safePrev.map(r => r.id === editingReview ? { 
            ...r, 
            name: reviewForm.name, 
            company: reviewForm.company, 
            rating: Number(reviewForm.rating),
            text: reviewForm.writtenReview,
            poster: reviewForm.posterImage,
            videoSource: reviewForm.videoUrl
          } : r);
        });
        alert('Review updated successfully!');
        setEditingReview(null);
      } else {
        const newReview = { 
          id: Date.now(), 
          name: reviewForm.name, 
          company: reviewForm.company, 
          rating: Number(reviewForm.rating), 
          text: reviewForm.writtenReview,
          poster: reviewForm.posterImage || `https://i.pravatar.cc/150?u=${encodeURIComponent(reviewForm.name)}`,
          videoSource: reviewForm.videoUrl,
          status: 'Pending Review' 
        };
        setReviews(prev => {
          const safePrev = Array.isArray(prev) ? prev : [];
          return [...safePrev, newReview];
        });
        alert('Review submitted for approval!');
      }
      setReviewForm({ name: '', company: '', rating: 5, posterImage: '', videoUrl: '', writtenReview: '' });
    } catch (err) {
      console.error("Error in handleReviewSubmit:", err);
      alert("Failed to save review. Data might be too large.");
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project.id);
    setProjectForm({
      title: project.title,
      category: project.category,
      image: project.image,
      desc: project.desc
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        setPortfolio(prev => {
          const safePrev = Array.isArray(prev) ? prev : [];
          return safePrev.map(p => p.id === editingProject ? { ...p, ...projectForm } : p);
        });
        alert('Project updated successfully!');
        setEditingProject(null);
      } else {
        const newProject = { ...projectForm, id: Date.now() };
        setPortfolio(prev => [...(Array.isArray(prev) ? prev : []), newProject]);
        alert('Project added successfully!');
      }
      setProjectForm({ title: '', category: '', image: '', desc: '' });
    } catch (err) {
      console.error("Error in handleProjectSubmit:", err);
      alert("Failed to save project. Image might be too large.");
    }
  };

  const handleGalleryImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 1200, 0.7);
        const newImage = {
          id: Date.now(),
          url: compressed,
          title: file.name.split('.')[0] || "Gallery Image"
        };
        setGallery(prev => [newImage, ...prev]);
        alert("Image added to gallery!");
      } catch (err) {
        console.error("Gallery upload failed", err);
      }
    }
  };

  const handleDeleteGalleryItem = (id, isDefault = false) => {
    if (window.confirm("Are you sure you want to delete this gallery image?")) {
      if (isDefault) {
        setDeletedDefaultImages(prev => [...prev, id]);
      } else {
        setGallery(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  // Simple mock check to ensure user logged in
  // Usually this would check context or local storage
  useEffect(() => {
    // If we wanted to strictly protect, we'd check a token here.
  }, []);

  const handleLogout = () => {
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="TRUE TWIST" />
          <span className="admin-badge">Admin</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
              <LayoutDashboard size={20} /> Dashboard
            </li>
            <li className={activeTab === 'blogs' ? 'active' : ''} onClick={() => setActiveTab('blogs')}>
              <FileText size={20} /> Blog Management
            </li>
            <li className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>
              <Star size={20} /> Review Management
            </li>
            <li className={activeTab === 'portfolio' ? 'active' : ''} onClick={() => setActiveTab('portfolio')}>
              <Briefcase size={20} /> Portfolio Management
            </li>
            <li className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')}>
              <ImageIcon size={20} /> Gallery Management
            </li>
            <li className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
              <PieChart size={20} /> Analytics
            </li>
            <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
              <Users size={20} /> Team Management
            </li>
            <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
              <Settings size={20} /> Settings
            </li>

          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="search-bar">
            <Search size={20} className="text-muted" />
            <input type="text" placeholder="Search operations, logs, or users..." />
          </div>
          <div className="header-actions">
            <button 
              className="btn-outline-small" 
              style={{ padding: '5px 10px', fontSize: '0.7rem', color: '#00e8ff', borderColor: '#00e8ff' }}
              onClick={() => {
                if(window.confirm("This will clear all custom data and restore defaults. Proceed?")) {
                   localStorage.clear();
                   window.location.reload();
                }
              }}
            >
              Reset All Data
            </button>
            <button className="icon-btn" onClick={() => alert('Notifications feature coming soon!')}>
              <Bell size={20} />
              <span className="dot-indicator"></span>
            </button>
            <div className="admin-profile">
              <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=150&auto=format&fit=crop" alt="Admin" />
              <span>Rohan Sharma</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">

          {activeTab === 'dashboard' && (
            <>
              <div className="dashboard-header-text">
                <h2>Welcome back, Rohan</h2>
                <p>Here's what's happening with your projects today.</p>
              </div>

              {/* KPI Cards */}
              <div className="kpi-grid">
                {[
                  { title: "Total Traffic", value: "24,592", change: "+14.5%", icon: <Activity className="text-blue" />, tab: 'analytics' },
                  { title: "Team Members", value: "12", change: "+1", icon: <Users className="text-teal" />, tab: 'users' },
                  { title: "Active Projects", value: (Array.isArray(portfolio) ? portfolio.length : 0).toString(), change: "+3.0%", icon: <BarChart3 className="text-purple" />, tab: 'portfolio' },
                  { title: "Review Rating", value: "4.8/5", change: "+0.5%", icon: <Star className="text-orange" />, tab: 'reviews' }
                ].map((kpi, i) => (
                  <motion.div
                    key={i}
                    className="kpi-card glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveTab(kpi.tab)}
                    whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                  >
                    <div className="kpi-header">
                      <h3>{kpi.title}</h3>
                      <div className="kpi-icon-wrapper">{kpi.icon}</div>
                    </div>
                    <div className="kpi-body">
                      <span className="kpi-value">{kpi.value}</span>
                      <span className={`kpi-change ${kpi.change.startsWith('+') ? 'positive' : 'negative'}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions Panel */}
              <div className="dashboard-section glass" style={{ marginTop: '40px' }}>
                <div className="section-header">
                  <h3>Quick Command Center</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <button className="quick-action-btn" onClick={() => setActiveTab('portfolio')}>
                    <Briefcase size={24} />
                    <span>Manage Projects</span>
                    <p>Add latest company work</p>
                  </button>
                  <button className="quick-action-btn" onClick={() => setActiveTab('gallery')}>
                    <ImageIcon size={24} />
                    <span>Manage Gallery</span>
                    <p>Add company photos</p>
                  </button>
                  <button className="quick-action-btn" onClick={() => setActiveTab('blogs')}>
                    <FileText size={24} />
                    <span>Post New Blog</span>
                    <p>Share company insights</p>
                  </button>
                  <button className="quick-action-btn" onClick={() => setActiveTab('reviews')}>
                    <Star size={24} />
                    <span>Review Testimonials</span>
                    <p>Approve client feedback</p>
                  </button>
                  <button className="quick-action-btn" onClick={() => setActiveTab('analytics')}>
                    <Activity size={24} />
                    <span>View Reports</span>
                    <p>Traffic & engagement data</p>
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'blogs' && (
            <div className="admin-blog-view">
              <div className="dashboard-header-text">
                <h2>Blog Management</h2>
                <p>Create, edit, and manage your insights and articles.</p>
              </div>

              <div className="dashboard-section glass" style={{ marginBottom: '30px' }}>
                <div className="section-header">
                  <h3>Existing Articles</h3>
                </div>

                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Views</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(Array.isArray(blogs) ? blogs : []).map((blog) => {
                        if (!blog) return null;
                        return (
                          <tr key={blog.id || Math.random()}>
                            <td className="font-medium text-dark" style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{blog.title || 'Untitled'}</td>
                            <td className="text-muted">{blog.category || 'Uncategorized'}</td>
                            <td className="text-muted">{blog.date || 'N/A'}</td>
                            <td className="text-muted">{blog.views || 0}</td>
                            <td>
                              <span className={`status-badge ${blog.status === 'Published' ? 'resolved' : 'new'}`}>
                                {blog.status || 'Draft'}
                              </span>
                            </td>
                            <td>
                              {blog.status === 'Draft' && (
                                <button className="btn-link" style={{ marginRight: '10px', color: '#00e8ff' }} onClick={() => handlePublishDraft(blog.id)}>Publish</button>
                              )}
                              <button className="btn-link" style={{ marginRight: '10px' }} onClick={() => handleEditBlog(blog)}>Edit</button>
                              <button className="btn-link" style={{ color: '#00e8ff' }} onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="dashboard-section glass">
                <div className="section-header">
                  <h3>{editingBlog ? 'Edit Article' : 'Publish New Article'}</h3>
                </div>

                <form className="admin-form" onSubmit={handleBlogSubmit}>
                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label>Article Title</label>
                      <input type="text" placeholder="Enter an engaging title" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} required />
                    </div>
                    <div className="form-group flex-1">
                      <label>Category</label>
                      <select value={blogForm.category} onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })} required>
                        <option value="">Select Category</option>
                        <option value="AI & Innovation">AI & Innovation</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Business Strategy">Business Strategy</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label>Author Name</label>
                      <input type="text" placeholder="Admin" value={blogForm.author} onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })} />
                    </div>
                    <div className="form-group flex-2">
                      <label>Short Excerpt (Brief Summary)</label>
                      <input type="text" placeholder="A short description for the blog listing..." value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Cover Image (Upload or URL)</label>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <input type="text" placeholder="https://images.unsplash.com/photo-..." style={{ flex: 1 }} value={blogForm.coverImage} onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })} />
                      <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>OR</span>
                      <input type="file" accept="image/*" style={{ flex: 1, padding: '9px 15px', cursor: 'pointer' }} onChange={handleBlogImageUpload} />
                    </div>
                    {blogForm.coverImage && (
                      <div className="preview-box" style={{ marginTop: '15px' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Image Preview:</p>
                        <img src={blogForm.coverImage} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px' }} />
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Article Content (Markdown supported)</label>
                    <textarea rows="10" placeholder="Write your content here..." value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} required></textarea>
                  </div>

                  <div className="form-actions">
                    {editingBlog && (
                      <button type="button" className="btn-outline-small" onClick={() => { setEditingBlog(null); setBlogForm({ title: '', category: '', coverImage: '', content: '', author: 'Admin', excerpt: '' }); }}>Cancel Edit</button>
                    )}
                    <button type="button" className="btn-outline-small" onClick={handleSaveDraft}>Save as Draft</button>
                    <button type="submit" className="btn-primary" style={{ padding: '10px 20px' }}>
                      <Plus size={18} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
                      {editingBlog ? 'Save Changes' : 'Publish Post'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="admin-review-view">
              <div className="dashboard-header-text">
                <h2>Review Management</h2>
                <p>
                  Manage client testimonials (stored in the browser). Reviews marked Published appear in the Client
                  Reviews section on the homepage.
                </p>
              </div>

              <div className="dashboard-section glass" style={{ marginBottom: '30px' }}>
                <div className="section-header">
                  <h3>Existing Testimonials</h3>
                </div>

                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Company</th>
                        <th>Rating</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(Array.isArray(reviews) ? reviews : []).map(review => {
                        if (!review) return null;
                        return (
                          <tr key={review.id || Math.random()}>
                            <td className="font-medium text-dark">{review.name || 'Anonymous'}</td>
                            <td className="text-muted">{review.company || 'N/A'}</td>
                            <td>
                              <div style={{ display: 'flex', color: '#00e8ff' }}>
                                {[...Array(Number(review.rating) || 5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                              </div>
                            </td>
                            <td>
                              <span className={`status-badge ${(review.status || '').toLowerCase() === 'published' ? 'resolved' : 'in-progress'}`}>
                                {review.status || 'Pending'}
                              </span>
                            </td>
                            <td>
                              {review.status === 'Pending Review' && (
                                <button className="btn-link" style={{ marginRight: '10px', color: '#00e8ff' }} onClick={() => handlePublishReview(review.id)}>Publish</button>
                              )}
                              <button className="btn-link" style={{ marginRight: '10px' }} onClick={() => handleEditReview(review)}>Edit</button>
                              <button className="btn-link" style={{ color: '#00e8ff' }} onClick={() => handleDeleteReview(review.id)}>Delete</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="dashboard-section glass">
                <div className="section-header">
                  <h3>{editingReview ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
                </div>

                <form className="admin-form" onSubmit={handleReviewSubmit}>
                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label>Client Name</label>
                      <input type="text" placeholder="E.g., Neha Sharma" value={reviewForm.name} onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })} required />
                    </div>
                    <div className="form-group flex-1">
                      <label>Company</label>
                      <input type="text" placeholder="E.g., Tech Innovations Ltd" value={reviewForm.company} onChange={(e) => setReviewForm({ ...reviewForm, company: e.target.value })} required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label>Rating</label>
                      <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            size={24}
                            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                            fill={idx < reviewForm.rating ? "#00e8ff" : "transparent"}
                            color={idx < reviewForm.rating ? "#00e8ff" : "rgba(0, 232, 255, 0.35)"}
                            onClick={() => setReviewForm({ ...reviewForm, rating: idx + 1 })}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="form-group flex-1">
                      <label>Poster Image (Upload or URL)</label>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <input type="text" placeholder="https://..." style={{ flex: 1 }} value={reviewForm.posterImage} onChange={(e) => setReviewForm({ ...reviewForm, posterImage: e.target.value })} />
                        <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>OR</span>
                        <input type="file" accept="image/*" style={{ flex: 1, padding: '9px 15px', cursor: 'pointer' }} onChange={handleReviewImageUpload} />
                      </div>
                      {reviewForm.posterImage && (
                        <div className="preview-box" style={{ marginTop: '15px' }}>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Avatar Preview:</p>
                          <img src={reviewForm.posterImage} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Video Review (Upload or URL)</label>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <input type="text" placeholder="URL to mp4 file (e.g., AWS S3 bucket)" style={{ flex: 1 }} value={reviewForm.videoUrl} onChange={(e) => setReviewForm({ ...reviewForm, videoUrl: e.target.value })} />
                      <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>OR</span>
                      <input type="file" accept="video/*" style={{ flex: 1, padding: '9px 15px', cursor: 'pointer' }} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Written Review</label>
                    <textarea rows="4" placeholder="Type the client's testimonial here..." value={reviewForm.writtenReview} onChange={(e) => setReviewForm({ ...reviewForm, writtenReview: e.target.value })} required></textarea>
                  </div>

                  <div className="form-actions">
                    {editingReview && (
                      <button type="button" className="btn-outline-small" onClick={() => { setEditingReview(null); setReviewForm({ name: '', company: '', rating: 5, posterImage: '', videoUrl: '', writtenReview: '' }); }}>Cancel Edit</button>
                    )}
                    <button type="submit" className="btn-primary" style={{ padding: '10px 20px' }}>
                      <Plus size={18} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
                      {editingReview ? 'Save Changes' : 'Add Testimonial'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="admin-portfolio-view">
              <div className="dashboard-header-text">
                <h2>Portfolio Management</h2>
                <p>Add and manage your company's projects and images.</p>
              </div>

              <div className="dashboard-section glass" style={{ marginBottom: '30px' }}>
                <div className="section-header">
                  <h3>Existing Projects</h3>
                </div>

                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Preview</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolio.map(project => (
                        <tr key={project.id}>
                          <td className="font-medium text-dark">{project.title}</td>
                          <td className="text-muted">{project.category}</td>
                          <td>
                            <img src={project.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                          </td>
                          <td>
                            <button className="btn-link" style={{ marginRight: '10px' }} onClick={() => handleEditProject(project)}>Edit</button>
                            <button className="btn-link" style={{ color: '#00e8ff' }} onClick={() => handleDeleteProject(project.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="dashboard-section glass">
                <div className="section-header">
                  <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                </div>

                <form className="admin-form" onSubmit={handleProjectSubmit}>
                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label>Project Title</label>
                      <input type="text" placeholder="E.g., Smart Analytics Dashboard" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required />
                    </div>
                    <div className="form-group flex-1">
                      <label>Category</label>
                      <select value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} required>
                        <option value="">Select Category</option>
                        <option value="Web">Web</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Software">Software</option>
                        <option value="AI">AI</option>
                        <option value="UI/UX">UI/UX</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Project Image (Upload or URL)</label>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <input type="text" placeholder="https://..." style={{ flex: 1 }} value={projectForm.image} onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })} />
                      <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>OR</span>
                      <input type="file" accept="image/*" style={{ flex: 1, padding: '9px 15px', cursor: 'pointer' }} onChange={handleProjectImageUpload} />
                    </div>
                    {projectForm.image && (
                      <div className="preview-box" style={{ marginTop: '15px' }}>
                        <img src={projectForm.image} alt="Preview" style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea rows="4" placeholder="Brief details about the project..." value={projectForm.desc} onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })} required></textarea>
                  </div>

                  <div className="form-actions">
                    {editingProject && (
                      <button type="button" className="btn-outline-small" onClick={() => { setEditingProject(null); setProjectForm({ title: '', category: '', image: '', desc: '' }); }}>Cancel Edit</button>
                    )}
                    <button type="submit" className="btn-primary" style={{ padding: '10px 20px' }}>
                      <Plus size={18} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
                      {editingProject ? 'Update Project' : 'Add Project'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {activeTab === 'gallery' && (
            <div className="admin-gallery-view">
              <div className="dashboard-header-text">
                <h2>Gallery Management</h2>
                <p>Upload and manage images for the company gallery section.</p>
              </div>

              <div className="dashboard-section glass" style={{ marginBottom: '30px' }}>
                <div className="section-header">
                  <h3>Add New Images</h3>
                </div>
                <div style={{ padding: '40px', textAlign: 'center', border: '2px dashed var(--accent-teal)', borderRadius: '15px', background: '#000000' }}>
                  <ImageIcon size={48} color="var(--accent-teal)" style={{ marginBottom: '15px' }} />
                  <h4>Upload Company Photos</h4>
                  <p className="text-muted" style={{ marginBottom: '20px' }}>Images will be automatically optimized for web.</p>
                  <label className="btn-primary" style={{ cursor: 'pointer', display: 'inline-block' }}>
                    Choose Files
                    <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleGalleryImageUpload} />
                  </label>
                </div>
              </div>

              <div className="dashboard-section glass">
                <div className="section-header">
                  <h3>Current Gallery ({(gallery || []).length + defaultImages.filter(img => !deletedDefaultImages.includes(img.id)).length})</h3>
                </div>
                <div className="gallery-admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                  {/* Custom Uploaded Images */}
                  {(gallery || []).map((item) => (
                    <div key={item.id} className="gallery-admin-item" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', background: '#000000', border: '1px solid rgba(0, 232, 255, 0.35)' }}>
                      <img src={item.url} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                      <button 
                        onClick={() => handleDeleteGalleryItem(item.id, false)}
                        style={{ position: 'absolute', top: '10px', right: '10px', background: '#000000', color: '#00e8ff', border: '1px solid #00e8ff', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                      >
                        <Trash2 size={16} />
                      </button>
                      <div style={{ padding: '8px', background: 'var(--cyan)', fontSize: '0.8rem', textAlign: 'center', fontWeight: 600, color: 'var(--primary-navy)' }}>
                        {item.title}
                      </div>
                    </div>
                  ))}

                  {/* Default Static Images */}
                  {defaultImages.filter(img => !deletedDefaultImages.includes(img.id)).map((item) => (
                    <div key={`default-${item.id}`} className="gallery-admin-item default-item" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', background: '#000000', opacity: 0.8, border: '1px solid rgba(0, 232, 255, 0.45)' }}>
                      <img src={item.url} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                      <button 
                        onClick={() => handleDeleteGalleryItem(item.id, true)}
                        style={{ position: 'absolute', top: '10px', right: '10px', background: '#000000', color: '#00e8ff', border: '1px solid #00e8ff', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                      >
                        <Trash2 size={16} />
                      </button>
                      <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.5)', color: 'var(--cyan)', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem' }}>
                        Default
                      </div>
                      <div style={{ padding: '8px', background: 'var(--cyan)', fontSize: '0.8rem', textAlign: 'center', fontWeight: 600, color: 'var(--black)' }}>
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="admin-placeholder-view">
              <div className="dashboard-header-text">
                <h2>Analytics Dashboard</h2>
                <p>Real-time traffic metrics and user engagement charts.</p>
              </div>
              <div className="dashboard-section glass text-center" style={{ padding: '80px 20px' }}>
                <Activity size={48} className="text-muted" style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                <h3>Analytics Engine Starting</h3>
                <p className="text-muted">Currently gathering initial metrics. Advanced charts will populate soon.</p>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="admin-placeholder-view">
              <div className="dashboard-header-text">
                <h2>User Management</h2>
                <p>Manage admin roles, editor permissions, and staff accounts.</p>
              </div>
              <div className="dashboard-section glass text-center" style={{ padding: '80px 20px' }}>
                <Users size={48} className="text-muted" style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                <h3>Access Control Layer Active</h3>
                <p className="text-muted">Role-Based Access Control configuration module is under development.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="admin-placeholder-view">
              <div className="dashboard-header-text">
                <h2>System Settings</h2>
                <p>Configure SEO, general settings, and external API keys.</p>
              </div>
              <div className="dashboard-section glass text-center" style={{ padding: '80px 20px' }}>
                <Settings size={48} className="text-muted" style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                <h3>Configuration Locked</h3>
                <p className="text-muted">Environment variables and master settings are protected in this demo environment.</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
