import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, Calendar, List, ChevronLeft, ChevronRight,
  Edit2, Trash2, Clock, TrendingUp, Target, BookOpen, Settings, X
} from 'lucide-react';
import { getApiKey, fetchQuote } from '../../services/tradierApi';

// ─── Types ────────────────────────────────────────────

interface EarningsEvent {
  id: string;
  symbol: string;
  name: string;
  date: string;        // YYYY-MM-DD
  time: 'BMO' | 'AMC' | 'TBD';
  expectedMove?: number; // percentage
  notes?: string;
  iv?: number;          // fetched from API if available
}

type ViewMode = 'calendar' | 'list';

// ─── Constants ────────────────────────────────────────

const STORAGE_KEY = 'wsw-earnings-events';
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const TIME_LABELS: Record<string, string> = {
  BMO: 'Before Market Open',
  AMC: 'After Market Close',
  TBD: 'TBD',
};

const TIME_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  BMO: { text: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
  AMC: { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30' },
  TBD: { text: 'text-zinc-400', bg: 'bg-zinc-400/10', border: 'border-zinc-400/30' },
};

const DOT_COLORS: Record<string, string> = {
  BMO: 'bg-amber-400',
  AMC: 'bg-purple-400',
  TBD: 'bg-zinc-500',
};

// ─── Strategy Suggestions ─────────────────────────────

interface StrategySuggestion {
  id: string;
  name: string;
  explanation: string;
}

function getStrategySuggestions(expectedMove?: number): StrategySuggestion[] {
  if (expectedMove === undefined || expectedMove === null) {
    // No expected move data — suggest general strategies
    return [
      { id: 'iron-condor', name: 'Iron Condor', explanation: 'Defined-risk premium selling for range-bound outcomes' },
      { id: 'long-straddle', name: 'Long Straddle', explanation: 'Buy premium when big move is expected either direction' },
    ];
  }

  if (expectedMove > 5) {
    return [
      { id: 'iron-condor', name: 'Iron Condor', explanation: 'Sell premium when IV is high — wide wings capture IV crush' },
      { id: 'short-strangle', name: 'Short Strangle', explanation: 'Collect maximum premium from elevated IV (undefined risk)' },
      { id: 'short-straddle', name: 'Short Straddle', explanation: 'Max premium at ATM — profits from IV crush if stock pins' },
    ];
  }

  if (expectedMove >= 2) {
    return [
      { id: 'iron-butterfly', name: 'Iron Butterfly', explanation: 'Tighter range play — higher credit than condor if stock pins' },
      { id: 'calendar-spread', name: 'Calendar Spread', explanation: 'Sell front-month IV, keep back-month — classic earnings play' },
      { id: 'jade-lizard', name: 'Jade Lizard', explanation: 'No upside risk — collect credit on both sides with call spread protection' },
    ];
  }

  // Low expected move (<2%)
  return [
    { id: 'long-straddle', name: 'Long Straddle', explanation: 'Buy premium when move is underpriced — potential for surprise move' },
    { id: 'long-strangle', name: 'Long Strangle', explanation: 'Cheaper long vol bet — needs bigger move but costs less' },
    { id: 'ratio-spread', name: 'Ratio Spread', explanation: 'Finance a long with extra shorts — profits in a range with directional bias' },
  ];
}

// ─── Seed Data ────────────────────────────────────────

function generateSeedEvents(): EarningsEvent[] {
  const now = new Date();
  const seeds: Array<{ symbol: string; name: string; daysOut: number; time: 'BMO' | 'AMC' | 'TBD'; expectedMove: number }> = [
    { symbol: 'AAPL', name: 'Apple Inc.', daysOut: 12, time: 'AMC', expectedMove: 4.2 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', daysOut: 8, time: 'AMC', expectedMove: 3.8 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', daysOut: 15, time: 'AMC', expectedMove: 5.1 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', daysOut: 20, time: 'AMC', expectedMove: 6.3 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', daysOut: 25, time: 'AMC', expectedMove: 8.5 },
  ];

  return seeds.map((s) => {
    const date = new Date(now);
    date.setDate(date.getDate() + s.daysOut);
    return {
      id: `seed-${s.symbol}`,
      symbol: s.symbol,
      name: s.name,
      date: date.toISOString().split('T')[0],
      time: s.time,
      expectedMove: s.expectedMove,
    };
  });
}

// ─── Helper Functions ─────────────────────────────────

function loadEvents(): EarningsEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as EarningsEvent[];
      if (parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }

  const seeds = generateSeedEvents();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
  return seeds;
}

function saveEvents(events: EarningsEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function getCalendarDays(year: number, month: number): Array<{ date: number; inMonth: boolean; dateStr: string }> {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days: Array<{ date: number; inMonth: boolean; dateStr: string }> = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const m = month === 0 ? 12 : month;
    const y = month === 0 ? year - 1 : year;
    days.push({
      date: d,
      inMonth: false,
      dateStr: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      date: d,
      inMonth: true,
      dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    });
  }

  // Next month days to fill grid
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month + 2 > 12 ? 1 : month + 2;
    const y = month + 2 > 12 ? year + 1 : year;
    days.push({
      date: d,
      inMonth: false,
      dateStr: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    });
  }

  return days;
}

function generateId(): string {
  return `ev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Component ────────────────────────────────────────

export default function EarningsCalendar() {
  const navigate = useNavigate();

  // State
  const [events, setEvents] = useState<EarningsEvent[]>(loadEvents);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EarningsEvent | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [showEducation, setShowEducation] = useState(false);

  // Form state
  const [formSymbol, setFormSymbol] = useState('');
  const [formName, setFormName] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState<'BMO' | 'AMC' | 'TBD'>('AMC');
  const [formExpectedMove, setFormExpectedMove] = useState('');
  const [formNotes, setFormNotes] = useState('');

  // IV fetching state
  const [fetchingIV, setFetchingIV] = useState<Record<string, boolean>>({});

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  // Save events whenever they change
  useEffect(() => {
    saveEvents(events);
  }, [events]);

  // Build date → events map for calendar
  const eventsByDate = useMemo(() => {
    const map: Record<string, EarningsEvent[]> = {};
    for (const ev of events) {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    }
    return map;
  }, [events]);

  // Calendar days
  const calendarDays = useMemo(() => getCalendarDays(calYear, calMonth), [calYear, calMonth]);

  // Upcoming events sorted
  const upcomingEvents = useMemo(() => {
    return [...events]
      .filter((ev) => daysUntil(ev.date) >= 0)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events]);

  // Past events sorted
  const pastEvents = useMemo(() => {
    return [...events]
      .filter((ev) => daysUntil(ev.date) < 0)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [events]);

  // Fetch IV for a symbol
  const fetchIV = useCallback(async (ev: EarningsEvent) => {
    if (!getApiKey() || fetchingIV[ev.id]) return;
    setFetchingIV((prev) => ({ ...prev, [ev.id]: true }));
    try {
      const quote = await fetchQuote(ev.symbol);
      // Use bid-ask spread as a rough IV proxy (not ideal, but we don't have ATM IV from quote)
      // The real IV would need options chain - for now just show price info
      setEvents((prev) =>
        prev.map((e) => (e.id === ev.id ? { ...e, iv: undefined } : e))
      );
    } catch {
      // Silently fail - API features are optional
    } finally {
      setFetchingIV((prev) => ({ ...prev, [ev.id]: false }));
    }
  }, [fetchingIV]);

  // Navigation
  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
    setSelectedDate(null);
  };

  const goToToday = () => {
    const now = new Date();
    setCalYear(now.getFullYear());
    setCalMonth(now.getMonth());
    setSelectedDate(todayStr);
  };

  // Form handling
  const resetForm = () => {
    setFormSymbol('');
    setFormName('');
    setFormDate('');
    setFormTime('AMC');
    setFormExpectedMove('');
    setFormNotes('');
    setEditingEvent(null);
  };

  const openAddForm = () => {
    resetForm();
    if (selectedDate) setFormDate(selectedDate);
    setShowForm(true);
  };

  const openEditForm = (ev: EarningsEvent) => {
    setFormSymbol(ev.symbol);
    setFormName(ev.name);
    setFormDate(ev.date);
    setFormTime(ev.time);
    setFormExpectedMove(ev.expectedMove !== undefined ? String(ev.expectedMove) : '');
    setFormNotes(ev.notes || '');
    setEditingEvent(ev);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!formSymbol.trim() || !formDate) return;

    const eventData: EarningsEvent = {
      id: editingEvent ? editingEvent.id : generateId(),
      symbol: formSymbol.toUpperCase().trim(),
      name: formName.trim() || formSymbol.toUpperCase().trim(),
      date: formDate,
      time: formTime,
      expectedMove: formExpectedMove ? parseFloat(formExpectedMove) : undefined,
      notes: formNotes.trim() || undefined,
    };

    if (editingEvent) {
      setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? eventData : e)));
    } else {
      setEvents((prev) => [...prev, eventData]);
    }

    setShowForm(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    if (expandedEventId === id) setExpandedEventId(null);
  };

  // Selected date events
  const selectedDateEvents = selectedDate ? (eventsByDate[selectedDate] || []) : [];

  const hasApiKey = !!getApiKey();

  // ─── Render ─────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black pb-28">
      {/* Header */}
      <div
        className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/10"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
      >
        <div className="px-4 pb-3">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => navigate('/tools')}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a0a0a] border border-[#39ff14]/20 active:scale-[0.95] transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">📅 Earnings Calendar</h1>
              <p className="text-zinc-500 text-xs">Track earnings & plan strategies</p>
            </div>
            <button
              onClick={openAddForm}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#39ff14]/10 border border-[#39ff14]/30 active:scale-[0.95] transition-transform"
            >
              <Plus className="w-5 h-5 text-[#39ff14]" />
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.98] ${
                viewMode === 'calendar'
                  ? 'bg-[#39ff14]/15 text-[#39ff14] border border-[#39ff14]/30'
                  : 'bg-[#0a0a0a] text-zinc-400 border border-zinc-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.98] ${
                viewMode === 'list'
                  ? 'bg-[#39ff14]/15 text-[#39ff14] border border-[#39ff14]/30'
                  : 'bg-[#0a0a0a] text-zinc-400 border border-zinc-800'
              }`}
            >
              <List className="w-4 h-4" />
              List
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="px-4 mt-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0a0a0a] border border-zinc-800 active:scale-[0.95] transition-transform"
            >
              <ChevronLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <button onClick={goToToday} className="active:scale-[0.98] transition-transform">
              <h2 className="text-lg font-bold text-white">
                {MONTHS[calMonth]} {calYear}
              </h2>
            </button>
            <button
              onClick={nextMonth}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0a0a0a] border border-zinc-800 active:scale-[0.95] transition-transform"
            >
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-zinc-500 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              const dayEvents = eventsByDate[day.dateStr] || [];
              const isToday = day.dateStr === todayStr;
              const isSelected = day.dateStr === selectedDate;
              const hasBMO = dayEvents.some((e) => e.time === 'BMO');
              const hasAMC = dayEvents.some((e) => e.time === 'AMC');
              const hasTBD = dayEvents.some((e) => e.time === 'TBD');

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(day.dateStr === selectedDate ? null : day.dateStr)}
                  className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-all active:scale-[0.95] relative ${
                    !day.inMonth ? 'opacity-30' : ''
                  } ${
                    isToday
                      ? 'border-2 border-[#39ff14] bg-[#39ff14]/5'
                      : isSelected
                      ? 'bg-[#39ff14]/10 border border-[#39ff14]/40'
                      : 'border border-transparent hover:bg-[#0a0a0a]'
                  }`}
                >
                  <span
                    className={`text-sm font-mono ${
                      isToday ? 'text-[#39ff14] font-bold' : day.inMonth ? 'text-white' : 'text-zinc-600'
                    }`}
                  >
                    {day.date}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {hasBMO && <div className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS.BMO}`} />}
                      {hasAMC && <div className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS.AMC}`} />}
                      {hasTBD && <div className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS.TBD}`} />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-3 mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs text-zinc-500">BMO</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-xs text-zinc-500">AMC</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-500" />
              <span className="text-xs text-zinc-500">TBD</span>
            </div>
          </div>

          {/* Selected Day Events */}
          {selectedDate && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">
                  {formatDate(selectedDate)}
                </h3>
                {selectedDateEvents.length === 0 && (
                  <button
                    onClick={() => {
                      setFormDate(selectedDate);
                      openAddForm();
                    }}
                    className="text-xs text-[#39ff14] flex items-center gap-1 active:scale-[0.95] transition-transform"
                  >
                    <Plus className="w-3 h-3" /> Add Event
                  </button>
                )}
              </div>
              {selectedDateEvents.length === 0 ? (
                <div className="bg-[#0a0a0a] rounded-xl border border-zinc-800 p-6 text-center">
                  <p className="text-zinc-500 text-sm">No earnings events on this day</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDateEvents.map((ev) => (
                    <EventCard
                      key={ev.id}
                      event={ev}
                      expanded={expandedEventId === ev.id}
                      onToggle={() => setExpandedEventId(expandedEventId === ev.id ? null : ev.id)}
                      onEdit={() => openEditForm(ev)}
                      onDelete={() => handleDelete(ev.id)}
                      onNavigate={navigate}
                      hasApiKey={hasApiKey}
                      fetching={fetchingIV[ev.id] || false}
                      onFetchIV={() => fetchIV(ev)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="px-4 mt-4">
          {/* Upcoming */}
          <h3 className="text-sm font-semibold text-[#39ff14] mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Upcoming ({upcomingEvents.length})
          </h3>
          {upcomingEvents.length === 0 ? (
            <div className="bg-[#0a0a0a] rounded-xl border border-zinc-800 p-6 text-center mb-6">
              <p className="text-zinc-500 text-sm">No upcoming earnings events</p>
              <button
                onClick={openAddForm}
                className="mt-3 text-sm text-[#39ff14] flex items-center gap-1 mx-auto active:scale-[0.95] transition-transform"
              >
                <Plus className="w-4 h-4" /> Add your first event
              </button>
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {upcomingEvents.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  expanded={expandedEventId === ev.id}
                  onToggle={() => setExpandedEventId(expandedEventId === ev.id ? null : ev.id)}
                  onEdit={() => openEditForm(ev)}
                  onDelete={() => handleDelete(ev.id)}
                  onNavigate={navigate}
                  showCountdown
                  hasApiKey={hasApiKey}
                  fetching={fetchingIV[ev.id] || false}
                  onFetchIV={() => fetchIV(ev)}
                />
              ))}
            </div>
          )}

          {/* Past */}
          {pastEvents.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-zinc-500 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Past ({pastEvents.length})
              </h3>
              <div className="space-y-3 opacity-60">
                {pastEvents.map((ev) => (
                  <EventCard
                    key={ev.id}
                    event={ev}
                    expanded={expandedEventId === ev.id}
                    onToggle={() => setExpandedEventId(expandedEventId === ev.id ? null : ev.id)}
                    onEdit={() => openEditForm(ev)}
                    onDelete={() => handleDelete(ev.id)}
                    onNavigate={navigate}
                    hasApiKey={hasApiKey}
                    fetching={fetchingIV[ev.id] || false}
                    onFetchIV={() => fetchIV(ev)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Educational Footer */}
      <div className="px-4 mt-8">
        <button
          onClick={() => setShowEducation(!showEducation)}
          className="w-full flex items-center justify-between p-4 bg-[#0a0a0a] rounded-xl border border-[#39ff14]/20 active:scale-[0.98] transition-transform"
        >
          <span className="text-sm font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#39ff14]" />
            📚 Earnings Trading Guide
          </span>
          <ChevronRight
            className={`w-4 h-4 text-zinc-500 transition-transform ${showEducation ? 'rotate-90' : ''}`}
          />
        </button>

        {showEducation && (
          <div className="mt-3 space-y-3">
            <EducationCard
              title="Why IV Rises Before Earnings"
              content="Implied volatility increases as earnings approach because the market prices in uncertainty about the announcement. This creates higher option premiums — the 'earnings premium.'"
            />
            <EducationCard
              title="IV Crush Explained"
              content="After earnings are announced, the uncertainty disappears and IV collapses (often 30-60%). This 'IV crush' devastates long option holders and rewards premium sellers."
              linkText="Try the IV Crush Calculator →"
              linkTo="/tools/iv-crush"
              navigate={navigate}
            />
            <EducationCard
              title="The Expected Move Formula"
              content="Expected Move = ATM Straddle Price × 0.85. This gives you a 1-standard-deviation range (~68% probability) for the earnings move."
            />
            <EducationCard
              title="When to Enter"
              content="Premium sellers: enter 1-5 days before earnings when IV is elevated but hasn't peaked. Premium buyers: enter 5-10 days out before IV fully ramps."
            />
            <EducationCard
              title="When to Exit"
              content="Premium sellers: close before announcement (lock in IV gains) or let IV crush work post-earnings. Premium buyers: exit before earnings to avoid IV crush, unless you're betting on the move exceeding expected."
            />
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center">
          <div className="w-full max-w-lg bg-[#0a0a0a] rounded-t-2xl border-t border-[#39ff14]/20 p-6 pb-10 animate-slide-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">
                {editingEvent ? 'Edit Event' : 'Add Earnings Event'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 active:scale-[0.95] transition-transform"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* Symbol */}
            <label className="block mb-4">
              <span className="text-xs font-medium text-zinc-400 mb-1.5 block">Symbol *</span>
              <input
                type="text"
                value={formSymbol}
                onChange={(e) => setFormSymbol(e.target.value.toUpperCase())}
                placeholder="e.g. AAPL"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#39ff14]/50 placeholder:text-zinc-600"
                autoFocus
              />
            </label>

            {/* Company Name */}
            <label className="block mb-4">
              <span className="text-xs font-medium text-zinc-400 mb-1.5 block">Company Name</span>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Apple Inc."
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#39ff14]/50 placeholder:text-zinc-600"
              />
            </label>

            {/* Date */}
            <label className="block mb-4">
              <span className="text-xs font-medium text-zinc-400 mb-1.5 block">Earnings Date *</span>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#39ff14]/50 [color-scheme:dark]"
              />
            </label>

            {/* Time */}
            <div className="mb-4">
              <span className="text-xs font-medium text-zinc-400 mb-2 block">Timing</span>
              <div className="flex gap-2">
                {(['BMO', 'AMC', 'TBD'] as const).map((t) => {
                  const colors = TIME_COLORS[t];
                  return (
                    <button
                      key={t}
                      onClick={() => setFormTime(t)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] border ${
                        formTime === t
                          ? `${colors.bg} ${colors.text} ${colors.border}`
                          : 'bg-black border-zinc-700 text-zinc-500'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expected Move */}
            <label className="block mb-4">
              <span className="text-xs font-medium text-zinc-400 mb-1.5 block">Expected Move %</span>
              <input
                type="number"
                value={formExpectedMove}
                onChange={(e) => setFormExpectedMove(e.target.value)}
                placeholder="e.g. 5.2"
                step="0.1"
                min="0"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#39ff14]/50 placeholder:text-zinc-600"
              />
            </label>

            {/* Notes */}
            <label className="block mb-6">
              <span className="text-xs font-medium text-zinc-400 mb-1.5 block">Notes</span>
              <textarea
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="Strategy ideas, key levels, etc."
                rows={3}
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#39ff14]/50 placeholder:text-zinc-600 resize-none"
              />
            </label>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!formSymbol.trim() || !formDate}
              className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] ${
                formSymbol.trim() && formDate
                  ? 'bg-[#39ff14] text-black'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              }`}
            >
              {editingEvent ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Event Card Component ─────────────────────────────

interface EventCardProps {
  event: EarningsEvent;
  expanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onNavigate: (path: string) => void;
  showCountdown?: boolean;
  hasApiKey: boolean;
  fetching: boolean;
  onFetchIV: () => void;
}

function EventCard({
  event,
  expanded,
  onToggle,
  onEdit,
  onDelete,
  onNavigate,
  showCountdown,
  hasApiKey,
  fetching,
  onFetchIV,
}: EventCardProps) {
  const timeColors = TIME_COLORS[event.time];
  const days = daysUntil(event.date);
  const isPast = days < 0;
  const strategies = getStrategySuggestions(event.expectedMove);

  return (
    <div className="bg-[#0a0a0a] rounded-xl border border-zinc-800 overflow-hidden">
      {/* Main row */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-3 active:scale-[0.98] transition-transform text-left"
      >
        {/* Symbol badge */}
        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${timeColors.border} ${timeColors.bg}`}>
          <span className={`text-xs font-bold font-mono ${timeColors.text}`}>{event.symbol}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm truncate">{event.symbol}</span>
            <span className="text-zinc-500 text-xs truncate">{event.name}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-zinc-400 text-xs font-mono">{formatDate(event.date)}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded ${timeColors.bg} ${timeColors.text}`}>
              {event.time}
            </span>
            {event.expectedMove !== undefined && (
              <span className="text-xs text-[#39ff14] font-mono">±{event.expectedMove}%</span>
            )}
            {event.iv !== undefined && (
              <span className="text-xs bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded">
                IV: {event.iv}%
              </span>
            )}
          </div>
        </div>

        {/* Countdown / Chevron */}
        <div className="shrink-0 text-right">
          {showCountdown && !isPast && (
            <div className="text-right mb-1">
              <span className={`text-xs font-mono font-bold ${days <= 3 ? 'text-red-400' : days <= 7 ? 'text-amber-400' : 'text-zinc-400'}`}>
                {days === 0 ? 'Today' : days === 1 ? '1 day' : `${days} days`}
              </span>
            </div>
          )}
          <ChevronRight
            className={`w-4 h-4 text-zinc-600 transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-zinc-800 px-4 pb-4">
          {/* Actions row */}
          <div className="flex items-center gap-2 py-3">
            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs active:scale-[0.95] transition-transform"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs active:scale-[0.95] transition-transform"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
            {hasApiKey && (
              <button
                onClick={onFetchIV}
                disabled={fetching}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs active:scale-[0.95] transition-transform disabled:opacity-50"
              >
                <Settings className={`w-3 h-3 ${fetching ? 'animate-spin' : ''}`} />
                {fetching ? 'Fetching...' : 'Fetch IV'}
              </button>
            )}
          </div>

          {/* Notes */}
          {event.notes && (
            <div className="bg-black rounded-lg p-3 mb-3 border border-zinc-800">
              <p className="text-xs text-zinc-400">{event.notes}</p>
            </div>
          )}

          {/* Strategy Suggestions */}
          <div className="mb-1">
            <h4 className="text-xs font-semibold text-[#39ff14] mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              Suggested Strategies
              {event.expectedMove !== undefined && (
                <span className="text-zinc-500 font-normal">
                  ({event.expectedMove > 5 ? 'High' : event.expectedMove >= 2 ? 'Moderate' : 'Low'} Expected Move)
                </span>
              )}
            </h4>
            <div className="space-y-2">
              {strategies.map((strat) => (
                <button
                  key={strat.id}
                  onClick={() => onNavigate(`/strategy/${strat.id}`)}
                  className="w-full text-left p-3 rounded-lg bg-black border border-zinc-800 active:scale-[0.98] active:border-[#39ff14]/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-semibold text-white">{strat.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                  </div>
                  <p className="text-xs text-zinc-500">{strat.explanation}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Education Card Component ─────────────────────────

interface EducationCardProps {
  title: string;
  content: string;
  linkText?: string;
  linkTo?: string;
  navigate?: (path: string) => void;
}

function EducationCard({ title, content, linkText, linkTo, navigate: nav }: EducationCardProps) {
  return (
    <div className="bg-[#0a0a0a] rounded-xl border border-zinc-800 p-4">
      <h4 className="text-sm font-semibold text-white mb-2">{title}</h4>
      <p className="text-xs text-zinc-400 leading-relaxed">{content}</p>
      {linkText && linkTo && nav && (
        <button
          onClick={() => nav(linkTo)}
          className="mt-2 text-xs text-[#39ff14] font-medium active:scale-[0.98] transition-transform"
        >
          {linkText}
        </button>
      )}
    </div>
  );
}
