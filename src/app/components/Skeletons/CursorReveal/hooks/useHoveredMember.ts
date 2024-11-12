import { useCallback, useState } from 'react'
import { Members } from '@/helpers/constants'
import { IMember } from '@/helpers/types'

export const useHoveredMember = () => {
  const [hoveredMember, setHoveredMember] = useState<IMember | null>(null)

  const handleMemberMouseEnter = useCallback((id: string) => {
    const member = Members.find(member => id === member.id)

    if (member) setHoveredMember(member)
  }, [])

  const handleMemberMouseLeave = useCallback(() => setHoveredMember(null), [])

  return { hoveredMember, handleMemberMouseEnter, handleMemberMouseLeave }
}
