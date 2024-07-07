'use client'

import Image from 'next/image'
import { List } from '@/components/ui/List/List'
import { EventLink } from '@/components/ui/EventLink/EventLink'
import { IconButton } from '@/components/ui/IconButton/IconButton'
import { useEvents } from './hooks/useEvents'
import styles from './Events.module.css'
import stylesEventListItem from '@/components/ui/List/type/events.module.css'

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
      <List type='events-list'>
        {eventsToRender.map(event => (
          <List.Item key={event.date} className={stylesEventListItem.item}>
            <EventLink
              url={event.url}
              date={event.date}
              city={event.city}
              venue={event.venue}
            />
          </List.Item>
        ))}
      </List>
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
