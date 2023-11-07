import Arrets from "../assets/json/Arrets.json"
import Coords from "../assets/json/Coord.json"

/**
 *
 * @returns {{codeLieu: string, libelle: string, distance: null,ligne: {numLigne: string}[],stop_id: string,stop_code: string,
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
 * }[]}
 */
export default function() {
    let coords = Coords.filter((c) => c.location_type == 1)

    let arretsfiltrer = Arrets
        //filtre ceux qu'ont pas de ligne
        .filter((a) => (a.ligne.length > 0))
        //pour chacun des Arrets
        .map((a) => {
            //cherche les coords qui corresponde
            const coord = coords.find((c) => c.stop_id == a.codeLieu)
            //si il existe
            if (coord) {
                //pour chaque propriété avec ça valeur
                for (const [key, value] of Object.entries(coord)) {
                    // la copier dans l'objet Arret
                    a[key] = value
                }
                return a
            }
            return false
        }).filter(a => a)

    return arretsfiltrer;
}
