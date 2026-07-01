import React, { useRef, useEffect, useState } from 'react';
import { MenuItem } from '../types';

interface Volumetric3DAssetProps {
  item: MenuItem;
  interactive?: boolean;
}

export default function Volumetric3DAsset({ item, interactive = true }: Volumetric3DAssetProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Interaction states
  const [yaw, setYaw] = useState<number>(item.posNum * 36); // Initial distinct rotations for variety
  const [pitch, setPitch] = useState<number>(12); // Slightly tilted down
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; yaw: number; pitch: number }>({ x: 0, y: 0, yaw: 0, pitch: 0 });
  const velocityRef = useRef<number>(0.2); // Initial spin momentum
  const hoverTiltRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI retina screens
    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    const width = 240;
    const height = 240;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Render loop
    let currentYaw = yaw;
    let currentPitch = pitch;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Apply physics & inertia
      if (!isDragging) {
        // Slowly decay velocity and spin auto
        velocityRef.current *= 0.95;
        if (Math.abs(velocityRef.current) < 0.05) {
          velocityRef.current = 0.15; // Sustained gentle idle rotation
        }
        currentYaw += velocityRef.current;
      } else {
        // Smooth transition to target yaw/pitch
        currentYaw += (yaw - currentYaw) * 0.3;
        currentPitch += (pitch - currentPitch) * 0.3;
      }

      // Smooth tilt parallax towards hover coordinates
      currentTiltX += (hoverTiltRef.current.x - currentTiltX) * 0.15;
      currentTiltY += (hoverTiltRef.current.y - currentTiltY) * 0.15;

      // Final matrix pitch/yaw adjustments (in radians)
      const rYaw = (currentYaw * Math.PI) / 180;
      const rPitch = ((currentPitch + currentTiltY * 10) * Math.PI) / 180;
      const rRoll = (currentTiltX * 4 * Math.PI) / 180;

      // Save state and set origin to center of card
      ctx.save();
      ctx.translate(width / 2, height / 2 + 10);
      
      // Apply general 3D tilting rotation
      ctx.rotate(rRoll);

      // Draw shadow underneath item
      ctx.beginPath();
      const shadowGrad = ctx.createRadialGradient(0, 75, 5, 0, 75, 55);
      shadowGrad.addColorStop(0, 'rgba(142, 68, 173, 0.25)'); // Appetizing tint shadow
      shadowGrad.addColorStop(0.5, 'rgba(239, 68, 68, 0.08)');
      shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = shadowGrad;
      ctx.scale(1.2, 0.4);
      ctx.arc(0, 75 / 0.4, 55, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(width / 2, height / 2 + 10);
      ctx.rotate(rRoll);

      const config = item.modelConfig;

      // RENDER SPECIFIC 3D PROCEDURAL OBJECTS
      if (config.type === 'iced_cup' || config.type === 'smoothie_cup') {
        const isSmoothie = config.type === 'smoothie_cup';
        const cupWidth = isSmoothie ? 50 : 54;
        const cupHeight = isSmoothie ? 120 : 110;
        const topRadius = cupWidth;
        const bottomRadius = cupWidth * 0.75;

        // Draw background elements first (straw, back rim of cup, bubbles back)
        // Draw STRAW (runs through cup)
        if (config.details.includes('straw')) {
          ctx.save();
          // Straw angle rotates slightly with yaw for 3D effect
          const strawXOffset = Math.sin(rYaw) * 12;
          ctx.translate(strawXOffset, -10);
          ctx.rotate(-0.25);
          
          // Straw cylinder
          const strawGrad = ctx.createLinearGradient(-4, -130, 4, -130);
          strawGrad.addColorStop(0, '#FF8A8A');
          strawGrad.addColorStop(0.4, '#FFE4E4');
          strawGrad.addColorStop(1, '#E11D48');
          ctx.fillStyle = strawGrad;
          ctx.fillRect(-4, -130, 8, 200);

          // Straw spirals
          ctx.fillStyle = '#FFE4E4';
          for (let i = -120; i < 60; i += 20) {
            ctx.beginPath();
            ctx.ellipse(0, i, 4, 3, 0.2, 0, Math.PI, false);
            ctx.fill();
          }
          ctx.restore();
        }

        // Draw BACK RIM OF CUP (ellipse)
        ctx.beginPath();
        ctx.ellipse(0, -cupHeight/2, topRadius, topRadius * 0.22, 0, Math.PI, 0);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw FLUID / LIQUID BASE inside cup
        ctx.save();
        const liquidTopY = -cupHeight/2 + (isSmoothie ? 20 : 15);
        const liquidBottomY = cupHeight/2 - 8;
        
        // Draw fluid clipping path
        ctx.beginPath();
        ctx.moveTo(-topRadius + 2, liquidTopY);
        ctx.ellipse(0, liquidTopY, topRadius - 2, (topRadius - 2) * 0.2, 0, 0, Math.PI);
        ctx.lineTo(-bottomRadius + 2, liquidBottomY);
        ctx.ellipse(0, liquidBottomY, bottomRadius - 2, (bottomRadius - 2) * 0.2, 0, Math.PI, 0, true);
        ctx.closePath();
        ctx.clip();

        // Fill fluid with dynamic color gradient representing the espresso / smoothie
        const fluidGrad = ctx.createLinearGradient(0, liquidTopY, 0, liquidBottomY);
        fluidGrad.addColorStop(0, config.fluidColor || '#EAD2AC');
        fluidGrad.addColorStop(0.7, config.baseColor);
        fluidGrad.addColorStop(1, config.baseColor);
        ctx.fillStyle = fluidGrad;
        ctx.fillRect(-topRadius - 10, liquidTopY - 10, topRadius * 2 + 20, cupHeight + 20);

        // CONDENSATION & ICE CUBES floating inside
        if (config.details.includes('ice')) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1.5;

          // Render 3 orbiting ice cubes in 3D
          for (let i = 0; i < 3; i++) {
            const angle = rYaw + (i * Math.PI * 2) / 3;
            // Orbit path
            const iceX = Math.cos(angle) * (topRadius * 0.5);
            const iceY = liquidTopY + 12 + Math.sin(angle * 0.5) * 6;
            const iceSize = 14;

            ctx.save();
            ctx.translate(iceX, iceY);
            ctx.rotate(angle * 0.4);
            
            // Draw cube faces
            ctx.beginPath();
            ctx.rect(-iceSize/2, -iceSize/2, iceSize, iceSize);
            ctx.fill();
            ctx.stroke();

            // Specular glint on ice
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fillRect(-iceSize/2 + 2, -iceSize/2 + 2, 3, 3);
            ctx.restore();
          }
        }

        // SMOOTHIE CHUNKS OR BUBBLES
        if (config.details.includes('bubbles')) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          for (let i = 0; i < 12; i++) {
            const bAngle = rYaw * 0.5 + i * 1.3;
            const bX = Math.sin(bAngle) * (topRadius * 0.6);
            const bY = liquidTopY + 10 + ((i * 11) % (cupHeight - 30));
            const bRadius = 1.5 + (i % 3);
            ctx.beginPath();
            ctx.arc(bX, bY, bRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // SWIRLING MILK OR CHOC GRADIENT WAVES
        if (config.details.includes('milk_swirl')) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(-topRadius * 0.6, liquidTopY + 15);
          ctx.bezierCurveTo(-topRadius * 0.2, liquidTopY + 45, topRadius * 0.2, liquidTopY + 5, topRadius * 0.6, liquidTopY + 35);
          ctx.stroke();
        }

        ctx.restore(); // Fluid clipping end

        // TOPPINGS (Cream / Foam sitting on top)
        if (config.details.includes('cream')) {
          const creamY = liquidTopY - 2;
          ctx.save();
          // Draw a gorgeous, fluffy, glossy whipped cream dome in perspective
          const creamGrad = ctx.createRadialGradient(-5, creamY - 20, 5, -5, creamY - 20, 45);
          creamGrad.addColorStop(0, '#FFFFFF');
          creamGrad.addColorStop(0.7, '#FFF3E0');
          creamGrad.addColorStop(1, '#E6C2A0');
          ctx.fillStyle = creamGrad;
          
          // Fluffy cloud circles overlapping
          ctx.beginPath();
          ctx.arc(-22, creamY - 5, 20, 0, Math.PI * 2);
          ctx.arc(22, creamY - 5, 20, 0, Math.PI * 2);
          ctx.arc(-12, creamY - 18, 22, 0, Math.PI * 2);
          ctx.arc(12, creamY - 18, 22, 0, Math.PI * 2);
          ctx.arc(0, creamY - 32, 22, 0, Math.PI * 2);
          ctx.fill();

          // Chocolate/Caramel syrup drizzles on cream
          if (config.details.includes('chocolate_drizzle') || config.details.includes('caramel_drizzle')) {
            ctx.strokeStyle = config.details.includes('chocolate_drizzle') ? '#451A03' : '#D97706';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            for (let i = 0; i < 4; i++) {
              ctx.beginPath();
              const dx = -20 + i * 14;
              ctx.moveTo(dx, creamY - 32);
              ctx.bezierCurveTo(dx - 5, creamY - 15, dx + 5, creamY - 5, dx, creamY + 8);
              ctx.stroke();
            }
          }

          // Rainbow sprinkles or chocolate shavings
          if (config.details.includes('rainbow_sprinkles') || config.details.includes('sprinkles') || config.details.includes('gold_sprinkles')) {
            const colors = config.details.includes('gold_sprinkles') ? ['#F59E0B', '#FFFBEB', '#D97706'] : ['#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#FFFDF6'];
            for (let i = 0; i < 15; i++) {
              ctx.fillStyle = colors[i % colors.length];
              const sx = -25 + (Math.sin(i * 12 + rYaw) * 22);
              const sy = creamY - 28 + (Math.cos(i * 17) * 16);
              ctx.beginPath();
              ctx.ellipse(sx, sy, 3, 1.5, i * 0.7, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          ctx.restore();
        }

        // FRUIT GARNISHES (Lemon slice / Strawberry / Lime)
        if (config.details.includes('lime_wheel') || config.details.includes('lemon_slice')) {
          ctx.save();
          // Situate on the right side of the rim
          const isLemon = config.details.includes('lemon_slice');
          ctx.translate(topRadius - 6, liquidTopY - 10);
          ctx.rotate(0.6 + Math.sin(rYaw * 0.1) * 0.05);

          // Draw the slice circle
          ctx.fillStyle = isLemon ? '#FCD34D' : '#34D399';
          ctx.beginPath();
          ctx.arc(0, 0, 18, 0, Math.PI * 2);
          ctx.fill();

          // Rind / Inner wedges
          ctx.fillStyle = isLemon ? '#FFFBEB' : '#ECFDF5';
          ctx.beginPath();
          ctx.arc(0, 0, 15, 0, Math.PI * 2);
          ctx.fill();

          // Green/Yellow spokes
          ctx.strokeStyle = isLemon ? '#F59E0B' : '#10B981';
          ctx.lineWidth = 2.5;
          for (let d = 0; d < Math.PI * 2; d += Math.PI / 4) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(d) * 14, Math.sin(d) * 14);
            ctx.stroke();
          }

          ctx.restore();
        }

        if (config.details.includes('strawberry_slice')) {
          ctx.save();
          ctx.translate(-topRadius + 12, liquidTopY - 8);
          ctx.rotate(-0.4);
          // Strawberry heart shape
          ctx.fillStyle = '#EF4444';
          ctx.beginPath();
          ctx.moveTo(0, -10);
          ctx.bezierCurveTo(-10, -20, -18, -2, 0, 14);
          ctx.bezierCurveTo(18, -2, 10, -20, 0, -10);
          ctx.fill();

          // Seeds
          ctx.fillStyle = '#FEF08A';
          for (let s = 0; s < 8; s++) {
            ctx.fillRect(-6 + (s * 3) % 12, -8 + (s * 4) % 16, 1.5, 1.5);
          }
          ctx.restore();
        }

        // Draw FRONT WALL OF GLASS CUP (beautiful high glossy shader!)
        ctx.save();
        ctx.beginPath();
        // Outer glass wall
        ctx.moveTo(-topRadius, -cupHeight/2);
        ctx.lineTo(-bottomRadius, cupHeight/2);
        ctx.ellipse(0, cupHeight/2, bottomRadius, bottomRadius * 0.22, 0, 0, Math.PI);
        ctx.lineTo(topRadius, -cupHeight/2);
        ctx.ellipse(0, -cupHeight/2, topRadius, topRadius * 0.22, 0, 0, Math.PI);
        ctx.closePath();

        // High gloss vertical reflections
        const glassGrad = ctx.createLinearGradient(-topRadius, 0, topRadius, 0);
        glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        glassGrad.addColorStop(0.12, 'rgba(255, 255, 255, 0.15)');
        glassGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.05)');
        glassGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.0)');
        glassGrad.addColorStop(0.72, 'rgba(255, 255, 255, 0.1)');
        glassGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.35)');
        glassGrad.addColorStop(0.9, 'rgba(255, 255, 255, 0.1)');
        glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0.45)');
        ctx.fillStyle = glassGrad;
        ctx.fill();

        // Glass stroke outline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Sparkle reflections on bottom curved glass
        ctx.beginPath();
        ctx.ellipse(0, cupHeight/2 - 4, bottomRadius - 4, (bottomRadius - 4) * 0.2, 0, 0, Math.PI * 0.8);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();
      }

      else if (config.type === 'hot_cup') {
        const cupSize = config.details.includes('demitasse_size') ? 40 : 54;
        const saucerWidth = cupSize * 1.6;

        // Draw SAUCER Plate
        ctx.save();
        ctx.translate(0, 32);
        const saucerGrad = ctx.createLinearGradient(-saucerWidth, 0, saucerWidth, 0);
        saucerGrad.addColorStop(0, '#FFFFFF');
        saucerGrad.addColorStop(0.5, '#F3F4F6');
        saucerGrad.addColorStop(1, '#E5E7EB');
        ctx.fillStyle = saucerGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, saucerWidth, 22, 0, 0, Math.PI * 2);
        ctx.fill();

        // Saucer rim
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, 0, saucerWidth, 22, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Saucer shadow inset
        ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.beginPath();
        ctx.ellipse(0, -1, saucerWidth * 0.7, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw CUP HANDLE (orbits in 3D around Y-axis!)
        const handleYaw = rYaw + Math.PI * 0.3; // Angle of handle
        const handleX = Math.cos(handleYaw) * (cupSize * 0.9);
        const handleY = 0;
        const isHandleBehind = Math.sin(handleYaw) < 0;

        const drawHandle = () => {
          ctx.save();
          ctx.translate(handleX, handleY);
          ctx.rotate(isHandleBehind ? 0.3 : -0.3);
          
          // Outer circle loop of handle
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 11;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.arc(0, 0, 16, -Math.PI * 0.5, Math.PI * 0.8);
          ctx.stroke();

          // Handle highlight shine
          ctx.strokeStyle = '#F3F4F6';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, 16, -Math.PI * 0.5, Math.PI * 0.8);
          ctx.stroke();
          ctx.restore();
        };

        if (isHandleBehind) drawHandle();

        // Draw CERAMIC CUP (rounded volumetric body)
        ctx.save();
        const cupGrad = ctx.createLinearGradient(-cupSize, -cupSize, cupSize, cupSize);
        cupGrad.addColorStop(0, '#FFFFFF');
        cupGrad.addColorStop(0.4, '#FAFAFA');
        cupGrad.addColorStop(0.7, '#FFF3E0'); // Warm accent reflection
        cupGrad.addColorStop(1, '#E5E7EB');
        ctx.fillStyle = cupGrad;

        ctx.beginPath();
        ctx.moveTo(-cupSize, -cupSize * 0.3);
        ctx.bezierCurveTo(-cupSize, cupSize * 0.7, cupSize, cupSize * 0.7, cupSize, -cupSize * 0.3);
        ctx.ellipse(0, -cupSize * 0.3, cupSize, cupSize * 0.28, 0, 0, Math.PI, true);
        ctx.closePath();
        ctx.fill();

        // Cup rim stroke
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();

        // Draw Handle in front if not behind
        if (!isHandleBehind) drawHandle();

        // Draw DRINK SURFACE INSIDE CUP (clipped ellipse)
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, -cupSize * 0.3, cupSize - 2, cupSize * 0.28 - 1, 0, 0, Math.PI * 2);
        ctx.clip();

        // Liquid crema color
        const coffeeGrad = ctx.createRadialGradient(-10, -cupSize * 0.3 - 5, 2, 0, -cupSize * 0.3, cupSize);
        coffeeGrad.addColorStop(0, config.fluidColor || '#FFE0B2');
        coffeeGrad.addColorStop(0.6, config.baseColor);
        coffeeGrad.addColorStop(1, '#1A0D02');
        ctx.fillStyle = coffeeGrad;
        ctx.beginPath();
        ctx.ellipse(0, -cupSize * 0.3, cupSize, cupSize * 0.28, 0, 0, Math.PI * 2);
        ctx.fill();

        // LATTE ART OR COCOA DUSTING OR ICE CREAM
        if (config.details.includes('latte_art_heart')) {
          ctx.save();
          ctx.translate(0, -cupSize * 0.3);
          ctx.rotate(-0.15 + Math.sin(rYaw) * 0.08); // Slight rotation
          ctx.fillStyle = '#FFFDF5';
          ctx.strokeStyle = '#D97706';
          ctx.lineWidth = 1;

          // Cute heart latte art
          ctx.beginPath();
          ctx.moveTo(0, 4);
          ctx.bezierCurveTo(-14, -14, -18, -2, 0, 10);
          ctx.bezierCurveTo(18, -2, 14, -14, 0, 4);
          ctx.fill();
          
          // Outer halo layers
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(0, 0, 24, 10, 0, 0.2, Math.PI * 1.8);
          ctx.stroke();
          ctx.restore();
        }

        if (config.details.includes('cocoa_dust') || config.details.includes('cocoa_dusting')) {
          ctx.fillStyle = '#451A03';
          for (let i = 0; i < 24; i++) {
            const dustX = Math.sin(i * 14) * (cupSize * 0.4);
            const dustY = -cupSize * 0.3 + Math.cos(i * 27) * (cupSize * 0.12);
            ctx.beginPath();
            ctx.arc(dustX, dustY, 1 + (i % 3), 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (config.details.includes('ice_cream_scoop_inside')) {
          ctx.save();
          // Volumetric ice cream scoop emerging
          const iceCreamY = -cupSize * 0.3 - 8;
          const rGrad = ctx.createRadialGradient(-4, iceCreamY - 10, 2, -4, iceCreamY - 10, 22);
          rGrad.addColorStop(0, '#FFFDF6');
          rGrad.addColorStop(0.7, '#FFFBEB');
          rGrad.addColorStop(1, '#D97706'); // Coffee saturated rim
          ctx.fillStyle = rGrad;
          ctx.beginPath();
          ctx.arc(0, iceCreamY, 18, 0, Math.PI * 2);
          ctx.fill();

          // Vanilla dots
          ctx.fillStyle = '#B45309';
          ctx.fillRect(-4, iceCreamY - 6, 1.5, 1.5);
          ctx.fillRect(5, iceCreamY + 2, 1.5, 1.5);
          ctx.restore();
        }

        ctx.restore(); // Clip end

        // Draw STEAM animation (curved floating lines)
        if (config.details.includes('steam')) {
          ctx.save();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 3.5;
          ctx.lineCap = 'round';
          const time = (Date.now() * 0.003) % 4;
          
          for (let i = 0; i < 3; i++) {
            const shiftX = -20 + i * 20;
            const shiftY = -cupSize - 10 - ((time * 12 + i * 15) % 45);
            const alpha = 1 - ((Math.abs(shiftY) - cupSize) / 75);
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(0.4, alpha))})`;

            ctx.beginPath();
            ctx.moveTo(shiftX, -cupSize);
            ctx.bezierCurveTo(
              shiftX + Math.sin(time + i) * 10, -cupSize - 20,
              shiftX - Math.sin(time + i) * 10, -cupSize - 35,
              shiftX + Math.sin(time + i) * 5, shiftY
            );
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      else if (config.type === 'croissant') {
        ctx.save();
        ctx.rotate(rPitch);
        ctx.rotate(rYaw); // Full 360 rotation

        const isMini = config.details.includes('mini_size');
        const scale = isMini ? 0.7 : 1.0;
        ctx.scale(scale, scale);

        // Draw golden pastry rings (croissant layers)
        const totalRings = 7;
        const baseColor = config.baseColor;
        const highlightColor = config.fluidColor || '#FCD34D';

        for (let i = 0; i < totalRings; i++) {
          // Volumetric ellipse rings, center ring is the biggest, ends are smallest
          const centerDist = Math.abs(i - (totalRings - 1) / 2);
          const radiusY = 32 - centerDist * 7;
          const radiusX = 14 - centerDist * 2.2;
          const posX = (i - (totalRings - 1) / 2) * 15;
          const posY = Math.sin((i / (totalRings - 1)) * Math.PI) * -12; // curve arch shape

          ctx.save();
          ctx.translate(posX, posY);
          
          // Draw single crescent roll ring
          const ringGrad = ctx.createRadialGradient(-3, -8, 2, -3, -8, radiusY);
          ringGrad.addColorStop(0, highlightColor);
          ringGrad.addColorStop(0.55, baseColor);
          ringGrad.addColorStop(1, '#451A03'); // Dark crust shadow
          ctx.fillStyle = ringGrad;

          ctx.beginPath();
          ctx.ellipse(0, 0, radiusX, radiusY, 0.15 * (i - 3), 0, Math.PI * 2);
          ctx.fill();

          // Flaky surface texture strokes
          if (config.details.includes('flaky_lines')) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(0, 0, radiusX - 2, radiusY - 2, 0.15 * (i - 3), -0.5, Math.PI * 1.2);
            ctx.stroke();
          }
          ctx.restore();
        }

        // ICING / DRIZZLE GLOSS
        if (config.details.includes('pink_icing') || config.details.includes('green_drizzle') || config.details.includes('chocolate_lines')) {
          ctx.save();
          ctx.strokeStyle = config.details.includes('pink_icing') ? '#EC4899' : config.details.includes('green_drizzle') ? '#22C55E' : '#3F1D0B';
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          
          // Wavy drizzle across whole croissant
          ctx.beginPath();
          ctx.moveTo(-50, -5);
          for (let x = -50; x <= 50; x += 10) {
            const y = Math.sin((x / 50 + 0.5) * Math.PI) * -12 + Math.sin(x * 0.3) * 6;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.restore();
        }

        // Nut toppings / Pistachio nuts
        if (config.details.includes('pistachio_nuts')) {
          ctx.fillStyle = '#4ade80'; // Bright green nuts
          for (let n = 0; n < 20; n++) {
            const nx = -40 + n * 4.5 + Math.sin(n * 2) * 3;
            const ny = Math.sin((nx / 50 + 0.5) * Math.PI) * -12 - 5 + Math.cos(n * 3) * 6;
            ctx.fillRect(nx, ny, 3, 3);
          }
        }

        ctx.restore();
      }

      else if (config.type === 'cake_pop') {
        // Pop cake on a stick
        ctx.save();
        ctx.rotate(rPitch);
        ctx.rotate(rYaw);

        // STICK
        ctx.strokeStyle = '#FFE4C4';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 75);
        ctx.stroke();

        // SPHERE POP
        const popColor = config.baseColor;
        const popGrad = ctx.createRadialGradient(-10, -15, 4, -10, -15, 45);
        popGrad.addColorStop(0, '#FFFFFF'); // Bright light gloss reflection
        popGrad.addColorStop(0.3, config.fluidColor || '#FBCFE8');
        popGrad.addColorStop(0.8, popColor);
        popGrad.addColorStop(1, '#271003'); // Dark base shadow
        ctx.fillStyle = popGrad;

        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.fill();

        // High gloss glass reflection glint
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.ellipse(-14, -14, 10, 5, -0.6, 0, Math.PI * 2);
        ctx.fill();

        // Sprinkles orbiting pop sphere
        if (config.details.includes('sprinkles')) {
          const colors = ['#FFFBEB', '#3B82F6', '#EF4444', '#10B981', '#F59E0B'];
          for (let i = 0; i < 18; i++) {
            // Compute 3D point on sphere surface rotating
            const theta = (i * Math.PI * 2) / 18;
            const phi = 0.5 + (i % 3) * 0.7; // bands
            const sx = 34 * Math.sin(phi) * Math.cos(theta + rYaw);
            const sy = 34 * Math.cos(phi);
            const sz = 34 * Math.sin(phi) * Math.sin(theta + rYaw);

            if (sz > 0) { // Render only front facing sprinkles
              ctx.fillStyle = colors[i % colors.length];
              ctx.beginPath();
              ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        ctx.restore();
      }

      else if (config.type === 'cake_pancake') {
        // Stack of mini pancakes
        ctx.save();
        ctx.rotate(rPitch);
        ctx.rotate(rYaw);

        const pancakes = 3;
        for (let p = 0; p < pancakes; p++) {
          const py = 30 - p * 16;
          ctx.save();
          ctx.translate(0, py);

          // Volumetric cylinder pancake
          const pancakeGrad = ctx.createLinearGradient(-45, -10, 45, 10);
          pancakeGrad.addColorStop(0, '#E28743');
          pancakeGrad.addColorStop(0.4, '#F59E0B');
          pancakeGrad.addColorStop(1, '#B45309');
          ctx.fillStyle = pancakeGrad;

          // Side wall
          ctx.beginPath();
          ctx.ellipse(0, 0, 48, 14, 0, 0, Math.PI);
          ctx.lineTo(48, -10);
          ctx.ellipse(0, -10, 48, 14, 0, Math.PI, 0, true);
          ctx.lineTo(-48, 0);
          ctx.closePath();
          ctx.fill();

          // Top face (fluffy golden top)
          ctx.fillStyle = '#FCD34D';
          ctx.beginPath();
          ctx.ellipse(0, -10, 48, 14, 0, 0, Math.PI * 2);
          ctx.fill();

          // Inner ring highlight
          ctx.strokeStyle = '#FFE0B2';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(0, -10, 40, 11, 0, 0, Math.PI * 2);
          ctx.stroke();

          ctx.restore();
        }

        // Butter cube sitting on top
        ctx.save();
        ctx.translate(-5, -28);
        ctx.fillStyle = '#FDE047'; // Sunny yellow butter
        ctx.beginPath();
        // Simple isometric butter block
        ctx.moveTo(-8, -4);
        ctx.lineTo(2, -8);
        ctx.lineTo(12, -2);
        ctx.lineTo(12, 4);
        ctx.lineTo(2, 8);
        ctx.lineTo(-8, 4);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#FEF08A'; // Lit top face
        ctx.beginPath();
        ctx.moveTo(-8, -4);
        ctx.lineTo(2, -8);
        ctx.lineTo(12, -2);
        ctx.lineTo(2, 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Maple syrup drippings curving on layers
        if (config.details.includes('syrup_dripping')) {
          ctx.fillStyle = 'rgba(180, 83, 9, 0.85)'; // Transparent glossy bronze syrup
          ctx.beginPath();
          ctx.ellipse(0, -25, 34, 10, 0, 0, Math.PI * 2);
          ctx.fill();

          // Drip lines down the front side
          ctx.fillRect(-22, -25, 4, 25);
          ctx.beginPath();
          ctx.arc(-20, 0, 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillRect(15, -25, 5, 35);
          ctx.beginPath();
          ctx.arc(17.5, 10, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      else if (config.type === 'cake_slice') {
        // Piece of gourmet layered cake
        ctx.save();
        ctx.rotate(0.15); // Dynamic angle
        ctx.rotate(rYaw); // Full 360 spin!

        // Draw cake triangular prism geometry
        // Point 1: front tip (0, 0)
        // Point 2: back-left (-35, -35)
        // Point 3: back-right (35, -35)
        // Height: from y=-45 to y=15
        const h = 48; // Cake height

        const drawCakePrism = () => {
          // Slice side faces
          // Left wall
          const leftGrad = ctx.createLinearGradient(-35, 0, 0, 0);
          leftGrad.addColorStop(0, config.baseColor);
          leftGrad.addColorStop(1, config.fluidColor || '#FFFDF6');
          ctx.fillStyle = leftGrad;
          ctx.beginPath();
          ctx.moveTo(0, h/2);
          ctx.lineTo(-40, h/2 - 20);
          ctx.lineTo(-40, -h/2 - 20);
          ctx.lineTo(0, -h/2);
          ctx.closePath();
          ctx.fill();

          // Draw delicious internal cake layers on the left wall
          ctx.fillStyle = config.baseColor; // Chocolate sponge layer
          ctx.fillRect(-36, -10, 32, 8);
          ctx.fillRect(-36, 12, 32, 8);

          // Right wall
          const rightGrad = ctx.createLinearGradient(0, 0, 35, 0);
          rightGrad.addColorStop(0, config.fluidColor || '#FFFDF6');
          rightGrad.addColorStop(1, config.baseColor);
          ctx.fillStyle = rightGrad;
          ctx.beginPath();
          ctx.moveTo(0, h/2);
          ctx.lineTo(40, h/2 - 20);
          ctx.lineTo(40, -h/2 - 20);
          ctx.lineTo(0, -h/2);
          ctx.closePath();
          ctx.fill();

          // Cake layers on the right wall
          ctx.fillStyle = config.baseColor;
          ctx.fillRect(4, -10, 32, 8);
          ctx.fillRect(4, 12, 32, 8);

          // Back curved wall (frosting)
          ctx.fillStyle = config.toppingColor || config.baseColor;
          ctx.beginPath();
          ctx.moveTo(-40, -h/2 - 20);
          ctx.quadraticCurveTo(0, -h/2 - 32, 40, -h/2 - 20);
          ctx.lineTo(40, h/2 - 20);
          ctx.quadraticCurveTo(0, h/2 - 32, -40, h/2 - 20);
          ctx.closePath();
          ctx.fill();

          // Top Face (triangle)
          const topGrad = ctx.createLinearGradient(-20, -h/2 - 10, 20, -h/2 - 10);
          topGrad.addColorStop(0, config.toppingColor || config.fluidColor || '#FFF');
          topGrad.addColorStop(1, '#FFFDF0');
          ctx.fillStyle = topGrad;
          ctx.beginPath();
          ctx.moveTo(0, -h/2);
          ctx.lineTo(-40, -h/2 - 20);
          ctx.quadraticCurveTo(0, -h/2 - 32, 40, -h/2 - 20);
          ctx.closePath();
          ctx.fill();

          // Caramel wave drippings on top
          if (config.details.includes('caramel_waves')) {
            ctx.strokeStyle = '#D97706';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-30, -h/2 - 15);
            ctx.bezierCurveTo(-15, -h/2 - 5, -5, -h/2 - 25, 0, -h/2 - 5);
            ctx.bezierCurveTo(10, -h/2 - 25, 20, -h/2 - 5, 30, -h/2 - 15);
            ctx.stroke();
          }

          // Birthday Candle on top with FLICKERING FLAME!
          if (config.details.includes('glowing_candle')) {
            ctx.save();
            ctx.translate(0, -h/2 - 12);
            // Candle stick
            ctx.strokeStyle = '#F43F5E';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -18);
            ctx.stroke();

            // Wick
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, -18);
            ctx.lineTo(0, -21);
            ctx.stroke();

            // Flickering Flame!
            const fSize = 5 + Math.random() * 3;
            const flameGrad = ctx.createRadialGradient(0, -25, 1, 0, -25, fSize + 4);
            flameGrad.addColorStop(0, '#FFFFE0');
            flameGrad.addColorStop(0.3, '#F59E0B');
            flameGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
            ctx.fillStyle = flameGrad;
            ctx.beginPath();
            ctx.arc(0, -25, fSize + 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        };

        drawCakePrism();
        ctx.restore();
      }

      ctx.restore(); // Matrix transform end

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [yaw, pitch, isDragging, item]);

  // Handle drag / swipe physics
  const handleStart = (clientX: number, clientY: number) => {
    if (!interactive) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      yaw: yaw,
      pitch: pitch,
    };
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(10);
      } catch (e) {}
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !interactive) return;
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    // Convert deltas to yaw / pitch additions
    const newYaw = (dragStartRef.current.yaw - deltaX * 0.9) % 360;
    const newPitch = Math.max(0, Math.min(45, dragStartRef.current.pitch + deltaY * 0.5));

    velocityRef.current = -deltaX * 0.12; // Store spin momentum
    setYaw(newYaw);
    setPitch(newPitch);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(5);
      } catch (e) {}
    }
  };

  // Hover tilt effect (Mouse coordinates relative to card center)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    hoverTiltRef.current = { x, y };
  };

  const handleMouseLeave = () => {
    hoverTiltRef.current = { x: 0, y: 0 };
    if (isDragging) handleEnd();
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center select-none cursor-grab ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => {
        handleMouseMove(e);
        handleMove(e.clientX, e.clientY);
      }}
      onMouseUp={handleEnd}
      onMouseLeave={handleMouseLeave}
      onTouchStart={(e) => {
        if (e.touches[0]) {
          handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchMove={(e) => {
        if (e.touches[0]) {
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchEnd={handleEnd}
    >
      {/* Glare Glass Overlay Accent inside Asset boundary */}
      <div className="absolute inset-0 rounded-full bg-radial from-white/10 to-transparent pointer-events-none" />
      
      <canvas
        ref={canvasRef}
        style={{ width: '240px', height: '240px' }}
        className="block drop-shadow-2xl animate-soft-float filter saturate-[1.12]"
      />
    </div>
  );
}
