import Arrets from "../assets/json/Arrets.json"
import Coords from "../assets/json/Coord.json"

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
