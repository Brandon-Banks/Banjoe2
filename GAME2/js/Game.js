var Game = {
	prev_state : 'right', // Stores the previous state
	state : 'right', // left, right, whirl, jump_right, jump_left
	maxy : 400,
	y : 0,   // y position for jump
	vy_start: 24, // initial velocity in vy
	vy : 0,  // velocity for jump in y
	vymax : 50, // max velocity in y
	a : -1,  // Acceleration for jump
    x : 0, // position in x 
    vx : -12,  // velocity in x
    images : { 	left : "Images/BanjoGuyRunningLeft.gif", 
				right : "Images/BanjoGuyRunning.gif", 
				// whirl : "Images/Game_whirls.gif",
				jump_right : "Images/BanjoGuyJump.gif",
				jump_left : "Images/BanjoGuyJumpLeft.gif" 
			},
    $sprites: null,
	width: null,
	init : function( width ) {
        // Put the Game on the screen
		this.width = width;
		this.$sprites = $.preload( this.images );
        $('div#Game').empty().append(this.$sprites['right']);
    },
	change_image : function( Images ) {
		var last; 
		if ( Images !== last ) 
			$('div#Game').empty().append(this.$sprites[Images]);
		last = Images;
	},

	go_left : function() {	this.state = 'left'; },
	go_right : function() {	this.state = 'right' },	
	jump_right : function() { this.state = 'jump_right' },
	jump_left : function() { this.state = 'jump_left' },
	jump : function() { 
		if ( this.state !== 'whirl' && this.vy <= this.vymax && this.y <= 0 ) {
			this.vy += this.vy_start;
			if ( this.state === 'left' ) this.jump_left();
			else if ( this.state === 'right' ) this.jump_right();	
		}
	},
  change_direction : function() {
    this.vx *= -1.0;
    if ( this.state === 'right' ) this.go_left();
    else if ( this.state === 'left' ) this.go_right();
    else if ( this.state === 'jump_right' ) this.jump_left();
    else if ( this.state === 'jump_left' ) this.jump_right();
  },

  handleKey : function(event)
  {
    switch (event.keyCode)
    {
      case 65: 
        if (this.state == "right")
        {
          this.change_direction();
        }
        break;
      case 87:
        this.jump();
        break;
      case 68:
        if(this.state == "left")
        {
          this.change_direction();
        }    
        break;
    }
  },
    run : function() {
      if ( this.state === 'jump_left' || this.state === 'jump_right' ) {
        this.y = this.a + this.vy + this.y;
        this.vy = this.a + this.vy;
        // limit y value for jump
        if ( this.y > this.maxy ) this.y = this.maxy;
        // Check to see if the jump is finished
        if ( this.y < 0  && this.state === 'jump_right' ) {
          this.vy = 0;
          this.go_right();
        } else if ( this.y < 0  && this.state === 'jump_left' ) {
          this.vy = 0;
          this.go_left();	
        }
      }
      // Check to see if all the background images have wrapped around
      if (this.x * (1.0 / 12.0) <= -this.width || this.x * (1.0 / 12.0) >= this.width) {
        this.x = 0;
      }
		
      // update the x position of the Game
      this.x = this.x + this.vx;
		
      // Switch to the appropriate image based on the state of the Game
      this.change_image( this.state );
		
      // move the current Game image into position
      $('#Game').css('top', (this.maxy-this.y) );
    }
}


