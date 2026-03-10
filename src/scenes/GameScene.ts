import { BotController } from "@/components/Bot";
import Character from "@/components/Character";
import { EventBus } from "@/utils/eventBus";
import Phaser from "phaser";
import type { PlayerCharacter, PlayerCharacterWithState } from "@/shared/types/PlayerCharacter";
import generateCharacter from "@/characters/characters";
import type { IStage } from "@/entities/chapter/lib/chapter.model";
import { calculateStatsWithEquipment } from "@/shared/types/develop";

import crystalKing from "@/assets/crystalKing.png";
import fireKing from "@/assets/fireKing.png";
import frostGuardian from "@/assets/frost_guardian.png";
import warrior from "@/assets/characters/warrior.png";
import spearwoman from "@/assets/characters/spearwoman.png";
import viking from "@/assets/characters/viking.png";
import firewarrior from "@/assets/characters/firewarrior.png";
import demonSlime from "@/assets/characters/demonSlime.png";
import elementalWind from "@/assets/characters/elementalWind.png";
import groundMonk from "@/assets/characters/groundMonk.png";
import waterPriestess from "@/assets/characters/waterPriestess.png";
import blueSlime from "@/assets/characters/blueSlime.png";
import greenSlime from "@/assets/characters/greenSlime.png";
import purpleSlime from "@/assets/characters/purpleSlime.png";
import fantasyWarrior from "@/assets/characters/fantasyWarrior.png";
import kitsune from "@/assets/characters/kitsune.png";
import minotaur from "@/assets/characters/minotaur.png";
import bringerOfDeath from "@/assets/characters/bringerOfDeath.png";
import nightBorne from "@/assets/characters/nightBorne.png";
import knight from '@/assets/characters/knight.png'
import steelKnight from '@/assets/characters/steelKnight.png'
import heroKnight from '@/assets/characters/heroKnight.png'
import martialHero from '@/assets/characters/martialHero.png'
import oldGolem from '@/assets/characters/oldGolem.png'
import oldGuardian from '@/assets/characters/oldGuardian.png'

import magic_field_bg from "@/assets/backgrounds/magic_field.png";
import castle_bg from "@/assets/backgrounds/castle.webp";

import flamie_bg from "@/assets/backgrounds/flamie_bg.webp";
import ice_bg from "@/assets/backgrounds/ice_bg.webp";
import abyss_bg from "@/assets/backgrounds/abyss_bg.webp";
import abyss_bg_2 from "@/assets/backgrounds/abyss_bg_2.webp";
import sand_bg from "@/assets/backgrounds/sand_bg.webp";
import crystal_bg from "@/assets/backgrounds/crystal_bg.webp";
import grass_bg from "@/assets/backgrounds/grass_bg.webp";
import sky_bg from "@/assets/backgrounds/sky_bg.webp";
import volcano_bg from "@/assets/backgrounds/volcano_bg.webp";
import ancient_bg from "@/assets/backgrounds/ancient_bg.webp";
import night_castle_bg from "@/assets/backgrounds/night_castle_bg.webp";
import ice_lake_bg from "@/assets/backgrounds/ice_lake_bg.webp";
import snow_bg from "@/assets/backgrounds/snow_bg.webp";

export default class GameScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image;

  private allies: Character[] = [];
  private enemies: Character[] = [];

  private alliesPositions = [
    { x: 200, y: 400 + 70 }, // Верх (Warrior/Assassin)
    { x: 420, y: 550 + 70 }, // Центр-перед (TANK)
    { x: 300, y: 820 + 70 }, // Низ (Warrior/Assassin)
    { x: 80, y: 640 + 70 }, // Глубокий тыл (если будет 4-й юнит)
  ];

  // Enemies (Зеркально)
  private enemiesPositions = this.alliesPositions.map(p => ({
    x: 1920 - p.x,
    y: p.y
  }));

  /**
   * Боты
   */
  private bots: BotController[] = [];

  private stage: IStage | null = null;

  constructor() {
    super({ key: "GameScene" });
  }

  public getAllies(): Character[] {
    return this.allies;
  }

  public addAlly(ally: Character) {
    this.allies.push(ally);
  }

  public getEnemies(): Character[] {
    return this.enemies;
  }

  public addEnemy(enemy: Character) {
    this.enemies.push(enemy);
  }

  preload(): void {
    this.load.spritesheet("crystalKing", crystalKing, {
      frameWidth: 288,
      frameHeight: 128,
    });
    this.load.spritesheet("fireKing", fireKing, {
      frameWidth: 288,
      frameHeight: 128,
    });
    this.load.spritesheet("frostGuardian", frostGuardian, {
      frameWidth: 192,
      frameHeight: 128,
    });
    this.load.spritesheet("warrior", warrior, {
      frameWidth: 69,
      frameHeight: 44,
    });
    this.load.spritesheet("spearwoman", spearwoman, {
      frameWidth: 128,
      frameHeight: 115,
    });
    this.load.spritesheet("viking", viking, {
      frameWidth: 115,
      frameHeight: 84,
    });
    this.load.spritesheet("firewarrior", firewarrior, {
      frameWidth: 144,
      frameHeight: 80,
    });
    this.load.spritesheet("demonSlime", demonSlime, {
      frameWidth: 288,
      frameHeight: 160,
    });
    this.load.spritesheet("elementalWind", elementalWind, {
      frameWidth: 288,
      frameHeight: 128,
    });
    this.load.spritesheet("groundMonk", groundMonk, {
      frameWidth: 288,
      frameHeight: 128,
    });
    this.load.spritesheet("waterPriestess", waterPriestess, {
      frameWidth: 288,
      frameHeight: 128,
    });
    this.load.spritesheet("blueSlime", blueSlime, {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("greenSlime", greenSlime, {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("purpleSlime", purpleSlime, {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("fantasyWarrior", fantasyWarrior, {
      frameWidth: 162,
      frameHeight: 162,
    });
    this.load.spritesheet("kitsune", kitsune, {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("minotaur", minotaur, {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("bringerOfDeath", bringerOfDeath, {
      frameWidth: 140,
      frameHeight: 93,
    });
    this.load.spritesheet("nightBorne", nightBorne, {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("knight", knight, {
      frameWidth: 135,
      frameHeight: 135,
    });
    this.load.spritesheet("steelKnight", steelKnight, {
      frameWidth: 180,
      frameHeight: 180,
    });
    this.load.spritesheet("heroKnight", heroKnight, {
      frameWidth: 140,
      frameHeight: 140,
    });
    this.load.spritesheet("martialHero", martialHero, {
      frameWidth: 200,
      frameHeight: 200,
    });
    this.load.spritesheet("oldGolem", oldGolem, {
      frameWidth: 160,
      frameHeight: 160,
    });
    this.load.spritesheet("oldGuardian", oldGuardian, {
      frameWidth: 120,
      frameHeight: 120,
    });

    this.load.font("Birthstone", "assets/fonts/Birthstone-Regular.ttf");

    this.load.image("magic_field_bg", magic_field_bg);
    this.load.image("castle_bg", castle_bg);

    this.load.image("grass_bg", grass_bg);
    this.load.image("flamie_bg", flamie_bg);
    this.load.image("ice_bg", ice_bg);
    this.load.image("abyss_bg", abyss_bg);
    this.load.image("abyss_bg_2", abyss_bg_2);
    this.load.image("sand_bg", sand_bg);
    this.load.image("crystal_bg", crystal_bg);
    this.load.image("sky_bg", sky_bg);
    this.load.image("volcano_bg", volcano_bg);
    this.load.image("ancient_bg", ancient_bg);
    this.load.image("night_castle_bg", night_castle_bg);
    this.load.image("ice_lake_bg", ice_lake_bg);
    this.load.image("snow_bg", snow_bg);

    this.load.on("progress", (value: number) => {
      EventBus.emit("load:progress", value);
    });
  }

  create(): void {
    console.log("CREATE SCENE");

    this.background = this.add.image(0, 0, "magic_field_bg");

    // масштаб по высоте
    const scale = this.scale.width / this.background.width;
    this.background.setScale(scale);

    // центрирование
    this.background.setPosition(this.scale.width / 2, this.scale.height);
    this.background.setOrigin(0.5, 1);

    EventBus.on("addAllies", this.handleAddAllies, this);

    EventBus.on("start", this.handleStart, this);
    EventBus.on("gameOver", this.onGameOver, this);

    EventBus.on("useAllySpecialAttack", this.handleUseAllySpecialAttack, this);

    EventBus.emit("sceneReady", "GameScene");

    this.events.on("destroy", this.onDestroy, this);
    this.events.on("ultimateStarted", this.playUltimateEffect, this);

    EventBus.emit("load:end");
  }

  onDestroy(): void {
    this.children?.removeAll();

    EventBus.off("addAllies", this.handleAddAllies, this);

    EventBus.off("start", this.handleStart, this);
    EventBus.off("gameOver", this.onGameOver, this);

    EventBus.off("useAllySpecialAttack", this.handleUseAllySpecialAttack, this);

    this.events.off("destroy", this.onDestroy, this);
    this.events.off("ultimateStarted", this.playUltimateEffect, this);
  }

  private handleUseAllySpecialAttack(index: number) {
    const ally = this.allies[index];
    if (ally.getEnergy() !== ally.maxEnergy) {
      return;
    }
    if (ally.getHP() <= 0) {
      return;
    }
    const bot = this.bots.find((b) => b.getCharacter() === ally);
    if (bot) {
      bot.useSpecialAttack();
    }
  }

  private handleAddAllies(allies: (PlayerCharacterWithState | null)[]) {
    console.log('handleAddAllies', allies)
    for (const ally of this.allies) {
      ally.destroy(true);
    }

    let teamDmgBonus = 1;
    let teamHpBonus = 1;
    let teamCritChanceBonus = 0;

    // Найти максимальное количество героев 1 фракции
    let maxHeroesPerFaction = 0;
    allies.forEach((ally) => {
      if (ally) {
        const faction = ally.faction;
        const heroesCount = allies.filter((a) => a && a.faction === faction).length;
        if (heroesCount > maxHeroesPerFaction) {
          maxHeroesPerFaction = heroesCount;
        }
      }
    });

    if (maxHeroesPerFaction === 2) {
      teamDmgBonus = 1.1;
      teamHpBonus = 1.1;
    }

    if (maxHeroesPerFaction === 3) {
      teamDmgBonus = 1.2;
      teamHpBonus = 1.2;
    }

    if (maxHeroesPerFaction === 4) {
      teamDmgBonus = 1.3;
      teamHpBonus = 1.3;
      teamCritChanceBonus = 0.1;
    }

    this.allies = [];
    console.log("addAllies", allies);
    allies.forEach((ally, i) => {
      if (ally) {
        this.handleAddAlly(ally, i, { teamDmgBonus, teamHpBonus, teamCritChanceBonus });
      }
    });
  }

  private onGameOver(win: boolean) {
    console.log("game over");
    // this.allies.forEach((ally) => {
    //     if(!ally.isDestroyed())
    //         ally.destroy(true);
    // })
    // this.enemies.forEach((enemy) => {
    //     if(!enemy.isDestroyed())
    //         enemy.destroy(true);
    // })
    // this.allies = [];
    // this.enemies = [];
    // this.bots = [];
    // this.scene.start('MenuScene', { win });

    const alliesState = this.allies.map((ally) => ({
      texture: ally.getTextureKey(),
      energy: ally.getEnergy(),
      maxEnergy: ally.maxEnergy,
      maxHp: ally.getMaxHP(),
      hp: ally.getHP(),
    }));

    console.log("game over state", alliesState);

    EventBus.emit("gameOverUI", {
      win,
      stage: this.stage?.stageNumber,
      chapter: this.stage?.chapterNumber,
      type: this.stage?.type,
      allies: alliesState,
    });
  }

  private handleStart(stage: IStage) {
    this.stage = stage;
    this.background.setTexture(stage.background);
    // масштаб по высоте
    // let scale = this.scale.width / this.background.width;
    // if(this.background.height * scale < this.scale.height) {
    //   scale = this.scale.height / this.background.height;
    // }
    const scale = this.scale.height / this.background.height;
    this.background.setScale(scale);

    stage.enemies.forEach((enemy, i) => {
      if (!enemy) return;
      if (!this.enemiesPositions[i]) return;
      const entity = generateCharacter(this, "enemy", enemy.key as any, {
        ...this.enemiesPositions[i],
        character: calculateStatsWithEquipment(enemy),
      });
      const {
        right,
        bottom
      } = entity.getHitbox();

      entity
        .setPosition(
          entity.getX() + (this.enemiesPositions[i].x - right),
          entity.getY() + (this.enemiesPositions[i].y - bottom)
        )

      if (enemy.state) {
        if (enemy.state.hp) {
          entity.setEnergy(enemy.state.energy);
        }
        if (enemy.state.energy) {
          entity.setEnergy(enemy.state.energy);
        }
        if (enemy.state.baseColor) {
          entity.setBaseColor(enemy.state.baseColor);
        }
      }
    });

    this.allies.forEach((ally, i) => {
      ally.onUpdateHP = () => {
        const hp = ally.getHP();
        EventBus.emit("allyUpdateHP", {
          index: i,
          hp,
        });
      };
      ally.onDeath = () => {
        if (this.allies.filter((a) => a.isAlive()).length === 0) {
          EventBus.emit("gameOver", false);
        }
      };
    });

    this.enemies.forEach((enemy) => {
      enemy.onDeath = () => {
        if (this.enemies.filter((e) => e.isAlive()).length === 0) {
          EventBus.emit("gameOver", true);
        }
      };
    });

    this.allies.forEach((ally) => {
      this.bots.push(new BotController(this, ally, this.enemies, ally.getCooldownAttack()));
    });

    this.enemies.forEach((enemy) => {
      this.bots.push(new BotController(this, enemy, this.allies, enemy.getCooldownAttack()));
    });

    // this.bots.push(
    //     new BotController(this, this.player, this.enemies, 2000),
    //     new BotController(this, this.allies[1], this.enemies, 1000),
    //     new BotController(this, this.enemy, this.allies, 2000),
    //     new BotController(this, this.enemy2, this.allies, 4000)
    // )

    EventBus.emit(
      "createdAllies",
      this.allies.map((a) => ({
        texture: a.getTextureKey(),
        energy: a.getEnergy(),
        maxEnergy: a.maxEnergy,
        maxHp: a.getMaxHP(),
        hp: a.getHP(),
      })),
    );
  }

  private handleAddAlly(ally: PlayerCharacterWithState, index: number, bonuses?: { teamDmgBonus: number, teamHpBonus: number, teamCritChanceBonus: number }) {
    if (ally.state && ally.state.hp <= 0) return;
    const position = this.alliesPositions[index];
    if (!position) {
      throw new Error(`Position for ally ${index} not found`);
    }

    const calculated = calculateStatsWithEquipment(ally);

    if (bonuses) {
      calculated.baseStats.maxHp *= bonuses.teamHpBonus;
      calculated.baseStats.defense *= bonuses.teamDmgBonus;
      calculated.advancedStats.critChance += bonuses.teamCritChanceBonus;
    }

    const entity = generateCharacter(this, "ally", ally.key as any, {
      ...position,
      character: calculated,
    });

    const {
      left,
      bottom
    } = entity.getHitbox();

    entity
      .setPosition(
        entity.getX() + (position.x - left),
        entity.getY() + (position.y - bottom)
      )

    if (ally.state) {
      entity.setHP(ally.state.hp);
      entity.setEnergy(ally.state.energy);
    }
  }

  private highlightCaster(character: Character) {
    const aura = this.add
      .circle(
        character.getHitbox().centerX,
        character.getHitbox().centerY,
        character.getHitbox().height / 3,
        0x00ffff,
        0.35,
      )
      .setDepth(character.depth);

    this.tweens.add({
      targets: aura,
      scale: 1.3,
      alpha: 0,
      duration: 600,
      onComplete: () => aura.destroy(),
    });
  }

  // GameScene.ts
  private playUltimateEffect(character: Character) {
    this.highlightCaster(character);
    this.time.timeScale = 0.3;
    this.tweens.timeScale = 0.3;
    this.anims.globalTimeScale = 0.3;

    this.time.delayedCall(400, () => {
      this.time.timeScale = 1;
      this.tweens.timeScale = 1;
      this.anims.globalTimeScale = 1;
    });
  }

  update(time: number, delta: number): void {
    this.bots
      .sort(
        (a, b) =>
          a.getCharacter().getHitbox().bottom -
          b.getCharacter().getHitbox().bottom,
      )
      .forEach((b, i) => {
        b.getCharacter().setDepth(i);
      });
    this.bots.forEach((b) => {
      b.update(time, delta);
    });
    this.allies.forEach((a) => {
      a.update(time, delta);
    });
    this.enemies.forEach((e) => {
      e.update(time, delta);
    });
  }
}
