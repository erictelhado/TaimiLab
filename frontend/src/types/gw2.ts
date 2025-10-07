// Tipos para a API do Guild Wars 2

export interface GW2Account {
  id: string;
  name: string;
  world: number;
  guilds?: string[];
  guild_leader?: string[];
  created: string;
  access?: string[];
  commander?: boolean;
  fractal_level?: number;
  daily_ap?: number;
  monthly_ap?: number;
  wvw_rank?: number;
}

export interface GW2Character {
  name: string;
  race: string;
  gender: string;
  flags: string[];
  profession: string;
  level: number;
  guild?: string;
  age: number;
  created: string;
  deaths: number;
  craftings?: Array<{
    discipline: string;
    rating: number;
    active: boolean;
  }>;
  title?: number;
  backstory?: string[];
  wvw_abilities?: Array<{
    id: number;
    rank: number;
  }>;
  equipment?: Array<{
    id: number;
    slot: string;
    infusions?: number[];
    upgrades?: number[];
    skin?: number;
    stats?: {
      id: number;
      attributes: Record<string, number>;
    };
    binding?: string;
    bound_to?: string;
    dyes?: number[];
  }>;
  recipes?: number[];
  equipment_pvp?: {
    amulet?: number;
    rune?: number;
    sigils?: number[];
  };
  bags?: Array<{
    id: number;
    size: number;
    inventory?: Array<{
      id?: number;
      count?: number;
      infusions?: number[];
      upgrades?: number[];
      skin?: number;
      stats?: {
        id: number;
        attributes: Record<string, number>;
      };
      binding?: string;
      bound_to?: string;
      dyes?: number[];
    }>;
  }>;
  training?: Array<{
    id: number;
    spent: number;
    done: boolean;
  }>;
  pets?: Array<{
    id: number;
    name: string;
    icon: string;
    description: string;
    skills: Array<{
      id: number;
      slot: string;
    }>;
  }>;
  gathering?: string[];
}

export interface GW2Achievement {
  id: number;
  name: string;
  description?: string;
  requirement?: string;
  locked_text?: string;
  type?: string;
  flags?: string[];
  tiers?: Array<{
    count: number;
    points: number;
  }>;
  prerequisites?: number[];
  rewards?: Array<{
    type: string;
    id?: number;
    count?: number;
  }>;
  bits?: Array<{
    type: string;
    text?: string;
    id?: number;
  }>;
  point_cap?: number;
}

export interface GW2AchievementProgress {
  id: number;
  current?: number;
  max?: number;
  done?: boolean;
  bits?: Array<{
    type: string;
    text?: string;
    id?: number;
  }>;
  unlocked?: boolean;
}

export interface GW2Item {
  id: number;
  name: string;
  icon?: string;
  description?: string;
  type?: string;
  rarity?: string;
  level?: number;
  vendor_value?: number;
  default_skin?: number;
  flags?: string[];
  game_types?: string[];
  restrictions?: string[];
  chat_link?: string;
  details?: {
    type: string;
    weight_class?: string;
    defense?: number;
    infusion_slots?: Array<{
      flags: string[];
      item_id?: number;
    }>;
    infix_upgrade?: {
      id: number;
      attributes: Array<{
        attribute: string;
        modifier: number;
      }>;
    };
    suffix_item_id?: number;
    secondary_suffix_item_id?: string;
    stat_choices?: number[];
  };
}

export interface GW2World {
  id: number;
  name: string;
  population: string;
}

export interface GW2Build {
  id: number;
}

export interface GW2Map {
  id: number;
  name: string;
  min_level: number;
  max_level: number;
  default_floor: number;
  floors: number[];
  region_id: number;
  region_name: string;
  continent_id: number;
  continent_name: string;
  map_rect: number[][];
  continent_rect: number[][];
}

export interface GW2Profession {
  id: string;
  name: string;
  icon: string;
  icon_big: string;
  specializations: number[];
  weapons: Record<string, string[]>;
  flags: string[];
}

export interface GW2Race {
  id: string;
  name: string;
  icon: string;
  flags: string[];
}

export interface GW2Skill {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  chat_link: string;
  type?: string;
  weapon_type?: string;
  professions?: string[];
  slot?: string;
  attunement?: string;
  cost?: number;
  dual_wield?: string;
  flip_skill?: number;
  initiative?: number;
  next_chain?: number;
  prev_chain?: number;
  transform_skills?: number[];
  bundle_skills?: number[];
  toolbelt_skill?: number;
  categories?: string[];
  flags?: string[];
  facts?: Array<{
    text?: string;
    icon?: string;
    type: string;
    value?: number;
    target?: string;
    status?: string;
    description?: string;
    apply_count?: number;
    duration?: number;
    field_type?: string;
    finisher_type?: string;
    percent?: number;
    hit_count?: number;
    dmg_multiplier?: number;
    boon?: string;
    condition?: string;
    skill_id?: number;
    distance?: number;
    prefix?: {
      text: string;
      icon: string;
      status: string;
      description: string;
    };
  }>;
  traited_facts?: Array<{
    text?: string;
    icon?: string;
    type: string;
    value?: number;
    target?: string;
    status?: string;
    description?: string;
    apply_count?: number;
    duration?: number;
    field_type?: string;
    finisher_type?: string;
    percent?: number;
    hit_count?: number;
    dmg_multiplier?: number;
    boon?: string;
    condition?: string;
    skill_id?: number;
    distance?: number;
    prefix?: {
      text: string;
      icon: string;
      status: string;
      description: string;
    };
    requires_trait?: number;
    overrides?: number;
  }>;
}

export interface GW2Trait {
  id: number;
  name: string;
  icon?: string;
  description?: string;
  specialization: number;
  tier: number;
  slot: string;
  facts?: Array<{
    text?: string;
    icon?: string;
    type: string;
    value?: number;
    target?: string;
    status?: string;
    description?: string;
    apply_count?: number;
    duration?: number;
    field_type?: string;
    finisher_type?: string;
    percent?: number;
    hit_count?: number;
    dmg_multiplier?: number;
    boon?: string;
    condition?: string;
    skill_id?: number;
    distance?: number;
    prefix?: {
      text: string;
      icon: string;
      status: string;
      description: string;
    };
  }>;
  traited_facts?: Array<{
    text?: string;
    icon?: string;
    type: string;
    value?: number;
    target?: string;
    status?: string;
    description?: string;
    apply_count?: number;
    duration?: number;
    field_type?: string;
    finisher_type?: string;
    percent?: number;
    hit_count?: number;
    dmg_multiplier?: number;
    boon?: string;
    condition?: string;
    skill_id?: number;
    distance?: number;
    prefix?: {
      text: string;
      icon: string;
      status: string;
      description: string;
    };
    requires_trait?: number;
    overrides?: number;
  }>;
  skills?: Array<{
    id: number;
    slot?: string;
  }>;
}

export interface GW2Specialization {
  id: number;
  name: string;
  profession: string;
  elite: boolean;
  minor_traits: number[];
  major_traits: number[];
  background: string;
  icon: string;
}

export interface GW2Legend {
  id: string;
  swap: number;
  heal: number;
  elite: number;
  utilities: number[];
}

export interface GW2Pet {
  id: number;
  name: string;
  icon: string;
  description: string;
  skills: Array<{
    id: number;
    slot: string;
  }>;
}

export interface GW2MountType {
  id: string;
  name: string;
  icon: string;
  mount_categories: string[];
  default_skin: number;
  skins: number[];
}

export interface GW2MountSkin {
  id: number;
  name: string;
  icon: string;
  mount: string;
  dye_slots?: Array<{
    color_id: number;
    material: string;
  }>;
}

export interface GW2Outfit {
  id: number;
  name: string;
  icon: string;
  unlock_items: number[];
}

export interface GW2Skin {
  id: number;
  name: string;
  icon: string;
  description?: string;
  type: string;
  rarity: string;
  weight_class?: string;
  restrictions: string[];
  id_ext?: number;
  flags: string[];
  game_types: string[];
}

export interface GW2Mini {
  id: number;
  name: string;
  icon: string;
  unlock_items: number[];
  order: number;
  item_id: number;
}

export interface GW2Title {
  id: number;
  name: string;
  achievement: number;
  achievements: number[];
  ap_required: number;
}

export interface GW2Dye {
  id: number;
  name: string;
  base_rgb: number[];
  cloth: {
    brightness: number;
    contrast: number;
    hue: number;
    saturation: number;
    lightness: number;
    rgb: number[];
  };
  leather: {
    brightness: number;
    contrast: number;
    hue: number;
    saturation: number;
    lightness: number;
    rgb: number[];
  };
  metal: {
    brightness: number;
    contrast: number;
    hue: number;
    saturation: number;
    lightness: number;
    rgb: number[];
  };
  item: number;
  categories: string[];
}

export interface GW2Currency {
  id: number;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export interface GW2Material {
  id: number;
  name: string;
  items: number[];
  order: number;
}

export interface GW2Recipe {
  id: number;
  type: string;
  output_item_id: number;
  output_item_count: number;
  time_to_craft_ms: number;
  disciplines: string[];
  min_rating: number;
  flags: string[];
  ingredients: Array<{
    item_id: number;
    count: number;
  }>;
  guild_ingredients?: Array<{
    item_id: number;
    count: number;
  }>;
  output_upgrade_id?: number;
  chat_link: string;
}

export interface GW2Dungeon {
  id: string;
  paths: Array<{
    id: string;
    type: string;
  }>;
}

export interface GW2Raid {
  id: string;
  wings: Array<{
    id: string;
    events: Array<{
      id: string;
      type: string;
    }>;
  }>;
}

export interface GW2Guild {
  id: string;
  name: string;
  tag: string;
  emblem: {
    background: {
      id: number;
      colors: number[];
    };
    foreground: {
      id: number;
      colors: number[];
    };
    flags: string[];
  };
  level: number;
  motd: string;
  influence: number;
  aetherium: number;
  favor: number;
  member_count: number;
  member_capacity: number;
  created: string;
}

export interface GW2WvWMatch {
  id: string;
  start_time: string;
  end_time: string;
  scores: number[];
  worlds: {
    red: number;
    blue: number;
    green: number;
  };
  all_worlds: {
    red: number[];
    blue: number[];
    green: number[];
  };
  deaths: {
    red: number;
    blue: number;
    green: number;
  };
  kills: {
    red: number;
    blue: number;
    green: number;
  };
}

export interface GW2WvWObjective {
  id: string;
  name: string;
  sector_id: number;
  type: string;
  map_type: string;
  map_id: number;
  coord: number[];
  label_coord: number[];
  marker: string;
  chat_link: string;
  upgrade_id?: number;
}

export interface GW2WvWRank {
  id: number;
  title: string;
  min_rank: number;
  max_rank: number;
}

export interface GW2WvWAbility {
  id: number;
  name: string;
  description: string;
  icon: string;
  ranks: Array<{
    cost: number;
    effect: string;
  }>;
}

export interface GW2WvWUpgrade {
  id: number;
  name: string;
  description: string;
  icon: string;
  costs: Array<{
    type: string;
    count: number;
    name: string;
  }>;
}

export interface GW2TradingPostListing {
  id: number;
  buys: Array<{
    listings: number;
    unit_price: number;
    quantity: number;
  }>;
  sells: Array<{
    listings: number;
    unit_price: number;
    quantity: number;
  }>;
}

export interface GW2TradingPostPrice {
  id: number;
  whitelisted: boolean;
  buys: {
    quantity: number;
    unit_price: number;
  };
  sells: {
    quantity: number;
    unit_price: number;
  };
}

export interface GW2ExchangeRate {
  coins_per_gem: number;
  quantity: number;
}

export interface GW2TradingPostTransaction {
  id: number;
  item_id: number;
  price: number;
  quantity: number;
  created: string;
  purchased: string;
}

export interface GW2TradingPostDelivery {
  coins: number;
  items: Array<{
    id: number;
    count: number;
  }>;
}

// Tipos para componentes React
export interface GW2AccountCardProps {
  account: GW2Account;
  className?: string;
}

export interface GW2CharacterCardProps {
  character: GW2Character;
  className?: string;
}

export interface GW2AchievementCardProps {
  achievement: GW2Achievement;
  progress?: GW2AchievementProgress;
  className?: string;
}

export interface GW2ItemCardProps {
  item: GW2Item;
  className?: string;
}

export interface GW2WorldCardProps {
  world: GW2World;
  className?: string;
}

export interface GW2MapCardProps {
  map: GW2Map;
  className?: string;
}

export interface GW2ProfessionCardProps {
  profession: GW2Profession;
  className?: string;
}

export interface GW2RaceCardProps {
  race: GW2Race;
  className?: string;
}

export interface GW2SkillCardProps {
  skill: GW2Skill;
  className?: string;
}

export interface GW2TraitCardProps {
  trait: GW2Trait;
  className?: string;
}

export interface GW2SpecializationCardProps {
  specialization: GW2Specialization;
  className?: string;
}

export interface GW2LegendCardProps {
  legend: GW2Legend;
  className?: string;
}

export interface GW2PetCardProps {
  pet: GW2Pet;
  className?: string;
}

export interface GW2MountTypeCardProps {
  mountType: GW2MountType;
  className?: string;
}

export interface GW2MountSkinCardProps {
  mountSkin: GW2MountSkin;
  className?: string;
}

export interface GW2OutfitCardProps {
  outfit: GW2Outfit;
  className?: string;
}

export interface GW2SkinCardProps {
  skin: GW2Skin;
  className?: string;
}

export interface GW2MiniCardProps {
  mini: GW2Mini;
  className?: string;
}

export interface GW2TitleCardProps {
  title: GW2Title;
  className?: string;
}

export interface GW2DyeCardProps {
  dye: GW2Dye;
  className?: string;
}

export interface GW2CurrencyCardProps {
  currency: GW2Currency;
  className?: string;
}

export interface GW2MaterialCardProps {
  material: GW2Material;
  className?: string;
}

export interface GW2RecipeCardProps {
  recipe: GW2Recipe;
  className?: string;
}

export interface GW2DungeonCardProps {
  dungeon: GW2Dungeon;
  className?: string;
}

export interface GW2RaidCardProps {
  raid: GW2Raid;
  className?: string;
}

export interface GW2GuildCardProps {
  guild: GW2Guild;
  className?: string;
}

export interface GW2WvWMatchCardProps {
  match: GW2WvWMatch;
  className?: string;
}

export interface GW2WvWObjectiveCardProps {
  objective: GW2WvWObjective;
  className?: string;
}

export interface GW2WvWRankCardProps {
  rank: GW2WvWRank;
  className?: string;
}

export interface GW2WvWAbilityCardProps {
  ability: GW2WvWAbility;
  className?: string;
}

export interface GW2WvWUpgradeCardProps {
  upgrade: GW2WvWUpgrade;
  className?: string;
}

export interface GW2TradingPostListingCardProps {
  listing: GW2TradingPostListing;
  className?: string;
}

export interface GW2TradingPostPriceCardProps {
  price: GW2TradingPostPrice;
  className?: string;
}

export interface GW2ExchangeRateCardProps {
  exchangeRate: GW2ExchangeRate;
  className?: string;
}

export interface GW2TradingPostTransactionCardProps {
  transaction: GW2TradingPostTransaction;
  className?: string;
}

export interface GW2TradingPostDeliveryCardProps {
  delivery: GW2TradingPostDelivery;
  className?: string;
}

// Tipos para hooks
export interface UseGW2AccountReturn {
  account: GW2Account | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2CharactersReturn {
  characters: GW2Character[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2AchievementsReturn {
  achievements: GW2Achievement[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2ItemsReturn {
  items: GW2Item[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2WorldsReturn {
  worlds: GW2World[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2MapsReturn {
  maps: GW2Map[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2ProfessionsReturn {
  professions: GW2Profession[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2RacesReturn {
  races: GW2Race[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2SkillsReturn {
  skills: GW2Skill[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2TraitsReturn {
  traits: GW2Trait[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2SpecializationsReturn {
  specializations: GW2Specialization[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2LegendsReturn {
  legends: GW2Legend[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2PetsReturn {
  pets: GW2Pet[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2MountTypesReturn {
  mountTypes: GW2MountType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2MountSkinsReturn {
  mountSkins: GW2MountSkin[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2OutfitsReturn {
  outfits: GW2Outfit[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2SkinsReturn {
  skins: GW2Skin[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2MinisReturn {
  minis: GW2Mini[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2TitlesReturn {
  titles: GW2Title[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2DyesReturn {
  dyes: GW2Dye[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2CurrenciesReturn {
  currencies: GW2Currency[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2MaterialsReturn {
  materials: GW2Material[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2RecipesReturn {
  recipes: GW2Recipe[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2DungeonsReturn {
  dungeons: GW2Dungeon[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2RaidsReturn {
  raids: GW2Raid[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2GuildsReturn {
  guilds: GW2Guild[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2WvWMatchesReturn {
  matches: GW2WvWMatch[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2WvWObjectivesReturn {
  objectives: GW2WvWObjective[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2WvWRanksReturn {
  ranks: GW2WvWRank[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2WvWAbilitiesReturn {
  abilities: GW2WvWAbility[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2WvWUpgradesReturn {
  upgrades: GW2WvWUpgrade[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2TradingPostListingsReturn {
  listings: GW2TradingPostListing[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2TradingPostPricesReturn {
  prices: GW2TradingPostPrice[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2ExchangeRatesReturn {
  exchangeRates: GW2ExchangeRate[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2TradingPostTransactionsReturn {
  transactions: GW2TradingPostTransaction[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGW2TradingPostDeliveryReturn {
  delivery: GW2TradingPostDelivery | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Tipos para serviços
export interface GW2Service {
  getAccount: (apiKey: string) => Promise<GW2Account>;
  getCharacters: (apiKey: string) => Promise<string[]>;
  getCharacter: (characterName: string, apiKey: string) => Promise<GW2Character>;
  getAchievements: (ids?: number[]) => Promise<GW2Achievement[]>;
  getAchievement: (id: number) => Promise<GW2Achievement>;
  getItems: (ids?: number[]) => Promise<GW2Item[]>;
  getItem: (id: number) => Promise<GW2Item>;
  getWorlds: () => Promise<GW2World[]>;
  getWorld: (id: number) => Promise<GW2World>;
  getMaps: (ids?: number[]) => Promise<GW2Map[]>;
  getMap: (id: number) => Promise<GW2Map>;
  getProfessions: () => Promise<GW2Profession[]>;
  getRaces: () => Promise<GW2Race[]>;
  getSkills: (ids?: number[]) => Promise<GW2Skill[]>;
  getSkill: (id: number) => Promise<GW2Skill>;
  getTraits: (ids?: number[]) => Promise<GW2Trait[]>;
  getTrait: (id: number) => Promise<GW2Trait>;
  getSpecializations: (ids?: number[]) => Promise<GW2Specialization[]>;
  getSpecialization: (id: number) => Promise<GW2Specialization>;
  getLegends: () => Promise<GW2Legend[]>;
  getPets: (ids?: number[]) => Promise<GW2Pet[]>;
  getPet: (id: number) => Promise<GW2Pet>;
  getMountTypes: () => Promise<GW2MountType[]>;
  getMountSkins: (ids?: number[]) => Promise<GW2MountSkin[]>;
  getOutfits: (ids?: number[]) => Promise<GW2Outfit[]>;
  getOutfit: (id: number) => Promise<GW2Outfit>;
  getSkins: (ids?: number[]) => Promise<GW2Skin[]>;
  getSkin: (id: number) => Promise<GW2Skin>;
  getMinis: (ids?: number[]) => Promise<GW2Mini[]>;
  getMini: (id: number) => Promise<GW2Mini>;
  getTitles: (ids?: number[]) => Promise<GW2Title[]>;
  getTitle: (id: number) => Promise<GW2Title>;
  getDyes: (ids?: number[]) => Promise<GW2Dye[]>;
  getDye: (id: number) => Promise<GW2Dye>;
  getCurrencies: (ids?: number[]) => Promise<GW2Currency[]>;
  getCurrency: (id: number) => Promise<GW2Currency>;
  getMaterials: (ids?: number[]) => Promise<GW2Material[]>;
  getMaterial: (id: number) => Promise<GW2Material>;
  getRecipes: (ids?: number[]) => Promise<GW2Recipe[]>;
  getRecipe: (id: number) => Promise<GW2Recipe>;
  getDungeons: (ids?: string[]) => Promise<GW2Dungeon[]>;
  getDungeon: (id: string) => Promise<GW2Dungeon>;
  getRaids: (ids?: string[]) => Promise<GW2Raid[]>;
  getRaid: (id: string) => Promise<GW2Raid>;
  getGuild: (id: string) => Promise<GW2Guild>;
  getWvWMatches: (worldId?: number) => Promise<GW2WvWMatch[]>;
  getWvWMatch: (id: string) => Promise<GW2WvWMatch>;
  getWvWObjectives: (ids?: string[]) => Promise<GW2WvWObjective[]>;
  getWvWRanks: (ids?: number[]) => Promise<GW2WvWRank[]>;
  getWvWAbilities: (ids?: number[]) => Promise<GW2WvWAbility[]>;
  getWvWUpgrades: (ids?: number[]) => Promise<GW2WvWUpgrade[]>;
  getTradingPostListings: (ids?: number[]) => Promise<GW2TradingPostListing[]>;
  getTradingPostPrices: (ids?: number[]) => Promise<GW2TradingPostPrice[]>;
  getExchangeRate: (coins: number) => Promise<GW2ExchangeRate>;
  getTradingPostTransactions: (apiKey: string) => Promise<GW2TradingPostTransaction[]>;
  getTradingPostDelivery: (apiKey: string) => Promise<GW2TradingPostDelivery>;
}

// Tipos para contextos
export interface GW2ContextType {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
  account: GW2Account | null;
  setAccount: (account: GW2Account | null) => void;
  characters: GW2Character[];
  setCharacters: (characters: GW2Character[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

// Tipos para páginas
export interface GW2DashboardPageProps {
  className?: string;
}

export interface GW2AccountPageProps {
  className?: string;
}

export interface GW2CharactersPageProps {
  className?: string;
}

export interface GW2AchievementsPageProps {
  className?: string;
}

export interface GW2ItemsPageProps {
  className?: string;
}

export interface GW2WorldsPageProps {
  className?: string;
}

export interface GW2MapsPageProps {
  className?: string;
}

export interface GW2ProfessionsPageProps {
  className?: string;
}

export interface GW2RacesPageProps {
  className?: string;
}

export interface GW2SkillsPageProps {
  className?: string;
}

export interface GW2TraitsPageProps {
  className?: string;
}

export interface GW2SpecializationsPageProps {
  className?: string;
}

export interface GW2LegendsPageProps {
  className?: string;
}

export interface GW2PetsPageProps {
  className?: string;
}

export interface GW2MountsPageProps {
  className?: string;
}

export interface GW2OutfitsPageProps {
  className?: string;
}

export interface GW2SkinsPageProps {
  className?: string;
}

export interface GW2MinisPageProps {
  className?: string;
}

export interface GW2TitlesPageProps {
  className?: string;
}

export interface GW2DyesPageProps {
  className?: string;
}

export interface GW2CurrenciesPageProps {
  className?: string;
}

export interface GW2MaterialsPageProps {
  className?: string;
}

export interface GW2RecipesPageProps {
  className?: string;
}

export interface GW2DungeonsPageProps {
  className?: string;
}

export interface GW2RaidsPageProps {
  className?: string;
}

export interface GW2GuildsPageProps {
  className?: string;
}

export interface GW2WvWPageProps {
  className?: string;
}

export interface GW2TradingPostPageProps {
  className?: string;
}

// Tipos para utilitários
export interface GW2Utils {
  formatCurrency: (amount: number) => string;
  formatTime: (timestamp: string) => string;
  formatDuration: (seconds: number) => string;
  formatLevel: (level: number) => string;
  formatRarity: (rarity: string) => string;
  formatType: (type: string) => string;
  formatProfession: (profession: string) => string;
  formatRace: (race: string) => string;
  formatGender: (gender: string) => string;
  formatBinding: (binding: string) => string;
  formatSlot: (slot: string) => string;
  formatDiscipline: (discipline: string) => string;
  formatAttribute: (attribute: string) => string;
  formatBoon: (boon: string) => string;
  formatCondition: (condition: string) => string;
  formatEffect: (effect: string) => string;
  formatTarget: (target: string) => string;
  formatStatus: (status: string) => string;
  formatFieldType: (fieldType: string) => string;
  formatFinisherType: (finisherType: string) => string;
}
