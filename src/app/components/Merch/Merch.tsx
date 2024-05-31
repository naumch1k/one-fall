'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MerchList } from '../MerchList/MerchList'
import { MerchCard } from '../MerchCard/MerchCard'
import { Modal } from '@/components/ui/Modal/Modal'
import { useModal } from '@/components/ui/Modal/hooks/useModal'
import { IMerchItem } from '@/helpers/types'
import styles from './Merch.module.css'

import data from './data.json'

export const Merch = () => {
  const {    
    isModalOpen,
    openModal,
    closeModal,
    closeByBackdropClick,
  } = useModal()

  const [previewedItem, setPreviewedItem] = useState<IMerchItem | undefined>(undefined)

  const handleImageClick = (id: string) => {
    const previewedItem = data.items.find(item => item.id === id)

    if (previewedItem) {
      setPreviewedItem(previewedItem)
      openModal()
    }
  }

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
      {previewedItem &&
        <Modal 
          isOpen={isModalOpen}
          onClose={closeModal}
          onBackdropClick={closeByBackdropClick}
        >
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={previewedItem.image}
              alt={previewedItem.title}
              width={500}
              height={500}
            />
          </div>
        </Modal>
      } 
    </>
  )
}