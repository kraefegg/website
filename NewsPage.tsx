import React, { useState } from 'react';
import { NavRoute, Language, NewsArticle } from '../types';
import { newsData } from '../data/newsData';
import { Search, Calendar, Clock, ArrowRight, X, Bookmark } from 'lucide-react';

interface NewsPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate, lang }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredNews = newsData.filter((article) => {
    const matchesCat = activeCategory === 'all' || article.category.toLowerCase().includes(activeCategory.toLowerCase());
    const q = searchQuery.toLowerCase();
    const title = (lang === 'pt' ? article.title : article.titleEn).toLowerCase();
    const summary = (lang === 'pt' ? article.summary : article.summaryEn).toLowerCase();
    return matchesCat && (!q || title.includes(q) || summary.includes(q));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <span>EDITORIAL & INSIGHTS TÉCNICOS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          {lang === 'pt' ? 'Notícias, Pesquisa & Publicações' : 'News, Research & Publications'}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          {lang === 'pt'
            ? 'Artigos técnicos, lançamentos de sistemas de IA, relatórios de governança ambiental e análises multidisciplinares do corpo executivo da Kraefegg M.O.'
            : 'Technical papers, AI systems releases, environmental governance reports, and multidisciplinary insights from the Kraefegg M.O. leadership.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'pt' ? 'Buscar publicações...' : 'Search publications...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['all', 'Maritime', 'Mining', 'Environment'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            className="rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 to-[#070B14] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={article.heroImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 text-cyan-300 border border-cyan-500/40">
                  {article.category}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {lang === 'pt' ? article.readingTime : article.readingTimeEn}
                  </span>
                </div>

                <h3 className="text-lg font-heading font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {lang === 'pt' ? article.title : article.titleEn}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {lang === 'pt' ? article.summary : article.summaryEn}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{lang === 'pt' ? 'Ler artigo completo' : 'Read full publication'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#070A12] border border-cyan-500/40 shadow-2xl p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {selectedArticle.category}
              </span>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400">
                {selectedArticle.date} • {lang === 'pt' ? selectedArticle.readingTime : selectedArticle.readingTimeEn}
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                {lang === 'pt' ? selectedArticle.title : selectedArticle.titleEn}
              </h2>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 h-64">
              <img
                src={selectedArticle.heroImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-sans">
              {(lang === 'pt' ? selectedArticle.content : selectedArticle.contentEn).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
              {selectedArticle.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
