import Circuits from "../assets/json/Circuits.json"

class Route{
    constructor(shape) {
        this.shape = shape
    }
}

class Circuit{
    /**
     * @param obj {{route_id: string,route_short_name: string,route_long_name: string,route_type: string,route_color: string,route_url?: string,shape: {type: string,geometry: {coordinates: [number,number][][],type: string},properties: {}},geo_point_2d: {lon: number,lat: number}}}
     */
    constructor(obj) {
        this.ligne_id = obj.route_short_name
        this.name = obj.route_long_name
        this.route_type = obj.route_type
        this.color = obj.route_color
        this.routes = obj.shape.geometry.coordinates.map((x)=> new Route(x))
    }
}


/**
 *
 * @returns {Circuit[]}
 */
export default function () {
    let circuits = Circuits.filter(
        c =>
            c.route_short_name.length <= 2
            || c.route_short_name.startsWith("C")
    ).map(c=>new Circuit(c));


    console.log(circuits)

    return circuits
}
