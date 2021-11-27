export interface Config {
    skies: Array<string>
    backdrops: Array<string>
    locations: Array<string>
    bodies: Array<string>
    eyes: Array<string>
    headwear: Array<string>
    exclusives: Array<Exclusion>
}

export interface Exclusion {
    skies: Array<string>
    backdrops: Array<string>
    locations: Array<string>
    bodies: Array<string>
    eyes: Array<string>
    headwear: Array<string>
}

export interface ExclusionEntry {
    attribute: string
    values: Array<string>
}