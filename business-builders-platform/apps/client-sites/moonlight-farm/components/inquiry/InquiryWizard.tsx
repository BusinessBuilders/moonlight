'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface BranchQuestion {
  fieldName: string
  label: string
  inputType: string
  placeholder?: string
  required: boolean
  options?: Array<{ label: string; value: string }>
}

interface Branch {
  branchId: string
  label: string
  description: string
  icon: string
  questions: BranchQuestion[]
}

const defaultBranches: Branch[] = [
  {
    branchId: 'animal-sales',
    label: 'Animal Sales',
    description: 'Interested in purchasing livestock or poultry',
    icon: '🐄',
    questions: [
      {
        fieldName: 'animalType',
        label: 'What type of animal are you interested in?',
        inputType: 'select',
        required: true,
        options: [
          { label: 'Scottish Highland Cattle', value: 'highland-cattle' },
          { label: 'Nigerian Dwarf Goats', value: 'goats' },
          { label: 'Llamas', value: 'llamas' },
          { label: 'Alpaca', value: 'alpaca' },
          { label: 'Poultry (Chickens/Geese/Guinea Fowl)', value: 'poultry' },
          { label: 'Peafowl', value: 'peafowl' },
          { label: 'New Zealand Rabbits', value: 'rabbits' },
          { label: 'Donkeys', value: 'donkeys' },
          { label: 'Other', value: 'other' },
        ],
      },
      {
        fieldName: 'buyOrSell',
        label: 'Are you looking to buy or sell?',
        inputType: 'select',
        required: true,
        options: [
          { label: 'I want to buy', value: 'buy' },
          { label: 'I want to sell', value: 'sell' },
        ],
      },
      { fieldName: 'quantity', label: 'How many animals?', inputType: 'number', required: false, placeholder: 'Approximate number' },
      { fieldName: 'timeline', label: 'When are you looking to buy/sell?', inputType: 'text', required: false, placeholder: 'e.g., Within 1 month, spring 2026' },
    ],
  },
  {
    branchId: 'events',
    label: 'Events & Petting Zoos',
    description: 'Book a petting zoo, educational program, or special event',
    icon: '🎉',
    questions: [
      {
        fieldName: 'eventType',
        label: 'What type of event?',
        inputType: 'select',
        required: true,
        options: [
          { label: 'Birthday Party', value: 'birthday' },
          { label: 'Corporate Event', value: 'corporate' },
          { label: 'Wedding', value: 'wedding' },
          { label: 'Bar/Bat Mitzvah', value: 'bar-bat-mitzvah' },
          { label: 'Sweet 16', value: 'sweet-16' },
          { label: 'School/Educational', value: 'educational' },
          { label: 'Other', value: 'other' },
        ],
      },
      { fieldName: 'guestCount', label: 'Estimated number of guests?', inputType: 'number', required: true, placeholder: 'Approximate headcount' },
      { fieldName: 'preferredDate', label: 'Preferred date(s)?', inputType: 'text', required: true, placeholder: 'e.g., June 15, 2026 or flexible' },
      {
        fieldName: 'cateringNeeded',
        label: 'Do you need catering information?',
        inputType: 'select',
        required: false,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Maybe — tell me more', value: 'maybe' },
        ],
      },
    ],
  },
  {
    branchId: 'hauling',
    label: 'Livestock Transport',
    description: 'Livestock & equine hauling services',
    icon: '🚛',
    questions: [
      { fieldName: 'pickup', label: 'Pickup location', inputType: 'text', required: true, placeholder: 'City, State or full address' },
      { fieldName: 'destination', label: 'Destination', inputType: 'text', required: true, placeholder: 'City, State or full address' },
      { fieldName: 'animalTypeAndCount', label: 'What animals and how many?', inputType: 'text', required: true, placeholder: 'e.g., 3 goats, 1 llama' },
      { fieldName: 'preferredDate', label: 'Preferred date(s)?', inputType: 'text', required: true, placeholder: 'e.g., First week of March' },
    ],
  },
  {
    branchId: 'general',
    label: 'General Inquiry',
    description: 'Questions about products, services, or anything else',
    icon: '💬',
    questions: [
      {
        fieldName: 'topic',
        label: 'What is your inquiry about?',
        inputType: 'select',
        required: true,
        options: [
          { label: 'Farm Products (beef, poultry, eggs, etc.)', value: 'products' },
          { label: 'Dog Boarding', value: 'boarding' },
          { label: 'Livestock Services', value: 'livestock-services' },
          { label: 'Farm Visit / Tour', value: 'visit' },
          { label: 'Other', value: 'other' },
        ],
      },
      { fieldName: 'message', label: 'Your message', inputType: 'textarea', required: true, placeholder: 'Tell us what you need...' },
    ],
  },
]

type Step = 'select-branch' | 'questions' | 'contact' | 'review' | 'success'

export function InquiryWizard() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState<Step>('select-branch')
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    const branchParam = searchParams.get('branch')
    if (branchParam) {
      const branch = defaultBranches.find((b) => b.branchId === branchParam)
      if (branch) {
        setSelectedBranch(branch)
        setStep('questions')
      }
    }
  }, [searchParams])

  const totalSteps = 4
  const currentStepNum =
    step === 'select-branch' ? 1 : step === 'questions' ? 2 : step === 'contact' ? 3 : step === 'review' ? 4 : 4

  function handleBranchSelect(branch: Branch) {
    setSelectedBranch(branch)
    setAnswers({})
    setStep('questions')
  }

  function handleAnswerChange(fieldName: string, value: string) {
    setAnswers((prev) => ({ ...prev, [fieldName]: value }))
  }

  function handleContactChange(field: string, value: string) {
    setContactInfo((prev) => ({ ...prev, [field]: value }))
  }

  function canProceedFromQuestions(): boolean {
    if (!selectedBranch) return false
    return selectedBranch.questions
      .filter((q) => q.required)
      .every((q) => answers[q.fieldName]?.trim())
  }

  function canProceedFromContact(): boolean {
    return Boolean(contactInfo.name.trim() && contactInfo.email.trim())
  }

  async function handleSubmit() {
    if (!selectedBranch) return
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const formData = new FormData()
      formData.append('access_key', 'e0472c8e-b148-41e4-a0f1-1d182dc00834')
      formData.append('name', contactInfo.name)
      formData.append('email', contactInfo.email)
      formData.append('subject', `New Inquiry: ${selectedBranch.label} — Moonlight Run Farm`)

      const lines: string[] = [`Category: ${selectedBranch.label}`, '']
      selectedBranch.questions.forEach((q) => {
        const rawVal = answers[q.fieldName]
        const displayVal =
          q.inputType === 'select' && q.options
            ? q.options.find((o) => o.value === rawVal)?.label || rawVal || '—'
            : rawVal || '—'
        lines.push(`${q.label}: ${displayVal}`)
      })
      if (contactInfo.phone) { lines.push(''); lines.push(`Phone: ${contactInfo.phone}`) }
      if (contactInfo.message) { lines.push(''); lines.push(`Additional Message: ${contactInfo.message}`) }
      formData.append('message', lines.join('\n'))

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        setStep('success')
      } else {
        throw new Error(data.message || 'Submission failed')
      }
    } catch {
      setSubmitError('Something went wrong. Please try again or email us directly at moonlightrunfarmllc@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  function renderField(question: BranchQuestion) {
    const value = answers[question.fieldName] || ''

    if (question.inputType === 'select' && question.options) {
      return (
        <select
          value={value}
          onChange={(e) => handleAnswerChange(question.fieldName, e.target.value)}
          className="w-full bg-forest-900/60 border border-forest-700/50 rounded-lg px-4 py-3 text-cream-50 focus:outline-none focus:border-forest-500 transition-colors"
        >
          <option value="">Select an option...</option>
          {question.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )
    }

    if (question.inputType === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => handleAnswerChange(question.fieldName, e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full bg-forest-900/60 border border-forest-700/50 rounded-lg px-4 py-3 text-cream-50 placeholder:text-cream-300/40 focus:outline-none focus:border-forest-500 transition-colors resize-none"
        />
      )
    }

    return (
      <input
        type={question.inputType === 'number' ? 'number' : question.inputType === 'email' ? 'email' : 'text'}
        value={value}
        onChange={(e) => handleAnswerChange(question.fieldName, e.target.value)}
        placeholder={question.placeholder}
        className="w-full bg-forest-900/60 border border-forest-700/50 rounded-lg px-4 py-3 text-cream-50 placeholder:text-cream-300/40 focus:outline-none focus:border-forest-500 transition-colors"
      />
    )
  }

  // Step: Success
  if (step === 'success') {
    return (
      <Card className="text-center py-12">
        <div className="text-5xl mb-6">✅</div>
        <h2 className="font-display text-3xl text-cream-50 mb-4">Thank You!</h2>
        <p className="text-cream-300 text-lg max-w-md mx-auto mb-8">
          We&apos;ve received your inquiry and will get back to you within 24-48 hours.
        </p>
        <Button variant="outline" onClick={() => { setStep('select-branch'); setSelectedBranch(null); setAnswers({}); setContactInfo({ name: '', email: '', phone: '', message: '' }) }}>
          Submit Another Inquiry
        </Button>
      </Card>
    )
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-cream-300 text-sm">Step {currentStepNum} of {totalSteps}</span>
          <span className="text-cream-300/60 text-sm">
            {step === 'select-branch' && 'Choose Category'}
            {step === 'questions' && selectedBranch?.label}
            {step === 'contact' && 'Your Information'}
            {step === 'review' && 'Review & Submit'}
          </span>
        </div>
        <div className="h-1.5 bg-forest-800/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-forest-500 to-gold-400 rounded-full transition-all duration-500"
            style={{ width: `${(currentStepNum / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Select Branch */}
      {step === 'select-branch' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {defaultBranches.map((branch) => (
            <button
              key={branch.branchId}
              onClick={() => handleBranchSelect(branch)}
              className="text-left"
            >
              <Card className="h-full cursor-pointer">
                <span className="text-3xl mb-3 block">{branch.icon}</span>
                <h3 className="font-display text-xl text-cream-50 mb-1">{branch.label}</h3>
                <p className="text-cream-300 text-sm">{branch.description}</p>
              </Card>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Branch Questions */}
      {step === 'questions' && selectedBranch && (
        <Card>
          <h2 className="font-display text-2xl text-cream-50 mb-6">
            {selectedBranch.icon} {selectedBranch.label}
          </h2>
          <div className="space-y-6">
            {selectedBranch.questions.map((question) => (
              <div key={question.fieldName}>
                <label className="block text-cream-200 text-sm font-medium mb-2">
                  {question.label}
                  {question.required && <span className="text-gold-400 ml-1">*</span>}
                </label>
                {renderField(question)}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={() => { setStep('select-branch'); setSelectedBranch(null) }}>
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => setStep('contact')}
              disabled={!canProceedFromQuestions()}
            >
              Continue
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Contact Info */}
      {step === 'contact' && (
        <Card>
          <h2 className="font-display text-2xl text-cream-50 mb-6">Your Contact Information</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-cream-200 text-sm font-medium mb-2">
                Full Name <span className="text-gold-400">*</span>
              </label>
              <input
                type="text"
                value={contactInfo.name}
                onChange={(e) => handleContactChange('name', e.target.value)}
                placeholder="Your name"
                className="w-full bg-forest-900/60 border border-forest-700/50 rounded-lg px-4 py-3 text-cream-50 placeholder:text-cream-300/40 focus:outline-none focus:border-forest-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-cream-200 text-sm font-medium mb-2">
                Email Address <span className="text-gold-400">*</span>
              </label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-forest-900/60 border border-forest-700/50 rounded-lg px-4 py-3 text-cream-50 placeholder:text-cream-300/40 focus:outline-none focus:border-forest-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-cream-200 text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full bg-forest-900/60 border border-forest-700/50 rounded-lg px-4 py-3 text-cream-50 placeholder:text-cream-300/40 focus:outline-none focus:border-forest-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-cream-200 text-sm font-medium mb-2">Additional Message</label>
              <textarea
                value={contactInfo.message}
                onChange={(e) => handleContactChange('message', e.target.value)}
                placeholder="Anything else you'd like us to know?"
                rows={3}
                className="w-full bg-forest-900/60 border border-forest-700/50 rounded-lg px-4 py-3 text-cream-50 placeholder:text-cream-300/40 focus:outline-none focus:border-forest-500 transition-colors resize-none"
              />
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={() => setStep('questions')}>
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => setStep('review')}
              disabled={!canProceedFromContact()}
            >
              Review
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Review & Submit */}
      {step === 'review' && selectedBranch && (
        <Card>
          <h2 className="font-display text-2xl text-cream-50 mb-6">Review Your Inquiry</h2>

          <div className="space-y-4 mb-6">
            <div className="glass-card !transform-none rounded-lg p-4">
              <h3 className="text-gold-400 text-sm font-medium mb-2">Category</h3>
              <p className="text-cream-50">{selectedBranch.icon} {selectedBranch.label}</p>
            </div>

            <div className="glass-card !transform-none rounded-lg p-4">
              <h3 className="text-gold-400 text-sm font-medium mb-2">Your Answers</h3>
              <dl className="space-y-2">
                {selectedBranch.questions.map((q) => (
                  <div key={q.fieldName}>
                    <dt className="text-cream-300 text-xs">{q.label}</dt>
                    <dd className="text-cream-50">
                      {q.inputType === 'select' && q.options
                        ? q.options.find((o) => o.value === answers[q.fieldName])?.label || answers[q.fieldName] || '—'
                        : answers[q.fieldName] || '—'}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="glass-card !transform-none rounded-lg p-4">
              <h3 className="text-gold-400 text-sm font-medium mb-2">Contact Information</h3>
              <p className="text-cream-50">{contactInfo.name}</p>
              <p className="text-cream-300 text-sm">{contactInfo.email}</p>
              {contactInfo.phone && <p className="text-cream-300 text-sm">{contactInfo.phone}</p>}
              {contactInfo.message && (
                <p className="text-cream-300 text-sm mt-2 italic">&ldquo;{contactInfo.message}&rdquo;</p>
              )}
            </div>
          </div>

          {submitError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{submitError}</p>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep('contact')}>
              Back
            </Button>
            <Button
              variant="secondary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
