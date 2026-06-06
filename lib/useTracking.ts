'use client'

import { usePostHog } from 'posthog-js/react'

export function useTracking() {
  const ph = usePostHog()

  return {
    trackSignUp: (method: 'google' | 'email') => {
      ph?.capture('user_signed_up', { method })
    },

    trackSearch: (query: string, plan: string, resultsCount: number) => {
      ph?.capture('search_performed', { query, plan, results_count: resultsCount })
    },

    trackLeadSaved: (leadId: string, subreddit: string, score?: number) => {
      ph?.capture('lead_saved', { lead_id: leadId, subreddit, score })
    },

    trackUpgradeClicked: (location: string, currentPlan: string) => {
      ph?.capture('upgrade_clicked', { location, current_plan: currentPlan })
    },

    trackOutreachCopied: (leadId: string, score?: number) => {
      ph?.capture('outreach_copied', { lead_id: leadId, score })
    },

    identifyUser: (userId: string, email: string, plan: string) => {
      ph?.identify(userId, { email, plan })
    },
  }
}
