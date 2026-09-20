import { PageBanner } from "./PageBanner";

export function LegalPage({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <>
      <PageBanner image="/images/network.jpg" position="center 45%" title={title} tagline="Draft text for the prototype, to be reviewed by Green Channels before launch" />
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          {sections.map(([t, d]) => (
            <div key={t} className="border-b border-black/10 py-9">
              <h2 className="wide text-[13px]">{t}</h2>
              <p className="mt-4 text-[16px] italic leading-[1.85] text-text">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
