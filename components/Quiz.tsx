import React, { useState, useEffect } from 'react';
import { QuizState } from '../types';
import { Button } from './Button';
import { Check, AlertTriangle } from 'lucide-react';
// Removed generateGenderImage import to speed up loading

interface QuizProps {
  onComplete: (data: QuizState) => void;
}

const steps = [
  'gender', 'age', 'goal', 'obstacle', 'experience', 'motivation', 
  'time', 'environment', 'frequency', 'weightGoal', 'currentWeight', 
  'height', 'socialProof1', 'injury', 'visualization', 'format', 'focusAreas', 'commitment'
];

// Static realistic images for instant loading
// Updated to show defined bodies without gym equipment focus
const GENDER_IMAGES = {
  male: "https://i.imgur.com/2UhGfva.jpeg",
  female: "https://i.imgur.com/jUrer0k.jpeg"
};

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizState>>({
    focusAreas: []
  });
  const [imcData, setImcData] = useState<{value: string, show: boolean}>({ value: '', show: false });

  // Removed useEffect for image fetching to ensure instant render

  const handleAnswer = (key: keyof QuizState, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    nextStep();
  };

  const handleMultiSelect = (key: keyof QuizState, value: string) => {
    const currentList = (answers[key] as string[]) || [];
    if (currentList.includes(value)) {
      setAnswers(prev => ({ ...prev, [key]: currentList.filter(i => i !== value) }));
    } else {
      setAnswers(prev => ({ ...prev, [key]: [...currentList, value] }));
    }
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
  const renderOption = (label: string, icon?: string, description?: string) => {
    return (
        <Button 
          variant="ghost" 
          fullWidth 
          onClick={() => handleAnswer(currentStep as keyof QuizState, label)}
          className="mb-3 text-left justify-start h-auto py-6"
        >
          <div className="flex flex-col items-start text-left w-full">
            {icon && <span className="text-2xl mb-2">{icon}</span>}
            <span className="text-lg">{label}</span>
            {description && <span className="text-sm font-light text-gray-500 mt-1">{description}</span>}
          </div>
        </Button>
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
                className="w-[100px] h-[100px] object-contain rounded-full shadow-md"
            />
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div 
          className="bg-carnival-orange h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        
        {/* Step Content */}
        {currentStep === 'gender' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Selecione seu gênero para ajustarmos o metabolismo basal.</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleAnswer('gender', 'HOMEM')}
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-carnival-orange transition-all bg-white shadow-sm"
              >
                <div className="w-full aspect-[3/4] overflow-hidden rounded-lg mb-4">
                  <img src={GENDER_IMAGES.male} alt="Homem" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="font-bold text-lg">HOMEM</span>
              </button>
              <button 
                onClick={() => handleAnswer('gender', 'MULHER')}
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-carnival-orange transition-all bg-white shadow-sm"
              >
                 <div className="w-full aspect-[3/4] overflow-hidden rounded-lg mb-4">
                  <img src={GENDER_IMAGES.female} alt="Mulher" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="font-bold text-lg">MULHER</span>
              </button>
            </div>
          </>
        )}

        {currentStep === 'age' && (
          <>
            <h2 className="text-2xl font-bold mb-6">E qual sua faixa etária?</h2>
            {renderOption("18-29 anos")}
            {renderOption("30-40 anos")}
            {renderOption("41-50 anos")}
            {renderOption("+50 anos")}
          </>
        )}

        {currentStep === 'goal' && (
          <>
            <h2 className="text-2xl font-bold mb-2">Qual o seu principal objetivo ao iniciar este desafio?</h2>
            <p className="text-gray-500 mb-6">Isso nos ajuda a definir o melhor protocolo de treino para alcançar seu principal objetivo</p>
            {renderOption("Secar gordura do corpo")}
            {renderOption("Construir mais músculos")}
            {renderOption("Aumentar a disposição")}
            {renderOption("Eliminar dores no corpo")}
          </>
        )}

        {currentStep === 'obstacle' && (
          <>
            <h2 className="text-2xl font-bold mb-6">E o que mais te atrapalhou de conseguir isso até hoje?</h2>
            {renderOption("A falta de tempo no dia a dia")}
            {renderOption("A falta de motivação para continuar")}
            {renderOption("A dúvida em não saber como começar do jeito certo")}
            {renderOption("O desânimo de ter tentado antes sem ter resultados")}
          </>
        )}

        {currentStep === 'experience' && (
          <>
            <h2 className="text-2xl font-bold mb-2">Qual seu nível de experiência com treinos?</h2>
            <p className="text-gray-500 mb-6">Seja honesto(a), isso é crucial para montarmos treinos que funcionem para você sem risco de lesão.</p>
            {renderOption("Começar agora")}
            {renderOption("Iniciante")}
            {renderOption("Intermediário")}
            {renderOption("Avançado")}
          </>
        )}

        {currentStep === 'motivation' && (
          <>
            <h2 className="text-2xl font-bold mb-6">O que mais te animaria em um Desafio para melhorar seu corpo até o carnaval?</h2>
            {renderOption("Ver resultado rápido no meu corpo.", "😄")}
            {renderOption("Ter um passo a passo simples que eu consiga seguir.", "😅")}
            {renderOption("Poder treinar em casa sem precisar de equipamentos.", "😎")}
            {renderOption("Ter um desafio que me faça seguir firme e animado.", "💪")}
          </>
        )}

        {currentStep === 'time' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Quanto tempo por dia você consegue se dedicar ao seu treino?</h2>
            {renderOption("15 minutos")}
            {renderOption("20 minutos")}
            {renderOption("30 minutos")}
            {renderOption("1 hora")}
          </>
        )}

        {currentStep === 'environment' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Em qual ambiente você prefere treinar?</h2>
            {renderOption("Em casa", "🏠")}
            {renderOption("Ao ar livre", "🏞️")}
            {renderOption("Na academia", "🏋️")}
          </>
        )}

        {currentStep === 'frequency' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Quantos dias por semana você pode treinar?</h2>
            {renderOption("2-3 dias")}
            {renderOption("4-5 dias")}
            {renderOption("6-7 dias")}
          </>
        )}

        {currentStep === 'weightGoal' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Você tem alguma meta de peso que deseja perder?</h2>
            {renderOption("Perder até 5kg")}
            {renderOption("Perder de 5-10kg")}
            {renderOption("Perder de 10-15kg")}
            {renderOption("Perder mais de 15kg")}
            {renderOption("Construir mais músculos e aumentar a força")}
          </>
        )}

        {currentStep === 'currentWeight' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Digite seu peso atual</h2>
            <input 
              type="text" 
              placeholder="Ex: 70kg" 
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-xl mb-6 focus:border-carnival-orange focus:outline-none"
              onChange={(e) => handleInput('currentWeight', e.target.value)}
              value={answers.currentWeight || ''}
            />
            <Button fullWidth onClick={nextStep} disabled={!answers.currentWeight}>CONTINUAR</Button>
          </>
        )}

        {currentStep === 'height' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Informe sua altura</h2>
            <input 
              type="text" 
              placeholder="Ex: 1.70m" 
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-xl mb-6 focus:border-carnival-orange focus:outline-none"
              onChange={(e) => handleInput('height', e.target.value)}
              value={answers.height || ''}
            />
            
            {imcData.show && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r">
                    <div className="flex items-center font-bold">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        <p>IMC: {imcData.value}</p>
                    </div>
                    <p className="text-sm font-semibold mt-1">ATENÇÃO: VOCÊ ESTÁ EM RISCO!</p>
                </div>
            )}

            <Button fullWidth onClick={nextStep} disabled={!answers.height}>CONTINUAR</Button>
          </>
        )}

        {currentStep === 'socialProof1' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Veja algumas mulheres que fizeram o PROTOCOLO no ano passado</h2>
            <div className="w-full rounded-xl overflow-hidden shadow-md mb-8 border border-gray-100 bg-gray-50">
                <img 
                    src="https://i.imgur.com/RzejM6W.jpeg" 
                    alt="Resultados de alunas" 
                    className="w-full h-auto object-cover"
                />
            </div>
            <Button fullWidth onClick={nextStep}>CONTINUAR</Button>
          </>
        )}

        {currentStep === 'injury' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Você tem alguma lesão ou limitação física?</h2>
            {renderOption("Não tenho nenhuma")}
            {renderOption("Dor nas costas")}
            {renderOption("Dor nos ombros")}
            {renderOption("Dor nos joelhos")}
          </>
        )}

        {currentStep === 'visualization' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Como você se imagina após os Protocolo de CARNAVAL?</h2>
            {renderOption("Me olhar no espelho e ficar feliz com o que vejo!", "😁")}
            {renderOption("Ter energia para meus dias renderem mais!", "⚡")}
            {renderOption("Dormir melhor sem sofrer com insônias e acordar cansado!", "😴")}
            {renderOption("Aumentar minha força para tarefas físicas!", "💪")}
          </>
        )}

        {currentStep === 'format' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Prefere receber seu protocolo de treino personalizado por imagens ou textos?</h2>
            {renderOption("Textos")}
            {renderOption("Imagens")}
            {renderOption("OS DOIS")}
          </>
        )}

        {currentStep === 'focusAreas' && (
          <>
            <h2 className="text-2xl font-bold mb-2">Quais áreas do corpo você quer destacar?</h2>
            <p className="text-gray-500 mb-6">Selecione todas as regiões que você quer dar ênfase nos próximos dias.</p>
            
            <div className="space-y-3 mb-6">
              {['Abdômen', 'Peitoral', 'Braços', 'Pernas', 'Costas & Postura', 'Corpo Todo'].map((area) => (
                <button
                  key={area}
                  onClick={() => handleMultiSelect('focusAreas', area)}
                  className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                    answers.focusAreas?.includes(area)
                      ? 'border-carnival-orange bg-orange-50 text-carnival-orange'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-semibold">{area}</span>
                  {answers.focusAreas?.includes(area) && <Check className="w-5 h-5" />}
                </button>
              ))}
            </div>
            
            <Button fullWidth onClick={nextStep} disabled={!answers.focusAreas?.length}>CONTINUAR</Button>
          </>
        )}

        {currentStep === 'commitment' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Qual é o seu nível de comprometimento para mudar?</h2>
            {renderOption("Muito Empolgado!\n\nQuero iniciar logo e alcançar os objetivos que desejo!", "😎")}
            {renderOption("Empolgado!\n\nQuero iniciar para ver se gosto e consigo manter a rotina.", "😁")}
            {renderOption("Em Dúvida!\n\nAinda não tenho certeza mas quero experimentar.", "🫣")}
            {renderOption("Desanimado!\n\nVou me conformar pra sempre com o corpo que tenho.", "😣")}
          </>
        )}
      </div>
    </div>
  );
};