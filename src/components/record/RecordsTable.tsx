import { RecordRow } from './RecordRow'
import type { ContactResponseDto } from '../../features/contacts/contact.types'

interface RecordsTableProps {
  contacts: ContactResponseDto[]
}

export function RecordsTable({ contacts }: RecordsTableProps) {
  if (contacts.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-gray-500">
        No records found.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] border-collapse text-left">
        <thead>
          <tr>
            <th className="pb-3 pr-4 text-xs font-medium tracking-wide text-gray-500">
              Name
            </th>
            <th className="px-3 pb-3 text-xs font-medium tracking-wide text-gray-500">
              Email
            </th>
            <th className="px-3 pb-3 text-xs font-medium tracking-wide text-gray-500">
              Bio
            </th>
            <th className="px-3 pb-3 text-xs font-medium tracking-wide text-gray-500">
              Source URL
            </th>
            <th className="px-3 pb-3 text-xs font-medium tracking-wide text-gray-500">
              Domain
            </th>
            <th className="px-3 pb-3 text-xs font-medium tracking-wide text-gray-500">
              Keyword
            </th>
            <th className="pb-3 pl-3 text-xs font-medium tracking-wide text-gray-500">
              Discovered at
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <RecordRow key={contact.id} contact={contact} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
