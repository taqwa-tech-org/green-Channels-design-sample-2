import Image from "next/image";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductGrid } from "@/components/ProductGrid";
import { ServiceTiles } from "@/components/ServiceTiles";
import { ParallaxPanel } from "@/components/ParallaxPanel";
import { Reveal } from "@/components/Reveal";
import { Btn, More } from "@/components/Btn";
import { certifications } from "@/lib/content";

function Title({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center">
      <h2 className="wide text-[clamp(1.3rem,2.6vw,2.1rem)] text-black">{children}</h2>
      {sub && <p className="wide-sm mt-5 text-[10.5px] tracking-[0.2em] text-muted">{sub}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroCarousel />

      {/* ABOUT */}
      <section id="about" className="scroll-mt-16 bg-white px-6 py-28 md:py-40">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <Title>About</Title>
          <p className="mt-12 text-[17px] italic leading-[1.95] text-text md:text-[18px]">
            Green Channels is a buying house in Dhaka with more than 35 years of experience in Bangladesh. We work on the buyer&apos;s
            side of the table for professional clothing programmes: workwear, corporate wear and uniforms. Our strength is not limited
            to sourcing finished garments. It also includes product development, fabric and trim sourcing, sampling, factory
            selection, merchandising, production follow-up and quality control. Working through a network of partner factories rather
            than a factory of our own, we select the right partner for each garment and programme, and stay with it through to
            shipment.
          </p>
          <div className="mt-12">
            <More href="/company">Learn more</More>
          </div>
        </Reveal>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="scroll-mt-16 bg-white px-6 pb-28 md:pb-40">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <Title>Our Products</Title>
            <p className="mx-auto mt-10 max-w-[760px] text-center text-[16.5px] italic leading-[1.9] text-text">
              We are the buyer&apos;s trusted sourcing partner for professional clothing. From work jackets to polo shirts, every
              garment is developed with you to a specification a factory can price and build.
            </p>
          </Reveal>
          <div className="mt-20">
            <ProductGrid />
          </div>
        </div>
      </section>

      <ParallaxPanel id="development" image="/images/s-development.jpg" position="center 32%" title="Product Development">
        <p>
          From a concept, a reference garment or a tech pack to a specification a factory can price and build. Fabrics, trims,
          construction and fit are agreed with you before production begins, so what arrives is what you specified, programme after
          programme.
        </p>
        <div className="mt-8 not-italic">
          <More href="/services">Learn more</More>
        </div>
      </ParallaxPanel>

      <ParallaxPanel id="quality" image="/images/quality.jpg" position="center 40%" title="Quality Control" align="right">
        <p>
          Inspection is a sequence, not a last-minute check: seven defined stages from pre-production review to shipment approval.
          Where specific testing or third-party assessment is required, we coordinate it between the partner factory, the laboratory
          and you.
        </p>
        <div className="mt-8 not-italic">
          <More href="/quality">Learn more</More>
        </div>
      </ParallaxPanel>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-16 bg-white px-6 py-28 md:py-40">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <Title sub="From the first sketch to the last carton">Our Services</Title>
            <p className="mx-auto mt-10 max-w-[760px] text-center text-[16.5px] italic leading-[1.9] text-text">
              One accountable team on the buyer&apos;s side of the table: developing the product, sourcing the materials, running
              sampling and following production on the ground.
            </p>
          </Reveal>
          <div className="mt-20">
            <ServiceTiles />
          </div>
          <div className="mt-14 text-center">
            <Btn href="/services" tone="outline-dark">
              All services
            </Btn>
          </div>
        </div>
      </section>

      {/* PARTNER FACTORIES */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden text-center text-white">
        <Image src="/images/network.jpg" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "center 45%" }} />
        <div className="absolute inset-0 bg-black/55" />
        <Reveal className="relative px-6">
          <p className="wide text-[clamp(0.9rem,1.6vw,1.3rem)]">Our</p>
          <h2 className="wide mt-4 text-[clamp(2rem,6vw,5.4rem)] leading-[1.2]">
            Partner
            <br />
            Factories
          </h2>
          <p className="wide-sm mt-9 text-[10.5px] tracking-[0.22em] text-white/90 md:text-[12px]">Selected for each garment and programme</p>
        </Reveal>
      </section>

      <ParallaxPanel id="sustainability" image="/images/leaf.jpg" position="center 40%" title="Sustainability" align="left">
        <p>
          Our factory selection considers compliance, worker welfare and environmental practice. Certifications belong to our partner factories, and are published here only once they have been individually verified.
        </p>
        <div className="mt-8 not-italic">
          <More href="/sustainability">Learn more</More>
        </div>
      </ParallaxPanel>

      {/* CERTIFICATIONS */}
      <section className="bg-paper px-6 py-28 md:py-36">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <Title sub="Held by our partner factories, varying by factory and programme">Certifications</Title>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-16 grid grid-cols-2 gap-px border border-black/10 bg-black/10 sm:grid-cols-4">
              {certifications.map((c) => (
                <li key={c} className="wide-sm flex h-28 items-center justify-center bg-paper px-3 text-center text-[11px] text-black">
                  {c}
                </li>
              ))}
              <li className="wide-sm flex h-28 items-center justify-center bg-paper px-3 text-center text-[10px] text-muted">Verified before shown</li>
            </ul>
            <p className="mt-6 text-center text-[13.5px] italic text-muted">
              These are certifications of our partner factories, not of Green Channels itself.
            </p>
          </Reveal>
        </div>
      </section>

      {/* BUYERS */}
      <section className="bg-white px-6 py-28 md:py-36">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <Title>Our Buyers</Title>
          <p className="mt-10 text-[17px] italic leading-[1.95] text-text">
            We build programmes for apparel brands, importers, distributors and sourcing teams across Europe and North America,
            professional buyers accustomed to working with international suppliers.
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden text-center text-white">
        <Image src="/images/cta.jpg" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "center 50%" }} />
        <div className="absolute inset-0 bg-black/60" />
        <Reveal className="relative px-6">
          <h2 className="wide text-[clamp(1.8rem,5vw,4.4rem)] leading-[1.3]">
            Bring
            <br />
            Your Programme
            <br />
            To Life
          </h2>
          <div className="mt-12">
            <Btn href="/contact" tone="light">
              Send us your tech pack
            </Btn>
          </div>
        </Reveal>
      </section>
    </>
  );
}
