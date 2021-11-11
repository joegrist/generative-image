const sharp = require("sharp");

export async function combine(filename: string, environment: string, body: string, hat: string) {
    try {
        console.log(`Combining ${environment} with body ${body} and ${hat}` )
        await sharp(`img/environments/${environment}.png`)
            .composite([
                {input: `img/bodies/${body}.png`},
                {input: `img/hats/${hat}.png`}
            ])
            .toFile(`products/${filename}.png`)
    } catch (error) {
            console.log(error);
    }
}