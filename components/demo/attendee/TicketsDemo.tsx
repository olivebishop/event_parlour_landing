"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ticket, Mail, X, Loader2, Info } from "lucide-react"
import { format } from "date-fns"

const mockTickets = [
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
  },
  {
    id: "TKT-789012",
    eventTitle: "Music Festival Weekend",
    eventVenue: "Carnivore Grounds",
    eventCity: "Nairobi",
    eventCountry: "Kenya",
    status: "active",
    price: "3500",
    ticketCurrency: "KES",
    quantity: 1,
    used: false,
    usedAt: null,
    createdAt: new Date("2025-01-20"),
    isValid: true,
    isTransferred: false,
  },
]

export default function TicketsDemo() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)

  const handleTransfer = (ticketId: string) => {
    if (!recipientEmail.trim()) return
    setIsTransferring(true)
    setTimeout(() => {
      setIsTransferring(false)
      setSelectedTicket(null)
      setRecipientEmail("")
    }, 1500)
  }

  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <h3 className="text-2xl font-bold text-foreground mb-1">My Tickets</h3>
          <p className="text-sm text-muted-foreground">
            View and manage your event tickets ({mockTickets.length} total)
          </p>
        </div>

        {/* Tickets List */}
        <div className="flex-1 overflow-y-auto pr-2">
          <Card>
            <CardContent className="p-0">
              {mockTickets.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tickets purchased yet</p>
                </div>
              ) : (
                <div className="space-y-4 p-4 sm:p-6">
                  {mockTickets.map((ticket) => (
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
                        {mockTickets.find((t) => t.id === selectedTicket)?.eventTitle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {mockTickets.find((t) => t.id === selectedTicket)?.eventVenue},{" "}
                        {mockTickets.find((t) => t.id === selectedTicket)?.eventCity}
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
