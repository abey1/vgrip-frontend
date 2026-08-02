import type { ContactResponseDto } from '../../features/contacts/contact.types'

interface RecordRowProps {
  contact: ContactResponseDto
}

function formatSourceLabel(sourceUrl: string | null) {
  if (!sourceUrl) return '—'
  return sourceUrl.length > 32 ? `${sourceUrl.slice(0, 32)}...` : sourceUrl
}

function formatDiscoveredAt(discoveredAt: Date | string) {
  const date = discoveredAt instanceof Date ? discoveredAt : new Date(discoveredAt)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString()
}

export function RecordRow({ contact }: RecordRowProps) {
  return (
    <tr className="border-t border-gray-100 align-top">
      <td className="py-4 pr-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-teal-700">
            {contact.name.slice(0, 1).toUpperCase()}
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {contact.name}
          </span>
        </div>
      </td>

      <td className="px-3 py-4">
        <a
          href={`mailto:${contact.email}`}
          className="text-sm text-gray-700 underline underline-offset-2 hover:text-teal-600"
        >
          {contact.email}
        </a>
      </td>

      <td className="max-w-[220px] px-3 py-4 text-sm leading-5 text-gray-600">
        {contact.bio ?? '—'}
      </td>

      <td className="px-3 py-4">
        {contact.sourceUrl ? (
          <a
            href={contact.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-teal-600 underline underline-offset-2 hover:text-teal-700"
          >
            {formatSourceLabel(contact.sourceUrl)}
          </a>
        ) : (
          <span className="text-sm text-gray-500">—</span>
        )}
      </td>

      <td className="px-3 py-4">
        {contact.domain ? (
          <a
            href={`https://${contact.domain}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-teal-600 underline underline-offset-2 hover:text-teal-700"
          >
            {contact.domain}
          </a>
        ) : (
          <span className="text-sm text-gray-500">—</span>
        )}
      </td>

      <td className="px-3 py-4 text-sm text-gray-800">
        {contact.keyword ?? '—'}
      </td>

      <td className="py-4 pl-3 text-sm whitespace-nowrap text-gray-600">
        {formatDiscoveredAt(contact.discoveredAt)}
      </td>
    </tr>
  )
}
