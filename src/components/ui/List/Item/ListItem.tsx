import { useList } from '../List.context'
import { styles } from '../List.styles'

interface IListItemProps {
  children: React.ReactNode
  className?: string
}

export const ListItem = (props: IListItemProps) => {
  const { type } = useList()

  return <li className={styles[type].item}>{props.children}</li>
}
