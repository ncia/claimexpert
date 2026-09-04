import React, { useState } from 'react';
import { ArrowDown, Check, TrendingDown, BadgeAlert, Sparkles, Image as ImageIcon, Eye, ShieldCheck, AlertCircle } from 'lucide-react';

interface BeforeAfterSectionProps {
  onConsultClick?: () => void;
}

export function BeforeAfterSection({ onConsultClick }: BeforeAfterSectionProps) {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');

  return (
    <section className="py-14 px-5 bg-white border-y border-neutral-border font-sans">
      <div className="max-w-[768px] mx-auto text-center space-y-6">
        <div>
          <span className="text-brand-blue bg-brand-blue-pale text-sm font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Optimized Clinic
          </span>
          <h2 className="font-sans font-bold text-2xl text-neutral-dark mt-2 flex items-center justify-center gap-1.5">
            <span className="text-3xl">✨</span> 보험분석, 객관적인 보장 비교
          </h2>
          <p className="text-sm text-neutral-gray mt-1.5 leading-relaxed">
            중복된 보장은 줄이고 부족한 보장을 채워 균형 있게 재구성한 예시 플랜입니다.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-neutral-bg p-1.5 rounded-2xl max-w-[340px] mx-auto border border-neutral-border">
          <button
            onClick={() => setActiveTab('before')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'before'
                ? 'bg-red-600 shadow-sm text-white'
                : 'text-neutral-gray hover:text-neutral-dark'
            }`}
          >
            보험분석 전 기존구성
          </button>
          <button
            onClick={() => setActiveTab('after')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'after'
                ? 'bg-brand-blue shadow-sm text-white'
                : 'text-neutral-gray hover:text-neutral-dark'
            }`}
          >
            보험분석 후 재구성안
          </button>
        </div>

        {/* Comparison Display */}
        <div className="w-full">
            <div 
              className="grid cursor-pointer w-full text-left animate-fade-in font-sans [perspective:1500px]"
              onClick={() => setActiveTab(activeTab === 'before' ? 'after' : 'before')}
            >
              {/* Before Card */}
              <div 
                className={`col-start-1 row-start-1 w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] [backface-visibility:hidden] ${activeTab === 'before' ? '[transform:rotateY(0deg)] z-10' : '[transform:rotateY(180deg)] z-0 pointer-events-none'}`}
              >
                <div className="bg-white border-2 border-red-200 shadow-md rounded-2xl p-6 space-y-4 h-full hover:shadow-lg transition-shadow">
                  {/* Summary Box */}
                  <div className="flex justify-between items-center bg-red-50 p-4 rounded-xl border border-red-100">
                    <div>
                      <span className="text-xs uppercase font-bold text-red-500 bg-red-100 px-2.5 py-0.5 rounded-full">
                        보험분석 전 예시
                      </span>
                      <p className="font-display font-black text-2xl text-red-600 mt-1">480,300원</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm text-neutral-gray block">가입건수</span>
                      <strong className="text-neutral-dark text-base sm:text-lg font-extrabold">총 6건</strong>
                    </div>
                  </div>

                  {/* List of items */}
                  <p className="text-sm font-bold text-neutral-dark border-b border-neutral-border pb-2">
                    보장 구성 점검 내역
                  </p>
                  <div className="space-y-3">
                    {[
                      { name: 'A사 실비보험', price: '38,500원', badge: '중복 가입 점검', desc: '타 보장과 담보가 중복되어 효율적인 조정이 필요한 상태입니다.' },
                      { name: 'B사 암보험', price: '54,200원', badge: '보장 범위 점검', desc: '발생 빈도가 높은 주요 소액암 및 유사암 보장 한도 점검이 필요합니다.' },
                      { name: 'C사 건강보험', price: '135,000원', badge: '적립 비중 과다', desc: '보장 대비 적립 보험료 비중이 높아 순수 보장형 전환 검토가 권장됩니다.' },
                      { name: 'D사 운전자보험', price: '25,100원', badge: '한도 정비 필요', desc: '개정된 법령 기준에 맞춘 벌금 및 형사합의금 한도 점검이 필요합니다.' },
                      { name: 'E사 변액보험', price: '210,000원', badge: '보장 구조 점검', desc: '가입 목적에 따른 투자 수익률 및 펀드 관리 상태 점검이 필요합니다.' },
                      { name: 'F사 운전자보험', price: '17,500원', badge: '중복 특약 점검', desc: 'D사 운전자보험과 동일 특약이 중복 가입되어 정리가 권장됩니다.' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-xs sm:text-sm pb-2.5 border-b border-dashed border-neutral-border/60">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-neutral-dark text-sm sm:text-base block">{item.name}</strong>
                            <span className="text-[11px] text-red-600 bg-red-100 font-bold px-2 py-0.5 rounded">
                              {item.badge}
                            </span>
                          </div>
                          <span className="text-xs text-neutral-gray leading-normal block mt-0.5">{item.desc}</span>
                        </div>
                        <span className="font-display font-extrabold text-neutral-dark text-sm sm:text-base shrink-0 ml-2">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-red-50/50 p-3.5 rounded-xl border border-red-100/80 flex items-start gap-2">
                    <BadgeAlert size={18} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-red-800 leading-normal">
                      불필요하게 중복 가입된 특약과 과도한 적립 보험료가 포함되어 있어, 불필요한 지출을 줄이고 필요한 핵심 보장 중심으로 재정비가 권장됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* After Card */}
              <div 
                className={`col-start-1 row-start-1 w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] [backface-visibility:hidden] ${activeTab === 'after' ? '[transform:rotateY(0deg)] z-10' : '[transform:rotateY(-180deg)] z-0 pointer-events-none'}`}
              >
                <div className="bg-neutral-bg border-2 border-brand-blue shadow-lg rounded-2xl p-6 space-y-4 h-full hover:shadow-xl transition-shadow">
                  {/* Summary Box */}
                  <div className="flex justify-between items-center bg-brand-blue text-white p-5 rounded-xl shadow-inner relative overflow-hidden">
                    <div className="absolute right-0 top-0 opacity-10 font-display font-black text-7xl translate-x-3 translate-y-3">
                      SA
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-green-light bg-neutral-dark/40 px-2.5 py-0.5 rounded-full">
                        보험분석 후 재구성 예시
                      </span>
                      <p className="font-display font-black text-3xl text-white mt-1">162,250원</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm text-brand-blue-light block">유지 계약</span>
                      <strong className="text-lg font-extrabold text-brand-green-light">총 4건</strong>
                    </div>
                  </div>

                  {/* Restructuring Banner */}
                  <div className="bg-brand-blue text-white px-4 py-3 rounded-xl flex justify-between items-center shadow-md">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={18} className="text-brand-green-light" />
                      <span className="text-xs sm:text-sm font-bold">보장 재구성 플랜 예시</span>
                    </div>
                    <strong className="font-sans font-bold text-xs sm:text-sm text-brand-green-light">중복 특약 정비 및 필수 보장 강화</strong>
                  </div>

                  {/* List of optimized items */}
                  <p className="text-sm font-bold text-neutral-dark border-b border-neutral-border pb-2">
                    맞춤 재구성 포트폴리오 예시
                  </p>
                  <div className="space-y-3">
                    {[
                      { name: 'G사 실손의료비보험', price: '17,450원', action: '보장전환', period: '1년갱신 (5년재가입, 최대100세)', desc: '세대별 보장 조건 검토 후 합리적인 표준형 실손으로 전환 안내' },
                      { name: 'B사 암보험', price: '53,100원', action: '보장보강', period: '20년납 100세만기 (비갱신형)', desc: '주요 암 진단비 및 전이암 치료 특약 집중 보강' },
                      { name: 'C사 건강보험', price: '72,500원', action: '적립조정', period: '20년납 100세만기 (무해지형)', desc: '순수 보장성 중심으로 전환하여 매월 보험료 부담 완화' },
                      { name: 'D사 운전자보험', price: '19,200원', action: '특약정비', period: '20년납 20년만기 (순수보장형)', desc: '법령 기준에 맞춘 벌금/변호사 선임비 한도 정비 및 중복 특약 해소' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-xs sm:text-sm pb-2.5 border-b border-dashed border-neutral-border/60">
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <strong className="text-neutral-dark text-sm sm:text-base block">{item.name}</strong>
                            <span className="text-[11px] text-white bg-brand-blue font-bold px-2 py-0.5 rounded">
                              {item.action}
                            </span>
                            <span className="text-[10px] text-neutral-500 bg-neutral-200/70 font-medium px-1.5 py-0.5 rounded">
                              {item.period}
                            </span>
                          </div>
                          <span className="text-xs text-neutral-gray leading-normal block mt-0.5">{item.desc}</span>
                        </div>
                        <span className="font-display font-extrabold text-brand-blue text-sm sm:text-base shrink-0 ml-2">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-brand-blue-pale p-3.5 rounded-xl border border-brand-blue-light flex items-start gap-2">
                    <Check size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-brand-blue-dark leading-normal">
                      중복 가입된 특약과 불필요한 지출을 정비하여, 꼭 필요한 핵심 보장 중심으로 균형 있게 재구성할 수 있도록 맞춤 컨설팅을 도와드립니다.
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); if (onConsultClick) onConsultClick(); }}
                    className="w-full md:w-1/2 mx-auto h-12 mt-3 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl font-bold text-sm sm:text-base shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>보험 리모델링 상담하기</span>
                  </button>
                </div>
              </div>
            </div>
        </div>

        {/* Calculation standard and Compliance Warnings */}
        <div className="text-left space-y-3 pt-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-[13px] text-neutral-700 leading-relaxed space-y-1.5">
            <p className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
              <span>📌</span>
              <span>[상품별 보험료 산출기준 예시 - 38세 남성, 상해 1급 기준]</span>
            </p>
            <ul className="pl-4 list-disc space-y-1 text-neutral-700 text-xs sm:text-[12px]">
              <li><strong>실손의료비보험:</strong> 38세 남성, 상해 1급 / 1년 갱신형 (5년 주기 재가입, 최대 100세 보장)</li>
              <li><strong>암보험:</strong> 38세 남성, 상해 1급 / 20년납 100세만기 (비갱신형, 주요 암 진단비 플랜)</li>
              <li><strong>종합 건강보험:</strong> 38세 남성, 상해 1급 / 20년납 100세만기 (해약환급금 미지급형)</li>
              <li><strong>운전자보험:</strong> 38세 남성, 자가용 운전자 / 20년납 20년만기 (순수보장형)</li>
            </ul>
            <p className="text-[11px] text-neutral-500 pt-1 border-t border-slate-200/80">
              ※ 상기 예시 금액은 소비자의 이해를 돕기 위한 가입설계 예시이며, 보험회사 상품별, 성별, 연령, 직업, 병력 등에 따라 가입 가능한 담보와 가입금액, 보험료 등은 달라질 수 있습니다.
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 space-y-2 text-xs sm:text-[13px] text-amber-900 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-amber-950 text-sm">
              <AlertCircle size={16} className="text-amber-600" />
              <span>가입 전 유의사항</span>
            </div>
            <p>• 보험계약자가 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서 ① 질병이력, 연령증가 등으로 가입이 거절되거나 보험료가 인상될 수 있습니다. ② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수 있습니다.</p>
            <p>• 본 내용은 모집종사자 개인의 의견이며, 계약 체결에 따른 이익 또는 손실은 보험계약자 등에게 귀속됩니다.</p>
            <p>• 보험사 및 상품별로 상이할 수 있으므로, 관련한 세부사항은 반드시 해당 약관을 참조하시기 바랍니다.</p>
            <p>• 실비보험은 자기부담금을 제외한 금액을 보장하는 보험입니다. (실손의료비보험은 가입시기별로 보상한도/보장범위/면책사항 등이 다를 수 있습니다)</p>
            <p>• 12대 중과실 중 무면허, 음주운전 및 뺑소니 사고는 보장에서 제외됩니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
