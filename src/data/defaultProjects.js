export const DEFAULT_PROJECTS = [
  {
    id: 'habit-garden',
    title: 'The Habit Garden',
    symbol: '🪦',
    rune: '✳',
    category: 'Web & AI',
    progress: 68,
    tagline: 'A tiny 3D digital sanctuary that blooms with every micro-habit kept.',
    description:
      'Conceived during a rainy sprint to make habit tracking tactile rather than spreadsheets. The idea was that every streak grew procedural low-poly orchids, bioluminescent moss, and creeping ivy. As habits withered, the garden accumulated digital fog and fallen leaves.',
    causeOfDeath: 'Physics engine rabbit hole & over-engineered procedural botany.',
    epitaph: 'Here lies an overgrown dream that choked on its own complexity before the first seed sprouted.',
    status: 'Ready for Revival',
    fate: 'Revive',
    dateBuried: 'March 2024',
    techStack: ['React', 'Three.js', 'Zustand', 'Tailwind CSS'],
    checklist: [
      { text: 'Strip out heavy ammo.js physics engine', done: true },
      { text: 'Simplify state storage to a single localStorage hook', done: true },
      { text: 'Build simple 5-habit daily dashboard', done: false },
      { text: 'Deploy public alpha on Vercel', done: false },
    ],
    resources: {
      tools: [
        { name: 'React Three Fiber', desc: 'Declarative Three.js wrapper', badge: 'Library' },
        { name: 'Zustand', desc: 'Lightweight state management', badge: 'State' },
        { name: 'Lucide Icons', desc: 'Gothic and nature icon set', badge: 'UI' },
      ],
      tutorials: [
        { title: 'Procedural Flower Geometry in WebGL', type: 'Shader Guide' },
        { title: 'Habit Loop Behavioral Psychology by Clear', type: 'Design Reading' },
      ],
      inspirations: [
        { title: 'Viridi Zen Garden App (Steam)', note: 'Atmospheric pacing reference' },
        { title: 'Lofi Forest Rain Moodboard (Figma)', note: 'Color & lighting palette' },
      ],
    },
    repoUrl: 'https://github.com/example/the-habit-garden',
    demoUrl: '',
    revivalNotes:
      'The core visual concept was loved by testers. Just needs a ruthless cut of 80% of unnecessary Three.js shader code to launch as a minimal PWA.',
    lastUpdated: '2024-03-15',
  },
  {
    id: 'midnight-letters',
    title: 'Midnight Letters',
    symbol: '☾',
    rune: '☾',
    category: 'Creative Writing',
    progress: 52,
    tagline: 'An anonymous letter exchange that only opened between 2:00 AM and 4:00 AM.',
    description:
      'A quiet, melancholic social experiment where nocturnal thinkers could draft unaddressed confessions. You would receive one random letter written by a stranger in your timezone at the witching hour, with no usernames, no likes, and no algorithmic replies.',
    causeOfDeath: 'WebSocket sync nightmares, sleep deprivation, and spam moderation fear.',
    epitaph: 'Whispered into the dead of night, never to reach the morning light.',
    status: 'Resting',
    fate: 'Preserve',
    dateBuried: 'November 2023',
    techStack: ['Node.js', 'Socket.io', 'PostgreSQL', 'Next.js'],
    checklist: [
      { text: 'Archive the 140 anonymous letters into a static markdown anthology', done: true },
      { text: 'Open-source the dark gothic typography system', done: true },
      { text: 'Write a reflective postmortem on asynchronous slow-web apps', done: false },
    ],
    resources: {
      tools: [
        { name: 'Socket.io', desc: 'Realtime bidirectional event communication', badge: 'WebSockets' },
        { name: 'Tailwind Typography', desc: 'Serif reading experience', badge: 'Styling' },
      ],
      tutorials: [
        { title: 'PostgreSQL Timezone Scheduling Queues', type: 'Backend Guide' },
        { title: 'Slow-Web Philosophy Manifesto', type: 'Philosophy' },
      ],
      inspirations: [
        { title: 'PostSecret Anthology Archive', note: 'Raw anonymous storytelling' },
        { title: 'Typewriter Sound Synthesis Spec', note: 'Keystroke acoustic feedback' },
      ],
    },
    repoUrl: 'https://github.com/example/midnight-letters',
    demoUrl: '',
    revivalNotes:
      'Preserved as a historical art piece. The writing collected was raw and tender. Best kept as an archived museum rather than an active service.',
    lastUpdated: '2023-11-28',
  },
  {
    id: 'sound-of-somewhere',
    title: 'Sound of Somewhere',
    symbol: '⌘',
    rune: '⌘',
    category: 'Experimental',
    progress: 74,
    tagline: 'A community-recorded spatial audio atlas of places that feel like home.',
    description:
      'An interactive globe mapping 3-minute binaural field recordings: rain falling on a rusted corrugated roof in Mumbai, midnight subways in Tokyo, wind chimes in coastal Maine. Listeners could blend two places together to create imaginary acoustic crossings.',
    causeOfDeath: 'Binaural field recording hardware broke & audio encoding complexity.',
    epitaph: 'A resonance that drifted into silence before the chorus began.',
    status: 'Ready for Revival',
    fate: 'Revive',
    dateBuried: 'July 2024',
    techStack: ['Web Audio API', 'Mapbox GL', 'React', 'AudioWorklet'],
    checklist: [
      { text: 'Resolve Web Audio memory leak when switching audio buffers', done: true },
      { text: 'Switch from paid Mapbox tokens to lightweight MapLibre', done: false },
      { text: 'Curate initial bundle of 20 royalty-free ambient tracks', done: false },
      { text: 'Add spatial headphone orientation simulator', done: false },
    ],
    resources: {
      tools: [
        { name: 'Web Audio API', desc: 'Low-latency browser sound graph', badge: 'Audio' },
        { name: 'MapLibre GL', desc: 'Open-source vector tile maps', badge: 'GIS' },
      ],
      tutorials: [
        { title: 'Binaural Panning and Convolution Reverb in WebAudio', type: 'Audio Engineering' },
        { title: 'Building Custom AudioWorklet Processors', type: 'Performance' },
      ],
      inspirations: [
        { title: 'Radio Aporee Maps of Sound', note: 'Field recording pioneer archive' },
        { title: 'Drive & Listen Web App', note: 'Ambient atmospheric streaming' },
      ],
    },
    repoUrl: 'https://github.com/example/sound-of-somewhere',
    demoUrl: '',
    revivalNotes:
      'Strong emotional resonance. Audio playback code is 70% complete. Needs only standard CDN audio hosting to work.',
    lastUpdated: '2024-07-19',
  },
  {
    id: 'retrosynth-84',
    title: 'RetroSynth 84',
    symbol: '⚡',
    rune: '⚡',
    category: 'Game Dev',
    progress: 45,
    tagline: 'A neon-noir browser rhythm game where you hack terminal servers to dark synthwave beats.',
    description:
      'A blend of terminal hacking minigames and Guitar Hero mechanics. Keys flashed in rhythm with an FM synthesizer. Players intercepted rogue AI transmissions across an alternate 1980s computer network.',
    causeOfDeath: 'Scope creep: added 12 weapon types to a game that just needed 4 buttons.',
    epitaph: 'The tempo escalated past mortal comprehension, and the server crashed.',
    status: 'Resting',
    fate: 'Transform',
    dateBuried: 'January 2024',
    techStack: ['Phaser 3', 'WebAudio Synth', 'TypeScript', 'Canvas2D'],
    checklist: [
      { text: 'Extract the procedural audio synth into an open-source npm module', done: true },
      { text: 'Package the pixel art asset pack for itch.io free release', done: false },
      { text: 'Strip the combat system and turn into a pure keyboard typing speedrun', done: false },
    ],
    resources: {
      tools: [
        { name: 'Phaser 3', desc: 'Fast 2D canvas game framework', badge: 'Game Engine' },
        { name: 'Tone.js', desc: 'Interactive music framework in browser', badge: 'Synth' },
      ],
      tutorials: [
        { title: 'Accurate BPM Clock Timing in JavaScript Animation Loops', type: 'Game Math' },
        { title: 'FM Synthesis Algorithmic Basics', type: 'Sound Design' },
      ],
      inspirations: [
        { title: 'Crypt of the NecroDancer', note: 'Rhythm action mechanics' },
        { title: 'Cyberpunk 1984 CRT Shader Lab', note: 'Phosphor scanline effect' },
      ],
    },
    repoUrl: 'https://github.com/example/retrosynth-84',
    demoUrl: '',
    revivalNotes:
      'Do not revive as a full RPG. Transform the rhythm engine into a standalone developer typing trainer.',
    lastUpdated: '2024-01-30',
  },
  {
    id: 'ghostnotes-cli',
    title: 'GhostNotes CLI',
    symbol: '🪶',
    rune: '🪶',
    category: 'Developer Tools',
    progress: 92,
    tagline: 'A minimalist terminal notepad that auto-purges notes after 7 days unless marked eternal.',
    description:
      'Built to combat note hoarding. Any snippet, reminder, or quick thought drafted in the terminal existed with a countdown tombstone. If you did not actively star it within a week, it quietly dissolved into oblivion.',
    causeOfDeath: 'Accidentally purged the creator’s own secret project roadmap during testing.',
    epitaph: 'Born from dust, dissolved into the void by its own strict laws.',
    status: 'Resurrected',
    fate: 'Revive',
    dateBuried: 'September 2024',
    techStack: ['Rust', 'Clap CLI', 'SQLite', 'Crossterm'],
    checklist: [
      { text: 'Added safety trash bin before permanent deletion', done: true },
      { text: 'Compile multi-platform binaries via GitHub Actions', done: true },
      { text: 'Release v1.0.0 on crates.io and Homebrew', done: true },
    ],
    resources: {
      tools: [
        { name: 'Clap 4.0', desc: 'Rust command line argument parser', badge: 'CLI' },
        { name: 'Ratatui / Crossterm', desc: 'Terminal user interfaces in Rust', badge: 'TUI' },
      ],
      tutorials: [
        { title: 'Writing Idempotent SQLite Migrations in Rust', type: 'Systems' },
        { title: 'Distributing Multi-architecture Binaries with Cargo', type: 'DevOps' },
      ],
      inspirations: [
        { title: 'Ephemeral Computing & Snapchat Self-destruct Model', note: 'Philosophy' },
      ],
    },
    repoUrl: 'https://github.com/example/ghostnotes-cli',
    demoUrl: 'https://crates.io',
    revivalNotes:
      'Resurrected! The safety bin solved the creator terror. Now has over 800 active developers using it daily for distraction-free scratchpads.',
    lastUpdated: '2024-10-04',
  },
  {
    id: 'chronosphere-iot',
    title: 'Chronosphere Nixie',
    symbol: '⏳',
    rune: '⏳',
    category: 'Hardware & IoT',
    progress: 38,
    tagline: 'A tabletop nixie-tube barometer forecasting personal energy and calendar dread.',
    description:
      'A vintage cold-war IN-14 nixie tube clock synced via ESP32 to Google Calendar and sleep trackers. It computed a "dread quotient" based on back-to-back Zoom meetings and glowed an ominous neon amber.',
    causeOfDeath: '170-volt DC boost converter short-circuit and melted breadboard.',
    epitaph: 'Time stood still when the high-voltage capacitors gave up the ghost.',
    status: 'Resting',
    fate: 'Release',
    dateBuried: 'May 2023',
    techStack: ['ESP32', 'Nixie Tubes (IN-14)', 'C++', 'FreeRTOS'],
    checklist: [
      { text: 'Document full KiCad schematic with safety isolation notes', done: true },
      { text: 'Publish tutorial warning hobbyists about high voltage safety', done: true },
      { text: 'Dismantle hardware safely and donate spare tubes', done: true },
    ],
    resources: {
      tools: [
        { name: 'KiCad 7', desc: 'Open-source PCB schematic layout', badge: 'Hardware' },
        { name: 'ESP-IDF', desc: 'Espressif IoT development framework', badge: 'Embedded' },
      ],
      tutorials: [
        { title: 'High Voltage DC-DC Boost Converters (12V to 170V)', type: 'Electronics' },
        { title: 'Multiplexing Nixie Anodes with K155ID1 Driver IC', type: 'Hardware' },
      ],
      inspirations: [
        { title: 'Steins;Gate Divergence Meter Replica', note: 'Physical prop aesthetic' },
      ],
    },
    repoUrl: 'https://github.com/example/chronosphere-nixie',
    demoUrl: '',
    revivalNotes:
      'Fully released with peaceful closure. The lesson in PCB isolation and electrical safety was invaluable.',
    lastUpdated: '2023-05-12',
  },
]
