export class Bot {
    constructor(scene, x, y) {
      this.scene = scene;
      this.sprite = scene.add.circle(x, y, 20, 0xff0000);
      scene.physics.add.existing(this.sprite);
      this.hp = 100;
      this.maxHp = 100;
    }
  
    update() {
      // optional: AI logic in viitor
    }
  }
  