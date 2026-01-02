import Phaser from 'phaser';

const sizes = {
  width: 1400,
  height: 800
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: sizes.width,
  height: sizes.height,
  // scale: {
  //   mode: Phaser.Scale.RESIZE,
  //   autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  // }
};

export const startGame = (parent: string | HTMLElement, scenes: Phaser.Types.Scenes.SceneType[]) => new Phaser.Game({
    ...config,
    scene: scenes,
    parent
});