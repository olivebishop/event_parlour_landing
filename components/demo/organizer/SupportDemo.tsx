"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageSquare, Mail, Copy, CheckCircle2 } from "lucide-react"

const SUPPORT_EMAIL = "hello@eventparlour.com"

const faqData = [
  {
    question: "How do I create an event?",
    answer: "Navigate to the Events section and click 'Create Event'. Fill in the event details including name, date, location, and ticket information. Once created, you can manage your event from the Events dashboard.",
  },
  {
    question: "How do I manage ticket sales?",
    answer: "You can view all ticket sales in the Analytics section. Track revenue, attendee numbers, and sales trends. You can also manage ticket types and pricing from the Events page.",
  },
  {
    question: "How do I verify my account (KYC)?",
    answer: "Go to KYC Verification in the sidebar and upload the required documents (Business License, ID Document, Bank Statement). Our team will review your submission and notify you once verified.",
  },
  {
    question: "How do I invite team members?",
    answer: "Go to Settings > Team and click 'Invite Team Member'. Enter their email address and assign a role (Admin, Moderator, or Member). They'll receive an invitation email to join your workspace.",
  },
  {
    question: "How do I manage speakers?",
    answer: "Navigate to Speakers section to view all speakers. You can invite new speakers via email or create application links for speakers to apply. Manage speaker assignments from the Speakers dashboard.",
  },
  {
    question: "What payment methods are supported?",
    answer: "We support payments through Paystack, which accepts credit/debit cards and bank transfers. Configure your payment settings in Settings > Billing to set up payouts to your bank account.",
  },
  {
    question: "How do I communicate with attendees?",
    answer: "Use the Channels feature to create communication channels for your events. You can send announcements, answer questions, and engage with attendees before, during, and after events.",
  },
  {
    question: "Can I transfer tickets between events?",
    answer: "Tickets are event-specific and cannot be transferred between events. However, you can manage ticket transfers for attendees through the Tickets section where you can scan and verify tickets at entry.",
  },
]

export default function SupportDemo() {
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (_error) {
      // Handle error silently in demo
    }
  }

  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <h3 className="text-2xl font-bold text-foreground mb-1">Help & Support</h3>
          <p className="text-sm text-muted-foreground">Get help with your events and account</p>
        </div>

        {/* Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 overflow-y-auto">
          {/* FAQ Section */}
          <Card>
            <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <CardTitle className="text-base sm:text-lg">
                  Frequently Asked Questions
                </CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm">
                Find answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
              <div className="space-y-0">
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq) => (
                    <AccordionItem
                      key={faq.question}
                      value={faq.question}
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs sm:text-sm text-muted-foreground pb-3 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <CardTitle className="text-base sm:text-lg">
                  Contact Support
                </CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm">
                Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <Mail className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-medium mb-2">Need Help?</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mb-4">
                    Our support team is here to help. A contact form and support
                    ticket system will be available soon.
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Email Support</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyEmailToClipboard}
                        className="h-8"
                      >
                        {emailCopied ? (
                          <>
                            <CheckCircle2 className="mr-2 h-3 w-3" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-3 w-3" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium text-foreground">
                        {SUPPORT_EMAIL}
                      </span>
                      <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className="text-sm text-primary hover:underline"
                      >
                        Send Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
