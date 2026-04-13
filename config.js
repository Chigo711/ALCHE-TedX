const eventDate = "October 5, 2026";

const msPerDay = 1000 * 60 * 60 * 24;
const daysUntilEvent = Math.max(
  0,
  Math.ceil((new Date(eventDate) - new Date()) / msPerDay),
);

export default {
  title: "TEDxALCHE",
  org: "African Leadership College of Higher Education",
  location: "Mauritius",
  eventDate,
  description:
    "TEDxALCHE brings together thinkers, builders, and changemakers in Mauritius for a day of bold ideas, meaningful connection, and future-facing conversations.",
  heroPhrases: [
    "Ideas worth spreading",
    "African Leadership College of Higher Education",
    "Reimagining education for Africa",
    "Inspiration, innovation, and connection",
    eventDate,
    `${daysUntilEvent} days to go`,
  ],
  stats: [
    { label: "Event Date", value: eventDate },
    { label: "Venue", value: "ALCHE Campus" },
    { label: "Format", value: "Live talks + curated experiences" },
    { label: "Focus", value: "Leadership, education, innovation" },
  ],
  mission: {
    title: "Our mission",
    intro:
      "We bring together thought leaders, innovators, and changemakers to explore the questions that will define tomorrow and spark conversations that lead to action.",
    body: [
      "Hosted by the African Leadership College of Higher Education, TEDxALCHE reflects a higher education model designed around agency, autonomy, and practical impact.",
      "Students at ALCHE declare missions, not majors. That spirit shapes the event too: every session is built to encourage curiosity, challenge assumptions, and help ambitious people connect around ideas that matter.",
      "By collapsing the distance between academia and the real world, ALCHE creates a learning environment where experimentation, leadership, and social impact can happen now, not someday after graduation.",
    ],
    cta: {
      label: "Join ALCHE",
      href: "https://alcheducation.com/admissions/",
    },
  },
  timeline: [
    {
      date: "April 20, 2026",
      title: "Speaker submission deadline",
      detail: "Final day to nominate speakers and submit talk ideas.",
    },
    {
      date: "May 18, 2026",
      title: "Speaker selection",
      detail: "Confirmed speakers are announced and coaching begins.",
    },
    {
      date: "August 17, 2026",
      title: "Training and rehearsals",
      detail: "Script reviews, slide prep, and active stage rehearsals.",
    },
    {
      date: "October 5, 2026",
      title: "TEDxALCHE event day",
      detail: "A full-day experience of ideas, stories, and connection.",
    },
  ],
  nomination:
    "We are looking for people with distinctive perspectives, practical insight, and stories capable of creating positive change in Mauritius and beyond.",
  slides: [
    "/images/slides/alu-alive.png",
    "/images/slides/App-of-the-MOnth-TedX-Talks.png",
    "/images/slides/IMG_3752.png",
    "/images/slides/reslife-2.png",
    "/images/slides/societies.png",
    "/images/slides/student-life-banner.png",
    "/images/slides/TED mic.png",
    "/images/slides/thespian.png",
  ],
  speakers: [
    {
      profileImage: "/images/speakers/Fred Swaniker.png",
      link: "https://alcheducation.com/our-leadership/#:~:text=Fred%20Swaniker",
      title: "Keynote",
      subtitle: "ALCHE Founder",
      name: "Fred Swaniker",
      subname: "Founder of African Leadership Group",
      description:
        "Recognized by President Obama in 2010 and 2013, Fred Swaniker has built institutions focused on identifying, developing, and connecting game-changing leaders across Africa.",
    },
    {
      profileImage: "/images/speakers/SUSHRUTHI.png",
      title: "Speaker",
      subtitle: "Changemaker",
      name: "Sushruthi Krishna",
      subname: "Model and Architect",
      description:
        "A voice for empathy, care, and everyday acts that can radically change how people experience the world around them.",
    },
    {
      profileImage: "/images/speakers/hani.png",
      link: "https://www.linkedin.com/in/hani-bundhun-4a8766201/",
      title: "Speaker",
      subtitle: "Finance",
      name: "Hani Bundhun",
      subname: "Commodity Trade Finance Associate",
      description:
        "A finance professional at Mauritius Commercial Bank specializing in the energy and commodities space.",
    },
  ],
  team: [
    {
      profileImage: "/images/team/tako.png",
      title: "Event MC",
      subtitle: "Master of Ceremonies",
      name: "Tako",
      subname: "Entrepreneurial Leadership Student",
      description:
        "Bringing energy to the stage while championing better infrastructure outcomes across Africa.",
    },
    {
      profileImage: "/images/team/Gabrielle-Harry.png",
      link: "https://www.linkedin.com/in/gabrielle-harry-1a9b3a1b0/",
      title: "Author",
      subtitle: "Cultural Strategist",
      name: "Gabrielle Harry",
      subname: "Digital Humanities and African Arts",
      description:
        "Focused on increasing access to African and Afro-diasporic knowledge through art, culture, and digital interventions.",
    },
    {
      profileImage: "/images/team/lisette-mukiza.png",
      link: "https://www.linkedin.com/in/lisette-mukiza/",
      title: "Co-Organizer",
      subtitle: "EdTech Enthusiast",
      name: "Lisette Mukiza",
      subname: "Technologist and Student Leader",
      description:
        "Uses technology and education to address youth challenges across Africa and create space for meaningful dialogue and action.",
    },
    {
      profileImage: "/images/team/stephy.png",
      link: "https://www.linkedin.com/in/stephyrukundo//",
      title: "Director",
      subtitle: "Operations",
      name: "Rukundo Keza Stephy",
      subname: "Education and Project Management",
      description:
        "An education enthusiast building strong teams and systems with a long-term commitment to improving learning outcomes across Africa.",
    },
    {
      profileImage: "/images/team/patii.png",
      title: "Director",
      subtitle: "Marketing",
      name: "Patii",
      subname: "Communications and Marketing",
      description:
        "Leads event storytelling, campaign direction, and audience engagement across channels.",
    },
    {
      profileImage: "/images/team/ayomide.png",
      link: "https://www.linkedin.com/in/ayomide-ajayi96/",
      title: "Director",
      subtitle: "Finance",
      name: "Ayomide Ajayi",
      subname: "Investment Analyst",
      description:
        "Supports financial planning for the event while staying deeply engaged in African infrastructure and capital access.",
    },
    {
      profileImage: "/images/team/ishimwe.png",
      link: "https://www.linkedin.com/in/ishimweolivier/",
      title: "Founder",
      subtitle: "Fearless Leader",
      name: "Olivier Ishimwe",
      subname: "Impact-Driven Entrepreneur",
      description:
        "Passionate about education, digital innovation, and youth empowerment, with a clear focus on practical impact.",
    },
    {
      profileImage: "/images/team/pretty.png",
      title: "Spiritual",
      subtitle: "Teacher",
      name: "Pretty, PhD",
      subname: "Animal Ambassador",
      description:
        "A beloved campus companion and a reminder that joy, comfort, and presence matter in every ambitious community.",
    },
  ],
  footer:
    "In the spirit of ideas worth spreading, TED has created TEDx, a program of local, self-organized events that bring people together to share a TED-like experience.",
  contactOptions: [
    { name: "tickets", label: "I want to buy a ticket to the event" },
    { name: "volunteer", label: "I want to volunteer" },
    { name: "advertise", label: "I want to advertise" },
    { name: "donate", label: "I want to donate" },
    { name: "nominateSpeaker", label: "I want to nominate a speaker" },
    { name: "mailingList", label: "I want to join the mailing list" },
  ],
};
