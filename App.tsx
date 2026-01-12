import React, { useState } from 'react';
import { Quiz } from './components/Quiz';
import { LoadingScreen } from './components/LoadingScreen';
import { SalesPage } from './components/SalesPage';
import { Button } from './components/Button';
import { Step, QuizState } from './types';

function App() {
  const [step, setStep] = useState<Step>('intro');
  const [quizData, setQuizData] = useState<QuizState | null>(null);

  const handleQuizComplete = (data: QuizState) => {
    setQuizData(data);
    setStep('loading');
  };

  const handleLoadingComplete = () => {
    setStep('sales');
  };

  return (
    <div className="min-h-screen bg-white font-poppins text-gray-900">
      
      {step === 'intro' && (
        <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="flex justify-center mb-6">
            <img 
                src="https://i.imgur.com/99UVGNP.jpeg" 
                alt="Logo" 
                className="w-[100px] h-[100px] object-contain rounded-full shadow-md"
            />
          </div>
          <h1 className="text-3xl font-extrabold mb-2 text-carnival-orange">
            Desafio estar no SHAPE até o carnaval
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Monte seu plano PERSONALIZADO para SECAR E DEFINAR até o CARNAVAL
          </p>
          
          <div className="rounded-xl overflow-hidden shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-300">
            <img 
              src="https://i.imgur.com/QhBqxK7.jpeg" 
              alt="Carnival Shape" 
              className="w-full h-auto"
            />
          </div>

          <p className="text-gray-500 mb-8">
            Responda algumas perguntas para montar seu cronograma individual para seu corpo , rotina e objetivos
          </p>

          <Button fullWidth onClick={() => setStep('quiz')} className="text-xl py-4">
            CONTINUAR
          </Button>
        </div>
      )}

      {step === 'quiz' && (
        <Quiz onComplete={handleQuizComplete} />
      )}

      {step === 'loading' && (
        <LoadingScreen onFinish={handleLoadingComplete} />
      )}

      {step === 'sales' && quizData && (
        <SalesPage quizData={quizData} />
      )}

    </div>
  );
}

export default App;