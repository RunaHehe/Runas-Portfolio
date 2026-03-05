export interface Contribution {
    name: string;
    url: string;
    description: string;
    tags: string;
    type: 'organization' | 'repository';
}

export const softwareAndWebsiteContributions: Contribution[] = [
    {
        name: 'Pinpoint Tools',
        url: 'https://github.com/PinpointTools',
        description: 'A team dedicated of making apps, websites and webapps. All for free and Open Source.',
        tags: 'open source',
        type: 'organization'
    },
];

export const allContributions: Contribution[] = [
    ...softwareAndWebsiteContributions
];