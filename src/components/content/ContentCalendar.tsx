import React, { useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  List,
  Grid,
  Clock,
  Plus,
  Filter,
  Download
} from 'lucide-react';
import { useContentStore } from '../../stores/contentStore';
import { CalendarEvent, CalendarView } from '../../types/content';
import ContentCard from './ContentCard';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ContentCalendar: React.FC = () => {
  const {
    posts,
    filteredPosts,
    calendarView,
    setCalendarView,
    currentDate,
    setCurrentDate,
    updatePost,
    showFilters,
    toggleFilters
  } = useContentStore();

  // Convert posts to calendar events
  const events: CalendarEvent[] = useMemo(() => {
    return filteredPosts
      .filter(post => post.scheduledTime || post.publishedTime)
      .map(post => {
        const eventDate = post.scheduledTime || post.publishedTime!;
        return {
          id: post.id,
          title: post.title || post.content.substring(0, 50) + '...',
          start: eventDate,
          end: new Date(eventDate.getTime() + 60 * 60 * 1000), // 1 hour duration
          resource: post,
          allDay: false
        };
      });
  }, [filteredPosts]);

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (view: string) => {
    setCalendarView(view as CalendarView);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    console.log('Selected event:', event);
    // Handle event selection (open edit modal, etc.)
  };

  const handleSelectSlot = (slotInfo: any) => {
    console.log('Selected slot:', slotInfo);
    // Handle slot selection (create new post, etc.)
  };

  const handleEventDrop = (args: any) => {
    const { event, start, end } = args;
    updatePost(event.id, {
      scheduledTime: start
    });
  };

  const handleEventResize = (args: any) => {
    const { event, start, end } = args;
    updatePost(event.id, {
      scheduledTime: start
    });
  };

  const getViewIcon = (view: CalendarView) => {
    switch (view) {
      case 'month':
        return <Grid className="w-4 h-4" />;
      case 'week':
        return <CalendarIcon className="w-4 h-4" />;
      case 'day':
        return <Clock className="w-4 h-4" />;
      case 'list':
        return <List className="w-4 h-4" />;
      default:
        return <Grid className="w-4 h-4" />;
    }
  };

  const CustomEvent = ({ event }: { event: CalendarEvent }) => {
    const post = event.resource;
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'scheduled':
          return 'bg-blue-500/80 border-blue-400';
        case 'published':
          return 'bg-emerald-500/80 border-emerald-400';
        case 'review':
          return 'bg-violet-500/80 border-violet-400';
        default:
          return 'bg-gray-500/80 border-gray-400';
      }
    };

    return (
      <div className={`p-1 rounded text-white text-xs border ${getStatusColor(post.status)} hover:scale-105 transition-transform duration-200`}>
        <div className="font-medium truncate">{event.title}</div>
        <div className="flex items-center space-x-1 mt-1">
          <span className="truncate">{post.type}</span>
          {post.aiGenerated && <span className="text-violet-300">AI</span>}
        </div>
      </div>
    );
  };

  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
      toolbar.onNavigate('TODAY');
    };

    const label = () => {
      const date = toolbar.date;
      return format(date, 'MMMM yyyy');
    };

    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-white">Content Calendar</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={goToBack}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToCurrent}
              className="px-3 py-2 text-sm font-medium text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Today
            </button>
            <button
              onClick={goToNext}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-medium text-white ml-4">{label()}</h3>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
            {(['month', 'week', 'day', 'list'] as CalendarView[]).map((view) => (
              <button
                key={view}
                onClick={() => handleViewChange(view)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  calendarView === view
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {getViewIcon(view)}
                <span className="capitalize">{view}</span>
              </button>
            ))}
          </div>

          <button
            onClick={toggleFilters}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              showFilters
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>

          <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg">
            <Plus className="w-4 h-4" />
            <span>Schedule Post</span>
          </button>

          <button className="px-4 py-2 glass-card hover:bg-gray-800/60 text-gray-300 rounded-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    );
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    const post = event.resource;
    let backgroundColor = '#6b7280';
    
    switch (post.status) {
      case 'scheduled':
        backgroundColor = '#3b82f6';
        break;
      case 'published':
        backgroundColor = '#10b981';
        break;
      case 'review':
        backgroundColor = '#8b5cf6';
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-gray-900/50 rounded-lg border border-gray-700/50 p-6">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          view={calendarView === 'timeline' ? 'month' : calendarView}
          onView={handleViewChange}
          date={currentDate}
          onNavigate={handleNavigate}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          selectable
          resizable
          popup
          components={{
            toolbar: CustomToolbar,
            event: CustomEvent
          }}
          eventPropGetter={eventStyleGetter}
          className="content-calendar"
        />
      </div>

      {/* Calendar Sidebar */}
      <div className="w-80 ml-6 space-y-4">
        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {events
              .filter(event => {
                const today = new Date();
                const eventDate = new Date(event.start);
                return eventDate.toDateString() === today.toDateString();
              })
              .slice(0, 3)
              .map(event => (
                <div key={event.id} className="p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{event.title}</span>
                    <span className="text-xs text-gray-400">
                      {format(event.start, 'HH:mm')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {event.resource.content}
                  </p>
                </div>
              ))}
            {events.filter(event => {
              const today = new Date();
              const eventDate = new Date(event.start);
              return eventDate.toDateString() === today.toDateString();
            }).length === 0 && (
              <p className="text-gray-400 text-center py-4">No posts scheduled for today</p>
            )}
          </div>
        </div>

        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">Optimal Times</h3>
          <div className="space-y-3">
            {[
              { time: '9:00 AM', engagement: 85, label: 'Peak' },
              { time: '2:00 PM', engagement: 72, label: 'High' },
              { time: '6:00 PM', engagement: 58, label: 'Good' },
              { time: '11:00 AM', engagement: 45, label: 'Average' }
            ].map((slot, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-white">{slot.time}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    slot.label === 'Peak' ? 'bg-emerald-500/20 text-emerald-400' :
                    slot.label === 'High' ? 'bg-blue-500/20 text-blue-400' :
                    slot.label === 'Good' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {slot.label}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-700/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${slot.engagement}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8">{slot.engagement}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;