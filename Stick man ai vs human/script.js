const canvas = document.getElementById('sceneCanvas');
const ctx = canvas.getContext('2d');

// perticle system for blast effect
const particles = [];
function createParticle(x, y) {
    return {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4 - Math.random() * 2,
        radius: Math.random() * 2.5 + 0.5,
        alpha: 1,
        color: Math.random() > 0.3 ? '#ffffff' : '#ff4a4a' // white or red particles
    };
}

// far mountains position data (to make them look like a beautiful mountain range)
const farMountains = [0, 120, 200, 280, 310, 420, 500, 610, 700, 800];
const farHeights = [320, 240, 340, 290, 260, 360, 280, 330, 290, 350];

const nearMountains = [0, 80, 150, 240, 360, 460, 580, 640, 720, 800];
const nearHeights = [390, 310, 410, 340, 420, 320, 390, 360, 400, 420];

// animation loop
function drawScene() {
    // 1. sky gradient (background)
    let skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGrad.addColorStop(0, '#2e2c38');
    skyGrad.addColorStop(1, '#14131a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. moon draw (top right corner)
    ctx.save();
    ctx.beginPath();
    ctx.arc(650, 130, 45, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
    ctx.fill();
    ctx.restore();

    // 3. far mountains (Far Mountains - a bit lighter color)
    ctx.fillStyle = '#21202a';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for(let i=0; i<farMountains.length; i++) {
        ctx.lineTo(farMountains[i], farHeights[i]);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.fill();

    // 4. near mountains (Near Mountains - a bit darker color)
    ctx.fillStyle = '#17161f';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for(let i=0; i<nearMountains.length; i++) {
        ctx.lineTo(nearMountains[i], nearHeights[i]);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.fill();

    // 5. ground/road line
    ctx.fillStyle = '#0f0e14';
    ctx.fillRect(0, 440, canvas.width, 60);

    // 6. bold text overlay ("CODE OR BE CODED.")
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)'; // blended with the mountains
    ctx.font = '900 64px Impact, Arial Black, sans-serif';
    ctx.letterSpacing = "2px";
    
    // 7. render text on three lines
    ctx.fillText("CODE", 140, 240);
    ctx.fillText("OR BE", 140, 310);
    ctx.fillText("CODED.", 140, 380);

    // 8. small text at the bottom (for UI purposes)
    ctx.font = '11px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillText("// THE FIGHT IS ON   // THE RULES ARE GONE   // THE CLOCK IS TICKING", 140, 420);

    // 9. bright energy bolt/blast
    let blastX = 570;
    let blastY = 400;
    
    ctx.save();
    ctx.beginPath();
    ctx.arc(blastX, blastY, 35, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 40;
    ctx.shadowColor = '#ff5555';
    ctx.fill();
    ctx.restore();

    // 10. new particles create every frame
    if(particles.length < 60) {
        particles.push(createParticle(blastX, blastY));
    }

    // 11. update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // ৮.stick man draw (simple white stick figure with a bit of shadow for depth)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    let sX = 660, sY = 380; // stick man's position
    
    ctx.beginPath();
    // head
    ctx.arc(sX, sY, 6, 0, Math.PI * 2);
    // body
    ctx.moveTo(sX, sY + 6); ctx.lineTo(sX, sY + 25);
    // arms
    ctx.moveTo(sX, sY + 12); ctx.lineTo(sX - 12, sY + 5);
    ctx.moveTo(sX, sY + 12); ctx.lineTo(sX + 12, sY + 18);
    // legs
    ctx.moveTo(sX, sY + 25); ctx.lineTo(sX - 10, sY + 45);
    ctx.moveTo(sX, sY + 25); ctx.lineTo(sX + 8, sY + 45);
    ctx.stroke();

    requestAnimationFrame(drawScene);
}

// animate the scene
drawScene();