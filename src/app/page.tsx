import { site } from "@/data/site";
import { work } from "@/data/work";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";

export default function Home() {
  // Sample placeholders show while developing (npm run dev), never on the live site.
  const items = work.filter((w) => !w.sample || process.env.NODE_ENV !== "production");

  // Section numbers (01, 02...) count only the sections that are shown.
  let n = 0;
  const next = () => String(++n).padStart(2, "0");
  const workIndex = items.length > 0 ? next() : "";
  const servicesIndex = next();
  const processIndex = next();
  const testimonialsIndex = testimonials.length > 0 ? next() : "";
  const aboutIndex = next();
  const contactIndex = next();

  return (
    <>
      <Intro name={site.shortName} />
      {/* #site gets `inert` while the lightbox is open, so keyboard focus stays in it. */}
      <div id="site">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Nav name={site.shortName} hasWork={items.length > 0} />
        <main id="main">
          <Hero site={site} />
          {items.length > 0 && (
            <section id="work" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
              <SectionHeading index={workIndex} title="Selected Work" />
              <Work items={items} />
            </section>
          )}
          <Services services={services} index={servicesIndex} />
          <Process steps={site.process} index={processIndex} />
          <Testimonials testimonials={testimonials} index={testimonialsIndex} />
          <About site={site} index={aboutIndex} />
          <Contact site={site} services={services.map((s) => s.title)} index={contactIndex} />
        </main>
        <Footer site={site} />
      </div>
    </>
  );
}
