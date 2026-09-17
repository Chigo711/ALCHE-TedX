import { useEffect, useMemo, useState } from "react";
import config from "../config.js";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useTaglineBuilder(
  text,
  { typeSpeed = 80, wordPause = 700, endPause = 2200, clearSpeed = 26 } = {},
) {
  const reducedMotion = useMemo(prefersReducedMotion, []);

  // Character counts where a whole word has just been completed.
  const wordStops = useMemo(() => {
    const stops = [];
    for (let index = 0; index < text.length; index += 1) {
      if (text[index] === " ") stops.push(index);
    }
    stops.push(text.length);
    return stops;
  }, [text]);

  const [visibleChars, setVisibleChars] = useState(0);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const isComplete = visibleChars === text.length;
    const atWordStop = visibleChars > 0 && wordStops.includes(visibleChars);

    let delay = typeSpeed;
    if (isClearing) delay = clearSpeed;
    else if (isComplete) delay = endPause;
    else if (atWordStop) delay = wordPause;

    const timeout = window.setTimeout(() => {
      if (isClearing) {
        if (visibleChars === 0) {
          setIsClearing(false);
          return;
        }
        setVisibleChars((count) => count - 1);
        return;
      }

      if (isComplete) {
        setIsClearing(true);
        return;
      }

      setVisibleChars((count) => count + 1);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    clearSpeed,
    endPause,
    isClearing,
    reducedMotion,
    text.length,
    typeSpeed,
    visibleChars,
    wordPause,
    wordStops,
  ]);

  return reducedMotion ? text : text.slice(0, visibleChars);
}

//Renders "TEDxALCHE" with the TEDx "x" in the brand red
function BrandWordmark({ title }) {
  const markIndex = title.indexOf("x");

  if (markIndex === -1) {
    return title;
  }

  return (
    <>
      {title.slice(0, markIndex)}
      <span className="hero__mark">x</span>
      {title.slice(markIndex + 1)}
    </>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const items = [
    { label: "Home", href: "#home" },
    { label: "Speakers", href: "#speakers" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="site-header">
      <div className="site-header__bar shell">
        <a className="brand" href="#home" onClick={() => setOpen(false)}>
          <img src="/images/logos/logo.full.png" alt={config.title} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`site-nav ${open ? "is-open" : ""}`}>
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const tagline = useTaglineBuilder(config.tagline);

  const eventDateLabel = useMemo(() => {
    const parsed = new Date(config.eventDate);
    return Number.isNaN(parsed.getTime())
      ? config.eventDate
      : parsed.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  }, []);

  return (
    <section id="home" className="hero">

      <div className="hero__media" aria-hidden="true">
        <img src="/images/backgrounds/hero-section-background.png" alt="a person on a speaker stand" />
      </div>

      <div className="hero__inner shell">
        <h1 className="hero__title">
          <BrandWordmark title={config.title} />
        </h1>
        <p className="hero__subhead">{config.theme}</p>
        <p className="hero__tagline">
          <span className="sr-only">{config.tagline}</span>
          <span aria-hidden="true">{tagline}</span>
          <span className="hero__cursor" aria-hidden="true" />
        </p>
        <ul className="hero__details">
          <li>{eventDateLabel}</li>
          <li>{config.venue}</li>
          <li>
            <a href={config.ticketUrl} target="_blank" rel="noreferrer">
              Get Tickets
            </a>
          </li>
        </ul>
        <div className="hero__actions">
          <a
            className="button"
            href={config.ticketUrl}
            target="_blank"
            rel="noreferrer"
          >
            Get Tickets
          </a>
          <a className="button button--ghost" href="#speakers">
            Meet the Speakers
          </a>
        </div>
      </div>
    </section>
  );
}

function StackSection({ id, title, intro, cards = [], note }) {

  if (!cards.length) return null;

  return (
    <section id={id} className="section shell stack-section">
      <div className="stack-section__head">
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>

      <div className="stack">
        {cards.map((card, index) => (
          <article
            key={card.title ?? card.body?.[0] ?? index}
            className={[
              "stack__card",
              card.image ? "stack__card--split" : "",
              card.centered ? "stack__card--center" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ "--index": String(index) }}
          >
            <div className="stack__body">
              {card.kicker ? (
                <span className="stack__kicker">{card.kicker}</span>
              ) : null}
              {card.title ? <h3>{card.title}</h3> : null}
              {card.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {card.questionsTitle ? (
                <p className="stack__list-title">{card.questionsTitle}</p>
              ) : null}
              {card.questions?.length ? (
                <ul className="stack__list">
                  {card.questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              ) : null}
              {card.outro ? <p className="stack__outro">{card.outro}</p> : null}
            </div>

            {card.image ? (
              <div className="stack__media">
                <img src={card.image} alt={card.imageAlt ?? ""} />
              </div>
            ) : null}
          </article>
        ))}
      </div>

      {note ? <p className="stack__note">{note}</p> : null}
    </section>
  );
}

function PeopleSection({ id, eyebrow, title, intro, people, centered = false }) {
  return (
    <section id={id} className="section shell">
      <div className={`section-head ${centered ? "section-head--center" : ""}`}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {intro ? <p className="section-head__intro">{intro}</p> : null}
      </div>
      <div className="people-grid">
        {people.map((person) => (
          <article key={person.name} className="person-card">
            <div className="person-card__media">
              <img src={person.profileImage} alt={person.name} />
            </div>
            <div className="person-card__body">
              <h3>{person.name}</h3>
              <p className="person-card__subname">{person.subname}</p>
              <p>{person.description}</p>
              {person.link ? (
                <a
                  className="inline-link"
                  href={person.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View profile
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <img
            src="/images/logos/logo.full.png"
            alt={config.title}
            className="footer-logo"
          />
          <p>{config.footer}</p>
        </div>
        <div>
          <h3>About TEDx</h3>
          <p>
            TEDx events are independently organized under license from TED and
            are designed to create local spaces for deep discussion and
            connection.
          </p>
        </div>
        <div>
          <h3>Event note</h3>
          <p>
            This is an independent TEDx event operated under license from{" "}
            <a href="https://www.ted.com" target="_blank" rel="noreferrer">
              TED
            </a>
            .
          </p>
          <p className="copyright">
            Copyright {new Date().getFullYear()} {config.title}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.title = config.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", config.description);
    }
  }, []);

  return (
    <div className="page-shell">
      <Navigation />
      <main>
        <Hero />
        <StackSection id="about" {...config.about} />
        <StackSection
          id="theme"
          title={config.themeSection.title}
          cards={[...config.themeSection.cards, ...config.focusAreas.cards]}
        />
          <PeopleSection
          id="speakers"
          title="Meet the Speakers"
          people={config.speakers}
          centered
        />
        <PeopleSection
          id="team"
          title="Meet the Team Behind TEDxALCHE"
          intro={config.teamIntro}
          people={config.team}
          centered
        />
      </main>
      <Footer />
    </div>
  );
}
