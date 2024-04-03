interface Pokemon {
    id: string;
    attack: number;
    defense: number;
}

interface BaseRecord {
    id: string;
}

interface Database<T extends BaseRecord> {
    set(newValue: T): void;
    get(id: string): T | undefined;
}

function createDabatase<T extends BaseRecord>() {
    class InMemoryDB implements Database<T> {
        private db: Record<string, T> = {};

        static instance:InMemoryDB = new InMemoryDB();

        private constructor() {}

        public set(newValue: T): void {
            this.db[newValue.id] = newValue;
        }
        public get(id: string): T | undefined {
            return this.db[id]
        }
    }
    // Singleton
    return InMemoryDB
}

const PokemonDB = createDabatase<Pokemon>();
PokemonDB.instance.set({
    id: 'Bulbasaur',
    attack: 50,
    defense: 12,
});

console.log(PokemonDB.instance.get('Bulbasaur'));