# EPOC Brutalist Design System

## Color Palette
- **Primary Red**: #DA3C2F (brand aggression, CTAs)
- **Cream**: #F4E7DA (backgrounds, negative space)
- **Dark**: #0f0f0f (text, borders, shadows)
- **Purple**: #3a0c2e (accent blurs, depth layers)

## Typography
- **Display Font**: Tanker (Google Fonts) - Bold geometric sans-serif for headlines
- **Body Font**: Satoshi (Fontshare) - Refined sans-serif for body text
- **Weight Scale**: Regular (400), Bold (700), Extra Bold (900)

## Spacing & Layout
- **Max Container**: 1440px
- **Gutters**: 24px/6rem on desktop, 24px on mobile
- **Gap System**: 8px, 12px, 16px, 24px, 32px (used throughout)
- **Border Width**: 4px (inputs), 8px (cards), 16px (major blocks)

## Shadow System
- **brutal**: 16px 16px 0px 0px #0f0f0f
- **brutal-cream**: 12px 12px 0px 0px #F4E7DA
- **brutal-red**: 12px 12px 0px 0px #DA3C2F
- **cascading**: 8px 8px 0px 0px #F4E7DA, 16px 16px 0px 0px #0f0f0f, 24px 24px 0px 0px #DA3C2F, 32px 32px 0px 0px #3a0c2e

## Animation Tokens
- **Marquee Speed**: 10s linear infinite
- **Stagger Delays**: 0.1s, 0.3s, 0.5s, 0.7s
- **Easing**: cubic-bezier(0.175, 0.885, 0.32, 1.275) - bouncy acceleration
- **Breathe Animation**: 3s pulse with 1.05 scale on 50%

## Reusable Components

### NavigationBar
Component ID: b932ec1c-e2f6-4bad-ac2a-0ef62d44c5e1
Props: activeItem, homeHref, manifestoHref, objectsHref, chaosHref
```html
<nav class="fixed top-0 w-full z-50 px-6 py-4 border-b-8" style="background-color: #F4E7DA; border-color: #0f0f0f;">
  <div class="max-w-[1440px] mx-auto flex items-center justify-between">
    <a :href="homeHref" class="block violent-hover">
      <img src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/ae52f364-29ad-4a1c-8745-c4863ce23c5d/1791208709971-1734bdc7/image.png" alt="EPOC" class="h-12 w-auto border-4" style="border-color: #0f0f0f; box-shadow: 16px 16px 0px 0px #0f0f0f;">
    </a>
    <div class="hidden lg:flex gap-12 text-4xl uppercase tracking-widest" style="font-family: 'Tanker', sans-serif;">
      <a :href="manifestoHref" class="glitch-hover hover:underline inline-block" :class="{ 'underline': activeItem === 'manifesto' }" style="text-decoration-thickness: 8px; text-underline-offset: 8px;">
        Manifesto
      </a>
      <a :href="objectsHref" class="glitch-hover hover:underline inline-block" :class="{ 'underline': activeItem === 'objects' }" style="text-decoration-thickness: 8px; text-underline-offset: 8px;">
        Objects
      </a>
      <a :href="chaosHref" class="glitch-hover hover:underline inline-block" :class="{ 'underline': activeItem === 'chaos' }" style="text-decoration-thickness: 8px; text-underline-offset: 8px;">
        Chaos
      </a>
    </div>
    <div class="flex gap-6">
      <button @click="$emit('cartClick')" class="w-16 h-16 border-4 flex items-center justify-center violent-hover" style="background-color: #DA3C2F; border-color: #0f0f0f; box-shadow: 16px 16px 0px 0px #0f0f0f;">
        <iconify-icon icon="lucide:shopping-cart" class="text-3xl" style="color: #F4E7DA;"></iconify-icon>
      </button>
    </div>
  </div>
</nav>
```

### BrutalFooter
Component ID: 35b4f6d9-4c58-4b35-b045-0ff99f4518d3
Props: logoHref, showTagline
```html
<footer class="bg-[#0f0f0f] text-[#F4E7DA] border-t-8 border-[#F4E7DA] px-6 py-24 relative z-10">
<div class="max-w-[1440px] mx-auto text-center">
<a :href="logoHref" class="inline-block group transition-transform duration-300 hover:scale-105 hover:-rotate-1">
<h2 class="font-['Tanker',sans-serif] text-[15vw] leading-none uppercase transition-colors duration-300 group-hover:text-[#F4E7DA]" style="-webkit-text-stroke: 2px #F4E7DA; color: transparent;">EPOC</h2>
</a>
<p v-if="showTagline" class="font-['Tanker',sans-serif] text-3xl uppercase tracking-[0.5em] mt-8 text-[#DA3C2F] transition-all duration-300 hover:skew-x-1">End of an era.</p>
</div>
</footer>
```

## Effect Classes

### glitch-hover
Text glitch animation on hover with skew transforms and multi-color text shadows (4px #DA3C2F, -4px #0f0f0f)

### violent-hover
Aggressive scale(1.08) + translate(-6px, -6px) + rotate(2deg) with enhanced box-shadow on hover

### cascading-shadow
Multi-layer 4-step shadow effect with hover state that amplifies the shadow stack

### breathe-img
Pulsing animation: scale 1 → 1.05 at 50% with opacity fade (0.75 at 50%)

### stroke-text
Text stroke effect with transparent fill: -webkit-text-stroke: 2px #F4E7DA

## CSS Variables (Tailwind Config)
```
colors: {
  brand: {
    red: '#DA3C2F',
    cream: '#F4E7DA',
    dark: '#0f0f0f',
    purple: '#3a0c2e'
  }
}
fontFamily: {
  display: ['Tanker', 'sans-serif'],
  body: ['Satoshi', 'sans-serif']
}
boxShadow: {
  brutal: '16px 16px 0px 0px #0f0f0f',
  'brutal-cream': '12px 12px 0px 0px #F4E7DA',
  'brutal-red': '12px 12px 0px 0px #DA3C2F'
}
```

## Aesthetic Direction
**Brutalist Gen-Z Premium** — Unapologetic raw energy with luxury minimalism. Rejects sterile modern design. Every interaction has violent motion. Multi-layer cascading shadows create depth. Grid pattern background adds texture. Text strokes add premium feel. Staggered animations create cinematic reveals.