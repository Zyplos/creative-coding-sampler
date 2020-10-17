let sketch = function (p) {
  let hue = 0;
  let pillarHue = 0;
  let internalTicker = 0;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSL);
    p.strokeWeight(3);
    p.stroke("white");
  };

  function changeHue(delta = 1) {
    p.stroke(hue, 100, 62, 1);
    if (hue > 360) {
      hue = 0;
    } else {
      hue += delta;
    }
  }
  function changePillarHue(delta = 1) {
    p.stroke(pillarHue, 100, 65, 1);
    if (pillarHue > 360) {
      pillarHue = 0;
    } else {
      pillarHue += delta;
    }
  }

  function drawPillars() {
    const amplitude = 75;
    const thirdLine = p.width * (10 / 12);

    const cyclicAddition = Math.sin((internalTicker += 400)) * amplitude; // 400

    // p.circle(p.width / 2 + cyclicAddition, p.height / 2, 20);
    let pillarLineX = thirdLine + cyclicAddition;
    const pillarLength = 50;
    const pillarSpacing = 20;
    let pillarLineY = -pillarLength - pillarLength / 2;
    for (let i = 0; i < p.width / pillarSpacing; i++) {
      const different = Math.sin(i) * 30;
      p.push();
      changePillarHue(0.005);
      p.line(
        pillarLineX + different,
        (pillarLineY += pillarLength + pillarSpacing),
        pillarLineX + different,
        pillarLineY + pillarLength
      );
      p.pop();
    }
  }

  function drawTrail() {
    p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
  }

  p.draw = function () {
    p.background("rgba(0,0,0, 0.1)");
    changeHue();

    drawPillars();

    drawTrail();

    console.log(internalTicker);
    // if (internalTicker > 28000) internalTicker = 0;
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};
new p5(sketch, "hero");
