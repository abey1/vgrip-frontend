import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Pagination } from '../components/ui/Pagination'
import { RecordsTable } from '../components/record/RecordsTable'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getDiscoveredContacts } from '../features/contacts/contact.slice'

const PAGE_SIZE = 3

export function RecordsPage() {
  const dispatch = useAppDispatch()
  const { contacts } = useAppSelector((state) => state.contacts)

  useEffect(() => {
    dispatch(getDiscoveredContacts());
  }, [dispatch]);

  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredRecords = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return contacts

    return contacts.filter((record) =>
      [record.name, record.email, record.domain, record.keyword, record.bio]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    )
  }, [query, contacts])

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const pageRecords = filteredRecords.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  const handleSearchChange = (value: string) => {
    setQuery(value)
    setCurrentPage(1)
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Records</h1>

      <Card className="p-6">
        <div className="mb-5 max-w-sm">
          <Input
            leftIcon={<Search className="size-4" />}
            placeholder="Search by name, email, domain"
            value={query}
            onChange={(event) => handleSearchChange(event.target.value)}
            aria-label="Search records"
          />
        </div>

        <RecordsTable contacts={pageRecords} />

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Card>
    </>
  )
}
