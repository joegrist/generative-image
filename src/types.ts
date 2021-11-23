export interface Config {
    environments: Array<string>
    bodies: Array<string>
    hats: Array<string>
    exclusives: Array<Exclusion>
}

export interface Exclusion {
    environments: Array<string>
    bodies: Array<string>
    hats: Array<string>
}

export interface ExclusionEntry {
    attribute: string
    values: Array<string>
}