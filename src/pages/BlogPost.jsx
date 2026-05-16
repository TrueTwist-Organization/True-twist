import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, MessageSquare, Twitter, Linkedin, Facebook } from 'lucide-react';
import './BlogPost.css';

import { blogPosts } from '../data/blogData';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Get posts from localStorage to stay in sync with Admin/Blog list
  const posts = (() => {
    const saved = localStorage.getItem('tt_blogs_v9');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing blogs for post detail", e);
        return blogPosts;
      }
    }
    return blogPosts;
  })();

  const post = posts.find(p => String(p.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="container py-20 text-center" style={{ padding: '150px 0', minHeight: '60vh' }}>
        <h2>Article Not Found</h2>
        <p className="mt-4 mb-4 text-muted">The article you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/blog')} className="btn-primary">Back to Blog</button>
      </div>
    );
  }

  // Function to format content if it's plain text (converts newlines to paragraphs and detects headings)
  const formatContent = (content) => {
    if (!content) return "";
    
    // If it already contains HTML tags, return it as is
    if (/<[a-z][\s\S]*>/i.test(content)) return content;

    // Detect and separate major sections
    let formatted = content.replace(/(Introduction|What is Software Development\?|Software Development Process|Technologies Used|Why Software Development is Important|Conclusion|Summary)/gi, "\n\n$1\n\n");

    // Convert newlines to paragraphs and detect simple patterns
    return formatted
      .split(/\n\s*\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const words = line.split(/\s+/).length;
        const looksLikeHeading = line.length < 60 && words < 8 && !line.endsWith('.');
        const hasSeparator = line.includes(' – ') || (line.includes(': ') && line.indexOf(': ') < 20 && line.length > 40);
        const isListItemDesc = line.toLowerCase().includes(' for ') || line.toLowerCase().includes(' such as');
        
        const isHeading = looksLikeHeading && !hasSeparator && !isListItemDesc;

        if (isHeading) {
          return `<h3 class="content-heading" style="font-weight: 800; color: var(--cyan); margin-top: 40px; margin-bottom: 20px;">${line}</h3>`;
        }
        
        if (/^([-•]|\d+\.)\s+/.test(line)) {
           return `<p class="content-paragraph" style="margin-bottom: 15px; padding-left: 20px; line-height: 1.7; color: var(--cyan);">${line}</p>`;
        }

        return `<p class="content-paragraph" style="margin-bottom: 25px; line-height: 1.8; text-align: justify; color: var(--cyan);">${line}</p>`;
      })
      .join('');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post.title;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="blog-post-page">
      <section 
        className="post-hero"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(5, 5, 5, 0.9), rgba(14, 14, 14, 0.88)), url('${post.image}')`
        }}
      >
        <div className="container">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={18} /> Back to Insights
          </Link>
          <motion.div 
            className="post-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="post-category-badge">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="post-meta-inf">
              <span className="meta-item"><Calendar size={16} /> {post.date}</span>
              <span className="meta-item"><User size={16} /> {post.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="post-content-section">
        <div className="container">
          <div className="post-layout">
            
            <div className="post-main-content">
              <motion.div 
                className="content-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
              ></motion.div>

              <div className="post-share-footer" style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(0, 232, 255, 0.25)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Share this article:</h3>
                <div className="share-links" style={{ display: 'flex', gap: '15px' }}>
                  <button className="share-icon" onClick={() => handleShare('twitter')} title="Share on Twitter" style={{ cursor: 'pointer', background: 'var(--bg-white)', border: '1px solid var(--accent-primary)', padding: '10px', borderRadius: '50%', color: 'var(--accent-primary)' }}><Twitter size={20} /></button>
                  <button className="share-icon" onClick={() => handleShare('linkedin')} title="Share on LinkedIn" style={{ cursor: 'pointer', background: 'var(--bg-white)', border: '1px solid var(--accent-primary)', padding: '10px', borderRadius: '50%', color: 'var(--accent-primary)' }}><Linkedin size={20} /></button>
                  <button className="share-icon" onClick={() => handleShare('facebook')} title="Share on Facebook" style={{ cursor: 'pointer', background: 'var(--bg-white)', border: '1px solid var(--accent-primary)', padding: '10px', borderRadius: '50%', color: 'var(--accent-primary)' }}><Facebook size={20} /></button>
                </div>
              </div>

              <div className="post-author-box">
                <div className="author-avatar"><User size={30} className="icon-navy" /></div>
                <div className="author-bio">
                  <h4>About {post.author}</h4>
                  <p>Senior Technology Expert at True Twist, actively involved in digital innovation and enterprise architecture.</p>
                </div>
              </div>
            </div>

            <aside className="post-sidebar">
              <div className="sidebar-cta glass-teal">
                <MessageSquare size={32} className="icon-navy mb-3" />
                <h3>Interested in learning more?</h3>
                <p>Contact our experts to discuss how these insights apply to your business.</p>
                <Link to="/contact" className="btn-primary w-100">Get in Touch</Link>
              </div>

              <div className="sidebar-recent">
                <h3>Recent Articles</h3>
                {posts.filter(p => String(p.id) !== String(post.id) && p.status === 'Published').slice(0, 3).map(recent => (
                  <Link to={`/blog/${recent.id}`} key={recent.id} className="recent-post-link">
                    <h5>{recent.title}</h5>
                    <span>{recent.date}</span>
                  </Link>
                ))}
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
