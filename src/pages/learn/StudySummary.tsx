import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import {
  PILGI_FREQ_CATEGORIES,
  PILGI_FREQUENT,
  getPilgiFreqByCategory,
  getPilgiFreqCounts,
} from '../../data/pilgiFrequent';
import {
  FREQUENT_CATEGORIES,
  SILGI_FREQUENT,
  getQuestionsByCategory,
  getCategoryCounts,
} from '../../data/silgiFrequent';

function PilgiCard({ topic, isOpen, onToggle, cardRef }: {
  topic: (typeof PILGI_FREQUENT)[number];
  isOpen: boolean;
  onToggle: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const cat = PILGI_FREQ_CATEGORIES.find((c) => c.id === topic.category);
  return (
    <div
      className={`sq-card ${isOpen ? 'sq-card--open' : ''}`}
      ref={cardRef}
      id={`topic-${topic.num}`}
    >
      <button className="sq-card-header" onClick={onToggle} type="button">
        <div className="sq-card-num">Q{topic.num}</div>
        <div className="sq-card-title-area">
          <h3 className="sq-card-title">{topic.title}</h3>
          <div className="sq-card-meta">
            <span
              className="sq-badge"
              style={{ background: `${cat?.color}18`, color: cat?.color }}
            >
              {cat?.label}
            </span>
            <span className="sq-badge sq-badge--keyword">{topic.keyword}</span>
          </div>
        </div>
        <div className="sq-card-toggle">
          <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} />
        </div>
      </button>

      {isOpen && (
        <div className="sq-card-body">
          <div className="sq-frequency">
            <i className="fa-solid fa-chart-bar" />
            <span>출제빈도: {topic.frequency}</span>
          </div>
          <div className="sq-section">
            <div className="sq-section-label">
              <i className="fa-solid fa-check-circle" />
              <span>핵심 요약</span>
            </div>
            <div
              className="sq-section-content"
              dangerouslySetInnerHTML={{ __html: topic.summary }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SilgiCard({ topic, rank, isOpen, onToggle, cardRef }: {
  topic: (typeof SILGI_FREQUENT)[number] & { freqCount: number };
  rank: number;
  isOpen: boolean;
  onToggle: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const cat = FREQUENT_CATEGORIES.find((c) => c.id === topic.category);
  return (
    <div
      className={`sq-card ${isOpen ? 'sq-card--open' : ''}`}
      ref={cardRef}
      id={`topic-${topic.num}`}
    >
      <button className="sq-card-header" onClick={onToggle} type="button">
        <div className="sq-card-num">#{rank}</div>
        <div className="sq-card-title-area">
          <h3 className="sq-card-title">{topic.title}</h3>
          <div className="sq-card-meta">
            <span
              className="sq-badge"
              style={{ background: `${cat?.color}18`, color: cat?.color }}
            >
              {cat?.label}
            </span>
            <span className="sq-badge sq-badge--keyword">{topic.keyword}</span>
            <span className="sq-badge sq-badge--freq">
              <i className="fa-solid fa-fire" /> {topic.freqCount}회 출제
            </span>
          </div>
        </div>
        <div className="sq-card-toggle">
          <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} />
        </div>
      </button>

      {isOpen && (
        <div className="sq-card-body">
          <div className="sq-frequency">
            <i className="fa-solid fa-clock-rotate-left" />
            <span>출제 이력: {topic.frequency}</span>
          </div>
          <div className="sq-section">
            <div className="sq-section-label">
              <i className="fa-solid fa-file-lines" />
              <span>상세 해설</span>
            </div>
            <div
              className="sq-section-content"
              dangerouslySetInnerHTML={{ __html: topic.answer }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudySummary() {
  const [activeTab, setActiveTab] = useState<'pilgi' | 'silgi'>('pilgi');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSidebarCats, setExpandedSidebarCats] = useState<Set<string>>(new Set());
  const topicRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // 실기 빈출 정렬 (출제 횟수 내림차순)
  const sortedSilgi = useMemo(() => {
    return [...SILGI_FREQUENT]
      .map((q) => ({
        ...q,
        freqCount: (q.frequency.match(/,/g) || []).length + 1,
      }))
      .sort((a, b) => b.freqCount - a.freqCount);
  }, []);

  // 탭에 따른 카테고리/데이터 전환
  const categories = activeTab === 'pilgi' ? PILGI_FREQ_CATEGORIES : FREQUENT_CATEGORIES;

  const counts = useMemo(() => {
    if (activeTab === 'pilgi') return getPilgiFreqCounts();
    return getCategoryCounts();
  }, [activeTab]);

  const allData = activeTab === 'pilgi' ? PILGI_FREQUENT : sortedSilgi;

  const topicsByCategory = useMemo(() => {
    const map: Record<string, typeof allData> = {};
    for (const cat of categories) {
      if (cat.id === 'all') continue;
      map[cat.id] = allData.filter((t) => t.category === cat.id);
    }
    return map;
  }, [activeTab, allData, categories]);

  const filtered = useMemo(() => {
    let list: typeof allData;
    if (activeTab === 'pilgi') {
      list = getPilgiFreqByCategory(activeCategory);
    } else {
      if (!activeCategory || activeCategory === 'all') {
        list = sortedSilgi;
      } else {
        list = sortedSilgi.filter((q) => q.category === activeCategory);
      }
    }
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(term) ||
          t.keyword.toLowerCase().includes(term)
      );
    }
    return list;
  }, [activeTab, activeCategory, searchTerm, sortedSilgi]);

  const handleTabChange = (tab: 'pilgi' | 'silgi') => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setActiveCategory('all');
    setOpenTopics(new Set());
    setSearchTerm('');
    setExpandedSidebarCats(new Set());
  };

  const toggleTopic = (num: number) => {
    setOpenTopics((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const expandAll = () => {
    setOpenTopics(new Set(filtered.map((t) => t.num)));
  };

  const collapseAll = () => {
    setOpenTopics(new Set());
  };

  const toggleSidebarCat = (catId: string) => {
    setExpandedSidebarCats((prev) => {
      if (prev.has(catId)) return new Set();
      return new Set([catId]);
    });
  };

  const scrollToTopic = (num: number) => {
    setOpenTopics((prev) => {
      const next = new Set(prev);
      next.add(num);
      return next;
    });
    setTimeout(() => {
      const el = topicRefs.current[num];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const selectCategoryFromSidebar = (catId: string) => {
    setActiveCategory(catId);
    setOpenTopics(new Set());
    setSearchTerm('');
  };

  const isPilgi = activeTab === 'pilgi';

  return (
    <>
      <SEOHead
        title={isPilgi ? '필기 빈출 주제 정리' : '실기 빈출 문항 정리'}
        description={
          isPilgi
            ? '직업상담사 2급 필기 2010~2022 39회 시험 빈출 핵심 주제 60개 요약 정리'
            : '직업상담사 2급 실기 2018~2025 8개년 빈출 핵심 문항 201개 빈출순 정리'
        }
      />
      <div className="page-header">
        <div className="container">
          <Link to="/learn" className="sq-back-link">
            <i className="fa-solid fa-arrow-left" /> 과목별 학습
          </Link>
          <h1>학습 요약</h1>
          <p className="page-desc">
            {isPilgi
              ? `필기시험 39회 분석 · 핵심 빈출 주제 ${PILGI_FREQUENT.length}개 요약`
              : `실기시험 8개년 분석 · 빈출 문항 ${SILGI_FREQUENT.length}개 빈출순 정리`}
          </p>
        </div>
      </div>

      {/* 필기/실기 탭 */}
      <div className="container">
        <div className="summary-tabs">
          <button
            className={`summary-tab ${isPilgi ? 'active' : ''}`}
            onClick={() => handleTabChange('pilgi')}
            type="button"
          >
            <i className="fa-solid fa-pen-to-square" /> 필기
          </button>
          <button
            className={`summary-tab ${!isPilgi ? 'active' : ''}`}
            onClick={() => handleTabChange('silgi')}
            type="button"
          >
            <i className="fa-solid fa-file-pen" /> 실기
          </button>
        </div>
      </div>

      <div className="container silgi-exam-page">
        <div className="summary-layout">
          {/* Desktop Sidebar */}
          <aside className="summary-sidebar">
            <div className="summary-sidebar-inner">
              <div className="summary-sidebar-title">
                <i className="fa-solid fa-bars-staggered" />
                <span>과목별 분류</span>
              </div>

              {/* All topics button */}
              <button
                className={`summary-sidebar-all ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => selectCategoryFromSidebar('all')}
                type="button"
              >
                <i className="fa-solid fa-list" />
                <span>전체 보기</span>
                <span className="summary-sidebar-count">{counts.all}</span>
              </button>

              {/* Category dropdowns */}
              <nav className="summary-sidebar-nav">
                {categories.filter((c) => c.id !== 'all').map((cat) => {
                  const isExpanded = expandedSidebarCats.has(cat.id);
                  const isActive = activeCategory === cat.id;
                  const topics = topicsByCategory[cat.id] || [];

                  return (
                    <div key={cat.id} className="summary-sidebar-group">
                      <button
                        className={`summary-sidebar-cat ${isActive ? 'active' : ''}`}
                        onClick={() => toggleSidebarCat(cat.id)}
                        type="button"
                      >
                        <span
                          className="summary-sidebar-dot"
                          style={{ background: cat.color }}
                        />
                        <span className="summary-sidebar-cat-label">{cat.label}</span>
                        <span className="summary-sidebar-count">{counts[cat.id]}</span>
                        <i className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} summary-sidebar-chevron`} />
                      </button>

                      {isExpanded && (
                        <ul className="summary-sidebar-topics">
                          {/* Category filter shortcut */}
                          <li>
                            <button
                              className={`summary-sidebar-topic-filter ${isActive ? 'active' : ''}`}
                              onClick={() => selectCategoryFromSidebar(cat.id)}
                              type="button"
                              style={isActive ? { color: cat.color } : undefined}
                            >
                              <i className="fa-solid fa-filter" />
                              이 과목만 보기
                            </button>
                          </li>
                          {topics.map((t) => (
                            <li key={t.num}>
                              <button
                                className={`summary-sidebar-topic ${openTopics.has(t.num) ? 'active' : ''}`}
                                onClick={() => scrollToTopic(t.num)}
                                type="button"
                              >
                                <span className="summary-sidebar-topic-num">
                                  {isPilgi ? `Q${t.num}` : `#${t.num}`}
                                </span>
                                <span className="summary-sidebar-topic-title">{t.title}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="summary-main">
            {/* Category Filter (mobile + desktop inline) */}
            <div className="freq-filter summary-mobile-filter">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`freq-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenTopics(new Set());
                  }}
                  type="button"
                  style={
                    activeCategory === cat.id
                      ? { background: cat.color, borderColor: cat.color, color: '#fff' }
                      : undefined
                  }
                >
                  <i className={cat.icon} />
                  <span>{cat.label}</span>
                  <span className="freq-filter-count">{counts[cat.id]}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="freq-search">
              <i className="fa-solid fa-search" />
              <input
                type="text"
                placeholder={isPilgi ? '주제 검색 (제목, 키워드)' : '문항 검색 (제목, 키워드)'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="freq-search-clear"
                  onClick={() => setSearchTerm('')}
                  type="button"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="sq-controls">
              <button className="sq-control-btn" onClick={expandAll} type="button">
                <i className="fa-solid fa-angles-down" /> 전체 펼치기
              </button>
              <button className="sq-control-btn" onClick={collapseAll} type="button">
                <i className="fa-solid fa-angles-up" /> 전체 접기
              </button>
              <span className="sq-control-count">
                {filtered.length}개 {isPilgi ? '주제' : '문항'}{' '}
                {searchTerm && `(검색: "${searchTerm}")`}
              </span>
            </div>

            {/* Topic List */}
            <div className="sq-list">
              {filtered.length > 0 ? (
                isPilgi
                  ? (filtered as typeof PILGI_FREQUENT).map((t) => (
                      <PilgiCard
                        key={t.num}
                        topic={t}
                        isOpen={openTopics.has(t.num)}
                        onToggle={() => toggleTopic(t.num)}
                        cardRef={(el: HTMLDivElement | null) => { topicRefs.current[t.num] = el; }}
                      />
                    ))
                  : (filtered as typeof sortedSilgi).map((t, idx) => (
                      <SilgiCard
                        key={t.num}
                        topic={t}
                        rank={idx + 1}
                        isOpen={openTopics.has(t.num)}
                        onToggle={() => toggleTopic(t.num)}
                        cardRef={(el: HTMLDivElement | null) => { topicRefs.current[t.num] = el; }}
                      />
                    ))
              ) : (
                <div className="freq-empty">
                  <i className="fa-solid fa-search" />
                  <p>검색 결과가 없습니다.</p>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="sq-bottom-nav">
              {isPilgi ? (
                <>
                  <Link to="/learn" className="btn btn-secondary">
                    <i className="fa-solid fa-arrow-left" /> 과목별 학습
                  </Link>
                  <Link to="/pilgi" className="btn btn-primary">
                    <i className="fa-solid fa-pen-to-square" /> 필기 CBT
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/silgi" className="btn btn-secondary">
                    <i className="fa-solid fa-file-pen" /> 실기 시험
                  </Link>
                  <Link to="/silgi/frequent" className="btn btn-primary">
                    <i className="fa-solid fa-fire" /> 기출문제 해설
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
