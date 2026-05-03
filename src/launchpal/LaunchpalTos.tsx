import { Link } from 'react-router-dom';

export default function LaunchpalTos() {
  return (
    <div className="lp-tos">
      <style>{css}</style>
      <div className="lp-tos-wrap">

        <Link to="/launchpal" className="lp-back-link">← Launchpal</Link>

        <div className="lp-tos-header">
          <p className="lp-overline" style={{ marginBottom: '0.75rem' }}>Legal</p>
          <h1 className="lp-tos-title">Terms of Service</h1>
          <p className="lp-caption">
            Effective Date: April 30, 2026 &nbsp;·&nbsp;
            100K31D D.O.O. Beograd, Republic of Serbia ("Launchpal," "we," "us")
          </p>
          <p className="lp-body" style={{ marginTop: '1.25rem', maxWidth: '36rem' }}>
            By paying for The Sprint, the Caretaker, or the Co-Pilot, you ("Client") agree
            to these Terms of Service in full. If you do not agree, do not proceed with payment.
          </p>
        </div>

        <div className="lp-tos-body">

          <Section n="1" title="Services">
            <p className="lp-body">Launchpal offers three services:</p>
            <ul className="lp-ul">
              <li><strong>The Sprint</strong> — a fixed-scope, two-week engagement to turn an idea into a working digital product. Deliverables: discovery session, product blueprint, working beta, landing page, testable link (TestFlight or APK), handoff playbook, one feedback revision cycle, and async support throughout the engagement.</li>
              <li><strong>The Caretaker</strong> — monthly management of App Store, Google Play, and/or backend infrastructure under the Client's own developer accounts.</li>
              <li><strong>The Co-Pilot</strong> — monthly product development and maintenance, available only for products originally built by Launchpal.</li>
            </ul>
            <p className="lp-body">Specific deliverables are confirmed in writing at the start of each engagement.</p>
          </Section>

          <Section n="2" title="Payment & Refund Policy">
            <ul className="lp-ul">
              <li>The Sprint: $1,490, paid in full upfront. No installments.</li>
              <li>Retainers: invoiced monthly in advance.</li>
              <li>Payment is processed in USD via direct bank invoice from 100K31D D.O.O. or Gumroad checkout.</li>
              <li>Refund window: A full refund is available within 24 hours of the discovery session and before the Client has approved the blueprint, if either party concludes the project is not viable.</li>
              <li>After the Client approves the blueprint, the engagement is non-refundable. This reflects the substantive work already delivered and the schedule commitment made on the Client's behalf.</li>
              <li>Retainer cancellations require 14 days written notice. No refunds for partial months.</li>
            </ul>
          </Section>

          <Section n="3" title="Scope (Blueprint Rule)">
            <p className="lp-body">The approved blueprint is the complete and exhaustive description of work for The Sprint engagement. Approval is given by Client's written confirmation (email "Approve" or equivalent). The discovery summary document sent after Day 1 confirms shared understanding of the product scope; blueprint approval constitutes agreement with that scope.</p>
            <p className="lp-body">Any features, ideas, or changes proposed after blueprint approval are documented as v2 backlog items and are not part of the current engagement. Additional scope can be addressed via a follow-up retainer or a new engagement.</p>
          </Section>

          <Section n="4" title="Intellectual Property">
            <p className="lp-body">Upon final payment and delivery:</p>
            <ul className="lp-ul">
              <li>The Client receives full rights to the final product, source code, design assets, and content created specifically for them.</li>
              <li>Code is delivered via GitHub repository or compressed archive on Day 14.</li>
              <li>Launchpal retains the right to reuse generic architecture patterns, navigation templates, utility modules, boilerplate code, and non-client-specific components in other projects.</li>
              <li>Launchpal retains the right to reference completed work publicly (in portfolio, case studies, social media) unless the Client requests confidentiality in writing before the engagement begins.</li>
            </ul>
          </Section>

          <Section n="5" title="Third-Party Services & Limitations">
            <p className="lp-body">Launchpal builds on third-party platforms (Apple App Store, Google Play, Firebase, OpenAI, AWS, Vercel, and others). Launchpal is not responsible for:</p>
            <ul className="lp-ul">
              <li>Rejections, delays, or policy changes by Apple, Google, or other store operators</li>
              <li>Pricing changes, downtime, or deprecation of third-party APIs and services</li>
              <li>Changes to platform guidelines that affect the product post-delivery</li>
              <li>Third-party service costs incurred by the Client (developer accounts, API usage, hosting fees)</li>
            </ul>
            <p className="lp-body">Launchpal warrants the quality of the code and the architectural decisions made during the engagement, not the policies of external providers.</p>
            <p className="lp-body"><strong>Code Warranty:</strong> Launchpal warrants delivered code for 7 days following the Day 14 handoff. Issues arising from third-party modifications, integrations, or deployments made after delivery are not covered.</p>
            <p className="lp-body"><strong>TestFlight Expiry Notice:</strong> TestFlight builds expire 90 days after upload. The Client is responsible for maintaining a live testable build beyond this window. The Caretaker retainer covers ongoing build maintenance.</p>
          </Section>

          <Section n="6" title="No Guarantee of Commercial Success">
            <p className="lp-body">Launchpal delivers a working digital product. Launchpal does not guarantee:</p>
            <ul className="lp-ul">
              <li>User acquisition, conversion rates, or revenue</li>
              <li>Investor interest or funding outcomes</li>
              <li>Market validation or product-market fit</li>
              <li>Specific business results of any kind</li>
            </ul>
            <p className="lp-body">The product is a tool. Outcomes depend on the Client's market, distribution, pricing, and execution.</p>
            <p className="lp-body"><strong>Ethical &amp; Legal Termination:</strong> Launchpal reserves the right to terminate any engagement if the product, in Launchpal's sole judgment, violates applicable law or poses harm to end users. In such cases, a pro-rata refund is issued for work not yet delivered.</p>
          </Section>

          <Section n="7" title="Client Responsibilities">
            <p className="lp-body">The Client agrees to:</p>
            <ul className="lp-ul">
              <li>Provide accurate information about the product, target users, and intended use during discovery</li>
              <li>Respond to questions and feedback requests within 48 hours during the engagement</li>
              <li>Approve or reject the blueprint in writing</li>
              <li>Provide content, brand assets, or domain-specific input where required</li>
              <li>Pay developer account fees ($99 Apple, $25 Google) and third-party service costs in their own name when applicable</li>
            </ul>
            <p className="lp-body"><strong>Timeline Freeze Policy:</strong> The engagement timeline pauses if Client communication exceeds 48 hours. If the Client remains unresponsive for more than 14 consecutive days, the project is considered abandoned and formally closed. No refunds will be issued. Reopening an abandoned project requires a new engagement and a <strong>$350 rescheduling fee</strong>.</p>
            <p className="lp-body"><strong>Scheduling &amp; Queue:</strong> Sprint start dates are allocated first-come-first-served upon payment confirmation. Only one Sprint engagement runs at a time. If a Client's preferred start date is unavailable, they are added to the next available slot.</p>
          </Section>

          <Section n="8" title="Confidentiality">
            <p className="lp-body">Both parties agree to keep confidential any non-public business information shared during the engagement. This obligation survives termination of the engagement.</p>
          </Section>

          <Section n="9" title="Data Protection">
            <p className="lp-body">Launchpal processes minimal Client data necessary for service delivery (name, email, payment confirmation, project communication). Data is processed in accordance with GDPR where applicable. Launchpal does not sell, share, or use Client data for purposes outside the engagement.</p>
            <p className="lp-body">If the product processes end-user data, the Client is the Data Controller; Launchpal acts as Data Processor only during active engagement.</p>
          </Section>

          <Section n="10" title="Limitation of Liability">
            <p className="lp-body">To the maximum extent permitted by law, Launchpal's total liability for any claim arising from these Terms or the services provided is limited to the amount paid by the Client for the specific engagement giving rise to the claim.</p>
            <p className="lp-body">Launchpal is not liable for indirect, incidental, consequential, or punitive damages, including lost profits, lost users, or business interruption.</p>
          </Section>

          <Section n="11" title="Governing Law & Jurisdiction">
            <p className="lp-body">These Terms are governed by the laws of the Republic of Serbia. Any dispute arising from or related to these Terms shall be resolved exclusively in the competent courts of Belgrade, Serbia.</p>
          </Section>

          <Section n="12" title="Termination">
            <p className="lp-body">Either party may terminate the engagement before blueprint approval. After blueprint approval, the engagement runs to completion unless both parties agree in writing to terminate earlier.</p>
            <p className="lp-body">Retainers may be cancelled with 14 days written notice.</p>
          </Section>

          <Section n="13" title="Changes to These Terms">
            <p className="lp-body">Launchpal may update these Terms for future engagements. The Terms in effect at the time of payment apply to that specific engagement and cannot be changed retroactively.</p>
          </Section>

          <Section n="14" title="Contact">
            <p className="lp-body">
              100K31D D.O.O. Beograd<br />
              CARA LAZARA 5, 11000 Belgrade, Serbia<br />
              <a href="mailto:go@100k31d.co" className="lp-email-link">go@100k31d.co</a>
            </p>
          </Section>

        </div>

        <p className="lp-body lp-tos-closing">
          <em>By proceeding to payment, the Client confirms they have read, understood, and agreed to these Terms of Service.</em>
        </p>

        <div className="lp-tos-footer">
          <Link to="/launchpal" className="lp-back-link">← Launchpal</Link>
          <Link to="/launchpal/start" className="lp-back-link">Start a Sprint →</Link>
        </div>

      </div>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="lp-section">
      <h2 className="lp-section-title">
        <span className="lp-section-n">{n}.</span> {title}
      </h2>
      <div className="lp-section-body">{children}</div>
    </div>
  );
}

const css = `
  .lp-tos {
    min-height: 100vh;
    background: var(--lp-bg);
    color: var(--lp-fg);
    font-family: 'SF Mono', 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
  }
  .lp-tos-wrap { max-width: 44rem; margin: 0 auto; padding: 3.5rem 1.5rem 6rem; }

  .lp-back-link {
    font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--lp-fg-4); text-decoration: none; transition: color 0.15s;
  }
  .lp-back-link:hover { color: var(--lp-fg); }

  .lp-tos-header {
    margin: 3rem 0 3.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid var(--lp-border);
  }
  .lp-tos-title { font-size: 2.25rem; font-weight: 700; color: var(--lp-fg); margin: 0 0 0.5rem; }

  .lp-overline { font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--lp-fg-4); }
  .lp-body  { font-size: 16px; color: var(--lp-fg-3); line-height: 1.85; margin: 0; }
  .lp-caption { font-size: 14px; color: var(--lp-fg-4); line-height: 1.6; }

  .lp-tos-body { display: flex; flex-direction: column; }

  .lp-section { padding: 2rem 0; border-bottom: 1px solid var(--lp-border); }
  .lp-section-title {
    font-size: 14px; font-weight: 600; color: var(--lp-fg);
    letter-spacing: 0.06em; text-transform: uppercase;
    margin: 0 0 1.25rem;
  }
  .lp-section-n { color: var(--lp-fg-4); font-weight: 400; }
  .lp-section-body { display: flex; flex-direction: column; gap: 0.875rem; }

  .lp-ul {
    list-style: none; padding: 0; margin: 0.25rem 0;
    display: flex; flex-direction: column; gap: 0.75rem;
  }
  .lp-ul li {
    font-size: 16px; color: var(--lp-fg-3); line-height: 1.85;
    padding-left: 1.75rem; position: relative;
  }
  .lp-ul li::before { content: '—'; position: absolute; left: 0; color: var(--lp-fg-5); }
  .lp-ul strong { color: var(--lp-fg-2); font-weight: 500; }

  .lp-tos-body strong { color: var(--lp-fg-2); font-weight: 500; }
  .lp-email-link { color: var(--lp-fg-2); text-decoration: underline; text-underline-offset: 3px; transition: color 0.15s; }
  .lp-email-link:hover { color: var(--lp-fg); }

  .lp-tos-closing {
    margin-top: 3rem; padding-top: 2rem;
    border-top: 1px solid var(--lp-border);
    color: var(--lp-fg-4) !important;
    font-style: italic;
  }
  .lp-tos-footer {
    margin-top: 3rem;
    display: flex; align-items: center; justify-content: space-between;
  }
`;
