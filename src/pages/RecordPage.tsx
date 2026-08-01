import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Pagination } from '../components/ui/Pagination'
import { RecordsTable } from '../components/record/RecordsTable'
import type { RecordItem } from '../types/RecordItem'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getDiscoveredContacts } from '../features/contacts/contact.slice'

const PAGE_SIZE = 3

// const INITIAL_RECORDS: RecordItem[] = [
//   {
//     id: '1',
//     name: 'Ariyah Patel',
//     email: 'ariyah@northpeak.io',
//     bio: 'Lifecycle marketer focused on B2B SaaS adoption and retention.',
//     sourceUrl: 'https://medium.com/@ariyahpatel',
//     sourceUrlLabel: 'https://medium.com/@...',
//     domain: 'northpeak.io',
//     keyword: 'trial onboarding',
//     discoveredAt: '2026-07-09 10:14',
//     avatarUrl: 'https://i.pravatar.cc/64?img=47',
//   },
//   {
//     id: '2',
//     name: 'Miguel Santos',
//     email: 'miguel@lighthouse.agency',
//     bio: 'Content strategist helping agencies turn research into repeatable growth systems.',
//     sourceUrl: 'https://twitter.com/mgs',
//     sourceUrlLabel: 'https://twitter.com/mgs',
//     domain: 'lighthouse.agency',
//     keyword: 'content clusters',
//     discoveredAt: '2026-07-10 08:22',
//     avatarUrl: 'https://i.pravatar.cc/64?img=12',
//   },
//   {
//     id: '3',
//     name: 'Kamila Zhou',
//     email: 'kamila@stackscribe.dev',
//     bio: 'Writes about developer experience, SDK design, and product-led growth.',
//     sourceUrl: 'https://stackscribe.dev/posts/sdk-ux',
//     sourceUrlLabel: 'https://stackscribe.dev/posts/sdk-ux',
//     domain: 'stackscribe.dev',
//     keyword: 'sdk ux',
//     discoveredAt: '2026-07-11 16:05',
//     avatarUrl: 'https://i.pravatar.cc/64?img=32',
//   },
//   {
//     id: '4',
//     name: 'Jordan Lee',
//     email: 'jordan@signalpath.co',
//     bio: 'Demand gen lead focused on pipeline quality and paid social experiments.',
//     sourceUrl: 'https://linkedin.com/in/jordanlee',
//     sourceUrlLabel: 'https://linkedin.com/in/...',
//     domain: 'signalpath.co',
//     keyword: 'paid social',
//     discoveredAt: '2026-07-12 09:41',
//     avatarUrl: 'https://i.pravatar.cc/64?img=15',
//   },
//   {
//     id: '5',
//     name: 'Sofia Martins',
//     email: 'sofia@orbitmail.io',
//     bio: 'Email deliverability specialist helping teams improve inbox placement.',
//     sourceUrl: 'https://orbitmail.io/blog/dmarc',
//     sourceUrlLabel: 'https://orbitmail.io/blog/...',
//     domain: 'orbitmail.io',
//     keyword: 'deliverability',
//     discoveredAt: '2026-07-13 14:18',
//     avatarUrl: 'https://i.pravatar.cc/64?img=25',
//   },
//   {
//     id: '6',
//     name: 'Noah Kim',
//     email: 'noah@craftops.ai',
//     bio: 'Product marketer exploring AI tooling for GTM and customer research.',
//     sourceUrl: 'https://craftops.ai/insights/gtm',
//     sourceUrlLabel: 'https://craftops.ai/insights/...',
//     domain: 'craftops.ai',
//     keyword: 'gtm ai',
//     discoveredAt: '2026-07-14 11:03',
//     avatarUrl: 'https://i.pravatar.cc/64?img=33',
//   },
//   {
//     id: '7',
//     name: 'Elena Rossi',
//     email: 'elena@brightfunnel.com',
//     bio: 'RevOps analyst building dashboards for attribution and campaign ROI.',
//     sourceUrl: 'https://brightfunnel.com/guides/roi',
//     sourceUrlLabel: 'https://brightfunnel.com/...',
//     domain: 'brightfunnel.com',
//     keyword: 'attribution',
//     discoveredAt: '2026-07-15 17:27',
//     avatarUrl: 'https://i.pravatar.cc/64?img=45',
//   },
//   {
//     id: '8',
//     name: 'Chris Okonkwo',
//     email: 'chris@northwindhq.com',
//     bio: 'Growth engineer experimenting with enrichment and outbound workflows.',
//     sourceUrl: 'https://northwindhq.com/blog/enrichment',
//     sourceUrlLabel: 'https://northwindhq.com/blog/...',
//     domain: 'northwindhq.com',
//     keyword: 'data enrichment',
//     discoveredAt: '2026-07-16 07:55',
//     avatarUrl: 'https://i.pravatar.cc/64?img=68',
//   },
//   {
//     id: '9',
//     name: 'Priya Desai',
//     email: 'priya@loopstack.io',
//     bio: 'Customer success lead focused on onboarding checklists and expansion plays.',
//     sourceUrl: 'https://loopstack.io/playbooks/onboarding',
//     sourceUrlLabel: 'https://loopstack.io/playbooks/...',
//     domain: 'loopstack.io',
//     keyword: 'onboarding',
//     discoveredAt: '2026-07-17 13:09',
//     avatarUrl: 'https://i.pravatar.cc/64?img=49',
//   },
// ]

interface RecordsPageProps {
  onLogout?: () => void
}

export function RecordsPage({ onLogout }: RecordsPageProps) {
  const dispatch = useAppDispatch();
  const { contacts, loading, error } = useAppSelector((state) => state.contacts);

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

        <RecordsTable records={pageRecords} />

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Card>
    </>
  )
}
