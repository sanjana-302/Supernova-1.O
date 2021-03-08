import Phaser from 'phaser';
function preload() {
    this.load.image('Imposter', '../src/assets/Imposter.png')
    this.load.image('platform', '../src/assets/platform.png')
    this.load.image('codey', '../src/assets/superNova.png')
    this.load.image('clouds', '../src/assets/clouds.png')
  }
  
  const gameState = {
    score: 0
  };
  
  function create() {
    gameState.player = this.physics.add.sprite(400, window.innerHeight-130, 'codey').setScale(0.6);
    
    const platforms = this.physics.add.staticGroup();
    const clouds = this.physics.add.staticGroup();
    clouds.create(400, 30, 'clouds').setScale(1);
    platforms.create(400, window.innerHeight-10, 'platform').setScale(1);
  
    gameState.scoreText = this.add.text(300, window.innerHeight-50, 'Score: 0', { fontSize: '50px', fill: '#000000' })
  
    gameState.player.setCollideWorldBounds(true);
  
    this.physics.add.collider(gameState.player, platforms);
    
      gameState.cursors = this.input.keyboard.createCursorKeys();
  
    const bugs = this.physics.add.group();
  
    function bugGen () {
      const xCoord2 = Math.random() * 1600;
      bugs.create(xCoord2, 130, 'Imposter').setScale(0.5);
    }
  
    const bugGenLoop = this.time.addEvent({
      delay: 700,
      callback: bugGen,
      callbackScope: this,
      loop: true,
    });
  
    this.physics.add.collider(bugs, platforms, function (bug) {
      bug.destroy();
      gameState.score += 10;
      gameState.scoreText.setText(`Score: ${gameState.score}`)
    });

    
    this.physics.add.collider(gameState.player, bugs, () => {

      gameState.player.y = window.innerHeight-130;
      gameState.score -= 100;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
      if(gameState.score<=0){
        gameState.score = 100;
      }
          
    });
    this.physics.add.collider(gameState.player, clouds, () => {
      bugGenLoop.destroy();
      this.physics.pause();
      this.add.text(300, window.innerHeight-400, 'You won !', { fontSize: '15px', fill: '#ffffff' });
      this.add.text(300, window.innerHeight-370, 'Click to Restart', { fontSize: '15px', fill: '#ffffff' });
      
          // Add your code below:
      this.input.on('pointerup', () =>{
        gameState.score = 0;
          this.scene.restart();
      });
    });
  }
  
  function update() {
    if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-160);
      } else if (gameState.cursors.right.isDown) {
           gameState.player.setVelocityX(160);
      } else {
      gameState.player.setVelocityX(0);
    }
    if (gameState.cursors.up.isDown) {
        gameState.player.setVelocityY(-160);
      } else if (gameState.cursors.down.isDown) {
           gameState.player.setVelocityY(160);
      } else {
      gameState.player.setVelocityY(0);
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: window.innerHeight,
    backgroundColor: "000000",
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 100 },
        enableBody: true,
        debug : false
      }
    },
    scene: {
      preload,
      create,
      update
    }
  };
  
  const game = new Phaser.Game(config);
  