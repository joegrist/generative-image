"use strict";
import {Config} from "./types"
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
        for (var colour of config.colours) {
            combine(`${filename}`, environment, colour)
            filename++
        }
    }
}
