/**
 * Canon record for the Genius Society members on file.
 *
 * PRODUCT.md makes canon accuracy binding: names, numbers, Paths, elements,
 * roles, and status must match Honkai: Star Rail. Nothing here is invented,
 * and nothing here is visual — this file survives any redesign.
 *
 * `no` is the member's Genius Society membership number, which is also the
 * order the Society itself uses. Lower number, earlier recognition.
 */

export const members = [
  {
    id: 'herta',
    no: 83,
    name: 'Herta',
    path: 'Path of Erudition',
    role: 'Proprietor, Herta Space Station',
    element: 'Ice',
    specialty: 'Simulated Universe',
    status: 'Active',
    bio: 'The architect of the Simulated Universe project and owner of a space station dedicated to research and artifact collection. Her physical form is rarely present — she operates primarily through puppet proxies, yet her intellect permeates every chamber of her domain. Cold, demanding, and categorically uninterested in those she deems unworthy.',
  },
  {
    id: 'ruanmei',
    no: 81,
    name: 'Ruan Mei',
    path: 'Path of Harmony',
    role: 'Life Sciences Researcher, Herta Space Station',
    element: 'Ice',
    specialty: 'Life Sciences',
    status: 'Active',
    bio: 'A researcher of life sciences whose work probes the fundamental mechanisms of existence. Serene and precisely mannered, she pursues the creation of life itself as her ultimate objective — a pursuit she undertakes with measured patience and an unnerving lack of ethical hesitation.',
  },
  {
    id: 'screwllum',
    no: 76,
    name: 'Screwllum',
    path: 'Path of Erudition',
    role: 'Robotic Genius, Interastral Peace Corporation',
    element: 'Quantum',
    specialty: 'Mechanics',
    status: 'Active',
    bio: "One of the few mechanical intellects to hold Genius Society membership. Screwllum's cognition transcends biological limitation — his analytical processing operates at speeds no organic mind can match. A being of clockwork precision and philosophical depth, he carries questions about consciousness that even he cannot answer.",
  },
  {
    id: 'akivili',
    no: 36,
    name: 'Akivili',
    path: 'Path of The Hunt · Trailblaze',
    role: 'The Trailblaze Aeon',
    element: 'Aeon',
    specialty: 'Trailblaze',
    status: 'Deceased',
    bio: 'The Aeon of Trailblaze, whose nature embodied the boundless pursuit of the unknown. Unlike other members who hold their genius through mortal intellect, Akivili’s genius was cosmological — the living embodiment of curiosity and forward motion. Now gone, their path endures in those who follow the stars.',
    note: "Akivili's membership is anomalous — an Aeon requires no invitation. Yet their recognition underscores a singular truth: that the drive to seek, to travel, to pursue what lies beyond the horizon, is itself a form of supreme intelligence that no metric can quantify.",
    quote: 'Every road is a question. Every arrival is only the beginning of another road.',
  },
];

/** Register order: by membership number, earliest recognition first. */
export const register = [...members].sort((a, b) => a.no - b.no);
