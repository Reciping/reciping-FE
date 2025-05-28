import React, { useEffect, useState } from "react";

interface FloatingAdProps {
  position: "left" | "right";
  imageUrl: string;
  linkUrl?: string;
}

const FloatingAd: React.FC<FloatingAdProps> = ({
  position,
  imageUrl,
  linkUrl,
}) => {
  const [top, setTop] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 초기 위치 설정
    const initialTop = window.innerHeight / 2 - 100;
    setTop(initialTop);
    
    // 페이지 로드 후 잠시 대기 후 표시
    const timer = setTimeout(() => setIsVisible(true), 1000);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const targetTop = scrollY + window.innerHeight / 2 - 100;
      
      // 부드러운 애니메이션을 위한 lerp 적용
      setTop((prev) => prev + (targetTop - prev) * 0.1);
    };

    const handleResize = () => {
      const targetTop = window.scrollY + window.innerHeight / 2 - 100;
      setTop(targetTop);
    };

    const scrollInterval = setInterval(handleScroll, 16);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(scrollInterval);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const baseClasses = `
    fixed z-40 w-[160px] xl:w-[200px] 
    hidden xl:block 
    transition-all duration-300 ease-out
    ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0'}
  `;
  
  const sideClass = position === "left" 
    ? `left-[20px] xl:left-[60px] ${!isVisible ? '-translate-x-full' : ''}` 
    : `right-[20px] xl:right-[60px] ${!isVisible ? 'translate-x-full' : ''}`;

  return (
    <div 
      className={`${baseClasses} ${sideClass}`} 
      style={{ top: `${top}px` }}
    >
      <a 
        href={linkUrl ?? "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block group"
      >
        <img
          src={imageUrl}
          alt="광고"
          className="
            w-full h-auto max-h-[300px] xl:max-h-[400px] 
            object-cover rounded-xl shadow-lg
            group-hover:shadow-xl group-hover:scale-105
            transition-all duration-200
          "
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </a>
    </div>
  );
};

export default FloatingAd;