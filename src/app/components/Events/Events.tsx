'use client'

import Image from 'next/image'
import { List } from '@/components/ui/List/List'
import { EventLink } from '@/components/ui/EventLink/EventLink'
import { ArrowButton } from '@/components/ui/ArrowButton/ArrowButton'
import { useEvents } from './hooks/useEvents'
import styles from './Events.module.css'

import data from './data.json'

export const Events = () => {
  const { eventsToRender, handleLoadMoreClick, hasMoreItems } = useEvents(data.items)

  return (
    <section id='dates' className={styles.root}>
      <h2>
        <span className='scrollTracker' data-toc-idx='2'></span>
        <span className='visuallyHidden'>Events</span>
      </h2>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src='/images/events-image.png'
          alt='One Fall performing'
          fill
        />
      </div>
      <List type='events-list'>
        {eventsToRender.map(event => (
          <List.Item key={event.date}>
            <EventLink {...event} />
          </List.Item>
        ))}
      </List>
      {hasMoreItems && (
        <ArrowButton
          className={styles.button}
          direction='down'
          aria-label='Show more events'
          onClick={handleLoadMoreClick}
        />
      )}
    </section>
  )
}
