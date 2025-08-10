import React from 'react';
import { MagnifyingGlassIcon, FunnelIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import type { CalendarFilters as CalendarFiltersType } from '../../types';

interface CalendarFiltersProps {
  filters: CalendarFiltersType;
  onChange: (filters: Partial<CalendarFiltersType>) => void;
}

const CalendarFilters: React.FC<CalendarFiltersProps> = ({ filters, onChange }) => {
  const moduleOptions = [
    { 
      id: 'financial', 
      label: 'Finansal', 
      icon: '💰',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-200'
    },
    { 
      id: 'reminder', 
      label: 'Hatırlatıcı', 
      icon: '🔔',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200'
    },
    { 
      id: 'note', 
      label: 'Not', 
      icon: '📝',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-200'
    },
    { 
      id: 'travel', 
      label: 'Seyahat', 
      icon: '✈️',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    { 
      id: 'counter', 
      label: 'Sayaç', 
      icon: '📊',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-200'
    }
  ];

  const handleModuleToggle = (moduleId: string) => {
    const newModules = filters.modules.includes(moduleId as any)
      ? filters.modules.filter(m => m !== moduleId)
      : [...filters.modules, moduleId as any];
    
    onChange({ modules: newModules });
  };

  const handleSearchChange = (search: string) => {
    onChange({ search });
  };

  const handleSharedToggle = () => {
    onChange({ shared: !filters.shared });
  };

  const handleTodayOnlyToggle = () => {
    onChange({ todayOnly: !filters.todayOnly });
  };

  const activeFiltersCount = filters.modules.length + (filters.search ? 1 : 0) + (filters.shared ? 1 : 0) + (filters.todayOnly ? 1 : 0);

  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Modül filtreleri */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FunnelIcon className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">Modüller:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {moduleOptions.map((option) => {
            const isActive = filters.modules.includes(option.id as any);
            return (
              <button
                key={option.id}
                onClick={() => handleModuleToggle(option.id)}
                className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
                  isActive
                    ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg scale-105`
                    : `${option.bgColor} ${option.borderColor} text-gray-700 hover:scale-105 hover:shadow-md`
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
                
                {/* Hover efekti */}
                {!isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Arama */}
      <div className="relative">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Ara..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all duration-200 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Diğer filtreler */}
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.shared}
              onChange={handleSharedToggle}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-200 ${
              filters.shared 
                ? 'bg-blue-500 border-blue-500' 
                : 'bg-white border-gray-300 group-hover:border-blue-400'
            }`}>
              {filters.shared && (
                <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            Ortak
          </span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.todayOnly}
              onChange={handleTodayOnlyToggle}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-200 ${
              filters.todayOnly 
                ? 'bg-green-500 border-green-500' 
                : 'bg-white border-gray-300 group-hover:border-green-400'
            }`}>
              {filters.todayOnly && (
                <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            Sadece Bugün
          </span>
        </label>
      </div>

      {/* Aktif filtre sayısı */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-blue-700">
            {activeFiltersCount} filtre aktif
          </span>
          {filters.search && (
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              "{filters.search}"
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarFilters;
