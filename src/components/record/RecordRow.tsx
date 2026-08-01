import type { RecordItem } from '../../types/RecordItem'

interface RecordRowProps {
  record: RecordItem
}

export function RecordRow({ record }: RecordRowProps) {
  return (
    <tr className="border-t border-gray-100 align-top">
      <td className="py-4 pr-4">
        <div className="flex items-center gap-2.5">
          <img
            src={record.avatarUrl}
            alt=""
            className="size-8 shrink-0 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-900">
            {record.name}
          </span>
        </div>
      </td>

      <td className="px-3 py-4">
        <a
          href={`mailto:${record.email}`}
          className="text-sm text-gray-700 underline underline-offset-2 hover:text-teal-600"
        >
          {record.email}
        </a>
      </td>

      <td className="max-w-[220px] px-3 py-4 text-sm leading-5 text-gray-600">
        {record.bio}
      </td>

      <td className="px-3 py-4">
        <a
          href={record.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-teal-600 underline underline-offset-2 hover:text-teal-700"
        >
          {record.sourceUrlLabel}
        </a>
      </td>

      <td className="px-3 py-4">
        <a
          href={`https://${record.domain}`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-teal-600 underline underline-offset-2 hover:text-teal-700"
        >
          {record.domain}
        </a>
      </td>

      <td className="px-3 py-4 text-sm text-gray-800">{record.keyword}</td>

      <td className="py-4 pl-3 text-sm whitespace-nowrap text-gray-600">
        {record.discoveredAt}
      </td>
    </tr>
  )
}
