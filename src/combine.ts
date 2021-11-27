const sharp = require("sharp");

export async function combine(filename: string, sky: string, backdrop: string, location: string, body: string, eyes: string, headwear: string) {
    try {
        console.log(`[${filename}] Combining ${sky}, ${backdrop}, ${location}, ${body}, ${eyes}, ${headwear}` )

        var composites =  [
            {input: `img/backdrops/${backdrop}.png`},
            {input: `img/locations/${location}.png`},
            {input: `img/bodies/${body}.png`},
            {input: `img/eyes/${eyes}.png`}
        ]

        if (headwear != "none") {
            composites.push({input: `img/headwear/${headwear}.png`})
        }

        await sharp(`img/skies/${sky}.png`)
            .composite(composites)
            .toFile(`products/${filename}.png`)
    } catch (error) {
            console.log(error);
    }
}