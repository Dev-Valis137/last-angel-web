const { useRef, useEffect } = React;

function GravityStarsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const STARS_COUNT = 200;
    const stars = Array.from({ length: STARS_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.15,
    }));

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 300 && dist > 0) {
          const force = ((300 - dist) / 300) * 0.015;
          star.vx += (dx / dist) * force;
          star.vy += (dy / dist) * force;
        }

        star.vx *= 0.98;
        star.vy *= 0.98;
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < -10) { star.x = canvas.width + 10; }
        if (star.x > canvas.width + 10) { star.x = -10; }
        if (star.y < -10) { star.y = canvas.height + 10; }
        if (star.y > canvas.height + 10) { star.y = -10; }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${star.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return React.createElement('canvas', {
    ref: canvasRef,
    style: {
      width: '100%',
      height: '100%',
      display: 'block',
      pointerEvents: 'none',
    },
  });
}
