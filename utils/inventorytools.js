exports.creaturedata = (type) => {
    const creatures = {
        b_goblin: {
            amount: 500,
            expiration: 7,
            percentage: 0.30,
            name: "Bronze Goblin",
            rank: "bronze"
        },
        b_troll: {
            amount: 2750,
            expiration: 7,
            percentage: 0.30,
            name: "Bronze Troll",
            rank: "bronze"
        },
        b_ogre: {
            amount: 3875,
            expiration: 7,
            percentage: 0.30,
            name: "Bronze Ogre",
            rank: "bronze"
        },
        b_orc: {
            amount: 5000,
            expiration: 7,
            percentage: 0.30,
            name: "Bronze Orc",
            rank: "bronze"
        },
        s_goblin: {
            amount: 500,
            expiration: 15,
            percentage: 0.80,
            name: "Silver Goblin",
            rank: "silver"
        },
        s_troll: {
            amount: 7000,
            expiration: 15,
            percentage: 0.80,
            name: "Silver Troll",
            rank: "silver"
        },
        s_ogre: {
            amount: 14360,
            expiration: 15,
            percentage: 0.80,
            name: "Silver Ogre",
            rank: "silver"
        },
        s_orc: {
            amount: 21290,
            expiration: 15,
            percentage: 0.80,
            name: "Silver Orc",
            rank: "silver"
        },
        s_yeti: {
            amount: 28220,
            expiration: 15,
            percentage: 0.80,
            name: "Silver Yeti",
            rank: "silver"
        },
        s_minotaur: {
            amount: 35150,
            expiration: 15,
            percentage: 0.80,
            name: "Silver Minotaur",
            rank: "silver"
        },
        s_dragon: {
            amount: 50000,
            expiration: 15,
            percentage: 0.80,
            name: "Silver Dragon",
            rank: "silver"
        },
        g_orc: {
            amount: 5000,
            expiration: 30,
            percentage: 2,
            name: "Gold Orc",
            rank: "gold"
        },
        g_yeti: {
            amount: 203000,
            expiration: 30,
            percentage: 2,
            name: "Gold Yeti",
            rank: "silver"
        },
        g_minotaur: {
            amount: 302000,
            expiration: 30,
            percentage: 2,
            name: "Gold Minotaur",
            rank: "gold"
        },
        g_dragon: {
            amount: 401000,
            expiration: 30,
            percentage: 2,
            name: "Gold Dragon",
            rank: "gold"
        },
        g_leviathan: {
            amount: 500000,
            expiration: 30,
            percentage: 2,
            name: "Gold Leviathan",
            rank: "gold"
        }
    }

    return creatures[type] || {amount: 0, expiration: 0, percentage: 0, name: "nothing"}
}