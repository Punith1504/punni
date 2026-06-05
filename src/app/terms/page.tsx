import Navbar from "@/components/Navbar";

export default function TermsAndConditions() {
  return (
    <main className="relative min-h-screen selection:bg-white/20 overflow-hidden bg-[#0A0A0A]">
      <Navbar />
      
      <section className="relative pt-32 pb-24 px-6 z-10 max-w-4xl mx-auto text-chalk">
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">Terms and Conditions</h1>
        <p className="text-sm text-chalk/60 mb-12 uppercase tracking-widest">Effective Date: [Insert Date]</p>

        <div className="space-y-8 text-lg leading-relaxed mix-blend-screen">
          <p>
            These Terms and Conditions (&quot;Terms&quot;) govern the software development services provided by Punni on Demand (&quot;Developer&quot;, &quot;we&quot;, &quot;us&quot;) to the client (&quot;Client&quot;, &quot;you&quot;). By engaging our services, you agree to these Terms.
          </p>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-white mt-8 mb-4">1. Scope of Services</h2>
            <p>Our primary service is software development. The fees quoted to you cover the design, coding, and initial deployment of the software as outlined in your specific project proposal.</p>
            <ul className="list-disc pl-6 space-y-2 text-chalk/80">
              <li><strong>What is included:</strong> Building the software, integrating required features, and delivering the final codebase or initial launch.</li>
              <li><strong>What is NOT included:</strong> Ongoing operational costs, marketing, content creation, or long-term management, unless explicitly stated in a separate agreement.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-white mt-8 mb-4">2. Third-Party Costs and Infrastructure</h2>
            <p>The Client is solely responsible for all external costs required to run and maintain the software. Punni on Demand does not cover, nor include in its development fee, the following:</p>
            <ul className="list-disc pl-6 space-y-2 text-chalk/80">
              <li><strong>Domain Names:</strong> The Client must purchase and maintain ownership of their own domain names.</li>
              <li><strong>Cloud & Hosting Services:</strong> All server, database, cloud storage (e.g., AWS, Google Cloud, Vercel), and hosting costs are the direct responsibility of the Client.</li>
              <li><strong>Third-Party APIs/Licenses:</strong> Any premium plugins, API usage fees, or software licenses required for the project will be billed to the Client&apos;s accounts.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-white mt-8 mb-4">3. Approvals, Revisions, and Scope Creep</h2>
            <p>To ensure rapid and efficient delivery, we operate on a strict approval process:</p>
            <ul className="list-disc pl-6 space-y-2 text-chalk/80">
              <li><strong>Final Approval:</strong> Upon completion of the development phase, the Client will review the project. Once the Client provides written or verbal confirmation that the project is acceptable (the &quot;Okay&quot;), the development phase is officially closed.</li>
              <li><strong>Post-Approval Changes:</strong> Any requested changes, feature additions, or modifications made after final approval will be treated as a new project scope. These will incur additional development charges at our standard hourly or fixed-project rate.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-white mt-8 mb-4">4. Maintenance and Support</h2>
            <p>Software requires upkeep, but maintenance is not included in the initial development fee.</p>
            <p>Once the software is handed over and approved, any future bug fixes, software updates, security patches, or server maintenance will require a separate Maintenance Agreement.</p>
            <p>Without an active Maintenance Agreement, Punni on Demand is not responsible for site downtimes, third-party software updates breaking the code, or security breaches post-launch.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-white mt-8 mb-4">5. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2 text-chalk/80">
              <li><strong>Client Ownership:</strong> Upon full and final payment of all development fees, the Client assumes ownership of the final custom codebase and visual deliverables.</li>
              <li><strong>Developer Rights:</strong> Punni on Demand retains the right to use open-source libraries, proprietary underlying frameworks, and generic code snippets across other projects. We also reserve the right to feature the completed project in our portfolio (unless a Non-Disclosure Agreement is signed).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-white mt-8 mb-4">6. Limitation of Liability</h2>
            <p>Punni on Demand provides software development services &quot;as is.&quot; We are not liable for:</p>
            <ul className="list-disc pl-6 space-y-2 text-chalk/80">
              <li>Loss of revenue or business interruptions caused by software bugs, server outages, or third-party service failures.</li>
              <li>Data breaches or loss of data once the software is deployed on the Client&apos;s infrastructure.</li>
            </ul>
            <p>Our maximum liability to the Client for any claim arising from this agreement will not exceed the total amount paid by the Client for the specific development project.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-white mt-8 mb-4">7. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of Telangana, India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad.</p>
          </div>

          <div className="mt-12 p-6 border border-white/10 rounded-xl bg-white/5">
            <p className="text-sm text-chalk/60 italic">
              <strong>Note:</strong> While this draft covers standard industry practices and your specific operational rules, it&apos;s always a good idea to have a local legal professional give it a quick review to ensure it perfectly aligns with local contract laws before having clients sign it.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 z-10 border-t border-white/10 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted text-xs tracking-widest uppercase">
            <span>© 2026 PUNNI Studio. Custom Crafted.</span>
            <span className="hidden sm:inline">•</span>
            <a href="/" className="hover:text-white transition-colors">Back to Home</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
