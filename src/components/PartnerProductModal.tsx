import React from 'react';
import { X, Landmark, BadgePercent, Sparkles, TrendingUp, CalendarDays, Heart, Flame, ShieldCheck, AlertCircle } from 'lucide-react';
import { PartnerCompany } from '../types';

interface PartnerProductModalProps {
  partner: PartnerCompany | null;
  onClose: () => void;
  onConsultClick?: () => void;
}

export function PartnerProductModal({ partner, onClose, onConsultClick }: PartnerProductModalProps) {
  if (!partner) return null;

  const headerBgColor = partner.brandTheme?.primary || (partner.type === 'life' ? '#0055d3' : '#0e6e00');
  const lightBgColor = partner.brandTheme?.lightBg || (partner.type === 'life' ? '#ebf3ff' : '#f0fdf4');
  const accentTextColor = partner.brandTheme?.primary || (partner.type === 'life' ? '#0040a2' : '#0e6e00');

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-neutral-border flex flex-col max-h-[90vh]">
        {/* Header with Custom Brand Theme (Samsung Blue / Hanwha Orange) or Default Life/Nonlife */}
        <div 
          style={{ backgroundColor: headerBgColor }}
          className="p-5 text-white flex justify-between items-center relative overflow-hidden transition-colors duration-300"
        >
          <div className="absolute right-0 top-0 opacity-10 translate-x-3 translate-y-2">
            {partner.type === 'life' ? <Heart size={80} className="fill-white" /> : <Flame size={80} className="fill-white" />}
          </div>
          <div className="relative z-10 space-y-1">
            <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 w-fit">
              {partner.type === 'life' ? <Heart size={13} className="fill-white" /> : <Flame size={13} className="fill-white" />}
              {partner.brandTheme 
                ? `${partner.name} 제휴 플랜 (${partner.type === 'life' ? '생명' : '손보'})`
                : (partner.type === 'life' ? '생명보험사 제휴' : '손해보험사 제휴')
              }
            </span>
            <h3 className="font-bold text-lg">{partner.name} 주요 안내 플랜</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white relative z-20 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Product specs */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="space-y-1">
            <span className="text-neutral-500 text-xs sm:text-[13px] font-semibold block">제휴 안내 상품</span>
            <strong className="text-neutral-dark text-base sm:text-lg font-extrabold flex items-center gap-1.5">
              <Sparkles size={18} className="text-yellow-500" />
              {partner.bestProduct}
            </strong>
          </div>

          <div className="p-4 bg-neutral-bg rounded-xl border border-neutral-border space-y-2">
            <p className="text-xs sm:text-sm text-neutral-medium leading-relaxed">
              {partner.description}
            </p>
          </div>

          <div 
            style={{ backgroundColor: lightBgColor }}
            className="p-3.5 rounded-xl border border-neutral-200/60 flex items-center gap-2.5"
          >
            <ShieldCheck size={18} style={{ color: accentTextColor }} className="shrink-0" />
            <p style={{ color: accentTextColor }} className="text-xs sm:text-sm font-medium leading-normal">
              고객님의 성별, 연령, 건강 상태에 맞춰 가장 적합한 담보와 가입 조건을 1:1 맞춤 비교해 드립니다.
            </p>
          </div>

          {/* Compliance Warning inside Modal */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1.5 text-xs sm:text-[13px] text-amber-900 leading-relaxed">
            <p>• 보험회사 상품별, 성별, 연령, 직업 등에 따라 가입가능한 담보와 가입금액, 보험료 등은 달라질 수 있습니다.</p>
            <p>• 세부 보장 내용 및 면책사항은 반드시 해당 상품 약관을 참조하시기 바랍니다.</p>
            {partner.bestProduct.includes('실손') && (
              <p className="font-bold text-amber-950">• 실비보험은 자기부담금을 제외한 금액을 보장하는 보험입니다.</p>
            )}
            {partner.bestProduct.includes('운전자') && (
              <p className="font-bold text-amber-950">• 12대 중과실 중 무면허, 음주운전 및 뺑소니 사고는 보장에서 제외됩니다.</p>
            )}
          </div>
          
          <button
            onClick={() => {
              if (onConsultClick) onConsultClick();
            }}
            style={{ backgroundColor: headerBgColor }}
            className="w-full h-12 mt-2 text-white rounded-xl font-bold text-sm sm:text-base shadow-md hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{partner.name} 맞춤 보장 상담 신청하기</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-bg border-t border-neutral-border flex gap-2">
          <button
            onClick={onClose}
            className="w-full h-11 bg-neutral-dark hover:bg-neutral-medium text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
