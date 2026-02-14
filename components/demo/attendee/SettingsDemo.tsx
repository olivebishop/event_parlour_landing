"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, User } from "lucide-react"

export default function SettingsDemo() {
  const [selectedTab, setSelectedTab] = useState<"general" | "account">("general")

  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <h3 className="text-2xl font-bold text-foreground mb-1">Settings</h3>
          <p className="text-sm text-muted-foreground">Manage your account settings</p>
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 border-r border-border pr-4">
            <div className="space-y-1">
              {[
                { id: "general", label: "General", icon: Settings },
                { id: "account", label: "Account", icon: User },
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
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedTab === "general" && "General Settings"}
                  {selectedTab === "account" && "Account Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTab === "general" && (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Language</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                        <option>English</option>
                        <option>Swahili</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Timezone</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                        <option>Africa/Nairobi (EAT)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Email Notifications</p>
                        <p className="text-xs text-muted-foreground">Receive updates about events</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
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
                        defaultValue="attendee@example.com"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name</label>
                      <input
                        type="text"
                        defaultValue="Jane Doe"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue="+254 700 000 000"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>
                    <Button>Update Account</Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
