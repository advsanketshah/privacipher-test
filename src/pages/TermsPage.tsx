import { motion } from 'framer-motion';
import { 
  Scale, Shield, FileText, AlertTriangle, 
  Lock, ExternalLink
} from 'lucide-react';

const sections = [
  {
    id: 'disclaimer',
    title: 'Legal Disclaimer',
    icon: Scale,
    content: `
      <p className="mb-4">
        Privacipher is provided for informational and educational purposes only. The content, 
        assessments, scoring logic, penalty frameworks, and remediation guidance available on 
        this platform do not constitute legal advice and should not be relied upon as a substitute 
        for professional legal counsel.
      </p>
      <p className="mb-4">
        Privacy laws and regulations are complex, jurisdiction-specific, and subject to frequent 
        change. The information provided on Privacipher may not reflect the most current legal 
        developments or interpretations. Users are strongly encouraged to consult with qualified 
        legal professionals for advice tailored to their specific circumstances.
      </p>
      <p>
        Use of Privacipher does not create an advocate-client relationship between users and 
        Adv. Sanket Shah or any affiliated parties.
      </p>
    `,
  },
  {
    id: 'accuracy',
    title: 'Accuracy of Information',
    icon: FileText,
    content: `
      <p className="mb-4">
        While we make every effort to ensure the accuracy and completeness of the information 
        provided on Privacipher, we make no representations or warranties of any kind, express 
        or implied, about the completeness, accuracy, reliability, suitability, or availability 
        of the information, products, services, or related graphics contained on the platform.
      </p>
      <p>
        Any reliance you place on such information is strictly at your own risk. We disclaim 
        all liability for any loss or damage, including without limitation, indirect or 
        consequential loss or damage, arising from the use of or reliance on information 
        provided through Privacipher.
      </p>
    `,
  },
  {
    id: 'privacy',
    title: 'Privacy & Data Collection',
    icon: Lock,
    content: `
      <p className="mb-4">
        <strong>Zero Data Collection:</strong> Privacipher operates entirely within your browser. 
        No personal data, assessment responses, or any information entered into the platform is 
        collected, stored, transmitted, or processed by our servers.
      </p>
      <p className="mb-4">
        All assessments, calculations, and report generation occur locally on your device. 
        When you export reports, the data is generated and downloaded directly to your device 
        without any server interaction.
      </p>
      <p>
        We do not use cookies for tracking purposes. Any cookies used are strictly functional 
        and necessary for the operation of the platform.
      </p>
    `,
  },
  {
    id: 'intellectual',
    title: 'Intellectual Property',
    icon: Shield,
    content: `
      <p className="mb-4">
        All content on Privacipher, including but not limited to text, graphics, logos, 
        assessments, scoring algorithms, penalty frameworks, and remediation guidance, is the 
        property of Adv. Sanket Shah and is protected by copyright and other intellectual 
        property laws.
      </p>
      <p className="mb-4">
        Users are granted a limited, non-exclusive, non-transferable license to use Privacipher 
        for their internal compliance assessment purposes. This license does not permit:
      </p>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>Republication of content without written permission</li>
        <li>Commercial use of assessments or scoring logic</li>
        <li>Creation of derivative works based on the platform</li>
        <li>Reverse engineering of scoring algorithms</li>
        <li>Removal of copyright or proprietary notices</li>
      </ul>
      <p>
        For licensing inquiries or permission requests, please contact via LinkedIn.
      </p>
    `,
  },
  {
    id: 'limitations',
    title: 'Limitations of Liability',
    icon: AlertTriangle,
    content: `
      <p className="mb-4">
        To the fullest extent permitted by applicable law, Adv. Sanket Shah and any affiliated 
        parties shall not be liable for any:
      </p>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>Direct, indirect, incidental, special, consequential, or punitive damages</li>
        <li>Loss of profits, revenue, data, or business opportunities</li>
        <li>Regulatory penalties or enforcement actions</li>
        <li>Claims arising from reliance on platform information</li>
        <li>Damages resulting from unauthorized access to or use of the platform</li>
      </ul>
      <p>
        This limitation applies regardless of whether the damages are based on warranty, contract, 
        tort, or any other legal theory, even if we have been advised of the possibility of such damages.
      </p>
    `,
  },
  {
    id: 'third-party',
    title: 'Third-Party Links',
    icon: ExternalLink,
    content: `
      <p className="mb-4">
        Privacipher may contain links to third-party websites, including regulatory authorities, 
        legal resources, and professional networks. These links are provided for convenience and 
        informational purposes only.
      </p>
      <p className="mb-4">
        We have no control over the content of third-party websites and accept no responsibility 
        for them or for any loss or damage that may arise from your use of them. The inclusion 
        of any links does not necessarily imply a recommendation or endorsement of the views 
        expressed within them.
      </p>
      <p>
        When you access third-party websites, you do so at your own risk and subject to their 
        respective terms of use and privacy policies.
      </p>
    `,
  },
  {
    id: 'governing',
    title: 'Governing Law',
    icon: Scale,
    content: `
      <p className="mb-4">
        These Terms of Use shall be governed by and construed in accordance with the laws of 
        India, without regard to its conflict of law provisions.
      </p>
      <p>
        Any disputes arising under or in connection with these Terms shall be subject to the 
        exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
      </p>
    `,
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    icon: FileText,
    content: `
      <p className="mb-4">
        We reserve the right to modify these Terms of Use at any time. Changes will be effective 
        immediately upon posting to the platform. Your continued use of Privacipher following 
        the posting of revised Terms constitutes your acceptance of such changes.
      </p>
      <p>
        We encourage users to review these Terms periodically to stay informed about our terms 
        and conditions. The "Last Updated" date at the bottom of this page indicates when these 
        Terms were last revised.
      </p>
    `,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="section-eyebrow">Legal</span>
          <h1 className="font-serif text-3xl md:text-4xl text-[var(--ink)] mb-3">
            Terms of Use & Legal Disclaimer
          </h1>
          <p className="text-[var(--ink-3)]">
            Last Updated: April 6, 2025
          </p>
        </motion.div>

        {/* Important Notice Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--red-bg)] border border-[var(--red-border)] rounded-xl p-6 mb-10"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--red)] flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-[var(--red)] mb-2">
                Important Legal Notice
              </h2>
              <p className="text-[var(--ink-3)]">
                By accessing or using Privacipher, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Use. If you do not agree with any part of 
                these terms, you must not use this platform.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="bg-white rounded-xl border border-[var(--border)] p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--cream-dark)] flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-[var(--ink)]" />
                </div>
                <h2 className="font-serif text-xl text-[var(--ink)]">{section.title}</h2>
              </div>
              <div 
                className="text-[var(--ink-3)] prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 bg-[var(--ink)] rounded-xl p-8 text-center"
        >
          <h2 className="font-serif text-2xl text-white mb-4">Questions or Concerns?</h2>
          <p className="text-white/70 mb-6">
            If you have any questions about these Terms of Use, please connect on LinkedIn.
          </p>
          <a 
            href="https://www.linkedin.com/in/advsanketshah/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-[var(--ink)] font-semibold hover:bg-white/90 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Connect on LinkedIn
          </a>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-sm text-[var(--ink-4)]"
        >
          <p>© 2025–2026 Adv. Sanket Shah. All rights reserved.</p>
          <p className="mt-1">
            Privacipher and all associated content are proprietary and protected by copyright law.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
