"use strict";
import {Config, ExclusionEntry} from "./types"
import {combine} from "./combine"

var input = require('../config.json');
var fs = require('fs');

export function go() {

    let out = "products"
    if (!fs.existsSync(out)){
        fs.mkdirSync(out);
    }

    let config = input as Config
    let filename = 0

    for (var sky of config.skies) {
        for (var backdrop of config.backdrops) {
            for (var location of config.locations) {
                for (var body of config.bodies) {
                    for (var eyes of config.eyes) {
                        for (var headwear of config.headwear) {
                            if (!excluded(sky, backdrop, location, body, eyes, headwear)) {
                                combine(`${filename}`, sky, backdrop, location, body, eyes, headwear)
                                filename++
                            }
                        }
                    }
                }
            }
        }
    }
}

class Entry implements ExclusionEntry {
    attribute: string;
    values: string[];
    constructor(input: [string, Array<string>]) {
        this.attribute = input[0]
        this.values = input[1]
    }
}

function excluded(sky: string, backdrop: string, location: string, body: string, headwear: string, eyes: string) : boolean {
    let config = input as Config

    var inclusionFound = false
    var exclusiveFound = false

    function isExclusive(exclusiveAttribute: string, exclusiveAttributeToTest: string, exclusiveValue: string, exclusiveValueToTest: string): boolean {
        return (exclusiveAttribute == exclusiveAttributeToTest && exclusiveValue == exclusiveValueToTest)
    }

    function isIncluded(includedAttribute: string, inclusionAttributeToTest: string, includedValue: string, includedValueToTest : string): boolean {
        return (includedAttribute == inclusionAttributeToTest && includedValue == includedValueToTest)
    }

    function setFlagsExcluding(skip: string, attribute: string, value: string) {
        exclusiveFound = true
        if (skip != "skies") {
            if (isIncluded(attribute, "skies", value, sky)) {
                inclusionFound = true
            }
        }
        if (skip != "backdrops") {
            if (isIncluded(attribute, "backdrops", value, backdrop)) {
                inclusionFound = true
            }
        }
        if (skip != "locations") {
            if (isIncluded(attribute, "locations", value, location)) {
                inclusionFound = true
            }
        }
        if (skip != "bodies") {
            if (isIncluded(attribute, "bodies", value, body)) {
                inclusionFound = true
            }
        }
        if (skip != "headwear") {
            if (isIncluded(attribute, "headwear", value, headwear)) {
                inclusionFound = true
            }
        }
        if (skip != "eyes") {
            if (isIncluded(attribute, "eyes", value, eyes)) {
                inclusionFound = true
            }
        }
    }

    for (var exclusion of config.exclusives) {
        let pair = Object.entries(exclusion)
        let exclusive = new Entry(pair[0])
        let inclusions = new Entry(pair[1])
        
        for (let exclusiveValue of exclusive.values) {
            for (let includedValue of inclusions.values) {
                
                if (isExclusive(exclusive.attribute, "skies", exclusiveValue, sky)) {
                    setFlagsExcluding("skies", inclusions.attribute, includedValue)
                }
                if (isExclusive(exclusive.attribute, "backdrops", exclusiveValue, backdrop)) {
                    setFlagsExcluding("backdrops", inclusions.attribute, includedValue)
                }
                if (isExclusive(exclusive.attribute, "locations", exclusiveValue, location)) {
                    setFlagsExcluding("locations", inclusions.attribute, includedValue)
                }
                if (isExclusive(exclusive.attribute, "bodies", exclusiveValue, body)) {
                    setFlagsExcluding("bodies", inclusions.attribute, includedValue)
                }
                if (isExclusive(exclusive.attribute, "headwear", exclusiveValue, headwear)) {
                    setFlagsExcluding("headwear", inclusions.attribute, includedValue)
                }
                if (isExclusive(exclusive.attribute, "eyes", exclusiveValue, eyes)) {
                    setFlagsExcluding("eyes", inclusions.attribute, includedValue)
                }

            }
        }
    }

    if (inclusionFound) {
        return false 
    }

    if (exclusiveFound) {
        return true 
    }

    return false // Not mentioned
}
