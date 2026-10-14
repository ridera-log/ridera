export interface Quote {
  id: string
  customerName: string
  serviceType: string
  origin: string
  destination: string
  amount: number
  status: 'Pending' | 'Approved' | 'Rejected'
  createdAt: string
  notes: string
}

export const quotes: Quote[] = [
  {
    id: 'QT-2104',
    customerName: 'Ava Johnson',
    serviceType: 'Airport Transfer',
    origin: 'Downtown Austin',
    destination: 'AUS Airport',
    amount: 95,
    status: 'Approved',
    createdAt: '2026-03-18',
    notes: 'Premium SUV requested. Customer prefers pickup 15 minutes early.',
  },
  {
    id: 'QT-2105',
    customerName: 'Noah Smith',
    serviceType: 'Corporate Ride',
    origin: 'Tech Ridge Offices',
    destination: 'Convention Center',
    amount: 82,
    status: 'Pending',
    createdAt: '2026-03-19',
    notes: 'Recurring weekly route. Awaiting finance approval.',
  },
  {
    id: 'QT-2106',
    customerName: 'Mia Brown',
    serviceType: 'Event Shuttle',
    origin: 'Westlake Hills',
    destination: 'Zilker Park',
    amount: 140,
    status: 'Rejected',
    createdAt: '2026-03-17',
    notes: 'Requested outside standard service radius.',
  },
  {
    id: 'QT-2107',
    customerName: 'Liam Davis',
    serviceType: 'Wedding Transport',
    origin: 'The Driskill Hotel',
    destination: 'Barton Creek Resort',
    amount: 210,
    status: 'Approved',
    createdAt: '2026-03-16',
    notes: 'Includes two stops for photography between venues.',
  },
]
