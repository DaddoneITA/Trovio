import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function TerminiPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-2">Termini di Servizio</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-10">Ultimo aggiornamento: Giugno 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-[var(--color-text-secondary)]">

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">1. Accettazione dei Termini</h2>
            <p>Utilizzando Trovio ("il Servizio"), accessibile su trovio-alpha.vercel.app, accetti di essere vincolato dai presenti Termini di Servizio. Se non accetti questi termini, non utilizzare il Servizio. Il Servizio è fornito da Luca Corazzi, con sede in Italia.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">2. Descrizione del Servizio</h2>
            <p>Trovio è uno strumento SaaS che aiuta i freelancer a trovare potenziali clienti su piattaforme pubbliche come Reddit. Il Servizio fornisce ricerche di lead, generazione di messaggi tramite intelligenza artificiale e funzionalità di salvataggio lead.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">3. Account e Registrazione</h2>
            <p>Per utilizzare il Servizio è necessario creare un account fornendo un indirizzo email valido e una password. Sei responsabile della riservatezza delle tue credenziali e di tutte le attività effettuate tramite il tuo account. Devi notificare immediatamente qualsiasi accesso non autorizzato.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">4. Piani e Pagamenti</h2>
            <p>Trovio offre un piano gratuito con funzionalità limitate e un piano Pro a €19,00/mese. I pagamenti sono gestiti tramite Stripe. Gli abbonamenti si rinnovano automaticamente ogni mese fino alla cancellazione. Non sono previsti rimborsi per i periodi già fatturati, salvo diversa disposizione di legge.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">5. Uso Accettabile</h2>
            <p>Accetti di utilizzare il Servizio solo per scopi legali e in conformità con questi Termini. È vietato: utilizzare il Servizio per spam o attività fraudolente, tentare di accedere non autorizzato al Servizio, rivendere o sublicenziare il Servizio a terzi senza autorizzazione scritta.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">6. Dati di Terze Parti</h2>
            <p>Trovio recupera informazioni da piattaforme pubbliche come Reddit tramite servizi di terze parti. Non garantiamo l'accuratezza, la completezza o la disponibilità continua di tali dati. L'utente è responsabile dell'uso che fa delle informazioni ottenute tramite il Servizio.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">7. Limitazione di Responsabilità</h2>
            <p>Il Servizio è fornito "così com'è" senza garanzie di alcun tipo. Non siamo responsabili per danni diretti, indiretti, incidentali o consequenziali derivanti dall'uso o dall'impossibilità di utilizzare il Servizio. La nostra responsabilità massima è limitata all'importo pagato negli ultimi 3 mesi.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">8. Cancellazione</h2>
            <p>Puoi cancellare il tuo account in qualsiasi momento dalle impostazioni. La cancellazione del piano Pro è effettiva alla fine del periodo di fatturazione corrente. Ci riserviamo il diritto di sospendere o terminare account che violano questi Termini.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">9. Modifiche ai Termini</h2>
            <p>Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. Le modifiche saranno comunicate via email o tramite avviso sul Servizio. L'uso continuato del Servizio dopo le modifiche costituisce accettazione dei nuovi Termini.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">10. Legge Applicabile</h2>
            <p>Questi Termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente il foro di residenza del consumatore, come previsto dalla normativa italiana ed europea a tutela dei consumatori.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">11. Contatti</h2>
            <p>Per qualsiasi domanda su questi Termini contattaci a: <a href="mailto:luca.corazzi@gmail.com" className="text-[var(--color-primary)]">luca.corazzi@gmail.com</a></p>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  )
}