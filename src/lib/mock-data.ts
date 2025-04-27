interface Section {
    name: string;
    id: string;
    subs?: Omit<Section, 'subs'>[];
}

export const popularSections: Section[] = [
    {
        name: 'National',
        id: 'national',
    },
    {
        name: 'International',
        id: 'international',
    },
    {
        name: 'Business',
        id: 'business',
        subs: [
            { name: 'Markets', id: 'markets' },
            { name: 'Economy', id: 'economy' },
            { name: 'Startups', id: 'startups' },
            { name: 'Technology', id: 'technology' },
            { name: 'Finance', id: 'finance' },
            { name: 'Real estate', id: 'real-estate' },
        ],
    },
    {
        name: 'Politics',
        id: 'politics',
    },
    {
        name: 'Lifestyle',
        id: 'lifestyle',
        subs: [
            { name: 'Health & Wellness', id: 'health-and-wellness' },
            { name: 'Fashion', id: 'fashion' },
            { name: 'Travel', id: 'travel' },
            { name: 'Food', id: 'food' },
            { name: 'Relationships', id: 'relationships' },
            { name: 'Arts & Culture', id: 'arts-and-culture' },
            { name: 'Home & Living', id: 'home-and-living' },
        ],
    },
    {
        name: 'Sport',
        id: 'sport',
        subs: [
            { name: 'Football', id: 'football' },
            { name: 'Formula 1', id: 'f1' },
            { name: 'Tennis', id: 'tennis' },
            { name: 'Hockey', id: 'hockey' },
        ],
    },
];
