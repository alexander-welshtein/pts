// Source code licensed under Apache License 2.0. 
// Copyright © 2019 William Ngan. (https://github.com/williamngan/pts)

(function(){
  // Pts.namespace( this ); // add Pts into scope if needed, you 
  
  let demoID = "tempo_progress";
  
  // Create Space and Form - you can also use Pts.quickStart(...) shorthand for less code
  let space = new CanvasSpace("#"+demoID).setup({ retina: true, bgcolor: "#e2e6ef", resize: true });
  let form = space.getForm();

  // -------

  // Create tempo instance
  let tempo = new Tempo(60);
  let colors = ["#62E", "#FFF", "#123"];
  let counter = 0;

  // for every 1 beat, change the center's count
  tempo.every(1).start( (count) => {
    counter = count;
  })
  
  // for every 2 beat, rotate the line around once and change the color of the other circle
  tempo.every( 2 ).progress( (count, t) => {
    let ln = Line.fromAngle( space.center, Const.two_pi*t - Const.half_pi, space.size.y/3 );
    let c = colors[ count%colors.length ];

    // hand
    form.strokeOnly( c, 10, "round", "round" ).line( ln );
    form.fillOnly( c ).point( ln.p2, 20, "circle" );

    // square
    form.fillOnly( c ).point( space.center, 20 );
    form.fillOnly( "#e2e6ef" ).font(20, "bold").text( space.center.$subtract(11, -8), (counter < 10 ? "0"+counter : counter) );
  });
  
  // Add tempo instance as a player to track animation
  space.add( tempo );
  
  // For use in demo page only
  // Note that `playOnce(200)` will stop after 200ms. Use `play()` to run the animation loop continuously. 
  space.playOnce(200).bindMouse().bindTouch();
  
  if (window.registerDemo) window.registerDemo(demoID, space);
  
})();