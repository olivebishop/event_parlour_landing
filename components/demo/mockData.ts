// Shared mock data for demo components

export const mockEvents = [
  {
    id: 1,
    title: "Nairobi Tech Summit 2025",
    date: "Mar 15, 2025",
    location: "Nairobi, Kenya",
    attendees: 450,
    status: "active",
    revenue: "KES 2.4M",
    description: "A comprehensive tech conference featuring industry leaders",
    category: "Technology",
    ticketsSold: 450,
    ticketsAvailable: 50,
  },
  {
    id: 2,
    title: "Music Festival Weekend",
    date: "Apr 20, 2025",
    location: "Mombasa, Kenya",
    attendees: 1200,
    status: "active",
    revenue: "KES 5.8M",
    description: "Three days of music, food, and fun",
    category: "Music",
    ticketsSold: 1200,
    ticketsAvailable: 0,
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    date: "Feb 28, 2025",
    location: "Nairobi, Kenya",
    attendees: 180,
    status: "draft",
    revenue: "KES 0",
    description: "Showcase your startup to investors",
    category: "Business",
    ticketsSold: 0,
    ticketsAvailable: 200,
  },
]

export const mockAttendeeEvents = [
  {
    id: 1,
    title: "Nairobi Tech Summit 2025",
    date: "Mar 15, 2025",
    tickets: 2,
    status: "confirmed",
    location: "Nairobi, Kenya",
    price: "KES 5,000",
  },
  {
    id: 2,
    title: "Music Festival Weekend",
    date: "Apr 20, 2025",
    tickets: 1,
    status: "confirmed",
    location: "Mombasa, Kenya",
    price: "KES 3,500",
  },
]

export const mockSpeakers = [
  {
    id: 1,
    name: "Dr. Sarah Kimani",
    title: "CTO at TechCorp",
    expertise: "AI & Machine Learning",
    status: "confirmed",
    events: 3,
  },
  {
    id: 2,
    name: "James Ochieng",
    title: "Founder, StartupHub",
    expertise: "Entrepreneurship",
    status: "pending",
    events: 1,
  },
  {
    id: 3,
    name: "Mary Wanjiku",
    title: "Product Manager, InnovateCo",
    expertise: "Product Strategy",
    status: "confirmed",
    events: 2,
  },
]

export const mockTickets = [
  {
    id: 1,
    event: "Nairobi Tech Summit 2025",
    type: "VIP",
    quantity: 2,
    price: "KES 10,000",
    status: "active",
    qrCode: "QR123456",
  },
  {
    id: 2,
    event: "Music Festival Weekend",
    type: "General",
    quantity: 1,
    price: "KES 3,500",
    status: "active",
    qrCode: "QR789012",
  },
]

export const mockChannels = [
  {
    id: "1",
    name: "Tech Nairobi Community",
    bio: "A vibrant community for tech enthusiasts in Nairobi. Join us for networking events, workshops, and tech talks.",
    imageUrl: null,
    website: null,
    socialLinks: {
      twitter: "https://twitter.com/technairobi",
      linkedin: "https://linkedin.com/company/technairobi",
    },
    isVerified: true,
    memberCount: 1250,
    workspaceName: "Tech Nairobi",
    workspaceImageUrl: null,
  },
  {
    id: "2",
    name: "Music Events Hub",
    bio: "Your go-to channel for all music events in Kenya. Get updates on concerts, festivals, and live performances.",
    imageUrl: null,
    website: null,
    socialLinks: {
      instagram: "https://instagram.com/musiceventshub",
    },
    isVerified: false,
    memberCount: 890,
    workspaceName: "Music Events",
    workspaceImageUrl: null,
  },
  {
    id: "3",
    name: "Startup Founders Circle",
    bio: "Connect with fellow entrepreneurs and startup founders. Share experiences, get advice, and grow together.",
    imageUrl: null,
    website: null,
    socialLinks: {
      linkedin: "https://linkedin.com/company/startupfounders",
      github: "https://github.com/startupfounders",
    },
    isVerified: true,
    memberCount: 450,
    workspaceName: "Startup Circle",
    workspaceImageUrl: null,
  },
]

export const mockAnalytics = {
  revenue: {
    total: "KES 8.2M",
    growth: "+24%",
    period: "This month",
  },
  attendees: {
    total: 1830,
    growth: "+15%",
    period: "This quarter",
  },
  events: {
    total: 12,
    active: 3,
    period: "This month",
  },
  tickets: {
    sold: 2450,
    available: 500,
    period: "This quarter",
  },
}

export const mockKYCData = {
  status: "pending",
  submittedDate: "Jan 15, 2025",
  documents: [
    { name: "Business License", status: "approved" },
    { name: "ID Document", status: "pending" },
    { name: "Bank Statement", status: "approved" },
  ],
}

export const mockRecentActivity = [
  {
    id: "1",
    userName: "John Doe",
    eventTitle: "Nairobi Tech Summit 2025",
    eventId: "1",
    type: "ticket_purchase",
    quantity: 2,
    price: 10000,
    createdAt: new Date("2025-02-10T10:00:00Z"),
  },
  {
    id: "2",
    userName: "Jane Smith",
    eventTitle: "Music Festival Weekend",
    eventId: "2",
    type: "ticket_purchase",
    quantity: 1,
    price: 3500,
    createdAt: new Date("2025-02-09T14:30:00Z"),
  },
  {
    id: "3",
    userName: "Mike Johnson",
    eventTitle: "Nairobi Tech Summit 2025",
    eventId: "1",
    type: "free_registration",
    quantity: 1,
    price: 0,
    createdAt: new Date("2025-02-08T09:15:00Z"),
  },
  {
    id: "4",
    userName: "Sarah Williams",
    eventTitle: "Music Festival Weekend",
    eventId: "2",
    type: "ticket_purchase",
    quantity: 3,
    price: 10500,
    createdAt: new Date("2025-02-07T16:45:00Z"),
  },
  {
    id: "5",
    userName: "David Brown",
    eventTitle: "Nairobi Tech Summit 2025",
    eventId: "1",
    type: "ticket_purchase",
    quantity: 1,
    price: 5000,
    createdAt: new Date("2025-02-06T11:20:00Z"),
  },
]

export const mockUpcomingEvents = [
  {
    id: "1",
    title: "Nairobi Tech Summit 2025",
    startDate: new Date("2025-03-15T09:00:00Z"),
    eventType: "physical",
    venue: "KICC",
    city: "Nairobi",
    status: "active",
  },
  {
    id: "2",
    title: "Music Festival Weekend",
    startDate: new Date("2025-04-20T14:00:00Z"),
    eventType: "physical",
    venue: "Nyali Beach",
    city: "Mombasa",
    status: "active",
  },
]
