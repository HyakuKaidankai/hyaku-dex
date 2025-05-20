import Types from "../../assets/data/types.json";

export function getType(name: string) {
     return Types.find((item:any) => item.name.toLowerCase() === name.toLowerCase()) ?? {
        Bug:        1,
        Dark:       1,
        Dragon:     1,
        Electric:   1,
        Fairy:      1,
        Fighting:   1,
        Fire:       1,
        Flying:     1,
        Ghost:      1,
        Grass:      1,
        Ground:     1,
        Ice:        1,
        Normal:     1,
        Poison:     1,
        Psychic:    1,
        Steel:      1,
        Rock:       1,
        Water:      1
     };
}

export function getTypeColor(name: string) {
    let n = name.toLowerCase();
    let type = Types.find(type => type.name === n)!;
    return type;
}

export function listTypeWithoutStellar() {
    return Types.filter(type => type.name !== 'stellar')
}

export function getTypeDefenses(type1: string, type2: string) {
    const firstType = getType(type1);
    const secondType = getType(type2);

    const types = [
        'bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting',
        'fire', 'flying', 'ghost', 'grass', 'ground', 'ice',
        'normal', 'poison', 'psychic', 'steel', 'rock', 'water'
    ];

    const defenses: Record<string, number> = {};

    types.forEach(type => {
        let value = firstType[type.charAt(0).toUpperCase() + type.slice(1)] *
                    secondType[type.charAt(0).toUpperCase() + type.slice(1)];

        // Apply the checks
        if (value === 2) {
            value = 1.5;
        } else if (value === 4) {
            value = 2;
        }

        defenses[type] = value;
    });

    return defenses;
}