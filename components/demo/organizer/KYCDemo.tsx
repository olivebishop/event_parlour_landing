"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, CheckCircle, Clock, Upload, FileText } from "lucide-react"
import { mockKYCData } from "../mockData"

export default function KYCDemo() {
  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <h3 className="text-2xl font-bold text-foreground mb-1">KYC Verification</h3>
          <p className="text-sm text-muted-foreground">Complete your verification to start creating events</p>
        </div>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-foreground" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Verification Status</CardTitle>
                <Badge variant={mockKYCData.status === "pending" ? "secondary" : "default"} className="mt-1">
                  {mockKYCData.status === "pending" ? "Pending Review" : "Verified"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Submitted on {mockKYCData.submittedDate}
            </p>
            <div className="space-y-3">
              {mockKYCData.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    {doc.status === "approved" ? (
                      <CheckCircle className="h-5 w-5 text-foreground" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{doc.name}</span>
                    </div>
                  </div>
                  <Badge variant={doc.status === "approved" ? "default" : "secondary"}>
                    {doc.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 gap-2">
              <Upload className="h-4 w-4" />
              Upload Documents
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
