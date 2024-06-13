'use client'

import Image from 'next/image'
import { EventList } from '../EventList/EventList'
import { EventLink } from '@/components/ui/EventLink/EventLink'
import { IconButton } from '@/components/ui/IconButton/IconButton'
import { useEvents } from './hooks/useEvents'
import styles from './Events.module.css'

import data from './data.json'

export const Events = () => {
  const { eventsToRender, handleLoadMoreClick, hasMoreItems } = useEvents(data)

  return (
    <section id='dates' className={styles.root}>
      <h2 className='visuallyHidden'>Events</h2>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src='/images/events-image.png'
          alt='One Fall performing'
          fill
        />
      </div>
      <EventList>
        {eventsToRender.map(event => (
          <EventList.Item key={event.date}>
            <EventLink
              url={event.url}
              date={event.date}
              city={event.city}
              venue={event.venue}
            />
          </EventList.Item>
        ))}
      </EventList>
      {hasMoreItems && (
        <IconButton
          icon='arrow-down'
          ariaLabel='Show more events'
          className={styles.button}
          onClick={handleLoadMoreClick}
        />
      )}
    </section>
  )
}
