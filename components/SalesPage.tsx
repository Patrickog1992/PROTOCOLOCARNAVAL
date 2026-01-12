import React, { useState, useEffect } from 'react';
import { QuizState } from '../types';
import { Button } from './Button';
import { Check, ChevronDown, ChevronUp, Lock, ShieldCheck, Trophy, Clock, Battery, Zap, AlertTriangle, Star, Loader, Mail, Smartphone, ShoppingBag } from 'lucide-react';
import { generateIllustration } from '../services/geminiService';

interface SalesPageProps {
  quizData: QuizState;
}

const PhoneCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const items = [
    { 
        title: "Treinos guiados para fazer em casa", 
        desc: "Exercícios simples, sem aparelhos, adaptados para iniciantes.", 
        prompt: "A fit woman exercising in a modern cozy living room in Brazil, following a workout on tv, pixar style, no equipment, text in Portuguese" 
    },
    { 
        title: "Sequência estratégica de exercícios", 
        desc: "Um passo a passo organizado para ativar a queima de gordura.", 
        prompt: "A 3d rendered glowing path or roadmap of fitness exercises, strategy game style, pixar style, text labels in Portuguese language" 
    },
    { 
        title: "Rotina curta e possível", 
        desc: "Sessões rápidas que cabem na sua rotina, mesmo com pouco tempo.", 
        prompt: "A 3d clock showing 15 minutes, fast speed, fire energy, efficiency, pixar style, text in Portuguese" 
    },
    { 
        title: "Protocolo focado em barriga, pernas e glúteos", 
        desc: "Movimentos específicos para acelerar a perda de medidas.", 
        prompt: "A 3d fitness female character checking progress on abs and legs, happy, pixar style, portuguese text" 
    },
    { 
        title: "Ativação metabólica em casa", 
        desc: "Estímulos que fazem seu corpo gastar mais energia ao longo do dia.", 
        prompt: "A human silhouette with glowing fire energy inside chest and belly, metabolism boost, 3d render pixar style" 
    },
    { 
        title: "Progressão simples e segura", 
        desc: "Você começa no seu ritmo e evolui aos poucos, sem risco.", 
        prompt: "A 3d chart with steps going up, safety gear, success trophy at top, pixar style, text in Portuguese" 
    },
    { 
        title: "Plano de organização semanal", 
        desc: "Orientação clara de quantos dias treinar na semana.", 
        prompt: "A 3d weekly planner calendar with green checkmarks, organized, coffee cup, pixar style, title text 'SEMANA' in Portuguese" 
    },
    { 
        title: "Acesso imediato", 
        desc: "Você começa no mesmo dia, sem precisar esperar.", 
        prompt: "A 3d smartphone screen unlocking, bright light, open door, digital access, pixar style, text 'ACESSO' in Portuguese" 
    }
  ];

  // Initialize images array and fetch all in parallel on mount
  useEffect(() => {
    setImages(new Array(items.length).fill(null));

    items.forEach((item, index) => {
        generateIllustration(item.prompt).then(img => {
            if (img) {
                setImages(prev => {
                    const newImages = [...prev];
                    newImages[index] = img;
                    return newImages;
                });
            }
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % items.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[320px] shadow-xl">
        <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-[292px] h-[572px] bg-gradient-to-br from-carnival-purple to-indigo-900 relative flex flex-col">
            
            {/* Image Section */}
            <div className="flex-1 relative overflow-hidden bg-black/20">
                {images[activeIndex] ? (
                    <img 
                        src={images[activeIndex]} 
                        alt={items[activeIndex].title} 
                        className="w-full h-full object-cover transition-opacity duration-500 animate-fadeIn"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/10">
                        <Loader className="w-8 h-8 text-white animate-spin" />
                    </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-transparent to-transparent"></div>
            </div>

            {/* Text Section */}
            <div className="p-6 text-center text-white pb-12 bg-indigo-900">
                <h3 className="text-xl font-bold mb-3 leading-tight">{items[activeIndex].title}</h3>
                <p className="text-sm opacity-90">{items[activeIndex].desc}</p>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {items.map((_, idx) => (
                    <div key={idx} className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-white w-4' : 'bg-white/30'}`} />
                ))}
            </div>
        </div>
    </div>
  );
};

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const testimonials = [
    { 
      img: "https://i.imgur.com/S5Aj7OJ.jpg",
      name: "Fernanda L.", 
      text: "Eu já tinha tentado de tudo, chá, dieta da lua, academia... nada funcionava. Com o protocolo, em 3 semanas minha barriga secou de um jeito que eu nem acreditava ser possível. O melhor é não precisar sair de casa!", 
      likes: 342 
    },
    { 
      img: "https://i.imgur.com/noSDgeA.jpg",
      name: "Roberta M.", 
      text: "Achei que por ser em casa não daria resultado, mas me enganei feio! Os treinos são intensos e focados. Minhas pernas definiram e a celulite diminuiu muito. Estou muito feliz e pronta para curtir o carnaval sem canga!", 
      likes: 289 
    },
    { 
      img: "https://i.imgur.com/h66YNn9.jpg",
      name: "Patrícia D.", 
      text: "Depois dos 40 meu metabolismo travou. Esse desafio foi a única coisa que destravou meu corpo. Perdi 6kg em um mês e recuperei a energia que eu tinha aos 20 anos. Recomendo para todas as minhas amigas!", 
      likes: 415 
    },
    { 
      img: "https://i.imgur.com/AJCfcXk.jpg",
      name: "Amanda S.", 
      text: "O suporte e o material são incríveis. Segui o passo a passo da alimentação e os treinos de 15 minutos. Resultado: menos 5kg na balança e cintura fina. Vale cada centavo, comprem sem medo!", 
      likes: 198 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-2xl bg-white border border-gray-100">
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full" 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {testimonials.map((t, idx) => (
          <div key={idx} className="min-w-full flex flex-col">
            <img src={t.img} alt={t.name} className="w-full h-auto object-contain bg-gray-100" />
            <div className="p-6 bg-white">
               <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center">
                    <div className="w-10 h-10 bg-carnival-orange/10 text-carnival-orange rounded-full flex items-center justify-center font-bold mr-3 text-lg border border-carnival-orange/20">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight">{t.name}</h4>
                      <div className="flex text-yellow-400">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                 </div>
                 <div className="text-gray-400 text-xs flex items-center font-medium bg-gray-50 px-2 py-1 rounded-full">
                   <span className="mr-1">👍</span> {t.likes}
                 </div>
               </div>
               <div className="relative">
                 <span className="absolute -top-2 -left-1 text-4xl text-gray-200 font-serif">"</span>
                 <p className="text-gray-600 text-sm leading-relaxed italic relative z-10 pl-4">
                   {t.text}
                 </p>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dots */}
      <div className="absolute top-4 right-4 flex space-x-1.5 z-10 bg-black/20 p-1.5 rounded-full backdrop-blur-sm">
        {testimonials.map((_, idx) => (
          <button 
            key={idx} 
            className={`w-2 h-2 rounded-full transition-all shadow-sm ${idx === current ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`} 
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export const SalesPage: React.FC<SalesPageProps> = ({ quizData }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  
  // Notification State
  const [notification, setNotification] = useState({ name: '', city: '', visible: false });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fake purchase notifications logic
  useEffect(() => {
    const buyers = [
      { name: 'Ana P.', city: 'São Paulo, SP' },
      { name: 'Juliana M.', city: 'Rio de Janeiro, RJ' },
      { name: 'Carla S.', city: 'Belo Horizonte, MG' },
      { name: 'Mariana R.', city: 'Salvador, BA' },
      { name: 'Bruna O.', city: 'Curitiba, PR' },
      { name: 'Patricia L.', city: 'Porto Alegre, RS' },
      { name: 'Fernanda C.', city: 'Recife, PE' },
      { name: 'Beatriz S.', city: 'Brasília, DF' }
    ];

    const showNotification = () => {
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      setNotification({ ...randomBuyer, visible: true });
      
      // Hide after 5 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, 5000);
    };

    // Initial delay of 5 seconds, then show every 15-25 seconds
    const initialTimeout = setTimeout(() => {
      showNotification();
      const interval = setInterval(showNotification, 20000);
      return () => clearInterval(interval);
    }, 5000);

    return () => clearTimeout(initialTimeout);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // Button style for Sales Page - Green Pulsating
  const btnStyle = "!bg-green-600 !bg-none hover:!bg-green-700 text-white animate-pulse shadow-lg shadow-green-500/50 border-none";

  const selectedKeys = [
    { label: "Objetivo", value: quizData.goal },
    { label: "Obstáculo", value: quizData.obstacle },
    { label: "Tempo Disponível", value: quizData.time },
    { label: "Área de Foco", value: quizData.focusAreas[0] || "Corpo Todo" },
    { label: "Experiência", value: quizData.experience },
  ];

  return (
    <div className="bg-white text-gray-900 font-poppins overflow-x-hidden relative">
      
      {/* Social Proof Popup - Top Right */}
      <div 
        className={`fixed top-14 right-2 z-[60] transition-all duration-500 transform ${
          notification.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-md p-2 border-l-2 border-green-500 flex items-center gap-2 w-48 max-w-[90vw]">
          <div className="bg-green-100 rounded-full p-1.5 flex-shrink-0">
             <ShoppingBag className="w-3 h-3 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold truncate text-gray-800 leading-tight">{notification.name}</p>
            <p className="text-[9px] text-gray-500 truncate leading-tight">de {notification.city}</p>
            <p className="text-[9px] font-bold text-green-600 mt-0.5 leading-tight">comprou o PROTOCOLO</p>
          </div>
        </div>
      </div>

      {/* Sticky Countdown Banner */}
      <div className="bg-red-600 text-white text-center py-3 font-bold sticky top-0 z-50 shadow-md">
        Você ganhou 60% DESCONTO ativo por : <span className="text-yellow-300 text-xl font-mono ml-1">{formatTime(timeLeft)}</span>
      </div>

      {/* Header Section */}
      <div className="bg-carnival-dark text-white py-12 px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Daqui 1 mês você vai agradecer por ter começado HOJE...
        </h1>
        <p className="text-lg text-gray-300">
          De acordo com suas respostas esses poderão ser seus resultados...
        </p>
        <div className="mt-6 inline-block bg-green-500 text-black px-4 py-1 rounded-full text-sm font-bold animate-pulse">
          Análise do seu Perfil: 100% Concluída
        </div>
      </div>

      {/* Before / After Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-100">
            <h3 className="text-xl font-bold text-red-600 mb-4 text-center">AGORA</h3>
            <img src="https://i.imgur.com/V6997ol.png" alt="Antes" className="w-full h-auto rounded-lg mb-4 shadow-md" />
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start"><span className="mr-2">❌</span> Cansada de tentar emagrecer e sempre fracassar</li>
              <li className="flex items-start"><span className="mr-2">❌</span> Desanimada com o espelho e sem confiança no próprio corpo</li>
              <li className="flex items-start"><span className="mr-2">❌</span> Sem energia, inchada e achando que o problema era você</li>
              <li className="flex items-start"><span className="mr-2">❌</span> Com medo de chegar no Carnaval do mesmo jeito de sempre</li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-100">
            <h3 className="text-xl font-bold text-green-600 mb-4 text-center">DEPOIS DO PROTOCOLO CARNAVAL NO SHAPE</h3>
            <img src="https://i.imgur.com/kkc70lF.png" alt="Depois" className="w-full h-auto rounded-lg mb-4 shadow-md" />
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start"><span className="mr-2">✅</span> Corpo mais leve, menos inchaço e mais disposição</li>
              <li className="flex items-start"><span className="mr-2">✅</span> Confiança renovada e orgulho ao se olhar no espelho</li>
              <li className="flex items-start"><span className="mr-2">✅</span> Seguindo um plano simples que finalmente funciona</li>
              <li className="flex items-start"><span className="mr-2">✅</span> Curtindo o Carnaval se sentindo bem com o próprio corpo</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Descobrimos o verdadeiro motivo do seu corpo não emagrecer.</h2>
          <p className="text-lg mb-4">Não é falta de esforço, nem genética.</p>
          <p className="text-lg mb-4 font-semibold text-carnival-orange">Seu corpo está funcionando em modo de economia, bloqueando a queima de gordura.</p>
          <p className="text-gray-600">Com o Protocolo Carnaval no Shape, é possível reverter isso de forma simples e natural mesmo em CASA</p>
        </div>
      </div>

      {/* Personalized Protocol Section */}
      <div className="bg-gray-100 py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8 uppercase text-carnival-purple">SEU PROTOCOLO PERSONALIZADO CARNAVAL NO SHAPE</h2>
          
          <div className="grid gap-6">
            {selectedKeys.map((item, idx) => (
              <div key={idx} className="border-b pb-4 last:border-0">
                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">{item.label}</span>
                <p className="text-lg font-medium mt-1">{item.value}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Consideramos sua escolha de "{item.value}" para adaptar a intensidade e o foco dos exercícios, garantindo máxima eficiência.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t-2 border-gray-100">
            <h3 className="text-xl font-bold mb-4">Resultado da sua Avaliação:</h3>
            <p className="mb-6">Sua análise identificou 3 travas ocultas comuns em pessoas que tentam emagrecer, mas não veem resultado.</p>
            <p className="mb-6 font-semibold">Veja o que o seu perfil revelou:</p>

            <div className="space-y-4">
               <div className="flex items-start bg-yellow-50 p-4 rounded-lg">
                 <AlertTriangle className="text-yellow-600 w-6 h-6 mr-3 flex-shrink-0" />
                 <p className="text-sm font-medium">Acúmulo de gordura na região da barriga</p>
               </div>
               <div className="flex items-start bg-yellow-50 p-4 rounded-lg">
                 <AlertTriangle className="text-yellow-600 w-6 h-6 mr-3 flex-shrink-0" />
                 <p className="text-sm font-medium">Perda de firmeza muscular (corpo sem definição)</p>
               </div>
               <div className="flex items-start bg-yellow-50 p-4 rounded-lg">
                 <AlertTriangle className="text-yellow-600 w-6 h-6 mr-3 flex-shrink-0" />
                 <p className="text-sm font-medium">Metabolismo desacelerado, com dificuldade de queimar gordura</p>
               </div>
               <div className="flex items-start bg-yellow-50 p-4 rounded-lg">
                 <AlertTriangle className="text-yellow-600 w-6 h-6 mr-3 flex-shrink-0" />
                 <p className="text-sm font-medium">Sensação constante de roupas apertadas na cintura</p>
               </div>
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                 👨‍⚕️ O Diagnóstico:
              </h4>
              <p className="text-sm text-blue-900 mb-4">
                Isso não acontece porque você come demais ou não se esforça.
                O que está acontecendo é que seu corpo entrou em um modo de proteção, onde ele prioriza armazenar energia ao invés de gastar.
              </p>
              <p className="text-sm text-blue-900 mb-4 font-bold">
                A boa notícia é que isso pode ser revertido.
              </p>
              <p className="text-sm text-blue-900">
                O Protocolo Carnaval no Shape foi criado exatamente para reativar a queima natural do seu corpo, usando estímulos simples que funcionam mesmo para quem treina em casa e tem pouco tempo.
              </p>
            </div>

            <p className="mt-6 text-center text-sm font-semibold text-green-600">
              ⚡ Pessoas com esse perfil costumam ver as primeiras mudanças nas primeiras semanas, quando aplicam o protocolo corretamente.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <h3 className="text-center font-bold text-3xl mb-2">O que nossas alunas dizem...</h3>
        <p className="text-center text-gray-500 mb-10 max-w-md mx-auto">Resultados reais de pessoas que decidiram mudar de vida</p>
        <div className="px-4">
          <TestimonialCarousel />
        </div>
      </div>

      {/* Benefits */}
      <div className="py-12 px-6 max-w-4xl mx-auto">
         <h2 className="text-3xl font-bold text-center mb-10">O que vai acontecer com o seu corpo até o Carnaval</h2>
         <p className="text-center text-gray-600 mb-10">Além de destravar a queima de gordura, o Protocolo Carnaval no Shape atua diretamente no funcionamento do seu corpo, gerando mudanças visíveis e perceptíveis no dia a dia:</p>

         <div className="space-y-6">
           {[
             { title: "Redução da barriga e da “pochete”", desc: "Ataca o acúmulo de gordura na região abdominal que dietas e caminhadas comuns não conseguem eliminar." },
             { title: "Fim do corpo mole e flacidez", desc: "Estimula a firmeza muscular, deixando braços, pernas e glúteos mais definidos e durinhos." },
             { title: "Corpo mais alinhado e postura melhor", desc: "Fortalece o centro do corpo, ajudando a reduzir dores nas costas e desconfortos causados pelo sedentarismo." },
             { title: "Metabolismo mais rápido e ativo", desc: "Seu corpo passa a gastar mais energia ao longo do dia, inclusive em repouso." },
             { title: "Mais energia e disposição diária", desc: "Aumento natural da disposição, com menos cansaço, preguiça e sensação de peso no corpo." },
             { title: "Roupas vestindo melhor", desc: "Redução visível de medidas na cintura e quadril, fazendo as roupas voltarem a cair bem." }
           ].map((benefit, i) => (
             <div key={i} className="flex">
               <div className="mr-4 mt-1">
                 <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✔</div>
               </div>
               <div>
                 <h4 className="font-bold text-lg">{benefit.title}</h4>
                 <p className="text-gray-600 text-sm">{benefit.desc}</p>
               </div>
             </div>
           ))}
         </div>
      </div>

      {/* Bonuses */}
      <div className="bg-carnival-dark text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">🎁 Ganhe 5 bônus exclusivos que aceleram sua evolução</h2>
            <p className="text-yellow-400 font-bold bg-yellow-400/10 inline-block px-4 py-1 rounded">⚠️ Disponível apenas para as últimas 4 vagas</p>
          </div>

          <div className="space-y-8">
            {[
              { title: "BÔNUS 1 — Guia Secagem Rápida da Barriga", desc: "Passo a passo simples com ajustes práticos que ajudam a reduzir o inchaço e acelerar a perda de medidas na cintura.", val: "R$97" },
              { title: "BÔNUS 2 — Treino Express 15 Minutos em Casa", desc: "Sequência rápida para os dias corridos, mantendo a queima de gordura mesmo quando o tempo é curto.", val: "R$67" },
              { title: "BÔNUS 3 — Protocolo Anti-Flacidez", desc: "Exercícios focados em braços, pernas e glúteos para deixar o corpo mais firme e definido sem equipamentos.", val: "R$97" },
              { title: "BÔNUS 4 — Checklist Corpo no Shape até o Carnaval", desc: "Um plano visual simples para organizar sua semana, acompanhar sua evolução e não perder a consistência.", val: "R$47" },
              { title: "BÔNUS 5 — Ritual Matinal Ativa Metabolismo", desc: "Rotina rápida para começar o dia com mais energia e estimular a queima de gordura desde cedo.", val: "R$67" },
            ].map((bonus, i) => (
              <div key={i} className="bg-white/10 p-6 rounded-xl border border-white/20">
                <h3 className="font-bold text-xl text-yellow-400 mb-2">🎁 {bonus.title}</h3>
                <p className="text-gray-300 mb-2">{bonus.desc}</p>
                <p className="font-bold text-sm">Valor: {bonus.val}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <h3 className="text-2xl font-bold mb-2">💰 Valor total dos bônus: <span className="line-through text-gray-400">R$375</span></h3>
            <p className="text-xl">🔥 Levando agora o Protocolo CARNAVAL NO SHAPE, você recebe todos esses bônus 100% GRÁTIS.</p>
          </div>
        </div>
      </div>

      {/* Phone Mockup Carousel Section */}
      <div className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 px-4">O que você vai receber no Protocolo CARNAVAL NO SHAPE</h2>
        <PhoneCarousel />
        <div className="text-center mt-8 mb-16">
            <p className="text-gray-500 font-semibold">(treinando em casa, sem equipamentos)</p>
        </div>

        {/* New "How it works" Section */}
        <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-center mb-12">Veja como é fácil começar agora:</h3>
            <div className="grid md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                    <span className="absolute -top-4 -right-4 text-9xl font-black text-gray-50 opacity-50 group-hover:text-green-50 transition-colors">1</span>
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-xl mb-3 relative z-10">Inscrição Segura</h4>
                    <p className="text-gray-600 text-sm relative z-10">Preencha seus dados no formulário seguro abaixo. Seus dados estão 100% criptografados e protegidos.</p>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                    <span className="absolute -top-4 -right-4 text-9xl font-black text-gray-50 opacity-50 group-hover:text-green-50 transition-colors">2</span>
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                        <Mail className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-xl mb-3 relative z-10">Acesso Imediato</h4>
                    <p className="text-gray-600 text-sm relative z-10">Você recebe um e-mail e WhatsApp com seu acesso exclusivo no mesmo minuto.</p>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                    <span className="absolute -top-4 -right-4 text-9xl font-black text-gray-50 opacity-50 group-hover:text-green-50 transition-colors">3</span>
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                        <Smartphone className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-xl mb-3 relative z-10">Baixe no Celular</h4>
                    <p className="text-gray-600 text-sm relative z-10">Abra o aplicativo, dê o play na primeira aula e comece a transformar seu corpo hoje mesmo.</p>
                </div>
            </div>
        </div>
      </div>

      {/* Pricing / Offer */}
      <div className="bg-green-900 text-white py-16 px-6 text-center">
         <h2 className="text-4xl font-extrabold mb-4">SOMENTE HOJE</h2>
         <p className="text-xl mb-6">POR APENAS</p>
         <div className="text-6xl font-extrabold text-green-400 mb-8">R$ 37,00</div>
         
         <Button className={`w-full max-w-md mx-auto text-xl py-6 ${btnStyle}`}>
            QUERO MEU PROTOCOLO AGORA
         </Button>
      </div>

      {/* Guarantee */}
      <div className="py-12 px-6 max-w-3xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
           <ShieldCheck className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">✅ GARANTIA TOTAL DE 30 DIAS</h2>
        <p className="text-gray-600 mb-4">
          Você tem 7 dias completos para colocar o Protocolo CARNAVAL NO SHAPE em prática no conforto da sua casa.
          Se, por qualquer motivo, você não sentir seu corpo mais leve, mais disposto ou não acreditar que esse protocolo é pra você, é só enviar uma mensagem por e-mail ou WhatsApp.
        </p>
        <p className="font-bold text-lg mb-4">💰 Devolvemos 100% do seu dinheiro.</p>
        <p className="text-gray-600 mb-6">Sem riscos, sem burocracia, sem perguntas e sem letras miúdas.</p>
        <div className="bg-gray-100 p-4 rounded-xl mb-8">
          <p className="font-bold">🎯 É simples:</p>
          <p>Ou você começa a sentir seu corpo destravar e entrar no ritmo certo até o Carnaval, ou não paga absolutamente nada.</p>
        </div>
        <Button fullWidth className={btnStyle}>QUERO AGORA</Button>
      </div>

      {/* Comparison */}
      <div className="py-12 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-8">Compare os Custos de Emagrecer</h2>
        <div className="max-w-2xl mx-auto space-y-4">
           {[
             { name: "Ozempic (1 mês)", price: "R$3.000", red: true },
             { name: "Nutri particular", price: "R$400/Consulta", red: true },
             { name: "Academia + Personal", price: "R$600/mês", red: true },
             { name: "Cirurgia Bariatrica", price: "R$20.000 a R$50.000", red: true },
           ].map((item, i) => (
             <div key={i} className="flex justify-between items-center p-4 bg-white rounded shadow text-gray-500 line-through">
               <span>{item.name}</span>
               <span>{item.price}</span>
             </div>
           ))}
           <div className="flex justify-between items-center p-6 bg-green-600 text-white rounded-xl shadow-xl transform scale-105 font-bold">
              <span>✅ PROTOCOLO CARNAVAL NO SHAPE</span>
              <span>Só R$37 <br/><span className="text-xs font-normal">(com garantia de 30 dias!)</span></span>
           </div>
        </div>
      </div>

      {/* Two Choices */}
      <div className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Agora você tem 2 escolhas…</h2>
        
        <div className="space-y-6">
          <div className="p-6 border-l-4 border-red-500 bg-red-50 rounded-r-xl">
             <h3 className="font-bold text-red-700 mb-2">🔸 1. Continuar brigando com a balança</h3>
             <p className="text-gray-700">Tentando dietas restritivas, começando e parando exercícios, se frustrando com o espelho e chegando no Carnaval do mesmo jeito de sempre.</p>
          </div>
          
          <div className="p-6 border-l-4 border-green-500 bg-green-50 rounded-r-xl">
             <h3 className="font-bold text-green-700 mb-2">🔹 2. Começar hoje com o Protocolo CARNAVAL NO SHAPE</h3>
             <p className="text-gray-700">Seguindo um plano simples de exercícios em casa, sem equipamentos, que ativa a queima de gordura, reduz medidas e ajuda você a se sentir mais confiante até o Carnaval — mesmo com pouco tempo no dia a dia.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button fullWidth className={btnStyle}>QUERO MINHA VAGA</Button>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-12 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">FAÇA UM FAQ</h2> {/* Kept exact text as requested, though usually implies content generation */}
        
        <div className="space-y-4">
          {[
            { q: "Tenho acesso por quanto tempo?", a: "O acesso é vitalício, você pode usar quando quiser." },
            { q: "Preciso de equipamentos?", a: "Não! Todos os exercícios são feitos usando apenas o peso do corpo." },
            { q: "Serve para iniciantes?", a: "Sim, o protocolo foi desenhado para quem está começando ou parado há muito tempo." },
            { q: "E se eu não gostar?", a: "Você tem 30 dias de garantia incondicional. Devolvemos 100% do seu dinheiro." }
          ].map((faq, idx) => (
             <div key={idx} className="border rounded-xl overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 font-semibold text-left"
                >
                  {faq.q}
                  {openFaq === idx ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
                </button>
                {openFaq === idx && (
                  <div className="p-4 bg-white text-gray-600 text-sm">
                    {faq.a}
                  </div>
                )}
             </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
           <Button className={`text-xl py-6 px-12 ${btnStyle}`}>COMEÇAR AGORA</Button>
        </div>
      </div>

    </div>
  );
};