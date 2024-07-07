'use client'

import Image from 'next/image'
import { List } from '@/components/ui/List/List'
import { MerchCard } from '../MerchCard/MerchCard'
import { Modal } from '@/components/ui/Modal/Modal'
import { useFullscreenImageView } from '@/helpers/hooks/useFullscreenImageView'
import { IMerchItem } from '@/helpers/types'
import styles from './Merch.module.css'

import data from './data.json'

export const Merch = () => {
  const {
    isModalOpen,
    closeModal,
    closeByBackdropClick,
    currentItem,
    handleImageClick,
  } = useFullscreenImageView<IMerchItem>(data)

  return (
    <>
      <section id='merch' className={styles.root}>
        <h2 className='visuallyHidden'>Merch</h2>
        <List type='merch-list'>
          {data.items.map(item => (
            <List.Item key={item.id}>
              <MerchCard
                id={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                purchaseUrl={item.purchaseInfo.purchaseUrl}
                image={item.imageUrl}
                onImageClick={handleImageClick}
              />
            </List.Item>
          ))}
        </List>
      </section>
      {currentItem && (
        <Modal
          variant='dialog'
          isOpen={isModalOpen}
          onClose={closeModal}
          onBackdropClick={closeByBackdropClick}
        >
          <Image
            className={styles.modalImage}
            src={currentItem.imageUrl}
            alt={currentItem.title}
            width={500}
            height={500}
          />
        </Modal>
      )}
    </>
  )
}
