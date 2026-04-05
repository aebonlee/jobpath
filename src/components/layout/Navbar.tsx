import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { NAV_ITEMS } from '../../config/site';

export default function Navbar() {
  const { mode, toggleTheme, colorTheme, setColorTheme, COLOR_OPTIONS } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showMobileColorPicker, setShowMobileColorPicker] = useState(false);
  const [mobileSubnavOpen, setMobileSubnavOpen] = useState({});
  const colorPickerRef = useRef(null);
  const mobileColorPickerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileSubnavOpen({});
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) setShowColorPicker(false);
      if (mobileColorPickerRef.current && !mobileColorPickerRef.current.contains(e.target)) setShowMobileColorPicker(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeIcon = mode === 'auto' ? '\u25D1' : mode === 'light' ? '\u2600\uFE0F' : '\uD83C\uDF19';

  const toggleMobileSubnav = (path) => {
    setMobileSubnavOpen(prev => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} aria-label="메인 네비게이션">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="logo-main">For</span>
            <span className="logo-sub">Job</span>
          </Link>

          <ul className="nav-links">
            {NAV_ITEMS.map(item => {
              const isActive = item.children
                ? item.children.some(child => location.pathname === child.path || location.pathname.startsWith(child.path + '/'))
                : location.pathname === item.path;
              return (
                <li key={item.label} className={`nav-item ${item.children ? 'nav-item-has-children' : ''}`}>
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="nav-dropdown">
                      {item.children.map(child => (
                        <li key={child.path}>
                          <Link to={child.path} className="nav-dropdown-link">{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="navbar-actions">
            <div className="color-picker-wrapper" ref={colorPickerRef}>
              <button
                className="color-picker-btn"
                onClick={() => setShowColorPicker(!showColorPicker)}
                title="컬러 테마"
                aria-expanded={showColorPicker}
                aria-label="컬러 테마 선택"
              >
                <div className="color-dot-preview" style={{ background: COLOR_OPTIONS.find(c => c.name === colorTheme)?.color }} />
              </button>
              <div className={`color-picker-dropdown ${showColorPicker ? 'show' : ''}`}>
                {COLOR_OPTIONS.map(opt => (
                  <button
                    key={opt.name}
                    className={`color-option ${colorTheme === opt.name ? 'active' : ''}`}
                    style={{ background: opt.color }}
                    onClick={() => { setColorTheme(opt.name); setShowColorPicker(false); }}
                    title={opt.name}
                    aria-label={opt.name}
                  />
                ))}
              </div>
            </div>

            <button className="theme-toggle" onClick={toggleTheme} title={mode} aria-label="테마 변경">
              {themeIcon}
            </button>

            {user ? (
              <div className="user-menu">
                {user.user_metadata?.avatar_url && (
                  <img src={user.user_metadata.avatar_url} alt="" className="user-avatar" />
                )}
                <button className="logout-btn" onClick={signOut}>로그아웃</button>
              </div>
            ) : (
              <Link to="/login" className="login-link">
                로그인
              </Link>
            )}

            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="메뉴 열기/닫기"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <ul className="mobile-nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button
                    className="mobile-subnav-toggle"
                    onClick={() => toggleMobileSubnav(item.label)}
                  >
                    <span>{item.label}</span>
                    <i className={`fa-solid fa-chevron-down toggle-arrow ${mobileSubnavOpen[item.label] ? 'open' : ''}`} />
                  </button>
                  {mobileSubnavOpen[item.label] && (
                    <ul className="mobile-subnav">
                      {item.children.map(child => (
                        <li key={child.path}>
                          <Link to={child.path} className="mobile-subnav-link">{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.path} className="mobile-nav-link">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            {user ? (
              <button className="mobile-nav-link" onClick={signOut} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontFamily: 'inherit', fontSize: 16 }}>
                로그아웃
              </button>
            ) : (
              <Link to="/login" className="mobile-nav-link">로그인</Link>
            )}
          </li>
        </ul>
        <div className="mobile-menu-actions">
          <div className="color-picker-wrapper" ref={mobileColorPickerRef}>
            <button
              className="color-picker-btn"
              onClick={() => setShowMobileColorPicker(!showMobileColorPicker)}
              title="컬러 테마"
              aria-label="컬러 테마 선택"
            >
              <div className="color-dot-preview" style={{ background: COLOR_OPTIONS.find(c => c.name === colorTheme)?.color }} />
            </button>
            <div className={`color-picker-dropdown ${showMobileColorPicker ? 'show' : ''}`}>
              {COLOR_OPTIONS.map(opt => (
                <button
                  key={opt.name}
                  className={`color-option ${colorTheme === opt.name ? 'active' : ''}`}
                  style={{ background: opt.color }}
                  onClick={() => { setColorTheme(opt.name); setShowMobileColorPicker(false); }}
                  title={opt.name}
                  aria-label={opt.name}
                />
              ))}
            </div>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} title={mode} aria-label="테마 변경">
            {themeIcon}
          </button>
        </div>
      </div>
    </>
  );
}
