/**
 * Particle network background – yellow/gold theme
 * Uses Three.js (load three.min.js first)
 * Targets #particle-bg container
 */
(function() {
    'use strict';

    var CONFIG = {
        backgroundColor: 0x0f0d0a,     // Dark warm tint (not pitch black)
        particleColor: 0xffcc24,       // Archon gold
        particleColor2: 0xffdd44,      // Lighter gold
        lineColor: 0xffaa00,           // Amber for lines
        particleCount: 220,
        particleCountMobile: 100,
        connectRadius: 120,
        maxConnections: 700,
        lineOpacity: 0.28,
        floatSpeed: 0.3,
        floatAmount: 1.2,
        mouseMode: 'repel',
        mouseRadius: 180,
        mouseStrength: 0.75,
        mouseEase: 0.08,
        particleSize: 2.2,
        particleGlow: true
    };

    var scene, camera, renderer, particles, geometry, lineMaterial;
    var particlePositions, particleVelocities, particleColors;
    var lineSegments = [];
    var mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    var W, H;

    function init() {
        var container = document.getElementById('particle-bg');
        if (!container) return;

        W = window.innerWidth;
        H = window.innerHeight;
        var isMobile = W < 768;
        var count = isMobile ? CONFIG.particleCountMobile : CONFIG.particleCount;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            CONFIG.floatSpeed = 0;
            CONFIG.floatAmount = 0;
            CONFIG.mouseStrength = 0;
        }

        scene = new THREE.Scene();
        scene.background = new THREE.Color(CONFIG.backgroundColor);
        camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -1000, 1000);
        camera.position.z = 500;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        particlePositions = new Float32Array(count * 3);
        particleVelocities = new Float32Array(count * 3);
        particleColors = new Float32Array(count * 3);
        var colors = [
            [CONFIG.particleColor >> 16 & 255, CONFIG.particleColor >> 8 & 255, CONFIG.particleColor & 255],
            [CONFIG.particleColor2 >> 16 & 255, CONFIG.particleColor2 >> 8 & 255, CONFIG.particleColor2 & 255],
            [255, 240, 200]
        ];

        for (var i = 0; i < count; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * W * 1.2;
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * H * 1.2;
            particlePositions[i * 3 + 2] = 0;
            particleVelocities[i * 3] = (Math.random() - 0.5) * 0.5;
            particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
            particleVelocities[i * 3 + 2] = 0;
            var c = colors[i % 3];
            particleColors[i * 3] = c[0] / 255;
            particleColors[i * 3 + 1] = c[1] / 255;
            particleColors[i * 3 + 2] = c[2] / 255;
        }

        geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

        if (CONFIG.particleGlow) {
            var glowMat = new THREE.PointsMaterial({
                size: CONFIG.particleSize * 2.5,
                vertexColors: true,
                transparent: true,
                opacity: 0.18,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            scene.add(new THREE.Points(geometry, glowMat));
        }

        var material = new THREE.PointsMaterial({
            size: CONFIG.particleSize,
            vertexColors: true,
            transparent: true,
            opacity: 0.92,
            sizeAttenuation: true,
            blending: CONFIG.particleGlow ? THREE.AdditiveBlending : THREE.NormalBlending,
            depthWrite: false
        });
        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        lineMaterial = new THREE.LineBasicMaterial({
            color: CONFIG.lineColor,
            transparent: true,
            opacity: CONFIG.lineOpacity,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        function updateMouse(e) {
            var x = (e.clientX !== undefined ? e.clientX : e.touches[0].clientX) - W / 2;
            var y = -(e.clientY !== undefined ? e.clientY : e.touches[0].clientY) + H / 2;
            mouse.targetX = x;
            mouse.targetY = y;
        }
        window.addEventListener('mousemove', updateMouse);
        window.addEventListener('touchmove', function(e) { e.preventDefault(); updateMouse(e); }, { passive: false });
        window.addEventListener('resize', onResize);

        animate();
    }

    function onResize() {
        W = window.innerWidth;
        H = window.innerHeight;
        camera.left = -W / 2;
        camera.right = W / 2;
        camera.top = H / 2;
        camera.bottom = -H / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
    }

    function animate() {
        requestAnimationFrame(animate);
        var count = particlePositions.length / 3;
        var t = performance.now() * 0.001;
        mouse.x += (mouse.targetX - mouse.x) * CONFIG.mouseEase;
        mouse.y += (mouse.targetY - mouse.y) * CONFIG.mouseEase;

        for (var i = 0; i < count; i++) {
            var ix = i * 3;
            var x = particlePositions[ix];
            var y = particlePositions[ix + 1];
            var fx = Math.sin(t * 0.7 + i * 0.1) * CONFIG.floatAmount * CONFIG.floatSpeed;
            var fy = Math.cos(t * 0.5 + i * 0.07) * CONFIG.floatAmount * CONFIG.floatSpeed;
            var dx = mouse.x - x;
            var dy = mouse.y - y;
            var dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
            if (dist < CONFIG.mouseRadius) {
                var force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseStrength;
                if (CONFIG.mouseMode === 'repel') {
                    particleVelocities[ix] -= (dx / dist) * force;
                    particleVelocities[ix + 1] -= (dy / dist) * force;
                } else {
                    particleVelocities[ix] += (dx / dist) * force;
                    particleVelocities[ix + 1] += (dy / dist) * force;
                }
            }
            particleVelocities[ix] += fx;
            particleVelocities[ix + 1] += fy;
            particleVelocities[ix] *= 0.98;
            particleVelocities[ix + 1] *= 0.98;
            particlePositions[ix] += particleVelocities[ix];
            particlePositions[ix + 1] += particleVelocities[ix + 1];
            var margin = 80;
            if (particlePositions[ix] < -W / 2 - margin) particlePositions[ix] = W / 2 + margin;
            if (particlePositions[ix] > W / 2 + margin) particlePositions[ix] = -W / 2 - margin;
            if (particlePositions[ix + 1] < -H / 2 - margin) particlePositions[ix + 1] = H / 2 + margin;
            if (particlePositions[ix + 1] > H / 2 + margin) particlePositions[ix + 1] = -H / 2 - margin;
        }
        geometry.attributes.position.needsUpdate = true;
        removeOldLines();
        drawConnections();
        renderer.render(scene, camera);
    }

    function removeOldLines() {
        for (var i = 0; i < lineSegments.length; i++) {
            scene.remove(lineSegments[i]);
            lineSegments[i].geometry.dispose();
            lineSegments[i].material.dispose();
        }
        lineSegments.length = 0;
    }

    function drawConnections() {
        var count = particlePositions.length / 3;
        var r2 = CONFIG.connectRadius * CONFIG.connectRadius;
        var maxLines = CONFIG.maxConnections || 9999;
        var drawn = 0;
        for (var i = 0; i < count && drawn < maxLines; i++) {
            for (var j = i + 1; j < count && drawn < maxLines; j++) {
                var dx = particlePositions[j * 3] - particlePositions[i * 3];
                var dy = particlePositions[j * 3 + 1] - particlePositions[i * 3 + 1];
                var d2 = dx * dx + dy * dy;
                if (d2 < r2) {
                    var geom = new THREE.BufferGeometry().setFromPoints([
                        new THREE.Vector3(particlePositions[i * 3], particlePositions[i * 3 + 1], 0),
                        new THREE.Vector3(particlePositions[j * 3], particlePositions[j * 3 + 1], 0)
                    ]);
                    var line = new THREE.Line(geom, lineMaterial.clone());
                    line.material.opacity = CONFIG.lineOpacity * (1 - Math.sqrt(d2) / CONFIG.connectRadius);
                    scene.add(line);
                    lineSegments.push(line);
                    drawn++;
                }
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
