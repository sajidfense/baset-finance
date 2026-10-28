import type { ReactNode } from "react";
import Link from "next/link";
import { ContactCard, LegalDocument, LegalSection, List, P, SubHeading } from "@/components/LegalDocument";

const EFFECTIVE_DATE = "23 October 2026";

const SECTIONS = {
  acceptance: "1. Acceptance of These Terms",
  "our-services": "2. Our Services",
  fees: "3. Fees and Charges",
  "refer-and-earn": "4. Refer & Earn Program",
  "service-eligibility": "5. Service Eligibility and Client Relationships",
  "your-responsibilities": "6. Your Responsibilities",
  privacy: "7. Privacy and Personal Information",
  "intellectual-property": "8. Intellectual Property",
  "website-information": "9. Website Information and Availability",
  "third-party-services": "10. Third-Party Services and Links",
  liability: "11. Liability and Consumer Rights",
  indemnity: "12. Indemnity",
  changes: "13. Changes to These Terms",
  "website-access": "14. Suspension and Termination of Website Access",
  "governing-law": "15. Governing Law",
  "contact-us": "16. Contact Us",
} as const;

type SectionId = keyof typeof SECTIONS;

function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  return (
    <LegalSection id={id} title={SECTIONS[id]}>
      {children}
    </LegalSection>
  );
}

export default function TermsContent() {
  return (
    <LegalDocument
      title="Terms & Conditions"
      subtitle="The terms that govern your use of the Baset Finance website, services and Refer & Earn program."
      href="/terms"
      effectiveDate={EFFECTIVE_DATE}
      sections={SECTIONS}
    >
      <Section id="acceptance">
        <P>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the Baset Finance website,
          services, promotions and Refer &amp; Earn program.
        </P>
        <P>
          &ldquo;Baset Finance&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to the business
          operating under the Baset Finance name. &ldquo;You&rdquo; and &ldquo;your&rdquo; refer to anyone accessing our
          website, using our services or participating in our programs.
        </P>
        <P>
          By accessing our website or engaging with a service or program, you agree to the Terms applicable to that
          activity.
        </P>
        <P>
          Additional terms may apply to particular services, paid offerings or referral arrangements. We will make
          applicable additional terms available before you commit to the relevant arrangement.
        </P>
        <P>
          Nothing in these Terms excludes, restricts or modifies any right, consumer guarantee or statutory protection
          that cannot lawfully be excluded, restricted or modified.
        </P>
      </Section>

      <Section id="our-services">
        <P>
          Baset Finance may provide mortgage broking, finance-related assistance, referrals, marketing, lead-generation
          and other products or services.
        </P>
        <P>The availability, scope, eligibility requirements and pricing of our services may vary.</P>
        <P>
          Website information is general information and does not guarantee that a particular loan, interest rate,
          approval, saving or financial outcome will be available.
        </P>
        <P>
          Finance applications remain subject to lender criteria, assessment, verification and approval. We do not
          guarantee loan approval, settlement or a particular financial outcome unless expressly agreed in writing and
          legally capable of being guaranteed.
        </P>
        <P>We will comply with applicable legal and regulatory requirements when providing regulated services.</P>
      </Section>

      <Section id="fees">
        <SubHeading>3.1 Right to charge for any service</SubHeading>
        <P>
          Baset Finance reserves the right to charge fees for any service, product, consultation, membership, program,
          referral arrangement or other offering it provides, to the extent permitted by law.
        </P>
        <P>A service that is currently advertised as free may become a paid service for future engagements or participation periods.</P>

        <SubHeading>3.2 Introducing or changing fees</SubHeading>
        <P>
          We may introduce fees, change pricing or amend the commercial structure of a service, subject to applicable law
          and any existing agreement.
        </P>
        <P>
          We will disclose applicable fees before you enter into a paid arrangement and obtain any agreement or consent
          required by law.
        </P>
        <P>We will not impose retrospective charges or unilaterally vary an existing contract without a lawful basis.</P>

        <SubHeading>3.3 Payment obligations</SubHeading>
        <P>
          Where a service is paid, the applicable price, payment method, due date, cancellation conditions and other
          material charges will be disclosed before you commit.
        </P>
        <P>You agree to pay properly disclosed fees in accordance with the applicable agreement.</P>
        <P>
          Nothing in this section removes any applicable refund rights, consumer guarantees or other statutory
          protections.
        </P>
      </Section>

      <Section id="refer-and-earn">
        <SubHeading>4.1 Program overview</SubHeading>
        <P>
          Baset Finance may operate a Refer &amp; Earn program under which approved participants introduce prospective
          customers to Baset Finance and may become eligible for referral rewards or commissions.
        </P>
        <P>
          The program is subject to these Terms, the applicable program rules, any separate written referral agreement
          and applicable law.
        </P>
        <P>Participation is not automatic, and submitting a referral does not guarantee a reward.</P>

        <SubHeading>4.2 Discretion to approve or deny access</SubHeading>
        <P>Baset Finance reserves the right, to the extent permitted by law, to:</P>
        <List
          items={[
            "Approve or reject any application to join Refer & Earn.",
            "Deny any person access to the program.",
            "Restrict participation to selected individuals, businesses, professions or customer groups.",
            "Introduce eligibility criteria, verification requirements and additional participation conditions.",
            "Decline applications where eligibility requirements have not been met.",
          ]}
        />
        <P>
          We may exercise this discretion without providing a reason where lawful. This discretion does not permit
          unlawful discrimination or override any binding agreement or statutory right.
        </P>
        <P>Submitting an application does not create a right to participate.</P>

        <SubHeading>4.3 Existing clients and current customers</SubHeading>
        <P>
          Being a current or former client of Baset Finance does not automatically entitle you to participate in Refer
          &amp; Earn.
        </P>
        <P>To the extent permitted by law and subject to existing agreements, Baset Finance may:</P>
        <List
          items={[
            "Deny existing clients access to the program.",
            "Restrict or limit a client's participation.",
            "Exclude particular categories of clients from the program.",
            "Decline an existing client's application.",
            "Suspend or discontinue a client's program access in accordance with these Terms.",
          ]}
        />
        <P>
          Your eligibility as a referral participant is separate from your status as a mortgage broking or other service
          client.
        </P>
        <P>
          Any restriction on Refer &amp; Earn will not, by itself, remove your existing client rights or entitlements
          under a separate agreement.
        </P>

        <SubHeading>4.4 Paid participation</SubHeading>
        <P>
          Baset Finance may operate Refer &amp; Earn as a free program, a paid program, a subscription-based program or
          another commercial arrangement.
        </P>
        <P>
          We reserve the right to introduce participation fees, membership charges, administration fees or other charges,
          where permitted by law.
        </P>
        <P>
          Any applicable fees will be disclosed before you agree to the relevant paid arrangement. We will obtain any
          consent or agreement required before introducing fees to an existing participant or varying an existing
          agreement.
        </P>

        <SubHeading>4.5 Referral eligibility</SubHeading>
        <P>A referral must satisfy the program rules applicable to it.</P>
        <P>Unless otherwise specified in writing:</P>
        <List
          items={[
            "The referred person must be a genuine prospective customer.",
            "The referral must be submitted through an approved process.",
            "The information supplied must be sufficiently accurate to identify and contact the prospective customer.",
            "The participant must have a lawful basis to provide the person's information.",
            "The referral must not be fraudulent, fabricated or ineligible under the program rules.",
            "Any required permissions or consents must have been obtained.",
          ]}
        />
        <P>
          Baset Finance may reject referrals that do not meet the applicable requirements or cannot be reasonably
          verified.
        </P>
        <P>You must not submit another person&apos;s information in breach of privacy, marketing or other applicable laws.</P>

        <SubHeading>4.6 Referral rewards and commission</SubHeading>
        <P>
          Referral rewards may be calculated by reference to a commission received by Baset Finance or another amount
          specified in the applicable program rules or written agreement.
        </P>
        <P>
          The applicable reward percentage, calculation method, eligible transactions and payment conditions will be
          determined by the current program rules and any separate written agreement.
        </P>
        <P>Illustrative earnings and commission examples are estimates only unless expressly stated otherwise.</P>
        <P>
          A referral does not automatically entitle a participant to payment merely because a prospective customer has
          been introduced, contacted, approved for finance or submitted an application.
        </P>
        <P>
          A reward becomes payable when the applicable eligibility conditions have been satisfied and the amount is
          payable under the relevant program rules or agreement.
        </P>

        <SubHeading>4.7 Verification and payment</SubHeading>
        <P>
          Baset Finance may request reasonable information to verify referral eligibility, transaction details and
          payment information.
        </P>
        <P>
          Where the program specifies a payment period, including payment within 30 days of settlement, that period will
          apply subject to the disclosed eligibility, verification and payment conditions.
        </P>
        <P>
          We may investigate disputed, potentially fraudulent or unverified referrals and defer disputed payments while
          conducting a reasonable investigation.
        </P>
        <P>
          We will not withhold a reward that has already become legally payable merely by relying on a general
          discretionary power in these Terms.
        </P>

        <SubHeading>4.8 Prohibited conduct</SubHeading>
        <P>Participants must not:</P>
        <List
          items={[
            "Make false, misleading or deceptive statements about Baset Finance, lenders, finance products or referral rewards.",
            "Promise loan approval, interest rates or financial outcomes without authorisation.",
            "Use spam or unlawful telemarketing methods.",
            "Provide another person's information without an appropriate lawful basis.",
            "Submit fabricated, fraudulent or deliberately duplicated referrals.",
            "Misrepresent themselves as an employee, partner or authorised representative of Baset Finance.",
            "Engage in conduct that breaches applicable law or program rules.",
          ]}
        />
        <P>
          Participants are responsible for complying with applicable marketing, privacy and other legal requirements
          when generating referrals.
        </P>

        <SubHeading>4.9 Suspension, restriction and termination</SubHeading>
        <P>
          To the extent permitted by law, Baset Finance may suspend, restrict or terminate participation where reasonably
          necessary, including when:
        </P>
        <List
          items={[
            "These Terms or program rules have been breached.",
            "Fraud, misconduct or material inaccuracies are suspected or identified.",
            "A participant no longer meets the eligibility criteria.",
            "Continued participation presents a legal, regulatory, operational or reputational risk.",
            "The program is changed, paused or discontinued.",
            "We otherwise have a lawful basis to restrict or terminate participation.",
          ]}
        />
        <P>Where practicable and appropriate, we may provide notice of a suspension, restriction or termination.</P>
        <P>
          Termination will not automatically extinguish a reward that has already become payable under an applicable
          agreement. Any treatment of pending or accrued rewards will be determined by the relevant agreement, program
          rules and applicable law.
        </P>

        <SubHeading>4.10 Changes to the program</SubHeading>
        <P>
          Baset Finance may change the program&apos;s eligibility criteria, reward percentages, commission structure,
          fees, payment processes and participation requirements for future participation.
        </P>
        <P>We will communicate material changes where appropriate and provide any notice or obtain any agreement required by law.</P>
        <P>
          Unless permitted by a separate agreement or applicable law, changes will not retrospectively remove a reward
          entitlement that has already accrued.
        </P>

        <SubHeading>4.11 No employment or partnership</SubHeading>
        <P>
          Participation in Refer &amp; Earn does not, by itself, create an employment, partnership, joint venture or
          agency relationship with Baset Finance.
        </P>
        <P>
          Participants must not enter into contracts or make binding representations on our behalf without express
          authorisation.
        </P>
        <P>
          The actual legal nature of an arrangement depends on its substance and applicable law, not merely the label
          applied to it.
        </P>
      </Section>

      <Section id="service-eligibility">
        <P>
          Baset Finance may determine the eligibility criteria and availability of its services, subject to applicable
          law and existing contractual obligations.
        </P>
        <P>
          We may decline a new engagement, limit access to a particular service, change our service offerings or end an
          engagement where we have a lawful basis to do so.
        </P>
        <P>
          Where a separate client agreement applies, that agreement will govern the client relationship to the extent of
          any inconsistency, subject to applicable law.
        </P>
        <P>
          Nothing in these Terms authorises us to avoid existing contractual obligations, statutory duties, consumer
          guarantees or protections against unlawful discrimination.
        </P>
      </Section>

      <Section id="your-responsibilities">
        <P>When using our website or services, you agree to:</P>
        <List
          items={[
            "Provide accurate and non-misleading information.",
            "Keep your contact details reasonably up to date.",
            "Use our website and services lawfully.",
            "Respect the privacy and rights of other people.",
            "Avoid unauthorised access, interference or attempts to compromise our systems.",
            "Comply with applicable referral and promotional rules.",
          ]}
        />
        <P>
          You must promptly notify us if you become aware of a material error in information you have supplied or
          suspect unauthorised use of your information.
        </P>
      </Section>

      <Section id="privacy">
        <P>
          Our collection, use, storage and disclosure of personal information are described in our{" "}
          <Link href="/privacy-policy" className="text-gold hover:underline">
            Privacy Policy
          </Link>
          , available on our website.
        </P>
        <P>
          We may use personal information to provide services, respond to enquiries, administer referrals, manage our
          business and conduct marketing, subject to applicable law.
        </P>
        <P>
          Our intended sale or disclosure of email addresses and telephone numbers for third-party marketing is described
          in the Privacy Policy.
        </P>
        <P>
          These Terms do not replace any separate privacy notice, consent or authorisation required by law. Agreement to
          these Terms alone does not constitute consent to every type of personal information disclosure.
        </P>
      </Section>

      <Section id="intellectual-property">
        <P>
          Unless otherwise indicated, website content, including text, logos, branding, graphics and design, is owned by
          or licensed to Baset Finance.
        </P>
        <P>
          You may access and use website content for lawful personal and informational purposes. You must not reproduce,
          commercially exploit, modify or distribute our intellectual property without permission, except where
          permitted by law.
        </P>
        <P>Third-party trademarks and materials remain the property of their respective owners.</P>
      </Section>

      <Section id="website-information">
        <P>
          We aim to keep our website accurate and available but do not guarantee that all information will always be
          complete, current, uninterrupted or error-free.
        </P>
        <P>We may update, modify, suspend or remove website content and functionality.</P>
        <P>You should independently verify important information before making a financial or other significant decision.</P>
        <P>Nothing in this section excludes any liability or obligation that cannot lawfully be excluded.</P>
      </Section>

      <Section id="third-party-services">
        <P>Our website may contain links to third-party websites, lenders, products and service providers.</P>
        <P>
          Third-party services may be subject to their own terms, privacy policies and eligibility requirements. We are
          not responsible for third-party websites or services except to the extent responsibility cannot lawfully be
          excluded.
        </P>
        <P>Any engagement with a third party may be governed by a separate agreement.</P>
      </Section>

      <Section id="liability">
        <P>
          To the maximum extent permitted by law, Baset Finance excludes liability for loss arising from circumstances
          outside our reasonable control or from your unlawful or unauthorised use of our website.
        </P>
        <P>
          Nothing in these Terms excludes, restricts or modifies any consumer guarantee, statutory right, duty or
          liability that cannot lawfully be excluded or limited.
        </P>
        <P>
          Where the law permits a limitation of liability, it applies only to the extent legally permitted and
          appropriate to the relevant service.
        </P>
        <P>
          You remain responsible for your own decisions and should obtain independent legal, taxation or financial advice
          where appropriate.
        </P>
      </Section>

      <Section id="indemnity">
        <P>
          To the extent permitted by law, you may be responsible for reasonable loss or costs directly arising from your
          fraud, unlawful conduct, wilful misconduct or material breach of these Terms.
        </P>
        <P>
          This provision does not make you responsible for loss caused by our own breach, negligence or unlawful conduct
          to the extent that responsibility cannot lawfully be transferred to you.
        </P>
      </Section>

      <Section id="changes">
        <P>We may update these Terms to reflect changes to our services, pricing, programs, operations or legal obligations.</P>
        <P>The latest version will be published on our website with its effective date.</P>
        <P>
          Changes will apply prospectively unless otherwise agreed or permitted by law. Where a change affects an
          existing contract, we will provide any notice and obtain any agreement required by that contract or applicable
          law.
        </P>
        <P>
          Continued website use after a lawful update may indicate acceptance of updated website terms where legally
          effective. It does not automatically vary a separate contract where additional consent is required.
        </P>
      </Section>

      <Section id="website-access">
        <P>
          We may suspend or restrict website access where reasonably necessary for maintenance, security, suspected
          misuse, legal compliance or other legitimate operational reasons.
        </P>
        <P>We may terminate access for unlawful use or material breach, subject to applicable law.</P>
        <P>Suspending website access does not extinguish accrued contractual rights or statutory entitlements.</P>
      </Section>

      <Section id="governing-law">
        <P>These Terms are governed by the laws of Queensland, Australia, and applicable Commonwealth laws.</P>
        <P>
          You submit to the jurisdiction of the courts and tribunals with authority to hear disputes in Queensland,
          subject to mandatory legal rights and jurisdictional requirements.
        </P>
      </Section>

      <Section id="contact-us">
        <P>For enquiries about these Terms, our services or Refer &amp; Earn, please contact:</P>
        <ContactCard />
      </Section>
    </LegalDocument>
  );
}
