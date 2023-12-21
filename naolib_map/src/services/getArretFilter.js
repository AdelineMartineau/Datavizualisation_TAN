import Arrets from "../assets/json/Arrets.json"
import Coords from "../assets/json/Coord.json"

/**
 *
 * @returns {{
 *      codeLieu: string,
 *      libelle: string,
 *      distance: null,
 *      ligne: {numLigne: string}[],
 *      stop_id: string,
 *      stop_code: string,
 *     "stop_name": string,
 *     "stop_coordinates": {
 *         "lon": number,
 *         "lat": number
 *     },
 *     "stop_desc": null,
 *     "zone_id": null,
 *     "stop_url": null,
 *     "location_type": string,
 *     "parent_station": null,
 *     "stop_timezone": null,
 *     "wheelchair_boarding": null
 *     isBus:bool
 *     isTram:bool
 * }[]}
 */
export default function() {
    let coords = Coords.filter((c) => c.location_type == 1)

    let arretsfiltrer = Arrets
        .filter((a) => (a.ligne.length > 0))
        .map((a) => {
            const coord = coords.find((c) => c.stop_id == a.codeLieu)
            if (coord) {
                for (const [key, value] of Object.entries(coord)) {
                    a[key] = value
                }
                a.isTram = a.ligne.filter(l => l.numLigne.length === 1).length > 0
                a.isBus = a.ligne.filter(l => l.numLigne.length > 1).length > 0
                a.wheelchair_boarding = a.wheelchair_boarding ?? Coords.filter(c=>
                    c.location_type == 0 &&
                    c.parent_station == a.stop_id &&
                    c.wheelchair_boarding === "1"
                ).length >= 1
                return a
            }
            return false
        }).filter(a => a)

    return arretsfiltrer;
}
