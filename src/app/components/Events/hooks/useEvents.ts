import { useEffect, useState, useRef } from 'react'
import { useWindowSize } from '@/helpers/hooks/useWindowSize'
import { IEvent } from '@/helpers/types'

interface IEventListRenderSettings {
  total: number
  add: number
}

const renderSettings = {
  tablet: { total: 4, add: 4 },
  desktop: { total: 7, add: 5 },
}

export const useEvents = (data: { items: IEvent[] }) => {
  const windowSize = useWindowSize()
  const renderSettingsRef = useRef<IEventListRenderSettings>(renderSettings.tablet).current
  const [sortedData, setSortedData] = useState<IEvent[]>([])
  const [eventsToRender, setEventsToRender] = useState<IEvent[]>([])
  const [numberOfEventsToRender, setNumberOfEventsToRender] = useState(renderSettings.tablet.total)
  const [hasMoreItems, setHasMoreItems] = useState(false)

  useEffect(() => {
    const sortEvents = (a: IEvent, b: IEvent) => {
      const todaysDate = new Date()
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)

      // Check if events are upcoming or past
      const isAUpcoming = aDate >= todaysDate
      const isBUpcoming = bDate >= todaysDate
  
      // If one event is upcoming and the other is not, prioritize the upcoming event
      if (isAUpcoming !== isBUpcoming) {
        return isAUpcoming ? -1 : 1
      }

      // If both events are past, sort by date reversed
      if (!isAUpcoming && !isBUpcoming) {
        return bDate.getTime() - aDate.getTime()
      }

      // If both events are upcoming, sort by date
      return aDate.getTime() - bDate.getTime()
    }

    const sortedEventsData = [...data.items].sort(sortEvents)
    setSortedData(sortedEventsData)
  }, [data])

  useEffect(() => {
    if (windowSize.width >= 1280) {
      renderSettingsRef.total = renderSettings.desktop.total
      renderSettingsRef.add = renderSettings.desktop.add
    } else {
      renderSettingsRef.total = renderSettings.tablet.total
      renderSettingsRef.add = renderSettings.tablet.add
    }
  }, [windowSize.width, renderSettingsRef])

  useEffect(() => {
    if (sortedData.length <= renderSettingsRef.total) {
      setNumberOfEventsToRender(sortedData.length)
      setHasMoreItems(false)
    } else {
      setNumberOfEventsToRender(renderSettingsRef.total)
      setHasMoreItems(true)
    }
  }, [sortedData, renderSettingsRef])

  useEffect(() => {
    const newEventsToRender = sortedData.slice(0, numberOfEventsToRender)
    setEventsToRender(newEventsToRender)
  }, [sortedData, numberOfEventsToRender])

  const handleLoadMoreClick = () => {
    const totalNumberOfEvents = sortedData.length
    let newNumberOfEventsToRender = numberOfEventsToRender + renderSettingsRef.add

    if (newNumberOfEventsToRender >= totalNumberOfEvents) {
      newNumberOfEventsToRender = totalNumberOfEvents
      setHasMoreItems(false)
    }
      
    setNumberOfEventsToRender(newNumberOfEventsToRender)
  }
  
  return { 
    eventsToRender,
    handleLoadMoreClick,
    hasMoreItems,
  }
}
