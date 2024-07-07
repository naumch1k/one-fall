interface IListItemProps {
  children: React.ReactNode
  className?: string
}

export const ListItem = (props: IListItemProps) => {
  return <li className={props.className || ''}>{props.children}</li>
}
