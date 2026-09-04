import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, MessageCircle, FileText, Database, ShieldCheck, Eye, Image as ImageIcon } from 'lucide-react';

interface ProcessStep {
  step: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
}
interface ProcessSectionProps {
  onClaimClick?: () => void;
}

export function ProcessSection({ onClaimClick }: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showProcessRaw, setShowProcessRaw] = useState(false);
  const lastInteractionTimeRef = useRef<number>(0);

  useEffect(() => {
    if (showProcessRaw) return;
    const sequence = [0, 1, 3, 2];
    const interval = setInterval(() => {
      // 마지막 상호작용 후 10초(10000ms)가 지나기 전에는 자동 전환 일시 정지
      if (Date.now() - lastInteractionTimeRef.current < 10000) return;
      
      setActiveStep((prev) => {
        const currentIndex = sequence.indexOf(prev);
        return sequence[(currentIndex + 1) % 4];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [showProcessRaw]);

  const steps: ProcessStep[] = [
    {
      step: 'STEP 1',
      title: '보험분석 신청',
      icon: <FileText className="text-white" size={20} />,
      color: 'bg-brand-blue',
      details: [
        '간단한 기본 정보 입력을 통한 상담 접수',
        '전문 보장 분석사 배정 및 사전 검토',
        '신청 즉시 맞춤형 보장 점검 준비 시작'
      ]
    },
    {
      step: 'STEP 2',
      title: '데이터 수집∙분석',
      icon: <Database className="text-white" size={20} />,
      color: 'bg-brand-blue',
      details: [
        '주요 보험사 보장 담보 및 약관 데이터 대조',
        '보장 중복 여부, 적립보험료 비중, 보장 공백 정밀 분석',
        '성별, 연령별 표준 통계 대비 현황 분석'
      ]
    },
    {
      step: 'STEP 4',
      title: '보장분석 리포트 제공',
      icon: <ShieldCheck className="text-white" size={20} />,
      color: 'bg-brand-blue',
      details: [
        '분석 결과가 정리된 맞춤 리포트 제공',
        '불필요한 지출 축소 및 필수 보장 중심의 포트폴리오 제안',
        '카카오 알림톡 또는 상담을 통한 상세 설명 지원'
      ]
    },
    {
      step: 'STEP 3',
      title: '고객 맞춤 상담',
      icon: <MessageCircle className="text-white" size={20} />,
      color: 'bg-brand-blue',
      details: [
        '편리한 비대면 1:1 맞춤 상담 지원',
        '중복 가입되거나 과도한 특약 정비 방안 안내',
        '유지 가능한 범위 안에서 실속 있는 재구성 방향 제안'
      ]
    }
  ];

  return (
    <section className="py-14 px-5 bg-neutral-dark text-white relative overflow-hidden">
      {/* Decorative ambient spots */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-green-neon/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[768px] mx-auto text-center space-y-6 relative z-10">
        <div>
          <span className="text-brand-green-light bg-white/10 text-xs sm:text-[13px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Analysis Method
          </span>
          <h2 className="font-sans font-bold text-2xl text-white mt-2 flex items-center justify-center gap-1.5">
            <span className="text-3xl">📋</span> 보험분석, 이렇게 진행됩니다
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 leading-relaxed">
            간결하고 투명한 절차에 기반하여 복잡한 세부 약관까지 깔끔하게 점검해 드립니다.
          </p>
        </div>


        {showProcessRaw ? (
          /* Show official process illustration map */
          <div className="max-w-md mx-auto animate-fade-in border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://lh3.googleusercontent.com/aida/ADBb0ujR0JlQj5YyfpzP3nvlT0SEHEj4Ey3HBQqosUH0ue5tHBahVaq_jN0mJwIkVhISdttULPvvCZk5X5BdktLk62P5oYJ8LHBD1tzvdi3kUTB5cmbZJSvGKQL2Tr6VWtu39y0osOyEYAsgt9Q1G0gXtvD1Ph25JU5XJZPL1oKYU1YDwi8P6Wqa82HPyEst0TOcF2QStlQXcLOMTFpFFqeRbHZ4-5zP6bWftzAuabTcNa0AhRD6sLUVnSM"
              alt="진행 절차 안내도"
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          /* Interactive Quadrant Panel */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full animate-fade-in font-sans">
            {steps.map((item, idx) => {
              const isSelected = activeStep === idx;
              
              // 모바일(1단)일 때는 1-2-3-4 순서, 데스크탑(2단)일 때는 1-2-4-3 순서(박스 스왑 유지)
              let orderClass = '';
              if (item.step === 'STEP 1') orderClass = 'order-1 sm:order-1';
              if (item.step === 'STEP 2') orderClass = 'order-2 sm:order-2';
              if (item.step === 'STEP 3') orderClass = 'order-3 sm:order-4';
              if (item.step === 'STEP 4') orderClass = 'order-4 sm:order-3';

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveStep(idx);
                    lastInteractionTimeRef.current = Date.now();
                  }}
                  className={`text-left p-4.5 rounded-2xl border transition-all relative overflow-hidden flex flex-col h-full cursor-pointer ${orderClass} ${
                    isSelected
                      ? 'bg-neutral-dark border-brand-blue-hover ring-2 ring-brand-blue-hover/60 shadow-xl'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  {/* Step status */}
                  <div className="mb-2">
                    <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      item.color === 'bg-brand-green-neon' ? 'text-neutral-dark bg-brand-green-neon' : 'text-white bg-brand-blue'
                    }`}>
                      {item.step}
                    </span>
                  </div>

                  <strong className="text-base font-bold block mb-1 text-white">{item.title}</strong>
                  <span className="text-xs text-neutral-400">터치해서 상세 정보 조회</span>
                  
                  {isSelected && (
                    <>
                      <div className="absolute right-0 top-0 opacity-10 font-display font-black text-7xl translate-x-[-8px] translate-y-3 pointer-events-none">
                        {React.cloneElement(item.icon as React.ReactElement, { size: '1em' })}
                      </div>

                    </>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Details Display Card (When not in raw state) */}
        {!showProcessRaw && (
          <div className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl text-left w-full animate-fade-in font-sans">
            <div className="flex items-center gap-2 mb-3.5">
              <div className="w-3 h-3 rounded-full bg-brand-green-neon"></div>
              <strong className="text-sm text-brand-green-light font-bold">
                {steps[activeStep].step}
              </strong>
              <span className="text-sm sm:text-base font-extrabold text-white">
                {steps[activeStep].title} 세부 지원 내역
              </span>
            </div>
            
            <ul className="space-y-2.5">
              {steps[activeStep].details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200 leading-relaxed">
                  <span className="text-brand-blue-light mt-0.5 shrink-0">✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* bottom subtext */}
        <div className="pt-6 border-t border-white/10 max-w-md mx-auto text-center space-y-1 flex flex-col items-center">
          <p className="text-brand-blue-light text-xs font-bold">🎯 불편하고 복잡한 청구절차는 이제 그만!</p>
          <h3 className="text-base font-extrabold text-white">청구지원 서비스까지 함께 완벽하게 받아보세요</h3>
          
          <button 
            onClick={onClaimClick}
            className="relative z-10 mt-4 w-full max-w-[320px] mx-auto h-12 bg-white/15 hover:bg-white/25 text-white rounded-xl font-bold text-sm backdrop-blur-md border border-white/20 shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
            🧾 보험금 청구하기
          </button>
        </div>
      </div>
    </section>
  );
}
