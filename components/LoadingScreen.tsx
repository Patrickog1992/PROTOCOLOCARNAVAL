import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onFinish: () => void;
}

const images = [
  "https://i.imgur.com/ipOh27y.jpg",
  "https://i.imgur.com/AJCfcXk.jpg",
  "https://i.imgur.com/BTYdqvQ.jpg"
];

const testimonials = [
  { text: "Já perdi 3kg na primeira semana!", name: "Julia M.", stars: 5 },
  { text: "Melhor decisão que tomei antes do carnaval.", name: "Carla S.", stars: 5 },
  { text: "Treinos rápidos e muito eficientes.", name: "Mariana R.", stars: 5 },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 5 seconds total approx

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(onFinish, 500);
    }
  }, [progress, onFinish]);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 2500); // Slower interval for better viewing
    return () => clearInterval(imageTimer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Criando seu plano...</h2>
      
      {/* Progress Bar */}
      <div className="w-full max-w-md bg-gray-200 rounded-full h-4 mb-2">
        <div 
          className="bg-carnival-orange h-4 rounded-full transition-all duration-100" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-600 font-semibold mb-8">{progress}%</p>

      {/* Carousel */}
      <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl mb-8 bg-gray-100">
         <div className="w-full">
           <img 
             src={images[currentImageIndex]} 
             alt="Resultados" 
             className="w-full h-auto object-contain transition-opacity duration-500"
           />
         </div>
         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 text-white pt-12">
           <div className="flex justify-center mb-1">
             {[...Array(5)].map((_, i) => (
               <span key={i} className="text-yellow-400">★</span>
             ))}
           </div>
           <p className="text-sm italic font-medium">"{testimonials[currentImageIndex].text}"</p>
           <p className="text-xs font-bold mt-2 uppercase tracking-wide">- {testimonials[currentImageIndex].name}</p>
         </div>
      </div>

      <p className="text-gray-500 text-sm max-w-sm">
        Analisando suas respostas para montar a estratégia perfeita para o seu carnaval.
      </p>
    </div>
  );
};