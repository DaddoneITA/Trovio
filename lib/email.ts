import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: 'Trovio <onboarding@resend.dev>',
      to: email,
      subject: 'Benvenuto su Trovio! 🎉',
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
          
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #0D5C45, #1D9E75); border-radius: 12px; padding: 12px 16px;">
              <span style="color: white; font-size: 24px; font-weight: 700;">Trovio</span>
            </div>
          </div>

          <h1 style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 8px;">
            Ciao ${name}! 👋
          </h1>
          
          <p style="font-size: 16px; color: #6B7280; line-height: 1.6; margin-bottom: 24px;">
            Benvenuto su Trovio. Da oggi puoi trovare clienti su Reddit in tempo reale, senza perdere ore a cercare manualmente.
          </p>

          <div style="background: #F9FAFB; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h2 style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px;">Come iniziare:</h2>
            <div style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 12px;">
              <span style="background: #0D5C45; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-center; font-size: 12px; font-weight: 700; flex-shrink: 0; text-align: center; line-height: 24px;">1</span>
              <p style="margin: 0; color: #374151; font-size: 14px;">Vai alla dashboard e inserisci il servizio che offri (es. "logo design", "SEO", "copywriting")</p>
            </div>
            <div style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 12px;">
              <span style="background: #0D5C45; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-center; font-size: 12px; font-weight: 700; flex-shrink: 0; text-align: center; line-height: 24px;">2</span>
              <p style="margin: 0; color: #374151; font-size: 14px;">Trova persone che cercano esattamente quello che fai su Reddit</p>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <span style="background: #0D5C45; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-center; font-size: 12px; font-weight: 700; flex-shrink: 0; text-align: center; line-height: 24px;">3</span>
              <p style="margin: 0; color: #374151; font-size: 14px;">Genera un messaggio personalizzato e contattali direttamente</p>
            </div>
          </div>

          <div style="text-align: center; margin-bottom: 32px;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display: inline-block; background: #0D5C45; color: white; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 15px; text-decoration: none;">
              Inizia a trovare clienti →
            </a>
          </div>

          <p style="font-size: 13px; color: #9CA3AF; text-align: center; margin-bottom: 8px;">
            Hai il piano Free con 3 ricerche al mese. Passa a Pro per 200 ricerche mensili.
          </p>

          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
          
          <p style="font-size: 12px; color: #9CA3AF; text-align: center;">
            © ${new Date().getFullYear()} Trovio · <a href="${process.env.NEXTAUTH_URL}/termini" style="color: #9CA3AF;">Termini</a> · <a href="${process.env.NEXTAUTH_URL}/privacy" style="color: #9CA3AF;">Privacy</a>
          </p>
        </div>
      `
    })
    console.log(`Welcome email sent to ${email}`)
  } catch (error) {
    console.error('Email error:', error)
  }
}