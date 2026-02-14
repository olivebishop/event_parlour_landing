"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Ticket, QrCode, Mail, X, Loader2, Info, Search, BarChart3, CheckCircle2, Clock } from "lucide-react"
import { format } from "date-fns"

const mockPurchasedTickets = [
  {
    id: "TKT-123456",
    eventTitle: "Nairobi Tech Summit 2025",
    eventVenue: "KICC",
    eventCity: "Nairobi",
    eventCountry: "Kenya",
    status: "active",
    price: "10000",
    ticketCurrency: "KES",
    quantity: 2,
    used: false,
    usedAt: null,
    createdAt: new Date("2025-01-15"),
    isValid: true,
    isTransferred: false,
    buyerEmail: "john@example.com",
  },
]

const mockWorkspaceTickets = [
  {
    id: "LSR5JE",
    eventTitle: "Nairobi Tech Summit 2025",
    buyerEmail: "john@example.com",
    status: "active",
    used: false,
    usedAt: null,
    createdAt: new Date("2025-01-15"),
    scanId: null,
  },
  {
    id: "ABC123",
    eventTitle: "Music Festival Weekend",
    buyerEmail: "jane@example.com",
    status: "active",
    used: true,
    usedAt: new Date("2025-02-10"),
    createdAt: new Date("2025-01-20"),
    scanId: "SCAN001",
  },
  {
    id: "XYZ789",
    eventTitle: "Nairobi Tech Summit 2025",
    buyerEmail: "mike@example.com",
    status: "active",
    used: false,
    usedAt: null,
    createdAt: new Date("2025-01-18"),
    scanId: null,
  },
]

export default function TicketsDemo() {
  const [selectedTab, setSelectedTab] = useState<"purchased" | "transfer" | "scan">("scan")
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)
  const [scanInput, setScanInput] = useState("")
  const [isScanning, setIsScanning] = useState(false)

  const handleTransfer = (ticketId: string) => {
    if (!recipientEmail.trim()) return
    setIsTransferring(true)
    setTimeout(() => {
      setIsTransferring(false)
      setSelectedTicket(null)
      setRecipientEmail("")
    }, 1500)
  }

  const handleQuickScan = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const ticketId = scanInput.trim().toUpperCase()
    if (!ticketId) return

    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setScanInput("")
    }, 1000)
  }

  const scannedCount = mockWorkspaceTickets.filter((t) => t.used || t.scanId).length
  const unscannedCount = mockWorkspaceTickets.filter((t) => !t.used && !t.scanId).length

  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">Tickets</h3>
              <p className="text-sm text-muted-foreground">View all tickets sold for your events</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setSelectedTab("scan")}
              className={selectedTab === "scan" ? "border-b-2 border-primary pb-2 px-4 text-sm font-medium" : "pb-2 px-4 text-sm text-muted-foreground hover:text-foreground"}
            >
              Scan Tickets for Entry
            </button>
            <button
              onClick={() => setSelectedTab("purchased")}
              className={selectedTab === "purchased" ? "border-b-2 border-primary pb-2 px-4 text-sm font-medium" : "pb-2 px-4 text-sm text-muted-foreground hover:text-foreground"}
            >
              My Purchased Tickets
            </button>
            <button
              onClick={() => setSelectedTab("transfer")}
              className={selectedTab === "transfer" ? "border-b-2 border-primary pb-2 px-4 text-sm font-medium" : "pb-2 px-4 text-sm text-muted-foreground hover:text-foreground"}
            >
              Transfer My Tickets
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {selectedTab === "scan" ? (
            <div className="space-y-6 overflow-y-auto h-full">
              {/* Quick Scan Interface */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle>Quick Scan</CardTitle>
                  <CardDescription>
                    Enter ticket ID or scan QR code. Press Enter to scan instantly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleQuickScan} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="quickScan" className="sr-only">
                        Quick Scan Ticket ID
                      </Label>
                      <Input
                        id="quickScan"
                        value={scanInput}
                        onChange={(e) => setScanInput(e.target.value.toUpperCase())}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleQuickScan(e)
                          }
                        }}
                        placeholder="Enter ticket ID (e.g., LSR5JE) or scan QR code"
                        disabled={isScanning}
                        className="font-mono text-lg h-12"
                        autoFocus
                        autoComplete="off"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="submit"
                        disabled={isScanning || !scanInput.trim()}
                        className="w-full sm:w-auto h-12"
                        size="lg"
                      >
                        <QrCode className="mr-2 h-5 w-5" />
                        {isScanning ? "Scanning..." : "Scan Now"}
                      </Button>
                    </div>
                  </form>

                  {/* Scan Stats */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-lg border p-4 relative">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Total Tickets</p>
                        <BarChart3 className="h-4 w-4 text-muted-foreground opacity-50" />
                      </div>
                      <p className="text-2xl font-bold">{mockWorkspaceTickets.length}</p>
                    </div>
                    <div className="rounded-lg border p-4 relative">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Scanned</p>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground opacity-50" />
                      </div>
                      <p className="text-2xl font-bold">{scannedCount}</p>
                    </div>
                    <div className="rounded-lg border p-4 relative">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Unscanned</p>
                        <Clock className="h-4 w-4 text-muted-foreground opacity-50" />
                      </div>
                      <p className="text-2xl font-bold">{unscannedCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tickets Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Tickets Sold</CardTitle>
                  <CardDescription>
                    All tickets sold for your events ({mockWorkspaceTickets.length} total)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by ticket ID, buyer email, event..."
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {mockWorkspaceTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
                      >
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium break-words">{ticket.eventTitle}</p>
                            <Badge
                              variant={ticket.used ? "default" : "secondary"}
                              className="text-xs flex-shrink-0"
                            >
                              {ticket.used ? "Scanned" : "Unscanned"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground break-words">
                            {ticket.buyerEmail} • {format(new Date(ticket.createdAt), "PPp")}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono break-all">
                            Ticket ID: {ticket.id}
                          </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2 flex-shrink-0">
                          {ticket.used && ticket.usedAt && (
                            <p className="text-xs text-muted-foreground">
                              Scanned: {format(new Date(ticket.usedAt), "PPp")}
                            </p>
                          )}
                          {!ticket.used && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setScanInput(ticket.id)
                                handleQuickScan()
                              }}
                              disabled={isScanning}
                              className="w-full sm:w-auto"
                            >
                              <QrCode className="mr-2 h-4 w-4" />
                              Scan
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : selectedTab === "transfer" ? (
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Transfer My Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 overflow-y-auto h-full">
                {mockPurchasedTickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{ticket.eventTitle}</h4>
                        <p className="text-sm text-muted-foreground">
                          {ticket.eventVenue}, {ticket.eventCity}
                        </p>
                      </div>
                      <Badge variant={ticket.isValid ? "default" : "destructive"}>
                        {ticket.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Recipient email"
                        className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-sm"
                        value={selectedTicket === ticket.id ? recipientEmail : ""}
                        onChange={(e) => {
                          setSelectedTicket(ticket.id)
                          setRecipientEmail(e.target.value)
                        }}
                      />
                      <Button
                        size="sm"
                        className="gap-2"
                        onClick={() => handleTransfer(ticket.id)}
                        disabled={!recipientEmail.trim() || isTransferring}
                      >
                        {isTransferring && selectedTicket === ticket.id ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Transferring...
                          </>
                        ) : (
                          <>
                            <Mail className="h-4 w-4" />
                            Transfer
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3 overflow-y-auto h-full pr-2">
              <Card>
                <CardHeader>
                  <CardTitle>My Purchased Tickets</CardTitle>
                  <CardDescription>
                    View and manage your event tickets ({mockPurchasedTickets.length} total)
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {mockPurchasedTickets.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No tickets purchased yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4 p-4 sm:p-6">
                      {mockPurchasedTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
                        >
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium">{ticket.eventTitle}</p>
                              <Badge
                                variant={ticket.isValid ? "default" : "destructive"}
                                className="text-xs"
                              >
                                {ticket.status}
                              </Badge>
                              {ticket.used && (
                                <Badge variant="secondary" className="text-xs">
                                  Used
                                </Badge>
                              )}
                              {ticket.isTransferred && (
                                <Badge variant="outline" className="text-xs">
                                  Transferred
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {ticket.eventVenue && `${ticket.eventVenue}, `}
                              {ticket.eventCity}
                              {ticket.eventCountry && `, ${ticket.eventCountry}`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Purchased: {format(ticket.createdAt, "PPp")}
                              {ticket.usedAt && (
                                <> • Used: {format(ticket.usedAt, "PPp")}</>
                              )}
                            </p>
                          </div>
                          <div className="flex flex-col sm:items-end gap-2">
                            <div className="text-right space-y-1">
                              <p className="font-semibold">
                                {ticket.ticketCurrency}{" "}
                                {Number.parseFloat(ticket.price).toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Quantity: {ticket.quantity}
                              </p>
                              <p className="text-xs font-mono text-muted-foreground">
                                ID: {ticket.id}
                              </p>
                            </div>
                            {ticket.isTransferred ? (
                              <Button variant="outline" size="sm" disabled>
                                <Mail className="mr-2 h-4 w-4" />
                                Transfer
                              </Button>
                            ) : (
                              ticket.isValid && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedTicket(ticket.id)}
                                >
                                  <Mail className="mr-2 h-4 w-4" />
                                  Transfer
                                </Button>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Transfer Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex">
            <button
              type="button"
              className="flex-1 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setSelectedTicket(null)
                setRecipientEmail("")
              }}
            />
            <div className="relative flex items-stretch justify-end w-full h-full p-2 md:p-2 lg:p-3 pointer-events-none">
              <div className="w-full max-w-md bg-card border border-border rounded-t-lg md:rounded-lg pointer-events-auto flex flex-col overflow-hidden">
                <div className="px-6 py-5 border-b border-border flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Transfer Ticket</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Share your ticket with someone special
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTicket(null)
                        setRecipientEmail("")
                      }}
                      className="p-2 hover:bg-accent transition-colors text-muted-foreground hover:text-card-foreground rounded-md"
                      disabled={isTransferring}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="space-y-6">
                    <div className="p-4 bg-accent/50 border border-border rounded-lg">
                      <p className="text-sm leading-relaxed">
                        <strong className="font-semibold">Having an emergency?</strong>{" "}
                        Transfer your ticket to a loved one and ensure they don't miss out on this amazing experience.
                        Your ticket will be safely transferred, and they'll receive an email confirmation with all the
                        details they need to attend.
                      </p>
                    </div>

                    <div className="space-y-2 p-4 bg-muted/50 border border-border rounded-lg">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Event Details
                      </p>
                      <p className="font-semibold">
                        {mockPurchasedTickets.find((t) => t.id === selectedTicket)?.eventTitle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {mockPurchasedTickets.find((t) => t.id === selectedTicket)?.eventVenue},{" "}
                        {mockPurchasedTickets.find((t) => t.id === selectedTicket)?.eventCity}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="recipient-email" className="block text-sm font-medium">
                        Recipient Email Address
                      </label>
                      <input
                        id="recipient-email"
                        type="email"
                        placeholder="lovedone@example.com"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        disabled={isTransferring}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        The recipient must have an EventPalour account. They'll receive an email confirmation once the
                        transfer is complete.
                      </p>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-muted/50 border border-border rounded-lg">
                      <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Important Notice</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Once transferred, this ticket will no longer be valid for you. The recipient will become the
                          new ticket owner and can use it to attend the event.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 px-6 py-5 border-t border-border bg-card">
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedTicket(null)
                        setRecipientEmail("")
                      }}
                      disabled={isTransferring}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleTransfer(selectedTicket)}
                      disabled={isTransferring || !recipientEmail.trim()}
                      className="flex-1"
                    >
                      {isTransferring ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Transferring...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Transfer Ticket
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
