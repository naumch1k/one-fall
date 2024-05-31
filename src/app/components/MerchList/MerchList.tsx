import { MerchListItem } from './Item/MerchListItem'
import styles from './MerchList.module.css'

const Component = ({ 
  children,
}: {
  children: React.ReactNode 
}) => (
  <ul className={styles.root}>{children}</ul>
)

export const MerchList = Object.assign(Component, {
  Item: MerchListItem,
})