/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Key
} from 'lucide-react';

export default function App() {
  return (
    <div className="relative min-h-screen pb-16 antialiased selection:bg-red-900 selection:text-white font-sans text-zinc-300 text-base">
      {/* Retrô Scanlines Overlay */}
      <div className="scanlines"></div>

      {/* Decorative side banners / Ambient lighting */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-red-950/10 blur-[120px] hidden lg:block" />
      <div className="pointer-events-none fixed bottom-0 right-10 -z-10 h-72 w-72 rounded-full bg-red-950/5 blur-[100px] hidden lg:block" />

      {/* Top Banner indicating restricted access context */}
      <div className="bg-red-950/30 border-b border-red-900/30 py-2.5 text-center text-base tracking-widest text-red-500 font-mono">
        <span className="mr-2">●</span> ARQUIVOS CONFIDENCIAIS UMBRELLA CORP. // DEPARTAMENTO DE DESIGN COOPERATIVO
      </div>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto pt-10 pb-6 px-4 text-center border-b border-red-900/30">
        <div className="inline-block">
          <Biohazard className="text-6xl md:text-7xl text-red-500 mb-4 mx-auto" />
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest text-white mb-2 font-mono">
          Resident Evil 2
        </h1>
        <h2 className="text-2xl md:text-3xl text-red-500 tracking-widest font-semibold font-mono">
          The Card Survival
        </h2>
        <p className="mt-4 text-zinc-400 font-mono text-base uppercase max-w-md mx-auto border border-zinc-800 py-1.5 px-3 rounded-full bg-black/40">
          Classificação: Alpha Playtest // Restrito
        </p>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-10 relative z-10">
        
        {/* Intro Atmosphere text */}
        <p className="text-lg md:text-xl text-zinc-400 text-center italic leading-relaxed border-l-2 border-r-2 border-red-900/10 px-6 py-4 rounded bg-zinc-950/20">
          &ldquo;Bem-vindo a Raccoon City. Este é um jogo cooperativo de sobrevivência, gerenciamento de inventário e coleção de itens. O baralho é a própria cidade tentando matar vocês. Cooperem, gerenciem seus recursos ou juntem-se à horda.&rdquo;
        </p>

        {/* Section 1: Objetivo */}
        <section className="card-panel p-6 rounded-lg blood-border">
          <h2 className="text-2xl md:text-3xl text-white mb-4 flex items-center gap-3 font-mono">
            <Crosshair className="text-red-500 w-6 h-6" /> 1. Objetivo do Jogo
          </h2>
          <p className="mb-5 leading-relaxed text-zinc-300 text-base">
            Para vencerem, os sobreviventes precisam cooperar para coletar peças e completar <strong className="text-white font-semibold">um dos três grandes Puzzles</strong> de Raccoon City. Assim que o grupo reunir as peças de um puzzle completo e colocá-las em jogo, a rota de escapatória é ativada.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-zinc-950/50 p-4 rounded border border-green-900/20 hover:border-green-500/20 transition-all duration-300">
              <h3 className="text-green-500 flex items-center gap-2 mb-2 font-mono text-lg font-bold">
                <Plane className="w-5 h-5" /> Vitória Coletiva
              </h3>
              <p className="text-base text-zinc-400 leading-relaxed">
                Se pelo menos um sobrevivente humano conseguir escapar com o puzzle final concluído na mesa, <strong className="text-green-400">todos os sobreviventes vivos vencem juntos</strong>.
              </p>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded border border-red-900/20 hover:border-red-500/20 transition-all duration-300">
              <h3 className="text-red-500 flex items-center gap-2 mb-2 font-mono text-lg font-bold">
                <Skull className="w-5 h-5" /> Derrota da Humanidade
              </h3>
              <p className="text-base text-zinc-400 leading-relaxed">
                Se o último sobrevivente humano for infectado e morrer na partida, a simulação acaba imediatamente e os <strong className="text-red-400">Zumbis saem vitoriosos</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Atributos com Simulador Interativo de Transbordamento */}
        <section className="card-panel p-6 rounded-lg blood-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-2 border-b border-zinc-800">
            <h2 className="text-2xl md:text-3xl text-white flex items-center gap-3 font-mono">
              <HeartPulse className="text-red-500 w-6 h-6" /> 2. Atributos Iniciais e Saúde
            </h2>
            <div className="hidden md:flex gap-2">
              <span className="px-2.5 py-0.5 bg-blue-950/50 text-blue-400 border border-blue-900/40 text-base font-mono rounded">Defesa Inicial: 2</span>
              <span className="px-2.5 py-0.5 bg-green-950/50 text-green-400 border border-green-900/40 text-base font-mono rounded">Vida Inicial: 6</span>
            </div>
          </div>
          
          <p className="mb-4 text-zinc-300 leading-relaxed text-base">
            Cada jogador inicia a partida na mesa com marcadores que representam sua integridade e prontidão tática:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-zinc-950/40 p-4 rounded-lg border border-zinc-800 flex items-start gap-3">
              <Shield className="text-blue-400 w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-blue-400 block font-mono text-base uppercase">Defesa (D): 2 Pontos (Teto Inicial)</strong>
                <span className="text-base text-zinc-400 block mt-1 leading-relaxed">
                  Representa sua munição guardada, coletes à prova de balas e defesas ativas. Funciona como escudo primário.
                </span>
              </div>
            </div>

            <div className="bg-zinc-950/40 p-4 rounded-lg border border-zinc-800 flex items-start gap-3">
              <Heart className="text-green-500 w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-green-500 block font-mono text-base uppercase">Vida (V): 6 Pontos (Máximo Inicial)</strong>
                <span className="text-base text-zinc-400 block mt-1 leading-relaxed">
                  Sua barra de integridade biológica contra mordidas, toxinas e mutações.
                </span>
              </div>
            </div>
          </div>

          {/* Regra Especial Callout */}
          <div className="bg-red-950/30 border border-red-900/40 p-4 rounded-lg relative overflow-hidden mb-8">
            <div className="absolute top-2 right-2 opacity-5"><AlertTriangle className="text-red-500 w-32 h-32" /></div>
            <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2 font-mono text-base uppercase tracking-wide">
              <Droplet className="w-4 h-4 text-red-500" /> Regra do Transbordamento Obrigatório
            </h3>
            <p className="text-base text-zinc-300 leading-relaxed">
              Quando sofrer dano de uma Ameaça do deck, o dano é reduzido <strong className="text-white font-semibold">obrigatoriamente da sua Defesa (D) primeiro</strong>. Caso sua Defesa seja totalmente zerada (Estado Crítico), qualquer ponto de dano restante ou futuro é subtraído diretamente de sua <strong className="text-red-400">Vida (V)</strong>. Você morre se a Vida chegar a 0.
            </p>
          </div>
        </section>

        {/* Section 3: Inventário */}
        <section className="card-panel p-6 rounded-lg blood-border">
          <h2 className="text-2xl md:text-3xl text-white mb-4 flex items-center gap-3 font-mono">
            <Briefcase className="text-red-500 w-6 h-6" /> 3. O Inventário e o Baú
          </h2>
          <div className="grid gap-3">
            <div className="bg-zinc-800/10 p-3.5 rounded border border-zinc-800/60 hover:bg-zinc-800/20 transition">
              <p className="text-base">
                <strong className="text-white font-semibold">Limite de Mão:</strong> Você pode carregar no máximo <strong className="text-yellow-500 font-bold font-mono">4 cartas na mão</strong> ao mesmo tempo. Planeje os seus descartes e trocas antes do limite estourar.
              </p>
            </div>
            <div className="bg-zinc-800/10 p-3.5 rounded border border-zinc-800/60 hover:bg-zinc-800/20 transition">
              <p className="text-base">
                <strong className="text-white font-semibold">As Armas:</strong> Manter uma carta de Arma na mão expande ativa e temporariamente seu <strong className="text-blue-400 font-semibold">Teto de Defesa máximo</strong> (ex: uma arma comum aumenta seu teto de 2 para 4 pontos de Defesa máxima). Se você descartar ou quebrar a arma, seu teto máximo de Defesa na mesa encolhe novamente instantaneamente.
              </p>
            </div>
            <div className="bg-zinc-800/10 p-3.5 rounded border border-zinc-800/60 hover:bg-zinc-800/20 transition">
              <p className="text-base">
                <strong className="text-white font-semibold">O Baú Pessoal (Bloqueado):</strong> Você não inicia o jogo com um baú. O baú só passa a existir fisicamente em sua área de jogo se você sacar e baixar a carta utilitária correspondente <em>Baú</em> de sua mão.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Fluxo do Turno */}
        <section className="card-panel p-6 rounded-lg blood-border">
          <h2 className="text-2xl md:text-3xl text-white mb-2 flex items-center gap-3 font-mono">
            <Clock className="text-red-500 w-6 h-6" /> 4. O Fluxo do Turno (Sobrevivente)
          </h2>
          <p className="mb-6 text-base text-zinc-500 font-mono tracking-widest uppercase">
            Sentido horário // Cada sobrevivente executa duas fases cruciais
          </p>
          
          <div className="mb-6">
            <h3 className="text-xl text-white mb-3 font-mono border-b border-zinc-800 pb-1.5 flex items-center gap-2">
              <span className="text-red-500 font-bold text-base">F1</span> Fase 1: Encontro (Escolha uma Opção)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-950/40 p-4 rounded border-l-2 border-yellow-600/80 hover:bg-zinc-950/60 transition">
                <strong className="text-yellow-500 block mb-2 font-mono uppercase text-base tracking-wider">Opção A - Sacar</strong>
                <p className="text-base leading-relaxed text-zinc-300">
                  Compre exatamente <strong className="text-white">1 carta</strong> do deck de sobrevivência principal.
                </p>
                <ul className="list-disc pl-5 mt-2.5 text-base space-y-1.5 text-zinc-400 font-mono">
                  <li><em className="text-red-400 font-bold text-base">Ameaça:</em> Aplique o dano na sua Defesa/Vida imediatamente e descarte a carta.</li>
                  <li><em className="text-green-400 font-bold text-base">Recurso/Peça:</em> Envie a carta para sua mão (respeite o limite de 4 itens).</li>
                </ul>
              </div>

              <div className="bg-zinc-950/40 p-4 rounded border-l-2 border-red-600/80 hover:bg-zinc-950/60 transition flex flex-col justify-between">
                <div>
                  <strong className="text-red-500 block mb-2 font-mono uppercase text-base tracking-wider">Opção B - Atacar Zumbi</strong>
                  <p className="text-base leading-relaxed text-zinc-300">
                    Ao invés de puxar cartas desconhecidas, use seus resources ofensivos para agredir um jogador companheiro infectado que já virou zumbi.
                  </p>
                </div>
                <div className="mt-3 text-base border-t border-zinc-800/60 pt-2.5 text-zinc-400">
                  Ao atacar, você <strong className="text-yellow-500">rouba uma carta aleatória</strong> da mão de zumbi dele (ótimo estratégico para recuperar peças cruciais perdidas de puzzles!).
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl text-white mb-3 font-mono border-b border-zinc-800 pb-1.5 flex items-center gap-2">
              <span className="text-red-500 font-bold text-base">F2</span> Fase 2: Gestão de Recursos (Escolha uma Ação)
            </h3>
            <div className="grid gap-2 text-base md:text-lg">
              <div className="bg-zinc-900/55 p-3 rounded flex items-center gap-3 border border-zinc-800/40 hover:bg-zinc-900/80 hover:border-zinc-700/50 transition">
                <Syringe className="text-green-500 w-5 h-5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white font-mono uppercase text-base">Usar Item:</strong> Ative e fatigue uma cura ou munição de sua mão para restaurar atributos de vida e barreira tática.
                </span>
              </div>
              
              <div className="bg-zinc-900/55 p-3 rounded flex items-center gap-3 border border-zinc-800/40 hover:bg-zinc-900/80 hover:border-zinc-700/50 transition">
                <Handshake className="text-blue-400 w-5 h-5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white font-mono uppercase text-base">Cooperar:</strong> Repasse diretamente 1 carta de combate da sua própria mão para qualquer parceiro sobrevivente que esteja no jogo.
                </span>
              </div>

              <div className="bg-zinc-900/55 p-3 rounded flex items-center gap-3 border border-zinc-800/40 hover:bg-zinc-900/80 hover:border-zinc-700/50 transition">
                <Package className="text-yellow-600 w-5 h-5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white font-mono uppercase text-base">Gerenciar Baú:</strong> Se possuir a carta do Baú de jogo ativo em sua mesa, deposite ou retire itens de sua estocagem privada de segurança.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Zumbificação */}
        <section className="card-panel p-6 rounded-lg blood-border">
          <h2 className="text-2xl md:text-3xl text-white mb-4 flex items-center gap-3 font-mono">
            <Biohazard className="text-red-500 w-6 h-6" /> 5. Morte e Zumbificação
          </h2>
          <p className="mb-4 text-zinc-300 leading-relaxed text-base md:text-lg">
            Quando sua Vida biológica chega a 0, você cai em campo de combate. Mas o horror está longe de terminar! Suas cartas <strong className="text-white font-semibold">não caem no chão</strong> e continuam retidas em sua mão secreta. No início do seu próximo turno, você se reergue como um impiedoso <strong className="text-red-500 font-bold font-mono text-base">Zumbi Imortal</strong>.
          </p>
          
          <div className="bg-red-950/20 p-5 rounded border border-red-900/30 relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 opacity-5"><Skull className="text-red-500 w-36 h-36" /></div>
            <h3 className="text-red-500 font-bold mb-3 uppercase tracking-wider text-base font-mono flex items-center gap-2">
              <Skull className="w-5 h-5" /> O Turno Hostil do Zumbi
            </h3>
            
            <ol className="list-decimal pl-5 space-y-4 text-base tracking-wide text-zinc-300">
              <li className="leading-relaxed">
                <strong className="text-white">Fase de Saque de Infecção:</strong> Compre 1 carta normal do deck principal.
                <ul className="list-disc pl-5 mt-1.5 text-base text-zinc-400 space-y-1">
                  <li><em className="text-green-400">Recurso/Peça:</em> Guarde secretamente na mão (você acumula itens para que sobreviventes tentem arriscar assaltar).</li>
                  <li><em className="text-red-400">Ameaça:</em> Devolva e embaralhe-a de volta no deck (aumentando a infestação).</li>
                </ul>
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Ação de Ataque Zumbi (Escolha uma):</strong>
                <ul className="list-disc pl-5 mt-1.5 text-base text-zinc-400 space-y-2">
                  <li>
                    <strong className="text-red-400 font-bold">Ataque Simples:</strong> Vá direto para cima e cause <strong className="text-red-500 font-mono font-bold text-base">-1 de dano</strong> a qualquer sobrevivente vivo.
                  </li>
                  <li>
                    <strong className="text-red-400 font-bold">Ataque de Horda Coordenado:</strong> Combine sua investida com outro jogador zumbi. Ambos sacrificam o ataque simples para <strong className="text-yellow-500 font-semibold font-mono text-base">anular a Fase 2 (Gestão)</strong> de um humano sobrevivente no próximo turno.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </section>

        {/* Section 6: Puzzles */}
        <section className="card-panel p-6 rounded-lg blood-border">
          <h2 className="text-2xl md:text-3xl text-white mb-4 flex items-center gap-3 font-mono">
            <Puzzle className="text-red-500 w-6 h-6" /> 6. Os Caminhos da Vitória
          </h2>
          <p className="mb-5 text-base text-zinc-400 leading-relaxed">
            Organizem as cartas e baixem de forma visível na mesa. Formem exatamente um destes três combos lendários para desencadear a evacuação segura:
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-zinc-950/70 p-5 rounded-lg border border-blue-900/30 text-center hover:border-blue-600/30 hover:-translate-y-1 transition duration-300">
              <span className="inline-block p-2.5 rounded-full bg-blue-950/30 border border-blue-800/40 text-blue-500 mb-3">
                <Layers className="w-6 h-6" />
              </span>
              <h4 className="font-bold text-blue-500 text-base mb-1.5 tracking-wider uppercase font-mono">Fuga pelo esgoto</h4>
              <p className="text-base text-zinc-400 leading-relaxed">
                Junte e revele as <strong className="text-blue-500">6 cartas</strong> exclusivas de Plugs de Xadrez (Peão, Cavalo, Torre, Bispo, Rei e Rainha).
              </p>
            </div>

            <div className="bg-zinc-950/70 p-5 rounded-lg border border-green-900/30 text-center hover:border-green-600/30 hover:-translate-y-1 transition duration-300">
              <span className="inline-block p-2.5 rounded-full bg-green-950/30 border border-green-800/40 text-green-500 mb-3">
                <Key className="w-6 h-6" />
              </span>
              <h4 className="font-bold text-green-500 text-base mb-1.5 tracking-wider uppercase font-mono">Fuga da Delegacia</h4>
              <p className="text-base text-zinc-400 leading-relaxed">
                Reúna em jogo as <strong className="text-green-500">4 Chaves do R.P.D.</strong> (Paus, Copas, Ouros, Espadas) + <strong className="text-green-500">2 Engrenagens</strong> da Torre de Relógio.
              </p>
            </div>

            <div className="bg-zinc-950/70 p-5 rounded-lg border border-red-900/30 text-center hover:border-red-600/30 hover:-translate-y-1 transition duration-300">
              <span className="inline-block p-2.5 rounded-full bg-red-950/30 border border-red-800/40 text-red-500 mb-3">
                <Medal className="w-6 h-6" />
              </span>
              <h4 className="font-bold text-red-500 text-base mb-1.5 tracking-wider uppercase font-mono">Portal do Medalhão</h4>
              <p className="text-base text-zinc-400 leading-relaxed">
                Junte <strong className="text-white">3 Medalhões Básicos</strong> + as <strong className="text-red-500">3 peças secretas exclusivas</strong> coletadas obrigatoriamente derrotando o perigoso Super Tirano ou G Fase 5.
              </p>
            </div>
          </div>
        </section>

        {/* Footer bottom decorative signoff */}
        <div className="text-center mt-12 pb-8">
          <p className="text-red-600 font-mono tracking-[0.25em] opacity-40 text-base md:text-lg">
            // GOOD LUCK, SURVIVORS //
          </p>
          <p className="text-zinc-600 text-base font-mono mt-2 uppercase tracking-widest">
            Raccoon City Incident Survivor Kit &copy; 2026 // Umbrella Corporation
          </p>
        </div>

      </main>
    </div>
  );
}
