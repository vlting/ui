// ---------------------------------------------------------------------------
// Mock Data for Crushd Dating Example App
// ---------------------------------------------------------------------------

// ---- Profiles ----
export interface MockProfile {
  id: string
  name: string
  age: number
  bio: string
  distance: string
  photos: string[]
  interests: string[]
  location: string
  occupation: string
  verified: boolean
  prompts: { question: string; answer: string }[]
}

export const PROFILES: MockProfile[] = [
  {
    id: 'p-01',
    name: 'Amara Okafor',
    age: 26,
    bio: 'Product designer by day, amateur ceramicist by night. I will judge you by your bookshelf.',
    distance: '2 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-01-a',
      'https://i.pravatar.cc/400?u=p-01-b',
    ],
    interests: ['Ceramics', 'Design', 'Reading', 'Vinyl Records'],
    location: 'Brooklyn, NY',
    occupation: 'Product Designer at Figma',
    verified: true,
    prompts: [
      {
        question: 'The way to win me over is',
        answer:
          'Show up with a book recommendation I haven\'t heard of. Bonus points if it\'s not Murakami.',
      },
      {
        question: 'A life goal of mine',
        answer:
          'Open a tiny ceramics studio with a coffee bar attached. Working title: "Mud & Mugs."',
      },
    ],
  },
  {
    id: 'p-02',
    name: 'Kai Nakamura',
    age: 29,
    bio: 'Former line cook turned software engineer. Still think in mise en place.',
    distance: '4 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-02-a',
      'https://i.pravatar.cc/400?u=p-02-b',
      'https://i.pravatar.cc/400?u=p-02-c',
    ],
    interests: ['Cooking', 'Rock Climbing', 'Espresso', 'Open Source'],
    location: 'Williamsburg, NY',
    occupation: 'Software Engineer',
    verified: true,
    prompts: [
      {
        question: 'My most irrational fear',
        answer: 'That my sourdough starter will die while I\'m on vacation and haunt me forever.',
      },
      {
        question: 'I geek out on',
        answer:
          'Pour-over ratios. I have a spreadsheet. Yes, it has conditional formatting.',
      },
      {
        question: 'Together, we could',
        answer: 'Open a popup restaurant that only serves elevated comfort food at 1 AM.',
      },
    ],
  },
  {
    id: 'p-03',
    name: 'Sofia Reyes',
    age: 24,
    bio: 'Muralist and chronic plant collector. My apartment has better lighting than most galleries.',
    distance: '1 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-03-a',
      'https://i.pravatar.cc/400?u=p-03-b',
    ],
    interests: ['Street Art', 'Yoga', 'Thrifting', 'Mezcal', 'Plants'],
    location: 'Lower East Side, NY',
    occupation: 'Freelance Muralist',
    verified: false,
    prompts: [
      {
        question: 'I\'m looking for',
        answer:
          'Someone who will sit on the fire escape with me and pretend we\'re in a movie.',
      },
      {
        question: 'My simple pleasures',
        answer: 'Golden hour, a fresh sketchbook, and a mezcal margarita with sal de gusano.',
      },
    ],
  },
  {
    id: 'p-04',
    name: 'Marcus Williams',
    age: 31,
    bio: 'High school basketball coach who still thinks he can dunk. Narrator: he cannot.',
    distance: '6 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-04-a',
      'https://i.pravatar.cc/400?u=p-04-b',
      'https://i.pravatar.cc/400?u=p-04-c',
    ],
    interests: ['Basketball', 'Board Games', 'Jazz', 'Grilling'],
    location: 'Harlem, NY',
    occupation: 'Basketball Coach & PE Teacher',
    verified: true,
    prompts: [
      {
        question: 'The way to win me over is',
        answer: 'Beat me at Catan. Actually, just be willing to play Catan.',
      },
      {
        question: 'I\'m convinced that',
        answer: 'The best conversations happen while grilling. Something about tending the flame.',
      },
      {
        question: 'My love language is',
        answer: 'Acts of service\u2014specifically, rebounding for me at the park.',
      },
    ],
  },
  {
    id: 'p-05',
    name: 'Priya Sharma',
    age: 27,
    bio: 'ER nurse with a dark sense of humor and a golden retriever named Doug.',
    distance: '3 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-05-a',
      'https://i.pravatar.cc/400?u=p-05-b',
    ],
    interests: ['Running', 'True Crime', 'Baking', 'Dogs', 'Karaoke'],
    location: 'Astoria, NY',
    occupation: 'Emergency Room Nurse',
    verified: true,
    prompts: [
      {
        question: 'My most irrational fear',
        answer: 'That one day Doug will love someone else more than me. I can\'t compete.',
      },
      {
        question: 'A life goal of mine',
        answer: 'Run the NYC marathon, then immediately eat an entire pizza. In that order.',
      },
    ],
  },
  {
    id: 'p-06',
    name: 'Liam O\'Brien',
    age: 33,
    bio: 'Documentary filmmaker. Currently making a film about competitive crossword solvers. It\'s riveting, I swear.',
    distance: '5 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-06-a',
      'https://i.pravatar.cc/400?u=p-06-b',
    ],
    interests: ['Film', 'Crosswords', 'Hiking', 'Craft Beer'],
    location: 'Park Slope, NY',
    occupation: 'Documentary Filmmaker',
    verified: false,
    prompts: [
      {
        question: 'I geek out on',
        answer:
          'Obscure documentaries. If it screened at one festival in 2014 and has 12 Letterboxd reviews, I\'ve seen it.',
      },
      {
        question: 'Together, we could',
        answer: 'Go to a random film festival in a city neither of us has visited.',
      },
    ],
  },
  {
    id: 'p-07',
    name: 'Zara Chen',
    age: 25,
    bio: 'Architectural grad student surviving on espresso and sheer delusion. Send structural support.',
    distance: '2 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-07-a',
      'https://i.pravatar.cc/400?u=p-07-b',
      'https://i.pravatar.cc/400?u=p-07-c',
    ],
    interests: ['Architecture', 'Photography', 'Ramen', 'Skateboarding', 'Zines'],
    location: 'Bushwick, NY',
    occupation: 'Architecture Grad Student',
    verified: true,
    prompts: [
      {
        question: 'I\'m looking for',
        answer: 'Someone who appreciates a good building as much as a good sunset.',
      },
      {
        question: 'My simple pleasures',
        answer:
          'Skating to the bodega at midnight for a chopped cheese and an Arizona iced tea.',
      },
      {
        question: 'The way to win me over is',
        answer: 'Bring me coffee during finals week. That\'s it. That\'s the whole answer.',
      },
    ],
  },
  {
    id: 'p-08',
    name: 'Mateo Alvarez',
    age: 28,
    bio: 'Sommelier at a natural wine bar. Yes, I will pair a wine with your mood.',
    distance: '3 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-08-a',
      'https://i.pravatar.cc/400?u=p-08-b',
    ],
    interests: ['Wine', 'Salsa Dancing', 'Poetry', 'Cycling'],
    location: 'East Village, NY',
    occupation: 'Sommelier',
    verified: true,
    prompts: [
      {
        question: 'I\'m convinced that',
        answer:
          'Everyone has a wine that matches their personality. Most people are a funky orange from the Jura.',
      },
      {
        question: 'My love language is',
        answer:
          'Pouring you the last glass from a bottle we\'ll never find again.',
      },
    ],
  },
  {
    id: 'p-09',
    name: 'Nia Jackson',
    age: 30,
    bio: 'Music journalist who will absolutely make you a playlist before the second date.',
    distance: '4 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-09-a',
      'https://i.pravatar.cc/400?u=p-09-b',
    ],
    interests: ['Music', 'Writing', 'Vintage Fashion', 'Roller Skating'],
    location: 'Bed-Stuy, NY',
    occupation: 'Music Journalist at Pitchfork',
    verified: true,
    prompts: [
      {
        question: 'The way to win me over is',
        answer:
          'Send me a song I\'ve never heard that makes me feel something. Spotify links only, no SoundCloud DJs.',
      },
      {
        question: 'I geek out on',
        answer:
          'The history of girl groups. I have a 40-minute presentation. You\'ve been warned.',
      },
    ],
  },
  {
    id: 'p-10',
    name: 'Ethan Park',
    age: 34,
    bio: 'Pediatric dentist. Yes, I floss. No, I won\'t lecture you about it. (Okay, maybe a little.)',
    distance: '7 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-10-a',
      'https://i.pravatar.cc/400?u=p-10-b',
    ],
    interests: ['Tennis', 'Cooking', 'Dad Jokes', 'Puzzles'],
    location: 'UWS, NY',
    occupation: 'Pediatric Dentist',
    verified: true,
    prompts: [
      {
        question: 'My most irrational fear',
        answer:
          'Getting a cavity myself. The irony would be too much for my colleagues to handle.',
      },
      {
        question: 'Together, we could',
        answer:
          'Become the couple that hosts game nights. I already have the cheese board.',
      },
    ],
  },
  {
    id: 'p-11',
    name: 'Luna Petrov',
    age: 22,
    bio: 'Tattoo apprentice and part-time barista. I draw on people and make their coffee\u2014basically a Renaissance woman.',
    distance: '2 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-11-a',
      'https://i.pravatar.cc/400?u=p-11-b',
      'https://i.pravatar.cc/400?u=p-11-c',
    ],
    interests: ['Tattooing', 'Illustration', 'Horror Movies', 'Tarot', 'Coffee'],
    location: 'Greenpoint, NY',
    occupation: 'Tattoo Apprentice',
    verified: false,
    prompts: [
      {
        question: 'I\'m looking for',
        answer:
          'Someone brave enough to let me practice my flash designs on them. I\'m actually good, I promise.',
      },
      {
        question: 'My simple pleasures',
        answer: 'Sunday morning, a horror movie, and a sketchpad. Silence optional.',
      },
    ],
  },
  {
    id: 'p-12',
    name: 'Darius Thompson',
    age: 36,
    bio: 'Architectural salvage dealer. My apartment is 40% reclaimed wood and 60% stories about reclaimed wood.',
    distance: '8 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-12-a',
      'https://i.pravatar.cc/400?u=p-12-b',
    ],
    interests: ['Antiques', 'Woodworking', 'Soul Food', 'Jazz', 'Road Trips'],
    location: 'Red Hook, NY',
    occupation: 'Architectural Salvage Dealer',
    verified: true,
    prompts: [
      {
        question: 'I\'m convinced that',
        answer:
          'Every old building has a ghost, and that ghost has excellent taste in crown molding.',
      },
      {
        question: 'A life goal of mine',
        answer:
          'Buy a crumbling farmhouse upstate and spend 10 years lovingly restoring it. Already have the overalls.',
      },
      {
        question: 'My love language is',
        answer: 'Finding you the perfect vintage thing you didn\'t know you needed.',
      },
    ],
  },
  {
    id: 'p-13',
    name: 'Ingrid Larsson',
    age: 29,
    bio: 'Pastry chef with strong opinions about lamination and a sourdough starter older than most relationships.',
    distance: '5 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-13-a',
      'https://i.pravatar.cc/400?u=p-13-b',
    ],
    interests: ['Baking', 'Fermentation', 'Scandi Design', 'Cross-Country Skiing'],
    location: 'Cobble Hill, NY',
    occupation: 'Pastry Chef',
    verified: true,
    prompts: [
      {
        question: 'The way to win me over is',
        answer:
          'Honestly just eat what I bake and make that little involuntary happy noise. That\'s all I need.',
      },
      {
        question: 'I geek out on',
        answer:
          'Bread science. Ask me about autolyse and watch me talk for 45 minutes straight.',
      },
    ],
  },
  {
    id: 'p-14',
    name: 'Amir Hassan',
    age: 32,
    bio: 'Civil rights attorney by day. Stand-up comedy open-mic-er by night. Objection: my dating life.',
    distance: '3 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-14-a',
      'https://i.pravatar.cc/400?u=p-14-b',
      'https://i.pravatar.cc/400?u=p-14-c',
    ],
    interests: ['Comedy', 'Law', 'Poker', 'Basketball', 'Oud Music'],
    location: 'Fort Greene, NY',
    occupation: 'Civil Rights Attorney',
    verified: true,
    prompts: [
      {
        question: 'My most irrational fear',
        answer:
          'Bombing at an open mic in front of someone I\'m trying to impress. It has happened. Twice.',
      },
      {
        question: 'Together, we could',
        answer:
          'Go to a comedy show, roast each other on the way home, and get dollar pizza at 2 AM.',
      },
    ],
  },
  {
    id: 'p-15',
    name: 'Camille Dubois',
    age: 27,
    bio: 'Museum curator who treats every flea market trip like an archaeological dig.',
    distance: '4 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-15-a',
      'https://i.pravatar.cc/400?u=p-15-b',
    ],
    interests: ['Art History', 'Flea Markets', 'French Cinema', 'Perfume'],
    location: 'West Village, NY',
    occupation: 'Associate Curator, Met Breuer',
    verified: true,
    prompts: [
      {
        question: 'I\'m looking for',
        answer:
          'Someone who can spend three hours in a museum without checking their phone once.',
      },
      {
        question: 'My simple pleasures',
        answer:
          'A rainy afternoon, a Rohmer film, and a glass of something French.',
      },
      {
        question: 'I\'m convinced that',
        answer:
          'You can tell everything about a person by what they stop to look at in a museum.',
      },
    ],
  },
  {
    id: 'p-16',
    name: 'Jordan Rivera',
    age: 25,
    bio: 'UX researcher and amateur birder. I will make you download Merlin and you will thank me.',
    distance: '6 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-16-a',
      'https://i.pravatar.cc/400?u=p-16-b',
    ],
    interests: ['Birding', 'UX Research', 'Hiking', 'Podcasts', 'Pickling'],
    location: 'Prospect Heights, NY',
    occupation: 'UX Researcher',
    verified: false,
    prompts: [
      {
        question: 'I geek out on',
        answer:
          'Bird migration patterns. Did you know bar-tailed godwits fly 7,000 miles nonstop? Incredible.',
      },
      {
        question: 'The way to win me over is',
        answer:
          'Be genuinely curious about things. I don\'t care what\u2014just light up when you talk about it.',
      },
    ],
  },
  {
    id: 'p-17',
    name: 'Tessa Kowalski',
    age: 38,
    bio: 'Veterinarian and hobby beekeeper. I\'m the person your pets like more than you.',
    distance: '9 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-17-a',
      'https://i.pravatar.cc/400?u=p-17-b',
    ],
    interests: ['Animals', 'Beekeeping', 'Gardening', 'Sci-Fi Novels'],
    location: 'Carroll Gardens, NY',
    occupation: 'Veterinarian',
    verified: true,
    prompts: [
      {
        question: 'My most irrational fear',
        answer:
          'That my bees will collectively decide I\'m not worthy and relocate. A whole colony ghosting me.',
      },
      {
        question: 'A life goal of mine',
        answer:
          'Run a small animal sanctuary with a little farm stand. Eggs, honey, and maybe some goat therapy.',
      },
    ],
  },
  {
    id: 'p-18',
    name: 'Rafael Santos',
    age: 30,
    bio: 'Capoeira instructor and physical therapist. I can do a backflip but I can also fix your posture.',
    distance: '3 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-18-a',
      'https://i.pravatar.cc/400?u=p-18-b',
      'https://i.pravatar.cc/400?u=p-18-c',
    ],
    interests: ['Capoeira', 'Physical Therapy', 'Samba', 'Beach Volleyball'],
    location: 'Greenpoint, NY',
    occupation: 'Physical Therapist & Capoeira Instructor',
    verified: true,
    prompts: [
      {
        question: 'Together, we could',
        answer:
          'Take a random dance class every month. Salsa, swing, voguing\u2014I don\'t care, let\'s be bad at it together.',
      },
      {
        question: 'My love language is',
        answer:
          'Stretching together. Hear me out\u2014it\'s intimate, it\'s healthy, it\'s severely underrated.',
      },
    ],
  },
  {
    id: 'p-19',
    name: 'Yuki Tanaka',
    age: 26,
    bio: 'Game designer working on a cozy farming sim. My real farm is 47 houseplants in a railroad apartment.',
    distance: '1 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-19-a',
      'https://i.pravatar.cc/400?u=p-19-b',
    ],
    interests: ['Game Design', 'Pixel Art', 'Houseplants', 'Anime', 'Ramen'],
    location: 'East Williamsburg, NY',
    occupation: 'Indie Game Designer',
    verified: false,
    prompts: [
      {
        question: 'I\'m looking for',
        answer:
          'A co-op partner for life. Must be okay with me naming our farm animals after anime characters.',
      },
      {
        question: 'My simple pleasures',
        answer:
          'Watering my plants on a Sunday morning while a Studio Ghibli soundtrack plays. Peak existence.',
      },
      {
        question: 'I geek out on',
        answer:
          'Game feel. The tiny screen-shake when you hit something in Celeste? That\'s like a religious experience.',
      },
    ],
  },
  {
    id: 'p-20',
    name: 'Noor Al-Rashid',
    age: 28,
    bio: 'Astrophysicist who can explain black holes but not why I\'m still single. Priorities.',
    distance: '5 mi',
    photos: [
      'https://i.pravatar.cc/400?u=p-20-a',
      'https://i.pravatar.cc/400?u=p-20-b',
    ],
    interests: ['Astronomy', 'Sci-Fi', 'Tea Ceremonies', 'Chess', 'Calligraphy'],
    location: 'Morningside Heights, NY',
    occupation: 'Astrophysicist, Columbia University',
    verified: true,
    prompts: [
      {
        question: 'I\'m convinced that',
        answer:
          'The universe is too beautiful to be an accident, and so is a really good cup of tea.',
      },
      {
        question: 'The way to win me over is',
        answer:
          'Ask me a question I can\'t answer. Seriously. Intellectual humility is the most attractive quality.',
      },
    ],
  },
]

// ---- Pod ----
export interface MockPodMember {
  profileId: string
  matchStatus: 'none' | 'sent' | 'received' | 'mutual'
  joinedAt: string
}

export interface MockPod {
  id: string
  name: string
  startDate: string
  endDate: string
  members: MockPodMember[]
}

export const POD: MockPod = {
  id: 'pod-12',
  name: 'Week 12 \u2014 Starlight Pod',
  startDate: '2026-02-16',
  endDate: '2026-02-22',
  members: [
    { profileId: 'p-01', matchStatus: 'mutual', joinedAt: '2026-02-16T08:12:00Z' },
    { profileId: 'p-02', matchStatus: 'sent', joinedAt: '2026-02-16T08:30:00Z' },
    { profileId: 'p-03', matchStatus: 'received', joinedAt: '2026-02-16T09:05:00Z' },
    { profileId: 'p-04', matchStatus: 'none', joinedAt: '2026-02-16T09:22:00Z' },
    { profileId: 'p-05', matchStatus: 'mutual', joinedAt: '2026-02-16T10:01:00Z' },
    { profileId: 'p-06', matchStatus: 'sent', joinedAt: '2026-02-16T10:45:00Z' },
    { profileId: 'p-07', matchStatus: 'received', joinedAt: '2026-02-16T11:15:00Z' },
    { profileId: 'p-08', matchStatus: 'none', joinedAt: '2026-02-16T12:00:00Z' },
  ],
}

// ---- Activities ----
export interface MockIceBreaker {
  id: string
  day: number
  prompt: string
  responses: { profileId: string; text: string; timestamp: string }[]
}

export interface MockQuiz {
  id: string
  day: number
  question: string
  options: { id: string; text: string }[]
  votes: { profileId: string; optionId: string }[]
}

export const ICE_BREAKERS: MockIceBreaker[] = [
  {
    id: 'ib-1',
    day: 1,
    prompt: 'What song has been stuck in your head this week?',
    responses: [
      { profileId: 'p-01', text: 'Tinashe \u2014 Nasty. I\'m not sorry.', timestamp: '2026-02-16T14:00:00Z' },
      { profileId: 'p-03', text: 'That one Clairo song that sounds like a warm bath.', timestamp: '2026-02-16T14:22:00Z' },
      { profileId: 'p-05', text: 'The Jeopardy theme because my life is a daily double.', timestamp: '2026-02-16T15:10:00Z' },
      { profileId: 'p-07', text: 'Khruangbin \u2014 Friday Morning. Permanent rotation.', timestamp: '2026-02-16T15:45:00Z' },
      { profileId: 'p-08', text: 'Something by Rosalia that I can\'t pronounce but absolutely feel.', timestamp: '2026-02-16T16:30:00Z' },
    ],
  },
  {
    id: 'ib-2',
    day: 2,
    prompt: 'Describe your ideal lazy Sunday in exactly 10 words.',
    responses: [
      { profileId: 'p-02', text: 'Coffee, crossword, park, nap, cook, wine, movie, couch, sleep, repeat.', timestamp: '2026-02-17T10:00:00Z' },
      { profileId: 'p-04', text: 'Sleep in, ball at the park, grill, jazz, chill.', timestamp: '2026-02-17T11:15:00Z' },
      { profileId: 'p-06', text: 'Film, brunch, long walk, bookshop, cooking, beer, documentary, bed.', timestamp: '2026-02-17T12:30:00Z' },
      { profileId: 'p-01', text: 'Studio, clay, music, coffee, farmers market, sunset, rooftop, peace.', timestamp: '2026-02-17T13:00:00Z' },
    ],
  },
  {
    id: 'ib-3',
    day: 3,
    prompt: 'What\'s the most niche hill you will die on?',
    responses: [
      { profileId: 'p-05', text: 'Oat milk is NOT a personality trait. Controversial, I know.', timestamp: '2026-02-18T09:30:00Z' },
      { profileId: 'p-07', text: 'Brutalist architecture is beautiful and I will not be taking questions.', timestamp: '2026-02-18T10:45:00Z' },
      { profileId: 'p-08', text: 'Wine glasses should never go in the dishwasher. I will hand wash until I die.', timestamp: '2026-02-18T11:20:00Z' },
      { profileId: 'p-02', text: 'Instant ramen is a legitimate canvas for culinary expression.', timestamp: '2026-02-18T12:00:00Z' },
      { profileId: 'p-03', text: 'Every apartment needs at least one plant taller than you.', timestamp: '2026-02-18T14:10:00Z' },
      { profileId: 'p-06', text: 'Letterboxd ratings are more trustworthy than Rotten Tomatoes. Always.', timestamp: '2026-02-18T16:00:00Z' },
    ],
  },
  {
    id: 'ib-4',
    day: 4,
    prompt: 'If you could only eat one cuisine for a year, what would it be?',
    responses: [
      { profileId: 'p-01', text: 'West African. Jollof rice alone could sustain me spiritually.', timestamp: '2026-02-19T10:00:00Z' },
      { profileId: 'p-04', text: 'Southern BBQ. Brisket is a love language.', timestamp: '2026-02-19T10:30:00Z' },
      { profileId: 'p-08', text: 'Japanese. The range from ramen to kaiseki\u2014it\'s infinite.', timestamp: '2026-02-19T11:15:00Z' },
      { profileId: 'p-02', text: 'Thai. I need that balance of sweet, sour, salty, and spicy to feel alive.', timestamp: '2026-02-19T12:00:00Z' },
    ],
  },
  {
    id: 'ib-5',
    day: 5,
    prompt: 'What\'s something you\'re weirdly proud of?',
    responses: [
      { profileId: 'p-03', text: 'I\'ve kept a fern alive for 3 years. That\'s a fern. They\'re supposed to die.', timestamp: '2026-02-20T09:00:00Z' },
      { profileId: 'p-06', text: 'I finished the NYT crossword in under 8 minutes once and told everyone I know.', timestamp: '2026-02-20T10:30:00Z' },
      { profileId: 'p-05', text: 'I can draw blood on the first try 98% of the time. Patients love me.', timestamp: '2026-02-20T11:45:00Z' },
      { profileId: 'p-07', text: 'My thesis model didn\'t collapse. Low bar? Maybe. But it was load-bearing.', timestamp: '2026-02-20T13:00:00Z' },
      { profileId: 'p-01', text: 'I glazed a perfect celadon on my first try. My ceramics teacher was suspicious.', timestamp: '2026-02-20T14:30:00Z' },
    ],
  },
  {
    id: 'ib-6',
    day: 6,
    prompt: 'What\'s the best date you\'ve ever been on (real or imaginary)?',
    responses: [
      { profileId: 'p-08', text: 'We snuck into a vineyard at sunset in the Languedoc. Accidentally. I think.', timestamp: '2026-02-21T10:00:00Z' },
      { profileId: 'p-02', text: 'Cooking class in Oaxaca where we made mole from scratch. Took 6 hours. Worth every minute.', timestamp: '2026-02-21T11:00:00Z' },
      { profileId: 'p-04', text: 'Pickup basketball in the rain. She crossed me over. I fell. I was smitten.', timestamp: '2026-02-21T12:30:00Z' },
    ],
  },
  {
    id: 'ib-7',
    day: 7,
    prompt: 'What would your friends say is your most lovable flaw?',
    responses: [
      { profileId: 'p-01', text: 'I plan everything. Spontaneous people find me exhausting but my itineraries slap.', timestamp: '2026-02-22T09:00:00Z' },
      { profileId: 'p-05', text: 'I adopt every stray animal I see. My apartment has a revolving door policy.', timestamp: '2026-02-22T10:15:00Z' },
      { profileId: 'p-07', text: 'I photograph every building I walk past. Dates with me take 3x longer.', timestamp: '2026-02-22T11:00:00Z' },
      { profileId: 'p-03', text: 'I buy plants instead of dealing with my emotions. My therapist and my monstera both know this.', timestamp: '2026-02-22T12:30:00Z' },
      { profileId: 'p-06', text: 'I turn everything into a documentary pitch. "Imagine this, but with a voiceover..."', timestamp: '2026-02-22T14:00:00Z' },
      { profileId: 'p-08', text: 'I describe wine like it\'s a person. "This one is brooding but approachable."', timestamp: '2026-02-22T15:30:00Z' },
    ],
  },
]

export const QUIZZES: MockQuiz[] = [
  {
    id: 'q-1',
    day: 1,
    question: 'What\'s the biggest green flag on a first date?',
    options: [
      { id: 'q1-a', text: 'They ask the waiter\'s name' },
      { id: 'q1-b', text: 'They put their phone face down' },
      { id: 'q1-c', text: 'They suggest splitting dessert' },
      { id: 'q1-d', text: 'They have a dog photo ready to show' },
    ],
    votes: [
      { profileId: 'p-01', optionId: 'q1-a' },
      { profileId: 'p-02', optionId: 'q1-b' },
      { profileId: 'p-03', optionId: 'q1-d' },
      { profileId: 'p-04', optionId: 'q1-a' },
      { profileId: 'p-05', optionId: 'q1-d' },
      { profileId: 'p-07', optionId: 'q1-b' },
      { profileId: 'p-08', optionId: 'q1-c' },
    ],
  },
  {
    id: 'q-2',
    day: 2,
    question: 'Ideal second date?',
    options: [
      { id: 'q2-a', text: 'Cook dinner together' },
      { id: 'q2-b', text: 'Museum + coffee' },
      { id: 'q2-c', text: 'Hike with a picnic' },
      { id: 'q2-d', text: 'Live music show' },
    ],
    votes: [
      { profileId: 'p-01', optionId: 'q2-b' },
      { profileId: 'p-02', optionId: 'q2-a' },
      { profileId: 'p-03', optionId: 'q2-b' },
      { profileId: 'p-04', optionId: 'q2-c' },
      { profileId: 'p-05', optionId: 'q2-d' },
      { profileId: 'p-06', optionId: 'q2-d' },
      { profileId: 'p-08', optionId: 'q2-a' },
    ],
  },
  {
    id: 'q-3',
    day: 3,
    question: 'Biggest dating app pet peeve?',
    options: [
      { id: 'q3-a', text: 'Fish photos' },
      { id: 'q3-b', text: '"Just ask" as a bio' },
      { id: 'q3-c', text: 'Group photos where you can\'t tell who\'s who' },
    ],
    votes: [
      { profileId: 'p-01', optionId: 'q3-b' },
      { profileId: 'p-02', optionId: 'q3-c' },
      { profileId: 'p-03', optionId: 'q3-b' },
      { profileId: 'p-05', optionId: 'q3-a' },
      { profileId: 'p-06', optionId: 'q3-c' },
      { profileId: 'p-07', optionId: 'q3-b' },
      { profileId: 'p-08', optionId: 'q3-a' },
    ],
  },
  {
    id: 'q-4',
    day: 4,
    question: 'You\'re making a playlist for a road trip date. First song?',
    options: [
      { id: 'q4-a', text: 'Frank Ocean \u2014 Ivy' },
      { id: 'q4-b', text: 'Fleetwood Mac \u2014 Dreams' },
      { id: 'q4-c', text: 'Bad Bunny \u2014 Dakiti' },
      { id: 'q4-d', text: 'Tame Impala \u2014 Let It Happen' },
    ],
    votes: [
      { profileId: 'p-01', optionId: 'q4-a' },
      { profileId: 'p-02', optionId: 'q4-d' },
      { profileId: 'p-03', optionId: 'q4-c' },
      { profileId: 'p-04', optionId: 'q4-b' },
      { profileId: 'p-05', optionId: 'q4-a' },
      { profileId: 'p-07', optionId: 'q4-d' },
    ],
  },
  {
    id: 'q-5',
    day: 5,
    question: 'Honesty hour: how long do you wait to text back?',
    options: [
      { id: 'q5-a', text: 'Immediately. Life is short.' },
      { id: 'q5-b', text: '30 min to seem chill' },
      { id: 'q5-c', text: 'I genuinely forget and then panic at 2 AM' },
    ],
    votes: [
      { profileId: 'p-01', optionId: 'q5-a' },
      { profileId: 'p-02', optionId: 'q5-c' },
      { profileId: 'p-04', optionId: 'q5-b' },
      { profileId: 'p-05', optionId: 'q5-a' },
      { profileId: 'p-06', optionId: 'q5-c' },
      { profileId: 'p-07', optionId: 'q5-c' },
      { profileId: 'p-08', optionId: 'q5-b' },
    ],
  },
  {
    id: 'q-6',
    day: 6,
    question: 'What\'s the best way to recover from an awkward silence?',
    options: [
      { id: 'q6-a', text: 'Lean into it. Comfortable silence is a vibe.' },
      { id: 'q6-b', text: '"So\u2026 do you have any pets?"' },
      { id: 'q6-c', text: 'Show them a meme on your phone' },
      { id: 'q6-d', text: 'Order another round' },
    ],
    votes: [
      { profileId: 'p-01', optionId: 'q6-a' },
      { profileId: 'p-03', optionId: 'q6-c' },
      { profileId: 'p-04', optionId: 'q6-d' },
      { profileId: 'p-05', optionId: 'q6-b' },
      { profileId: 'p-06', optionId: 'q6-a' },
      { profileId: 'p-08', optionId: 'q6-d' },
    ],
  },
  {
    id: 'q-7',
    day: 7,
    question: 'The "ick" that isn\'t actually an ick:',
    options: [
      { id: 'q7-a', text: 'Being really into their hobby' },
      { id: 'q7-b', text: 'Double-texting' },
      { id: 'q7-c', text: 'Crying at movies' },
      { id: 'q7-d', text: 'Having a detailed skincare routine' },
    ],
    votes: [
      { profileId: 'p-01', optionId: 'q7-a' },
      { profileId: 'p-02', optionId: 'q7-c' },
      { profileId: 'p-03', optionId: 'q7-b' },
      { profileId: 'p-04', optionId: 'q7-c' },
      { profileId: 'p-05', optionId: 'q7-a' },
      { profileId: 'p-06', optionId: 'q7-c' },
      { profileId: 'p-07', optionId: 'q7-d' },
      { profileId: 'p-08', optionId: 'q7-a' },
    ],
  },
]

// ---- Conversations ----
export interface MockMessage {
  id: string
  senderId: string // 'me' or a profile id
  text: string
  timestamp: string
}

export interface MockConversation {
  id: string
  profileId: string
  messages: MockMessage[]
}

export const CONVERSATIONS: MockConversation[] = [
  {
    id: 'conv-01',
    profileId: 'p-01',
    messages: [
      { id: 'm-01-1', senderId: 'me', text: 'Okay your ceramics are incredible. Do you do commissions or should I just admire from afar?', timestamp: '2026-02-18T19:00:00Z' },
      { id: 'm-01-2', senderId: 'p-01', text: 'Admire from afar is my preferred love language tbh', timestamp: '2026-02-18T19:03:00Z' },
      { id: 'm-01-3', senderId: 'p-01', text: 'But also yes I do commissions. What were you thinking?', timestamp: '2026-02-18T19:03:30Z' },
      { id: 'm-01-4', senderId: 'me', text: 'I was thinking a mug that says "this meeting could have been an email"', timestamp: '2026-02-18T19:05:00Z' },
      { id: 'm-01-5', senderId: 'p-01', text: 'A person of taste. I can do that. But you have to come pick it up at my studio.', timestamp: '2026-02-18T19:06:00Z' },
      { id: 'm-01-6', senderId: 'me', text: 'Is that a date or a transaction?', timestamp: '2026-02-18T19:07:00Z' },
      { id: 'm-01-7', senderId: 'p-01', text: 'Why not both? I\u2019ll throw in a coffee.', timestamp: '2026-02-18T19:08:00Z' },
      { id: 'm-01-8', senderId: 'me', text: 'Deal. When works?', timestamp: '2026-02-18T19:09:00Z' },
      { id: 'm-01-9', senderId: 'p-01', text: 'Saturday afternoon? I\u2019ll be glazing all day anyway.', timestamp: '2026-02-18T19:11:00Z' },
      { id: 'm-01-10', senderId: 'me', text: 'Perfect. See you then \u2728', timestamp: '2026-02-18T19:12:00Z' },
    ],
  },
  {
    id: 'conv-02',
    profileId: 'p-05',
    messages: [
      { id: 'm-02-1', senderId: 'p-05', text: 'Your ice breaker answer about the crossword made me laugh out loud at work. In the ER. During a code blue.', timestamp: '2026-02-19T08:30:00Z' },
      { id: 'm-02-2', senderId: 'me', text: 'I feel like I should apologize but also I\u2019m kind of proud?', timestamp: '2026-02-19T08:35:00Z' },
      { id: 'm-02-3', senderId: 'p-05', text: 'Don\u2019t worry, the patient was fine. My attending gave me a look though.', timestamp: '2026-02-19T08:37:00Z' },
      { id: 'm-02-4', senderId: 'me', text: 'So\u2026 Doug. I need to know everything about Doug.', timestamp: '2026-02-19T08:40:00Z' },
      { id: 'm-02-5', senderId: 'p-05', text: 'I thought you\u2019d never ask. Doug is a 4-year-old golden retriever who thinks he\u2019s a lap dog. He\u2019s 80 pounds.', timestamp: '2026-02-19T08:42:00Z' },
      { id: 'm-02-6', senderId: 'me', text: 'Doug sounds like exactly the kind of chaotic energy I need in my life', timestamp: '2026-02-19T08:45:00Z' },
      { id: 'm-02-7', senderId: 'p-05', text: 'He\u2019s at the dog park in Astoria most evenings around 6 if you want to meet him. He\u2019s very judgmental but in a loving way.', timestamp: '2026-02-19T08:48:00Z' },
      { id: 'm-02-8', senderId: 'me', text: 'Are you inviting me to meet your dog before we\u2019ve even had coffee?', timestamp: '2026-02-19T08:50:00Z' },
      { id: 'm-02-9', senderId: 'p-05', text: 'Doug\u2019s approval is non-negotiable. Consider it a screening process.', timestamp: '2026-02-19T08:52:00Z' },
    ],
  },
  {
    id: 'conv-03',
    profileId: 'p-02',
    messages: [
      { id: 'm-03-1', senderId: 'me', text: 'A software engineer who used to be a line cook is basically my dream collab partner for a food tech startup', timestamp: '2026-02-17T20:00:00Z' },
      { id: 'm-03-2', senderId: 'p-02', text: 'Are you pitching me or flirting with me?', timestamp: '2026-02-17T20:05:00Z' },
      { id: 'm-03-3', senderId: 'me', text: 'Can\u2019t it be both?', timestamp: '2026-02-17T20:06:00Z' },
      { id: 'm-03-4', senderId: 'p-02', text: 'I\u2019ll allow it. What\u2019s the elevator pitch?', timestamp: '2026-02-17T20:08:00Z' },
      { id: 'm-03-5', senderId: 'me', text: 'An app that pairs recipes with your exact pantry inventory. Basically Shazam but for "what do I make with these random ingredients"', timestamp: '2026-02-17T20:10:00Z' },
      { id: 'm-03-6', senderId: 'p-02', text: 'That\u2019s\u2026 actually not terrible. I was expecting something about blockchain sushi.', timestamp: '2026-02-17T20:12:00Z' },
      { id: 'm-03-7', senderId: 'me', text: 'Blockchain sushi is my Series B pivot, obviously', timestamp: '2026-02-17T20:13:00Z' },
    ],
  },
  {
    id: 'conv-04',
    profileId: 'p-07',
    messages: [
      { id: 'm-04-1', senderId: 'p-07', text: 'I saw you liked brutalist buildings in your quiz answer. Bold stance.', timestamp: '2026-02-20T18:00:00Z' },
      { id: 'm-04-2', senderId: 'me', text: 'I said I appreciate all architecture! But yes brutalism has a raw honesty to it', timestamp: '2026-02-20T18:05:00Z' },
      { id: 'm-04-3', senderId: 'p-07', text: 'Okay you\u2019re officially interesting. Most people just say "ew concrete."', timestamp: '2026-02-20T18:07:00Z' },
      { id: 'm-04-4', senderId: 'me', text: 'Those people have never stood inside the Barbican and felt something', timestamp: '2026-02-20T18:09:00Z' },
      { id: 'm-04-5', senderId: 'p-07', text: 'THE BARBICAN. Okay we need to get a drink immediately.', timestamp: '2026-02-20T18:10:00Z' },
      { id: 'm-04-6', senderId: 'me', text: 'Name the place. As long as it has interesting ceiling beams or exposed ductwork, I\u2019m there.', timestamp: '2026-02-20T18:12:00Z' },
      { id: 'm-04-7', senderId: 'p-07', text: 'There\u2019s a bar in Bushwick that\u2019s in a converted boiler room. Concrete everywhere. You\u2019ll love it.', timestamp: '2026-02-20T18:14:00Z' },
      { id: 'm-04-8', senderId: 'me', text: 'Friday?', timestamp: '2026-02-20T18:15:00Z' },
      { id: 'm-04-9', senderId: 'p-07', text: 'Friday.', timestamp: '2026-02-20T18:15:30Z' },
    ],
  },
]

// ---- Connections ----
export interface MockConnection {
  id: string
  profileId: string
  matchedAt: string
  lastMessage?: string
  lastMessageTime?: string
  unread: boolean
}

export const CONNECTIONS: MockConnection[] = [
  {
    id: 'conn-01',
    profileId: 'p-09',
    matchedAt: '2026-02-10T14:00:00Z',
    lastMessage: 'I made you a playlist btw. 37 songs. Too much? Maybe.',
    lastMessageTime: '2026-02-19T22:30:00Z',
    unread: true,
  },
  {
    id: 'conn-02',
    profileId: 'p-10',
    matchedAt: '2026-02-08T11:00:00Z',
    lastMessage: 'Game night this Saturday\u2014my place? I\u2019ll bring the cheese board.',
    lastMessageTime: '2026-02-18T19:00:00Z',
    unread: false,
  },
  {
    id: 'conn-03',
    profileId: 'p-11',
    matchedAt: '2026-02-12T16:00:00Z',
    lastMessage: 'Okay I designed a flash piece inspired by your vibe. Want to see?',
    lastMessageTime: '2026-02-20T10:15:00Z',
    unread: true,
  },
  {
    id: 'conn-04',
    profileId: 'p-12',
    matchedAt: '2026-02-05T09:30:00Z',
    lastMessage: 'Found a 1920s door knocker shaped like a lion. Thought of you for some reason.',
    lastMessageTime: '2026-02-17T15:45:00Z',
    unread: false,
  },
  {
    id: 'conn-05',
    profileId: 'p-13',
    matchedAt: '2026-02-14T20:00:00Z',
    lastMessage: 'I just pulled croissants out of the oven. 48-hour lamination. I\u2019m emotional.',
    lastMessageTime: '2026-02-20T07:30:00Z',
    unread: true,
  },
]

// ---- Interest Pool ----
export const INTEREST_POOL: string[] = [
  'Photography',
  'Hiking',
  'Cooking',
  'Travel',
  'Reading',
  'Yoga',
  'Rock Climbing',
  'Vinyl Records',
  'Board Games',
  'Pottery',
  'Running',
  'Live Music',
  'Cycling',
  'Film',
  'Meditation',
  'Gardening',
  'Dance',
  'Tattoos',
  'Thrifting',
  'Coffee',
  'Wine',
  'Dogs',
  'Cats',
  'Astrology',
  'Gaming',
  'Anime',
  'Karaoke',
  'Camping',
  'Surfing',
  'Volunteering',
  'Street Food',
  'Sustainability',
  'Poetry',
  'Podcasts',
  'Festivals',
]

// ---- Deal-breaker Options ----
export interface DealBreakerOption {
  id: string
  label: string
  category: string
}

export const DEAL_BREAKER_OPTIONS: DealBreakerOption[] = [
  { id: 'db-01', label: 'Smoking', category: 'Lifestyle' },
  { id: 'db-02', label: 'Doesn\'t want kids', category: 'Future Plans' },
  { id: 'db-03', label: 'Wants kids', category: 'Future Plans' },
  { id: 'db-04', label: 'Long distance', category: 'Logistics' },
  { id: 'db-05', label: 'No sense of humor', category: 'Personality' },
  { id: 'db-06', label: 'Excessive social media use', category: 'Lifestyle' },
  { id: 'db-07', label: 'Different political values', category: 'Values' },
  { id: 'db-08', label: 'Not active / outdoorsy', category: 'Lifestyle' },
  { id: 'db-09', label: 'Poor communication', category: 'Personality' },
  { id: 'db-10', label: 'Rude to service workers', category: 'Values' },
  { id: 'db-11', label: 'No ambition', category: 'Personality' },
  { id: 'db-12', label: 'Can\'t handle alone time', category: 'Personality' },
  { id: 'db-13', label: 'Doesn\'t read', category: 'Lifestyle' },
  { id: 'db-14', label: 'Picky eater', category: 'Lifestyle' },
]

// ---- Profile Prompts ----
export const PROMPT_OPTIONS: string[] = [
  'The way to win me over is',
  'My most irrational fear',
  'I geek out on',
  'Together, we could',
  'I\'m looking for',
  'My simple pleasures',
  'A life goal of mine',
  'I\'m convinced that',
  'My love language is',
  'The key to my heart is',
  'I\'ll fall for you if',
  'My go-to karaoke song is',
  'The most spontaneous thing I\'ve done is',
  'I guarantee you that',
  'Believe it or not, I',
]

// ---- Helper Lookups ----
export function getProfile(id: string): MockProfile | undefined {
  return PROFILES.find((p) => p.id === id)
}

export function getPodMembers(): MockProfile[] {
  return POD.members
    .map((m) => getProfile(m.profileId))
    .filter(Boolean) as MockProfile[]
}

export function getConversationPartner(
  conv: MockConversation,
): MockProfile | undefined {
  return getProfile(conv.profileId)
}

export function getConnectionProfile(
  conn: MockConnection,
): MockProfile | undefined {
  return getProfile(conn.profileId)
}
