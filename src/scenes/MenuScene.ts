export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: 'MenuScene'});
    }

    preload() {
        this.load.image('menuBackground', 'assets/backgrounds/tavern.png');
    }

    create(): void {
        const bg = this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);
        bg.displayWidth = this.scale.width;
        bg.displayHeight = this.scale.height;
    }
}