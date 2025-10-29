import { useState } from 'react';
import './index.scss';

export default function Timeline() {
  const [events, setEvents] = useState([
    {
      date: 'May 2025 - ongoing',
      title: 'Multitude IT Labs s.r.o',
      description: [
      'Developed and executed <b>automated</b> and <b>manual tests</b> to validate application functionality and performance across multiple environments',
      'Implemented <b>JUnit 5</b> test suites for <b>unit</b> and <b>integration testing</b>, improving defect detection efficiency by <b>35%</b>',
      'Enhanced <b>CI/CD pipelines</b> with automated regression testing, reducing release validation time by <b>40%</b>',
      'Collaborated with developers to design <b>test strategies</b> and maintain high <b>code quality</b> through consistent test coverage and refactoring'
    ],
      expanded: false,
    },
  ]);

  const handleItemClick = (index) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event, idx) => {
        if (idx === index) {
          return { ...event, expanded: !event.expanded };
        }
        return event;
      });
      return updatedEvents;
    });
  };

  return (
    <div className="timeline-container">
      {events.map((event, index) => (
        <div
          className={`timeline-item ${event.expanded ? 'expanded' : ''}`}
          key={index}
          onClick={() => handleItemClick(index)}
        >
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h2>{event.title}</h2>
            {event.expanded ? (
              <div>
                {event.description.map((desc, descIndex) => (
                  <p key={descIndex} dangerouslySetInnerHTML={{ __html: desc }} />
                ))}
              </div>
            ) : (
              <>
                <div className="more">
                  <p>Click for more</p>
                </div>
                <div className="date">{event.date}</div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};