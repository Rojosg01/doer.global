/**
 * data.js — Centralized Data Store for Doer Global
 * ================================================
 * Single source of truth for ALL website content.
 * Every UI module imports from here — no hardcoded strings elsewhere.
 */

export const siteData = {
  // ─── Navigation ─────────────────────────────────────────────
  nav: {
    logoText: 'Doer',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'Services', href: '#services' },
      { label: 'Stories', href: '#stories' },
      { label: 'Team', href: '#team' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: { label: 'Ideation Challenge', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdYXza_gDihHxcYEMmX20E6whOIrAiZndqy5zf7ceNZK7xnFw/viewform' },
  },

  // ─── Hero Section ───────────────────────────────────────────
  hero: {
    badge: '#1 Entrepreneurship Development Service',
    headlinePart1: 'Raise Your First Cheque with',
    headlineAccent: 'Doer Global',
    typewriterWords: ['Pitch Decks', 'Business Plans', 'Expert Mentorship', 'Startup Guidance'],
    description:
      'We help early-stage entrepreneurs transform ideas into investor-ready ventures through structured guidance, professional deliverables, and hands-on mentorship.',
    ctaText: 'Get Started',
    ideationLink: {
      text: 'Looking for the Doer Ideation Challenge? Click here to register.',
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSdYXza_gDihHxcYEMmX20E6whOIrAiZndqy5zf7ceNZK7xnFw/viewform',
    },
  },

  // ─── Impact Metrics ─────────────────────────────────────────
  metrics: [
    {
      icon: '💰',
      value: 5,
      suffix: 'Cr+',
      label: 'Grant Raised',
      description: 'In funding secured for our startups',
    },
    {
      icon: '🚀',
      value: 30,
      suffix: '+',
      label: 'Startups Impacted',
      description: 'Founders guided from idea to launch',
    },
    {
      icon: '👥',
      value: 70,
      suffix: '+',
      label: 'Jobs Created',
      description: 'Employment generated across ventures',
    },
    {
      icon: '🎓',
      value: 40,
      suffix: '+',
      label: 'Knowledge Sessions',
      description: 'Workshops, bootcamps & masterclasses',
    },
  ],

  // ─── Services ───────────────────────────────────────────────
  services: [
    {
      id: 'pitch-deck',
      icon: '📊',
      title: 'Investor-Ready Pitch Deck',
      subtitle: 'Unlock funding opportunities',
      description:
        'Unlock funding opportunities with our expertly crafted Investor Ready Pitch Decks, designed to captivate investors and elevate your chances of securing investment for your startup.',
      features: [
        'Tailored slide flow & layout design',
        'Targeted investor storytelling',
        'Financial model & unit economics integration',
        'Clear value proposition development'
      ],
      cta: 'Build Your Pitch Deck',
    },
    {
      id: 'business-plan',
      icon: '📋',
      title: 'Sustainable Business Plan for Growth',
      subtitle: 'Blueprint for scalable growth',
      description:
        'This service provides entrepreneurs with a comprehensive business plan that outlines a strategy for growth and sustainability. The business plan includes market research, financial projections, marketing and sales strategies, operational plans, and more. This service helps entrepreneurs create a roadmap for success and ensures that their business is built for growth and profitability.',
      features: [
        'TAM, SAM, SOM market research',
        'Sales & marketing strategy layout',
        'Comprehensive operational plan design',
        '3-year financial projections & analysis'
      ],
      cta: 'Get Your Business Plan',
    },
    {
      id: 'pitch-presentation',
      icon: '🎙️',
      title: 'Presenting pitch deck',
      subtitle: 'Confidently present to investors',
      description:
        "Amplify your pitch's impact with our comprehensive services, offering personalized support to confidently present your Investor Ready Pitch Deck to investors, ensuring a compelling and successful investment pitch.",
      features: [
        'Pitch delivery & speaking coaching',
        'Q&A prep & response framework development',
        'Investor psychology & hook guidelines',
        'Iterative presentation feedback rounds'
      ],
      cta: 'Master Your Presentation',
    },
    {
      id: 'guidance',
      icon: '🧭',
      title: 'Real-Time Guidance',
      subtitle: 'Valuable fundraising insights',
      description:
        "Many early-stage founders may lack experience in fundraising and crafting persuasive investment materials. This company's frameworks and expertise can guide founders through the process, offering valuable insights and best practices to increase their chances of securing funding.",
      features: [
        'Weekly founder-mentor sync calls',
        'Pitch alignment & messaging validation',
        'Fundraising strategies and roadmap',
        'Strategic insights on investor mindset'
      ],
      cta: 'Get Guidance Now',
    },
    {
      id: 'incubators',
      icon: '🚀',
      title: 'Apply for Startup Incubators and Accelerators',
      subtitle: 'Boost selection and incubation potential',
      description:
        "Many startup incubators and accelerators support early-stage entrepreneurs and provide resources to help them refine their business models and secure funding. This company's services can be valuable in such programs to enhance the startups' investment readiness.",
      features: [
        'Incubator application draft review',
        'Mock selection committee interviews',
        'Program fit & positioning advice',
        'Deliverable validation for investors'
      ],
      cta: 'Apply Successfully',
    },
    {
      id: 'legal-management',
      icon: '⚖️',
      title: 'Start-Up Management and Legal Consultation',
      subtitle: 'Frameworks for advisors and consultants',
      description:
        "Entrepreneurs often seek the guidance of business consultants and advisors to refine their business strategies. This company's frameworks can serve as a resource for consultants and advisors to assist their clients in developing investment-ready pitch decks and business plans.",
      features: [
        'Customizable templates & blueprints',
        'Advisory operational frameworks',
        'Business setup & compliance consults',
        'Strategic consultation guides'
      ],
      cta: 'Consult Our Team',
    },
    {
      id: 'success-seek',
      icon: '🏆',
      title: 'Success You Seek',
      subtitle: 'Achieving sustainable market dominance',
      description:
        'Success for startups means achieving sustainable growth, profitability, and market dominance through innovation, customer satisfaction, and effective execution of their business model.',
      features: [
        'Customer satisfaction & NPS metrics guidance',
        'Innovation blueprinting & scaling',
        'Execution milestone tracking frameworks',
        'Profitability scaling roadmap design'
      ],
      cta: 'Achieve Success Today',
    }
  ],

  // ─── Success Stories ────────────────────────────────────────
  stories: [
    {
      id: 'mridul',
      name: 'Mridul',
      startup: 'Umoni (Founder)',
      photo: null,
      excerpt:
        'AIC Selco Foundation incubee Mridul secured a grant of 9.7 Lakhs using Doer\'s growth modules.',
      fullStory:
        "As a young entrepreneur incubated at AIC Selco Foundation, I was always looking for ways to take my business to the next level. That's when I discovered Doer Global, the expert support service provider and knowledge partner for AIC Selco Foundation, and their Sustainable Business Plan for Growth modules and frameworks. The information I learned from their platform was invaluable, and I was able to apply it to my business plan. I pitched my plan to my incubated center's funding team and was thrilled to be selected for a grant of 9.7 lakhs! If you're serious about building a successful business, I highly recommend their platform and services. - Mridul.",
    },
    {
      id: 'saruj',
      name: 'Saruj',
      startup: 'Aicheng Innovation (Founder)',
      photo: null,
      excerpt:
        'Saruj raised INR 1.5 Cr and secured all-India rank 3 in BIRAC BIG 2021 with a 50 Lakhs grant.',
      fullStory:
        "To my surprise, I was selected for a prestigious grant of 50 lakhs by Birac BIG 2021 and even secured an all-India rank of 3! It's surreal to think that my experience with Doer Global and AIC Selco Foundation helped me achieve this level of success. I can't recommend their platform and services enough for anyone who is serious about building a successful business. - Saruj.",
    },
    {
      id: 'anguvika',
      name: 'Anguvika',
      startup: 'Aboriginal Energy (Founder)',
      photo: null,
      excerpt:
        'Anguvika mastered sustainable business plan frameworks and secured a 10 Lakhs grant.',
      fullStory:
        "I am extremely grateful to Doer for providing me with the opportunity to learn and master the Sustainable Business Plan for Growth and Investor Ready Pitch Deck frameworks. With their comprehensive guidance and support, I was able to create a compelling pitch that impressed the Incubated center's funding team, and secured a grant of 10 lakhs for my venture. - Anguvika",
    },
    {
      id: 'iftekar',
      name: 'Iftekar',
      startup: 'Carry Goods (Founder)',
      photo: null,
      excerpt:
        'Iftekar secured NEEDP grant with an investor pitch deck crafted by Doer Global.',
      fullStory:
        "I am thrilled to write in appreciation of Doer for creating a pitch deck that helped us secure funding for Carry Goods. The team at Doer worked tirelessly to understand our vision, and they crafted a pitch deck that was compelling, informative, and visually stunning. Doer’s commitment to sustainability and innovation is inspiring, and we are honored to have worked with such a dedicated and talented team. - Iftekar",
    },
  ],

  // ─── Team ───────────────────────────────────────────────────
  team: [
    {
      name: 'Nabajeet Kalita',
      title: 'Team Lead',
      photo: './nabajeet.jpg',
      quote:
        "Success is a team effort, and I'm proud to be part of this incredible team.",
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Abhinash Roy',
      title: 'Brand Strategist',
      photo: './Abinash.jpg',
      quote:
        'I believe in the power of storytelling to connect brands with their audience.',
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Pranav Upadhyay',
      title: 'Software Developer',
      photo: './PU.jpg',
      quote:
        "Coding is my passion, and I'm excited to contribute my skills to this project.",
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Pravesh Sarma',
      title: 'HR Manager',
      photo: './Pravesh.jpg',
      quote:
        "Coding is my passion, and I'm excited to contribute my skills to this project.",
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Kunal Bhagawati',
      title: 'Tech Advisor & Mentor',
      photo: './Kunal.jpg',
      quote:
        "Coding is my passion, and I'm excited to contribute my skills to this project.",
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Arindam Khaund',
      title: 'Business & Management Consultant',
      photo: './Arindam.jpg',
      quote:
        'Do not be embarrassed by your failures, learn from them and start again.',
      social: { linkedin: '#', twitter: '#' },
    },
  ],

  // ─── FAQ ────────────────────────────────────────────────────
  faq: [
    {
      question: 'What does Doer do?',
      answer:
        'Doer is a company that provides guidance, resources, and marketing support to new entrepreneurs and startups to help them grow their businesses.',
    },
    {
      question: 'How do I get started with Doer?',
      answer:
        "To get started with Doer, simply visit our website and sign up for an account. Once you've created an account, you can explore the available resources, access guidance materials, and start utilizing our marketing services.",
    },
    {
      question: 'How can Doer help me as a new entrepreneur/startup?',
      answer:
        'Doer can assist you in various ways. We offer personalized guidance and mentorship to help you navigate the challenges of starting and growing a business. Additionally, we provide access to a range of resources, such as business templates, market research data, and industry insights. Furthermore, our marketing services can help you promote your products or services effectively.',
    },
    {
      question: 'Is Doer only for new entrepreneurs, or can established businesses benefit as well?',
      answer:
        'While Doer primarily focuses on assisting new entrepreneurs and startups, our services can also benefit established businesses. We offer resources and marketing support that can help businesses at different stages of their growth journey.',
    },
    {
      question: 'What types of businesses does Doer cater to?',
      answer:
        "Doer caters to a wide range of businesses across various industries. Whether you're starting a tech startup, a retail business, a consulting firm, or any other type of business, our guidance and resources can be tailored to your specific needs.",
    },
    {
      question: 'Are the guidance and mentorship provided by Doer personalized?',
      answer:
        'Yes, at Doer, we believe in personalized support. Our guidance and mentorship programs are designed to address the unique challenges and goals of each entrepreneur or startup. We understand that every business is different, and we strive to provide tailored advice and assistance.',
    },
    {
      question: 'Can Doer help with funding for my business?',
      answer:
        "While Doer does not directly provide funding, we can offer guidance on different funding options and connect you with relevant resources, such as investors, grants, or crowdfunding platforms. We'll help you understand the process and increase your chances of securing funding for your business.",
    },
    {
      question: 'How can I access the marketing services offered by Doer?',
      answer:
        "Once you become a member of Doer, you'll have access to our marketing services. You can discuss your marketing needs with our team, and they will work with you to develop a customized marketing strategy. This may include social media marketing, search engine optimization (SEO), content creation, and other techniques to promote your business effectively.",
    },
  ],

  // ─── Contact ────────────────────────────────────────────────
  contact: {
    heading: "Let's Build Something Great",
    subtext:
      'Have a startup idea? Ready to take the next step? Reach out and let\u2019s start a conversation.',
    fields: ['name', 'email', 'subject', 'message'],
  },

  // ─── Footer ─────────────────────────────────────────────────
  footer: {
    description:
      'Empowering early-stage entrepreneurs with the tools, mentorship, and resources to build investor-ready ventures.',
    quickLinks: [
      { label: 'Home', href: '#home' },
      { label: 'Services', href: '#services' },
      { label: 'Stories', href: '#stories' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    services: [
      { label: 'Pitch Deck', href: '#services' },
      { label: 'Business Plan', href: '#services' },
      { label: 'Mentorship', href: '#services' },
      { label: 'Ideation Challenge', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdYXza_gDihHxcYEMmX20E6whOIrAiZndqy5zf7ceNZK7xnFw/viewform' },
      { label: 'Incubation Program', href: '#faq' },
    ],
    social: [
      { platform: 'LinkedIn', href: '#', icon: 'linkedin' },
      { platform: 'Twitter', href: '#', icon: 'twitter' },
      { platform: 'Instagram', href: '#', icon: 'instagram' },
      { platform: 'Email', href: 'mailto:hello@doer.global', icon: 'email' },
    ],
  },
};
