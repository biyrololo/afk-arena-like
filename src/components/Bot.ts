import type Character from "./Character";
import type { CharacterAttackType } from "./Character";
import { Character as CharacterNS } from '@/shared/types/character'

export class BotController {
    private scene: Phaser.Scene;
    private character: Character;
    private enemies: Character[];
    private state: 'idle' | 'moving' | 'attacking' | 'cooldown' = 'idle';
    private currentTarget: Character | null = null;
    private currentAttack: CharacterAttackType = 'attack1';
    private attackCooldown = 1000;
    private lastAttackTime = 0;
    private isFirstTargetPick = true;
    private botIndex: number = 0;

    // private startedAt = 0;
    // private startTimer = 0;

    private shouldSpecialAttack = false;

    private randomOffset = { x: 0, y: 0 };

    constructor(scene: Phaser.Scene, character: Character, enemies: Character[],
        botIndex: number,
        attackCooldown = 1000,
    ) {
        this.scene = scene;
        this.character = character;
        this.enemies = enemies;
        this.attackCooldown = attackCooldown;

        this.botIndex = botIndex;

        this.randomOffset = {
            x: Phaser.Math.Between(-20, 20),
            y: 0
        };

        // this.startedAt = Date.now();

        // const role = this.character.getRole();
        // switch (role) {
        //     case CharacterNS.Role.TANK: {
        //         this.startTimer = 0;
        //         break;
        //     }
        //     case CharacterNS.Role.WARRIOR: {
        //         this.startTimer = 500;
        //         break;
        //     }
        //     case CharacterNS.Role.ASSASSIN: {
        //         this.startTimer = 1200;
        //         break;
        //     }
        // }
    }

    public getCharacter(): Character {
        return this.character;
    }

    public useSpecialAttack() {
        this.shouldSpecialAttack = true;
        if (this.state !== 'attacking') {
            this.pickAttack();
            this.shouldSpecialAttack = false;
        }
        this.character.setEnergy(0);
    }

    update(time: number, _: number) {
        if (this.state === 'cooldown' && time - this.lastAttackTime < this.attackCooldown) {
            return; // ждём окончания кд
        }

        // const now = Date.now();
        // if(now - this.startedAt < this.startTimer) {
        //     return;
        // }

        this.pickTarget();

        if (!this.currentTarget) return;

        const hp = this.character.getHitbox();

        const thp = this.currentTarget.getHitbox();


        // const required = this.character.attacksDistances[this.currentAttack];
        const required = this.character.getAttackDistance(this.currentAttack);

        const targetCenterX = thp.centerX + this.randomOffset.x;
        const targetBottomY = thp.bottom + this.randomOffset.y;

        const distToTargetEdge = hp.centerX > targetCenterX ? hp.left - thp.right : hp.centerX < targetCenterX ? thp.left - hp.right : 0;
        const distToTargetEdgeY = hp.bottom - targetBottomY;

        const isOnLeft = hp.centerX < targetCenterX;

        let targetX = undefined, targetY = undefined;

        if (this.state !== 'attacking') {
            if (distToTargetEdge > required.x) {
                // console.log('dist x higher')
                // console.log('moving', dist, Math.hypot(required.x, required.y), required);
                // подходим
                this.state = 'moving';
                targetX = isOnLeft ? this.character.getX() + distToTargetEdge : this.character.getX() - distToTargetEdge;
                // this.character.moveTowards(
                //     isOnLeft ? (
                //         this.character.getX() + distToTargetEdge
                //     ) : this.character.getX() - distToTargetEdge, 
                //     this.character.getY(),
                //     undefined,
                //     0
                // );
            } else if (distToTargetEdge < (required.minX ?? required.x - 10)) {
                this.state = 'moving';
                // console.log('dist x lower')
                const offset = required.minX ?? (required.x + 20);
                // this.character.moveTowards(isOnLeft ? thp.left - offset - 20 - hp.width : thp.right + offset + 20 + hp.width, targetBottomY - required.y - offsetY);
                targetX = isOnLeft ? thp.left - offset - 20 - hp.width : thp.right + offset + 20 + hp.width;
            }
            if (distToTargetEdgeY < (required.minY ?? -10)) {
                this.state = 'moving';
                // console.log('dist y lower')
                // this.character.moveTowards(this.character.getX(), this.character.getY() - distToTargetEdgeY + 30, undefined, 0)
                if (required.minY !== undefined && required.minY > -10) {
                    targetY = this.character.getY() + 30;
                } else {
                    targetY = this.character.getY() - distToTargetEdgeY + 30;
                }
            }
            else if (distToTargetEdgeY > required.y) {
                this.state = 'moving';
                // console.log('dist y higher')
                // this.character.moveTowards(this.character.getX(), this.character.getY() - distToTargetEdgeY - 30, undefined, 0)
                targetY = this.character.getY() - distToTargetEdgeY - 30;
            }
        }

        if (targetX === undefined && targetY === undefined) {
            this.character.stopMoving();
            // атакуем
            if (this.state !== 'attacking') {
                const isOnLeft = hp.centerX <= targetCenterX;
                if (this.character.getDirection() !== isOnLeft) this.character.setFlipX(!isOnLeft);
                if (this.currentAttack === 'special') {
                    this.scene.events.emit('ultimateStarted', this.character)
                }
                this.character.playAnimation(this.currentAttack, this.currentAttack);
                this.character.onAnimationEnd = () => {
                    this.pickAttack();
                    // console.log('attack end');
                    if (!this.shouldSpecialAttack) {
                        this.lastAttackTime = time;
                        this.state = 'cooldown';
                    } else {
                        this.shouldSpecialAttack = false;
                        this.state = 'cooldown';
                    }
                    this.character.onAnimationEnd = undefined;
                }
                this.state = 'attacking';
            }
            // this.character.playAttack(this.currentAttack, () => {
            //     this.character.hitTarget(this.currentTarget, this.currentAttack);
            //     this.lastAttackTime = time;
            //     this.state = 'cooldown';
            // });
        }
        if (this.state === 'moving') {
            this.character.moveTowards(targetX ?? this.character.getX(), targetY ?? this.character.getY(), undefined, 0);
        }
    }

    private pickTarget() {
        // Если цель жива, то оставляем
        if (this.currentTarget && !this.currentTarget.isDestroyed() && !this.currentTarget.getIsDead() && this.currentTarget.getHP() > 0) {
            return;
        }

        this.currentTarget = null;

        if (this.isFirstTargetPick) {
            const aliveEnemies = this.enemies.filter(e => !e.getIsDead() && e.getHP() > 0);
            if (aliveEnemies.length === 0) {
                this.currentTarget = null;
                return;
            };
            // Используем остаток от деления, если врагов меньше, чем наших героев
            const targetIndex = this.botIndex % aliveEnemies.length;
            this.currentTarget = aliveEnemies[targetIndex];
            this.isFirstTargetPick = false;
            return; // Выходим, так как цель назначена
        }

        const sortedEnemies = this.enemies
            .filter(e => !e.getIsDead() && e.getHP() > 0)
            .sort((a, b) => Phaser.Math.Distance.Between(this.character.x, this.character.y, a.x, a.y)
                - Phaser.Math.Distance.Between(this.character.x, this.character.y, b.x, b.y))

        const myRole = this.character.getRole();

        const getNByRole = (role: CharacterNS.Role, n = -1) => {
            if (n == -1) n = Math.random() >= 0.5 ? 1 : 0;
            const enemies = sortedEnemies.filter(e => e.getRole() === role);
            return enemies[n] || enemies[0];
        }

        switch (myRole) {
            case CharacterNS.Role.TANK: {
                // Приоритет - вражеский танк
                this.currentTarget = getNByRole(CharacterNS.Role.TANK) || sortedEnemies[0] || null;
                break;
            }

            case CharacterNS.Role.WARRIOR: {
                // Приоритет - вражеский танк
                const idx = Math.random() >= 0.5 ? 1 : 0;
                this.currentTarget = getNByRole(CharacterNS.Role.TANK)
                    || getNByRole(CharacterNS.Role.ASSASSIN)
                    || sortedEnemies[idx] || sortedEnemies[0] || null;
                break;
            }

            case CharacterNS.Role.ASSASSIN: {
                const weakEnemies = [...sortedEnemies].sort((a, b) => (a.getHP() * (1 + a.getBaseStats().defense / 200)) - b.getHP() * (1 + b.getBaseStats().defense / 200));
                // Берем случайного из первой двойки (если их больше одного)
                const index = (weakEnemies.length > 1 && Math.random() > 0.5) ? 1 : 0;
                this.currentTarget = weakEnemies[index] || null;
                break;
            }
        }
    }

    private pickAttack() {
        if (this.shouldSpecialAttack) {
            this.currentAttack = 'special';
            return;
        }
        const { attacksCount } = this.character.getAttacksConfig();

        const randomAttack = Math.floor(Math.random() * attacksCount) + 1;

        this.currentAttack = `attack${randomAttack}`;
    }
}
