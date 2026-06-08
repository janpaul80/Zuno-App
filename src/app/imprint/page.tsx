import Link from "next/link";
import { FileText, Mail, MapPin, Scale } from "lucide-react";

export default function ImprintPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 font-inter">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <FileText className="h-4 w-4 text-neon-orange" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-neon-orange glow-text-orange">
              Legal Disclosure
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            Imprint
          </h1>
          <p className="text-gray-400 text-sm font-semibold">
            Information according to § 5 TMG
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl glow-border-orange space-y-8 text-gray-300 leading-relaxed text-sm font-medium">
          <section className="space-y-3">
            <h2 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mail className="h-5 w-5 text-neon-orange" /> Contact Now
            </h2>
            <p>
              E-mail:{" "}
              <a href="mailto:hello@paulhartmann.dev" className="text-electric-blue hover:text-white transition-colors">
                hello@paulhartmann.dev
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Scale className="h-5 w-5 text-neon-purple" /> Professional Regulations
            </h2>
            <p>The following professional regulations apply:</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="h-5 w-5 text-electric-blue" /> Editorially Responsible
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <address className="not-italic space-y-1">
                <strong className="block text-white">Paul-Hartmann LLC</strong>
                <span className="block">255 5th Ave</span>
                <span className="block">New York, NY 10016</span>
              </address>
              <address className="not-italic space-y-1">
                <strong className="block text-white">Paul-Hartmann GmbH</strong>
                <span className="block">Grabenweg 72</span>
                <span className="block">6020 Innsbruck, Austria</span>
                <span className="block">+43 670 6034585</span>
              </address>
            </div>
            <div className="space-y-1">
              <p>
                <strong className="text-white">General Managers:</strong> Jean-Paul Hartmann, Victor Arana
              </p>
              <p>
                <strong className="text-white">EIN:</strong> 42-2367575
              </p>
              <p>
                <strong className="text-white">Website:</strong>{" "}
                <a
                  href="https://paulhartmann.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-blue hover:text-white transition-colors"
                >
                  https://paulhartmann.dev
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider">
              EU Dispute Settlement
            </h2>
            <p>
              The European Commission provides a platform for online dispute resolution (ODR):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-electric-blue hover:text-white transition-colors"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p>You can find our e-mail address in the imprint above.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider">
              Consumer Dispute Resolution/Universal Conciliation Board
            </h2>
            <p>
              We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
            </p>
          </section>
        </div>

        <div className="text-center">
          <Link
            href="/legal"
            className="text-xs font-orbitron font-bold uppercase tracking-widest text-electric-blue hover:text-white transition-colors duration-200"
          >
            &larr; Back to Legal Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
