'use client'

import Image from 'next/image'
import { MerchList } from '../MerchList/MerchList'
import { MerchCard } from '../MerchCard/MerchCard'
import { Modal } from '@/components/ui/Modal/Modal'
import { useFullscreenImageView } from './hooks/useFullscreenImageView'
import styles from './Merch.module.css'

import data from './data.json'

export const Merch = () => {
  const {
    isModalOpen,
    closeModal,
    closeByBackdropClick,
    currentItem,
    handleImageClick,
  } = useFullscreenImageView(data)

  return (
    <>
      <section id='merch' className={styles.root}>
        <h2 className='visuallyHidden'>Merch</h2>
        <MerchList>
          {data.items.map(item => (
            <MerchList.Item key={item.id}>
              <MerchCard
                id={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                purchaseUrl={item.purchaseInfo.purchaseUrl}
                image={item.image}
                onImageClick={handleImageClick}
              />
            </MerchList.Item>
          ))}
        </MerchList>
      </section>
      {currentItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onBackdropClick={closeByBackdropClick}
        >
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={currentItem.image}
              alt={currentItem.title}
              width={500}
              height={500}
            />
          </div>
        </Modal>
      )}
    </>
  )
}
