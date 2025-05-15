import { Projectile } from "./projectile.js";

export class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.add.circle(x, y, 20, 0x00ff00);
    scene.physics.add.existing(this.sprite);
    this.target = new Phaser.Math.Vector2(x, y);
    this.speed = 100;

    this.hp = 100;
    this.maxHp = 100;
    this.cooldowns = { q: 0, w: 0, e: 0, r: 0 };
    this.projectiles = [];
  }

  setMoveTarget(x, y) {
    this.target.set(x, y);
  }

  handleKey(key) {
    if (this.cooldowns[key] > 0) return;
    if (key === "q") this.castQ();
    // W, E, R la fel...
  }

  castQ() {
    const angle = Phaser.Math.Angle.Between(
      this.sprite.x,
      this.sprite.y,
      this.scene.input.activePointer.worldX,
      this.scene.input.activePointer.worldY
    );
    const proj = new Projectile(this.scene, this.sprite.x, this.sprite.y, angle, "cyan");
    this.projectiles.push(proj);
    this.cooldowns.q = 60;
  }

  update(bot) {
    const dist = Phaser.Math.Distance.BetweenPoints(this.sprite, this.target);
    if (dist > 2) {
      const dir = this.target.clone().subtract(this.sprite).normalize();
      this.sprite.x += dir.x * this.speed * this.scene.game.loop.delta / 1000;
      this.sprite.y += dir.y * this.speed * this.scene.game.loop.delta / 1000;
    }

    for (let key in this.cooldowns) {
      if (this.cooldowns[key] > 0) this.cooldowns[key]--;
    }

    for (let p of this.projectiles) p.update(bot);
    this.projectiles = this.projectiles.filter(p => !p.dead);
  }
}
