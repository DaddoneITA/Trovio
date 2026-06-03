import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { auth } from '@/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: process.env.STRIPE_PRO_PRICE_ID!,
        quantity: 1,
      }],
      customer_email: session.user.email,
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/upgrade-success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}