//The game I created is a take on flappy bird. the point is to get the ghost image through the opening in the pipes as the landscape moves forward. 
//You can move the ghost up by pressing the "a" key.
//When you hit the pipes they turn black to show the collision. 
//There is no winning or losing mainly because I ran out of time. If I did another iteration of this I would put a score bar in. 
//I changed my game from the original block idea, becuase this was my second idea originally, and when I was coding the blocks I realized I would have to make a lot of levels which I was not going to have time for. 

var song, thud; //setting my two sounds
var img; // setting my image
var pipes = []; //setting the pipes in an array

function preload(){ //My media
    thud = loadSound("thud.mp3"); //noise when you hit the "a" key
    song = loadSound("halloween.mp3"); //background music
    img = loadImage("ghost.png"); //ghost icon
}

function setup() {
	createCanvas(600,400);
    colorMode(HSB, 360,100,100); //this is mainly for the clouds
	ghost = new Ghost (); //calling upon the ghost
	pipes.push(new Pipe()); //calling upon the pipes
    song.loop(); //allowing the song to loop
}

function draw() {
	
    push();
    clouds(); //the clouds are the background, the push and pop are to keep them from messing with the rest of the code.
    pop();
    
    //shows the pipes
    for(var i=pipes.length-1; i>=0; i--){
        pipes[i].show();
        pipes[i].update();
            if (pipes[i].hits(ghost)){
		}
            if(pipes[i].offscreen()){
			pipes.splice(i,1);
		}
}
	//shows ghost
	ghost.update();
	ghost.show();
	
    //allowing the pipes to push back onto the screen and keep regenerating.
	if(frameCount % 110==0){ 
		pipes.push(new Pipe());
	}
}

//this draws the clouds, it is copy and pasted from my project 3. I thought it made a nice generative background for this code too so I reused it.
function clouds(){
    //cloud variables
    var value=0;
    var noiseX=0;
    var noiseY=0;
    var noiseScale=0.02;
    var drawScale=4;
    
	scale(drawScale); //scaling the clouds
	for(var y=0; y<height/drawScale; y++){ //initiating the height
		for(var x=0; x<width/drawScale; x++){ //initiating the width
			var C=noise((frameCount+x)*noiseScale, y*noiseScale)*100; //allowing it to move
			stroke(C,360); //background color
			point(x,y);
			noiseX=noiseX+noiseScale;
		}
		noiseX=0;
		noiseY=noiseY+noiseScale;
	}
}


//allows for the ghost to move up and the sound effects to come on when the "a" key is pressed.
function keyPressed(){
	if(key == 'a'){
		 ghost.up(); //calls upon the 'this.up' function within the ghost function
	}
    if(key == 'a'){
        thud.play(); //plays the thud sound
        thud.setVolume(1); //sets the volume
    }
}


//draws the ghost and its movements
function Ghost(){
    //it's starting position
	this.y = height/2;
	this.x = 50;
	
    //how it's movement look more natural
	this.gravity = 0.5; //floats down
	this.lift = -12; //lifts up
	this.velocity =0; //speed
	
    //what the ghost looks like
	this.show = function(){
        image(img,this.x,this.y,40,40); //calling on the image media
	}
	
    //allows the ghost to move upwards
	this.up = function(){
		this.velocity += this.lift;
	}
	
    //again another addition to the ghost movements.
	this.update = function(){
		this.velocity += this.gravity;
		this.y += this.velocity;
		
        //keeps the ghost from going too far off the screen
		if(this.y>height){
			this.y = height;
			this.velocity =0;
	}
		if(this.y<0){
			this.y=0;
			this.velocity=0;
		}
}
}


//draws the pipes
function Pipe(){
    //positioning
	this.spacing = 175;
	this.top = random(height/2);
	this.bottom = random(height/2);
	this.x = width;
	this.w = 20;
	this.speed = 3;
	
    //when the ghost hits any side of the pipe (top, bottom, left, or right) the pipe will highlight itself.
	this.highlight = false;
	
	this.hits = function(ghost){
		if(ghost.y<this.top || ghost.y >height - this.bottom){
			if(ghost.x>this.x && ghost.x<this.x + this.w){
				this.highlight = true;
				return true;
			}
		}
        //it will stop the highlight when the ghost is no longer touching the pipe
		this.highlight = false;
		return false;
	}
	
    //shows the highlight
	this.show = function(){
		fill(255);
		if(this.highlight) {
			fill(255,0,0);
		}
		rect(this.x,0, this.w, this.top);
		rect(this.x, height-this.bottom, this.w, this.bottom);
	}
	
    //moves the pipes across the screen 
	this.update = function(){
		this.x -= this.speed;
	}
	
	this.offscreen = function(){
		if(this.x<-this.w){
		}
	}
	
}

