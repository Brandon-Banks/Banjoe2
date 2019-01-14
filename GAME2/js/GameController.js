var GameController = {
    // Variables
    $background : null,
    $Game : null,
    init : function() {
		this.$background = $("#DesertBackground_back");
		this.$Game = Object.create(Game);
		this.$Game.init(this.$background.width());
        // $("body").dblclick( this.$Game.change_direction.bind(this.$Game) );
		// $("body").click( this.$Game.jump.bind(this.$Game) );
		document.addEventListener("keydown", this.$Game.handleKey.bind(this.$Game));
    },
    draw : function() {
        requestAnimFrame( GameController.draw.bind(this), 25);
		if ( typeof this.$Game != "undefined" ) {
			this.$Game.run();
			var xpos = this.$Game.x;
			var ypos = this.$Game.y;			
			$('#DesertBackground_clouds_2').css('background-position', (xpos * (2.0 / -800.0)));
			$('#DesertBackground_mid').css('background-position', (xpos * (1.0 / 4.0)));
			$('#DesertBackground_front').css('background-position', (xpos * (1.0/1.2)));
			$('#DesertBackground_back').css('background-position', (xpos * (1.0/6.0)));
		}
    }
};

$(document).ready(function () {
    GameController.init();
    GameController.draw();
});