"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, User, Users, CreditCard, RefreshCw, DollarSign, TrendingUp, FileText, AlertCircle } from "lucide-react"
import { format } from "date-fns"

const mockTransactions = [
  {
    id: "1",
    eventTitle: "Nairobi Tech Summit 2025",
    buyerEmail: "john@example.com",
    amount: "10000",
    currency: "KES",
    status: "completed",
    createdAt: new Date("2025-02-10T10:00:00Z"),
    providerReference: "REF123456",
    organizerShare: "9500",
    platformFee: "500",
    providerFee: "0",
  },
  {
    id: "2",
    eventTitle: "Music Festival Weekend",
    buyerEmail: "jane@example.com",
    amount: "3500",
    currency: "KES",
    status: "completed",
    createdAt: new Date("2025-02-09T14:30:00Z"),
    providerReference: "REF789012",
    organizerShare: "3325",
    platformFee: "175",
    providerFee: "0",
  },
  {
    id: "3",
    eventTitle: "Nairobi Tech Summit 2025",
    buyerEmail: "mike@example.com",
    amount: "5000",
    currency: "KES",
    status: "pending",
    createdAt: new Date("2025-02-08T09:15:00Z"),
    providerReference: "REF345678",
    organizerShare: "4750",
    platformFee: "250",
    providerFee: "0",
  },
]

const mockMonthlyEarnings = [
  { month: "January 2025", earnings: "245000", revenue: "250000", platformFees: "5000" },
  { month: "February 2025", earnings: "380000", revenue: "400000", platformFees: "20000" },
  { month: "March 2025", earnings: "190000", revenue: "200000", platformFees: "10000" },
]

export default function SettingsDemo() {
  const [selectedTab, setSelectedTab] = useState<"general" | "account" | "team" | "billing">("general")
  const [billingTab, setBillingTab] = useState<"overview" | "transactions" | "earnings" | "withdrawals">("overview")

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      case "refunded":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <h3 className="text-2xl font-bold text-foreground mb-1">Settings</h3>
          <p className="text-sm text-muted-foreground">Manage your workspace settings</p>
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 border-r border-border pr-4">
            <div className="space-y-1">
              {[
                { id: "general", label: "General", icon: Settings },
                { id: "account", label: "Account", icon: User },
                { id: "team", label: "Team", icon: Users },
                { id: "billing", label: "Billing", icon: CreditCard },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {selectedTab === "billing" ? (
              <div className="space-y-6">
                <Tabs value={billingTab} onValueChange={(v) => setBillingTab(v as any)} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="transactions">Transactions</TabsTrigger>
                      <TabsTrigger value="earnings">Earnings</TabsTrigger>
                      <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                    </TabsList>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </div>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            KES {Number.parseFloat("8200000").toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">All time revenue</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Your Earnings</CardTitle>
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            KES {Number.parseFloat("7790000").toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">After all fees</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            KES {Number.parseFloat("410000").toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">5% commission</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">245</div>
                          <p className="text-xs text-muted-foreground">2 pending, 0 failed</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Balance Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                          <DollarSign className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-primary">
                            KES {Number.parseFloat("5000000").toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">Ready to withdraw</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Withdrawn</CardTitle>
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            KES {Number.parseFloat("2790000").toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">No pending withdrawals</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Monthly Earnings Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Monthly Earnings (Last 12 Months)</CardTitle>
                        <CardDescription>Your earnings breakdown by month</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockMonthlyEarnings.map((month) => (
                            <div
                              key={month.month}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div className="flex-1">
                                <p className="font-medium">{month.month}</p>
                                <p className="text-sm text-muted-foreground">
                                  Revenue: KES {Number.parseFloat(month.revenue).toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">
                                  KES {Number.parseFloat(month.earnings).toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Fees: KES {Number.parseFloat(month.platformFees).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="transactions" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Transactions</CardTitle>
                        <CardDescription>
                          All payment transactions for your events ({mockTransactions.length} total)
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockTransactions.map((payment) => (
                            <div
                              key={payment.id}
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
                            >
                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="font-medium break-words">{payment.eventTitle}</p>
                                  <Badge
                                    variant={getStatusBadgeVariant(payment.status)}
                                    className="text-xs flex-shrink-0"
                                  >
                                    {payment.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground break-words">
                                  {payment.buyerEmail} • {format(new Date(payment.createdAt), "PPp")}
                                </p>
                                <p className="text-xs text-muted-foreground font-mono break-all">
                                  Ref: {payment.providerReference}
                                </p>
                              </div>
                              <div className="flex flex-col sm:items-end gap-2 flex-shrink-0">
                                <div className="text-left sm:text-right space-y-1">
                                  <p className="font-semibold whitespace-nowrap">
                                    {payment.currency} {Number.parseFloat(payment.amount).toLocaleString()}
                                  </p>
                                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                                    Earnings: {payment.currency} {Number.parseFloat(payment.organizerShare).toLocaleString()}
                                  </p>
                                </div>
                                {payment.status === "completed" && (
                                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Refund
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="earnings" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Earnings Breakdown</CardTitle>
                        <CardDescription>Detailed breakdown of your earnings</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
                            <p className="text-2xl font-bold">KES 8,200,000</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">Platform Fees (5%)</p>
                            <p className="text-2xl font-bold">KES 410,000</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">Your Earnings</p>
                            <p className="text-2xl font-bold">KES 7,790,000</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="withdrawals" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Withdrawals</CardTitle>
                        <CardDescription>Manage your withdrawal requests</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">No withdrawals yet</h3>
                          <p className="text-sm text-muted-foreground max-w-xs">
                            Withdrawal functionality will be available soon
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedTab === "general" && "General Settings"}
                    {selectedTab === "account" && "Account Settings"}
                    {selectedTab === "team" && "Team Management"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTab === "general" && (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Workspace Name</label>
                        <input
                          type="text"
                          defaultValue="My Workspace"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Timezone</label>
                        <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                          <option>Africa/Nairobi (EAT)</option>
                        </select>
                      </div>
                      <Button>Save Changes</Button>
                    </>
                  )}
                  {selectedTab === "account" && (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <input
                          type="email"
                          defaultValue="organizer@example.com"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Full Name</label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                        />
                      </div>
                      <Button>Update Account</Button>
                    </>
                  )}
                  {selectedTab === "team" && (
                    <>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">
                              JD
                            </div>
                            <div>
                              <p className="font-medium">John Doe</p>
                              <p className="text-xs text-muted-foreground">Admin</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Manage</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm">
                              JS
                            </div>
                            <div>
                              <p className="font-medium">Jane Smith</p>
                              <p className="text-xs text-muted-foreground">Moderator</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Manage</Button>
                        </div>
                      </div>
                      <Button className="w-full">Invite Team Member</Button>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
