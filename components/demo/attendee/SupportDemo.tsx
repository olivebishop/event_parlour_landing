"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageSquare, Mail, Copy, CheckCircle2 } from "lucide-react"

const SUPPORT_EMAIL = "hello@eventparlour.com"

const faqData = [
  {
    question: "How do I purchase tickets?",
    answer: "Browse events on the platform, select the event you want to attend, choose your ticket type and quantity, then proceed to checkout. You can pay using our secure payment gateway (Paystack). Once payment is confirmed, you'll receive a confirmation email with your ticket details.",
  },
  {
    question: "Can I transfer my ticket to someone else?",
    answer: "Yes! You can transfer your ticket to another EventPalour user. Go to your purchased tickets, click the Transfer button, and enter the recipient's email address. The recipient must have an EventPalour account. Once transferred, they'll receive an email confirmation and the ticket will no longer be valid for you.",
  },
  {
    question: "What if I can't attend an event?",
    answer: "You can transfer your ticket to someone else or contact the event organizer for refund options. Some events may have refund policies, which will be listed in the event details. Contact the organizer through the event page or reach out to our support team for assistance.",
  },
  {
    question: "How do I use my ticket at the event?",
    answer: "For physical events, you'll receive a QR code in your confirmation email. Show this QR code at the event entrance for scanning. For online events, you'll receive a link to join the event. Make sure to check your email for the event link before the event starts.",
  },
  {
    question: "Can I get a refund?",
    answer: "Refund policies vary by event organizer. Some events may offer full or partial refunds up to a certain date. Contact the event organizer directly or reach out to our support team at hello@eventparlour.com for assistance with refund requests.",
  },
  {
    question: "How do I create an account?",
    answer: "Click the Sign Up button on the homepage, enter your email address and create a password. You'll receive a verification email - click the link to verify your account. Once verified, you can start browsing and purchasing tickets for events.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We currently accept payments through Paystack, which supports various payment methods including credit/debit cards and bank transfers. Payment options may vary by region. All transactions are processed securely.",
  },
  {
    question: "What should I do if my ticket isn't working?",
    answer: "If your ticket QR code isn't scanning or you're having trouble accessing an online event, contact the event organizer first. If you need further assistance, reach out to our support team at hello@eventparlour.com with your ticket ID and event details.",
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
          <p className="text-sm text-muted-foreground">Get help with your account and event attendance</p>
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
