import Phaser from 'phaser';
function preload() {
    this.load.image('Imposter', 'https://njdstg.stripocdn.email/content/guids/CABINET_23dae9bd27db3cb3cd1146e1cf66982b/images/22311615213593243.png')
    this.load.image('platform', 'https://njdstg.stripocdn.email/content/guids/CABINET_23dae9bd27db3cb3cd1146e1cf66982b/images/94281615213592536.png')
    this.load.image('codey', 'https://njdstg.stripocdn.email/content/guids/CABINET_23dae9bd27db3cb3cd1146e1cf66982b/images/84641615213595035.png')
    this.load.image('clouds', 'https://njdstg.stripocdn.email/content/guids/CABINET_23dae9bd27db3cb3cd1146e1cf66982b/images/71191615213593112.png')
    this.load.image('concerns', 'https://oqobvr.stripocdn.email/content/guids/CABINET_7b0d60fbe6a15bf6508207b9b6069679/images/45341615242561900.png')
    this.load.image('devil', 'src/assets/devil.png')
    this.load.image('fire', 'src/assets/fire.png')
    this.load.image('fomo', 'https://oqobvr.stripocdn.email/content/guids/CABINET_d0b8b5232770de7db29608e457ec451d/images/11811615242789696.png')
    this.load.image('hurdles', 'https://oqobvr.stripocdn.email/content/guids/CABINET_d8d014d0d5bd390e5c81b3749fca81c6/images/15271615242927879.png')
    this.load.image('responsibility', 'https://oqobvr.stripocdn.email/content/guids/CABINET_568f1176f3523a1e798d56cbb5e94549/images/82561615243057525.png')
    this.load.image('selfDoubt', 'https://oqobvr.stripocdn.email/content/guids/CABINET_f9b5002b5f02169622f630fd03b2d8dc/images/11221615243116090.png')
    this.load.image('shyness', 'https://oqobvr.stripocdn.email/content/guids/CABINET_d59849ea55718d3e163d022105de6188/images/80491615243164895.png')
    this.load.image('bg', 'https://oqobvr.stripocdn.email/content/guids/CABINET_b1e3bbe6720875c62aac03f09b860c47/images/92691615243227547.png')
    this.load.image('win', 'https://oqobvr.stripocdn.email/content/guids/CABINET_52d4a217c466bf433ad6e08459211937/images/63201615243275457.png')

  }
  
  const gameState = {
    score: 0
  };
  
  function create() {
    this.add.image(0,window.innerHeight/2,'bg');
    this.add.image(0,window.innerHeight/2+100,'bg');
    this.add.image(window.innerWidth/3-100,window.innerHeight/2,'bg');
    this.add.image(window.innerWidth/3-100,window.innerHeight/2+100,'bg');
    this.add.image(2*window.innerWidth/3-200,window.innerHeight/2,'bg');
    this.add.image(2*window.innerWidth/3-200,window.innerHeight/2+100,'bg');
    this.add.image(2*window.innerWidth/3,window.innerHeight/2,'bg');
    this.add.image(2*window.innerWidth/3,window.innerHeight/2+100,'bg');
    this.add.image(window.innerWidth,window.innerHeight/2,'bg');
    gameState.player = this.physics.add.sprite(400, window.innerHeight-130, 'codey').setScale(0.6);
    // var bg = game.add.tileSprite(0,h-100,window.innerWidth,window.innerHeight,'bg');
	  // bg.scale.setTo(0.5,0.5);
    
    const platforms = this.physics.add.staticGroup();
    const clouds = this.physics.add.staticGroup();
    clouds.create(window.innerWidth/3-100, 50, 'clouds').setScale(1);
    clouds.create(2*window.innerWidth/3, 50, 'clouds').setScale(1);
    clouds.create(window.innerWidth-20, 50, 'clouds').setScale(1);
    platforms.create(window.innerWidth/3-100, window.innerHeight-10, 'platform').setScale(1);
    platforms.create(2*window.innerWidth/3, window.innerHeight-10, 'platform').setScale(1);
    platforms.create(window.innerWidth-20, window.innerHeight-10, 'platform').setScale(1);
   // platforms.create(1200, window.innerHeight-10, 'platform').setScale(1);
    // platforms.create(1200, window.innerHeight-10, 'platform').setScale(1);
    gameState.scoreText = this.add.text(300, window.innerHeight-50, 'Score: 0', { fontSize: '50px', fill: '#000000' })
  
    gameState.player.setCollideWorldBounds(true);
  
    this.physics.add.collider(gameState.player, platforms);
    this.physics.add.collider(gameState.player, clouds);
    
      gameState.cursors = this.input.keyboard.createCursorKeys();
  
    const bugs = this.physics.add.group();
  
    function bugGen () {
      const x1 = Math.random() * 500;
      bugs.create(x1, 130, 'Imposter').setScale(0.5);
      const x2 = Math.random() * 1500;
      bugs.create(x2, 180, 'concerns').setScale(0.5);
      // const x3 = Math.random() * 500;
      // bugs.create(x3, 130, 'devil').setScale(1.0);
      // const x4 = Math.random() * 700;
      // bugs.create(x4, 180, 'fire').setScale(0.8);
      const x5 = Math.random() * 3000;
      bugs.create(x5, 130, 'fomo').setScale(0.5);
      const x6 = Math.random() * 7000;
      bugs.create(x6, 180, 'hurdles').setScale(0.5);
      const x7 = Math.random() * 11000;
      bugs.create(x7, 130, 'responsibility').setScale(0.6);
      const x8 = Math.random() * 1700;
      bugs.create(x8, 180, 'selfDoubt').setScale(0.4);
      const x9 = Math.random() * 1900;
      bugs.create(x9, 130, 'shyness').setScale(0.5);
    }
  
    const bugGenLoop = this.time.addEvent({
      delay: 1000,
      callback: bugGen,
      callbackScope: this,
      loop: true,
    });
  
    this.physics.add.collider(bugs, platforms, function (bug) {
      bug.destroy();
      gameState.scoreText.setText(`Score: ${gameState.score}`)
    });

    



    this.physics.add.collider(gameState.player, bugs, () => {

      // gameState.player.y += 130;
      if(gameState.score>=3000){
          //gameState.player.setScale(2);
          this.add.image(window.innerWidth/2,window.innerHeight/2,'win');
          bugGenLoop.destroy();
          this.physics.pause();
          // this.add.text(window.innerWidth/2-20, window.innerHeight/2, 'You won !', { fontSize: '30px', fill: '#ffffff' });
          // this.add.text(window.innerWidth/2-50, window.innerHeight/2+100, 'Click to Restart', { fontSize: '25px', fill: '#ffffff' });
          this.input.on('pointerup', () =>{
            gameState.score = 0;
              this.scene.restart();
          });
      }
      gameState.score += 10;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
      

          
    });
  }
  
  function update() {
    if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-200);
      } else if (gameState.cursors.right.isDown) {
           gameState.player.setVelocityX(200);
      } else {
      gameState.player.setVelocityX(0);
    }
    if (gameState.cursors.up.isDown) {
        gameState.player.setVelocityY(-200);
      } else if (gameState.cursors.down.isDown) {
           gameState.player.setVelocityY(200);
      } else {
      gameState.player.setVelocityY(0);
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
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
  