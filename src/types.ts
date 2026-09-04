export interface InquiryFormState {
  name: string;
  gender: 'male' | 'female' | null;
  birthdate: string;
  phone: string;
  verificationCode: string;
  isVerified: boolean;
  selectedItems: string[];
  termAll: boolean;
  termPrivacy: boolean;
  termMarketing: boolean;
  
  // 항목별 추가 특화 필드
  claimReason?: string; // 보험금 청구: 사유
  hospitalName?: string; // 보험금 청구: 병원/진단명
  currentPremium?: string; // 보험 리모델링: 현재 월 납입액
  targetCoverage?: string; // 보험 리모델링: 중점 희망 보장
  concernPoint?: string; // 내보험 점검: 고민/가족력
  checkRequest?: string; // 내보험 점검: 점검 희망 사항
  analysisInterest?: string; // 보험분석: 관심 보험
  analysisCompany?: string; // 보험분석: 현재 가입된 보험사
  province?: string;
  district?: string;
  consultTimeType?: string; // 상담시간구분 (종일, 오전, 오후)
  consultTime?: string; // 상담시간선택 (01시 ~ 12시)
}

export const REGION_DATA: Record<string, string[]> = {
  '서울특별시': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
  '부산광역시': ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
  '대구광역시': ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구', '군위군'],
  '인천광역시': ['강화군', '계양구', '미추홀구', '남동구', '동구', '부평구', '서구', '연수구', '옹진군', '중구'],
  '광주광역시': ['광산구', '남구', '동구', '북구', '서구'],
  '대전광역시': ['대덕구', '동구', '서구', '유성구', '중구'],
  '울산광역시': ['남구', '동구', '북구', '울주군', '중구'],
  '세종특별자치시': ['세종특별자치시'],
  '경기도': ['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'],
  '강원특별자치도': ['강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군'],
  '충청북도': ['괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '증평군', '진천군', '청주시', '충주시'],
  '충청남도': ['계룡시', '공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '천안시', '청양군', '태안군', '홍성군'],
  '전북특별자치도': ['고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군'],
  '전라남도': ['강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '신안군', '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군'],
  '경상북도': ['경산시', '경주시', '고령군', '구미시', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '영천시', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군', '칠곡군', '포항시'],
  '경상남도': ['거제시', '거창군', '고성군', '김해시', '남해군', '밀양시', '사천시', '산청군', '양산시', '의령군', '진주시', '창녕군', '창원시', '통영시', '하동군', '함안군', '함양군', '합천군'],
  '제주특별자치도': ['서귀포시', '제주시']
};

export interface CheckItem {
  id: string;
  label: string;
  description: string;
}

export interface PartnerCompany {
  id: string;
  name: string;
  originalName?: string;
  type: 'life' | 'nonlife';
  bestProduct: string;
  description: string;
  avgPremium: string;
  brandTheme?: {
    primary: string;     // '#0047AB' (삼성) | '#F37321' (한화)
    lightBg: string;     // '#EBF2FF' | '#FFF4EB'
    hoverBorder: string; // '#0047AB' | '#F37321'
    hoverBg: string;     // '#F0F6FF' | '#FFF7F0'
    text: string;        // '#0047AB' | '#F37321'
  };
}

export const CHECK_ITEMS: CheckItem[] = [
  { id: 'item1', label: '📊 보험분석 상담', description: '현재 보유하신 보험의 보장 내역을 종합적으로 분석하고 상담해 드립니다.' },
  { id: 'item3', label: '🧾 보험금 청구', description: '복잡하고 번거로운 보험금 청구 절차를 간편하게 대행하거나 안내해 드립니다.' },
  { id: 'item2', label: '🔄 보험 리모델링', description: '불필요한 특약을 줄이고 부족한 보장을 채워 실속 있게 재구성합니다.' },
  { id: 'item4', label: '🔍 내보험 점검', description: '놓치고 있는 숨은 보장이나 중복 가입된 항목이 없는지 정밀하게 점검합니다.' },
];

export const PARTNERS_LIFE: PartnerCompany[] = [
  {
    id: 'l1',
    name: 'S사',
    originalName: '삼성생명',
    type: 'life',
    bestProduct: '올인원 통합정기보험',
    description: '사망 보장과 고액 질병 치료비를 실속 있게 설계하는 생명 대표 상품',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#0047AB',
      lightBg: '#EBF2FF',
      hoverBorder: '#0047AB',
      hoverBg: '#F0F6FF',
      text: '#0047AB',
    }
  },
  {
    id: 'l2',
    name: 'H사',
    originalName: '한화생명',
    type: 'life',
    bestProduct: '시그니처 암보험',
    description: '소액암 및 전이암까지 세분화하여 보장 공백을 메우는 베스트셀러',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#F37321',
      lightBg: '#FFF4EB',
      hoverBorder: '#F37321',
      hoverBg: '#FFF7F0',
      text: '#F37321',
    }
  },
  {
    id: 'l3',
    name: 'K사',
    originalName: '교보생명',
    type: 'life',
    bestProduct: '실속있는 종신보험',
    description: '장기 납입 부담을 완화하고 보장 안전성을 높인 플랜',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#002D62',
      lightBg: '#EDF3FA',
      hoverBorder: '#002D62',
      hoverBg: '#F0F5FA',
      text: '#002D62',
    }
  },
  {
    id: 'l4',
    name: 'S사',
    originalName: '신한라이프',
    type: 'life',
    bestProduct: 'SOL 건강종신케어',
    description: '헬스케어 멤버십과 성인병 3대 진단금을 연계한 생활 맞춤보험',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#0046FF',
      lightBg: '#EEF3FF',
      hoverBorder: '#0046FF',
      hoverBg: '#F0F4FF',
      text: '#0046FF',
    }
  },
  {
    id: 'l5',
    name: 'N사',
    originalName: '농협생명',
    type: 'life',
    bestProduct: '농협 굿파트너인덕보험',
    description: '농어촌 및 시니어 가구 맞춤 질병 보장과 재해 사고 집중 보강',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#028638',
      lightBg: '#EEFBF3',
      hoverBorder: '#028638',
      hoverBg: '#F0FDF4',
      text: '#028638',
    }
  },
  {
    id: 'l6',
    name: 'H사',
    originalName: '흥국생명',
    type: 'life',
    bestProduct: '다재다능 종합건강보험',
    description: '필요한 보장 특약만 선택적으로 구성하여 효율을 높인 실속형',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#E6007E',
      lightBg: '#FDF0F7',
      hoverBorder: '#E6007E',
      hoverBg: '#FDF2F8',
      text: '#E6007E',
    }
  },
  {
    id: 'l7',
    name: 'L사',
    originalName: '라이나생명',
    type: 'life',
    bestProduct: 'THE건강한 치아보험',
    description: '임플란트, 브릿지 등 고액 치과 치료비부터 충치 치료까지 든든하게 보장하는 대표 치아플랜',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#002F6C',
      lightBg: '#EEF4FA',
      hoverBorder: '#002F6C',
      hoverBg: '#F0F5FA',
      text: '#002F6C',
    }
  },
  {
    id: 'l8',
    name: 'D사',
    originalName: 'DGB생명',
    type: 'life',
    bestProduct: '고품격 종합보장플랜',
    description: '뇌혈관 및 허혈성 심장질환 보강으로 중후반기 고액 지출 리스크 방어',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#0072CE',
      lightBg: '#EDF7FD',
      hoverBorder: '#0072CE',
      hoverBg: '#F0F9FF',
      text: '#0072CE',
    }
  },
];

export const PARTNERS_NONLIFE: PartnerCompany[] = [
  {
    id: 'n1',
    name: 'S사',
    originalName: '삼성화재',
    type: 'nonlife',
    bestProduct: '안심 실손의료비보험',
    description: '간편한 청구와 합리적인 갱신 관리로 장기 유지가 용이한 실손',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#0047AB',
      lightBg: '#EBF2FF',
      hoverBorder: '#0047AB',
      hoverBg: '#F0F6FF',
      text: '#0047AB',
    }
  },
  {
    id: 'n2',
    name: 'H사',
    originalName: '현대해상',
    type: 'nonlife',
    bestProduct: '퍼펙트 종합생활건강',
    description: '일상 배상 책임 특약과 생활 속 재해 안심 보장 결합',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#002C6C',
      lightBg: '#EEF3FA',
      hoverBorder: '#002C6C',
      hoverBg: '#F0F4FA',
      text: '#002C6C',
    }
  },
  {
    id: 'n3',
    name: 'D사',
    originalName: 'DB손해보험',
    type: 'nonlife',
    bestProduct: '참좋은 훼밀리더플러스',
    description: '운전자 형사 합의 및 변호사 선임비 등 필수 위험 보장',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#009B4E',
      lightBg: '#EFFBF4',
      hoverBorder: '#009B4E',
      hoverBg: '#F0FDF4',
      text: '#009B4E',
    }
  },
  {
    id: 'n4',
    name: 'K사',
    originalName: 'KB손해보험',
    type: 'nonlife',
    bestProduct: '희망파트너 운전자종합',
    description: '중복 가입된 벌금 및 방어 비용 손해액을 산정해 과도한 거품을 제거',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#E5A800',
      lightBg: '#FFFBF0',
      hoverBorder: '#E5A800',
      hoverBg: '#FFFDF5',
      text: '#997000',
    }
  },
  {
    id: 'n5',
    name: 'M사',
    originalName: '메리츠화재',
    type: 'nonlife',
    bestProduct: 'My간편한 질병 3종치료',
    description: '고혈압, 당뇨 등 유병자도 간편 심사를 통해 가입 가능한 플랜',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#E52528',
      lightBg: '#FEF2F2',
      hoverBorder: '#E52528',
      hoverBg: '#FFF1F2',
      text: '#E52528',
    }
  },
  {
    id: 'n6',
    name: 'H사',
    originalName: '한화손보',
    type: 'nonlife',
    bestProduct: '시그니처 운전자상해',
    description: '스쿨존 사고 대비 보호 및 일상 재해 골절 치료 위주 집중 케어',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#F37321',
      lightBg: '#FFF4EB',
      hoverBorder: '#F37321',
      hoverBg: '#FFF7F0',
      text: '#F37321',
    }
  },
  {
    id: 'n7',
    name: 'H사',
    originalName: '흥국화재',
    type: 'nonlife',
    bestProduct: '화재안심 주택종합',
    description: '전열기 누전 사고, 스프링클러 역류 손해 및 배상책임까지 보상',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#E6007E',
      lightBg: '#FDF0F7',
      hoverBorder: '#E6007E',
      hoverBg: '#FDF2F8',
      text: '#E6007E',
    }
  },
  {
    id: 'n8',
    name: 'L사',
    originalName: '롯데손해보험',
    type: 'nonlife',
    bestProduct: '더안전 3대 진단케어',
    description: '암, 뇌, 심장 급성 질환 발생 시 필요한 주요 치료비 집중 보장',
    avgPremium: '상담 시 맞춤 산출',
    brandTheme: {
      primary: '#ED1C24',
      lightBg: '#FEEFEF',
      hoverBorder: '#ED1C24',
      hoverBg: '#FFF0F0',
      text: '#ED1C24',
    }
  },
];
