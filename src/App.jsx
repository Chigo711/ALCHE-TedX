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

function useRotatingSlides(slides, pause = 4200) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, pause);

    return () => window.clearInterval(interval);
  }, [pause, slides.length]);

  return activeIndex;
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
        <img src="/images/backgrounds/tedx-background.png" alt="" />
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

function Mission() {
  return (
    <section className="section shell">
      <div className="section-head">
        <p className="eyebrow">Why this event matters</p>
        <h2>{config.mission.title}</h2>
      </div>
      <div className="mission-grid">
        <article className="mission-card">
          <p className="mission-card__intro">{config.mission.intro}</p>
          {config.mission.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a
            className="inline-link"
            href={config.mission.cta.href}
            target="_blank"
            rel="noreferrer"
          >
            {config.mission.cta.label}
          </a>
        </article>
        <aside className="mission-aside">
          <div className="mission-aside__image">
            <img src="/images/palmtrees.png" alt="Mauritius palm trees" />
          </div>
          <div className="mission-aside__quote">
            <p>
              "Students declare missions, not majors" is more than a line. It is
              the design principle behind the culture that TEDxALCHE is bringing
              to the stage.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function SlidesSection() {
  const activeIndex = useRotatingSlides(config.slides);

  return (
    <section className="section shell">
      <div className="experience-grid">
        <div className="experience-copy">
          <p className="eyebrow">Campus energy</p>
          <h2>An event shaped by a high-agency learning community.</h2>
          <p>
            ALCHE is built around hands-on education, leadership, and real-world
            experimentation. TEDxALCHE carries that same energy into a public
            experience.
          </p>
        </div>
        <div className="slideshow-card">
          {config.slides.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt={`TEDxALCHE slide ${index + 1}`}
              className={index === activeIndex ? "is-active" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="timeline" className="section shell">
      <div className="section-head">
        <p className="eyebrow">Event timeline</p>
        <h2>Key moments on the road to TEDxALCHE.</h2>
      </div>
      <div className="timeline-grid">
        {config.timeline.map((item) => (
          <article key={item.date} className="timeline-card">
            <span>{item.date}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PeopleSection({ id, eyebrow, title, intro, people }) {
  return (
    <section id={id} className="section shell">
      <div className="section-head">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro ? <p className="section-head__intro">{intro}</p> : null}
      </div>
      <div className="people-grid">
        {people.map((person) => (
          <article key={person.name} className="person-card">
            <div className="person-card__media">
              <img src={person.profileImage} alt={person.name} />
              <div className="person-card__tag">
                <span>{person.title}</span>
                <strong>{person.subtitle}</strong>
              </div>
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

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    url: "",
    message: "",
    tickets: false,
    volunteer: false,
    advertise: false,
    donate: false,
    nominateSpeaker: false,
    mailingList: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });

  const options = useMemo(() => config.contactOptions, []);

  function updateField(event) {
    const { name, type, checked, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function validate() {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone is required";
    } else if (formData.phone.trim().length < 7) {
      nextErrors.phone = "Phone must be at least 7 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = new FormData();
    payload.append("form-name", "contact");
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("url", formData.url);
    payload.append("message", formData.message);
    options.forEach((option) => {
      if (formData[option.name]) {
        payload.append(option.name, "on");
      }
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload).toString(),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      setStatus({
        type: "success",
        message: "Your message has been sent. We will be in touch soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        url: "",
        message: "",
        tickets: false,
        volunteer: false,
        advertise: false,
        donate: false,
        nominateSpeaker: false,
        mailingList: false,
      });
      setErrors({});
    } catch {
      setStatus({
        type: "error",
        message:
          "Something went wrong while sending your message. Please try again.",
      });
    }
  }

  return (
    <section id="contact" className="section shell">
      <div className="contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Get involved</p>
          <h2>
            Nominate a speaker, partner with the team, or join the audience.
          </h2>
          <p>{config.nomination}</p>
          <div className="contact-copy__panel">
            <strong>Reach us directly</strong>
            <a href="mailto:info@TEDxALCHE.com">info@TEDxALCHE.com</a>
          </div>
        </div>
        <form
          className="contact-form"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          noValidate
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />
          <div className="field-grid">
            <label className="field">
              <span>Name</span>
              <input name="name" value={formData.name} onChange={updateField} />
              {errors.name ? <small>{errors.name}</small> : null}
            </label>
            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={updateField}
              />
              {errors.email ? <small>{errors.email}</small> : null}
            </label>
            <label className="field">
              <span>Phone</span>
              <input
                name="phone"
                value={formData.phone}
                onChange={updateField}
              />
              {errors.phone ? <small>{errors.phone}</small> : null}
            </label>
            <label className="field">
              <span>Profile URL</span>
              <input name="url" value={formData.url} onChange={updateField} />
            </label>
          </div>
          <fieldset className="interest-grid">
            <legend>What are you reaching out about?</legend>
            {options.map((option) => (
              <label key={option.name} className="checkbox-pill">
                <input
                  type="checkbox"
                  name={option.name}
                  checked={formData[option.name]}
                  onChange={updateField}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              rows="6"
              value={formData.message}
              onChange={updateField}
            />
          </label>
          {status.message ? (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          ) : null}
          <button className="button" type="submit">
            Send message
          </button>
        </form>
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
        <Mission />
        <SlidesSection />
        <Timeline />
        <PeopleSection
          id="speakers"
          eyebrow="Speaker nominations"
          title="Featured nominated speakers"
          intro={config.nomination}
          people={config.speakers}
        />
        <PeopleSection
          id="team"
          eyebrow="Organizing team"
          title="The people building TEDxALCHE"
          people={config.team}
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
