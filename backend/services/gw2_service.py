import httpx
import asyncio
from typing import Optional, List, Dict, Any, Union
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class GW2APIService:
    def __init__(self):
        self.base_url = settings.gw2_api_base_url
        self.timeout = settings.gw2_api_timeout
        
    async def _make_request(
        self, 
        endpoint: str, 
        params: Optional[Dict[str, Any]] = None,
        api_key: Optional[str] = None
    ) -> Dict[str, Any]:
        """Faz uma requisição para a API do Guild Wars 2"""
        url = f"{self.base_url}/{endpoint}"
        
        # Adiciona a chave de API se fornecida
        if api_key:
            if params is None:
                params = {}
            params["access_token"] = api_key
        
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.get(url, params=params)
                response.raise_for_status()
                return response.json()
            except httpx.HTTPStatusError as e:
                logger.error(f"Erro HTTP {e.response.status_code} para {url}: {e.response.text}")
                raise
            except httpx.RequestError as e:
                logger.error(f"Erro de requisição para {url}: {str(e)}")
                raise
    
    # Endpoints públicos (não requerem autenticação)
    async def get_build(self) -> Dict[str, Any]:
        """Retorna o ID da build atual"""
        return await self._make_request("build")
    
    async def get_worlds(self) -> List[Dict[str, Any]]:
        """Retorna lista de mundos"""
        return await self._make_request("worlds")
    
    async def get_world_by_id(self, world_id: int) -> Dict[str, Any]:
        """Retorna informações de um mundo específico"""
        return await self._make_request(f"worlds/{world_id}")
    
    async def get_items(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna lista de IDs de itens ou informações de itens específicos"""
        if ids:
            return await self._make_request("items", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("items")
    
    async def get_item_by_id(self, item_id: int) -> Dict[str, Any]:
        """Retorna informações de um item específico"""
        return await self._make_request(f"items/{item_id}")
    
    async def get_achievements(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna lista de IDs de conquistas ou informações de conquistas específicas"""
        if ids:
            return await self._make_request("achievements", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("achievements")
    
    async def get_achievement_by_id(self, achievement_id: int) -> Dict[str, Any]:
        """Retorna informações de uma conquista específica"""
        return await self._make_request(f"achievements/{achievement_id}")
    
    async def get_daily_achievements(self) -> Dict[str, Any]:
        """Retorna conquistas diárias"""
        return await self._make_request("achievements/daily")
    
    async def get_tomorrow_achievements(self) -> Dict[str, Any]:
        """Retorna conquistas de amanhã"""
        return await self._make_request("achievements/daily/tomorrow")
    
    async def get_achievement_groups(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna grupos de conquistas"""
        if ids:
            return await self._make_request("achievements/groups", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("achievements/groups")
    
    async def get_achievement_categories(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna categorias de conquistas"""
        if ids:
            return await self._make_request("achievements/categories", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("achievements/categories")
    
    async def get_maps(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna mapas"""
        if ids:
            return await self._make_request("maps", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("maps")
    
    async def get_map_by_id(self, map_id: int) -> Dict[str, Any]:
        """Retorna informações de um mapa específico"""
        return await self._make_request(f"maps/{map_id}")
    
    async def get_continents(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna continentes"""
        if ids:
            return await self._make_request("continents", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("continents")
    
    async def get_continent_by_id(self, continent_id: int) -> Dict[str, Any]:
        """Retorna informações de um continente específico"""
        return await self._make_request(f"continents/{continent_id}")
    
    async def get_races(self) -> List[str]:
        """Retorna raças"""
        return await self._make_request("races")
    
    async def get_professions(self) -> List[str]:
        """Retorna profissões"""
        return await self._make_request("professions")
    
    async def get_skills(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna habilidades"""
        if ids:
            return await self._make_request("skills", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("skills")
    
    async def get_skill_by_id(self, skill_id: int) -> Dict[str, Any]:
        """Retorna informações de uma habilidade específica"""
        return await self._make_request(f"skills/{skill_id}")
    
    async def get_traits(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna características"""
        if ids:
            return await self._make_request("traits", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("traits")
    
    async def get_trait_by_id(self, trait_id: int) -> Dict[str, Any]:
        """Retorna informações de uma característica específica"""
        return await self._make_request(f"traits/{trait_id}")
    
    async def get_specializations(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna especializações"""
        if ids:
            return await self._make_request("specializations", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("specializations")
    
    async def get_specialization_by_id(self, specialization_id: int) -> Dict[str, Any]:
        """Retorna informações de uma especialização específica"""
        return await self._make_request(f"specializations/{specialization_id}")
    
    async def get_legends(self) -> List[str]:
        """Retorna lendas de revenant"""
        return await self._make_request("legends")
    
    async def get_pets(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna pets"""
        if ids:
            return await self._make_request("pets", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("pets")
    
    async def get_pet_by_id(self, pet_id: int) -> Dict[str, Any]:
        """Retorna informações de um pet específico"""
        return await self._make_request(f"pets/{pet_id}")
    
    async def get_mounts_types(self) -> List[str]:
        """Retorna tipos de montarias"""
        return await self._make_request("mounts/types")
    
    async def get_mounts_skins(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna skins de montarias"""
        if ids:
            return await self._make_request("mounts/skins", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("mounts/skins")
    
    async def get_outfits(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna outfits"""
        if ids:
            return await self._make_request("outfits", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("outfits")
    
    async def get_outfit_by_id(self, outfit_id: int) -> Dict[str, Any]:
        """Retorna informações de um outfit específico"""
        return await self._make_request(f"outfits/{outfit_id}")
    
    async def get_skins(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna skins"""
        if ids:
            return await self._make_request("skins", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("skins")
    
    async def get_skin_by_id(self, skin_id: int) -> Dict[str, Any]:
        """Retorna informações de uma skin específica"""
        return await self._make_request(f"skins/{skin_id}")
    
    async def get_minis(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna minis"""
        if ids:
            return await self._make_request("minis", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("minis")
    
    async def get_mini_by_id(self, mini_id: int) -> Dict[str, Any]:
        """Retorna informações de um mini específico"""
        return await self._make_request(f"minis/{mini_id}")
    
    async def get_titles(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna títulos"""
        if ids:
            return await self._make_request("titles", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("titles")
    
    async def get_title_by_id(self, title_id: int) -> Dict[str, Any]:
        """Retorna informações de um título específico"""
        return await self._make_request(f"titles/{title_id}")
    
    async def get_dyes(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna corantes"""
        if ids:
            return await self._make_request("colors", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("colors")
    
    async def get_dye_by_id(self, dye_id: int) -> Dict[str, Any]:
        """Retorna informações de um corante específico"""
        return await self._make_request(f"colors/{dye_id}")
    
    async def get_currencies(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna moedas"""
        if ids:
            return await self._make_request("currencies", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("currencies")
    
    async def get_currency_by_id(self, currency_id: int) -> Dict[str, Any]:
        """Retorna informações de uma moeda específica"""
        return await self._make_request(f"currencies/{currency_id}")
    
    async def get_materials(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna materiais"""
        if ids:
            return await self._make_request("materials", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("materials")
    
    async def get_material_by_id(self, material_id: int) -> Dict[str, Any]:
        """Retorna informações de um material específico"""
        return await self._make_request(f"materials/{material_id}")
    
    async def get_recipes(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna receitas"""
        if ids:
            return await self._make_request("recipes", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("recipes")
    
    async def get_recipe_by_id(self, recipe_id: int) -> Dict[str, Any]:
        """Retorna informações de uma receita específica"""
        return await self._make_request(f"recipes/{recipe_id}")
    
    async def search_recipes(self, input_item_id: int) -> List[int]:
        """Busca receitas por item de entrada"""
        return await self._make_request("recipes/search", params={"input": input_item_id})
    
    async def get_dungeons(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna masmorras"""
        if ids:
            return await self._make_request("dungeons", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("dungeons")
    
    async def get_dungeon_by_id(self, dungeon_id: int) -> Dict[str, Any]:
        """Retorna informações de uma masmorra específica"""
        return await self._make_request(f"dungeons/{dungeon_id}")
    
    async def get_raids(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna raids"""
        if ids:
            return await self._make_request("raids", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("raids")
    
    async def get_raid_by_id(self, raid_id: int) -> Dict[str, Any]:
        """Retorna informações de uma raid específica"""
        return await self._make_request(f"raids/{raid_id}")
    
    async def get_guild_by_id(self, guild_id: str) -> Dict[str, Any]:
        """Retorna informações de uma guilda específica"""
        return await self._make_request(f"guild/{guild_id}")
    
    async def get_guild_emblem(self, guild_id: str) -> Dict[str, Any]:
        """Retorna emblema de uma guilda"""
        return await self._make_request(f"guild/{guild_id}/emblem")
    
    async def get_guild_permissions(self, ids: Optional[List[str]] = None) -> Union[List[str], List[Dict[str, Any]]]:
        """Retorna permissões de guilda"""
        if ids:
            return await self._make_request("guild/permissions", params={"ids": ",".join(ids)})
        return await self._make_request("guild/permissions")
    
    async def search_guilds(self, name: str) -> List[str]:
        """Busca guildas por nome"""
        return await self._make_request("guild/search", params={"name": name})
    
    async def get_guild_upgrades(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna upgrades de guilda"""
        if ids:
            return await self._make_request("guild/upgrades", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("guild/upgrades")
    
    # Endpoints autenticados (requerem chave de API)
    async def get_account_info(self, api_key: str) -> Dict[str, Any]:
        """Retorna informações da conta"""
        return await self._make_request("account", api_key=api_key)
    
    async def get_account_achievements(self, api_key: str) -> List[Dict[str, Any]]:
        """Retorna progresso das conquistas da conta"""
        return await self._make_request("account/achievements", api_key=api_key)
    
    async def get_account_bank(self, api_key: str) -> List[Dict[str, Any]]:
        """Retorna banco da conta"""
        return await self._make_request("account/bank", api_key=api_key)
    
    async def get_account_characters(self, api_key: str) -> List[str]:
        """Retorna lista de personagens da conta"""
        return await self._make_request("characters", api_key=api_key)
    
    async def get_character_info(self, character_name: str, api_key: str) -> Dict[str, Any]:
        """Retorna informações de um personagem específico"""
        return await self._make_request(f"characters/{character_name}", api_key=api_key)
    
    async def get_account_wallet(self, api_key: str) -> List[Dict[str, Any]]:
        """Retorna carteira da conta"""
        return await self._make_request("account/wallet", api_key=api_key)
    
    async def get_account_materials(self, api_key: str) -> List[Dict[str, Any]]:
        """Retorna armazenamento de materiais da conta"""
        return await self._make_request("account/materials", api_key=api_key)
    
    async def get_account_dungeons(self, api_key: str) -> List[str]:
        """Retorna masmorras completadas diariamente"""
        return await self._make_request("account/dungeons", api_key=api_key)
    
    async def get_account_daily_crafting(self, api_key: str) -> List[Dict[str, Any]]:
        """Retorna materiais criados diariamente"""
        return await self._make_request("account/dailycrafting", api_key=api_key)
    
    async def get_account_map_chests(self, api_key: str) -> List[str]:
        """Retorna baús de mapa coletados diariamente"""
        return await self._make_request("account/mapchests", api_key=api_key)
    
    async def get_account_world_bosses(self, api_key: str) -> List[str]:
        """Retorna chefes mundiais derrotados diariamente"""
        return await self._make_request("account/worldbosses", api_key=api_key)
    
    async def get_token_info(self, api_key: str) -> Dict[str, Any]:
        """Retorna informações sobre a chave de API"""
        return await self._make_request("tokeninfo", api_key=api_key)
    
    # WvW endpoints
    async def get_wvw_matches(self, world_id: Optional[int] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna partidas WvW"""
        if world_id:
            return await self._make_request("wvw/matches", params={"world": world_id})
        return await self._make_request("wvw/matches")
    
    async def get_wvw_match_details(self, match_id: str) -> Dict[str, Any]:
        """Retorna detalhes de uma partida WvW"""
        return await self._make_request(f"wvw/matches/{match_id}")
    
    async def get_wvw_objectives(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna objetivos WvW"""
        if ids:
            return await self._make_request("wvw/objectives", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("wvw/objectives")
    
    async def get_wvw_ranks(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna ranks WvW"""
        if ids:
            return await self._make_request("wvw/ranks", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("wvw/ranks")
    
    async def get_wvw_abilities(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna habilidades WvW"""
        if ids:
            return await self._make_request("wvw/abilities", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("wvw/abilities")
    
    async def get_wvw_upgrades(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna upgrades WvW"""
        if ids:
            return await self._make_request("wvw/upgrades", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("wvw/upgrades")
    
    # Trading Post endpoints
    async def get_trading_post_listings(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna listagens do Trading Post"""
        if ids:
            return await self._make_request("commerce/listings", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("commerce/listings")
    
    async def get_trading_post_prices(self, ids: Optional[List[int]] = None) -> Union[List[int], List[Dict[str, Any]]]:
        """Retorna preços do Trading Post"""
        if ids:
            return await self._make_request("commerce/prices", params={"ids": ",".join(map(str, ids))})
        return await self._make_request("commerce/prices")
    
    async def get_exchange_coins_to_gems(self, coins: int) -> Dict[str, Any]:
        """Retorna taxa de câmbio de moedas para gemas"""
        return await self._make_request("commerce/exchange/coins", params={"quantity": coins})
    
    async def get_exchange_gems_to_coins(self, gems: int) -> Dict[str, Any]:
        """Retorna taxa de câmbio de gemas para moedas"""
        return await self._make_request("commerce/exchange/gems", params={"quantity": gems})
    
    async def get_trading_post_transactions(self, api_key: str) -> Dict[str, Any]:
        """Retorna transações do Trading Post"""
        return await self._make_request("commerce/transactions", api_key=api_key)
    
    async def get_trading_post_delivery(self, api_key: str) -> Dict[str, Any]:
        """Retorna itens disponíveis para retirada"""
        return await self._make_request("commerce/delivery", api_key=api_key)

# Instância global do serviço
gw2_service = GW2APIService()
