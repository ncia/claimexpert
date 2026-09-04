# 📑 [기획서] 심플컨트(SimpleConsult) Vercel 배포 및 도메인 연결 기획서

## 1. 개요 및 목적
* **프로젝트명**: 심플컨트 (SimpleConsult) 보험 원스톱 상담 웹 애플리케이션
* **문서 목적**: GitHub 원격 저장소에 연동된 프로젝트를 Vercel 글로벌 CDN 인프라에 무중단 배포하고, 전용 커스텀 도메인을 연결하여 운영하기 위한 표준 배포 및 도메인 구성 기획서.
* **적용 기술 스택**: 
  - 프론트엔드: React 19, Vite, Tailwind CSS, Vercel Analytics
  - 버전 관리: GitHub (`https://github.com/ncia/claimexpert`)
  - 인프라/호스팅: Vercel (Edge Network / Serverless / Automated HTTPS)

---

## 2. 배포 및 도메인 아키텍처 구조도

```mermaid
flowchart LR
    A[사용자 / 고객] -->|도메인 접속\n예: yourdomain.co.kr| B[도메인 DNS 서버\n가비아 / 호스팅케이알]
    B -->|A 레코드: 76.76.21.21\nCNAME: cname.vercel-dns.com| C[Vercel 글로벌 CDN Edge]
    C -->|SSL/HTTPS 자동 암호화| D[SimpleConsult 웹 애플리케이션\nReact + Vite 번들]
    
    subgraph CI/CD 자동화
      E[개발자 로컬 환경] -->|git push| F[GitHub 저장소\n(ncia/claimexpert)]
      F -->|Webhook 트리거| G[Vercel 자동 빌드 & 배포]
      G --> C
    end
```

---

## 3. 상세 단계별 구축 및 연결 계획

### Phase 1. Vercel 프로젝트 생성 및 초기 배포
1. **Vercel 플랫폼 접속 및 연동**:
   - Vercel([vercel.com](https://vercel.com))에 관리자 GitHub 계정으로 로그인.
2. **저장소 Import**:
   - 대시보드 `Add New...` > `Project` 선택.
   - `ncia/claimexpert` 저장소를 선택하여 **Import**.
3. **빌드 설정(Build & Output Settings)**:
   - **Framework Preset**: `Vite` (자동 감지)
   - **Build Command**: `npm run build` (기본값 유지)
   - **Output Directory**: `dist` (기본값 유지)
   - **Install Command**: `npm install` (기본값 유지)
4. **배포 실행(Deploy)**:
   - `Deploy` 버튼 클릭 후 약 30~45초 내 빌드 완료 및 1차 기본 서브도메인(`claimexpert.vercel.app`) 자동 생성.

---

### Phase 2. 커스텀 도메인(Custom Domain) 등록
1. **Vercel Domains 설정 진입**:
   - Vercel 프로젝트 대시보드 > `Settings` > `Domains` 메뉴 이동.
2. **도메인 네임 입력 및 라우팅 정책 설정**:
   - 대표 도메인 입력 (예: `yourdomain.co.kr`)
   - **리다이렉트 정책 (권장)**:
     - 루트 도메인(`yourdomain.co.kr`)을 Primary로 설정하고, `www.yourdomain.co.kr` 접속 시 루트로 자동 308 Permanent Redirect 설정 (SEO 최적화).

---

### Phase 3. 도메인 등록기관(DNS) 레코드 매핑
도메인 구입처(가비아, 호스팅케이알, 후이즈, Cloudflare 등)의 **DNS 관리 콘솔**에서 아래 레코드를 등록/설정합니다.

| 분류 | 레코드 타입 (Type) | 호스트명 (Host/Name) | 값 (Value / Target) | TTL | 비고 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **루트 도메인** | `A` | `@` (또는 빈칸) | `76.76.21.21` | 3600 | Vercel Anycast IP |
| **서브 도메인** | `CNAME` | `www` | `cname.vercel-dns.com` | 3600 | Vercel DNS 엔드포인트 |

---

### Phase 4. 보안(SSL/TLS) 인증서 발급 및 검증
1. **DNS 전파 및 인증**:
   - DNS 설정 저장 후 Vercel 대시보드에서 `Refresh` 클릭.
   - 상태가 `Valid Configuration` (초록색 체크)으로 변경되는지 확인 (소요시간: 1분~15분).
2. **무료 SSL 자동 발급**:
   - Let's Encrypt 기반 TLS 1.3 암호화 인증서가 자동 발급되며, 만료 30일 전 자동 갱신.
3. **HTTP to HTTPS 강제 리다이렉트**:
   - `http://`로 접속하는 모든 사용자를 `https://` 보안 연결로 자동 전환.

---

## 4. 모니터링 및 운영 관리 계획

1. **지속적 통합 및 배포 (CI/CD)**:
   - `main` 브랜치에 신규 커밋이 푸시될 때마다 Vercel이 무중단(Zero-downtime)으로 즉시 프로덕션 배포.
2. **사용자 트래픽 및 웹 바이탈 분석**:
   - 기적용된 `@vercel/analytics`를 통해 LCP, FID, CLS 등 핵심 웹 성능 지표(Core Web Vitals) 및 실시간 방문자 통계 모니터링.
3. **장애 대응 및 롤백**:
   - 빌드 실패 또는 이슈 발생 시 Vercel 대시보드의 `Deployments` 탭에서 이전 성공 버전으로 1초 만에 `Instant Rollback` 지원.

---

## 5. 작업 일정 및 체크리스트

| 순번 | 작업 항목 | 담당 | 완료 기준 | 상태 |
| :---: | :--- | :---: | :--- | :---: |
| 1 | GitHub 저장소 코드 푸시 | 개발/운영 | `ncia/claimexpert` main 브랜치 최신화 | **완료** |
| 2 | Vercel 프로젝트 생성 & 배포 | 운영자 | 기본 `*.vercel.app` 정상 작동 확인 | 대기 |
| 3 | 커스텀 도메인 DNS 레코드 등록 | 운영자 | 도메인 관리처 A / CNAME 레코드 입력 | 대기 |
| 4 | 도메인 검증 & HTTPS 연결 확인 | 운영자 | `https://[도메인]` 정상 접속 확인 | 대기 |
