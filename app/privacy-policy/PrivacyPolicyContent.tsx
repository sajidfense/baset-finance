import type { ReactNode } from "react";
import { ContactCard, LegalDocument, LegalSection, List, P, SubHeading, TextLink } from "@/components/LegalDocument";

const EFFECTIVE_DATE = "23 October 2026";

const SECTIONS = {
  introduction: "1. Introduction",
  "information-we-collect": "2. Personal Information We Collect",
  "how-we-collect": "3. How We Collect Personal Information",
  "how-we-use": "4. How We Use Personal Information",
  "our-marketing": "5. Our Own Marketing",
  "sale-of-contact-information": "6. Sale and Disclosure of Contact Information to Third Parties",
  "service-delivery": "7. Disclosure for Service Delivery",
  cookies: "8. Cookies, Analytics and Advertising",
  "overseas-disclosure": "9. Overseas Disclosure",
  "storage-security": "10. Storage, Security and Retention",
  "access-correction": "11. Access and Correction",
  complaints: "12. Privacy Complaints",
  "contact-us": "13. Contact Us",
  "third-party-websites": "14. Third-Party Websites",
  changes: "15. Changes to This Policy",
} as const;

type SectionId = keyof typeof SECTIONS;

function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  return (
    <LegalSection id={id} title={SECTIONS[id]}>
      {children}
    </LegalSection>
  );
}

function SectionLink({ id, children }: { id: SectionId; children: ReactNode }) {
  return <TextLink href={`#${id}`}>{children}</TextLink>;
}

export default function PrivacyPolicyContent() {
  return (
    <LegalDocument
      title="Privacy Policy"
      subtitle="How Baset Finance collects, uses, stores, discloses and protects your personal information."
      href="/privacy-policy"
      effectiveDate={EFFECTIVE_DATE}
      sections={SECTIONS}
    >
      <Section id="introduction">
        <P>
          Baset Finance (&ldquo;Baset Finance&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;)
          respects your privacy and is committed to handling personal information responsibly.
        </P>
        <P>
          This Privacy Policy explains how we collect, use, store, disclose and protect personal information when
          you visit our website, enquire about our services, apply for finance, participate in our Refer &amp; Earn
          program, or interact with our marketing activities.
        </P>
        <P>
          We operate in Australia and will handle personal information in accordance with applicable Australian
          privacy laws, including the Privacy Act 1988 (Cth) and the Australian Privacy Principles where
          applicable.
        </P>
        <P>
          Where consent is required by law, we will seek that consent separately. Merely visiting our website or
          accepting these terms does not automatically constitute consent to every use or disclosure of personal
          information described in this policy.
        </P>
      </Section>

      <Section id="information-we-collect">
        <P>The information we collect depends on your relationship with Baset Finance and the services you request.</P>

        <SubHeading>2.1 Contact and identification information</SubHeading>
        <P>We may collect:</P>
        <List
          items={[
            "Full name.",
            "Email address.",
            "Telephone number.",
            "Residential or postal address, where required.",
            "Employment or business contact details, where relevant.",
            "Other identification details reasonably necessary to provide a requested service.",
          ]}
        />

        <SubHeading>2.2 Mortgage broking and financial information</SubHeading>
        <P>
          If you enquire about or use our mortgage broking or finance-related services, we may collect information
          reasonably necessary to assess your circumstances and assist with your enquiry or application, including:
        </P>
        <List
          items={[
            "Income, employment and expenses.",
            "Assets, liabilities and existing debts.",
            "Loan requirements and financial objectives.",
            "Property details.",
            "Supporting documents and information requested by lenders.",
            "Credit-related information where lawfully obtained and required.",
          ]}
        />
        <P>
          This information is collected for service delivery and related lawful purposes. It is not part of the
          contact-information sales activity described in{" "}
          <SectionLink id="sale-of-contact-information">Section 6</SectionLink>.
        </P>

        <SubHeading>2.3 Referral and marketing information</SubHeading>
        <P>We may collect information about:</P>
        <List
          items={[
            "Your participation in Refer & Earn.",
            "Referral history and referral sources.",
            "Marketing preferences and consent records.",
            "Enquiries, campaign responses and communications with us.",
            "Products or services you have expressed an interest in.",
          ]}
        />

        <SubHeading>2.4 Website and technical information</SubHeading>
        <P>
          We or our service providers may collect technical information such as IP addresses, browser and device
          information, pages visited, cookie identifiers, advertising interactions and website analytics.
        </P>
        <P>
          Where these technologies collect personal information or disclose it to third parties, we will provide
          required notices and obtain consent where legally necessary.
        </P>
      </Section>

      <Section id="how-we-collect">
        <P>We may collect personal information:</P>
        <List
          items={[
            "Directly from you through website forms, telephone calls, emails, meetings and other communications.",
            "When you request finance assistance or submit an application.",
            "When you apply for or participate in Refer & Earn.",
            "From a person who refers you to us, where permitted by law.",
            "From lenders, service providers and other relevant parties where authorised and lawful.",
            "Through our advertising, analytics and customer relationship management platforms.",
            "From publicly available sources where lawful and appropriate.",
          ]}
        />
        <P>
          Where information is collected from another source, we will take any notification or consent steps
          required by applicable law.
        </P>
      </Section>

      <Section id="how-we-use">
        <P>We may use personal information for the following purposes:</P>
        <List
          items={[
            "Responding to enquiries and arranging consultations.",
            "Providing mortgage broking, finance assistance and related services.",
            "Assessing finance requirements and assisting with applications.",
            "Managing client relationships and communications.",
            "Administering Refer & Earn and verifying eligible referrals.",
            "Calculating and paying referral rewards.",
            "Conducting our own marketing and promotional activities.",
            "Measuring advertising performance and improving our services.",
            "Preventing fraud and protecting our business.",
            "Meeting legal, regulatory, accounting and record-keeping obligations.",
            "Other purposes disclosed at the time of collection or permitted by law.",
          ]}
        />
        <P>We will not use personal information for a materially different purpose where doing so would be unlawful.</P>
      </Section>

      <Section id="our-marketing">
        <P>
          We may use your contact details to communicate with you about Baset Finance&apos;s services,
          finance-related offerings, promotions and other relevant information.
        </P>
        <P>Communications may occur by email, SMS, telephone or other lawful channels.</P>
        <P>
          We will comply with applicable marketing laws, including the Spam Act 2003 (Cth) and the Do Not Call
          Register Act 2006 (Cth), where relevant. We will obtain consent where required and provide appropriate
          unsubscribe or opt-out facilities.
        </P>
        <P>
          You can opt out of marketing communications by using the unsubscribe facility provided, replying STOP
          where supported, or contacting us using the details in{" "}
          <SectionLink id="contact-us">Section 13</SectionLink>.
        </P>
        <P>
          Opting out of marketing does not necessarily prevent us from sending essential service communications or
          messages we are legally required to send.
        </P>
      </Section>

      <Section id="sale-of-contact-information">
        <SubHeading>6.1 What information may be sold</SubHeading>
        <P>
          Baset Finance may, where permitted by law and subject to any required consent, sell, license, exchange or
          otherwise disclose your email address and telephone number to third parties for their own marketing or
          commercial purposes.
        </P>
        <P>
          This activity may involve providing contact details to businesses that wish to market their own products
          or services to prospective customers.
        </P>
        <P>
          The personal information we intend to sell for this purpose is limited to email addresses and telephone
          numbers. We do not intend to sell your income, financial statements, loan application documents, credit
          information, account balances or other financial details as part of this contact-information sales
          activity.
        </P>
        <P>
          This limitation concerns our intended contact-information sales activity. It does not prevent us from
          sharing other relevant information when necessary to provide a service you have requested, with
          appropriate authorisation and subject to applicable law.
        </P>

        <SubHeading>6.2 Who may receive contact information</SubHeading>
        <P>Depending on the campaign and the permissions obtained, recipients may include:</P>
        <List
          items={[
            "Businesses seeking prospective customers.",
            "Marketing agencies and lead-generation businesses.",
            "Finance and lending businesses.",
            "Insurance providers.",
            "Property-related businesses.",
            "Other commercial organisations offering products or services to consumers.",
          ]}
        />
        <P>We may receive payment, commission or another commercial benefit for providing contact information.</P>

        <SubHeading>6.3 Consent and transparency</SubHeading>
        <P>
          Where required by law, we will clearly disclose the intended sale or disclosure of contact details and
          obtain the necessary consent before proceeding.
        </P>
        <P>
          We will not assume that consent to receive communications from Baset Finance automatically constitutes
          consent to the sale of contact details to third parties for their own marketing.
        </P>
        <P>
          We may maintain records of consent, including the wording presented, the date consent was given and the
          relevant form or campaign.
        </P>
        <P>
          We will take reasonable steps to ensure that our collection and disclosure practices reflect the
          permissions obtained and applicable legal requirements.
        </P>

        <SubHeading>6.4 Your choices and opt-out rights</SubHeading>
        <P>
          You may contact us to request that we stop using or disclosing your personal information for direct
          marketing, including third-party marketing, subject to applicable law.
        </P>
        <P>
          We will action requests in accordance with our legal obligations. Where a particular disclosure has
          already lawfully occurred, we cannot guarantee that the recipient has not already received or used the
          information. We may communicate an applicable opt-out request to relevant recipients where appropriate
          and lawful.
        </P>
        <P>
          You may also have rights to request access to your personal information, request correction, or ask
          about its source where it has been used or disclosed for direct marketing, subject to applicable legal
          requirements and exceptions.
        </P>

        <SubHeading>6.5 Third-party responsibilities</SubHeading>
        <P>
          A third party that receives your contact details for its own marketing may handle those details under its
          own privacy policy and legal obligations.
        </P>
        <P>
          We encourage you to review the privacy information of any business that contacts you. We do not represent
          that a third party&apos;s subsequent handling of information is governed solely by this Privacy Policy.
        </P>
      </Section>

      <Section id="service-delivery">
        <P>
          Apart from the contact-information sales activity described in{" "}
          <SectionLink id="sale-of-contact-information">Section 6</SectionLink>, we may disclose relevant personal
          information to parties involved in delivering our services.
        </P>
        <P>
          These parties may include lenders, mortgage aggregators, verification providers, credit reporting bodies,
          professional advisers, technology providers and administrative service providers.
        </P>
        <P>Such disclosures will be made only where reasonably necessary, authorised and permitted by applicable law.</P>
      </Section>

      <Section id="cookies">
        <P>Our website may use cookies, pixels, tags and similar technologies to:</P>
        <List
          items={[
            "Operate and secure the website.",
            "Remember preferences.",
            "Measure website and advertising performance.",
            "Understand user interactions.",
            "Improve advertising campaigns and audience measurement.",
          ]}
        />
        <P>
          Some technologies may allow third-party platforms to receive technical or interaction information. We will
          provide any required disclosures and obtain consent where legally necessary.
        </P>
        <P>
          You may manage cookies through your browser settings and any consent controls we provide. Disabling
          cookies may affect some website functionality.
        </P>
      </Section>

      <Section id="overseas-disclosure">
        <P>
          Some of our hosting, analytics, advertising or other service providers may store or process personal
          information outside Australia.
        </P>
        <P>Where personal information is disclosed to overseas recipients, we will take the steps required by applicable law.</P>
        <P>
          The countries in which all our service providers operate have not yet been confirmed. We will update this
          policy or provide supplementary information as appropriate once the relevant arrangements are
          established.
        </P>
      </Section>

      <Section id="storage-security">
        <P>
          We may store personal information in electronic databases, cloud services, customer relationship
          management platforms, email systems and physical records.
        </P>
        <P>
          We take reasonable steps to protect personal information from misuse, interference, loss, unauthorised
          access, modification and disclosure. Measures may include access controls, authentication, staff training
          and service-provider safeguards.
        </P>
        <P>No electronic storage or transmission method is completely secure, and we cannot guarantee absolute security.</P>
        <P>
          We retain information for as long as reasonably necessary for the purpose for which it was collected,
          subject to legal, regulatory, contractual and record-keeping requirements. When information is no longer
          required, we take reasonable steps to destroy or de-identify it where appropriate and lawful.
        </P>
      </Section>

      <Section id="access-correction">
        <P>
          Subject to applicable law, you may request access to personal information we hold about you or request
          correction of information that is inaccurate, incomplete, out of date or misleading.
        </P>
        <P>We may need to verify your identity before responding. Some legal exceptions may apply.</P>
        <P>
          You may also contact us to ask about personal information used or disclosed for direct marketing,
          including its source, subject to applicable legal requirements.
        </P>
        <P>
          We will respond within the timeframes required by law. We will not charge a fee where charging a fee is
          prohibited by law.
        </P>
      </Section>

      <Section id="complaints">
        <P>If you believe we have mishandled your personal information, please contact us with details of your concern.</P>
        <P>We will investigate your complaint and respond within a reasonable period, consistent with applicable requirements.</P>
        <P>
          If you are dissatisfied with our response, you may be able to complain to the Office of the Australian
          Information Commissioner (OAIC) or another relevant regulator.
        </P>
        <P>
          OAIC website: <TextLink href="https://www.oaic.gov.au/">https://www.oaic.gov.au/</TextLink>
        </P>
      </Section>

      <Section id="contact-us">
        <P>
          For privacy enquiries, access or correction requests, marketing opt-outs, third-party marketing objections
          or complaints, please contact:
        </P>
        <ContactCard />
        <P>
          Please provide sufficient information for us to identify your request without sending unnecessary
          sensitive information.
        </P>
      </Section>

      <Section id="third-party-websites">
        <P>
          Our website may contain links to external websites and services. We are not responsible for the privacy
          practices of third parties operating those websites. You should review their privacy policies before
          providing information to them.
        </P>
      </Section>

      <Section id="changes">
        <P>
          We may update this Privacy Policy to reflect changes in our operations, technology, service providers or
          legal obligations.
        </P>
        <P>
          The current version will be published on our website with its effective date. Where required by law, we
          will provide additional notice or obtain fresh consent for material changes.
        </P>
      </Section>
    </LegalDocument>
  );
}
