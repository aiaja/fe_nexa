import React from 'react'

interface IssuesBadgeProps {
  count: number
}

export default function IssuesBadge({ count }: IssuesBadgeProps) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
    >
      {count} issues
    </span>
  )
}
