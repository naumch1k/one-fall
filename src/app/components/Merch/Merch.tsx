'use client'

import Image from 'next/image'
import { List } from '@/components/ui/List/List'
import { Carousel } from '@/components/ui/Carousel/Carousel'
import { MerchCard } from '../MerchCard/MerchCard'
import { Modal } from '@/components/ui/Modal/Modal'
import { useMediaQuery } from '@/helpers/hooks/useMediaQuery'
import { useFullscreenImageView } from '@/helpers/hooks/useFullscreenImageView'
import { IMerchItem } from '@/helpers/types'
import styles from './Merch.module.css'

import data from './data.json'

export const Merch = () => {
  const { items } = data
  const isDesktop = useMediaQuery(`(min-width: 1272px)`)
  const {
    isModalOpen,
    closeModal,
    closeByBackdropClick,
    currentItemIndex,
    handleImageClick,
  } = useFullscreenImageView<IMerchItem>(items)

  return (
    <>
      <section id='merch' className={styles.root}>
      <h2>
        <span className='scrollTracker' data-toc-idx='3'></span>
        <span className='visuallyHidden'>Merch</span>
      </h2>
        {isDesktop ? (
          <List type='merch-list'>
            {items.map(item => (
              <List.Item key={item.id}>
                <MerchCard {...item} onImageClick={handleImageClick} />
              </List.Item>
            ))}
          </List>
        ) : (
          <Carousel
            border='topBottom'
            items={items}
            SlideComponent={item => (
              <MerchCard {...item} onImageClick={handleImageClick} />
            )}
          />
        )}
      </section>
      {currentItemIndex !== undefined && (
        <Modal
          variant='dialog'
          isOpen={isModalOpen}
          onClose={closeModal}
          onBackdropClick={closeByBackdropClick}
        >
          <Image
            className={styles.modalImage}
            src={items[currentItemIndex].imageUrl}
            alt={items[currentItemIndex].title}
            width={500}
            height={500}
          />
        </Modal>
      )}
    </>
  )
}
