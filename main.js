import { Player } from "./player.js";
import { Bot } from "./bot.js"; // opțional: înlocuit ulterior cu RemotePlayer

let player, remotePlayer;
let playerId = null;
let socket;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222",
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);

function preload() {}

function create() {
  const scene = this;
  player = new Player(scene, 200, 300);
  remotePlayer = new Player(scene, 600, 300); // va fi controlat de altcineva

  // === SETUP WEBSOCKET ===
  socket = new WebSocket("ws://localhost:3000"); // sau IP container dacă e separat

  socket.onopen = () => {
    console.log("✅ Connected to WebSocket");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "init") {
      playerId = data.id;
      console.log("You are player", playerId);
    }

    if (data.type === "update") {
      const payload = data.payload;
      if (payload.x !== undefined && payload.y !== undefined) {
        remotePlayer.sprite.x = payload.x;
        remotePlayer.sprite.y = payload.y;
      }
    }

    if (data.type === "full") {
      alert("Server full. Try again later.");
    }
  };

  // === INPUTS ===
  scene.input.on("pointerdown", pointer => {
    player.setMoveTarget(pointer.worldX, pointer.worldY);
  });

  scene.input.keyboard.on("keydown", e => {
    player.handleKey(e.key.toLowerCase());
  });
}

function update() {
  player.update(remotePlayer);
  remotePlayer.update(player); // optional dacă vrei HP bar etc.

  // trimite poziția locală la server
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      x: player.sprite.x,
      y: player.sprite.y,
    }));
  }
}
