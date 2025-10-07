from fastapi import APIRouter, HTTPException, Depends, Query
from typing import Optional, List, Dict, Any
from services.gw2_service import gw2_service
from models.gw2_models import (
    GW2AccountCreate, GW2AccountResponse, GW2CharacterResponse,
    GW2AchievementResponse, GW2APIAccount, GW2APICharacter,
    GW2APIAchievement, GW2APIAchievementProgress, GW2APIItem,
    GW2APIWorld, GW2APIBuild
)
# from utils.auth import get_current_user
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/gw2", tags=["Guild Wars 2"])

# Endpoints públicos (não requerem autenticação)
@router.get("/build", response_model=GW2APIBuild)
async def get_build():
    """Retorna o ID da build atual do Guild Wars 2"""
    try:
        return await gw2_service.get_build()
    except Exception as e:
        logger.error(f"Erro ao obter build: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/worlds")
async def get_worlds():
    """Retorna lista de mundos do Guild Wars 2"""
    try:
        return await gw2_service.get_worlds()
    except Exception as e:
        logger.error(f"Erro ao obter mundos: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/worlds/{world_id}", response_model=GW2APIWorld)
async def get_world_by_id(world_id: int):
    """Retorna informações de um mundo específico"""
    try:
        return await gw2_service.get_world_by_id(world_id)
    except Exception as e:
        logger.error(f"Erro ao obter mundo {world_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/items")
async def get_items(ids: Optional[str] = Query(None, description="IDs dos itens separados por vírgula")):
    """Retorna lista de IDs de itens ou informações de itens específicos"""
    try:
        item_ids = None
        if ids:
            item_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_items(item_ids)
    except Exception as e:
        logger.error(f"Erro ao obter itens: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/items/{item_id}", response_model=GW2APIItem)
async def get_item_by_id(item_id: int):
    """Retorna informações de um item específico"""
    try:
        return await gw2_service.get_item_by_id(item_id)
    except Exception as e:
        logger.error(f"Erro ao obter item {item_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/achievements")
async def get_achievements(ids: Optional[str] = Query(None, description="IDs das conquistas separados por vírgula")):
    """Retorna lista de IDs de conquistas ou informações de conquistas específicas"""
    try:
        achievement_ids = None
        if ids:
            achievement_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_achievements(achievement_ids)
    except Exception as e:
        logger.error(f"Erro ao obter conquistas: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/achievements/{achievement_id}", response_model=GW2APIAchievement)
async def get_achievement_by_id(achievement_id: int):
    """Retorna informações de uma conquista específica"""
    try:
        return await gw2_service.get_achievement_by_id(achievement_id)
    except Exception as e:
        logger.error(f"Erro ao obter conquista {achievement_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/achievements/daily")
async def get_daily_achievements():
    """Retorna conquistas diárias"""
    try:
        return await gw2_service.get_daily_achievements()
    except Exception as e:
        logger.error(f"Erro ao obter conquistas diárias: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/achievements/daily/tomorrow")
async def get_tomorrow_achievements():
    """Retorna conquistas de amanhã"""
    try:
        return await gw2_service.get_tomorrow_achievements()
    except Exception as e:
        logger.error(f"Erro ao obter conquistas de amanhã: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/achievements/groups")
async def get_achievement_groups(ids: Optional[str] = Query(None, description="IDs dos grupos separados por vírgula")):
    """Retorna grupos de conquistas"""
    try:
        group_ids = None
        if ids:
            group_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_achievement_groups(group_ids)
    except Exception as e:
        logger.error(f"Erro ao obter grupos de conquistas: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/achievements/categories")
async def get_achievement_categories(ids: Optional[str] = Query(None, description="IDs das categorias separados por vírgula")):
    """Retorna categorias de conquistas"""
    try:
        category_ids = None
        if ids:
            category_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_achievement_categories(category_ids)
    except Exception as e:
        logger.error(f"Erro ao obter categorias de conquistas: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/maps")
async def get_maps(ids: Optional[str] = Query(None, description="IDs dos mapas separados por vírgula")):
    """Retorna mapas"""
    try:
        map_ids = None
        if ids:
            map_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_maps(map_ids)
    except Exception as e:
        logger.error(f"Erro ao obter mapas: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/maps/{map_id}")
async def get_map_by_id(map_id: int):
    """Retorna informações de um mapa específico"""
    try:
        return await gw2_service.get_map_by_id(map_id)
    except Exception as e:
        logger.error(f"Erro ao obter mapa {map_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/continents")
async def get_continents(ids: Optional[str] = Query(None, description="IDs dos continentes separados por vírgula")):
    """Retorna continentes"""
    try:
        continent_ids = None
        if ids:
            continent_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_continents(continent_ids)
    except Exception as e:
        logger.error(f"Erro ao obter continentes: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/continents/{continent_id}")
async def get_continent_by_id(continent_id: int):
    """Retorna informações de um continente específico"""
    try:
        return await gw2_service.get_continent_by_id(continent_id)
    except Exception as e:
        logger.error(f"Erro ao obter continente {continent_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/races")
async def get_races():
    """Retorna raças disponíveis"""
    try:
        return await gw2_service.get_races()
    except Exception as e:
        logger.error(f"Erro ao obter raças: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/professions")
async def get_professions():
    """Retorna profissões disponíveis"""
    try:
        return await gw2_service.get_professions()
    except Exception as e:
        logger.error(f"Erro ao obter profissões: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/skills")
async def get_skills(ids: Optional[str] = Query(None, description="IDs das habilidades separados por vírgula")):
    """Retorna habilidades"""
    try:
        skill_ids = None
        if ids:
            skill_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_skills(skill_ids)
    except Exception as e:
        logger.error(f"Erro ao obter habilidades: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/skills/{skill_id}")
async def get_skill_by_id(skill_id: int):
    """Retorna informações de uma habilidade específica"""
    try:
        return await gw2_service.get_skill_by_id(skill_id)
    except Exception as e:
        logger.error(f"Erro ao obter habilidade {skill_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/traits")
async def get_traits(ids: Optional[str] = Query(None, description="IDs das características separados por vírgula")):
    """Retorna características"""
    try:
        trait_ids = None
        if ids:
            trait_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_traits(trait_ids)
    except Exception as e:
        logger.error(f"Erro ao obter características: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/traits/{trait_id}")
async def get_trait_by_id(trait_id: int):
    """Retorna informações de uma característica específica"""
    try:
        return await gw2_service.get_trait_by_id(trait_id)
    except Exception as e:
        logger.error(f"Erro ao obter característica {trait_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/specializations")
async def get_specializations(ids: Optional[str] = Query(None, description="IDs das especializações separados por vírgula")):
    """Retorna especializações"""
    try:
        spec_ids = None
        if ids:
            spec_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_specializations(spec_ids)
    except Exception as e:
        logger.error(f"Erro ao obter especializações: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/specializations/{specialization_id}")
async def get_specialization_by_id(specialization_id: int):
    """Retorna informações de uma especialização específica"""
    try:
        return await gw2_service.get_specialization_by_id(specialization_id)
    except Exception as e:
        logger.error(f"Erro ao obter especialização {specialization_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/legends")
async def get_legends():
    """Retorna lendas de revenant"""
    try:
        return await gw2_service.get_legends()
    except Exception as e:
        logger.error(f"Erro ao obter lendas: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/pets")
async def get_pets(ids: Optional[str] = Query(None, description="IDs dos pets separados por vírgula")):
    """Retorna pets"""
    try:
        pet_ids = None
        if ids:
            pet_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_pets(pet_ids)
    except Exception as e:
        logger.error(f"Erro ao obter pets: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/pets/{pet_id}")
async def get_pet_by_id(pet_id: int):
    """Retorna informações de um pet específico"""
    try:
        return await gw2_service.get_pet_by_id(pet_id)
    except Exception as e:
        logger.error(f"Erro ao obter pet {pet_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/mounts/types")
async def get_mounts_types():
    """Retorna tipos de montarias"""
    try:
        return await gw2_service.get_mounts_types()
    except Exception as e:
        logger.error(f"Erro ao obter tipos de montarias: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/mounts/skins")
async def get_mounts_skins(ids: Optional[str] = Query(None, description="IDs das skins de montarias separados por vírgula")):
    """Retorna skins de montarias"""
    try:
        skin_ids = None
        if ids:
            skin_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_mounts_skins(skin_ids)
    except Exception as e:
        logger.error(f"Erro ao obter skins de montarias: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/outfits")
async def get_outfits(ids: Optional[str] = Query(None, description="IDs dos outfits separados por vírgula")):
    """Retorna outfits"""
    try:
        outfit_ids = None
        if ids:
            outfit_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_outfits(outfit_ids)
    except Exception as e:
        logger.error(f"Erro ao obter outfits: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/outfits/{outfit_id}")
async def get_outfit_by_id(outfit_id: int):
    """Retorna informações de um outfit específico"""
    try:
        return await gw2_service.get_outfit_by_id(outfit_id)
    except Exception as e:
        logger.error(f"Erro ao obter outfit {outfit_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/skins")
async def get_skins(ids: Optional[str] = Query(None, description="IDs das skins separados por vírgula")):
    """Retorna skins"""
    try:
        skin_ids = None
        if ids:
            skin_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_skins(skin_ids)
    except Exception as e:
        logger.error(f"Erro ao obter skins: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/skins/{skin_id}")
async def get_skin_by_id(skin_id: int):
    """Retorna informações de uma skin específica"""
    try:
        return await gw2_service.get_skin_by_id(skin_id)
    except Exception as e:
        logger.error(f"Erro ao obter skin {skin_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/minis")
async def get_minis(ids: Optional[str] = Query(None, description="IDs dos minis separados por vírgula")):
    """Retorna minis"""
    try:
        mini_ids = None
        if ids:
            mini_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_minis(mini_ids)
    except Exception as e:
        logger.error(f"Erro ao obter minis: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/minis/{mini_id}")
async def get_mini_by_id(mini_id: int):
    """Retorna informações de um mini específico"""
    try:
        return await gw2_service.get_mini_by_id(mini_id)
    except Exception as e:
        logger.error(f"Erro ao obter mini {mini_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/titles")
async def get_titles(ids: Optional[str] = Query(None, description="IDs dos títulos separados por vírgula")):
    """Retorna títulos"""
    try:
        title_ids = None
        if ids:
            title_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_titles(title_ids)
    except Exception as e:
        logger.error(f"Erro ao obter títulos: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/titles/{title_id}")
async def get_title_by_id(title_id: int):
    """Retorna informações de um título específico"""
    try:
        return await gw2_service.get_title_by_id(title_id)
    except Exception as e:
        logger.error(f"Erro ao obter título {title_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/colors")
async def get_dyes(ids: Optional[str] = Query(None, description="IDs dos corantes separados por vírgula")):
    """Retorna corantes"""
    try:
        dye_ids = None
        if ids:
            dye_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_dyes(dye_ids)
    except Exception as e:
        logger.error(f"Erro ao obter corantes: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/colors/{dye_id}")
async def get_dye_by_id(dye_id: int):
    """Retorna informações de um corante específico"""
    try:
        return await gw2_service.get_dye_by_id(dye_id)
    except Exception as e:
        logger.error(f"Erro ao obter corante {dye_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/currencies")
async def get_currencies(ids: Optional[str] = Query(None, description="IDs das moedas separados por vírgula")):
    """Retorna moedas"""
    try:
        currency_ids = None
        if ids:
            currency_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_currencies(currency_ids)
    except Exception as e:
        logger.error(f"Erro ao obter moedas: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/currencies/{currency_id}")
async def get_currency_by_id(currency_id: int):
    """Retorna informações de uma moeda específica"""
    try:
        return await gw2_service.get_currency_by_id(currency_id)
    except Exception as e:
        logger.error(f"Erro ao obter moeda {currency_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/materials")
async def get_materials(ids: Optional[str] = Query(None, description="IDs dos materiais separados por vírgula")):
    """Retorna materiais"""
    try:
        material_ids = None
        if ids:
            material_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_materials(material_ids)
    except Exception as e:
        logger.error(f"Erro ao obter materiais: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/materials/{material_id}")
async def get_material_by_id(material_id: int):
    """Retorna informações de um material específico"""
    try:
        return await gw2_service.get_material_by_id(material_id)
    except Exception as e:
        logger.error(f"Erro ao obter material {material_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/recipes")
async def get_recipes(ids: Optional[str] = Query(None, description="IDs das receitas separados por vírgula")):
    """Retorna receitas"""
    try:
        recipe_ids = None
        if ids:
            recipe_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_recipes(recipe_ids)
    except Exception as e:
        logger.error(f"Erro ao obter receitas: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/recipes/{recipe_id}")
async def get_recipe_by_id(recipe_id: int):
    """Retorna informações de uma receita específica"""
    try:
        return await gw2_service.get_recipe_by_id(recipe_id)
    except Exception as e:
        logger.error(f"Erro ao obter receita {recipe_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/recipes/search")
async def search_recipes(input_item_id: int = Query(..., description="ID do item de entrada")):
    """Busca receitas por item de entrada"""
    try:
        return await gw2_service.search_recipes(input_item_id)
    except Exception as e:
        logger.error(f"Erro ao buscar receitas para item {input_item_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/dungeons")
async def get_dungeons(ids: Optional[str] = Query(None, description="IDs das masmorras separados por vírgula")):
    """Retorna masmorras"""
    try:
        dungeon_ids = None
        if ids:
            dungeon_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_dungeons(dungeon_ids)
    except Exception as e:
        logger.error(f"Erro ao obter masmorras: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/dungeons/{dungeon_id}")
async def get_dungeon_by_id(dungeon_id: int):
    """Retorna informações de uma masmorra específica"""
    try:
        return await gw2_service.get_dungeon_by_id(dungeon_id)
    except Exception as e:
        logger.error(f"Erro ao obter masmorra {dungeon_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/raids")
async def get_raids(ids: Optional[str] = Query(None, description="IDs das raids separados por vírgula")):
    """Retorna raids"""
    try:
        raid_ids = None
        if ids:
            raid_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_raids(raid_ids)
    except Exception as e:
        logger.error(f"Erro ao obter raids: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/raids/{raid_id}")
async def get_raid_by_id(raid_id: int):
    """Retorna informações de uma raid específica"""
    try:
        return await gw2_service.get_raid_by_id(raid_id)
    except Exception as e:
        logger.error(f"Erro ao obter raid {raid_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/guild/{guild_id}")
async def get_guild_by_id(guild_id: str):
    """Retorna informações de uma guilda específica"""
    try:
        return await gw2_service.get_guild_by_id(guild_id)
    except Exception as e:
        logger.error(f"Erro ao obter guilda {guild_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/guild/{guild_id}/emblem")
async def get_guild_emblem(guild_id: str):
    """Retorna emblema de uma guilda"""
    try:
        return await gw2_service.get_guild_emblem(guild_id)
    except Exception as e:
        logger.error(f"Erro ao obter emblema da guilda {guild_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/guild/permissions")
async def get_guild_permissions(ids: Optional[str] = Query(None, description="IDs das permissões separados por vírgula")):
    """Retorna permissões de guilda"""
    try:
        permission_ids = None
        if ids:
            permission_ids = [id.strip() for id in ids.split(",")]
        return await gw2_service.get_guild_permissions(permission_ids)
    except Exception as e:
        logger.error(f"Erro ao obter permissões de guilda: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/guild/search")
async def search_guilds(name: str = Query(..., description="Nome da guilda")):
    """Busca guildas por nome"""
    try:
        return await gw2_service.search_guilds(name)
    except Exception as e:
        logger.error(f"Erro ao buscar guildas com nome '{name}': {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/guild/upgrades")
async def get_guild_upgrades(ids: Optional[str] = Query(None, description="IDs dos upgrades separados por vírgula")):
    """Retorna upgrades de guilda"""
    try:
        upgrade_ids = None
        if ids:
            upgrade_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_guild_upgrades(upgrade_ids)
    except Exception as e:
        logger.error(f"Erro ao obter upgrades de guilda: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

# Endpoints autenticados (requerem chave de API)
@router.get("/account", response_model=GW2APIAccount)
async def get_account_info(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna informações da conta"""
    try:
        return await gw2_service.get_account_info(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter informações da conta: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/account/achievements")
async def get_account_achievements(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna progresso das conquistas da conta"""
    try:
        return await gw2_service.get_account_achievements(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter conquistas da conta: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/account/bank")
async def get_account_bank(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna banco da conta"""
    try:
        return await gw2_service.get_account_bank(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter banco da conta: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/characters")
async def get_account_characters(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna lista de personagens da conta"""
    try:
        return await gw2_service.get_account_characters(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter personagens da conta: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/characters/{character_name}", response_model=GW2APICharacter)
async def get_character_info(character_name: str, api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna informações de um personagem específico"""
    try:
        return await gw2_service.get_character_info(character_name, api_key)
    except Exception as e:
        logger.error(f"Erro ao obter informações do personagem {character_name}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/account/wallet")
async def get_account_wallet(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna carteira da conta"""
    try:
        return await gw2_service.get_account_wallet(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter carteira da conta: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/account/materials")
async def get_account_materials(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna armazenamento de materiais da conta"""
    try:
        return await gw2_service.get_account_materials(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter materiais da conta: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/account/dungeons")
async def get_account_dungeons(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna masmorras completadas diariamente"""
    try:
        return await gw2_service.get_account_dungeons(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter masmorras da conta: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/account/dailycrafting")
async def get_account_daily_crafting(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna materiais criados diariamente"""
    try:
        return await gw2_service.get_account_daily_crafting(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter crafting diário da conta: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/account/mapchests")
async def get_account_map_chests(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna baús de mapa coletados diariamente"""
    try:
        return await gw2_service.get_account_map_chests(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter baús de mapa da conta: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/account/worldbosses")
async def get_account_world_bosses(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna chefes mundiais derrotados diariamente"""
    try:
        return await gw2_service.get_account_world_bosses(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter chefes mundiais da conta: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/tokeninfo")
async def get_token_info(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna informações sobre a chave de API"""
    try:
        return await gw2_service.get_token_info(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter informações do token: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

# WvW endpoints
@router.get("/wvw/matches")
async def get_wvw_matches(world_id: Optional[int] = Query(None, description="ID do mundo")):
    """Retorna partidas WvW"""
    try:
        return await gw2_service.get_wvw_matches(world_id)
    except Exception as e:
        logger.error(f"Erro ao obter partidas WvW: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/wvw/matches/{match_id}")
async def get_wvw_match_details(match_id: str):
    """Retorna detalhes de uma partida WvW"""
    try:
        return await gw2_service.get_wvw_match_details(match_id)
    except Exception as e:
        logger.error(f"Erro ao obter detalhes da partida WvW {match_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/wvw/objectives")
async def get_wvw_objectives(ids: Optional[str] = Query(None, description="IDs dos objetivos separados por vírgula")):
    """Retorna objetivos WvW"""
    try:
        objective_ids = None
        if ids:
            objective_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_wvw_objectives(objective_ids)
    except Exception as e:
        logger.error(f"Erro ao obter objetivos WvW: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/wvw/ranks")
async def get_wvw_ranks(ids: Optional[str] = Query(None, description="IDs dos ranks separados por vírgula")):
    """Retorna ranks WvW"""
    try:
        rank_ids = None
        if ids:
            rank_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_wvw_ranks(rank_ids)
    except Exception as e:
        logger.error(f"Erro ao obter ranks WvW: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/wvw/abilities")
async def get_wvw_abilities(ids: Optional[str] = Query(None, description="IDs das habilidades separados por vírgula")):
    """Retorna habilidades WvW"""
    try:
        ability_ids = None
        if ids:
            ability_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_wvw_abilities(ability_ids)
    except Exception as e:
        logger.error(f"Erro ao obter habilidades WvW: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/wvw/upgrades")
async def get_wvw_upgrades(ids: Optional[str] = Query(None, description="IDs dos upgrades separados por vírgula")):
    """Retorna upgrades WvW"""
    try:
        upgrade_ids = None
        if ids:
            upgrade_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_wvw_upgrades(upgrade_ids)
    except Exception as e:
        logger.error(f"Erro ao obter upgrades WvW: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

# Trading Post endpoints
@router.get("/commerce/listings")
async def get_trading_post_listings(ids: Optional[str] = Query(None, description="IDs dos itens separados por vírgula")):
    """Retorna listagens do Trading Post"""
    try:
        item_ids = None
        if ids:
            item_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_trading_post_listings(item_ids)
    except Exception as e:
        logger.error(f"Erro ao obter listagens do Trading Post: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/commerce/prices")
async def get_trading_post_prices(ids: Optional[str] = Query(None, description="IDs dos itens separados por vírgula")):
    """Retorna preços do Trading Post"""
    try:
        item_ids = None
        if ids:
            item_ids = [int(id.strip()) for id in ids.split(",")]
        return await gw2_service.get_trading_post_prices(item_ids)
    except Exception as e:
        logger.error(f"Erro ao obter preços do Trading Post: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/commerce/exchange/coins")
async def get_exchange_coins_to_gems(coins: int = Query(..., description="Quantidade de moedas")):
    """Retorna taxa de câmbio de moedas para gemas"""
    try:
        return await gw2_service.get_exchange_coins_to_gems(coins)
    except Exception as e:
        logger.error(f"Erro ao obter taxa de câmbio moedas->gemas: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/commerce/exchange/gems")
async def get_exchange_gems_to_coins(gems: int = Query(..., description="Quantidade de gemas")):
    """Retorna taxa de câmbio de gemas para moedas"""
    try:
        return await gw2_service.get_exchange_gems_to_coins(gems)
    except Exception as e:
        logger.error(f"Erro ao obter taxa de câmbio gemas->moedas: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/commerce/transactions")
async def get_trading_post_transactions(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna transações do Trading Post"""
    try:
        return await gw2_service.get_trading_post_transactions(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter transações do Trading Post: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/commerce/delivery")
async def get_trading_post_delivery(api_key: str = Query(..., description="Chave de API do Guild Wars 2")):
    """Retorna itens disponíveis para retirada"""
    try:
        return await gw2_service.get_trading_post_delivery(api_key)
    except Exception as e:
        logger.error(f"Erro ao obter delivery do Trading Post: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")
