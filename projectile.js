export class Projectile {
    constructor(scene, x, y, angle, color = "cyan") {
      this.scene = scene;
      this.sprite = scene.add.circle(x, y, 5, Phaser.Display.Color.HexStringToColor(color).color);
      scene.physics.add.existing(this.sprite);
      this.speed = 300;
      this.vx = Math.cos(angle) * this.speed;
      this.vy = Math.sin(angle) * this.speed;
      this.life = 60;
      this.dead = false;
    }
  
    update(bot) {
      this.sprite.x += this.vx * this.scene.game.loop.delta / 1000;
      this.sprite.y += this.vy * this.scene.game.loop.delta / 1000;
      this.life--;
  
      if (this.life <= 0) {
        this.sprite.destroy();
        this.dead = true;
      }
  
      // simplă coliziune radială
      if (Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, bot.sprite.x, bot.sprite.y) < 25) {
        bot.hp -= 10;
        this.sprite.destroy();
        this.dead = true;
      }
    }
  }
  