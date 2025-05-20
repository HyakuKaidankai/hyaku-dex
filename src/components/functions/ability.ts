import Abilities from '../../assets/data/abilities.json';

export function listAbilities() {
    return Abilities
}
 
export function getAbility(name: string) {
    return Abilities.find((item:any) => item.Name.toLowerCase() === name.toLowerCase());
}

export function getAbilityEffect(data: any) {
    if(data && data["Effect 2"]) {
        return data["Effect 2"];
    } else if(data && data["Effect"]) {
        return data["Effect"]
    } else {
        return "Not found"
    }
}