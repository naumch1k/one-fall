import { ListProvider, ListType } from './List.context'
import { ListItem } from './Item/ListItem'
import { styles } from './List.styles'

interface IListProps {
  type: ListType
  className?: string
  children: React.ReactNode
}

const Component = (props: IListProps): JSX.Element => {
  const { type, className, children } = props
  const classes = `${styles[type].root} ${className || ''}`

  return (
    <ul className={classes}>
      <ListProvider value={{ type }}>{children}</ListProvider>
    </ul>
  )
}

export const List = Object.assign(Component, {
  Item: ListItem,
})
