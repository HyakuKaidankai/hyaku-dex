import TypeData from "../../assets/data/type_data.json";

export function getTypeColor(name: string) {
    let n = name.toLowerCase();
    let type = TypeData.find(type => type.name === n)!;
    return type;
}

export function listTypeWithoutStellar() {
    return TypeData.filter(type => type.name !== 'stellar')
}