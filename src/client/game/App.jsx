import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Star } from 'lucide-react';
import { useLeaderboard } from './useLeaderboard';
import { LeaderboardPanel } from './LeaderboardPanel';
import { SupportButton } from './SupportButton';
import { NotificationsToggle } from './NotificationsToggle';

// ============================================================================
// 1. 67-SPECIES FOOD CHAIN, 18 FEARFUL VILLAINS, 7 STORY CHAPTERS & 8 TEMPLATES
//    Rendered via Ultra-High-Resolution (180-192px) Enlarged Painted Assets
// ============================================================================
const SPECIES_CHAIN = [
  // Chapter 1: Sunlit Lotus Pond (1-10)
  { key: 'guppyfish', name: 'Fancy Guppy', base: '#f97316', patch: '#fff7ed', patch2: '#dc2626', fin: '#fef08a', style: 'koi' },
  { key: 'neontetrafish', name: 'Neon Tetra', base: '#0ea5e9', patch: '#f43f5e', patch2: '#e0f2fe', fin: '#bae6fd', style: 'stripe' },
  { key: 'goldfish', name: 'Goldfish', base: '#fb923c', patch: '#fef08a', patch2: '#ea580c', fin: '#fed7aa', style: 'veil' },
  { key: 'bettafish', name: 'Betta Fish', base: '#db2777', patch: '#9333ea', patch2: '#f9a8d4', fin: '#f472b6', style: 'veil' },
  { key: 'damselfish', name: 'Damselfish', base: '#2563eb', patch: '#60a5fa', patch2: '#1e3a8a', fin: '#fde047', style: 'solid' },
  { key: 'clownfish', name: 'Clownfish', base: '#f97316', patch: '#ffffff', patch2: '#1e293b', fin: '#fdba74', style: 'bands' },
  { key: 'mandarinfish', name: 'Mandarinfish', base: '#06b6d4', patch: '#f97316', patch2: '#1d4ed8', fin: '#67e8f9', style: 'calico' },
  { key: 'loachfish', name: 'Loach', base: '#eab308', patch: '#1e293b', patch2: '#fef08a', fin: '#fde68a', style: 'bands' },
  { key: 'butterflyfish', name: 'Butterflyfish', base: '#facc15', patch: '#0f172a', patch2: '#ffffff', fin: '#fef08a', style: 'bands' },
  { key: 'bluetangfish', name: 'Blue Tang', base: '#2563eb', patch: '#0f172a', patch2: '#38bdf8', fin: '#facc15', style: 'stripe' },
  // Chapter 2: Whispering Reed Shallows (11-20)
  { key: 'angelfish', name: 'Angelfish', base: '#f8fafc', patch: '#38bdf8', patch2: '#0f172a', fin: '#e0f2fe', style: 'veil' },
  { key: 'moorishidolfish', name: 'Moorish Idol', base: '#f8fafc', patch: '#0f172a', patch2: '#facc15', fin: '#fde047', style: 'bands' },
  { key: 'discusfish', name: 'Discus', base: '#fb7185', patch: '#38bdf8', patch2: '#fef08a', fin: '#fda4af', style: 'calico' },
  { key: 'archerfish', name: 'Archerfish', base: '#e2e8f0', patch: '#334155', patch2: '#94a3b8', fin: '#cbd5e1', style: 'calico' },
  { key: 'boxfish', name: 'Boxfish', base: '#facc15', patch: '#1e293b', patch2: '#fef08a', fin: '#fde68a', style: 'calico' },
  { key: 'cowfish', name: 'Cowfish', base: '#fbbf24', patch: '#38bdf8', patch2: '#ffffff', fin: '#fde68a', style: 'calico' },
  { key: 'filefish', name: 'Filefish', base: '#34d399', patch: '#fb923c', patch2: '#065f46', fin: '#a7f3d0', style: 'calico' },
  { key: 'surgeonfish', name: 'Surgeonfish', base: '#0284c7', patch: '#7dd3fc', patch2: '#0f172a', fin: '#facc15', style: 'stripe' },
  { key: 'lumpfish', name: 'Lumpfish', base: '#64748b', patch: '#cbd5e1', patch2: '#334155', fin: '#94a3b8', style: 'solid' },
  { key: 'lanternfish', name: 'Lanternfish', base: '#0ea5e9', patch: '#67e8f9', patch2: '#1e3a8a', fin: '#bae6fd', style: 'glow' },
  // Chapter 3: Sunken Lantern Reef (21-30)
  { key: 'koifish', name: 'Kohaku Koi', base: '#ffffff', patch: '#ef4444', patch2: '#1e293b', fin: '#fff1f2', style: 'koi' },
  { key: 'carpfish', name: 'Golden Carp', base: '#ea580c', patch: '#fef08a', patch2: '#ffffff', fin: '#fdba74', style: 'koi' },
  { key: 'plecofish', name: 'Pleco', base: '#475569', patch: '#94a3b8', patch2: '#1e293b', fin: '#64748b', style: 'calico' },
  { key: 'troutfish', name: 'Rainbow Trout', base: '#10b981', patch: '#f472b6', patch2: '#e2e8f0', fin: '#6ee7b7', style: 'calico' },
  { key: 'flyingfish', name: 'Flying Fish', base: '#38bdf8', patch: '#e0f2fe', patch2: '#0284c7', fin: '#bae6fd', style: 'veil' },
  { key: 'flounderfish', name: 'Flounder', base: '#b45309', patch: '#fde68a', patch2: '#78350f', fin: '#d97706', style: 'calico' },
  { key: 'parrotfish', name: 'Parrotfish', base: '#14b8a6', patch: '#f472b6', patch2: '#facc15', fin: '#5eead4', style: 'calico' },
  { key: 'triggerfish', name: 'Triggerfish', base: '#0ea5e9', patch: '#facc15', patch2: '#0f172a', fin: '#7dd3fc', style: 'bands' },
  { key: 'pufferfish', name: 'Pufferfish', base: '#fcd34d', patch: '#fffbeb', patch2: '#b45309', fin: '#fde68a', style: 'calico' },
  { key: 'blowfish', name: 'Blowfish', base: '#fbbf24', patch: '#f8fafc', patch2: '#92400e', fin: '#fef3c7', style: 'calico' },
  // Chapter 4: Twilight Kelp Canyon (31-40)
  { key: 'porcupinefish', name: 'Porcupinefish', base: '#d97706', patch: '#fef3c7', patch2: '#78350f', fin: '#f59e0b', style: 'calico' },
  { key: 'frogfish', name: 'Frogfish', base: '#ef4444', patch: '#fbbf24', patch2: '#991b1b', fin: '#fca5a5', style: 'calico' },
  { key: 'oscarfish', name: 'Oscar', base: '#1e293b', patch: '#f97316', patch2: '#fbbf24', fin: '#fb923c', style: 'calico' },
  { key: 'bassfish', name: 'Bass', base: '#15803d', patch: '#86efac', patch2: '#14532d', fin: '#4ade80', style: 'stripe' },
  { key: 'salmonfish', name: 'Salmon', base: '#f43f5e', patch: '#e2e8f0', patch2: '#9f1239', fin: '#fda4af', style: 'solid' },
  { key: 'catfish', name: 'Catfish', base: '#64748b', patch: '#cbd5e1', patch2: '#334155', fin: '#94a3b8', style: 'koi' },
  { key: 'piranhafish', name: 'Piranha', base: '#dc2626', patch: '#94a3b8', patch2: '#7f1d1d', fin: '#f87171', style: 'solid' },
  { key: 'lionfish', name: 'Lionfish', base: '#e11d48', patch: '#ffffff', patch2: '#881337', fin: '#fda4af', style: 'veil' },
  { key: 'scorpionfish', name: 'Scorpionfish', base: '#b91c1c', patch: '#fca5a5', patch2: '#450a0a', fin: '#ef4444', style: 'calico' },
  { key: 'stonefish', name: 'Stonefish', base: '#78716c', patch: '#d6d3d1', patch2: '#44403c', fin: '#a8a29e', style: 'calico' },
  // Chapter 5: Midnight Abyssal Trench (41-50)
  { key: 'halibutfish', name: 'Halibut', base: '#92400e', patch: '#e7e5e4', patch2: '#451a03', fin: '#b45309', style: 'calico' },
  { key: 'ribbonfish', name: 'Ribbonfish', base: '#a78bfa', patch: '#f472b6', patch2: '#4c1d95', fin: '#ddd6fe', style: 'eel' },
  { key: 'morayeelfish', name: 'Moray Eel', base: '#65a30d', patch: '#bef264', patch2: '#365314', fin: '#84cc16', style: 'eel' },
  { key: 'stingrayfish', name: 'Stingray', base: '#475569', patch: '#cbd5e1', patch2: '#1e293b', fin: '#94a3b8', style: 'ray' },
  { key: 'electricrayfish', name: 'Electric Ray', base: '#2563eb', patch: '#fde047', patch2: '#1e3a8a', fin: '#60a5fa', style: 'ray' },
  { key: 'arowanafish', name: 'Arowana', base: '#f1f5f9', patch: '#fbbf24', patch2: '#cbd5e1', fin: '#fde68a', style: 'eel' },
  { key: 'northernpikefish', name: 'Northern Pike', base: '#166534', patch: '#bef264', patch2: '#052e16', fin: '#4ade80', style: 'calico' },
  { key: 'barracudafish', name: 'Barracuda', base: '#cbd5e1', patch: '#38bdf8', patch2: '#475569', fin: '#94a3b8', style: 'stripe' },
  { key: 'tigermuskiefish', name: 'Tiger Muskie', base: '#059669', patch: '#fbbf24', patch2: '#064e3b', fin: '#34d399', style: 'bands' },
  { key: 'sturgeonfish', name: 'Sturgeon', base: '#64748b', patch: '#f1f5f9', patch2: '#334155', fin: '#94a3b8', style: 'stripe' },
  // Chapter 6: Pelagic Storm Current (51-60)
  { key: 'coelacanthfish', name: 'Coelacanth', base: '#1e3a8a', patch: '#93c5fd', patch2: '#172554', fin: '#3b82f6', style: 'calico' },
  { key: 'alligatorgarfish', name: 'Alligator Gar', base: '#3f6212', patch: '#d9f99d', patch2: '#1a2e05', fin: '#65a30d', style: 'eel' },
  { key: 'arapaimafish', name: 'Arapaima', base: '#0f766e', patch: '#f43f5e', patch2: '#134e4a', fin: '#14b8a6', style: 'stripe' },
  { key: 'anglerfish', name: 'Anglerfish', base: '#4c1d95', patch: '#fde047', patch2: '#2e1065', fin: '#8b5cf6', style: 'glow' },
  { key: 'viperfish', name: 'Viperfish', base: '#312e81', patch: '#67e8f9', patch2: '#1e1b4b', fin: '#6366f1', style: 'glow' },
  { key: 'gulpereelfish', name: 'Gulper Eel', base: '#1e1b4b', patch: '#a78bfa', patch2: '#0f0a2a', fin: '#4338ca', style: 'eel' },
  { key: 'oarfish', name: 'Oarfish', base: '#e2e8f0', patch: '#ef4444', patch2: '#94a3b8', fin: '#f87171', style: 'eel' },
  { key: 'sunfish', name: 'Ocean Sunfish', base: '#64748b', patch: '#e2e8f0', patch2: '#334155', fin: '#94a3b8', style: 'solid' },
  { key: 'mantarayfish', name: 'Manta Ray', base: '#1e293b', patch: '#f8fafc', patch2: '#0f172a', fin: '#475569', style: 'ray' },
  { key: 'sawfish', name: 'Sawfish', base: '#78716c', patch: '#e7e5e4', patch2: '#44403c', fin: '#a8a29e', style: 'sword' },
  // Chapter 7: Crown of the Sovereign Sea (61-67)
  { key: 'sailfish', name: 'Sailfish', base: '#0284c7', patch: '#38bdf8', patch2: '#0c4a6e', fin: '#7dd3fc', style: 'sword' },
  { key: 'swordfish', name: 'Swordfish', base: '#1d4ed8', patch: '#bfdbfe', patch2: '#1e3a8a', fin: '#60a5fa', style: 'sword' },
  { key: 'bluemarlinfish', name: 'Blue Marlin', base: '#1e40af', patch: '#93c5fd', patch2: '#172554', fin: '#3b82f6', style: 'sword' },
  { key: 'threshersharkfish', name: 'Thresher Shark', base: '#475569', patch: '#e2e8f0', patch2: '#1e293b', fin: '#94a3b8', style: 'shark' },
  { key: 'hammerheadsharkfish', name: 'Hammerhead Shark', base: '#64748b', patch: '#f1f5f9', patch2: '#334155', fin: '#cbd5e1', style: 'shark' },
  { key: 'tigersharkfish', name: 'Tiger Shark', base: '#334155', patch: '#94a3b8', patch2: '#0f172a', fin: '#64748b', style: 'shark' },
  { key: 'greatwhitesharkfish', name: 'Great White Shark', base: '#94a3b8', patch: '#ffffff', patch2: '#334155', fin: '#cbd5e1', style: 'shark' },
];

const FEARFUL_VILLAINS = [
  { key: 'villain_piranhafish', name: 'Crimson-Jawed Piranha', range: [1, 3], body: '#1c0f24', accent: '#f43f5e', fin: '#be123c', style: 'shark' },
  { key: 'villain_scorpionfish', name: 'Venom Spine Scorpion', range: [4, 7], body: '#260d1b', accent: '#fb7185', fin: '#e11d48', style: 'veil' },
  { key: 'villain_lionfish', name: 'Dread Lionfish', range: [8, 11], body: '#2a0e22', accent: '#f97316', fin: '#ea580c', style: 'veil' },
  { key: 'villain_stonefish', name: 'Abyssal Stonefish', range: [12, 15], body: '#1c1917', accent: '#ef4444', fin: '#991b1b', style: 'solid' },
  { key: 'villain_morayeelfish', name: 'Shadow Moray Eel', range: [16, 19], body: '#112118', accent: '#a3e635', fin: '#4d7c0f', style: 'eel' },
  { key: 'villain_barracudafish', name: 'Razor Barracuda', range: [20, 23], body: '#121b2d', accent: '#38bdf8', fin: '#0284c7', style: 'eel' },
  { key: 'villain_northernpikefish', name: 'Iron-Fang Pike', range: [24, 27], body: '#10241d', accent: '#fbbf24', fin: '#b45309', style: 'eel' },
  { key: 'villain_tigermuskiefish', name: 'Stalker Muskie', range: [28, 31], body: '#162220', accent: '#f59e0b', fin: '#b45309', style: 'eel' },
  { key: 'villain_alligatorgarfish', name: 'Gator-Jaw Gar', range: [32, 35], body: '#192411', accent: '#facc15', fin: '#a16207', style: 'sword' },
  { key: 'villain_electricrayfish', name: 'Storm Electric Ray', range: [36, 39], body: '#101733', accent: '#38bdf8', fin: '#0369a1', style: 'ray' },
  { key: 'villain_anglerfish', name: 'Lantern Fiend Angler', range: [40, 43], body: '#1c0f30', accent: '#fde047', fin: '#7e22ce', style: 'glow' },
  { key: 'villain_viperfish', name: 'Abyssal Viperfish', range: [44, 47], body: '#120f2d', accent: '#22d3ee', fin: '#1d4ed8', style: 'glow' },
  { key: 'villain_gulpereelfish', name: 'Void Gulper Eel', range: [48, 51], body: '#110d22', accent: '#c084fc', fin: '#6b21a8', style: 'eel' },
  { key: 'villain_sawfish', name: 'Bone-Blade Sawfish', range: [52, 55], body: '#211d1c', accent: '#f87171', fin: '#b91c1c', style: 'sword' },
  { key: 'villain_swordfish', name: 'Black-Lance Swordfish', range: [56, 58], body: '#0e1628', accent: '#60a5fa', fin: '#1d4ed8', style: 'sword' },
  { key: 'villain_threshersharkfish', name: 'Scythe Thresher', range: [59, 61], body: '#151a24', accent: '#fb7185', fin: '#be123c', style: 'shark' },
  { key: 'villain_hammerheadsharkfish', name: 'Dread Hammerhead', range: [62, 64], body: '#161c27', accent: '#f43f5e', fin: '#9f1239', style: 'shark' },
  { key: 'villain_greatwhitesharkfish', name: 'Sovereign Great White', range: [65, 66], body: '#0d1524', accent: '#ef4444', fin: '#991b1b', style: 'shark' },
];

const FLORA_VARIETIES = [
  'waterlilyflora', 'amazonplatterflora', 'duckweedflora', 'kelpflora', 'seagrassflora',
  'anemoneflora', 'braincoralflora', 'caulerpaflora', 'featherdusterflora', 'glowfungusflora',
  'redalgaeflora', 'seafanflora', 'staghornflora', 'starpolypflora', 'tubespongeflora',
];
const ROCK_VARIETIES = [
  'skippingstonespebble', 'riverpebble', 'mossyrock', 'graniteboulder', 'quartzpebble',
  'coralrubblepebble', 'limestonerock', 'sandstonerock', 'slateflagstonerock', 'marbleboulder',
  'sandgravelpebble', 'basaltcolumnrock', 'megalithboulder', 'lavarock', 'obsidianrock', 'crystalgeoderock',
];
const OBJECT_VARIETIES = [
  'pearlclamobject', 'pirateshipobject', 'treasurechestobject', 'anchorobject', 'rowboatobject',
  'shipwheelobject', 'compassobject', 'messagebottleobject', 'goldcoinpileobject', 'jewelrypileobject',
  'cannonobject', 'rumbarrelobject', 'buoyobject', 'coralrockobject', 'skullpileobject', 'dustcloudobject',
];

const STORY_CHAPTERS = [
  { id: 0, title: 'Sunlit Lotus Pond', range: [1, 10], waterLight: '#2bb0a3', waterMid: '#15767a', waterDeep: '#093842', caustic: 'rgba(196, 255, 245, 0.22)', narration: 'Beneath drifting lotus petals, a tiny fry awakens while crimson-jawed shadows prowl the mossy shallows.' },
  { id: 1, title: 'Whispering Reed Shallows', range: [11, 20], waterLight: '#239cc0', waterMid: '#125f86', waterDeep: '#082d49', caustic: 'rgba(194, 240, 255, 0.20)', narration: 'Sunlight spills wider across painted coral gardens; only patient hunters outlast the venomous stalkers.' },
  { id: 2, title: 'Sunken Lantern Reef', range: [21, 30], waterLight: '#24987d', waterMid: '#105e56', waterDeep: '#072e30', caustic: 'rgba(167, 243, 208, 0.20)', narration: 'Golden koi waters deepen into swaying kelp arches where ancient relics guard blind corners.' },
  { id: 3, title: 'Twilight Kelp Canyon', range: [31, 40], waterLight: '#1d7fa6', waterMid: '#11496e', waterDeep: '#082238', caustic: 'rgba(253, 230, 138, 0.17)', narration: 'Sunken galleon hulls cast long shadows across the clearing as razor-toothed raiders close in.' },
  { id: 4, title: 'Midnight Abyssal Trench', range: [41, 50], waterLight: '#2c60a6', waterMid: '#17366e', waterDeep: '#0a1838', caustic: 'rgba(165, 180, 252, 0.17)', narration: 'The sunlit clearing pierces the indigo drop-off; lantern fiends and shadow eels patrol every corridor.' },
  { id: 5, title: 'Pelagic Storm Current', range: [51, 60], waterLight: '#1d7287', waterMid: '#103e56', waterDeep: '#061929', caustic: 'rgba(103, 232, 249, 0.17)', narration: 'Ancient titans stir in the widening light—speed and terrain mastery alone decide who survives.' },
  { id: 6, title: 'Crown of the Sovereign Sea', range: [61, 66], waterLight: '#246292', waterMid: '#11355c', waterDeep: '#07152b', caustic: 'rgba(254, 205, 211, 0.16)', narration: 'Only the apex pelagic lords remain. Claim the final evolution and rule the Fish Kingdom.' },
];

const EVOLUTION_LINES = [
  'Your scales gleam with new strength—now turn the hunt on the stalker.',
  'The prey becomes the hunter; corner your rival before it slips away.',
  'A surge of ancient lineage ripples through the sunlit water.',
  'No longer hiding—cut off its escape lanes across the stones.',
  'The balance of the pond shifts; claim the territory you earned.',
  'Every shadow in the clearing now flees your wake.',
];

// 8 Handcrafted Tactical Map Templates (enlarged radii so lush lotus pads & stepping stones shine!)
const MAP_TEMPLATES = [
  {
    name: 'Lotus Stepping Stones',
    rocks: [{ x: 0, y: -0.60, r: 30 }, { x: 0, y: -0.35, r: 28 }, { x: 0, y: 0.35, r: 28 }, { x: 0, y: 0.60, r: 30 }, { x: -0.64, y: 0.24, r: 32 }, { x: 0.64, y: -0.24, r: 32 }],
    floras: [{ x: -0.38, y: -0.38, r: 64 }, { x: 0.40, y: -0.36, r: 62 }, { x: -0.40, y: 0.38, r: 64 }, { x: 0.38, y: 0.40, r: 68 }, { x: -0.56, y: -0.04, r: 54 }, { x: 0.56, y: 0.04, r: 54 }],
    objects: [{ x: 0.70, y: -0.10, r: 44 }, { x: -0.70, y: 0.10, r: 44 }],
  },
  {
    name: 'Sunken Galleon Cove',
    rocks: [{ x: -0.46, y: -0.50, r: 34 }, { x: 0.50, y: 0.46, r: 34 }, { x: -0.58, y: 0.38, r: 30 }, { x: 0.58, y: -0.38, r: 30 }],
    floras: [{ x: -0.22, y: -0.54, r: 64 }, { x: 0.26, y: 0.54, r: 64 }, { x: -0.58, y: -0.10, r: 66 }, { x: 0.58, y: 0.10, r: 66 }, { x: 0.05, y: -0.34, r: 56 }],
    objects: [{ x: -0.36, y: 0.20, r: 58 }, { x: 0.40, y: -0.20, r: 46 }, { x: 0.02, y: 0.56, r: 42 }],
  },
  {
    name: 'Twin Coral Arches',
    rocks: [{ x: -0.40, y: -0.30, r: 32 }, { x: -0.40, y: 0.30, r: 32 }, { x: 0.40, y: -0.30, r: 32 }, { x: 0.40, y: 0.30, r: 32 }, { x: 0, y: -0.66, r: 30 }, { x: 0, y: 0.66, r: 30 }],
    floras: [{ x: -0.64, y: 0, r: 68 }, { x: 0.64, y: 0, r: 68 }, { x: 0, y: -0.42, r: 60 }, { x: 0, y: 0.42, r: 60 }, { x: -0.24, y: 0.58, r: 56 }],
    objects: [{ x: 0.24, y: -0.58, r: 44 }, { x: -0.58, y: -0.44, r: 44 }],
  },
  {
    name: 'Whispering Kelp Maze',
    rocks: [{ x: -0.30, y: -0.44, r: 30 }, { x: 0.30, y: 0.44, r: 30 }, { x: 0.54, y: -0.12, r: 32 }, { x: -0.54, y: 0.12, r: 32 }],
    floras: [{ x: -0.50, y: -0.36, r: 66 }, { x: 0.50, y: 0.36, r: 66 }, { x: -0.18, y: 0.48, r: 62 }, { x: 0.18, y: -0.48, r: 62 }, { x: -0.34, y: 0.06, r: 58 }, { x: 0.34, y: -0.06, r: 58 }],
    objects: [{ x: 0.60, y: -0.44, r: 46 }, { x: -0.60, y: 0.44, r: 46 }],
  },
  {
    name: 'Basalt Sanctuary Ring',
    rocks: [{ x: -0.52, y: -0.30, r: 32 }, { x: 0.52, y: -0.30, r: 32 }, { x: -0.52, y: 0.30, r: 32 }, { x: 0.52, y: 0.30, r: 32 }, { x: 0, y: -0.60, r: 34 }, { x: 0, y: 0.60, r: 34 }],
    floras: [{ x: -0.34, y: -0.48, r: 62 }, { x: 0.34, y: -0.48, r: 62 }, { x: -0.34, y: 0.48, r: 62 }, { x: 0.34, y: 0.48, r: 62 }, { x: -0.68, y: 0, r: 58 }],
    objects: [{ x: 0.68, y: 0, r: 48 }, { x: -0.28, y: 0.28, r: 42 }],
  },
  {
    name: 'Pearl Atoll',
    rocks: [{ x: -0.44, y: 0, r: 32 }, { x: 0.44, y: 0, r: 32 }, { x: -0.26, y: -0.54, r: 28 }, { x: 0.26, y: 0.54, r: 28 }],
    floras: [{ x: 0, y: -0.40, r: 68 }, { x: 0, y: 0.40, r: 68 }, { x: -0.60, y: -0.34, r: 60 }, { x: 0.60, y: 0.34, r: 60 }, { x: 0.56, y: -0.36, r: 58 }],
    objects: [{ x: -0.56, y: 0.36, r: 46 }, { x: 0.28, y: -0.52, r: 44 }],
  },
  {
    name: 'Split Riverbend',
    rocks: [{ x: -0.54, y: -0.44, r: 31 }, { x: -0.34, y: -0.26, r: 29 }, { x: 0.34, y: 0.26, r: 29 }, { x: 0.54, y: 0.44, r: 31 }],
    floras: [{ x: 0.44, y: -0.46, r: 66 }, { x: -0.44, y: 0.46, r: 66 }, { x: 0.16, y: -0.48, r: 60 }, { x: -0.16, y: 0.48, r: 60 }, { x: 0.62, y: -0.08, r: 58 }],
    objects: [{ x: -0.62, y: 0.08, r: 48 }, { x: 0.46, y: 0.10, r: 44 }],
  },
  {
    name: 'Relic Courtyard',
    rocks: [{ x: -0.48, y: -0.48, r: 32 }, { x: 0.48, y: -0.48, r: 32 }, { x: -0.48, y: 0.48, r: 32 }, { x: 0.48, y: 0.48, r: 32 }],
    floras: [{ x: 0, y: -0.52, r: 66 }, { x: 0, y: 0.52, r: 66 }, { x: -0.56, y: 0, r: 66 }, { x: 0.56, y: 0, r: 66 }],
    objects: [{ x: -0.30, y: -0.30, r: 44 }, { x: 0.30, y: 0.30, r: 44 }, { x: 0.30, y: -0.30, r: 42 }],
  },
];

const EXPANSION_CAP_STAGE = 50;
const WORLD_CX = 2400;
const WORLD_CY = 1800;

function isAnchorStage(lv) { return lv === 1 || lv % 5 === 0; }
function getChapterForStage(lv) {
  const eff = lv <= EXPANSION_CAP_STAGE ? lv : ((lv - 1) % EXPANSION_CAP_STAGE) + 1;
  const idx = Math.min(STORY_CHAPTERS.length - 1, Math.floor(((eff - 1) / EXPANSION_CAP_STAGE) * STORY_CHAPTERS.length));
  return STORY_CHAPTERS[idx];
}
function getVillainForStage(lv) {
  const idx = Math.floor((lv - 1) / 3) % FEARFUL_VILLAINS.length;
  return FEARFUL_VILLAINS[idx];
}

// ============================================================================
// 2. 135 INDIVIDUALLY HANDCRAFTED PAINTED ILLUSTRATION RENDERERS (ZERO TEMPLATES)
//    67 Player Species + 3 Prey + 18 Fearful Villains + 15 Floras + 16 Rocks + 16 Relics
// ============================================================================
const PAINTED_FISH_1 = (() => {
  const module = { exports: {} };
  const exports = module.exports;
'use strict';

/**
 * 23 handcrafted, painted top-down 2D Canvas fish illustration functions.
 * Coordinate contract:
 *  - ctx is pre-translated to (0, 0) and rotated facing RIGHT (+X nose, -X tail).
 *  - r is base radius (~30px).
 *  - t is time in seconds, speed is swim speed multiplier.
 */

module.exports = {
  // 1. GUPPYFISH — Sleek iridescent teardrop body with huge flamboyant mosaic delta tail
  guppyfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 6.2 + speed * 2.8;
    const wag = Math.sin(t * freq) * 0.24;
    const wag2 = Math.sin(t * freq - 1.0) * 0.34;
    const finRow = Math.sin(t * freq * 0.85) * 0.18;

    // Soft underwater drop shadow
    ctx.save();
    ctx.translate(-r * 0.08, r * 0.14);
    ctx.fillStyle = 'rgba(10, 28, 44, 0.16)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.15, 0, r * 1.05, r * 0.34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Translucent aqua-pearl pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.28, s * r * 0.19);
      ctx.rotate(s * (0.48 + finRow * s));
      const pGrad = ctx.createRadialGradient(0, 0, r * 0.02, -r * 0.12, s * r * 0.18, r * 0.44);
      pGrad.addColorStop(0, 'rgba(130, 240, 245, 0.72)');
      pGrad.addColorStop(0.6, 'rgba(190, 245, 255, 0.42)');
      pGrad.addColorStop(1, 'rgba(255, 210, 240, 0.10)');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.12, s * r * 0.22, -r * 0.12, s * r * 0.42, -r * 0.32, s * r * 0.28);
      ctx.bezierCurveTo(-r * 0.22, s * r * 0.12, -r * 0.10, s * r * 0.04, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = r * 0.018;
      for (let i = 1; i <= 4; i++) {
        const f = i / 5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-r * 0.06 * i, s * r * (0.14 + f * 0.15), -r * (0.04 + f * 0.26), s * r * (0.34 - f * 0.08));
        ctx.stroke();
      }
      ctx.restore();
    }

    // Massive flamboyant delta/fan tail with mosaic leopard spots
    ctx.save();
    ctx.translate(-r * 0.56, wag * r * 0.35);
    ctx.rotate(wag2 * 0.65);
    const tailGrad = ctx.createLinearGradient(0, 0, -r * 0.98, 0);
    tailGrad.addColorStop(0, 'rgba(54, 196, 224, 0.92)');
    tailGrad.addColorStop(0.38, 'rgba(138, 108, 242, 0.88)');
    tailGrad.addColorStop(0.72, 'rgba(246, 98, 168, 0.84)');
    tailGrad.addColorStop(1, 'rgba(255, 198, 92, 0.68)');
    ctx.fillStyle = tailGrad;

    ctx.beginPath();
    ctx.moveTo(r * 0.05, -r * 0.06);
    ctx.bezierCurveTo(-r * 0.28, -r * 0.28, -r * 0.64, -r * 0.66, -r * 0.96, -r * 0.56);
    ctx.bezierCurveTo(-r * 1.08, -r * 0.22, -r * 1.06, r * 0.22, -r * 0.96, r * 0.56);
    ctx.bezierCurveTo(-r * 0.64, r * 0.66, -r * 0.28, r * 0.28, r * 0.05, r * 0.06);
    ctx.closePath();
    ctx.fill();

    // Clipped leopard spots & fine rays on delta tail
    ctx.save();
    ctx.clip();
    const spots = [
      [-0.36, -0.14, 0.05], [-0.52, -0.32, 0.065], [-0.74, -0.38, 0.07],
      [-0.62, -0.08, 0.06], [-0.82, -0.14, 0.065], [-0.45, 0.16, 0.055],
      [-0.68, 0.28, 0.07], [-0.84, 0.22, 0.06], [-0.78, 0.42, 0.055],
      [-0.54, 0.36, 0.05]
    ];
    for (const [sx, sy, sr] of spots) {
      const spG = ctx.createRadialGradient(sx * r, sy * r, 0, sx * r, sy * r, sr * r);
      spG.addColorStop(0, 'rgba(42, 18, 72, 0.72)');
      spG.addColorStop(0.7, 'rgba(92, 32, 118, 0.45)');
      spG.addColorStop(1, 'rgba(92, 32, 118, 0)');
      ctx.fillStyle = spG;
      ctx.beginPath();
      ctx.arc(sx * r, sy * r, sr * r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = 'rgba(255, 240, 210, 0.36)';
    ctx.lineWidth = r * 0.016;
    for (let i = -5; i <= 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-r * 0.48, i * r * 0.055, -r * 1.0, i * r * 0.105);
      ctx.stroke();
    }
    ctx.restore();
    ctx.restore();

    // Sleek teardrop guppy body
    const bodyGrad = ctx.createLinearGradient(r * 0.85, 0, -r * 0.65, 0);
    bodyGrad.addColorStop(0, '#c8f6ff');
    bodyGrad.addColorStop(0.28, '#54d4e6');
    bodyGrad.addColorStop(0.62, '#4a88e8');
    bodyGrad.addColorStop(1, '#7c56d8');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 0.86, 0);
    ctx.bezierCurveTo(r * 0.74, -r * 0.24, r * 0.32, -r * 0.30, -r * 0.06, -r * 0.21);
    ctx.bezierCurveTo(-r * 0.32, -r * 0.14, -r * 0.48, -r * 0.07, -r * 0.60, wag * r * 0.30 - r * 0.05);
    ctx.lineTo(-r * 0.60, wag * r * 0.30 + r * 0.05);
    ctx.bezierCurveTo(-r * 0.48, r * 0.07, -r * 0.32, r * 0.14, -r * 0.06, r * 0.21);
    ctx.bezierCurveTo(r * 0.32, r * 0.30, r * 0.74, r * 0.24, r * 0.86, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped iridescent pastel shimmer & dorsal sheen
    ctx.save();
    ctx.clip();
    const sheenG = ctx.createRadialGradient(r * 0.22, -r * 0.07, r * 0.02, r * 0.15, -r * 0.02, r * 0.62);
    sheenG.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
    sheenG.addColorStop(0.45, 'rgba(255, 200, 235, 0.32)');
    sheenG.addColorStop(1, 'rgba(20, 40, 110, 0.22)');
    ctx.fillStyle = sheenG;
    ctx.fillRect(-r, -r, r * 2, r * 2);
    ctx.restore();

    // Flowing iridescent dorsal fin ribbon
    ctx.save();
    const dGrad = ctx.createLinearGradient(r * 0.06, 0, -r * 0.48, wag * r * 0.3);
    dGrad.addColorStop(0, 'rgba(140, 240, 255, 0.8)');
    dGrad.addColorStop(1, 'rgba(248, 128, 198, 0.55)');
    ctx.strokeStyle = dGrad;
    ctx.lineWidth = r * 0.065;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.06, 0);
    ctx.quadraticCurveTo(-r * 0.22, -wag * r * 0.36, -r * 0.50, wag2 * r * 0.26);
    ctx.stroke();
    ctx.restore();

    // Expressive bright turquoise-ringed eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = 'rgba(22, 65, 95, 0.38)';
      ctx.beginPath();
      ctx.ellipse(r * 0.54, s * r * 0.145, r * 0.095, r * 0.075, s * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#9ef8ff';
      ctx.beginPath();
      ctx.ellipse(r * 0.55, s * r * 0.145, r * 0.078, r * 0.060, s * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0d192b';
      ctx.beginPath();
      ctx.arc(r * 0.565, s * r * 0.148, r * 0.044, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.beginPath();
      ctx.arc(r * 0.585, s * r * 0.132, r * 0.018, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 2. NEONTETRAFISH — Petite streamlined torpedo with luminous electric-cyan stripe & crimson tail base
  neontetrafish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 7.4 + speed * 3.1;
    const wag = Math.sin(t * freq) * 0.22;
    const finBeat = Math.sin(t * freq * 1.1) * 0.22;

    // Subtle shadow
    ctx.save();
    ctx.translate(-r * 0.05, r * 0.12);
    ctx.fillStyle = 'rgba(8, 22, 38, 0.15)';
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.88, r * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Crystalline fluttering pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.26, s * r * 0.14);
      ctx.rotate(s * (0.45 + finBeat * s));
      const pG = ctx.createLinearGradient(0, 0, -r * 0.28, s * r * 0.24);
      pG.addColorStop(0, 'rgba(205, 250, 255, 0.62)');
      pG.addColorStop(1, 'rgba(220, 248, 255, 0.08)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(r * 0.05, s * r * 0.22, -r * 0.26, s * r * 0.24);
      ctx.quadraticCurveTo(-r * 0.14, s * r * 0.09, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Glassy forked caudal fin
    ctx.save();
    ctx.translate(-r * 0.68, wag * r * 0.28);
    ctx.rotate(wag * 0.72);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.44, 0);
    tG.addColorStop(0, 'rgba(240, 58, 74, 0.72)');
    tG.addColorStop(0.42, 'rgba(215, 240, 255, 0.42)');
    tG.addColorStop(1, 'rgba(235, 250, 255, 0.12)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.04, -r * 0.04);
    ctx.bezierCurveTo(-r * 0.14, -r * 0.16, -r * 0.30, -r * 0.32, -r * 0.44, -r * 0.30);
    ctx.quadraticCurveTo(-r * 0.28, -r * 0.08, -r * 0.22, 0);
    ctx.quadraticCurveTo(-r * 0.28, r * 0.08, -r * 0.44, r * 0.30);
    ctx.bezierCurveTo(-r * 0.30, r * 0.32, -r * 0.14, r * 0.16, r * 0.04, r * 0.04);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = r * 0.014;
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-r * 0.38, s * r * 0.24);
      ctx.stroke();
    }
    ctx.restore();

    // Streamlined fusiform torpedo body
    const bG = ctx.createLinearGradient(r * 0.88, 0, -r * 0.72, 0);
    bG.addColorStop(0, '#c8f0ff');
    bG.addColorStop(0.32, '#4ba8d8');
    bG.addColorStop(0.56, '#90b8d8');
    bG.addColorStop(0.70, '#e83448');
    bG.addColorStop(1, '#c61c34');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.88, 0);
    ctx.bezierCurveTo(r * 0.72, -r * 0.18, r * 0.28, -r * 0.22, -r * 0.16, -r * 0.17);
    ctx.bezierCurveTo(-r * 0.42, -r * 0.13, -r * 0.58, -r * 0.06, -r * 0.70, wag * r * 0.26 - r * 0.04);
    ctx.lineTo(-r * 0.70, wag * r * 0.26 + r * 0.04);
    ctx.bezierCurveTo(-r * 0.58, r * 0.06, -r * 0.42, r * 0.13, -r * 0.16, r * 0.17);
    ctx.bezierCurveTo(r * 0.28, r * 0.22, r * 0.72, r * 0.18, r * 0.88, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped vivid crimson posterior blaze & electric neon-cyan dorsal stripe
    ctx.save();
    ctx.clip();
    const redG = ctx.createRadialGradient(-r * 0.38, 0, r * 0.04, -r * 0.38, 0, r * 0.46);
    redG.addColorStop(0, 'rgba(255, 42, 62, 0.92)');
    redG.addColorStop(0.65, 'rgba(225, 24, 48, 0.65)');
    redG.addColorStop(1, 'rgba(225, 24, 48, 0)');
    ctx.fillStyle = redG;
    ctx.fillRect(-r * 0.85, -r * 0.3, r * 0.85, r * 0.6);

    // Electric neon cyan glowing stripe from nose to mid-back
    ctx.save();
    ctx.shadowColor = '#00f6ff';
    ctx.shadowBlur = r * 0.26;
    const neonG = ctx.createLinearGradient(r * 0.82, 0, -r * 0.30, 0);
    neonG.addColorStop(0, '#c8ffff');
    neonG.addColorStop(0.35, '#00f6ff');
    neonG.addColorStop(0.85, '#00b4ff');
    neonG.addColorStop(1, 'rgba(0, 180, 255, 0)');
    ctx.strokeStyle = neonG;
    ctx.lineWidth = r * 0.11;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.80, 0);
    ctx.quadraticCurveTo(r * 0.25, -r * 0.02, -r * 0.26, wag * r * 0.06);
    ctx.stroke();
    ctx.restore();

    // Sunlit gloss
    ctx.fillStyle = 'rgba(255, 255, 255, 0.48)';
    ctx.beginPath();
    ctx.ellipse(r * 0.22, -r * 0.04, r * 0.34, r * 0.055, -0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Luminous neon-aqua ringed eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#00e8ff';
      ctx.beginPath();
      ctx.ellipse(r * 0.58, s * r * 0.115, r * 0.08, r * 0.062, s * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#081422';
      ctx.beginPath();
      ctx.arc(r * 0.59, s * r * 0.118, r * 0.044, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.61, s * r * 0.104, r * 0.018, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 3. GOLDFISH — Plump rounded fantail pond goldfish with double flowing veil tail & metallic scale sheen
  goldfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 4.6 + speed * 2.1;
    const wag = Math.sin(t * freq) * 0.20;
    const wag2 = Math.sin(t * freq - 0.85) * 0.28;
    const finRow = Math.sin(t * freq * 0.75) * 0.16;

    // Soft pond shadow
    ctx.save();
    ctx.translate(-r * 0.06, r * 0.18);
    ctx.fillStyle = 'rgba(18, 32, 34, 0.18)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.08, 0, r * 1.12, r * 0.52, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Wide silky rounded pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.26, s * r * 0.34);
      ctx.rotate(s * (0.42 + finRow * s));
      const pG = ctx.createRadialGradient(0, 0, r * 0.04, -r * 0.12, s * r * 0.26, r * 0.56);
      pG.addColorStop(0, 'rgba(255, 136, 38, 0.85)');
      pG.addColorStop(0.55, 'rgba(255, 198, 120, 0.56)');
      pG.addColorStop(1, 'rgba(255, 245, 228, 0.14)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.20, s * r * 0.26, -r * 0.06, s * r * 0.56, -r * 0.38, s * r * 0.42);
      ctx.bezierCurveTo(-r * 0.32, s * r * 0.22, -r * 0.18, s * r * 0.08, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 238, 200, 0.50)';
      ctx.lineWidth = r * 0.018;
      for (let i = 1; i <= 5; i++) {
        const f = i / 6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(r * (0.04 - f * 0.14), s * r * (0.18 + f * 0.16), -r * (0.02 + f * 0.32), s * r * (0.46 - f * 0.10));
        ctx.stroke();
      }
      ctx.restore();
    }

    // Double flowing translucent fantail lobes
    ctx.save();
    ctx.translate(-r * 0.58, wag * r * 0.28);
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.rotate(wag2 * 0.55 + s * (0.22 + Math.sin(t * freq - 0.5) * 0.06));
      const tG = ctx.createLinearGradient(0, 0, -r * 0.96, s * r * 0.36);
      tG.addColorStop(0, 'rgba(248, 102, 24, 0.92)');
      tG.addColorStop(0.45, 'rgba(255, 168, 72, 0.68)');
      tG.addColorStop(0.82, 'rgba(255, 232, 198, 0.42)');
      tG.addColorStop(1, 'rgba(255, 250, 242, 0.14)');
      ctx.fillStyle = tG;
      ctx.beginPath();
      ctx.moveTo(r * 0.06, 0);
      ctx.bezierCurveTo(-r * 0.24, s * r * 0.04, -r * 0.62, s * r * 0.06, -r * 0.94, s * r * 0.22);
      ctx.bezierCurveTo(-r * 0.98, s * r * 0.44, -r * 0.78, s * r * 0.58, -r * 0.54, s * r * 0.48);
      ctx.bezierCurveTo(-r * 0.30, s * r * 0.36, -r * 0.12, s * r * 0.16, r * 0.06, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 242, 220, 0.44)';
      ctx.lineWidth = r * 0.016;
      for (let i = 1; i <= 5; i++) {
        const f = i / 6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-r * 0.42, s * r * (0.10 + f * 0.18), -r * (0.86 - f * 0.18), s * r * (0.22 + f * 0.26));
        ctx.stroke();
      }
      ctx.restore();
    }
    ctx.restore();

    // Plump pear-shaped overhead goldfish body
    const bG = ctx.createRadialGradient(r * 0.18, -r * 0.08, r * 0.06, r * 0.08, 0, r * 0.95);
    bG.addColorStop(0, '#ffd454');
    bG.addColorStop(0.32, '#ff8e1e');
    bG.addColorStop(0.72, '#e84514');
    bG.addColorStop(1, '#b6260a');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.86, 0);
    ctx.bezierCurveTo(r * 0.82, -r * 0.36, r * 0.38, -r * 0.50, -r * 0.06, -r * 0.40);
    ctx.bezierCurveTo(-r * 0.36, -r * 0.32, -r * 0.50, -r * 0.14, -r * 0.62, wag * r * 0.26 - r * 0.08);
    ctx.lineTo(-r * 0.62, wag * r * 0.26 + r * 0.08);
    ctx.bezierCurveTo(-r * 0.50, r * 0.14, -r * 0.36, r * 0.32, -r * 0.06, r * 0.40);
    ctx.bezierCurveTo(r * 0.38, r * 0.50, r * 0.82, r * 0.36, r * 0.86, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped warm crimson cap & golden scale shimmer + sunlit sheen
    ctx.save();
    ctx.clip();
    // Subtle vermilion crown on head
    const capG = ctx.createRadialGradient(r * 0.60, 0, r * 0.04, r * 0.58, 0, r * 0.34);
    capG.addColorStop(0, 'rgba(230, 42, 16, 0.72)');
    capG.addColorStop(1, 'rgba(230, 42, 16, 0)');
    ctx.fillStyle = capG;
    ctx.beginPath();
    ctx.arc(r * 0.58, 0, r * 0.34, 0, Math.PI * 2);
    ctx.fill();

    // Delicate painted scale arcs along the back
    ctx.strokeStyle = 'rgba(255, 232, 148, 0.28)';
    ctx.lineWidth = r * 0.02;
    for (let row = -2; row <= 2; row++) {
      for (let col = -3; col <= 2; col++) {
        const sx = col * r * 0.16 + (Math.abs(row) % 2) * r * 0.08;
        const sy = row * r * 0.125;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 0.08, -Math.PI * 0.45, Math.PI * 0.45);
        ctx.stroke();
      }
    }

    // Glossy sunlit dorsal highlight
    const glossG = ctx.createLinearGradient(r * 0.5, -r * 0.22, -r * 0.3, r * 0.10);
    glossG.addColorStop(0, 'rgba(255, 252, 224, 0.65)');
    glossG.addColorStop(0.6, 'rgba(255, 238, 178, 0.22)');
    glossG.addColorStop(1, 'rgba(255, 238, 178, 0)');
    ctx.fillStyle = glossG;
    ctx.beginPath();
    ctx.ellipse(r * 0.12, -r * 0.10, r * 0.48, r * 0.15, -0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Flowing translucent dorsal ridge fin
    ctx.strokeStyle = 'rgba(255, 224, 170, 0.68)';
    ctx.lineWidth = r * 0.085;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.18, 0);
    ctx.quadraticCurveTo(-r * 0.14, -wag * r * 0.32, -r * 0.46, wag * r * 0.24);
    ctx.stroke();

    // Slightly protruding glossy eyes with golden iris
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#ffcf5c';
      ctx.beginPath();
      ctx.ellipse(r * 0.58, s * r * 0.26, r * 0.105, r * 0.088, s * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#141218';
      ctx.beginPath();
      ctx.arc(r * 0.59, s * r * 0.265, r * 0.064, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
      ctx.beginPath();
      ctx.arc(r * 0.618, s * r * 0.245, r * 0.026, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 4. BETTAFISH — Slender regal body with HUGE multi-lobed flowing sapphire-crimson halfmoon veil fins
  bettafish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 3.4 + speed * 1.6;
    const wag = Math.sin(t * freq) * 0.22;
    const wag2 = Math.sin(t * freq - 1.1) * 0.32;
    const wag3 = Math.sin(t * freq - 2.0) * 0.38;

    // Soft ambient shadow
    ctx.save();
    ctx.translate(-r * 0.20, r * 0.18);
    ctx.fillStyle = 'rgba(12, 16, 40, 0.17)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.22, 0, r * 1.45, r * 0.68, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Enormous multi-lobed halfmoon veil caudal fin (2 layered silk veils for painterly depth)
    ctx.save();
    ctx.translate(-r * 0.52, wag * r * 0.28);
    ctx.rotate(wag2 * 0.45);

    // Lower/outer ruby-violet veil layer
    const v1G = ctx.createRadialGradient(0, 0, r * 0.08, -r * 0.55, 0, r * 1.25);
    v1G.addColorStop(0, 'rgba(38, 62, 198, 0.92)');
    v1G.addColorStop(0.42, 'rgba(116, 44, 196, 0.84)');
    v1G.addColorStop(0.76, 'rgba(224, 38, 108, 0.72)');
    v1G.addColorStop(1, 'rgba(255, 138, 178, 0.22)');
    ctx.fillStyle = v1G;
    ctx.beginPath();
    ctx.moveTo(r * 0.08, -r * 0.08);
    ctx.bezierCurveTo(-r * 0.18, -r * 0.58, -r * 0.68, -r * 1.05, -r * 1.18, -r * 0.84 + wag3 * r * 0.18);
    ctx.bezierCurveTo(-r * 1.42, -r * 0.48, -r * 1.48, -r * 0.12, -r * 1.32, wag3 * r * 0.28);
    ctx.bezierCurveTo(-r * 1.48, r * 0.12, -r * 1.42, r * 0.48, -r * 1.18, r * 0.84 + wag3 * r * 0.18);
    ctx.bezierCurveTo(-r * 0.68, r * 1.05, -r * 0.18, r * 0.58, r * 0.08, r * 0.08);
    ctx.closePath();
    ctx.fill();

    // Branching delicate fin rays on the massive veil
    ctx.strokeStyle = 'rgba(162, 232, 255, 0.34)';
    ctx.lineWidth = r * 0.016;
    for (let i = -7; i <= 7; i++) {
      const ang = i * 0.135;
      const len = r * (1.28 - Math.abs(i) * 0.032);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(
        -Math.cos(ang) * len * 0.55,
        Math.sin(ang) * len * 0.52 + wag2 * r * 0.14,
        -Math.cos(ang) * len,
        Math.sin(ang) * len + wag3 * r * 0.16
      );
      ctx.stroke();
    }
    ctx.restore();

    // Long ruffled silk pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.28, s * r * 0.20);
      ctx.rotate(s * (0.55 + Math.sin(t * freq * 0.9 + s) * 0.20));
      const pG = ctx.createLinearGradient(0, 0, -r * 0.68, s * r * 0.54);
      pG.addColorStop(0, 'rgba(42, 134, 236, 0.86)');
      pG.addColorStop(0.55, 'rgba(164, 64, 214, 0.62)');
      pG.addColorStop(1, 'rgba(255, 118, 168, 0.18)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.16, s * r * 0.28, -r * 0.14, s * r * 0.68, -r * 0.62, s * r * 0.54);
      ctx.bezierCurveTo(-r * 0.52, s * r * 0.26, -r * 0.24, s * r * 0.10, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(205, 240, 255, 0.40)';
      ctx.lineWidth = r * 0.015;
      for (let i = 1; i <= 5; i++) {
        const f = i / 6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-r * f * 0.22, s * r * (0.24 + f * 0.24), -r * (0.12 + f * 0.46), s * r * (0.54 - f * 0.08));
        ctx.stroke();
      }
      ctx.restore();
    }

    // Slender, elegant fighting-fish body
    const bG = ctx.createLinearGradient(r * 0.90, 0, -r * 0.60, 0);
    bG.addColorStop(0, '#182458');
    bG.addColorStop(0.28, '#1e4cc4');
    bG.addColorStop(0.62, '#1ea8d6');
    bG.addColorStop(1, '#5838c8');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.90, 0);
    ctx.bezierCurveTo(r * 0.78, -r * 0.21, r * 0.34, -r * 0.26, -r * 0.10, -r * 0.19);
    ctx.bezierCurveTo(-r * 0.36, -r * 0.14, -r * 0.48, -r * 0.08, -r * 0.58, wag * r * 0.26 - r * 0.06);
    ctx.lineTo(-r * 0.58, wag * r * 0.26 + r * 0.06);
    ctx.bezierCurveTo(-r * 0.48, r * 0.08, -r * 0.36, r * 0.14, -r * 0.10, r * 0.19);
    ctx.bezierCurveTo(r * 0.34, r * 0.26, r * 0.78, r * 0.21, r * 0.90, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped iridescent teal-sapphire metallic sheen
    ctx.save();
    ctx.clip();
    const shG = ctx.createRadialGradient(r * 0.18, -r * 0.06, r * 0.04, r * 0.06, 0, r * 0.65);
    shG.addColorStop(0, 'rgba(138, 255, 255, 0.58)');
    shG.addColorStop(0.5, 'rgba(64, 154, 255, 0.20)');
    shG.addColorStop(1, 'rgba(12, 16, 52, 0.32)');
    ctx.fillStyle = shG;
    ctx.fillRect(-r, -r, r * 2, r * 2);
    ctx.restore();

    // Billowing trailing dorsal veil ribbon
    ctx.save();
    const dG = ctx.createLinearGradient(r * 0.12, 0, -r * 0.95, 0);
    dG.addColorStop(0, 'rgba(60, 212, 245, 0.85)');
    dG.addColorStop(0.55, 'rgba(148, 66, 224, 0.72)');
    dG.addColorStop(1, 'rgba(248, 84, 146, 0.32)');
    ctx.fillStyle = dG;
    ctx.beginPath();
    ctx.moveTo(r * 0.12, 0);
    ctx.bezierCurveTo(-r * 0.18, -wag * r * 0.62 - r * 0.12, -r * 0.58, wag2 * r * 0.72 - r * 0.18, -r * 0.96, wag3 * r * 0.54);
    ctx.bezierCurveTo(-r * 0.58, wag2 * r * 0.72 + r * 0.18, -r * 0.18, -wag * r * 0.62 + r * 0.12, r * 0.12, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Regal sapphire-rimmed eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#4ad8ff';
      ctx.beginPath();
      ctx.ellipse(r * 0.60, s * r * 0.135, r * 0.082, r * 0.064, s * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#090d1f';
      ctx.beginPath();
      ctx.arc(r * 0.61, s * r * 0.138, r * 0.048, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.beginPath();
      ctx.arc(r * 0.632, s * r * 0.122, r * 0.02, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 5. DAMSELFISH — Compact electric cobalt oval with vibrant canary-yellow forked tail
  damselfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 6.8 + speed * 2.8;
    const wag = Math.sin(t * freq) * 0.22;
    const finRow = Math.sin(t * freq * 1.05) * 0.24;

    // Shadow
    ctx.save();
    ctx.translate(-r * 0.05, r * 0.14);
    ctx.fillStyle = 'rgba(10, 26, 46, 0.16)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.06, 0, r * 0.88, r * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Quick-fluttering sky-blue translucent pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.22, s * r * 0.26);
      ctx.rotate(s * (0.48 + finRow * s));
      const pG = ctx.createLinearGradient(0, 0, -r * 0.32, s * r * 0.28);
      pG.addColorStop(0, 'rgba(62, 186, 255, 0.78)');
      pG.addColorStop(1, 'rgba(176, 234, 255, 0.12)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.10, s * r * 0.20, -r * 0.08, s * r * 0.38, -r * 0.32, s * r * 0.26);
      ctx.quadraticCurveTo(-r * 0.18, s * r * 0.09, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Bright canary-yellow forked tail
    ctx.save();
    ctx.translate(-r * 0.56, wag * r * 0.26);
    ctx.rotate(wag * 0.70);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.52, 0);
    tG.addColorStop(0, '#ffe238');
    tG.addColorStop(0.65, '#ffbe18');
    tG.addColorStop(1, 'rgba(255, 224, 96, 0.48)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.06, -r * 0.06);
    ctx.bezierCurveTo(-r * 0.16, -r * 0.20, -r * 0.34, -r * 0.42, -r * 0.52, -r * 0.36);
    ctx.quadraticCurveTo(-r * 0.32, -r * 0.10, -r * 0.26, 0);
    ctx.quadraticCurveTo(-r * 0.32, r * 0.10, -r * 0.52, r * 0.36);
    ctx.bezierCurveTo(-r * 0.34, r * 0.42, -r * 0.16, r * 0.20, r * 0.06, r * 0.06);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 220, 0.52)';
    ctx.lineWidth = r * 0.016;
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-r * (0.44 - Math.abs(i) * 0.03), i * r * 0.14);
      ctx.stroke();
    }
    ctx.restore();

    // Compact plump oval-diamond reef damselfish body
    const bG = ctx.createRadialGradient(r * 0.18, -r * 0.06, r * 0.04, r * 0.05, 0, r * 0.85);
    bG.addColorStop(0, '#36e0ff');
    bG.addColorStop(0.35, '#0c88f6');
    bG.addColorStop(0.75, '#0c46c8');
    bG.addColorStop(1, '#08227a');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.80, 0);
    ctx.bezierCurveTo(r * 0.68, -r * 0.30, r * 0.28, -r * 0.38, -r * 0.12, -r * 0.30);
    ctx.bezierCurveTo(-r * 0.36, -r * 0.24, -r * 0.48, -r * 0.12, -r * 0.58, wag * r * 0.24 - r * 0.06);
    ctx.lineTo(-r * 0.58, wag * r * 0.24 + r * 0.06);
    ctx.bezierCurveTo(-r * 0.48, r * 0.12, -r * 0.36, r * 0.24, -r * 0.12, r * 0.30);
    ctx.bezierCurveTo(r * 0.28, r * 0.38, r * 0.68, r * 0.30, r * 0.80, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped sunlit cyan gloss & yellow tail peduncle transition
    ctx.save();
    ctx.clip();
    const yPed = ctx.createRadialGradient(-r * 0.56, 0, r * 0.02, -r * 0.52, 0, r * 0.26);
    yPed.addColorStop(0, '#ffe442');
    yPed.addColorStop(1, 'rgba(255, 228, 66, 0)');
    ctx.fillStyle = yPed;
    ctx.fillRect(-r * 0.8, -r * 0.4, r * 0.5, r * 0.8);

    ctx.fillStyle = 'rgba(205, 250, 255, 0.46)';
    ctx.beginPath();
    ctx.ellipse(r * 0.14, -r * 0.08, r * 0.40, r * 0.11, -0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Dorsal ridge fin
    ctx.strokeStyle = 'rgba(102, 224, 255, 0.76)';
    ctx.lineWidth = r * 0.068;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.20, 0);
    ctx.quadraticCurveTo(-r * 0.14, -wag * r * 0.24, -r * 0.46, wag * r * 0.20);
    ctx.stroke();

    // Expressive bright-cyan ringed eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#5ee8ff';
      ctx.beginPath();
      ctx.ellipse(r * 0.52, s * r * 0.185, r * 0.09, r * 0.072, s * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#071026';
      ctx.beginPath();
      ctx.arc(r * 0.535, s * r * 0.19, r * 0.054, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.558, s * r * 0.172, r * 0.022, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 6. CLOWNFISH — Rounded paddle fins, vibrant tangerine body & 3 crisp pearl-white saddle bands
  clownfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 5.4 + speed * 2.4;
    const wag = Math.sin(t * freq) * 0.20;
    const paddle = Math.sin(t * freq * 0.95) * 0.26;

    // Shadow
    ctx.save();
    ctx.translate(-r * 0.05, r * 0.15);
    ctx.fillStyle = 'rgba(18, 26, 36, 0.18)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.04, 0, r * 0.96, r * 0.40, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Broad rounded paddle pectoral fins with soft sepia-charcoal rim
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.22, s * r * 0.29);
      ctx.rotate(s * (0.44 + paddle * s));
      const pG = ctx.createRadialGradient(0, 0, r * 0.03, -r * 0.08, s * r * 0.24, r * 0.44);
      pG.addColorStop(0, '#ff8624');
      pG.addColorStop(0.72, '#ff9c3a');
      pG.addColorStop(0.90, 'rgba(42, 24, 18, 0.72)');
      pG.addColorStop(1, 'rgba(255, 250, 244, 0.55)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.18, s * r * 0.18, r * 0.04, s * r * 0.48, -r * 0.26, s * r * 0.40);
      ctx.bezierCurveTo(-r * 0.32, s * r * 0.22, -r * 0.16, s * r * 0.08, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 232, 198, 0.42)';
      ctx.lineWidth = r * 0.016;
      for (let i = 1; i <= 4; i++) {
        const f = i / 5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(r * (0.06 - f * 0.12), s * r * 0.22, -r * (0.24 * f - 0.02), s * r * (0.38 - f * 0.04));
        ctx.stroke();
      }
      ctx.restore();
    }

    // Rounded fan tail (distinctly non-forked) with soft dark edge
    ctx.save();
    ctx.translate(-r * 0.62, wag * r * 0.24);
    ctx.rotate(wag * 0.62);
    const tG = ctx.createRadialGradient(0, 0, r * 0.04, -r * 0.22, 0, r * 0.52);
    tG.addColorStop(0, '#ff7418');
    tG.addColorStop(0.72, '#ff8f2c');
    tG.addColorStop(0.88, 'rgba(38, 22, 16, 0.78)');
    tG.addColorStop(1, 'rgba(255, 252, 246, 0.65)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.06, -r * 0.08);
    ctx.bezierCurveTo(-r * 0.14, -r * 0.26, -r * 0.36, -r * 0.38, -r * 0.48, -r * 0.24);
    ctx.bezierCurveTo(-r * 0.56, -r * 0.08, -r * 0.56, r * 0.08, -r * 0.48, r * 0.24);
    ctx.bezierCurveTo(-r * 0.36, r * 0.38, -r * 0.14, r * 0.26, r * 0.06, r * 0.08);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Sturdy rounded-nose oval clownfish body
    const bG = ctx.createRadialGradient(r * 0.16, -r * 0.06, r * 0.06, r * 0.04, 0, r * 0.92);
    bG.addColorStop(0, '#ffa834');
    bG.addColorStop(0.45, '#ff6814');
    bG.addColorStop(0.88, '#d9420a');
    bG.addColorStop(1, '#9e2606');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.88, 0);
    ctx.bezierCurveTo(r * 0.84, -r * 0.30, r * 0.38, -r * 0.40, -r * 0.06, -r * 0.34);
    ctx.bezierCurveTo(-r * 0.36, -r * 0.28, -r * 0.52, -r * 0.14, -r * 0.64, wag * r * 0.24 - r * 0.08);
    ctx.lineTo(-r * 0.64, wag * r * 0.24 + r * 0.08);
    ctx.bezierCurveTo(-r * 0.52, r * 0.14, -r * 0.36, r * 0.28, -r * 0.06, r * 0.34);
    ctx.bezierCurveTo(r * 0.38, r * 0.40, r * 0.84, r * 0.30, r * 0.88, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped 3 pearl-white saddle bands with soft painted dark-sepia borders
    ctx.save();
    ctx.clip();
    const drawBand = (cx, width, bulge) => {
      ctx.fillStyle = 'rgba(38, 20, 14, 0.72)';
      ctx.beginPath();
      ctx.moveTo(cx + width * 0.5 + bulge, -r * 0.48);
      ctx.quadraticCurveTo(cx + width * 0.5 + bulge * 2.1, 0, cx + width * 0.5 + bulge, r * 0.48);
      ctx.lineTo(cx - width * 0.5 - bulge * 0.4, r * 0.48);
      ctx.quadraticCurveTo(cx - width * 0.5 + bulge * 0.8, 0, cx - width * 0.5 - bulge * 0.4, -r * 0.48);
      ctx.closePath();
      ctx.fill();

      const wG = ctx.createLinearGradient(0, -r * 0.4, 0, r * 0.4);
      wG.addColorStop(0, '#e6eef4');
      wG.addColorStop(0.5, '#ffffff');
      wG.addColorStop(1, '#dce6ee');
      ctx.fillStyle = wG;
      const iw = width * 0.74;
      ctx.beginPath();
      ctx.moveTo(cx + iw * 0.5 + bulge, -r * 0.48);
      ctx.quadraticCurveTo(cx + iw * 0.5 + bulge * 2.0, 0, cx + iw * 0.5 + bulge, r * 0.48);
      ctx.lineTo(cx - iw * 0.5 - bulge * 0.3, r * 0.48);
      ctx.quadraticCurveTo(cx - iw * 0.5 + bulge * 0.8, 0, cx - iw * 0.5 - bulge * 0.3, -r * 0.48);
      ctx.closePath();
      ctx.fill();
    };
    drawBand(r * 0.40, r * 0.17, -r * 0.04);
    drawBand(-r * 0.05, r * 0.22, r * 0.06);
    drawBand(-r * 0.50, r * 0.13, -r * 0.02);

    // Glossy sunlit dorsal sheen
    ctx.fillStyle = 'rgba(255, 250, 232, 0.38)';
    ctx.beginPath();
    ctx.ellipse(r * 0.14, -r * 0.09, r * 0.44, r * 0.12, -0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Soft orange-and-white dorsal ridge
    ctx.strokeStyle = 'rgba(255, 198, 128, 0.72)';
    ctx.lineWidth = r * 0.072;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.24, 0);
    ctx.quadraticCurveTo(-r * 0.14, -wag * r * 0.22, -r * 0.48, wag * r * 0.18);
    ctx.stroke();

    // Amber-ringed eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#ffbe42';
      ctx.beginPath();
      ctx.ellipse(r * 0.62, s * r * 0.18, r * 0.088, r * 0.070, s * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#120c0a';
      ctx.beginPath();
      ctx.arc(r * 0.635, s * r * 0.184, r * 0.054, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.658, s * r * 0.168, r * 0.022, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 7. MANDARINFISH — Wide flattened dragonet head, huge wing-like fan pectorals & psychedelic paisley swirls
  mandarinfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 4.8 + speed * 2.0;
    const wag = Math.sin(t * freq) * 0.18;
    const hover = Math.sin(t * freq * 1.4) * 0.22;

    // Soft shadow
    ctx.save();
    ctx.translate(-r * 0.06, r * 0.16);
    ctx.fillStyle = 'rgba(10, 26, 36, 0.18)';
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 1.02, r * 0.56, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Huge splayed wing-like rounded dragonet pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.24, s * r * 0.28);
      ctx.rotate(s * (0.26 + hover * s));
      const pG = ctx.createRadialGradient(0, 0, r * 0.04, -r * 0.06, s * r * 0.34, r * 0.62);
      pG.addColorStop(0, 'rgba(34, 212, 224, 0.88)');
      pG.addColorStop(0.45, 'rgba(255, 162, 42, 0.72)');
      pG.addColorStop(0.82, 'rgba(24, 128, 228, 0.66)');
      pG.addColorStop(1, 'rgba(120, 245, 255, 0.20)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(r * 0.12, 0);
      ctx.bezierCurveTo(r * 0.30, s * r * 0.30, r * 0.04, s * r * 0.68, -r * 0.32, s * r * 0.56);
      ctx.bezierCurveTo(-r * 0.44, s * r * 0.36, -r * 0.26, s * r * 0.14, -r * 0.12, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 232, 168, 0.52)';
      ctx.lineWidth = r * 0.017;
      for (let i = 0; i < 6; i++) {
        const f = i / 5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(r * (0.12 - f * 0.28), s * r * 0.30, r * (0.10 - f * 0.42), s * r * (0.50 + Math.sin(f * Math.PI) * 0.10));
        ctx.stroke();
      }
      ctx.restore();
    }

    // Ornate patterned fan tail
    ctx.save();
    ctx.translate(-r * 0.64, wag * r * 0.26);
    ctx.rotate(wag * 0.65);
    const tG = ctx.createRadialGradient(0, 0, r * 0.04, -r * 0.26, 0, r * 0.56);
    tG.addColorStop(0, '#ff8c22');
    tG.addColorStop(0.55, '#12a8e8');
    tG.addColorStop(0.88, '#1842b8');
    tG.addColorStop(1, 'rgba(98, 236, 255, 0.45)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.05, -r * 0.06);
    ctx.bezierCurveTo(-r * 0.18, -r * 0.28, -r * 0.42, -r * 0.40, -r * 0.54, -r * 0.24);
    ctx.bezierCurveTo(-r * 0.62, -r * 0.06, -r * 0.62, r * 0.06, -r * 0.54, r * 0.24);
    ctx.bezierCurveTo(-r * 0.42, r * 0.40, -r * 0.18, r * 0.28, r * 0.05, r * 0.06);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Distinctive wide flattened frog-like head tapering to muscular tail
    const bG = ctx.createLinearGradient(r * 0.88, 0, -r * 0.70, 0);
    bG.addColorStop(0, '#ff9824');
    bG.addColorStop(0.45, '#f26a18');
    bG.addColorStop(0.80, '#2a9c72');
    bG.addColorStop(1, '#18688c');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.88, 0);
    ctx.bezierCurveTo(r * 0.82, -r * 0.26, r * 0.52, -r * 0.42, r * 0.16, -r * 0.36);
    ctx.bezierCurveTo(-r * 0.18, -r * 0.28, -r * 0.46, -r * 0.14, -r * 0.66, wag * r * 0.24 - r * 0.06);
    ctx.lineTo(-r * 0.66, wag * r * 0.24 + r * 0.06);
    ctx.bezierCurveTo(-r * 0.46, r * 0.14, -r * 0.18, r * 0.28, r * 0.16, r * 0.36);
    ctx.bezierCurveTo(r * 0.52, r * 0.42, r * 0.82, r * 0.26, r * 0.88, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped psychedelic turquoise & cobalt paisley maze swirls
    ctx.save();
    ctx.clip();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Deep navy halo underneath electric cyan swirls
    for (const [col, lw] of [['rgba(12, 34, 96, 0.72)', r * 0.12], ['#1ee8ff', r * 0.062]]) {
      ctx.strokeStyle = col;
      ctx.lineWidth = lw;
      for (const s of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(r * 0.62, s * r * 0.08);
        ctx.bezierCurveTo(r * 0.36, s * r * 0.32, r * 0.08, s * r * 0.06, -r * 0.16, s * r * 0.24);
        ctx.bezierCurveTo(-r * 0.34, s * r * 0.30, -r * 0.46, s * r * 0.08, -r * 0.60, s * r * 0.06);
        ctx.stroke();
      }
      // Mid-dorsal swirl loop
      ctx.beginPath();
      ctx.arc(r * 0.14, 0, r * 0.14, 0, Math.PI * 1.6);
      ctx.stroke();
    }
    // Emerald accents & sunlit sheen
    ctx.fillStyle = 'rgba(255, 250, 224, 0.34)';
    ctx.beginPath();
    ctx.ellipse(r * 0.22, -r * 0.08, r * 0.38, r * 0.11, -0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Jewel-like upward-set crimson-gold eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#ff4428';
      ctx.beginPath();
      ctx.ellipse(r * 0.56, s * r * 0.19, r * 0.095, r * 0.080, s * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffdf4d';
      ctx.beginPath();
      ctx.arc(r * 0.565, s * r * 0.19, r * 0.068, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0c1220';
      ctx.beginPath();
      ctx.arc(r * 0.575, s * r * 0.192, r * 0.044, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.595, s * r * 0.175, r * 0.018, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 8. LOACHFISH — Long sinuous serpentine Kuhli/weather loach with S-wave undulation & saddle bands
  loachfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 5.0 + speed * 2.4;
    const phase = t * freq;

    // Sample undulating spine from head (+1.28r) to tail (-1.52r)
    const N = 22;
    const xStart = r * 1.28;
    const xEnd = -r * 1.52;
    const spine = [];
    for (let i = 0; i <= N; i++) {
      const u = i / N; // 0 at nose, 1 at tail
      const x = xStart + (xEnd - xStart) * u;
      const amp = r * (0.04 + u * u * 0.34);
      const y = Math.sin(phase - u * 4.8) * amp;
      // Width profile: blunt rounded snout, long slender tube, tapering gently to paddle tail
      let w;
      if (u < 0.12) w = r * (0.12 + (u / 0.12) * 0.10);
      else if (u < 0.72) w = r * (0.22 - (u - 0.12) * 0.06);
      else w = r * (0.184 - (u - 0.72) * 0.38);
      spine.push({ x, y, w: Math.max(w, r * 0.055), u });
    }

    // Build smooth left/right edge polylines perpendicular to spine
    const left = [];
    const right = [];
    for (let i = 0; i <= N; i++) {
      const prev = spine[Math.max(0, i - 1)];
      const next = spine[Math.min(N, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      left.push({ x: spine[i].x + nx * spine[i].w, y: spine[i].y + ny * spine[i].w });
      right.push({ x: spine[i].x - nx * spine[i].w, y: spine[i].y - ny * spine[i].w });
    }

    // Shadow
    ctx.save();
    ctx.translate(-r * 0.05, r * 0.14);
    ctx.strokeStyle = 'rgba(18, 24, 20, 0.15)';
    ctx.lineWidth = r * 0.36;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(spine[0].x, spine[0].y);
    for (let i = 1; i <= N; i++) ctx.lineTo(spine[i].x, spine[i].y);
    ctx.stroke();
    ctx.restore();

    // Small barbels / sensory whiskers at blunt snout
    ctx.save();
    ctx.strokeStyle = 'rgba(214, 152, 74, 0.78)';
    ctx.lineWidth = r * 0.022;
    ctx.lineCap = 'round';
    const nose = spine[0];
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(nose.x, nose.y + s * r * 0.05);
      ctx.quadraticCurveTo(nose.x + r * 0.14, nose.y + s * r * 0.15, nose.x + r * 0.22, nose.y + s * r * 0.24);
      ctx.stroke();
    }
    ctx.restore();

    // Small rounded paddle pectoral fins near the head
    const pAnchor = spine[3];
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(pAnchor.x, pAnchor.y + s * pAnchor.w * 0.85);
      ctx.rotate(s * (0.55 + Math.sin(phase * 1.1) * 0.20));
      const pG = ctx.createRadialGradient(0, 0, r * 0.02, -r * 0.10, s * r * 0.16, r * 0.32);
      pG.addColorStop(0, 'rgba(240, 186, 98, 0.82)');
      pG.addColorStop(1, 'rgba(255, 226, 168, 0.16)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.10, s * r * 0.16, -r * 0.08, s * r * 0.30, -r * 0.24, s * r * 0.20);
      ctx.quadraticCurveTo(-r * 0.14, s * r * 0.08, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Continuous rounded ribbon paddle tail
    const tailPt = spine[N];
    const prevTail = spine[N - 2];
    const tailAng = Math.atan2(tailPt.y - prevTail.y, tailPt.x - prevTail.x);
    ctx.save();
    ctx.translate(tailPt.x, tailPt.y);
    ctx.rotate(tailAng + Math.PI);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.40, 0);
    tG.addColorStop(0, 'rgba(222, 162, 68, 0.85)');
    tG.addColorStop(1, 'rgba(248, 212, 144, 0.25)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.18, -r * 0.07);
    ctx.bezierCurveTo(-r * 0.08, -r * 0.18, -r * 0.32, -r * 0.18, -r * 0.38, 0);
    ctx.bezierCurveTo(-r * 0.32, r * 0.18, -r * 0.08, r * 0.18, r * 0.18, r * 0.07);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Sinuous golden-amber loach body path
    const traceLoachBody = () => {
      ctx.beginPath();
      ctx.moveTo(nose.x + r * 0.08, nose.y);
      for (let i = 0; i <= N; i++) ctx.lineTo(left[i].x, left[i].y);
      ctx.arc(tailPt.x, tailPt.y, tailPt.w, tailAng + Math.PI * 0.5, tailAng - Math.PI * 0.5, false);
      for (let i = N; i >= 0; i--) ctx.lineTo(right[i].x, right[i].y);
      ctx.closePath();
    };

    const bG = ctx.createLinearGradient(xStart, -r * 0.25, xEnd, r * 0.25);
    bG.addColorStop(0, '#f8cc68');
    bG.addColorStop(0.45, '#e8a43e');
    bG.addColorStop(1, '#c87e28');
    ctx.fillStyle = bG;
    traceLoachBody();
    ctx.fill();

    // Clipped rich chocolate-brown Kuhli saddle bands along undulating spine
    ctx.save();
    traceLoachBody();
    ctx.clip();
    for (let idx = 2; idx < N - 1; idx += 2) {
      const pt = spine[idx];
      const nxt = spine[idx + 1];
      const ang = Math.atan2(nxt.y - pt.y, nxt.x - pt.x);
      ctx.save();
      ctx.translate(pt.x, pt.y);
      ctx.rotate(ang);
      const bandG = ctx.createLinearGradient(-r * 0.08, 0, r * 0.08, 0);
      bandG.addColorStop(0, 'rgba(64, 34, 18, 0.15)');
      bandG.addColorStop(0.5, 'rgba(54, 26, 12, 0.88)');
      bandG.addColorStop(1, 'rgba(64, 34, 18, 0.15)');
      ctx.fillStyle = bandG;
      ctx.beginPath();
      ctx.rect(-r * 0.085, -r * 0.34, r * 0.17, r * 0.68);
      ctx.fill();
      ctx.restore();
    }

    // Soft sunlit highlight running down the spine
    ctx.strokeStyle = 'rgba(255, 246, 206, 0.42)';
    ctx.lineWidth = r * 0.08;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(spine[1].x, spine[1].y - r * 0.04);
    for (let i = 2; i < N - 2; i++) ctx.lineTo(spine[i].x, spine[i].y - r * 0.04);
    ctx.stroke();
    ctx.restore();

    // Small glossy dark eyes near blunt snout
    const headPt = spine[1];
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#ffdf88';
      ctx.beginPath();
      ctx.arc(headPt.x + r * 0.04, headPt.y + s * r * 0.105, r * 0.050, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#18100a';
      ctx.beginPath();
      ctx.arc(headPt.x + r * 0.045, headPt.y + s * r * 0.108, r * 0.032, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(headPt.x + r * 0.058, headPt.y + s * r * 0.098, r * 0.013, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 9. BUTTERFLYFISH — Narrow blade-like diamond profile, elongated pincer snout & golden-ivory chevrons
  butterflyfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 5.6 + speed * 2.2;
    const wag = Math.sin(t * freq) * 0.19;
    const wag2 = Math.sin(t * freq - 0.9) * 0.28;
    const finBeat = Math.sin(t * freq * 1.15) * 0.24;

    // Shadow
    ctx.save();
    ctx.translate(-r * 0.06, r * 0.14);
    ctx.fillStyle = 'rgba(18, 28, 36, 0.15)';
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 1.04, r * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Delicate clear-gold pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.24, s * r * 0.17);
      ctx.rotate(s * (0.50 + finBeat * s));
      const pG = ctx.createLinearGradient(0, 0, -r * 0.34, s * r * 0.30);
      pG.addColorStop(0, 'rgba(255, 232, 118, 0.78)');
      pG.addColorStop(1, 'rgba(255, 248, 210, 0.10)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.08, s * r * 0.20, -r * 0.12, s * r * 0.38, -r * 0.34, s * r * 0.26);
      ctx.quadraticCurveTo(-r * 0.18, s * r * 0.08, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Gossamer-yellow fan tail
    ctx.save();
    ctx.translate(-r * 0.62, wag * r * 0.24);
    ctx.rotate(wag * 0.65);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.44, 0);
    tG.addColorStop(0, 'rgba(255, 212, 62, 0.85)');
    tG.addColorStop(0.6, 'rgba(255, 244, 188, 0.50)');
    tG.addColorStop(1, 'rgba(255, 252, 236, 0.12)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.04, -r * 0.05);
    ctx.bezierCurveTo(-r * 0.14, -r * 0.22, -r * 0.34, -r * 0.34, -r * 0.44, -r * 0.26);
    ctx.quadraticCurveTo(-r * 0.48, 0, -r * 0.44, r * 0.26);
    ctx.bezierCurveTo(-r * 0.34, r * 0.34, -r * 0.14, r * 0.22, r * 0.04, r * 0.05);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Narrow compressed diamond silhouette with elongated pincer snout (+1.22r)
    const bG = ctx.createLinearGradient(r * 1.22, 0, -r * 0.66, 0);
    bG.addColorStop(0, '#ffe268');
    bG.addColorStop(0.28, '#fffaf0');
    bG.addColorStop(0.62, '#ffe45c');
    bG.addColorStop(1, '#f4a822');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 1.22, 0);
    ctx.bezierCurveTo(r * 0.96, -r * 0.07, r * 0.72, -r * 0.16, r * 0.42, -r * 0.24);
    ctx.bezierCurveTo(r * 0.08, -r * 0.30, -r * 0.34, -r * 0.20, -r * 0.64, wag * r * 0.22 - r * 0.05);
    ctx.lineTo(-r * 0.64, wag * r * 0.22 + r * 0.05);
    ctx.bezierCurveTo(-r * 0.34, r * 0.20, r * 0.08, r * 0.30, r * 0.42, r * 0.24);
    ctx.bezierCurveTo(r * 0.72, r * 0.16, r * 0.96, r * 0.07, r * 1.22, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped charcoal eye-mask band & golden-orange chevron markings
    ctx.save();
    ctx.clip();
    // Charcoal forehead mask
    ctx.fillStyle = 'rgba(34, 30, 38, 0.82)';
    ctx.beginPath();
    ctx.rect(r * 0.56, -r * 0.34, r * 0.14, r * 0.68);
    ctx.fill();

    // Warm copper-gold chevron saddles
    ctx.strokeStyle = 'rgba(236, 138, 28, 0.82)';
    ctx.lineWidth = r * 0.085;
    for (const cx of [r * 0.24, -r * 0.08, -r * 0.36]) {
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.08, -r * 0.34);
      ctx.lineTo(cx + r * 0.08, 0);
      ctx.lineTo(cx - r * 0.08, r * 0.34);
      ctx.stroke();
    }

    // Glossy sunlit highlight
    ctx.fillStyle = 'rgba(255, 255, 245, 0.52)';
    ctx.beginPath();
    ctx.ellipse(r * 0.10, -r * 0.05, r * 0.42, r * 0.07, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Delicate trailing white-gold dorsal filament
    ctx.strokeStyle = 'rgba(255, 246, 206, 0.80)';
    ctx.lineWidth = r * 0.045;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.16, 0);
    ctx.bezierCurveTo(-r * 0.18, -wag * r * 0.32, -r * 0.58, wag2 * r * 0.46, -r * 0.98, wag2 * r * 0.38);
    ctx.stroke();

    // Eyes tucked into the charcoal eye-mask
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#ffe672';
      ctx.beginPath();
      ctx.arc(r * 0.64, s * r * 0.14, r * 0.068, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0e0c12';
      ctx.beginPath();
      ctx.arc(r * 0.648, s * r * 0.142, r * 0.044, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.665, s * r * 0.130, r * 0.017, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 10. BLUETANGFISH — Sleek royal cobalt teardrop with midnight palette saddle & yellow wedge tail
  bluetangfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 5.5 + speed * 2.5;
    const wag = Math.sin(t * freq) * 0.20;
    const finRow = Math.sin(t * freq * 0.9) * 0.22;

    // Shadow
    ctx.save();
    ctx.translate(-r * 0.06, r * 0.14);
    ctx.fillStyle = 'rgba(8, 20, 44, 0.17)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.05, 0, r * 1.02, r * 0.34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Swept-back royal blue pectoral fins with sunlit yellow tips
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.26, s * r * 0.22);
      ctx.rotate(s * (0.45 + finRow * s));
      const pG = ctx.createLinearGradient(0, 0, -r * 0.38, s * r * 0.34);
      pG.addColorStop(0, 'rgba(24, 108, 242, 0.85)');
      pG.addColorStop(0.68, 'rgba(44, 146, 255, 0.56)');
      pG.addColorStop(1, 'rgba(255, 224, 58, 0.72)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.10, s * r * 0.22, -r * 0.14, s * r * 0.42, -r * 0.40, s * r * 0.30);
      ctx.quadraticCurveTo(-r * 0.22, s * r * 0.10, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Vivid sunlit canary-yellow wedge caudal fin with royal-blue outer trim
    ctx.save();
    ctx.translate(-r * 0.62, wag * r * 0.26);
    ctx.rotate(wag * 0.68);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.50, 0);
    tG.addColorStop(0, '#ffe838');
    tG.addColorStop(0.75, '#ffcc14');
    tG.addColorStop(1, 'rgba(255, 232, 92, 0.62)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.08, -r * 0.05);
    ctx.lineTo(-r * 0.48, -r * 0.36);
    ctx.quadraticCurveTo(-r * 0.38, 0, -r * 0.48, r * 0.36);
    ctx.lineTo(r * 0.08, r * 0.05);
    ctx.closePath();
    ctx.fill();

    // Soft indigo-blue upper and lower tail edges
    ctx.strokeStyle = 'rgba(18, 42, 136, 0.78)';
    ctx.lineWidth = r * 0.036;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.05);
    ctx.lineTo(-r * 0.46, -r * 0.35);
    ctx.moveTo(0, r * 0.05);
    ctx.lineTo(-r * 0.46, r * 0.35);
    ctx.stroke();
    ctx.restore();

    // Sleek oval-teardrop Regal Tang body
    const bG = ctx.createRadialGradient(r * 0.22, -r * 0.05, r * 0.04, r * 0.04, 0, r * 0.96);
    bG.addColorStop(0, '#309cff');
    bG.addColorStop(0.45, '#1260e8');
    bG.addColorStop(0.85, '#0b38a8');
    bG.addColorStop(1, '#08206c');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.90, 0);
    ctx.bezierCurveTo(r * 0.78, -r * 0.26, r * 0.32, -r * 0.34, -r * 0.14, -r * 0.26);
    ctx.bezierCurveTo(-r * 0.42, -r * 0.20, -r * 0.54, -r * 0.10, -r * 0.66, wag * r * 0.24 - r * 0.05);
    ctx.lineTo(-r * 0.66, wag * r * 0.24 + r * 0.05);
    ctx.bezierCurveTo(-r * 0.54, r * 0.10, -r * 0.42, r * 0.20, -r * 0.14, r * 0.26);
    ctx.bezierCurveTo(r * 0.32, r * 0.34, r * 0.78, r * 0.26, r * 0.90, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped iconic midnight-indigo palette dorsal saddle & yellow tail wedge
    ctx.save();
    ctx.clip();
    ctx.fillStyle = 'rgba(12, 16, 48, 0.86)';
    ctx.beginPath();
    ctx.moveTo(r * 0.54, 0);
    ctx.bezierCurveTo(r * 0.34, -r * 0.22, -r * 0.12, -r * 0.26, -r * 0.50, -r * 0.12);
    ctx.quadraticCurveTo(-r * 0.26, 0, -r * 0.50, r * 0.12);
    ctx.bezierCurveTo(-r * 0.12, r * 0.26, r * 0.34, r * 0.22, r * 0.54, 0);
    ctx.closePath();
    ctx.fill();

    // Royal blue oval cutout inside the palette saddle
    ctx.fillStyle = '#1a76f4';
    ctx.beginPath();
    ctx.ellipse(r * 0.04, 0, r * 0.22, r * 0.095, 0, 0, Math.PI * 2);
    ctx.fill();

    // Yellow wedge pointing into tail base
    ctx.fillStyle = '#ffe030';
    ctx.beginPath();
    ctx.moveTo(-r * 0.34, 0);
    ctx.lineTo(-r * 0.72, -r * 0.12);
    ctx.lineTo(-r * 0.72, r * 0.12);
    ctx.closePath();
    ctx.fill();

    // Sunlit gloss
    ctx.fillStyle = 'rgba(180, 232, 255, 0.40)';
    ctx.beginPath();
    ctx.ellipse(r * 0.16, -r * 0.07, r * 0.42, r * 0.09, -0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Expressive eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#5ac4ff';
      ctx.beginPath();
      ctx.ellipse(r * 0.62, s * r * 0.155, r * 0.082, r * 0.064, s * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#070b1a';
      ctx.beginPath();
      ctx.arc(r * 0.632, s * r * 0.158, r * 0.048, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.652, s * r * 0.144, r * 0.02, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 11. ANGELFISH — Ultra-sleek razor-compressed overhead disc with long flowing streamers & smoky bars
  angelfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 3.8 + speed * 1.8;
    const wag = Math.sin(t * freq) * 0.20;
    const wag2 = Math.sin(t * freq - 1.0) * 0.34;
    const wag3 = Math.sin(t * freq - 1.9) * 0.44;

    // Subtle slender shadow
    ctx.save();
    ctx.translate(-r * 0.12, r * 0.14);
    ctx.fillStyle = 'rgba(16, 26, 38, 0.14)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.14, 0, r * 1.15, r * 0.20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Long graceful trailing ventral/pelvic streamer filaments sweeping backward
    for (const s of [-1, 1]) {
      ctx.save();
      const sG = ctx.createLinearGradient(r * 0.12, 0, -r * 1.38, 0);
      sG.addColorStop(0, 'rgba(236, 246, 255, 0.82)');
      sG.addColorStop(0.55, 'rgba(182, 224, 248, 0.48)');
      sG.addColorStop(1, 'rgba(220, 244, 255, 0.05)');
      ctx.strokeStyle = sG;
      ctx.lineWidth = r * 0.036;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(r * 0.10, s * r * 0.14);
      ctx.bezierCurveTo(
        -r * 0.28, s * r * 0.38 + wag * r * 0.18,
        -r * 0.78, s * r * 0.24 + wag2 * r * 0.32,
        -r * 1.36, s * r * 0.18 + wag3 * r * 0.38
      );
      ctx.stroke();
      ctx.restore();
    }

    // Gossamer-silver pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.28, s * r * 0.13);
      ctx.rotate(s * (0.42 + Math.sin(t * freq * 1.1) * 0.18));
      const pG = ctx.createLinearGradient(0, 0, -r * 0.32, s * r * 0.28);
      pG.addColorStop(0, 'rgba(232, 244, 255, 0.72)');
      pG.addColorStop(1, 'rgba(232, 244, 255, 0.06)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.06, s * r * 0.18, -r * 0.10, s * r * 0.34, -r * 0.32, s * r * 0.22);
      ctx.quadraticCurveTo(-r * 0.16, s * r * 0.06, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Lyre-like forked translucent tail with trailing outer tips
    ctx.save();
    ctx.translate(-r * 0.62, wag * r * 0.22);
    ctx.rotate(wag2 * 0.48);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.74, 0);
    tG.addColorStop(0, 'rgba(220, 232, 244, 0.84)');
    tG.addColorStop(0.55, 'rgba(182, 212, 236, 0.45)');
    tG.addColorStop(1, 'rgba(232, 246, 255, 0.10)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.04, -r * 0.04);
    ctx.bezierCurveTo(-r * 0.18, -r * 0.16, -r * 0.46, -r * 0.38, -r * 0.76, -r * 0.34);
    ctx.bezierCurveTo(-r * 0.48, -r * 0.16, -r * 0.34, -r * 0.06, -r * 0.30, 0);
    ctx.bezierCurveTo(-r * 0.34, r * 0.06, -r * 0.48, r * 0.16, -r * 0.76, r * 0.34);
    ctx.bezierCurveTo(-r * 0.46, r * 0.38, -r * 0.18, r * 0.16, r * 0.04, r * 0.04);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Ultra-sleek razor-thin overhead disc silhouette
    const bG = ctx.createLinearGradient(r * 0.96, 0, -r * 0.66, 0);
    bG.addColorStop(0, '#f4f8fc');
    bG.addColorStop(0.35, '#d6e4f0');
    bG.addColorStop(0.75, '#b8ccd8');
    bG.addColorStop(1, '#8ea4b8');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.96, 0);
    ctx.bezierCurveTo(r * 0.72, -r * 0.14, r * 0.24, -r * 0.20, -r * 0.16, -r * 0.15);
    ctx.bezierCurveTo(-r * 0.40, -r * 0.12, -r * 0.54, -r * 0.06, -r * 0.66, wag * r * 0.20 - r * 0.04);
    ctx.lineTo(-r * 0.66, wag * r * 0.20 + r * 0.04);
    ctx.bezierCurveTo(-r * 0.54, r * 0.06, -r * 0.40, r * 0.12, -r * 0.16, r * 0.15);
    ctx.bezierCurveTo(r * 0.24, r * 0.20, r * 0.72, r * 0.14, r * 0.96, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped smoky-charcoal vertical/dorsal bars & pearlescent aqua sheen
    ctx.save();
    ctx.clip();
    ctx.fillStyle = 'rgba(34, 40, 52, 0.76)';
    for (const [bx, bw] of [[r * 0.56, r * 0.10], [r * 0.16, r * 0.15], [-r * 0.24, r * 0.14]]) {
      ctx.beginPath();
      ctx.rect(bx - bw / 2, -r * 0.26, bw, r * 0.52);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(215, 252, 255, 0.52)';
    ctx.beginPath();
    ctx.ellipse(r * 0.18, -r * 0.03, r * 0.48, r * 0.055, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Long flowing dorsal streamer ribbon
    const dG = ctx.createLinearGradient(r * 0.18, 0, -r * 1.24, 0);
    dG.addColorStop(0, 'rgba(220, 244, 255, 0.85)');
    dG.addColorStop(0.5, 'rgba(130, 175, 210, 0.58)');
    dG.addColorStop(1, 'rgba(225, 245, 255, 0.10)');
    ctx.strokeStyle = dG;
    ctx.lineWidth = r * 0.052;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.18, 0);
    ctx.bezierCurveTo(-r * 0.22, -wag * r * 0.42, -r * 0.74, wag2 * r * 0.56, -r * 1.24, wag3 * r * 0.48);
    ctx.stroke();

    // Ruby-amber glowing eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#e84838';
      ctx.beginPath();
      ctx.ellipse(r * 0.62, s * r * 0.105, r * 0.070, r * 0.054, s * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0e0c12';
      ctx.beginPath();
      ctx.arc(r * 0.628, s * r * 0.108, r * 0.042, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.646, s * r * 0.096, r * 0.016, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 12. MOORISHIDOLFISH — Tubular snout, bold ivory/gold/charcoal bands & extra-long snow-white whip streamer
  moorishidolfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 4.2 + speed * 2.0;
    const wag = Math.sin(t * freq) * 0.20;
    const wag2 = Math.sin(t * freq - 1.1) * 0.34;
    const wag3 = Math.sin(t * freq - 2.2) * 0.48;

    // Shadow
    ctx.save();
    ctx.translate(-r * 0.08, r * 0.14);
    ctx.fillStyle = 'rgba(14, 22, 34, 0.16)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.06, 0, r * 1.12, r * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Translucent ivory pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.22, s * r * 0.16);
      ctx.rotate(s * (0.48 + Math.sin(t * freq * 1.1) * 0.20));
      const pG = ctx.createLinearGradient(0, 0, -r * 0.32, s * r * 0.28);
      pG.addColorStop(0, 'rgba(255, 250, 234, 0.78)');
      pG.addColorStop(1, 'rgba(255, 250, 234, 0.10)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.08, s * r * 0.18, -r * 0.10, s * r * 0.34, -r * 0.32, s * r * 0.22);
      ctx.quadraticCurveTo(-r * 0.16, s * r * 0.08, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Sleek dark-charcoal sickle-shaped caudal fin
    ctx.save();
    ctx.translate(-r * 0.62, wag * r * 0.24);
    ctx.rotate(wag * 0.62);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.52, 0);
    tG.addColorStop(0, '#1e222e');
    tG.addColorStop(0.7, '#343a4c');
    tG.addColorStop(1, 'rgba(52, 58, 76, 0.45)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.06, -r * 0.05);
    ctx.bezierCurveTo(-r * 0.14, -r * 0.20, -r * 0.34, -r * 0.44, -r * 0.54, -r * 0.36);
    ctx.quadraticCurveTo(-r * 0.30, -r * 0.10, -r * 0.26, 0);
    ctx.quadraticCurveTo(-r * 0.30, r * 0.10, -r * 0.54, r * 0.36);
    ctx.bezierCurveTo(-r * 0.34, r * 0.44, -r * 0.14, r * 0.20, r * 0.06, r * 0.05);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Compressed blade silhouette with long protruding tubular snout (+1.30r)
    const bG = ctx.createLinearGradient(r * 1.30, 0, -r * 0.66, 0);
    bG.addColorStop(0, '#fffcf2');
    bG.addColorStop(0.45, '#fff4d6');
    bG.addColorStop(0.85, '#ffe052');
    bG.addColorStop(1, '#f4c428');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 1.30, 0);
    ctx.bezierCurveTo(r * 1.04, -r * 0.07, r * 0.80, -r * 0.12, r * 0.46, -r * 0.22);
    ctx.bezierCurveTo(r * 0.08, -r * 0.28, -r * 0.34, -r * 0.18, -r * 0.64, wag * r * 0.22 - r * 0.05);
    ctx.lineTo(-r * 0.64, wag * r * 0.22 + r * 0.05);
    ctx.bezierCurveTo(-r * 0.34, r * 0.18, r * 0.08, r * 0.28, r * 0.46, r * 0.22);
    ctx.bezierCurveTo(r * 0.80, r * 0.12, r * 1.04, r * 0.07, r * 1.30, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped dramatic Moorish Idol bands & coral-orange snout saddle
    ctx.save();
    ctx.clip();
    // Coral-orange snout saddle
    ctx.fillStyle = '#ff7226';
    ctx.beginPath();
    ctx.ellipse(r * 0.94, 0, r * 0.14, r * 0.09, 0, 0, Math.PI * 2);
    ctx.fill();

    // Velvety charcoal-indigo broad bands
    ctx.fillStyle = '#1b1f2c';
    ctx.beginPath();
    ctx.rect(r * 0.34, -r * 0.34, r * 0.32, r * 0.68);
    ctx.rect(-r * 0.42, -r * 0.34, r * 0.32, r * 0.68);
    ctx.fill();

    // Sunlit gloss
    ctx.fillStyle = 'rgba(255, 255, 255, 0.44)';
    ctx.beginPath();
    ctx.ellipse(r * 0.14, -r * 0.05, r * 0.44, r * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Extraordinarily long, flowing snow-white dorsal whip streamer (-1.85r)
    ctx.save();
    const wG = ctx.createLinearGradient(r * 0.24, 0, -r * 1.85, 0);
    wG.addColorStop(0, 'rgba(255, 255, 255, 0.96)');
    wG.addColorStop(0.55, 'rgba(255, 250, 232, 0.78)');
    wG.addColorStop(1, 'rgba(255, 255, 255, 0.18)');
    ctx.strokeStyle = wG;
    ctx.lineWidth = r * 0.056;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.24, 0);
    ctx.bezierCurveTo(
      -r * 0.26, -wag * r * 0.48,
      -r * 0.96, wag2 * r * 0.68,
      -r * 1.84, wag3 * r * 0.64
    );
    ctx.stroke();
    ctx.restore();

    // Eyes tucked in the forward charcoal band
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#ffe878';
      ctx.beginPath();
      ctx.arc(r * 0.56, s * r * 0.135, r * 0.066, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0c0e14';
      ctx.beginPath();
      ctx.arc(r * 0.568, s * r * 0.138, r * 0.042, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.585, s * r * 0.125, r * 0.017, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 13. DISCUSFISH — Tall sleek disc profile from above, turquoise wavy striations over sunset terracotta & ruby eyes
  discusfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 4.0 + speed * 1.8;
    const wag = Math.sin(t * freq) * 0.18;
    const wag2 = Math.sin(t * freq - 0.9) * 0.28;

    // Soft shadow
    ctx.save();
    ctx.translate(-r * 0.06, r * 0.14);
    ctx.fillStyle = 'rgba(18, 22, 34, 0.16)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.05, 0, r * 0.98, r * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Broad translucent turquoise-rimmed dorsal/anal halo peeking subtly along sides
    ctx.save();
    const haloG = ctx.createRadialGradient(-r * 0.06, 0, r * 0.08, -r * 0.06, 0, r * 0.72);
    haloG.addColorStop(0, 'rgba(34, 212, 224, 0.58)');
    haloG.addColorStop(0.7, 'rgba(232, 74, 58, 0.44)');
    haloG.addColorStop(1, 'rgba(54, 224, 240, 0.16)');
    ctx.fillStyle = haloG;
    ctx.beginPath();
    ctx.ellipse(-r * 0.08, wag * r * 0.08, r * 0.64, r * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Delicate trailing pelvic filaments
    for (const s of [-1, 1]) {
      ctx.strokeStyle = 'rgba(72, 226, 242, 0.62)';
      ctx.lineWidth = r * 0.028;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(r * 0.16, s * r * 0.15);
      ctx.quadraticCurveTo(-r * 0.24, s * r * 0.30 + wag * r * 0.16, -r * 0.78, s * r * 0.18 + wag2 * r * 0.24);
      ctx.stroke();
    }

    // Translucent ruby-and-cyan fan tail
    ctx.save();
    ctx.translate(-r * 0.62, wag * r * 0.22);
    ctx.rotate(wag2 * 0.55);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.48, 0);
    tG.addColorStop(0, 'rgba(230, 74, 58, 0.84)');
    tG.addColorStop(0.55, 'rgba(66, 216, 232, 0.52)');
    tG.addColorStop(1, 'rgba(180, 246, 255, 0.14)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.04, -r * 0.06);
    ctx.bezierCurveTo(-r * 0.16, -r * 0.24, -r * 0.36, -r * 0.36, -r * 0.48, -r * 0.24);
    ctx.quadraticCurveTo(-r * 0.52, 0, -r * 0.48, r * 0.24);
    ctx.bezierCurveTo(-r * 0.36, r * 0.36, -r * 0.16, r * 0.24, r * 0.04, r * 0.06);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Sleek rounded-brow discus body
    const bG = ctx.createRadialGradient(r * 0.16, -r * 0.05, r * 0.04, 0, 0, r * 0.90);
    bG.addColorStop(0, '#ff8e58');
    bG.addColorStop(0.45, '#de4e36');
    bG.addColorStop(0.85, '#9e2628');
    bG.addColorStop(1, '#5a1622');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.88, 0);
    ctx.bezierCurveTo(r * 0.80, -r * 0.20, r * 0.34, -r * 0.24, -r * 0.12, -r * 0.20);
    ctx.bezierCurveTo(-r * 0.38, -r * 0.16, -r * 0.52, -r * 0.08, -r * 0.64, wag * r * 0.20 - r * 0.05);
    ctx.lineTo(-r * 0.64, wag * r * 0.20 + r * 0.05);
    ctx.bezierCurveTo(-r * 0.52, r * 0.08, -r * 0.38, r * 0.16, -r * 0.12, r * 0.20);
    ctx.bezierCurveTo(r * 0.34, r * 0.24, r * 0.80, r * 0.20, r * 0.88, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped luminous turquoise-teal wavy striations over sunset terracotta
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = 'rgba(42, 236, 246, 0.84)';
    ctx.lineWidth = r * 0.036;
    ctx.lineCap = 'round';
    for (let i = -2; i <= 2; i++) {
      const y0 = i * r * 0.072;
      ctx.beginPath();
      ctx.moveTo(r * 0.72, y0 * 0.6);
      ctx.bezierCurveTo(r * 0.34, y0 + r * 0.04, -r * 0.06, y0 - r * 0.04, -r * 0.54, y0 * 0.5);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255, 250, 235, 0.42)';
    ctx.beginPath();
    ctx.ellipse(r * 0.16, -r * 0.05, r * 0.44, r * 0.075, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Glowing crimson-ruby eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#ff2838';
      ctx.beginPath();
      ctx.ellipse(r * 0.62, s * r * 0.125, r * 0.078, r * 0.062, s * 0.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#12080c';
      ctx.beginPath();
      ctx.arc(r * 0.632, s * r * 0.128, r * 0.044, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.65, s * r * 0.115, r * 0.018, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 14. ARCHERFISH — Sleek predatory shooting snout, metallic silver-olive back & 5 bold charcoal oval blotches
  archerfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 5.8 + speed * 2.6;
    const wag = Math.sin(t * freq) * 0.21;
    const finRow = Math.sin(t * freq * 0.9) * 0.18;

    // Shadow
    ctx.save();
    ctx.translate(-r * 0.06, r * 0.14);
    ctx.fillStyle = 'rgba(14, 24, 30, 0.16)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.04, 0, r * 1.16, r * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Swept-back angular smoky-silver pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.24, s * r * 0.20);
      ctx.rotate(s * (0.42 + finRow * s));
      const pG = ctx.createLinearGradient(0, 0, -r * 0.42, s * r * 0.30);
      pG.addColorStop(0, 'rgba(182, 198, 204, 0.78)');
      pG.addColorStop(1, 'rgba(220, 232, 236, 0.12)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-r * 0.06, s * r * 0.34);
      ctx.quadraticCurveTo(-r * 0.28, s * r * 0.30, -r * 0.40, s * r * 0.12);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Translucent smoky-silver forked tail
    ctx.save();
    ctx.translate(-r * 0.72, wag * r * 0.26);
    ctx.rotate(wag * 0.68);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.48, 0);
    tG.addColorStop(0, 'rgba(148, 162, 164, 0.86)');
    tG.addColorStop(0.6, 'rgba(202, 214, 218, 0.56)');
    tG.addColorStop(1, 'rgba(232, 240, 242, 0.18)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.06, -r * 0.05);
    ctx.lineTo(-r * 0.48, -r * 0.34);
    ctx.quadraticCurveTo(-r * 0.30, 0, -r * 0.48, r * 0.34);
    ctx.lineTo(r * 0.06, r * 0.05);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Streamlined fusiform body with straight pointed shooting snout (+1.22r)
    const bG = ctx.createLinearGradient(r * 1.22, -r * 0.22, -r * 0.74, r * 0.22);
    bG.addColorStop(0, '#eef4e8');
    bG.addColorStop(0.32, '#cfd8c8');
    bG.addColorStop(0.68, '#9aa89c');
    bG.addColorStop(1, '#6e7e78');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 1.22, 0);
    ctx.bezierCurveTo(r * 0.96, -r * 0.12, r * 0.54, -r * 0.26, r * 0.04, -r * 0.26);
    ctx.bezierCurveTo(-r * 0.34, -r * 0.24, -r * 0.56, -r * 0.12, -r * 0.74, wag * r * 0.24 - r * 0.05);
    ctx.lineTo(-r * 0.74, wag * r * 0.24 + r * 0.05);
    ctx.bezierCurveTo(-r * 0.56, r * 0.12, -r * 0.34, r * 0.24, r * 0.04, r * 0.26);
    ctx.bezierCurveTo(r * 0.54, r * 0.26, r * 0.96, r * 0.12, r * 1.22, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped 5 bold soft-edged charcoal-slate oval blotches along back
    ctx.save();
    ctx.clip();
    const blotches = [
      [0.54, 0.10, 0.14], [0.24, 0.13, 0.18], [-0.08, 0.13, 0.18],
      [-0.36, 0.11, 0.15], [-0.58, 0.08, 0.11]
    ];
    for (const [bx, rx, ry] of blotches) {
      const blG = ctx.createRadialGradient(bx * r, 0, r * 0.02, bx * r, 0, ry * r);
      blG.addColorStop(0, 'rgba(32, 38, 44, 0.88)');
      blG.addColorStop(0.7, 'rgba(46, 54, 62, 0.70)');
      blG.addColorStop(1, 'rgba(46, 54, 62, 0)');
      ctx.fillStyle = blG;
      ctx.beginPath();
      ctx.ellipse(bx * r, 0, rx * r, ry * r * 1.4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Metallic champagne-silver dorsal sheen
    ctx.fillStyle = 'rgba(255, 255, 240, 0.45)';
    ctx.beginPath();
    ctx.ellipse(r * 0.24, -r * 0.07, r * 0.52, r * 0.075, -0.03, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Rear-set dorsal ridge fin
    ctx.strokeStyle = 'rgba(128, 140, 136, 0.78)';
    ctx.lineWidth = r * 0.064;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-r * 0.12, 0);
    ctx.quadraticCurveTo(-r * 0.36, -wag * r * 0.22, -r * 0.62, wag * r * 0.20);
    ctx.stroke();

    // Keen forward-angled golden-rimmed hunting eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#f8d85c';
      ctx.beginPath();
      ctx.ellipse(r * 0.72, s * r * 0.145, r * 0.090, r * 0.068, s * 0.26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0c1014';
      ctx.beginPath();
      ctx.arc(r * 0.74, s * r * 0.148, r * 0.052, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.762, s * r * 0.134, r * 0.020, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 15. BOXFISH — Rigid boxy armored hexagonal/rectangular carapace, polka-dot ocelli & rapidly sculling tiny fans
  boxfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 9.5 + speed * 4.2;
    const scull = Math.sin(t * freq) * 0.36;
    const tailWag = Math.sin(t * freq * 0.65) * 0.28;

    // Boxy drop shadow
    ctx.save();
    ctx.translate(-r * 0.06, r * 0.18);
    ctx.fillStyle = 'rgba(20, 26, 28, 0.20)';
    ctx.beginPath();
    ctx.rect(-r * 0.64, -r * 0.44, r * 1.38, r * 0.88);
    ctx.fill();
    ctx.restore();

    // Tiny rapidly sculling translucent amber fan pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.22, s * r * 0.42);
      ctx.rotate(s * (0.28 + scull * s));
      const pG = ctx.createRadialGradient(0, 0, r * 0.02, -r * 0.04, s * r * 0.16, r * 0.30);
      pG.addColorStop(0, 'rgba(255, 206, 62, 0.76)');
      pG.addColorStop(1, 'rgba(255, 238, 168, 0.14)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.12, s * r * 0.14, r * 0.02, s * r * 0.30, -r * 0.20, s * r * 0.24);
      ctx.quadraticCurveTo(-r * 0.18, s * r * 0.10, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Small rudder-like fan tail wagging briskly behind rigid carapace
    ctx.save();
    ctx.translate(-r * 0.66, 0);
    ctx.rotate(tailWag);
    ctx.fillStyle = '#d4961e';
    ctx.beginPath();
    ctx.rect(-r * 0.16, -r * 0.09, r * 0.20, r * 0.18);
    ctx.fill();

    const tG = ctx.createLinearGradient(-r * 0.10, 0, -r * 0.56, 0);
    tG.addColorStop(0, 'rgba(232, 168, 34, 0.90)');
    tG.addColorStop(0.65, 'rgba(255, 212, 74, 0.62)');
    tG.addColorStop(1, 'rgba(255, 238, 168, 0.22)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(-r * 0.10, -r * 0.07);
    ctx.bezierCurveTo(-r * 0.28, -r * 0.24, -r * 0.48, -r * 0.28, -r * 0.56, -r * 0.14);
    ctx.quadraticCurveTo(-r * 0.60, 0, -r * 0.56, r * 0.14);
    ctx.bezierCurveTo(-r * 0.48, r * 0.28, -r * 0.28, r * 0.24, -r * 0.10, r * 0.07);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Rigid boxy armored hexagonal carapace (flat-sided with beveled corners, blunt snout)
    const bG = ctx.createRadialGradient(r * 0.12, -r * 0.10, r * 0.08, 0, 0, r * 0.94);
    bG.addColorStop(0, '#ffe85c');
    bG.addColorStop(0.50, '#f4bc24');
    bG.addColorStop(0.85, '#c88612');
    bG.addColorStop(1, '#8c560a');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.80, -r * 0.14);
    ctx.quadraticCurveTo(r * 0.84, 0, r * 0.80, r * 0.14);
    ctx.lineTo(r * 0.56, r * 0.40);
    ctx.quadraticCurveTo(r * 0.44, r * 0.46, r * 0.28, r * 0.45);
    ctx.lineTo(-r * 0.38, r * 0.43);
    ctx.quadraticCurveTo(-r * 0.56, r * 0.42, -r * 0.64, r * 0.24);
    ctx.lineTo(-r * 0.68, r * 0.08);
    ctx.lineTo(-r * 0.68, -r * 0.08);
    ctx.lineTo(-r * 0.64, -r * 0.24);
    ctx.quadraticCurveTo(-r * 0.56, -r * 0.42, -r * 0.38, -r * 0.43);
    ctx.lineTo(r * 0.28, -r * 0.45);
    ctx.quadraticCurveTo(r * 0.44, -r * 0.46, r * 0.56, -r * 0.40);
    ctx.closePath();
    ctx.fill();

    // Clipped hexagonal bony plate seams, beveled top ridge & polka-dot ocelli
    ctx.save();
    ctx.clip();
    // Subtle beveled dorsal ridge plane
    ctx.fillStyle = 'rgba(255, 246, 174, 0.28)';
    ctx.beginPath();
    ctx.rect(-r * 0.48, -r * 0.26, r * 1.04, r * 0.52);
    ctx.fill();

    // Subtle geometric hexagonal carapace grid
    ctx.strokeStyle = 'rgba(138, 86, 12, 0.24)';
    ctx.lineWidth = r * 0.016;
    const hexR = r * 0.14;
    for (let gx = -3; gx <= 3; gx++) {
      for (let gy = -2; gy <= 2; gy++) {
        const hx = gx * hexR * 1.5;
        const hy = gy * hexR * 1.72 + (Math.abs(gx) % 2) * hexR * 0.86;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = (k * Math.PI) / 3;
          const px = hx + Math.cos(a) * hexR;
          const py = hy + Math.sin(a) * hexR;
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }

    // Painterly dark-umber & pearl-white ocelli (polka dots)
    const dots = [
      [0.42, -0.22], [0.42, 0.22], [0.18, 0.0], [0.06, -0.28], [0.06, 0.28],
      [-0.18, -0.14], [-0.18, 0.14], [-0.42, -0.24], [-0.42, 0.24], [-0.46, 0.0]
    ];
    for (const [dx, dy] of dots) {
      ctx.fillStyle = 'rgba(54, 34, 14, 0.78)';
      ctx.beginPath();
      ctx.arc(dx * r, dy * r, r * 0.068, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 250, 224, 0.84)';
      ctx.beginPath();
      ctx.arc(dx * r, dy * r, r * 0.036, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Cute wide-set boxfish eyes near beveled front corners
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#ffe868';
      ctx.beginPath();
      ctx.arc(r * 0.56, s * r * 0.26, r * 0.090, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#14120c';
      ctx.beginPath();
      ctx.arc(r * 0.58, s * r * 0.262, r * 0.056, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.602, s * r * 0.246, r * 0.022, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 16. COWFISH — Boxy tapered carapace with TWO curved front horns, rear spines & broom-like amber tail
  cowfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 9.0 + speed * 3.8;
    const scull = Math.sin(t * freq) * 0.34;
    const tailWag = Math.sin(t * freq * 0.55) * 0.24;

    // Shadow
    ctx.save();
    ctx.translate(-r * 0.06, r * 0.18);
    ctx.fillStyle = 'rgba(18, 28, 26, 0.18)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.04, 0, r * 1.12, r * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Two prominent curved forward-pointing ivory-gold horns (+1.32r)
    for (const s of [-1, 1]) {
      const hG = ctx.createLinearGradient(r * 0.60, s * r * 0.22, r * 1.32, s * r * 0.30);
      hG.addColorStop(0, '#d89c28');
      hG.addColorStop(0.55, '#f6d876');
      hG.addColorStop(1, '#fff8dc');
      ctx.fillStyle = hG;
      ctx.beginPath();
      ctx.moveTo(r * 0.62, s * r * 0.16);
      ctx.quadraticCurveTo(r * 0.96, s * r * 0.20, r * 1.32, s * r * 0.28);
      ctx.quadraticCurveTo(r * 0.92, s * r * 0.34, r * 0.56, s * r * 0.30);
      ctx.closePath();
      ctx.fill();
    }

    // Two small rear carapace spines near tail base
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#e8c464';
      ctx.beginPath();
      ctx.moveTo(-r * 0.48, s * r * 0.22);
      ctx.lineTo(-r * 0.86, s * r * 0.28);
      ctx.lineTo(-r * 0.52, s * r * 0.12);
      ctx.closePath();
      ctx.fill();
    }

    // Rapidly fluttering golden pectoral fans
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.16, s * r * 0.38);
      ctx.rotate(s * (0.28 + scull * s));
      const pG = ctx.createRadialGradient(0, 0, r * 0.02, -r * 0.06, s * r * 0.18, r * 0.32);
      pG.addColorStop(0, 'rgba(248, 208, 72, 0.78)');
      pG.addColorStop(1, 'rgba(255, 240, 178, 0.14)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.10, s * r * 0.14, 0, s * r * 0.30, -r * 0.22, s * r * 0.24);
      ctx.quadraticCurveTo(-r * 0.16, s * r * 0.10, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Long sweeping translucent amber broom-like tail fin
    ctx.save();
    ctx.translate(-r * 0.58, 0);
    ctx.rotate(tailWag);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.78, 0);
    tG.addColorStop(0, 'rgba(226, 172, 52, 0.90)');
    tG.addColorStop(0.55, 'rgba(248, 212, 102, 0.64)');
    tG.addColorStop(1, 'rgba(255, 242, 192, 0.20)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.04, -r * 0.07);
    ctx.bezierCurveTo(-r * 0.24, -r * 0.18, -r * 0.54, -r * 0.30, -r * 0.78, -r * 0.22);
    ctx.quadraticCurveTo(-r * 0.84, 0, -r * 0.78, r * 0.22);
    ctx.bezierCurveTo(-r * 0.54, r * 0.30, -r * 0.24, r * 0.18, r * 0.04, r * 0.07);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 248, 214, 0.45)';
    ctx.lineWidth = r * 0.015;
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-r * 0.74, i * r * 0.065);
      ctx.stroke();
    }
    ctx.restore();

    // Boxy tapered pentagonal/coffin-shaped armored carapace
    const bG = ctx.createRadialGradient(r * 0.16, -r * 0.08, r * 0.06, 0, 0, r * 0.90);
    bG.addColorStop(0, '#f4e65c');
    bG.addColorStop(0.45, '#d8b434');
    bG.addColorStop(0.82, '#a88422');
    bG.addColorStop(1, '#705818');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.74, -r * 0.16);
    ctx.quadraticCurveTo(r * 0.80, 0, r * 0.74, r * 0.16);
    ctx.lineTo(r * 0.48, r * 0.40);
    ctx.quadraticCurveTo(r * 0.32, r * 0.44, r * 0.12, r * 0.40);
    ctx.lineTo(-r * 0.44, r * 0.26);
    ctx.quadraticCurveTo(-r * 0.58, r * 0.20, -r * 0.60, r * 0.08);
    ctx.lineTo(-r * 0.60, -r * 0.08);
    ctx.quadraticCurveTo(-r * 0.58, -r * 0.20, -r * 0.44, -r * 0.26);
    ctx.lineTo(r * 0.12, -r * 0.40);
    ctx.quadraticCurveTo(r * 0.32, -r * 0.44, r * 0.48, -r * 0.40);
    ctx.closePath();
    ctx.fill();

    // Clipped iridescent pale-cyan speckles & sunlit dorsal ridge
    ctx.save();
    ctx.clip();
    const specs = [
      [0.44, -0.14], [0.44, 0.14], [0.24, -0.26], [0.24, 0.26], [0.16, 0.0],
      [-0.04, -0.18], [-0.04, 0.18], [-0.24, -0.10], [-0.24, 0.10], [-0.40, 0.0]
    ];
    for (const [sx, sy] of specs) {
      ctx.fillStyle = 'rgba(134, 240, 248, 0.68)';
      ctx.beginPath();
      ctx.arc(sx * r, sy * r, r * 0.044, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(255, 252, 210, 0.38)';
    ctx.beginPath();
    ctx.ellipse(r * 0.12, -r * 0.08, r * 0.42, r * 0.12, -0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Prominent curious cowfish eyes right behind the horn bases
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#a8f2e8';
      ctx.beginPath();
      ctx.arc(r * 0.50, s * r * 0.26, r * 0.088, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#121818';
      ctx.beginPath();
      ctx.arc(r * 0.518, s * r * 0.262, r * 0.054, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.54, s * r * 0.246, r * 0.022, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 17. FILEFISH — Elongated diamond-rhomboid seagrass-teal body with glowing tangerine spots & dorsal trigger spine
  filefish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 6.2 + speed * 2.5;
    const wag = Math.sin(t * freq) * 0.18;
    const ripple = Math.sin(t * freq * 1.4) * 0.26;

    // Shadow
    ctx.save();
    ctx.translate(-r * 0.05, r * 0.14);
    ctx.fillStyle = 'rgba(12, 28, 28, 0.16)';
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 1.12, r * 0.26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Small clear sculling pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.22, s * r * 0.18);
      ctx.rotate(s * (0.40 + ripple * s));
      ctx.fillStyle = 'rgba(182, 240, 232, 0.52)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(r * 0.08, s * r * 0.20, -r * 0.24, s * r * 0.22);
      ctx.quadraticCurveTo(-r * 0.14, s * r * 0.08, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Rounded warm-ochre fan tail
    ctx.save();
    ctx.translate(-r * 0.68, wag * r * 0.22);
    ctx.rotate(wag * 0.60);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.46, 0);
    tG.addColorStop(0, '#d89a38');
    tG.addColorStop(0.65, '#f0b848');
    tG.addColorStop(1, 'rgba(248, 214, 134, 0.35)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.04, -r * 0.06);
    ctx.bezierCurveTo(-r * 0.16, -r * 0.24, -r * 0.38, -r * 0.30, -r * 0.46, -r * 0.16);
    ctx.quadraticCurveTo(-r * 0.50, 0, -r * 0.46, r * 0.16);
    ctx.bezierCurveTo(-r * 0.38, r * 0.30, -r * 0.16, r * 0.24, r * 0.04, r * 0.06);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Elongated diamond-rhomboid filefish body with long tapered snout (+1.18r)
    const bG = ctx.createLinearGradient(r * 1.18, -r * 0.20, -r * 0.72, r * 0.20);
    bG.addColorStop(0, '#36b2a6');
    bG.addColorStop(0.45, '#1e8886');
    bG.addColorStop(0.85, '#1a646e');
    bG.addColorStop(1, '#124652');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 1.18, 0);
    ctx.bezierCurveTo(r * 0.90, -r * 0.10, r * 0.46, -r * 0.26, r * 0.02, -r * 0.27);
    ctx.bezierCurveTo(-r * 0.32, -r * 0.24, -r * 0.54, -r * 0.12, -r * 0.70, wag * r * 0.20 - r * 0.05);
    ctx.lineTo(-r * 0.70, wag * r * 0.20 + r * 0.05);
    ctx.bezierCurveTo(-r * 0.54, r * 0.12, -r * 0.32, r * 0.24, r * 0.02, r * 0.27);
    ctx.bezierCurveTo(r * 0.46, r * 0.26, r * 0.90, r * 0.10, r * 1.18, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped glowing tangerine-orange elongated spots
    ctx.save();
    ctx.clip();
    const spots = [
      [0.72, 0.0], [0.46, -0.10], [0.46, 0.10], [0.22, 0.0], [0.16, -0.17], [0.16, 0.17],
      [-0.08, -0.09], [-0.08, 0.09], [-0.30, 0.0], [-0.34, -0.15], [-0.34, 0.15], [-0.52, 0.0]
    ];
    for (const [sx, sy] of spots) {
      ctx.fillStyle = '#ff9626';
      ctx.beginPath();
      ctx.ellipse(sx * r, sy * r, r * 0.068, r * 0.036, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(184, 255, 245, 0.34)';
    ctx.beginPath();
    ctx.ellipse(r * 0.14, -r * 0.06, r * 0.44, r * 0.075, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Prominent dorsal trigger-spine ridge & undulating rear ribbon
    ctx.strokeStyle = '#ffbc48';
    ctx.lineWidth = r * 0.048;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.40, 0);
    ctx.lineTo(r * 0.14, 0);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(148, 236, 224, 0.72)';
    ctx.lineWidth = r * 0.056;
    ctx.beginPath();
    ctx.moveTo(r * 0.02, 0);
    ctx.bezierCurveTo(-r * 0.22, ripple * r * 0.28, -r * 0.42, -ripple * r * 0.28, -r * 0.62, wag * r * 0.20);
    ctx.stroke();

    // High-set golden-orange filefish eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#ffbe44';
      ctx.beginPath();
      ctx.arc(r * 0.52, s * r * 0.155, r * 0.072, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0c1618';
      ctx.beginPath();
      ctx.arc(r * 0.532, s * r * 0.158, r * 0.044, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.550, s * r * 0.144, r * 0.017, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 18. SURGEONFISH — Powder-blue athletic oval, golden dorsal crest, midnight face mask & lateral tail scalpels
  surgeonfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 5.4 + speed * 2.4;
    const wag = Math.sin(t * freq) * 0.20;
    const finRow = Math.sin(t * freq * 0.9) * 0.22;

    // Shadow
    ctx.save();
    ctx.translate(-r * 0.06, r * 0.14);
    ctx.fillStyle = 'rgba(10, 26, 44, 0.17)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.05, 0, r * 1.04, r * 0.34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Agile swept-back sky-blue pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.24, s * r * 0.23);
      ctx.rotate(s * (0.44 + finRow * s));
      const pG = ctx.createLinearGradient(0, 0, -r * 0.42, s * r * 0.34);
      pG.addColorStop(0, 'rgba(98, 206, 255, 0.84)');
      pG.addColorStop(1, 'rgba(202, 242, 255, 0.14)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.12, s * r * 0.22, -r * 0.14, s * r * 0.44, -r * 0.42, s * r * 0.28);
      ctx.quadraticCurveTo(-r * 0.22, s * r * 0.10, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Crescent lyre caudal fin in deep indigo & gold
    ctx.save();
    ctx.translate(-r * 0.64, wag * r * 0.24);
    ctx.rotate(wag * 0.66);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.56, 0);
    tG.addColorStop(0, '#ffe048');
    tG.addColorStop(0.45, '#1e3478');
    tG.addColorStop(0.85, '#3a84e8');
    tG.addColorStop(1, 'rgba(176, 230, 255, 0.45)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.06, -r * 0.06);
    ctx.bezierCurveTo(-r * 0.16, -r * 0.22, -r * 0.38, -r * 0.46, -r * 0.58, -r * 0.40);
    ctx.quadraticCurveTo(-r * 0.32, -r * 0.14, -r * 0.28, 0);
    ctx.quadraticCurveTo(-r * 0.32, r * 0.14, -r * 0.58, r * 0.40);
    ctx.bezierCurveTo(-r * 0.38, r * 0.46, -r * 0.16, r * 0.22, r * 0.06, r * 0.06);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Smooth athletic oval-fusiform Powder Blue Surgeonfish body
    const bG = ctx.createRadialGradient(r * 0.14, -r * 0.06, r * 0.04, 0, 0, r * 0.94);
    bG.addColorStop(0, '#a6ecff');
    bG.addColorStop(0.45, '#4ac0f2');
    bG.addColorStop(0.85, '#1e88c8');
    bG.addColorStop(1, '#12568c');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.92, 0);
    ctx.bezierCurveTo(r * 0.80, -r * 0.26, r * 0.34, -r * 0.34, -r * 0.12, -r * 0.28);
    ctx.bezierCurveTo(-r * 0.42, -r * 0.22, -r * 0.54, -r * 0.10, -r * 0.68, wag * r * 0.22 - r * 0.05);
    ctx.lineTo(-r * 0.68, wag * r * 0.22 + r * 0.05);
    ctx.bezierCurveTo(-r * 0.54, r * 0.10, -r * 0.42, r * 0.22, -r * 0.12, r * 0.28);
    ctx.bezierCurveTo(r * 0.34, r * 0.34, r * 0.80, r * 0.26, r * 0.92, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped midnight-blue face mask, white collar & sunlit sheen
    ctx.save();
    ctx.clip();
    ctx.fillStyle = '#182042';
    ctx.beginPath();
    ctx.ellipse(r * 0.72, 0, r * 0.28, r * 0.30, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.86)';
    ctx.lineWidth = r * 0.065;
    ctx.beginPath();
    ctx.arc(r * 0.72, 0, r * 0.30, Math.PI * 0.62, Math.PI * 1.38);
    ctx.stroke();

    ctx.fillStyle = 'rgba(220, 252, 255, 0.46)';
    ctx.beginPath();
    ctx.ellipse(r * 0.08, -r * 0.07, r * 0.42, r * 0.09, -0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Iconic lateral bright-gold scalpel spines flanking the tail peduncle
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#ffe652';
      ctx.beginPath();
      ctx.moveTo(-r * 0.48, s * r * 0.12);
      ctx.lineTo(-r * 0.64, s * r * 0.16);
      ctx.lineTo(-r * 0.56, s * r * 0.07);
      ctx.closePath();
      ctx.fill();
    }

    // Vivid sunlit-gold dorsal crest along the spine
    ctx.strokeStyle = '#ffdf38';
    ctx.lineWidth = r * 0.082;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.32, 0);
    ctx.quadraticCurveTo(-r * 0.12, -wag * r * 0.22, -r * 0.54, wag * r * 0.20);
    ctx.stroke();

    // Eyes set in midnight face mask
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#7ce2ff';
      ctx.beginPath();
      ctx.arc(r * 0.64, s * r * 0.155, r * 0.072, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#090c18';
      ctx.beginPath();
      ctx.arc(r * 0.65, s * r * 0.158, r * 0.044, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.668, s * r * 0.145, r * 0.018, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 19. LUMPFISH — Plump bulbous tadpole-like globose body with 3 rows of 3D cartilaginous bumps/tubercles
  lumpfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 5.2 + speed * 2.2;
    const wag = Math.sin(t * freq) * 0.22;
    const finRow = Math.sin(t * freq * 0.85) * 0.20;

    // Plump shadow
    ctx.save();
    ctx.translate(-r * 0.06, r * 0.18);
    ctx.fillStyle = 'rgba(16, 30, 32, 0.20)';
    ctx.beginPath();
    ctx.ellipse(r * 0.04, 0, r * 0.96, r * 0.56, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Broad fan-like rounded seafoam pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.24, s * r * 0.42);
      ctx.rotate(s * (0.36 + finRow * s));
      const pG = ctx.createRadialGradient(0, 0, r * 0.04, -r * 0.08, s * r * 0.22, r * 0.44);
      pG.addColorStop(0, 'rgba(104, 178, 166, 0.86)');
      pG.addColorStop(0.65, 'rgba(154, 212, 198, 0.56)');
      pG.addColorStop(1, 'rgba(218, 240, 232, 0.16)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(r * 0.06, 0);
      ctx.bezierCurveTo(r * 0.22, s * r * 0.18, r * 0.02, s * r * 0.44, -r * 0.26, s * r * 0.36);
      ctx.bezierCurveTo(-r * 0.30, s * r * 0.18, -r * 0.14, s * r * 0.06, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Short stubby rounded tail wagging briskly
    ctx.save();
    ctx.translate(-r * 0.62, wag * r * 0.20);
    ctx.rotate(wag * 0.72);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.40, 0);
    tG.addColorStop(0, 'rgba(92, 156, 152, 0.88)');
    tG.addColorStop(1, 'rgba(176, 218, 208, 0.32)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.06, -r * 0.08);
    ctx.bezierCurveTo(-r * 0.12, -r * 0.22, -r * 0.32, -r * 0.26, -r * 0.40, -r * 0.12);
    ctx.quadraticCurveTo(-r * 0.44, 0, -r * 0.40, r * 0.12);
    ctx.bezierCurveTo(-r * 0.32, r * 0.26, -r * 0.12, r * 0.22, r * 0.06, r * 0.08);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Adorably plump, bulbous, tadpole-like globose body
    const bG = ctx.createRadialGradient(r * 0.22, -r * 0.10, r * 0.08, r * 0.10, 0, r * 0.94);
    bG.addColorStop(0, '#9ad8c6');
    bG.addColorStop(0.42, '#5aa49e');
    bG.addColorStop(0.78, '#387076');
    bG.addColorStop(1, '#244852');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.82, 0);
    ctx.bezierCurveTo(r * 0.82, -r * 0.44, r * 0.36, -r * 0.58, -r * 0.04, -r * 0.44);
    ctx.bezierCurveTo(-r * 0.34, -r * 0.34, -r * 0.50, -r * 0.16, -r * 0.64, wag * r * 0.18 - r * 0.08);
    ctx.lineTo(-r * 0.64, wag * r * 0.18 + r * 0.08);
    ctx.bezierCurveTo(-r * 0.50, r * 0.16, -r * 0.34, r * 0.34, -r * 0.04, r * 0.44);
    ctx.bezierCurveTo(r * 0.36, r * 0.58, r * 0.82, r * 0.44, r * 0.82, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped watercolor blush-ochre mottling & 3 longitudinal rows of 3D tubercles/bumps
    ctx.save();
    ctx.clip();
    const blushG = ctx.createRadialGradient(-r * 0.10, r * 0.16, r * 0.04, -r * 0.05, r * 0.12, r * 0.48);
    blushG.addColorStop(0, 'rgba(232, 168, 128, 0.38)');
    blushG.addColorStop(1, 'rgba(232, 168, 128, 0)');
    ctx.fillStyle = blushG;
    ctx.fillRect(-r, -r, r * 2, r * 2);

    const drawBump = (bx, by, br) => {
      const bmG = ctx.createRadialGradient(bx + br * 0.3, by - br * 0.3, br * 0.1, bx, by, br);
      bmG.addColorStop(0, '#d8f6ec');
      bmG.addColorStop(0.55, '#6eb4ac');
      bmG.addColorStop(1, 'rgba(26, 62, 70, 0.68)');
      ctx.fillStyle = bmG;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    };
    // Center dorsal ridge tubercles
    for (let i = 0; i < 6; i++) {
      drawBump(r * (0.44 - i * 0.18), 0, r * (0.075 - i * 0.006));
    }
    // Two lateral tubercle ridges
    for (const s of [-1, 1]) {
      for (let i = 0; i < 5; i++) {
        drawBump(r * (0.36 - i * 0.19), s * r * (0.30 - i * 0.036), r * (0.068 - i * 0.005));
      }
    }
    ctx.restore();

    // Curious wide-set amber lumpfish eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#f2b858';
      ctx.beginPath();
      ctx.ellipse(r * 0.56, s * r * 0.28, r * 0.095, r * 0.080, s * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#10181c';
      ctx.beginPath();
      ctx.arc(r * 0.578, s * r * 0.282, r * 0.058, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.60, s * r * 0.264, r * 0.024, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 20. LANTERNFISH — Abyssal midnight-indigo deep-sea myctophid with pulsing bioluminescent cyan photophores
  lanternfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 5.6 + speed * 2.4;
    const wag = Math.sin(t * freq) * 0.22;
    const pulse = 0.72 + Math.sin(t * 3.2) * 0.28;

    // Deep subtle shadow
    ctx.save();
    ctx.translate(-r * 0.05, r * 0.14);
    ctx.fillStyle = 'rgba(6, 10, 26, 0.22)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.05, 0, r * 1.02, r * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Diaphanous smoky-blue pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.26, s * r * 0.18);
      ctx.rotate(s * (0.46 + Math.sin(t * freq * 0.9) * 0.20));
      const pG = ctx.createLinearGradient(0, 0, -r * 0.36, s * r * 0.30);
      pG.addColorStop(0, 'rgba(98, 142, 232, 0.65)');
      pG.addColorStop(1, 'rgba(138, 224, 255, 0.08)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.08, s * r * 0.20, -r * 0.12, s * r * 0.36, -r * 0.36, s * r * 0.24);
      ctx.quadraticCurveTo(-r * 0.18, s * r * 0.08, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Deeply forked gossamer caudal fin
    ctx.save();
    ctx.translate(-r * 0.68, wag * r * 0.26);
    ctx.rotate(wag * 0.72);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.54, 0);
    tG.addColorStop(0, 'rgba(56, 86, 184, 0.84)');
    tG.addColorStop(0.55, 'rgba(96, 178, 248, 0.45)');
    tG.addColorStop(1, 'rgba(148, 242, 255, 0.14)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.04, -r * 0.05);
    ctx.bezierCurveTo(-r * 0.16, -r * 0.20, -r * 0.38, -r * 0.40, -r * 0.54, -r * 0.36);
    ctx.quadraticCurveTo(-r * 0.30, -r * 0.10, -r * 0.24, 0);
    ctx.quadraticCurveTo(-r * 0.30, r * 0.10, -r * 0.54, r * 0.36);
    ctx.bezierCurveTo(-r * 0.38, r * 0.40, -r * 0.16, r * 0.20, r * 0.04, r * 0.05);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Sleek deep-sea fusiform body with blunt big-eyed head
    const bG = ctx.createLinearGradient(r * 0.88, -r * 0.24, -r * 0.72, r * 0.24);
    bG.addColorStop(0, '#2e4696');
    bG.addColorStop(0.35, '#1a2868');
    bG.addColorStop(0.75, '#121844');
    bG.addColorStop(1, '#0c0e2c');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.88, 0);
    ctx.bezierCurveTo(r * 0.84, -r * 0.24, r * 0.42, -r * 0.28, -r * 0.06, -r * 0.21);
    ctx.bezierCurveTo(-r * 0.38, -r * 0.16, -r * 0.54, -r * 0.08, -r * 0.70, wag * r * 0.24 - r * 0.04);
    ctx.lineTo(-r * 0.70, wag * r * 0.24 + r * 0.04);
    ctx.bezierCurveTo(-r * 0.54, r * 0.08, -r * 0.38, r * 0.16, -r * 0.06, r * 0.21);
    ctx.bezierCurveTo(r * 0.42, r * 0.28, r * 0.84, r * 0.24, r * 0.88, 0);
    ctx.closePath();
    ctx.fill();

    // Iridescent violet-silver dorsal sheen
    ctx.save();
    ctx.clip();
    const shG = ctx.createRadialGradient(r * 0.18, -r * 0.05, r * 0.02, r * 0.10, 0, r * 0.62);
    shG.addColorStop(0, 'rgba(168, 212, 255, 0.46)');
    shG.addColorStop(0.6, 'rgba(116, 98, 224, 0.24)');
    shG.addColorStop(1, 'rgba(18, 20, 62, 0)');
    ctx.fillStyle = shG;
    ctx.fillRect(-r, -r, r * 2, r * 2);
    ctx.restore();

    // Glowing nasal headlight organ + flank bioluminescent photophore orbs
    const drawPhotophore = (px, py, pr, intensity) => {
      const g = ctx.createRadialGradient(px, py, 0, px, py, pr * 2.8);
      g.addColorStop(0, `rgba(220, 255, 255, ${0.95 * intensity})`);
      g.addColorStop(0.35, `rgba(42, 238, 255, ${0.72 * intensity})`);
      g.addColorStop(1, 'rgba(20, 140, 255, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, pr * 2.8, 0, Math.PI * 2);
      ctx.fill();
    };

    // Nasal headlight
    drawPhotophore(r * 0.84, 0, r * 0.052, pulse);

    // Flank photophore rows & glowing tail peduncle organ
    for (const s of [-1, 1]) {
      const coords = [
        [0.34, 0.20], [0.12, 0.21], [-0.10, 0.18], [-0.32, 0.13], [-0.52, 0.08]
      ];
      coords.forEach(([cx, cy], idx) => {
        const localPulse = 0.65 + Math.sin(t * 3.8 - idx * 0.6) * 0.35;
        drawPhotophore(cx * r, s * cy * r + (idx > 2 ? wag * r * 0.12 : 0), r * 0.036, localPulse);
      });
    }
    drawPhotophore(-r * 0.62, wag * r * 0.22, r * 0.048, pulse);

    // Large luminous silvery-cyan deep-sea eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#8ef4ff';
      ctx.beginPath();
      ctx.ellipse(r * 0.58, s * r * 0.165, r * 0.105, r * 0.082, s * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#09142c';
      ctx.beginPath();
      ctx.arc(r * 0.595, s * r * 0.168, r * 0.062, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e8ffff';
      ctx.beginPath();
      ctx.arc(r * 0.62, s * r * 0.150, r * 0.025, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 21. KOIFISH — Lush painted pond Kohaku/Sanke Koi with sweeping vermilion calico blotches, sumi ink & barbels
  koifish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 3.6 + speed * 1.7;
    const wag = Math.sin(t * freq) * 0.22;
    const wag2 = Math.sin(t * freq - 0.95) * 0.30;
    const finSweep = Math.sin(t * freq * 0.72) * 0.14;

    // Soft pond floor shadow
    ctx.save();
    ctx.translate(-r * 0.08, r * 0.20);
    ctx.fillStyle = 'rgba(12, 26, 30, 0.18)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.06, 0, r * 1.24, r * 0.44, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Delicate curved fleshy koi barbels (whiskers) at snout
    ctx.strokeStyle = 'rgba(246, 224, 206, 0.85)';
    ctx.lineWidth = r * 0.024;
    ctx.lineCap = 'round';
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(r * 0.92, s * r * 0.08);
      ctx.quadraticCurveTo(r * 1.06, s * r * 0.20, r * 1.12, s * r * 0.30);
      ctx.stroke();
    }

    // Broad graceful wing-like translucent porcelain-white pectoral fins with vermilion shoulder blush
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.34, s * r * 0.30);
      ctx.rotate(s * (0.34 + finSweep * s));
      const pG = ctx.createRadialGradient(0, 0, r * 0.04, -r * 0.10, s * r * 0.32, r * 0.66);
      pG.addColorStop(0, 'rgba(236, 74, 34, 0.72)');
      pG.addColorStop(0.28, 'rgba(255, 250, 244, 0.84)');
      pG.addColorStop(0.75, 'rgba(244, 248, 252, 0.48)');
      pG.addColorStop(1, 'rgba(255, 255, 255, 0.12)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(r * 0.06, 0);
      ctx.bezierCurveTo(r * 0.24, s * r * 0.28, -r * 0.06, s * r * 0.68, -r * 0.44, s * r * 0.50);
      ctx.bezierCurveTo(-r * 0.38, s * r * 0.26, -r * 0.20, s * r * 0.10, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.58)';
      ctx.lineWidth = r * 0.017;
      for (let i = 1; i <= 6; i++) {
        const f = i / 7;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(r * (0.04 - f * 0.16), s * r * (0.22 + f * 0.18), -r * (0.02 + f * 0.38), s * r * (0.56 - f * 0.12));
        ctx.stroke();
      }
      ctx.restore();
    }

    // Sweeping translucent porcelain forked koi tail
    ctx.save();
    ctx.translate(-r * 0.72, wag * r * 0.28);
    ctx.rotate(wag2 * 0.58);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.78, 0);
    tG.addColorStop(0, 'rgba(252, 246, 238, 0.90)');
    tG.addColorStop(0.55, 'rgba(245, 248, 252, 0.56)');
    tG.addColorStop(1, 'rgba(255, 255, 255, 0.14)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.08, -r * 0.08);
    ctx.bezierCurveTo(-r * 0.20, -r * 0.26, -r * 0.50, -r * 0.54, -r * 0.78, -r * 0.44);
    ctx.bezierCurveTo(-r * 0.58, -r * 0.20, -r * 0.44, -r * 0.08, -r * 0.38, 0);
    ctx.bezierCurveTo(-r * 0.44, r * 0.08, -r * 0.58, r * 0.20, -r * 0.78, r * 0.44);
    ctx.bezierCurveTo(-r * 0.50, r * 0.54, -r * 0.20, r * 0.26, r * 0.08, r * 0.08);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.52)';
    ctx.lineWidth = r * 0.016;
    for (let i = -4; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-r * 0.34, i * r * 0.06, -r * (0.70 - Math.abs(i) * 0.03), i * r * 0.095);
      ctx.stroke();
    }
    ctx.restore();

    // Stately broad-shouldered pond koi silhouette
    const bG = ctx.createRadialGradient(r * 0.22, -r * 0.08, r * 0.06, r * 0.04, 0, r * 1.06);
    bG.addColorStop(0, '#ffffff');
    bG.addColorStop(0.55, '#f6f2ea');
    bG.addColorStop(0.88, '#dce2e6');
    bG.addColorStop(1, '#b6c2ca');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 1.00, 0);
    ctx.bezierCurveTo(r * 0.92, -r * 0.28, r * 0.46, -r * 0.38, -r * 0.04, -r * 0.31);
    ctx.bezierCurveTo(-r * 0.38, -r * 0.24, -r * 0.56, -r * 0.13, -r * 0.74, wag * r * 0.26 - r * 0.07);
    ctx.lineTo(-r * 0.74, wag * r * 0.26 + r * 0.07);
    ctx.bezierCurveTo(-r * 0.56, r * 0.13, -r * 0.38, r * 0.24, -r * 0.04, r * 0.31);
    ctx.bezierCurveTo(r * 0.46, r * 0.38, r * 0.92, r * 0.28, r * 1.00, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped sweeping Kohaku vermilion-scarlet calico markings & Sanke sumi ink accents
    ctx.save();
    ctx.clip();
    // Tancho / head crimson patch
    const k1 = ctx.createRadialGradient(r * 0.62, -r * 0.04, r * 0.04, r * 0.62, 0, r * 0.26);
    k1.addColorStop(0, '#ff4e1c');
    k1.addColorStop(0.8, '#dc260e');
    k1.addColorStop(1, '#b81a0a');
    ctx.fillStyle = k1;
    ctx.beginPath();
    ctx.ellipse(r * 0.62, -r * 0.02, r * 0.22, r * 0.17, 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Sweeping mid-dorsal vermilion calico saddle
    const k2 = ctx.createLinearGradient(r * 0.26, -r * 0.32, -r * 0.26, r * 0.32);
    k2.addColorStop(0, '#ff5622');
    k2.addColorStop(0.5, '#e22a10');
    k2.addColorStop(1, '#b61c0a');
    ctx.fillStyle = k2;
    ctx.beginPath();
    ctx.moveTo(r * 0.30, -r * 0.38);
    ctx.bezierCurveTo(r * 0.38, -r * 0.06, r * 0.16, r * 0.14, r * 0.02, r * 0.36);
    ctx.lineTo(-r * 0.34, r * 0.32);
    ctx.bezierCurveTo(-r * 0.22, r * 0.02, -r * 0.40, -r * 0.18, -r * 0.16, -r * 0.36);
    ctx.closePath();
    ctx.fill();

    // Rear crimson tail-base patch
    ctx.fillStyle = '#d82812';
    ctx.beginPath();
    ctx.ellipse(-r * 0.56, r * 0.04, r * 0.16, r * 0.14, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Sanke sumi (soft ink-charcoal) calligraphic spots
    ctx.fillStyle = 'rgba(28, 30, 36, 0.86)';
    ctx.beginPath();
    ctx.ellipse(r * 0.18, -r * 0.16, r * 0.10, r * 0.068, -0.3, 0, Math.PI * 2);
    ctx.ellipse(-r * 0.26, r * 0.14, r * 0.11, r * 0.072, 0.4, 0, Math.PI * 2);
    ctx.ellipse(-r * 0.44, -r * 0.06, r * 0.07, r * 0.048, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Sunlit glossy dorsal highlight
    const glG = ctx.createLinearGradient(r * 0.65, -r * 0.18, -r * 0.35, r * 0.08);
    glG.addColorStop(0, 'rgba(255, 255, 250, 0.56)');
    glG.addColorStop(1, 'rgba(255, 255, 250, 0)');
    ctx.fillStyle = glG;
    ctx.beginPath();
    ctx.ellipse(r * 0.16, -r * 0.09, r * 0.54, r * 0.11, -0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Flowing porcelain dorsal fin ribbon
    ctx.strokeStyle = 'rgba(255, 252, 246, 0.78)';
    ctx.lineWidth = r * 0.082;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.16, 0);
    ctx.quadraticCurveTo(-r * 0.18, -wag * r * 0.34, -r * 0.54, wag * r * 0.24);
    ctx.stroke();

    // Expressive koi eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#f2e8dc';
      ctx.beginPath();
      ctx.ellipse(r * 0.72, s * r * 0.20, r * 0.082, r * 0.064, s * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#121216';
      ctx.beginPath();
      ctx.arc(r * 0.735, s * r * 0.204, r * 0.048, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.755, s * r * 0.190, r * 0.020, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 22. CARPFISH — Heavy-bodied wild golden-bronze river carp with overlapping painted diamond scales & barbels
  carpfish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 3.8 + speed * 1.8;
    const wag = Math.sin(t * freq) * 0.20;
    const wag2 = Math.sin(t * freq - 0.9) * 0.26;
    const finSweep = Math.sin(t * freq * 0.75) * 0.14;

    // Shadow
    ctx.save();
    ctx.translate(-r * 0.08, r * 0.20);
    ctx.fillStyle = 'rgba(16, 24, 18, 0.20)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.06, 0, r * 1.20, r * 0.46, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Prominent sensory barbels
    ctx.strokeStyle = 'rgba(182, 134, 68, 0.86)';
    ctx.lineWidth = r * 0.028;
    ctx.lineCap = 'round';
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(r * 0.88, s * r * 0.10);
      ctx.quadraticCurveTo(r * 1.04, s * r * 0.22, r * 1.12, s * r * 0.32);
      ctx.stroke();
    }

    // Sturdy amber-smoke pectoral fins
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.30, s * r * 0.34);
      ctx.rotate(s * (0.38 + finSweep * s));
      const pG = ctx.createRadialGradient(0, 0, r * 0.04, -r * 0.10, s * r * 0.28, r * 0.56);
      pG.addColorStop(0, 'rgba(148, 102, 42, 0.86)');
      pG.addColorStop(0.6, 'rgba(188, 136, 62, 0.58)');
      pG.addColorStop(1, 'rgba(220, 178, 104, 0.18)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(r * 0.04, 0);
      ctx.bezierCurveTo(r * 0.20, s * r * 0.24, -r * 0.06, s * r * 0.56, -r * 0.38, s * r * 0.42);
      ctx.bezierCurveTo(-r * 0.34, s * r * 0.22, -r * 0.18, s * r * 0.08, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(242, 206, 138, 0.42)';
      ctx.lineWidth = r * 0.017;
      for (let i = 1; i <= 5; i++) {
        const f = i / 6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-r * (0.04 + f * 0.30), s * r * (0.46 - f * 0.08));
        ctx.stroke();
      }
      ctx.restore();
    }

    // Powerful deeply notched copper-amber caudal fin
    ctx.save();
    ctx.translate(-r * 0.70, wag * r * 0.26);
    ctx.rotate(wag2 * 0.56);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.68, 0);
    tG.addColorStop(0, '#966224');
    tG.addColorStop(0.55, '#c48636');
    tG.addColorStop(1, 'rgba(218, 168, 92, 0.38)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.08, -r * 0.09);
    ctx.bezierCurveTo(-r * 0.18, -r * 0.26, -r * 0.44, -r * 0.48, -r * 0.68, -r * 0.40);
    ctx.quadraticCurveTo(-r * 0.44, -r * 0.12, -r * 0.36, 0);
    ctx.quadraticCurveTo(-r * 0.44, r * 0.12, -r * 0.68, r * 0.40);
    ctx.bezierCurveTo(-r * 0.44, r * 0.48, -r * 0.18, r * 0.26, r * 0.08, r * 0.09);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Heavy-bodied robust thick-shouldered river carp silhouette
    const bG = ctx.createRadialGradient(r * 0.20, -r * 0.10, r * 0.06, 0, 0, r * 1.04);
    bG.addColorStop(0, '#d8b45c');
    bG.addColorStop(0.38, '#a47e34');
    bG.addColorStop(0.75, '#6e5826');
    bG.addColorStop(1, '#44381a');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.96, 0);
    ctx.bezierCurveTo(r * 0.90, -r * 0.34, r * 0.42, -r * 0.44, -r * 0.06, -r * 0.36);
    ctx.bezierCurveTo(-r * 0.40, -r * 0.28, -r * 0.56, -r * 0.15, -r * 0.72, wag * r * 0.24 - r * 0.08);
    ctx.lineTo(-r * 0.72, wag * r * 0.24 + r * 0.08);
    ctx.bezierCurveTo(-r * 0.56, r * 0.15, -r * 0.40, r * 0.28, -r * 0.06, r * 0.36);
    ctx.bezierCurveTo(r * 0.42, r * 0.44, r * 0.90, r * 0.34, r * 0.96, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped intricate overlapping bronze-gold diamond scales & sunlit sheen
    ctx.save();
    ctx.clip();
    for (let row = -3; row <= 3; row++) {
      for (let col = -4; col <= 3; col++) {
        const sx = col * r * 0.16 + (Math.abs(row) % 2) * r * 0.08;
        const sy = row * r * 0.115;
        ctx.strokeStyle = 'rgba(46, 32, 12, 0.38)';
        ctx.lineWidth = r * 0.020;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 0.082, -Math.PI * 0.48, Math.PI * 0.48);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 226, 138, 0.34)';
        ctx.lineWidth = r * 0.014;
        ctx.beginPath();
        ctx.arc(sx - r * 0.015, sy - r * 0.01, r * 0.072, -Math.PI * 0.38, Math.PI * 0.38);
        ctx.stroke();
      }
    }

    const glG = ctx.createLinearGradient(r * 0.55, -r * 0.22, -r * 0.35, r * 0.10);
    glG.addColorStop(0, 'rgba(255, 240, 184, 0.44)');
    glG.addColorStop(1, 'rgba(255, 240, 184, 0)');
    ctx.fillStyle = glG;
    ctx.beginPath();
    ctx.ellipse(r * 0.14, -r * 0.11, r * 0.50, r * 0.13, -0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Long undulating olive-bronze dorsal fin ribbon
    ctx.strokeStyle = 'rgba(138, 102, 42, 0.85)';
    ctx.lineWidth = r * 0.092;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.28, 0);
    ctx.quadraticCurveTo(-r * 0.14, -wag * r * 0.28, -r * 0.54, wag * r * 0.22);
    ctx.stroke();

    // Warm golden-amber carp eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#d8a648';
      ctx.beginPath();
      ctx.ellipse(r * 0.68, s * r * 0.23, r * 0.088, r * 0.070, s * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#141008';
      ctx.beginPath();
      ctx.arc(r * 0.695, s * r * 0.234, r * 0.052, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.716, s * r * 0.218, r * 0.020, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // 23. PLECOFISH — Wide flattened spade suction head, armored dorsal scutes & huge wing-like spined pectorals
  plecofish(ctx, r, t = 0, speed = 1) {
    ctx.save();
    const freq = 4.4 + speed * 2.0;
    const wag = Math.sin(t * freq) * 0.18;
    const wag2 = Math.sin(t * freq - 0.85) * 0.26;
    const finFlex = Math.sin(t * freq * 0.7) * 0.08;

    // Wide grounded bottom-dweller shadow
    ctx.save();
    ctx.translate(-r * 0.06, r * 0.18);
    ctx.fillStyle = 'rgba(14, 16, 14, 0.24)';
    ctx.beginPath();
    ctx.ellipse(r * 0.02, 0, r * 1.20, r * 0.62, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Huge wide-splayed triangular wing-like pectoral fins with thick armored leading rays
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.34, s * r * 0.34);
      ctx.rotate(s * (0.16 + finFlex * s));
      const pG = ctx.createLinearGradient(0, 0, -r * 0.38, s * r * 0.56);
      pG.addColorStop(0, '#4c3824');
      pG.addColorStop(0.55, '#6e5234');
      pG.addColorStop(1, 'rgba(138, 108, 68, 0.42)');
      ctx.fillStyle = pG;
      ctx.beginPath();
      ctx.moveTo(r * 0.12, 0);
      ctx.bezierCurveTo(r * 0.16, s * r * 0.32, -r * 0.04, s * r * 0.66, -r * 0.36, s * r * 0.56);
      ctx.bezierCurveTo(-r * 0.42, s * r * 0.34, -r * 0.24, s * r * 0.14, -r * 0.12, 0);
      ctx.closePath();
      ctx.fill();

      // Thick armored leading pectoral spine & mottled rays
      ctx.strokeStyle = '#9c7c4e';
      ctx.lineWidth = r * 0.048;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(r * 0.10, 0);
      ctx.quadraticCurveTo(r * 0.10, s * r * 0.34, -r * 0.24, s * r * 0.56);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(210, 176, 118, 0.40)';
      ctx.lineWidth = r * 0.018;
      for (let i = 1; i <= 5; i++) {
        const f = i / 6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-r * (0.04 + f * 0.30), s * r * (0.54 - f * 0.14));
        ctx.stroke();
      }
      ctx.restore();
    }

    // Secondary prominent pelvic fins behind the pectorals
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(-r * 0.14, s * r * 0.24);
      ctx.rotate(s * (0.34 - finFlex * s));
      ctx.fillStyle = 'rgba(84, 62, 40, 0.84)';
      ctx.beginPath();
      ctx.moveTo(r * 0.04, 0);
      ctx.bezierCurveTo(r * 0.06, s * r * 0.20, -r * 0.12, s * r * 0.36, -r * 0.30, s * r * 0.26);
      ctx.quadraticCurveTo(-r * 0.22, s * r * 0.10, -r * 0.06, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Angled lunate armored tail fin
    ctx.save();
    ctx.translate(-r * 0.78, wag * r * 0.24);
    ctx.rotate(wag2 * 0.52);
    const tG = ctx.createLinearGradient(0, 0, -r * 0.56, 0);
    tG.addColorStop(0, '#443220');
    tG.addColorStop(0.65, '#705436');
    tG.addColorStop(1, 'rgba(154, 122, 78, 0.42)');
    ctx.fillStyle = tG;
    ctx.beginPath();
    ctx.moveTo(r * 0.06, -r * 0.06);
    ctx.bezierCurveTo(-r * 0.16, -r * 0.18, -r * 0.38, -r * 0.38, -r * 0.56, -r * 0.32);
    ctx.quadraticCurveTo(-r * 0.36, 0, -r * 0.56, r * 0.34);
    ctx.bezierCurveTo(-r * 0.38, r * 0.40, -r * 0.16, r * 0.18, r * 0.06, r * 0.06);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Unmistakable wide flattened triangular-spade suction head tapering to bony armored tail
    const bG = ctx.createRadialGradient(r * 0.32, -r * 0.06, r * 0.08, 0, 0, r * 1.08);
    bG.addColorStop(0, '#7c5e3c');
    bG.addColorStop(0.45, '#523c26');
    bG.addColorStop(0.82, '#342416');
    bG.addColorStop(1, '#20160e');
    ctx.fillStyle = bG;
    ctx.beginPath();
    ctx.moveTo(r * 0.94, 0);
    ctx.bezierCurveTo(r * 0.92, -r * 0.36, r * 0.62, -r * 0.48, r * 0.22, -r * 0.40);
    ctx.bezierCurveTo(-r * 0.14, -r * 0.30, -r * 0.50, -r * 0.16, -r * 0.80, wag * r * 0.22 - r * 0.06);
    ctx.lineTo(-r * 0.80, wag * r * 0.22 + r * 0.06);
    ctx.bezierCurveTo(-r * 0.50, r * 0.16, -r * 0.14, r * 0.30, r * 0.22, r * 0.40);
    ctx.bezierCurveTo(r * 0.62, r * 0.48, r * 0.92, r * 0.36, r * 0.94, 0);
    ctx.closePath();
    ctx.fill();

    // Clipped overlapping armored dorsal scutes & golden-ochre leopard mottling
    ctx.save();
    ctx.clip();
    // Leopard/marbled ochre mottling
    const mottles = [
      [0.64, -0.18, 0.08], [0.64, 0.18, 0.08], [0.46, 0.0, 0.10],
      [0.24, -0.22, 0.09], [0.24, 0.22, 0.09], [0.04, 0.0, 0.09],
      [-0.18, -0.14, 0.08], [-0.18, 0.14, 0.08], [-0.42, 0.0, 0.07], [-0.62, 0.0, 0.06]
    ];
    for (const [mx, my, mr] of mottles) {
      ctx.fillStyle = 'rgba(186, 144, 82, 0.42)';
      ctx.beginPath();
      ctx.ellipse(mx * r, my * r, mr * r * 1.2, mr * r * 0.78, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Overlapping bony armor scute chevrons with specular ridges
    for (let i = 0; i < 7; i++) {
      const sx = r * (0.28 - i * 0.155);
      const sw = r * (0.36 - i * 0.042);
      ctx.strokeStyle = 'rgba(24, 16, 10, 0.55)';
      ctx.lineWidth = r * 0.032;
      ctx.beginPath();
      ctx.moveTo(sx - r * 0.06, -sw);
      ctx.quadraticCurveTo(sx + r * 0.08, 0, sx - r * 0.06, sw);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(212, 178, 122, 0.32)';
      ctx.lineWidth = r * 0.016;
      ctx.beginPath();
      ctx.moveTo(sx - r * 0.04, -sw * 0.9);
      ctx.quadraticCurveTo(sx + r * 0.09, 0, sx - r * 0.04, sw * 0.9);
      ctx.stroke();
    }
    ctx.restore();

    // Sweeping sail-like armored dorsal ridge fin
    ctx.strokeStyle = 'rgba(124, 96, 60, 0.88)';
    ctx.lineWidth = r * 0.078;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.22, 0);
    ctx.quadraticCurveTo(-r * 0.14, -wag * r * 0.20, -r * 0.52, wag * r * 0.18);
    ctx.stroke();

    // Small high-set dark-amber armored eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#b48a4a';
      ctx.beginPath();
      ctx.ellipse(r * 0.54, s * r * 0.21, r * 0.072, r * 0.056, s * 0.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#120c08';
      ctx.beginPath();
      ctx.arc(r * 0.55, s * r * 0.212, r * 0.042, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 245, 224, 0.86)';
      ctx.beginPath();
      ctx.arc(r * 0.568, s * r * 0.200, r * 0.016, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
};

  return module.exports;
})();

const PAINTED_FISH_2 = (() => {
  const module = { exports: {} };
  const exports = module.exports;
'use strict';

/**
 * Handcrafted top-down 2D Canvas painted illustrations for 22 distinct aquatic species.
 * Coordinate contract:
 *   - ctx is translated to (0, 0) and rotated facing RIGHT (+X nose, -X tail).
 *   - r is base radius (~30px).
 *   - t is animation time in seconds; speed is swimming speed multiplier.
 * Every species is individually handcrafted with unique overhead anatomy, fin geometry,
 * multi-stop painted gradients, organic textures, and glossy dorsal water sheen.
 */

module.exports = {
  /**
   * 1. TROUT (Rainbow Trout)
   * Sleek fusiform torpedo, olive-emerald speckled back, rose-pink lateral bands,
   * signature salmonid adipose fin, gently forked square-ish spotted tail.
   */
  troutfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const wag = Math.sin(time * (4.5 + spd * 2.2)) * (0.14 + Math.min(spd, 2) * 0.06);
    const finRow = Math.sin(time * (4.0 + spd * 1.6)) * 0.14;

    // Soft underwater contact shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.32 * r, 0.44 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(8, 28, 32, 0.24)';
    ctx.fill();
    ctx.restore();

    // Swept translucent amber-olive pectoral fins
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.42 * r, side * 0.28 * r);
      ctx.rotate(side * (0.48 + finRow * side));
      const pGrad = ctx.createLinearGradient(0, 0, -0.58 * r, side * 0.56 * r);
      pGrad.addColorStop(0, 'rgba(136, 152, 114, 0.85)');
      pGrad.addColorStop(0.55, 'rgba(196, 178, 134, 0.62)');
      pGrad.addColorStop(1, 'rgba(232, 224, 198, 0.22)');
      ctx.beginPath();
      ctx.moveTo(0.08 * r, 0);
      ctx.bezierCurveTo(0.04 * r, side * 0.36 * r, -0.26 * r, side * 0.58 * r, -0.56 * r, side * 0.44 * r);
      ctx.bezierCurveTo(-0.48 * r, side * 0.22 * r, -0.22 * r, side * 0.08 * r, -0.08 * r, 0);
      ctx.closePath();
      ctx.fillStyle = pGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(72, 86, 62, 0.35)';
      ctx.lineWidth = Math.max(0.6, 0.028 * r);
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-0.14 * i * r * 0.6, side * 0.24 * r, (-0.12 * i - 0.05) * r, side * (0.46 - i * 0.05) * r);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Small pelvic fins mid-belly
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(-0.14 * r, side * 0.26 * r);
      ctx.rotate(side * (0.55 - finRow * 0.4));
      ctx.beginPath();
      ctx.moveTo(0.04 * r, 0);
      ctx.quadraticCurveTo(-0.14 * r, side * 0.28 * r, -0.34 * r, side * 0.22 * r);
      ctx.quadraticCurveTo(-0.22 * r, side * 0.08 * r, -0.06 * r, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(218, 186, 166, 0.52)';
      ctx.fill();
      ctx.restore();
    }

    // Gently forked square-ish spotted caudal tail
    ctx.save();
    ctx.translate(-1.12 * r, 0);
    ctx.rotate(wag * 1.35);
    const tailGrad = ctx.createLinearGradient(0, 0, -0.68 * r, 0);
    tailGrad.addColorStop(0, 'rgba(62, 98, 76, 0.92)');
    tailGrad.addColorStop(0.55, 'rgba(116, 138, 118, 0.78)');
    tailGrad.addColorStop(1, 'rgba(182, 192, 178, 0.45)');
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.1 * r);
    ctx.bezierCurveTo(-0.18 * r, -0.22 * r, -0.42 * r, -0.46 * r, -0.66 * r, -0.42 * r);
    ctx.quadraticCurveTo(-0.52 * r, 0, -0.66 * r, 0.42 * r);
    ctx.bezierCurveTo(-0.42 * r, 0.46 * r, -0.18 * r, 0.22 * r, 0.06 * r, 0.1 * r);
    ctx.closePath();
    ctx.fillStyle = tailGrad;
    ctx.fill();
    // Tail fin rays & pepper spots
    ctx.strokeStyle = 'rgba(40, 62, 48, 0.32)';
    ctx.lineWidth = Math.max(0.6, 0.024 * r);
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(-0.02 * r, i * 0.025 * r);
      ctx.lineTo(-0.58 * r, i * 0.115 * r);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(24, 34, 28, 0.62)';
    const tSpots = [[-0.22, -0.12], [-0.36, -0.22], [-0.48, -0.28], [-0.32, 0.02], [-0.44, -0.06], [-0.26, 0.14], [-0.42, 0.22], [-0.52, 0.3], [-0.5, 0.12]];
    for (const [sx, sy] of tSpots) {
      ctx.beginPath();
      ctx.arc(sx * r, sy * r, 0.03 * r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Sleek fusiform trout body path
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.36 * r, 0);
      ctx.bezierCurveTo(1.26 * r, -0.26 * r, 0.72 * r, -0.44 * r, 0.12 * r, -0.42 * r);
      ctx.bezierCurveTo(-0.44 * r, -0.4 * r, -0.86 * r, -0.22 * r, -1.18 * r, -0.09 * r);
      ctx.lineTo(-1.18 * r, 0.09 * r);
      ctx.bezierCurveTo(-0.86 * r, 0.22 * r, -0.44 * r, 0.4 * r, 0.12 * r, 0.42 * r);
      ctx.bezierCurveTo(0.72 * r, 0.44 * r, 1.26 * r, 0.26 * r, 1.36 * r, 0);
      ctx.closePath();
    };

    // Base silvery-olive painted body gradient
    bodyPath();
    const bodyGrad = ctx.createRadialGradient(0.18 * r, -0.04 * r, 0.05 * r, 0.08 * r, 0, 1.35 * r);
    bodyGrad.addColorStop(0, '#5a8e6c');
    bodyGrad.addColorStop(0.32, '#3d6e52');
    bodyGrad.addColorStop(0.68, '#7ea392');
    bodyGrad.addColorStop(1, '#c6dbd6');
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Clipped internal painted details: rose-pink rainbow lateral bands & pepper spots
    ctx.save();
    bodyPath();
    ctx.clip();

    // Iridescent rainbow rose-pink flank stripes
    for (const side of [-1, 1]) {
      const pinkGrad = ctx.createLinearGradient(0.95 * r, side * 0.26 * r, -0.95 * r, side * 0.22 * r);
      pinkGrad.addColorStop(0, 'rgba(242, 134, 158, 0.08)');
      pinkGrad.addColorStop(0.22, 'rgba(238, 122, 152, 0.68)');
      pinkGrad.addColorStop(0.65, 'rgba(245, 148, 174, 0.56)');
      pinkGrad.addColorStop(1, 'rgba(232, 120, 146, 0.12)');
      ctx.beginPath();
      ctx.ellipse(0.06 * r, side * 0.31 * r, 1.05 * r, 0.13 * r, 0, 0, Math.PI * 2);
      ctx.fillStyle = pinkGrad;
      ctx.fill();
    }

    // Deep olive-emerald dorsal crown
    const backGrad = ctx.createLinearGradient(1.3 * r, 0, -1.15 * r, 0);
    backGrad.addColorStop(0, '#2a4d3c');
    backGrad.addColorStop(0.45, '#3b6b4d');
    backGrad.addColorStop(1, '#264736');
    ctx.beginPath();
    ctx.ellipse(0.08 * r, 0, 1.25 * r, 0.22 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = backGrad;
    ctx.fill();

    // Characteristic dark trout pepper spots clustered on back
    ctx.fillStyle = 'rgba(18, 28, 22, 0.72)';
    const spots = [
      [0.72, -0.1], [0.64, 0.08], [0.5, -0.16], [0.44, 0.14], [0.36, -0.05],
      [0.24, 0.09], [0.16, -0.18], [0.06, -0.04], [-0.04, 0.15], [-0.14, -0.14],
      [-0.22, 0.05], [-0.34, -0.16], [-0.4, 0.13], [-0.52, -0.06], [-0.62, 0.1],
      [-0.72, -0.1], [-0.84, 0.04], [-0.94, -0.05], [0.28, -0.22], [-0.08, -0.22],
      [-0.28, 0.2], [0.02, 0.21], [0.56, 0.18], [-0.46, -0.19], [-0.66, -0.14]
    ];
    for (const [sx, sy] of spots) {
      ctx.beginPath();
      ctx.ellipse(sx * r, sy * r, 0.036 * r, 0.028 * r, sx * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Gill plate crescents
    ctx.strokeStyle = 'rgba(26, 48, 38, 0.42)';
    ctx.lineWidth = Math.max(0.8, 0.035 * r);
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.68 * r, side * 0.16 * r, 0.22 * r, side > 0 ? 0.5 : -1.5, side > 0 ? 1.5 : -0.5);
      ctx.stroke();
    }
    ctx.restore();

    // Soft body contour
    bodyPath();
    ctx.strokeStyle = 'rgba(24, 48, 38, 0.45)';
    ctx.lineWidth = Math.max(0.8, 0.03 * r);
    ctx.stroke();

    // Dorsal fin ribbon along midline
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0.24 * r, 0);
    ctx.quadraticCurveTo(-0.08 * r, wag * 0.45 * r, -0.34 * r, wag * 0.32 * r);
    ctx.strokeStyle = 'rgba(54, 88, 66, 0.85)';
    ctx.lineWidth = 0.09 * r;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();

    // Signature fleshy salmonid adipose fin near tail
    ctx.beginPath();
    ctx.ellipse(-0.78 * r, wag * 0.18 * r, 0.11 * r, 0.042 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#477358';
    ctx.fill();

    // Crisp eyes set forward on snout
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(1.0 * r, side * 0.21 * r, 0.095 * r, 0.068 * r, side * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = '#e8d79b';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1.02 * r, side * 0.215 * r, 0.048 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#11181c';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1.04 * r, side * 0.195 * r, 0.018 * r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fill();
    }

    // Glossy water sheen highlight along dorsal ridge
    const sheen = ctx.createLinearGradient(0.9 * r, -0.14 * r, -0.5 * r, 0.1 * r);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.46)');
    sheen.addColorStop(0.5, 'rgba(220, 255, 240, 0.18)');
    sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.beginPath();
    ctx.ellipse(0.32 * r, -0.06 * r, 0.68 * r, 0.1 * r, -0.04, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 2. FLYING FISH
   * Slender aerodynamic sapphire-silver torpedo with MASSIVE sweeping translucent
   * glider-wing pectoral fins and secondary rear pelvic gliding wings.
   */
  flyingfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const wag = Math.sin(time * (6.0 + spd * 2.5)) * 0.14;
    const wingBeat = Math.sin(time * (3.2 + spd * 1.4)) * 0.07;

    // Wide translucent shadow beneath glider wings
    ctx.save();
    ctx.translate(-0.08 * r, 0.14 * r);
    ctx.beginPath();
    ctx.ellipse(-0.05 * r, 0, 1.1 * r, 1.55 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(6, 28, 56, 0.15)';
    ctx.fill();
    ctx.restore();

    // MASSIVE sweeping translucent wing-like pectoral fins
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.52 * r, side * 0.2 * r);
      ctx.rotate(side * (-0.06 + wingBeat));
      const wGrad = ctx.createLinearGradient(0.1 * r, 0, -0.95 * r, side * 2.0 * r);
      wGrad.addColorStop(0, 'rgba(26, 98, 178, 0.88)');
      wGrad.addColorStop(0.35, 'rgba(72, 176, 232, 0.72)');
      wGrad.addColorStop(0.72, 'rgba(164, 232, 252, 0.56)');
      wGrad.addColorStop(1, 'rgba(232, 250, 255, 0.28)');

      ctx.beginPath();
      ctx.moveTo(0.18 * r, 0);
      ctx.bezierCurveTo(0.24 * r, side * 0.72 * r, -0.05 * r, side * 1.68 * r, -0.48 * r, side * 2.02 * r);
      ctx.bezierCurveTo(-0.82 * r, side * 1.98 * r, -1.16 * r, side * 1.32 * r, -1.04 * r, side * 0.62 * r);
      ctx.bezierCurveTo(-0.88 * r, side * 0.28 * r, -0.44 * r, side * 0.1 * r, -0.18 * r, 0);
      ctx.closePath();
      ctx.fillStyle = wGrad;
      ctx.fill();

      // Iridescent wing edge highlight
      ctx.strokeStyle = 'rgba(214, 248, 255, 0.72)';
      ctx.lineWidth = Math.max(0.8, 0.032 * r);
      ctx.stroke();

      // Delicate radiating glider fin rays
      ctx.strokeStyle = 'rgba(22, 86, 152, 0.36)';
      ctx.lineWidth = Math.max(0.6, 0.022 * r);
      for (let i = 0; i < 9; i++) {
        const frac = i / 8;
        ctx.beginPath();
        ctx.moveTo((0.08 - frac * 0.22) * r, side * 0.02 * r);
        ctx.quadraticCurveTo(
          (0.05 - frac * 0.62) * r,
          side * (0.95 - frac * 0.35) * r,
          (-0.42 - frac * 0.56) * r,
          side * (1.92 - frac * 1.18) * r
        );
        ctx.stroke();
      }
      ctx.restore();
    }

    // Secondary smaller rear pelvic glider wings
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(-0.42 * r, side * 0.15 * r);
      ctx.rotate(side * (0.12 - wingBeat * 0.6));
      const pGrad = ctx.createLinearGradient(0, 0, -0.45 * r, side * 0.78 * r);
      pGrad.addColorStop(0, 'rgba(64, 152, 214, 0.72)');
      pGrad.addColorStop(1, 'rgba(216, 246, 255, 0.25)');
      ctx.beginPath();
      ctx.moveTo(0.08 * r, 0);
      ctx.bezierCurveTo(0.02 * r, side * 0.42 * r, -0.22 * r, side * 0.78 * r, -0.44 * r, side * 0.74 * r);
      ctx.bezierCurveTo(-0.56 * r, side * 0.52 * r, -0.36 * r, side * 0.18 * r, -0.14 * r, 0);
      ctx.closePath();
      ctx.fillStyle = pGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(205, 242, 255, 0.55)';
      ctx.lineWidth = Math.max(0.6, 0.022 * r);
      ctx.stroke();
      ctx.restore();
    }

    // Deeply forked aerodynamic V-tail
    ctx.save();
    ctx.translate(-1.14 * r, 0);
    ctx.rotate(wag * 1.4);
    const tGrad = ctx.createLinearGradient(0, 0, -0.68 * r, 0);
    tGrad.addColorStop(0, 'rgba(20, 74, 142, 0.92)');
    tGrad.addColorStop(1, 'rgba(134, 212, 248, 0.52)');
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.07 * r);
    ctx.lineTo(-0.68 * r, -0.48 * r);
    ctx.quadraticCurveTo(-0.32 * r, 0, -0.74 * r, 0.52 * r);
    ctx.lineTo(0.06 * r, 0.07 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Slender pelagic cigar-torpedo body
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.32 * r, 0);
      ctx.bezierCurveTo(1.18 * r, -0.22 * r, 0.64 * r, -0.3 * r, 0.08 * r, -0.28 * r);
      ctx.bezierCurveTo(-0.46 * r, -0.26 * r, -0.88 * r, -0.16 * r, -1.18 * r, -0.06 * r);
      ctx.lineTo(-1.18 * r, 0.06 * r);
      ctx.bezierCurveTo(-0.88 * r, 0.16 * r, -0.46 * r, 0.26 * r, 0.08 * r, 0.28 * r);
      ctx.bezierCurveTo(0.64 * r, 0.3 * r, 1.18 * r, 0.22 * r, 1.32 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createLinearGradient(0, -0.28 * r, 0, 0.28 * r);
    bGrad.addColorStop(0, '#c8eefc');
    bGrad.addColorStop(0.24, '#2474c4');
    bGrad.addColorStop(0.5, '#0b3570');
    bGrad.addColorStop(0.76, '#2474c4');
    bGrad.addColorStop(1, '#c8eefc');
    ctx.fillStyle = bGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(10, 40, 86, 0.45)';
    ctx.lineWidth = Math.max(0.7, 0.026 * r);
    ctx.stroke();

    // Electric cyan-silver dorsal metallic stripe
    ctx.beginPath();
    ctx.ellipse(0.05 * r, 0, 1.08 * r, 0.09 * r, 0, 0, Math.PI * 2);
    const sGrad = ctx.createLinearGradient(1.0 * r, 0, -1.0 * r, 0);
    sGrad.addColorStop(0, 'rgba(130, 224, 255, 0.65)');
    sGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.42)');
    sGrad.addColorStop(1, 'rgba(66, 178, 240, 0.25)');
    ctx.fillStyle = sGrad;
    ctx.fill();

    // Large bright pelagic eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(0.96 * r, side * 0.17 * r, 0.11 * r, 0.072 * r, side * 0.16, 0, Math.PI * 2);
      ctx.fillStyle = '#e8f7ff';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.98 * r, side * 0.175 * r, 0.055 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#071426';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1.01 * r, side * 0.155 * r, 0.022 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    ctx.restore();
  },

  /**
   * 3. FLOUNDER
   * Asymmetric wide flat leaf/diamond seafloor body, continuous undulating frilly fin skirt,
   * speckled sandy camouflage ocelli, and BOTH eyes migrated onto one side of the head.
   */
  flounderfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const ripple = Math.sin(time * (3.5 + spd * 1.8));
    const wag = ripple * 0.12;

    // Flat seafloor contact shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.1 * r);
    ctx.beginPath();
    ctx.ellipse(0, -0.04 * r, 1.28 * r, 1.02 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(26, 22, 16, 0.24)';
    ctx.fill();
    ctx.restore();

    // Continuous translucent frilly dorsal/anal fin skirt around the asymmetric perimeter
    const skirtGrad = ctx.createRadialGradient(0, 0, 0.45 * r, 0, 0, 1.25 * r);
    skirtGrad.addColorStop(0, 'rgba(138, 118, 86, 0.92)');
    skirtGrad.addColorStop(0.75, 'rgba(176, 154, 116, 0.72)');
    skirtGrad.addColorStop(1, 'rgba(218, 200, 162, 0.36)');

    ctx.beginPath();
    ctx.moveTo(1.16 * r, 0.06 * r);
    ctx.bezierCurveTo(0.86 * r, -0.78 * r + ripple * 0.06 * r, 0.12 * r, -1.16 * r - ripple * 0.05 * r, -0.58 * r, -0.84 * r);
    ctx.bezierCurveTo(-0.88 * r, -0.64 * r, -1.04 * r, -0.34 * r, -1.12 * r, -0.14 * r);
    ctx.lineTo(-1.12 * r, 0.16 * r);
    ctx.bezierCurveTo(-0.98 * r, 0.44 * r, -0.72 * r, 0.76 * r, -0.38 * r, 0.88 * r);
    ctx.bezierCurveTo(0.24 * r, 1.06 * r + ripple * 0.05 * r, 0.88 * r, 0.72 * r - ripple * 0.04 * r, 1.16 * r, 0.06 * r);
    ctx.closePath();
    ctx.fillStyle = skirtGrad;
    ctx.fill();

    // Fine radiating rays along the continuous flatfish fin skirt
    ctx.strokeStyle = 'rgba(92, 76, 52, 0.34)';
    ctx.lineWidth = Math.max(0.6, 0.022 * r);
    for (let a = -2.6; a <= 2.6; a += 0.22) {
      if (Math.abs(a) < 0.25) continue;
      const rx = Math.cos(a);
      const ry = Math.sin(a);
      ctx.beginPath();
      ctx.moveTo(rx * 0.65 * r, ry * 0.56 * r);
      ctx.lineTo(rx * 1.05 * r, ry * (ry < 0 ? 1.06 : 0.94) * r);
      ctx.stroke();
    }

    // Rounded fan-shaped tail fin
    ctx.save();
    ctx.translate(-1.08 * r, 0.01 * r);
    ctx.rotate(wag);
    const tGrad = ctx.createLinearGradient(0, 0, -0.56 * r, 0);
    tGrad.addColorStop(0, 'rgba(128, 108, 78, 0.92)');
    tGrad.addColorStop(1, 'rgba(204, 186, 148, 0.55)');
    ctx.beginPath();
    ctx.moveTo(0.05 * r, -0.15 * r);
    ctx.bezierCurveTo(-0.22 * r, -0.34 * r, -0.54 * r, -0.34 * r, -0.56 * r, 0);
    ctx.bezierCurveTo(-0.54 * r, 0.34 * r, -0.22 * r, 0.34 * r, 0.05 * r, 0.15 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Asymmetric wide flat diamond-leaf central body
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.24 * r, 0.05 * r);
      ctx.bezierCurveTo(0.95 * r, -0.56 * r, 0.22 * r, -0.92 * r, -0.45 * r, -0.66 * r);
      ctx.bezierCurveTo(-0.82 * r, -0.48 * r, -1.02 * r, -0.24 * r, -1.14 * r, -0.12 * r);
      ctx.lineTo(-1.14 * r, 0.14 * r);
      ctx.bezierCurveTo(-0.96 * r, 0.34 * r, -0.68 * r, 0.62 * r, -0.32 * r, 0.72 * r);
      ctx.bezierCurveTo(0.32 * r, 0.82 * r, 0.96 * r, 0.52 * r, 1.24 * r, 0.05 * r);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.18 * r, -0.12 * r, 0.08 * r, 0, 0, 1.25 * r);
    bGrad.addColorStop(0, '#b59a72');
    bGrad.addColorStop(0.42, '#8f7651');
    bGrad.addColorStop(0.8, '#6e583b');
    bGrad.addColorStop(1, '#a8926e');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Speckled sandy camouflage ocelli & mottling
    ctx.save();
    bodyPath();
    ctx.clip();

    // Pale-ringed dark sand ocelli (signature summer flounder eyespots)
    const ocelli = [
      [-0.12, -0.36, 0.12], [-0.46, -0.24, 0.1], [-0.18, 0.3, 0.11],
      [-0.58, 0.22, 0.09], [0.28, -0.42, 0.095], [0.22, 0.36, 0.1]
    ];
    for (const [ox, oy, rad] of ocelli) {
      ctx.beginPath();
      ctx.arc(ox * r, oy * r, rad * r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(222, 204, 168, 0.58)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ox * r, oy * r, rad * 0.6 * r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(64, 48, 30, 0.74)';
      ctx.fill();
    }

    // Fine scattered sand speckles
    const specks = [
      [0.62, 0.2], [0.46, -0.18], [0.35, 0.12], [0.1, -0.08], [-0.04, 0.08],
      [-0.28, -0.06], [-0.42, 0.04], [-0.72, -0.14], [-0.78, 0.1], [0.05, -0.58],
      [-0.3, -0.52], [-0.05, 0.52], [0.54, -0.34], [0.52, 0.38], [-0.88, -0.02]
    ];
    for (let i = 0; i < specks.length; i++) {
      const [sx, sy] = specks[i];
      ctx.beginPath();
      ctx.arc(sx * r, sy * r, (0.032 + (i % 3) * 0.012) * r, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(54, 42, 26, 0.62)' : 'rgba(230, 216, 184, 0.55)';
      ctx.fill();
    }

    // Subtle curved lateral line
    ctx.beginPath();
    ctx.moveTo(0.48 * r, -0.04 * r);
    ctx.quadraticCurveTo(0.18 * r, -0.22 * r, -0.12 * r, -0.02 * r);
    ctx.lineTo(-1.05 * r, 0.01 * r);
    ctx.strokeStyle = 'rgba(62, 48, 32, 0.35)';
    ctx.lineWidth = Math.max(0.7, 0.026 * r);
    ctx.stroke();
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(66, 52, 34, 0.45)';
    ctx.lineWidth = Math.max(0.8, 0.028 * r);
    ctx.stroke();

    // Small translucent upper-side pectoral fin
    ctx.save();
    ctx.translate(0.38 * r, -0.08 * r);
    ctx.rotate(-0.4 + ripple * 0.08);
    ctx.beginPath();
    ctx.ellipse(-0.14 * r, 0, 0.2 * r, 0.1 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(196, 178, 142, 0.58)';
    ctx.fill();
    ctx.restore();

    // UNMISTAKABLE FLATFISH ANATOMY: BOTH eyes shifted onto the upper (-Y) hemisphere!
    const eyes = [
      [0.76 * r, -0.26 * r],
      [0.86 * r, -0.04 * r]
    ];
    for (const [ex, ey] of eyes) {
      // Raised sandy eyelid turret
      ctx.beginPath();
      ctx.arc(ex, ey, 0.115 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#7c6544';
      ctx.fill();
      // Golden iris
      ctx.beginPath();
      ctx.arc(ex + 0.015 * r, ey, 0.082 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#e5c66c';
      ctx.fill();
      // Pupil + specular glint
      ctx.beginPath();
      ctx.arc(ex + 0.028 * r, ey, 0.046 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#15120e';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ex + 0.042 * r, ey - 0.02 * r, 0.018 * r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
    }

    // Soft watery sheen over dorsal flat surface
    const sheen = ctx.createRadialGradient(0.24 * r, -0.22 * r, 0.05 * r, 0.1 * r, -0.1 * r, 0.85 * r);
    sheen.addColorStop(0, 'rgba(255, 250, 232, 0.26)');
    sheen.addColorStop(1, 'rgba(255, 250, 232, 0)');
    ctx.beginPath();
    ctx.ellipse(0.1 * r, -0.14 * r, 0.72 * r, 0.36 * r, -0.15, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 4. PARROTFISH
   * Stocky blunt-nosed reef body with distinctive fused beak snout, vivid turquoise-emerald
   * & coral-rose jewel tones, large painted overlapping scales, paddle pectorals, lunate tail.
   */
  parrotfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const wag = Math.sin(time * (4.2 + spd * 1.8)) * 0.13;
    const row = Math.sin(time * (4.8 + spd * 2.0)) * 0.24;

    // Soft reef shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.24 * r, 0.56 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(8, 36, 44, 0.22)';
    ctx.fill();
    ctx.restore();

    // Broad rowing paddle-shaped pectoral fins (parrotfish swim primarily by rowing!)
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.36 * r, side * 0.36 * r);
      ctx.rotate(side * (0.36 + row * side));
      const pGrad = ctx.createLinearGradient(0, 0, -0.42 * r, side * 0.62 * r);
      pGrad.addColorStop(0, 'rgba(16, 188, 174, 0.88)');
      pGrad.addColorStop(0.55, 'rgba(255, 134, 128, 0.72)');
      pGrad.addColorStop(1, 'rgba(255, 214, 112, 0.52)');
      ctx.beginPath();
      ctx.moveTo(0.1 * r, 0);
      ctx.bezierCurveTo(0.14 * r, side * 0.36 * r, -0.12 * r, side * 0.64 * r, -0.38 * r, side * 0.56 * r);
      ctx.bezierCurveTo(-0.48 * r, side * 0.34 * r, -0.26 * r, side * 0.1 * r, -0.08 * r, 0);
      ctx.closePath();
      ctx.fillStyle = pGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 226, 148, 0.6)';
      ctx.lineWidth = Math.max(0.7, 0.025 * r);
      ctx.stroke();
      ctx.restore();
    }

    // Vibrant lunate crescent tail with trailing tips
    ctx.save();
    ctx.translate(-1.02 * r, 0);
    ctx.rotate(wag * 1.25);
    const tGrad = ctx.createLinearGradient(0, 0, -0.72 * r, 0);
    tGrad.addColorStop(0, '#0eb5a4');
    tGrad.addColorStop(0.45, '#ff6e7f');
    tGrad.addColorStop(0.82, '#ffb84d');
    tGrad.addColorStop(1, '#34e8d2');
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.14 * r);
    ctx.bezierCurveTo(-0.22 * r, -0.28 * r, -0.48 * r, -0.58 * r, -0.72 * r, -0.54 * r);
    ctx.bezierCurveTo(-0.46 * r, -0.26 * r, -0.46 * r, 0.26 * r, -0.72 * r, 0.54 * r);
    ctx.bezierCurveTo(-0.48 * r, 0.58 * r, -0.22 * r, 0.28 * r, 0.06 * r, 0.14 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Stocky thick-shouldered oblong body with blunt parrot beak at +X
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.28 * r, 0);
      ctx.bezierCurveTo(1.24 * r, -0.16 * r, 1.06 * r, -0.34 * r, 0.72 * r, -0.46 * r);
      ctx.bezierCurveTo(0.26 * r, -0.56 * r, -0.44 * r, -0.48 * r, -1.06 * r, -0.14 * r);
      ctx.lineTo(-1.06 * r, 0.14 * r);
      ctx.bezierCurveTo(-0.44 * r, 0.48 * r, 0.26 * r, 0.56 * r, 0.72 * r, 0.46 * r);
      ctx.bezierCurveTo(1.06 * r, 0.34 * r, 1.24 * r, 0.16 * r, 1.28 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createLinearGradient(1.28 * r, 0, -1.06 * r, 0);
    bGrad.addColorStop(0, '#38e0c4');
    bGrad.addColorStop(0.22, '#0ea69b');
    bGrad.addColorStop(0.58, '#19c2b2');
    bGrad.addColorStop(0.84, '#e86882');
    bGrad.addColorStop(1, '#ff9d5c');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Clipped tropical reef paintwork: coral-magenta flank blush, lime cheek strokes, big painted scales
    ctx.save();
    bodyPath();
    ctx.clip();

    // Sunset coral-rose flank bands
    for (const side of [-1, 1]) {
      const fGrad = ctx.createRadialGradient(0.02 * r, side * 0.44 * r, 0.04 * r, 0.02 * r, side * 0.38 * r, 0.72 * r);
      fGrad.addColorStop(0, 'rgba(255, 118, 134, 0.86)');
      fGrad.addColorStop(0.6, 'rgba(255, 176, 84, 0.48)');
      fGrad.addColorStop(1, 'rgba(255, 176, 84, 0)');
      ctx.fillStyle = fGrad;
      ctx.fillRect(-1.1 * r, side > 0 ? 0 : -0.6 * r, 2.4 * r, 0.6 * r);
    }

    // Bright chartreuse-lime face/cheek markings
    ctx.strokeStyle = 'rgba(202, 245, 76, 0.78)';
    ctx.lineWidth = Math.max(1.2, 0.06 * r);
    ctx.lineCap = 'round';
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(1.12 * r, side * 0.12 * r);
      ctx.quadraticCurveTo(0.86 * r, side * 0.32 * r, 0.56 * r, side * 0.32 * r);
      ctx.stroke();
    }

    // Large painted overlapping parrotfish scales
    ctx.strokeStyle = 'rgba(255, 224, 152, 0.34)';
    ctx.lineWidth = Math.max(0.7, 0.026 * r);
    for (let rowX = 0.42; rowX >= -0.78; rowX -= 0.22) {
      const offset = (Math.round(rowX * 10) % 2) * 0.08;
      for (let colY = -0.32; colY <= 0.32; colY += 0.18) {
        ctx.beginPath();
        ctx.arc(rowX * r, (colY + offset) * r, 0.11 * r, -1.1, 1.1);
        ctx.stroke();
      }
    }

    // Fused ivory-teal parrot beak lip accent at snout tip
    ctx.beginPath();
    ctx.arc(1.25 * r, 0, 0.11 * r, -1.3, 1.3);
    ctx.fillStyle = '#e8fff7';
    ctx.fill();
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(8, 72, 74, 0.45)';
    ctx.lineWidth = Math.max(0.8, 0.03 * r);
    ctx.stroke();

    // Long vivid coral-orange dorsal fin crest along spine
    ctx.beginPath();
    ctx.moveTo(0.45 * r, 0);
    ctx.quadraticCurveTo(-0.18 * r, wag * 0.42 * r, -0.76 * r, wag * 0.3 * r);
    ctx.strokeStyle = '#ff7b5c';
    ctx.lineWidth = 0.11 * r;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.strokeStyle = '#ffd15c';
    ctx.lineWidth = 0.045 * r;
    ctx.stroke();

    // Bright gold-ringed parrotfish eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.88 * r, side * 0.25 * r, 0.088 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd94a';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.9 * r, side * 0.255 * r, 0.048 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#121824';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.92 * r, side * 0.238 * r, 0.018 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Glossy water sheen
    const sheen = ctx.createLinearGradient(0.9 * r, -0.2 * r, -0.4 * r, 0.12 * r);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.44)');
    sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.beginPath();
    ctx.ellipse(0.28 * r, -0.09 * r, 0.58 * r, 0.13 * r, -0.05, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 5. TRIGGERFISH (Clown / Picasso Triggerfish)
   * Angular lozenge-diamond profile with tapered snout & bright yellow lips,
   * deep charcoal saddle with glowing cream spots, erectable dorsal trigger spine,
   * rapidly fluttering clear-amber pectorals, and truncated broom tail.
   */
  triggerfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const flutter = Math.sin(time * (9.5 + spd * 3.0)) * 0.22;
    const wag = Math.sin(time * (4.6 + spd * 2.0)) * 0.11;

    // Crisp shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.26 * r, 0.56 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10, 18, 32, 0.24)';
    ctx.fill();
    ctx.restore();

    // Small rapidly fluttering translucent amber pectoral fins
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.32 * r, side * 0.36 * r);
      ctx.rotate(side * (0.45 + flutter * side));
      ctx.beginPath();
      ctx.moveTo(0.06 * r, 0);
      ctx.bezierCurveTo(0.08 * r, side * 0.28 * r, -0.12 * r, side * 0.42 * r, -0.3 * r, side * 0.32 * r);
      ctx.bezierCurveTo(-0.28 * r, side * 0.14 * r, -0.14 * r, side * 0.04 * r, -0.06 * r, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 206, 84, 0.56)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 232, 152, 0.72)';
      ctx.lineWidth = Math.max(0.6, 0.022 * r);
      ctx.stroke();
      ctx.restore();
    }

    // Truncated broom-like fan tail with bold black & gold bars
    ctx.save();
    ctx.translate(-0.98 * r, 0);
    ctx.rotate(wag * 1.15);
    const tGrad = ctx.createLinearGradient(0, 0, -0.58 * r, 0);
    tGrad.addColorStop(0, '#ffd447');
    tGrad.addColorStop(0.45, '#1e283b');
    tGrad.addColorStop(0.78, '#ffd447');
    tGrad.addColorStop(1, '#1a2333');
    ctx.beginPath();
    ctx.moveTo(0.05 * r, -0.11 * r);
    ctx.lineTo(-0.56 * r, -0.44 * r);
    ctx.quadraticCurveTo(-0.62 * r, 0, -0.56 * r, 0.44 * r);
    ctx.lineTo(0.05 * r, 0.11 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Angular diamond-lozenge triggerfish body
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.34 * r, 0);
      ctx.bezierCurveTo(1.12 * r, -0.22 * r, 0.62 * r, -0.52 * r, 0.06 * r, -0.56 * r);
      ctx.bezierCurveTo(-0.44 * r, -0.54 * r, -0.78 * r, -0.32 * r, -1.04 * r, -0.11 * r);
      ctx.lineTo(-1.04 * r, 0.11 * r);
      ctx.bezierCurveTo(-0.78 * r, 0.32 * r, -0.44 * r, 0.54 * r, 0.06 * r, 0.56 * r);
      ctx.bezierCurveTo(0.62 * r, 0.52 * r, 1.12 * r, 0.22 * r, 1.34 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.05 * r, 0, 0.08 * r, 0.05 * r, 0, 1.25 * r);
    bGrad.addColorStop(0, '#2c3952');
    bGrad.addColorStop(0.52, '#1a2336');
    bGrad.addColorStop(1, '#0f1624');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Geometric high-contrast Clown/Picasso triggerfish markings
    ctx.save();
    bodyPath();
    ctx.clip();

    // Golden-ochre reticulated dorsal saddle
    const saddleGrad = ctx.createLinearGradient(0.4 * r, 0, -0.6 * r, 0);
    saddleGrad.addColorStop(0, '#e8b93c');
    saddleGrad.addColorStop(1, '#c98828');
    ctx.beginPath();
    ctx.ellipse(-0.08 * r, 0, 0.62 * r, 0.24 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = saddleGrad;
    ctx.fill();

    // Dark leopard-like net dots inside the golden saddle
    ctx.fillStyle = '#1b2436';
    const saddleDots = [[0.22, -0.06], [0.1, 0.08], [-0.04, -0.09], [-0.18, 0.05], [-0.32, -0.07], [-0.44, 0.06]];
    for (const [dx, dy] of saddleDots) {
      ctx.beginPath();
      ctx.arc(dx * r, dy * r, 0.045 * r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Iconic large luminous cream-white clown spots along dark flanks
    ctx.fillStyle = '#fff5d6';
    const clownSpots = [
      [0.34, -0.36], [0.06, -0.44], [-0.24, -0.4], [-0.52, -0.3],
      [0.34, 0.36], [0.06, 0.44], [-0.24, 0.4], [-0.52, 0.3]
    ];
    for (const [cx, cy] of clownSpots) {
      ctx.beginPath();
      ctx.arc(cx * r, cy * r, 0.085 * r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bright canary-yellow snout & lips
    ctx.beginPath();
    ctx.arc(1.22 * r, 0, 0.24 * r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd43b';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(1.32 * r, 0, 0.09 * r, 0, Math.PI * 2);
    ctx.fillStyle = '#ff922b';
    ctx.fill();

    // Electric sky-blue brow band between high-set eyes
    ctx.beginPath();
    ctx.moveTo(0.68 * r, -0.36 * r);
    ctx.quadraticCurveTo(0.84 * r, 0, 0.68 * r, 0.36 * r);
    ctx.strokeStyle = '#38c8ff';
    ctx.lineWidth = 0.075 * r;
    ctx.stroke();
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(10, 14, 24, 0.6)';
    ctx.lineWidth = Math.max(0.8, 0.03 * r);
    ctx.stroke();

    // Signature erectable dorsal trigger spine crest + undulating rear dorsal ribbon
    ctx.beginPath();
    ctx.moveTo(0.32 * r, 0);
    ctx.lineTo(-0.08 * r, 0);
    ctx.strokeStyle = '#fff1b8';
    ctx.lineWidth = 0.075 * r;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-0.18 * r, 0);
    ctx.quadraticCurveTo(-0.52 * r, wag * 0.55 * r, -0.84 * r, wag * 0.25 * r);
    ctx.strokeStyle = '#ffae38';
    ctx.lineWidth = 0.09 * r;
    ctx.stroke();

    // High-set swiveling triggerfish eyes (set far back from the snout tip!)
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.66 * r, side * 0.29 * r, 0.085 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd859';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.68 * r, side * 0.29 * r, 0.048 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#0e131f';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.7 * r, side * 0.275 * r, 0.018 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Glossy water sheen
    const sheen = ctx.createLinearGradient(0.8 * r, -0.18 * r, -0.4 * r, 0.14 * r);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.36)');
    sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.beginPath();
    ctx.ellipse(0.18 * r, -0.1 * r, 0.54 * r, 0.12 * r, -0.08, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 6. PUFFERFISH (Green Spotted / Golden Pufferfish)
   * Plump rotund teardrop-round body, warm sunlit chartreuse-gold back with rich
   * espresso leopard spots, tiny fast-fluttering clear pectorals, stubby paddle tail.
   */
  pufferfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const flutter = Math.sin(time * (12.0 + spd * 3.5)) * 0.26;
    const wag = Math.sin(time * (5.2 + spd * 2.0)) * 0.14;
    const puff = 1 + Math.sin(time * 2.4) * 0.025;

    ctx.scale(puff, puff);

    // Round underwater shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0.04 * r, 0, 1.04 * r, 0.88 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(22, 34, 16, 0.22)';
    ctx.fill();
    ctx.restore();

    // Tiny rapidly buzzing translucent pectoral fins
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.32 * r, side * 0.72 * r);
      ctx.rotate(side * (0.28 + flutter * side));
      ctx.beginPath();
      ctx.ellipse(-0.08 * r, side * 0.16 * r, 0.24 * r, 0.14 * r, side * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(235, 245, 198, 0.58)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(130, 154, 72, 0.45)';
      ctx.lineWidth = Math.max(0.6, 0.022 * r);
      ctx.stroke();
      ctx.restore();
    }

    // Compact rounded paddle tail
    ctx.save();
    ctx.translate(-0.88 * r, 0);
    ctx.rotate(wag * 1.4);
    const tGrad = ctx.createLinearGradient(0, 0, -0.46 * r, 0);
    tGrad.addColorStop(0, '#8ba836');
    tGrad.addColorStop(0.55, '#c7d968');
    tGrad.addColorStop(1, 'rgba(236, 244, 186, 0.55)');
    ctx.beginPath();
    ctx.moveTo(0.05 * r, -0.13 * r);
    ctx.bezierCurveTo(-0.18 * r, -0.32 * r, -0.46 * r, -0.32 * r, -0.46 * r, 0);
    ctx.bezierCurveTo(-0.46 * r, 0.32 * r, -0.18 * r, 0.32 * r, 0.05 * r, 0.13 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Subtle tiny defensive nubs/papillae around plump perimeter
    ctx.fillStyle = '#e8e49c';
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      if (Math.abs(a) < 0.35 || Math.abs(a - Math.PI) < 0.35) continue;
      const px = Math.cos(a) * 0.94 * r;
      const py = Math.sin(a) * 0.84 * r;
      ctx.beginPath();
      ctx.moveTo(px * 0.92, py * 0.92);
      ctx.lineTo(px * 1.07, py * 1.07);
      ctx.lineTo(px * 0.92 + Math.sin(a) * 0.05 * r, py * 0.92 - Math.cos(a) * 0.05 * r);
      ctx.closePath();
      ctx.fill();
    }

    // Plump rotund teardrop-round puffer body
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.06 * r, 0);
      ctx.bezierCurveTo(1.04 * r, -0.44 * r, 0.62 * r, -0.84 * r, 0.08 * r, -0.84 * r);
      ctx.bezierCurveTo(-0.44 * r, -0.82 * r, -0.76 * r, -0.46 * r, -0.92 * r, -0.13 * r);
      ctx.lineTo(-0.92 * r, 0.13 * r);
      ctx.bezierCurveTo(-0.76 * r, 0.46 * r, -0.44 * r, 0.82 * r, 0.08 * r, 0.84 * r);
      ctx.bezierCurveTo(0.62 * r, 0.84 * r, 1.04 * r, 0.44 * r, 1.06 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.18 * r, -0.12 * r, 0.06 * r, 0.08 * r, 0, 1.02 * r);
    bGrad.addColorStop(0, '#e3eb5b');
    bGrad.addColorStop(0.38, '#a6bf36');
    bGrad.addColorStop(0.75, '#7c962b');
    bGrad.addColorStop(0.92, '#d8dfa0');
    bGrad.addColorStop(1, '#f4f2d0');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Velvety dark espresso leopard spots
    ctx.save();
    bodyPath();
    ctx.clip();
    const spots = [
      [0.42, -0.16, 0.11], [0.38, 0.18, 0.1], [0.16, -0.42, 0.12], [0.14, 0.44, 0.11],
      [0.12, 0.02, 0.13], [-0.14, -0.26, 0.12], [-0.16, 0.28, 0.11], [-0.36, -0.52, 0.09],
      [-0.36, 0.52, 0.09], [-0.42, -0.02, 0.11], [-0.62, -0.24, 0.08], [-0.62, 0.24, 0.08],
      [0.54, -0.46, 0.08], [0.54, 0.46, 0.08]
    ];
    for (const [sx, sy, sr] of spots) {
      ctx.beginPath();
      ctx.ellipse(sx * r, sy * r, sr * r, sr * 0.86 * r, sx, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(42, 46, 22, 0.82)';
      ctx.fill();
    }
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(58, 72, 24, 0.48)';
    ctx.lineWidth = Math.max(0.8, 0.028 * r);
    ctx.stroke();

    // Cute puckered beak mouth
    ctx.beginPath();
    ctx.ellipse(1.04 * r, 0, 0.07 * r, 0.11 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#f4ecc4';
    ctx.fill();

    // Large expressive turquoise-rimmed eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.68 * r, side * 0.42 * r, 0.145 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#4ad4d4';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.71 * r, side * 0.43 * r, 0.085 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#101c22';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.74 * r, side * 0.4 * r, 0.032 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Lush dome water sheen
    const sheen = ctx.createRadialGradient(0.22 * r, -0.24 * r, 0.04 * r, 0.16 * r, -0.18 * r, 0.58 * r);
    sheen.addColorStop(0, 'rgba(255, 255, 240, 0.48)');
    sheen.addColorStop(1, 'rgba(255, 255, 240, 0)');
    ctx.beginPath();
    ctx.ellipse(0.16 * r, -0.22 * r, 0.48 * r, 0.24 * r, -0.15, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 7. BLOWFISH (Inflated Spiny Oceanic Blowfish)
   * Fully puffed near-spherical balloon silhouette with crisp radial ivory-tipped
   * defensive spines, cerulean-slate saddle bands, and bright golden eyes.
   */
  blowfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const breathe = 1 + Math.sin(time * 2.8) * 0.045;
    const flutter = Math.sin(time * (11.0 + spd * 3.0)) * 0.24;
    const wag = Math.sin(time * (5.5 + spd * 2.2)) * 0.15;

    ctx.scale(breathe, breathe);

    // Spherical shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.14 * r);
    ctx.beginPath();
    ctx.arc(0, 0, 1.05 * r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(8, 28, 42, 0.22)';
    ctx.fill();
    ctx.restore();

    // Tiny fluttering translucent fins
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.22 * r, side * 0.88 * r);
      ctx.rotate(side * (0.2 + flutter * side));
      ctx.beginPath();
      ctx.ellipse(-0.06 * r, side * 0.14 * r, 0.2 * r, 0.11 * r, side * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(208, 242, 250, 0.62)';
      ctx.fill();
      ctx.restore();
    }

    // Mini fan tail peeking out behind the inflated sphere
    ctx.save();
    ctx.translate(-0.92 * r, 0);
    ctx.rotate(wag * 1.4);
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.12 * r);
    ctx.lineTo(-0.4 * r, -0.28 * r);
    ctx.quadraticCurveTo(-0.48 * r, 0, -0.4 * r, 0.28 * r);
    ctx.lineTo(0.06 * r, 0.12 * r);
    ctx.closePath();
    ctx.fillStyle = 'rgba(86, 152, 178, 0.82)';
    ctx.fill();
    ctx.restore();

    // Crisp radial starburst of ivory-tipped spines around the full circumference
    const numSpines = 22;
    for (let i = 0; i < numSpines; i++) {
      const a = (i / numSpines) * Math.PI * 2;
      if (Math.abs(a) < 0.24 || Math.abs(a - Math.PI) < 0.22) continue;
      const baseR = 0.88 * r;
      const tipR = (1.14 + (i % 2) * 0.05) * r;
      const perpX = -Math.sin(a) * 0.055 * r;
      const perpY = Math.cos(a) * 0.055 * r;
      const spGrad = ctx.createLinearGradient(
        Math.cos(a) * baseR, Math.sin(a) * baseR,
        Math.cos(a) * tipR, Math.sin(a) * tipR
      );
      spGrad.addColorStop(0, '#36758c');
      spGrad.addColorStop(0.55, '#d4edf5');
      spGrad.addColorStop(1, '#ffffff');
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * baseR + perpX, Math.sin(a) * baseR + perpY);
      ctx.lineTo(Math.cos(a) * tipR, Math.sin(a) * tipR);
      ctx.lineTo(Math.cos(a) * baseR - perpX, Math.sin(a) * baseR - perpY);
      ctx.closePath();
      ctx.fillStyle = spGrad;
      ctx.fill();
    }

    // Near-spherical inflated balloon body
    const bodyPath = () => {
      ctx.beginPath();
      ctx.ellipse(0.02 * r, 0, 0.96 * r, 0.93 * r, 0, 0, Math.PI * 2);
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.18 * r, -0.18 * r, 0.06 * r, 0.02 * r, 0, 0.98 * r);
    bGrad.addColorStop(0, '#72c2d6');
    bGrad.addColorStop(0.42, '#3d8aa3');
    bGrad.addColorStop(0.76, '#245d75');
    bGrad.addColorStop(0.92, '#a8dae8');
    bGrad.addColorStop(1, '#e6f7fc');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Oceanic slate-teal saddle bands & dorsal spine dots
    ctx.save();
    bodyPath();
    ctx.clip();
    ctx.fillStyle = 'rgba(18, 52, 72, 0.56)';
    ctx.beginPath();
    ctx.ellipse(0.24 * r, 0, 0.2 * r, 0.84 * r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-0.34 * r, 0, 0.22 * r, 0.78 * r, 0, 0, Math.PI * 2);
    ctx.fill();

    // Concentric dorsal spine nubs pointing upward/outward
    for (let ring = 1; ring <= 2; ring++) {
      const rr = ring * 0.34 * r;
      const count = ring === 1 ? 7 : 12;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + ring * 0.3;
        const sx = Math.cos(a) * rr;
        const sy = Math.sin(a) * rr;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.042 * r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(20, 56, 74, 0.5)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(sx + Math.cos(a) * 0.02 * r, sy + Math.sin(a) * 0.02 * r, 0.024 * r, 0, Math.PI * 2);
        ctx.fillStyle = '#f2fcff';
        ctx.fill();
      }
    }
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(16, 52, 68, 0.45)';
    ctx.lineWidth = Math.max(0.8, 0.028 * r);
    ctx.stroke();

    // Comical rounded snout lip
    ctx.beginPath();
    ctx.ellipse(0.94 * r, 0, 0.065 * r, 0.13 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#d8f2fa';
    ctx.fill();

    // Wide-set golden-amber eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.62 * r, side * 0.46 * r, 0.135 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffcf54';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.65 * r, side * 0.47 * r, 0.078 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#0c1824';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.68 * r, side * 0.44 * r, 0.028 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Glossy dome sheen
    const sheen = ctx.createRadialGradient(0.16 * r, -0.28 * r, 0.04 * r, 0.12 * r, -0.22 * r, 0.56 * r);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.52)');
    sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.beginPath();
    ctx.ellipse(0.12 * r, -0.26 * r, 0.44 * r, 0.24 * r, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 8. PORCUPINEFISH (Long-Spined Porcupinefish)
   * Heavy broad-headed oval-plump body bristling with LONG swept-back needle quills,
   * tawny-ochre skin speckled with crisp black pinhead spots, huge iridescent blue-green eyes.
   */
  porcupinefish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const flutter = Math.sin(time * (8.5 + spd * 2.6)) * 0.2;
    const wag = Math.sin(time * (4.4 + spd * 1.8)) * 0.13;

    // Shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0.02 * r, 0, 1.18 * r, 0.94 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(32, 24, 14, 0.24)';
    ctx.fill();
    ctx.restore();

    // Broad scalloped translucent sandy pectorals
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.32 * r, side * 0.7 * r);
      ctx.rotate(side * (0.35 + flutter * side));
      ctx.beginPath();
      ctx.moveTo(0.06 * r, 0);
      ctx.bezierCurveTo(0.06 * r, side * 0.34 * r, -0.18 * r, side * 0.44 * r, -0.36 * r, side * 0.32 * r);
      ctx.bezierCurveTo(-0.34 * r, side * 0.14 * r, -0.14 * r, side * 0.04 * r, -0.06 * r, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(222, 198, 152, 0.62)';
      ctx.fill();
      ctx.restore();
    }

    // Spotted rounded fan tail
    ctx.save();
    ctx.translate(-0.96 * r, 0);
    ctx.rotate(wag * 1.3);
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.14 * r);
    ctx.bezierCurveTo(-0.18 * r, -0.34 * r, -0.5 * r, -0.36 * r, -0.52 * r, 0);
    ctx.bezierCurveTo(-0.5 * r, 0.36 * r, -0.18 * r, 0.34 * r, 0.06 * r, 0.14 * r);
    ctx.closePath();
    ctx.fillStyle = 'rgba(186, 152, 98, 0.84)';
    ctx.fill();
    ctx.fillStyle = 'rgba(36, 24, 14, 0.72)';
    for (const [sx, sy] of [[-0.18, -0.1], [-0.32, -0.18], [-0.28, 0.04], [-0.38, 0.16], [-0.2, 0.14]]) {
      ctx.beginPath();
      ctx.arc(sx * r, sy * r, 0.03 * r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // LONG bristling perimeter needle quills (swept slightly rearward for porcupinefish anatomy)
    const numQuills = 24;
    for (let i = 0; i < numQuills; i++) {
      const a = (i / numQuills) * Math.PI * 2;
      if (Math.abs(a) < 0.3 || Math.abs(a - Math.PI) < 0.26) continue;
      const bx = Math.cos(a) * 0.96 * r;
      const by = Math.sin(a) * 0.78 * r;
      const sweep = a > 0 ? a + 0.22 : a - 0.22;
      const len = (0.3 + (i % 3) * 0.05) * r;
      const tx = bx + Math.cos(sweep) * len;
      const ty = by + Math.sin(sweep) * len;
      const px = -Math.sin(sweep) * 0.042 * r;
      const py = Math.cos(sweep) * 0.042 * r;
      const qGrad = ctx.createLinearGradient(bx, by, tx, ty);
      qGrad.addColorStop(0, '#593b1e');
      qGrad.addColorStop(0.5, '#d9c39a');
      qGrad.addColorStop(1, '#fff8e8');
      ctx.beginPath();
      ctx.moveTo(bx + px, by + py);
      ctx.lineTo(tx, ty);
      ctx.lineTo(bx - px, by - py);
      ctx.closePath();
      ctx.fillStyle = qGrad;
      ctx.fill();
    }

    // Heavy-headed oval-plump body
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.1 * r, 0);
      ctx.bezierCurveTo(1.06 * r, -0.52 * r, 0.62 * r, -0.84 * r, 0.08 * r, -0.8 * r);
      ctx.bezierCurveTo(-0.46 * r, -0.76 * r, -0.82 * r, -0.44 * r, -1.0 * r, -0.13 * r);
      ctx.lineTo(-1.0 * r, 0.13 * r);
      ctx.bezierCurveTo(-0.82 * r, 0.44 * r, -0.46 * r, 0.76 * r, 0.08 * r, 0.8 * r);
      ctx.bezierCurveTo(0.62 * r, 0.84 * r, 1.06 * r, 0.52 * r, 1.1 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.2 * r, -0.14 * r, 0.06 * r, 0.06 * r, 0, 1.1 * r);
    bGrad.addColorStop(0, '#dfc084');
    bGrad.addColorStop(0.45, '#b88c4d');
    bGrad.addColorStop(0.82, '#855c2c');
    bGrad.addColorStop(1, '#d4b888');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Clipped dusky blotches, black pinhead speckles, and swept-back dorsal quills
    ctx.save();
    bodyPath();
    ctx.clip();

    // Large dusky dorsal saddle blotches
    ctx.fillStyle = 'rgba(72, 46, 22, 0.42)';
    for (const [bx, by, rx, ry] of [[0.35, 0, 0.24, 0.52], [-0.28, -0.24, 0.26, 0.28], [-0.28, 0.24, 0.26, 0.28]]) {
      ctx.beginPath();
      ctx.ellipse(bx * r, by * r, rx * r, ry * r, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Dense dark pinhead spots
    ctx.fillStyle = 'rgba(28, 18, 10, 0.78)';
    for (let x = 0.72; x >= -0.78; x -= 0.24) {
      for (let y = -0.56; y <= 0.56; y += 0.22) {
        const jx = x + ((Math.abs(Math.round(y * 10)) % 2) * 0.08);
        ctx.beginPath();
        ctx.arc(jx * r, y * r, 0.028 * r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Swept-back dorsal needle quills lying along the back
    for (let x = 0.48; x >= -0.52; x -= 0.26) {
      for (let y = -0.44; y <= 0.44; y += 0.22) {
        ctx.beginPath();
        ctx.moveTo(x * r, y * r);
        ctx.lineTo((x - 0.22) * r, (y + y * 0.24) * r);
        ctx.strokeStyle = 'rgba(255, 245, 220, 0.85)';
        ctx.lineWidth = Math.max(0.8, 0.03 * r);
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(66, 42, 18, 0.5)';
    ctx.lineWidth = Math.max(0.8, 0.03 * r);
    ctx.stroke();

    // Oversized bulging iridescent blue-green porcupinefish eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.72 * r, side * 0.46 * r, 0.165 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#38c4b8';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.75 * r, side * 0.47 * r, 0.1 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#0c1c20';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.79 * r, side * 0.43 * r, 0.036 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Glossy water highlight
    const sheen = ctx.createRadialGradient(0.24 * r, -0.22 * r, 0.04 * r, 0.18 * r, -0.18 * r, 0.56 * r);
    sheen.addColorStop(0, 'rgba(255, 250, 230, 0.36)');
    sheen.addColorStop(1, 'rgba(255, 250, 230, 0)');
    ctx.beginPath();
    ctx.ellipse(0.18 * r, -0.2 * r, 0.46 * r, 0.22 * r, -0.12, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 9. FROGFISH (Warty / Painted Angler Frogfish)
   * Bulbous lumpy sponge-camouflaged body, elbowed leg-like walking pectoral fins
   * with finger-like ray tips, and a bobbing dorsal fishing rod + fleshy lure!
   */
  frogfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const step = Math.sin(time * (3.2 + spd * 1.6)) * 0.16;
    const lureBob = Math.sin(time * 5.8) * 0.18;

    // Lumpy shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(-0.02 * r, 0, 1.05 * r, 0.88 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(34, 18, 10, 0.25)';
    ctx.fill();
    ctx.restore();

    // Signature elbowed, leg-like walking pectoral fins with splayed "toes"
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.12 * r, side * 0.62 * r);
      ctx.rotate(side * (0.12 + step * side));
      // Thick muscular arm/elbow
      const armGrad = ctx.createLinearGradient(0, 0, -0.28 * r, side * 0.54 * r);
      armGrad.addColorStop(0, '#d65a24');
      armGrad.addColorStop(0.65, '#f29f38');
      armGrad.addColorStop(1, '#ffd166');
      ctx.beginPath();
      ctx.moveTo(0.14 * r, -side * 0.04 * r);
      ctx.bezierCurveTo(0.12 * r, side * 0.24 * r, -0.02 * r, side * 0.44 * r, -0.24 * r, side * 0.48 * r);
      ctx.bezierCurveTo(-0.38 * r, side * 0.36 * r, -0.26 * r, side * 0.14 * r, -0.14 * r, 0);
      ctx.closePath();
      ctx.fillStyle = armGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(110, 36, 14, 0.5)';
      ctx.lineWidth = Math.max(0.7, 0.025 * r);
      ctx.stroke();

      // Finger-like walking fin ray tips
      ctx.strokeStyle = '#ffdf85';
      ctx.lineWidth = Math.max(1.0, 0.042 * r);
      ctx.lineCap = 'round';
      for (let f = -1; f <= 2; f++) {
        ctx.beginPath();
        ctx.moveTo((-0.14 - f * 0.04) * r, side * 0.38 * r);
        ctx.lineTo((-0.12 - f * 0.09) * r, side * (0.56 - Math.abs(f) * 0.03) * r);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Stubby rounded warty tail fin
    ctx.save();
    ctx.translate(-0.88 * r, 0);
    ctx.rotate(step * 0.6);
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.18 * r);
    ctx.bezierCurveTo(-0.18 * r, -0.34 * r, -0.44 * r, -0.32 * r, -0.46 * r, 0);
    ctx.bezierCurveTo(-0.44 * r, 0.32 * r, -0.18 * r, 0.34 * r, 0.06 * r, 0.18 * r);
    ctx.closePath();
    ctx.fillStyle = '#d45a28';
    ctx.fill();
    ctx.strokeStyle = 'rgba(98, 28, 12, 0.5)';
    ctx.lineWidth = Math.max(0.7, 0.026 * r);
    ctx.stroke();
    ctx.restore();

    // Bulbous, warty, organic sponge-like body contour
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(0.98 * r, 0);
      ctx.bezierCurveTo(0.96 * r, -0.36 * r, 0.68 * r, -0.68 * r, 0.32 * r, -0.76 * r);
      ctx.bezierCurveTo(0.02 * r, -0.86 * r, -0.34 * r, -0.78 * r, -0.64 * r, -0.56 * r);
      ctx.bezierCurveTo(-0.82 * r, -0.42 * r, -0.92 * r, -0.26 * r, -0.92 * r, -0.16 * r);
      ctx.lineTo(-0.92 * r, 0.16 * r);
      ctx.bezierCurveTo(-0.92 * r, 0.26 * r, -0.82 * r, 0.42 * r, -0.64 * r, 0.56 * r);
      ctx.bezierCurveTo(-0.34 * r, 0.78 * r, 0.02 * r, 0.86 * r, 0.32 * r, 0.76 * r);
      ctx.bezierCurveTo(0.68 * r, 0.68 * r, 0.96 * r, 0.36 * r, 0.98 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.16 * r, -0.14 * r, 0.06 * r, 0.02 * r, 0, 1.02 * r);
    bGrad.addColorStop(0, '#ffae42');
    bGrad.addColorStop(0.4, '#e86826');
    bGrad.addColorStop(0.78, '#b83924');
    bGrad.addColorStop(1, '#7a2418');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Sponge-mimicry warty rings, ocelli, and mossy blotches
    ctx.save();
    bodyPath();
    ctx.clip();
    const warts = [
      [0.32, -0.32, 0.14], [0.24, 0.36, 0.13], [-0.14, -0.46, 0.15], [-0.18, 0.44, 0.14],
      [-0.48, -0.18, 0.12], [-0.46, 0.22, 0.13], [0.02, -0.06, 0.15], [0.54, 0.12, 0.1]
    ];
    for (const [wx, wy, wr] of warts) {
      ctx.beginPath();
      ctx.arc(wx * r, wy * r, wr * r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(118, 28, 18, 0.45)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(wx * r - 0.02 * r, wy * r - 0.02 * r, wr * 0.55 * r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 206, 102, 0.52)';
      ctx.fill();
    }
    // Fine dark sponge pores
    ctx.fillStyle = 'rgba(56, 16, 12, 0.55)';
    for (const [px, py] of [[0.46, -0.16], [0.14, 0.18], [-0.26, -0.14], [-0.36, 0.06], [-0.62, -0.06], [0.04, -0.58], [-0.08, 0.6]]) {
      ctx.beginPath();
      ctx.arc(px * r, py * r, 0.032 * r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(92, 24, 14, 0.55)';
    ctx.lineWidth = Math.max(0.8, 0.03 * r);
    ctx.stroke();

    // Wide grumpy upturned frogfish mouth ridge
    ctx.beginPath();
    ctx.arc(0.92 * r, 0, 0.24 * r, -0.85, 0.85);
    ctx.strokeStyle = 'rgba(84, 22, 14, 0.72)';
    ctx.lineWidth = Math.max(1.2, 0.05 * r);
    ctx.stroke();

    // Small camouflaged beady eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.68 * r, side * 0.34 * r, 0.082 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffe078';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.7 * r, side * 0.34 * r, 0.042 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#1c0e0a';
      ctx.fill();
    }

    // SIGNATURE DORSAL FISHING ROD (ILLICIUM) & WRIGGLING LURE (ESCA)
    ctx.beginPath();
    ctx.moveTo(0.82 * r, 0);
    ctx.quadraticCurveTo(1.18 * r, lureBob * 0.45 * r, 1.44 * r, lureBob * r);
    ctx.strokeStyle = '#ffdf9e';
    ctx.lineWidth = Math.max(1.0, 0.036 * r);
    ctx.lineCap = 'round';
    ctx.stroke();

    // Glowing fleshy worm-like lure bobbing in front of mouth
    ctx.save();
    ctx.translate(1.46 * r, lureBob * r);
    ctx.rotate(lureBob * 1.8);
    ctx.beginPath();
    ctx.ellipse(0.05 * r, 0, 0.12 * r, 0.065 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fff0b8';
    ctx.fill();
    ctx.strokeStyle = '#ff6b8b';
    ctx.lineWidth = Math.max(0.7, 0.025 * r);
    ctx.stroke();
    ctx.restore();

    // Glossy sheen
    const sheen = ctx.createRadialGradient(0.18 * r, -0.22 * r, 0.04 * r, 0.1 * r, -0.18 * r, 0.52 * r);
    sheen.addColorStop(0, 'rgba(255, 240, 200, 0.34)');
    sheen.addColorStop(1, 'rgba(255, 240, 200, 0)');
    ctx.beginPath();
    ctx.ellipse(0.12 * r, -0.2 * r, 0.42 * r, 0.2 * r, -0.12, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 10. OSCAR (Tiger Oscar Cichlid)
   * Broad-shouldered muscular oval cichlid in velvety obsidian-charcoal slashed with
   * glowing flame-vermilion marbled tiger bands and iconic orange-ringed tail ocellus.
   */
  oscarfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const wag = Math.sin(time * (4.0 + spd * 1.8)) * 0.14;
    const fin = Math.sin(time * (4.2 + spd * 1.6)) * 0.16;

    // Shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.24 * r, 0.58 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(12, 10, 10, 0.28)';
    ctx.fill();
    ctx.restore();

    // Broad velvety charcoal pectoral fins with subtle amber edge
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.36 * r, side * 0.36 * r);
      ctx.rotate(side * (0.42 + fin * side));
      const pGrad = ctx.createLinearGradient(0, 0, -0.46 * r, side * 0.56 * r);
      pGrad.addColorStop(0, 'rgba(42, 38, 34, 0.88)');
      pGrad.addColorStop(0.7, 'rgba(72, 64, 56, 0.62)');
      pGrad.addColorStop(1, 'rgba(235, 136, 68, 0.45)');
      ctx.beginPath();
      ctx.moveTo(0.08 * r, 0);
      ctx.bezierCurveTo(0.08 * r, side * 0.34 * r, -0.18 * r, side * 0.56 * r, -0.44 * r, side * 0.48 * r);
      ctx.bezierCurveTo(-0.42 * r, side * 0.22 * r, -0.2 * r, side * 0.08 * r, -0.06 * r, 0);
      ctx.closePath();
      ctx.fillStyle = pGrad;
      ctx.fill();
      ctx.restore();
    }

    // Lush rounded velvet fan tail
    ctx.save();
    ctx.translate(-0.98 * r, 0);
    ctx.rotate(wag * 1.3);
    const tGrad = ctx.createLinearGradient(0, 0, -0.62 * r, 0);
    tGrad.addColorStop(0, '#211e1c');
    tGrad.addColorStop(0.65, '#3b3530');
    tGrad.addColorStop(1, 'rgba(255, 110, 46, 0.72)');
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.17 * r);
    ctx.bezierCurveTo(-0.22 * r, -0.44 * r, -0.62 * r, -0.44 * r, -0.62 * r, 0);
    ctx.bezierCurveTo(-0.62 * r, 0.44 * r, -0.22 * r, 0.44 * r, 0.06 * r, 0.17 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Muscular broad-shouldered oval cichlid body
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.22 * r, 0);
      ctx.bezierCurveTo(1.16 * r, -0.28 * r, 0.72 * r, -0.54 * r, 0.12 * r, -0.56 * r);
      ctx.bezierCurveTo(-0.42 * r, -0.54 * r, -0.78 * r, -0.36 * r, -1.04 * r, -0.16 * r);
      ctx.lineTo(-1.04 * r, 0.16 * r);
      ctx.bezierCurveTo(-0.78 * r, 0.36 * r, -0.42 * r, 0.54 * r, 0.12 * r, 0.56 * r);
      ctx.bezierCurveTo(0.72 * r, 0.54 * r, 1.16 * r, 0.28 * r, 1.22 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.18 * r, -0.06 * r, 0.06 * r, 0.04 * r, 0, 1.24 * r);
    bGrad.addColorStop(0, '#3a3530');
    bGrad.addColorStop(0.45, '#24211e');
    bGrad.addColorStop(1, '#12100f');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Glowing flame-vermilion marbled tiger markings + iconic tail ocellus
    ctx.save();
    bodyPath();
    ctx.clip();

    ctx.strokeStyle = '#ff5e1f';
    ctx.lineCap = 'round';
    ctx.lineWidth = 0.12 * r;
    const tigerBands = [
      [[0.48, -0.44], [0.34, -0.14], [0.46, 0.16], [0.38, 0.44]],
      [[0.04, -0.52], [-0.08, -0.16], [0.06, 0.18], [-0.04, 0.52]],
      [[-0.42, -0.44], [-0.52, -0.12], [-0.38, 0.18], [-0.46, 0.42]]
    ];
    for (const pts of tigerBands) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0] * r, pts[0][1] * r);
      ctx.bezierCurveTo(pts[1][0] * r, pts[1][1] * r, pts[2][0] * r, pts[2][1] * r, pts[3][0] * r, pts[3][1] * r);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 178, 66, 0.65)';
      ctx.lineWidth = 0.045 * r;
      ctx.stroke();
      ctx.strokeStyle = '#ff5e1f';
      ctx.lineWidth = 0.12 * r;
    }

    // Iconic Oscar tail-base OCELLUS (black circle ringed in fiery orange)
    ctx.beginPath();
    ctx.arc(-0.84 * r, 0, 0.135 * r, 0, Math.PI * 2);
    ctx.fillStyle = '#ff7b24';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-0.84 * r, 0, 0.088 * r, 0, Math.PI * 2);
    ctx.fillStyle = '#0d0c0c';
    ctx.fill();
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(10, 8, 8, 0.6)';
    ctx.lineWidth = Math.max(0.8, 0.03 * r);
    ctx.stroke();

    // Flowing velvet dorsal fin along back
    ctx.beginPath();
    ctx.moveTo(0.32 * r, 0);
    ctx.quadraticCurveTo(-0.26 * r, wag * 0.45 * r, -0.78 * r, wag * 0.35 * r);
    ctx.strokeStyle = '#1b1817';
    ctx.lineWidth = 0.11 * r;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 114, 48, 0.72)';
    ctx.lineWidth = 0.035 * r;
    ctx.stroke();

    // Fierce fiery amber-ringed eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.84 * r, side * 0.27 * r, 0.095 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ff8b2b';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.86 * r, side * 0.275 * r, 0.052 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#0c0b0b';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.88 * r, side * 0.258 * r, 0.02 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Velvety glossy highlight
    const sheen = ctx.createLinearGradient(0.86 * r, -0.18 * r, -0.3 * r, 0.1 * r);
    sheen.addColorStop(0, 'rgba(255, 236, 214, 0.32)');
    sheen.addColorStop(1, 'rgba(255, 236, 214, 0)');
    ctx.beginPath();
    ctx.ellipse(0.24 * r, -0.11 * r, 0.56 * r, 0.13 * r, -0.08, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 11. BASS (Largemouth Bass)
   * Broad-headed thick-bodied freshwater predator with heavy jaw, lush pond-olive
   * & bronze-moss back, jagged dark-forest flank stripe, and sturdy notched broom tail.
   */
  bassfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const wag = Math.sin(time * (4.2 + spd * 2.0)) * 0.13;
    const fin = Math.sin(time * (3.8 + spd * 1.5)) * 0.14;

    // Pond shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.32 * r, 0.52 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(14, 28, 16, 0.24)';
    ctx.fill();
    ctx.restore();

    // Wide sturdy olive-amber pectoral fins
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.42 * r, side * 0.34 * r);
      ctx.rotate(side * (0.45 + fin * side));
      const pGrad = ctx.createLinearGradient(0, 0, -0.5 * r, side * 0.54 * r);
      pGrad.addColorStop(0, 'rgba(84, 108, 56, 0.88)');
      pGrad.addColorStop(0.65, 'rgba(148, 162, 96, 0.65)');
      pGrad.addColorStop(1, 'rgba(210, 214, 164, 0.3)');
      ctx.beginPath();
      ctx.moveTo(0.08 * r, 0);
      ctx.bezierCurveTo(0.06 * r, side * 0.34 * r, -0.22 * r, side * 0.54 * r, -0.48 * r, side * 0.44 * r);
      ctx.bezierCurveTo(-0.44 * r, side * 0.2 * r, -0.2 * r, side * 0.08 * r, -0.06 * r, 0);
      ctx.closePath();
      ctx.fillStyle = pGrad;
      ctx.fill();
      ctx.restore();
    }

    // Muscular slightly notched broom tail
    ctx.save();
    ctx.translate(-1.08 * r, 0);
    ctx.rotate(wag * 1.3);
    const tGrad = ctx.createLinearGradient(0, 0, -0.64 * r, 0);
    tGrad.addColorStop(0, '#3a592c');
    tGrad.addColorStop(0.6, '#5c7c40');
    tGrad.addColorStop(1, 'rgba(132, 152, 92, 0.6)');
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.14 * r);
    ctx.bezierCurveTo(-0.22 * r, -0.3 * r, -0.46 * r, -0.48 * r, -0.64 * r, -0.42 * r);
    ctx.quadraticCurveTo(-0.5 * r, 0, -0.64 * r, 0.42 * r);
    ctx.bezierCurveTo(-0.46 * r, 0.48 * r, -0.22 * r, 0.3 * r, 0.06 * r, 0.14 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Thick-bodied broad-jawed bass silhouette
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.34 * r, 0);
      ctx.bezierCurveTo(1.26 * r, -0.3 * r, 0.78 * r, -0.5 * r, 0.16 * r, -0.48 * r);
      ctx.bezierCurveTo(-0.42 * r, -0.46 * r, -0.82 * r, -0.28 * r, -1.14 * r, -0.13 * r);
      ctx.lineTo(-1.14 * r, 0.13 * r);
      ctx.bezierCurveTo(-0.82 * r, 0.28 * r, -0.42 * r, 0.46 * r, 0.16 * r, 0.48 * r);
      ctx.bezierCurveTo(0.78 * r, 0.5 * r, 1.26 * r, 0.3 * r, 1.34 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.2 * r, -0.06 * r, 0.06 * r, 0.08 * r, 0, 1.34 * r);
    bGrad.addColorStop(0, '#5a803e');
    bGrad.addColorStop(0.38, '#3d612d');
    bGrad.addColorStop(0.74, '#7a9650');
    bGrad.addColorStop(1, '#c8d49e');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Jagged dark-forest flank stripes, mottled olive saddles & heavy gill plates
    ctx.save();
    bodyPath();
    ctx.clip();

    // Mottled darker dorsal saddles
    ctx.fillStyle = 'rgba(26, 48, 22, 0.52)';
    for (const [sx, rx] of [[0.54, 0.18], [0.1, 0.2], [-0.36, 0.18], [-0.76, 0.15]]) {
      ctx.beginPath();
      ctx.ellipse(sx * r, 0, rx * r, 0.34 * r, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Signature jagged dark lateral blotch bands visible along both flanks
    ctx.fillStyle = 'rgba(20, 38, 18, 0.72)';
    for (const side of [-1, 1]) {
      for (let x = 0.62; x >= -0.86; x -= 0.22) {
        ctx.beginPath();
        ctx.ellipse(x * r, side * 0.36 * r, 0.1 * r, 0.068 * r, side * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Crisp gill-cover arcs
    ctx.strokeStyle = 'rgba(22, 42, 18, 0.5)';
    ctx.lineWidth = Math.max(0.9, 0.036 * r);
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.66 * r, side * 0.2 * r, 0.24 * r, side > 0 ? 0.5 : -1.5, side > 0 ? 1.5 : -0.5);
      ctx.stroke();
    }
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(24, 44, 20, 0.5)';
    ctx.lineWidth = Math.max(0.8, 0.03 * r);
    ctx.stroke();

    // Split spiny-to-soft dorsal ridge
    ctx.beginPath();
    ctx.moveTo(0.32 * r, 0);
    ctx.lineTo(-0.1 * r, wag * 0.2 * r);
    ctx.strokeStyle = '#29451e';
    ctx.lineWidth = 0.085 * r;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-0.22 * r, wag * 0.22 * r);
    ctx.lineTo(-0.68 * r, wag * 0.38 * r);
    ctx.strokeStyle = '#486b32';
    ctx.lineWidth = 0.095 * r;
    ctx.stroke();

    // Golden-bronze predator eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.96 * r, side * 0.24 * r, 0.088 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#d9b54a';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.98 * r, side * 0.245 * r, 0.048 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#10170e';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1.0 * r, side * 0.228 * r, 0.018 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Glossy pond-water sheen
    const sheen = ctx.createLinearGradient(0.92 * r, -0.16 * r, -0.42 * r, 0.1 * r);
    sheen.addColorStop(0, 'rgba(246, 255, 224, 0.4)');
    sheen.addColorStop(1, 'rgba(246, 255, 224, 0)');
    ctx.beginPath();
    ctx.ellipse(0.28 * r, -0.09 * r, 0.64 * r, 0.12 * r, -0.05, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 12. SALMON (Spawning Sockeye / Chinook Salmon)
   * Long athletic torpedo with slightly hooked kype snout, vivid crimson-vermilion
   * body contrasting sharply against a metallic forest-jade head, adipose fin, deep V-tail.
   */
  salmonfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const wag = Math.sin(time * (5.2 + spd * 2.4)) * 0.14;
    const fin = Math.sin(time * (4.4 + spd * 1.8)) * 0.14;

    // Shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.42 * r, 0.42 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(20, 18, 22, 0.24)';
    ctx.fill();
    ctx.restore();

    // Crisp swept slate-olive pectoral fins
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.48 * r, side * 0.28 * r);
      ctx.rotate(side * (0.52 + fin * side));
      const pGrad = ctx.createLinearGradient(0, 0, -0.58 * r, side * 0.52 * r);
      pGrad.addColorStop(0, 'rgba(54, 96, 70, 0.9)');
      pGrad.addColorStop(0.65, 'rgba(110, 138, 114, 0.65)');
      pGrad.addColorStop(1, 'rgba(196, 208, 194, 0.26)');
      ctx.beginPath();
      ctx.moveTo(0.08 * r, 0);
      ctx.bezierCurveTo(0.02 * r, side * 0.34 * r, -0.28 * r, side * 0.52 * r, -0.56 * r, side * 0.38 * r);
      ctx.bezierCurveTo(-0.46 * r, side * 0.18 * r, -0.22 * r, side * 0.06 * r, -0.06 * r, 0);
      ctx.closePath();
      ctx.fillStyle = pGrad;
      ctx.fill();
      ctx.restore();
    }

    // Powerful deeply forked olive-crimson V-tail
    ctx.save();
    ctx.translate(-1.2 * r, 0);
    ctx.rotate(wag * 1.4);
    const tGrad = ctx.createLinearGradient(0, 0, -0.68 * r, 0);
    tGrad.addColorStop(0, '#b53226');
    tGrad.addColorStop(0.45, '#4f6d56');
    tGrad.addColorStop(1, 'rgba(128, 152, 132, 0.52)');
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.09 * r);
    ctx.lineTo(-0.68 * r, -0.48 * r);
    ctx.quadraticCurveTo(-0.36 * r, 0, -0.68 * r, 0.48 * r);
    ctx.lineTo(0.06 * r, 0.09 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Long athletic torpedo salmon body
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.44 * r, 0);
      ctx.bezierCurveTo(1.32 * r, -0.22 * r, 0.82 * r, -0.4 * r, 0.14 * r, -0.4 * r);
      ctx.bezierCurveTo(-0.46 * r, -0.38 * r, -0.92 * r, -0.22 * r, -1.24 * r, -0.09 * r);
      ctx.lineTo(-1.24 * r, 0.09 * r);
      ctx.bezierCurveTo(-0.92 * r, 0.22 * r, -0.46 * r, 0.38 * r, 0.14 * r, 0.4 * r);
      ctx.bezierCurveTo(0.82 * r, 0.4 * r, 1.32 * r, 0.22 * r, 1.44 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    // Iconic spawning sockeye palette: metallic forest-jade head -> fiery crimson-vermilion body!
    const bGrad = ctx.createLinearGradient(1.44 * r, 0, -1.24 * r, 0);
    bGrad.addColorStop(0, '#27523a');
    bGrad.addColorStop(0.24, '#447a58');
    bGrad.addColorStop(0.32, '#c73228');
    bGrad.addColorStop(0.66, '#e64935');
    bGrad.addColorStop(1, '#a62620');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Clipped details: rosy flanks, subtle dorsal flecks, gill seam separating jade head from crimson body
    ctx.save();
    bodyPath();
    ctx.clip();

    // Bright vermilion-coral highlight along upper flanks
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(-0.22 * r, side * 0.26 * r, 0.84 * r, 0.12 * r, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 134, 98, 0.36)';
      ctx.fill();
    }

    // Crisp gill-cover boundary between emerald head and crimson torso
    ctx.strokeStyle = 'rgba(20, 44, 30, 0.55)';
    ctx.lineWidth = Math.max(1.0, 0.04 * r);
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.76 * r, side * 0.16 * r, 0.24 * r, side > 0 ? 0.4 : -1.5, side > 0 ? 1.5 : -0.4);
      ctx.stroke();
    }

    // Delicate dark flecks along rear back
    ctx.fillStyle = 'rgba(42, 16, 16, 0.48)';
    for (const [sx, sy] of [[-0.22, -0.1], [-0.38, 0.08], [-0.54, -0.12], [-0.66, 0.06], [-0.82, -0.06], [-0.94, 0.04]]) {
      ctx.beginPath();
      ctx.arc(sx * r, sy * r, 0.026 * r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(64, 18, 16, 0.45)';
    ctx.lineWidth = Math.max(0.8, 0.028 * r);
    ctx.stroke();

    // Dorsal fin & fleshy adipose fin
    ctx.beginPath();
    ctx.moveTo(0.24 * r, 0);
    ctx.quadraticCurveTo(-0.08 * r, wag * 0.42 * r, -0.34 * r, wag * 0.3 * r);
    ctx.strokeStyle = '#9e2620';
    ctx.lineWidth = 0.088 * r;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(-0.86 * r, wag * 0.22 * r, 0.1 * r, 0.04 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#8c221c';
    ctx.fill();

    // Bright silvery-gold salmon eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(1.06 * r, side * 0.19 * r, 0.08 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#e6e8c8';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1.08 * r, side * 0.195 * r, 0.044 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#0e1612';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1.1 * r, side * 0.18 * r, 0.016 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Glossy water sheen
    const sheen = ctx.createLinearGradient(1.0 * r, -0.14 * r, -0.5 * r, 0.1 * r);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.44)');
    sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.beginPath();
    ctx.ellipse(0.28 * r, -0.07 * r, 0.72 * r, 0.1 * r, -0.04, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 13. CATFISH (Channel / Whiskered River Catfish)
   * Wide flat shovel-shaped head, smooth glossy scaleless slate-pewter skin,
   * 4 LONG sweeping sinuous barbels/whiskers, sturdy spine-edged pectorals, forked tail.
   */
  catfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const wag = Math.sin(time * (4.0 + spd * 1.9)) * 0.16;
    const wisk = Math.sin(time * (3.2 + spd * 1.4)) * 0.12;

    // Shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.32 * r, 0.62 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(12, 18, 24, 0.24)';
    ctx.fill();
    ctx.restore();

    // SIGNATURE 4 LONG SWEEPING BARBELS / WHISKERS
    ctx.lineCap = 'round';
    for (const side of [-1, 1]) {
      // 2 dramatic long primary maxillary whiskers sweeping gracefully outward & back
      ctx.beginPath();
      ctx.moveTo(1.02 * r, side * 0.34 * r);
      ctx.bezierCurveTo(
        1.14 * r, side * (0.94 + wisk * 0.4) * r,
        0.58 * r, side * (1.34 + wisk * 0.7) * r,
        0.12 * r, side * (1.28 - wisk * 0.5) * r
      );
      ctx.strokeStyle = '#33404a';
      ctx.lineWidth = Math.max(1.4, 0.055 * r);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(176, 194, 206, 0.55)';
      ctx.lineWidth = Math.max(0.6, 0.02 * r);
      ctx.stroke();

      // 2 shorter forward-sweeping nasal/chin barbels near snout tip
      ctx.beginPath();
      ctx.moveTo(1.16 * r, side * 0.16 * r);
      ctx.quadraticCurveTo(1.44 * r, side * (0.38 + wisk * 0.3) * r, 1.54 * r, side * (0.64 - wisk * 0.3) * r);
      ctx.strokeStyle = '#4a5a66';
      ctx.lineWidth = Math.max(1.0, 0.038 * r);
      ctx.stroke();
    }

    // Sturdy spine-edged pectoral fins
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.32 * r, side * 0.48 * r);
      ctx.rotate(side * (0.38 + wisk * 0.5 * side));
      const pGrad = ctx.createLinearGradient(0, 0, -0.48 * r, side * 0.58 * r);
      pGrad.addColorStop(0, '#44535e');
      pGrad.addColorStop(0.65, '#6e808c');
      pGrad.addColorStop(1, 'rgba(164, 180, 190, 0.4)');
      ctx.beginPath();
      ctx.moveTo(0.1 * r, 0);
      ctx.bezierCurveTo(0.06 * r, side * 0.38 * r, -0.18 * r, side * 0.58 * r, -0.46 * r, side * 0.48 * r);
      ctx.bezierCurveTo(-0.44 * r, side * 0.22 * r, -0.22 * r, side * 0.08 * r, -0.08 * r, 0);
      ctx.closePath();
      ctx.fillStyle = pGrad;
      ctx.fill();
      ctx.restore();
    }

    // Deeply forked whiskery river-catfish tail
    ctx.save();
    ctx.translate(-1.2 * r, 0);
    ctx.rotate(wag * 1.45);
    const tGrad = ctx.createLinearGradient(0, 0, -0.68 * r, 0);
    tGrad.addColorStop(0, '#3e4d59');
    tGrad.addColorStop(0.6, '#647682');
    tGrad.addColorStop(1, 'rgba(148, 166, 178, 0.52)');
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.1 * r);
    ctx.lineTo(-0.68 * r, -0.46 * r);
    ctx.quadraticCurveTo(-0.32 * r, 0, -0.68 * r, 0.46 * r);
    ctx.lineTo(0.06 * r, 0.1 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Wide flat shovel-headed catfish body tapering smoothly to slender tail
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.18 * r, 0);
      ctx.bezierCurveTo(1.18 * r, -0.42 * r, 0.86 * r, -0.66 * r, 0.42 * r, -0.64 * r);
      ctx.bezierCurveTo(-0.08 * r, -0.6 * r, -0.68 * r, -0.34 * r, -1.24 * r, -0.09 * r);
      ctx.lineTo(-1.24 * r, 0.09 * r);
      ctx.bezierCurveTo(-0.68 * r, 0.34 * r, -0.08 * r, 0.6 * r, 0.42 * r, 0.64 * r);
      ctx.bezierCurveTo(0.86 * r, 0.66 * r, 1.18 * r, 0.42 * r, 1.18 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.32 * r, -0.08 * r, 0.06 * r, 0.1 * r, 0, 1.32 * r);
    bGrad.addColorStop(0, '#728592');
    bGrad.addColorStop(0.4, '#4c5d69');
    bGrad.addColorStop(0.8, '#323f4a');
    bGrad.addColorStop(1, '#8ea1ad');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Smooth scaleless velvet mottling & tiny channel-catfish pepper spots
    ctx.save();
    bodyPath();
    ctx.clip();
    ctx.fillStyle = 'rgba(26, 34, 42, 0.48)';
    for (const [sx, sy] of [[0.2, -0.22], [0.05, 0.24], [-0.18, -0.16], [-0.34, 0.18], [-0.52, -0.1], [-0.72, 0.08], [-0.88, -0.06], [0.42, 0.34], [0.38, -0.34]]) {
      ctx.beginPath();
      ctx.arc(sx * r, sy * r, 0.036 * r, 0, Math.PI * 2);
      ctx.fill();
    }
    // Wide flat mouth lip curve across front of shovel head
    ctx.beginPath();
    ctx.arc(0.92 * r, 0, 0.28 * r, -0.95, 0.95);
    ctx.strokeStyle = 'rgba(24, 32, 38, 0.52)';
    ctx.lineWidth = Math.max(1.0, 0.04 * r);
    ctx.stroke();
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(26, 36, 44, 0.55)';
    ctx.lineWidth = Math.max(0.8, 0.03 * r);
    ctx.stroke();

    // Dorsal fin & fleshy adipose ridge
    ctx.beginPath();
    ctx.moveTo(0.24 * r, 0);
    ctx.lineTo(-0.18 * r, wag * 0.28 * r);
    ctx.strokeStyle = '#2d3a44';
    ctx.lineWidth = 0.09 * r;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(-0.74 * r, wag * 0.22 * r, 0.14 * r, 0.045 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#3b4a56';
    ctx.fill();

    // Small widely spaced catfish eyes on broad flat head
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.82 * r, side * 0.38 * r, 0.072 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#c9be82';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.84 * r, side * 0.38 * r, 0.038 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#0f1418';
      ctx.fill();
    }

    // Slick wet scaleless water sheen
    const sheen = ctx.createRadialGradient(0.42 * r, -0.14 * r, 0.04 * r, 0.22 * r, -0.1 * r, 0.85 * r);
    sheen.addColorStop(0, 'rgba(232, 246, 255, 0.45)');
    sheen.addColorStop(1, 'rgba(232, 246, 255, 0)');
    ctx.beginPath();
    ctx.ellipse(0.28 * r, -0.1 * r, 0.68 * r, 0.2 * r, -0.06, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 14. PIRANHA (Red-Bellied Piranha)
   * Compact deep-chested bulldog diamond silhouette with blunt jutting jaw,
   * glittering metallic pewter-indigo back, fierce crimson throat/flank blush & eyes,
   * and bold black-banded forked tail.
   */
  piranhafish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const wag = Math.sin(time * (6.2 + spd * 2.6)) * 0.14;
    const fin = Math.sin(time * (6.5 + spd * 2.4)) * 0.18;

    // Shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.16 * r, 0.56 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(24, 10, 12, 0.25)';
    ctx.fill();
    ctx.restore();

    // Fierce scarlet-tinted pectoral fins
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.32 * r, side * 0.36 * r);
      ctx.rotate(side * (0.42 + fin * side));
      const pGrad = ctx.createLinearGradient(0, 0, -0.44 * r, side * 0.46 * r);
      pGrad.addColorStop(0, 'rgba(222, 42, 38, 0.92)');
      pGrad.addColorStop(0.65, 'rgba(255, 96, 68, 0.72)');
      pGrad.addColorStop(1, 'rgba(255, 168, 134, 0.32)');
      ctx.beginPath();
      ctx.moveTo(0.08 * r, 0);
      ctx.bezierCurveTo(0.04 * r, side * 0.32 * r, -0.18 * r, side * 0.46 * r, -0.42 * r, side * 0.36 * r);
      ctx.bezierCurveTo(-0.36 * r, side * 0.16 * r, -0.16 * r, side * 0.06 * r, -0.06 * r, 0);
      ctx.closePath();
      ctx.fillStyle = pGrad;
      ctx.fill();
      ctx.restore();
    }

    // Crisp forked tail with signature dark charcoal marginal band
    ctx.save();
    ctx.translate(-0.96 * r, 0);
    ctx.rotate(wag * 1.4);
    const tGrad = ctx.createLinearGradient(0, 0, -0.62 * r, 0);
    tGrad.addColorStop(0, '#4d5d6e');
    tGrad.addColorStop(0.65, '#8294a6');
    tGrad.addColorStop(0.84, '#1b2029');
    tGrad.addColorStop(1, '#12151c');
    ctx.beginPath();
    ctx.moveTo(0.05 * r, -0.12 * r);
    ctx.lineTo(-0.62 * r, -0.46 * r);
    ctx.quadraticCurveTo(-0.34 * r, 0, -0.62 * r, 0.46 * r);
    ctx.lineTo(0.05 * r, 0.12 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Compact bulldog-jawed stout piranha body
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.14 * r, 0);
      ctx.bezierCurveTo(1.1 * r, -0.28 * r, 0.72 * r, -0.54 * r, 0.14 * r, -0.56 * r);
      ctx.bezierCurveTo(-0.38 * r, -0.56 * r, -0.76 * r, -0.34 * r, -1.02 * r, -0.12 * r);
      ctx.lineTo(-1.02 * r, 0.12 * r);
      ctx.bezierCurveTo(-0.76 * r, 0.34 * r, -0.38 * r, 0.56 * r, 0.14 * r, 0.56 * r);
      ctx.bezierCurveTo(0.72 * r, 0.54 * r, 1.1 * r, 0.28 * r, 1.14 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.14 * r, -0.06 * r, 0.06 * r, 0.04 * r, 0, 1.16 * r);
    bGrad.addColorStop(0, '#5a6d82');
    bGrad.addColorStop(0.45, '#3b4a5c');
    bGrad.addColorStop(0.78, '#7a333b');
    bGrad.addColorStop(1, '#e02d2d');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Clipped crimson belly edge blush, glittering metallic micro-specks & bulldog jaw line
    ctx.save();
    bodyPath();
    ctx.clip();

    // Vivid glowing red-bellied flank glow peeking along sides
    for (const side of [-1, 1]) {
      const rGrad = ctx.createRadialGradient(0.28 * r, side * 0.54 * r, 0.04 * r, 0.28 * r, side * 0.48 * r, 0.58 * r);
      rGrad.addColorStop(0, 'rgba(255, 54, 42, 0.92)');
      rGrad.addColorStop(0.55, 'rgba(220, 36, 36, 0.48)');
      rGrad.addColorStop(1, 'rgba(220, 36, 36, 0)');
      ctx.fillStyle = rGrad;
      ctx.fillRect(-0.8 * r, side > 0 ? 0 : -0.6 * r, 2.0 * r, 0.6 * r);
    }

    // Glittering silver-gold metallic scale sparkles
    ctx.fillStyle = 'rgba(235, 248, 255, 0.72)';
    const glints = [[0.42, -0.18], [0.22, 0.14], [0.06, -0.24], [-0.14, 0.2], [-0.32, -0.14], [-0.46, 0.1], [0.34, 0.26], [-0.08, -0.06]];
    for (const [gx, gy] of glints) {
      ctx.beginPath();
      ctx.arc(gx * r, gy * r, 0.025 * r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Heavy blunt bulldog jaw crease
    ctx.beginPath();
    ctx.arc(1.16 * r, 0, 0.16 * r, 1.9, 4.38);
    ctx.strokeStyle = 'rgba(24, 28, 36, 0.7)';
    ctx.lineWidth = Math.max(1.0, 0.04 * r);
    ctx.stroke();
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(26, 32, 42, 0.58)';
    ctx.lineWidth = Math.max(0.8, 0.03 * r);
    ctx.stroke();

    // Sharp dorsal fin crest
    ctx.beginPath();
    ctx.moveTo(0.22 * r, 0);
    ctx.quadraticCurveTo(-0.18 * r, wag * 0.42 * r, -0.56 * r, wag * 0.32 * r);
    ctx.strokeStyle = '#252e3a';
    ctx.lineWidth = 0.095 * r;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Fierce crimson-ringed predator eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.78 * r, side * 0.28 * r, 0.098 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ff3b30';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.8 * r, side * 0.285 * r, 0.052 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#0a0c10';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.82 * r, side * 0.268 * r, 0.02 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Metallic water sheen
    const sheen = ctx.createLinearGradient(0.82 * r, -0.18 * r, -0.35 * r, 0.1 * r);
    sheen.addColorStop(0, 'rgba(238, 248, 255, 0.46)');
    sheen.addColorStop(1, 'rgba(238, 248, 255, 0)');
    ctx.beginPath();
    ctx.ellipse(0.22 * r, -0.1 * r, 0.52 * r, 0.13 * r, -0.06, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 15. LIONFISH (Red Lionfish)
   * Dramatic extravagantly long radiating zebra-striped venomous fin plumes,
   * regal cream-ivory & maroon-mahogany zebra bands, feathery brow tentacles,
   * and delicate polka-dotted transparent fan tail.
   */
  lionfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const sway = Math.sin(time * (2.6 + spd * 1.2)) * 0.12;

    // Dramatic feathered shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.14 * r);
    ctx.beginPath();
    ctx.ellipse(-0.08 * r, 0, 1.3 * r, 1.55 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(28, 10, 12, 0.16)';
    ctx.fill();
    ctx.restore();

    // DRAMATIC RADIATING ZEBRA-STRIPED VENOMOUS PECTORAL PLUMES (7 separated feathers per side!)
    for (const side of [-1, 1]) {
      for (let i = 0; i < 7; i++) {
        const frac = i / 6;
        const baseX = (0.48 - frac * 0.52) * r;
        const baseY = side * (0.24 - frac * 0.04) * r;
        const angle = side * (0.68 + frac * 1.15 + Math.sin(time * 2.8 + i * 0.6) * 0.06);
        const len = (1.68 - Math.abs(frac - 0.35) * 0.55) * r;
        const tipX = baseX + Math.cos(angle) * len;
        const tipY = baseY + Math.sin(angle) * len;
        const ctrlX = baseX + Math.cos(angle - side * 0.25) * len * 0.56;
        const ctrlY = baseY + Math.sin(angle - side * 0.25) * len * 0.56;

        // Translucent scalloped plume membrane
        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        ctx.quadraticCurveTo(ctrlX + 0.09 * r, ctrlY, tipX, tipY);
        ctx.quadraticCurveTo(ctrlX - 0.09 * r, ctrlY, baseX - 0.06 * r, baseY);
        ctx.closePath();
        const plumeGrad = ctx.createLinearGradient(baseX, baseY, tipX, tipY);
        plumeGrad.addColorStop(0, 'rgba(138, 28, 22, 0.9)');
        plumeGrad.addColorStop(0.22, 'rgba(255, 242, 220, 0.88)');
        plumeGrad.addColorStop(0.42, 'rgba(126, 24, 20, 0.86)');
        plumeGrad.addColorStop(0.62, 'rgba(255, 244, 224, 0.82)');
        plumeGrad.addColorStop(0.82, 'rgba(148, 32, 24, 0.78)');
        plumeGrad.addColorStop(1, 'rgba(255, 246, 230, 0.65)');
        ctx.fillStyle = plumeGrad;
        ctx.fill();

        // Crisp central venomous quill spine
        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, tipX, tipY);
        ctx.strokeStyle = 'rgba(72, 16, 14, 0.58)';
        ctx.lineWidth = Math.max(0.7, 0.024 * r);
        ctx.stroke();
      }
    }

    // Delicate transparent polka-dotted fan tail
    ctx.save();
    ctx.translate(-1.04 * r, 0);
    ctx.rotate(sway * 1.2);
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.1 * r);
    ctx.bezierCurveTo(-0.22 * r, -0.34 * r, -0.62 * r, -0.44 * r, -0.64 * r, 0);
    ctx.bezierCurveTo(-0.62 * r, 0.44 * r, -0.22 * r, 0.34 * r, 0.06 * r, 0.1 * r);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 244, 232, 0.36)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(148, 42, 34, 0.35)';
    ctx.lineWidth = Math.max(0.6, 0.02 * r);
    ctx.stroke();
    ctx.fillStyle = 'rgba(84, 20, 18, 0.75)';
    for (const [dx, dy] of [[-0.2, -0.1], [-0.36, -0.2], [-0.48, -0.14], [-0.32, 0.02], [-0.46, 0.14], [-0.24, 0.16], [-0.52, 0.0]]) {
      ctx.beginPath();
      ctx.arc(dx * r, dy * r, 0.026 * r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Slender regal lionfish central torso
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.22 * r, 0);
      ctx.bezierCurveTo(1.12 * r, -0.26 * r, 0.68 * r, -0.4 * r, 0.12 * r, -0.36 * r);
      ctx.bezierCurveTo(-0.42 * r, -0.32 * r, -0.82 * r, -0.18 * r, -1.08 * r, -0.09 * r);
      ctx.lineTo(-1.08 * r, 0.09 * r);
      ctx.bezierCurveTo(-0.82 * r, 0.18 * r, -0.42 * r, 0.32 * r, 0.12 * r, 0.36 * r);
      ctx.bezierCurveTo(0.68 * r, 0.4 * r, 1.12 * r, 0.26 * r, 1.22 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createLinearGradient(1.22 * r, 0, -1.08 * r, 0);
    bGrad.addColorStop(0, '#fff2db');
    bGrad.addColorStop(0.5, '#fae4c3');
    bGrad.addColorStop(1, '#e8cda5');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Crisp alternating maroon-crimson & chocolate zebra bands across torso
    ctx.save();
    bodyPath();
    ctx.clip();
    const stripeXs = [0.96, 0.72, 0.48, 0.22, -0.04, -0.3, -0.56, -0.82];
    for (let i = 0; i < stripeXs.length; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#8c1c16' : '#4d1412';
      ctx.fillRect((stripeXs[i] - 0.065) * r, -0.45 * r, 0.13 * r, 0.9 * r);
    }
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(72, 16, 14, 0.55)';
    ctx.lineWidth = Math.max(0.8, 0.028 * r);
    ctx.stroke();

    // Waving central venomous dorsal plume row along spine
    for (let i = 0; i < 6; i++) {
      const px = (0.44 - i * 0.24) * r;
      const py = Math.sin(time * 3.0 + i * 0.7) * 0.08 * r;
      ctx.beginPath();
      ctx.moveTo(px + 0.06 * r, 0);
      ctx.quadraticCurveTo(px - 0.12 * r, py, px - 0.24 * r, py * 1.4);
      ctx.strokeStyle = i % 2 === 0 ? '#8c1c16' : '#fff2dc';
      ctx.lineWidth = Math.max(1.2, 0.055 * r);
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Feathery supraorbital tentacles above eyes + glossy crimson eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(0.86 * r, side * 0.18 * r);
      ctx.quadraticCurveTo(1.06 * r, side * 0.36 * r, 1.18 * r, side * 0.44 * r);
      ctx.strokeStyle = '#9e241c';
      ctx.lineWidth = Math.max(0.9, 0.032 * r);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0.88 * r, side * 0.2 * r, 0.082 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffcf70';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.9 * r, side * 0.205 * r, 0.044 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#140808';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.92 * r, side * 0.19 * r, 0.016 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Glossy water sheen
    const sheen = ctx.createLinearGradient(0.8 * r, -0.14 * r, -0.4 * r, 0.1 * r);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.beginPath();
    ctx.ellipse(0.22 * r, -0.06 * r, 0.56 * r, 0.1 * r, -0.04, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 16. SCORPIONFISH (Tasseled / Reef Scorpionfish)
   * Broad craggy armored head with skin tassels/cirri, wide radiating barred
   * venomous pectoral fans, volcanic crimson-rust reef camouflage & dorsal spines.
   */
  scorpionfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const sway = Math.sin(time * (3.0 + spd * 1.4)) * 0.1;

    // Shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.24 * r, 1.15 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(28, 12, 10, 0.24)';
    ctx.fill();
    ctx.restore();

    // Wide radiating barred venomous pectoral fans with spiny tips
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.28 * r, side * 0.36 * r);
      ctx.rotate(side * (0.14 + sway * 0.5));
      const fGrad = ctx.createRadialGradient(0, 0, 0.08 * r, -0.1 * r, side * 0.45 * r, 1.05 * r);
      fGrad.addColorStop(0, '#96281c');
      fGrad.addColorStop(0.42, '#d4582e');
      fGrad.addColorStop(0.7, '#4a1812');
      fGrad.addColorStop(0.88, '#f0a66e');
      fGrad.addColorStop(1, 'rgba(245, 212, 178, 0.55)');

      ctx.beginPath();
      ctx.moveTo(0.24 * r, 0);
      ctx.bezierCurveTo(0.32 * r, side * 0.56 * r, 0.02 * r, side * 1.08 * r, -0.34 * r, side * 1.06 * r);
      ctx.bezierCurveTo(-0.68 * r, side * 0.92 * r, -0.78 * r, side * 0.46 * r, -0.36 * r, side * 0.14 * r);
      ctx.closePath();
      ctx.fillStyle = fGrad;
      ctx.fill();

      // Radiating spiny venomous rays poking past the fan edge
      ctx.strokeStyle = '#ffd29e';
      ctx.lineWidth = Math.max(0.9, 0.032 * r);
      ctx.lineCap = 'round';
      for (let i = 0; i < 8; i++) {
        const a = side * (0.55 + i * 0.24);
        const len = (0.98 + (i % 2) * 0.12) * r;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Barred rounded scorpionfish tail
    ctx.save();
    ctx.translate(-1.02 * r, 0);
    ctx.rotate(sway * 1.2);
    const tGrad = ctx.createLinearGradient(0, 0, -0.58 * r, 0);
    tGrad.addColorStop(0, '#8f241c');
    tGrad.addColorStop(0.45, '#e89668');
    tGrad.addColorStop(0.75, '#5e1612');
    tGrad.addColorStop(1, 'rgba(242, 188, 148, 0.65)');
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.15 * r);
    ctx.bezierCurveTo(-0.22 * r, -0.36 * r, -0.56 * r, -0.38 * r, -0.58 * r, 0);
    ctx.bezierCurveTo(-0.56 * r, 0.38 * r, -0.22 * r, 0.36 * r, 0.06 * r, 0.15 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Broad armored spiny-headed scorpionfish body
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.18 * r, 0);
      ctx.bezierCurveTo(1.12 * r, -0.36 * r, 0.78 * r, -0.58 * r, 0.34 * r, -0.54 * r);
      ctx.bezierCurveTo(-0.18 * r, -0.48 * r, -0.72 * r, -0.32 * r, -1.06 * r, -0.14 * r);
      ctx.lineTo(-1.06 * r, 0.14 * r);
      ctx.bezierCurveTo(-0.72 * r, 0.32 * r, -0.18 * r, 0.48 * r, 0.34 * r, 0.54 * r);
      ctx.bezierCurveTo(0.78 * r, 0.58 * r, 1.12 * r, 0.36 * r, 1.18 * r, 0);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.28 * r, -0.08 * r, 0.06 * r, 0.1 * r, 0, 1.24 * r);
    bGrad.addColorStop(0, '#d9542b');
    bGrad.addColorStop(0.42, '#9e261c');
    bGrad.addColorStop(0.78, '#661a16');
    bGrad.addColorStop(1, '#c46a4a');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Volcanic coral-crust mottling, algae patches & white calcareous speckles
    ctx.save();
    bodyPath();
    ctx.clip();
    const patches = [
      [0.44, -0.24, 0.18, 'rgba(92, 118, 62, 0.45)'],
      [0.36, 0.28, 0.16, 'rgba(228, 134, 152, 0.42)'],
      [-0.14, -0.22, 0.2, 'rgba(54, 16, 12, 0.55)'],
      [-0.22, 0.24, 0.18, 'rgba(92, 118, 62, 0.42)'],
      [-0.64, 0, 0.18, 'rgba(54, 16, 12, 0.5)']
    ];
    for (const [px, py, pr, col] of patches) {
      ctx.beginPath();
      ctx.arc(px * r, py * r, pr * r, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(255, 236, 214, 0.65)';
    for (const [sx, sy] of [[0.72, -0.12], [0.54, 0.16], [0.18, -0.32], [0.02, 0.18], [-0.34, -0.14], [-0.52, 0.12], [-0.82, -0.04]]) {
      ctx.beginPath();
      ctx.arc(sx * r, sy * r, 0.03 * r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(58, 14, 10, 0.6)';
    ctx.lineWidth = Math.max(0.8, 0.03 * r);
    ctx.stroke();

    // Fleshy reef-camouflage tassels/cirri around jaw & cheeks
    ctx.strokeStyle = '#f09468';
    ctx.lineWidth = Math.max(1.0, 0.036 * r);
    ctx.lineCap = 'round';
    for (const side of [-1, 1]) {
      for (const [tx, ty, dx, dy] of [[0.96, 0.32, 0.16, 0.16], [0.64, 0.5, 0.08, 0.18], [0.36, 0.52, -0.06, 0.16]]) {
        ctx.beginPath();
        ctx.moveTo(tx * r, side * ty * r);
        ctx.lineTo((tx + dx) * r, side * (ty + dy) * r);
        ctx.stroke();
      }
    }

    // Bristling venomous dorsal spine ridge down centerline
    for (let x = 0.42; x >= -0.72; x -= 0.16) {
      ctx.beginPath();
      ctx.moveTo(x * r, 0);
      ctx.lineTo((x - 0.14) * r, sway * 0.45 * r);
      ctx.strokeStyle = '#ff4b36';
      ctx.lineWidth = Math.max(1.2, 0.048 * r);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc((x - 0.14) * r, sway * 0.45 * r, 0.028 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#fff0cc';
      ctx.fill();
    }

    // Bony-ridged ambush eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.76 * r, side * 0.26 * r, 0.092 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#e88b3c';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.78 * r, side * 0.26 * r, 0.048 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#140806';
      ctx.fill();
    }

    ctx.restore();
  },

  /**
   * 17. STONEFISH (Reef Stonefish)
   * Craggy, asymmetrical, weathered rock-faceted ambush silhouette, mottled mossy
   * basalt-gray/lichen-green/silty-ochre camouflage, thick rock lobes & 13 dorsal spine nubs.
   */
  stonefish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const shift = Math.sin(time * (2.2 + spd * 1.0)) * 0.06;

    // Heavy rock contact shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.14 * r);
    ctx.beginPath();
    ctx.ellipse(-0.02 * r, 0, 1.14 * r, 0.98 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(18, 22, 16, 0.3)';
    ctx.fill();
    ctx.restore();

    // Thick stubby rock-textured pectoral lobes
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(0.16 * r, side * 0.56 * r);
      ctx.rotate(side * (0.08 + shift * side));
      ctx.beginPath();
      ctx.moveTo(0.28 * r, -side * 0.06 * r);
      ctx.lineTo(0.36 * r, side * 0.34 * r);
      ctx.lineTo(0.08 * r, side * 0.64 * r);
      ctx.lineTo(-0.28 * r, side * 0.56 * r);
      ctx.lineTo(-0.46 * r, side * 0.26 * r);
      ctx.lineTo(-0.24 * r, 0);
      ctx.closePath();
      const lGrad = ctx.createRadialGradient(0, side * 0.24 * r, 0.04 * r, 0, side * 0.28 * r, 0.58 * r);
      lGrad.addColorStop(0, '#6e755c');
      lGrad.addColorStop(0.65, '#4d5242');
      lGrad.addColorStop(1, '#8c8064');
      ctx.fillStyle = lGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(34, 38, 28, 0.62)';
      ctx.lineWidth = Math.max(0.8, 0.03 * r);
      ctx.stroke();
      ctx.restore();
    }

    // Craggy stubby weathered tail
    ctx.save();
    ctx.translate(-0.92 * r, 0);
    ctx.rotate(shift * 1.2);
    ctx.beginPath();
    ctx.moveTo(0.08 * r, -0.2 * r);
    ctx.lineTo(-0.34 * r, -0.34 * r);
    ctx.lineTo(-0.5 * r, -0.14 * r);
    ctx.lineTo(-0.46 * r, 0.18 * r);
    ctx.lineTo(-0.28 * r, 0.32 * r);
    ctx.lineTo(0.08 * r, 0.2 * r);
    ctx.closePath();
    ctx.fillStyle = '#5c5e4c';
    ctx.fill();
    ctx.strokeStyle = 'rgba(32, 34, 26, 0.58)';
    ctx.lineWidth = Math.max(0.8, 0.028 * r);
    ctx.stroke();
    ctx.restore();

    // Jagged, asymmetrical, craggy stone-faceted body silhouette
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.06 * r, -0.04 * r);
      ctx.lineTo(0.94 * r, -0.42 * r);
      ctx.lineTo(0.62 * r, -0.68 * r);
      ctx.lineTo(0.24 * r, -0.78 * r);
      ctx.lineTo(-0.18 * r, -0.72 * r);
      ctx.lineTo(-0.58 * r, -0.56 * r);
      ctx.lineTo(-0.96 * r, -0.2 * r);
      ctx.lineTo(-0.96 * r, 0.22 * r);
      ctx.lineTo(-0.62 * r, 0.54 * r);
      ctx.lineTo(-0.14 * r, 0.76 * r);
      ctx.lineTo(0.32 * r, 0.74 * r);
      ctx.lineTo(0.74 * r, 0.58 * r);
      ctx.lineTo(1.02 * r, 0.34 * r);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.18 * r, -0.12 * r, 0.08 * r, 0, 0, 1.12 * r);
    bGrad.addColorStop(0, '#787d63');
    bGrad.addColorStop(0.45, '#595e4c');
    bGrad.addColorStop(0.82, '#3d4235');
    bGrad.addColorStop(1, '#7a7058');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Clipped mottled mossy stone camouflage: basalt facets, lichen tufts, coralline crusts, crevices
    ctx.save();
    bodyPath();
    ctx.clip();

    const mossPatches = [
      [0.34, -0.34, 0.22, 'rgba(92, 122, 66, 0.62)'],
      [-0.24, 0.32, 0.24, 'rgba(84, 114, 58, 0.58)'],
      [0.12, 0.14, 0.2, 'rgba(154, 134, 96, 0.52)'],
      [-0.48, -0.22, 0.18, 'rgba(134, 82, 64, 0.45)'],
      [0.64, 0.16, 0.18, 'rgba(66, 72, 56, 0.65)'],
      [-0.08, -0.48, 0.17, 'rgba(168, 162, 134, 0.46)']
    ];
    for (const [mx, my, mr, col] of mossPatches) {
      ctx.beginPath();
      ctx.ellipse(mx * r, my * r, mr * r, mr * 0.76 * r, mx * 2, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    }

    // Craggy rock fracture lines
    ctx.strokeStyle = 'rgba(26, 30, 22, 0.55)';
    ctx.lineWidth = Math.max(0.8, 0.028 * r);
    const cracks = [
      [[0.58, -0.42], [0.22, -0.16], [-0.14, -0.34]],
      [[0.46, 0.36], [0.06, 0.14], [-0.32, 0.4]],
      [[-0.24, -0.06], [-0.62, 0.08]]
    ];
    for (const c of cracks) {
      ctx.beginPath();
      ctx.moveTo(c[0][0] * r, c[0][1] * r);
      for (let i = 1; i < c.length; i++) ctx.lineTo(c[i][0] * r, c[i][1] * r);
      ctx.stroke();
    }

    // Crusty pale sand/barnacle mineral grains
    ctx.fillStyle = 'rgba(222, 214, 186, 0.62)';
    for (const [bx, by] of [[0.48, -0.14], [0.28, 0.34], [-0.08, -0.18], [-0.36, 0.12], [-0.58, -0.14], [0.14, -0.52], [-0.22, 0.52]]) {
      ctx.beginPath();
      ctx.arc(bx * r, by * r, 0.034 * r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(28, 32, 24, 0.68)';
    ctx.lineWidth = Math.max(0.9, 0.032 * r);
    ctx.stroke();

    // Row of stout venomous dorsal spine nubs along rocky ridge
    for (let x = 0.44; x >= -0.68; x -= 0.16) {
      ctx.beginPath();
      ctx.arc(x * r, 0, 0.052 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#363b2d';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x * r - 0.015 * r, 0, 0.024 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#d6cca6';
      ctx.fill();
    }

    // Small sunken camouflaged eyes tucked into bony stone pits
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.72 * r, side * 0.28 * r, 0.072 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#33382b';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.73 * r, side * 0.28 * r, 0.04 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#b5a25c';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.74 * r, side * 0.28 * r, 0.02 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#11140e';
      ctx.fill();
    }

    ctx.restore();
  },

  /**
   * 18. HALIBUT (Pacific / Atlantic Halibut)
   * Muscular sleek elongated diamond-kite flatfish silhouette (distinct from flounder!),
   * cool deep slate-olive & espresso-bronze mottling, concave crescent moon tail,
   * and BOTH predator eyes shifted onto one side of the elongated head.
   */
  halibutfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const ripple = Math.sin(time * (3.6 + spd * 1.8));
    const wag = ripple * 0.11;

    // Sleek kite shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.12 * r);
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.38 * r, 0.94 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10, 20, 22, 0.24)';
    ctx.fill();
    ctx.restore();

    // Sweeping angular translucent slate-olive kite fin border
    const finGrad = ctx.createRadialGradient(0, 0, 0.4 * r, 0, 0, 1.28 * r);
    finGrad.addColorStop(0, 'rgba(66, 84, 72, 0.9)');
    finGrad.addColorStop(0.74, 'rgba(104, 122, 108, 0.72)');
    finGrad.addColorStop(1, 'rgba(164, 182, 172, 0.34)');

    ctx.beginPath();
    ctx.moveTo(1.26 * r, 0.02 * r);
    ctx.lineTo(0.06 * r, -1.08 * r + ripple * 0.05 * r);
    ctx.bezierCurveTo(-0.48 * r, -0.82 * r, -0.88 * r, -0.44 * r, -1.16 * r, -0.14 * r);
    ctx.lineTo(-1.16 * r, 0.14 * r);
    ctx.bezierCurveTo(-0.88 * r, 0.42 * r, -0.44 * r, 0.76 * r, 0.12 * r, 0.98 * r - ripple * 0.05 * r);
    ctx.closePath();
    ctx.fillStyle = finGrad;
    ctx.fill();

    // Crisp fin rays along diamond kite edges
    ctx.strokeStyle = 'rgba(34, 48, 42, 0.34)';
    ctx.lineWidth = Math.max(0.6, 0.02 * r);
    for (let x = 0.84; x >= -0.92; x -= 0.18) {
      const span = (1.0 - Math.abs(x + 0.04) * 0.75) * r;
      if (span <= 0.18 * r) continue;
      ctx.beginPath();
      ctx.moveTo(x * r, -span * 0.62);
      ctx.lineTo(x * r, -span * 1.02);
      ctx.moveTo(x * r, span * 0.6);
      ctx.lineTo(x * r, span * 0.96);
      ctx.stroke();
    }

    // SIGNATURE BROAD CONCAVE / CRESCENT MOON HALIBUT TAIL (unlike flounder's rounded fan!)
    ctx.save();
    ctx.translate(-1.14 * r, 0);
    ctx.rotate(wag * 1.3);
    const tGrad = ctx.createLinearGradient(0, 0, -0.62 * r, 0);
    tGrad.addColorStop(0, '#36473e');
    tGrad.addColorStop(0.65, '#596e62');
    tGrad.addColorStop(1, 'rgba(136, 156, 146, 0.56)');
    ctx.beginPath();
    ctx.moveTo(0.06 * r, -0.12 * r);
    ctx.lineTo(-0.62 * r, -0.48 * r);
    ctx.quadraticCurveTo(-0.38 * r, 0, -0.62 * r, 0.48 * r);
    ctx.lineTo(0.06 * r, 0.12 * r);
    ctx.closePath();
    ctx.fillStyle = tGrad;
    ctx.fill();
    ctx.restore();

    // Muscular elongated diamond-kite halibut body
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.38 * r, 0.02 * r);
      ctx.bezierCurveTo(1.06 * r, -0.34 * r, 0.52 * r, -0.78 * r, 0.04 * r, -0.82 * r);
      ctx.bezierCurveTo(-0.44 * r, -0.76 * r, -0.86 * r, -0.38 * r, -1.18 * r, -0.11 * r);
      ctx.lineTo(-1.18 * r, 0.11 * r);
      ctx.bezierCurveTo(-0.86 * r, 0.36 * r, -0.4 * r, 0.68 * r, 0.08 * r, 0.74 * r);
      ctx.bezierCurveTo(0.56 * r, 0.7 * r, 1.06 * r, 0.32 * r, 1.38 * r, 0.02 * r);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createRadialGradient(0.18 * r, -0.1 * r, 0.08 * r, 0.04 * r, 0, 1.36 * r);
    bGrad.addColorStop(0, '#5a6e5e');
    bGrad.addColorStop(0.45, '#3b4c42');
    bGrad.addColorStop(0.84, '#25332d');
    bGrad.addColorStop(1, '#4c5e54');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Cool cold-water slate-seafoam & espresso mottling + arched lateral line
    ctx.save();
    bodyPath();
    ctx.clip();
    const mottles = [
      [0.34, -0.36, 0.14], [0.06, -0.44, 0.16], [-0.32, -0.32, 0.15],
      [0.24, 0.32, 0.15], [-0.14, 0.38, 0.14], [-0.52, 0.2, 0.12],
      [0.02, -0.06, 0.16], [-0.46, -0.08, 0.14], [-0.78, 0.04, 0.1]
    ];
    for (let i = 0; i < mottles.length; i++) {
      const [mx, my, mr] = mottles[i];
      ctx.beginPath();
      ctx.ellipse(mx * r, my * r, mr * r, mr * 0.72 * r, i * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(148, 170, 158, 0.3)' : 'rgba(22, 32, 28, 0.42)';
      ctx.fill();
    }
    // Signature halibut arched lateral line
    ctx.beginPath();
    ctx.moveTo(0.58 * r, -0.04 * r);
    ctx.quadraticCurveTo(0.28 * r, -0.28 * r, -0.04 * r, -0.02 * r);
    ctx.lineTo(-1.12 * r, 0);
    ctx.strokeStyle = 'rgba(182, 202, 192, 0.36)';
    ctx.lineWidth = Math.max(0.8, 0.026 * r);
    ctx.stroke();
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(22, 34, 30, 0.56)';
    ctx.lineWidth = Math.max(0.8, 0.028 * r);
    ctx.stroke();

    // BOTH sharp predatory eyes shifted onto the upper (-Y) side of the head!
    for (const [ex, ey] of [[0.84 * r, -0.22 * r], [0.98 * r, -0.04 * r]]) {
      ctx.beginPath();
      ctx.arc(ex, ey, 0.098 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#33443c';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ex + 0.012 * r, ey, 0.068 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#d4dde0';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ex + 0.024 * r, ey, 0.038 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#0d1412';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ex + 0.036 * r, ey - 0.016 * r, 0.015 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Cold-water glossy sheen
    const sheen = ctx.createLinearGradient(0.9 * r, -0.26 * r, -0.4 * r, 0.2 * r);
    sheen.addColorStop(0, 'rgba(220, 245, 240, 0.3)');
    sheen.addColorStop(1, 'rgba(220, 245, 240, 0)');
    ctx.beginPath();
    ctx.ellipse(0.18 * r, -0.14 * r, 0.68 * r, 0.24 * r, -0.12, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 19. RIBBONFISH (Oarfish / Silver Scabbard Ribbonfish)
   * Long, ultra-slender sinuous S-wave undulating serpentine liquid-silver body
   * with a continuous fiery crimson-scarlet undulating dorsal mane & regal head plumes!
   */
  ribbonfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const freq = 3.2;
    const phase = time * (4.4 + spd * 2.2);

    // Compute smooth S-wave spine points from nose (+1.32*r) to whip filament (-2.42*r)
    const segs = 28;
    const spine = [];
    for (let i = 0; i <= segs; i++) {
      const u = i / segs; // 0 at head, 1 at whip tip
      const x = (1.32 - u * 3.74) * r;
      const amp = (0.04 + Math.pow(u, 1.35) * 0.44) * r;
      const y = Math.sin(u * Math.PI * freq - phase) * amp;
      const halfW = (u < 0.1 ? (0.08 + u * 1.4) : 0.22 * Math.pow(1 - u, 1.25) + 0.012) * r;
      spine.push({ x, y, halfW, u });
    }

    // Compute smooth normals for left/right ribbon edges
    const leftPts = [];
    const rightPts = [];
    for (let i = 0; i <= segs; i++) {
      const prev = spine[Math.max(0, i - 1)];
      const next = spine[Math.min(segs, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      leftPts.push({ x: spine[i].x + nx * spine[i].halfW, y: spine[i].y + ny * spine[i].halfW });
      rightPts.push({ x: spine[i].x - nx * spine[i].halfW, y: spine[i].y - ny * spine[i].halfW });
    }

    // Soft serpentine shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.14 * r);
    ctx.beginPath();
    ctx.moveTo(spine[0].x, spine[0].y);
    for (let i = 1; i <= segs; i++) ctx.lineTo(spine[i].x, spine[i].y);
    ctx.strokeStyle = 'rgba(12, 32, 52, 0.18)';
    ctx.lineWidth = 0.34 * r;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();

    // Regal sweeping crimson oarfish head crown plumes!
    ctx.lineCap = 'round';
    for (const side of [-1, 1]) {
      const wave = Math.sin(phase - 0.8) * 0.12 * r;
      ctx.beginPath();
      ctx.moveTo(1.16 * r, spine[0].y + side * 0.04 * r);
      ctx.bezierCurveTo(
        0.92 * r, spine[0].y + side * 0.42 * r + wave,
        0.54 * r, spine[0].y + side * 0.56 * r - wave,
        0.24 * r, spine[0].y + side * 0.46 * r + wave
      );
      ctx.strokeStyle = '#e62229';
      ctx.lineWidth = Math.max(1.2, 0.052 * r);
      ctx.stroke();
      // Glowing scarlet tip bead
      ctx.beginPath();
      ctx.arc(0.24 * r, spine[0].y + side * 0.46 * r + wave, 0.045 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ff5c4d';
      ctx.fill();
    }

    // Build closed liquid-silver undulating ribbon body
    ctx.beginPath();
    ctx.moveTo(leftPts[0].x, leftPts[0].y);
    for (let i = 1; i <= segs; i++) ctx.lineTo(leftPts[i].x, leftPts[i].y);
    for (let i = segs; i >= 0; i--) ctx.lineTo(rightPts[i].x, rightPts[i].y);
    ctx.closePath();

    const bodyGrad = ctx.createLinearGradient(1.32 * r, -0.3 * r, -2.42 * r, 0.3 * r);
    bodyGrad.addColorStop(0, '#eef8ff');
    bodyGrad.addColorStop(0.25, '#b6d8eb');
    bodyGrad.addColorStop(0.55, '#e8f6ff');
    bodyGrad.addColorStop(0.82, '#8cb8d4');
    bodyGrad.addColorStop(1, '#d8eefc');
    ctx.fillStyle = bodyGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(54, 96, 128, 0.42)';
    ctx.lineWidth = Math.max(0.7, 0.022 * r);
    ctx.stroke();

    // Iridescent metallic blue-cyan shimmer bars along serpentine ribbon
    ctx.strokeStyle = 'rgba(84, 162, 212, 0.42)';
    ctx.lineWidth = Math.max(0.7, 0.025 * r);
    for (let i = 3; i < segs - 3; i += 2) {
      ctx.beginPath();
      ctx.moveTo(leftPts[i].x, leftPts[i].y);
      ctx.lineTo(rightPts[i].x, rightPts[i].y);
      ctx.stroke();
    }

    // Continuous fiery crimson-scarlet undulating dorsal mane along entire spine
    ctx.beginPath();
    ctx.moveTo(spine[1].x, spine[1].y);
    for (let i = 2; i <= segs - 1; i++) {
      const crestOff = Math.sin(spine[i].u * 14 - phase * 1.2) * 0.045 * r;
      ctx.lineTo(spine[i].x, spine[i].y + crestOff);
    }
    const maneGrad = ctx.createLinearGradient(1.2 * r, 0, -2.3 * r, 0);
    maneGrad.addColorStop(0, '#ff3b30');
    maneGrad.addColorStop(0.55, '#e62229');
    maneGrad.addColorStop(1, 'rgba(255, 92, 74, 0.45)');
    ctx.strokeStyle = maneGrad;
    ctx.lineWidth = Math.max(1.6, 0.075 * r);
    ctx.stroke();

    // Glossy specular highlight streak along head & upper ribbon
    ctx.beginPath();
    ctx.moveTo(spine[1].x, spine[1].y - 0.05 * r);
    for (let i = 2; i <= 12; i++) ctx.lineTo(spine[i].x, spine[i].y - 0.04 * r);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = Math.max(0.8, 0.032 * r);
    ctx.stroke();

    // Bright silvery-ruby eyes near blunt ribbonfish brow
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(1.08 * r, spine[1].y + side * 0.11 * r, 0.07 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#fff0d4';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1.1 * r, spine[1].y + side * 0.11 * r, 0.038 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#141c2e';
      ctx.fill();
    }

    ctx.restore();
  },

  /**
   * 20. MORAY EEL (Green / Honeycomb Moray Eel)
   * Thick muscular sinuous S-wave undulating serpentine eel body, lush kelp-green
   * & chartreuse skin with dark reticulated mottling, continuous fleshy dorsal fin
   * crest, reptilian pointed snout, tubular nostrils, and piercing golden eyes.
   */
  morayeelfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const phase = time * (3.8 + spd * 2.0);

    // Smooth thick S-wave eel spine from reptilian snout (+1.28*r) to paddle tail (-2.28*r)
    const segs = 26;
    const spine = [];
    for (let i = 0; i <= segs; i++) {
      const u = i / segs;
      const x = (1.28 - u * 3.56) * r;
      const amp = (0.03 + Math.pow(u, 1.25) * 0.38) * r;
      const y = Math.sin(u * Math.PI * 2.6 - phase) * amp;
      let halfW;
      if (u < 0.12) {
        halfW = (0.09 + (u / 0.12) * 0.21) * r;
      } else if (u < 0.35) {
        halfW = (0.30 + Math.sin(((u - 0.12) / 0.23) * Math.PI) * 0.04) * r;
      } else {
        halfW = (0.30 * Math.pow(1 - (u - 0.35) / 0.65, 0.72) + 0.06) * r;
      }
      spine.push({ x, y, halfW, u });
    }

    const leftPts = [];
    const rightPts = [];
    for (let i = 0; i <= segs; i++) {
      const prev = spine[Math.max(0, i - 1)];
      const next = spine[Math.min(segs, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      leftPts.push({ x: spine[i].x + nx * spine[i].halfW, y: spine[i].y + ny * spine[i].halfW });
      rightPts.push({ x: spine[i].x - nx * spine[i].halfW, y: spine[i].y - ny * spine[i].halfW });
    }

    // Serpentine shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.14 * r);
    ctx.beginPath();
    ctx.moveTo(spine[0].x, spine[0].y);
    for (let i = 1; i <= segs; i++) ctx.lineTo(spine[i].x, spine[i].y);
    ctx.strokeStyle = 'rgba(12, 28, 12, 0.24)';
    ctx.lineWidth = 0.56 * r;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();

    // Closed muscular eel body path
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(spine[0].x + 0.08 * r, spine[0].y);
      for (let i = 0; i <= segs; i++) ctx.lineTo(leftPts[i].x, leftPts[i].y);
      ctx.arc(spine[segs].x, spine[segs].y, spine[segs].halfW, Math.PI * 0.5, Math.PI * 1.5);
      for (let i = segs; i >= 0; i--) ctx.lineTo(rightPts[i].x, rightPts[i].y);
      ctx.closePath();
    };

    bodyPath();
    const bGrad = ctx.createLinearGradient(1.28 * r, -0.3 * r, -2.28 * r, 0.3 * r);
    bGrad.addColorStop(0, '#5a8f29');
    bGrad.addColorStop(0.28, '#82b835');
    bGrad.addColorStop(0.65, '#4b7a24');
    bGrad.addColorStop(1, '#315419');
    ctx.fillStyle = bGrad;
    ctx.fill();

    // Clipped honeycomb/leopard dark kelp mottling & subtle gill pores
    ctx.save();
    bodyPath();
    ctx.clip();
    for (let i = 2; i < segs - 1; i += 2) {
      const s = spine[i];
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.ellipse(s.x, s.y + side * s.halfW * 0.56, 0.1 * r, 0.068 * r, side * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(28, 52, 16, 0.48)';
        ctx.fill();
      }
    }
    ctx.restore();

    bodyPath();
    ctx.strokeStyle = 'rgba(24, 48, 14, 0.55)';
    ctx.lineWidth = Math.max(0.8, 0.028 * r);
    ctx.stroke();

    // Continuous thick fleshy chartreuse-lime dorsal fin crest along entire spine
    ctx.beginPath();
    ctx.moveTo(spine[3].x, spine[3].y);
    for (let i = 4; i <= segs; i++) {
      const crestOff = Math.sin(spine[i].u * 10 - phase * 1.1) * 0.035 * r;
      ctx.lineTo(spine[i].x, spine[i].y + crestOff);
    }
    ctx.strokeStyle = '#c4e352';
    ctx.lineWidth = Math.max(2.0, 0.11 * r);
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.strokeStyle = 'rgba(242, 255, 168, 0.55)';
    ctx.lineWidth = Math.max(0.8, 0.04 * r);
    ctx.stroke();

    // Subtle dark round gill-pore slits behind muscular cheeks
    ctx.fillStyle = '#1c3010';
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(0.62 * r, spine[4].y + side * 0.28 * r, 0.055 * r, 0.025 * r, side * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Tiny tubular nostrils at pointed snout tip + piercing golden-amber predator eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(1.24 * r, spine[0].y + side * 0.065 * r, 0.025 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#cbe856';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(1.02 * r, spine[1].y + side * 0.145 * r, 0.072 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd633';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1.04 * r, spine[1].y + side * 0.145 * r, 0.036 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#101408';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1.055 * r, spine[1].y + side * 0.132 * r, 0.015 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Glossy slimy water sheen along head & upper back
    const sheen = ctx.createLinearGradient(1.1 * r, -0.1 * r, -0.2 * r, 0.1 * r);
    sheen.addColorStop(0, 'rgba(245, 255, 210, 0.44)');
    sheen.addColorStop(1, 'rgba(245, 255, 210, 0)');
    ctx.beginPath();
    ctx.ellipse(0.62 * r, spine[3].y - 0.06 * r, 0.44 * r, 0.09 * r, -0.05, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 21. STINGRAY (Blue-Spotted / Southern Stingray)
   * Wide graceful sweeping diamond pectoral wings with undulating wingtip waves,
   * sandy-ochre velvety disc studded with luminous cobalt-cyan ocelli, twin spiracles,
   * and a long sinuous undulating whip tail armed with an ivory venomous barb!
   */
  stingrayfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const wingWave = Math.sin(time * (3.2 + spd * 1.4));
    const wingWave2 = Math.cos(time * (3.2 + spd * 1.4));
    const tailPhase = time * (3.8 + spd * 1.8);

    // Wide graceful diamond shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.16 * r);
    ctx.beginPath();
    ctx.moveTo(1.12 * r, 0);
    ctx.quadraticCurveTo(0.28 * r, -1.48 * r, -0.78 * r, -0.42 * r);
    ctx.lineTo(-0.78 * r, 0.42 * r);
    ctx.quadraticCurveTo(0.28 * r, 1.48 * r, 1.12 * r, 0);
    ctx.closePath();
    ctx.fillStyle = 'rgba(18, 22, 24, 0.2)';
    ctx.fill();
    ctx.restore();

    // LONG SINUOUS UNDULATING WHIP TAIL trailing from -0.78*r to -2.48*r
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-0.74 * r, 0);
    const tailPts = [];
    for (let i = 1; i <= 16; i++) {
      const u = i / 16;
      const tx = (-0.74 - u * 1.74) * r;
      const ty = Math.sin(u * 4.2 - tailPhase) * (0.04 + u * 0.24) * r;
      tailPts.push({ x: tx, y: ty });
      ctx.lineTo(tx, ty);
    }
    ctx.strokeStyle = '#6e583b';
    ctx.lineWidth = Math.max(1.8, 0.095 * r);
    ctx.lineCap = 'round';
    ctx.stroke();

    // Sleek tapered outer whip tip
    ctx.beginPath();
    ctx.moveTo(tailPts[6].x, tailPts[6].y);
    for (let i = 7; i < tailPts.length; i++) ctx.lineTo(tailPts[i].x, tailPts[i].y);
    ctx.strokeStyle = '#4a3b26';
    ctx.lineWidth = Math.max(1.0, 0.044 * r);
    ctx.stroke();

    // Signature pale-ivory venomous tail barb near tail base
    const bPt = tailPts[3];
    ctx.beginPath();
    ctx.moveTo(bPt.x + 0.08 * r, bPt.y);
    ctx.lineTo(bPt.x - 0.26 * r, bPt.y - 0.07 * r);
    ctx.lineTo(bPt.x - 0.04 * r, bPt.y + 0.03 * r);
    ctx.closePath();
    ctx.fillStyle = '#fff5dc';
    ctx.fill();
    ctx.restore();

    // Twin rounded pelvic fin lobes at rear of disc
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(-0.74 * r, side * 0.26 * r, 0.26 * r, 0.16 * r, side * -0.45, 0, Math.PI * 2);
      ctx.fillStyle = '#7d6543';
      ctx.fill();
    }

    // Wide graceful diamond pectoral wing disc with gentle animated edge undulation
    const tipY = (1.46 + wingWave * 0.07) * r;
    const leadCtrlY = (0.76 + wingWave2 * 0.06) * r;
    const trailCtrlY = (0.96 - wingWave2 * 0.06) * r;

    const discPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.16 * r, 0);
      ctx.bezierCurveTo(0.88 * r, -leadCtrlY * 0.48, 0.42 * r, -leadCtrlY, 0.04 * r, -tipY);
      ctx.bezierCurveTo(-0.22 * r, -tipY * 0.96, -0.58 * r, -trailCtrlY * 0.72, -0.84 * r, -0.22 * r);
      ctx.lineTo(-0.84 * r, 0.22 * r);
      ctx.bezierCurveTo(-0.58 * r, trailCtrlY * 0.72, -0.22 * r, tipY * 0.96, 0.04 * r, tipY);
      ctx.bezierCurveTo(0.42 * r, leadCtrlY, 0.88 * r, leadCtrlY * 0.48, 1.16 * r, 0);
      ctx.closePath();
    };

    discPath();
    const dGrad = ctx.createRadialGradient(0.16 * r, -0.08 * r, 0.08 * r, 0.05 * r, 0, 1.48 * r);
    dGrad.addColorStop(0, '#c2a674');
    dGrad.addColorStop(0.42, '#9c8052');
    dGrad.addColorStop(0.78, '#735c3a');
    dGrad.addColorStop(1, '#d4bc8e');
    ctx.fillStyle = dGrad;
    ctx.fill();

    // Clipped blue-spotted ribbontail ray ocelli & raised dorsal spine shading
    ctx.save();
    discPath();
    ctx.clip();

    // Subtle dark spine ridge along midline
    const ridgeGrad = ctx.createLinearGradient(0.8 * r, 0, -0.84 * r, 0);
    ridgeGrad.addColorStop(0, 'rgba(72, 54, 32, 0.35)');
    ridgeGrad.addColorStop(1, 'rgba(54, 40, 22, 0.6)');
    ctx.beginPath();
    ctx.ellipse(0.02 * r, 0, 0.86 * r, 0.14 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = ridgeGrad;
    ctx.fill();

    // Luminous cobalt-cyan blue spots scattered across the diamond wings
    const blueSpots = [
      [0.42, -0.34, 0.075], [0.16, -0.68, 0.085], [-0.08, -1.02, 0.07],
      [-0.24, -0.46, 0.08], [-0.52, -0.32, 0.065], [0.04, -0.28, 0.07],
      [0.42, 0.34, 0.075], [0.16, 0.68, 0.085], [-0.08, 1.02, 0.07],
      [-0.24, 0.46, 0.08], [-0.52, 0.32, 0.065], [0.04, 0.28, 0.07],
      [0.64, -0.18, 0.055], [0.64, 0.18, 0.055], [-0.36, -0.78, 0.06], [-0.36, 0.78, 0.06]
    ];
    for (const [bx, by, br] of blueSpots) {
      ctx.beginPath();
      ctx.arc(bx * r, by * r, br * 1.25 * r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(26, 78, 142, 0.55)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bx * r, by * r, br * 0.85 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#38d8ff';
      ctx.fill();
    }
    ctx.restore();

    discPath();
    ctx.strokeStyle = 'rgba(84, 66, 40, 0.45)';
    ctx.lineWidth = Math.max(0.8, 0.026 * r);
    ctx.stroke();

    // Paired breathing spiracles immediately behind raised golden eyes
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(0.32 * r, side * 0.2 * r, 0.075 * r, 0.045 * r, side * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = '#473620';
      ctx.fill();

      // Raised dorsal eyes
      ctx.beginPath();
      ctx.ellipse(0.52 * r, side * 0.19 * r, 0.088 * r, 0.064 * r, side * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = '#e8c866';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.54 * r, side * 0.19 * r, 0.042 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#120e08';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.56 * r, side * 0.175 * r, 0.016 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Glossy water sheen across diamond disc
    const sheen = ctx.createRadialGradient(0.24 * r, -0.32 * r, 0.06 * r, 0.12 * r, -0.24 * r, 0.88 * r);
    sheen.addColorStop(0, 'rgba(255, 250, 232, 0.34)');
    sheen.addColorStop(1, 'rgba(255, 250, 232, 0)');
    ctx.beginPath();
    ctx.ellipse(0.14 * r, -0.24 * r, 0.64 * r, 0.28 * r, -0.25, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 22. ELECTRIC RAY (Torpedo Ray)
   * Plump circular/rounded guitar-disc pectoral wings (distinct from stingray's diamond!),
   * thick muscular shark-like tail with sturdy paddle caudal fin, deep midnight-indigo disc
   * illuminated by glowing pulsing electric-blue kidney organ markings & crackling cyan arcs!
   */
  electricrayfish(ctx, r, t, speed) {
    ctx.save();
    const time = t || 0;
    const spd = speed == null ? 1 : speed;
    const wag = Math.sin(time * (4.0 + spd * 1.8)) * 0.16;
    const pulse = 0.68 + 0.32 * Math.sin(time * 5.2);

    // Rounded disc shadow
    ctx.save();
    ctx.translate(-0.04 * r, 0.16 * r);
    ctx.beginPath();
    ctx.ellipse(0.06 * r, 0, 1.14 * r, 1.26 * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(8, 12, 28, 0.26)';
    ctx.fill();
    ctx.restore();

    // Thick muscular torpedo-ray tail + sturdy rounded paddle caudal fin
    ctx.save();
    ctx.translate(-0.82 * r, 0);
    ctx.rotate(wag * 1.25);

    // Muscular tail stalk
    const tailGrad = ctx.createLinearGradient(0, 0, -1.16 * r, 0);
    tailGrad.addColorStop(0, '#1e2c54');
    tailGrad.addColorStop(0.65, '#152040');
    tailGrad.addColorStop(1, '#283d72');
    ctx.beginPath();
    ctx.moveTo(0.12 * r, -0.22 * r);
    ctx.bezierCurveTo(-0.34 * r, -0.2 * r, -0.74 * r, -0.14 * r, -1.04 * r, -0.12 * r);
    ctx.lineTo(-1.26 * r, -0.34 * r);
    ctx.quadraticCurveTo(-1.34 * r, 0, -1.26 * r, 0.34 * r);
    ctx.lineTo(-1.04 * r, 0.12 * r);
    ctx.bezierCurveTo(-0.74 * r, 0.14 * r, -0.34 * r, 0.2 * r, 0.12 * r, 0.22 * r);
    ctx.closePath();
    ctx.fillStyle = tailGrad;
    ctx.fill();

    // Glowing cyan streak down muscular tail
    ctx.beginPath();
    ctx.moveTo(-0.08 * r, 0);
    ctx.lineTo(-1.08 * r, 0);
    ctx.strokeStyle = `rgba(56, 232, 255, ${(0.45 * pulse).toFixed(2)})`;
    ctx.lineWidth = Math.max(1.0, 0.042 * r);
    ctx.lineCap = 'round';
    ctx.stroke();

    // Small twin dorsal fins perched on tail stalk
    ctx.fillStyle = '#253868';
    ctx.beginPath();
    ctx.ellipse(-0.34 * r, 0, 0.14 * r, 0.06 * r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-0.68 * r, 0, 0.11 * r, 0.05 * r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Broad rounded fleshy pelvic fins behind main circular disc
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(-0.76 * r, side * 0.34 * r, 0.32 * r, 0.22 * r, side * -0.35, 0, Math.PI * 2);
      ctx.fillStyle = '#1b284d';
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 224, 255, 0.35)';
      ctx.lineWidth = Math.max(0.7, 0.024 * r);
      ctx.stroke();
    }

    // SIGNATURE PLUMP CIRCULAR / ROUNDED TORPEDO-RAY DISC (blunt rounded front edge)
    const discPath = () => {
      ctx.beginPath();
      ctx.moveTo(1.02 * r, 0);
      ctx.bezierCurveTo(1.02 * r, -0.68 * r, 0.62 * r, -1.24 * r, 0.04 * r, -1.24 * r);
      ctx.bezierCurveTo(-0.56 * r, -1.24 * r, -0.92 * r, -0.78 * r, -0.9 * r, -0.22 * r);
      ctx.lineTo(-0.9 * r, 0.22 * r);
      ctx.bezierCurveTo(-0.92 * r, 0.78 * r, -0.56 * r, 1.24 * r, 0.04 * r, 1.24 * r);
      ctx.bezierCurveTo(0.62 * r, 1.24 * r, 1.02 * r, 0.68 * r, 1.02 * r, 0);
      ctx.closePath();
    };

    discPath();
    const dGrad = ctx.createRadialGradient(0.14 * r, -0.12 * r, 0.08 * r, 0.04 * r, 0, 1.28 * r);
    dGrad.addColorStop(0, '#324882');
    dGrad.addColorStop(0.45, '#1e2c57');
    dGrad.addColorStop(0.84, '#121b38');
    dGrad.addColorStop(1, '#263a6e');
    ctx.fillStyle = dGrad;
    ctx.fill();

    // Clipped GLOWING ELECTRIC-BLUE KIDNEY BIO-ORGANS, PLASMA OCELLI & CRACKLING CYAN ARCS
    ctx.save();
    discPath();
    ctx.clip();

    for (const side of [-1, 1]) {
      // Soft luminous electric-blue bio-organ aura on each wing
      const aura = ctx.createRadialGradient(0.08 * r, side * 0.62 * r, 0.04 * r, 0.08 * r, side * 0.62 * r, 0.56 * r);
      aura.addColorStop(0, `rgba(72, 236, 255, ${(0.62 * pulse).toFixed(2)})`);
      aura.addColorStop(0.55, `rgba(0, 168, 255, ${(0.28 * pulse).toFixed(2)})`);
      aura.addColorStop(1, 'rgba(0, 128, 255, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.ellipse(0.08 * r, side * 0.62 * r, 0.52 * r, 0.42 * r, side * -0.15, 0, Math.PI * 2);
      ctx.fill();

      // Kidney-shaped bio-electric organ honeycomb/arc outline
      ctx.beginPath();
      ctx.ellipse(0.08 * r, side * 0.62 * r, 0.38 * r, 0.24 * r, side * -0.18, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(110, 244, 255, ${(0.85 * pulse).toFixed(2)})`;
      ctx.lineWidth = Math.max(1.0, 0.04 * r);
      ctx.stroke();

      // Crackling jagged electric-blue bolt zig-zag across each organ
      ctx.beginPath();
      ctx.moveTo(0.42 * r, side * 0.56 * r);
      ctx.lineTo(0.22 * r, side * (0.68 + Math.sin(time * 9) * 0.04) * r);
      ctx.lineTo(0.06 * r, side * 0.54 * r);
      ctx.lineTo(-0.12 * r, side * (0.7 - Math.cos(time * 8) * 0.04) * r);
      ctx.lineTo(-0.32 * r, side * 0.58 * r);
      ctx.strokeStyle = '#d4fcff';
      ctx.lineWidth = Math.max(0.9, 0.032 * r);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Luminous concentric plasma-blue spots along outer wing margin
      for (const [sx, sy] of [[0.54, 0.72], [-0.06, 1.02], [-0.52, 0.74], [-0.46, 0.34]]) {
        ctx.beginPath();
        ctx.arc(sx * r, side * sy * r, 0.068 * r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 198, 255, ${(0.78 * pulse).toFixed(2)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(sx * r, side * sy * r, 0.032 * r, 0, Math.PI * 2);
        ctx.fillStyle = '#e0fdff';
        ctx.fill();
      }
    }
    ctx.restore();

    // Rim outline with subtle electric-cyan bioluminescent edge
    discPath();
    ctx.strokeStyle = `rgba(74, 224, 255, ${(0.55 * pulse).toFixed(2)})`;
    ctx.lineWidth = Math.max(0.9, 0.032 * r);
    ctx.stroke();

    // Small close-set eyes + spiracles near front center of circular disc
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.36 * r, side * 0.17 * r, 0.052 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#0a1024';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0.56 * r, side * 0.16 * r, 0.072 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#7ef2ff';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.58 * r, side * 0.16 * r, 0.038 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#090e1c';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0.595 * r, side * 0.148 * r, 0.015 * r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // Glossy abyssal water sheen
    const sheen = ctx.createRadialGradient(0.2 * r, -0.26 * r, 0.04 * r, 0.12 * r, -0.2 * r, 0.78 * r);
    sheen.addColorStop(0, 'rgba(210, 245, 255, 0.34)');
    sheen.addColorStop(1, 'rgba(210, 245, 255, 0)');
    ctx.beginPath();
    ctx.ellipse(0.14 * r, -0.2 * r, 0.56 * r, 0.24 * r, -0.18, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.restore();
  }
};

  return module.exports;
})();

const PAINTED_FISH_3 = (() => {
  const module = { exports: {} };
  const exports = module.exports;
'use strict';

/**
 * Handcrafted top-down 2D Canvas painted illustrations for 22 apex species
 * and 3 tiny prey species.
 *
 * Coordinate contract:
 * - ctx is already translated to (0, 0) and rotated facing RIGHT (+X nose, -X tail).
 * - r is base radius (~30px for apex fish, ~15px for prey).
 * - t is elapsed time in seconds; speed is swimming speed multiplier.
 */

function normSpeed(speed) {
  return typeof speed === 'number' && Number.isFinite(speed) ? Math.max(0.35, speed) : 1;
}

module.exports = {
  // 1. Arowana — elongated silver-gold prehistoric ribbon predator with chin barbels & metallic scales
  arowanafish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 5.2 * spd) * r * 0.22;
    const wag2 = Math.sin(t * 5.2 * spd - 1.0) * r * 0.34;
    const pecBeat = Math.sin(t * 4.0 * spd) * 0.14;

    // Soft underwater drop shadow
    ctx.save();
    ctx.translate(0, r * 0.12);
    ctx.fillStyle = 'rgba(8, 22, 34, 0.24)';
    ctx.beginPath();
    ctx.moveTo(r * 2.15, 0);
    ctx.bezierCurveTo(r * 1.4, -r * 0.52, -r * 0.6, -r * 0.44, -r * 2.35, wag2);
    ctx.bezierCurveTo(-r * 0.6, r * 0.44, r * 1.4, r * 0.52, r * 2.15, 0);
    ctx.fill();
    ctx.restore();

    // Flowing posterior ribbon fin fringe (dorsal/anal shimmer)
    const finGrad = ctx.createLinearGradient(-r * 0.4, 0, -r * 2.4, 0);
    finGrad.addColorStop(0, 'rgba(232, 198, 132, 0.55)');
    finGrad.addColorStop(0.6, 'rgba(255, 225, 168, 0.72)');
    finGrad.addColorStop(1, 'rgba(220, 148, 96, 0.78)');
    ctx.fillStyle = finGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 0.45, -r * 0.34 + wag * 0.2);
    ctx.quadraticCurveTo(-r * 1.45, -r * 0.62 + wag * 0.7, -r * 2.48, -r * 0.34 + wag2);
    ctx.quadraticCurveTo(-r * 2.72, wag2, -r * 2.48, r * 0.34 + wag2);
    ctx.quadraticCurveTo(-r * 1.45, r * 0.62 + wag * 0.7, -r * 0.45, r * 0.34 + wag * 0.2);
    ctx.closePath();
    ctx.fill();

    // Broad paddle-like wing pectorals
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(r * 0.72, side * r * 0.28);
      ctx.rotate(side * (0.45 + pecBeat));
      const pGrad = ctx.createLinearGradient(0, 0, -r * 0.9, side * r * 0.85);
      pGrad.addColorStop(0, 'rgba(235, 220, 185, 0.88)');
      pGrad.addColorStop(0.65, 'rgba(205, 225, 232, 0.58)');
      pGrad.addColorStop(1, 'rgba(255, 212, 155, 0.25)');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(r * 0.12, 0);
      ctx.bezierCurveTo(-r * 0.1, side * r * 0.65, -r * 0.75, side * r * 0.95, -r * 1.12, side * r * 0.48);
      ctx.quadraticCurveTo(-r * 0.55, side * r * 0.16, r * 0.12, 0);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 245, 220, 0.45)';
      ctx.lineWidth = r * 0.03;
      ctx.stroke();
      ctx.restore();
    }

    // Two signature forward chin barbels
    ctx.strokeStyle = '#f5d491';
    ctx.lineWidth = r * 0.055;
    ctx.lineCap = 'round';
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(r * 2.02, side * r * 0.08);
      ctx.quadraticCurveTo(r * 2.38, side * (r * 0.28 + Math.sin(t * 7 * spd) * r * 0.04), r * 2.52, side * r * 0.42);
      ctx.stroke();
    }

    // Elongated blade-like metallic body
    const bodyGrad = ctx.createLinearGradient(r * 2.1, -r * 0.48, -r * 2.1, r * 0.48);
    bodyGrad.addColorStop(0, '#f3e7c8');
    bodyGrad.addColorStop(0.22, '#d8e3e8');
    bodyGrad.addColorStop(0.5, '#9cb5bf');
    bodyGrad.addColorStop(0.78, '#d4b887');
    bodyGrad.addColorStop(1, '#7c8f99');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 2.12, 0);
    ctx.bezierCurveTo(r * 1.82, -r * 0.42, r * 0.6, -r * 0.48, -r * 0.4, -r * 0.34 + wag * 0.22);
    ctx.quadraticCurveTo(-r * 1.4, -r * 0.22 + wag * 0.75, -r * 2.22, wag2);
    ctx.quadraticCurveTo(-r * 1.4, r * 0.22 + wag * 0.75, -r * 0.4, r * 0.34 + wag * 0.22);
    ctx.bezierCurveTo(r * 0.6, r * 0.48, r * 1.82, r * 0.42, r * 2.12, 0);
    ctx.closePath();
    ctx.fill();

    // Iridescent large metallic diamond scale arcs
    ctx.strokeStyle = 'rgba(255, 246, 214, 0.46)';
    ctx.lineWidth = r * 0.032;
    for (let i = 0; i < 7; i++) {
      const sx = r * (1.05 - i * 0.36);
      const sy = wag * Math.max(0, (i - 2) * 0.14);
      const halfW = r * Math.max(0.12, 0.34 - i * 0.03);
      ctx.beginPath();
      ctx.arc(sx, sy, halfW, -Math.PI * 0.42, Math.PI * 0.42);
      ctx.stroke();
    }

    // Golden-bronze dorsal spine ridge
    const ridgeGrad = ctx.createLinearGradient(r * 1.7, 0, -r * 1.9, 0);
    ridgeGrad.addColorStop(0, 'rgba(186, 152, 92, 0.7)');
    ridgeGrad.addColorStop(0.5, 'rgba(116, 146, 158, 0.75)');
    ridgeGrad.addColorStop(1, 'rgba(218, 166, 102, 0.65)');
    ctx.strokeStyle = ridgeGrad;
    ctx.lineWidth = r * 0.13;
    ctx.beginPath();
    ctx.moveTo(r * 1.55, 0);
    ctx.quadraticCurveTo(0, wag * 0.12, -r * 1.95, wag2 * 0.85);
    ctx.stroke();

    // Upturned bony jaw line & large golden eyes
    ctx.strokeStyle = 'rgba(72, 86, 94, 0.55)';
    ctx.lineWidth = r * 0.04;
    ctx.beginPath();
    ctx.arc(r * 1.78, 0, r * 0.25, -Math.PI * 0.35, Math.PI * 0.35);
    ctx.stroke();

    for (const side of [-1, 1]) {
      ctx.fillStyle = '#f2c864';
      ctx.beginPath();
      ctx.ellipse(r * 1.56, side * r * 0.26, r * 0.11, r * 0.075, side * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#141a21';
      ctx.beginPath();
      ctx.arc(r * 1.59, side * r * 0.27, r * 0.052, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy wet dorsal highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
    ctx.beginPath();
    ctx.ellipse(r * 0.55, -r * 0.11, r * 0.88, r * 0.09, -0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 2. Northern Pike — olive-emerald duck-billed ambush torpedo with golden bean spots
  northernpikefish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 5.6 * spd) * r * 0.2;
    const tailWag = Math.sin(t * 5.6 * spd - 0.9) * r * 0.32;

    // Far-back reddish-amber forked tail
    const tailGrad = ctx.createLinearGradient(-r * 1.75, 0, -r * 2.55, 0);
    tailGrad.addColorStop(0, '#8c5334');
    tailGrad.addColorStop(0.55, '#c46a3b');
    tailGrad.addColorStop(1, '#6b3622');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 1.78, tailWag * 0.65);
    ctx.lineTo(-r * 2.58, -r * 0.52 + tailWag);
    ctx.quadraticCurveTo(-r * 2.22, tailWag, -r * 2.58, r * 0.52 + tailWag);
    ctx.closePath();
    ctx.fill();

    // Paired reddish-amber pectoral & pelvic fins
    for (const side of [-1, 1]) {
      ctx.fillStyle = 'rgba(196, 108, 62, 0.78)';
      ctx.beginPath();
      ctx.moveTo(r * 0.82, side * r * 0.34);
      ctx.quadraticCurveTo(r * 0.35, side * r * 0.82, -r * 0.02, side * r * 0.6);
      ctx.quadraticCurveTo(r * 0.25, side * r * 0.32, r * 0.82, side * r * 0.34);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-r * 0.45, side * r * 0.3 + wag * 0.2);
      ctx.quadraticCurveTo(-r * 0.88, side * r * 0.64 + wag * 0.35, -r * 1.08, side * r * 0.42 + wag * 0.45);
      ctx.lineTo(-r * 0.72, side * r * 0.24 + wag * 0.35);
      ctx.fill();
    }

    // Long tubular duck-billed torpedo silhouette
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.45, 0, r * 0.45);
    bodyGrad.addColorStop(0, '#364d2b');
    bodyGrad.addColorStop(0.28, '#55733a');
    bodyGrad.addColorStop(0.5, '#3b5428');
    bodyGrad.addColorStop(0.76, '#5c7c40');
    bodyGrad.addColorStop(1, '#2d4022');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 2.26, -r * 0.14);
    ctx.quadraticCurveTo(r * 2.42, 0, r * 2.26, r * 0.14); // flat duck-bill tip
    ctx.bezierCurveTo(r * 1.65, r * 0.36, r * 0.7, r * 0.44, -r * 0.55, r * 0.34 + wag * 0.22);
    ctx.quadraticCurveTo(-r * 1.35, r * 0.2 + wag * 0.6, -r * 1.92, tailWag * 0.65);
    ctx.quadraticCurveTo(-r * 1.35, -r * 0.2 + wag * 0.6, -r * 0.55, -r * 0.34 + wag * 0.22);
    ctx.bezierCurveTo(r * 0.7, -r * 0.44, r * 1.65, -r * 0.36, r * 2.26, -r * 0.14);
    ctx.closePath();
    ctx.fill();

    // Signature pale golden-yellow bean spots in neat rows
    ctx.fillStyle = 'rgba(236, 224, 140, 0.72)';
    const spots = [
      [1.05, -0.22], [1.05, 0.22], [0.62, -0.26], [0.62, 0.26],
      [0.18, -0.24], [0.18, 0.24], [-0.26, -0.22], [-0.26, 0.22],
      [-0.7, -0.18], [-0.7, 0.18], [-1.12, -0.14], [-1.12, 0.14],
      [0.4, -0.11], [0.4, 0.11], [-0.05, -0.1], [-0.05, 0.1], [-0.5, -0.09], [-0.5, 0.09]
    ];
    for (const [sx, sy] of spots) {
      const dy = sx < 0 ? wag * (-sx * 0.25) : 0;
      ctx.beginPath();
      ctx.ellipse(r * sx, r * sy + dy, r * 0.11, r * 0.045, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Far-back dorsal fin (classic pike silhouette)
    ctx.fillStyle = 'rgba(182, 98, 52, 0.85)';
    ctx.beginPath();
    ctx.ellipse(-r * 1.18, wag * 0.55, r * 0.36, r * 0.09, 0.06, 0, Math.PI * 2);
    ctx.fill();

    // Pale amber predator eyes set back behind duck-bill
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#e5c158';
      ctx.beginPath();
      ctx.arc(r * 1.54, side * r * 0.22, r * 0.085, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#11160f';
      ctx.beginPath();
      ctx.arc(r * 1.57, side * r * 0.22, r * 0.045, 0, Math.PI * 2);
      ctx.fill();
    }

    // Wet specular highlight along dorsal back
    ctx.fillStyle = 'rgba(235, 255, 220, 0.26)';
    ctx.beginPath();
    ctx.ellipse(r * 0.45, -r * 0.12, r * 1.05, r * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 3. Barracuda — razor-thin chrome missile with dark chevron slashes & deeply forked tail
  barracudafish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 7.2 * spd) * r * 0.16;
    const tailWag = Math.sin(t * 7.2 * spd - 0.85) * r * 0.28;

    // Deeply forked dark-tipped scythe caudal fin
    const tailGrad = ctx.createLinearGradient(-r * 1.95, 0, -r * 2.75, 0);
    tailGrad.addColorStop(0, '#5a7384');
    tailGrad.addColorStop(0.6, '#293947');
    tailGrad.addColorStop(1, '#141e27');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 1.92, tailWag * 0.6);
    ctx.lineTo(-r * 2.78, -r * 0.62 + tailWag);
    ctx.quadraticCurveTo(-r * 2.25, tailWag, -r * 2.78, r * 0.62 + tailWag);
    ctx.closePath();
    ctx.fill();

    // Sleek swept-back silver pectorals
    for (const side of [-1, 1]) {
      ctx.fillStyle = 'rgba(176, 202, 218, 0.72)';
      ctx.beginPath();
      ctx.moveTo(r * 0.88, side * r * 0.24);
      ctx.lineTo(r * 0.22, side * r * 0.66);
      ctx.lineTo(r * 0.08, side * r * 0.22);
      ctx.closePath();
      ctx.fill();
    }

    // Razor-sleek chrome-silver missile body
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.34, 0, r * 0.34);
    bodyGrad.addColorStop(0, '#9eb5c4');
    bodyGrad.addColorStop(0.25, '#e8f3fa');
    bodyGrad.addColorStop(0.5, '#3b576c');
    bodyGrad.addColorStop(0.75, '#e2eff7');
    bodyGrad.addColorStop(1, '#8fa6b5');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 2.52, 0); // pointed jutting underbite
    ctx.bezierCurveTo(r * 1.85, -r * 0.32, r * 0.65, -r * 0.34, -r * 0.55, -r * 0.25 + wag * 0.25);
    ctx.quadraticCurveTo(-r * 1.4, -r * 0.15 + wag * 0.65, -r * 2.02, tailWag * 0.6);
    ctx.quadraticCurveTo(-r * 1.4, r * 0.15 + wag * 0.65, -r * 0.55, r * 0.25 + wag * 0.25);
    ctx.bezierCurveTo(r * 0.65, r * 0.34, r * 1.85, r * 0.32, r * 2.52, 0);
    ctx.closePath();
    ctx.fill();

    // Crisp dark steel-blue dorsal chevron slash bars
    ctx.strokeStyle = 'rgba(26, 44, 60, 0.78)';
    ctx.lineWidth = r * 0.065;
    ctx.lineCap = 'round';
    for (let i = 0; i < 11; i++) {
      const bx = r * (1.28 - i * 0.28);
      const by = bx < 0 ? wag * (-bx * 0.22) : 0;
      const w = r * Math.max(0.11, 0.28 - Math.abs(i - 4) * 0.02);
      ctx.beginPath();
      ctx.moveTo(bx - r * 0.07, by - w);
      ctx.lineTo(bx + r * 0.05, by);
      ctx.lineTo(bx - r * 0.07, by + w);
      ctx.stroke();
    }

    // Two small dark dorsal fin ridges
    ctx.fillStyle = '#253847';
    ctx.beginPath();
    ctx.ellipse(r * 0.15, 0, r * 0.2, r * 0.055, 0, 0, Math.PI * 2);
    ctx.ellipse(-r * 1.05, wag * 0.45, r * 0.22, r * 0.055, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fierce icy-silver eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#d7ecf7';
      ctx.beginPath();
      ctx.arc(r * 1.72, side * r * 0.17, r * 0.075, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0c131a';
      ctx.beginPath();
      ctx.arc(r * 1.75, side * r * 0.17, r * 0.04, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sharp chrome specular sheen
    ctx.fillStyle = 'rgba(255, 255, 255, 0.52)';
    ctx.beginPath();
    ctx.ellipse(r * 0.65, -r * 0.09, r * 1.15, r * 0.055, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 4. Tiger Muskie — heavy-shouldered bronze-gold predator with bold dark tiger stripes
  tigermuskiefish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 5.1 * spd) * r * 0.21;
    const tailWag = Math.sin(t * 5.1 * spd - 0.95) * r * 0.34;

    // Rounded-lobe russet-red tail with dark spots
    const tailGrad = ctx.createLinearGradient(-r * 1.7, 0, -r * 2.55, 0);
    tailGrad.addColorStop(0, '#96502d');
    tailGrad.addColorStop(0.55, '#c96236');
    tailGrad.addColorStop(1, '#7a2f1c');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 1.72, tailWag * 0.62);
    ctx.bezierCurveTo(-r * 2.15, -r * 0.45 + tailWag, -r * 2.65, -r * 0.65 + tailWag, -r * 2.48, -r * 0.22 + tailWag);
    ctx.quadraticCurveTo(-r * 2.2, tailWag, -r * 2.48, r * 0.22 + tailWag);
    ctx.bezierCurveTo(-r * 2.65, r * 0.65 + tailWag, -r * 2.15, r * 0.45 + tailWag, -r * 1.72, tailWag * 0.62);
    ctx.closePath();
    ctx.fill();

    // Russet-amber paired fins
    for (const side of [-1, 1]) {
      ctx.fillStyle = 'rgba(198, 96, 52, 0.8)';
      ctx.beginPath();
      ctx.moveTo(r * 0.84, side * r * 0.38);
      ctx.quadraticCurveTo(r * 0.32, side * r * 0.9, -r * 0.08, side * r * 0.62);
      ctx.quadraticCurveTo(r * 0.22, side * r * 0.36, r * 0.84, side * r * 0.38);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-r * 0.4, side * r * 0.34 + wag * 0.2);
      ctx.quadraticCurveTo(-r * 0.85, side * r * 0.68 + wag * 0.4, -r * 1.05, side * r * 0.42 + wag * 0.45);
      ctx.lineTo(-r * 0.72, side * r * 0.25 + wag * 0.35);
      ctx.fill();
    }

    // Muscular heavy-shouldered bronze-gold body
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.5, 0, r * 0.5);
    bodyGrad.addColorStop(0, '#b58d46');
    bodyGrad.addColorStop(0.26, '#e0bc6c');
    bodyGrad.addColorStop(0.5, '#68592e');
    bodyGrad.addColorStop(0.74, '#dbb564');
    bodyGrad.addColorStop(1, '#9c7838');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 2.24, -r * 0.16);
    ctx.quadraticCurveTo(r * 2.42, 0, r * 2.24, r * 0.16);
    ctx.bezierCurveTo(r * 1.6, r * 0.44, r * 0.62, r * 0.52, -r * 0.55, r * 0.38 + wag * 0.24);
    ctx.quadraticCurveTo(-r * 1.32, r * 0.22 + wag * 0.62, -r * 1.88, tailWag * 0.62);
    ctx.quadraticCurveTo(-r * 1.32, -r * 0.22 + wag * 0.62, -r * 0.55, -r * 0.38 + wag * 0.24);
    ctx.bezierCurveTo(r * 0.62, -r * 0.52, r * 1.6, -r * 0.44, r * 2.24, -r * 0.16);
    ctx.closePath();
    ctx.fill();

    // Bold dark tiger stripes across back and flanks
    ctx.strokeStyle = 'rgba(38, 34, 20, 0.82)';
    ctx.lineCap = 'round';
    for (let i = 0; i < 10; i++) {
      const sx = r * (1.22 - i * 0.29);
      const sy = sx < 0 ? wag * (-sx * 0.25) : 0;
      const half = r * Math.max(0.14, 0.42 - Math.abs(i - 3) * 0.035);
      ctx.lineWidth = r * (0.095 - (i % 2) * 0.02);
      ctx.beginPath();
      ctx.moveTo(sx + r * 0.06, sy - half);
      ctx.quadraticCurveTo(sx - r * 0.06, sy, sx + r * 0.06, sy + half);
      ctx.stroke();
    }

    // Far-back russet dorsal fin
    ctx.fillStyle = 'rgba(176, 78, 42, 0.88)';
    ctx.beginPath();
    ctx.ellipse(-r * 1.15, wag * 0.54, r * 0.35, r * 0.1, 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#f4b942';
      ctx.beginPath();
      ctx.arc(r * 1.54, side * r * 0.24, r * 0.088, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#15120c';
      ctx.beginPath();
      ctx.arc(r * 1.57, side * r * 0.24, r * 0.048, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy dorsal sheen
    ctx.fillStyle = 'rgba(255, 245, 210, 0.3)';
    ctx.beginPath();
    ctx.ellipse(r * 0.48, -r * 0.13, r * 0.96, r * 0.09, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 5. Sturgeon — armored prehistoric giant with shovel rostrum, 4 barbels, ivory scute rows & shark-like tail
  sturgeonfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 4.2 * spd) * r * 0.2;
    const tailWag = Math.sin(t * 4.2 * spd - 1.0) * r * 0.36;

    // Asymmetric heterocercal shark-like tail
    const tailGrad = ctx.createLinearGradient(-r * 1.75, 0, -r * 2.85, 0);
    tailGrad.addColorStop(0, '#6a7275');
    tailGrad.addColorStop(0.55, '#4b5256');
    tailGrad.addColorStop(1, '#31373a');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 1.72, tailWag * 0.55);
    ctx.bezierCurveTo(-r * 2.18, -r * 0.35 + tailWag, -r * 2.65, -r * 0.72 + tailWag, -r * 2.95, -r * 0.56 + tailWag);
    ctx.quadraticCurveTo(-r * 2.32, tailWag, -r * 2.38, r * 0.42 + tailWag);
    ctx.quadraticCurveTo(-r * 2.02, r * 0.22 + tailWag * 0.75, -r * 1.72, tailWag * 0.55);
    ctx.closePath();
    ctx.fill();

    // Broad flat wing-like pectoral fins (bottom-cruising hydrofoils)
    for (const side of [-1, 1]) {
      const pGrad = ctx.createLinearGradient(r * 0.85, 0, r * 0.05, side * r * 1.15);
      pGrad.addColorStop(0, '#6d7372');
      pGrad.addColorStop(0.7, '#4f5659');
      pGrad.addColorStop(1, '#cfd4cf');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(r * 0.92, side * r * 0.38);
      ctx.bezierCurveTo(r * 0.65, side * r * 1.08, r * 0.05, side * r * 1.22, -r * 0.22, side * r * 0.78);
      ctx.quadraticCurveTo(r * 0.12, side * r * 0.4, r * 0.92, side * r * 0.38);
      ctx.fill();

      // Pelvic fins
      ctx.fillStyle = '#5c6366';
      ctx.beginPath();
      ctx.moveTo(-r * 0.52, side * r * 0.3 + wag * 0.2);
      ctx.quadraticCurveTo(-r * 0.92, side * r * 0.68 + wag * 0.38, -r * 1.15, side * r * 0.4 + wag * 0.48);
      ctx.lineTo(-r * 0.85, side * r * 0.22 + wag * 0.36);
      ctx.fill();
    }

    // 4 sensory barbels peeking from beneath shovel rostrum
    ctx.strokeStyle = '#d9d3be';
    ctx.lineWidth = r * 0.04;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(r * 1.88, side * r * 0.12);
      ctx.lineTo(r * 2.08, side * r * 0.36);
      ctx.moveTo(r * 1.76, side * r * 0.18);
      ctx.lineTo(r * 1.9, side * r * 0.44);
      ctx.stroke();
    }

    // Elongated armored pentagonal slate-bronze body
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.5, 0, r * 0.5);
    bodyGrad.addColorStop(0, '#8d9289');
    bodyGrad.addColorStop(0.28, '#626b6c');
    bodyGrad.addColorStop(0.5, '#464e52');
    bodyGrad.addColorStop(0.72, '#626b6c');
    bodyGrad.addColorStop(1, '#8d9289');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 2.48, 0); // pointed shovel snout
    ctx.bezierCurveTo(r * 1.9, -r * 0.36, r * 1.05, -r * 0.52, -r * 0.25, -r * 0.4 + wag * 0.18);
    ctx.quadraticCurveTo(-r * 1.15, -r * 0.24 + wag * 0.55, -r * 1.86, tailWag * 0.55);
    ctx.quadraticCurveTo(-r * 1.15, r * 0.24 + wag * 0.55, -r * 0.25, r * 0.4 + wag * 0.18);
    ctx.bezierCurveTo(r * 1.05, r * 0.52, r * 1.9, r * 0.36, r * 2.48, 0);
    ctx.closePath();
    ctx.fill();

    // Raised ivory-cream bony scute plates (central dorsal + two lateral ridges)
    ctx.fillStyle = '#e5e0cc';
    ctx.strokeStyle = 'rgba(46, 50, 52, 0.55)';
    ctx.lineWidth = r * 0.025;
    for (let i = 0; i < 9; i++) {
      const sx = r * (1.15 - i * 0.31);
      const sy = sx < 0 ? wag * (-sx * 0.22) : 0;
      // Central diamond scute
      ctx.beginPath();
      ctx.moveTo(sx + r * 0.11, sy);
      ctx.lineTo(sx, sy - r * 0.085);
      ctx.lineTo(sx - r * 0.12, sy);
      ctx.lineTo(sx, sy + r * 0.085);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Lateral scutes
      if (i > 0 && i < 8) {
        const latY = r * Math.max(0.14, 0.36 - i * 0.03);
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.ellipse(sx, sy + side * latY, r * 0.075, r * 0.038, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Small golden-rimmed eyes on armored head
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#d4c283';
      ctx.beginPath();
      ctx.arc(r * 1.56, side * r * 0.24, r * 0.065, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#121517';
      ctx.beginPath();
      ctx.arc(r * 1.58, side * r * 0.24, r * 0.035, 0, Math.PI * 2);
      ctx.fill();
    }

    // Wet highlight along armored ridge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.beginPath();
    ctx.ellipse(r * 0.72, -r * 0.14, r * 0.9, r * 0.07, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 6. Coelacanth — deep-blue living fossil with fleshy limb-like lobed fins & triple-lobed tail
  coelacanthfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 3.6 * spd) * r * 0.18;
    const tailWag = Math.sin(t * 3.6 * spd - 0.8) * r * 0.26;
    const lobeSwim = Math.sin(t * 4.4 * spd) * 0.22;

    // Iconic triple-lobed diphycercal tail (upper fan, lower fan, central epicaudal tuft)
    const tailGrad = ctx.createLinearGradient(-r * 1.3, 0, -r * 2.45, 0);
    tailGrad.addColorStop(0, '#2a4d78');
    tailGrad.addColorStop(0.65, '#3b6ca1');
    tailGrad.addColorStop(1, '#7bb1de');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 1.25, tailWag * 0.5);
    ctx.bezierCurveTo(-r * 1.65, -r * 0.68 + tailWag, -r * 2.15, -r * 0.72 + tailWag, -r * 2.28, -r * 0.18 + tailWag);
    // Central projecting third lobe
    ctx.lineTo(-r * 2.58, tailWag);
    ctx.lineTo(-r * 2.28, r * 0.18 + tailWag);
    ctx.bezierCurveTo(-r * 2.15, r * 0.72 + tailWag, -r * 1.65, r * 0.68 + tailWag, -r * 1.25, tailWag * 0.5);
    ctx.closePath();
    ctx.fill();

    // Two pairs of signature fleshy stalked limb-like lobed fins
    const drawLobedFin = (x, y, side, scale, phase) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(side * (0.58 + Math.sin(t * 4.4 * spd + phase) * 0.22));
      // Fleshy muscular stalk
      ctx.fillStyle = '#25446b';
      ctx.beginPath();
      ctx.ellipse(-r * 0.14 * scale, side * r * 0.26 * scale, r * 0.16 * scale, r * 0.34 * scale, side * 0.25, 0, Math.PI * 2);
      ctx.fill();
      // Fan-shaped ray fringe around stalk
      ctx.fillStyle = 'rgba(92, 152, 206, 0.76)';
      ctx.beginPath();
      ctx.ellipse(-r * 0.28 * scale, side * r * 0.52 * scale, r * 0.24 * scale, r * 0.32 * scale, side * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawLobedFin(r * 0.55, -r * 0.46, -1, 1.05, 0);
    drawLobedFin(r * 0.55, r * 0.46, 1, 1.05, Math.PI);
    drawLobedFin(-r * 0.35, -r * 0.4 + wag * 0.2, -1, 0.82, Math.PI);
    drawLobedFin(-r * 0.35, r * 0.4 + wag * 0.2, 1, 0.82, 0);

    // Stout chunky armored cobalt-indigo body
    const bodyGrad = ctx.createRadialGradient(r * 0.35, -r * 0.15, r * 0.1, 0, 0, r * 1.9);
    bodyGrad.addColorStop(0, '#4d80b8');
    bodyGrad.addColorStop(0.45, '#274d7c');
    bodyGrad.addColorStop(0.85, '#193254');
    bodyGrad.addColorStop(1, '#102138');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.72, 0);
    ctx.bezierCurveTo(r * 1.52, -r * 0.56, r * 0.52, -r * 0.68, -r * 0.42, -r * 0.48 + wag * 0.2);
    ctx.quadraticCurveTo(-r * 1.05, -r * 0.34 + wag * 0.5, -r * 1.48, tailWag * 0.5);
    ctx.quadraticCurveTo(-r * 1.05, r * 0.34 + wag * 0.5, -r * 0.42, r * 0.48 + wag * 0.2);
    ctx.bezierCurveTo(r * 0.52, r * 0.68, r * 1.52, r * 0.56, r * 1.72, 0);
    ctx.closePath();
    ctx.fill();

    // Irregular chalky luminous pale-blue/white prehistoric blotches
    ctx.fillStyle = 'rgba(202, 232, 255, 0.58)';
    const blotches = [
      [0.82, -0.28, 0.13, 0.08], [0.76, 0.3, 0.12, 0.07],
      [0.32, -0.38, 0.16, 0.09], [0.24, 0.36, 0.15, 0.08],
      [-0.12, -0.24, 0.13, 0.09], [-0.18, 0.22, 0.14, 0.08],
      [-0.62, -0.25, 0.12, 0.07], [-0.66, 0.26, 0.12, 0.07],
      [-0.98, 0.04, 0.11, 0.06], [0.05, 0.02, 0.1, 0.06]
    ];
    for (const [bx, by, rx, ry] of blotches) {
      ctx.beginPath();
      ctx.ellipse(r * bx, r * by + (bx < 0 ? wag * 0.2 : 0), r * rx, r * ry, 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Twin dorsal fin ridges
    ctx.fillStyle = '#1d3c63';
    ctx.beginPath();
    ctx.ellipse(r * 0.25, 0, r * 0.26, r * 0.08, 0, 0, Math.PI * 2);
    ctx.ellipse(-r * 0.65, wag * 0.3, r * 0.22, r * 0.075, 0, 0, Math.PI * 2);
    ctx.fill();

    // Large glowing deep-sea eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#9cd3f5';
      ctx.beginPath();
      ctx.arc(r * 1.18, side * r * 0.32, r * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#091421';
      ctx.beginPath();
      ctx.arc(r * 1.2, side * r * 0.32, r * 0.055, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy dorsal specular curve
    ctx.fillStyle = 'rgba(215, 240, 255, 0.34)';
    ctx.beginPath();
    ctx.ellipse(r * 0.38, -r * 0.16, r * 0.72, r * 0.11, -0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 7. Alligator Gar — armored living-dinosaur ambush predator with toothed croc snout & ganoid scales
  alligatorgarfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 4.5 * spd) * r * 0.19;
    const tailWag = Math.sin(t * 4.5 * spd - 0.9) * r * 0.32;

    // Rounded spotted prehistoric paddle tail
    const tailGrad = ctx.createLinearGradient(-r * 1.75, 0, -r * 2.55, 0);
    tailGrad.addColorStop(0, '#5a613c');
    tailGrad.addColorStop(0.6, '#757d4b');
    tailGrad.addColorStop(1, '#3d4227');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 1.76, tailWag * 0.62);
    ctx.bezierCurveTo(-r * 2.25, -r * 0.54 + tailWag, -r * 2.62, -r * 0.42 + tailWag, -r * 2.58, tailWag);
    ctx.bezierCurveTo(-r * 2.62, r * 0.42 + tailWag, -r * 2.25, r * 0.54 + tailWag, -r * 1.76, tailWag * 0.62);
    ctx.closePath();
    ctx.fill();

    // Small dark-spotted paired fins
    for (const side of [-1, 1]) {
      ctx.fillStyle = 'rgba(116, 122, 74, 0.85)';
      ctx.beginPath();
      ctx.moveTo(r * 0.72, side * r * 0.35);
      ctx.quadraticCurveTo(r * 0.28, side * r * 0.78, -r * 0.05, side * r * 0.55);
      ctx.lineTo(r * 0.26, side * r * 0.32);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-r * 0.52, side * r * 0.3 + wag * 0.25);
      ctx.quadraticCurveTo(-r * 0.9, side * r * 0.62 + wag * 0.4, -r * 1.08, side * r * 0.38 + wag * 0.48);
      ctx.lineTo(-r * 0.82, side * r * 0.22 + wag * 0.38);
      ctx.fill();
    }

    // Subtle protruding alligator teeth along long broad snout
    ctx.fillStyle = '#efe8cf';
    for (let i = 0; i < 6; i++) {
      const tx = r * (1.72 + i * 0.14);
      const ty = r * (0.21 - i * 0.015);
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(tx - r * 0.03, side * (ty - r * 0.02));
        ctx.lineTo(tx, side * (ty + r * 0.06));
        ctx.lineTo(tx + r * 0.03, side * (ty - r * 0.02));
        ctx.fill();
      }
    }

    // Long cylindrical armored alligator-snouted body
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.44, 0, r * 0.44);
    bodyGrad.addColorStop(0, '#787d50');
    bodyGrad.addColorStop(0.28, '#5a633b');
    bodyGrad.addColorStop(0.5, '#3b4226');
    bodyGrad.addColorStop(0.72, '#5a633b');
    bodyGrad.addColorStop(1, '#787d50');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 2.58, -r * 0.11);
    ctx.quadraticCurveTo(r * 2.74, 0, r * 2.58, r * 0.11);
    ctx.lineTo(r * 1.66, r * 0.24); // distinct broad gator snout waist
    ctx.bezierCurveTo(r * 1.25, r * 0.44, r * 0.3, r * 0.45, -r * 0.65, r * 0.34 + wag * 0.25);
    ctx.quadraticCurveTo(-r * 1.38, r * 0.22 + wag * 0.6, -r * 1.88, tailWag * 0.62);
    ctx.quadraticCurveTo(-r * 1.38, -r * 0.22 + wag * 0.6, -r * 0.65, -r * 0.34 + wag * 0.25);
    ctx.bezierCurveTo(r * 0.3, -r * 0.45, r * 1.25, -r * 0.44, r * 1.66, -r * 0.24);
    ctx.closePath();
    ctx.fill();

    // Armored diamond ganoid scale cross-hatching
    ctx.strokeStyle = 'rgba(210, 206, 152, 0.24)';
    ctx.lineWidth = r * 0.028;
    for (let i = 0; i < 8; i++) {
      const gx = r * (1.1 - i * 0.33);
      const gy = gx < 0 ? wag * (-gx * 0.22) : 0;
      ctx.beginPath();
      ctx.moveTo(gx + r * 0.16, gy - r * 0.26);
      ctx.lineTo(gx - r * 0.16, gy + r * 0.26);
      ctx.moveTo(gx + r * 0.16, gy + r * 0.26);
      ctx.lineTo(gx - r * 0.16, gy - r * 0.26);
      ctx.stroke();
    }

    // Dark leopard-like blotches on posterior body & tail
    ctx.fillStyle = 'rgba(28, 30, 18, 0.72)';
    const blotches = [
      [-0.35, -0.18], [-0.42, 0.16], [-0.88, -0.14], [-0.95, 0.15],
      [-1.35, 0.02], [-1.52, -0.12], [-2.12, -0.22], [-2.22, 0.18], [-2.35, -0.02]
    ];
    for (const [bx, by] of blotches) {
      ctx.beginPath();
      ctx.arc(r * bx, r * by + (bx < -1.6 ? tailWag : wag * 0.38), r * 0.075, 0, Math.PI * 2);
      ctx.fill();
    }

    // Far-back dorsal fin & reptilian golden eyes
    ctx.fillStyle = '#474d2c';
    ctx.beginPath();
    ctx.ellipse(-r * 1.25, wag * 0.52, r * 0.32, r * 0.085, 0, 0, Math.PI * 2);
    ctx.fill();

    for (const side of [-1, 1]) {
      ctx.fillStyle = '#d6b64d';
      ctx.beginPath();
      ctx.arc(r * 1.48, side * r * 0.24, r * 0.075, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#12140a';
      ctx.beginPath();
      ctx.arc(r * 1.5, side * r * 0.24, r * 0.04, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy dorsal sheen
    ctx.fillStyle = 'rgba(240, 245, 200, 0.22)';
    ctx.beginPath();
    ctx.ellipse(r * 0.32, -r * 0.11, r * 0.92, r * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 8. Arapaima — massive Amazonian titan transitioning from olive-bronze head to glowing crimson rear
  arapaimafish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 3.8 * spd) * r * 0.2;
    const tailWag = Math.sin(t * 3.8 * spd - 0.9) * r * 0.3;

    // Broad flame-red edged paddle tail
    const tailGrad = ctx.createRadialGradient(-r * 1.95, tailWag, r * 0.1, -r * 2.1, tailWag, r * 0.65);
    tailGrad.addColorStop(0, '#3c4033');
    tailGrad.addColorStop(0.65, '#8c2824');
    tailGrad.addColorStop(1, '#e0422e');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 1.62, tailWag * 0.58);
    ctx.bezierCurveTo(-r * 2.12, -r * 0.62 + tailWag, -r * 2.58, -r * 0.45 + tailWag, -r * 2.56, tailWag);
    ctx.bezierCurveTo(-r * 2.58, r * 0.45 + tailWag, -r * 2.12, r * 0.62 + tailWag, -r * 1.62, tailWag * 0.58);
    ctx.closePath();
    ctx.fill();

    // Broad dark-olive pectorals
    for (const side of [-1, 1]) {
      ctx.fillStyle = 'rgba(72, 78, 60, 0.86)';
      ctx.beginPath();
      ctx.moveTo(r * 0.88, side * r * 0.42);
      ctx.bezierCurveTo(r * 0.45, side * r * 1.02, -r * 0.08, side * r * 0.88, -r * 0.18, side * r * 0.52);
      ctx.quadraticCurveTo(r * 0.25, side * r * 0.38, r * 0.88, side * r * 0.42);
      ctx.fill();
    }

    // Enormous heavy-girthed cylindrical torso with olive-to-crimson gradient
    const bodyGrad = ctx.createLinearGradient(r * 2.1, 0, -r * 2.0, 0);
    bodyGrad.addColorStop(0, '#6e7355');
    bodyGrad.addColorStop(0.35, '#4c5442');
    bodyGrad.addColorStop(0.68, '#543b38');
    bodyGrad.addColorStop(0.88, '#9e2e28');
    bodyGrad.addColorStop(1, '#d63e2c');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 2.12, -r * 0.22);
    ctx.quadraticCurveTo(r * 2.34, 0, r * 2.12, r * 0.22); // broad blunt armored snout
    ctx.bezierCurveTo(r * 1.48, r * 0.56, r * 0.35, r * 0.6, -r * 0.68, r * 0.46 + wag * 0.22);
    ctx.quadraticCurveTo(-r * 1.38, r * 0.32 + wag * 0.55, -r * 1.82, tailWag * 0.58);
    ctx.quadraticCurveTo(-r * 1.38, -r * 0.32 + wag * 0.55, -r * 0.68, -r * 0.46 + wag * 0.22);
    ctx.bezierCurveTo(r * 0.35, -r * 0.6, r * 1.48, -r * 0.56, r * 2.12, -r * 0.22);
    ctx.closePath();
    ctx.fill();

    // Glowing crimson-rimmed giant scale arcs across posterior half
    for (let i = 0; i < 6; i++) {
      const sx = r * (0.35 - i * 0.34);
      const sy = sx < 0 ? wag * (-sx * 0.22) : 0;
      const rad = r * Math.max(0.2, 0.44 - i * 0.035);
      ctx.strokeStyle = i >= 2 ? 'rgba(245, 78, 52, 0.72)' : 'rgba(182, 186, 138, 0.35)';
      ctx.lineWidth = r * 0.052;
      ctx.beginPath();
      ctx.arc(sx, sy, rad, -Math.PI * 0.44, Math.PI * 0.44);
      ctx.stroke();
    }

    // Flat armored head plate lines & eyes
    ctx.strokeStyle = 'rgba(34, 38, 28, 0.55)';
    ctx.lineWidth = r * 0.035;
    ctx.beginPath();
    ctx.moveTo(r * 1.35, -r * 0.36);
    ctx.quadraticCurveTo(r * 1.52, 0, r * 1.35, r * 0.36);
    ctx.stroke();

    for (const side of [-1, 1]) {
      ctx.fillStyle = '#e0a94f';
      ctx.beginPath();
      ctx.arc(r * 1.72, side * r * 0.32, r * 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#12120f';
      ctx.beginPath();
      ctx.arc(r * 1.74, side * r * 0.32, r * 0.042, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy dorsal specular band
    ctx.fillStyle = 'rgba(255, 240, 225, 0.24)';
    ctx.beginPath();
    ctx.ellipse(r * 0.4, -r * 0.16, r * 0.95, r * 0.11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 9. Anglerfish — bulbous pitch-black abyssal head, fang rim, and radiant cyan-gold bioluminescent lure
  anglerfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 4.8 * spd) * r * 0.22;
    const pulse = 0.8 + 0.2 * Math.sin(t * 5.2);
    const lureSway = Math.sin(t * 3.4 * spd) * r * 0.16;

    // Stubby tattered dark tail
    ctx.fillStyle = '#191d2b';
    ctx.beginPath();
    ctx.moveTo(-r * 1.15, wag * 0.5);
    ctx.lineTo(-r * 1.98, -r * 0.45 + wag);
    ctx.quadraticCurveTo(-r * 1.72, wag, -r * 1.98, r * 0.45 + wag);
    ctx.closePath();
    ctx.fill();

    // Fleshy dark pectoral paddles
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#202638';
      ctx.beginPath();
      ctx.ellipse(-r * 0.15, side * r * 0.82, r * 0.36, r * 0.22, side * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Wide crescent jaw rimmed with translucent needle fangs protruding forward
    ctx.fillStyle = '#dcebf5';
    for (let i = -3; i <= 3; i++) {
      const ang = i * 0.22;
      const fx = r * 0.55 + Math.cos(ang) * r * 0.78;
      const fy = Math.sin(ang) * r * 0.72;
      ctx.beginPath();
      ctx.moveTo(fx - r * 0.05, fy - r * 0.04);
      ctx.lineTo(fx + Math.cos(ang) * r * 0.22, fy + Math.sin(ang) * r * 0.18);
      ctx.lineTo(fx - r * 0.05, fy + r * 0.04);
      ctx.closePath();
      ctx.fill();
    }

    // Bulbous pitch-black/charcoal-indigo abyssal teardrop body
    const bodyGrad = ctx.createRadialGradient(r * 0.25, -r * 0.18, r * 0.12, 0, 0, r * 1.45);
    bodyGrad.addColorStop(0, '#363c54');
    bodyGrad.addColorStop(0.5, '#1b1f2e');
    bodyGrad.addColorStop(1, '#0b0d14');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.24, 0);
    ctx.bezierCurveTo(r * 1.18, -r * 0.92, r * 0.12, -r * 0.98, -r * 0.52, -r * 0.48 + wag * 0.18);
    ctx.quadraticCurveTo(-r * 0.98, -r * 0.22 + wag * 0.45, -r * 1.28, wag * 0.5);
    ctx.quadraticCurveTo(-r * 0.98, r * 0.22 + wag * 0.45, -r * 0.52, r * 0.48 + wag * 0.18);
    ctx.bezierCurveTo(r * 0.12, r * 0.98, r * 1.18, r * 0.92, r * 1.24, 0);
    ctx.closePath();
    ctx.fill();

    // Subtle warty dermal bumps
    ctx.fillStyle = 'rgba(72, 82, 112, 0.35)';
    for (const [bx, by, br] of [[0.2, -0.45, 0.11], [0.22, 0.42, 0.1], [-0.25, -0.32, 0.09], [-0.28, 0.34, 0.09]]) {
      ctx.beginPath();
      ctx.arc(r * bx, r * by, r * br, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pale eerie deep-sea eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#8ef0ff';
      ctx.beginPath();
      ctx.arc(r * 0.74, side * r * 0.42, r * 0.085, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#080b12';
      ctx.beginPath();
      ctx.arc(r * 0.76, side * r * 0.42, r * 0.038, 0, Math.PI * 2);
      ctx.fill();
    }

    // Arching illicium stalk + glowing bioluminescent esca bulb
    const lureX = r * 1.88;
    const lureY = lureSway;
    ctx.strokeStyle = '#53627a';
    ctx.lineWidth = r * 0.06;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.42, 0);
    ctx.quadraticCurveTo(r * 1.25, lureY * 0.45 - r * 0.14, lureX, lureY);
    ctx.stroke();

    // Multi-layer bioluminescent halo
    const glowGrad = ctx.createRadialGradient(lureX, lureY, r * 0.04, lureX, lureY, r * 0.62 * pulse);
    glowGrad.addColorStop(0, 'rgba(255, 255, 230, 0.98)');
    glowGrad.addColorStop(0.28, 'rgba(92, 245, 255, 0.82)');
    glowGrad.addColorStop(0.65, 'rgba(42, 178, 255, 0.28)');
    glowGrad.addColorStop(1, 'rgba(42, 178, 255, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(lureX, lureY, r * 0.62 * pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(lureX, lureY, r * 0.13, 0, Math.PI * 2);
    ctx.fill();

    // Glossy obsidian dome highlight
    ctx.fillStyle = 'rgba(170, 225, 255, 0.2)';
    ctx.beginPath();
    ctx.ellipse(r * 0.35, -r * 0.26, r * 0.46, r * 0.16, -0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 10. Viperfish — slender obsidian-violet serpent predator with huge needle fangs & photophores
  viperfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 6.0 * spd) * r * 0.24;
    const wag2 = Math.sin(t * 6.0 * spd - 1.2) * r * 0.38;

    // Small dark forked tail
    ctx.fillStyle = '#21263d';
    ctx.beginPath();
    ctx.moveTo(-r * 2.15, wag2 * 0.8);
    ctx.lineTo(-r * 2.68, -r * 0.38 + wag2);
    ctx.quadraticCurveTo(-r * 2.4, wag2, -r * 2.68, r * 0.38 + wag2);
    ctx.closePath();
    ctx.fill();

    // Long slender undulating obsidian-violet body
    const bodyGrad = ctx.createLinearGradient(r * 1.9, -r * 0.4, -r * 2.2, r * 0.4);
    bodyGrad.addColorStop(0, '#363b5c');
    bodyGrad.addColorStop(0.35, '#1e2138');
    bodyGrad.addColorStop(0.75, '#141729');
    bodyGrad.addColorStop(1, '#262b47');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.92, -r * 0.2);
    ctx.quadraticCurveTo(r * 2.08, 0, r * 1.92, r * 0.2);
    ctx.bezierCurveTo(r * 1.45, r * 0.46, r * 0.95, r * 0.34, r * 0.2, r * 0.24 + wag * 0.18);
    ctx.bezierCurveTo(-r * 0.6, r * 0.18 + wag * 0.55, -r * 1.45, r * 0.12 + wag2 * 0.72, -r * 2.24, wag2 * 0.8);
    ctx.bezierCurveTo(-r * 1.45, -r * 0.12 + wag2 * 0.72, -r * 0.6, -r * 0.18 + wag * 0.55, r * 0.2, -r * 0.24 + wag * 0.18);
    ctx.bezierCurveTo(r * 0.95, -r * 0.34, r * 1.45, -r * 0.46, r * 1.92, -r * 0.2);
    ctx.closePath();
    ctx.fill();

    // Huge menacing translucent needle fangs jutting past the jaw
    ctx.strokeStyle = 'rgba(224, 244, 255, 0.92)';
    ctx.lineWidth = r * 0.055;
    ctx.lineCap = 'round';
    for (const side of [-1, 1]) {
      // Primary huge front fang
      ctx.beginPath();
      ctx.moveTo(r * 1.85, side * r * 0.18);
      ctx.quadraticCurveTo(r * 2.18, side * r * 0.36, r * 2.34, side * r * 0.14);
      ctx.stroke();
      // Secondary fangs
      ctx.lineWidth = r * 0.036;
      ctx.beginPath();
      ctx.moveTo(r * 1.66, side * r * 0.28);
      ctx.lineTo(r * 1.94, side * r * 0.44);
      ctx.moveTo(r * 1.48, side * r * 0.32);
      ctx.lineTo(r * 1.72, side * r * 0.46);
      ctx.stroke();
      ctx.lineWidth = r * 0.055;
    }

    // Glowing rows of cyan-blue photophores along both flanks
    const glowPulse = 0.65 + 0.35 * Math.sin(t * 6.5);
    ctx.fillStyle = `rgba(110, 232, 255, ${glowPulse.toFixed(2)})`;
    for (let i = 0; i < 9; i++) {
      const px = r * (0.95 - i * 0.32);
      const py = i < 3 ? wag * (i * 0.08) : wag2 * ((i - 2) * 0.1);
      const offset = r * Math.max(0.06, 0.22 - i * 0.018);
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.arc(px, py + side * offset, r * 0.042, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Long trailing whip-like dorsal filament with bioluminescent tip
    ctx.strokeStyle = 'rgba(138, 178, 224, 0.65)';
    ctx.lineWidth = r * 0.04;
    ctx.beginPath();
    ctx.moveTo(r * 0.92, 0);
    ctx.bezierCurveTo(r * 0.1, -r * 0.32 + wag * 0.5, -r * 0.9, r * 0.25 + wag2 * 0.6, -r * 1.75, -r * 0.16 + wag2);
    ctx.stroke();

    // Large haunting silver-cyan eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#c2f4ff';
      ctx.beginPath();
      ctx.arc(r * 1.56, side * r * 0.22, r * 0.095, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#090a14';
      ctx.beginPath();
      ctx.arc(r * 1.59, side * r * 0.22, r * 0.048, 0, Math.PI * 2);
      ctx.fill();
    }

    // Metallic iridescent head highlight
    ctx.fillStyle = 'rgba(190, 215, 255, 0.25)';
    ctx.beginPath();
    ctx.ellipse(r * 1.28, -r * 0.1, r * 0.38, r * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 11. Gulper Eel — ultra-long serpentine black whip body, huge pelican-pouch head & glowing pink tail bulb
  gulpereelfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const segs = 16;
    const pts = [];
    for (let i = 0; i <= segs; i++) {
      const frac = i / segs;
      const x = r * (0.9 - frac * 4.3);
      const y = Math.sin(t * 5.2 * spd - frac * 5.2) * r * (0.08 + frac * 0.42);
      pts.push({ x, y, frac });
    }

    // Ultra-long tapering black-indigo serpentine whip body
    for (let i = 0; i < segs; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const w = r * Math.max(0.04, 0.24 * (1 - p0.frac * 0.86));
      ctx.strokeStyle = i % 2 === 0 ? '#141724' : '#1b2033';
      ctx.lineWidth = w * 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.stroke();
    }

    // Subtle iridescent dorsal line along spine
    ctx.strokeStyle = 'rgba(116, 132, 184, 0.42)';
    ctx.lineWidth = r * 0.05;
    ctx.beginPath();
    pts.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.stroke();

    // Glowing magenta-pink bioluminescent bulb at the very tip of the whip tail
    const tailTip = pts[pts.length - 1];
    const pulse = 0.82 + 0.18 * Math.sin(t * 6.0);
    const bulbGrad = ctx.createRadialGradient(tailTip.x, tailTip.y, r * 0.02, tailTip.x, tailTip.y, r * 0.36 * pulse);
    bulbGrad.addColorStop(0, 'rgba(255, 228, 245, 0.98)');
    bulbGrad.addColorStop(0.35, 'rgba(255, 78, 178, 0.85)');
    bulbGrad.addColorStop(1, 'rgba(255, 78, 178, 0)');
    ctx.fillStyle = bulbGrad;
    ctx.beginPath();
    ctx.arc(tailTip.x, tailTip.y, r * 0.36 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // Huge oversized pelican-pouch bulbous jaw head
    const headGrad = ctx.createRadialGradient(r * 1.48, -r * 0.12, r * 0.08, r * 1.42, 0, r * 0.95);
    headGrad.addColorStop(0, '#303652');
    headGrad.addColorStop(0.55, '#181c2e');
    headGrad.addColorStop(1, '#0b0d17');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.moveTo(r * 2.26, 0);
    ctx.bezierCurveTo(r * 2.18, -r * 0.66, r * 1.25, -r * 0.72, r * 0.76, -r * 0.24);
    ctx.lineTo(r * 0.76, r * 0.24);
    ctx.bezierCurveTo(r * 1.25, r * 0.72, r * 2.18, r * 0.66, r * 2.26, 0);
    ctx.closePath();
    ctx.fill();

    // Jaw seam & tiny pale eyes perched near the very front snout tip
    ctx.strokeStyle = 'rgba(130, 145, 195, 0.35)';
    ctx.lineWidth = r * 0.035;
    ctx.beginPath();
    ctx.arc(r * 1.56, 0, r * 0.56, -Math.PI * 0.38, Math.PI * 0.38);
    ctx.stroke();

    for (const side of [-1, 1]) {
      ctx.fillStyle = '#d4f2ff';
      ctx.beginPath();
      ctx.arc(r * 2.02, side * r * 0.16, r * 0.055, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy pouch highlight
    ctx.fillStyle = 'rgba(185, 205, 255, 0.22)';
    ctx.beginPath();
    ctx.ellipse(r * 1.54, -r * 0.22, r * 0.42, r * 0.12, -0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 12. Oarfish — ultra-long liquid-silver serpentine ribbon with flaming crimson dorsal crest & head plume
  oarfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const segs = 18;
    const pts = [];
    for (let i = 0; i <= segs; i++) {
      const frac = i / segs;
      const x = r * (1.85 - frac * 5.2);
      const y = Math.sin(t * 4.4 * spd - frac * 5.6) * r * (0.06 + frac * 0.38);
      pts.push({ x, y, frac });
    }

    // Two long trailing crimson oar-like pelvic streamers
    ctx.strokeStyle = 'rgba(235, 52, 58, 0.85)';
    ctx.lineWidth = r * 0.065;
    ctx.lineCap = 'round';
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(r * 1.42, side * r * 0.22);
      ctx.quadraticCurveTo(r * 0.72, side * r * 0.78 + pts[4].y * 0.4, r * 0.05, side * r * 0.86 + pts[7].y * 0.6);
      ctx.stroke();
      // Oar paddle tip
      ctx.fillStyle = '#f23c42';
      ctx.beginPath();
      ctx.ellipse(r * 0.02, side * r * 0.86 + pts[7].y * 0.6, r * 0.12, r * 0.06, side * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Shimmering liquid-silver serpentine ribbon body
    ctx.beginPath();
    for (let i = 0; i <= segs; i++) {
      const p = pts[i];
      const halfW = r * Math.max(0.04, 0.29 * Math.sin(Math.min(1, p.frac * 1.15) * Math.PI * 0.85 + 0.15) * (1 - p.frac * 0.52));
      if (i === 0) ctx.moveTo(p.x, p.y - halfW);
      else ctx.lineTo(p.x, p.y - halfW);
    }
    for (let i = segs; i >= 0; i--) {
      const p = pts[i];
      const halfW = r * Math.max(0.04, 0.29 * Math.sin(Math.min(1, p.frac * 1.15) * Math.PI * 0.85 + 0.15) * (1 - p.frac * 0.52));
      ctx.lineTo(p.x, p.y + halfW);
    }
    ctx.closePath();

    const bodyGrad = ctx.createLinearGradient(r * 1.9, -r * 0.35, -r * 3.2, r * 0.35);
    bodyGrad.addColorStop(0, '#f2f7fc');
    bodyGrad.addColorStop(0.28, '#c5d7e8');
    bodyGrad.addColorStop(0.55, '#eef5fb');
    bodyGrad.addColorStop(0.8, '#9eb7cf');
    bodyGrad.addColorStop(1, '#dce9f5');
    ctx.fillStyle = bodyGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(130, 158, 186, 0.6)';
    ctx.lineWidth = r * 0.03;
    ctx.stroke();

    // Flaming crimson-red dorsal crest undulating down the entire spine
    ctx.strokeStyle = '#e82e37';
    ctx.lineWidth = r * 0.11;
    ctx.lineCap = 'round';
    ctx.beginPath();
    pts.forEach((p, idx) => {
      const ripple = Math.sin(t * 7 * spd - idx * 0.7) * r * 0.05;
      if (idx === 0) ctx.moveTo(p.x, p.y + ripple);
      else ctx.lineTo(p.x, p.y + ripple);
    });
    ctx.stroke();

    // Dramatic crimson crown plume sweeping back from the brow
    ctx.strokeStyle = '#ff3842';
    ctx.lineWidth = r * 0.06;
    for (const spread of [-0.36, -0.14, 0.14, 0.36]) {
      ctx.beginPath();
      ctx.moveTo(r * 1.78, 0);
      ctx.quadraticCurveTo(r * 1.48, r * spread * 1.2, r * 1.12, r * spread * 1.75 + Math.sin(t * 6 * spd) * r * 0.05);
      ctx.stroke();
    }

    // Large silver-rimmed deep eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 1.66, side * r * 0.16, r * 0.078, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#111926';
      ctx.beginPath();
      ctx.arc(r * 1.68, side * r * 0.16, r * 0.042, 0, Math.PI * 2);
      ctx.fill();
    }

    // Liquid-chrome specular gleam
    ctx.fillStyle = 'rgba(255, 255, 255, 0.62)';
    ctx.beginPath();
    ctx.ellipse(r * 0.9, pts[3].y - r * 0.07, r * 0.7, r * 0.055, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 13. Ocean Sunfish (Mola mola) — massive stubby disc body, side-swaying dorsal/anal paddles, ruffled clavus
  sunfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const paddleWave = Math.sin(t * 3.2 * spd);

    // Broad side-swaying dorsal & anal paddles extending vertically overhead
    for (const side of [-1, 1]) {
      ctx.save();
      ctx.translate(-r * 0.32, side * r * 0.62);
      ctx.rotate(side * (0.15 + paddleWave * 0.24));
      const pGrad = ctx.createLinearGradient(0, 0, 0, side * r * 1.35);
      pGrad.addColorStop(0, '#6a7985');
      pGrad.addColorStop(0.6, '#505e6a');
      pGrad.addColorStop(1, '#394550');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(r * 0.34, 0);
      ctx.bezierCurveTo(r * 0.22, side * r * 0.82, -r * 0.12, side * r * 1.38, -r * 0.36, side * r * 1.24);
      ctx.bezierCurveTo(-r * 0.44, side * r * 0.72, -r * 0.36, side * r * 0.22, -r * 0.34, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Small rounded fluttering pectorals
    for (const side of [-1, 1]) {
      ctx.fillStyle = 'rgba(130, 146, 158, 0.82)';
      ctx.beginPath();
      ctx.ellipse(r * 0.42, side * r * 0.76, r * 0.16, r * 0.22, side * (0.3 - paddleWave * 0.2), 0, Math.PI * 2);
      ctx.fill();
    }

    // Ruffled scalloped clavus fringe (no true tail!)
    ctx.fillStyle = '#5a6875';
    ctx.beginPath();
    ctx.moveTo(-r * 0.92, -r * 0.64);
    for (let i = 0; i <= 6; i++) {
      const frac = i / 6;
      const y = -r * 0.64 + frac * r * 1.28;
      const x = -r * 1.18 - Math.sin(frac * Math.PI) * r * 0.16 - (i % 2 === 0 ? r * 0.08 : 0);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(-r * 0.92, r * 0.64);
    ctx.closePath();
    ctx.fill();

    // Massive stubby rounded-oval grey-silver disc body
    const bodyGrad = ctx.createRadialGradient(r * 0.25, -r * 0.2, r * 0.12, 0, 0, r * 1.35);
    bodyGrad.addColorStop(0, '#c0cfd9');
    bodyGrad.addColorStop(0.45, '#899aa8');
    bodyGrad.addColorStop(0.82, '#5d6d7a');
    bodyGrad.addColorStop(1, '#414f5c');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.18, 0);
    ctx.bezierCurveTo(r * 1.12, -r * 0.72, r * 0.18, -r * 0.84, -r * 0.96, -r * 0.64);
    ctx.quadraticCurveTo(-r * 1.16, 0, -r * 0.96, r * 0.64);
    ctx.bezierCurveTo(r * 0.18, r * 0.84, r * 1.12, r * 0.72, r * 1.18, 0);
    ctx.closePath();
    ctx.fill();

    // Mottled pale silvery dappled skin patches
    ctx.fillStyle = 'rgba(225, 238, 246, 0.35)';
    for (const [dx, dy, dr] of [[0.35, -0.34, 0.18], [0.18, 0.36, 0.2], [-0.28, -0.26, 0.22], [-0.45, 0.28, 0.18], [-0.08, 0.02, 0.16]]) {
      ctx.beginPath();
      ctx.arc(r * dx, r * dy, r * dr, 0, Math.PI * 2);
      ctx.fill();
    }

    // Tiny pursed beak mouth & surprised wide-set eyes
    ctx.fillStyle = '#38444f';
    ctx.beginPath();
    ctx.ellipse(r * 1.18, 0, r * 0.08, r * 0.13, 0, 0, Math.PI * 2);
    ctx.fill();

    for (const side of [-1, 1]) {
      ctx.fillStyle = '#e8f1f5';
      ctx.beginPath();
      ctx.arc(r * 0.74, side * r * 0.44, r * 0.11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#121820';
      ctx.beginPath();
      ctx.arc(r * 0.76, side * r * 0.44, r * 0.058, 0, Math.PI * 2);
      ctx.fill();
    }

    // Broad wet specular highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.beginPath();
    ctx.ellipse(r * 0.22, -r * 0.24, r * 0.56, r * 0.2, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 14. Manta Ray — huge sweeping triangular wings, forward cephalic horn lobes, ivory shoulder patches & whip tail
  mantarayfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const flap = Math.sin(t * 2.8 * spd);
    const tipY = r * (2.42 + flap * 0.16);
    const tipX = -r * (0.28 - flap * 0.14);
    const tailWag = Math.sin(t * 3.4 * spd - 0.8) * r * 0.18;

    // Slender trailing whip tail
    ctx.strokeStyle = '#1a2333';
    ctx.lineWidth = r * 0.075;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-r * 1.05, 0);
    ctx.quadraticCurveTo(-r * 1.95, tailWag, -r * 2.95, -tailWag * 0.7);
    ctx.stroke();

    // Small pelvic fins flanking tail base
    ctx.fillStyle = '#202b3d';
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(-r * 1.02, side * r * 0.26, r * 0.22, r * 0.12, side * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }

    // Huge sweeping diamond/triangular manta wings + forward cephalic horn lobes
    const wingGrad = ctx.createRadialGradient(r * 0.2, 0, r * 0.15, -r * 0.1, 0, r * 2.45);
    wingGrad.addColorStop(0, '#2d3d54');
    wingGrad.addColorStop(0.5, '#1b2638');
    wingGrad.addColorStop(1, '#101824');
    ctx.fillStyle = wingGrad;
    ctx.beginPath();
    // Wide flat mouth gap between forward cephalic lobes
    ctx.moveTo(r * 0.92, -r * 0.32);
    // Left cephalic horn lobe curling forward
    ctx.bezierCurveTo(r * 1.38, -r * 0.28, r * 1.62, -r * 0.36, r * 1.56, -r * 0.48);
    ctx.bezierCurveTo(r * 1.34, -r * 0.56, r * 1.08, -r * 0.56, r * 0.88, -r * 0.62);
    // Sweeping left wing leading & trailing edge
    ctx.bezierCurveTo(r * 0.52, -r * 1.35, r * 0.18, -tipY * 0.96, tipX, -tipY);
    ctx.bezierCurveTo(-r * 0.58, -tipY * 0.72, -r * 0.72, -r * 0.62, -r * 1.12, 0);
    // Sweeping right wing trailing & leading edge
    ctx.bezierCurveTo(-r * 0.72, r * 0.62, -r * 0.58, tipY * 0.72, tipX, tipY);
    ctx.bezierCurveTo(r * 0.18, tipY * 0.96, r * 0.52, r * 1.35, r * 0.88, r * 0.62);
    // Right cephalic horn lobe
    ctx.bezierCurveTo(r * 1.08, r * 0.56, r * 1.34, r * 0.56, r * 1.56, r * 0.48);
    ctx.bezierCurveTo(r * 1.62, r * 0.36, r * 1.38, r * 0.28, r * 0.92, r * 0.32);
    ctx.quadraticCurveTo(r * 0.84, 0, r * 0.92, -r * 0.32);
    ctx.closePath();
    ctx.fill();

    // Iconic twin ivory-white manta shoulder chevrons
    const patchGrad = ctx.createLinearGradient(r * 0.8, 0, -r * 0.2, 0);
    patchGrad.addColorStop(0, 'rgba(230, 240, 248, 0.78)');
    patchGrad.addColorStop(1, 'rgba(180, 206, 224, 0.25)');
    ctx.fillStyle = patchGrad;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(r * 0.74, side * r * 0.38);
      ctx.bezierCurveTo(r * 0.48, side * r * 0.92, r * 0.08, side * r * 0.96, -r * 0.18, side * r * 0.58);
      ctx.quadraticCurveTo(r * 0.18, side * r * 0.38, r * 0.74, side * r * 0.38);
      ctx.fill();
    }

    // Subtle dorsal spine ridge & lateral eyes at base of cephalic lobes
    ctx.strokeStyle = 'rgba(105, 138, 174, 0.36)';
    ctx.lineWidth = r * 0.1;
    ctx.beginPath();
    ctx.moveTo(r * 0.65, 0);
    ctx.lineTo(-r * 0.95, 0);
    ctx.stroke();

    for (const side of [-1, 1]) {
      ctx.fillStyle = '#0c111a';
      ctx.beginPath();
      ctx.arc(r * 0.94, side * r * 0.54, r * 0.065, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy hydrodynamic highlight across central mantle
    ctx.fillStyle = 'rgba(210, 234, 255, 0.22)';
    ctx.beginPath();
    ctx.ellipse(r * 0.12, -r * 0.14, r * 0.65, r * 0.18, -0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 15. Sawfish — sandy-olive shark-ray body with long flat toothed saw-blade rostrum extending far forward
  sawfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 4.4 * spd) * r * 0.2;
    const tailWag = Math.sin(t * 4.4 * spd - 0.9) * r * 0.34;

    // Asymmetric shark-like caudal fin
    ctx.fillStyle = '#6c684e';
    ctx.beginPath();
    ctx.moveTo(-r * 1.72, tailWag * 0.58);
    ctx.lineTo(-r * 2.68, -r * 0.58 + tailWag);
    ctx.quadraticCurveTo(-r * 2.18, tailWag, -r * 2.28, r * 0.34 + tailWag);
    ctx.closePath();
    ctx.fill();

    // Broad triangular wing-like pectoral fins & pelvic fins
    for (const side of [-1, 1]) {
      const pGrad = ctx.createLinearGradient(r * 0.7, 0, -r * 0.1, side * r * 1.25);
      pGrad.addColorStop(0, '#878161');
      pGrad.addColorStop(0.75, '#6d694e');
      pGrad.addColorStop(1, '#c7c1a5');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(r * 0.96, side * r * 0.32);
      ctx.bezierCurveTo(r * 0.62, side * r * 1.12, r * 0.08, side * r * 1.28, -r * 0.24, side * r * 0.85);
      ctx.quadraticCurveTo(r * 0.02, side * r * 0.42, -r * 0.18, side * r * 0.32);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#757054';
      ctx.beginPath();
      ctx.moveTo(-r * 0.55, side * r * 0.26 + wag * 0.2);
      ctx.lineTo(-r * 1.02, side * r * 0.65 + wag * 0.4);
      ctx.lineTo(-r * 1.12, side * r * 0.2 + wag * 0.42);
      ctx.closePath();
      ctx.fill();
    }

    // Long flat toothed rostrum saw blade extending far forward (+X)
    const sawStart = r * 1.38;
    const sawEnd = r * 3.12;
    ctx.fillStyle = '#ebe4ce';
    const teethCount = 9;
    for (let i = 0; i < teethCount; i++) {
      const frac = i / (teethCount - 1);
      const tx = sawStart + r * 0.14 + frac * (sawEnd - sawStart - r * 0.24);
      const halfBlade = r * (0.14 - frac * 0.055);
      const toothLen = r * (0.14 - frac * 0.03);
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(tx - r * 0.035, side * halfBlade);
        ctx.lineTo(tx, side * (halfBlade + toothLen));
        ctx.lineTo(tx + r * 0.035, side * halfBlade);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Saw blade shaft
    const bladeGrad = ctx.createLinearGradient(sawStart, 0, sawEnd, 0);
    bladeGrad.addColorStop(0, '#857f61');
    bladeGrad.addColorStop(1, '#b8b193');
    ctx.fillStyle = bladeGrad;
    ctx.beginPath();
    ctx.moveTo(sawStart, -r * 0.16);
    ctx.lineTo(sawEnd, -r * 0.08);
    ctx.quadraticCurveTo(sawEnd + r * 0.1, 0, sawEnd, r * 0.08);
    ctx.lineTo(sawStart, r * 0.16);
    ctx.closePath();
    ctx.fill();

    // Flattened sandy bronze-olive shark-ray body
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.48, 0, r * 0.48);
    bodyGrad.addColorStop(0, '#a6a07e');
    bodyGrad.addColorStop(0.32, '#827c5e');
    bodyGrad.addColorStop(0.5, '#666147');
    bodyGrad.addColorStop(0.68, '#827c5e');
    bodyGrad.addColorStop(1, '#a6a07e');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(sawStart + r * 0.08, -r * 0.16);
    ctx.bezierCurveTo(r * 1.1, -r * 0.46, r * 0.35, -r * 0.48, -r * 0.55, -r * 0.3 + wag * 0.22);
    ctx.quadraticCurveTo(-r * 1.25, -r * 0.18 + wag * 0.55, -r * 1.85, tailWag * 0.58);
    ctx.quadraticCurveTo(-r * 1.25, r * 0.18 + wag * 0.55, -r * 0.55, r * 0.3 + wag * 0.22);
    ctx.bezierCurveTo(r * 0.35, r * 0.48, r * 1.1, r * 0.46, sawStart + r * 0.08, r * 0.16);
    ctx.closePath();
    ctx.fill();

    // Twin dorsal fin ridges & top-set eyes
    ctx.fillStyle = '#5c573f';
    ctx.beginPath();
    ctx.ellipse(-r * 0.35, wag * 0.15, r * 0.24, r * 0.07, 0, 0, Math.PI * 2);
    ctx.ellipse(-r * 1.18, wag * 0.48, r * 0.2, r * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();

    for (const side of [-1, 1]) {
      ctx.fillStyle = '#e0d5a4';
      ctx.beginPath();
      ctx.arc(r * 1.06, side * r * 0.22, r * 0.072, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#181710';
      ctx.beginPath();
      ctx.arc(r * 1.08, side * r * 0.22, r * 0.036, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy dorsal sheen
    ctx.fillStyle = 'rgba(255, 250, 226, 0.24)';
    ctx.beginPath();
    ctx.ellipse(r * 0.35, -r * 0.12, r * 0.78, r * 0.09, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 16. Sailfish — sleek cobalt-silver torpedo, long slender spear bill, dramatic spotted iridescent dorsal sail
  sailfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 6.4 * spd) * r * 0.16;
    const tailWag = Math.sin(t * 6.4 * spd - 0.85) * r * 0.28;
    const sailBillow = Math.sin(t * 4.2 * spd) * r * 0.18;

    // Deeply forked lunate crescent tail
    ctx.fillStyle = '#1d3c6e';
    ctx.beginPath();
    ctx.moveTo(-r * 1.88, tailWag * 0.6);
    ctx.bezierCurveTo(-r * 2.18, -r * 0.52 + tailWag, -r * 2.62, -r * 0.92 + tailWag, -r * 2.86, -r * 0.96 + tailWag);
    ctx.bezierCurveTo(-r * 2.52, -r * 0.42 + tailWag, -r * 2.34, tailWag, -r * 2.86, r * 0.96 + tailWag);
    ctx.bezierCurveTo(-r * 2.62, r * 0.92 + tailWag, -r * 2.18, r * 0.52 + tailWag, -r * 1.88, tailWag * 0.6);
    ctx.closePath();
    ctx.fill();

    // Long swept sickle pectorals
    for (const side of [-1, 1]) {
      const pGrad = ctx.createLinearGradient(r * 0.75, 0, -r * 0.2, side * r * 1.25);
      pGrad.addColorStop(0, '#2a5ca8');
      pGrad.addColorStop(1, '#13284d');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(r * 0.82, side * r * 0.28);
      ctx.bezierCurveTo(r * 0.55, side * r * 0.96, r * 0.08, side * r * 1.32, -r * 0.28, side * r * 1.24);
      ctx.bezierCurveTo(r * 0.02, side * r * 0.85, r * 0.25, side * r * 0.42, r * 0.42, side * r * 0.26);
      ctx.closePath();
      ctx.fill();
    }

    // Long slender needle-like spear bill
    const billGrad = ctx.createLinearGradient(r * 1.55, 0, r * 3.22, 0);
    billGrad.addColorStop(0, '#2c538c');
    billGrad.addColorStop(1, '#7098c9');
    ctx.fillStyle = billGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.52, -r * 0.13);
    ctx.lineTo(r * 3.25, 0);
    ctx.lineTo(r * 1.52, r * 0.13);
    ctx.closePath();
    ctx.fill();

    // Sleek hydrodynamic electric-cobalt & silver torpedo body
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.42, 0, r * 0.42);
    bodyGrad.addColorStop(0, '#c8e0f5');
    bodyGrad.addColorStop(0.24, '#3674c4');
    bodyGrad.addColorStop(0.5, '#193b78');
    bodyGrad.addColorStop(0.76, '#3674c4');
    bodyGrad.addColorStop(1, '#c8e0f5');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.64, 0);
    ctx.bezierCurveTo(r * 1.22, -r * 0.44, r * 0.22, -r * 0.42, -r * 0.72, -r * 0.24 + wag * 0.25);
    ctx.quadraticCurveTo(-r * 1.45, -r * 0.12 + wag * 0.6, -r * 1.98, tailWag * 0.6);
    ctx.quadraticCurveTo(-r * 1.45, r * 0.12 + wag * 0.6, -r * 0.72, r * 0.24 + wag * 0.25);
    ctx.bezierCurveTo(r * 0.22, r * 0.42, r * 1.22, r * 0.44, r * 1.64, 0);
    ctx.closePath();
    ctx.fill();

    // Signature billowing iridescent violet-blue dorsal sail fin spotted with dark ink dots
    const sailGrad = ctx.createLinearGradient(r * 0.95, 0, -r * 1.15, sailBillow - r * 0.55);
    sailGrad.addColorStop(0, 'rgba(72, 138, 245, 0.92)');
    sailGrad.addColorStop(0.55, 'rgba(66, 86, 214, 0.85)');
    sailGrad.addColorStop(1, 'rgba(34, 46, 138, 0.78)');
    ctx.fillStyle = sailGrad;
    ctx.beginPath();
    ctx.moveTo(r * 0.95, 0);
    ctx.bezierCurveTo(r * 0.68, -r * 0.62 + sailBillow, -r * 0.35, -r * 0.72 + sailBillow * 1.1, -r * 1.15, -r * 0.22 + wag * 0.45);
    ctx.quadraticCurveTo(-r * 0.2, wag * 0.18, r * 0.95, 0);
    ctx.closePath();
    ctx.fill();

    // Ink-blue sail spots
    ctx.fillStyle = 'rgba(14, 20, 56, 0.72)';
    for (const [sx, sy] of [[0.55, -0.32], [0.22, -0.44], [-0.15, -0.42], [-0.52, -0.34], [0.05, -0.24], [-0.35, -0.22]]) {
      ctx.beginPath();
      ctx.arc(r * sx, r * sy + sailBillow * 0.75, r * 0.052, 0, Math.PI * 2);
      ctx.fill();
    }

    // Eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#d4eeff';
      ctx.beginPath();
      ctx.arc(r * 1.24, side * r * 0.22, r * 0.072, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#091224';
      ctx.beginPath();
      ctx.arc(r * 1.26, side * r * 0.22, r * 0.038, 0, Math.PI * 2);
      ctx.fill();
    }

    // Crisp specular sheen
    ctx.fillStyle = 'rgba(255, 255, 255, 0.44)';
    ctx.beginPath();
    ctx.ellipse(r * 0.42, r * 0.14, r * 0.85, r * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 17. Swordfish — heavy-shouldered gunmetal-bronze pelagic hunter, broad flat sword bill & huge crescent tail
  swordfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 5.8 * spd) * r * 0.16;
    const tailWag = Math.sin(t * 5.8 * spd - 0.85) * r * 0.28;

    // Massive broad crescent lunate caudal fin
    ctx.fillStyle = '#2d3744';
    ctx.beginPath();
    ctx.moveTo(-r * 1.75, tailWag * 0.58);
    ctx.bezierCurveTo(-r * 2.08, -r * 0.58 + tailWag, -r * 2.52, -r * 1.08 + tailWag, -r * 2.75, -r * 1.1 + tailWag);
    ctx.bezierCurveTo(-r * 2.38, -r * 0.46 + tailWag, -r * 2.25, tailWag, -r * 2.75, r * 1.1 + tailWag);
    ctx.bezierCurveTo(-r * 2.52, r * 1.08 + tailWag, -r * 2.08, r * 0.58 + tailWag, -r * 1.75, tailWag * 0.58);
    ctx.closePath();
    ctx.fill();

    // Wide sweeping scythe-like pectorals
    for (const side of [-1, 1]) {
      const pGrad = ctx.createLinearGradient(r * 0.72, 0, -r * 0.15, side * r * 1.38);
      pGrad.addColorStop(0, '#4d5b6e');
      pGrad.addColorStop(1, '#252e3a');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(r * 0.78, side * r * 0.34);
      ctx.bezierCurveTo(r * 0.48, side * r * 1.05, r * 0.02, side * r * 1.44, -r * 0.34, side * r * 1.32);
      ctx.bezierCurveTo(-r * 0.02, side * r * 0.86, r * 0.2, side * r * 0.45, r * 0.32, side * r * 0.34);
      ctx.closePath();
      ctx.fill();
    }

    // Long broad flat sword-like bill (wider & flatter than sailfish)
    const swordGrad = ctx.createLinearGradient(r * 1.45, 0, r * 3.32, 0);
    swordGrad.addColorStop(0, '#465261');
    swordGrad.addColorStop(0.5, '#7e8c9e');
    swordGrad.addColorStop(1, '#c8d4e0');
    ctx.fillStyle = swordGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.42, -r * 0.21);
    ctx.quadraticCurveTo(r * 2.35, -r * 0.12, r * 3.35, 0);
    ctx.quadraticCurveTo(r * 2.35, r * 0.12, r * 1.42, r * 0.21);
    ctx.closePath();
    ctx.fill();
    // Sword center ridge
    ctx.strokeStyle = 'rgba(235, 242, 250, 0.55)';
    ctx.lineWidth = r * 0.032;
    ctx.beginPath();
    ctx.moveTo(r * 1.48, 0);
    ctx.lineTo(r * 3.25, 0);
    ctx.stroke();

    // Heavy-shouldered muscular gunmetal-bronze & silver body
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.52, 0, r * 0.52);
    bodyGrad.addColorStop(0, '#d0dce6');
    bodyGrad.addColorStop(0.24, '#6a798c');
    bodyGrad.addColorStop(0.5, '#3b4554');
    bodyGrad.addColorStop(0.76, '#6a798c');
    bodyGrad.addColorStop(1, '#d0dce6');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.56, 0);
    ctx.bezierCurveTo(r * 1.15, -r * 0.54, r * 0.18, -r * 0.52, -r * 0.72, -r * 0.28 + wag * 0.24);
    ctx.quadraticCurveTo(-r * 1.38, -r * 0.14 + wag * 0.55, -r * 1.85, tailWag * 0.58);
    ctx.quadraticCurveTo(-r * 1.38, r * 0.14 + wag * 0.55, -r * 0.72, r * 0.28 + wag * 0.24);
    ctx.bezierCurveTo(r * 0.18, r * 0.52, r * 1.15, r * 0.54, r * 1.56, 0);
    ctx.closePath();
    ctx.fill();

    // Compact tall curved sickle dorsal fin (distinct from sailfish's long sail)
    ctx.fillStyle = '#26303d';
    ctx.beginPath();
    ctx.moveTo(r * 0.85, 0);
    ctx.bezierCurveTo(r * 0.52, -r * 0.34, r * 0.15, -r * 0.22, r * 0.08, 0);
    ctx.bezierCurveTo(r * 0.32, -r * 0.06, r * 0.62, -r * 0.06, r * 0.85, 0);
    ctx.fill();

    // Large dark pelagic eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#b9d1e6';
      ctx.beginPath();
      ctx.arc(r * 1.18, side * r * 0.28, r * 0.095, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0d131a';
      ctx.beginPath();
      ctx.arc(r * 1.2, side * r * 0.28, r * 0.055, 0, Math.PI * 2);
      ctx.fill();
    }

    // Metallic bronze-white glossy highlight
    ctx.fillStyle = 'rgba(255, 250, 240, 0.35)';
    ctx.beginPath();
    ctx.ellipse(r * 0.35, -r * 0.16, r * 0.82, r * 0.09, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 18. Blue Marlin — massive cobalt-blue titan with electric-cyan vertical stripes & conical spear bill
  bluemarlinfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 5.6 * spd) * r * 0.17;
    const tailWag = Math.sin(t * 5.6 * spd - 0.85) * r * 0.29;

    // Powerful cobalt lunate tail
    ctx.fillStyle = '#143066';
    ctx.beginPath();
    ctx.moveTo(-r * 1.82, tailWag * 0.58);
    ctx.bezierCurveTo(-r * 2.15, -r * 0.56 + tailWag, -r * 2.58, -r * 1.02 + tailWag, -r * 2.82, -r * 1.05 + tailWag);
    ctx.bezierCurveTo(-r * 2.42, -r * 0.42 + tailWag, -r * 2.3, tailWag, -r * 2.82, r * 1.05 + tailWag);
    ctx.bezierCurveTo(-r * 2.58, r * 1.02 + tailWag, -r * 2.15, r * 0.56 + tailWag, -r * 1.82, tailWag * 0.58);
    ctx.closePath();
    ctx.fill();

    // Sweeping dark-blue sickle pectorals
    for (const side of [-1, 1]) {
      const pGrad = ctx.createLinearGradient(r * 0.78, 0, -r * 0.18, side * r * 1.38);
      pGrad.addColorStop(0, '#1e4fa3');
      pGrad.addColorStop(1, '#0e2452');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(r * 0.82, side * r * 0.34);
      ctx.bezierCurveTo(r * 0.52, side * r * 1.06, r * 0.05, side * r * 1.42, -r * 0.32, side * r * 1.3);
      ctx.bezierCurveTo(r * 0.02, side * r * 0.84, r * 0.22, side * r * 0.44, r * 0.36, side * r * 0.32);
      ctx.closePath();
      ctx.fill();
    }

    // Thick conical spear bill
    const billGrad = ctx.createLinearGradient(r * 1.48, 0, r * 3.08, 0);
    billGrad.addColorStop(0, '#193b7a');
    billGrad.addColorStop(1, '#5889cf');
    ctx.fillStyle = billGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.48, -r * 0.16);
    ctx.lineTo(r * 3.12, 0);
    ctx.lineTo(r * 1.48, r * 0.16);
    ctx.closePath();
    ctx.fill();

    // Deep cobalt-blue and silver-white massive torso
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.5, 0, r * 0.5);
    bodyGrad.addColorStop(0, '#d8ecfc');
    bodyGrad.addColorStop(0.22, '#2261bd');
    bodyGrad.addColorStop(0.5, '#102d6b');
    bodyGrad.addColorStop(0.78, '#2261bd');
    bodyGrad.addColorStop(1, '#d8ecfc');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.6, 0);
    ctx.bezierCurveTo(r * 1.18, -r * 0.52, r * 0.22, -r * 0.52, -r * 0.72, -r * 0.28 + wag * 0.24);
    ctx.quadraticCurveTo(-r * 1.4, -r * 0.14 + wag * 0.58, -r * 1.92, tailWag * 0.58);
    ctx.quadraticCurveTo(-r * 1.4, r * 0.14 + wag * 0.58, -r * 0.72, r * 0.28 + wag * 0.24);
    ctx.bezierCurveTo(r * 0.22, r * 0.52, r * 1.18, r * 0.52, r * 1.6, 0);
    ctx.closePath();
    ctx.fill();

    // Vibrant electric-cyan vertical flank stripes shimmering across the cobalt back
    ctx.strokeStyle = 'rgba(92, 224, 255, 0.76)';
    ctx.lineWidth = r * 0.062;
    ctx.lineCap = 'round';
    for (let i = 0; i < 9; i++) {
      const sx = r * (0.92 - i * 0.26);
      const sy = sx < 0 ? wag * (-sx * 0.2) : 0;
      const half = r * Math.max(0.14, 0.42 - Math.abs(i - 2) * 0.036);
      ctx.beginPath();
      ctx.moveTo(sx, sy - half);
      ctx.lineTo(sx, sy + half);
      ctx.stroke();
    }

    // High anterior dorsal fin ridge tapering down back
    ctx.fillStyle = '#0d2252';
    ctx.beginPath();
    ctx.moveTo(r * 0.92, 0);
    ctx.quadraticCurveTo(r * 0.2, -r * 0.12, -r * 0.85, wag * 0.3);
    ctx.quadraticCurveTo(r * 0.2, r * 0.08, r * 0.92, 0);
    ctx.fill();

    // Eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#b5e8ff';
      ctx.beginPath();
      ctx.arc(r * 1.2, side * r * 0.26, r * 0.082, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#071126';
      ctx.beginPath();
      ctx.arc(r * 1.22, side * r * 0.26, r * 0.044, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy specular sheen
    ctx.fillStyle = 'rgba(225, 246, 255, 0.36)';
    ctx.beginPath();
    ctx.ellipse(r * 0.38, -r * 0.15, r * 0.88, r * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 19. Thresher Shark — sleek metallic-indigo shark with an extraordinarily long undulating scythe tail
  threshersharkfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 5.0 * spd) * r * 0.18;
    const whip1 = Math.sin(t * 5.0 * spd - 1.1) * r * 0.42;
    const whip2 = Math.sin(t * 5.0 * spd - 2.2) * r * 0.62;

    // Signature extraordinarily long scythe-like upper tail lobe (nearly body-length!)
    const tailGrad = ctx.createLinearGradient(-r * 1.35, 0, -r * 3.85, 0);
    tailGrad.addColorStop(0, '#3a5470');
    tailGrad.addColorStop(0.55, '#2b425c');
    tailGrad.addColorStop(1, '#1a2a3d');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 1.32, wag * 0.55);
    ctx.bezierCurveTo(-r * 1.95, -r * 0.32 + whip1, -r * 2.95, -r * 0.56 + whip2, -r * 3.95, -r * 0.24 + whip2 * 1.05);
    ctx.bezierCurveTo(-r * 3.05, -r * 0.12 + whip2 * 0.85, -r * 2.15, r * 0.08 + whip1 * 0.8, -r * 1.68, r * 0.36 + whip1 * 0.5);
    ctx.quadraticCurveTo(-r * 1.55, r * 0.16 + wag * 0.5, -r * 1.32, wag * 0.55);
    ctx.closePath();
    ctx.fill();

    // Long curved pectoral wings + pelvic fins
    for (const side of [-1, 1]) {
      const pGrad = ctx.createLinearGradient(r * 0.72, 0, -r * 0.1, side * r * 1.35);
      pGrad.addColorStop(0, '#45607d');
      pGrad.addColorStop(1, '#22354a');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(r * 0.76, side * r * 0.34);
      ctx.bezierCurveTo(r * 0.45, side * r * 1.12, -r * 0.05, side * r * 1.42, -r * 0.32, side * r * 1.18);
      ctx.bezierCurveTo(-r * 0.06, side * r * 0.75, r * 0.1, side * r * 0.4, r * 0.15, side * r * 0.34);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#334b66';
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, side * r * 0.24 + wag * 0.2);
      ctx.lineTo(-r * 0.86, side * r * 0.58 + wag * 0.36);
      ctx.lineTo(-r * 0.96, side * r * 0.18 + wag * 0.4);
      ctx.closePath();
      ctx.fill();
    }

    // Sleek bronze-indigo/metallic-blue shark body with short conical snout
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.46, 0, r * 0.46);
    bodyGrad.addColorStop(0, '#b9cad9');
    bodyGrad.addColorStop(0.24, '#4e6c8c');
    bodyGrad.addColorStop(0.5, '#2b435e');
    bodyGrad.addColorStop(0.76, '#4e6c8c');
    bodyGrad.addColorStop(1, '#b9cad9');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.56, 0);
    ctx.bezierCurveTo(r * 1.3, -r * 0.44, r * 0.45, -r * 0.48, -r * 0.45, -r * 0.3 + wag * 0.2);
    ctx.quadraticCurveTo(-r * 1.0, -r * 0.16 + wag * 0.45, -r * 1.44, wag * 0.55);
    ctx.quadraticCurveTo(-r * 1.0, r * 0.16 + wag * 0.45, -r * 0.45, r * 0.3 + wag * 0.2);
    ctx.bezierCurveTo(r * 0.45, r * 0.48, r * 1.3, r * 0.44, r * 1.56, 0);
    ctx.closePath();
    ctx.fill();

    // Tall dorsal fin silhouette & subtle gill slits
    ctx.fillStyle = '#1f334a';
    ctx.beginPath();
    ctx.moveTo(r * 0.35, 0);
    ctx.quadraticCurveTo(r * 0.02, -r * 0.22, -r * 0.3, wag * 0.14);
    ctx.quadraticCurveTo(r * 0.04, r * 0.06, r * 0.35, 0);
    ctx.fill();

    // Large dark expressive thresher eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#0e1621';
      ctx.beginPath();
      ctx.arc(r * 1.15, side * r * 0.24, r * 0.092, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(210, 236, 255, 0.72)';
      ctx.beginPath();
      ctx.arc(r * 1.18, side * r * 0.22, r * 0.03, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy dorsal specular sheen
    ctx.fillStyle = 'rgba(235, 246, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(r * 0.42, -r * 0.13, r * 0.68, r * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 20. Hammerhead Shark — unmistakable wide T-shaped cephalofoil hammer head with eyes on outer tips
  hammerheadsharkfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 5.2 * spd) * r * 0.2;
    const tailWag = Math.sin(t * 5.2 * spd - 0.95) * r * 0.34;
    const headSway = Math.sin(t * 5.2 * spd + 0.6) * 0.07;

    // Strong asymmetric shark caudal fin
    ctx.fillStyle = '#535e69';
    ctx.beginPath();
    ctx.moveTo(-r * 1.65, tailWag * 0.58);
    ctx.lineTo(-r * 2.65, -r * 0.76 + tailWag);
    ctx.quadraticCurveTo(-r * 2.1, tailWag, -r * 2.32, r * 0.48 + tailWag);
    ctx.closePath();
    ctx.fill();

    // Swept-back triangular pectoral fins & pelvic fins
    for (const side of [-1, 1]) {
      const pGrad = ctx.createLinearGradient(r * 0.72, 0, -r * 0.15, side * r * 1.32);
      pGrad.addColorStop(0, '#727c82');
      pGrad.addColorStop(1, '#434c54');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(r * 0.74, side * r * 0.32);
      ctx.bezierCurveTo(r * 0.44, side * r * 1.05, -r * 0.02, side * r * 1.38, -r * 0.28, side * r * 1.15);
      ctx.lineTo(r * 0.1, side * r * 0.32);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#5d6770';
      ctx.beginPath();
      ctx.moveTo(-r * 0.52, side * r * 0.24 + wag * 0.2);
      ctx.lineTo(-r * 0.94, side * r * 0.56 + wag * 0.38);
      ctx.lineTo(-r * 1.04, side * r * 0.16 + wag * 0.42);
      ctx.closePath();
      ctx.fill();
    }

    // Sleek bronze-grey muscular shark torso
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.46, 0, r * 0.46);
    bodyGrad.addColorStop(0, '#aeb6b8');
    bodyGrad.addColorStop(0.28, '#7a8387');
    bodyGrad.addColorStop(0.5, '#596166');
    bodyGrad.addColorStop(0.72, '#7a8387');
    bodyGrad.addColorStop(1, '#aeb6b8');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.52, -r * 0.24);
    ctx.bezierCurveTo(r * 0.95, -r * 0.46, r * 0.2, -r * 0.44, -r * 0.62, -r * 0.28 + wag * 0.24);
    ctx.quadraticCurveTo(-r * 1.25, -r * 0.16 + wag * 0.55, -r * 1.76, tailWag * 0.58);
    ctx.quadraticCurveTo(-r * 1.25, r * 0.16 + wag * 0.55, -r * 0.62, r * 0.28 + wag * 0.24);
    ctx.bezierCurveTo(r * 0.2, r * 0.44, r * 0.95, r * 0.46, r * 1.52, r * 0.24);
    ctx.closePath();
    ctx.fill();

    // Unmistakable wide T-shaped scalloped cephalofoil hammer head
    ctx.save();
    ctx.translate(r * 1.48, 0);
    ctx.rotate(headSway);
    const hamGrad = ctx.createLinearGradient(0, -r * 1.15, 0, r * 1.15);
    hamGrad.addColorStop(0, '#8d9699');
    hamGrad.addColorStop(0.5, '#5e676c');
    hamGrad.addColorStop(1, '#8d9699');
    ctx.fillStyle = hamGrad;
    ctx.beginPath();
    ctx.moveTo(r * 0.42, 0);
    // Scalloped front leading edge to left hammer tip
    ctx.bezierCurveTo(r * 0.45, -r * 0.35, r * 0.36, -r * 0.82, r * 0.22, -r * 1.16);
    ctx.quadraticCurveTo(r * 0.02, -r * 1.26, -r * 0.16, -r * 1.12);
    ctx.bezierCurveTo(-r * 0.22, -r * 0.72, -r * 0.16, -r * 0.34, -r * 0.22, -r * 0.24);
    ctx.lineTo(-r * 0.22, r * 0.24);
    ctx.bezierCurveTo(-r * 0.16, r * 0.34, -r * 0.22, r * 0.72, -r * 0.16, r * 1.12);
    ctx.quadraticCurveTo(r * 0.02, r * 1.26, r * 0.22, r * 1.16);
    ctx.bezierCurveTo(r * 0.36, r * 0.82, r * 0.45, r * 0.35, r * 0.42, 0);
    ctx.closePath();
    ctx.fill();

    // Eyes set right on the outer hammer tips!
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#0f141a';
      ctx.beginPath();
      ctx.arc(r * 0.06, side * r * 1.14, r * 0.085, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(225, 240, 250, 0.7)';
      ctx.beginPath();
      ctx.arc(r * 0.09, side * r * 1.12, r * 0.028, 0, Math.PI * 2);
      ctx.fill();
    }

    // Specular highlight across hammer brow
    ctx.fillStyle = 'rgba(245, 250, 255, 0.26)';
    ctx.beginPath();
    ctx.ellipse(r * 0.18, 0, r * 0.1, r * 0.86, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Tall curved dorsal fin ridge
    ctx.fillStyle = '#424a52';
    ctx.beginPath();
    ctx.moveTo(r * 0.42, 0);
    ctx.quadraticCurveTo(r * 0.05, -r * 0.24, -r * 0.34, wag * 0.16);
    ctx.quadraticCurveTo(r * 0.05, r * 0.06, r * 0.42, 0);
    ctx.fill();

    // Glossy dorsal sheen
    ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
    ctx.beginPath();
    ctx.ellipse(r * 0.35, -r * 0.13, r * 0.74, r * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 21. Tiger Shark — heavy blunt-snouted grey-olive apex shark with bold dark charcoal tiger bars
  tigersharkfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 4.4 * spd) * r * 0.2;
    const tailWag = Math.sin(t * 4.4 * spd - 0.95) * r * 0.34;

    // Powerful asymmetric tail
    ctx.fillStyle = '#474f4c';
    ctx.beginPath();
    ctx.moveTo(-r * 1.72, tailWag * 0.58);
    ctx.lineTo(-r * 2.74, -r * 0.82 + tailWag);
    ctx.quadraticCurveTo(-r * 2.14, tailWag, -r * 2.38, r * 0.46 + tailWag);
    ctx.closePath();
    ctx.fill();

    // Stout wide pectoral fins & pelvic fins
    for (const side of [-1, 1]) {
      const pGrad = ctx.createLinearGradient(r * 0.8, 0, -r * 0.15, side * r * 1.38);
      pGrad.addColorStop(0, '#6c756e');
      pGrad.addColorStop(1, '#3d4540');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(r * 0.86, side * r * 0.42);
      ctx.bezierCurveTo(r * 0.54, side * r * 1.15, r * 0.02, side * r * 1.45, -r * 0.3, side * r * 1.18);
      ctx.lineTo(r * 0.12, side * r * 0.4);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#535c56';
      ctx.beginPath();
      ctx.moveTo(-r * 0.54, side * r * 0.28 + wag * 0.22);
      ctx.lineTo(-r * 0.98, side * r * 0.64 + wag * 0.4);
      ctx.lineTo(-r * 1.08, side * r * 0.2 + wag * 0.44);
      ctx.closePath();
      ctx.fill();
    }

    // Heavy blunt-snouted muscular grey-olive apex torso
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.58, 0, r * 0.58);
    bodyGrad.addColorStop(0, '#b5bdb4');
    bodyGrad.addColorStop(0.24, '#79857a');
    bodyGrad.addColorStop(0.5, '#525c54');
    bodyGrad.addColorStop(0.76, '#79857a');
    bodyGrad.addColorStop(1, '#b5bdb4');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.88, -r * 0.24);
    ctx.quadraticCurveTo(r * 2.08, 0, r * 1.88, r * 0.24); // blunt wide tiger shark snout
    ctx.bezierCurveTo(r * 1.38, r * 0.58, r * 0.35, r * 0.62, -r * 0.62, r * 0.36 + wag * 0.24);
    ctx.quadraticCurveTo(-r * 1.32, r * 0.2 + wag * 0.56, -r * 1.84, tailWag * 0.58);
    ctx.quadraticCurveTo(-r * 1.32, -r * 0.2 + wag * 0.56, -r * 0.62, -r * 0.36 + wag * 0.24);
    ctx.bezierCurveTo(r * 0.35, -r * 0.62, r * 1.38, -r * 0.58, r * 1.88, -r * 0.24);
    ctx.closePath();
    ctx.fill();

    // Signature dark charcoal vertical tiger stripes/bars across broad back
    ctx.strokeStyle = 'rgba(28, 34, 31, 0.72)';
    ctx.lineCap = 'round';
    for (let i = 0; i < 9; i++) {
      const sx = r * (0.95 - i * 0.29);
      const sy = sx < 0 ? wag * (-sx * 0.22) : 0;
      const half = r * Math.max(0.14, 0.48 - Math.abs(i - 2) * 0.042);
      ctx.lineWidth = r * (0.11 - (i % 2) * 0.025);
      ctx.beginPath();
      ctx.moveTo(sx + r * 0.05, sy - half);
      ctx.quadraticCurveTo(sx - r * 0.04, sy, sx + r * 0.05, sy + half);
      ctx.stroke();
    }

    // Prominent dorsal fin & dark eyes
    ctx.fillStyle = '#38403b';
    ctx.beginPath();
    ctx.moveTo(r * 0.45, 0);
    ctx.quadraticCurveTo(r * 0.05, -r * 0.24, -r * 0.34, wag * 0.16);
    ctx.quadraticCurveTo(r * 0.05, r * 0.07, r * 0.45, 0);
    ctx.fill();

    for (const side of [-1, 1]) {
      ctx.fillStyle = '#101412';
      ctx.beginPath();
      ctx.arc(r * 1.44, side * r * 0.34, r * 0.08, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy dorsal highlight
    ctx.fillStyle = 'rgba(240, 248, 240, 0.24)';
    ctx.beginPath();
    ctx.ellipse(r * 0.48, -r * 0.18, r * 0.84, r * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 22. Great White Shark — massive conical-snouted apex predator with dramatic slate-silver & chalky-white countershading
  greatwhitesharkfish(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 4.5 * spd) * r * 0.19;
    const tailWag = Math.sin(t * 4.5 * spd - 0.9) * r * 0.33;

    // Broad muscular lunate crescent shark caudal fin
    ctx.fillStyle = '#3e4c59';
    ctx.beginPath();
    ctx.moveTo(-r * 1.74, tailWag * 0.56);
    ctx.bezierCurveTo(-r * 2.12, -r * 0.58 + tailWag, -r * 2.55, -r * 1.05 + tailWag, -r * 2.78, -r * 1.08 + tailWag);
    ctx.bezierCurveTo(-r * 2.34, -r * 0.38 + tailWag, -r * 2.26, tailWag, -r * 2.66, r * 0.88 + tailWag);
    ctx.bezierCurveTo(-r * 2.42, r * 0.86 + tailWag, -r * 2.08, r * 0.48 + tailWag, -r * 1.74, tailWag * 0.56);
    ctx.closePath();
    ctx.fill();

    // Huge powerful swept-back pectoral fins with dark tips
    for (const side of [-1, 1]) {
      const pGrad = ctx.createLinearGradient(r * 0.82, 0, -r * 0.25, side * r * 1.55);
      pGrad.addColorStop(0, '#627382');
      pGrad.addColorStop(0.75, '#465461');
      pGrad.addColorStop(1, '#222b33');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(r * 0.86, side * r * 0.44);
      ctx.bezierCurveTo(r * 0.52, side * r * 1.25, -r * 0.02, side * r * 1.62, -r * 0.38, side * r * 1.38);
      ctx.bezierCurveTo(-r * 0.1, side * r * 0.9, r * 0.05, side * r * 0.48, r * 0.08, side * r * 0.44);
      ctx.closePath();
      ctx.fill();

      // Pelvic fins
      ctx.fillStyle = '#536370';
      ctx.beginPath();
      ctx.moveTo(-r * 0.58, side * r * 0.3 + wag * 0.22);
      ctx.lineTo(-r * 1.04, side * r * 0.68 + wag * 0.4);
      ctx.lineTo(-r * 1.12, side * r * 0.2 + wag * 0.44);
      ctx.closePath();
      ctx.fill();
    }

    // Massive thick-girthed conical-snouted white-rimmed torso
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.66, 0, r * 0.66);
    bodyGrad.addColorStop(0, '#eef4f8'); // crisp chalky-white flank rim
    bodyGrad.addColorStop(0.16, '#cfdbe3');
    bodyGrad.addColorStop(0.28, '#667787');
    bodyGrad.addColorStop(0.5, '#455463'); // cool slate-steel dorsal back
    bodyGrad.addColorStop(0.72, '#667787');
    bodyGrad.addColorStop(0.84, '#cfdbe3');
    bodyGrad.addColorStop(1, '#eef4f8');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 2.18, 0); // powerful conical snout
    ctx.bezierCurveTo(r * 1.68, -r * 0.58, r * 0.58, -r * 0.68, -r * 0.58, -r * 0.4 + wag * 0.22);
    ctx.quadraticCurveTo(-r * 1.34, -r * 0.2 + wag * 0.54, -r * 1.88, tailWag * 0.56);
    ctx.quadraticCurveTo(-r * 1.34, r * 0.2 + wag * 0.54, -r * 0.58, r * 0.4 + wag * 0.22);
    ctx.bezierCurveTo(r * 0.58, r * 0.68, r * 1.68, r * 0.58, r * 2.18, 0);
    ctx.closePath();
    ctx.fill();

    // Five crisp dark gill slits on each side
    ctx.strokeStyle = 'rgba(26, 34, 42, 0.55)';
    ctx.lineWidth = r * 0.032;
    for (const side of [-1, 1]) {
      for (let g = 0; g < 5; g++) {
        const gx = r * (1.06 - g * 0.09);
        ctx.beginPath();
        ctx.moveTo(gx, side * r * 0.46);
        ctx.lineTo(gx - r * 0.04, side * r * 0.56);
        ctx.stroke();
      }
    }

    // Prominent triangular dorsal fin ridge
    ctx.fillStyle = '#33404d';
    ctx.beginPath();
    ctx.moveTo(r * 0.48, 0);
    ctx.quadraticCurveTo(r * 0.04, -r * 0.28, -r * 0.4, wag * 0.16);
    ctx.quadraticCurveTo(r * 0.06, r * 0.08, r * 0.48, 0);
    ctx.fill();

    // Iconic jet-black eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#090d12';
      ctx.beginPath();
      ctx.arc(r * 1.54, side * r * 0.28, r * 0.075, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy steel-silver specular sheen
    ctx.fillStyle = 'rgba(245, 252, 255, 0.34)';
    ctx.beginPath();
    ctx.ellipse(r * 0.54, -r * 0.18, r * 0.92, r * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 23. Prey: Silvery Minnow — tiny translucent pearlescent darting baitfish
  prey_minnow(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const flicker = Math.sin(t * 14.0 * spd) * r * 0.24;

    // Delicate translucent forked tail flickering rapidly
    ctx.fillStyle = 'rgba(206, 236, 248, 0.62)';
    ctx.beginPath();
    ctx.moveTo(-r * 1.12, flicker * 0.55);
    ctx.lineTo(-r * 1.78, -r * 0.46 + flicker);
    ctx.quadraticCurveTo(-r * 1.45, flicker, -r * 1.78, r * 0.46 + flicker);
    ctx.closePath();
    ctx.fill();

    // Tiny wispy translucent pectorals
    ctx.fillStyle = 'rgba(220, 245, 255, 0.45)';
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(r * 0.28, side * r * 0.44, r * 0.28, r * 0.12, side * 0.65, 0, Math.PI * 2);
      ctx.fill();
    }

    // Silvery translucent darting spindle body
    const bodyGrad = ctx.createLinearGradient(0, -r * 0.42, 0, r * 0.42);
    bodyGrad.addColorStop(0, 'rgba(225, 246, 255, 0.85)');
    bodyGrad.addColorStop(0.32, 'rgba(156, 212, 226, 0.9)');
    bodyGrad.addColorStop(0.5, 'rgba(112, 168, 186, 0.94)');
    bodyGrad.addColorStop(0.68, 'rgba(156, 212, 226, 0.9)');
    bodyGrad.addColorStop(1, 'rgba(225, 246, 255, 0.85)');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.38, 0);
    ctx.bezierCurveTo(r * 0.95, -r * 0.46, -r * 0.15, -r * 0.42, -r * 1.2, flicker * 0.55);
    ctx.bezierCurveTo(-r * 0.15, r * 0.42, r * 0.95, r * 0.46, r * 1.38, 0);
    ctx.closePath();
    ctx.fill();

    // Crisp tiny black eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#0e1720';
      ctx.beginPath();
      ctx.arc(r * 0.92, side * r * 0.2, r * 0.11, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bright pearlescent specular streak
    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.beginPath();
    ctx.ellipse(r * 0.26, -r * 0.1, r * 0.66, r * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 24. Prey: Pond Shrimp — translucent coral-pink segmented shrimp with long antennae & uropod tail fan
  prey_shrimp(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const tailFlick = Math.sin(t * 10.5 * spd) * r * 0.18;
    const antSway = Math.sin(t * 7.5 * spd) * r * 0.16;

    // Ultra-long delicate sweeping antennae extending forward (+X)
    ctx.strokeStyle = 'rgba(255, 168, 152, 0.78)';
    ctx.lineWidth = Math.max(1, r * 0.065);
    ctx.lineCap = 'round';
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(r * 1.05, side * r * 0.12);
      ctx.quadraticCurveTo(r * 1.85, side * r * 0.42 + antSway * side, r * 2.48, side * r * 0.92 + antSway);
      ctx.stroke();
    }

    // Delicate 3-part translucent uropod tail fan
    ctx.fillStyle = 'rgba(255, 148, 134, 0.75)';
    for (const angle of [-0.42, 0, 0.42]) {
      ctx.save();
      ctx.translate(-r * 1.18, tailFlick * 0.5);
      ctx.rotate(angle + tailFlick * 0.02);
      ctx.beginPath();
      ctx.ellipse(-r * 0.34, 0, r * 0.38, r * 0.14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Tiny rowing swimmeret wisps along sides
    ctx.strokeStyle = 'rgba(255, 186, 172, 0.62)';
    ctx.lineWidth = Math.max(1, r * 0.06);
    for (let i = 0; i < 4; i++) {
      const lx = r * (0.45 - i * 0.32);
      const kick = Math.sin(t * 14 * spd + i * 1.1) * r * 0.1;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(lx, side * r * 0.26);
        ctx.lineTo(lx - r * 0.16 + kick, side * r * 0.56);
        ctx.stroke();
      }
    }

    // Translucent coral-pink segmented carapace
    const bodyGrad = ctx.createLinearGradient(r * 1.2, 0, -r * 1.2, 0);
    bodyGrad.addColorStop(0, 'rgba(255, 138, 114, 0.88)');
    bodyGrad.addColorStop(0.35, 'rgba(255, 174, 156, 0.84)');
    bodyGrad.addColorStop(1, 'rgba(255, 198, 184, 0.76)');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.24, 0);
    ctx.bezierCurveTo(r * 0.88, -r * 0.44, -r * 0.25, -r * 0.38, -r * 1.22, tailFlick * 0.5);
    ctx.bezierCurveTo(-r * 0.25, r * 0.38, r * 0.88, r * 0.44, r * 1.24, 0);
    ctx.closePath();
    ctx.fill();

    // Subtle coral carapace segment bands
    ctx.strokeStyle = 'rgba(235, 98, 82, 0.48)';
    ctx.lineWidth = Math.max(1, r * 0.06);
    for (const sx of [0.35, 0.0, -0.35, -0.7]) {
      ctx.beginPath();
      ctx.arc(r * sx, 0, r * 0.28, -Math.PI * 0.42, Math.PI * 0.42);
      ctx.stroke();
    }

    // Stalked tiny jet-black shrimp eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#120d10';
      ctx.beginPath();
      ctx.arc(r * 0.96, side * r * 0.28, r * 0.1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy translucent shell highlight
    ctx.fillStyle = 'rgba(255, 250, 245, 0.65)';
    ctx.beginPath();
    ctx.ellipse(r * 0.32, -r * 0.1, r * 0.52, r * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // 25. Prey: Koi Fry — tiny golden-orange baby koi with calico flecks & delicate flowing veil tail
  prey_koi_fry(ctx, r, t, speed) {
    ctx.save();
    const spd = normSpeed(speed);
    const wag = Math.sin(t * 11.5 * spd) * r * 0.26;

    // Extra-delicate flowing translucent veil tail
    const veilGrad = ctx.createLinearGradient(-r * 0.95, 0, -r * 2.05, 0);
    veilGrad.addColorStop(0, 'rgba(255, 178, 72, 0.82)');
    veilGrad.addColorStop(0.6, 'rgba(255, 224, 152, 0.65)');
    veilGrad.addColorStop(1, 'rgba(255, 245, 225, 0.28)');
    ctx.fillStyle = veilGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 0.92, wag * 0.45);
    ctx.bezierCurveTo(-r * 1.45, -r * 0.72 + wag, -r * 2.08, -r * 0.68 + wag, -r * 1.88, -r * 0.14 + wag);
    ctx.quadraticCurveTo(-r * 1.56, wag, -r * 1.88, r * 0.14 + wag);
    ctx.bezierCurveTo(-r * 2.08, r * 0.68 + wag, -r * 1.45, r * 0.72 + wag, -r * 0.92, wag * 0.45);
    ctx.closePath();
    ctx.fill();

    // Cute fluttering translucent golden pectoral petals
    ctx.fillStyle = 'rgba(255, 224, 160, 0.72)';
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(r * 0.25, side * r * 0.52, r * 0.34, r * 0.16, side * (0.55 + Math.sin(t * 10 * spd) * 0.18), 0, Math.PI * 2);
      ctx.fill();
    }

    // Plump golden-orange teardrop baby koi body
    const bodyGrad = ctx.createRadialGradient(r * 0.38, -r * 0.14, r * 0.08, 0, 0, r * 1.35);
    bodyGrad.addColorStop(0, '#ffd45e');
    bodyGrad.addColorStop(0.45, '#ff8c28');
    bodyGrad.addColorStop(1, '#e65319');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(r * 1.24, 0);
    ctx.bezierCurveTo(r * 1.02, -r * 0.56, -r * 0.05, -r * 0.54, -r * 1.05, wag * 0.45);
    ctx.bezierCurveTo(-r * 0.05, r * 0.54, r * 1.02, r * 0.56, r * 1.24, 0);
    ctx.closePath();
    ctx.fill();

    // Subtle white/pearl calico dorsal flecks
    ctx.fillStyle = 'rgba(255, 250, 240, 0.85)';
    ctx.beginPath();
    ctx.ellipse(r * 0.08, -r * 0.16, r * 0.24, r * 0.14, -0.2, 0, Math.PI * 2);
    ctx.ellipse(-r * 0.36, r * 0.14, r * 0.18, r * 0.11, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Bright little koi eyes
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#18100c';
      ctx.beginPath();
      ctx.arc(r * 0.84, side * r * 0.24, r * 0.11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(r * 0.87, side * r * 0.22, r * 0.038, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glossy sunlit dorsal highlight
    ctx.fillStyle = 'rgba(255, 255, 240, 0.62)';
    ctx.beginPath();
    ctx.ellipse(r * 0.38, -r * 0.14, r * 0.46, r * 0.1, -0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
};

  return module.exports;
})();

const PAINTED_VILLAINS = (() => {
  const module = { exports: {} };
  const exports = module.exports;
'use strict';

/**
 * 18 Handcrafted Top-Down 2D Canvas Villain Predator Illustrations.
 * Coordinate contract:
 *   - ctx is translated to (0, 0) and rotated facing RIGHT (+X nose, -X tail)
 *   - r is base radius (~38px)
 *   - t is animation time in seconds
 *   - speed is current movement speed (optional, defaults to 0)
 *
 * Every villain has its own bespoke silhouette, anatomical geometry,
 * dark predatory palette, layered painted gradients, and kinematic motion.
 */

// ---------------------------------------------------------------------------
// Micro-accent primitives (eyes, gill slashes, venomous spines — NO shared body!)
// ---------------------------------------------------------------------------

function drawSinisterEye(ctx, x, y, radius, glowColor, coreColor, slitAngle) {
  ctx.save();
  ctx.translate(x, y);
  if (slitAngle) ctx.rotate(slitAngle);

  // Dark orbital socket
  ctx.fillStyle = 'rgba(4, 4, 8, 0.85)';
  ctx.beginPath();
  ctx.ellipse(0, 0, radius * 1.45, radius * 1.25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Outer sinister glow
  const glow = ctx.createRadialGradient(0, 0, radius * 0.15, 0, 0, radius * 2.1);
  glow.addColorStop(0, glowColor);
  glow.addColorStop(0.55, glowColor.replace('1)', '0.35)').replace('0.95)', '0.3)'));
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 2.1, 0, Math.PI * 2);
  ctx.fill();

  // Iris
  const iris = ctx.createRadialGradient(-radius * 0.15, -radius * 0.15, radius * 0.1, 0, 0, radius);
  iris.addColorStop(0, coreColor || '#fff7d6');
  iris.addColorStop(0.5, glowColor);
  iris.addColorStop(1, '#1a0206');
  ctx.fillStyle = iris;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Predator vertical slit pupil
  ctx.fillStyle = '#050205';
  ctx.beginPath();
  ctx.ellipse(radius * 0.08, 0, radius * 0.28, radius * 0.82, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pinpoint specular glint
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath();
  ctx.arc(-radius * 0.32, -radius * 0.3, radius * 0.24, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawGillSlashes(ctx, xStart, yOffset, count, spacing, length, tilt, color) {
  ctx.save();
  ctx.strokeStyle = color || '#8b0a1a';
  ctx.lineCap = 'round';
  for (let side of [-1, 1]) {
    for (let i = 0; i < count; i++) {
      const gx = xStart - i * spacing;
      const gy = side * yOffset;
      const len = length * (1 - i * 0.08);
      ctx.lineWidth = Math.max(1.1, length * 0.16);
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.quadraticCurveTo(gx - len * 0.35, gy + side * len * 0.45, gx - len * tilt, gy + side * len);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(8, 2, 5, 0.75)';
      ctx.lineWidth = Math.max(0.7, length * 0.09);
      ctx.beginPath();
      ctx.moveTo(gx - 0.6, gy + side * 0.4);
      ctx.quadraticCurveTo(gx - len * 0.35 - 0.5, gy + side * len * 0.45, gx - len * tilt - 0.5, gy + side * len);
      ctx.stroke();
      ctx.strokeStyle = color || '#8b0a1a';
    }
  }
  ctx.restore();
}

function drawJaggedSpineRidge(ctx, points, width, baseColor, tipColor) {
  if (points.length < 2) return;
  ctx.save();
  ctx.lineJoin = 'miter';
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.strokeStyle = baseColor;
  ctx.lineWidth = width;
  ctx.stroke();

  // Jagged barb ticks along dorsal crest
  ctx.strokeStyle = tipColor;
  ctx.lineWidth = Math.max(1.1, width * 0.55);
  for (let i = 0; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    const mx = (x + nx) * 0.5;
    const my = (y + ny) * 0.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(mx - width * 0.5, my);
    ctx.stroke();
  }
  ctx.restore();
}

function getSwimPhase(t, speed, baseFreq, amp) {
  const s = typeof speed === 'number' && !Number.isNaN(speed) ? speed : 0;
  return Math.sin((t || 0) * (baseFreq + s * 0.035)) * amp;
}

// ---------------------------------------------------------------------------
// 1. VILLAIN PIRANHA — Pugnacious Bulldog Underbite & Crimson-Obsidian Armor
// ---------------------------------------------------------------------------
function villain_piranhafish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 9.5, 0.22);
  const finFlutter = getSwimPhase(t + 0.5, speed, 11, 0.16);

  // Under-shadow
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.36)';
  ctx.beginPath();
  ctx.ellipse(-r * 0.05, r * 0.07, r * 1.12, r * 0.65, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Sharp forked crimson-black caudal tail
  ctx.save();
  ctx.translate(-r * 0.92, 0);
  ctx.rotate(wag);
  const tailGrad = ctx.createLinearGradient(0, 0, -r * 0.65, 0);
  tailGrad.addColorStop(0, '#1e1620');
  tailGrad.addColorStop(0.55, '#6d0c1c');
  tailGrad.addColorStop(1, '#12060b');
  ctx.fillStyle = tailGrad;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.14);
  ctx.quadraticCurveTo(-r * 0.35, -r * 0.42, -r * 0.68, -r * 0.54);
  ctx.lineTo(-r * 0.36, 0);
  ctx.lineTo(-r * 0.68, r * 0.54);
  ctx.quadraticCurveTo(-r * 0.35, r * 0.42, 0, r * 0.14);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#a81428';
  ctx.lineWidth = r * 0.03;
  ctx.stroke();
  ctx.restore();

  // Serrated pectoral fins
  for (let side of [-1, 1]) {
    ctx.save();
    ctx.translate(r * 0.18, side * r * 0.48);
    ctx.rotate(side * (0.45 + finFlutter));
    const pfGrad = ctx.createLinearGradient(0, 0, -r * 0.45, side * r * 0.32);
    pfGrad.addColorStop(0, '#5a0918');
    pfGrad.addColorStop(1, '#13070c');
    ctx.fillStyle = pfGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-r * 0.12, side * r * 0.36, -r * 0.52, side * r * 0.42);
    ctx.lineTo(-r * 0.36, side * r * 0.18);
    ctx.lineTo(-r * 0.48, side * r * 0.06);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Jutting bulldog lower jaw with protruding interlocking ivory fangs
  ctx.save();
  ctx.fillStyle = '#2c0810';
  ctx.beginPath();
  ctx.moveTo(r * 0.88, -r * 0.25);
  ctx.quadraticCurveTo(r * 1.18, 0, r * 0.88, r * 0.25);
  ctx.closePath();
  ctx.fill();
  // Razor triangular piranha teeth
  ctx.fillStyle = '#f3ece0';
  for (let i = -3; i <= 3; i++) {
    const ty = i * r * 0.062;
    const tx = r * 1.08 - Math.abs(i) * r * 0.038;
    ctx.beginPath();
    ctx.moveTo(tx - r * 0.06, ty - r * 0.028);
    ctx.lineTo(tx + r * 0.09, ty);
    ctx.lineTo(tx - r * 0.06, ty + r * 0.028);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Deep diamond-rhomboid muscular torso
  const bodyGrad = ctx.createRadialGradient(r * 0.15, -r * 0.08, r * 0.08, 0, 0, r * 1.12);
  bodyGrad.addColorStop(0, '#3a3444');
  bodyGrad.addColorStop(0.38, '#1e1b26');
  bodyGrad.addColorStop(0.72, '#5a0a18');
  bodyGrad.addColorStop(1, '#10070c');

  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.moveTo(r * 0.96, 0);
  ctx.bezierCurveTo(r * 0.88, -r * 0.36, r * 0.44, -r * 0.64, -r * 0.05, -r * 0.58);
  ctx.bezierCurveTo(-r * 0.48, -r * 0.52, -r * 0.78, -r * 0.24, -r * 0.98, -r * 0.11);
  ctx.lineTo(-r * 0.98, r * 0.11);
  ctx.bezierCurveTo(-r * 0.78, r * 0.24, -r * 0.48, r * 0.52, -r * 0.05, r * 0.58);
  ctx.bezierCurveTo(r * 0.44, r * 0.64, r * 0.88, r * 0.36, r * 0.96, 0);
  ctx.closePath();
  ctx.fill();

  // Crimson-metallic armored flank scales & sheen
  ctx.save();
  ctx.clip();
  const crimsonRim = ctx.createLinearGradient(0, -r * 0.62, 0, r * 0.62);
  crimsonRim.addColorStop(0, 'rgba(180, 18, 42, 0.55)');
  crimsonRim.addColorStop(0.28, 'rgba(20, 18, 28, 0)');
  crimsonRim.addColorStop(0.72, 'rgba(20, 18, 28, 0)');
  crimsonRim.addColorStop(1, 'rgba(180, 18, 42, 0.55)');
  ctx.fillStyle = crimsonRim;
  ctx.fillRect(-r * 1.1, -r * 0.7, r * 2.2, r * 1.4);

  // Dark metallic scale cross-hatching
  ctx.strokeStyle = 'rgba(215, 45, 70, 0.18)';
  ctx.lineWidth = r * 0.022;
  for (let x = -r * 0.7; x <= r * 0.5; x += r * 0.16) {
    ctx.beginPath();
    ctx.arc(x, 0, r * 0.48, -0.9, 0.9);
    ctx.stroke();
  }
  ctx.restore();

  // Heavy dark outline
  ctx.strokeStyle = '#090408';
  ctx.lineWidth = r * 0.04;
  ctx.stroke();

  // Razor gill slashes
  drawGillSlashes(ctx, r * 0.42, r * 0.28, 3, r * 0.085, r * 0.22, 0.65, '#c4142c');

  // Jagged dorsal spine ridge
  drawJaggedSpineRidge(
    ctx,
    [
      [r * 0.35, 0],
      [r * 0.1, wag * r * 0.06],
      [-r * 0.18, wag * r * 0.12],
      [-r * 0.46, wag * r * 0.18],
      [-r * 0.78, wag * r * 0.25],
    ],
    r * 0.09,
    '#0d0810',
    '#b81d34'
  );

  // Fierce brow ridges + glowing molten amber-red eyes
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.62, side * r * 0.25, r * 0.11, 'rgba(255, 65, 25, 1)', '#ffe680', side * 0.25);
    ctx.strokeStyle = '#0a0509';
    ctx.lineWidth = r * 0.055;
    ctx.beginPath();
    ctx.moveTo(r * 0.78, side * r * 0.17);
    ctx.lineTo(r * 0.48, side * r * 0.32);
    ctx.stroke();
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 2. VILLAIN SCORPIONFISH — Thorny Armored Head & Venomous Splayed Fan Fins
// ---------------------------------------------------------------------------
function villain_scorpionfish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 5.5, 0.18);
  const pulse = Math.sin((t || 0) * 4.5) * 0.08;

  // Wide thorny fan pectoral fins with venomous needle tips
  for (let side of [-1, 1]) {
    ctx.save();
    ctx.translate(r * 0.15, side * r * 0.36);
    ctx.rotate(side * (0.12 + pulse));
    const finGrad = ctx.createRadialGradient(0, 0, r * 0.1, -r * 0.15, side * r * 0.55, r * 0.95);
    finGrad.addColorStop(0, '#4f0c14');
    finGrad.addColorStop(0.55, '#250910');
    finGrad.addColorStop(0.85, '#8c1724');
    finGrad.addColorStop(1, '#180509');
    ctx.fillStyle = finGrad;
    ctx.beginPath();
    ctx.moveTo(r * 0.22, 0);
    ctx.bezierCurveTo(r * 0.28, side * r * 0.62, -r * 0.25, side * r * 0.92, -r * 0.68, side * r * 0.62);
    ctx.quadraticCurveTo(-r * 0.42, side * r * 0.22, -r * 0.22, 0);
    ctx.closePath();
    ctx.fill();

    // 7 venomous spine rays poking past the fin webbing
    for (let i = 0; i < 7; i++) {
      const ang = side * (0.28 + i * 0.24);
      const len = r * (0.72 + Math.sin(i * 0.8) * 0.18);
      const ex = Math.cos(ang + Math.PI * 0.22 * side) * len * 0.4 - i * r * 0.085 + r * 0.18;
      const ey = side * (r * 0.25 + Math.sin(0.5 + i * 0.3) * r * 0.64);
      ctx.strokeStyle = '#18060a';
      ctx.lineWidth = r * 0.045;
      ctx.beginPath();
      ctx.moveTo(r * 0.05 - i * r * 0.03, side * r * 0.05);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      // Glowing venom tip
      ctx.fillStyle = '#ff5e2b';
      ctx.beginPath();
      ctx.arc(ex, ey, r * 0.04, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Broad mottled fan tail
  ctx.save();
  ctx.translate(-r * 0.85, 0);
  ctx.rotate(wag);
  const tGrad = ctx.createLinearGradient(0, 0, -r * 0.58, 0);
  tGrad.addColorStop(0, '#300b12');
  tGrad.addColorStop(0.5, '#7c1824');
  tGrad.addColorStop(1, '#1b070c');
  ctx.fillStyle = tGrad;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.16);
  ctx.quadraticCurveTo(-r * 0.35, -r * 0.44, -r * 0.58, -r * 0.38);
  ctx.quadraticCurveTo(-r * 0.65, 0, -r * 0.58, r * 0.38);
  ctx.quadraticCurveTo(-r * 0.35, r * 0.44, 0, r * 0.16);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Heavy craggy triangular-wedge armored body
  const bGrad = ctx.createRadialGradient(r * 0.28, 0, r * 0.1, 0, 0, r * 1.1);
  bGrad.addColorStop(0, '#8a1c24');
  bGrad.addColorStop(0.42, '#450d15');
  bGrad.addColorStop(0.78, '#1f080e');
  bGrad.addColorStop(1, '#0d0407');
  ctx.fillStyle = bGrad;
  ctx.beginPath();
  ctx.moveTo(r * 1.05, 0);
  ctx.lineTo(r * 0.86, -r * 0.38);
  ctx.lineTo(r * 0.52, -r * 0.62); // cheek spine
  ctx.lineTo(r * 0.36, -r * 0.48);
  ctx.lineTo(r * 0.1, -r * 0.56);
  ctx.quadraticCurveTo(-r * 0.42, -r * 0.38, -r * 0.92, -r * 0.15);
  ctx.lineTo(-r * 0.92, r * 0.15);
  ctx.quadraticCurveTo(-r * 0.42, r * 0.38, r * 0.1, r * 0.56);
  ctx.lineTo(r * 0.36, r * 0.48);
  ctx.lineTo(r * 0.52, r * 0.62); // cheek spine
  ctx.lineTo(r * 0.86, r * 0.38);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#090306';
  ctx.lineWidth = r * 0.04;
  ctx.stroke();

  // Scorched volcanic camouflage blotches
  ctx.fillStyle = 'rgba(12, 4, 8, 0.55)';
  const blotches = [
    [r * 0.25, -r * 0.24, r * 0.22],
    [r * 0.2, r * 0.26, r * 0.2],
    [-r * 0.22, -r * 0.14, r * 0.18],
    [-r * 0.32, r * 0.16, r * 0.17],
    [r * 0.62, 0, r * 0.15],
  ];
  for (const [bx, by, br] of blotches) {
    ctx.beginPath();
    ctx.ellipse(bx, by, br * 1.2, br * 0.75, 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Spiny venomous dorsal crest needles
  for (let i = 0; i < 8; i++) {
    const sx = r * 0.42 - i * r * 0.16;
    const sy = Math.sin(i * 1.1) * r * 0.04 + wag * r * 0.05 * i;
    ctx.strokeStyle = '#ff3b30';
    ctx.lineWidth = r * 0.055;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx - r * 0.18, sy + (i % 2 === 0 ? -r * 0.09 : r * 0.09));
    ctx.stroke();
    ctx.fillStyle = '#ffcf4d';
    ctx.beginPath();
    ctx.arc(sx - r * 0.18, sy + (i % 2 === 0 ? -r * 0.09 : r * 0.09), r * 0.032, 0, Math.PI * 2);
    ctx.fill();
  }

  // Horned orbital crests & glowing sulfur-amber eyes
  for (let side of [-1, 1]) {
    ctx.fillStyle = '#2d080f';
    ctx.beginPath();
    ctx.moveTo(r * 0.78, side * r * 0.2);
    ctx.lineTo(r * 0.56, side * r * 0.42);
    ctx.lineTo(r * 0.46, side * r * 0.22);
    ctx.closePath();
    ctx.fill();
    drawSinisterEye(ctx, r * 0.64, side * r * 0.24, r * 0.1, 'rgba(255, 195, 25, 1)', '#fff8c4', side * 0.3);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 3. VILLAIN LIONFISH — Explosive Starburst of Banded Venomous Plume Spines
// ---------------------------------------------------------------------------
function villain_lionfish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 5.0, 0.2);
  const fanWave = Math.sin((t || 0) * 3.8) * 0.09;

  // Explosive radial starburst of 14 long venomous feathered pectoral plumes
  for (let side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      ctx.save();
      const baseAngle = side * (0.52 + i * 0.27) + side * fanWave * (1 - i * 0.08);
      const len = r * (1.28 + Math.sin(i * 0.75) * 0.26);
      ctx.translate(r * 0.28 - i * r * 0.06, side * r * 0.22);
      ctx.rotate(baseAngle);

      // Translucent crimson-obsidian fin plume membrane
      const pGrad = ctx.createLinearGradient(0, 0, len, 0);
      pGrad.addColorStop(0, 'rgba(130, 12, 34, 0.85)');
      pGrad.addColorStop(0.5, 'rgba(25, 8, 18, 0.78)');
      pGrad.addColorStop(0.85, 'rgba(180, 22, 52, 0.6)');
      pGrad.addColorStop(1, 'rgba(110, 255, 235, 0.85)');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.045);
      ctx.quadraticCurveTo(len * 0.55, -r * 0.11, len, 0);
      ctx.quadraticCurveTo(len * 0.55, r * 0.08, 0, r * 0.045);
      ctx.closePath();
      ctx.fill();

      // Banded spine shaft
      ctx.strokeStyle = '#f2e4dc';
      ctx.lineWidth = r * 0.032;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(len, 0);
      ctx.stroke();

      ctx.strokeStyle = '#1b050c';
      ctx.setLineDash([r * 0.1, r * 0.09]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(len * 0.9, 0);
      ctx.stroke();
      ctx.setLineDash([]);

      // Toxic glowing cyan venom needle tip
      ctx.fillStyle = '#52ffe8';
      ctx.beginPath();
      ctx.arc(len, 0, r * 0.035, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Translucent spotted fan tail
  ctx.save();
  ctx.translate(-r * 0.85, 0);
  ctx.rotate(wag);
  ctx.fillStyle = 'rgba(42, 10, 22, 0.75)';
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.12);
  ctx.lineTo(-r * 0.62, -r * 0.42);
  ctx.quadraticCurveTo(-r * 0.72, 0, -r * 0.62, r * 0.42);
  ctx.lineTo(0, r * 0.12);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(230, 195, 200, 0.5)';
  ctx.lineWidth = r * 0.025;
  ctx.stroke();
  ctx.restore();

  // Compact predatory zebra-banded body
  const bodyGrad = ctx.createLinearGradient(r * 0.95, 0, -r * 0.9, 0);
  bodyGrad.addColorStop(0, '#4f0c1d');
  bodyGrad.addColorStop(0.5, '#260812');
  bodyGrad.addColorStop(1, '#14050a');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.moveTo(r * 0.95, 0);
  ctx.bezierCurveTo(r * 0.72, -r * 0.36, r * 0.15, -r * 0.42, -r * 0.35, -r * 0.28);
  ctx.lineTo(-r * 0.88, -r * 0.1);
  ctx.lineTo(-r * 0.88, r * 0.1);
  ctx.lineTo(-r * 0.35, r * 0.28);
  ctx.bezierCurveTo(r * 0.15, r * 0.42, r * 0.72, r * 0.36, r * 0.95, 0);
  ctx.closePath();
  ctx.fill();

  // Stark obsidian-crimson & bone-ivory zebra bands clipped to torso
  ctx.save();
  ctx.clip();
  for (let i = 0; i < 6; i++) {
    const bx = r * 0.72 - i * r * 0.28;
    ctx.fillStyle = i % 2 === 0 ? '#e6d7ce' : '#7b0d24';
    ctx.fillRect(bx, -r * 0.5, r * 0.11, r * 1.0);
  }
  ctx.restore();

  ctx.strokeStyle = '#090306';
  ctx.lineWidth = r * 0.035;
  ctx.stroke();

  // Dorsal venomous spine ridge
  drawJaggedSpineRidge(
    ctx,
    [
      [r * 0.48, 0],
      [r * 0.18, wag * r * 0.08],
      [-r * 0.15, wag * r * 0.14],
      [-r * 0.5, wag * r * 0.2],
      [-r * 0.82, wag * r * 0.26],
    ],
    r * 0.085,
    '#140409',
    '#ff3355'
  );

  // Swept-back supraorbital horn tentacles + ruby eyes
  for (let side of [-1, 1]) {
    ctx.strokeStyle = '#c2183a';
    ctx.lineWidth = r * 0.045;
    ctx.beginPath();
    ctx.moveTo(r * 0.65, side * r * 0.18);
    ctx.quadraticCurveTo(r * 0.86, side * r * 0.42, r * 0.48, side * r * 0.52);
    ctx.stroke();
    drawSinisterEye(ctx, r * 0.58, side * r * 0.2, r * 0.095, 'rgba(255, 38, 72, 1)', '#ffd6e0', side * 0.2);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 4. VILLAIN STONEFISH — Craggy Basalt Boulder & Glowing Toxic Venom Glands
// ---------------------------------------------------------------------------
function villain_stonefish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 3.6, 0.12);
  const venomPulse = 0.65 + 0.35 * Math.sin((t || 0) * 5.2);

  // Thick stubby rock-like paddle pectorals
  for (let side of [-1, 1]) {
    ctx.save();
    ctx.translate(r * 0.12, side * r * 0.52);
    ctx.rotate(side * 0.25);
    ctx.fillStyle = '#25261e';
    ctx.beginPath();
    ctx.moveTo(r * 0.24, 0);
    ctx.bezierCurveTo(r * 0.18, side * r * 0.45, -r * 0.32, side * r * 0.52, -r * 0.48, side * r * 0.16);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#12130e';
    ctx.lineWidth = r * 0.04;
    ctx.stroke();
    ctx.restore();
  }

  // Heavy blunt boulder tail
  ctx.save();
  ctx.translate(-r * 0.84, 0);
  ctx.rotate(wag);
  ctx.fillStyle = '#2b2c22';
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.22);
  ctx.quadraticCurveTo(-r * 0.35, -r * 0.36, -r * 0.52, -r * 0.2);
  ctx.quadraticCurveTo(-r * 0.58, 0, -r * 0.52, r * 0.2);
  ctx.quadraticCurveTo(-r * 0.35, r * 0.36, 0, r * 0.22);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#0e0f0b';
  ctx.lineWidth = r * 0.035;
  ctx.stroke();
  ctx.restore();

  // Wide, lumpy, craggy basalt boulder silhouette
  const rockGrad = ctx.createRadialGradient(r * 0.15, -r * 0.1, r * 0.12, 0, 0, r * 1.15);
  rockGrad.addColorStop(0, '#4a4c38');
  rockGrad.addColorStop(0.45, '#2b2d22');
  rockGrad.addColorStop(0.78, '#1a1b15');
  rockGrad.addColorStop(1, '#0c0d0a');
  ctx.fillStyle = rockGrad;

  ctx.beginPath();
  ctx.moveTo(r * 0.96, -r * 0.18);
  ctx.lineTo(r * 0.85, -r * 0.48);
  ctx.lineTo(r * 0.55, -r * 0.62);
  ctx.lineTo(r * 0.28, -r * 0.78); // craggy wart lobe
  ctx.lineTo(-r * 0.06, -r * 0.68);
  ctx.lineTo(-r * 0.38, -r * 0.54);
  ctx.lineTo(-r * 0.68, -r * 0.32);
  ctx.lineTo(-r * 0.88, -r * 0.2);
  ctx.lineTo(-r * 0.88, r * 0.2);
  ctx.lineTo(-r * 0.68, r * 0.32);
  ctx.lineTo(-r * 0.38, r * 0.54);
  ctx.lineTo(-r * 0.06, r * 0.68);
  ctx.lineTo(r * 0.28, r * 0.78);
  ctx.lineTo(r * 0.55, r * 0.62);
  ctx.lineTo(r * 0.85, r * 0.48);
  ctx.lineTo(r * 0.96, r * 0.18);
  ctx.quadraticCurveTo(r * 1.06, 0, r * 0.96, -r * 0.18);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#090a07';
  ctx.lineWidth = r * 0.045;
  ctx.stroke();

  // Craggy moss/necrotic warts and rock fissures
  ctx.fillStyle = 'rgba(15, 16, 11, 0.65)';
  for (const [wx, wy, wr] of [
    [r * 0.38, -r * 0.4, r * 0.16],
    [r * 0.35, r * 0.42, r * 0.15],
    [-r * 0.1, -r * 0.35, r * 0.18],
    [-r * 0.15, r * 0.32, r * 0.16],
    [-r * 0.45, -r * 0.18, r * 0.14],
    [-r * 0.48, r * 0.2, r * 0.13],
  ]) {
    ctx.beginPath();
    ctx.arc(wx, wy, wr, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cavernous upturned craggy mouth ridge
  ctx.strokeStyle = '#090907';
  ctx.lineWidth = r * 0.07;
  ctx.beginPath();
  ctx.moveTo(r * 0.92, -r * 0.26);
  ctx.quadraticCurveTo(r * 1.04, 0, r * 0.92, r * 0.26);
  ctx.stroke();

  // 7 Hypodermic dorsal venom spines with glowing toxic-chartreuse venom sacs
  for (let i = 0; i < 7; i++) {
    const sx = r * 0.46 - i * r * 0.18;
    const sy = Math.sin(i * 1.7) * r * 0.04;
    // Glowing toxic venom sac
    const vGlow = ctx.createRadialGradient(sx, sy, r * 0.02, sx, sy, r * 0.13);
    vGlow.addColorStop(0, `rgba(170, 255, 45, ${venomPulse})`);
    vGlow.addColorStop(1, 'rgba(60, 140, 10, 0)');
    ctx.fillStyle = vGlow;
    ctx.beginPath();
    ctx.arc(sx, sy, r * 0.13, 0, Math.PI * 2);
    ctx.fill();

    // Thick bone-dark hypodermic needle
    ctx.strokeStyle = '#11120c';
    ctx.lineWidth = r * 0.055;
    ctx.beginPath();
    ctx.moveTo(sx + r * 0.03, sy);
    ctx.lineTo(sx - r * 0.14, sy);
    ctx.stroke();
    ctx.fillStyle = '#c8ff4d';
    ctx.beginPath();
    ctx.arc(sx - r * 0.14, sy, r * 0.028, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sunken craggy eyes glowing toxic-yellow
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.64, side * r * 0.28, r * 0.09, 'rgba(195, 255, 40, 1)', '#f5ffbd', side * 0.2);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 5. VILLAIN MORAY EEL — Sinuous Venom-Reticulated Serpent & Gaping Glass Fangs
// ---------------------------------------------------------------------------
function villain_morayeelfish(ctx, r, t, speed) {
  ctx.save();
  const s = typeof speed === 'number' && !Number.isNaN(speed) ? speed : 0;
  const phase = (t || 0) * (6.2 + s * 0.03);

  // Compute sinuous 14-segment serpentine spine from head (+0.95r) to whip tail (-2.15r)
  const segs = 14;
  const pts = [];
  for (let i = 0; i <= segs; i++) {
    const u = i / segs;
    const x = r * (0.95 - u * 3.1);
    const amp = r * (0.04 + u * u * 0.46);
    const y = Math.sin(phase - u * 5.2) * amp;
    const halfW = r * (0.28 * Math.sin(Math.min(1, u * 4.5) * Math.PI * 0.5) * (1 - u * 0.78) + 0.05);
    pts.push({ x, y, halfW, u });
  }

  // Continuous rippling fleshy dorsal-caudal fin membrane
  ctx.save();
  const finGrad = ctx.createLinearGradient(r * 0.6, 0, -r * 2.15, 0);
  finGrad.addColorStop(0, 'rgba(120, 185, 38, 0.75)');
  finGrad.addColorStop(0.5, 'rgba(24, 58, 22, 0.85)');
  finGrad.addColorStop(1, 'rgba(10, 22, 14, 0.9)');
  ctx.strokeStyle = finGrad;
  ctx.lineCap = 'round';
  ctx.lineWidth = r * 0.16;
  ctx.beginPath();
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i];
    const ridgeOffset = Math.cos(phase - p.u * 5.2) * r * 0.08;
    if (i === 1) ctx.moveTo(p.x, p.y + ridgeOffset);
    else ctx.lineTo(p.x, p.y + ridgeOffset);
  }
  ctx.stroke();
  ctx.restore();

  // Serpentine muscular ribbon body
  const leftEdge = [];
  const rightEdge = [];
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    leftEdge.push([p.x + nx * p.halfW, p.y + ny * p.halfW]);
    rightEdge.push([p.x - nx * p.halfW, p.y - ny * p.halfW]);
  }

  const eelGrad = ctx.createLinearGradient(r * 1.1, 0, -r * 2.15, 0);
  eelGrad.addColorStop(0, '#3e5c1f');
  eelGrad.addColorStop(0.35, '#1d3317');
  eelGrad.addColorStop(0.7, '#0f1c12');
  eelGrad.addColorStop(1, '#070c09');
  ctx.fillStyle = eelGrad;

  ctx.beginPath();
  ctx.moveTo(leftEdge[0][0], leftEdge[0][1]);
  for (let i = 1; i < leftEdge.length; i++) ctx.lineTo(leftEdge[i][0], leftEdge[i][1]);
  for (let i = rightEdge.length - 1; i >= 0; i--) ctx.lineTo(rightEdge[i][0], rightEdge[i][1]);
  ctx.closePath();
  ctx.fill();

  // Venomous chartreuse-black leopard reticulations clipped to body
  ctx.save();
  ctx.clip();
  ctx.fillStyle = 'rgba(155, 220, 45, 0.28)';
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + (i % 2 === 0 ? p.halfW * 0.35 : -p.halfW * 0.35), p.halfW * 0.75, p.halfW * 0.42, 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.strokeStyle = '#050a07';
  ctx.lineWidth = r * 0.038;
  ctx.stroke();

  // Narrow wolf-like hinged jaw gaping open with glass needle fangs
  ctx.save();
  ctx.translate(pts[0].x, pts[0].y);
  // Bruised crimson inner maw
  ctx.fillStyle = '#4a0818';
  ctx.beginPath();
  ctx.moveTo(-r * 0.06, -r * 0.18);
  ctx.lineTo(r * 0.38, -r * 0.1);
  ctx.lineTo(r * 0.42, 0);
  ctx.lineTo(r * 0.38, r * 0.1);
  ctx.lineTo(-r * 0.06, r * 0.18);
  ctx.closePath();
  ctx.fill();

  // Upper/lower jaw rims
  ctx.strokeStyle = '#2d4717';
  ctx.lineWidth = r * 0.075;
  ctx.beginPath();
  ctx.moveTo(-r * 0.08, -r * 0.21);
  ctx.lineTo(r * 0.36, -r * 0.11);
  ctx.moveTo(-r * 0.08, r * 0.21);
  ctx.lineTo(r * 0.36, r * 0.11);
  ctx.stroke();

  // Needle-like translucent glass fangs
  ctx.fillStyle = '#e8fff2';
  for (let side of [-1, 1]) {
    for (let f = 0; f < 4; f++) {
      const fx = r * 0.05 + f * r * 0.08;
      const fy = side * (r * 0.16 - f * r * 0.02);
      ctx.beginPath();
      ctx.moveTo(fx - r * 0.022, fy);
      ctx.lineTo(fx + r * 0.025, fy - side * r * 0.09);
      ctx.lineTo(fx + r * 0.03, fy);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Sinister sulfur-amber slit eyes
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.02, side * r * 0.16, r * 0.085, 'rgba(255, 225, 35, 1)', '#ffffff', side * 0.15);
  }
  ctx.restore();

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 6. VILLAIN BARRACUDA — Razor-Thin Obsidian-Steel Spear & Dagger Fangs
// ---------------------------------------------------------------------------
function villain_barracudafish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 10.5, 0.16);

  // Deeply forked scythe tail
  ctx.save();
  ctx.translate(-r * 1.25, 0);
  ctx.rotate(wag);
  const tGrad = ctx.createLinearGradient(0, 0, -r * 0.58, 0);
  tGrad.addColorStop(0, '#18202c');
  tGrad.addColorStop(0.6, '#0d121a');
  tGrad.addColorStop(1, '#303f54');
  ctx.fillStyle = tGrad;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.08);
  ctx.quadraticCurveTo(-r * 0.25, -r * 0.26, -r * 0.58, -r * 0.48);
  ctx.lineTo(-r * 0.28, 0);
  ctx.lineTo(-r * 0.58, r * 0.48);
  ctx.quadraticCurveTo(-r * 0.25, r * 0.26, 0, r * 0.08);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#06090e';
  ctx.lineWidth = r * 0.03;
  ctx.stroke();
  ctx.restore();

  // Swept razor-sharp pectoral and rear pelvic/dorsal fins
  for (let side of [-1, 1]) {
    ctx.fillStyle = '#141c28';
    ctx.beginPath();
    ctx.moveTo(r * 0.45, side * r * 0.25);
    ctx.lineTo(r * 0.02, side * r * 0.54);
    ctx.lineTo(-r * 0.08, side * r * 0.24);
    ctx.closePath();
    ctx.fill();

    // Rear set-back propulsion fins
    ctx.beginPath();
    ctx.moveTo(-r * 0.55, side * r * 0.18);
    ctx.lineTo(-r * 0.92, side * r * 0.36);
    ctx.lineTo(-r * 0.96, side * r * 0.14);
    ctx.closePath();
    ctx.fill();
  }

  // Jutting underslung dagger-fanged pike jaw
  ctx.fillStyle = '#1b2230';
  ctx.beginPath();
  ctx.moveTo(r * 1.15, -r * 0.13);
  ctx.lineTo(r * 1.62, 0);
  ctx.lineTo(r * 1.15, r * 0.13);
  ctx.closePath();
  ctx.fill();

  // Protruding chrome dagger fangs along the snout edges
  ctx.fillStyle = '#edf6ff';
  for (let side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const fx = r * 1.12 + i * r * 0.11;
      const fy = side * (r * 0.12 - i * r * 0.022);
      ctx.beginPath();
      ctx.moveTo(fx - r * 0.03, fy);
      ctx.lineTo(fx + r * 0.03, fy + side * r * 0.075);
      ctx.lineTo(fx + r * 0.05, fy);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Ultra-sleek spear-like torpedo body
  const bGrad = ctx.createLinearGradient(0, -r * 0.34, 0, r * 0.34);
  bGrad.addColorStop(0, '#0a0f18');
  bGrad.addColorStop(0.28, '#28364a');
  bGrad.addColorStop(0.5, '#475a75');
  bGrad.addColorStop(0.72, '#28364a');
  bGrad.addColorStop(1, '#0a0f18');
  ctx.fillStyle = bGrad;

  ctx.beginPath();
  ctx.moveTo(r * 1.5, 0);
  ctx.bezierCurveTo(r * 1.15, -r * 0.24, r * 0.45, -r * 0.33, -r * 0.2, -r * 0.28);
  ctx.bezierCurveTo(-r * 0.72, -r * 0.24, -r * 1.05, -r * 0.12, -r * 1.28, -r * 0.07);
  ctx.lineTo(-r * 1.28, r * 0.07);
  ctx.bezierCurveTo(-r * 1.05, r * 0.12, -r * 0.72, r * 0.24, -r * 0.2, r * 0.28);
  ctx.bezierCurveTo(r * 0.45, r * 0.33, r * 1.15, r * 0.24, r * 1.5, 0);
  ctx.closePath();
  ctx.fill();

  // Dark chevron slash bars across metallic flanks
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = 'rgba(7, 10, 16, 0.78)';
  ctx.lineWidth = r * 0.055;
  for (let x = -r * 0.95; x <= r * 0.65; x += r * 0.2) {
    ctx.beginPath();
    ctx.moveTo(x - r * 0.08, -r * 0.36);
    ctx.lineTo(x + r * 0.06, 0);
    ctx.lineTo(x - r * 0.08, r * 0.36);
    ctx.stroke();
  }
  ctx.restore();

  ctx.strokeStyle = '#05070c';
  ctx.lineWidth = r * 0.035;
  ctx.stroke();

  // Razor crimson gill slashes
  drawGillSlashes(ctx, r * 0.68, r * 0.16, 3, r * 0.07, r * 0.14, 0.7, '#b5142b');

  // Sharp metallic dorsal spine line
  drawJaggedSpineRidge(
    ctx,
    [
      [r * 0.45, 0],
      [0, wag * r * 0.06],
      [-r * 0.45, wag * r * 0.12],
      [-r * 0.95, wag * r * 0.18],
    ],
    r * 0.055,
    '#0b1018',
    '#7ad8ff'
  );

  // Cold icy-cyan predator eyes
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.96, side * r * 0.15, r * 0.085, 'rgba(65, 225, 255, 1)', '#e8fdff', side * 0.15);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 7. VILLAIN NORTHERN PIKE — Flat-Snouted Swamp Ambush Torpedo
// ---------------------------------------------------------------------------
function villain_northernpikefish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 8.2, 0.18);

  // Rounded-fork swamp tail
  ctx.save();
  ctx.translate(-r * 1.18, 0);
  ctx.rotate(wag);
  const tGrad = ctx.createLinearGradient(0, 0, -r * 0.52, 0);
  tGrad.addColorStop(0, '#1e2c1d');
  tGrad.addColorStop(0.55, '#5e1a1a');
  tGrad.addColorStop(1, '#121811');
  ctx.fillStyle = tGrad;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.1);
  ctx.quadraticCurveTo(-r * 0.34, -r * 0.36, -r * 0.52, -r * 0.34);
  ctx.lineTo(-r * 0.3, 0);
  ctx.lineTo(-r * 0.52, r * 0.34);
  ctx.quadraticCurveTo(-r * 0.34, r * 0.36, 0, r * 0.1);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Bruised crimson-edged ambush fins set far back
  for (let side of [-1, 1]) {
    ctx.fillStyle = '#471518';
    ctx.beginPath();
    ctx.moveTo(r * 0.42, side * r * 0.3);
    ctx.quadraticCurveTo(r * 0.1, side * r * 0.62, -r * 0.06, side * r * 0.32);
    ctx.closePath();
    ctx.fill();

    // Rear lunge fins
    ctx.beginPath();
    ctx.moveTo(-r * 0.52, side * r * 0.22);
    ctx.quadraticCurveTo(-r * 0.86, side * r * 0.48, -r * 0.98, side * r * 0.18);
    ctx.closePath();
    ctx.fill();
  }

  // Broad flattened duckbill snout + long muscular ambush body
  const bGrad = ctx.createLinearGradient(0, -r * 0.4, 0, r * 0.4);
  bGrad.addColorStop(0, '#0d160f');
  bGrad.addColorStop(0.32, '#223623');
  bGrad.addColorStop(0.5, '#354f30');
  bGrad.addColorStop(0.68, '#223623');
  bGrad.addColorStop(1, '#0d160f');
  ctx.fillStyle = bGrad;

  ctx.beginPath();
  ctx.moveTo(r * 1.46, -r * 0.12);
  ctx.quadraticCurveTo(r * 1.54, 0, r * 1.46, r * 0.12); // flat shovel tip
  ctx.lineTo(r * 1.0, r * 0.26);
  ctx.bezierCurveTo(r * 0.48, r * 0.4, -r * 0.25, r * 0.36, -r * 0.78, r * 0.22);
  ctx.lineTo(-r * 1.22, r * 0.1);
  ctx.lineTo(-r * 1.22, -r * 0.1);
  ctx.lineTo(-r * 0.78, -r * 0.22);
  ctx.bezierCurveTo(-r * 0.25, -r * 0.36, r * 0.48, -r * 0.4, r * 1.0, -r * 0.26);
  ctx.closePath();
  ctx.fill();

  // Sickly jade-amber bean-shaped pike flank spots
  ctx.save();
  ctx.clip();
  ctx.fillStyle = 'rgba(178, 212, 92, 0.34)';
  for (let x = -r * 0.92; x <= r * 0.72; x += r * 0.22) {
    for (let side of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(x + (side > 0 ? r * 0.08 : 0), side * r * 0.21, r * 0.08, r * 0.038, 0.15, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  ctx.strokeStyle = '#070d08';
  ctx.lineWidth = r * 0.036;
  ctx.stroke();

  // Lateral needle-fang edges on the duckbill jaw
  ctx.fillStyle = '#e5ebd8';
  for (let side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const fx = r * 1.06 + i * r * 0.095;
      const fy = side * (r * 0.22 - i * r * 0.025);
      ctx.beginPath();
      ctx.moveTo(fx - r * 0.025, fy);
      ctx.lineTo(fx + r * 0.02, fy + side * r * 0.06);
      ctx.lineTo(fx + r * 0.04, fy);
      ctx.closePath();
      ctx.fill();
    }
  }

  drawGillSlashes(ctx, r * 0.62, r * 0.2, 3, r * 0.075, r * 0.15, 0.65, '#8f1a20');

  // Glowing chartreuse-amber eyes set high on flat skull
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.92, side * r * 0.16, r * 0.09, 'rgba(205, 255, 55, 1)', '#ffffd6', side * 0.18);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 8. VILLAIN TIGER MUSKIE — Broad Apex Tiger-Striped Lance & Savage Cross-Bite
// ---------------------------------------------------------------------------
function villain_tigermuskiefish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 8.8, 0.18);

  // Sharply pointed apex caudal lobes
  ctx.save();
  ctx.translate(-r * 1.24, 0);
  ctx.rotate(wag);
  const tGrad = ctx.createLinearGradient(0, 0, -r * 0.58, 0);
  tGrad.addColorStop(0, '#2a1d14');
  tGrad.addColorStop(0.5, '#7e1818');
  tGrad.addColorStop(1, '#120806');
  ctx.fillStyle = tGrad;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.11);
  ctx.lineTo(-r * 0.58, -r * 0.46);
  ctx.lineTo(-r * 0.3, 0);
  ctx.lineTo(-r * 0.58, r * 0.46);
  ctx.lineTo(0, r * 0.11);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#b32424';
  ctx.lineWidth = r * 0.028;
  ctx.stroke();
  ctx.restore();

  // Sharp swept crimson-bronze pectorals & rear lunge fins
  for (let side of [-1, 1]) {
    ctx.fillStyle = '#5c1414';
    ctx.beginPath();
    ctx.moveTo(r * 0.44, side * r * 0.34);
    ctx.lineTo(r * 0.02, side * r * 0.68);
    ctx.lineTo(-r * 0.1, side * r * 0.34);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-r * 0.52, side * r * 0.25);
    ctx.lineTo(-r * 0.94, side * r * 0.48);
    ctx.lineTo(-r * 1.02, side * r * 0.18);
    ctx.closePath();
    ctx.fill();
  }

  // Heavier, broader muscular tiger-muskie lance body
  const bGrad = ctx.createLinearGradient(0, -r * 0.44, 0, r * 0.44);
  bGrad.addColorStop(0, '#120b08');
  bGrad.addColorStop(0.28, '#3b2818');
  bGrad.addColorStop(0.5, '#593d22');
  bGrad.addColorStop(0.72, '#3b2818');
  bGrad.addColorStop(1, '#120b08');
  ctx.fillStyle = bGrad;

  ctx.beginPath();
  ctx.moveTo(r * 1.54, 0);
  ctx.quadraticCurveTo(r * 1.38, -r * 0.2, r * 0.96, -r * 0.32);
  ctx.bezierCurveTo(r * 0.46, -r * 0.45, -r * 0.22, -r * 0.42, -r * 0.82, -r * 0.24);
  ctx.lineTo(-r * 1.26, -r * 0.11);
  ctx.lineTo(-r * 1.26, r * 0.11);
  ctx.lineTo(-r * 0.82, r * 0.24);
  ctx.bezierCurveTo(-r * 0.22, r * 0.42, r * 0.46, r * 0.45, r * 0.96, r * 0.32);
  ctx.quadraticCurveTo(r * 1.38, r * 0.2, r * 1.54, 0);
  ctx.closePath();
  ctx.fill();

  // Stark jagged obsidian & dried-blood tiger stripes
  ctx.save();
  ctx.clip();
  for (let x = -r * 1.05; x <= r * 0.78; x += r * 0.22) {
    ctx.strokeStyle = 'rgba(14, 6, 6, 0.85)';
    ctx.lineWidth = r * 0.08;
    ctx.beginPath();
    ctx.moveTo(x - r * 0.1, -r * 0.48);
    ctx.lineTo(x + r * 0.04, -r * 0.14);
    ctx.lineTo(x - r * 0.04, r * 0.14);
    ctx.lineTo(x + r * 0.08, r * 0.48);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(175, 28, 22, 0.35)';
    ctx.lineWidth = r * 0.03;
    ctx.stroke();
  }
  ctx.restore();

  ctx.strokeStyle = '#080404';
  ctx.lineWidth = r * 0.04;
  ctx.stroke();

  // Savage cross-bite fangs protruding along snout
  ctx.fillStyle = '#f8f0dc';
  for (let side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const fx = r * 1.04 + i * r * 0.11;
      const fy = side * (r * 0.25 - i * r * 0.045);
      ctx.beginPath();
      ctx.moveTo(fx - r * 0.03, fy);
      ctx.lineTo(fx + r * 0.025, fy + side * r * 0.085);
      ctx.lineTo(fx + r * 0.05, fy);
      ctx.closePath();
      ctx.fill();
    }
  }

  drawGillSlashes(ctx, r * 0.64, r * 0.22, 3, r * 0.08, r * 0.18, 0.65, '#c91c1c');

  drawJaggedSpineRidge(
    ctx,
    [
      [r * 0.5, 0],
      [0, wag * r * 0.07],
      [-r * 0.48, wag * r * 0.14],
      [-r * 0.98, wag * r * 0.2],
    ],
    r * 0.07,
    '#140806',
    '#d9411e'
  );

  // Glowing molten-orange apex eyes
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.92, side * r * 0.19, r * 0.095, 'rgba(255, 115, 20, 1)', '#fff3b8', side * 0.22);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 9. VILLAIN ALLIGATOR GAR — Armored Prehistoric Ganoid-Plated Crocodile-Snout
// ---------------------------------------------------------------------------
function villain_alligatorgarfish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 5.8, 0.15);

  // Heavy rounded prehistoric heterocercal paddle tail
  ctx.save();
  ctx.translate(-r * 1.18, 0);
  ctx.rotate(wag);
  const tGrad = ctx.createLinearGradient(0, 0, -r * 0.56, 0);
  tGrad.addColorStop(0, '#2a2e22');
  tGrad.addColorStop(0.6, '#1a1d15');
  tGrad.addColorStop(1, '#0c0e0a');
  ctx.fillStyle = tGrad;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.13);
  ctx.bezierCurveTo(-r * 0.25, -r * 0.36, -r * 0.58, -r * 0.26, -r * 0.58, 0);
  ctx.bezierCurveTo(-r * 0.58, r * 0.26, -r * 0.25, r * 0.36, 0, r * 0.13);
  ctx.closePath();
  ctx.fill();
  // Dark prehistoric blotches on tail
  ctx.fillStyle = '#080a07';
  ctx.beginPath();
  ctx.arc(-r * 0.3, -r * 0.12, r * 0.06, 0, Math.PI * 2);
  ctx.arc(-r * 0.38, r * 0.1, r * 0.055, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Stubby armored paddle fins
  for (let side of [-1, 1]) {
    ctx.fillStyle = '#24271e';
    ctx.beginPath();
    ctx.moveTo(r * 0.34, side * r * 0.34);
    ctx.quadraticCurveTo(r * 0.04, side * r * 0.62, -r * 0.12, side * r * 0.34);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-r * 0.58, side * r * 0.24);
    ctx.quadraticCurveTo(-r * 0.88, side * r * 0.44, -r * 1.0, side * r * 0.18);
    ctx.closePath();
    ctx.fill();
  }

  // Broad, armored crocodilian juggernaut body + wide flat alligator snout
  const bGrad = ctx.createLinearGradient(0, -r * 0.44, 0, r * 0.44);
  bGrad.addColorStop(0, '#11140e');
  bGrad.addColorStop(0.28, '#2d3325');
  bGrad.addColorStop(0.5, '#464d37');
  bGrad.addColorStop(0.72, '#2d3325');
  bGrad.addColorStop(1, '#11140e');
  ctx.fillStyle = bGrad;

  ctx.beginPath();
  ctx.moveTo(r * 1.66, -r * 0.13);
  ctx.quadraticCurveTo(r * 1.74, 0, r * 1.66, r * 0.13); // blunt armored gator tip
  ctx.lineTo(r * 0.92, r * 0.26);
  ctx.bezierCurveTo(r * 0.5, r * 0.42, -r * 0.28, r * 0.4, -r * 0.84, r * 0.26);
  ctx.lineTo(-r * 1.2, r * 0.13);
  ctx.lineTo(-r * 1.2, -r * 0.13);
  ctx.lineTo(-r * 0.84, -r * 0.26);
  ctx.bezierCurveTo(-r * 0.28, -r * 0.4, r * 0.5, -r * 0.42, r * 0.92, -r * 0.26);
  ctx.closePath();
  ctx.fill();

  // Overlapping diamond ganoid armor plates (medieval scale mail)
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = 'rgba(10, 12, 8, 0.72)';
  ctx.lineWidth = r * 0.028;
  for (let x = -r * 1.15; x <= r * 0.85; x += r * 0.17) {
    ctx.beginPath();
    ctx.moveTo(x - r * 0.22, -r * 0.45);
    ctx.lineTo(x + r * 0.22, r * 0.45);
    ctx.moveTo(x + r * 0.22, -r * 0.45);
    ctx.lineTo(x - r * 0.22, r * 0.45);
    ctx.stroke();
  }
  // Metallic bronze ridge highlight along spine
  ctx.strokeStyle = 'rgba(145, 138, 86, 0.35)';
  ctx.lineWidth = r * 0.06;
  ctx.beginPath();
  ctx.moveTo(r * 1.5, 0);
  ctx.lineTo(-r * 1.1, 0);
  ctx.stroke();
  ctx.restore();

  ctx.strokeStyle = '#080a06';
  ctx.lineWidth = r * 0.042;
  ctx.stroke();

  // Dual-row interlocking alligator fangs protruding along snout
  ctx.fillStyle = '#efe9d5';
  for (let side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const fx = r * 0.98 + i * r * 0.105;
      const fy = side * (r * 0.24 - i * r * 0.02);
      ctx.beginPath();
      ctx.moveTo(fx - r * 0.025, fy);
      ctx.lineTo(fx + r * 0.015, fy + side * r * 0.085);
      ctx.lineTo(fx + r * 0.04, fy);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Twin elevated gator nostrils at snout tip
  ctx.fillStyle = '#090b07';
  ctx.beginPath();
  ctx.arc(r * 1.55, -r * 0.06, r * 0.03, 0, Math.PI * 2);
  ctx.arc(r * 1.55, r * 0.06, r * 0.03, 0, Math.PI * 2);
  ctx.fill();

  // Cold amber-gold crocodilian slit eyes
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.84, side * r * 0.2, r * 0.095, 'rgba(245, 185, 35, 1)', '#fff7c2', side * 0.12);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 10. VILLAIN ELECTRIC RAY — High-Voltage Bio-Electric Disc & Plasma Arcs
// ---------------------------------------------------------------------------
function villain_electricrayfish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 6.5, 0.2);
  const pulse = 0.55 + 0.45 * Math.sin((t || 0) * 9.5);

  // Muscular ray tail stalk + spade caudal fin
  ctx.save();
  ctx.translate(-r * 0.62, 0);
  ctx.rotate(wag);
  const tailGrad = ctx.createLinearGradient(0, 0, -r * 1.05, 0);
  tailGrad.addColorStop(0, '#1a1b36');
  tailGrad.addColorStop(0.6, '#0d0e20');
  tailGrad.addColorStop(1, '#263868');
  ctx.fillStyle = tailGrad;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.16);
  ctx.lineTo(-r * 0.72, -r * 0.08);
  ctx.lineTo(-r * 1.08, -r * 0.34);
  ctx.quadraticCurveTo(-r * 1.18, 0, -r * 1.08, r * 0.34);
  ctx.lineTo(-r * 0.72, r * 0.08);
  ctx.lineTo(0, r * 0.16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#070812';
  ctx.lineWidth = r * 0.03;
  ctx.stroke();
  ctx.restore();

  // Broad flat circular-spade pectoral disc
  const discGrad = ctx.createRadialGradient(r * 0.15, 0, r * 0.1, 0, 0, r * 1.2);
  discGrad.addColorStop(0, '#2a2b52');
  discGrad.addColorStop(0.45, '#151630');
  discGrad.addColorStop(0.82, '#0c0d1f');
  discGrad.addColorStop(1, '#1d2d52');
  ctx.fillStyle = discGrad;

  ctx.beginPath();
  ctx.moveTo(r * 0.92, 0);
  ctx.bezierCurveTo(r * 0.96, -r * 0.65, r * 0.38, -r * 1.18, -r * 0.12, -r * 1.08);
  ctx.bezierCurveTo(-r * 0.56, -r * 0.98, -r * 0.78, -r * 0.5, -r * 0.68, -r * 0.16);
  ctx.lineTo(-r * 0.68, r * 0.16);
  ctx.bezierCurveTo(-r * 0.78, r * 0.5, -r * 0.56, r * 0.98, -r * 0.12, r * 1.08);
  ctx.bezierCurveTo(r * 0.38, r * 1.18, r * 0.96, r * 0.65, r * 0.92, 0);
  ctx.closePath();
  ctx.fill();

  // Twin glowing kidney-shaped bio-electric organ chambers
  for (let side of [-1, 1]) {
    const ox = r * 0.12;
    const oy = side * r * 0.52;
    const eGlow = ctx.createRadialGradient(ox, oy, r * 0.05, ox, oy, r * 0.44);
    eGlow.addColorStop(0, `rgba(95, 245, 255, ${0.42 + pulse * 0.4})`);
    eGlow.addColorStop(0.55, `rgba(110, 75, 255, ${0.28 + pulse * 0.22})`);
    eGlow.addColorStop(1, 'rgba(15, 18, 45, 0)');
    ctx.fillStyle = eGlow;
    ctx.beginPath();
    ctx.ellipse(ox, oy, r * 0.42, r * 0.28, side * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Hexagonal/vein electric cells inside organ
    ctx.strokeStyle = `rgba(140, 250, 255, ${0.45 + pulse * 0.35})`;
    ctx.lineWidth = r * 0.022;
    ctx.beginPath();
    ctx.moveTo(ox - r * 0.22, oy);
    ctx.lineTo(ox - r * 0.06, oy - side * r * 0.09);
    ctx.lineTo(ox + r * 0.08, oy + side * r * 0.08);
    ctx.lineTo(ox + r * 0.24, oy - side * r * 0.04);
    ctx.stroke();
  }

  // Disc border
  ctx.strokeStyle = '#070814';
  ctx.lineWidth = r * 0.04;
  ctx.stroke();

  // Live crackling cyan-violet lightning arcs dancing around wing perimeter
  ctx.save();
  ctx.strokeStyle = `rgba(120, 250, 255, ${0.55 + pulse * 0.4})`;
  ctx.lineWidth = r * 0.032;
  ctx.shadowColor = '#4de8ff';
  ctx.shadowBlur = r * 0.18;
  for (let side of [-1, 1]) {
    ctx.beginPath();
    const jitter = Math.sin((t || 0) * 23 + side * 2.1) * r * 0.07;
    ctx.moveTo(r * 0.72, side * r * 0.48);
    ctx.lineTo(r * 0.45, side * r * 0.92 + jitter);
    ctx.lineTo(r * 0.12, side * r * 1.12 - jitter);
    ctx.lineTo(-r * 0.22, side * r * 1.02 + jitter * 0.8);
    ctx.stroke();
  }
  ctx.restore();

  // Electric-cyan eyes + spiracles
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.46, side * r * 0.22, r * 0.088, 'rgba(65, 240, 255, 1)', '#ffffff', side * 0.15);
    ctx.fillStyle = '#060812';
    ctx.beginPath();
    ctx.ellipse(r * 0.28, side * r * 0.22, r * 0.05, r * 0.03, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 11. VILLAIN ANGLERFISH — Bulbous Abyssal Nightmare, Needle Fangs & Glowing Lure
// ---------------------------------------------------------------------------
function villain_anglerfish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 5.2, 0.2);
  const lureBob = Math.sin((t || 0) * 4.2) * r * 0.12;
  const lurePulse = 0.72 + 0.28 * Math.sin((t || 0) * 6.5);

  // Ragged tattered abyssal tail fin
  ctx.save();
  ctx.translate(-r * 0.88, 0);
  ctx.rotate(wag);
  ctx.fillStyle = '#140c1a';
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.14);
  ctx.lineTo(-r * 0.58, -r * 0.42);
  ctx.lineTo(-r * 0.42, -r * 0.16);
  ctx.lineTo(-r * 0.62, 0);
  ctx.lineTo(-r * 0.42, r * 0.16);
  ctx.lineTo(-r * 0.58, r * 0.42);
  ctx.lineTo(0, r * 0.14);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#3c254a';
  ctx.lineWidth = r * 0.025;
  ctx.stroke();
  ctx.restore();

  // Tattered stubby abyssal pectorals
  for (let side of [-1, 1]) {
    ctx.fillStyle = '#180f20';
    ctx.beginPath();
    ctx.moveTo(r * 0.05, side * r * 0.56);
    ctx.lineTo(-r * 0.28, side * r * 0.88);
    ctx.lineTo(-r * 0.34, side * r * 0.56);
    ctx.closePath();
    ctx.fill();
  }

  // Massive cavernous crescent underbite jaw jutting forward
  ctx.fillStyle = '#29050e';
  ctx.beginPath();
  ctx.moveTo(r * 0.65, -r * 0.52);
  ctx.bezierCurveTo(r * 1.18, -r * 0.4, r * 1.18, r * 0.4, r * 0.65, r * 0.52);
  ctx.closePath();
  ctx.fill();

  // Long inward-curving translucent needle fangs
  ctx.fillStyle = '#e8f5ff';
  for (let i = -4; i <= 4; i++) {
    const ang = i * 0.24;
    const bx = r * 0.72 + Math.cos(ang) * r * 0.34;
    const by = Math.sin(ang) * r * 0.48;
    const fangLen = r * (0.24 - Math.abs(i) * 0.022);
    ctx.beginPath();
    ctx.moveTo(bx - Math.sin(ang) * r * 0.028, by + Math.cos(ang) * r * 0.028);
    ctx.lineTo(bx + Math.cos(ang) * fangLen * 0.55 - r * 0.04, by * 0.72);
    ctx.lineTo(bx + Math.sin(ang) * r * 0.028, by - Math.cos(ang) * r * 0.028);
    ctx.closePath();
    ctx.fill();
  }

  // Bulbous globular obsidian-indigo abyssal body
  const bGrad = ctx.createRadialGradient(r * 0.28, 0, r * 0.1, -r * 0.05, 0, r * 1.05);
  bGrad.addColorStop(0, '#2a1d36');
  bGrad.addColorStop(0.45, '#130c1a');
  bGrad.addColorStop(0.85, '#09060d');
  bGrad.addColorStop(1, '#040207');
  ctx.fillStyle = bGrad;

  ctx.beginPath();
  ctx.moveTo(r * 0.92, 0);
  ctx.bezierCurveTo(r * 0.88, -r * 0.62, r * 0.24, -r * 0.78, -r * 0.26, -r * 0.54);
  ctx.bezierCurveTo(-r * 0.56, -r * 0.4, -r * 0.76, -r * 0.2, -r * 0.92, -r * 0.13);
  ctx.lineTo(-r * 0.92, r * 0.13);
  ctx.bezierCurveTo(-r * 0.76, r * 0.2, -r * 0.56, r * 0.4, -r * 0.26, r * 0.54);
  ctx.bezierCurveTo(r * 0.24, r * 0.78, r * 0.88, r * 0.62, r * 0.92, 0);
  ctx.closePath();
  ctx.fill();

  // Eerie cyan bounce-light cast onto the face from the lure
  const bounce = ctx.createRadialGradient(r * 1.1, lureBob * 0.4, r * 0.08, r * 0.75, 0, r * 0.75);
  bounce.addColorStop(0, `rgba(75, 240, 255, ${0.28 * lurePulse})`);
  bounce.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = bounce;
  ctx.fill();

  ctx.strokeStyle = '#040207';
  ctx.lineWidth = r * 0.045;
  ctx.stroke();

  // Tiny terrifying pinprick crimson-amber eyes
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.52, side * r * 0.34, r * 0.072, 'rgba(255, 55, 35, 1)', '#fff0b0', side * 0.25);
  }

  // Arched dorsal illicium fishing rod + pulsing bioluminescent cyan-violet esca lure
  const lx = r * 1.56;
  const ly = lureBob;
  ctx.strokeStyle = '#3b2d4d';
  ctx.lineWidth = r * 0.045;
  ctx.beginPath();
  ctx.moveTo(r * 0.2, 0);
  ctx.quadraticCurveTo(r * 0.95, ly * 0.5 - r * 0.16, lx, ly);
  ctx.stroke();

  // Bioluminescent halo
  const halo = ctx.createRadialGradient(lx, ly, r * 0.04, lx, ly, r * 0.46);
  halo.addColorStop(0, `rgba(215, 255, 255, ${lurePulse})`);
  halo.addColorStop(0.35, `rgba(60, 240, 255, ${0.75 * lurePulse})`);
  halo.addColorStop(0.7, `rgba(120, 60, 255, ${0.32 * lurePulse})`);
  halo.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(lx, ly, r * 0.46, 0, Math.PI * 2);
  ctx.fill();

  // Esca bulb core
  ctx.fillStyle = '#e8ffff';
  ctx.beginPath();
  ctx.ellipse(lx, ly, r * 0.11, r * 0.085, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 12. VILLAIN VIPERFISH — Skeletal Deep-Sea Fang-Cage & Glowing Photophores
// ---------------------------------------------------------------------------
function villain_viperfish(ctx, r, t, speed) {
  ctx.save();
  const s = typeof speed === 'number' && !Number.isNaN(speed) ? speed : 0;
  const phase = (t || 0) * (7.2 + s * 0.03);
  const tailWag = Math.sin(phase) * 0.22;

  // Whip-forked deep-sea tail
  ctx.save();
  ctx.translate(-r * 1.38, Math.sin(phase - 2.4) * r * 0.18);
  ctx.rotate(tailWag);
  ctx.fillStyle = '#121526';
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.06);
  ctx.lineTo(-r * 0.56, -r * 0.36);
  ctx.lineTo(-r * 0.26, 0);
  ctx.lineTo(-r * 0.56, r * 0.36);
  ctx.lineTo(0, r * 0.06);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Gaunt elongated deep-sea serpent body
  const bGrad = ctx.createLinearGradient(0, -r * 0.34, 0, r * 0.34);
  bGrad.addColorStop(0, '#070914');
  bGrad.addColorStop(0.35, '#1b2342');
  bGrad.addColorStop(0.5, '#323f6b');
  bGrad.addColorStop(0.65, '#1b2342');
  bGrad.addColorStop(1, '#070914');
  ctx.fillStyle = bGrad;

  const midY = Math.sin(phase - 1.2) * r * 0.09;
  const endY = Math.sin(phase - 2.4) * r * 0.18;

  ctx.beginPath();
  ctx.moveTo(r * 1.15, 0);
  ctx.bezierCurveTo(r * 0.85, -r * 0.34, r * 0.32, -r * 0.32, -r * 0.25, midY - r * 0.22);
  ctx.quadraticCurveTo(-r * 0.85, midY - r * 0.14, -r * 1.4, endY - r * 0.06);
  ctx.lineTo(-r * 1.4, endY + r * 0.06);
  ctx.quadraticCurveTo(-r * 0.85, midY + r * 0.14, -r * 0.25, midY + r * 0.22);
  ctx.bezierCurveTo(r * 0.32, r * 0.32, r * 0.85, r * 0.34, r * 1.15, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#04060d';
  ctx.lineWidth = r * 0.036;
  ctx.stroke();

  // Colossal curved translucent saber-fangs protruding OUTSIDE the closed jaw
  ctx.strokeStyle = '#d8f6ff';
  ctx.lineCap = 'round';
  for (let side of [-1, 1]) {
    // Giant front lower saber fangs curving upward/outward
    ctx.lineWidth = r * 0.048;
    ctx.beginPath();
    ctx.moveTo(r * 1.02, side * r * 0.14);
    ctx.quadraticCurveTo(r * 1.38, side * r * 0.24, r * 1.24, side * r * 0.42);
    ctx.stroke();

    // Secondary fang cage spikes
    ctx.lineWidth = r * 0.034;
    for (let f = 0; f < 3; f++) {
      const fx = r * 0.92 - f * r * 0.12;
      const fy = side * (r * 0.22 + f * r * 0.02);
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + r * 0.08, fy + side * r * 0.16);
      ctx.stroke();
    }
  }

  // Twin rows of eerie glowing cyan photophore dots running down the flanks
  const phPulse = 0.6 + 0.4 * Math.sin((t || 0) * 5.8);
  ctx.fillStyle = `rgba(90, 245, 255, ${phPulse})`;
  for (let i = 0; i < 8; i++) {
    const u = i / 7;
    const px = r * (0.45 - u * 1.65);
    const pyBase = Math.sin(phase - u * 2.4) * r * (0.04 + u * 0.14);
    const spread = r * (0.22 * (1 - u * 0.65));
    for (let side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(px, pyBase + side * spread, r * 0.032, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Long whip-like trailing first dorsal spine
  ctx.strokeStyle = 'rgba(130, 225, 255, 0.72)';
  ctx.lineWidth = r * 0.032;
  ctx.beginPath();
  ctx.moveTo(r * 0.42, 0);
  ctx.quadraticCurveTo(-r * 0.2, midY - r * 0.16, -r * 0.95, endY + r * 0.1);
  ctx.stroke();

  drawGillSlashes(ctx, r * 0.56, r * 0.17, 3, r * 0.065, r * 0.14, 0.7, '#751838');

  // Ghostly glowing cyan abyssal eyes
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.86, side * r * 0.16, r * 0.09, 'rgba(85, 245, 255, 1)', '#ffffff', side * 0.15);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 13. VILLAIN GULPER EEL — Colossal Hinged Pelican-Maw & Whip-Tail Beacon
// ---------------------------------------------------------------------------
function villain_gulpereelfish(ctx, r, t, speed) {
  ctx.save();
  const s = typeof speed === 'number' && !Number.isNaN(speed) ? speed : 0;
  const phase = (t || 0) * (5.6 + s * 0.03);
  const lurePulse = 0.65 + 0.35 * Math.sin((t || 0) * 7.5);

  // Ultra-thin sinuous whip tail tapering from -0.05r to -2.25r
  const tailPts = [];
  const segs = 16;
  for (let i = 0; i <= segs; i++) {
    const u = i / segs;
    const x = r * (-0.05 - u * 2.2);
    const y = Math.sin(phase - u * 6.0) * r * (0.05 + u * u * 0.52);
    const w = r * (0.22 * Math.pow(1 - u, 1.55) + 0.025);
    tailPts.push({ x, y, w });
  }

  ctx.fillStyle = '#0d0914';
  ctx.beginPath();
  for (let i = 0; i < tailPts.length; i++) {
    const p = tailPts[i];
    if (i === 0) ctx.moveTo(p.x, p.y - p.w);
    else ctx.lineTo(p.x, p.y - p.w);
  }
  for (let i = tailPts.length - 1; i >= 0; i--) {
    const p = tailPts[i];
    ctx.lineTo(p.x, p.y + p.w);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#291738';
  ctx.lineWidth = r * 0.025;
  ctx.stroke();

  // Glowing crimson-magenta bioluminescent tail-tip beacon
  const tip = tailPts[tailPts.length - 1];
  const tipGlow = ctx.createRadialGradient(tip.x, tip.y, r * 0.02, tip.x, tip.y, r * 0.34);
  tipGlow.addColorStop(0, `rgba(255, 175, 225, ${lurePulse})`);
  tipGlow.addColorStop(0.45, `rgba(235, 35, 115, ${0.75 * lurePulse})`);
  tipGlow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = tipGlow;
  ctx.beginPath();
  ctx.arc(tip.x, tip.y, r * 0.34, 0, Math.PI * 2);
  ctx.fill();

  // Colossal hinged pelican-pouch skull & stretched gular membrane
  const pouchGrad = ctx.createRadialGradient(r * 0.52, 0, r * 0.1, r * 0.35, 0, r * 0.95);
  pouchGrad.addColorStop(0, '#3a0a1e');
  pouchGrad.addColorStop(0.55, '#19091a');
  pouchGrad.addColorStop(1, '#08040c');
  ctx.fillStyle = pouchGrad;

  ctx.beginPath();
  ctx.moveTo(r * 1.24, 0);
  ctx.bezierCurveTo(r * 1.08, -r * 0.52, r * 0.56, -r * 0.82, r * 0.06, -r * 0.62);
  ctx.quadraticCurveTo(-r * 0.16, -r * 0.44, -r * 0.12, -r * 0.2);
  ctx.lineTo(-r * 0.12, r * 0.2);
  ctx.quadraticCurveTo(-r * 0.16, r * 0.44, r * 0.06, r * 0.62);
  ctx.bezierCurveTo(r * 0.56, r * 0.82, r * 1.08, r * 0.52, r * 1.24, 0);
  ctx.closePath();
  ctx.fill();

  // Dark crimson-veined stretched gular membrane ribs
  ctx.strokeStyle = 'rgba(155, 22, 62, 0.42)';
  ctx.lineWidth = r * 0.024;
  for (let side of [-1, 1]) {
    for (let k = 0; k < 4; k++) {
      ctx.beginPath();
      ctx.moveTo(r * (0.95 - k * 0.2), side * r * 0.08);
      ctx.quadraticCurveTo(r * (0.72 - k * 0.22), side * r * 0.42, r * (0.28 - k * 0.1), side * (r * 0.58 - k * r * 0.08));
      ctx.stroke();
    }
  }

  // Heavy skeletal black-obsidian jaw struts
  ctx.strokeStyle = '#06030a';
  ctx.lineWidth = r * 0.065;
  ctx.beginPath();
  ctx.moveTo(r * 1.22, 0);
  ctx.quadraticCurveTo(r * 0.68, -r * 0.72, r * 0.04, -r * 0.58);
  ctx.moveTo(r * 1.22, 0);
  ctx.quadraticCurveTo(r * 0.68, r * 0.72, r * 0.04, r * 0.58);
  ctx.stroke();

  // Narrow cranium ridge along center top
  ctx.fillStyle = '#120b1a';
  ctx.beginPath();
  ctx.moveTo(r * 1.22, 0);
  ctx.quadraticCurveTo(r * 0.55, -r * 0.22, -r * 0.12, -r * 0.18);
  ctx.lineTo(-r * 0.12, r * 0.18);
  ctx.quadraticCurveTo(r * 0.55, r * 0.22, r * 1.22, 0);
  ctx.closePath();
  ctx.fill();

  // Tiny eerie forward-set glowing amber-red eyes near snout tip
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.96, side * r * 0.14, r * 0.068, 'rgba(255, 75, 45, 1)', '#ffe4a8', side * 0.2);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 14. VILLAIN SAWFISH — Elongated Chainsaw Rostrum & Shark-Ray Wings
// ---------------------------------------------------------------------------
function villain_sawfish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 6.4, 0.18);

  // Sweeping shark-like heterocercal tail
  ctx.save();
  ctx.translate(-r * 1.05, 0);
  ctx.rotate(wag);
  const tGrad = ctx.createLinearGradient(0, 0, -r * 0.68, 0);
  tGrad.addColorStop(0, '#2a2b30');
  tGrad.addColorStop(1, '#101116');
  ctx.fillStyle = tGrad;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.11);
  ctx.quadraticCurveTo(-r * 0.38, -r * 0.28, -r * 0.68, -r * 0.52);
  ctx.lineTo(-r * 0.34, 0);
  ctx.lineTo(-r * 0.48, r * 0.3);
  ctx.quadraticCurveTo(-r * 0.24, r * 0.18, 0, r * 0.11);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Wide swept-back shark-ray pectoral wings + rear pelvic wings
  for (let side of [-1, 1]) {
    const wGrad = ctx.createLinearGradient(r * 0.2, 0, -r * 0.3, side * r * 1.05);
    wGrad.addColorStop(0, '#2e3038');
    wGrad.addColorStop(0.6, '#1a1c24');
    wGrad.addColorStop(1, '#0c0d12');
    ctx.fillStyle = wGrad;

    ctx.beginPath();
    ctx.moveTo(r * 0.48, side * r * 0.24);
    ctx.bezierCurveTo(r * 0.25, side * r * 0.78, -r * 0.18, side * r * 1.06, -r * 0.36, side * r * 0.88);
    ctx.quadraticCurveTo(-r * 0.26, side * r * 0.46, -r * 0.22, side * r * 0.22);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#08090d';
    ctx.lineWidth = r * 0.032;
    ctx.stroke();

    // Rear pelvic fins
    ctx.beginPath();
    ctx.moveTo(-r * 0.38, side * r * 0.18);
    ctx.lineTo(-r * 0.72, side * r * 0.44);
    ctx.lineTo(-r * 0.78, side * r * 0.14);
    ctx.closePath();
    ctx.fill();
  }

  // MASSIVE ELONGATED CHAINSAW ROSTRUM (+0.65r to +2.15r)
  const sawGrad = ctx.createLinearGradient(r * 0.65, 0, r * 2.18, 0);
  sawGrad.addColorStop(0, '#363842');
  sawGrad.addColorStop(0.5, '#22242c');
  sawGrad.addColorStop(1, '#4c4f5c');
  ctx.fillStyle = sawGrad;
  ctx.beginPath();
  ctx.moveTo(r * 0.65, -r * 0.14);
  ctx.lineTo(r * 2.12, -r * 0.065);
  ctx.quadraticCurveTo(r * 2.2, 0, r * 2.12, r * 0.065);
  ctx.lineTo(r * 0.65, r * 0.14);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#090a0f';
  ctx.lineWidth = r * 0.03;
  ctx.stroke();

  // 16 Alternating razor-sharp blood-stained ivory chainsaw teeth
  for (let side of [-1, 1]) {
    for (let i = 0; i < 8; i++) {
      const tx = r * 0.86 + i * r * 0.165;
      const baseY = side * (r * 0.125 - i * r * 0.008);
      const toothLen = r * (0.17 - i * 0.007);
      ctx.fillStyle = '#f2e8dc';
      ctx.beginPath();
      ctx.moveTo(tx - r * 0.036, baseY);
      ctx.lineTo(tx + r * 0.015, baseY + side * toothLen);
      ctx.lineTo(tx + r * 0.042, baseY);
      ctx.closePath();
      ctx.fill();

      // Dried crimson stain at base of saw tooth
      ctx.fillStyle = 'rgba(155, 16, 28, 0.7)';
      ctx.beginPath();
      ctx.arc(tx, baseY + side * r * 0.025, r * 0.026, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Flattened storm-obsidian body
  const bGrad = ctx.createLinearGradient(0, -r * 0.36, 0, r * 0.36);
  bGrad.addColorStop(0, '#101218');
  bGrad.addColorStop(0.35, '#2b2e38');
  bGrad.addColorStop(0.5, '#424654');
  bGrad.addColorStop(0.65, '#2b2e38');
  bGrad.addColorStop(1, '#101218');
  ctx.fillStyle = bGrad;
  ctx.beginPath();
  ctx.moveTo(r * 0.82, 0);
  ctx.bezierCurveTo(r * 0.62, -r * 0.32, r * 0.08, -r * 0.36, -r * 0.45, -r * 0.24);
  ctx.lineTo(-r * 1.08, -r * 0.11);
  ctx.lineTo(-r * 1.08, r * 0.11);
  ctx.lineTo(-r * 0.45, r * 0.24);
  ctx.bezierCurveTo(r * 0.08, r * 0.36, r * 0.62, r * 0.32, r * 0.82, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#07080c';
  ctx.lineWidth = r * 0.036;
  ctx.stroke();

  drawGillSlashes(ctx, r * 0.28, r * 0.19, 4, r * 0.068, r * 0.15, 0.65, '#a81424');

  // Twin dorsal ridges
  drawJaggedSpineRidge(
    ctx,
    [
      [-r * 0.1, 0],
      [-r * 0.38, wag * r * 0.08],
      [-r * 0.72, wag * r * 0.15],
      [-r * 0.98, wag * r * 0.2],
    ],
    r * 0.07,
    '#14161e',
    '#80869c'
  );

  // Fierce glowing amber-red eyes
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.56, side * r * 0.18, r * 0.082, 'rgba(255, 85, 30, 1)', '#ffeab8', side * 0.18);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 15. VILLAIN SWORDFISH — Obsidian-Blade Broadbill & Lunate Scythe Tail
// ---------------------------------------------------------------------------
function villain_swordfish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 10.2, 0.16);

  // Razor-thin lunate scythe tail
  ctx.save();
  ctx.translate(-r * 1.15, 0);
  ctx.rotate(wag);
  const tGrad = ctx.createLinearGradient(0, 0, -r * 0.62, 0);
  tGrad.addColorStop(0, '#142038');
  tGrad.addColorStop(0.55, '#091020');
  tGrad.addColorStop(1, '#2b4778');
  ctx.fillStyle = tGrad;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.07);
  ctx.bezierCurveTo(-r * 0.16, -r * 0.34, -r * 0.36, -r * 0.62, -r * 0.6, -r * 0.74);
  ctx.quadraticCurveTo(-r * 0.32, -r * 0.25, -r * 0.22, 0);
  ctx.quadraticCurveTo(-r * 0.32, r * 0.25, -r * 0.6, r * 0.74);
  ctx.bezierCurveTo(-r * 0.36, r * 0.62, -r * 0.16, r * 0.34, 0, r * 0.07);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#4ea2ff';
  ctx.lineWidth = r * 0.022;
  ctx.stroke();
  ctx.restore();

  // Long swept sickle-shaped pectoral blades
  for (let side of [-1, 1]) {
    ctx.fillStyle = '#0d1629';
    ctx.beginPath();
    ctx.moveTo(r * 0.42, side * r * 0.3);
    ctx.bezierCurveTo(r * 0.24, side * r * 0.78, -r * 0.16, side * r * 1.08, -r * 0.38, side * r * 1.06);
    ctx.quadraticCurveTo(-r * 0.14, side * r * 0.62, r * 0.06, side * r * 0.32);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#29487a';
    ctx.lineWidth = r * 0.024;
    ctx.stroke();
  }

  // ULTRA-LONG RAZOR-FLAT BROADSWORD BILL (+0.85r to +2.25r)
  const billGrad = ctx.createLinearGradient(r * 0.85, -r * 0.08, r * 2.25, r * 0.08);
  billGrad.addColorStop(0, '#101828');
  billGrad.addColorStop(0.5, '#4c658f');
  billGrad.addColorStop(1, '#c8e4ff');
  ctx.fillStyle = billGrad;
  ctx.beginPath();
  ctx.moveTo(r * 0.82, -r * 0.14);
  ctx.lineTo(r * 2.28, 0);
  ctx.lineTo(r * 0.82, r * 0.14);
  ctx.closePath();
  ctx.fill();

  // Metallic specular blade edge along center of sword
  ctx.strokeStyle = 'rgba(205, 238, 255, 0.85)';
  ctx.lineWidth = r * 0.022;
  ctx.beginPath();
  ctx.moveTo(r * 0.92, 0);
  ctx.lineTo(r * 2.24, 0);
  ctx.stroke();

  // Hydrodynamic broad-shouldered obsidian-indigo torpedo torso
  const bGrad = ctx.createLinearGradient(0, -r * 0.44, 0, r * 0.44);
  bGrad.addColorStop(0, '#070b14');
  bGrad.addColorStop(0.28, '#172642');
  bGrad.addColorStop(0.5, '#2c4470');
  bGrad.addColorStop(0.72, '#172642');
  bGrad.addColorStop(1, '#070b14');
  ctx.fillStyle = bGrad;

  ctx.beginPath();
  ctx.moveTo(r * 0.96, 0);
  ctx.bezierCurveTo(r * 0.72, -r * 0.42, r * 0.22, -r * 0.48, -r * 0.34, -r * 0.32);
  ctx.bezierCurveTo(-r * 0.72, -r * 0.22, -r * 0.98, -r * 0.1, -r * 1.18, -r * 0.07);
  ctx.lineTo(-r * 1.18, r * 0.07);
  ctx.bezierCurveTo(-r * 0.98, r * 0.1, -r * 0.72, r * 0.22, -r * 0.34, r * 0.32);
  ctx.bezierCurveTo(r * 0.22, r * 0.48, r * 0.72, r * 0.42, r * 0.96, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#050810';
  ctx.lineWidth = r * 0.038;
  ctx.stroke();

  // Crimson-accented lateral keel lines
  ctx.strokeStyle = 'rgba(215, 38, 65, 0.55)';
  ctx.lineWidth = r * 0.028;
  for (let side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(r * 0.4, side * r * 0.26);
    ctx.quadraticCurveTo(-r * 0.35, side * r * 0.22, -r * 1.06, side * r * 0.06);
    ctx.stroke();
  }

  drawGillSlashes(ctx, r * 0.52, r * 0.22, 3, r * 0.07, r * 0.16, 0.7, '#c41835');

  // Swept crescent dorsal sail ridge
  drawJaggedSpineRidge(
    ctx,
    [
      [r * 0.42, 0],
      [r * 0.12, wag * r * 0.05],
      [-r * 0.22, wag * r * 0.1],
      [-r * 0.65, wag * r * 0.16],
    ],
    r * 0.075,
    '#0a1224',
    '#60c6ff'
  );

  // Fierce icy-cyan predator eyes
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.66, side * r * 0.22, r * 0.095, 'rgba(65, 225, 255, 1)', '#ffffff', side * 0.18);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 16. VILLAIN THRESHER SHARK — Colossal Cracking Scythe Whip-Tail & Pelagic Wings
// ---------------------------------------------------------------------------
function villain_threshersharkfish(ctx, r, t, speed) {
  ctx.save();
  const s = typeof speed === 'number' && !Number.isNaN(speed) ? speed : 0;
  const phase = (t || 0) * (7.2 + s * 0.032);
  const whip1 = Math.sin(phase) * r * 0.32;
  const whip2 = Math.sin(phase - 1.4) * r * 0.58;

  // SIGNATURE NIGHTMARE WEAPON: Extraordinarily long curved scythe upper caudal tail (-0.82r to -2.55r)
  ctx.save();
  const whipGrad = ctx.createLinearGradient(-r * 0.8, 0, -r * 2.55, whip2);
  whipGrad.addColorStop(0, '#222b40');
  whipGrad.addColorStop(0.55, '#131929');
  whipGrad.addColorStop(1, '#4c628a');
  ctx.fillStyle = whipGrad;
  ctx.beginPath();
  ctx.moveTo(-r * 0.82, -r * 0.1);
  ctx.bezierCurveTo(-r * 1.38, whip1 - r * 0.24, -r * 1.98, whip2 - r * 0.32, -r * 2.56, whip2 - r * 0.12);
  ctx.bezierCurveTo(-r * 2.02, whip2 - r * 0.04, -r * 1.42, whip1 + r * 0.06, -r * 0.98, r * 0.06);
  // Short sharp lower caudal lobe
  ctx.lineTo(-r * 1.24, r * 0.36);
  ctx.quadraticCurveTo(-r * 0.98, r * 0.22, -r * 0.82, r * 0.1);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#070a12';
  ctx.lineWidth = r * 0.032;
  ctx.stroke();
  ctx.restore();

  // Huge swept-back wing-like pelagic shark pectorals
  for (let side of [-1, 1]) {
    const pGrad = ctx.createLinearGradient(r * 0.35, 0, -r * 0.25, side * r * 1.12);
    pGrad.addColorStop(0, '#232c42');
    pGrad.addColorStop(0.65, '#131826');
    pGrad.addColorStop(1, '#080b12');
    ctx.fillStyle = pGrad;
    ctx.beginPath();
    ctx.moveTo(r * 0.44, side * r * 0.28);
    ctx.bezierCurveTo(r * 0.22, side * r * 0.82, -r * 0.14, side * r * 1.14, -r * 0.36, side * r * 1.06);
    ctx.quadraticCurveTo(-r * 0.18, side * r * 0.56, -r * 0.08, side * r * 0.28);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#06080f';
    ctx.lineWidth = r * 0.032;
    ctx.stroke();
  }

  // Compact bullet-shaped muscular shark torso
  const bGrad = ctx.createLinearGradient(0, -r * 0.44, 0, r * 0.44);
  bGrad.addColorStop(0, '#0a0e18');
  bGrad.addColorStop(0.3, '#1e283d');
  bGrad.addColorStop(0.5, '#344466');
  bGrad.addColorStop(0.7, '#1e283d');
  bGrad.addColorStop(1, '#0a0e18');
  ctx.fillStyle = bGrad;

  ctx.beginPath();
  ctx.moveTo(r * 1.18, 0);
  ctx.bezierCurveTo(r * 0.94, -r * 0.36, r * 0.38, -r * 0.46, -r * 0.18, -r * 0.34);
  ctx.bezierCurveTo(-r * 0.54, -r * 0.26, -r * 0.72, -r * 0.14, -r * 0.86, -r * 0.1);
  ctx.lineTo(-r * 0.86, r * 0.1);
  ctx.bezierCurveTo(-r * 0.72, r * 0.14, -r * 0.54, r * 0.26, -r * 0.18, r * 0.34);
  ctx.bezierCurveTo(r * 0.38, r * 0.46, r * 0.94, r * 0.36, r * 1.18, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#06080e';
  ctx.lineWidth = r * 0.038;
  ctx.stroke();

  // Five deep crimson shark gill slashes
  drawGillSlashes(ctx, r * 0.54, r * 0.22, 5, r * 0.052, r * 0.15, 0.6, '#c4122b');

  // Swept dorsal fin crest
  drawJaggedSpineRidge(
    ctx,
    [
      [r * 0.18, 0],
      [-r * 0.14, whip1 * 0.1],
      [-r * 0.48, whip1 * 0.2],
    ],
    r * 0.085,
    '#0d1220',
    '#4c6696'
  );

  // Large unblinking sinister glowing amber-crimson eyes
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.82, side * r * 0.2, r * 0.105, 'rgba(255, 68, 28, 1)', '#fff0b3', side * 0.15);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 17. VILLAIN HAMMERHEAD SHARK — Wide Scalloped Cephalofoil & Outer-Tip Eyes
// ---------------------------------------------------------------------------
function villain_hammerheadsharkfish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 7.6, 0.19);

  // Asymmetric sickle shark tail
  ctx.save();
  ctx.translate(-r * 1.14, 0);
  ctx.rotate(wag);
  const tGrad = ctx.createLinearGradient(0, 0, -r * 0.65, 0);
  tGrad.addColorStop(0, '#262936');
  tGrad.addColorStop(1, '#0e1018');
  ctx.fillStyle = tGrad;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.09);
  ctx.quadraticCurveTo(-r * 0.36, -r * 0.34, -r * 0.68, -r * 0.62);
  ctx.lineTo(-r * 0.3, 0);
  ctx.lineTo(-r * 0.46, r * 0.38);
  ctx.quadraticCurveTo(-r * 0.22, r * 0.2, 0, r * 0.09);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#06070c';
  ctx.lineWidth = r * 0.032;
  ctx.stroke();
  ctx.restore();

  // Swept-back triangular shark pectoral wings + pelvic fins
  for (let side of [-1, 1]) {
    ctx.fillStyle = '#1b1e29';
    ctx.beginPath();
    ctx.moveTo(r * 0.46, side * r * 0.24);
    ctx.lineTo(-r * 0.12, side * r * 1.08);
    ctx.lineTo(-r * 0.3, side * r * 0.94);
    ctx.lineTo(-r * 0.08, side * r * 0.26);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#08090f';
    ctx.lineWidth = r * 0.032;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-r * 0.42, side * r * 0.17);
    ctx.lineTo(-r * 0.72, side * r * 0.42);
    ctx.lineTo(-r * 0.78, side * r * 0.14);
    ctx.closePath();
    ctx.fill();
  }

  // Sleek muscular shark torso
  const bGrad = ctx.createLinearGradient(0, -r * 0.38, 0, r * 0.38);
  bGrad.addColorStop(0, '#0d0f17');
  bGrad.addColorStop(0.32, '#252938');
  bGrad.addColorStop(0.5, '#3b4157');
  bGrad.addColorStop(0.68, '#252938');
  bGrad.addColorStop(1, '#0d0f17');
  ctx.fillStyle = bGrad;

  ctx.beginPath();
  ctx.moveTo(r * 0.96, -r * 0.2);
  ctx.lineTo(r * 0.56, -r * 0.32);
  ctx.bezierCurveTo(r * 0.06, -r * 0.38, -r * 0.54, -r * 0.26, -r * 1.16, -r * 0.09);
  ctx.lineTo(-r * 1.16, r * 0.09);
  ctx.bezierCurveTo(-r * 0.54, r * 0.26, r * 0.06, r * 0.38, r * 0.56, r * 0.32);
  ctx.lineTo(r * 0.96, r * 0.2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#07080e';
  ctx.lineWidth = r * 0.036;
  ctx.stroke();

  // UNMISTAKABLE WIDE T-SHAPED SCALLOPED CEPHALOFOIL HAMMER HEAD
  const hGrad = ctx.createLinearGradient(r * 0.76, 0, r * 1.24, 0);
  hGrad.addColorStop(0, '#1e2230');
  hGrad.addColorStop(0.5, '#3c4359');
  hGrad.addColorStop(1, '#191c28');
  ctx.fillStyle = hGrad;

  ctx.beginPath();
  ctx.moveTo(r * 1.18, 0);
  // Scalloped front edge upper lobe
  ctx.quadraticCurveTo(r * 1.24, -r * 0.26, r * 1.14, -r * 0.48);
  ctx.quadraticCurveTo(r * 1.18, -r * 0.78, r * 1.0, -r * 0.98);
  ctx.lineTo(r * 0.76, -r * 0.94);
  ctx.quadraticCurveTo(r * 0.76, -r * 0.52, r * 0.72, -r * 0.22);
  ctx.lineTo(r * 0.72, r * 0.22);
  ctx.quadraticCurveTo(r * 0.76, r * 0.52, r * 0.76, r * 0.94);
  ctx.lineTo(r * 1.0, r * 0.98);
  ctx.quadraticCurveTo(r * 1.18, r * 0.78, r * 1.14, r * 0.48);
  ctx.quadraticCurveTo(r * 1.24, r * 0.26, r * 1.18, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#06070c';
  ctx.lineWidth = r * 0.04;
  ctx.stroke();

  // Battle scars across cephalofoil
  ctx.strokeStyle = 'rgba(185, 28, 48, 0.5)';
  ctx.lineWidth = r * 0.026;
  ctx.beginPath();
  ctx.moveTo(r * 1.08, -r * 0.35);
  ctx.lineTo(r * 0.88, -r * 0.14);
  ctx.moveTo(r * 1.02, r * 0.55);
  ctx.lineTo(r * 0.84, r * 0.38);
  ctx.stroke();

  // Five razor crimson gill slashes
  drawGillSlashes(ctx, r * 0.56, r * 0.18, 5, r * 0.052, r * 0.14, 0.65, '#c4142b');

  // Tall sharp dorsal ridge
  drawJaggedSpineRidge(
    ctx,
    [
      [r * 0.22, 0],
      [-r * 0.18, wag * r * 0.08],
      [-r * 0.62, wag * r * 0.16],
    ],
    r * 0.085,
    '#0e1019',
    '#67708f'
  );

  // Sinister glowing crimson-amber eyes mounted on EXTREME OUTER TIPS of hammer
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.92, side * r * 0.92, r * 0.095, 'rgba(255, 58, 32, 1)', '#fff0b8', side * 0.15);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// 18. VILLAIN GREAT WHITE SHARK — Massive Barrel-Chested Apex Obsidian Juggernaut
// ---------------------------------------------------------------------------
function villain_greatwhitesharkfish(ctx, r, t, speed) {
  ctx.save();
  const wag = getSwimPhase(t, speed, 6.8, 0.17);

  // Powerful symmetrical crescent-lunate apex tail
  ctx.save();
  ctx.translate(-r * 1.16, 0);
  ctx.rotate(wag);
  const tGrad = ctx.createLinearGradient(0, 0, -r * 0.68, 0);
  tGrad.addColorStop(0, '#2a2e38');
  tGrad.addColorStop(0.55, '#14171f');
  tGrad.addColorStop(1, '#3c4252');
  ctx.fillStyle = tGrad;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.12);
  ctx.bezierCurveTo(-r * 0.2, -r * 0.42, -r * 0.44, -r * 0.68, -r * 0.68, -r * 0.78);
  ctx.quadraticCurveTo(-r * 0.36, -r * 0.24, -r * 0.24, 0);
  ctx.quadraticCurveTo(-r * 0.36, r * 0.24, -r * 0.68, r * 0.78);
  ctx.bezierCurveTo(-r * 0.44, r * 0.68, -r * 0.2, r * 0.42, 0, r * 0.12);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#07080d';
  ctx.lineWidth = r * 0.036;
  ctx.stroke();
  ctx.restore();

  // Enormous swept triangular pectoral wings with dark-tipped edges
  for (let side of [-1, 1]) {
    const pGrad = ctx.createLinearGradient(r * 0.45, 0, -r * 0.3, side * r * 1.24);
    pGrad.addColorStop(0, '#2d323d');
    pGrad.addColorStop(0.65, '#191c24');
    pGrad.addColorStop(1, '#08090e');
    ctx.fillStyle = pGrad;
    ctx.beginPath();
    ctx.moveTo(r * 0.56, side * r * 0.34);
    ctx.bezierCurveTo(r * 0.28, side * r * 0.88, -r * 0.08, side * r * 1.26, -r * 0.34, side * r * 1.18);
    ctx.quadraticCurveTo(-r * 0.18, side * r * 0.68, -r * 0.06, side * r * 0.38);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#06070b';
    ctx.lineWidth = r * 0.036;
    ctx.stroke();

    // Muscular pelvic fins
    ctx.fillStyle = '#1d2029';
    ctx.beginPath();
    ctx.moveTo(-r * 0.38, side * r * 0.24);
    ctx.lineTo(-r * 0.74, side * r * 0.52);
    ctx.lineTo(-r * 0.82, side * r * 0.18);
    ctx.closePath();
    ctx.fill();
  }

  // Massive, broad, barrel-chested conical-snouted apex torso
  const bGrad = ctx.createLinearGradient(0, -r * 0.58, 0, r * 0.58);
  bGrad.addColorStop(0, '#4e5566'); // ash-slate countershaded flank rim
  bGrad.addColorStop(0.16, '#14171f');
  bGrad.addColorStop(0.36, '#292e3b');
  bGrad.addColorStop(0.5, '#3b4254');
  bGrad.addColorStop(0.64, '#292e3b');
  bGrad.addColorStop(0.84, '#14171f');
  bGrad.addColorStop(1, '#4e5566');
  ctx.fillStyle = bGrad;

  ctx.beginPath();
  ctx.moveTo(r * 1.48, 0);
  ctx.bezierCurveTo(r * 1.2, -r * 0.38, r * 0.68, -r * 0.58, r * 0.05, -r * 0.54);
  ctx.bezierCurveTo(-r * 0.48, -r * 0.5, -r * 0.88, -r * 0.24, -r * 1.2, -r * 0.12);
  ctx.lineTo(-r * 1.2, r * 0.12);
  ctx.bezierCurveTo(-r * 0.88, r * 0.24, -r * 0.48, r * 0.5, r * 0.05, r * 0.54);
  ctx.bezierCurveTo(r * 0.68, r * 0.58, r * 1.2, r * 0.38, r * 1.48, 0);
  ctx.closePath();
  ctx.fill();

  // Battle scars & jagged countershading notches clipped to torso
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = 'rgba(195, 22, 42, 0.58)';
  ctx.lineWidth = r * 0.032;
  ctx.lineCap = 'round';
  const scars = [
    [r * 0.92, -r * 0.18, r * 0.66, -r * 0.04],
    [r * 0.85, -r * 0.24, r * 0.62, -r * 0.12],
    [r * 0.22, r * 0.28, -r * 0.06, r * 0.16],
    [-r * 0.28, -r * 0.22, -r * 0.54, -r * 0.1],
  ];
  for (const [x1, y1, x2, y2] of scars) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.restore();

  ctx.strokeStyle = '#06070b';
  ctx.lineWidth = r * 0.044;
  ctx.stroke();

  // Five huge bloody apex gill slashes
  drawGillSlashes(ctx, r * 0.64, r * 0.28, 5, r * 0.062, r * 0.22, 0.62, '#d4122b');

  // Towering dorsal fin crest + caudal keel
  ctx.save();
  ctx.fillStyle = '#0c0e15';
  ctx.beginPath();
  ctx.moveTo(r * 0.34, 0);
  ctx.lineTo(-r * 0.22, -r * 0.09 + wag * r * 0.12);
  ctx.lineTo(-r * 0.38, wag * r * 0.15);
  ctx.lineTo(-r * 0.22, r * 0.09 + wag * r * 0.12);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#556078';
  ctx.lineWidth = r * 0.025;
  ctx.stroke();
  ctx.restore();

  // Snout sensory ampullae pits + protruding serrated tooth glints along jaw line
  ctx.fillStyle = '#080a10';
  for (let side of [-1, 1]) {
    ctx.beginPath();
    ctx.arc(r * 1.28, side * r * 0.07, r * 0.022, 0, Math.PI * 2);
    ctx.arc(r * 1.18, side * r * 0.12, r * 0.022, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cold glowing hellfire-crimson/amber eyes with heavy dark orbital pits
  for (let side of [-1, 1]) {
    drawSinisterEye(ctx, r * 0.98, side * r * 0.25, r * 0.105, 'rgba(255, 38, 28, 1)', '#ffdf9e', side * 0.22);
  }

  ctx.restore();
}

module.exports = {
  villain_piranhafish,
  villain_scorpionfish,
  villain_lionfish,
  villain_stonefish,
  villain_morayeelfish,
  villain_barracudafish,
  villain_northernpikefish,
  villain_tigermuskiefish,
  villain_alligatorgarfish,
  villain_electricrayfish,
  villain_anglerfish,
  villain_viperfish,
  villain_gulpereelfish,
  villain_sawfish,
  villain_swordfish,
  villain_threshersharkfish,
  villain_hammerheadsharkfish,
  villain_greatwhitesharkfish,
};

  return module.exports;
})();

const PAINTED_FLORAS = (() => {
  const module = { exports: {} };
  const exports = module.exports;
'use strict';

/**
 * Handcrafted Top-Down 2D Canvas Flora Illustrations for Fish Kingdom.
 *
 * Coordinate contract:
 * - `ctx` is pre-translated to (0, 0) and rotated.
 * - `r` is the base radius (~64px).
 * - `t` is time in seconds (defaults to 0) for subtle organic sway.
 * - Every flora is uniquely handcrafted with lush gradients, organic curves,
 *   translucency, and zero shared templates.
 */

module.exports = {
  /**
   * 1. Water Lily: Notched emerald lily pad + multi-tiered pink lotus blossom + glistening dewdrops.
   */
  waterlilyflora(ctx, r, t = 0) {
    ctx.save();
    const sway = Math.sin(t * 1.4) * 0.025;
    ctx.rotate(sway);

    const padR = r * 0.96;
    const notchAngle = 0.42; // V-notch center angle
    const notchSpread = 0.24;

    // Soft underwater drop shadow
    ctx.save();
    ctx.translate(r * 0.07, r * 0.09);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    const steps = 64;
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      const a = notchAngle + notchSpread + frac * (Math.PI * 2 - notchSpread * 2);
      const wobble = 1 + Math.sin(a * 5) * 0.018 + Math.cos(a * 9) * 0.01;
      const px = Math.cos(a) * padR * wobble;
      const py = Math.sin(a) * padR * wobble;
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(6, 28, 22, 0.34)';
    ctx.fill();
    ctx.restore();

    // Main notched emerald lily pad
    ctx.beginPath();
    ctx.moveTo(Math.cos(notchAngle) * r * 0.06, Math.sin(notchAngle) * r * 0.06);
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      const a = notchAngle + notchSpread + frac * (Math.PI * 2 - notchSpread * 2);
      const wobble = 1 + Math.sin(a * 5) * 0.018 + Math.cos(a * 9) * 0.01;
      const px = Math.cos(a) * padR * wobble;
      const py = Math.sin(a) * padR * wobble;
      ctx.lineTo(px, py);
    }
    ctx.closePath();

    const padGrad = ctx.createRadialGradient(-r * 0.18, -r * 0.16, r * 0.05, 0, 0, padR * 1.05);
    padGrad.addColorStop(0, '#6ed16c');
    padGrad.addColorStop(0.38, '#2ea45c');
    padGrad.addColorStop(0.78, '#1a7547');
    padGrad.addColorStop(0.95, '#125335');
    padGrad.addColorStop(1, '#3b4a26');
    ctx.fillStyle = padGrad;
    ctx.fill();

    // Subtle sunlit rim edge
    ctx.lineWidth = Math.max(1.2, r * 0.024);
    ctx.strokeStyle = 'rgba(162, 232, 134, 0.45)';
    ctx.stroke();

    // Radiating palmate leaf veins with forked tips
    ctx.save();
    ctx.lineCap = 'round';
    const veinCount = 13;
    for (let i = 0; i < veinCount; i++) {
      const a = notchAngle + notchSpread + 0.18 + (i / (veinCount - 1)) * (Math.PI * 2 - notchSpread * 2 - 0.36);
      const len = padR * (0.86 + Math.sin(a * 5) * 0.015);
      const midX = Math.cos(a + 0.04) * len * 0.55;
      const midY = Math.sin(a + 0.04) * len * 0.55;
      const endX = Math.cos(a) * len;
      const endY = Math.sin(a) * len;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(midX, midY, endX, endY);
      ctx.strokeStyle = 'rgba(176, 240, 148, 0.28)';
      ctx.lineWidth = Math.max(0.8, r * 0.018);
      ctx.stroke();

      // Delicate Y-fork near outer margin
      const forkStartX = Math.cos(a + 0.015) * len * 0.68;
      const forkStartY = Math.sin(a + 0.015) * len * 0.68;
      for (const side of [-1, 1]) {
        const fa = a + side * 0.11;
        ctx.beginPath();
        ctx.moveTo(forkStartX, forkStartY);
        ctx.lineTo(Math.cos(fa) * len * 0.94, Math.sin(fa) * len * 0.94);
        ctx.strokeStyle = 'rgba(165, 234, 142, 0.18)';
        ctx.lineWidth = Math.max(0.6, r * 0.011);
        ctx.stroke();
      }
    }
    ctx.restore();

    // Glistening dewdrops resting on the pad
    const dewdrops = [
      { x: -r * 0.48, y: -r * 0.36, rad: r * 0.062 },
      { x: -r * 0.34, y: -r * 0.52, rad: r * 0.036 },
      { x: r * 0.32, y: -r * 0.44, rad: r * 0.048 },
      { x: -r * 0.52, y: r * 0.28, rad: r * 0.044 },
    ];
    for (const d of dewdrops) {
      ctx.save();
      ctx.translate(d.x, d.y);
      // Drop shadow
      ctx.beginPath();
      ctx.ellipse(d.rad * 0.28, d.rad * 0.34, d.rad * 1.05, d.rad * 0.88, 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(8, 38, 22, 0.32)';
      ctx.fill();
      // Translucent water bead
      const dg = ctx.createRadialGradient(-d.rad * 0.3, -d.rad * 0.3, d.rad * 0.05, 0, 0, d.rad);
      dg.addColorStop(0, 'rgba(255, 255, 255, 0.88)');
      dg.addColorStop(0.35, 'rgba(210, 252, 235, 0.48)');
      dg.addColorStop(0.8, 'rgba(92, 198, 152, 0.36)');
      dg.addColorStop(1, 'rgba(220, 255, 240, 0.72)');
      ctx.beginPath();
      ctx.arc(0, 0, d.rad, 0, Math.PI * 2);
      ctx.fillStyle = dg;
      ctx.fill();
      // Crisp specular pinpoint
      ctx.beginPath();
      ctx.arc(-d.rad * 0.32, -d.rad * 0.32, d.rad * 0.26, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fill();
      ctx.restore();
    }

    // Multi-tiered pink lotus blossom (slightly off-center)
    ctx.save();
    ctx.translate(r * 0.06, -r * 0.05);
    const bloomBreath = 1 + Math.sin(t * 1.8) * 0.025;
    ctx.scale(bloomBreath, bloomBreath);

    // Blossom cast shadow onto lily pad
    ctx.beginPath();
    ctx.arc(r * 0.05, r * 0.06, r * 0.48, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10, 40, 24, 0.32)';
    ctx.fill();

    const tiers = [
      { count: 10, len: r * 0.48, wid: r * 0.16, rot: 0.1, cBase: '#c8346c', cMid: '#f279a5', cTip: '#ffd2e4' },
      { count: 8, len: r * 0.38, wid: r * 0.135, rot: 0.42, cBase: '#de4d83', cMid: '#ff9cc0', cTip: '#ffe6f0' },
      { count: 7, len: r * 0.27, wid: r * 0.105, rot: 0.75, cBase: '#f47ca6', cMid: '#ffc1d8', cTip: '#fff4f8' },
    ];

    for (const tier of tiers) {
      for (let i = 0; i < tier.count; i++) {
        const a = tier.rot + (i / tier.count) * Math.PI * 2;
        ctx.save();
        ctx.rotate(a);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          tier.len * 0.28, -tier.wid,
          tier.len * 0.78, -tier.wid * 0.72,
          tier.len, 0
        );
        ctx.bezierCurveTo(
          tier.len * 0.78, tier.wid * 0.72,
          tier.len * 0.28, tier.wid,
          0, 0
        );
        ctx.closePath();

        const pg = ctx.createLinearGradient(0, 0, tier.len, 0);
        pg.addColorStop(0, tier.cBase);
        pg.addColorStop(0.58, tier.cMid);
        pg.addColorStop(1, tier.cTip);
        ctx.fillStyle = pg;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 245, 250, 0.42)';
        ctx.lineWidth = Math.max(0.6, r * 0.01);
        ctx.stroke();

        // Delicate central petal vein
        ctx.beginPath();
        ctx.moveTo(tier.len * 0.12, 0);
        ctx.lineTo(tier.len * 0.82, 0);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = Math.max(0.5, r * 0.008);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Golden stamen crown
    const coreGrad = ctx.createRadialGradient(-r * 0.02, -r * 0.02, r * 0.01, 0, 0, r * 0.14);
    coreGrad.addColorStop(0, '#fff4a8');
    coreGrad.addColorStop(0.55, '#f6b93b');
    coreGrad.addColorStop(1, '#c97812');
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.13, 0, Math.PI * 2);
    ctx.fillStyle = coreGrad;
    ctx.fill();

    // Radiating golden anther tips
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const sx = Math.cos(a) * r * 0.155;
      const sy = Math.sin(a) * r * 0.155;
      ctx.beginPath();
      ctx.arc(sx, sy, r * 0.022, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? '#ffe77a' : '#ffbe3d';
      ctx.fill();
    }

    ctx.restore();
    ctx.restore();
  },

  /**
   * 2. Amazon Platter: Giant ribbed Victoria amazonica platter pad with upturned rim + white lotus.
   */
  amazonplatterflora(ctx, r, t = 0) {
    ctx.save();
    const drift = Math.sin(t * 0.9) * 0.015;
    ctx.rotate(drift);

    const outerR = r * 1.04;
    const innerR = r * 0.91;

    // Underwater cast shadow
    ctx.beginPath();
    ctx.arc(r * 0.06, r * 0.08, outerR * 1.01, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(8, 26, 20, 0.36)';
    ctx.fill();

    // Upturned reddish-burgundy outer wall of Victoria amazonica
    const rimGrad = ctx.createRadialGradient(-r * 0.15, -r * 0.15, innerR * 0.85, 0, 0, outerR);
    rimGrad.addColorStop(0, '#5d2b2e');
    rimGrad.addColorStop(0.65, '#8c3b3c');
    rimGrad.addColorStop(0.92, '#b05548');
    rimGrad.addColorStop(1, '#592324');
    ctx.beginPath();
    ctx.arc(0, 0, outerR, 0, Math.PI * 2);
    ctx.fillStyle = rimGrad;
    ctx.fill();

    // Inner bright chartreuse lip highlight
    ctx.beginPath();
    ctx.arc(0, 0, innerR * 1.045, 0, Math.PI * 2);
    ctx.fillStyle = '#92cf67';
    ctx.fill();

    // Platter floor
    const floorGrad = ctx.createRadialGradient(-r * 0.18, -r * 0.2, r * 0.08, 0, 0, innerR);
    floorGrad.addColorStop(0, '#78c962');
    floorGrad.addColorStop(0.45, '#3b9b51');
    floorGrad.addColorStop(0.85, '#22723e');
    floorGrad.addColorStop(1, '#1a5631');
    ctx.beginPath();
    ctx.arc(0, 0, innerR, 0, Math.PI * 2);
    ctx.fillStyle = floorGrad;
    ctx.fill();

    // Iconic Victoria amazonica quilted cross-veins (concentric polygons)
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, innerR, 0, Math.PI * 2);
    ctx.clip();

    const ribCount = 16;
    const rings = [0.24, 0.44, 0.64, 0.82];
    for (const frac of rings) {
      ctx.beginPath();
      for (let i = 0; i <= ribCount; i++) {
        const a = (i / ribCount) * Math.PI * 2;
        const rr = innerR * frac;
        const px = Math.cos(a) * rr;
        const py = Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(182, 238, 132, 0.24)';
      ctx.lineWidth = Math.max(0.8, r * 0.015);
      ctx.stroke();
    }

    // 16 raised structural radial ribs
    for (let i = 0; i < ribCount; i++) {
      const a = (i / ribCount) * Math.PI * 2;
      // Dark rib shadow
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a + 0.02) * innerR, Math.sin(a + 0.02) * innerR);
      ctx.strokeStyle = 'rgba(14, 58, 30, 0.35)';
      ctx.lineWidth = Math.max(1.4, r * 0.032);
      ctx.stroke();

      // Sunlit raised rib crest
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * innerR, Math.sin(a) * innerR);
      ctx.strokeStyle = 'rgba(184, 240, 134, 0.55)';
      ctx.lineWidth = Math.max(1.0, r * 0.02);
      ctx.stroke();
    }

    // Subtle interior shadow cast by the upturned rim
    const rimShadow = ctx.createRadialGradient(0, 0, innerR * 0.78, 0, 0, innerR);
    rimShadow.addColorStop(0, 'rgba(0,0,0,0)');
    rimShadow.addColorStop(1, 'rgba(12, 42, 22, 0.38)');
    ctx.fillStyle = rimShadow;
    ctx.fillRect(-innerR, -innerR, innerR * 2, innerR * 2);
    ctx.restore();

    // Two characteristic rainwater drainage notches on opposite edges of the rim
    for (const na of [0.35, Math.PI + 0.35]) {
      ctx.save();
      ctx.rotate(na);
      ctx.beginPath();
      ctx.moveTo(innerR * 0.96, -r * 0.055);
      ctx.lineTo(outerR * 1.02, -r * 0.025);
      ctx.lineTo(outerR * 1.02, r * 0.025);
      ctx.lineTo(innerR * 0.96, r * 0.055);
      ctx.closePath();
      ctx.fillStyle = '#2d7a44';
      ctx.fill();
      ctx.restore();
    }

    // Regal white night-blooming lotus nestled off-center
    ctx.save();
    ctx.translate(-r * 0.22, -r * 0.16);
    const pulse = 1 + Math.sin(t * 1.5) * 0.02;
    ctx.scale(pulse, pulse);

    ctx.beginPath();
    ctx.arc(r * 0.04, r * 0.05, r * 0.38, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(12, 44, 24, 0.3)';
    ctx.fill();

    const whiteTiers = [
      { count: 12, len: r * 0.38, wid: r * 0.11, rot: 0, base: '#e4d5dc', mid: '#f8f5f2', tip: '#ffffff' },
      { count: 10, len: r * 0.30, wid: r * 0.09, rot: 0.28, base: '#f3d8e2', mid: '#fffaf7', tip: '#ffffff' },
      { count: 8, len: r * 0.21, wid: r * 0.075, rot: 0.55, base: '#ffe7c2', mid: '#fffdf8', tip: '#ffffff' },
    ];
    for (const tier of whiteTiers) {
      for (let i = 0; i < tier.count; i++) {
        const a = tier.rot + (i / tier.count) * Math.PI * 2;
        ctx.save();
        ctx.rotate(a);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(tier.len * 0.3, -tier.wid, tier.len * 0.76, -tier.wid * 0.65, tier.len, 0);
        ctx.bezierCurveTo(tier.len * 0.76, tier.wid * 0.65, tier.len * 0.3, tier.wid, 0, 0);
        ctx.closePath();
        const pg = ctx.createLinearGradient(0, 0, tier.len, 0);
        pg.addColorStop(0, tier.base);
        pg.addColorStop(0.55, tier.mid);
        pg.addColorStop(1, tier.tip);
        ctx.fillStyle = pg;
        ctx.fill();
        ctx.strokeStyle = 'rgba(198, 215, 200, 0.45)';
        ctx.lineWidth = Math.max(0.5, r * 0.008);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Creamy-gold center
    const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.1);
    cg.addColorStop(0, '#fff7be');
    cg.addColorStop(0.65, '#f2c85b');
    cg.addColorStop(1, '#d6972a');
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.095, 0, Math.PI * 2);
    ctx.fillStyle = cg;
    ctx.fill();

    ctx.restore();
    ctx.restore();
  },

  /**
   * 3. Duckweed: Cozy cluster of 14 overlapping tiny bright-green floating duckweed leaves.
   */
  duckweedflora(ctx, r, t = 0) {
    ctx.save();

    // 14 deterministic tiny floating leaves grouped in cozy surface-tension clusters
    const leaves = [
      { x: -0.44, y: -0.34, rx: 0.21, ry: 0.16, rot: -0.4, shade: 0 },
      { x: -0.22, y: -0.46, rx: 0.18, ry: 0.14, rot: 0.5, shade: 1 },
      { x: -0.14, y: -0.22, rx: 0.23, ry: 0.17, rot: 0.2, shade: 2 },
      { x: 0.18, y: -0.42, rx: 0.19, ry: 0.145, rot: -0.7, shade: 1 },
      { x: 0.38, y: -0.24, rx: 0.22, ry: 0.165, rot: 0.9, shade: 0 },
      { x: 0.12, y: -0.06, rx: 0.24, ry: 0.18, rot: -0.25, shade: 2 },
      { x: -0.48, y: 0.04, rx: 0.20, ry: 0.15, rot: 1.1, shade: 1 },
      { x: -0.24, y: 0.12, rx: 0.23, ry: 0.17, rot: -0.6, shade: 0 },
      { x: 0.44, y: 0.08, rx: 0.19, ry: 0.145, rot: 0.35, shade: 2 },
      { x: -0.38, y: 0.36, rx: 0.21, ry: 0.16, rot: 0.4, shade: 2 },
      { x: -0.08, y: 0.34, rx: 0.22, ry: 0.165, rot: -0.9, shade: 1 },
      { x: 0.22, y: 0.28, rx: 0.23, ry: 0.17, rot: 0.65, shade: 0 },
      { x: 0.46, y: 0.36, rx: 0.17, ry: 0.13, rot: -0.3, shade: 1 },
      { x: 0.04, y: 0.54, rx: 0.18, ry: 0.135, rot: 0.15, shade: 2 },
    ];

    const palettes = [
      ['#b5f56e', '#5ed147', '#2b8a34'],
      ['#c9fa7d', '#76de4b', '#389938'],
      ['#9eed64', '#4ec449', '#227a34'],
    ];

    // Subtle water surface sheen ring around the cozy patch
    const halo = ctx.createRadialGradient(0, 0, r * 0.1, 0, 0, r * 0.92);
    halo.addColorStop(0, 'rgba(130, 230, 140, 0.10)');
    halo.addColorStop(0.7, 'rgba(80, 190, 120, 0.05)');
    halo.addColorStop(1, 'rgba(80, 190, 120, 0)');
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.92, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();

    // Pass 1: Soft underwater shadows for all 14 leaves
    for (let i = 0; i < leaves.length; i++) {
      const lf = leaves[i];
      const bobX = Math.sin(t * 1.4 + i * 0.9) * r * 0.015;
      const bobY = Math.cos(t * 1.2 + i * 1.1) * r * 0.015;
      ctx.save();
      ctx.translate(lf.x * r + bobX + r * 0.035, lf.y * r + bobY + r * 0.045);
      ctx.rotate(lf.rot + Math.sin(t * 1.1 + i) * 0.04);
      ctx.beginPath();
      ctx.ellipse(0, 0, lf.rx * r, lf.ry * r, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(8, 36, 22, 0.28)';
      ctx.fill();
      ctx.restore();
    }

    // Pass 2: Plump glossy bright-green duckweed leaves
    for (let i = 0; i < leaves.length; i++) {
      const lf = leaves[i];
      const bobX = Math.sin(t * 1.4 + i * 0.9) * r * 0.015;
      const bobY = Math.cos(t * 1.2 + i * 1.1) * r * 0.015;
      const pal = palettes[lf.shade];
      const rx = lf.rx * r;
      const ry = lf.ry * r;

      ctx.save();
      ctx.translate(lf.x * r + bobX, lf.y * r + bobY);
      ctx.rotate(lf.rot + Math.sin(t * 1.1 + i) * 0.04);

      // Slightly obovate organic duckweed silhouette
      ctx.beginPath();
      ctx.moveTo(-rx, 0);
      ctx.bezierCurveTo(-rx * 0.85, -ry * 1.05, rx * 0.72, -ry * 1.12, rx, 0);
      ctx.bezierCurveTo(rx * 0.72, ry * 1.12, -rx * 0.85, ry * 1.05, -rx, 0);
      ctx.closePath();

      const lg = ctx.createRadialGradient(-rx * 0.25, -ry * 0.25, rx * 0.08, 0, 0, rx * 1.08);
      lg.addColorStop(0, pal[0]);
      lg.addColorStop(0.55, pal[1]);
      lg.addColorStop(1, pal[2]);
      ctx.fillStyle = lg;
      ctx.fill();

      // Delicate bright margin
      ctx.strokeStyle = 'rgba(210, 255, 155, 0.55)';
      ctx.lineWidth = Math.max(0.7, r * 0.012);
      ctx.stroke();

      // Faint central midrib crease
      ctx.beginPath();
      ctx.moveTo(-rx * 0.62, 0);
      ctx.quadraticCurveTo(0, -ry * 0.08, rx * 0.62, 0);
      ctx.strokeStyle = 'rgba(220, 255, 175, 0.42)';
      ctx.lineWidth = Math.max(0.6, r * 0.01);
      ctx.stroke();

      // Glossy wet highlight
      ctx.beginPath();
      ctx.ellipse(-rx * 0.26, -ry * 0.28, rx * 0.28, ry * 0.18, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 255, 225, 0.52)';
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  },

  /**
   * 4. Bull Kelp: Sweeping golden-emerald bull kelp blades with glossy air bladders.
   */
  kelpflora(ctx, r, t = 0) {
    ctx.save();

    const anchorX = -r * 0.34;
    const anchorY = r * 0.16;

    // 7 sweeping undulating kelp blades flowing in the current
    const blades = [
      { angle: -0.78, len: 1.32, wid: 0.17, curl: 0.32, phase: 0.0, dark: true },
      { angle: -0.45, len: 1.44, wid: 0.19, curl: -0.26, phase: 0.8, dark: true },
      { angle: -0.12, len: 1.48, wid: 0.21, curl: 0.28, phase: 1.6, dark: false },
      { angle: 0.18, len: 1.36, wid: 0.18, curl: -0.34, phase: 2.3, dark: false },
      { angle: 0.52, len: 1.24, wid: 0.16, curl: 0.25, phase: 3.1, dark: true },
      { angle: -0.28, len: 1.22, wid: 0.15, curl: 0.22, phase: 4.0, dark: false },
      { angle: 0.02, len: 1.15, wid: 0.14, curl: -0.2, phase: 4.9, dark: false },
    ];

    for (const b of blades) {
      const wave = Math.sin(t * 1.9 + b.phase) * 0.11;
      const len = b.len * r;
      const wid = b.wid * r;

      ctx.save();
      ctx.translate(anchorX, anchorY);
      ctx.rotate(b.angle + wave * 0.45);

      const cp1x = len * 0.34;
      const cp1y = (b.curl + wave) * len * 0.42;
      const cp2x = len * 0.72;
      const cp2y = (-b.curl * 0.85 - wave) * len * 0.36;
      const tipX = len;
      const tipY = (b.curl * 0.2 + wave * 0.6) * len * 0.24;

      // Soft cast shadow beneath blade
      ctx.save();
      ctx.translate(r * 0.04, r * 0.06);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(cp1x, cp1y - wid * 0.85, cp2x, cp2y - wid * 0.55, tipX, tipY);
      ctx.bezierCurveTo(cp2x, cp2y + wid * 0.55, cp1x, cp1y + wid * 0.85, 0, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(8, 28, 18, 0.22)';
      ctx.fill();
      ctx.restore();

      // Main ruffled kelp blade
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(cp1x, cp1y - wid * 0.92, cp2x, cp2y - wid * 0.62, tipX, tipY);
      ctx.bezierCurveTo(cp2x, cp2y + wid * 0.62, cp1x, cp1y + wid * 0.92, 0, 0);
      ctx.closePath();

      const bg = ctx.createLinearGradient(0, 0, tipX, tipY);
      if (b.dark) {
        bg.addColorStop(0, '#5a6e1e');
        bg.addColorStop(0.45, '#2b7a42');
        bg.addColorStop(0.85, '#1c633b');
        bg.addColorStop(1, 'rgba(34, 118, 66, 0.72)');
      } else {
        bg.addColorStop(0, '#c89b2b');
        bg.addColorStop(0.35, '#8db534');
        bg.addColorStop(0.72, '#2fa35b');
        bg.addColorStop(1, 'rgba(82, 198, 112, 0.78)');
      }
      ctx.fillStyle = bg;
      ctx.fill();

      // Golden translucent edge highlight
      ctx.strokeStyle = b.dark ? 'rgba(130, 190, 82, 0.35)' : 'rgba(235, 224, 112, 0.52)';
      ctx.lineWidth = Math.max(0.8, r * 0.015);
      ctx.stroke();

      // Central glossy midrib
      ctx.beginPath();
      ctx.moveTo(len * 0.04, 0);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, tipX * 0.92, tipY * 0.92);
      ctx.strokeStyle = 'rgba(240, 236, 145, 0.42)';
      ctx.lineWidth = Math.max(0.9, r * 0.018);
      ctx.stroke();

      ctx.restore();
    }

    // Cluster of 3 glossy golden-emerald bull kelp air bladders (pneumatocysts)
    const bladders = [
      { x: anchorX - r * 0.04, y: anchorY - r * 0.08, rx: r * 0.16, ry: r * 0.125, rot: -0.35 },
      { x: anchorX + r * 0.08, y: anchorY + r * 0.07, rx: r * 0.14, ry: r * 0.11, rot: 0.25 },
      { x: anchorX - r * 0.09, y: anchorY + r * 0.09, rx: r * 0.12, ry: r * 0.095, rot: 0.65 },
    ];
    for (const bl of bladders) {
      ctx.save();
      ctx.translate(bl.x, bl.y);
      ctx.rotate(bl.rot);

      // Bladder shadow
      ctx.beginPath();
      ctx.ellipse(r * 0.025, r * 0.03, bl.rx, bl.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(10, 30, 14, 0.38)';
      ctx.fill();

      // Glossy pneumatocyst bulb
      const blg = ctx.createRadialGradient(-bl.rx * 0.3, -bl.ry * 0.35, bl.rx * 0.08, 0, 0, bl.rx * 1.05);
      blg.addColorStop(0, '#fff29c');
      blg.addColorStop(0.35, '#d8b438');
      blg.addColorStop(0.75, '#6b8c28');
      blg.addColorStop(1, '#314f1c');
      ctx.beginPath();
      ctx.ellipse(0, 0, bl.rx, bl.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = blg;
      ctx.fill();

      // Curved specular highlight
      ctx.beginPath();
      ctx.ellipse(-bl.rx * 0.26, -bl.ry * 0.3, bl.rx * 0.36, bl.ry * 0.2, -0.35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 252, 224, 0.78)';
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  },

  /**
   * 5. Sea Grass: Radiating tuft of slender emerald sea-grass ribbons.
   */
  seagrassflora(ctx, r, t = 0) {
    ctx.save();

    // Soft shaded base tuft shadow
    const baseShadow = ctx.createRadialGradient(0, 0, r * 0.05, 0, 0, r * 0.42);
    baseShadow.addColorStop(0, 'rgba(6, 30, 20, 0.55)');
    baseShadow.addColorStop(0.65, 'rgba(6, 30, 20, 0.22)');
    baseShadow.addColorStop(1, 'rgba(6, 30, 20, 0)');
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.42, 0, Math.PI * 2);
    ctx.fillStyle = baseShadow;
    ctx.fill();

    // 18 slender radiating emerald ribbons in 2 depth layers
    const count = 18;
    for (let layer = 0; layer < 2; layer++) {
      for (let i = 0; i < count; i++) {
        if ((i % 2) !== layer) continue;
        const baseA = (i / count) * Math.PI * 2 + (layer ? 0.14 : 0);
        const len = r * (layer === 0 ? 0.88 + (i % 3) * 0.1 : 0.72 + ((i + 1) % 3) * 0.12);
        const w = r * (layer === 0 ? 0.052 : 0.044);
        const bend = ((i % 2 === 0 ? 1 : -1) * 0.26) + Math.sin(t * 2.1 + i * 0.75) * 0.1;

        ctx.save();
        ctx.rotate(baseA);

        const cpX = len * 0.52;
        const cpY = len * bend;
        const tipX = len;
        const tipY = len * bend * 0.72;

        ctx.beginPath();
        ctx.moveTo(0, -w);
        ctx.quadraticCurveTo(cpX, cpY - w * 0.55, tipX, tipY);
        ctx.quadraticCurveTo(cpX, cpY + w * 0.55, 0, w);
        ctx.closePath();

        const gg = ctx.createLinearGradient(0, 0, tipX, tipY);
        if (layer === 0) {
          gg.addColorStop(0, '#0e4a32');
          gg.addColorStop(0.5, '#1d8a52');
          gg.addColorStop(1, '#4cd47a');
        } else {
          gg.addColorStop(0, '#196b42');
          gg.addColorStop(0.45, '#35ba66');
          gg.addColorStop(0.85, '#86eb78');
          gg.addColorStop(1, '#c6fa96');
        }
        ctx.fillStyle = gg;
        ctx.fill();

        // Crisp slender mid-ribbon highlight
        ctx.beginPath();
        ctx.moveTo(len * 0.08, 0);
        ctx.quadraticCurveTo(cpX, cpY, tipX * 0.93, tipY * 0.93);
        ctx.strokeStyle = layer === 0 ? 'rgba(130, 235, 160, 0.25)' : 'rgba(218, 255, 178, 0.45)';
        ctx.lineWidth = Math.max(0.6, r * 0.011);
        ctx.stroke();

        ctx.restore();
      }
    }

    // Cozy crown center rosette
    const crown = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.14);
    crown.addColorStop(0, '#124a30');
    crown.addColorStop(1, 'rgba(18, 74, 48, 0)');
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.14, 0, Math.PI * 2);
    ctx.fillStyle = crown;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 6. Sea Anemone: Lush sea anemone with 20 glowing violet-tipped fleshy tentacles.
   */
  anemoneflora(ctx, r, t = 0) {
    ctx.save();

    // Soft violet bioluminescent reef aura
    const aura = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r * 1.12);
    aura.addColorStop(0, 'rgba(185, 80, 255, 0.28)');
    aura.addColorStop(0.65, 'rgba(140, 50, 220, 0.12)');
    aura.addColorStop(1, 'rgba(110, 30, 190, 0)');
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.12, 0, Math.PI * 2);
    ctx.fillStyle = aura;
    ctx.fill();

    // Fleshy shaded oral disc base
    const discGrad = ctx.createRadialGradient(0, 0, r * 0.04, 0, 0, r * 0.5);
    discGrad.addColorStop(0, '#5a1848');
    discGrad.addColorStop(0.55, '#8c2c6b');
    discGrad.addColorStop(1, '#3d1238');
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.46, 0, Math.PI * 2);
    ctx.fillStyle = discGrad;
    ctx.fill();

    // 20 glowing violet-tipped fleshy tentacles (12 outer + 8 inner)
    const drawTentacle = (angle, len, baseW, curl, phase) => {
      const sway = Math.sin(t * 2.2 + phase) * 0.14;
      const tipX = Math.cos(angle + sway) * len;
      const tipY = Math.sin(angle + sway) * len;
      const midA = angle + curl + sway * 0.5;
      const midX = Math.cos(midA) * len * 0.56;
      const midY = Math.sin(midA) * len * 0.56;

      // Perpendicular vectors for fleshy tapered ribbon
      const nx = -Math.sin(angle);
      const ny = Math.cos(angle);
      const bx = Math.cos(angle) * r * 0.14;
      const by = Math.sin(angle) * r * 0.14;

      ctx.beginPath();
      ctx.moveTo(bx + nx * baseW, by + ny * baseW);
      ctx.quadraticCurveTo(midX + nx * baseW * 0.65, midY + ny * baseW * 0.65, tipX, tipY);
      ctx.quadraticCurveTo(midX - nx * baseW * 0.65, midY - ny * baseW * 0.65, bx - nx * baseW, by - ny * baseW);
      ctx.closePath();

      const tg = ctx.createLinearGradient(bx, by, tipX, tipY);
      tg.addColorStop(0, '#a6427d');
      tg.addColorStop(0.55, '#e896c0');
      tg.addColorStop(0.84, '#d972ff');
      tg.addColorStop(1, '#a93dff');
      ctx.fillStyle = tg;
      ctx.fill();

      // Soft translucent highlight along fleshy body
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.quadraticCurveTo(midX, midY, tipX, tipY);
      ctx.strokeStyle = 'rgba(255, 224, 245, 0.34)';
      ctx.lineWidth = Math.max(0.8, baseW * 0.35);
      ctx.lineCap = 'round';
      ctx.stroke();

      // Glowing bulbous violet tip
      const tipR = baseW * 0.82;
      const tipHalo = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, tipR * 2.2);
      tipHalo.addColorStop(0, 'rgba(225, 145, 255, 0.85)');
      tipHalo.addColorStop(0.5, 'rgba(170, 62, 255, 0.38)');
      tipHalo.addColorStop(1, 'rgba(150, 40, 255, 0)');
      ctx.beginPath();
      ctx.arc(tipX, tipY, tipR * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = tipHalo;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(tipX, tipY, tipR, 0, Math.PI * 2);
      ctx.fillStyle = '#c85cff';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(tipX - tipR * 0.25, tipY - tipR * 0.25, tipR * 0.38, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 245, 255, 0.9)';
      ctx.fill();
    };

    // 12 outer tentacles
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const len = r * (0.88 + (i % 2) * 0.1);
      const curl = (i % 2 === 0 ? 0.22 : -0.2);
      drawTentacle(a, len, r * 0.088, curl, i * 0.6);
    }

    // 8 inner shorter tentacles
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + 0.25;
      const len = r * (0.56 + (i % 2) * 0.08);
      const curl = (i % 2 === 0 ? -0.24 : 0.24);
      drawTentacle(a, len, r * 0.072, curl, i * 0.9 + 2.0);
    }

    // Glowing coral-rose mouth center
    const mouthG = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.16);
    mouthG.addColorStop(0, '#ffbad6');
    mouthG.addColorStop(0.5, '#d64886');
    mouthG.addColorStop(1, '#611948');
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.16, r * 0.12, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = mouthG;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 7. Brain Coral: Rounded dome coral painted with intricate labyrinthine meandering grooves.
   */
  braincoralflora(ctx, r, t = 0) {
    ctx.save();
    const domeR = r * 0.94;
    const pulse = 1 + Math.sin(t * 0.8) * 0.008;
    ctx.scale(pulse, pulse);

    // Organic boulder-dome silhouette path helper
    const traceDome = (scale) => {
      ctx.beginPath();
      const pts = 48;
      for (let i = 0; i <= pts; i++) {
        const a = (i / pts) * Math.PI * 2;
        const rad = domeR * scale * (1 + Math.sin(a * 3) * 0.032 + Math.cos(a * 5) * 0.018);
        const px = Math.cos(a) * rad;
        const py = Math.sin(a) * rad;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    // Cast shadow
    ctx.save();
    ctx.translate(r * 0.07, r * 0.09);
    traceDome(1.01);
    ctx.fillStyle = 'rgba(10, 22, 24, 0.42)';
    ctx.fill();
    ctx.restore();

    // Base 3D hemispherical dome
    traceDome(1);
    const domeGrad = ctx.createRadialGradient(-r * 0.26, -r * 0.26, r * 0.08, 0, 0, domeR * 1.05);
    domeGrad.addColorStop(0, '#f2cf7e');
    domeGrad.addColorStop(0.45, '#c99749');
    domeGrad.addColorStop(0.8, '#8a6234');
    domeGrad.addColorStop(1, '#4c3620');
    ctx.fillStyle = domeGrad;
    ctx.fill();

    // Clip labyrinthine meandering grooves inside the coral dome
    ctx.save();
    traceDome(0.985);
    ctx.clip();

    // Handcrafted meandering labyrinth paths (normalized to r)
    const grooves = [
      [[-0.78, -0.35], [-0.48, -0.58], [-0.18, -0.42], [0.05, -0.68], [0.38, -0.56], [0.68, -0.32]],
      [[-0.82, -0.05], [-0.52, -0.22], [-0.24, -0.04], [0.08, -0.28], [0.36, -0.14], [0.64, -0.02], [0.84, 0.15]],
      [[-0.76, 0.28], [-0.46, 0.14], [-0.22, 0.34], [0.08, 0.12], [0.34, 0.28], [0.62, 0.18], [0.78, 0.44]],
      [[-0.58, 0.58], [-0.28, 0.62], [-0.04, 0.44], [0.24, 0.62], [0.54, 0.52]],
      [[-0.36, -0.76], [-0.06, -0.82], [0.22, -0.78], [0.46, -0.66]],
      [[-0.14, 0.78], [0.12, 0.82], [0.38, 0.74]],
    ];

    const traceSmoothPath = (pts) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0] * r, pts[0][1] * r);
      for (let i = 1; i < pts.length - 1; i++) {
        const xc = ((pts[i][0] + pts[i + 1][0]) * 0.5) * r;
        const yc = ((pts[i][1] + pts[i + 1][1]) * 0.5) * r;
        ctx.quadraticCurveTo(pts[i][0] * r, pts[i][1] * r, xc, yc);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last[0] * r, last[1] * r);
    };

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Pass 1: Broad raised sunlit ridges flanking the valleys
    for (const g of grooves) {
      traceSmoothPath(g);
      ctx.strokeStyle = 'rgba(255, 238, 178, 0.68)';
      ctx.lineWidth = r * 0.19;
      ctx.stroke();
    }

    // Pass 2: Warm ochre-amber ridge slopes
    for (const g of grooves) {
      traceSmoothPath(g);
      ctx.strokeStyle = 'rgba(176, 126, 56, 0.72)';
      ctx.lineWidth = r * 0.13;
      ctx.stroke();
    }

    // Pass 3: Deep meandering dark-olive/teal coral valleys
    for (const g of grooves) {
      traceSmoothPath(g);
      ctx.strokeStyle = '#33291b';
      ctx.lineWidth = r * 0.072;
      ctx.stroke();

      // Subtle bioluminescent sage-green valley floor tint
      ctx.strokeStyle = 'rgba(84, 138, 96, 0.52)';
      ctx.lineWidth = r * 0.028;
      ctx.stroke();
    }

    // Pass 4: Fine perpendicular septal striations along the ridges
    ctx.strokeStyle = 'rgba(255, 246, 206, 0.36)';
    ctx.lineWidth = Math.max(0.7, r * 0.012);
    for (const g of grooves) {
      for (let i = 0; i < g.length - 1; i++) {
        const x0 = g[i][0] * r, y0 = g[i][1] * r;
        const x1 = g[i + 1][0] * r, y1 = g[i + 1][1] * r;
        const dx = x1 - x0, dy = y1 - y0;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = -dy / dist, ny = dx / dist;
        const ticks = Math.max(3, Math.floor(dist / (r * 0.07)));
        for (let k = 1; k < ticks; k++) {
          const f = k / ticks;
          const mx = x0 + dx * f;
          const my = y0 + dy * f;
          ctx.beginPath();
          ctx.moveTo(mx + nx * r * 0.036, my + ny * r * 0.036);
          ctx.lineTo(mx + nx * r * 0.092, my + ny * r * 0.092);
          ctx.moveTo(mx - nx * r * 0.036, my - ny * r * 0.036);
          ctx.lineTo(mx - nx * r * 0.092, my - ny * r * 0.092);
          ctx.stroke();
        }
      }
    }

    // Hemispherical top-left sunlit highlight & ambient occlusion rim
    const shadeOverlay = ctx.createRadialGradient(-r * 0.28, -r * 0.28, r * 0.1, 0, 0, domeR * 1.02);
    shadeOverlay.addColorStop(0, 'rgba(255, 250, 220, 0.24)');
    shadeOverlay.addColorStop(0.55, 'rgba(0, 0, 0, 0)');
    shadeOverlay.addColorStop(0.86, 'rgba(28, 22, 14, 0.32)');
    shadeOverlay.addColorStop(1, 'rgba(18, 14, 10, 0.58)');
    ctx.fillStyle = shadeOverlay;
    ctx.fillRect(-domeR * 1.1, -domeR * 1.1, domeR * 2.2, domeR * 2.2);

    ctx.restore();
    ctx.restore();
  },

  /**
   * 8. Caulerpa: Delicate fern-like feathery green sea-grape fronds.
   */
  caulerpaflora(ctx, r, t = 0) {
    ctx.save();

    // Creeping translucent pale-green stolon runner
    ctx.beginPath();
    ctx.moveTo(-r * 0.56, r * 0.24);
    ctx.bezierCurveTo(-r * 0.18, r * 0.05, r * 0.16, r * 0.26, r * 0.52, -r * 0.08);
    ctx.strokeStyle = 'rgba(116, 206, 98, 0.72)';
    ctx.lineWidth = r * 0.055;
    ctx.lineCap = 'round';
    ctx.stroke();

    // 6 feathery fern-like Caulerpa fronds radiating from the stolon
    const fronds = [
      { ox: -0.32, oy: 0.16, angle: -2.18, len: 0.94, curve: 0.22, pairs: 11, phase: 0.0 },
      { ox: -0.14, oy: 0.12, angle: -1.42, len: 1.04, curve: -0.18, pairs: 12, phase: 0.9 },
      { ox: 0.08, oy: 0.14, angle: -0.68, len: 1.02, curve: 0.20, pairs: 12, phase: 1.7 },
      { ox: 0.28, oy: 0.06, angle: 0.15, len: 0.90, curve: -0.22, pairs: 10, phase: 2.5 },
      { ox: -0.06, oy: 0.18, angle: 1.12, len: 0.88, curve: 0.19, pairs: 10, phase: 3.3 },
      { ox: -0.26, oy: 0.20, angle: 2.32, len: 0.84, curve: -0.18, pairs: 9, phase: 4.1 },
    ];

    for (const fr of fronds) {
      const sway = Math.sin(t * 2.0 + fr.phase) * 0.08;
      const len = fr.len * r;

      ctx.save();
      ctx.translate(fr.ox * r, fr.oy * r);
      ctx.rotate(fr.angle + sway);

      const cpX = len * 0.52;
      const cpY = len * (fr.curve + sway * 0.5);
      const endX = len;
      const endY = len * (fr.curve * 0.55 + sway * 0.4);

      // Helper to sample quadratic Bezier along the central rachis
      const sample = (u) => {
        const inv = 1 - u;
        return {
          x: 2 * inv * u * cpX + u * u * endX,
          y: 2 * inv * u * cpY + u * u * endY,
          tx: 2 * inv * cpX + 2 * u * (endX - cpX),
          ty: 2 * inv * cpY + 2 * u * (endY - cpY),
        };
      };

      // Opposing feathery pinnules with glistening sea-grape bead tips
      for (let p = 1; p <= fr.pairs; p++) {
        const u = p / (fr.pairs + 1.1);
        const pt = sample(u);
        const tLen = Math.hypot(pt.tx, pt.ty) || 1;
        const tx = pt.tx / tLen;
        const ty = pt.ty / tLen;
        const nx = -ty;
        const ny = tx;

        // Tapered fern envelope (widest near 35% of frond)
        const env = Math.sin(Math.pow(u, 0.78) * Math.PI);
        const pLen = r * 0.24 * env;
        const pW = r * 0.028 * (0.55 + env * 0.45);

        for (const side of [-1, 1]) {
          // Angle slightly forward like delicate fern pinnae
          const dirX = nx * side * 0.86 + tx * 0.52;
          const dirY = ny * side * 0.86 + ty * 0.52;
          const tipX = pt.x + dirX * pLen;
          const tipY = pt.y + dirY * pLen;

          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.quadraticCurveTo(
            pt.x + dirX * pLen * 0.55 - tx * pW,
            pt.y + dirY * pLen * 0.55 - ty * pW,
            tipX,
            tipY
          );
          ctx.strokeStyle = u > 0.65 ? '#6ee67c' : '#2eb85c';
          ctx.lineWidth = pW * 1.45;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Tiny translucent sea-grape pearl bead at each leaflet tip
          ctx.beginPath();
          ctx.arc(tipX, tipY, pW * 0.95, 0, Math.PI * 2);
          ctx.fillStyle = '#a4f78b';
          ctx.fill();
        }
      }

      // Delicate central rachis stem
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(cpX, cpY, endX, endY);
      ctx.strokeStyle = '#9cf086';
      ctx.lineWidth = Math.max(1.0, r * 0.024);
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.restore();
    }

    ctx.restore();
  },

  /**
   * 9. Feather Duster: Radial crown of delicate banded cream-and-burgundy feathery plumes.
   */
  featherdusterflora(ctx, r, t = 0) {
    ctx.save();
    const breathe = 1 + Math.sin(t * 1.6) * 0.03;
    ctx.scale(breathe, breathe);

    // Soft underwater shadow beneath the airy plume crown
    const sh = ctx.createRadialGradient(r * 0.05, r * 0.06, r * 0.1, r * 0.05, r * 0.06, r * 1.02);
    sh.addColorStop(0, 'rgba(18, 8, 12, 0.44)');
    sh.addColorStop(0.65, 'rgba(18, 8, 12, 0.18)');
    sh.addColorStop(1, 'rgba(18, 8, 12, 0)');
    ctx.beginPath();
    ctx.arc(r * 0.05, r * 0.06, r * 1.02, 0, Math.PI * 2);
    ctx.fillStyle = sh;
    ctx.fill();

    // 24 radiating banded cream-and-burgundy feathery plumes
    const plumeCount = 24;
    for (let i = 0; i < plumeCount; i++) {
      const baseA = (i / plumeCount) * Math.PI * 2;
      const sway = Math.sin(t * 2.0 + i * 0.55) * 0.035;
      const len = r * (0.94 + (i % 3) * 0.045);

      ctx.save();
      ctx.rotate(baseA + sway);

      // Gentle spiral curve on each radiole
      const curveY = r * 0.12;
      const sample = (u) => {
        const inv = 1 - u;
        return {
          x: 2 * inv * u * (len * 0.52) + u * u * len,
          y: 2 * inv * u * curveY + u * u * (curveY * 0.6),
        };
      };

      // Feathery pinnule barbs along the plume with concentric burgundy & cream banding
      const barbs = 15;
      for (let b = 2; b <= barbs; b++) {
        const u = b / (barbs + 0.5);
        const pt = sample(u);
        const barbLen = r * 0.115 * Math.sin(u * Math.PI * 0.92 + 0.15);

        // Characteristic concentric banding: cream -> burgundy -> cinnamon -> cream -> burgundy tip
        let col;
        if (u < 0.28) col = '#69192b';
        else if (u < 0.48) col = '#f6e4c8';
        else if (u < 0.68) col = '#8c2238';
        else if (u < 0.85) col = '#fff2dc';
        else col = '#a83644';

        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(pt.x + barbLen * 0.35, pt.y - barbLen);
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(pt.x + barbLen * 0.35, pt.y + barbLen);
        ctx.strokeStyle = col;
        ctx.globalAlpha = 0.82;
        ctx.lineWidth = Math.max(0.7, r * 0.015);
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Central banded plume shaft
      const shaftGrad = ctx.createLinearGradient(0, 0, len, 0);
      shaftGrad.addColorStop(0, '#4f1220');
      shaftGrad.addColorStop(0.32, '#f5dfbe');
      shaftGrad.addColorStop(0.58, '#851e34');
      shaftGrad.addColorStop(0.82, '#fff0d6');
      shaftGrad.addColorStop(1, '#9e3040');

      ctx.beginPath();
      ctx.moveTo(r * 0.1, 0);
      ctx.quadraticCurveTo(len * 0.52, curveY, len, curveY * 0.6);
      ctx.strokeStyle = shaftGrad;
      ctx.lineWidth = Math.max(1.1, r * 0.022);
      ctx.stroke();

      ctx.restore();
    }

    // Parchment tube collar & dark center opening
    const collar = ctx.createRadialGradient(0, 0, r * 0.04, 0, 0, r * 0.19);
    collar.addColorStop(0, '#1c0c12');
    collar.addColorStop(0.55, '#4c1824');
    collar.addColorStop(0.85, '#c7a483');
    collar.addColorStop(1, '#7a5840');
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = collar;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 10. Glow Fungus: Cluster of bioluminescent cyan-teal underwater toadstool caps.
   */
  glowfungusflora(ctx, r, t = 0) {
    ctx.save();
    const glowPulse = 0.88 + Math.sin(t * 2.4) * 0.12;

    // Ambient bioluminescent cyan-teal pool beneath the cluster
    const pool = ctx.createRadialGradient(0, 0, r * 0.1, 0, 0, r * 1.18);
    pool.addColorStop(0, `rgba(64, 255, 240, ${0.38 * glowPulse})`);
    pool.addColorStop(0.55, `rgba(18, 195, 215, ${0.2 * glowPulse})`);
    pool.addColorStop(1, 'rgba(10, 120, 160, 0)');
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.18, 0, Math.PI * 2);
    ctx.fillStyle = pool;
    ctx.fill();

    // 5 sculpted toadstool caps (back-to-front)
    const caps = [
      { x: -0.42, y: -0.26, rad: 0.34, rot: -0.4 },
      { x: 0.40, y: -0.30, rad: 0.30, rot: 0.6 },
      { x: -0.34, y: 0.38, rad: 0.28, rot: 1.2 },
      { x: 0.38, y: 0.32, rad: 0.38, rot: -0.8 },
      { x: -0.02, y: -0.02, rad: 0.48, rot: 0.15 }, // Hero cap
    ];

    for (let idx = 0; idx < caps.length; idx++) {
      const c = caps[idx];
      const cx = c.x * r;
      const cy = c.y * r;
      const cr = c.rad * r;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(c.rot);

      // Soft cyan-teal cap halo
      const cHalo = ctx.createRadialGradient(0, 0, cr * 0.5, 0, 0, cr * 1.35);
      cHalo.addColorStop(0, `rgba(92, 255, 244, ${0.42 * glowPulse})`);
      cHalo.addColorStop(1, 'rgba(30, 210, 225, 0)');
      ctx.beginPath();
      ctx.arc(0, 0, cr * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = cHalo;
      ctx.fill();

      // Subtle dark underside shadow
      ctx.beginPath();
      ctx.arc(r * 0.03, r * 0.04, cr * 0.98, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(4, 24, 38, 0.42)';
      ctx.fill();

      // Organic slightly scalloped toadstool cap silhouette
      ctx.beginPath();
      const segs = 32;
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const rr = cr * (1 + Math.sin(a * 5 + idx) * 0.035);
        const px = Math.cos(a) * rr;
        const py = Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      const capG = ctx.createRadialGradient(-cr * 0.18, -cr * 0.18, cr * 0.06, 0, 0, cr * 1.05);
      capG.addColorStop(0, '#e6ffff');
      capG.addColorStop(0.28, '#66fff0');
      capG.addColorStop(0.68, '#14b8c8');
      capG.addColorStop(0.92, '#0c6e8c');
      capG.addColorStop(1, '#58f5ec');
      ctx.fillStyle = capG;
      ctx.fill();

      // Translucent radial gill-striations near cap margin
      ctx.strokeStyle = 'rgba(205, 255, 252, 0.34)';
      ctx.lineWidth = Math.max(0.6, r * 0.01);
      for (let g = 0; g < 16; g++) {
        const ga = (g / 16) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ga) * cr * 0.48, Math.sin(ga) * cr * 0.48);
        ctx.lineTo(Math.cos(ga) * cr * 0.94, Math.sin(ga) * cr * 0.94);
        ctx.stroke();
      }

      // Luminous bioluminescent speckles on the cap crown
      const spots = [
        [-0.28, -0.22, 0.11],
        [0.24, -0.32, 0.08],
        [0.34, 0.14, 0.09],
        [-0.36, 0.22, 0.075],
        [0.04, 0.36, 0.085],
        [0.02, -0.04, 0.12],
      ];
      for (const sp of spots) {
        ctx.beginPath();
        ctx.arc(sp[0] * cr, sp[1] * cr, sp[2] * cr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(235, 255, 255, 0.78)';
        ctx.fill();
      }

      ctx.restore();
    }

    // Floating bioluminescent spore motes
    for (let s = 0; s < 8; s++) {
      const a = (s / 8) * Math.PI * 2 + t * 0.35;
      const dist = r * (0.72 + Math.sin(t * 1.6 + s * 1.4) * 0.16);
      const sx = Math.cos(a) * dist;
      const sy = Math.sin(a) * dist;
      ctx.beginPath();
      ctx.arc(sx, sy, r * 0.025, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(185, 255, 252, ${0.55 + 0.35 * Math.sin(t * 3 + s)})`;
      ctx.fill();
    }

    ctx.restore();
  },

  /**
   * 11. Red Algae: Ruffly crimson-ruby painted dulse seaweed fronds.
   */
  redalgaeflora(ctx, r, t = 0) {
    ctx.save();

    // 7 overlapping palmate, ruffled crimson-ruby fronds
    const fronds = [
      { angle: -2.45, len: 0.96, wid: 0.34, phase: 0.0, dark: true },
      { angle: -1.55, len: 1.04, wid: 0.38, phase: 0.9, dark: true },
      { angle: -0.62, len: 0.98, wid: 0.35, phase: 1.8, dark: true },
      { angle: 0.35, len: 1.02, wid: 0.37, phase: 2.6, dark: false },
      { angle: 1.28, len: 0.95, wid: 0.34, phase: 3.4, dark: false },
      { angle: 2.25, len: 0.92, wid: 0.33, phase: 4.2, dark: false },
      { angle: -0.15, len: 0.76, wid: 0.30, phase: 5.0, dark: false },
    ];

    for (const f of fronds) {
      const sway = Math.sin(t * 1.7 + f.phase) * 0.06;
      const len = f.len * r;
      const wid = f.wid * r;

      ctx.save();
      ctx.rotate(f.angle + sway);

      // Construct deeply ruffled scalloped dulse lobe
      const traceRuffledLobe = () => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const steps = 28;
        // Upper ruffled edge
        for (let i = 1; i <= steps; i++) {
          const u = i / steps;
          const x = u * len;
          const env = Math.sin(Math.pow(u, 0.68) * Math.PI);
          const ruffle = 1 + Math.sin(u * Math.PI * 7 + f.phase) * 0.16;
          const y = -wid * env * ruffle;
          ctx.lineTo(x, y);
        }
        // Lower ruffled edge back to holdfast
        for (let i = steps - 1; i >= 1; i--) {
          const u = i / steps;
          const x = u * len;
          const env = Math.sin(Math.pow(u, 0.68) * Math.PI);
          const ruffle = 1 + Math.cos(u * Math.PI * 7 + f.phase) * 0.16;
          const y = wid * env * ruffle;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
      };

      // Cast shadow
      ctx.save();
      ctx.translate(r * 0.03, r * 0.045);
      traceRuffledLobe();
      ctx.fillStyle = 'rgba(26, 4, 12, 0.28)';
      ctx.fill();
      ctx.restore();

      // Translucent ruby-crimson frond fill
      traceRuffledLobe();
      const fg = ctx.createLinearGradient(0, 0, len, 0);
      if (f.dark) {
        fg.addColorStop(0, '#59091e');
        fg.addColorStop(0.5, '#9e1435');
        fg.addColorStop(0.88, '#d42c52');
        fg.addColorStop(1, 'rgba(242, 92, 118, 0.85)');
      } else {
        fg.addColorStop(0, '#780e28');
        fg.addColorStop(0.42, '#c91c42');
        fg.addColorStop(0.8, '#f04664');
        fg.addColorStop(1, 'rgba(255, 138, 152, 0.88)');
      }
      ctx.fillStyle = fg;
      ctx.fill();

      // Sunlit translucent ruffled edge sheen
      ctx.strokeStyle = 'rgba(255, 170, 182, 0.45)';
      ctx.lineWidth = Math.max(0.8, r * 0.015);
      ctx.stroke();

      // Delicate branching inner veins
      ctx.beginPath();
      ctx.moveTo(len * 0.08, 0);
      ctx.quadraticCurveTo(len * 0.48, -wid * 0.08, len * 0.84, 0);
      ctx.moveTo(len * 0.34, -wid * 0.04);
      ctx.lineTo(len * 0.62, -wid * 0.42);
      ctx.moveTo(len * 0.42, wid * 0.03);
      ctx.lineTo(len * 0.68, wid * 0.44);
      ctx.strokeStyle = 'rgba(255, 198, 208, 0.32)';
      ctx.lineWidth = Math.max(0.6, r * 0.011);
      ctx.stroke();

      ctx.restore();
    }

    // Dark garnet holdfast core
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = '#470818';
    ctx.fill();

    ctx.restore();
  },

  /**
   * 12. Sea Fan: Intricate branching filigree coral sea fan in warm vermilion-gold.
   */
  seafanflora(ctx, r, t = 0) {
    ctx.save();
    const sway = Math.sin(t * 1.4) * 0.045;
    ctx.translate(0, r * 0.46);
    ctx.rotate(sway);

    // Deterministic branching filigree generator collecting branch nodes for fine cross-webbing
    const tips = [];
    const drawBranch = (x, y, angle, len, width, depth) => {
      const bend = Math.sin(depth * 2.1 + angle * 3) * 0.14;
      const mx = x + Math.cos(angle + bend) * len * 0.54;
      const my = y + Math.sin(angle + bend) * len * 0.54;
      const ex = x + Math.cos(angle) * len;
      const ey = y + Math.sin(angle) * len;

      // Shadow pass on main branches
      if (depth >= 2) {
        ctx.beginPath();
        ctx.moveTo(x + r * 0.025, y + r * 0.035);
        ctx.quadraticCurveTo(mx + r * 0.025, my + r * 0.035, ex + r * 0.025, ey + r * 0.035);
        ctx.strokeStyle = 'rgba(30, 8, 6, 0.24)';
        ctx.lineWidth = width * 1.15;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Warm vermilion-to-gold gradient stroke
      const bg = ctx.createLinearGradient(x, y, ex, ey);
      if (depth >= 3) {
        bg.addColorStop(0, '#9e2614');
        bg.addColorStop(1, '#d9481e');
      } else if (depth === 2) {
        bg.addColorStop(0, '#d9481e');
        bg.addColorStop(1, '#f27d24');
      } else {
        bg.addColorStop(0, '#f27d24');
        bg.addColorStop(1, '#ffcf54');
      }

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(mx, my, ex, ey);
      ctx.strokeStyle = bg;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.stroke();

      if (depth <= 1) {
        tips.push({ x: ex, y: ey });
      }
      if (depth === 0) return;

      const spread = depth === 3 ? 0.56 : depth === 2 ? 0.44 : 0.36;
      const nextLen = len * (depth === 3 ? 0.78 : 0.74);
      const nextW = width * 0.66;

      drawBranch(ex, ey, angle - spread, nextLen * 0.96, nextW, depth - 1);
      drawBranch(ex, ey, angle + spread, nextLen * 0.98, nextW, depth - 1);
      if (depth >= 2) {
        drawBranch(mx, my, angle + (depth % 2 === 0 ? 0.26 : -0.26), nextLen * 0.85, nextW * 0.88, depth - 1);
      }
    };

    // Anchor stem fanning upward into a sweeping gorgonian coral fan
    drawBranch(0, 0, -Math.PI * 0.5, r * 0.42, r * 0.075, 3);

    // Delicate anastomosing golden filigree cross-webbing between nearby outer twigs
    ctx.strokeStyle = 'rgba(255, 198, 88, 0.42)';
    ctx.lineWidth = Math.max(0.6, r * 0.01);
    for (let i = 0; i < tips.length; i++) {
      for (let j = i + 1; j < tips.length; j++) {
        const d = Math.hypot(tips[i].x - tips[j].x, tips[i].y - tips[j].y);
        if (d > r * 0.08 && d < r * 0.26) {
          ctx.beginPath();
          ctx.moveTo(tips[i].x, tips[i].y);
          ctx.lineTo(tips[j].x, tips[j].y);
          ctx.stroke();
        }
      }
    }

    // Tiny golden-ivory polyp sparkles along the filigree tips
    for (let i = 0; i < tips.length; i++) {
      ctx.beginPath();
      ctx.arc(tips[i].x, tips[i].y, r * 0.018, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? '#ffe89c' : '#ffb84d';
      ctx.fill();
    }

    // Holdfast coral foot
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.14, r * 0.09, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#7d1c10';
    ctx.fill();

    ctx.restore();
  },

  /**
   * 13. Staghorn Coral: Branching antler-like ivory-and-teal staghorn coral arms.
   */
  staghornflora(ctx, r, t = 0) {
    ctx.save();
    const microSway = Math.sin(t * 0.7) * 0.01;
    ctx.rotate(microSway);

    // Helper to draw a 3D cylindrical coral antler segment with teal base and ivory growing tip
    const drawAntler = (x0, y0, x1, y1, w0, w1, isTip) => {
      const dx = x1 - x0;
      const dy = y1 - y0;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;

      // Cast reef shadow
      ctx.save();
      ctx.translate(r * 0.045, r * 0.06);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = 'rgba(6, 24, 30, 0.3)';
      ctx.lineWidth = (w0 + w1) * 0.52;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();

      // Main tapered antler body
      ctx.beginPath();
      ctx.moveTo(x0 + nx * w0 * 0.5, y0 + ny * w0 * 0.5);
      ctx.lineTo(x1 + nx * w1 * 0.5, y1 + ny * w1 * 0.5);
      ctx.arc(x1, y1, w1 * 0.5, Math.atan2(ny, nx), Math.atan2(-ny, -nx), false);
      ctx.lineTo(x0 - nx * w0 * 0.5, y0 - ny * w0 * 0.5);
      ctx.arc(x0, y0, w0 * 0.5, Math.atan2(-ny, -nx), Math.atan2(ny, nx), false);
      ctx.closePath();

      const ag = ctx.createLinearGradient(x0, y0, x1, y1);
      if (isTip) {
        ag.addColorStop(0, '#2a969e');
        ag.addColorStop(0.55, '#8adbd4');
        ag.addColorStop(0.84, '#f2f2e4');
        ag.addColorStop(1, '#fffef7');
      } else {
        ag.addColorStop(0, '#125c6e');
        ag.addColorStop(0.6, '#1f8491');
        ag.addColorStop(1, '#4dbab8');
      }
      ctx.fillStyle = ag;
      ctx.fill();

      // Sunlit cylindrical top ridge highlight
      ctx.beginPath();
      ctx.moveTo(x0 - nx * w0 * 0.16, y0 - ny * w0 * 0.16);
      ctx.lineTo(x1 - nx * w1 * 0.14, y1 - ny * w1 * 0.14);
      ctx.strokeStyle = isTip ? 'rgba(255, 255, 248, 0.62)' : 'rgba(176, 244, 238, 0.42)';
      ctx.lineWidth = Math.max(1.2, w1 * 0.28);
      ctx.lineCap = 'round';
      ctx.stroke();

      // Subtle corallite pores/bumps along the antler arm
      const bumps = 3;
      for (let b = 1; b <= bumps; b++) {
        const u = b / (bumps + 1);
        const bx = x0 + dx * u + nx * (b % 2 === 0 ? 1 : -1) * w1 * 0.22;
        const by = y0 + dy * u + ny * (b % 2 === 0 ? 1 : -1) * w1 * 0.22;
        ctx.beginPath();
        ctx.arc(bx, by, Math.max(1, r * 0.018), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240, 255, 250, 0.45)';
        ctx.fill();
      }
    };

    // 6 radiating antler-like primary arms with Y-forked secondary tines
    const arms = [
      { a: -2.4, l1: 0.46, f1: -0.42, l2: 0.48, f2: 0.36, l3: 0.40 },
      { a: -1.35, l1: 0.48, f1: -0.35, l2: 0.50, f2: 0.42, l3: 0.44 },
      { a: -0.32, l1: 0.44, f1: -0.40, l2: 0.46, f2: 0.38, l3: 0.48 },
      { a: 0.78, l1: 0.46, f1: -0.38, l2: 0.50, f2: 0.44, l3: 0.42 },
      { a: 1.85, l1: 0.44, f1: -0.44, l2: 0.44, f2: 0.34, l3: 0.48 },
      { a: 2.88, l1: 0.42, f1: -0.34, l2: 0.46, f2: 0.42, l3: 0.40 },
    ];

    for (const arm of arms) {
      const mx = Math.cos(arm.a) * arm.l1 * r;
      const my = Math.sin(arm.a) * arm.l1 * r;
      drawAntler(0, 0, mx, my, r * 0.17, r * 0.135, false);

      const t1x = mx + Math.cos(arm.a + arm.f1) * arm.l2 * r;
      const t1y = my + Math.sin(arm.a + arm.f1) * arm.l2 * r;
      drawAntler(mx, my, t1x, t1y, r * 0.125, r * 0.088, true);

      const t2x = mx + Math.cos(arm.a + arm.f2) * arm.l3 * r;
      const t2y = my + Math.sin(arm.a + arm.f2) * arm.l3 * r;
      drawAntler(mx, my, t2x, t2y, r * 0.12, r * 0.082, true);
    }

    // Central reef base hub
    const hubG = ctx.createRadialGradient(-r * 0.04, -r * 0.04, r * 0.02, 0, 0, r * 0.2);
    hubG.addColorStop(0, '#5ac4c2');
    hubG.addColorStop(0.65, '#196f7d');
    hubG.addColorStop(1, '#0e4452');
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = hubG;
    ctx.fill();

    ctx.restore();
  },

  /**
   * 14. Star Polyp: Vibrant carpet of neon-emerald star-shaped coral polyps.
   */
  starpolypflora(ctx, r, t = 0) {
    ctx.save();

    // Soft neon-emerald reef glow halo
    const glow = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r * 1.08);
    glow.addColorStop(0, 'rgba(54, 255, 130, 0.28)');
    glow.addColorStop(0.7, 'rgba(20, 200, 95, 0.10)');
    glow.addColorStop(1, 'rgba(10, 160, 75, 0)');
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.08, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    // Encrusting dark-violet/plum leathery mat base
    ctx.beginPath();
    const matPts = 40;
    for (let i = 0; i <= matPts; i++) {
      const a = (i / matPts) * Math.PI * 2;
      const rr = r * 0.84 * (1 + Math.sin(a * 4) * 0.075 + Math.cos(a * 7) * 0.04);
      const px = Math.cos(a) * rr;
      const py = Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    const matGrad = ctx.createRadialGradient(-r * 0.15, -r * 0.15, r * 0.08, 0, 0, r * 0.9);
    matGrad.addColorStop(0, '#5a2b66');
    matGrad.addColorStop(0.65, '#3b1b47');
    matGrad.addColorStop(1, '#240f2e');
    ctx.fillStyle = matGrad;
    ctx.fill();

    // 15 vibrant neon-emerald 8-pointed star polyps carpeting the mat
    const polyps = [
      { x: 0.0, y: 0.0, s: 0.27, rot: 0.1 },
      { x: -0.44, y: -0.34, s: 0.24, rot: 0.5 },
      { x: -0.04, y: -0.50, s: 0.25, rot: 1.1 },
      { x: 0.42, y: -0.36, s: 0.23, rot: 0.3 },
      { x: -0.58, y: 0.06, s: 0.23, rot: 0.9 },
      { x: 0.56, y: 0.02, s: 0.25, rot: 0.2 },
      { x: -0.40, y: 0.44, s: 0.24, rot: 1.4 },
      { x: 0.04, y: 0.52, s: 0.25, rot: 0.7 },
      { x: 0.44, y: 0.40, s: 0.23, rot: 0.4 },
      { x: -0.26, y: -0.16, s: 0.21, rot: 0.8 },
      { x: 0.26, y: -0.18, s: 0.22, rot: 1.3 },
      { x: -0.24, y: 0.22, s: 0.22, rot: 0.2 },
      { x: 0.26, y: 0.20, s: 0.21, rot: 1.0 },
      { x: -0.68, y: -0.22, s: 0.18, rot: 0.6 },
      { x: 0.66, y: -0.24, s: 0.18, rot: 1.2 },
    ];

    for (let i = 0; i < polyps.length; i++) {
      const p = polyps[i];
      const px = p.x * r;
      const py = p.y * r;
      const pr = p.s * r;
      const twist = Math.sin(t * 2.2 + i * 0.8) * 0.12;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(p.rot + twist);

      // Subtle purple calyx base ring
      ctx.beginPath();
      ctx.arc(0, 0, pr * 0.36, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(28, 10, 38, 0.55)';
      ctx.fill();

      // 8 delicate neon-emerald star tentacles
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2;
        ctx.save();
        ctx.rotate(a);

        ctx.beginPath();
        ctx.moveTo(0, -pr * 0.11);
        ctx.quadraticCurveTo(pr * 0.55, -pr * 0.14, pr, 0);
        ctx.quadraticCurveTo(pr * 0.55, pr * 0.14, 0, pr * 0.11);
        ctx.closePath();

        const pg = ctx.createLinearGradient(0, 0, pr, 0);
        pg.addColorStop(0, '#0f8c46');
        pg.addColorStop(0.5, '#29e872');
        pg.addColorStop(1, '#b8ff78');
        ctx.fillStyle = pg;
        ctx.fill();

        ctx.restore();
      }

      // Bright luminous pale-mint mouth dot
      ctx.beginPath();
      ctx.arc(0, 0, pr * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = '#e8fff0';
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  },

  /**
   * 15. Tube Sponge: Cluster of sculpted golden-violet cylindrical sea sponge tubes with dark inner openings.
   */
  tubespongeflora(ctx, r, t = 0) {
    ctx.save();
    const sway = Math.sin(t * 1.1) * 0.015;
    ctx.rotate(sway);

    // Soft reef mound shadow beneath the cluster
    ctx.beginPath();
    ctx.arc(r * 0.06, r * 0.08, r * 0.94, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(14, 8, 26, 0.38)';
    ctx.fill();

    // 7 sculpted cylindrical tubes arranged back-to-front (outer smaller tubes first, tall hero tubes last)
    const tubes = [
      { bx: -0.34, by: -0.26, tx: -0.52, ty: -0.44, rad: 0.25 },
      { bx: 0.32, by: -0.28, tx: 0.50, ty: -0.46, rad: 0.24 },
      { bx: -0.40, by: 0.18, tx: -0.58, ty: 0.26, rad: 0.23 },
      { bx: 0.38, by: 0.22, tx: 0.54, ty: 0.34, rad: 0.26 },
      { bx: -0.06, by: 0.34, tx: -0.10, ty: 0.52, rad: 0.27 },
      { bx: 0.14, by: -0.04, tx: 0.22, ty: -0.08, rad: 0.31 },
      { bx: -0.14, by: -0.06, tx: -0.20, ty: -0.10, rad: 0.34 }, // Hero tube
    ];

    for (const tb of tubes) {
      const bx = tb.bx * r, by = tb.by * r;
      const tx = tb.tx * r, ty = tb.ty * r;
      const rad = tb.rad * r;
      const dx = tx - bx, dy = ty - by;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = -dy / dist, ny = dx / dist;

      // Sculpted outer barrel wall connecting base to rim
      ctx.beginPath();
      ctx.moveTo(bx + nx * rad * 0.88, by + ny * rad * 0.88);
      ctx.lineTo(tx + nx * rad, ty + ny * rad);
      ctx.arc(tx, ty, rad, Math.atan2(ny, nx), Math.atan2(-ny, -nx), false);
      ctx.lineTo(bx - nx * rad * 0.88, by - ny * rad * 0.88);
      ctx.arc(bx, by, rad * 0.88, Math.atan2(-ny, -nx), Math.atan2(ny, nx), false);
      ctx.closePath();

      const wallG = ctx.createLinearGradient(
        tx - rad, ty - rad,
        bx + rad, by + rad
      );
      wallG.addColorStop(0, '#f5c256');
      wallG.addColorStop(0.38, '#d47b5a');
      wallG.addColorStop(0.72, '#8b3e82');
      wallG.addColorStop(1, '#441d54');
      ctx.fillStyle = wallG;
      ctx.fill();

      // Subtle sculpted longitudinal sponge ribs on outer barrel
      ctx.strokeStyle = 'rgba(255, 226, 150, 0.25)';
      ctx.lineWidth = Math.max(0.8, r * 0.015);
      for (const offset of [-0.45, 0, 0.45]) {
        ctx.beginPath();
        ctx.moveTo(bx + nx * rad * offset, by + ny * rad * offset);
        ctx.lineTo(tx + nx * rad * offset, ty + ny * rad * offset);
        ctx.stroke();
      }

      // Thick sculpted golden-violet rim lip
      const rimG = ctx.createRadialGradient(tx - rad * 0.28, ty - rad * 0.28, rad * 0.15, tx, ty, rad);
      rimG.addColorStop(0, '#ffe394');
      rimG.addColorStop(0.55, '#e08e52');
      rimG.addColorStop(0.85, '#964288');
      rimG.addColorStop(1, '#582266');
      ctx.beginPath();
      ctx.arc(tx, ty, rad, 0, Math.PI * 2);
      ctx.fillStyle = rimG;
      ctx.fill();

      // Porous sunlit rim edge highlight
      ctx.beginPath();
      ctx.arc(tx, ty, rad * 0.94, -Math.PI * 0.9, -Math.PI * 0.1);
      ctx.strokeStyle = 'rgba(255, 244, 198, 0.65)';
      ctx.lineWidth = Math.max(1.1, r * 0.024);
      ctx.lineCap = 'round';
      ctx.stroke();

      // Deep dark inner osculum opening
      const holeR = rad * 0.56;
      const holeG = ctx.createRadialGradient(tx + holeR * 0.18, ty + holeR * 0.18, holeR * 0.1, tx, ty, holeR);
      holeG.addColorStop(0, '#0d0618');
      holeG.addColorStop(0.68, '#241038');
      holeG.addColorStop(1, '#5c2666');
      ctx.beginPath();
      ctx.arc(tx, ty, holeR, 0, Math.PI * 2);
      ctx.fillStyle = holeG;
      ctx.fill();

      // Inner rim bevel shadow
      ctx.strokeStyle = 'rgba(255, 210, 145, 0.32)';
      ctx.lineWidth = Math.max(0.7, r * 0.014);
      ctx.stroke();
    }

    ctx.restore();
  },
};

  return module.exports;
})();

const PAINTED_RO_PACK = (() => {
  const module = { exports: {} };
  const exports = module.exports;
'use strict';

/**
 * Handcrafted top-down 2D Canvas painted art library:
 *   - 16 unique Rock & Pebble illustrations (`rocks`)
 *   - 16 unique Sunken Object & Relic illustrations (`objects`)
 *
 * Coordinate contract:
 *   `ctx` is already translated to (0, 0) and rotated.
 *   `r` is the base radius (~32px for rocks, ~48px for objects).
 *   All rendering is deterministic (no Math.random) and state-isolated (save/restore).
 */

function roundRectPath(ctx, x, y, w, h, rad) {
  const rr = Math.min(rad, Math.abs(w) * 0.5, Math.abs(h) * 0.5);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function polyPath(ctx, pts, r) {
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) {
    const x = pts[i][0] * r;
    const y = pts[i][1] * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function smoothPolyPath(ctx, pts, r) {
  const n = pts.length;
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % n];
    const mx = ((p0[0] + p1[0]) * 0.5) * r;
    const my = ((p0[1] + p1[1]) * 0.5) * r;
    if (i === 0) {
      const prev = pts[n - 1];
      ctx.moveTo(((prev[0] + p0[0]) * 0.5) * r, ((prev[1] + p0[1]) * 0.5) * r);
    }
    ctx.quadraticCurveTo(p0[0] * r, p0[1] * r, mx, my);
  }
  ctx.closePath();
}

function drawSparkle(ctx, x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color || '#fffbe0';
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2;
    const aMid = a + Math.PI / 4;
    if (i === 0) ctx.moveTo(Math.cos(a) * size, Math.sin(a) * size);
    else ctx.lineTo(Math.cos(a) * size, Math.sin(a) * size);
    ctx.lineTo(Math.cos(aMid) * size * 0.24, Math.sin(aMid) * size * 0.24);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function hexPath(ctx, cx, cy, rad, rot) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = rot + (i * Math.PI) / 3;
    const x = cx + Math.cos(a) * rad;
    const y = cy + Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

const rocks = {
  /**
   * 1. basaltcolumnrock — Hexagonal clustered dark columns
   */
  basaltcolumnrock(ctx, r = 32) {
    ctx.save();

    // Soft seabed contact shadow
    ctx.fillStyle = 'rgba(10, 18, 26, 0.38)';
    ctx.beginPath();
    ctx.ellipse(r * 0.1, r * 0.14, r * 0.96, r * 0.84, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Clustered hexagonal columns sorted back-to-front by height (h)
    const cols = [
      { x: -0.44, y: -0.34, rad: 0.34, h: 0.22, rot: 0.15, top: '#3c4552', side: '#1f252e' },
      { x: 0.34, y: -0.42, rad: 0.32, h: 0.28, rot: 0.12, top: '#434d5b', side: '#222933' },
      { x: 0.52, y: 0.14, rad: 0.34, h: 0.18, rot: 0.18, top: '#353e4a', side: '#1a2028' },
      { x: -0.52, y: 0.24, rad: 0.33, h: 0.16, rot: 0.14, top: '#37404c', side: '#1b212a' },
      { x: 0.04, y: 0.44, rad: 0.36, h: 0.26, rot: 0.16, top: '#465160', side: '#232a35' },
      { x: -0.14, y: -0.06, rad: 0.40, h: 0.38, rot: 0.15, top: '#536071', side: '#29313d' },
      { x: 0.26, y: -0.04, rad: 0.35, h: 0.32, rot: 0.15, top: '#4b5768', side: '#252c38' }
    ];

    for (const c of cols) {
      const cx = c.x * r;
      const cy = c.y * r;
      const cr = c.rad * r;
      const drop = c.h * r;

      // Extruded column walls (shifted down-right to show elevation)
      const dx = drop * 0.32;
      const dy = drop * 0.55;
      ctx.fillStyle = c.side;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a1 = c.rot + (i * Math.PI) / 3;
        const a2 = c.rot + ((i + 1) * Math.PI) / 3;
        const x1 = cx + Math.cos(a1) * cr;
        const y1 = cy + Math.sin(a1) * cr;
        const x2 = cx + Math.cos(a2) * cr;
        const y2 = cy + Math.sin(a2) * cr;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2 + dx, y2 + dy);
        ctx.lineTo(x1 + dx, y1 + dy);
        ctx.closePath();
      }
      ctx.fill();
      ctx.strokeStyle = 'rgba(12, 16, 22, 0.7)';
      ctx.lineWidth = Math.max(0.8, r * 0.03);
      ctx.stroke();

      // Hexagonal top cap with directional mineral gradient
      const g = ctx.createLinearGradient(cx - cr, cy - cr, cx + cr, cy + cr);
      g.addColorStop(0, '#6a788b');
      g.addColorStop(0.45, c.top);
      g.addColorStop(1, '#262d38');
      hexPath(ctx, cx, cy, cr, c.rot);
      ctx.fillStyle = g;
      ctx.fill();

      // Inner bevel highlight on upper-left edges
      ctx.strokeStyle = 'rgba(190, 212, 232, 0.38)';
      ctx.lineWidth = Math.max(0.8, r * 0.035);
      ctx.beginPath();
      for (let i = 2; i <= 5; i++) {
        const a = c.rot + (i * Math.PI) / 3;
        const px = cx + Math.cos(a) * cr * 0.88;
        const py = cy + Math.sin(a) * cr * 0.88;
        if (i === 2) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Crisp dark basalt rim
      hexPath(ctx, cx, cy, cr, c.rot);
      ctx.strokeStyle = 'rgba(15, 20, 28, 0.85)';
      ctx.lineWidth = Math.max(1, r * 0.04);
      ctx.stroke();

      // Subtle pale sea-lichen fleck on taller caps
      if (c.h > 0.25) {
        ctx.fillStyle = 'rgba(164, 186, 168, 0.35)';
        ctx.beginPath();
        ctx.ellipse(cx - cr * 0.22, cy - cr * 0.14, cr * 0.22, cr * 0.13, -0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  },

  /**
   * 2. coralrubblepebble — Pale pinkish coral fragments
   */
  coralrubblepebble(ctx, r = 32) {
    ctx.save();

    // Soft sand shadow
    ctx.fillStyle = 'rgba(38, 28, 32, 0.26)';
    ctx.beginPath();
    ctx.ellipse(r * 0.06, r * 0.12, r * 0.94, r * 0.78, -0.15, 0, Math.PI * 2);
    ctx.fill();

    // Branchy broken coral fragments
    const shards = [
      {
        pts: [[-0.78, -0.18], [-0.42, -0.58], [-0.08, -0.42], [-0.22, -0.12], [0.02, 0.12], [-0.36, 0.26], [-0.72, 0.14]],
        c0: '#fde8e2', c1: '#e6a59e', c2: '#b66e6c'
      },
      {
        pts: [[0.06, -0.64], [0.56, -0.52], [0.76, -0.12], [0.42, 0.08], [0.16, -0.16], [-0.04, -0.34]],
        c0: '#fff0ea', c1: '#efb6ac', c2: '#bf7974'
      },
      {
        pts: [[-0.24, 0.14], [0.22, 0.02], [0.68, 0.24], [0.54, 0.64], [0.08, 0.74], [-0.38, 0.56]],
        c0: '#fce3dc', c1: '#e29d98', c2: '#ad6566'
      },
      {
        pts: [[-0.64, 0.34], [-0.36, 0.28], [-0.28, 0.62], [-0.58, 0.66]],
        c0: '#f7dad2', c1: '#d8948e', c2: '#9e5d5e'
      }
    ];

    for (const s of shards) {
      // Individual fragment cast shadow
      ctx.save();
      ctx.translate(r * 0.05, r * 0.07);
      smoothPolyPath(ctx, s.pts, r);
      ctx.fillStyle = 'rgba(40, 22, 26, 0.24)';
      ctx.fill();
      ctx.restore();

      const g = ctx.createRadialGradient(-r * 0.25, -r * 0.25, r * 0.08, 0, 0, r * 0.95);
      g.addColorStop(0, s.c0);
      g.addColorStop(0.55, s.c1);
      g.addColorStop(1, s.c2);
      smoothPolyPath(ctx, s.pts, r);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = 'rgba(118, 62, 62, 0.65)';
      ctx.lineWidth = Math.max(0.9, r * 0.035);
      ctx.stroke();
    }

    // Porous corallite pinholes & bleached calcium ridges
    const pores = [
      [-0.52, -0.22], [-0.34, -0.38], [-0.46, 0.02], [-0.22, -0.28],
      [0.24, -0.44], [0.46, -0.32], [0.56, -0.14], [0.28, -0.22],
      [-0.08, 0.34], [0.16, 0.26], [0.42, 0.38], [0.24, 0.52], [-0.18, 0.52],
      [-0.48, 0.48]
    ];
    for (let i = 0; i < pores.length; i++) {
      const px = pores[i][0] * r;
      const py = pores[i][1] * r;
      const pr = r * (0.042 + (i % 3) * 0.012);
      ctx.fillStyle = 'rgba(138, 72, 74, 0.55)';
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 245, 240, 0.65)';
      ctx.lineWidth = Math.max(0.6, r * 0.02);
      ctx.beginPath();
      ctx.arc(px - pr * 0.25, py - pr * 0.25, pr * 0.85, Math.PI * 0.9, Math.PI * 1.85);
      ctx.stroke();
    }

    // Tiny pale pink coral twigs
    ctx.strokeStyle = '#f8d2c8';
    ctx.lineWidth = Math.max(1.2, r * 0.055);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-0.12 * r, -0.05 * r);
    ctx.lineTo(0.06 * r, -0.24 * r);
    ctx.moveTo(0.06 * r, -0.24 * r);
    ctx.lineTo(0.2 * r, -0.32 * r);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 3. crystalgeoderock — Split dark rock revealing glowing cyan crystal prisms
   */
  crystalgeoderock(ctx, r = 32) {
    ctx.save();

    // Contact shadow + subtle cyan bioluminescent bounce
    ctx.fillStyle = 'rgba(8, 16, 26, 0.42)';
    ctx.beginPath();
    ctx.ellipse(r * 0.08, r * 0.14, r * 0.98, r * 0.84, -0.12, 0, Math.PI * 2);
    ctx.fill();

    // Rough outer volcanic rind
    const outer = [
      [-0.86, -0.22], [-0.62, -0.74], [-0.08, -0.86], [0.56, -0.70],
      [0.88, -0.18], [0.78, 0.48], [0.28, 0.84], [-0.42, 0.78], [-0.84, 0.36]
    ];
    const outerGrad = ctx.createRadialGradient(-r * 0.25, -r * 0.3, r * 0.1, 0, 0, r);
    outerGrad.addColorStop(0, '#4f5a6a');
    outerGrad.addColorStop(0.6, '#2b323f');
    outerGrad.addColorStop(1, '#161b24');
    polyPath(ctx, outer, r);
    ctx.fillStyle = outerGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(10, 14, 20, 0.9)';
    ctx.lineWidth = Math.max(1.2, r * 0.045);
    ctx.stroke();

    // Milky white chalcedony agate band lining the split cavity
    const band = [
      [-0.64, -0.16], [-0.44, -0.56], [0.02, -0.62], [0.48, -0.44],
      [0.66, -0.06], [0.54, 0.38], [0.14, 0.60], [-0.36, 0.52], [-0.62, 0.22]
    ];
    smoothPolyPath(ctx, band, r);
    ctx.fillStyle = '#c8dce6';
    ctx.fill();
    ctx.strokeStyle = '#6f8ea0';
    ctx.lineWidth = Math.max(1, r * 0.04);
    ctx.stroke();

    // Deep cavity interior with cyan glow
    const inner = [
      [-0.50, -0.12], [-0.32, -0.44], [0.06, -0.48], [0.40, -0.32],
      [0.52, -0.02], [0.42, 0.28], [0.10, 0.46], [-0.28, 0.40], [-0.48, 0.16]
    ];
    const glowGrad = ctx.createRadialGradient(0, 0, r * 0.05, 0, 0, r * 0.56);
    glowGrad.addColorStop(0, '#9bfbff');
    glowGrad.addColorStop(0.5, '#19a7c7');
    glowGrad.addColorStop(1, '#0c3e59');
    smoothPolyPath(ctx, inner, r);
    ctx.fillStyle = glowGrad;
    ctx.fill();

    // Radiating faceted cyan crystal prisms
    const prisms = [
      { ang: -2.4, len: 0.56, w: 0.19, cA: '#b8ffff', cB: '#1696b8' },
      { ang: -1.65, len: 0.64, w: 0.22, cA: '#d9ffff', cB: '#22b7d9' },
      { ang: -0.85, len: 0.58, w: 0.20, cA: '#9ef6ff', cB: '#1588ab' },
      { ang: -0.15, len: 0.60, w: 0.21, cA: '#c6ffff', cB: '#1da9cc' },
      { ang: 0.65, len: 0.52, w: 0.19, cA: '#8ceeff', cB: '#11799c' },
      { ang: 1.5, len: 0.56, w: 0.20, cA: '#aefaff', cB: '#1893b5' },
      { ang: 2.35, len: 0.50, w: 0.18, cA: '#92f2ff', cB: '#1482a6' }
    ];

    for (const p of prisms) {
      ctx.save();
      ctx.rotate(p.ang);
      const L = p.len * r;
      const W = p.w * r;
      // Left lit facet
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(L * 0.72, -W * 0.52);
      ctx.lineTo(L, 0);
      ctx.closePath();
      ctx.fillStyle = p.cA;
      ctx.fill();
      // Right shaded facet
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(L, 0);
      ctx.lineTo(L * 0.72, W * 0.52);
      ctx.closePath();
      ctx.fillStyle = p.cB;
      ctx.fill();
      // Crisp crystal ridge
      ctx.strokeStyle = 'rgba(235, 255, 255, 0.85)';
      ctx.lineWidth = Math.max(0.7, r * 0.025);
      ctx.beginPath();
      ctx.moveTo(L * 0.12, 0);
      ctx.lineTo(L, 0);
      ctx.stroke();
      ctx.restore();
    }

    // Bright center sparkle
    drawSparkle(ctx, -r * 0.04, -r * 0.06, r * 0.22, '#ffffff');
    drawSparkle(ctx, r * 0.24, -r * 0.18, r * 0.12, '#d6ffff');

    ctx.restore();
  },

  /**
   * 4. graniteboulder — Speckled grey-white boulder
   */
  graniteboulder(ctx, r = 32) {
    ctx.save();

    // Soft ambient shadow
    ctx.fillStyle = 'rgba(18, 24, 30, 0.36)';
    ctx.beginPath();
    ctx.ellipse(r * 0.1, r * 0.15, r * 0.94, r * 0.80, 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Heavy rounded-angular granite silhouette
    const pts = [
      [-0.86, -0.14], [-0.66, -0.68], [-0.10, -0.86], [0.54, -0.72],
      [0.88, -0.22], [0.84, 0.36], [0.38, 0.78], [-0.26, 0.82], [-0.78, 0.44]
    ];
    smoothPolyPath(ctx, pts, r);
    const g = ctx.createRadialGradient(-r * 0.32, -r * 0.32, r * 0.08, r * 0.08, r * 0.1, r * 1.05);
    g.addColorStop(0, '#eef1f4');
    g.addColorStop(0.45, '#bfc6ce');
    g.addColorStop(0.82, '#7d8690');
    g.addColorStop(1, '#4b535c');
    ctx.fillStyle = g;
    ctx.fill();

    // Clip interior for mineral speckles and facets
    ctx.save();
    ctx.clip();

    // Subtle broad granite cleavage planes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.26, -r * 0.32, r * 0.42, r * 0.26, -0.45, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(42, 48, 56, 0.22)';
    ctx.beginPath();
    ctx.ellipse(r * 0.36, r * 0.38, r * 0.48, r * 0.28, -0.35, 0, Math.PI * 2);
    ctx.fill();

    // Deterministic biotite (black), quartz (white), and pale rose feldspar speckles
    const colors = ['#2b3036', '#ffffff', '#535b64', '#dfd2cc', '#394048', '#f5f7fa'];
    for (let i = 0; i < 68; i++) {
      const a = i * 2.39996;
      const d = Math.sqrt((i + 0.5) / 68) * 0.82;
      const sx = Math.cos(a) * d * r;
      const sy = Math.sin(a) * d * r;
      const sr = r * (0.024 + (i % 4) * 0.011);
      ctx.fillStyle = colors[i % colors.length];
      ctx.globalAlpha = 0.55 + (i % 3) * 0.14;
      ctx.beginPath();
      ctx.ellipse(sx, sy, sr, sr * 0.72, a, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Natural hairline granite fissure
    ctx.strokeStyle = 'rgba(42, 48, 56, 0.55)';
    ctx.lineWidth = Math.max(0.9, r * 0.032);
    ctx.beginPath();
    ctx.moveTo(-0.46 * r, 0.14 * r);
    ctx.lineTo(-0.08 * r, 0.02 * r);
    ctx.lineTo(0.28 * r, 0.22 * r);
    ctx.lineTo(0.56 * r, 0.10 * r);
    ctx.stroke();

    ctx.restore();

    // Crisp outer outline
    smoothPolyPath(ctx, pts, r);
    ctx.strokeStyle = 'rgba(45, 52, 60, 0.78)';
    ctx.lineWidth = Math.max(1.1, r * 0.042);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 5. lavarock — Pitted charcoal volcanic rock with faint ember fissures
   */
  lavarock(ctx, r = 32) {
    ctx.save();

    // Dark shadow with faint warm ember underglow
    ctx.fillStyle = 'rgba(18, 10, 10, 0.44)';
    ctx.beginPath();
    ctx.ellipse(r * 0.08, r * 0.14, r * 0.96, r * 0.84, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Craggy jagged volcanic silhouette
    const pts = [
      [-0.90, -0.10], [-0.74, -0.58], [-0.30, -0.84], [0.18, -0.78],
      [0.64, -0.66], [0.90, -0.16], [0.76, 0.42], [0.42, 0.78],
      [-0.14, 0.86], [-0.66, 0.62], [-0.88, 0.24]
    ];
    polyPath(ctx, pts, r);
    const g = ctx.createRadialGradient(-r * 0.28, -r * 0.28, r * 0.08, 0, 0, r * 1.02);
    g.addColorStop(0, '#4a4548');
    g.addColorStop(0.5, '#2b272a');
    g.addColorStop(1, '#151215');
    ctx.fillStyle = g;
    ctx.fill();

    ctx.save();
    ctx.clip();

    // Branching ember fissures (soft orange halo + bright molten core)
    const drawFissures = () => {
      ctx.beginPath();
      ctx.moveTo(-0.56 * r, -0.14 * r);
      ctx.lineTo(-0.18 * r, -0.04 * r);
      ctx.lineTo(0.16 * r, -0.22 * r);
      ctx.lineTo(0.54 * r, -0.06 * r);
      ctx.moveTo(-0.18 * r, -0.04 * r);
      ctx.lineTo(0.04 * r, 0.34 * r);
      ctx.lineTo(0.34 * r, 0.56 * r);
      ctx.moveTo(0.04 * r, 0.34 * r);
      ctx.lineTo(-0.34 * r, 0.48 * r);
    };

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    drawFissures();
    ctx.strokeStyle = 'rgba(255, 86, 20, 0.38)';
    ctx.lineWidth = Math.max(3.2, r * 0.14);
    ctx.stroke();

    drawFissures();
    ctx.strokeStyle = '#ff6a1a';
    ctx.lineWidth = Math.max(1.5, r * 0.06);
    ctx.stroke();

    drawFissures();
    ctx.strokeStyle = '#ffd666';
    ctx.lineWidth = Math.max(0.7, r * 0.026);
    ctx.stroke();

    // Porous volcanic scoria pits
    const pits = [
      [-0.46, -0.44, 0.11], [-0.08, -0.52, 0.09], [0.42, -0.42, 0.12],
      [-0.58, 0.22, 0.10], [0.52, 0.24, 0.11], [-0.14, 0.62, 0.09],
      [0.24, 0.08, 0.08], [-0.34, 0.16, 0.07], [0.16, -0.48, 0.07]
    ];
    for (const [px, py, pr] of pits) {
      ctx.fillStyle = '#0d0b0d';
      ctx.beginPath();
      ctx.ellipse(px * r, py * r, pr * r, pr * r * 0.78, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(118, 108, 112, 0.42)';
      ctx.lineWidth = Math.max(0.7, r * 0.025);
      ctx.beginPath();
      ctx.arc(px * r, py * r, pr * r * 0.92, 0.2, 2.2);
      ctx.stroke();
    }

    ctx.restore();

    polyPath(ctx, pts, r);
    ctx.strokeStyle = 'rgba(10, 8, 10, 0.9)';
    ctx.lineWidth = Math.max(1.1, r * 0.042);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 6. limestonerock — Layered pale cream eroded limestone
   */
  limestonerock(ctx, r = 32) {
    ctx.save();

    // Soft shadow
    ctx.fillStyle = 'rgba(42, 36, 26, 0.30)';
    ctx.beginPath();
    ctx.ellipse(r * 0.08, r * 0.14, r * 0.96, r * 0.78, -0.08, 0, Math.PI * 2);
    ctx.fill();

    // 3 terraced sedimentary strata layers
    const layers = [
      {
        pts: [[-0.90, 0.06], [-0.74, -0.46], [-0.16, -0.74], [0.56, -0.62], [0.90, -0.06], [0.76, 0.56], [0.12, 0.76], [-0.58, 0.64]],
        c0: '#efe6d0', c1: '#cbbca0', stroke: '#8c7e65'
      },
      {
        pts: [[-0.72, -0.04], [-0.52, -0.48], [0.06, -0.60], [0.62, -0.36], [0.68, 0.16], [0.22, 0.46], [-0.42, 0.40]],
        c0: '#faf4e6', c1: '#dcd0b6', stroke: '#9b8d72'
      },
      {
        pts: [[-0.46, -0.14], [-0.22, -0.44], [0.28, -0.38], [0.42, -0.02], [0.12, 0.22], [-0.32, 0.16]],
        c0: '#fffcf4', c1: '#ebe1cb', stroke: '#a89b80'
      }
    ];

    for (let i = 0; i < layers.length; i++) {
      const L = layers[i];
      if (i > 0) {
        ctx.save();
        ctx.translate(r * 0.04, r * 0.06);
        smoothPolyPath(ctx, L.pts, r);
        ctx.fillStyle = 'rgba(72, 60, 42, 0.24)';
        ctx.fill();
        ctx.restore();
      }
      const g = ctx.createLinearGradient(-r * 0.7, -r * 0.6, r * 0.7, r * 0.6);
      g.addColorStop(0, L.c0);
      g.addColorStop(1, L.c1);
      smoothPolyPath(ctx, L.pts, r);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = L.stroke;
      ctx.lineWidth = Math.max(0.9, r * 0.034);
      ctx.stroke();
    }

    // Eroded karst pits
    const hollows = [[-0.56, 0.26, 0.09], [0.46, 0.34, 0.10], [-0.14, -0.16, 0.07], [0.18, -0.20, 0.06]];
    for (const [hx, hy, hr] of hollows) {
      ctx.fillStyle = 'rgba(138, 122, 96, 0.45)';
      ctx.beginPath();
      ctx.ellipse(hx * r, hy * r, hr * r, hr * r * 0.65, -0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Tiny embedded ammonite fossil spiral on upper terrace
    ctx.strokeStyle = 'rgba(128, 114, 88, 0.65)';
    ctx.lineWidth = Math.max(0.8, r * 0.028);
    ctx.beginPath();
    for (let t = 0; t < 18; t++) {
      const a = t * 0.55;
      const rad = t * r * 0.0085;
      const x = r * 0.04 + Math.cos(a) * rad;
      const y = -r * 0.06 + Math.sin(a) * rad;
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 7. marbleboulder — Creamy white stone with grey-gold marble veins
   */
  marbleboulder(ctx, r = 32) {
    ctx.save();

    // Soft cool shadow
    ctx.fillStyle = 'rgba(26, 30, 38, 0.30)';
    ctx.beginPath();
    ctx.ellipse(r * 0.09, r * 0.14, r * 0.92, r * 0.80, 0.18, 0, Math.PI * 2);
    ctx.fill();

    const pts = [
      [-0.84, -0.10], [-0.62, -0.66], [-0.04, -0.84], [0.58, -0.66],
      [0.86, -0.14], [0.76, 0.46], [0.24, 0.80], [-0.38, 0.76], [-0.80, 0.36]
    ];
    smoothPolyPath(ctx, pts, r);
    const g = ctx.createRadialGradient(-r * 0.30, -r * 0.32, r * 0.08, r * 0.12, r * 0.14, r * 1.05);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(0.5, '#f4efe6');
    g.addColorStop(0.85, '#d8d2c7');
    g.addColorStop(1, '#a9a297');
    ctx.fillStyle = g;
    ctx.fill();

    ctx.save();
    ctx.clip();

    // Flowing translucent grey marble veins
    ctx.lineCap = 'round';
    const greyVeins = [
      [[-0.9, -0.32], [-0.35, -0.18], [0.14, -0.44], [0.85, -0.22]],
      [[-0.78, 0.24], [-0.22, 0.06], [0.26, 0.32], [0.86, 0.18]],
      [[-0.25, -0.85], [-0.06, -0.22], [0.18, 0.24], [0.06, 0.86]]
    ];
    for (const v of greyVeins) {
      ctx.beginPath();
      ctx.moveTo(v[0][0] * r, v[0][1] * r);
      ctx.bezierCurveTo(v[1][0] * r, v[1][1] * r, v[2][0] * r, v[2][1] * r, v[3][0] * r, v[3][1] * r);
      ctx.strokeStyle = 'rgba(132, 138, 148, 0.34)';
      ctx.lineWidth = Math.max(2.0, r * 0.09);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(98, 104, 114, 0.52)';
      ctx.lineWidth = Math.max(0.8, r * 0.032);
      ctx.stroke();
    }

    // Delicate warm gold mineral veins
    ctx.beginPath();
    ctx.moveTo(-0.68 * r, -0.12 * r);
    ctx.bezierCurveTo(-0.22 * r, -0.34 * r, 0.12 * r, 0.12 * r, 0.74 * r, -0.06 * r);
    ctx.strokeStyle = 'rgba(204, 162, 74, 0.65)';
    ctx.lineWidth = Math.max(1.0, r * 0.038);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-0.18 * r, 0.16 * r);
    ctx.quadraticCurveTo(0.16 * r, 0.42 * r, 0.56 * r, 0.52 * r);
    ctx.strokeStyle = 'rgba(214, 174, 86, 0.55)';
    ctx.lineWidth = Math.max(0.8, r * 0.028);
    ctx.stroke();

    // Satin specular highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.52)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.28, -r * 0.36, r * 0.32, r * 0.16, -0.45, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    smoothPolyPath(ctx, pts, r);
    ctx.strokeStyle = 'rgba(116, 110, 102, 0.68)';
    ctx.lineWidth = Math.max(1.0, r * 0.038);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 8. megalithboulder — Ancient carved mossy standing stone
   */
  megalithboulder(ctx, r = 32) {
    ctx.save();

    // Long cast shadow from standing/leaning monolith
    ctx.fillStyle = 'rgba(14, 22, 20, 0.42)';
    ctx.beginPath();
    ctx.ellipse(r * 0.18, r * 0.22, r * 0.92, r * 0.70, 0.32, 0, Math.PI * 2);
    ctx.fill();

    // Bevelled ancient stone slab
    const slab = [
      [-0.64, -0.78], [0.16, -0.88], [0.68, -0.52],
      [0.72, 0.54], [0.12, 0.86], [-0.58, 0.72], [-0.76, 0.04]
    ];
    polyPath(ctx, slab, r);
    const g = ctx.createLinearGradient(-r * 0.7, -r * 0.8, r * 0.7, r * 0.8);
    g.addColorStop(0, '#8e968e');
    g.addColorStop(0.5, '#646d67');
    g.addColorStop(1, '#3b4340');
    ctx.fillStyle = g;
    ctx.fill();

    // Raised inner carved face
    const face = [
      [-0.48, -0.60], [0.12, -0.68], [0.50, -0.38],
      [0.52, 0.40], [0.08, 0.66], [-0.44, 0.54], [-0.56, 0.02]
    ];
    polyPath(ctx, face, r);
    const fg = ctx.createLinearGradient(-r * 0.5, -r * 0.6, r * 0.5, r * 0.6);
    fg.addColorStop(0, '#a4aca2');
    fg.addColorStop(1, '#5d6660');
    ctx.fillStyle = fg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(38, 46, 42, 0.55)';
    ctx.lineWidth = Math.max(0.9, r * 0.032);
    ctx.stroke();

    // Recessed ancient Celtic/aquatic rune spiral & geometric chevron carvings
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const drawCarving = (ox, oy, col, lw) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = lw;
      // Spiral emblem
      ctx.beginPath();
      for (let t = 0; t < 20; t++) {
        const a = t * 0.55;
        const rad = t * r * 0.011;
        const x = ox + Math.cos(a) * rad;
        const y = oy - r * 0.16 + Math.sin(a) * rad;
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // Lower rune diamond & vertical staff
      ctx.beginPath();
      ctx.moveTo(ox, oy + r * 0.10);
      ctx.lineTo(ox, oy + r * 0.50);
      ctx.moveTo(ox - r * 0.22, oy + r * 0.28);
      ctx.lineTo(ox, oy + r * 0.14);
      ctx.lineTo(ox + r * 0.22, oy + r * 0.28);
      ctx.lineTo(ox, oy + r * 0.42);
      ctx.closePath();
      ctx.stroke();
    };
    // Highlighted lower edge of carved groove + dark recessed groove
    drawCarving(r * 0.02, r * 0.02, 'rgba(218, 226, 214, 0.5)', Math.max(1.2, r * 0.045));
    drawCarving(0, 0, 'rgba(28, 36, 32, 0.85)', Math.max(1.2, r * 0.045));

    // Creeping velvety moss patches along weathered edges
    const mossPatches = [
      [-0.52, -0.44, 0.24, 0.16, -0.4],
      [-0.36, -0.58, 0.18, 0.12, 0.2],
      [0.44, 0.36, 0.24, 0.18, 0.5],
      [0.24, 0.54, 0.20, 0.13, -0.2]
    ];
    for (const [mx, my, rx, ry, rot] of mossPatches) {
      ctx.fillStyle = '#4e7d3c';
      ctx.beginPath();
      ctx.ellipse(mx * r, my * r, rx * r, ry * r, rot, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#84b856';
      ctx.beginPath();
      ctx.ellipse((mx - 0.04) * r, (my - 0.03) * r, rx * r * 0.62, ry * r * 0.55, rot, 0, Math.PI * 2);
      ctx.fill();
    }

    polyPath(ctx, slab, r);
    ctx.strokeStyle = 'rgba(24, 30, 28, 0.82)';
    ctx.lineWidth = Math.max(1.1, r * 0.042);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 9. mossyrock — River stone draped in lush velvety green moss
   */
  mossyrock(ctx, r = 32) {
    ctx.save();

    // Soft pond-bed shadow
    ctx.fillStyle = 'rgba(14, 28, 18, 0.36)';
    ctx.beginPath();
    ctx.ellipse(r * 0.09, r * 0.14, r * 0.96, r * 0.82, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Smooth wet dark-slate river stone base
    const stonePts = [
      [-0.88, -0.06], [-0.66, -0.64], [-0.04, -0.82], [0.62, -0.64],
      [0.90, -0.08], [0.76, 0.54], [0.14, 0.80], [-0.52, 0.68]
    ];
    smoothPolyPath(ctx, stonePts, r);
    const sg = ctx.createRadialGradient(-r * 0.24, -r * 0.24, r * 0.1, r * 0.1, r * 0.12, r * 1.02);
    sg.addColorStop(0, '#7c837c');
    sg.addColorStop(0.55, '#525954');
    sg.addColorStop(1, '#2f3532');
    ctx.fillStyle = sg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(24, 30, 26, 0.82)';
    ctx.lineWidth = Math.max(1.1, r * 0.042);
    ctx.stroke();

    // Draped plush moss cushion (scalloped multi-lobe organic shape)
    const mossPts = [
      [-0.74, -0.22], [-0.56, -0.60], [-0.08, -0.72], [0.44, -0.54],
      [0.64, -0.14], [0.40, 0.24], [0.06, 0.12], [-0.18, 0.42],
      [-0.58, 0.32]
    ];
    // Moss drop shadow onto stone
    ctx.save();
    ctx.translate(r * 0.04, r * 0.06);
    smoothPolyPath(ctx, mossPts, r);
    ctx.fillStyle = 'rgba(18, 36, 16, 0.42)';
    ctx.fill();
    ctx.restore();

    const mg = ctx.createRadialGradient(-r * 0.22, -r * 0.34, r * 0.08, 0, -r * 0.1, r * 0.88);
    mg.addColorStop(0, '#9bd654');
    mg.addColorStop(0.45, '#5da338');
    mg.addColorStop(0.85, '#346b24');
    mg.addColorStop(1, '#214817');
    smoothPolyPath(ctx, mossPts, r);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(28, 60, 20, 0.65)';
    ctx.lineWidth = Math.max(0.9, r * 0.032);
    ctx.stroke();

    // Velvety moss tufts & chartreuse highlight clusters
    const tufts = [
      [-0.38, -0.36, 0.18], [-0.06, -0.46, 0.20], [0.24, -0.32, 0.17],
      [-0.44, -0.04, 0.16], [-0.14, -0.12, 0.19], [0.28, -0.02, 0.15],
      [-0.34, 0.18, 0.14], [0.08, -0.22, 0.14]
    ];
    for (let i = 0; i < tufts.length; i++) {
      const [tx, ty, tr] = tufts[i];
      ctx.fillStyle = i % 2 === 0 ? 'rgba(168, 224, 92, 0.48)' : 'rgba(122, 188, 64, 0.45)';
      ctx.beginPath();
      ctx.arc(tx * r, ty * r, tr * r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(220, 248, 152, 0.52)';
      ctx.beginPath();
      ctx.arc((tx - 0.04) * r, (ty - 0.04) * r, tr * r * 0.42, 0, Math.PI * 2);
      ctx.fill();
    }

    // Wet sheen on exposed lower-right river stone
    ctx.fillStyle = 'rgba(220, 232, 228, 0.28)';
    ctx.beginPath();
    ctx.ellipse(r * 0.36, r * 0.46, r * 0.22, r * 0.09, -0.45, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },

  /**
   * 10. obsidianrock — Razor-faceted glossy black volcanic glass with purple sheen
   */
  obsidianrock(ctx, r = 32) {
    ctx.save();

    // Sharp shadow
    ctx.fillStyle = 'rgba(10, 8, 20, 0.44)';
    ctx.beginPath();
    ctx.ellipse(r * 0.09, r * 0.14, r * 0.94, r * 0.80, -0.18, 0, Math.PI * 2);
    ctx.fill();

    // Sharp polygonal obsidian facets meeting at an offset apex
    const apex = [-0.10, -0.14];
    const rim = [
      [-0.86, -0.20], [-0.46, -0.78], [0.22, -0.84], [0.78, -0.36],
      [0.86, 0.28], [0.34, 0.78], [-0.36, 0.82], [-0.82, 0.38]
    ];
    const facetColors = [
      ['#59427d', '#1c1529'],
      ['#7859a8', '#271d3a'],
      ['#3e2f5c', '#130e1c'],
      ['#261c38', '#0c0912'],
      ['#1a1326', '#08060c'],
      ['#2c2042', '#0f0b17'],
      ['#463466', '#181124'],
      ['#634a8c', '#201830']
    ];

    for (let i = 0; i < rim.length; i++) {
      const p1 = rim[i];
      const p2 = rim[(i + 1) % rim.length];
      const g = ctx.createLinearGradient(apex[0] * r, apex[1] * r, (p1[0] + p2[0]) * 0.5 * r, (p1[1] + p2[1]) * 0.5 * r);
      g.addColorStop(0, facetColors[i][0]);
      g.addColorStop(1, facetColors[i][1]);
      ctx.beginPath();
      ctx.moveTo(apex[0] * r, apex[1] * r);
      ctx.lineTo(p1[0] * r, p1[1] * r);
      ctx.lineTo(p2[0] * r, p2[1] * r);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = 'rgba(170, 140, 230, 0.28)';
      ctx.lineWidth = Math.max(0.7, r * 0.024);
      ctx.stroke();
    }

    // Razor-sharp glossy lavender-white specular reflections
    ctx.fillStyle = 'rgba(224, 206, 255, 0.65)';
    ctx.beginPath();
    ctx.moveTo(-0.10 * r, -0.14 * r);
    ctx.lineTo(-0.38 * r, -0.66 * r);
    ctx.lineTo(-0.14 * r, -0.68 * r);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(245, 238, 255, 0.88)';
    ctx.lineWidth = Math.max(1.0, r * 0.036);
    ctx.beginPath();
    ctx.moveTo(-0.76 * r, -0.18 * r);
    ctx.lineTo(-0.10 * r, -0.14 * r);
    ctx.lineTo(0.20 * r, -0.78 * r);
    ctx.stroke();

    // Outer jet-black crisp contour
    polyPath(ctx, rim, r);
    ctx.strokeStyle = 'rgba(8, 5, 14, 0.92)';
    ctx.lineWidth = Math.max(1.1, r * 0.042);
    ctx.stroke();

    drawSparkle(ctx, -r * 0.10, -r * 0.14, r * 0.16, '#f6ecff');

    ctx.restore();
  },

  /**
   * 11. quartzpebble — Translucent rose/milky quartz cluster
   */
  quartzpebble(ctx, r = 32) {
    ctx.save();

    // Soft rose-tinted shadow
    ctx.fillStyle = 'rgba(44, 24, 34, 0.28)';
    ctx.beginPath();
    ctx.ellipse(r * 0.07, r * 0.13, r * 0.92, r * 0.78, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Cluster of translucent rose & milky quartz pebbles/prisms
    const stones = [
      { cx: -0.34, cy: 0.24, rx: 0.44, ry: 0.34, rot: -0.35, c0: '#fff6f8', c1: '#f0b8c8', c2: '#b87288' },
      { cx: 0.38, cy: 0.18, rx: 0.42, ry: 0.32, rot: 0.42, c0: '#ffffff', c1: '#e6d8e2', c2: '#a68fa0' },
      { cx: 0.24, cy: -0.34, rx: 0.40, ry: 0.30, rot: -0.25, c0: '#fff2f6', c1: '#f5b0c4', c2: '#bf6f89' },
      { cx: -0.26, cy: -0.30, rx: 0.46, ry: 0.36, rot: 0.32, c0: '#ffffff', c1: '#f7c8d6', c2: '#c97e96' },
      { cx: 0.02, cy: 0.02, rx: 0.44, ry: 0.34, rot: -0.15, c0: '#fff8fa', c1: '#f4b6c8', c2: '#ba6c85' }
    ];

    for (const s of stones) {
      ctx.save();
      ctx.translate(s.cx * r, s.cy * r);
      ctx.rotate(s.rot);

      // Sub-shadow
      ctx.fillStyle = 'rgba(66, 32, 46, 0.22)';
      ctx.beginPath();
      ctx.ellipse(r * 0.04, r * 0.06, s.rx * r, s.ry * r, 0, 0, Math.PI * 2);
      ctx.fill();

      // Translucent quartz body
      const g = ctx.createRadialGradient(-s.rx * r * 0.3, -s.ry * r * 0.3, r * 0.04, 0, 0, s.rx * r * 1.1);
      g.addColorStop(0, s.c0);
      g.addColorStop(0.55, s.c1);
      g.addColorStop(1, s.c2);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx * r, s.ry * r, 0, 0, Math.PI * 2);
      ctx.fill();

      // Internal milky refraction veil
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = Math.max(0.9, r * 0.032);
      ctx.beginPath();
      ctx.moveTo(-s.rx * r * 0.45, s.ry * r * 0.15);
      ctx.quadraticCurveTo(0, -s.ry * r * 0.25, s.rx * r * 0.48, s.ry * r * 0.08);
      ctx.stroke();

      // Glossy specular highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
      ctx.beginPath();
      ctx.ellipse(-s.rx * r * 0.28, -s.ry * r * 0.32, s.rx * r * 0.32, s.ry * r * 0.16, -0.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(146, 84, 106, 0.58)';
      ctx.lineWidth = Math.max(0.85, r * 0.03);
      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx * r, s.ry * r, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    drawSparkle(ctx, -r * 0.12, -r * 0.12, r * 0.14, '#ffffff');
    ctx.restore();
  },

  /**
   * 12. riverpebble — Smooth trio of oval river pebbles
   */
  riverpebble(ctx, r = 32) {
    ctx.save();

    const pebbles = [
      { cx: -0.34, cy: 0.24, rx: 0.52, ry: 0.38, rot: -0.32, c0: '#c8c0b4', c1: '#8b8378', c2: '#524c44' },
      { cx: 0.36, cy: -0.18, rx: 0.48, ry: 0.34, rot: 0.45, c0: '#b8c4cc', c1: '#73828c', c2: '#424d54' },
      { cx: -0.06, cy: -0.26, rx: 0.44, ry: 0.31, rot: -0.18, c0: '#c6cab8', c1: '#868d7a', c2: '#4f5547' }
    ];

    for (const p of pebbles) {
      ctx.save();
      ctx.translate(p.cx * r, p.cy * r);
      ctx.rotate(p.rot);

      // Soft contact shadow
      ctx.fillStyle = 'rgba(14, 22, 26, 0.34)';
      ctx.beginPath();
      ctx.ellipse(r * 0.06, r * 0.10, p.rx * r * 1.02, p.ry * r * 1.02, 0, 0, Math.PI * 2);
      ctx.fill();

      // Smooth water-worn body
      const g = ctx.createRadialGradient(-p.rx * r * 0.32, -p.ry * r * 0.34, r * 0.05, r * 0.08, r * 0.08, p.rx * r * 1.15);
      g.addColorStop(0, p.c0);
      g.addColorStop(0.58, p.c1);
      g.addColorStop(1, p.c2);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.rx * r, p.ry * r, 0, 0, Math.PI * 2);
      ctx.fill();

      // Subtle mineral band
      ctx.strokeStyle = 'rgba(245, 240, 232, 0.32)';
      ctx.lineWidth = Math.max(1.0, r * 0.042);
      ctx.beginPath();
      ctx.moveTo(-p.rx * r * 0.65, p.ry * r * 0.18);
      ctx.quadraticCurveTo(0, -p.ry * r * 0.12, p.rx * r * 0.65, p.ry * r * 0.14);
      ctx.stroke();

      // Wet glossy pond highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.ellipse(-p.rx * r * 0.28, -p.ry * r * 0.34, p.rx * r * 0.34, p.ry * r * 0.16, -0.18, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(32, 38, 40, 0.72)';
      ctx.lineWidth = Math.max(0.95, r * 0.036);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.rx * r, p.ry * r, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    ctx.restore();
  },

  /**
   * 13. sandgravelpebble — Clustered warm ochre gravel stones
   */
  sandgravelpebble(ctx, r = 32) {
    ctx.save();

    // Warm sandy silt bed beneath gravel cluster
    const bedGrad = ctx.createRadialGradient(0, 0, r * 0.1, 0, 0, r * 0.96);
    bedGrad.addColorStop(0, 'rgba(138, 102, 56, 0.38)');
    bedGrad.addColorStop(1, 'rgba(138, 102, 56, 0)');
    ctx.fillStyle = bedGrad;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.96, 0, Math.PI * 2);
    ctx.fill();

    const stones = [
      { x: -0.48, y: -0.28, rx: 0.28, ry: 0.22, rot: 0.3, c0: '#ebd2a0', c1: '#b88b4a' },
      { x: 0.04, y: -0.48, rx: 0.30, ry: 0.23, rot: -0.2, c0: '#f2dfb8', c1: '#c69a58' },
      { x: 0.50, y: -0.20, rx: 0.27, ry: 0.20, rot: 0.6, c0: '#d8b47c', c1: '#9c6e38' },
      { x: -0.54, y: 0.24, rx: 0.26, ry: 0.21, rot: -0.5, c0: '#e2c288', c1: '#a87b40' },
      { x: 0.44, y: 0.32, rx: 0.30, ry: 0.22, rot: 0.2, c0: '#edd5a6', c1: '#b68646' },
      { x: -0.06, y: 0.48, rx: 0.28, ry: 0.20, rot: -0.1, c0: '#d4ae72', c1: '#946834' },
      { x: -0.18, y: -0.08, rx: 0.32, ry: 0.25, rot: 0.4, c0: '#f5e2ba', c1: '#c49450' },
      { x: 0.24, y: 0.04, rx: 0.29, ry: 0.23, rot: -0.4, c0: '#e4be82', c1: '#a6763b' },
      { x: 0.02, y: 0.18, rx: 0.24, ry: 0.19, rot: 0.15, c0: '#f8e9ca', c1: '#cc9f5e' },
      { x: -0.30, y: 0.38, rx: 0.18, ry: 0.14, rot: 0.5, c0: '#e8c890', c1: '#aa7c42' }
    ];

    for (const s of stones) {
      ctx.save();
      ctx.translate(s.x * r, s.y * r);
      ctx.rotate(s.rot);

      ctx.fillStyle = 'rgba(54, 36, 16, 0.34)';
      ctx.beginPath();
      ctx.ellipse(r * 0.04, r * 0.06, s.rx * r, s.ry * r, 0, 0, Math.PI * 2);
      ctx.fill();

      const g = ctx.createRadialGradient(-s.rx * r * 0.3, -s.ry * r * 0.3, r * 0.02, 0, 0, s.rx * r * 1.15);
      g.addColorStop(0, s.c0);
      g.addColorStop(1, s.c1);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx * r, s.ry * r, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(84, 54, 24, 0.65)';
      ctx.lineWidth = Math.max(0.8, r * 0.028);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  },

  /**
   * 14. sandstonerock — Warm terracotta striated sandstone
   */
  sandstonerock(ctx, r = 32) {
    ctx.save();

    // Warm deep shadow
    ctx.fillStyle = 'rgba(46, 20, 10, 0.36)';
    ctx.beginPath();
    ctx.ellipse(r * 0.09, r * 0.14, r * 0.96, r * 0.80, -0.1, 0, Math.PI * 2);
    ctx.fill();

    const pts = [
      [-0.90, -0.08], [-0.68, -0.62], [-0.06, -0.78], [0.64, -0.60],
      [0.92, -0.06], [0.76, 0.52], [0.16, 0.78], [-0.56, 0.66]
    ];
    smoothPolyPath(ctx, pts, r);
    const bg = ctx.createRadialGradient(-r * 0.25, -r * 0.25, r * 0.1, 0, 0, r * 1.05);
    bg.addColorStop(0, '#f0a66e');
    bg.addColorStop(0.55, '#cf6e3c');
    bg.addColorStop(1, '#84381c');
    ctx.fillStyle = bg;
    ctx.fill();

    ctx.save();
    ctx.clip();

    // Flowing wind-carved terracotta strata bands
    const bands = [
      { y: -0.58, col: 'rgba(250, 208, 152, 0.62)', w: 0.16 },
      { y: -0.34, col: 'rgba(158, 66, 30, 0.52)', w: 0.14 },
      { y: -0.10, col: 'rgba(246, 178, 118, 0.58)', w: 0.17 },
      { y: 0.16, col: 'rgba(136, 52, 22, 0.56)', w: 0.15 },
      { y: 0.42, col: 'rgba(232, 146, 86, 0.54)', w: 0.16 },
      { y: 0.64, col: 'rgba(110, 40, 16, 0.58)', w: 0.14 }
    ];
    for (const b of bands) {
      ctx.strokeStyle = b.col;
      ctx.lineWidth = r * b.w;
      ctx.beginPath();
      ctx.moveTo(-r * 1.05, (b.y + 0.12) * r);
      ctx.bezierCurveTo(-r * 0.35, (b.y - 0.14) * r, r * 0.35, (b.y + 0.16) * r, r * 1.05, (b.y - 0.08) * r);
      ctx.stroke();
    }

    // Fine sandstone grain speckles
    for (let i = 0; i < 36; i++) {
      const a = i * 2.39996;
      const d = Math.sqrt((i + 0.5) / 36) * 0.80;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 228, 190, 0.36)' : 'rgba(90, 32, 12, 0.32)';
      ctx.beginPath();
      ctx.arc(Math.cos(a) * d * r, Math.sin(a) * d * r, r * 0.025, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    smoothPolyPath(ctx, pts, r);
    ctx.strokeStyle = 'rgba(92, 36, 16, 0.80)';
    ctx.lineWidth = Math.max(1.1, r * 0.042);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 15. skippingstonespebble — Stacked flat pale stepping stones
   */
  skippingstonespebble(ctx, r = 32) {
    ctx.save();

    // Base shadow
    ctx.fillStyle = 'rgba(16, 26, 32, 0.34)';
    ctx.beginPath();
    ctx.ellipse(r * 0.10, r * 0.16, r * 0.94, r * 0.78, 0.08, 0, Math.PI * 2);
    ctx.fill();

    // 4 stacked flat water-smoothed skipping stones (bottom to top)
    const stack = [
      { cx: 0.04, cy: 0.08, rx: 0.88, ry: 0.70, rot: -0.10, c0: '#d8ddd8', c1: '#a2aba8', c2: '#6e7876' },
      { cx: -0.06, cy: -0.02, rx: 0.68, ry: 0.54, rot: 0.24, c0: '#e6eae6', c1: '#b8c0bc', c2: '#828c8a' },
      { cx: 0.06, cy: -0.10, rx: 0.48, ry: 0.38, rot: -0.30, c0: '#f2f4f0', c1: '#ccd3ce', c2: '#949e9a' },
      { cx: -0.02, cy: -0.16, rx: 0.28, ry: 0.22, rot: 0.15, c0: '#ffffff', c1: '#dfe5e0', c2: '#a8b2ae' }
    ];

    for (let i = 0; i < stack.length; i++) {
      const s = stack[i];
      ctx.save();
      ctx.translate(s.cx * r, s.cy * r);
      ctx.rotate(s.rot);

      // Cast shadow onto stone below
      if (i > 0) {
        ctx.fillStyle = 'rgba(20, 30, 34, 0.28)';
        ctx.beginPath();
        ctx.ellipse(r * 0.06, r * 0.09, s.rx * r, s.ry * r, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      const g = ctx.createRadialGradient(-s.rx * r * 0.3, -s.ry * r * 0.32, r * 0.04, 0, 0, s.rx * r * 1.1);
      g.addColorStop(0, s.c0);
      g.addColorStop(0.62, s.c1);
      g.addColorStop(1, s.c2);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx * r, s.ry * r, 0, 0, Math.PI * 2);
      ctx.fill();

      // Subtle rim highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.52)';
      ctx.lineWidth = Math.max(0.8, r * 0.028);
      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx * r * 0.88, s.ry * r * 0.88, 0, Math.PI * 1.0, Math.PI * 1.75);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(64, 74, 76, 0.72)';
      ctx.lineWidth = Math.max(0.95, r * 0.034);
      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx * r, s.ry * r, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    ctx.restore();
  },

  /**
   * 16. slateflagstonerock — Angular layered blue-grey slate slabs
   */
  slateflagstonerock(ctx, r = 32) {
    ctx.save();

    // Crisp slate shadow
    ctx.fillStyle = 'rgba(12, 20, 28, 0.38)';
    ctx.beginPath();
    ctx.ellipse(r * 0.09, r * 0.14, r * 0.98, r * 0.80, -0.14, 0, Math.PI * 2);
    ctx.fill();

    // 3 overlapping sharp-edged blue-grey slate flagstones
    const slabs = [
      {
        pts: [[-0.92, -0.14], [-0.44, -0.74], [0.46, -0.68], [0.92, -0.02], [0.58, 0.72], [-0.46, 0.76], [-0.88, 0.34]],
        c0: '#647688', c1: '#3d4c5c'
      },
      {
        pts: [[-0.70, -0.28], [-0.14, -0.64], [0.68, -0.34], [0.56, 0.40], [-0.22, 0.56], [-0.74, 0.18]],
        c0: '#7a8ea2', c1: '#4c5d70'
      },
      {
        pts: [[-0.44, -0.32], [0.16, -0.44], [0.50, -0.04], [0.14, 0.34], [-0.42, 0.20]],
        c0: '#92a8bc', c1: '#5d7185'
      }
    ];

    for (let i = 0; i < slabs.length; i++) {
      const s = slabs[i];
      if (i > 0) {
        ctx.save();
        ctx.translate(r * 0.05, r * 0.07);
        polyPath(ctx, s.pts, r);
        ctx.fillStyle = 'rgba(14, 22, 32, 0.34)';
        ctx.fill();
        ctx.restore();
      }

      const g = ctx.createLinearGradient(-r * 0.7, -r * 0.6, r * 0.7, r * 0.6);
      g.addColorStop(0, s.c0);
      g.addColorStop(1, s.c1);
      polyPath(ctx, s.pts, r);
      ctx.fillStyle = g;
      ctx.fill();

      // Bright cleaved upper-left edge highlight
      ctx.strokeStyle = 'rgba(208, 226, 242, 0.48)';
      ctx.lineWidth = Math.max(0.9, r * 0.032);
      ctx.beginPath();
      ctx.moveTo(s.pts[0][0] * r, s.pts[0][1] * r);
      ctx.lineTo(s.pts[1][0] * r, s.pts[1][1] * r);
      ctx.lineTo(s.pts[2][0] * r, s.pts[2][1] * r);
      ctx.stroke();

      polyPath(ctx, s.pts, r);
      ctx.strokeStyle = 'rgba(22, 30, 40, 0.85)';
      ctx.lineWidth = Math.max(1.0, r * 0.038);
      ctx.stroke();
    }

    // Subtle linear cleavage scratches
    ctx.strokeStyle = 'rgba(30, 40, 52, 0.35)';
    ctx.lineWidth = Math.max(0.7, r * 0.022);
    ctx.beginPath();
    ctx.moveTo(-0.32 * r, -0.14 * r);
    ctx.lineTo(0.30 * r, -0.22 * r);
    ctx.moveTo(-0.24 * r, 0.08 * r);
    ctx.lineTo(0.24 * r, 0.02 * r);
    ctx.stroke();

    ctx.restore();
  }
};

const objects = {
  /**
   * 1. anchorobject — Weathered iron anchor with chain
   */
  anchorobject(ctx, r = 48) {
    ctx.save();

    // Soft seabed shadow
    ctx.fillStyle = 'rgba(10, 18, 26, 0.34)';
    ctx.beginPath();
    ctx.ellipse(r * 0.08, r * 0.14, r * 0.94, r * 0.78, 0.12, 0, Math.PI * 2);
    ctx.fill();

    // Trailing forged iron chain curving off the ring shackle
    const chainPts = [
      [-0.08, -0.78, -0.6], [-0.30, -0.84, -0.2], [-0.52, -0.74, 0.5],
      [-0.68, -0.54, 1.0], [-0.74, -0.28, 1.4], [-0.66, -0.02, 1.9]
    ];
    for (let i = 0; i < chainPts.length; i++) {
      const [cx, cy, ang] = chainPts[i];
      ctx.save();
      ctx.translate(cx * r, cy * r);
      ctx.rotate(ang);
      ctx.strokeStyle = i % 2 === 0 ? '#3e464f' : '#58616c';
      ctx.lineWidth = Math.max(2.2, r * 0.062);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.13, r * 0.075, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(182, 118, 72, 0.55)';
      ctx.lineWidth = Math.max(0.8, r * 0.02);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.11, r * 0.055, 0, 0, Math.PI);
      ctx.stroke();
      ctx.restore();
    }

    // Iron gradient for anchor body
    const ironGrad = ctx.createLinearGradient(-r * 0.6, -r * 0.7, r * 0.6, r * 0.7);
    ironGrad.addColorStop(0, '#78828e');
    ironGrad.addColorStop(0.45, '#464e58');
    ironGrad.addColorStop(1, '#232830');

    // Top ring shackle
    ctx.strokeStyle = '#5a636e';
    ctx.lineWidth = Math.max(2.6, r * 0.075);
    ctx.beginPath();
    ctx.arc(0, -r * 0.68, r * 0.15, 0, Math.PI * 2);
    ctx.stroke();

    // Horizontal stock crossbar (weathered iron with bolted wood collar)
    ctx.fillStyle = '#5c4230';
    ctx.strokeStyle = '#201812';
    ctx.lineWidth = Math.max(1.2, r * 0.03);
        roundRectPath(ctx, -r * 0.46, -r * 0.48, r * 0.92, r * 0.13, r * 0.04);
    ctx.fill();
    ctx.stroke();
    // Iron bands on stock
    ctx.fillStyle = '#3c434d';
    ctx.fillRect(-r * 0.34, -r * 0.49, r * 0.07, r * 0.15);
    ctx.fillRect(r * 0.27, -r * 0.49, r * 0.07, r * 0.15);

    // Central shank
    ctx.fillStyle = ironGrad;
    ctx.strokeStyle = '#181c22';
    ctx.lineWidth = Math.max(1.3, r * 0.032);
    ctx.beginPath();
    ctx.moveTo(-r * 0.08, -r * 0.56);
    ctx.lineTo(r * 0.08, -r * 0.56);
    ctx.lineTo(r * 0.11, r * 0.66);
    ctx.lineTo(-r * 0.11, r * 0.66);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Curved fluke arms
    ctx.strokeStyle = ironGrad;
    ctx.lineWidth = Math.max(4.5, r * 0.14);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, r * 0.12, r * 0.56, Math.PI * 0.16, Math.PI * 0.84);
    ctx.stroke();
    ctx.strokeStyle = '#181c22';
    ctx.lineWidth = Math.max(1.2, r * 0.03);
    ctx.beginPath();
    ctx.arc(0, r * 0.12, r * 0.63, Math.PI * 0.17, Math.PI * 0.83);
    ctx.stroke();

    // Left and right triangular barbed flukes
    const drawFluke = (dir) => {
      ctx.save();
      ctx.translate(dir * r * 0.52, r * 0.32);
      ctx.rotate(dir * -0.58);
      ctx.fillStyle = ironGrad;
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.22);
      ctx.lineTo(dir * r * 0.18, r * 0.14);
      ctx.lineTo(0, r * 0.06);
      ctx.lineTo(-dir * r * 0.14, r * 0.14);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#181c22';
      ctx.lineWidth = Math.max(1.1, r * 0.028);
      ctx.stroke();
      ctx.restore();
    };
    drawFluke(-1);
    drawFluke(1);

    // Rust patina patches & specular edge
    ctx.fillStyle = 'rgba(176, 86, 36, 0.55)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.02, r * 0.18, r * 0.07, r * 0.14, 0.2, 0, Math.PI * 2);
    ctx.ellipse(r * 0.34, r * 0.52, r * 0.10, r * 0.05, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(210, 224, 236, 0.45)';
    ctx.lineWidth = Math.max(1.0, r * 0.025);
    ctx.beginPath();
    ctx.moveTo(-r * 0.04, -r * 0.50);
    ctx.lineTo(-r * 0.05, r * 0.54);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 2. buoyobject — Rusted red-white striped marine buoy
   */
  buoyobject(ctx, r = 48) {
    ctx.save();

    // Shadow
    ctx.fillStyle = 'rgba(12, 22, 30, 0.34)';
    ctx.beginPath();
    ctx.ellipse(r * 0.08, r * 0.14, r * 0.90, r * 0.62, -0.35, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate(-0.42);

    // Lower mooring ring & stub chain
    ctx.strokeStyle = '#4c535a';
    ctx.lineWidth = Math.max(2.2, r * 0.055);
    ctx.beginPath();
    ctx.arc(0, r * 0.72, r * 0.11, 0, Math.PI * 2);
    ctx.stroke();

    // Buoy cylindrical-conical hull
    const bodyPath = () => {
      ctx.beginPath();
      ctx.moveTo(-r * 0.42, -r * 0.26);
      ctx.quadraticCurveTo(0, -r * 0.52, r * 0.42, -r * 0.26);
      ctx.lineTo(r * 0.34, r * 0.54);
      ctx.quadraticCurveTo(0, r * 0.72, -r * 0.34, r * 0.54);
      ctx.closePath();
    };
    bodyPath();
    ctx.fillStyle = '#efe8d8';
    ctx.fill();

    // Red & white painted maritime stripes clipped inside hull
    ctx.save();
    bodyPath();
    ctx.clip();

    ctx.fillStyle = '#c8342b';
    ctx.fillRect(-r * 0.5, -r * 0.52, r * 1.0, r * 0.34);
    ctx.fillRect(-r * 0.5, r * 0.16, r * 1.0, r * 0.32);

    // Cylindrical 3D shading overlay
    const cylGrad = ctx.createLinearGradient(-r * 0.44, 0, r * 0.44, 0);
    cylGrad.addColorStop(0, 'rgba(255, 255, 255, 0.34)');
    cylGrad.addColorStop(0.28, 'rgba(255, 255, 255, 0.08)');
    cylGrad.addColorStop(0.75, 'rgba(20, 14, 18, 0.26)');
    cylGrad.addColorStop(1, 'rgba(12, 8, 12, 0.48)');
    ctx.fillStyle = cylGrad;
    ctx.fillRect(-r * 0.5, -r * 0.6, r * 1.0, r * 1.4);

    // Rust streaks & chipped paint patches
    ctx.fillStyle = 'rgba(142, 66, 28, 0.72)';
    const rust = [
      [-0.24, -0.18, 0.11, 0.07], [0.18, 0.02, 0.14, 0.09],
      [-0.12, 0.36, 0.15, 0.08], [0.22, 0.44, 0.09, 0.06],
      [-0.28, 0.14, 0.08, 0.12]
    ];
    for (const [rx, ry, rw, rh] of rust) {
      ctx.beginPath();
      ctx.ellipse(rx * r, ry * r, rw * r, rh * r, 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Hull outline
    bodyPath();
    ctx.strokeStyle = '#331c1a';
    ctx.lineWidth = Math.max(1.3, r * 0.032);
    ctx.stroke();

    // Riveted iron waist collar
    ctx.fillStyle = '#485058';
        roundRectPath(ctx, -r * 0.44, -r * 0.24, r * 0.88, r * 0.09, r * 0.03);
    ctx.fill();
    ctx.strokeStyle = '#1e2228';
    ctx.lineWidth = Math.max(1.0, r * 0.024);
    ctx.stroke();

    // Top beacon lattice cage & lamp dome
    ctx.strokeStyle = '#4e5660';
    ctx.lineWidth = Math.max(1.6, r * 0.038);
    ctx.beginPath();
    ctx.moveTo(-r * 0.24, -r * 0.36);
    ctx.lineTo(-r * 0.12, -r * 0.72);
    ctx.moveTo(r * 0.24, -r * 0.36);
    ctx.lineTo(r * 0.12, -r * 0.72);
    ctx.moveTo(0, -r * 0.40);
    ctx.lineTo(0, -r * 0.74);
    ctx.moveTo(-r * 0.16, -r * 0.60);
    ctx.lineTo(r * 0.16, -r * 0.60);
    ctx.stroke();

    // Beacon lantern lens
    const lensGrad = ctx.createRadialGradient(-r * 0.03, -r * 0.78, r * 0.02, 0, -r * 0.76, r * 0.12);
    lensGrad.addColorStop(0, '#fff7c4');
    lensGrad.addColorStop(0.6, '#e69b3a');
    lensGrad.addColorStop(1, '#8c4418');
    ctx.fillStyle = lensGrad;
    ctx.beginPath();
    ctx.arc(0, -r * 0.76, r * 0.11, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#2d221c';
    ctx.lineWidth = Math.max(1.0, r * 0.024);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 3. cannonobject — Bronze-iron naval cannon on wooden carriage
   */
  cannonobject(ctx, r = 48) {
    ctx.save();

    // Shadow
    ctx.fillStyle = 'rgba(12, 18, 22, 0.36)';
    ctx.beginPath();
    ctx.ellipse(r * 0.06, r * 0.12, r * 0.96, r * 0.56, -0.18, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate(-0.18);

    // Four small oak truck wheels peeking from under carriage
    const wheels = [[-0.44, -0.34], [0.22, -0.34], [-0.44, 0.34], [0.22, 0.34]];
    for (const [wx, wy] of wheels) {
      ctx.fillStyle = '#4e3422';
      ctx.strokeStyle = '#1f140c';
      ctx.lineWidth = Math.max(1.1, r * 0.026);
            roundRectPath(ctx, (wx - 0.12) * r, (wy - 0.07) * r, r * 0.24, r * 0.14, r * 0.03);
      ctx.fill();
      ctx.stroke();
    }

    // Stepped oak naval gun carriage
    const woodGrad = ctx.createLinearGradient(0, -r * 0.34, 0, r * 0.34);
    woodGrad.addColorStop(0, '#9e6d43');
    woodGrad.addColorStop(0.5, '#764e2e');
    woodGrad.addColorStop(1, '#4d301a');
    ctx.fillStyle = woodGrad;
    ctx.strokeStyle = '#26170c';
    ctx.lineWidth = Math.max(1.3, r * 0.03);
        roundRectPath(ctx, -r * 0.58, -r * 0.31, r * 0.94, r * 0.62, r * 0.06);
    ctx.fill();
    ctx.stroke();

    // Carriage plank seams & iron bolts
    ctx.strokeStyle = 'rgba(34, 18, 8, 0.55)';
    ctx.lineWidth = Math.max(0.9, r * 0.022);
    ctx.beginPath();
    ctx.moveTo(-r * 0.56, -r * 0.14);
    ctx.lineTo(r * 0.34, -r * 0.14);
    ctx.moveTo(-r * 0.56, r * 0.14);
    ctx.lineTo(r * 0.34, r * 0.14);
    ctx.stroke();

    // Trunnion iron straps
    ctx.fillStyle = '#363d44';
    ctx.fillRect(-r * 0.06, -r * 0.32, r * 0.12, r * 0.64);

    // Tapered bronze-iron cannon barrel
    const barrelGrad = ctx.createLinearGradient(0, -r * 0.24, 0, r * 0.24);
    barrelGrad.addColorStop(0, '#8d8b74');
    barrelGrad.addColorStop(0.32, '#5a6056');
    barrelGrad.addColorStop(0.75, '#343b37');
    barrelGrad.addColorStop(1, '#1d2220');

    // Cascabel breech knob
    ctx.fillStyle = barrelGrad;
    ctx.beginPath();
    ctx.arc(-r * 0.70, 0, r * 0.10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#181c1a';
    ctx.lineWidth = Math.max(1.1, r * 0.026);
    ctx.stroke();

    // Main tapered barrel
    ctx.beginPath();
    ctx.moveTo(-r * 0.62, -r * 0.22);
    ctx.lineTo(r * 0.74, -r * 0.14);
    ctx.lineTo(r * 0.84, -r * 0.18);
    ctx.lineTo(r * 0.88, -r * 0.16);
    ctx.lineTo(r * 0.88, r * 0.16);
    ctx.lineTo(r * 0.84, r * 0.18);
    ctx.lineTo(r * 0.74, r * 0.14);
    ctx.lineTo(-r * 0.62, r * 0.22);
    ctx.closePath();
    ctx.fillStyle = barrelGrad;
    ctx.fill();
    ctx.strokeStyle = '#161a18';
    ctx.lineWidth = Math.max(1.3, r * 0.03);
    ctx.stroke();

    // Decorative bronze reinforcement rings
    const rings = [-0.54, -0.18, 0.28, 0.74];
    for (const rx of rings) {
      const h = rx < 0 ? 0.23 : 0.17;
      ctx.fillStyle = '#737a68';
      ctx.fillRect((rx - 0.028) * r, -h * r, r * 0.056, h * 2 * r);
      ctx.strokeStyle = 'rgba(20, 24, 22, 0.75)';
      ctx.lineWidth = Math.max(0.8, r * 0.02);
      ctx.strokeRect((rx - 0.028) * r, -h * r, r * 0.056, h * 2 * r);
    }

    // Verdigris oxidation & top specular glint
    ctx.fillStyle = 'rgba(84, 162, 136, 0.42)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.34, r * 0.08, r * 0.16, r * 0.07, 0.1, 0, Math.PI * 2);
    ctx.ellipse(r * 0.46, -r * 0.06, r * 0.14, r * 0.05, -0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(226, 232, 210, 0.46)';
    ctx.lineWidth = Math.max(1.2, r * 0.03);
    ctx.beginPath();
    ctx.moveTo(-r * 0.52, -r * 0.11);
    ctx.lineTo(r * 0.72, -r * 0.07);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 4. compassobject — Antique brass mariner compass with rose dial
   */
  compassobject(ctx, r = 48) {
    ctx.save();

    // Contact shadow
    ctx.fillStyle = 'rgba(18, 16, 12, 0.36)';
    ctx.beginPath();
    ctx.ellipse(r * 0.08, r * 0.12, r * 0.86, r * 0.82, 0, 0, Math.PI * 2);
    ctx.fill();

    // Top pendant bail ring
    ctx.strokeStyle = '#c89c42';
    ctx.lineWidth = Math.max(2.6, r * 0.068);
    ctx.beginPath();
    ctx.arc(0, -r * 0.84, r * 0.16, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#5e4216';
    ctx.lineWidth = Math.max(0.9, r * 0.022);
    ctx.stroke();

    // Outer burnished brass casing
    const brassGrad = ctx.createRadialGradient(-r * 0.28, -r * 0.28, r * 0.1, 0, 0, r * 0.84);
    brassGrad.addColorStop(0, '#f8dc8c');
    brassGrad.addColorStop(0.55, '#c69338');
    brassGrad.addColorStop(0.88, '#8a5f1c');
    brassGrad.addColorStop(1, '#4f340e');
    ctx.fillStyle = brassGrad;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3d280a';
    ctx.lineWidth = Math.max(1.3, r * 0.032);
    ctx.stroke();

    // Inner recessed bezel lip
    ctx.strokeStyle = '#f6de96';
    ctx.lineWidth = Math.max(1.1, r * 0.026);
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.67, 0, Math.PI * 2);
    ctx.stroke();

    // Aged ivory parchment dial face
    const dialGrad = ctx.createRadialGradient(-r * 0.12, -r * 0.12, r * 0.06, 0, 0, r * 0.64);
    dialGrad.addColorStop(0, '#fffdf4');
    dialGrad.addColorStop(0.7, '#efe2c2');
    dialGrad.addColorStop(1, '#c8b288');
    ctx.fillStyle = dialGrad;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.63, 0, Math.PI * 2);
    ctx.fill();

    // Degree tick marks
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8;
      const major = i % 4 === 0;
      const r1 = r * (major ? 0.48 : 0.54);
      const r2 = r * 0.60;
      ctx.strokeStyle = major ? '#3b2b18' : 'rgba(72, 54, 34, 0.65)';
      ctx.lineWidth = major ? Math.max(1.3, r * 0.03) : Math.max(0.8, r * 0.018);
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
      ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
      ctx.stroke();
    }

    // 8-point nautical compass rose
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      const len = i % 2 === 0 ? r * 0.48 : r * 0.34;
      const w = r * 0.09;
      ctx.save();
      ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(0, -len);
      ctx.lineTo(w, 0);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? '#2f3d4c' : '#8c7248';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, -len);
      ctx.lineTo(-w, 0);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? '#5c7288' : '#b89a64';
      ctx.fill();
      ctx.restore();
    }

    // Magnetic needle (tilted slightly NE)
    ctx.save();
    ctx.rotate(0.45);
    // North crimson half
    ctx.fillStyle = '#c82d25';
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.52);
    ctx.lineTo(r * 0.08, 0);
    ctx.lineTo(-r * 0.08, 0);
    ctx.closePath();
    ctx.fill();
    // South blued-steel half
    ctx.fillStyle = '#2d3d4f';
    ctx.beginPath();
    ctx.moveTo(0, r * 0.52);
    ctx.lineTo(r * 0.08, 0);
    ctx.lineTo(-r * 0.08, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Brass center pivot cap
    ctx.fillStyle = '#f2cc6c';
    ctx.strokeStyle = '#5a3d12';
    ctx.lineWidth = Math.max(0.9, r * 0.022);
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.09, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Curved glass dome reflection glare
    ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.22, -r * 0.24, r * 0.34, r * 0.16, -0.65, 0, Math.PI * 2);
    ctx.fill();

    drawSparkle(ctx, -r * 0.42, -r * 0.46, r * 0.14, '#fff9d6');

    ctx.restore();
  },

  /**
   * 5. coralrockobject — Barnacle-encrusted relic archway rock
   */
  coralrockobject(ctx, r = 48) {
    ctx.save();

    // Deep seabed tunnel shadow underneath the archway
    ctx.fillStyle = 'rgba(8, 18, 28, 0.52)';
    ctx.beginPath();
    ctx.ellipse(0, r * 0.10, r * 0.68, r * 0.44, 0, 0, Math.PI * 2);
    ctx.fill();

    // Left & right carved stone piers + curved archway bridge spanning over tunnel
    const archPts = [
      [-0.88, 0.36], [-0.82, -0.26], [-0.46, -0.68], [0.06, -0.76],
      [0.58, -0.60], [0.88, -0.14], [0.86, 0.42], [0.46, 0.56],
      [0.36, 0.08], [0.04, -0.16], [-0.34, 0.02], [-0.46, 0.52]
    ];
    smoothPolyPath(ctx, archPts, r);
    const ag = ctx.createRadialGradient(-r * 0.24, -r * 0.34, r * 0.1, 0, 0, r * 1.05);
    ag.addColorStop(0, '#9ea8a4');
    ag.addColorStop(0.52, '#697878');
    ag.addColorStop(1, '#36454a');
    ctx.fillStyle = ag;
    ctx.fill();
    ctx.strokeStyle = 'rgba(20, 32, 36, 0.85)';
    ctx.lineWidth = Math.max(1.2, r * 0.032);
    ctx.stroke();

    // Ancient keystone joints carved along the arch crest
    ctx.strokeStyle = 'rgba(28, 42, 46, 0.55)';
    ctx.lineWidth = Math.max(1.0, r * 0.026);
    const joints = [
      [-0.36, -0.64, -0.24, -0.12],
      [0.04, -0.74, 0.04, -0.18],
      [0.44, -0.60, 0.28, -0.06]
    ];
    for (const [x1, y1, x2, y2] of joints) {
      ctx.beginPath();
      ctx.moveTo(x1 * r, y1 * r);
      ctx.lineTo(x2 * r, y2 * r);
      ctx.stroke();
    }

    // Lush sea-fan coral tufts sprouting on edges
    const corals = [
      { x: -0.64, y: -0.24, col: '#e86f88' },
      { x: 0.62, y: -0.26, col: '#c068c8' },
      { x: 0.58, y: 0.24, col: '#f08e68' }
    ];
    for (const c of corals) {
      ctx.strokeStyle = c.col;
      ctx.lineWidth = Math.max(2.0, r * 0.055);
      ctx.lineCap = 'round';
      for (let b = -1; b <= 1; b++) {
        ctx.beginPath();
        ctx.moveTo(c.x * r, c.y * r);
        ctx.lineTo((c.x + b * 0.14) * r, (c.y - 0.18 + Math.abs(b) * 0.04) * r);
        ctx.stroke();
      }
    }

    // Encrusted ivory volcano barnacles
    const barnacles = [
      [-0.64, 0.22, 0.11], [-0.52, 0.34, 0.08], [-0.18, -0.44, 0.10],
      [0.18, -0.46, 0.09], [0.34, -0.34, 0.07], [0.68, 0.08, 0.10],
      [0.54, 0.38, 0.08]
    ];
    for (const [bx, by, br] of barnacles) {
      ctx.fillStyle = '#e8e2d0';
      ctx.strokeStyle = '#6d6858';
      ctx.lineWidth = Math.max(0.8, r * 0.02);
      ctx.beginPath();
      ctx.arc(bx * r, by * r, br * r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#363a3e';
      ctx.beginPath();
      ctx.arc(bx * r, by * r, br * r * 0.42, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  /**
   * 6. dustcloudobject — Soft swirling seabed silt & sand plume
   */
  dustcloudobject(ctx, r = 48) {
    ctx.save();

    // Soft outer diffused silt veil
    const outer = ctx.createRadialGradient(0, 0, r * 0.08, 0, 0, r * 0.98);
    outer.addColorStop(0, 'rgba(232, 214, 174, 0.56)');
    outer.addColorStop(0.55, 'rgba(196, 174, 134, 0.32)');
    outer.addColorStop(1, 'rgba(170, 150, 114, 0)');
    ctx.fillStyle = outer;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.98, 0, Math.PI * 2);
    ctx.fill();

    // Billowy overlapping sand/silt puffs arranged in a gentle swirl
    const puffs = [
      { x: -0.34, y: -0.22, rad: 0.44, a: 0.52, col: '#e6d4ad' },
      { x: 0.24, y: -0.32, rad: 0.40, a: 0.48, col: '#f0e2c2' },
      { x: 0.42, y: 0.14, rad: 0.42, a: 0.46, col: '#dac59a' },
      { x: -0.06, y: 0.36, rad: 0.40, a: 0.44, col: '#cfb88c' },
      { x: -0.44, y: 0.18, rad: 0.34, a: 0.42, col: '#e0cc9f' },
      { x: 0.02, y: -0.04, rad: 0.46, a: 0.62, col: '#f6ebd0' }
    ];

    for (const p of puffs) {
      const g = ctx.createRadialGradient(p.x * r, p.y * r, r * 0.04, p.x * r, p.y * r, p.rad * r);
      g.addColorStop(0, p.col);
      g.addColorStop(1, 'rgba(220, 200, 160, 0)');
      ctx.globalAlpha = p.a;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x * r, p.y * r, p.rad * r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Swirling underwater current ribbons
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(255, 248, 228, 0.55)';
    ctx.lineWidth = Math.max(1.6, r * 0.045);
    ctx.beginPath();
    for (let t = 0; t < 24; t++) {
      const ang = t * 0.32;
      const rad = r * (0.10 + t * 0.032);
      const x = Math.cos(ang) * rad;
      const y = Math.sin(ang) * rad;
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = 'rgba(182, 156, 112, 0.42)';
    ctx.lineWidth = Math.max(1.2, r * 0.032);
    ctx.beginPath();
    for (let t = 0; t < 18; t++) {
      const ang = Math.PI + t * 0.35;
      const rad = r * (0.14 + t * 0.036);
      const x = Math.cos(ang) * rad;
      const y = Math.sin(ang) * rad;
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Suspended fine golden sand motes
    for (let i = 0; i < 24; i++) {
      const a = i * 2.39996;
      const d = Math.sqrt((i + 0.5) / 24) * 0.86;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 246, 214, 0.72)' : 'rgba(196, 168, 118, 0.65)';
      ctx.beginPath();
      ctx.arc(Math.cos(a) * d * r, Math.sin(a) * d * r, r * (0.018 + (i % 3) * 0.008), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  /**
   * 7. goldcoinpileobject — Glittering mound of stamped gold doubloons
   */
  goldcoinpileobject(ctx, r = 48) {
    ctx.save();

    // Warm dark shadow
    ctx.fillStyle = 'rgba(38, 24, 6, 0.38)';
    ctx.beginPath();
    ctx.ellipse(r * 0.06, r * 0.12, r * 0.94, r * 0.76, 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Rich dark-gold base mound so no gaps show through
    const moundGrad = ctx.createRadialGradient(-r * 0.16, -r * 0.16, r * 0.08, 0, 0, r * 0.86);
    moundGrad.addColorStop(0, '#f4c23a');
    moundGrad.addColorStop(0.65, '#b87d14');
    moundGrad.addColorStop(1, '#684106');
    ctx.fillStyle = moundGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.82, r * 0.66, 0, 0, Math.PI * 2);
    ctx.fill();

    // 26 layered stamped gold doubloons (outer perimeter first, crown coins on top)
    const coins = [];
    for (let ring = 2; ring >= 0; ring--) {
      const count = ring === 2 ? 14 : ring === 1 ? 8 : 4;
      const dist = ring === 2 ? 0.58 : ring === 1 ? 0.32 : 0.12;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + ring * 0.55;
        coins.push({
          x: Math.cos(a) * dist * (1 + (i % 2) * 0.12),
          y: Math.sin(a) * dist * 0.82,
          rot: a + 0.4,
          tilt: 0.76 + (i % 3) * 0.08
        });
      }
    }

    for (const c of coins) {
      ctx.save();
      ctx.translate(c.x * r, c.y * r);
      ctx.rotate(c.rot);
      const cr = r * 0.17;

      // Coin rim depth
      ctx.fillStyle = '#7a4d08';
      ctx.beginPath();
      ctx.ellipse(r * 0.015, r * 0.025, cr, cr * c.tilt, 0, 0, Math.PI * 2);
      ctx.fill();

      // Coin face gradient
      const cg = ctx.createLinearGradient(-cr, -cr, cr, cr);
      cg.addColorStop(0, '#fff4a8');
      cg.addColorStop(0.45, '#f4be2a');
      cg.addColorStop(1, '#b5740c');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.ellipse(0, 0, cr, cr * c.tilt, 0, 0, Math.PI * 2);
      ctx.fill();

      // Stamped inner ring & cross emblem
      ctx.strokeStyle = 'rgba(138, 84, 10, 0.72)';
      ctx.lineWidth = Math.max(0.75, r * 0.018);
      ctx.beginPath();
      ctx.ellipse(0, 0, cr * 0.72, cr * c.tilt * 0.72, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-cr * 0.38, 0);
      ctx.lineTo(cr * 0.38, 0);
      ctx.moveTo(0, -cr * c.tilt * 0.38);
      ctx.lineTo(0, cr * c.tilt * 0.38);
      ctx.stroke();

      ctx.strokeStyle = '#684006';
      ctx.lineWidth = Math.max(0.8, r * 0.018);
      ctx.beginPath();
      ctx.ellipse(0, 0, cr, cr * c.tilt, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    // Crisp gold glints
    drawSparkle(ctx, -r * 0.18, -r * 0.18, r * 0.20, '#fffce0');
    drawSparkle(ctx, r * 0.32, -r * 0.06, r * 0.15, '#fff4b0');
    drawSparkle(ctx, -r * 0.04, r * 0.26, r * 0.13, '#ffffff');

    ctx.restore();
  },

  /**
   * 8. jewelrypileobject — Ruby/emerald necklaces & golden goblets
   */
  jewelrypileobject(ctx, r = 48) {
    ctx.save();

    // Shadow
    ctx.fillStyle = 'rgba(24, 14, 18, 0.38)';
    ctx.beginPath();
    ctx.ellipse(r * 0.06, r * 0.12, r * 0.94, r * 0.78, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Draped pearl necklace loop on lower-left
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const px = (-0.28 + Math.cos(a) * 0.42) * r;
      const py = (0.16 + Math.sin(a) * 0.32) * r;
      ctx.fillStyle = '#f8f2ea';
      ctx.strokeStyle = '#a89c94';
      ctx.lineWidth = Math.max(0.7, r * 0.016);
      ctx.beginPath();
      ctx.arc(px, py, r * 0.068, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Draped gold chain with emerald beads
    ctx.strokeStyle = '#e6b22e';
    ctx.lineWidth = Math.max(2.0, r * 0.048);
    ctx.beginPath();
    ctx.ellipse(r * 0.16, r * 0.18, r * 0.48, r * 0.34, 0.35, 0, Math.PI * 2);
    ctx.stroke();

    // Fallen ornate golden chalice/goblet on upper-right
    ctx.save();
    ctx.translate(r * 0.14, -r * 0.16);
    ctx.rotate(0.55);
    const goldGrad = ctx.createLinearGradient(0, -r * 0.28, 0, r * 0.28);
    goldGrad.addColorStop(0, '#fff29c');
    goldGrad.addColorStop(0.45, '#e8ae24');
    goldGrad.addColorStop(1, '#8a5808');

    // Goblet foot & stem
    ctx.fillStyle = goldGrad;
    ctx.strokeStyle = '#523204';
    ctx.lineWidth = Math.max(1.1, r * 0.025);
    ctx.beginPath();
    ctx.ellipse(-r * 0.46, 0, r * 0.09, r * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillRect(-r * 0.44, -r * 0.055, r * 0.34, r * 0.11);
    ctx.strokeRect(-r * 0.44, -r * 0.055, r * 0.34, r * 0.11);

    // Goblet cup bowl
    ctx.beginPath();
    ctx.moveTo(-r * 0.14, -r * 0.22);
    ctx.quadraticCurveTo(r * 0.16, -r * 0.28, r * 0.36, -r * 0.24);
    ctx.lineTo(r * 0.36, r * 0.24);
    ctx.quadraticCurveTo(r * 0.16, r * 0.28, -r * 0.14, r * 0.22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dark cup interior mouth
    ctx.fillStyle = '#5c3608';
    ctx.beginPath();
    ctx.ellipse(r * 0.36, 0, r * 0.08, r * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Faceted ruby, emerald & sapphire brooches/pendants
    const drawGem = (gx, gy, gr, rot, cLight, cMid, cDark, isDiamond) => {
      ctx.save();
      ctx.translate(gx * r, gy * r);
      ctx.rotate(rot);
      // Gold bezel setting
      ctx.fillStyle = '#e8b430';
      ctx.strokeStyle = '#5a3a08';
      ctx.lineWidth = Math.max(0.9, r * 0.02);
      ctx.beginPath();
      if (isDiamond) {
        ctx.moveTo(0, -gr * 1.24 * r);
        ctx.lineTo(gr * 0.96 * r, 0);
        ctx.lineTo(0, gr * 1.24 * r);
        ctx.lineTo(-gr * 0.96 * r, 0);
        ctx.closePath();
      } else {
        ctx.ellipse(0, 0, gr * 1.18 * r, gr * 0.92 * r, 0, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.stroke();

      // Jewel body
      const gg = ctx.createRadialGradient(-gr * 0.25 * r, -gr * 0.25 * r, gr * 0.08 * r, 0, 0, gr * r);
      gg.addColorStop(0, cLight);
      gg.addColorStop(0.55, cMid);
      gg.addColorStop(1, cDark);
      ctx.fillStyle = gg;
      ctx.beginPath();
      if (isDiamond) {
        ctx.moveTo(0, -gr * r);
        ctx.lineTo(gr * 0.76 * r, 0);
        ctx.lineTo(0, gr * r);
        ctx.lineTo(-gr * 0.76 * r, 0);
        ctx.closePath();
      } else {
        ctx.ellipse(0, 0, gr * 0.96 * r, gr * 0.74 * r, 0, 0, Math.PI * 2);
      }
      ctx.fill();

      // Table facet highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.58)';
      ctx.beginPath();
      ctx.ellipse(-gr * 0.22 * r, -gr * 0.22 * r, gr * 0.30 * r, gr * 0.16 * r, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawGem(-0.26, -0.24, 0.20, -0.3, '#ff9aa8', '#d91c3c', '#72081b', false); // Ruby brooch
    drawGem(0.06, 0.30, 0.21, 0.2, '#96ffbe', '#12a858', '#065229', true);    // Emerald pendant
    drawGem(0.46, 0.14, 0.15, -0.4, '#9ed2ff', '#1c6ce0', '#0a2d72', false);  // Sapphire gem
    drawGem(-0.44, 0.24, 0.14, 0.5, '#ff9aa8', '#d91c3c', '#72081b', true);   // Small ruby

    drawSparkle(ctx, -r * 0.28, -r * 0.28, r * 0.18, '#ffffff');
    drawSparkle(ctx, r * 0.10, r * 0.26, r * 0.16, '#e6fff0');
    drawSparkle(ctx, r * 0.34, -r * 0.22, r * 0.14, '#fff8c8');

    ctx.restore();
  },

  /**
   * 9. messagebottleobject — Corked sea-green glass bottle with parchment scroll inside
   */
  messagebottleobject(ctx, r = 48) {
    ctx.save();

    // Soft glass shadow
    ctx.fillStyle = 'rgba(10, 26, 28, 0.30)';
    ctx.beginPath();
    ctx.ellipse(r * 0.06, r * 0.12, r * 0.92, r * 0.42, -0.38, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate(-0.42);

    // Bottle silhouette path
    const bottlePath = () => {
      ctx.beginPath();
      ctx.moveTo(-r * 0.72, -r * 0.28);
      ctx.quadraticCurveTo(-r * 0.80, 0, -r * 0.72, r * 0.28);
      ctx.lineTo(r * 0.14, r * 0.28);
      ctx.quadraticCurveTo(r * 0.32, r * 0.26, r * 0.40, r * 0.12);
      ctx.lineTo(r * 0.68, r * 0.12);
      ctx.lineTo(r * 0.68, -r * 0.12);
      ctx.lineTo(r * 0.40, -r * 0.12);
      ctx.quadraticCurveTo(r * 0.32, -r * 0.26, r * 0.14, -r * 0.28);
      ctx.closePath();
    };

    // Cork stopper sticking out of neck
    ctx.fillStyle = '#b6834c';
    ctx.strokeStyle = '#5c3c1c';
    ctx.lineWidth = Math.max(1.1, r * 0.026);
        roundRectPath(ctx, r * 0.56, -r * 0.09, r * 0.28, r * 0.18, r * 0.03);
    ctx.fill();
    ctx.stroke();

    // Translucent sea-green glass base tint
    const glassGrad = ctx.createLinearGradient(0, -r * 0.32, 0, r * 0.32);
    glassGrad.addColorStop(0, 'rgba(148, 226, 206, 0.74)');
    glassGrad.addColorStop(0.5, 'rgba(72, 168, 148, 0.58)');
    glassGrad.addColorStop(1, 'rgba(34, 108, 96, 0.80)');
    bottlePath();
    ctx.fillStyle = glassGrad;
    ctx.fill();

    // Rolled aged parchment scroll inside bottle
    ctx.save();
    ctx.rotate(0.08);
    const scrollGrad = ctx.createLinearGradient(0, -r * 0.14, 0, r * 0.14);
    scrollGrad.addColorStop(0, '#fcf2d4');
    scrollGrad.addColorStop(0.6, '#e2c996');
    scrollGrad.addColorStop(1, '#b69760');
    ctx.fillStyle = scrollGrad;
    ctx.strokeStyle = '#7d6236';
    ctx.lineWidth = Math.max(0.9, r * 0.022);
        roundRectPath(ctx, -r * 0.54, -r * 0.13, r * 0.68, r * 0.26, r * 0.05);
    ctx.fill();
    ctx.stroke();

    // Crimson twine tied around scroll
    ctx.strokeStyle = '#b82a2a';
    ctx.lineWidth = Math.max(1.8, r * 0.042);
    ctx.beginPath();
    ctx.moveTo(-r * 0.20, -r * 0.13);
    ctx.lineTo(-r * 0.20, r * 0.13);
    ctx.stroke();

    // Tiny handwritten script lines on parchment
    ctx.strokeStyle = 'rgba(92, 66, 36, 0.55)';
    ctx.lineWidth = Math.max(0.7, r * 0.016);
    ctx.beginPath();
    ctx.moveTo(-r * 0.44, -r * 0.04);
    ctx.lineTo(-r * 0.28, -r * 0.04);
    ctx.moveTo(-r * 0.44, r * 0.04);
    ctx.lineTo(-r * 0.30, r * 0.04);
    ctx.moveTo(-r * 0.10, -r * 0.03);
    ctx.lineTo(r * 0.06, -r * 0.03);
    ctx.stroke();
    ctx.restore();

    // Flared glass lip collar
    ctx.fillStyle = 'rgba(138, 224, 202, 0.85)';
    ctx.strokeStyle = '#1f5e54';
    ctx.lineWidth = Math.max(1.1, r * 0.026);
        roundRectPath(ctx, r * 0.64, -r * 0.15, r * 0.09, r * 0.30, r * 0.03);
    ctx.fill();
    ctx.stroke();

    // Bottle outline + crisp glossy glass reflection streaks
    bottlePath();
    ctx.strokeStyle = '#1d5b52';
    ctx.lineWidth = Math.max(1.3, r * 0.032);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(238, 255, 252, 0.78)';
    ctx.lineWidth = Math.max(1.8, r * 0.048);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-r * 0.60, -r * 0.18);
    ctx.lineTo(r * 0.10, -r * 0.18);
    ctx.moveTo(r * 0.42, -r * 0.06);
    ctx.lineTo(r * 0.60, -r * 0.06);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 10. pearlclamobject — Scalloped violet giant clam cradling a luminous pearl
   */
  pearlclamobject(ctx, r = 48) {
    ctx.save();

    // Shadow
    ctx.fillStyle = 'rgba(18, 12, 32, 0.38)';
    ctx.beginPath();
    ctx.ellipse(r * 0.06, r * 0.14, r * 0.94, r * 0.78, 0, 0, Math.PI * 2);
    ctx.fill();

    // Scalloped outer bivalve shell silhouette (7 radial lobes)
    const shellPath = (scaleX, scaleY, yOff) => {
      ctx.beginPath();
      ctx.moveTo(0, (0.68 + yOff) * r);
      for (let i = 0; i <= 7; i++) {
        const a = Math.PI * 0.88 + (i / 7) * Math.PI * 1.24;
        const lobe = i === 0 || i === 7 ? 0.78 : 0.88 + (i % 2 === 0 ? 0.06 : -0.02);
        const px = Math.cos(a) * lobe * scaleX * r;
        const py = (Math.sin(a) * lobe * scaleY + yOff) * r;
        if (i === 0) ctx.lineTo(px, py);
        else {
          const prevA = Math.PI * 0.88 + ((i - 0.5) / 7) * Math.PI * 1.24;
          const cpx = Math.cos(prevA) * (lobe + 0.12) * scaleX * r;
          const cpy = (Math.sin(prevA) * (lobe + 0.12) * scaleY + yOff) * r;
          ctx.quadraticCurveTo(cpx, cpy, px, py);
        }
      }
      ctx.closePath();
    };

    // Lower/outer shell
    const sg = ctx.createRadialGradient(-r * 0.15, -r * 0.25, r * 0.1, 0, 0, r * 0.96);
    sg.addColorStop(0, '#c08ae2');
    sg.addColorStop(0.55, '#7e48a6');
    sg.addColorStop(1, '#432062');
    shellPath(1.0, 0.86, 0.02);
    ctx.fillStyle = sg;
    ctx.fill();
    ctx.strokeStyle = '#2b1242';
    ctx.lineWidth = Math.max(1.3, r * 0.032);
    ctx.stroke();

    // Fluted radial shell ribs
    ctx.strokeStyle = 'rgba(232, 200, 255, 0.42)';
    ctx.lineWidth = Math.max(1.2, r * 0.03);
    for (let i = 1; i <= 6; i++) {
      const a = Math.PI * 0.96 + ((i - 0.5) / 6) * Math.PI * 1.08;
      ctx.beginPath();
      ctx.moveTo(0, r * 0.62);
      ctx.lineTo(Math.cos(a) * r * 0.84, Math.sin(a) * r * 0.72);
      ctx.stroke();
    }

    // Open inner cavity with iridescent turquoise-lavender mantle
    const innerGrad = ctx.createRadialGradient(0, 0, r * 0.06, 0, 0, r * 0.56);
    innerGrad.addColorStop(0, '#3e2666');
    innerGrad.addColorStop(0.65, '#644496');
    innerGrad.addColorStop(0.88, '#4cc4c8');
    innerGrad.addColorStop(1, '#266a78');
    ctx.fillStyle = innerGrad;
    ctx.beginPath();
    ctx.ellipse(0, r * 0.04, r * 0.58, r * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();

    // Luminous pearl glow aura
    const aura = ctx.createRadialGradient(0, r * 0.02, r * 0.1, 0, r * 0.02, r * 0.42);
    aura.addColorStop(0, 'rgba(255, 250, 240, 0.72)');
    aura.addColorStop(1, 'rgba(255, 240, 255, 0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, r * 0.02, r * 0.42, 0, Math.PI * 2);
    ctx.fill();

    // Giant iridescent pearl
    const pg = ctx.createRadialGradient(-r * 0.08, -r * 0.06, r * 0.03, 0, r * 0.02, r * 0.25);
    pg.addColorStop(0, '#ffffff');
    pg.addColorStop(0.45, '#fff4f8');
    pg.addColorStop(0.80, '#d8d2ea');
    pg.addColorStop(1, '#988eb8');
    ctx.fillStyle = pg;
    ctx.beginPath();
    ctx.arc(0, r * 0.02, r * 0.24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(130, 118, 162, 0.55)';
    ctx.lineWidth = Math.max(0.8, r * 0.02);
    ctx.stroke();

    drawSparkle(ctx, -r * 0.08, -r * 0.06, r * 0.16, '#ffffff');

    ctx.restore();
  },

  /**
   * 11. pirateshipobject — Detailed sunken wooden galleon wreck with deck planks, broken mast & tattered sail
   */
  pirateshipobject(ctx, r = 48) {
    ctx.save();

    // Deep wreck shadow
    ctx.fillStyle = 'rgba(8, 16, 22, 0.42)';
    ctx.beginPath();
    ctx.ellipse(r * 0.08, r * 0.14, r * 1.12, r * 0.56, -0.14, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate(-0.14);

    // Overhead galleon hull silhouette (pointed bow right, squared stern castle left)
    const hullPath = () => {
      ctx.beginPath();
      ctx.moveTo(-r * 0.96, -r * 0.34);
      ctx.lineTo(-r * 0.46, -r * 0.44);
      ctx.quadraticCurveTo(r * 0.36, -r * 0.46, r * 1.02, 0);
      ctx.quadraticCurveTo(r * 0.36, r * 0.46, -r * 0.46, r * 0.44);
      ctx.lineTo(-r * 0.96, r * 0.34);
      ctx.closePath();
    };

    // Dark outer gunwale hull timber
    hullPath();
    const hullGrad = ctx.createLinearGradient(0, -r * 0.46, 0, r * 0.46);
    hullGrad.addColorStop(0, '#6e492e');
    hullGrad.addColorStop(0.5, '#4b311e');
    hullGrad.addColorStop(1, '#2c1c10');
    ctx.fillStyle = hullGrad;
    ctx.fill();
    ctx.strokeStyle = '#180f08';
    ctx.lineWidth = Math.max(1.4, r * 0.032);
    ctx.stroke();

    // Recessed planked main deck
    ctx.save();
    ctx.scale(0.88, 0.80);
    hullPath();
    const deckGrad = ctx.createLinearGradient(-r * 0.9, 0, r * 0.9, 0);
    deckGrad.addColorStop(0, '#805a3c');
    deckGrad.addColorStop(0.5, '#98704d');
    deckGrad.addColorStop(1, '#704d32');
    ctx.fillStyle = deckGrad;
    ctx.fill();
    ctx.clip();

    // Longitudinal deck plank seams
    ctx.strokeStyle = 'rgba(42, 24, 12, 0.55)';
    ctx.lineWidth = Math.max(0.85, r * 0.02);
    for (let y = -0.36; y <= 0.36; y += 0.12) {
      ctx.beginPath();
      ctx.moveTo(-r, y * r);
      ctx.lineTo(r, y * r);
      ctx.stroke();
    }
    // Cross deck ribs & smashed hull breach
    ctx.fillStyle = 'rgba(18, 22, 24, 0.72)';
    ctx.beginPath();
    ctx.ellipse(r * 0.22, r * 0.12, r * 0.24, r * 0.14, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Raised stern quarterdeck & bowsprit spar
    ctx.fillStyle = '#5f3f27';
    ctx.strokeStyle = '#22150c';
    ctx.lineWidth = Math.max(1.0, r * 0.024);
    ctx.fillRect(-r * 0.88, -r * 0.30, r * 0.32, r * 0.60);
    ctx.strokeRect(-r * 0.88, -r * 0.30, r * 0.32, r * 0.60);

    // Bowsprit spar protruding forward
    ctx.strokeStyle = '#6c492d';
    ctx.lineWidth = Math.max(2.6, r * 0.065);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.82, 0);
    ctx.lineTo(r * 1.18, 0);
    ctx.stroke();

    // Draped tattered cream canvas sail & broken yardarm
    ctx.fillStyle = 'rgba(226, 214, 186, 0.84)';
    ctx.strokeStyle = 'rgba(116, 102, 78, 0.72)';
    ctx.lineWidth = Math.max(1.0, r * 0.022);
    ctx.beginPath();
    ctx.moveTo(-r * 0.08, -r * 0.52);
    ctx.quadraticCurveTo(r * 0.30, -r * 0.42, r * 0.42, -r * 0.12);
    ctx.lineTo(r * 0.22, -r * 0.06);
    ctx.lineTo(r * 0.34, r * 0.18);
    ctx.lineTo(r * 0.06, r * 0.34);
    ctx.quadraticCurveTo(-r * 0.16, r * 0.12, -r * 0.08, -r * 0.52);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Snapped mainmast stump & fallen spar
    ctx.strokeStyle = '#52341e';
    ctx.lineWidth = Math.max(2.4, r * 0.06);
    ctx.beginPath();
    ctx.moveTo(-r * 0.08, -r * 0.56);
    ctx.lineTo(-r * 0.04, r * 0.44);
    ctx.stroke();

    ctx.fillStyle = '#c89e6e';
    ctx.strokeStyle = '#3a2212';
    ctx.lineWidth = Math.max(1.1, r * 0.026);
    ctx.beginPath();
    ctx.arc(-r * 0.06, -r * 0.02, r * 0.10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Moss / sea-algae tufts clinging to wreck
    ctx.fillStyle = 'rgba(72, 128, 72, 0.62)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.64, -r * 0.28, r * 0.14, r * 0.08, 0.3, 0, Math.PI * 2);
    ctx.ellipse(r * 0.52, r * 0.22, r * 0.12, r * 0.07, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },

  /**
   * 12. rowboatobject — Weathered wooden rowboat with oars
   */
  rowboatobject(ctx, r = 48) {
    ctx.save();

    // Shadow
    ctx.fillStyle = 'rgba(10, 20, 26, 0.36)';
    ctx.beginPath();
    ctx.ellipse(r * 0.06, r * 0.12, r * 1.02, r * 0.52, 0.18, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate(0.18);

    const boatPath = (sx, sy) => {
      ctx.beginPath();
      ctx.moveTo(-r * 0.88 * sx, -r * 0.22 * sy);
      ctx.quadraticCurveTo(-r * 0.20 * sx, -r * 0.48 * sy, r * 0.96 * sx, 0);
      ctx.quadraticCurveTo(-r * 0.20 * sx, r * 0.48 * sy, -r * 0.88 * sx, r * 0.22 * sy);
      ctx.quadraticCurveTo(-r * 0.94 * sx, 0, -r * 0.88 * sx, -r * 0.22 * sy);
      ctx.closePath();
    };

    // Outer gunwale rim
    boatPath(1.0, 1.0);
    ctx.fillStyle = '#6f4b2e';
    ctx.fill();
    ctx.strokeStyle = '#24160b';
    ctx.lineWidth = Math.max(1.3, r * 0.03);
    ctx.stroke();

    // Recessed interior hull bottom
    ctx.save();
    boatPath(0.88, 0.82);
    const inGrad = ctx.createRadialGradient(0, 0, r * 0.08, 0, 0, r * 0.86);
    inGrad.addColorStop(0, '#9a714d');
    inGrad.addColorStop(0.7, '#755033');
    inGrad.addColorStop(1, '#4c321e');
    ctx.fillStyle = inGrad;
    ctx.fill();
    ctx.clip();

    // Interior floorboard planks
    ctx.strokeStyle = 'rgba(38, 22, 10, 0.50)';
    ctx.lineWidth = Math.max(0.85, r * 0.02);
    for (let y = -0.32; y <= 0.32; y += 0.11) {
      ctx.beginPath();
      ctx.moveTo(-r, y * r);
      ctx.lineTo(r, y * r);
      ctx.stroke();
    }
    ctx.restore();

    // Three wooden thwart benches
    const benches = [
      { x: -0.58, h: 0.56 },
      { x: -0.06, h: 0.70 },
      { x: 0.42, h: 0.50 }
    ];
    for (const b of benches) {
      ctx.fillStyle = '#a87c54';
      ctx.strokeStyle = '#362112';
      ctx.lineWidth = Math.max(1.0, r * 0.024);
      ctx.fillRect((b.x - 0.07) * r, -b.h * 0.5 * r, r * 0.14, b.h * r);
      ctx.strokeRect((b.x - 0.07) * r, -b.h * 0.5 * r, r * 0.14, b.h * r);
    }

    // Two weathered wooden oars resting diagonally inside/across gunwales
    const drawOar = (ox, oy, ang) => {
      ctx.save();
      ctx.translate(ox * r, oy * r);
      ctx.rotate(ang);
      // Shaft
      ctx.strokeStyle = '#c89f6e';
      ctx.lineWidth = Math.max(2.0, r * 0.048);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-r * 0.54, 0);
      ctx.lineTo(r * 0.42, 0);
      ctx.stroke();
      // Flat oar blade
      ctx.fillStyle = '#b48754';
      ctx.strokeStyle = '#47301a';
      ctx.lineWidth = Math.max(0.9, r * 0.022);
      ctx.beginPath();
      ctx.ellipse(r * 0.48, 0, r * 0.20, r * 0.075, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };
    drawOar(-0.04, -0.14, 0.24);
    drawOar(0.06, 0.16, -0.22);

    ctx.restore();
  },

  /**
   * 13. rumbarrelobject — Iron-banded oak barrel with wood grain
   */
  rumbarrelobject(ctx, r = 48) {
    ctx.save();

    // Soft seabed shadow
    ctx.fillStyle = 'rgba(14, 18, 22, 0.38)';
    ctx.beginPath();
    ctx.ellipse(r * 0.07, r * 0.14, r * 0.88, r * 0.64, -0.22, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate(-0.22);

    // Bulging oak barrel body
    const caskPath = () => {
      ctx.beginPath();
      ctx.moveTo(-r * 0.64, -r * 0.44);
      ctx.quadraticCurveTo(0, -r * 0.62, r * 0.64, -r * 0.44);
      ctx.quadraticCurveTo(r * 0.78, 0, r * 0.64, r * 0.44);
      ctx.quadraticCurveTo(0, r * 0.62, -r * 0.64, r * 0.44);
      ctx.quadraticCurveTo(-r * 0.78, 0, -r * 0.64, -r * 0.44);
      ctx.closePath();
    };

    caskPath();
    const oakGrad = ctx.createLinearGradient(0, -r * 0.58, 0, r * 0.58);
    oakGrad.addColorStop(0, '#bc8652');
    oakGrad.addColorStop(0.32, '#966236');
    oakGrad.addColorStop(0.72, '#6d4422');
    oakGrad.addColorStop(1, '#422712');
    ctx.fillStyle = oakGrad;
    ctx.fill();

    ctx.save();
    caskPath();
    ctx.clip();

    // Curved wooden stave seams & grain lines
    ctx.strokeStyle = 'rgba(42, 22, 10, 0.62)';
    ctx.lineWidth = Math.max(1.0, r * 0.025);
    const staves = [-0.34, -0.17, 0, 0.17, 0.34];
    for (const sy of staves) {
      ctx.beginPath();
      ctx.moveTo(-r * 0.76, sy * r);
      ctx.quadraticCurveTo(0, sy * 1.24 * r, r * 0.76, sy * r);
      ctx.stroke();
    }

    // Four forged iron barrel hoops
    const hoops = [-0.52, -0.22, 0.22, 0.52];
    for (const hx of hoops) {
      const hg = ctx.createLinearGradient(0, -r * 0.6, 0, r * 0.6);
      hg.addColorStop(0, '#727a84');
      hg.addColorStop(0.45, '#3e444c');
      hg.addColorStop(1, '#1d2126');
      ctx.fillStyle = hg;
      ctx.fillRect((hx - 0.042) * r, -r * 0.65, r * 0.084, r * 1.30);
      ctx.strokeStyle = 'rgba(15, 18, 22, 0.8)';
      ctx.lineWidth = Math.max(0.8, r * 0.018);
      ctx.strokeRect((hx - 0.042) * r, -r * 0.65, r * 0.084, r * 1.30);
    }

    // Rust touch on iron hoop & damp moss at lower edge
    ctx.fillStyle = 'rgba(164, 78, 30, 0.55)';
    ctx.fillRect(-0.26 * r, 0.06 * r, r * 0.08, r * 0.18);
    ctx.fillStyle = 'rgba(72, 126, 58, 0.55)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.10, r * 0.44, r * 0.24, r * 0.10, 0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Wooden bung stopper in center stave
    ctx.fillStyle = '#5c361a';
    ctx.strokeStyle = '#261408';
    ctx.lineWidth = Math.max(0.9, r * 0.022);
    ctx.beginPath();
    ctx.arc(0, -r * 0.08, r * 0.075, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Crisp outer outline
    caskPath();
    ctx.strokeStyle = '#241409';
    ctx.lineWidth = Math.max(1.3, r * 0.032);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 14. shipwheelobject — Spoked brass-hub wooden helm wheel
   */
  shipwheelobject(ctx, r = 48) {
    ctx.save();

    // Shadow
    ctx.fillStyle = 'rgba(12, 18, 22, 0.34)';
    ctx.beginPath();
    ctx.arc(r * 0.07, r * 0.11, r * 0.86, 0, Math.PI * 2);
    ctx.fill();

    // 8 turned wooden spokes & projecting handles
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      ctx.save();
      ctx.rotate(a);

      // Spoke shaft
      const spGrad = ctx.createLinearGradient(0, -r * 0.05, 0, r * 0.05);
      spGrad.addColorStop(0, '#c68a52');
      spGrad.addColorStop(0.5, '#8c582d');
      spGrad.addColorStop(1, '#523015');
      ctx.fillStyle = spGrad;
      ctx.strokeStyle = '#261408';
      ctx.lineWidth = Math.max(0.9, r * 0.02);
            roundRectPath(ctx, r * 0.12, -r * 0.045, r * 0.78, r * 0.09, r * 0.03);
      ctx.fill();
      ctx.stroke();

      // Turned handle knob tip
      ctx.fillStyle = '#b47a44';
      ctx.beginPath();
      ctx.arc(r * 0.90, 0, r * 0.068, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }

    // Laminated mahogany wheel rim
    ctx.strokeStyle = '#261408';
    ctx.lineWidth = Math.max(6.2, r * 0.19);
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.62, 0, Math.PI * 2);
    ctx.stroke();

    const rimGrad = ctx.createLinearGradient(-r * 0.7, -r * 0.7, r * 0.7, r * 0.7);
    rimGrad.addColorStop(0, '#c4864e');
    rimGrad.addColorStop(0.5, '#844f26');
    rimGrad.addColorStop(1, '#4c2b12');
    ctx.strokeStyle = rimGrad;
    ctx.lineWidth = Math.max(4.6, r * 0.145);
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.62, 0, Math.PI * 2);
    ctx.stroke();

    // Brass rim inlay ring
    ctx.strokeStyle = 'rgba(232, 188, 86, 0.72)';
    ctx.lineWidth = Math.max(1.0, r * 0.025);
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.62, 0, Math.PI * 2);
    ctx.stroke();

    // Gleaming riveted brass center hub
    const hubGrad = ctx.createRadialGradient(-r * 0.06, -r * 0.06, r * 0.03, 0, 0, r * 0.24);
    hubGrad.addColorStop(0, '#fff0a6');
    hubGrad.addColorStop(0.55, '#cf9a36');
    hubGrad.addColorStop(1, '#6e4910');
    ctx.fillStyle = hubGrad;
    ctx.strokeStyle = '#3d2708';
    ctx.lineWidth = Math.max(1.2, r * 0.028);
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Inner hub bolt
    ctx.fillStyle = '#5c3c0c';
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.065, 0, Math.PI * 2);
    ctx.fill();

    drawSparkle(ctx, -r * 0.07, -r * 0.07, r * 0.12, '#fffbe0');

    ctx.restore();
  },

  /**
   * 15. skullpileobject — Weathered sunken pirate skulls & bones
   */
  skullpileobject(ctx, r = 48) {
    ctx.save();

    // Shadow
    ctx.fillStyle = 'rgba(16, 20, 22, 0.38)';
    ctx.beginPath();
    ctx.ellipse(r * 0.06, r * 0.12, r * 0.94, r * 0.76, 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Crossed weathered femurs underneath
    const drawBone = (bx, by, len, ang) => {
      ctx.save();
      ctx.translate(bx * r, by * r);
      ctx.rotate(ang);
      ctx.fillStyle = '#ddd2bc';
      ctx.strokeStyle = '#6c604c';
      ctx.lineWidth = Math.max(1.0, r * 0.024);
            roundRectPath(ctx, -len * 0.5 * r, -r * 0.055, len * r, r * 0.11, r * 0.04);
      ctx.fill();
      ctx.stroke();
      for (const sx of [-1, 1]) {
        for (const sy of [-1, 1]) {
          ctx.beginPath();
          ctx.arc(sx * len * 0.5 * r, sy * r * 0.055, r * 0.068, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.restore();
    };
    drawBone(0, 0.04, 1.36, 0.48);
    drawBone(0.04, 0.02, 1.30, -0.56);

    // Helper for individual weathered cranium
    const drawSkull = (sx, sy, sc, rot) => {
      ctx.save();
      ctx.translate(sx * r, sy * r);
      ctx.rotate(rot);
      ctx.scale(sc, sc);

      // Cranium & jaw
      const g = ctx.createRadialGradient(-r * 0.10, -r * 0.14, r * 0.04, 0, 0, r * 0.42);
      g.addColorStop(0, '#f8f0dc');
      g.addColorStop(0.65, '#d6c8a8');
      g.addColorStop(1, '#98896c');
      ctx.fillStyle = g;
      ctx.strokeStyle = '#4e4434';
      ctx.lineWidth = Math.max(1.1, r * 0.028);

      ctx.beginPath();
      ctx.arc(0, -r * 0.06, r * 0.30, Math.PI * 0.85, Math.PI * 2.15);
      ctx.lineTo(r * 0.22, r * 0.24);
      ctx.lineTo(r * 0.16, r * 0.34);
      ctx.lineTo(-r * 0.16, r * 0.34);
      ctx.lineTo(-r * 0.22, r * 0.24);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Hollow eye sockets
      ctx.fillStyle = '#241e1a';
      ctx.beginPath();
      ctx.ellipse(-r * 0.11, r * 0.04, r * 0.075, r * 0.065, -0.15, 0, Math.PI * 2);
      ctx.ellipse(r * 0.11, r * 0.04, r * 0.075, r * 0.065, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Nasal cavity
      ctx.beginPath();
      ctx.moveTo(0, r * 0.10);
      ctx.lineTo(r * 0.045, r * 0.19);
      ctx.lineTo(-r * 0.045, r * 0.19);
      ctx.closePath();
      ctx.fill();

      // Tooth vertical grooves
      ctx.strokeStyle = '#5c503e';
      ctx.lineWidth = Math.max(0.8, r * 0.02);
      for (const tx of [-0.08, 0, 0.08]) {
        ctx.beginPath();
        ctx.moveTo(tx * r, r * 0.24);
        ctx.lineTo(tx * r, r * 0.33);
        ctx.stroke();
      }

      ctx.restore();
    };

    drawSkull(-0.34, 0.18, 0.78, -0.45);
    drawSkull(0.36, 0.16, 0.76, 0.42);
    drawSkull(0.0, -0.16, 0.92, -0.12);

    // Subtle sea-moss tuft on lower skull
    ctx.fillStyle = 'rgba(78, 128, 66, 0.55)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.42, r * 0.06, r * 0.10, r * 0.06, 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },

  /**
   * 16. treasurechestobject — Open iron-bound oak chest overflowing with gold & gems
   */
  treasurechestobject(ctx, r = 48) {
    ctx.save();

    // Warm deep seabed shadow
    ctx.fillStyle = 'rgba(18, 14, 10, 0.42)';
    ctx.beginPath();
    ctx.ellipse(r * 0.06, r * 0.16, r * 0.96, r * 0.72, 0, 0, Math.PI * 2);
    ctx.fill();

    // Open arched wooden lid thrown back behind chest
    const lidGrad = ctx.createLinearGradient(0, -r * 0.74, 0, -r * 0.20);
    lidGrad.addColorStop(0, '#6a4224');
    lidGrad.addColorStop(0.55, '#8c5a32');
    lidGrad.addColorStop(1, '#4a2c16');
    ctx.fillStyle = lidGrad;
    ctx.strokeStyle = '#24140a';
    ctx.lineWidth = Math.max(1.3, r * 0.03);
        roundRectPath(ctx, -r * 0.72, -r * 0.72, r * 1.44, r * 0.46, r * 0.10);
    ctx.fill();
    ctx.stroke();

    // Iron straps on open lid
    ctx.fillStyle = '#384048';
    ctx.fillRect(-r * 0.56, -r * 0.72, r * 0.12, r * 0.46);
    ctx.fillRect(r * 0.44, -r * 0.72, r * 0.12, r * 0.46);

    // Main chest lower wooden box
    const boxGrad = ctx.createLinearGradient(0, -r * 0.24, 0, r * 0.68);
    boxGrad.addColorStop(0, '#966238');
    boxGrad.addColorStop(0.6, '#704624');
    boxGrad.addColorStop(1, '#422612');
    ctx.fillStyle = boxGrad;
        roundRectPath(ctx, -r * 0.76, -r * 0.26, r * 1.52, r * 0.92, r * 0.08);
    ctx.fill();
    ctx.stroke();

    // Dark recessed interior rim
    ctx.fillStyle = '#2c180a';
        roundRectPath(ctx, -r * 0.66, -r * 0.20, r * 1.32, r * 0.52, r * 0.05);
    ctx.fill();

    // Overflowing mound of gold coins inside chest
    const goldMound = ctx.createRadialGradient(-r * 0.10, -r * 0.06, r * 0.06, 0, 0, r * 0.64);
    goldMound.addColorStop(0, '#fff090');
    goldMound.addColorStop(0.55, '#f0b624');
    goldMound.addColorStop(1, '#9c640c');
    ctx.fillStyle = goldMound;
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.02, r * 0.62, r * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();

    // Individual gleaming gold coins heaped inside & spilling over front lip
    const coinPos = [
      [-0.44, -0.06], [-0.28, -0.14], [-0.10, -0.16], [0.12, -0.14], [0.34, -0.10],
      [0.48, 0.02], [-0.36, 0.08], [-0.16, 0.10], [0.06, 0.08], [0.28, 0.10],
      [-0.04, -0.02], [0.18, -0.02], [-0.24, 0.0], [0.40, 0.18]
    ];
    for (const [cx, cy] of coinPos) {
      ctx.fillStyle = '#f8c838';
      ctx.strokeStyle = '#8c560a';
      ctx.lineWidth = Math.max(0.75, r * 0.018);
      ctx.beginPath();
      ctx.ellipse(cx * r, cy * r, r * 0.11, r * 0.08, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Vibrant gemstones nestled in gold
    const gems = [
      { x: -0.26, y: -0.02, col: '#e62244', hi: '#ff9eb0' }, // Ruby
      { x: 0.24, y: -0.04, col: '#14b460', hi: '#9effc8' },  // Emerald
      { x: 0.02, y: -0.12, col: '#2478f0', hi: '#a6d4ff' }   // Sapphire
    ];
    for (const g of gems) {
      ctx.fillStyle = g.col;
      ctx.strokeStyle = '#3a1a12';
      ctx.lineWidth = Math.max(0.75, r * 0.018);
      ctx.beginPath();
      ctx.moveTo(g.x * r, (g.y - 0.10) * r);
      ctx.lineTo((g.x + 0.09) * r, g.y * r);
      ctx.lineTo(g.x * r, (g.y + 0.10) * r);
      ctx.lineTo((g.x - 0.09) * r, g.y * r);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = g.hi;
      ctx.beginPath();
      ctx.arc((g.x - 0.02) * r, (g.y - 0.03) * r, r * 0.03, 0, Math.PI * 2);
      ctx.fill();
    }

    // Front oak plank wall & heavy iron binding straps
    ctx.fillStyle = '#6c4222';
    ctx.strokeStyle = '#24140a';
    ctx.lineWidth = Math.max(1.2, r * 0.028);
        roundRectPath(ctx, -r * 0.76, r * 0.24, r * 1.52, r * 0.42, r * 0.05);
    ctx.fill();
    ctx.stroke();

    // Left & right iron straps with rivets
    ctx.fillStyle = '#3c444d';
    ctx.fillRect(-r * 0.60, r * 0.24, r * 0.13, r * 0.42);
    ctx.fillRect(r * 0.47, r * 0.24, r * 0.13, r * 0.42);
    ctx.fillStyle = '#9aa4b0';
    for (const rx of [-0.535, 0.535]) {
      ctx.beginPath();
      ctx.arc(rx * r, r * 0.34, r * 0.025, 0, Math.PI * 2);
      ctx.arc(rx * r, r * 0.56, r * 0.025, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ornate golden lock escutcheon & keyhole
    ctx.fillStyle = '#e8b638';
    ctx.strokeStyle = '#523408';
    ctx.lineWidth = Math.max(1.0, r * 0.024);
        roundRectPath(ctx, -r * 0.13, r * 0.22, r * 0.26, r * 0.28, r * 0.05);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#1e1206';
    ctx.beginPath();
    ctx.arc(0, r * 0.33, r * 0.036, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-r * 0.018, r * 0.34, r * 0.036, r * 0.08);

    // Bright treasure sparkle glints
    drawSparkle(ctx, -r * 0.26, -r * 0.08, r * 0.18, '#ffffff');
    drawSparkle(ctx, r * 0.26, -r * 0.08, r * 0.16, '#fff8c0');
    drawSparkle(ctx, r * 0.02, -r * 0.18, r * 0.14, '#e6f6ff');

    ctx.restore();
  }
};

module.exports = { rocks, objects };

  return module.exports;
})();

const PAINTED_FISH = { ...PAINTED_FISH_1, ...PAINTED_FISH_2, ...PAINTED_FISH_3 };
const PAINTED_ROCKS = PAINTED_RO_PACK.rocks;
const PAINTED_OBJECTS = PAINTED_RO_PACK.objects;

const bakedStaticCache = new Map();

// Pre-bake static Floras, Rocks & Sunken Relics ONCE at high resolution (240x240)
// with soft underwater shadow baked in -> 1 single GPU drawImage() per frame (zero lag!)
function getBakedStaticCanvas(cacheKey, fn, r) {
  if (bakedStaticCache.has(cacheKey)) return bakedStaticCache.get(cacheKey);
  if (typeof fn !== 'function') return null;
  const size = Math.max(140, Math.min(280, Math.ceil(r * 3.6)));
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const bctx = c.getContext('2d');
  bctx.save();
  bctx.translate(size * 0.5, size * 0.5);
  // Bake soft drop shadow ONCE onto offscreen canvas
  bctx.shadowColor = 'rgba(2, 18, 28, 0.42)';
  bctx.shadowBlur = 10;
  bctx.shadowOffsetX = 7;
  bctx.shadowOffsetY = 9;
  try {
    fn(bctx, r, 0, 0);
  } catch {
    // Guard against any individual path error
  }
  bctx.restore();
  const entry = { canvas: c, size };
  bakedStaticCache.set(cacheKey, entry);
  return entry;
}

function drawBakedStatic(ctx, cacheKey, fn, x, y, angle, r, alpha = 1) {
  const baked = getBakedStaticCanvas(cacheKey, fn, r);
  if (!baked) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;
  ctx.drawImage(baked.canvas, -baked.size * 0.5, -baked.size * 0.5);
  ctx.restore();
}

// Fast, zero-blur animated fish renderer: draws 1 lightweight soft radial underwater shadow
// underneath the fish, then runs the unique painted illustration with shadowBlur = 0!
function drawUniqueFishFast(ctx, fn, x, y, angle, r, t, speed, alpha = 1, sx = 9, sy = 12) {
  if (typeof fn !== 'function') return;
  ctx.save();
  ctx.translate(x + sx, y + sy);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha * 0.36;
  const sg = ctx.createRadialGradient(0, 0, r * 0.15, 0, 0, r * 1.25);
  sg.addColorStop(0, 'rgba(1, 14, 22, 0.9)');
  sg.addColorStop(0.65, 'rgba(1, 14, 22, 0.42)');
  sg.addColorStop(1, 'rgba(1, 14, 22, 0)');
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 1.25, r * 0.62, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  try {
    fn(ctx, r, t, speed);
  } catch {
    // Guard against any individual path error
  }
  ctx.restore();
}

// ============================================================================
// 3. ADAPTIVE UNDERWATER MUSIC & FULL-SPECTRUM AQUATIC SFX ENGINE
// ============================================================================
class CozyOceanAudio {
  constructor() {
    this.ctx = null; this.master = null; this.musicGain = null; this.musicFilter = null;
    this.noiseBuf = null; this.muted = false; this.musicStarted = false;
    this.musicTimer = null; this.stepIdx = 0; this.mood = 'calm'; // calm | hidden | chase | apex
    this.lastPulse = 0; this.lastSonar = 0; this.lastSwim = 0; this.lastDart = 0; this.lastBubble = 0;
  }
  unlock() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {}); return; }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.38;
      this.master.connect(this.ctx.destination);

      // Dedicated adaptive music bus with underwater lowpass filter
      this.musicFilter = this.ctx.createBiquadFilter();
      this.musicFilter.type = 'lowpass';
      this.musicFilter.frequency.value = 1150;
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.24;
      this.musicFilter.connect(this.musicGain);
      this.musicGain.connect(this.master);

      const len = this.ctx.sampleRate;
      const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      this.noiseBuf = buf;
      this.startMusic();
    } catch { /* ignore */ }
  }
  setMuted(m) {
    this.muted = m;
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.38, this.ctx.currentTime, 0.04);
  }
  setMood(nextMood) {
    if (this.mood === nextMood) return;
    this.mood = nextMood;
    if (!this.musicFilter || !this.ctx) return;
    const targetFreq = nextMood === 'hidden' ? 420 : nextMood === 'chase' ? 1650 : nextMood === 'apex' ? 2100 : 1150;
    this.musicFilter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.25);
  }
  startMusic() {
    if (this.musicStarted || !this.ctx || !this.master) return;
    this.musicStarted = true;
    try {
      // Warm deep ocean drone pad
      const pad = this.ctx.createOscillator(), lfo = this.ctx.createOscillator(), lfoG = this.ctx.createGain();
      const padG = this.ctx.createGain();
      pad.type = 'sine'; pad.frequency.value = 65.41; // C2 warm underwater root
      lfo.type = 'sine'; lfo.frequency.value = 0.12; lfoG.gain.value = 4.5;
      padG.gain.value = 0.16;
      lfo.connect(lfoG); lfoG.connect(pad.frequency); pad.connect(padG); padG.connect(this.musicFilter);
      pad.start(); lfo.start();

      // Generative cozy pentatonic underwater harp / marimba sequencer (runs every 380ms)
      const calmMelody = [261.63, 329.63, 392.0, 440.0, 523.25, 392.0, 329.63, 293.66, 261.63, 392.0, 440.0, 587.33, 523.25, 440.0, 329.63, 293.66];
      const chaseBass = [130.81, 130.81, 155.56, 130.81, 174.61, 155.56, 146.83, 123.47];
      const apexArp = [392.0, 493.88, 587.33, 783.99, 659.25, 587.33, 493.88, 587.33];

      this.musicTimer = setInterval(() => {
        if (!this.ctx || this.muted || this.ctx.state !== 'running') return;
        const step = this.stepIdx++;
        const t = this.ctx.currentTime;
        if (this.mood === 'chase') {
          const bf = chaseBass[step % chaseBass.length];
          this.musicNote(bf, 0.28, 'triangle', 0.24, t);
          if (step % 2 === 0) this.musicNote(bf * 2, 0.16, 'sine', 0.1, t + 0.08);
        } else if (this.mood === 'apex') {
          const af = apexArp[step % apexArp.length];
          this.musicNote(af, 0.34, 'triangle', 0.18, t);
          if (step % 4 === 0) this.musicNote(196.0, 0.65, 'sine', 0.22, t);
        } else {
          // Cozy calm / hidden sunlit lotus pond harp
          if (step % 2 === 0 || step % 7 === 0) {
            const mf = calmMelody[step % calmMelody.length];
            this.musicNote(mf, 0.68, 'sine', 0.17, t);
            this.musicNote(mf * 2, 0.35, 'sine', 0.045, t + 0.02);
          }
          if (step % 8 === 0) {
            const root = step % 16 === 0 ? 130.81 : 146.83;
            this.musicNote(root, 1.3, 'sine', 0.18, t);
          }
        }
      }, 360);
    } catch { /* ignore */ }
  }
  musicNote(freq, dur, type, vol, startTime) {
    if (!this.ctx || !this.musicFilter) return;
    try {
      const osc = this.ctx.createOscillator(), g = this.ctx.createGain();
      osc.type = type; osc.frequency.setValueAtTime(freq, startTime);
      g.gain.setValueAtTime(0.001, startTime);
      g.gain.linearRampToValueAtTime(vol, startTime + 0.025);
      g.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
      osc.connect(g); g.connect(this.musicFilter);
      osc.start(startTime); osc.stop(startTime + dur + 0.03);
    } catch { /* ignore */ }
  }
  stop() {
    if (this.ctx && this.ctx.state === 'running') this.ctx.suspend().catch(() => {});
  }
  noiseBurst(freq, q, dur, vol = 0.18, delay = 0, filterType = 'bandpass') {
    if (!this.ctx || !this.master || !this.noiseBuf || this.muted) return;
    try {
      const t = this.ctx.currentTime + delay, src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuf;
      const flt = this.ctx.createBiquadFilter();
      flt.type = filterType; flt.frequency.setValueAtTime(freq, t);
      flt.frequency.exponentialRampToValueAtTime(Math.max(80, freq * 0.45), t + dur); flt.Q.value = q;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.001, t); g.gain.linearRampToValueAtTime(vol, t + Math.min(0.025, dur * 0.25));
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      src.connect(flt); flt.connect(g); g.connect(this.master);
      src.start(t); src.stop(t + dur + 0.03);
    } catch { /* ignore */ }
  }
  tone(f1, f2, dur, type = 'sine', vol = 0.22, delay = 0) {
    if (!this.ctx || !this.master || this.muted) return;
    try {
      const t = this.ctx.currentTime + delay, osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
      osc.type = type; osc.frequency.setValueAtTime(f1, t);
      if (f2 !== f1) osc.frequency.exponentialRampToValueAtTime(Math.max(24, f2), t + dur);
      gain.gain.setValueAtTime(0.001, t); gain.gain.linearRampToValueAtTime(vol, t + Math.min(0.015, dur * 0.22));
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain); gain.connect(this.master); osc.start(t); osc.stop(t + dur + 0.02);
    } catch { /* ignore */ }
  }
  ambientBubble(nowSec) {
    if (nowSec - this.lastBubble < 2.8) return;
    this.lastBubble = nowSec + Math.random() * 1.8;
    const f = 340 + Math.random() * 280;
    this.tone(f, f * 1.85, 0.09, 'sine', 0.065);
  }
  swimGlide(nowSec) {
    if (nowSec - this.lastSwim < 0.36) return;
    this.lastSwim = nowSec;
    this.noiseBurst(520, 1.8, 0.14, 0.055, 0, 'bandpass');
  }
  preyDart(nowSec) {
    if (nowSec - this.lastDart < 0.25) return;
    this.lastDart = nowSec;
    this.tone(580, 320, 0.08, 'sine', 0.075);
    this.noiseBurst(1400, 2.2, 0.08, 0.06);
  }
  eat(combo = 0) {
    const scale = [392, 440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5];
    const note = scale[Math.min(combo, scale.length - 1)];
    this.tone(note * 0.72, note, 0.09, 'sine', 0.24);
    this.tone(note, note * 1.5, 0.14, 'triangle', 0.18, 0.03);
    this.noiseBurst(1600, 3.2, 0.07, 0.09);
  }
  dash() { this.noiseBurst(950, 1.4, 0.22, 0.22, 0, 'bandpass'); this.tone(240, 105, 0.16, 'sine', 0.16); }
  hide() { this.noiseBurst(2200, 2.5, 0.16, 0.13, 0, 'bandpass'); this.tone(520, 415, 0.14, 'sine', 0.1); }
  unhide() { this.tone(390, 540, 0.1, 'sine', 0.08); }
  suspicious() { this.tone(310, 370, 0.14, 'triangle', 0.12); }
  alert() { this.tone(185, 295, 0.18, 'sawtooth', 0.16); this.tone(110, 82, 0.28, 'triangle', 0.2, 0.08); }
  heartbeat(nowSec) {
    if (nowSec - this.lastPulse < 0.48) return;
    this.lastPulse = nowSec;
    this.tone(82, 48, 0.12, 'sine', 0.24); this.tone(70, 42, 0.12, 'sine', 0.17, 0.14);
  }
  sonar(nowSec) {
    if (nowSec - this.lastSonar < 2.5) return;
    this.lastSonar = nowSec;
    this.tone(987.77, 980, 0.48, 'sine', 0.11); this.tone(1480, 1470, 0.36, 'sine', 0.05, 0.06);
  }
  evolve() {
    this.tone(110, 55, 0.55, 'sine', 0.28);
    this.noiseBurst(1800, 1.6, 0.35, 0.14, 0.04);
    [392, 493.88, 587.33, 783.99, 987.77, 1174.66].forEach((n, i) => this.tone(n, n * 1.005, 0.38, 'triangle', 0.18, i * 0.055));
  }
  expand() {
    // Shimmering sunlight-expansion wash as the dark ocean rolls back!
    this.noiseBurst(1200, 1.0, 0.55, 0.12, 0, 'bandpass');
    [261.63, 329.63, 392.0, 523.25, 659.25].forEach((n, i) => this.tone(n, n * 1.02, 0.55, 'sine', 0.13, i * 0.07));
  }
  takedown() {
    this.noiseBurst(720, 0.9, 0.28, 0.28, 0, 'lowpass');
    this.tone(160, 58, 0.24, 'sawtooth', 0.24);
    [523.25, 659.25, 783.99, 987.77, 1174.66].forEach((n, i) => this.tone(n, n, 0.58, 'triangle', 0.18, 0.07 + i * 0.055));
  }
  caught() {
    this.noiseBurst(420, 1.2, 0.26, 0.24, 0, 'lowpass');
    this.tone(240, 78, 0.36, 'sawtooth', 0.24); this.tone(165, 52, 0.42, 'triangle', 0.18, 0.1);
  }
}
const audio = new CozyOceanAudio();

// ============================================================================
// 4. ORGANIC SUNLIT CLEARING & TEMPLATE MAP GENERATOR
// ============================================================================
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function wrapAngle(a) { let r = a; while (r > Math.PI) r -= Math.PI * 2; while (r < -Math.PI) r += Math.PI * 2; return r; }
function lerpAngle(a, b, t) { return a + wrapAngle(b - a) * t; }

function getOrganicRadius(theta, baseR, seedPhase) {
  return baseR * (
    1 +
    Math.sin(theta * 2 + seedPhase * 1.1) * 0.11 +
    Math.cos(theta * 3 - seedPhase * 0.7) * 0.095 +
    Math.sin(theta * 5 + seedPhase * 1.9) * 0.055 +
    Math.cos(theta * 7 - seedPhase * 0.4) * 0.028
  );
}
function getBaseRadiusForStage(lv) {
  const capped = Math.min(lv, EXPANSION_CAP_STAGE);
  // Early stages expand boldly (+55px) for instant visual delight, smoothly tapering to 1370px cap at stage 50
  const t = (capped - 1) / (EXPANSION_CAP_STAGE - 1);
  return Math.round(390 + (1 - Math.pow(1 - t, 1.55)) * 980);
}

// Psychology-grounded Sawtooth Difficulty Modulator (scales hiding, prey & predator fun!)
function getSawtoothParams(lv) {
  const inArc = (lv - 1) % 5; // 0..3 climb, 4 = relief breather
  const isRelief = lv === 1 || lv === 4 || inArc === 4;
  const depth = Math.min(1, (lv - 1) / 49); // 0.0 at lv1 -> 1.0 at lv50+
  const tooth = lv === 1 ? -0.25 : isRelief ? -0.16 : inArc * 0.075;
  const eff = clamp(depth + tooth * 0.45, 0, 1.05);

  return {
    preyCount: lv === 1 ? 6 : Math.max(7, Math.round(8 + depth * 13 + (isRelief ? -2 : inArc))),
    preySpeed: Math.round(88 + eff * 68),            // 88 -> 156 px/s (agile serpentine prey!)
    preyRest: clamp(1.05 - eff * 0.48, 0.52, 1.05),  // shorter rest windows at higher stages
    preyDetect: Math.round(155 + eff * 65),          // sharper prey awareness
    predSpeed: Math.round(114 + eff * 54),           // starts at 1/2 player (114), scales to 168 (always fair vs 228!)
    predDashMult: 1.28 + eff * 0.24,                 // sharper predator evasion bursts
    predJukeFreq: clamp(1.25 - eff * 0.55, 0.58, 1.25),
    visionScale: clamp(0.78 + eff * 0.52, 0.78, 1.32),
    hideMargin: clamp(0.92 - eff * 0.20, 0.70, 0.92), // tighter stealth cover zone at higher stages
    flushDist: lv <= 3 ? 0 : Math.round(24 + eff * 28), // higher-stage predator can flush you if swimming right over your lily pad!
    hearRange: Math.round(210 + eff * 170),          // hears prey splashes & dashes further away
    relief: isRelief,
  };
}

// Area-proportional Predator Pack Count (1..5 max, with -1 breather on relief stages after lv 10)
function getPredatorCountForStage(lv, isRelief) {
  let count = 1;
  if (lv >= 41) count = 5;
  else if (lv >= 28) count = 4;
  else if (lv >= 16) count = 3;
  else if (lv >= 7) count = 2;
  if (isRelief && lv > 10 && count > 1) count -= 1;
  return count;
}

function isInsideOrganicZone(x, y, baseR, seedPhase, margin = 0) {
  const dx = x - WORLD_CX, dy = y - WORLD_CY;
  return Math.hypot(dx, dy) <= getOrganicRadius(Math.atan2(dy, dx), baseR, seedPhase) - margin;
}

function constrainToOrganicZone(entity, baseR, seedPhase) {
  const dx = entity.x - WORLD_CX, dy = entity.y - WORLD_CY;
  const dist = Math.hypot(dx, dy);
  const maxR = getOrganicRadius(Math.atan2(dy, dx), baseR, seedPhase) - entity.r - 8;
  if (dist > maxR && dist > 0.001) {
    entity.x = WORLD_CX + (dx / dist) * maxR;
    entity.y = WORLD_CY + (dy / dist) * maxR;
    const nx = dx / dist, ny = dy / dist;
    const vn = entity.vx * nx + entity.vy * ny;
    if (vn > 0) { entity.vx -= vn * nx * 1.1; entity.vy -= vn * ny * 1.1; }
  }
}

function traceOrganicPath(ctx, baseR, seedPhase, segments = 104) {
  ctx.beginPath();
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const r = getOrganicRadius(theta, baseR, seedPhase);
    const px = WORLD_CX + Math.cos(theta) * r;
    const py = WORLD_CY + Math.sin(theta) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

// Build ONE permanent, steady, multi-ring handcrafted Ocean World ONCE!
// Every flora, rock, and sunken relic stays anchored at its exact (x, y) forever —
// as the sunlit clearing expands outward, previously pitch-dark outer rings naturally appear!
function buildPersistentOceanWorld() {
  const rng = mulberry32(114050);
  const rocks = [];
  const objects = [];
  const floras = [];
  const seedPhase = 1.37;

  const overlapsHard = (x, y, r, pad = 26) => {
    if (Math.hypot(x - WORLD_CX, y - WORLD_CY) < r + 115) return true;
    for (const o of rocks) if (Math.hypot(x - o.x, y - o.y) < r + o.r + pad) return true;
    for (const o of objects) if (Math.hypot(x - o.x, y - o.y) < r + o.r + pad) return true;
    return false;
  };

  // 6 concentric handcrafted architectural rings spanning R = 0 -> 1370px (Levels 1..50!)
  const ringSpecs = [
    { tplIdx: 0, scaleR: 335, minD: 110, maxD: 375, rot: 0.25, flip: 1, floraStart: 0 },   // Stage 1-2: Lotus Stepping Stones
    { tplIdx: 1, scaleR: 545, minD: 385, maxD: 575, rot: 1.15, flip: -1, floraStart: 3 },  // Stage 3-7: Sunken Galleon Cove
    { tplIdx: 2, scaleR: 745, minD: 580, maxD: 775, rot: 2.35, flip: 1, floraStart: 6 },   // Stage 8-15: Twin Coral Arches
    { tplIdx: 3, scaleR: 945, minD: 780, maxD: 975, rot: 0.85, flip: -1, floraStart: 9 },  // Stage 16-26: Whispering Kelp Maze
    { tplIdx: 4, scaleR: 1140, minD: 980, maxD: 1175, rot: 3.65, flip: 1, floraStart: 11 },// Stage 27-38: Basalt Sanctuary Ring
    { tplIdx: 7, scaleR: 1315, minD: 1180, maxD: 1350, rot: 1.95, flip: -1, floraStart: 13 },// Stage 39-50: Abyssal Relic Courtyard
  ];

  let rockIdx = 0, objIdx = 0, floraIdx = 0;

  ringSpecs.forEach((ring, rIdx) => {
    const tpl = MAP_TEMPLATES[ring.tplIdx];
    const cosR = Math.cos(ring.rot), sinR = Math.sin(ring.rot);
    // For outer rings (rIdx >= 1), stamp 2 rotated copies around the ring so the wider ocean stays richly structured
    const copies = rIdx === 0 ? [0] : [0, Math.PI * 0.52, Math.PI * 1.18];
    copies.forEach((extraRot, cIdx) => {
      const aCos = Math.cos(ring.rot + extraRot), aSin = Math.sin(ring.rot + extraRot);
      const project = (nx, ny) => {
        const fx = nx * ring.flip;
        const ang = Math.atan2(ny, fx) + ring.rot + extraRot;
        const norm = clamp(Math.hypot(fx, ny) / 0.82, 0.12, 0.96);
        const dist = ring.minD + norm * (ring.maxD - ring.minD);
        return { x: WORLD_CX + Math.cos(ang) * dist, y: WORLD_CY + Math.sin(ang) * dist };
      };

      tpl.rocks.forEach((rk) => {
        const pt = project(rk.x, rk.y);
        const d = Math.hypot(pt.x - WORLD_CX, pt.y - WORLD_CY);
        const r = clamp(rk.r * (0.95 + rng() * 0.16), 24, 44);
        if (d < ring.minD || d > ring.maxD) return;
        if (!isInsideOrganicZone(pt.x, pt.y, 1370, seedPhase, r + 24)) return;
        if (overlapsHard(pt.x, pt.y, r, 32)) return;
        rocks.push({
          x: pt.x, y: pt.y, r,
          variety: ROCK_VARIETIES[rockIdx % ROCK_VARIETIES.length],
          angle: rng() * Math.PI * 2,
        });
        rockIdx++;
      });

      tpl.objects.forEach((ob) => {
        const pt = project(ob.x, ob.y);
        const d = Math.hypot(pt.x - WORLD_CX, pt.y - WORLD_CY);
        const r = clamp(ob.r * (0.95 + rng() * 0.15), 34, 58);
        if (d < ring.minD || d > ring.maxD) return;
        if (!isInsideOrganicZone(pt.x, pt.y, 1370, seedPhase, r + 28)) return;
        if (overlapsHard(pt.x, pt.y, r, 38)) return;
        objects.push({
          x: pt.x, y: pt.y, r,
          variety: OBJECT_VARIETIES[objIdx % OBJECT_VARIETIES.length],
          angle: rng() * Math.PI * 2,
        });
        objIdx++;
      });

      tpl.floras.forEach((fl) => {
        const pt = project(fl.x, fl.y);
        const d = Math.hypot(pt.x - WORLD_CX, pt.y - WORLD_CY);
        const r = clamp(fl.r * (0.95 + rng() * 0.16), 48, 74);
        if (d < ring.minD || d > ring.maxD) return;
        if (!isInsideOrganicZone(pt.x, pt.y, 1370, seedPhase, r + 18)) return;
        // Avoid piling floras right on top of each other
        if (floras.some((ex) => Math.hypot(pt.x - ex.x, pt.y - ex.y) < (r + ex.r) * 0.65)) return;
        const varIdx = rIdx === 0 && floraIdx < 4 ? floraIdx % 4 : (ring.floraStart + floraIdx + cIdx) % FLORA_VARIETIES.length;
        floras.push({
          x: pt.x, y: pt.y, r,
          variety: FLORA_VARIETIES[varIdx],
          angle: rng() * Math.PI * 2,
          phase: rng() * Math.PI * 2,
        });
        floraIdx++;
      });
    });
  });

  return { rocks, objects, floras };
}

function rayCircleHitDist(ox, oy, dx, dy, cx, cy, cr, maxDist) {
  const fx = ox - cx, fy = oy - cy;
  const b = 2 * (fx * dx + fy * dy);
  const c = fx * fx + fy * fy - cr * cr;
  const disc = b * b - 4 * c;
  if (disc < 0) return maxDist;
  const t1 = (-b - Math.sqrt(disc)) * 0.5;
  return t1 >= 0 && t1 < maxDist ? t1 : maxDist;
}

function hasLineOfSight(x1, y1, x2, y2, hardObstacles) {
  const vx = x2 - x1, vy = y2 - y1, dist = Math.hypot(vx, vy);
  if (dist < 1) return true;
  const dx = vx / dist, dy = vy / dist;
  for (let i = 0; i < hardObstacles.length; i++) {
    const o = hardObstacles[i];
    if (rayCircleHitDist(x1, y1, dx, dy, o.x, o.y, o.r * 0.85, dist) < dist - 2) return false;
  }
  return true;
}

function resolveHardObstacles(entity, hardObstacles, baseR, seedPhase) {
  constrainToOrganicZone(entity, baseR, seedPhase);
  for (let i = 0; i < hardObstacles.length; i++) {
    const o = hardObstacles[i];
    const dx = entity.x - o.x, dy = entity.y - o.y;
    const minDist = entity.r + o.r;
    const d2 = dx * dx + dy * dy;
    if (d2 < minDist * minDist && d2 > 0.0001) {
      const d = Math.sqrt(d2), push = minDist - d;
      entity.x += (dx / d) * push;
      entity.y += (dy / d) * push;
    }
  }
}

const SAVE_KEY = 'fish_kingdom_ultra_v4';
function loadProgress() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return { stage: 1, highestAnchor: 1, stars: 3 };
    const p = JSON.parse(raw);
    return {
      stage: Math.max(1, Number(p.stage) || 1),
      highestAnchor: Math.max(1, Number(p.highestAnchor) || 1),
      stars: clamp(Number(p.stars) || 3, 1, 3),
    };
  } catch { return { stage: 1, highestAnchor: 1, stars: 3 }; }
}
function saveProgress(data) { try { window.localStorage.setItem(SAVE_KEY, JSON.stringify(data)); } catch { /* ignore */ } }

const PREY_KEYS = ['prey_minnow', 'prey_shrimp', 'prey_koi_fry'];

// ============================================================================
// 5. MAIN REACT COMPONENT — ENLARGED HIGH-DETAIL ASSETS & ZERO-WIDGET INSTANT PLAY
// ============================================================================
export function App({ showHud = true }) {
  const saved = useRef(loadProgress());
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const insetRef = useRef(0);
  const persistentWorldRef = useRef(null);
  if (!persistentWorldRef.current) persistentWorldRef.current = buildPersistentOceanWorld();
  const [muted, setMuted] = useState(false);
  const { board, reportStageCleared } = useLeaderboard();

  const [hud, setHud] = useState(() => ({
    stage: saved.current.stage,
    stars: saved.current.stars,
    speciesName: SPECIES_CHAIN[(saved.current.stage - 1) % SPECIES_CHAIN.length].name,
    eaten: 0, required: 7,
    evolutionPct: 0,
    evolved: false,
    storyLine: getChapterForStage(saved.current.stage).narration,
    showOnboardHint: true,
  }));

  const gameRef = useRef({
    stage: saved.current.stage,
    highestAnchor: saved.current.highestAnchor,
    stars: saved.current.stars,
    time: 0, playElapsed: 0, playerMoved: false, hasEatenFirst: false,
    transitionTimer: 0, transitionType: null, hitstop: 0, shake: 0,
    baseR: getBaseRadiusForStage(saved.current.stage),
    displayR: getBaseRadiusForStage(saved.current.stage),
    seedPhase: 1.37,
    map: null, player: null, predators: [], prey: [],
    requiredPrey: 8, eatenPrey: 0,
    particles: [], ripples: [], wakes: [], petals: [],
    camera: { x: WORLD_CX, y: WORLD_CY },
    keys: {}, joystick: { active: false, dx: 0, dy: 0, originX: 0, originY: 0 },
    storyLine: '', storyTimer: 0, lastHudSync: 0,
  });

  const spawnParticles = useCallback((x, y, color, count = 12, speed = 130) => {
    const g = gameRef.current;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2, sp = speed * (0.35 + Math.random() * 0.85);
      g.particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: 2.5 + Math.random() * 4, color, life: 0.45 + Math.random() * 0.45, maxLife: 0.9 });
    }
  }, []);

  const initStage = useCallback((targetStage, starsVal = null, keepPlayerPos = false) => {
    const g = gameRef.current;
    const lv = Math.max(1, targetStage);
    g.stage = lv;
    if (starsVal !== null) g.stars = starsVal;
    if (isAnchorStage(lv) && lv > g.highestAnchor) g.highestAnchor = lv;

    const newBaseR = getBaseRadiusForStage(lv);
    g.baseR = newBaseR;
    if (!keepPlayerPos) g.displayR = newBaseR;
    g.seedPhase = 1.37;

    const fullWorld = persistentWorldRef.current;
    // Steady persistent ocean: ALL inner objects stay at exact fixed coordinates;
    // expanding newBaseR naturally unveils outer-ring rocks, floras & sunken relics!
    const stageMap = {
      rocks: fullWorld.rocks.filter((o) => isInsideOrganicZone(o.x, o.y, newBaseR, g.seedPhase, o.r * 0.3)),
      objects: fullWorld.objects.filter((o) => isInsideOrganicZone(o.x, o.y, newBaseR, g.seedPhase, o.r * 0.3)),
      floras: fullWorld.floras.filter((f) => isInsideOrganicZone(f.x, f.y, newBaseR, g.seedPhase, f.r * 0.25)),
    };
    g.map = stageMap;
    const hardObstacles = [...stageMap.rocks, ...stageMap.objects];

    const curSpec = SPECIES_CHAIN[(lv - 1) % SPECIES_CHAIN.length];
    const villain = getVillainForStage(lv);

    const prevX = keepPlayerPos && g.player ? g.player.x : WORLD_CX;
    const prevY = keepPlayerPos && g.player ? g.player.y : WORLD_CY;
    const prevAng = keepPlayerPos && g.player ? g.player.angle : 0;

    // Enlarged Player Fish (r = 30 -> ~105px visual beauty!)
    g.player = {
      x: prevX, y: prevY, vx: 0, vy: 0, angle: prevAng, r: 30,
      stamina: 100, dashTimer: 0, isHidden: false, wasHidden: false,
      evolved: false, speciesIdx: (lv - 1) % SPECIES_CHAIN.length, combo: 0, comboTimer: 0, spawnShield: 1.5, evoFlash: 0,
    };
    resolveHardObstacles(g.player, hardObstacles, newBaseR, g.seedPhase);

    const saw = getSawtoothParams(lv);
    g.saw = saw;
    const packCount = getPredatorCountForStage(lv, saw.relief);
    const predList = [];
    const baseSectorAng = Math.random() * Math.PI * 2;

    for (let pi = 0; pi < packCount; pi++) {
      const isAlpha = pi === 0;
      const sectorCenter = baseSectorAng + (pi / packCount) * Math.PI * 2;
      const sectorSpan = (Math.PI * 2) / packCount;
      // Alpha uses current tier villain; flanking stalkers use distinct fearful villain archetypes!
      const vIdx = (Math.floor((lv - 1) / 3) + (isAlpha ? 0 : Math.max(1, FEARFUL_VILLAINS.length - pi))) % FEARFUL_VILLAINS.length;
      const pVillain = isAlpha ? villain : FEARFUL_VILLAINS[vIdx];

      let px = WORLD_CX + Math.cos(sectorCenter) * newBaseR * 0.62;
      let py = WORLD_CY + Math.sin(sectorCenter) * newBaseR * 0.62;
      for (let tries = 0; tries < 24; tries++) {
        const a = sectorCenter + (Math.random() - 0.5) * sectorSpan * 0.72;
        const dist = newBaseR * (0.48 + Math.random() * 0.34);
        const cx = WORLD_CX + Math.cos(a) * dist, cy = WORLD_CY + Math.sin(a) * dist;
        if (Math.hypot(cx - g.player.x, cy - g.player.y) < 270) continue;
        if (!isInsideOrganicZone(cx, cy, newBaseR, g.seedPhase, 54)) continue;
        if (hardObstacles.some((o) => Math.hypot(cx - o.x, cy - o.y) < o.r + 48)) continue;
        if (predList.some((other) => Math.hypot(cx - other.x, cy - other.y) < 200)) continue;
        px = cx; py = cy; break;
      }

      // Build sector-scoped search waypoints so the pack naturally blankets the entire sunlit sea!
      const sectorPoints = [];
      stageMap.floras.forEach((f) => {
        const fa = Math.atan2(f.y - WORLD_CY, f.x - WORLD_CX);
        if (Math.abs(wrapAngle(fa - sectorCenter)) <= sectorSpan * 0.68 || packCount === 1) {
          sectorPoints.push({ x: f.x, y: f.y });
        }
      });
      for (let k = 0; k < 4; k++) {
        const wa = sectorCenter + ((k / 3) - 0.5) * sectorSpan * 0.78;
        const wr = getOrganicRadius(wa, newBaseR, g.seedPhase) * (0.45 + (k % 2) * 0.32);
        sectorPoints.push({ x: WORLD_CX + Math.cos(wa) * wr, y: WORLD_CY + Math.sin(wa) * wr });
      }

      const spd = isAlpha ? saw.predSpeed : Math.round(saw.predSpeed * 0.94);
      predList.push({
        id: pi, isAlpha, alive: true,
        x: px, y: py, vx: 0, vy: 0, angle: Math.atan2(g.player.y - py, g.player.x - px),
        r: isAlpha ? 38 : 33, villain: pVillain, state: 'HUNT_SEARCH',
        sectorCenter, sectorSpan, searchPoints: sectorPoints, searchIdx: 0,
        targetX: sectorPoints[0] ? sectorPoints[0].x : WORLD_CX,
        targetY: sectorPoints[0] ? sectorPoints[0].y : WORLD_CY,
        stateTimer: 2.0 + Math.random() * 1.4, sweepPhase: pi * 1.3,
        visionRange: Math.round((isAlpha ? 275 : 245) * saw.visionScale),
        visionFov: ((isAlpha ? 70 : 64) * Math.PI) / 180,
        searchSpeed: Math.round(spd * 0.82), chaseSpeed: spd, fleeSpeed: spd,
        stamina: 100, dashTimer: 0, jukeDir: pi % 2 === 0 ? 1 : -1, jukeTimer: 0, visionPoly: [],
      });
    }
    g.predators = predList;

    const totalPrey = saw.preyCount;
    g.requiredPrey = Math.max(4, Math.ceil(totalPrey * 0.8));
    g.eatenPrey = 0;

    // Enlarged crisp miniature koi/minnow prey (r = 16)
    const preyList = [];
    for (let i = 0; i < totalPrey; i++) {
      let px = WORLD_CX, py = WORLD_CY;
      for (let tries = 0; tries < 32; tries++) {
        const a = Math.random() * Math.PI * 2;
        const maxR = getOrganicRadius(a, newBaseR, g.seedPhase) - 58;
        const dist = 125 + Math.random() * Math.max(40, maxR - 125);
        px = WORLD_CX + Math.cos(a) * dist; py = WORLD_CY + Math.sin(a) * dist;
        if (Math.hypot(px - g.player.x, py - g.player.y) < 130) continue;
        if (hardObstacles.some((o) => Math.hypot(px - o.x, py - o.y) < o.r + 28)) continue;
        break;
      }
      preyList.push({
        id: i, x: px, y: py, vx: 0, vy: 0, angle: Math.random() * Math.PI * 2, r: 16,
        preyKey: PREY_KEYS[i % PREY_KEYS.length], treeState: 'WANDER', stateTimer: 1 + Math.random() * 1.8,
        wanderAngle: Math.random() * Math.PI * 2, zigzagSign: Math.random() < 0.5 ? 1 : -1,
        seed: Math.random() * 10, alive: true,
      });
    }
    g.prey = preyList;

    // Floating cozy blossom petals drifting softly on the sunlit water surface
    g.petals = [];
    for (let i = 0; i < 16; i++) {
      const a = Math.random() * Math.PI * 2, d = Math.random() * newBaseR * 0.82;
      g.petals.push({
        x: WORLD_CX + Math.cos(a) * d, y: WORLD_CY + Math.sin(a) * d,
        rot: Math.random() * Math.PI * 2, phase: Math.random() * 6,
        color: i % 2 === 0 ? '#fbcfe8' : '#fef3c7',
      });
    }

    g.playerMoved = false; g.transitionType = null; g.transitionTimer = 0;
    const ch = getChapterForStage(lv);
    g.storyLine = lv === ch.range[0]
      ? `${ch.title} — ${ch.narration}`
      : `${curSpec.name} glides into wider waters. Beware the ${villain.name}.`;
    g.storyTimer = 4.6;

    saveProgress({ stage: g.stage, highestAnchor: g.highestAnchor, stars: g.stars });
    setHud({
      stage: lv, stars: g.stars, speciesName: curSpec.name,
      eaten: 0, required: g.requiredPrey,
      evolutionPct: 0, evolved: false, storyLine: g.storyLine,
      showOnboardHint: g.playElapsed < 8 && !g.hasEatenFirst,
    });
  }, []);

  useEffect(() => { initStage(saved.current.stage, saved.current.stars, false); }, [initStage]);

  const triggerDash = useCallback(() => {
    const g = gameRef.current;
    if (!g.player || g.transitionType) return;
    if (g.player.stamina >= 28 && g.player.dashTimer <= 0) {
      g.player.stamina = Math.max(0, g.player.stamina - 34);
      g.player.dashTimer = 0.24;
      audio.dash();
      g.ripples.push({ x: g.player.x, y: g.player.y, r: 12, maxR: 88, color: 'rgba(186, 230, 253, 0.55)', life: 0.45, maxLife: 0.45 });
      if (g.predators.length && g.playerMoved && !g.player.evolved && !g.player.isHidden) {
        for (const prd of g.predators) {
          if (prd.alive && prd.state === 'HUNT_SEARCH' && Math.hypot(g.player.x - prd.x, g.player.y - prd.y) < 270) {
            prd.state = 'INVESTIGATE'; prd.targetX = g.player.x; prd.targetY = g.player.y; prd.stateTimer = 3.0;
          }
        }
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    audio.unlock();
    setMuted((prev) => { const next = !prev; audio.setMuted(next); return next; });
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
      audio.unlock();
      gameRef.current.keys[e.code] = true;
      if (e.repeat) return;
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) gameRef.current.playerMoved = true;
      if (e.code === 'Space' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') triggerDash();
      else if (e.code === 'KeyM') toggleMute();
    };
    const onKeyUp = (e) => { gameRef.current.keys[e.code] = false; };
    const onBlur = () => {
      const g = gameRef.current;
      g.keys = {};
      g.joystick = { ...g.joystick, active: false, dx: 0, dy: 0 };
    };
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, [triggerDash, toggleMute]);

  useEffect(() => {
    const canvas = canvasRef.current, container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const desktop = window.matchMedia('(min-width: 768px)').matches;
      insetRef.current = !desktop && headerRef.current ? headerRef.current.offsetHeight : 0;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener('resize', resize);

    let rafId = 0, lastTs = performance.now();

    const step = (dt) => {
      const g = gameRef.current;
      if (!g.player || !g.predators.length || !g.map) return;

      g.time += dt; g.playElapsed += dt;
      g.displayR += (g.baseR - g.displayR) * Math.min(1, dt * 3.5);
      if (g.storyTimer > 0) { g.storyTimer = Math.max(0, g.storyTimer - dt); if (g.storyTimer === 0) g.storyLine = ''; }

      if (g.transitionType) {
        g.transitionTimer -= dt;
        if (g.transitionTimer <= 0) {
          if (g.transitionType === 'stage_clear') initStage(g.stage + 1, 3, true);
          else if (g.transitionType === 'victory') initStage(1, 3, false);
          else initStage(g.stage, g.stars, false);
        }
        return;
      }

      if (g.hitstop > 0) { g.hitstop = Math.max(0, g.hitstop - dt); return; }
      if (g.shake > 0) g.shake = Math.max(0, g.shake - dt * 18);

      const p = g.player, preds = g.predators;
      const hardObstacles = [...g.map.rocks, ...g.map.objects];

      // 1. Player Movement (NO superpower boost after evolution!)
      let ix = 0, iy = 0;
      if (g.keys.KeyW || g.keys.ArrowUp) iy -= 1;
      if (g.keys.KeyS || g.keys.ArrowDown) iy += 1;
      if (g.keys.KeyA || g.keys.ArrowLeft) ix -= 1;
      if (g.keys.KeyD || g.keys.ArrowRight) ix += 1;
      if (g.joystick.active) { ix += g.joystick.dx; iy += g.joystick.dy; }
      const mag = Math.hypot(ix, iy);
      if (mag > 1) { ix /= mag; iy /= mag; }

      const baseSpeed = 228;
      const dashMult = p.dashTimer > 0 ? 1.72 : 1;
      if (p.dashTimer > 0) p.dashTimer = Math.max(0, p.dashTimer - dt);
      else p.stamina = Math.min(100, p.stamina + 24 * dt);
      if (p.spawnShield > 0) p.spawnShield = Math.max(0, p.spawnShield - dt);
      if (p.evoFlash > 0) p.evoFlash = Math.max(0, p.evoFlash - dt);
      if (p.comboTimer > 0) { p.comboTimer = Math.max(0, p.comboTimer - dt); if (p.comboTimer === 0) p.combo = 0; }

      p.vx += (ix * baseSpeed * dashMult - p.vx) * Math.min(1, dt * 10.5);
      p.vy += (iy * baseSpeed * dashMult - p.vy) * Math.min(1, dt * 10.5);
      p.x += p.vx * dt; p.y += p.vy * dt;
      const pSpeed = Math.hypot(p.vx, p.vy);
      if (pSpeed > 12) {
        p.angle = lerpAngle(p.angle, Math.atan2(p.vy, p.vx), Math.min(1, dt * 11));
        if (Math.random() < dt * 7) g.wakes.push({ x: p.x - Math.cos(p.angle) * 20, y: p.y - Math.sin(p.angle) * 20, r: 6, maxR: 32, life: 0.55, maxLife: 0.55 });
      }
      resolveHardObstacles(p, hardObstacles, g.baseR, g.seedPhase);

      const sawNow = g.saw || getSawtoothParams(g.stage);
      const predFlushed = sawNow.flushDist > 0 && g.playerMoved && preds.some((prd) => prd.alive && Math.hypot(p.x - prd.x, p.y - prd.y) < sawNow.flushDist);
      p.wasHidden = p.isHidden;
      p.isHidden = !p.evolved && !predFlushed && g.map.floras.some((f) => Math.hypot(p.x - f.x, p.y - f.y) < f.r * sawNow.hideMargin);
      if (p.isHidden && !p.wasHidden) audio.hide();
      else if (!p.isHidden && p.wasHidden) audio.unhide();

      // Adaptive music mood & ambient underwater bubbles + swim glide SFX
      const anyChasing = preds.some((prd) => prd.alive && prd.state === 'CHASE');
      audio.ambientBubble(g.time);
      if (pSpeed > 130) audio.swimGlide(g.time);
      audio.setMood(p.evolved ? 'apex' : anyChasing ? 'chase' : p.isHidden ? 'hidden' : 'calm');

      // 2. Prey Economy & Feeding Sense
      const evoPct = Math.min(100, Math.round((g.eatenPrey / g.requiredPrey) * 100));
      const feedingSense = !p.evolved && (evoPct >= 65 || g.requiredPrey - g.eatenPrey <= 3);
      if (feedingSense) {
        audio.sonar(g.time);
        if (Math.floor((g.time - dt) * 0.55) !== Math.floor(g.time * 0.55)) {
          g.ripples.push({ x: p.x, y: p.y, r: 18, maxR: 280, color: 'rgba(94, 234, 212, 0.36)', life: 1.0, maxLife: 1.0 });
        }
      }

      for (let i = 0; i < g.prey.length; i++) {
        const pr = g.prey[i];
        if (!pr.alive) continue;
        const distP = Math.hypot(p.x - pr.x, p.y - pr.y);
        if (distP < p.r + pr.r + 6) {
          pr.alive = false; g.eatenPrey += 1; g.hasEatenFirst = true;
          p.combo += 1; p.comboTimer = 2.8;
          audio.eat(p.combo);
          spawnParticles(pr.x, pr.y, '#99f6e4', 10, 125);
          g.ripples.push({ x: pr.x, y: pr.y, r: 8, maxR: 62, color: 'rgba(153, 246, 228, 0.5)', life: 0.45, maxLife: 0.45 });

          if (!p.evolved && g.playerMoved) {
            for (const prd of preds) {
              if (prd.alive && prd.state === 'HUNT_SEARCH' && Math.hypot(pr.x - prd.x, pr.y - prd.y) < (sawNow.hearRange || 260)) {
                audio.suspicious();
                prd.state = 'INVESTIGATE'; prd.targetX = pr.x; prd.targetY = pr.y; prd.stateTimer = 3.2;
                break;
              }
            }
          }

          if (!p.evolved && g.eatenPrey >= g.requiredPrey) {
            p.evolved = true;
            p.speciesIdx = g.stage % SPECIES_CHAIN.length;
            p.r = 33;
            p.isHidden = false;
            p.evoFlash = 1.2;
            g.hitstop = 0.16; g.shake = 8;
            audio.evolve();
            spawnParticles(p.x, p.y, '#fde047', 28, 220);
            spawnParticles(p.x, p.y, '#5eead4', 18, 175);
            g.ripples.push({ x: p.x, y: p.y, r: 22, maxR: 340, color: 'rgba(253, 224, 71, 0.85)', life: 0.8, maxLife: 0.8 });
            g.storyLine = `Evolved into ${SPECIES_CHAIN[p.speciesIdx].name}! ${EVOLUTION_LINES[(g.stage - 1) % EVOLUTION_LINES.length]}`;
            g.storyTimer = 4.5;
            preds.forEach((prd) => { if (prd.alive) { prd.state = 'EVASIVE_FLEE'; prd.stamina = 100; } });
            setHud({
              stage: g.stage, stars: g.stars, speciesName: SPECIES_CHAIN[p.speciesIdx].name,
              eaten: g.eatenPrey, required: g.requiredPrey,
              evolutionPct: 100, evolved: true, storyLine: g.storyLine, showOnboardHint: false,
            });
          }
          continue;
        }

        pr.stateTimer -= dt;
        const detectDist = p.isHidden ? 56 : (sawNow.preyDetect || 170);
        if (pr.treeState === 'WANDER') {
          if (distP < detectDist) { pr.treeState = 'DART_ESCAPE'; pr.stateTimer = 0.85 + Math.random() * 0.45; pr.zigzagSign = Math.random() < 0.5 ? 1 : -1; audio.preyDart(g.time); }
          else if (pr.stateTimer <= 0) { pr.wanderAngle += (Math.random() - 0.5) * 1.8; pr.stateTimer = 1.4 + Math.random() * 1.6; }
          pr.vx += (Math.cos(pr.wanderAngle) * 58 - pr.vx) * dt * 4;
          pr.vy += (Math.sin(pr.wanderAngle) * 58 - pr.vy) * dt * 4;
        } else if (pr.treeState === 'DART_ESCAPE') {
          const away = Math.atan2(pr.y - p.y, pr.x - p.x), spd = (g.saw ? g.saw.preySpeed : 105);
          pr.vx += (Math.cos(away + Math.sin(g.time * 8.5 + pr.seed) * 0.4 * pr.zigzagSign) * spd - pr.vx) * dt * 7;
          pr.vy += (Math.sin(away + Math.sin(g.time * 8.5 + pr.seed) * 0.4 * pr.zigzagSign) * spd - pr.vy) * dt * 7;
          if (pr.stateTimer <= 0) { pr.treeState = 'REST'; pr.stateTimer = sawNow.preyRest || 0.9; }
        } else {
          pr.vx *= 1 - Math.min(1, dt * 4); pr.vy *= 1 - Math.min(1, dt * 4);
          if (pr.stateTimer <= 0) { pr.treeState = distP < detectDist ? 'DART_ESCAPE' : 'WANDER'; pr.stateTimer = 1.0; }
        }

        const prDistC = Math.hypot(pr.x - WORLD_CX, pr.y - WORLD_CY);
        const prAngC = Math.atan2(pr.y - WORLD_CY, pr.x - WORLD_CX);
        if (prDistC > getOrganicRadius(prAngC, g.baseR, g.seedPhase) - 64) {
          pr.vx -= Math.cos(prAngC) * 230 * dt; pr.vy -= Math.sin(prAngC) * 230 * dt;
        }
        pr.x += pr.vx * dt; pr.y += pr.vy * dt;
        if (Math.hypot(pr.vx, pr.vy) > 8) pr.angle = lerpAngle(pr.angle, Math.atan2(pr.vy, pr.vx), Math.min(1, dt * 10));
        resolveHardObstacles(pr, hardObstacles, g.baseR, g.seedPhase);
      }

      // 3. Multi-Predator Pack AI (Sector Search, Pack Spacing, Alert Relay & Evasive Flee)
      for (let pi = 0; pi < preds.length; pi++) {
        const pred = preds[pi];
        if (!pred.alive) continue;

        const distPlayerPred = Math.hypot(p.x - pred.x, p.y - pred.y);
        const angDiff = Math.abs(wrapAngle(Math.atan2(p.y - pred.y, p.x - pred.x) - pred.angle));
        if (pred.dashTimer > 0) pred.dashTimer = Math.max(0, pred.dashTimer - dt);
        else pred.stamina = Math.min(100, pred.stamina + 22 * dt);

        if (pred.state !== 'EVASIVE_FLEE') {
          const rays = 18, poly = [];
          for (let r = 0; r <= rays; r++) {
            const ra = pred.angle - pred.visionFov * 0.5 + (r / rays) * pred.visionFov;
            const dx = Math.cos(ra), dy = Math.sin(ra);
            let best = pred.visionRange;
            for (let j = 0; j < hardObstacles.length; j++) {
              const o = hardObstacles[j];
              best = rayCircleHitDist(pred.x, pred.y, dx, dy, o.x, o.y, o.r * 0.85, best);
            }
            poly.push({ x: pred.x + dx * best, y: pred.y + dy * best });
          }
          pred.visionPoly = poly;
        } else {
          pred.visionPoly = [];
        }

        const canSeePlayer =
          g.playerMoved && !p.evolved && !p.isHidden && p.spawnShield <= 0 &&
          distPlayerPred < pred.visionRange &&
          (angDiff < pred.visionFov * 0.54 || distPlayerPred < 88) &&
          hasLineOfSight(pred.x, pred.y, p.x, p.y, hardObstacles);

        if (pred.state === 'EVASIVE_FLEE') {
          pred.jukeTimer -= dt;
          if (pred.jukeTimer <= 0) { pred.jukeDir *= -1; pred.jukeTimer = (sawNow.predJukeFreq || 0.9) * (0.7 + Math.random() * 0.6); }
          if (distPlayerPred < 185 && pred.stamina >= 42 && pred.dashTimer <= 0) {
            pred.stamina -= 42; pred.dashTimer = 0.24;
            g.ripples.push({ x: pred.x, y: pred.y, r: 10, maxR: 78, color: 'rgba(251, 113, 133, 0.5)', life: 0.4, maxLife: 0.4 });
          }
          const away = Math.atan2(pred.y - p.y, pred.x - p.x);
          let sx = Math.cos(away), sy = Math.sin(away);
          if (distPlayerPred < 230) { const perp = away + pred.jukeDir * 0.72; sx += Math.cos(perp) * 0.65; sy += Math.sin(perp) * 0.65; }
          const pDistC = Math.hypot(pred.x - WORLD_CX, pred.y - WORLD_CY);
          const pAngC = Math.atan2(pred.y - WORLD_CY, pred.x - WORLD_CX);
          if (pDistC > getOrganicRadius(pAngC, g.baseR, g.seedPhase) - 135) {
            sx += -Math.cos(pAngC) * 1.45 - Math.sin(pAngC) * pred.jukeDir * 1.15;
            sy += -Math.sin(pAngC) * 1.45 + Math.cos(pAngC) * pred.jukeDir * 1.15;
          }
          for (let i = 0; i < hardObstacles.length; i++) {
            const o = hardObstacles[i], d = Math.hypot(pred.x - o.x, pred.y - o.y);
            if (d < o.r + 95 && d > 1) { sx += ((pred.x - o.x) / d) * 1.65; sy += ((pred.y - o.y) / d) * 1.65; }
          }
          const fAng = Math.atan2(sy, sx), fMult = pred.dashTimer > 0 ? (sawNow.predDashMult || 1.35) : 1;
          pred.vx += (Math.cos(fAng) * pred.fleeSpeed * fMult - pred.vx) * dt * 6.8;
          pred.vy += (Math.sin(fAng) * pred.fleeSpeed * fMult - pred.vy) * dt * 6.8;
        } else if (pred.state === 'CHASE') {
          audio.heartbeat(g.time);
          if (canSeePlayer) { pred.targetX = p.x; pred.targetY = p.y; pred.stateTimer = 0; }
          else { pred.stateTimer += dt; if (pred.stateTimer > 0.7 || p.isHidden) { pred.state = 'INVESTIGATE'; pred.stateTimer = 3.0; } }
          const a = Math.atan2(pred.targetY - pred.y, pred.targetX - pred.x);
          pred.vx += (Math.cos(a) * pred.chaseSpeed - pred.vx) * dt * 7;
          pred.vy += (Math.sin(a) * pred.chaseSpeed - pred.vy) * dt * 7;
        } else if (pred.state === 'INVESTIGATE') {
          pred.stateTimer -= dt;
          if (Math.hypot(pred.targetX - pred.x, pred.targetY - pred.y) > 40) {
            const a = Math.atan2(pred.targetY - pred.y, pred.targetX - pred.x);
            pred.vx += (Math.cos(a) * pred.searchSpeed * 1.18 - pred.vx) * dt * 5.5;
            pred.vy += (Math.sin(a) * pred.searchSpeed * 1.18 - pred.vy) * dt * 5.5;
          } else {
            pred.vx *= 1 - Math.min(1, dt * 4); pred.vy *= 1 - Math.min(1, dt * 4);
            pred.angle = wrapAngle(pred.angle + Math.sin(g.time * 4.8) * dt * 3.1);
          }
          if (canSeePlayer) { pred.state = 'CHASE'; pred.targetX = p.x; pred.targetY = p.y; audio.alert(); }
          else if (pred.stateTimer <= 0) { pred.state = 'HUNT_SEARCH'; pred.stateTimer = 3.2; }
        } else {
          pred.stateTimer -= dt; pred.sweepPhase += dt * 2.4;
          if (Math.hypot(pred.targetX - pred.x, pred.targetY - pred.y) < 52 || pred.stateTimer <= 0) {
            if (g.playerMoved && !p.isHidden && pred.isAlpha && Math.random() < 0.42) {
              const tx = p.x + (Math.random() - 0.5) * 300, ty = p.y + (Math.random() - 0.5) * 300;
              if (isInsideOrganicZone(tx, ty, g.baseR, g.seedPhase, 55)) { pred.targetX = tx; pred.targetY = ty; }
            } else if (pred.searchPoints.length > 0) {
              pred.searchIdx = (pred.searchIdx + 1 + Math.floor(Math.random() * 2)) % pred.searchPoints.length;
              pred.targetX = pred.searchPoints[pred.searchIdx].x; pred.targetY = pred.searchPoints[pred.searchIdx].y;
            }
            pred.stateTimer = 3.0 + Math.random() * 1.5;
          }
          const a = Math.atan2(pred.targetY - pred.y, pred.targetX - pred.x);
          pred.vx += (Math.cos(a + Math.sin(pred.sweepPhase) * 0.28) * pred.searchSpeed - pred.vx) * dt * 4.8;
          pred.vy += (Math.sin(a + Math.sin(pred.sweepPhase) * 0.28) * pred.searchSpeed - pred.vy) * dt * 4.8;
          if (canSeePlayer) {
            pred.state = 'CHASE'; pred.targetX = p.x; pred.targetY = p.y; pred.stateTimer = 0; audio.alert();
            // Pack alert relay: nearby predators within 460px move to cut off escape lanes!
            for (const ally of preds) {
              if (ally !== pred && ally.alive && ally.state === 'HUNT_SEARCH' && Math.hypot(ally.x - pred.x, ally.y - pred.y) < 460) {
                ally.state = 'INVESTIGATE'; ally.targetX = p.x; ally.targetY = p.y; ally.stateTimer = 3.4;
              }
            }
          }
        }

        // Pack spacing repulsion so predators never clump on top of each other
        for (let oj = 0; oj < preds.length; oj++) {
          if (oj === pi || !preds[oj].alive) continue;
          const dx = pred.x - preds[oj].x, dy = pred.y - preds[oj].y;
          const d = Math.hypot(dx, dy);
          if (d < 175 && d > 1) {
            pred.vx += (dx / d) * 140 * dt;
            pred.vy += (dy / d) * 140 * dt;
          }
        }

        pred.x += pred.vx * dt; pred.y += pred.vy * dt;
        if (Math.hypot(pred.vx, pred.vy) > 10) {
          pred.angle = lerpAngle(pred.angle, Math.atan2(pred.vy, pred.vx), Math.min(1, dt * 8.5));
          if (Math.random() < dt * 5) g.wakes.push({ x: pred.x - Math.cos(pred.angle) * 24, y: pred.y - Math.sin(pred.angle) * 24, r: 7, maxR: 36, life: 0.55, maxLife: 0.55 });
        }
        resolveHardObstacles(pred, hardObstacles, g.baseR, g.seedPhase);

        // 4. Player <-> Predator Contact Resolution
        if (distPlayerPred < p.r + pred.r - 6) {
          if (p.evolved) {
            pred.alive = false;
            g.hitstop = 0.2; g.shake = 10; audio.takedown();
            spawnParticles(pred.x, pred.y, '#fb7185', 30, 230); spawnParticles(pred.x, pred.y, '#fde047', 20, 190);
            p.stamina = 100;
            const remaining = preds.filter((x) => x.alive);
            // Devouring the Alpha Apex (or the last surviving predator) conquers the territory & expands the ocean!
            if (pred.isAlpha || remaining.length === 0) {
              const nextLv = g.stage + 1;
              const prevBaseR = g.baseR;
              g.baseR = getBaseRadiusForStage(nextLv);
              if (g.baseR > prevBaseR) audio.expand();
              g.transitionType = 'stage_clear'; g.transitionTimer = 1.35;
              void reportStageCleared();
              setHud({
                stage: g.stage, stars: 3, speciesName: SPECIES_CHAIN[p.speciesIdx].name,
                eaten: g.eatenPrey, required: g.requiredPrey,
                evolutionPct: 100, evolved: true,
              });
              return;
            }
          } else if (g.playerMoved && !p.isHidden && p.spawnShield <= 0) {
            g.shake = 10; audio.caught(); spawnParticles(p.x, p.y, '#f43f5e', 24, 195);
            const nextStars = g.stars - 1;
            if (nextStars <= 0) {
              const demoteTarget = Math.max(g.highestAnchor, g.stage - 1), dropped = demoteTarget < g.stage;
              g.stage = demoteTarget; g.stars = 3;
              g.transitionType = dropped ? 'demoted' : 'caught'; g.transitionTimer = 1.4;
            } else {
              g.stars = nextStars;
              g.transitionType = 'caught'; g.transitionTimer = 1.25;
            }
            saveProgress({ stage: g.stage, highestAnchor: g.highestAnchor, stars: g.stars });
            return;
          }
        }
      }

      for (let i = g.particles.length - 1; i >= 0; i--) { const pt = g.particles[i]; pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.vx *= 0.93; pt.vy *= 0.93; pt.life -= dt; if (pt.life <= 0) g.particles.splice(i, 1); }
      for (let i = g.ripples.length - 1; i >= 0; i--) { const rp = g.ripples[i]; rp.life -= dt; rp.r = rp.maxR * (1 - rp.life / rp.maxLife); if (rp.life <= 0) g.ripples.splice(i, 1); }
      for (let i = g.wakes.length - 1; i >= 0; i--) { const wk = g.wakes[i]; wk.life -= dt; wk.r = wk.maxR * (1 - wk.life / wk.maxLife); if (wk.life <= 0) g.wakes.splice(i, 1); }

      g.camera.x += (p.x + p.vx * 0.2 - g.camera.x) * Math.min(1, dt * 6.5);
      g.camera.y += (p.y + p.vy * 0.2 - g.camera.y) * Math.min(1, dt * 6.5);

      if (g.time - g.lastHudSync > 0.1) {
        g.lastHudSync = g.time;
        setHud({
          stage: g.stage, stars: g.stars, speciesName: SPECIES_CHAIN[p.speciesIdx].name,
          eaten: g.eatenPrey, required: g.requiredPrey,
          evolutionPct: evoPct, evolved: p.evolved, storyLine: g.storyLine,
          showOnboardHint: g.playElapsed < 9 && !g.hasEatenFirst,
        });
      }
    };

    const render = () => {
      const g = gameRef.current;
      if (!g.player || !g.predators.length || !g.map) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const cssW = canvas.width / dpr, cssH = canvas.height / dpr;
      const zoom = clamp(Math.min(cssW / 900, cssH / 620), 0.7, 1);
      const vw = cssW / zoom, vh = cssH / zoom;
      const ch = getChapterForStage(g.stage);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Pitch-dark outer ocean abyss
      ctx.fillStyle = '#02060b';
      ctx.fillRect(0, 0, cssW, cssH);

      ctx.save();
      ctx.translate(0, insetRef.current / 2);

      const shakeX = g.shake > 0 ? (Math.random() - 0.5) * g.shake : 0;
      const shakeY = g.shake > 0 ? (Math.random() - 0.5) * g.shake : 0;
      const camX = g.camera.x - vw / 2 + shakeX;
      const camY = g.camera.y - vh / 2 + shakeY;

      ctx.save();
      ctx.scale(zoom, zoom);
      ctx.translate(-camX, -camY);

      // Strictly clip sunlit clearing (zero objects visible in pitch-dark zone)
      ctx.save();
      traceOrganicPath(ctx, g.displayR, g.seedPhase, 104);
      ctx.clip();

      // Sunlit emerald-turquoise pond radial gradient
      const waterGrad = ctx.createRadialGradient(WORLD_CX, WORLD_CY, g.displayR * 0.04, WORLD_CX, WORLD_CY, g.displayR * 1.18);
      waterGrad.addColorStop(0, ch.waterLight);
      waterGrad.addColorStop(0.55, ch.waterMid);
      waterGrad.addColorStop(1, ch.waterDeep);
      ctx.fillStyle = waterGrad;
      ctx.fillRect(WORLD_CX - g.displayR * 1.35, WORLD_CY - g.displayR * 1.35, g.displayR * 2.7, g.displayR * 2.7);

      // Soft glowing sunlit pond caustic ripples
      ctx.save();
      ctx.strokeStyle = ch.caustic;
      ctx.lineWidth = 2.6;
      for (let ring = 0; ring < 5; ring++) {
        const rr = g.displayR * (0.18 + ring * 0.17);
        ctx.beginPath();
        for (let i = 0; i <= 56; i++) {
          const a = (i / 56) * Math.PI * 2;
          const wob = Math.sin(a * 5 + g.time * (0.85 + ring * 0.14) + ring * 1.6) * 20
                    + Math.cos(a * 8 - g.time * 0.65 + ring) * 10;
          const px = WORLD_CX + Math.cos(a) * (rr + wob);
          const py = WORLD_CY + Math.sin(a) * (rr + wob * 0.88);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();

      for (let i = 0; i < g.wakes.length; i++) {
        const wk = g.wakes[i];
        ctx.save();
        ctx.globalAlpha = clamp(wk.life / wk.maxLife, 0, 1) * 0.34;
        ctx.strokeStyle = '#e0f7fa'; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.arc(wk.x, wk.y, wk.r, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }

      for (let i = 0; i < g.ripples.length; i++) {
        const rp = g.ripples[i];
        ctx.save();
        ctx.globalAlpha = clamp(rp.life / rp.maxLife, 0, 1);
        ctx.strokeStyle = rp.color; ctx.lineWidth = 2.6;
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }

      // 16 Unique Hand-Painted Sunken Relics (Pre-baked GPU drawImage — zero lag!)
      for (let i = 0; i < g.map.objects.length; i++) {
        const ob = g.map.objects[i];
        if (ob.x + ob.r * 2 < camX || ob.x - ob.r * 2 > camX + vw || ob.y + ob.r * 2 < camY || ob.y - ob.r * 2 > camY + vh) continue;
        drawBakedStatic(ctx, `obj_${ob.variety}_${Math.round(ob.r)}`, PAINTED_OBJECTS[ob.variety], ob.x, ob.y, ob.angle, ob.r, 1);
      }

      // 16 Unique Hand-Painted Rocks & Stepping Stones (Pre-baked GPU drawImage — zero lag!)
      for (let i = 0; i < g.map.rocks.length; i++) {
        const rk = g.map.rocks[i];
        if (rk.x + rk.r * 2 < camX || rk.x - rk.r * 2 > camX + vw || rk.y + rk.r * 2 < camY || rk.y - rk.r * 2 > camY + vh) continue;
        drawBakedStatic(ctx, `rk_${rk.variety}_${Math.round(rk.r)}`, PAINTED_ROCKS[rk.variety], rk.x, rk.y, rk.angle, rk.r, 1);
      }

      // Multi-Predator Vision Cones
      const preds = g.predators;
      for (let pi = 0; pi < preds.length; pi++) {
        const pred = preds[pi];
        if (!pred.alive || pred.visionPoly.length <= 2) continue;
        ctx.save();
        ctx.beginPath(); ctx.moveTo(pred.x, pred.y);
        for (let i = 0; i < pred.visionPoly.length; i++) ctx.lineTo(pred.visionPoly[i].x, pred.visionPoly[i].y);
        ctx.closePath();
        const cg = ctx.createRadialGradient(pred.x, pred.y, 12, pred.x, pred.y, pred.visionRange);
        if (pred.state === 'CHASE') { cg.addColorStop(0, 'rgba(244, 63, 94, 0.34)'); cg.addColorStop(1, 'rgba(244, 63, 94, 0.01)'); }
        else if (pred.state === 'INVESTIGATE') { cg.addColorStop(0, 'rgba(251, 191, 36, 0.28)'); cg.addColorStop(1, 'rgba(251, 191, 36, 0.01)'); }
        else { cg.addColorStop(0, 'rgba(248, 113, 113, 0.16)'); cg.addColorStop(1, 'rgba(248, 113, 113, 0.01)'); }
        ctx.fillStyle = cg; ctx.fill(); ctx.restore();
      }

      // 3 Unique Hand-Painted Prey Species (Fast zero-blur shadow!)
      for (let i = 0; i < g.prey.length; i++) {
        const pr = g.prey[i];
        if (!pr.alive) continue;
        if (pr.x + 50 < camX || pr.x - 50 > camX + vw || pr.y + 50 < camY || pr.y - 50 > camY + vh) continue;
        drawUniqueFishFast(ctx, PAINTED_FISH[pr.preyKey], pr.x, pr.y, pr.angle, pr.r, g.time + pr.seed, Math.hypot(pr.vx, pr.vy), 1, 5, 7);
      }

      // 67 Unique Hand-Painted Player Species (Fast zero-blur shadow + transient evolution glow!)
      const p = g.player;
      const pKey = SPECIES_CHAIN[p.speciesIdx].key;
      if (p.evoFlash > 0) {
        ctx.save();
        const fg = ctx.createRadialGradient(p.x, p.y, p.r * 0.3, p.x, p.y, p.r * 2.4);
        fg.addColorStop(0, `rgba(253, 224, 71, ${p.evoFlash * 0.55})`);
        fg.addColorStop(1, 'rgba(253, 224, 71, 0)');
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      drawUniqueFishFast(ctx, PAINTED_FISH[pKey], p.x, p.y, p.angle, p.r, g.time, Math.hypot(p.vx, p.vy), p.isHidden ? 0.45 : 1, 10, 13);

      // Multi-Predator Pack (Alpha + Sector Stalkers)
      if (g.transitionType !== 'stage_clear') {
        for (let pi = 0; pi < preds.length; pi++) {
          const pred = preds[pi];
          if (!pred.alive) continue;
          if (pred.x + 120 < camX || pred.x - 120 > camX + vw || pred.y + 120 < camY || pred.y - 120 > camY + vh) continue;
          drawUniqueFishFast(ctx, PAINTED_VILLAINS[pred.villain.key], pred.x, pred.y, pred.angle, pred.r, g.time + pi * 1.7, Math.hypot(pred.vx, pred.vy), 1, 11, 14);
        }
      }

      // 15 Unique Hand-Painted Floras drawn OVER fish (Pre-baked GPU drawImage — zero lag!)
      for (let i = 0; i < g.map.floras.length; i++) {
        const fl = g.map.floras[i];
        if (fl.x + fl.r * 2 < camX || fl.x - fl.r * 2 > camX + vw || fl.y + fl.r * 2 < camY || fl.y - fl.r * 2 > camY + vh) continue;
        const sway = Math.sin(g.time * 1.25 + fl.phase) * 0.05;
        drawBakedStatic(ctx, `fl_${fl.variety}_${Math.round(fl.r)}`, PAINTED_FLORAS[fl.variety], fl.x, fl.y, fl.angle + sway, fl.r, 0.94);
      }

      // Drifting sunlit blossom petals on the water surface
      for (let i = 0; i < g.petals.length; i++) {
        const pt = g.petals[i];
        const px = pt.x + Math.sin(g.time * 0.5 + pt.phase) * 14;
        const py = pt.y + Math.cos(g.time * 0.4 + pt.phase) * 10;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(pt.rot + Math.sin(g.time * 0.8 + pt.phase) * 0.3);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = 0.78;
        ctx.beginPath();
        ctx.ellipse(0, 0, 5.5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Ephemeral first-10-second prey pulse
      if (g.playElapsed < 10 && !g.hasEatenFirst) {
        const nearest = g.prey.find((pr) => pr.alive);
        if (nearest) {
          ctx.strokeStyle = 'rgba(186, 250, 240, 0.72)'; ctx.lineWidth = 2.2;
          ctx.beginPath(); ctx.arc(nearest.x, nearest.y, 24 + Math.sin(g.time * 5) * 7, 0, Math.PI * 2); ctx.stroke();
        }
      }

      // Feeding Sense directional chevrons at 65%+
      const evoPct = Math.round((g.eatenPrey / g.requiredPrey) * 100);
      if (p.evolved || evoPct >= 65 || g.requiredPrey - g.eatenPrey <= 3) {
        const targets = p.evolved
          ? preds.filter((pr2) => pr2.alive).map((pr2) => ({ x: pr2.x, y: pr2.y, color: pr2.isAlpha ? '#fde047' : '#fda4af' }))
          : g.prey.filter((pr) => pr.alive).sort((a, b) => Math.hypot(a.x - p.x, a.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y)).slice(0, 3).map((pr) => ({ x: pr.x, y: pr.y, color: '#5eead4' }));
        for (const t of targets) {
          if (Math.hypot(t.x - p.x, t.y - p.y) < 110) continue;
          const a = Math.atan2(t.y - p.y, t.x - p.x);
          ctx.save(); ctx.translate(p.x + Math.cos(a) * 60, p.y + Math.sin(a) * 60); ctx.rotate(a);
          ctx.fillStyle = t.color; ctx.globalAlpha = 0.82;
          ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(-5, -6); ctx.lineTo(-2, 0); ctx.lineTo(-5, 6); ctx.closePath(); ctx.fill();
          ctx.restore();
        }
      }

      for (let i = 0; i < g.particles.length; i++) {
        const pt = g.particles[i];
        ctx.save(); ctx.globalAlpha = clamp(pt.life / pt.maxLife, 0, 1); ctx.fillStyle = pt.color;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }

      // Feathered twilight rim into pitch-dark abyss
      ctx.save();
      traceOrganicPath(ctx, g.displayR, g.seedPhase, 104);
      ctx.strokeStyle = 'rgba(2, 6, 11, 0.94)'; ctx.lineWidth = 48; ctx.stroke();
      ctx.strokeStyle = 'rgba(2, 6, 11, 0.54)'; ctx.lineWidth = 88; ctx.stroke();
      ctx.restore();

      ctx.restore(); // End organic sunlit clearing clip
      ctx.restore(); // End camera translate
      ctx.restore(); // End header inset shift

      if (g.joystick.active) {
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(g.joystick.originX, g.joystick.originY, 38, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = 'rgba(153, 246, 228, 0.55)';
        ctx.beginPath(); ctx.arc(g.joystick.originX + g.joystick.dx * 30, g.joystick.originY + g.joystick.dy * 30, 12, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    };

    const loop = (ts) => {
      const dt = Math.min(0.05, Math.max(0.001, (ts - lastTs) / 1000));
      lastTs = ts; step(dt); render(); rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    window.__FISH_KINGDOM__ = {
      assets: { fish: PAINTED_FISH, villains: PAINTED_VILLAINS, floras: PAINTED_FLORAS, rocks: PAINTED_ROCKS, objects: PAINTED_OBJECTS },
      getState: () => {
        const g = gameRef.current;
        return { stage: g.stage, stars: g.stars, eatenPrey: g.eatenPrey, requiredPrey: g.requiredPrey, evolved: g.player?.evolved, playerSpecies: g.player ? SPECIES_CHAIN[g.player.speciesIdx].key : null, predatorCount: g.predators.filter((x) => x.alive).length, predatorKey: g.predators[0]?.villain?.key, predatorState: g.predators[0]?.state, baseR: g.baseR, displayR: Math.round(g.displayR), mapCounts: g.map ? { rocks: g.map.rocks.length, floras: g.map.floras.length, objects: g.map.objects.length, firstRock: g.map.rocks[0] ? [Math.round(g.map.rocks[0].x), Math.round(g.map.rocks[0].y)] : null, firstFlora: g.map.floras[0] ? [Math.round(g.map.floras[0].x), Math.round(g.map.floras[0].y)] : null } : null, playerMoved: g.playerMoved, predChaseSpeed: g.predators[0]?.chaseSpeed, predFleeSpeed: g.predators[0]?.fleeSpeed, playerPos: g.player ? { x: Math.round(g.player.x), y: Math.round(g.player.y) } : null };
      },
    };

    return () => { cancelAnimationFrame(rafId); audio.stop(); ro.disconnect(); window.removeEventListener('resize', resize); };
  }, [initStage, spawnParticles, reportStageCleared]);

  const lastTapRef = useRef(0);
  const onPointerDown = (e) => {
    audio.unlock();
    const now = performance.now();
    if (now - lastTapRef.current < 280) triggerDash();
    lastTapRef.current = now;
    const rect = canvasRef.current.getBoundingClientRect();
    gameRef.current.joystick = { active: true, dx: 0, dy: 0, originX: e.clientX - rect.left, originY: e.clientY - rect.top };
  };
  const onPointerMove = (e) => {
    const joy = gameRef.current.joystick;
    if (!joy.active) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - joy.originX, dy = e.clientY - rect.top - joy.originY;
    const dist = Math.hypot(dx, dy);
    joy.dx = dist > 5 ? dx / Math.max(dist, 40) : 0;
    joy.dy = dist > 5 ? dy / Math.max(dist, 40) : 0;
    if (dist > 6) gameRef.current.playerMoved = true;
  };
  const onPointerUp = () => { gameRef.current.joystick.active = false; gameRef.current.joystick.dx = 0; gameRef.current.joystick.dy = 0; };

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden select-none font-sans">
      {showHud && (
      <header
        ref={headerRef}
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center gap-2 px-3 pb-2 md:inset-x-auto md:left-3 md:items-start [@media(max-height:560px)]:flex-row [@media(max-height:560px)]:items-start [@media(max-height:560px)]:justify-center [@media(max-height:560px)]:gap-4"
        style={{ paddingTop: 'max(12px, env(safe-area-inset-top))' }}
      >
        {/* Minimal Floating Evolution Bar */}
        <div className="pointer-events-none w-56 sm:w-72 flex flex-col items-center gap-1">
          <div className="w-full flex items-center justify-between text-[11px] font-semibold tracking-wide text-white/90 [text-shadow:0_0_2px_#000,0_0_5px_rgba(0,0,0,0.9)]">
            <span>{hud.speciesName} · {hud.evolved ? 'HUNT!' : `${hud.eaten ?? 0}/${hud.required ?? 7}`}</span>
            <span className="flex items-center gap-0.5">
              {[1, 2, 3].map((s) => (
                <Star key={s} className={`w-3 h-3 ${s <= hud.stars ? 'fill-amber-300 text-amber-300' : 'text-white/20'}`} />
              ))}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-transparent ring-1 ring-white/30 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-200 ${hud.evolved ? 'bg-amber-300' : 'bg-teal-300'}`} style={{ width: `${hud.evolved ? 100 : hud.evolutionPct}%` }} />
          </div>
        </div>

        {board && <LeaderboardPanel board={board} />}
      </header>
      )}

      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
          className="block w-full h-full touch-none cursor-crosshair"
        />
      </div>

      <div
        className="absolute z-20 flex items-center gap-2"
        style={{ bottom: 'max(12px, env(safe-area-inset-bottom))', right: 'max(12px, env(safe-area-inset-right))' }}
      >
        <NotificationsToggle />
        <SupportButton />
      </div>

      <button
        onClick={toggleMute}
        aria-label="Toggle Sound"
        className="absolute z-30 p-2 rounded-full bg-black/35 hover:bg-black/55 text-white/75 hover:text-white transition"
        style={{ top: 'max(12px, env(safe-area-inset-top))', right: 'max(12px, env(safe-area-inset-right))' }}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
