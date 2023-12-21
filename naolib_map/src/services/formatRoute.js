import getLignesTraces from "@/services/getLignesTraces";

/**
 *
 * @returns {{
 * latlngs:[number,number][],
 * color: string
 * }[]}
 */
export default function (){
    let routes = []
    let lignes = getLignesTraces()


    for (const ligne of lignes) {
        for (const route of ligne.routes) {
            routes.push({
                latlngs: route.shape.map(x=>[x[1],x[0]]),
                color: "#"+ligne.color.toLowerCase(),
                ligne: ligne.ligne_id
            })
        }
    }

    return routes
}
