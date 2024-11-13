'use client'

import { List } from '@/components/ui/List/List'
import { MerchCard } from '../MerchCard/MerchCard'
import { MerchItemPreview } from '../MerchItemPreview/MerchItemPreview'
import { Modal } from '@/components/ui/Modal/Modal'
import { useFullscreenImageView } from '@/helpers/hooks'
import { Button } from '@/components/ui/Button/Button'
import { IMerchItem } from '@/helpers/types'
import styles from './Merch.module.css'

import data from './data.json'

export const Merch = () => {
  const { items, allMerchUrl } = data
  const {
    isModalOpen,
    closeModal,
    closeByBackdropClick,
    currentItemIndex,
    handleImageClick,
  } = useFullscreenImageView<IMerchItem>(items)

  return (
    <>
      <section data-toc-idx='4' className={styles.root}>
      <h2 className='visuallyHidden'>Merch</h2>
        <List type='merch-list'>
          {items.map(item => (
            <List.Item key={item.id}>
              <MerchCard {...item} onImageClick={handleImageClick} />
            </List.Item>
          ))}
        </List>
        <Button
          className={styles.button}
          isLink
          href={allMerchUrl}
          rel='noopener noreferrer'
          target='_blank'
        >
          View more on Bandcamp
        </Button>
      </section>
      {currentItemIndex !== undefined && (
        <Modal
          variant='dialog'
          isOpen={isModalOpen}
          onClose={closeModal}
          onBackdropClick={closeByBackdropClick}
        >
          <MerchItemPreview {...items[currentItemIndex]} />
        </Modal>
      )}
    </>
  )
}
