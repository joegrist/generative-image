"use strict";
import {Config, Trait} from "./types"

var input = require('../config.json');

export function go() {
    let config = input as Config

    for (var trait of config.traits) {
        console.log(trait.name)
        console.log(`...${trait.types.join(", ")}`)
    }
}
