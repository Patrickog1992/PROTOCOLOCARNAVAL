import React, { useState } from 'react';
import { QuizState } from '../types';
import { Button } from './Button';
import { Check, AlertTriangle, ArrowRight, Star } from 'lucide-react';

interface QuizProps {
  onComplete: (data: QuizState) => void;
}

const steps = [
  'gender', 'age', 'goal', 'obstacle', 'experience', 'motivation', 
  'time', 'environment', 'frequency', 'weightGoal', 'currentWeight', 
  'height', 'socialProof1', 'injury', 'visualization', 'format', 'focusAreas', 'commitment'
];

const GENDER_IMAGES = {
  male: "https://bemestarfit.netlify.app/_next/image?url=https%3A%2F%2Fv3.certifiedfasting.com%2Fpt-pt%2Fg-22m-eur%2Fimg%2FGPITINsBsO-734.webp&w=640&q=75",
  female: "https://bemestarfit.netlify.app/_next/image?url=https%3A%2F%2Fv3.certifiedfasting.com%2Fpt-pt%2Fg-22m-eur%2Fimg%2FOGiWGtJUtj-734.webp&w=640&q=75"
};

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizState>>({
    focusAreas: []
  });
  const [imcData, setImcData] = useState<{value: string, show: boolean}>({ value: '', show: false });

  const handleAnswer = (key: keyof QuizState, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    nextStep();
  };

  const handleMultiSelect = (key: keyof QuizState, value: string) => {
    const currentList = (answers[key] as string[]) || [];
    let newList;
    if (currentList.includes(value)) {
      newList = currentList.filter(i => i !== value);
    } else {
      newList = [...currentList, value];
    }
    setAnswers(prev => ({ ...prev, [key]: newList }));
  };

  const handleInput = (key: keyof QuizState, value: string) => {
     setAnswers(prev => ({ ...prev, [key]: value }));
     
     if (key === 'height' && answers.currentWeight) {
        const weight = parseFloat(answers.currentWeight.replace(',', '.').replace(/[^\d.]/g, ''));
        const height = parseFloat(value.replace(',', '.').replace(/[^\d.]/g, ''));
        
        if (weight > 0 && height > 0) {
            // Adjust height if entered in cm (e.g., 170 instead of 1.70)
            const h = height > 3 ? height / 100 : height;
            const imc = weight / (h * h);
            setImcData({
                value: imc.toFixed(1),
                show: true
            });
        } else {
            setImcData({ value: '', show: false });
        }
     }
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete(answers as QuizState);
    }
  };

  const currentStep = steps[currentStepIndex];

  // Render helpers
  const renderOption = (label: string, icon?: React.ReactNode, description?: string) => {
    return (
        <Button 
          variant="ghost" 
          fullWidth 
          onClick={() => handleAnswer(currentStep as keyof QuizState, label)}
          className="mb-3 text-left justify-start h-auto py-5 border border-gray-100 hover:border-carnival-orange/30 group"
        >
          <div className="flex flex-col items-start text-left w-full">
            {icon && <span className="text-2xl mb-2 text-carnival-orange group-hover:scale-110 transition-transform">{icon}</span>}
            <span className="text-lg font-semibold">{label}</span>
            {description && <span className="text-sm font-light text-gray-500 mt-1">{description}</span>}
          </div>
        </Button>
      );
  };

  const renderMultiSelectOption = (label: string) => {
    const isSelected = (answers.focusAreas || []).includes(label);
    return (
      <button
        onClick={() => handleMultiSelect('focusAreas', label)}
        className={`w-full p-4 mb-3 rounded-xl border-2 flex items-center justify-between transition-all ${
          isSelected 
            ? 'border-carnival-orange bg-orange-50 text-carnival-orange font-bold' 
            : 'border-gray-100 bg-gray-50 text-gray-600'
        }`}
      >
        <span>{label}</span>
        {isSelected && <Check className="w-5 h-5" />}
      </button>
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 min-h-screen flex flex-col justify-center">
      
      {/* Logo Image - Above progress bar */}
      {currentStep !== 'commitment' && (
        <div className="flex justify-center mb-6">
            <img 
                src="https://i.imgur.com/99UVGNP.jpeg" 
                alt="Logo" 
                className="w-[80px] h-[80px] object-contain rounded-full shadow-md"
            />
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div 
          className="bg-carnival-orange h-2 rounded-full transition-all duration-300" 
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Steps */}
      <div className="animate-fadeIn">
        
        {currentStep === 'gender' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Qual é o seu gênero?</h2>
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => handleAnswer('gender', 'HOMEM')}
                className="cursor-pointer group"
              >
                <div className="rounded-2xl overflow-hidden mb-3 border-4 border-transparent group-hover:border-carnival-orange transition-all relative aspect-[3/4]">
                   <img src={GENDER_IMAGES.male} alt="Homem" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                </div>
                <p className="text-center font-bold text-lg group-hover:text-carnival-orange">HOMEM</p>
              </div>
              <div 
                onClick={() => handleAnswer('gender', 'MULHER')}
                className="cursor-pointer group"
              >
                <div className="rounded-2xl overflow-hidden mb-3 border-4 border-transparent group-hover:border-carnival-orange transition-all relative aspect-[3/4]">
                   <img src={GENDER_IMAGES.female} alt="Mulher" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                </div>
                <p className="text-center font-bold text-lg group-hover:text-carnival-orange">MULHER</p>
              </div>
            </div>
          </>
        )}

        {currentStep === 'age' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Qual é a sua idade?</h2>
            {renderOption('18 - 29 anos')}
            {renderOption('30 - 39 anos')}
            {renderOption('40 - 49 anos')}
            {renderOption('50+ anos')}
          </>
        )}

        {currentStep === 'goal' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Qual é o seu principal objetivo até o Carnaval?</h2>
            {renderOption('Secar e Definir', '🔥', 'Quero perder gordura e mostrar os músculos')}
            {renderOption('Perder Peso Urgente', '⚖️', 'Preciso reduzir medidas o mais rápido possível')}
            {renderOption('Ganhar Massa Magra', '💪', 'Quero ficar mais forte e com corpo torneado')}
            {renderOption('Melhorar Condicionamento', '🏃', 'Quero ter mais fôlego e energia')}
          </>
        )}

        {currentStep === 'obstacle' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">O que mais te atrapalha hoje?</h2>
            {renderOption('Falta de Tempo', '⏰')}
            {renderOption('Preguiça / Falta de Ânimo', '😴')}
            {renderOption('Ansiedade e Compulsão', '🍔')}
            {renderOption('Metabolismo Lento', '🐢')}
            {renderOption('Não sei por onde começar', '🤷')}
          </>
        )}

        {currentStep === 'experience' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Qual sua experiência com treinos?</h2>
            {renderOption('Sedentário(a)', '🛋️', 'Não treino há meses ou anos')}
            {renderOption('Iniciante', '🚶', 'Treino de vez em quando, sem regularidade')}
            {renderOption('Intermediário', '🏃', 'Treino de 2 a 3 vezes por semana')}
            {renderOption('Avançado', '🏋️', 'Treino firme quase todos os dias')}
          </>
        )}

        {currentStep === 'motivation' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">O que te motivou a começar agora?</h2>
            {renderOption('Quero me sentir bem no biquíni/sunga', '👙')}
            {renderOption('Saúde e disposição', '❤️')}
            {renderOption('Autoestima e confiança', '✨')}
            {renderOption('Um evento específico (Carnaval)', '🎉')}
          </>
        )}

        {currentStep === 'time' && (
          <>
             <h2 className="text-2xl font-bold mb-6 text-center">Quanto tempo você tem por dia?</h2>
             {renderOption('15-20 minutos', '⚡', 'Treinos expressos e intensos')}
             {renderOption('30-45 minutos', '⏱️', 'O ideal para resultados consistentes')}
             {renderOption('Mais de 1 hora', '🕰️', 'Tenho tempo de sobra')}
          </>
        )}

        {currentStep === 'environment' && (
          <>
             <h2 className="text-2xl font-bold mb-6 text-center">Onde você prefere treinar?</h2>
             {renderOption('Em Casa', '🏠', 'Conforto e praticidade')}
             {renderOption('Na Academia', '🏋️', 'Gosto dos equipamentos')}
             {renderOption('Ao Ar Livre', '🌳', 'Parques e praças')}
          </>
        )}

        {currentStep === 'frequency' && (
          <>
             <h2 className="text-2xl font-bold mb-6 text-center">Quantas vezes na semana pode treinar?</h2>
             {renderOption('1 a 2 vezes', '📅')}
             {renderOption('3 a 4 vezes', '📅')}
             {renderOption('5 vezes ou mais', '🔥')}
          </>
        )}

        {currentStep === 'weightGoal' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Quanto peso você quer perder?</h2>
            {renderOption('2kg a 5kg', '💧')}
            {renderOption('5kg a 10kg', '⚖️')}
            {renderOption('Mais de 10kg', '🚀')}
            {renderOption('Não quero perder peso, só definir', '💪')}
          </>
        )}

        {currentStep === 'currentWeight' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Qual seu peso atual (kg)?</h2>
            <div className="relative">
              <input 
                type="number" 
                placeholder="Ex: 70.5" 
                className="w-full p-4 text-2xl text-center border-2 border-gray-200 rounded-xl focus:border-carnival-orange focus:outline-none"
                onChange={(e) => setAnswers({...answers, currentWeight: e.target.value})}
                autoFocus
              />
              <span className="absolute right-8 top-5 text-gray-400 font-bold">kg</span>
            </div>
            <Button 
              className="mt-6" 
              fullWidth 
              onClick={() => answers.currentWeight && nextStep()}
              disabled={!answers.currentWeight}
            >
              PRÓXIMO
            </Button>
          </>
        )}

        {currentStep === 'height' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Qual sua altura?</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ex: 1.65" 
                className="w-full p-4 text-2xl text-center border-2 border-gray-200 rounded-xl focus:border-carnival-orange focus:outline-none"
                onChange={(e) => handleInput('height', e.target.value)}
                autoFocus
              />
              <span className="absolute right-8 top-5 text-gray-400 font-bold">m</span>
            </div>
            
            {imcData.show && (
                <div className="mt-6 bg-blue-50 p-4 rounded-xl text-center">
                    <p className="text-gray-600 mb-1">Seu IMC calculado:</p>
                    <p className="text-3xl font-bold text-blue-600">{imcData.value}</p>
                    <p className="text-xs text-gray-500 mt-2">Baseado no peso e altura informados.</p>
                </div>
            )}

            <Button 
              className="mt-6" 
              fullWidth 
              onClick={() => answers.height && nextStep()}
              disabled={!answers.height}
            >
              PRÓXIMO
            </Button>
          </>
        )}

        {currentStep === 'socialProof1' && (
            <div className="text-center">
                <div className="mb-6 flex justify-center">
                    <div className="bg-yellow-100 p-4 rounded-full">
                        <Star className="w-12 h-12 text-yellow-500 fill-yellow-500" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Ótimo! Já entendemos seu perfil.</h2>
                <p className="text-gray-600 mb-8">
                    Milhares de pessoas com o perfil parecido com o seu já conseguiram resultados incríveis nas primeiras 2 semanas.
                </p>
                <div className="bg-white border border-gray-100 shadow-xl rounded-xl p-6 mb-8 transform rotate-1">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 mr-3">M</div>
                        <div>
                            <p className="font-bold text-sm">Mariana Costa</p>
                            <div className="flex text-yellow-400 text-xs">★★★★★</div>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm italic">"Eu achava que não tinha tempo, mas o método encaixou certinho na minha rotina. Perdi 4kg em 15 dias!"</p>
                </div>
                <Button fullWidth onClick={nextStep}>
                    VAMOS CONTINUAR <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        )}

        {currentStep === 'injury' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Você possui alguma lesão?</h2>
            {renderOption('Não, sou 100% saudável', '✅')}
            {renderOption('Sim, no Joelho', '🦵')}
            {renderOption('Sim, na Coluna/Costas', '🦴')}
            {renderOption('Sim, no Ombro', '💪')}
            {renderOption('Outra lesão', '⚠️')}
          </>
        )}

        {currentStep === 'visualization' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Como você quer se sentir no Carnaval?</h2>
            {renderOption('Confiante para usar qualquer roupa', '👗')}
            {renderOption('Com energia para pular os 4 dias', '🔋')}
            {renderOption('Orgulhosa(o) das minhas fotos', '📸')}
            {renderOption('Sem inchaço e retenção', '💧')}
          </>
        )}

        {currentStep === 'format' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Prefere receber seu protocolo de treino personalizado por imagens ou textos?</h2>
            {renderOption('Textos', '📝')}
            {renderOption('Imagens', '🖼️')}
            {renderOption('Vídeos', '🎥')}
            {renderOption('TODOS', '📦')}
          </>
        )}

        {currentStep === 'focusAreas' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Quais áreas você quer focar mais?</h2>
            <p className="text-center text-gray-500 mb-6 text-sm">(Selecione quantas quiser)</p>
            
            {renderMultiSelectOption('Barriga / Abdômen')}
            {renderMultiSelectOption('Pernas / Coxas')}
            {renderMultiSelectOption('Glúteos')}
            {renderMultiSelectOption('Braços')}
            {renderMultiSelectOption('Costas')}
            {renderMultiSelectOption('Peitoral')}

            <Button 
              fullWidth 
              className="mt-6"
              onClick={nextStep}
            >
              PRÓXIMO
            </Button>
          </>
        )}

        {currentStep === 'commitment' && (
          <div className="text-center">
             <AlertTriangle className="w-16 h-16 text-carnival-orange mx-auto mb-6" />
             <h2 className="text-2xl font-bold mb-4">Última etapa!</h2>
             <p className="text-gray-600 mb-8">
               Seu plano está quase pronto. Mas precisamos saber: você está realmente comprometido(a) a seguir o protocolo pelos próximos 30 dias?
             </p>
             <Button fullWidth onClick={() => handleAnswer('commitment', 'yes')} className="mb-4 text-lg py-5 animate-pulse">
               SIM, ESTOU COMPROMETIDO(A)!
             </Button>
             <button 
               onClick={() => alert("Esse desafio é apenas para quem está decidido a mudar!")}
               className="text-gray-400 text-sm underline"
             >
               Não, prefiro continuar como estou.
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
