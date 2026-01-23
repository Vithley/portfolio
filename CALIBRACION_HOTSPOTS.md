# 🎯 Guía de Calibración de Hotspots en Móviles

## 🔍 Problema Identificado
Los hotspots se descuadran en móviles porque:
1. **Diferentes relaciones de aspecto** entre imagen desktop (room.png) y móvil (room2.png)
2. **Posiciones porcentuales** que se calculan sobre el contenedor, no sobre la imagen visible
3. **Variación entre dispositivos móviles** con diferentes resoluciones y DPR (Device Pixel Ratio)

## ✅ Soluciones Implementadas

### 1. **Breakpoints Adicionales**
Se agregaron media queries intermedias para tablets (1024px) y móviles pequeños (480px).

### 2. **Mejor Manejo del Contenedor**
- El contenedor ahora usa `display: flex` + `align-items/justify-content: center` en móviles
- Garantiza que la imagen esté centrada correctamente

### 3. **Forzado de Reflow en Cambio de Orientación**
El código ahora recalcula el layout cuando cambias de orientación.

## 📱 Cómo Calibrar en Tu Móvil

### Paso 1: Activar Modo Desarrollo Visual
Agrega bordes visibles temporalmente para ver exactamente dónde están los hotspots:

```scss
// En adventure.component.scss, agrega esto temporalmente:
.hotspot-contact,
.hotspot-about,
.hotspot-cv,
.hotspot-demo,
.hotspot-code {
  border: 2px solid red !important; // ⚠️ Solo para debug
  background: rgba(255, 0, 0, 0.2) !important; // ⚠️ Solo para debug
}
```

### Paso 2: Probar en Diferentes Dispositivos
1. **Abre la app en tu móvil real**
2. **Verifica cada hotspot** - deberían estar sobre los objetos correctos
3. **Prueba en horizontal y vertical**

### Paso 3: Ajustar Posiciones
Si algún hotspot no cuadra, ajusta los valores en `adventure.component.scss`:

```scss
// Ejemplo para móviles (max-width: 768px)
.hotspot-contact {
  @media (max-width: 768px) {
    top: 40%;    // ⬆️ Subir: reducir % | ⬇️ Bajar: aumentar %
    left: 28%;   // ⬅️ Izquierda: reducir % | ➡️ Derecha: aumentar %
    width: 20%;  // Tamaño horizontal
    height: 10%; // Tamaño vertical
  }
}
```

### Paso 4: Tabla de Ajuste Rápido

| Dispositivo | Resolución | Ajuste Sugerido |
|-------------|-----------|-----------------|
| iPhone SE | 375x667 | Usar breakpoint 480px |
| iPhone 12/13 | 390x844 | Usar breakpoint 768px |
| Galaxy S21 | 360x800 | Usar breakpoint 480px |
| iPad Mini | 768x1024 | Usar breakpoint 1024px |

## 🛠️ Herramienta de Debug en el Navegador

Puedes usar las DevTools del navegador móvil:

1. **En Chrome Android**: chrome://inspect
2. **En Safari iOS**: Activar "Web Inspector" en Ajustes > Safari > Avanzado
3. **Consola**: Verás los logs con `isMobile` y `width`

## 🎨 Alternativa Avanzada: Hotspots Absolutos con JavaScript

Si los % no funcionan bien, puedes cambiar a calcular posiciones dinámicamente:

```typescript
// En adventure.component.ts
ngAfterViewInit() {
  this.calculateHotspotPositions();
}

calculateHotspotPositions() {
  const scene = document.querySelector('.adventure-scene') as HTMLElement;
  const img = new Image();
  img.src = this.isMobile ? 'assets/images/room2.png' : 'assets/images/room.png';
  
  img.onload = () => {
    const sceneRect = scene.getBoundingClientRect();
    const imgRatio = img.width / img.height;
    const sceneRatio = sceneRect.width / sceneRect.height;
    
    // Calcular el tamaño real de la imagen visible
    let visibleWidth, visibleHeight, offsetX = 0, offsetY = 0;
    
    if (sceneRatio > imgRatio) {
      // La imagen se ajusta por altura
      visibleHeight = sceneRect.height;
      visibleWidth = visibleHeight * imgRatio;
      offsetX = (sceneRect.width - visibleWidth) / 2;
    } else {
      // La imagen se ajusta por ancho
      visibleWidth = sceneRect.width;
      visibleHeight = visibleWidth / imgRatio;
      offsetY = (sceneRect.height - visibleHeight) / 2;
    }
    
    // Ahora puedes posicionar hotspots en relación a la imagen visible
    this.positionHotspot('.hotspot-contact', {
      x: 0.36, // 36% desde la izquierda de la IMAGEN
      y: 0.48, // 48% desde arriba de la IMAGEN
      width: 0.10,
      height: 0.05
    }, visibleWidth, visibleHeight, offsetX, offsetY);
  };
}

positionHotspot(selector: string, coords: any, imgW: number, imgH: number, offsetX: number, offsetY: number) {
  const hotspot = document.querySelector(selector) as HTMLElement;
  if (hotspot) {
    hotspot.style.left = `${offsetX + coords.x * imgW}px`;
    hotspot.style.top = `${offsetY + coords.y * imgH}px`;
    hotspot.style.width = `${coords.width * imgW}px`;
    hotspot.style.height = `${coords.height * imgH}px`;
  }
}
```

## 📋 Checklist Final

- [ ] Compilar y desplegar en servidor
- [ ] Probar en al menos 3 dispositivos móviles diferentes
- [ ] Probar en orientación vertical y horizontal
- [ ] Verificar que todos los hotspots sean clickables
- [ ] Verificar que el tooltip sea legible
- [ ] Remover bordes de debug antes de producción

## 💡 Tips Adicionales

1. **Usa diferentes imágenes optimizadas**: La room2.png debería tener los objetos en posiciones similares a room.png
2. **Considera SVG hotspots**: Para precisión pixel-perfect
3. **Testing**: Usa BrowserStack o similar para probar múltiples dispositivos
4. **Viewport meta tag**: Asegúrate de tener en index.html:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

## 🐛 Debugging

Si sigues teniendo problemas, activa este código temporal:

```typescript
// En adventure.component.ts, en ngOnInit()
if (this.isMobile) {
  setInterval(() => {
    console.log({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      orientation: window.orientation || screen.orientation?.angle
    });
  }, 2000);
}
```

¡Esto te ayudará a identificar exactamente qué está pasando en cada dispositivo!
