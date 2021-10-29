const sharp = require("sharp");

export async function combine(filename: string, environment: string, colour: string) {
    try {
        console.log(`Combining ${environment} with ${colour}` )
        await sharp(`img/environments/${environment}.png`)
            .composite([{input: `img/colours/${colour}.png`}])
            .toFile(`products/${filename}.png`)
    } catch (error) {
            console.log(error);
    }
}