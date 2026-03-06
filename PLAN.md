# 테트리스 게임 개발 기획안 (Tetris Game Plan)

본 프로젝트는 현대적인 감각의 웹 기반 테트리스 게임을 개발하고, Git과 Vercel을 통해 배포하는 것을 목표로 합니다.

## 1. 기술 스택 (Tech Stack)
*   **프레임워크:** React (TypeScript) - 상태 관리와 UI 컴포넌트화에 최적화
*   **스타일링:** Vanilla CSS - 가볍고 빠른 스타일링 (네온 스타일 디자인)
*   **버전 관리:** Git & GitHub
*   **배포:** Vercel - 자동 배포(CI/CD) 지원

## 2. 주요 기능 (Key Features)
*   **게임 엔진:**
    *   10x20 표준 테트리스 보드 구현
    *   7가지 테트로미노(I, J, L, O, S, T, Z) 및 SRS(Super Rotation System) 회전 구현
    *   충돌 감지 및 라인 클리어 로직
*   **사용자 경험(UX):**
    *   키보드 조작 (좌우 이동, 하단 가속, 하드 드롭, 회전)
    *   다음에 나올 블록(Next Piece) 미리보기
    *   점수 및 레벨 시스템 (라인 제거 시 속도 증가)
    *   Game Over 화면 및 재시작 기능
*   **비주얼:**
    *   다크 모드 배경에 테두리가 빛나는 네온 컬러 블록
    *   라인 클리어 시 간단한 애니메이션 효과

## 3. 개발 단계 (Roadmap)
1.  **Phase 1: 환경 설정** - 프로젝트 초기화 (React + TS) 및 Git 저장소 연결
2.  **Phase 2: 기본 UI** - 게임 보드 및 사이드바 레이아웃 구성
3.  **Phase 3: 핵심 로직** - 블록 생성, 이동, 충돌 감지 알고리즘 구현
4.  **Phase 4: 게임 시스템** - 점수 계산, 레벨업, 게임 종료 로직 추가
5.  **Phase 5: 배포** - GitHub Push 및 Vercel 연동

## 4. Git 및 배포 전략 (Git & Deployment)
*   **Git:** 기능 단위의 커밋 메시지 작성 (예: `feat: add collision detection logic`)
*   **Vercel:** GitHub 저장소 연동을 통한 자동 빌드 및 배포 환경 구축
