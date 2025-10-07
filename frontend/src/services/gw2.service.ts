import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  GW2Account,
  GW2Character,
  GW2Achievement,
  GW2AchievementProgress,
  GW2Item,
  GW2World,
  GW2Build,
  GW2Map,
  GW2Profession,
  GW2Race,
  GW2Skill,
  GW2Trait,
  GW2Specialization,
  GW2Legend,
  GW2Pet,
  GW2MountType,
  GW2MountSkin,
  GW2Outfit,
  GW2Skin,
  GW2Mini,
  GW2Title,
  GW2Dye,
  GW2Currency,
  GW2Material,
  GW2Recipe,
  GW2Dungeon,
  GW2Raid,
  GW2Guild,
  GW2WvWMatch,
  GW2WvWObjective,
  GW2WvWRank,
  GW2WvWAbility,
  GW2WvWUpgrade,
  GW2TradingPostListing,
  GW2TradingPostPrice,
  GW2ExchangeRate,
  GW2TradingPostTransaction,
  GW2TradingPostDelivery,
  GW2Service
} from '../types/gw2';

class GW2APIService implements GW2Service {
  private api: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = 'http://localhost:8000') {
    this.baseURL = baseURL;
    this.api = axios.create({
      baseURL: `${this.baseURL}/gw2`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async handleRequest<T>(request: () => Promise<AxiosResponse<T>>): Promise<T> {
    try {
      const response = await request();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || error.message);
      }
      throw error;
    }
  }

  // Endpoints públicos (não requerem autenticação)
  async getBuild(): Promise<GW2Build> {
    return this.handleRequest(() => this.api.get('/build'));
  }

  async getWorlds(): Promise<GW2World[]> {
    return this.handleRequest(() => this.api.get('/worlds'));
  }

  async getWorld(id: number): Promise<GW2World> {
    return this.handleRequest(() => this.api.get(`/worlds/${id}`));
  }

  async getItems(ids?: number[]): Promise<GW2Item[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/items', { params }));
  }

  async getItem(id: number): Promise<GW2Item> {
    return this.handleRequest(() => this.api.get(`/items/${id}`));
  }

  async getAchievements(ids?: number[]): Promise<GW2Achievement[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/achievements', { params }));
  }

  async getAchievement(id: number): Promise<GW2Achievement> {
    return this.handleRequest(() => this.api.get(`/achievements/${id}`));
  }

  async getDailyAchievements(): Promise<Record<string, GW2Achievement[]>> {
    return this.handleRequest(() => this.api.get('/achievements/daily'));
  }

  async getTomorrowAchievements(): Promise<Record<string, GW2Achievement[]>> {
    return this.handleRequest(() => this.api.get('/achievements/daily/tomorrow'));
  }

  async getAchievementGroups(ids?: number[]): Promise<unknown[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/achievements/groups', { params }));
  }

  async getAchievementCategories(ids?: number[]): Promise<unknown[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/achievements/categories', { params }));
  }

  async getMaps(ids?: number[]): Promise<GW2Map[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/maps', { params }));
  }

  async getMap(id: number): Promise<GW2Map> {
    return this.handleRequest(() => this.api.get(`/maps/${id}`));
  }

  async getContinents(ids?: number[]): Promise<unknown[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/continents', { params }));
  }

  async getContinent(id: number): Promise<unknown> {
    return this.handleRequest(() => this.api.get(`/continents/${id}`));
  }

  async getRaces(): Promise<GW2Race[]> {
    return this.handleRequest(() => this.api.get('/races'));
  }

  async getProfessions(): Promise<GW2Profession[]> {
    return this.handleRequest(() => this.api.get('/professions'));
  }

  async getSkills(ids?: number[]): Promise<GW2Skill[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/skills', { params }));
  }

  async getSkill(id: number): Promise<GW2Skill> {
    return this.handleRequest(() => this.api.get(`/skills/${id}`));
  }

  async getTraits(ids?: number[]): Promise<GW2Trait[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/traits', { params }));
  }

  async getTrait(id: number): Promise<GW2Trait> {
    return this.handleRequest(() => this.api.get(`/traits/${id}`));
  }

  async getSpecializations(ids?: number[]): Promise<GW2Specialization[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/specializations', { params }));
  }

  async getSpecialization(id: number): Promise<GW2Specialization> {
    return this.handleRequest(() => this.api.get(`/specializations/${id}`));
  }

  async getLegends(): Promise<GW2Legend[]> {
    return this.handleRequest(() => this.api.get('/legends'));
  }

  async getPets(ids?: number[]): Promise<GW2Pet[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/pets', { params }));
  }

  async getPet(id: number): Promise<GW2Pet> {
    return this.handleRequest(() => this.api.get(`/pets/${id}`));
  }

  async getMountTypes(): Promise<GW2MountType[]> {
    return this.handleRequest(() => this.api.get('/mounts/types'));
  }

  async getMountSkins(ids?: number[]): Promise<GW2MountSkin[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/mounts/skins', { params }));
  }

  async getOutfits(ids?: number[]): Promise<GW2Outfit[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/outfits', { params }));
  }

  async getOutfit(id: number): Promise<GW2Outfit> {
    return this.handleRequest(() => this.api.get(`/outfits/${id}`));
  }

  async getSkins(ids?: number[]): Promise<GW2Skin[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/skins', { params }));
  }

  async getSkin(id: number): Promise<GW2Skin> {
    return this.handleRequest(() => this.api.get(`/skins/${id}`));
  }

  async getMinis(ids?: number[]): Promise<GW2Mini[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/minis', { params }));
  }

  async getMini(id: number): Promise<GW2Mini> {
    return this.handleRequest(() => this.api.get(`/minis/${id}`));
  }

  async getTitles(ids?: number[]): Promise<GW2Title[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/titles', { params }));
  }

  async getTitle(id: number): Promise<GW2Title> {
    return this.handleRequest(() => this.api.get(`/titles/${id}`));
  }

  async getDyes(ids?: number[]): Promise<GW2Dye[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/colors', { params }));
  }

  async getDye(id: number): Promise<GW2Dye> {
    return this.handleRequest(() => this.api.get(`/colors/${id}`));
  }

  async getCurrencies(ids?: number[]): Promise<GW2Currency[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/currencies', { params }));
  }

  async getCurrency(id: number): Promise<GW2Currency> {
    return this.handleRequest(() => this.api.get(`/currencies/${id}`));
  }

  async getMaterials(ids?: number[]): Promise<GW2Material[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/materials', { params }));
  }

  async getMaterial(id: number): Promise<GW2Material> {
    return this.handleRequest(() => this.api.get(`/materials/${id}`));
  }

  async getRecipes(ids?: number[]): Promise<GW2Recipe[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/recipes', { params }));
  }

  async getRecipe(id: number): Promise<GW2Recipe> {
    return this.handleRequest(() => this.api.get(`/recipes/${id}`));
  }

  async searchRecipes(inputItemId: number): Promise<number[]> {
    return this.handleRequest(() => this.api.get('/recipes/search', { params: { input_item_id: inputItemId } }));
  }

  async getDungeons(ids?: string[]): Promise<GW2Dungeon[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/dungeons', { params }));
  }

  async getDungeon(id: string): Promise<GW2Dungeon> {
    return this.handleRequest(() => this.api.get(`/dungeons/${id}`));
  }

  async getRaids(ids?: string[]): Promise<GW2Raid[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/raids', { params }));
  }

  async getRaid(id: string): Promise<GW2Raid> {
    return this.handleRequest(() => this.api.get(`/raids/${id}`));
  }

  async getGuild(id: string): Promise<GW2Guild> {
    return this.handleRequest(() => this.api.get(`/guild/${id}`));
  }

  async getGuildEmblem(guildId: string): Promise<unknown> {
    return this.handleRequest(() => this.api.get(`/guild/${guildId}/emblem`));
  }

  async getGuildPermissions(ids?: string[]): Promise<unknown[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/guild/permissions', { params }));
  }

  async searchGuilds(name: string): Promise<string[]> {
    return this.handleRequest(() => this.api.get('/guild/search', { params: { name } }));
  }

  async getGuildUpgrades(ids?: number[]): Promise<unknown[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/guild/upgrades', { params }));
  }

  // Endpoints autenticados (requerem chave de API)
  async getAccount(apiKey: string): Promise<GW2Account> {
    return this.handleRequest(() => this.api.get('/account', { params: { api_key: apiKey } }));
  }

  async getAccountAchievements(apiKey: string): Promise<GW2AchievementProgress[]> {
    return this.handleRequest(() => this.api.get('/account/achievements', { params: { api_key: apiKey } }));
  }

  async getAccountBank(apiKey: string): Promise<unknown[]> {
    return this.handleRequest(() => this.api.get('/account/bank', { params: { api_key: apiKey } }));
  }

  async getCharacters(apiKey: string): Promise<string[]> {
    return this.handleRequest(() => this.api.get('/characters', { params: { api_key: apiKey } }));
  }

  async getCharacter(characterName: string, apiKey: string): Promise<GW2Character> {
    return this.handleRequest(() => this.api.get(`/characters/${characterName}`, { params: { api_key: apiKey } }));
  }

  async getAccountWallet(apiKey: string): Promise<unknown[]> {
    return this.handleRequest(() => this.api.get('/account/wallet', { params: { api_key: apiKey } }));
  }

  async getAccountMaterials(apiKey: string): Promise<unknown[]> {
    return this.handleRequest(() => this.api.get('/account/materials', { params: { api_key: apiKey } }));
  }

  async getAccountDungeons(apiKey: string): Promise<string[]> {
    return this.handleRequest(() => this.api.get('/account/dungeons', { params: { api_key: apiKey } }));
  }

  async getAccountDailyCrafting(apiKey: string): Promise<unknown[]> {
    return this.handleRequest(() => this.api.get('/account/dailycrafting', { params: { api_key: apiKey } }));
  }

  async getAccountMapChests(apiKey: string): Promise<string[]> {
    return this.handleRequest(() => this.api.get('/account/mapchests', { params: { api_key: apiKey } }));
  }

  async getAccountWorldBosses(apiKey: string): Promise<string[]> {
    return this.handleRequest(() => this.api.get('/account/worldbosses', { params: { api_key: apiKey } }));
  }

  async getTokenInfo(apiKey: string): Promise<unknown> {
    return this.handleRequest(() => this.api.get('/tokeninfo', { params: { api_key: apiKey } }));
  }

  // WvW endpoints
  async getWvWMatches(worldId?: number): Promise<GW2WvWMatch[]> {
    const params = worldId ? { world_id: worldId } : {};
    return this.handleRequest(() => this.api.get('/wvw/matches', { params }));
  }

  async getWvWMatch(id: string): Promise<GW2WvWMatch> {
    return this.handleRequest(() => this.api.get(`/wvw/matches/${id}`));
  }

  async getWvWObjectives(ids?: string[]): Promise<GW2WvWObjective[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/wvw/objectives', { params }));
  }

  async getWvWRanks(ids?: number[]): Promise<GW2WvWRank[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/wvw/ranks', { params }));
  }

  async getWvWAbilities(ids?: number[]): Promise<GW2WvWAbility[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/wvw/abilities', { params }));
  }

  async getWvWUpgrades(ids?: number[]): Promise<GW2WvWUpgrade[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/wvw/upgrades', { params }));
  }

  // Trading Post endpoints
  async getTradingPostListings(ids?: number[]): Promise<GW2TradingPostListing[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/commerce/listings', { params }));
  }

  async getTradingPostPrices(ids?: number[]): Promise<GW2TradingPostPrice[]> {
    const params = ids ? { ids: ids.join(',') } : {};
    return this.handleRequest(() => this.api.get('/commerce/prices', { params }));
  }

  async getExchangeRate(coins: number): Promise<GW2ExchangeRate> {
    return this.handleRequest(() => this.api.get('/commerce/exchange/coins', { params: { coins } }));
  }

  async getTradingPostTransactions(apiKey: string): Promise<GW2TradingPostTransaction[]> {
    return this.handleRequest(() => this.api.get('/commerce/transactions', { params: { api_key: apiKey } }));
  }

  async getTradingPostDelivery(apiKey: string): Promise<GW2TradingPostDelivery> {
    return this.handleRequest(() => this.api.get('/commerce/delivery', { params: { api_key: apiKey } }));
  }
}

// Instância global do serviço
export const gw2Service = new GW2APIService();

// Hook personalizado para usar o serviço
export const useGW2Service = () => {
  return gw2Service;
};

export default GW2APIService;
