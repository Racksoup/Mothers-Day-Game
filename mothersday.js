(function() { "use strict"
 
  var controller, display, game;
  var tile_sheet = new Image();
  
  controller = {

    left: false,
    right: false,
    down: false,
    up: false,
    rightClick: false,
    leftClick: false,
    upClick: false,
    downClick: false,

    keyUpDown: function(event) {

      var key_state = (event.type == "keydown")?true:false;

      switch(event.keyCode) {

        case 37: controller.left = key_state; break;
        case 38: controller.up = key_state; break;
        case 39: controller.right = key_state; break;
        case 40: controller.down = key_state; break;

      }

    },

    click: function(event) {
      console.log(game.player.x , game.player.y);
      var boundary = display.context.canvas.getBoundingClientRect();
      //console.log(boundary);
      console.log(((event.pageX - boundary.left) * 1.153), ((event.pageY - boundary.top) * 1.3));

      if (((event.pageX - boundary.left) *1.153)  > game.player.x ) {

        controller.rightClick = true;

      } else {

        controller.leftClick = true;

      }

      if (((event.pageY - boundary.top) * 1.3)  < game.player.y ) {

        controller.upClick = true;

      } else {

        controller.downClick = true;

      }
    }

  };

  display = {

    buffer:document.createElement("canvas").getContext("2d"),
    context:document.querySelector("canvas").getContext("2d"),
    output:document.querySelector("p"),
    firstloop:true,

    render: function() {

      var tile_size = game.world.tile_size; 
      var columns = game.world.columns;
      var rows = game.world.rows;

      for (let index = game.world.map.length - 1; index > -1; --index) {

        let value = game.world.map[index];
        let tile_x = (index % columns) * tile_size;
        let tile_y = Math.floor(index / columns) * tile_size;
        let newVal;

        switch(value) {
          case 0: newVal = 0; break;
          case 1: newVal = 1; break;
          case 2: newVal = 1; break;
          case 3: newVal = 1; break;
          case 4: newVal = 1; break;
          case 5: newVal = 1; break;
          case 6: newVal = 1; break;
          case 7: newVal = 1; break;
          case 8: newVal = 1; break;
          case 9: newVal = 1; break;
          case 10: newVal = 0; break;
        }
        
        display.buffer.drawImage( tile_sheet, newVal * tile_size, 0, tile_size, tile_size, tile_x, tile_y, tile_size, tile_size);

      }

      display.buffer.drawImage(tile_sheet, game.player.source_x, 0, tile_size, tile_size, game.player.x, game.player.y, tile_size - 1, tile_size - 1);

      for (let i = 0; i < game.heartArr.length; i++) {
        display.buffer.drawImage(tile_sheet, game.heartArr[i].source_x, 0, tile_size, tile_size, game.heartArr[i].x, game.heartArr[i].y, tile_size - 1, tile_size - 1);
      }
      
      display.context.drawImage(display.buffer.canvas, 0, 0, display.buffer.canvas.width, display.buffer.canvas.height, 0, 0, display.context.canvas.width, display.context.canvas.height);

    },

    resize: function(event) {

      var client_height = document.documentElement.clientHeight;

      display.context.canvas.width = document.documentElement.clientWidth - 32;

      if (display.context.canvas.width > client_height) {

        display.context.canvas.width = client_height;

      }

      display.context.canvas.height = Math.floor(display.context.canvas.width * 0.652);

      display.render();

    }

  }

  game = {

    player: {

      old_x: 150,
      old_y: 650,
      velocity_x: 0,
      velocity_y: 0,
      x: 50,
      y: 50,
      source_x: 48,
      width: 15,
      height: 15,
      hearts: 0,

      testCollision: function(heart) {

        if (this.y > (heart.y + heart.height) || (this.x + this.width) < heart.x || (this.y + this.height) < heart.y || this.x > (heart.x + heart.width)) {

          return false;

        }

        return true;

      }

    },

    heart: function() {

      let randX;
      let randY;
      
      do {

        randX = Math.floor(Math.random() * (game.world.columns * game.world.tile_size));
        randY = Math.floor(Math.random() * (game.world.rows * game.world.tile_size));

      } while (game.world.map[Math.floor(randY / game.world.tile_size) * game.world.columns + Math.floor(randX / game.world.tile_size)] != 0);

      this.x = randX - ( randX % 16 );
      this.y = randY - ( randY % 16 ); 

      this.width = 15;
      this.height = 15;
      this.source_x = 32;

    },

    heartArr: [],

    world: {

      columns: 68,
      rows: 50,
      tile_size: 16,

      map: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 1, 6, 2, 0, 0, 0, 0, 0, 1, 6, 6, 2, 0, 0, 0, 0, 0, 1, 6, 6, 2, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 0, 1, 7, 1, 5, 2, 0, 0, 0, 0, 5, 7, 1, 5, 2, 0, 0, 0, 0, 5, 7, 1, 5, 2, 0, 0, 0, 0, 4, 7, 0, 0, 0, 0, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 1, 7, 1, 10, 1, 5, 2, 0, 0, 0, 5, 7, 10, 10, 5, 2, 0, 0, 0, 5, 7, 10, 10, 5, 2, 0, 0, 0, 0, 5, 2, 0, 0, 1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 10, 10, 10, 5, 7, 0, 0, 0, 5, 7, 10, 10, 5, 3, 0, 0, 0, 5, 7, 10, 10, 5, 3, 0, 0, 0, 0, 4, 7, 0, 0, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 6, 6, 6, 5, 7, 0, 0, 0, 5, 7, 10, 10, 10, 5, 7, 0, 0, 0, 5, 7, 1, 5, 3, 0, 0, 0, 0, 5, 7, 1, 5, 3, 0, 0, 0, 0, 0, 0, 5, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 8, 8, 8, 5, 7, 0, 0, 0, 5, 7, 6, 6, 6, 5, 7, 0, 0, 0, 5, 7, 8, 3, 0, 0, 0, 0, 0, 5, 7, 8, 3, 0, 0, 0, 0, 0, 0, 0, 4, 5, 7, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 8, 8, 8, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 4, 3, 0, 0, 0, 4, 3, 0, 0, 0, 4, 3, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 2, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 1, 6, 6, 6, 6, 2, 0, 0, 0, 1, 2, 0, 0, 1, 2, 0, 0, 0, 1, 6, 6, 6, 2, 0, 0, 0, 1, 6, 6, 6, 2, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 1, 6, 6, 2, 0, 
        5, 7, 2, 0, 0, 0, 0, 1, 5, 7, 0, 0, 0, 0, 1, 5, 7, 2, 0, 0, 0, 0, 4, 8, 5, 7, 8, 3, 0, 0, 0, 5, 7, 0, 0, 5, 7, 0, 0, 0, 5, 7, 8, 8, 3, 0, 0, 0, 5, 1, 1, 1, 7, 2, 0, 0, 4, 7, 0, 0, 0, 0, 1, 5, 1, 1, 7, 6,
        5, 1, 7, 2, 0, 0, 1, 5, 1, 7, 0, 0, 0, 1, 5, 10, 10, 7, 2, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 5, 7, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 5, 1, 10, 10, 1, 7, 2, 0, 0, 5, 2, 0, 0, 1, 5, 1, 10, 10, 1, 1,
        5, 7, 8, 7, 0, 0, 5, 8, 5, 7, 0, 0, 0, 5, 1, 10, 10, 1, 7, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 5, 7, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 5, 1, 10, 10, 10, 1, 7, 0, 0, 4, 3, 0, 0, 4, 5, 1, 10, 10, 10, 10,
        5, 7, 0, 4, 6, 6, 3, 0, 5, 7, 0, 0, 0, 5, 1, 10, 10, 1, 7, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 5, 7, 6, 6, 5, 7, 0, 0, 0, 5, 7, 6, 2, 0, 0, 0, 0, 5, 1, 10, 10, 1, 7, 3, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 10, 10,
        5, 7, 0, 0, 4, 3, 0, 0, 5, 7, 0, 0, 0, 5, 1, 10, 10, 1, 7, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 5, 7, 8, 8, 5, 7, 0, 0, 0, 5, 7, 8, 3, 0, 0, 0, 0, 5, 1, 1, 1, 7, 3, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 8, 5, 1, 10,
        5, 7, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 5, 1, 10, 10, 1, 7, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 5, 7, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 5, 7, 8, 8, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1,
        5, 7, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 4, 5, 10, 10, 7, 3, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 5, 7, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 5, 7, 0, 4, 9, 2, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 5, 1, 1,
        5, 7, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 4, 5, 7, 3, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 5, 7, 0, 0, 5, 7, 0, 0, 0, 5, 7, 6, 6, 2, 0, 0, 0, 5, 7, 0, 0, 4, 9, 2, 0, 0, 0, 0, 0, 0, 4, 7, 6, 6, 5, 7, 8,
        4, 3, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 4, 3, 0, 0, 4, 3, 0, 0, 0, 4, 8, 8, 8, 3, 0, 0, 0, 4, 3, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, 0, 4, 8, 8, 8, 8, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 6, 2, 0, 0, 0, 0, 0, 0, 0, 1, 6, 2, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 7, 6, 2, 0, 0, 0, 0, 1, 5, 1, 7, 2, 0, 0, 0, 0, 4, 7, 0, 0, 0, 0, 5, 3, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 10, 10, 1, 1, 7, 0, 0, 0, 1, 5, 1, 10, 1, 7, 2, 0, 0, 0, 0, 5, 2, 0, 0, 1, 7, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 10, 10, 10, 1, 7, 0, 0, 0, 5, 1, 10, 10, 10, 1, 7, 0, 0, 0, 0, 4, 7, 0, 0, 5, 3, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 10, 10, 10, 1, 7, 0, 0, 0, 5, 1, 10, 10, 10, 1, 7, 0, 0, 0, 0, 0, 5, 6, 6, 7, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 10, 10, 10, 1, 7, 0, 0, 0, 5, 1, 1, 1, 1, 1, 7, 0, 0, 0, 0, 0, 4, 5, 7, 3, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 10, 10, 10, 1, 7, 0, 0, 0, 5, 1, 8, 8, 8, 1, 7, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 10, 10, 1, 1, 7, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 3, 8, 3, 0, 0, 0, 5, 7, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 8, 8, 3, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

      ],

    },

    collision: {

      4:function(object, row, column) {

        if (this.bottomCollision(object, row)) {return;};
        this.leftCollision(object, column);


      },

      // left wall collision tile
      3:function(object, row, column) {

        if (this.bottomCollision(object, row)) {return;};
        this.rightCollision(object, column);


      },

      // right wall collision tile
      1:function(object, row, column) {

        if (this.topCollision(object, row)) {return;};
        this.leftCollision(object, column);

      },

      // bottom wall collision tile
      2:function(object, row, column) {

        if (this.topCollision(object, row)) {return;};
        this.rightCollision(object, column);


      },

      5: function(object, row, column) {

        this.leftCollision(object, column);

      },

      6: function(object, row, column) {

        this.topCollision(object, row);
        
      },

      7: function(object, row, column) {

        this.rightCollision(object, column);
        
      },

      8: function(object, row, column) {

        this.bottomCollision(object, row);
        
      },

      9: function(object, row, column) {

        if (this.topCollision(object, row)) {return;}
        if (this.leftCollision(object, column)) {return;}
        if (this.rightCollision(object, column)) {return;}
        this.bottomCollision(object,row);

      },

      leftCollision(object, column) {

        if (object.x - object.old_x > 0) {

          var left = column * game.world.tile_size;

          if (object.x + object.width > left && object.old_x + object.width <= left) {

            object.velocity_x = 0;
            object.x = object.old_x = left - object.width - 0.01;

            return true;

          }

        }

        return false;

      },

      rightCollision(object, column) {
        if (object.x - object.old_x < 0 ) {
           
          var right = (column + 1) * game.world.tile_size;

          if (object.x < right && object.old_x >= right) {

            object.velocity_x = 0;
            object.old_x = object.x = right;

            return true;

          }

        }

        return false;

      },

      topCollision(object, row) {

        if (object.y - object.old_y > 0) {

          var top = row * game. world.tile_size;

          if (object.y + object.height > top && object.old_y + object.height <= top) {

            object.velocity_y = 0;
            object.old_y = object.y = top - object.height - 0.01;

            return true;

          }

        }

        return false;

      },

      bottomCollision(object, row) {

        if (object.y - object.old_y < 0) {

          var bottom = (row + 1) * game.world.tile_size;

          if (object.y < bottom && object.old_y >= bottom) {

            object.velocity_y = 0;
            object.old_y = object.y = bottom;

          }

        }


      }

    },

    loop: function() {

      if (game.player.hearts === 4) {
        display.output.innerHTML = "WINNER! HAPPY MOTHERS DAY!!!"
      }

      if (display.firstloop) {

        let heart1 = new game.heart();
        let heart2 = new game.heart();
        let heart3 = new game.heart();
        let heart4 = new game.heart();
        
        game.heartArr.push(heart1, heart2, heart3, heart4);

        display.firstloop = false;

      }

      // Click Controller functions
      if (controller.leftClick) {

        game.player.velocity_x -= 5;
        game.player.source_x = 48;
        controller.leftClick = false;

      }

      if (controller.rightClick) {

        game.player.velocity_x += 5;
        game.player.source_x = 48;
        controller.rightClick = false;

      }

      if (controller.upClick) {

        game.player.velocity_y -= 5;
        game.player.source_x = 48;
        controller.upClick = false;

      }

      if (controller.downClick) {

        game.player.velocity_y += 5;
        game.player.source_x = 48;
        controller.downClick = false;

      }

      // Controller functions
      if (controller.left) {

        game.player.velocity_x -= 0.40;
        game.player.source_x = 48;

      }

      if (controller.right) {

        game.player.velocity_x += 0.40;
        game.player.source_x = 48;

      }

      if (controller.up) {

        game.player.velocity_y -= 0.40;
        game.player.source_x = 48;

      }

      if (controller.down) {

        game.player.velocity_y += 0.40;
        game.player.source_x = 48;

      }

      // Game Logic
      // Set old x and y
      game.player.old_x = game.player.x;
      game.player.old_y = game.player.y;

      // Set position based on velocity
      game.player.x += game.player.velocity_x;
      game.player.y += game.player.velocity_y;

      // edge of screen collision
      // left collision
      if (game.player.x < 0) {
        
        game.player.velocity_x = 0;
        game.player.old_x = game.player.x = 0;

      // right collision
      } else if ( game.player.x + game.player.width > display.buffer.canvas.width) {

        game.player.velocity_x = 0;
        game.player.old_x = game.player.x = display.buffer.canvas.width - game.player.width - 0.01;

      }
      // top collision
      if (game.player.y < 0) {

        game.player.velocity_y = 0;
        game.player.old_y = game.player.y = 0;

      //bottom collision
      } else if (game.player.y + game.player.height > display.buffer.canvas.height) {

        game.player.velocity_y = 0;
        game.player.old_y = game.player.y = display.buffer.canvas.height - game.player.height - 0.01;

      }

      for (let i = 0; i < game.heartArr.length; i++) {

        if (game.player.testCollision(game.heartArr[i])) {

          game.player.hearts += 1;
          game.heartArr.splice(i, 1);

        }

      }

      // test all 4 corners of our player
      if (game.player.x - game.player.old_x < 0) { // test collision on left side
        
        var left_column = Math.floor(game.player.x / game.world.tile_size);
        var bottom_row = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
        var value_at_index = game.world.map[bottom_row * game.world.columns + left_column];

        if (value_at_index != 0) { // Check the bottom left point
          
          game.collision[value_at_index](game.player, bottom_row, left_column);

        }

        var top_row = Math.floor(game.player.y / game.world.tile_size);
        value_at_index = game.world.map[top_row * game.world.columns + left_column];

        if (value_at_index != 0) {// Check the top left point
        
          game.collision[value_at_index](game.player, top_row, left_column);

        }

      } else if (game.player.x - game.player.old_x > 0) {// Test collision on the right side
      
        var right_column = Math.floor((game.player.x + game.player.width) / game.world.tile_size);
        var bottom_row = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
        var value_at_index = game.world.map[bottom_row * game.world.columns + right_column];

        if (value_at_index != 0) {// Check the bottom right point 
        
          game.collision[value_at_index](game.player, bottom_row, right_column);

        }

        var top_row = Math.floor(game.player.y / game.world.tile_size);
        value_at_index = game.world.map[top_row * game.world.columns + right_column];

        if (value_at_index != 0) {// Check the top right point
        
          game.collision[value_at_index](game.player, top_row, right_column);

        }

      }

      if (game.player.y - game.player.old_y < 0) { // Test collison on the top side
      
        var left_column = Math.floor(game.player.x / game.world.tile_size);
        var top_row = Math.floor(game.player.y / game.world.tile_size);
        var value_at_index = game.world.map[top_row * game.world.columns + left_column];

        if (value_at_index != 0) { // Check the top left point
        
          game.collision[value_at_index](game.player, top_row, left_column);

        }

        var right_column = Math.floor((game.player.x + game.player.width) / game.world.tile_size);
        value_at_index = game.world.map[top_row * game.world.columns + right_column];

        if (value_at_index != 0) {//Check the top right point
        
          game.collision[value_at_index](game.player, top_row, right_column);

        }

      } else if (game.player.y - game.player.old_y > 0) { // Test collision on the bottom side

        var left_column = Math.floor(game.player.x / game.world.tile_size);
        var bottom_row = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
        var value_at_index = game.world.map[bottom_row * game.world.columns + left_column];

        if (value_at_index != 0) { // Check the bottom left
        
          game.collision[value_at_index](game.player, bottom_row, left_column);

        }

        var right_column = Math.floor((game.player.x + game.player.width) / game.world.tile_size);
        value_at_index = game.world.map[bottom_row * game.world.columns + right_column];

        if (value_at_index != 0) {// Check the bottom right point
        
          game.collision[value_at_index](game.player, bottom_row, right_column);

        }

      }

      // friction
      game.player.velocity_x *= 0.9;
      game.player.velocity_y *= 0.9;

      display.render();

      window.requestAnimationFrame(game.loop);

    }

  }

  // sets pixel size of canvas
  display.buffer.canvas.height = game.world.tile_size * game.world.rows;
  display.buffer.canvas.width = game.world.tile_size * game.world.columns;

  tile_sheet.addEventListener("load", (event) => {
    game.loop();
  });

  tile_sheet.src = "mothersday.png";

  window.addEventListener("resize", display.resize);
  window.addEventListener("keydown", controller.keyUpDown);
  window.addEventListener("keyup", controller.keyUpDown);
  display.context.canvas.addEventListener("click", controller.click);

  display.resize();

  game.loop();

})();