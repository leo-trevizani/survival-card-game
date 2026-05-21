/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Biohazard,
  Crosshair,
  Plane,
  Skull,
  HeartPulse,
  Shield,
  Heart,
  AlertTriangle,
  Droplet,
  Briefcase,
  Clock,
  Syringe,
  Handshake,
  Package,
  Puzzle,
  Medal,
  Layers,
  Key,
  Search,
  Check,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  Info
} from 'lucide-react';

interface CardItem {
  id: string;
  name: string;
  quantity: number;
  effectOrDetails: string;
  category: 'puzzle' | 'utility' | 'resource' | 'threat';
  damage?: string;
  highlightClass?: string;
}

export default function App() {
  // Simulator State
  const [currentHp, setCurrentHp] = useState<number>(6);
  const [currentDef, setCurrentDef] = useState<number>(2);
  const [damageInput, setDamageInput] = useState<number>(3);
  const [simulationLog, setSimulationLog] = useState<{
    originalHp: number;
    originalDef: number;
    incomingDmg: number;
    absorbedByDef: number;
    overflowDmg: number;
    finalHp: number;
    finalDef: number;
  } | null>(null);

  // Card Search and Category Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Deck database
  const deckList = useMemo<CardItem[]>(() => [
    // Puzzles
    { id: 'p1', name: 'Plugs de Xadrez', quantity: 6, effectOrDetails: 'Junte as 6 cartas de Plugs de Xadrez para ativar a escapatória.', category: 'puzzle' },
    { id: 'p2', name: 'Chaves e Engrenagens', quantity: 6, effectOrDetails: 'Junte as 4 Chaves + 2 Engrenagens na Delegacia.', category: 'puzzle' },
    { id: 'p3', name: 'Medalhões Básicos', quantity: 3, effectOrDetails: 'Junte 3 Medalhões + 3 peças secretas (Derrotando o Super Tirano).', category: 'puzzle' },
    
    // Utilitários
    { id: 'u1', name: 'Pochete', quantity: 4, effectOrDetails: '+1 espaço na mão (limite de mão de cartas)', category: 'utility' },
    { id: 'u2', name: 'Tábuas', quantity: 4, effectOrDetails: 'Anula dano recebido de Zumbi ou Cão Zumbi.', category: 'utility' },
    { id: 'u3', name: 'Baú', quantity: 4, effectOrDetails: 'Libera o uso do Baú Pessoal na área de jogo.', category: 'utility' },
    
    // Recursos
    { id: 'r1', name: 'Munição', quantity: 12, effectOrDetails: 'Recupera +2 de Defesa (D)', category: 'resource', highlightClass: 'text-yellow-500 font-semibold' },
    { id: 'r2', name: 'Erva Verde (VD)', quantity: 6, effectOrDetails: 'Recupera +2 de Vida (V)', category: 'resource', highlightClass: 'herb-g font-semibold' },
    { id: 'r3', name: 'Erva Azul (AZ)', quantity: 6, effectOrDetails: 'Cura Veneno ou anula -1 de dano da próxima Ameaça.', category: 'resource', highlightClass: 'herb-b font-semibold' },
    { id: 'r4', name: 'Erva Verde (VD) + Verde (VD)', quantity: 2, effectOrDetails: 'Recupera +4 de Vida (V)', category: 'resource', highlightClass: 'herb-g font-semibold font-bold' },
    { id: 'r5', name: 'Erva Verde (VD) + Vermelha (VR)', quantity: 2, effectOrDetails: 'Recupera Toda a Vida (Full V)', category: 'resource', highlightClass: 'text-green-400 font-bold' },
    { id: 'r6', name: 'Erva Verde (VD) + Azul (AZ)', quantity: 2, effectOrDetails: 'Recupera +3 de Vida (V) + Antídoto contra Veneno', category: 'resource', highlightClass: 'font-bold' },
    { id: 'r7', name: 'Erva VD + VD + VD', quantity: 1, effectOrDetails: 'Recupera Toda a Vida (Full V) + 2 de Escudo Temporário', category: 'resource', highlightClass: 'text-green-400 font-bold' },
    { id: 'r8', name: 'Erva VD + VR + AZ', quantity: 1, effectOrDetails: 'Recupera Toda a Vida (Full V) + Antídoto + Proteção temporária', category: 'resource', highlightClass: 'text-green-400 font-bold' },
    { id: 'r9', name: 'Spray de Primeiros Socorros', quantity: 1, effectOrDetails: 'Recupera Toda a Vida (Full V)', category: 'resource', highlightClass: 'text-green-400 font-bold' },
    { id: 'r10', name: 'Armas Variadas', quantity: 13, effectOrDetails: 'Aumentam o Teto Máximo de Defesa (+2 / +4 / +6)', category: 'resource', highlightClass: 'text-blue-400 font-semibold' },
    
    // Ameaças
    { id: 't1', name: 'Zumbi', quantity: 10, damage: '-1', effectOrDetails: 'Inimigo básico cambaleante.', category: 'threat' },
    { id: 't2', name: 'G-Parasita', quantity: 6, damage: '-1', effectOrDetails: 'Espalha parasitas biológicos.', category: 'threat' },
    { id: 't3', name: 'Cão Zumbi', quantity: 8, damage: '-2', effectOrDetails: 'Inimigo extremamente ágil e voraz.', category: 'threat' },
    { id: 't4', name: 'Carnificina (Licker)', quantity: 6, damage: '-3', effectOrDetails: 'Predador cego com garras afiadas em teto de metal.', category: 'threat' },
    { id: 't5', name: 'G-Adulto', quantity: 3, damage: '-3', effectOrDetails: 'Abominação encontrada nos bueiros e esgotos.', category: 'threat' },
    { id: 't6', name: 'Zumbi Planta (Ivy)', quantity: 4, damage: '-4 (Aplica Veneno)', effectOrDetails: 'Zumbis fundidos com cipós que injetam toxinas venenosas.', category: 'threat' },
    { id: 't7', name: 'G (Todas as Fases)', quantity: 5, damage: '-4', effectOrDetails: 'O terrível vírus mutante do Dr. William Birkin.', category: 'threat' },
    { id: 't8', name: 'Mr. X', quantity: 2, damage: '-5', effectOrDetails: 'Inseguidor indestrutível da Umbrella.', category: 'threat' },
    { id: 't9', name: 'Super Tirano', quantity: 1, damage: '-9', effectOrDetails: 'Mutação final colossal. Dropa as 3 peças finais dos Medalhões se você conseguir sobreviver ao dano devastador.', category: 'threat' },
  ], []);

  // Quick select presets for damage simulator
  const presets = [
    { name: 'Zumbi', value: 1, color: 'border-zinc-700 hover:bg-zinc-800' },
    { name: 'Cão Zumbi', value: 2, color: 'border-orange-500/30 hover:bg-orange-950/20 text-orange-400' },
    { name: 'Licker / G-Adulto', value: 3, color: 'border-orange-500/40 hover:bg-orange-950/35 text-orange-400' },
    { name: 'Zumbi Ivy / G-Vírus', value: 4, color: 'border-red-900/40 hover:bg-red-950/20 text-red-400' },
    { name: 'Mr. X', value: 5, color: 'border-red-800 hover:bg-red-950/30 text-red-500' },
    { name: 'Super Tirano', value: 9, color: 'border-red-600 bg-red-950/10 hover:bg-red-950/40 text-red-500 font-bold' }
  ];

  // Calculate overflow damage
  const handleSimulate = () => {
    // Defense absorbs first
    const absorbed = Math.min(currentDef, damageInput);
    const remainingDmg = damageInput - absorbed;
    const finalDef = currentDef - absorbed;
    const finalHp = Math.max(0, currentHp - remainingDmg);

    setSimulationLog({
      originalHp: currentHp,
      originalDef: currentDef,
      incomingDmg: damageInput,
      absorbedByDef: absorbed,
      overflowDmg: remainingDmg,
      finalHp: finalHp,
      finalDef: finalDef
    });
  };

  const handleResetSim = () => {
    setCurrentHp(6);
    setCurrentDef(2);
    setDamageInput(3);
    setSimulationLog(null);
  };

  // Filter & Search application
  const filteredDeck = useMemo(() => {
    return deckList.filter((item) => {
      const matchSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.effectOrDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = 
        selectedCategory === 'all' || 
        item.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [deckList, searchQuery, selectedCategory]);

  return (
    <div className="relative min-h-screen pb-16 antialiased selection:bg-red-900 selection:text-white font-sans text-zinc-300">
      {/* Retrô Scanlines Overlay */}
      <div className="scanlines"></div>

      {/* Decorative side banners / Ambient lighting */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-red-950/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-10 -z-10 h-72 w-72 rounded-full bg-red-950/5 blur-[100px]" />

      {/* Top Banner indicating restricted access context */}
      <div className="bg-red-950/30 border-b border-red-900/30 py-2 text-center text-xs tracking-widest text-red-500 font-mono">
        <span className="animate-pulse mr-2">●</span> ARQUIVOS CONFIDENCIAIS UMBRELLA CORP. // DEPARTAMENTO DE DESIGN COOPERATIVO
      </div>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto pt-10 pb-6 px-4 text-center border-b border-red-900/30">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="inline-block"
        >
          <Biohazard className="text-5xl md:text-6xl text-red-500 mb-4 mx-auto animate-pulse filter drop-shadow-[0_0_15px_rgba(239, 68, 68, 0.4)]" />
        </motion.div>
        <motion.h1 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest text-white mb-2 font-mono"
        >
          Resident Evil 2
        </motion.h1>
        <motion.h2 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl md:text-2xl text-red-500 tracking-widest font-semibold font-mono"
        >
          The Card Survival
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-zinc-500 font-mono text-xs uppercase max-w-xs mx-auto border border-zinc-800 py-1.5 px-3 rounded-full bg-black/40"
        >
          Classificação: Alpha Playtest // Restrito
        </motion.p>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-10 relative z-10">
        
        {/* Intro Atmosphere text */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-zinc-400 text-center italic leading-relaxed border-l-2 border-r-2 border-red-900/10 px-6 py-4 rounded bg-zinc-950/20"
        >
          &ldquo;Bem-vindo a Raccoon City. Este é um jogo cooperativo de sobrevivência, gerenciamento de inventário e coleção de itens. O baralho é a própria cidade tentando matar vocês. Cooperem, gerenciem seus recursos ou juntem-se à horda.&rdquo;
        </motion.p>

        {/* Section 1: Objetivo */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="card-panel p-6 rounded-lg blood-border"
        >
          <h2 className="text-xl md:text-2xl text-white mb-4 flex items-center gap-3 font-mono">
            <Crosshair className="text-red-500 w-6 h-6 animate-spin-slow" /> 1. Objetivo do Jogo
          </h2>
          <p className="mb-5 leading-relaxed text-zinc-300">
            Para vencerem, os sobreviventes precisam cooperar para coletar peças e completar <strong className="text-white font-semibold">um dos três grandes Puzzles</strong> de Raccoon City. Assim que o grupo reunir as peças de um puzzle completo e colocá-las em jogo, a rota de escapatória é ativada.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-zinc-950/50 p-4 rounded border border-green-900/20 hover:border-green-500/20 transition-all duration-300">
              <h3 className="text-green-500 flex items-center gap-2 mb-2 font-mono text-base font-bold">
                <Plane className="w-5 h-5" /> Vitória Coletiva
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Se pelo menos um sobrevivente humano conseguir escapar com o puzzle final concluído na mesa, <strong className="text-green-400">todos os sobreviventes vivos vencem juntos</strong>.
              </p>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded border border-red-900/20 hover:border-red-500/20 transition-all duration-300">
              <h3 className="text-red-500 flex items-center gap-2 mb-2 font-mono text-base font-bold">
                <Skull className="w-5 h-5" /> Derrota da Humanidade
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Se o último sobrevivente humano for infectado e morrer na partida, a simulação acaba imediatamente e os <strong className="text-red-400">Zumbis saem vitoriosos</strong>.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Atributos com Simulador Interativo de Transbordamento */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="card-panel p-6 rounded-lg blood-border"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-2 border-b border-zinc-800">
            <h2 className="text-xl md:text-2xl text-white flex items-center gap-3 font-mono">
              <HeartPulse className="text-red-500 w-6 h-6" /> 2. Atributos Iniciais e Saúde
            </h2>
            <div className="hidden md:flex gap-2">
              <span className="px-2.5 py-0.5 bg-blue-950/50 text-blue-400 border border-blue-900/40 text-xs font-mono rounded">Defesa Inicial: 2</span>
              <span className="px-2.5 py-0.5 bg-green-950/50 text-green-400 border border-green-900/40 text-xs font-mono rounded">Vida Inicial: 6</span>
            </div>
          </div>
          
          <p className="mb-4 text-zinc-300 leading-relaxed">
            Cada jogador inicia a partida na mesa com marcadores que representam sua integridade e prontidão tática:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-zinc-950/40 p-4 rounded-lg border border-zinc-800 flex items-start gap-3">
              <Shield className="text-blue-400 w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-blue-400 block font-mono text-sm uppercase">Defesa (D): 2 Pontos (Teto Inicial)</strong>
                <span className="text-xs text-zinc-400 block mt-1 leading-relaxed">
                  Representa sua munição guardada, coletes à prova de balas e defesas ativas. Funciona como escudo primário.
                </span>
              </div>
            </div>

            <div className="bg-zinc-950/40 p-4 rounded-lg border border-zinc-800 flex items-start gap-3">
              <Heart className="text-green-500 w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-green-500 block font-mono text-sm uppercase">Vida (V): 6 Pontos (Máximo Inicial)</strong>
                <span className="text-xs text-zinc-400 block mt-1 leading-relaxed">
                  Sua barra de integridade biológica contra mordidas, toxinas e mutações.
                </span>
              </div>
            </div>
          </div>

          {/* Regra Especial Callout */}
          <div className="bg-red-950/30 border border-red-900/40 p-4 rounded-lg relative overflow-hidden mb-8">
            <div className="absolute top-2 right-2 opacity-5"><AlertTriangle className="text-red-500 w-32 h-32" /></div>
            <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2 font-mono text-sm uppercase tracking-wide">
              <Droplet className="w-4 h-4 animate-pulse text-red-500" /> Regra do Transbordamento Obrigatório
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Quando sofrer dano de uma Ameaça do deck, o dano é reduzido <strong className="text-white font-semibold">obrigatoriamente da sua Defesa (D) primeiro</strong>. Caso sua Defesa seja totalmente zerada (Estado Crítico), qualquer ponto de dano restante ou futuro é subtraído diretamente de sua <strong className="text-red-400">Vida (V)</strong>. Você morre se a Vida chegar a 0.
            </p>
          </div>
        </motion.section>

        {/* Section 3: Inventário */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="card-panel p-6 rounded-lg blood-border"
        >
          <h2 className="text-xl md:text-2xl text-white mb-4 flex items-center gap-3 font-mono">
            <Briefcase className="text-red-500 w-6 h-6" /> 3. O Inventário e o Baú
          </h2>
          <div className="grid gap-3">
            <div className="bg-zinc-800/10 p-3.5 rounded border border-zinc-800/60 hover:bg-zinc-800/20 transition">
              <p className="text-sm">
                <strong className="text-white font-semibold">Limite de Mão:</strong> Você pode carregar no máximo <strong className="text-yellow-500 font-bold font-mono">4 cartas na mão</strong> ao mesmo tempo. Planeje os seus descartes e trocas antes do limite estourar.
              </p>
            </div>
            <div className="bg-zinc-800/10 p-3.5 rounded border border-zinc-800/60 hover:bg-zinc-800/20 transition">
              <p className="text-sm">
                <strong className="text-white font-semibold">As Armas:</strong> Manter uma carta de Arma na mão expande ativa e temporariamente seu <strong className="text-blue-400 font-semibold">Teto de Defesa máximo</strong> (ex: uma arma comum aumenta seu teto de 2 para 4 pontos de Defesa máxima). Se você descartar ou quebrar a arma, seu teto máximo de Defesa na mesa encolhe novamente instantaneamente.
              </p>
            </div>
            <div className="bg-zinc-800/10 p-3.5 rounded border border-zinc-800/60 hover:bg-zinc-800/20 transition">
              <p className="text-sm">
                <strong className="text-white font-semibold">O Baú Pessoal (Bloqueado):</strong> Você não inicia o jogo com um baú. O baú só passa a existir fisicamente em sua área de jogo se você sacar e baixar a carta utilitária correspondente <em>Baú</em> de sua mão.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Fluxo do Turno */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="card-panel p-6 rounded-lg blood-border"
        >
          <h2 className="text-xl md:text-2xl text-white mb-2 flex items-center gap-3 font-mono">
            <Clock className="text-red-500 w-6 h-6" /> 4. O Fluxo do Turno (Sobrevivente)
          </h2>
          <p className="mb-6 text-xs text-zinc-500 font-mono tracking-widest uppercase">
            Sentido horário // Cada sobrevivente executa duas fases cruciais
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg text-white mb-3 font-mono border-b border-zinc-800 pb-1.5 flex items-center gap-2">
              <span className="text-red-500 font-bold text-sm">F1</span> Fase 1: Encontro (Escolha uma Opção)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-950/40 p-4 rounded border-l-2 border-yellow-600/80 hover:bg-zinc-950/60 transition">
                <strong className="text-yellow-500 block mb-2 font-mono uppercase text-sm tracking-wider">Opção A - Sacar</strong>
                <p className="text-xs leading-relaxed text-zinc-300">
                  Compre exatamente <strong className="text-white">1 carta</strong> do deck de sobrevivência principal.
                </p>
                <ul className="list-disc pl-5 mt-2.5 text-xs space-y-1.5 text-zinc-400 font-mono">
                  <li><em className="text-red-400 font-bold">Ameaça:</em> Aplique o dano na sua Defesa/Vida imediatamente e descarte a carta.</li>
                  <li><em className="text-green-400 font-bold">Recurso/Peça:</em> Envie a carta para sua mão (respeite o limite de 4 itens).</li>
                </ul>
              </div>

              <div className="bg-zinc-950/40 p-4 rounded border-l-2 border-red-600/80 hover:bg-zinc-950/60 transition flex flex-col justify-between">
                <div>
                  <strong className="text-red-500 block mb-2 font-mono uppercase text-sm tracking-wider">Opção B - Atacar Zumbi</strong>
                  <p className="text-xs leading-relaxed text-zinc-300">
                    Ao invés de puxar cartas desconhecidas, use seus recursos ofensivos para agredir um jogador companheiro infectado que já virou zumbi.
                  </p>
                </div>
                <div className="mt-3 text-xs border-t border-zinc-800/60 pt-2.5 text-zinc-400">
                  Ao atacar, você <strong className="text-yellow-500">rouba uma carta aleatória</strong> da mão de zumbi dele (ótimo estratégico para recuperar peças cruciais perdidas de puzzles!).
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-white mb-3 font-mono border-b border-zinc-800 pb-1.5 flex items-center gap-2">
              <span className="text-red-500 font-bold text-sm">F2</span> Fase 2: Gestão de Recursos (Escolha uma Ação)
            </h3>
            <div className="grid gap-2 text-xs md:text-sm">
              <div className="bg-zinc-900/55 p-3 rounded flex items-center gap-3 border border-zinc-800/40 hover:bg-zinc-900/80 hover:border-zinc-700/50 transition">
                <Syringe className="text-green-500 w-5 h-5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white font-mono uppercase text-xs">Usar Item:</strong> Ative e fatigue uma cura ou munição de sua mão para restaurar atributos de vida e barreira tática.
                </span>
              </div>
              
              <div className="bg-zinc-900/55 p-3 rounded flex items-center gap-3 border border-zinc-800/40 hover:bg-zinc-900/80 hover:border-zinc-700/50 transition">
                <Handshake className="text-blue-400 w-5 h-5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white font-mono uppercase text-xs">Cooperar:</strong> Repasse diretamente 1 carta de combate da sua própria mão para qualquer parceiro sobrevivente que esteja no jogo.
                </span>
              </div>

              <div className="bg-zinc-900/55 p-3 rounded flex items-center gap-3 border border-zinc-800/40 hover:bg-zinc-900/80 hover:border-zinc-700/50 transition">
                <Package className="text-yellow-600 w-5 h-5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white font-mono uppercase text-xs">Gerenciar Baú:</strong> Se possuir a carta do Baú de jogo ativo em sua mesa, deposite ou retire itens de sua estocagem privada de segurança.
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Zumbificação */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="card-panel p-6 rounded-lg blood-border"
        >
          <h2 className="text-xl md:text-2xl text-white mb-4 flex items-center gap-3 font-mono">
            <Biohazard className="text-red-500 w-6 h-6 animate-pulse" /> 5. Morte e Zumbificação
          </h2>
          <p className="mb-4 text-zinc-300 leading-relaxed text-sm md:text-base">
            Quando sua Vida biológica chega a 0, você cai em campo de combate. Mas o horror está longe de terminar! Suas cartas <strong className="text-white font-semibold">não caem no chão</strong> e continuam retidas em sua mão secreta. No início do seu próximo turno, você se reergue como um impiedoso <strong className="text-red-500 font-bold font-mono">Zumbi Imortal</strong>.
          </p>
          
          <div className="bg-red-950/20 p-5 rounded border border-red-900/30 relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 opacity-5"><Skull className="text-red-500 w-36 h-36" /></div>
            <h3 className="text-red-500 font-bold mb-3 uppercase tracking-wider text-sm font-mono flex items-center gap-2">
              <Skull className="w-5 h-5" /> O Turno Hostil do Zumbi
            </h3>
            
            <ol className="list-decimal pl-5 space-y-4 text-sm tracking-wide text-zinc-300">
              <li className="leading-relaxed">
                <strong className="text-white">Fase de Saque de Infecção:</strong> Compre 1 carta normal do deck principal.
                <ul className="list-disc pl-5 mt-1.5 text-xs text-zinc-400 space-y-1">
                  <li><em className="text-green-400">Recurso/Peça:</em> Guarde secretamente na mão (você acumula itens para que sobreviventes tentem arriscar assaltar).</li>
                  <li><em className="text-red-400">Ameaça:</em> Devolva e embaralhe-a de volta no deck (aumentando a infestação).</li>
                </ul>
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Ação de Ataque Zumbi (Escolha uma):</strong>
                <ul className="list-disc pl-5 mt-1.5 text-xs text-zinc-400 space-y-2">
                  <li>
                    <strong className="text-red-400 font-bold">Ataque Simples:</strong> Vá direto para cima e cause <strong className="text-red-500 font-mono font-bold">-1 de dano</strong> a qualquer sobrevivente vivo.
                  </li>
                  <li>
                    <strong className="text-red-400 font-bold">Ataque de Horda Coordenado:</strong> Combine sua investida com outro jogador zumbi. Ambos sacrificam o ataque simples para <strong className="text-yellow-500 font-semibold font-mono">anular a Fase 2 (Gestão)</strong> de um humano sobrevivente no próximo turno.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </motion.section>

        {/* Section 6: Puzzles */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="card-panel p-6 rounded-lg blood-border"
        >
          <h2 className="text-xl md:text-2xl text-white mb-4 flex items-center gap-3 font-mono">
            <Puzzle className="text-red-500 w-6 h-6" /> 6. Os Caminhos da Vitória
          </h2>
          <p className="mb-5 text-sm text-zinc-400 leading-relaxed">
            Organizem as cartas e baixem de forma visível na mesa. Formem exatamente um destes três combos lendários para desencadear a evacuação segura:
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-zinc-950/70 p-5 rounded-lg border border-zinc-800 text-center hover:border-zinc-700 hover:-translate-y-1 transition duration-300">
              <span className="inline-block p-2.5 rounded-full bg-zinc-900 border border-zinc-700/40 text-zinc-400 mb-3">
                <Layers className="w-6 h-6" />
              </span>
              <h4 className="font-bold text-white text-sm mb-1.5 tracking-wider uppercase font-mono">Fuga pelo esgoto</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Junte e revele as <strong className="text-white">6 cartas</strong> exclusivas de Plugs de Xadrez (Peão, Cavalo, Torre, Bispo, Rei e Rainha).
              </p>
            </div>

            <div className="bg-zinc-950/70 p-5 rounded-lg border border-zinc-800 text-center hover:border-zinc-700 hover:-translate-y-1 transition duration-300">
              <span className="inline-block p-2.5 rounded-full bg-zinc-900 border border-zinc-700/40 text-zinc-400 mb-3">
                <Key className="w-6 h-6" />
              </span>
              <h4 className="font-bold text-white text-sm mb-1.5 tracking-wider uppercase font-mono">Fuga da Delegacia</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Reúna em jogo as <strong className="text-white">4 Chaves do R.P.D.</strong> (Paus, Copas, Ouros, Espadas) + <strong className="text-white">2 Engrenagens</strong> da Torre de Relógio.
              </p>
            </div>

            <div className="bg-zinc-950/70 p-5 rounded-lg border border-yellow-900/30 text-center hover:border-yellow-600/30 hover:-translate-y-1 transition duration-300">
              <span className="inline-block p-2.5 rounded-full bg-yellow-950/30 border border-yellow-800/40 text-yellow-500 mb-3">
                <Medal className="w-6 h-6 animate-pulse" />
              </span>
              <h4 className="font-bold text-yellow-500 text-sm mb-1.5 tracking-wider uppercase font-mono">Portal do Medalhão</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Junte <strong className="text-white">3 Medalhões Básicos</strong> + as <strong className="text-yellow-500">3 peças secretas exclusivas</strong> coletadas obrigatoriamente derrotando o perigoso Super Tirano ou G Fase 5.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 7: Deck */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="card-panel p-6 rounded-lg blood-border"
          id="deck-contents"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-zinc-800">
            <div>
              <h2 className="text-xl md:text-2xl text-white flex items-center gap-3 font-mono mb-1">
                <Layers className="text-red-500 w-6 h-6" /> 7. Conteúdo do Deck (118 Cartas)
              </h2>
              <p className="text-xs text-zinc-500 font-mono uppercase">
                Arquitetura detalhada do baralho de jogo
              </p>
            </div>
            
            {/* Real-time category pills counters */}
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
              <span className="px-2 py-0.5 bg-zinc-950 text-zinc-400 rounded border border-zinc-800">Total: 118</span>
              <span className="px-2 py-0.5 bg-purple-950/30 text-purple-400 rounded border border-purple-900/30">Puzzles: 15</span>
              <span className="px-2 py-0.5 bg-blue-950/30 text-blue-400 rounded border border-blue-900/30">Utilitários: 12</span>
              <span className="px-2 py-0.5 bg-green-950/30 text-green-400 rounded border border-green-900/30">Recursos: 31</span>
              <span className="px-2 py-0.5 bg-red-950/30 text-red-400 rounded border border-red-900/30">Ameaças: 60</span>
            </div>
          </div>

          {/* Interactive Search Tool & Filters */}
          <div className="bg-zinc-950/40 p-4 border border-zinc-800/80 rounded-lg mb-6 space-y-3.5">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar cartas por nome, efeito ou palavra-chave (ex: 'erva', 'zumbi', 'cura')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-xs md:text-sm focus:outline-none focus:border-red-800 text-white transition font-sans placeholder-zinc-600"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs text-zinc-500 font-mono uppercase mr-1">Filtrar por:</span>
              <button
                type="button"
                onClick={() => { setSelectedCategory('all'); }}
                className={`text-xs px-2.5 py-1 rounded border font-mono transition cursor-pointer ${selectedCategory === 'all' ? 'bg-red-950/50 border-red-800 text-red-400 font-bold' : 'bg-transparent border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}`}
              >
                Tudo ({deckList.reduce((acc, curr) => acc + curr.quantity, 0)})
              </button>
              <button
                type="button"
                onClick={() => { setSelectedCategory('puzzle'); }}
                className={`text-xs px-2.5 py-1 rounded border font-mono transition cursor-pointer ${selectedCategory === 'puzzle' ? 'bg-purple-950/50 border-purple-800 text-purple-400 font-bold' : 'bg-transparent border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}`}
              >
                Puzzles (15)
              </button>
              <button
                type="button"
                onClick={() => { setSelectedCategory('utility'); }}
                className={`text-xs px-2.5 py-1 rounded border font-mono transition cursor-pointer ${selectedCategory === 'utility' ? 'bg-blue-950/50 border-blue-800 text-blue-400 font-bold' : 'bg-transparent border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}`}
              >
                Utilitários (12)
              </button>
              <button
                type="button"
                onClick={() => { setSelectedCategory('resource'); }}
                className={`text-xs px-2.5 py-1 rounded border font-mono transition cursor-pointer ${selectedCategory === 'resource' ? 'bg-green-950/50 border-green-800 text-green-400 font-bold' : 'bg-transparent border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}`}
              >
                Recursos (31)
              </button>
              <button
                type="button"
                onClick={() => { setSelectedCategory('threat'); }}
                className={`text-xs px-2.5 py-1 rounded border font-mono transition cursor-pointer ${selectedCategory === 'threat' ? 'bg-red-950/50 border-red-800 text-red-500 font-bold' : 'bg-transparent border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}`}
              >
                Ameaças (60)
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="overflow-x-auto border border-zinc-800 rounded bg-zinc-950/20">
              <table className="terminal-table text-xs md:text-sm">
                <thead>
                  <tr>
                    <th className="p-3 text-left w-1/3">Item / Carta</th>
                    <th className="p-3 text-center w-16">Qtd</th>
                    <th className="p-3 text-center w-24">Impacto</th>
                    <th className="p-3 text-left">Efeito Geral // Descrição Tática</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeck.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-zinc-500 italic font-mono">
                        Nenhuma carta encontrada para o critério digitado.
                      </td>
                    </tr>
                  ) : (
                    filteredDeck.map((item) => (
                      <tr key={item.id} className="transition-colors">
                        <td className="p-3">
                          <span className={`block font-semibold ${item.highlightClass || 'text-zinc-100'}`}>
                            {item.name}
                          </span>
                          <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest block mt-0.5">
                            {item.category === 'puzzle' && '🧩 Puzzle'}
                            {item.category === 'utility' && '⚙️ Utilitário'}
                            {item.category === 'resource' && '🩹 Recurso'}
                            {item.category === 'threat' && '☣️ Ameaça'}
                          </span>
                        </td>
                        <td className="p-3 text-center text-sm font-bold font-mono text-zinc-400">
                          {item.quantity}
                        </td>
                        <td className="p-3 text-center">
                          {item.damage ? (
                            <span className="px-2 py-0.5 rounded bg-red-950/50 text-red-400 border border-red-900/40 font-bold font-mono text-xs">
                              {item.damage}
                            </span>
                          ) : item.category === 'puzzle' ? (
                            <span className="px-2 py-0.5 rounded bg-purple-950/20 text-purple-400 border border-purple-900/30 text-[10px] font-mono">
                              Peça
                            </span>
                          ) : item.category === 'utility' ? (
                            <span className="px-2 py-0.5 rounded bg-blue-950/20 text-blue-400 border border-blue-900/30 text-[10px] font-mono">
                              Utilidade
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-green-950/20 text-green-400 border border-green-900/30 text-[10px] font-mono">
                              Suporte
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-xs leading-relaxed text-zinc-300">
                          {item.effectOrDetails}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Footer bottom decorative signoff */}
        <div className="text-center mt-12 pb-8">
          <p className="text-red-600 font-mono tracking-[0.25em] opacity-40 text-xs md:text-sm animate-pulse">
            // GOOD LUCK, SURVIVORS //
          </p>
          <p className="text-zinc-600 text-[10px] font-mono mt-2 uppercase tracking-widest">
            Raccoon City Incident Survivor Kit &copy; 2026 // Umbrella Corporation
          </p>
        </div>

      </main>
    </div>
  );
}
