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

    for (var environment of config.environments) {
        for (var body of config.bodies) {
            for (var hat of config.hats) {
                if (!excluded(environment, hat, body )){
                    combine(`${filename}`, environment, body, hat)
                    filename++
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

function excluded(environment: string, hat: string, body: string) : boolean {
    let config = input as Config

    var inclusionFound = false
    var exclusiveFound = false

    function isExclusive(exclusiveAttribute: string, exclusiveAttributeToTest: string, exclusiveValue: string, exclusiveValueToTest: string): boolean {
        return (exclusiveAttribute == exclusiveAttributeToTest && exclusiveValue == exclusiveValueToTest)
    }

    function isIncluded(includedAttribute: string, inclusionAttributeToTest: string, includedValue: string, includedValueToTest : string): boolean {
        return (includedAttribute == inclusionAttributeToTest && includedValue == includedValueToTest)
    }

    for (var exclusion of config.exclusives) {
        let pair = Object.entries(exclusion)
        let exclusive = new Entry(pair[0])
        let inclusions = new Entry(pair[1])
        
        for (let exclusiveValue of exclusive.values) {
            for (let includedValue of inclusions.values) {
                if (isExclusive(exclusive.attribute, "environments", exclusiveValue, environment)) {
                    exclusiveFound = true
                    if (isIncluded(inclusions.attribute, "hats", includedValue, hat)) {
                        inclusionFound = true
                    }
                    if (isIncluded(inclusions.attribute, "bodies", includedValue, body)) {
                        inclusionFound = true
                    }
                }

                if (isExclusive(exclusive.attribute, "hats", exclusiveValue, hat)) {
                    exclusiveFound = true
                    if (isIncluded(inclusions.attribute, "environments", includedValue, environment)) {
                        inclusionFound = true
                    }
                    if (isIncluded(inclusions.attribute, "bodies", includedValue, body)) {
                        inclusionFound = true
                    }
                }
                if (isExclusive(exclusive.attribute, "bodies", exclusiveValue, hat)) {
                    exclusiveFound = true
                    if (isIncluded(inclusions.attribute, "environments", includedValue, environment)) {
                        inclusionFound = true
                    }
                    if (isIncluded(inclusions.attribute, "hats", includedValue, body)) {
                        inclusionFound = true
                    }
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
