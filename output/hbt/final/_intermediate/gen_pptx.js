"use strict";
const pptxgen = require("pptxgenjs");

// ─── Font size helper (min 12pt enforced) ───────────────────────────────────
const MIN_FONT = 12;
const fs12 = (size) => {
  if (size < MIN_FONT) throw new Error(`fontSize ${size} < ${MIN_FONT}pt prohibited`);
  return size;
};

// ─── Color palette (NO # prefix) ─────────────────────────────────────────────
const C = {
  // Primary
  darkBrown:  "2C2926",
  green:      "059669",
  teal:       "0D9488",
  textBody:   "505060",
  textSec:    "59636E",
  textTert:   "6B6B7B",
  white:      "FFFFFF",
  // Accents
  blue:       "4472C4",
  orange:     "ED7D31",
  gray:       "A5A5A5",
  gold:       "FFC000",
  lightBlue:  "5B9BD5",
  greenAcc:   "70AD47",
  // Card / UI
  cardBg:     "F5F5F7",
  cardBdr:    "DDDDE0",
  tblHdr:     "E2EEF9",
  hlBox:      "CCFBF1",
  darkSlate:  "404155",
  divider:    "E2E8F0",
  // Card grid headers
  pyBlue:     "3776AB",
  dkGreen:    "1A6E36",
  dkOrange:   "C0530A",
  dkTeal:     "1A5E7E",
  dkRed:      "8B1A1A",
  // Flow steps
  step2:      "0284C7",
  step3:      "D97706",
  step4:      "DC2626",
  step5:      "7C3AED",
  // Cyan for title slide
  cyan:       "00BBFF",
  // Amber
  amber:      "D97706",
  // Light gray bg
  lightGray:  "F5F5F7",
};

// ─── Shared style helpers ─────────────────────────────────────────────────────
const SLIDE_W = 10;    // inches (LAYOUT_16x9 = 10 × 5.625)
const SLIDE_H = 5.625;
const MARGIN  = 0.4;   // left/right margin
const CONTENT_W = SLIDE_W - MARGIN * 2;
const HEADER_H  = 0.65;
const FOOTER_Y  = 5.28;
const CONTENT_Y = 0.72; // top of content area (below header)

const makeShadow = () => ({ type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.10 });

function addBackground(slide) {
  slide.addShape("rect", {
    x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
    fill: { color: C.white }, line: { color: C.white, width: 0 }
  });
}

function addHeader(slide, title, badgeText, badgeColor) {
  // Header title
  slide.addText(title, {
    x: MARGIN, y: 0.12, w: badgeText ? CONTENT_W - 2.2 : CONTENT_W, h: HEADER_H - 0.1,
    fontFace: "Arial", fontSize: fs12(22), bold: true, color: C.darkBrown,
    valign: "middle", margin: 0
  });
  // Section badge
  if (badgeText) {
    slide.addShape("roundRect", {
      x: SLIDE_W - MARGIN - 2.1, y: 0.16, w: 2.1, h: 0.38,
      fill: { color: badgeColor || C.green }, rectRadius: 0.05,
      line: { color: badgeColor || C.green, width: 0 }
    });
    slide.addText(badgeText, {
      x: SLIDE_W - MARGIN - 2.1, y: 0.16, w: 2.1, h: 0.38,
      fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.white,
      align: "center", valign: "middle", margin: 0
    });
  }
  // Divider line
  slide.addShape("rect", {
    x: MARGIN, y: HEADER_H, w: CONTENT_W, h: 0.02,
    fill: { color: C.divider }, line: { color: C.divider, width: 0 }
  });
}

function addFooter(slide, pageNum) {
  slide.addShape("rect", {
    x: 0, y: FOOTER_Y, w: SLIDE_W, h: 0.345,
    fill: { color: "F0F0F0" }, line: { color: "E2E8F0", width: 0 }
  });
  slide.addText("무단전재 및 배포 금지", {
    x: MARGIN, y: FOOTER_Y + 0.03, w: CONTENT_W - 1, h: 0.29,
    fontFace: "Arial", fontSize: fs12(12), color: C.textTert, valign: "middle", margin: 0
  });
  if (pageNum) {
    slide.addText(String(pageNum), {
      x: SLIDE_W - MARGIN - 0.5, y: FOOTER_Y + 0.03, w: 0.5, h: 0.29,
      fontFace: "Arial", fontSize: fs12(12), color: C.textTert,
      align: "right", valign: "middle", margin: 0
    });
  }
}

// Draw a card (rect with optional header bar)
function addCard(slide, x, y, w, h, headerText, headerColor, bodyLines, bodyFontSize) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: C.cardBg },
    line: { color: C.cardBdr, width: 1 },
    shadow: makeShadow()
  });
  let bodyY = y;
  if (headerText) {
    const barH = 0.32;
    slide.addShape("rect", {
      x, y, w, h: barH,
      fill: { color: headerColor || C.pyBlue },
      line: { color: headerColor || C.pyBlue, width: 0 }
    });
    slide.addText(headerText, {
      x: x + 0.08, y, w: w - 0.16, h: barH,
      fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.white,
      valign: "middle", margin: 0
    });
    bodyY = y + barH;
  }
  if (bodyLines && bodyLines.length > 0) {
    const bfs = bodyFontSize || 12;
    const textItems = bodyLines.map((line, i) => ({
      text: line,
      options: { breakLine: i < bodyLines.length - 1 }
    }));
    slide.addText(textItems, {
      x: x + 0.12, y: bodyY + 0.08,
      w: w - 0.24, h: h - (headerText ? 0.32 : 0) - 0.16,
      fontFace: "Arial", fontSize: fs12(bfs), color: C.textSec,
      valign: "top", margin: 0
    });
  }
}

// Draw a highlight box
function addHighlight(slide, x, y, w, h, lines, fontSize) {
  slide.addShape("roundRect", {
    x, y, w, h,
    fill: { color: C.hlBox }, rectRadius: 0.07,
    line: { color: "99E6D8", width: 1 }
  });
  const items = lines.map((l, i) => ({ text: l, options: { breakLine: i < lines.length - 1 } }));
  slide.addText(items, {
    x: x + 0.12, y: y + 0.06, w: w - 0.24, h: h - 0.12,
    fontFace: "Arial", fontSize: fs12(fontSize || 12), color: C.darkBrown,
    valign: "middle", margin: 0
  });
}

// Draw a dark badge
function addDarkBadge(slide, x, y, w, h, text, fontSize) {
  slide.addShape("roundRect", {
    x, y, w, h,
    fill: { color: C.darkSlate }, rectRadius: 0.06,
    line: { color: C.darkSlate, width: 0 }
  });
  slide.addText(text, {
    x: x + 0.08, y, w: w - 0.16, h,
    fontFace: "Arial", fontSize: fs12(fontSize || 12), bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0
  });
}

// Draw a green badge (section call-out)
function addGreenBadge(slide, x, y, w, h, text, color, fontSize) {
  slide.addShape("roundRect", {
    x, y, w, h,
    fill: { color: color || C.green }, rectRadius: 0.06,
    line: { color: color || C.green, width: 0 }
  });
  slide.addText(text, {
    x: x + 0.08, y, w: w - 0.16, h,
    fontFace: "Arial", fontSize: fs12(fontSize || 12), bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0
  });
}

// Simple table helper
function addTable(slide, rows, x, y, w, colWidths, rowH, fontSize) {
  const fs = fontSize || 12;
  const tableData = rows.map((row, ri) =>
    row.map((cell) => {
      const isHeader = ri === 0;
      return {
        text: cell,
        options: {
          fill: { color: isHeader ? C.tblHdr : C.white },
          color: C.darkBrown,
          bold: isHeader,
          fontSize: fs12(fs),
          fontFace: "Arial",
          align: "left",
          valign: "middle",
          margin: [3, 5, 3, 5]
        }
      };
    })
  );
  const totalRows = rows.length;
  slide.addTable(tableData, {
    x, y, w, h: totalRows * rowH,
    colW: colWidths,
    border: { pt: 0.5, color: C.divider },
    rowH
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "AM 전환 전략 보고서 — HBT";
  pres.author = "AM 전략팀 (한지민 외 6인)";

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — 제목 슬라이드
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    sl.background = { color: C.cyan };

    // Dark overlay strip at bottom
    sl.addShape("rect", {
      x: 0, y: 3.8, w: SLIDE_W, h: 1.825,
      fill: { color: "007AA3" }, line: { color: "007AA3", width: 0 }
    });

    // Top accent bar
    sl.addShape("rect", {
      x: 0, y: 0, w: SLIDE_W, h: 0.12,
      fill: { color: C.green }, line: { color: C.green, width: 0 }
    });

    // Main title
    sl.addText("AM 전환 전략 보고서", {
      x: MARGIN, y: 1.1, w: CONTENT_W, h: 1.0,
      fontFace: "Arial", fontSize: fs12(40), bold: true, color: C.white,
      align: "center", valign: "middle", margin: 0
    });

    // Subtitle
    sl.addText("HBT(하이브리지텔레콤) 경영진 발표", {
      x: MARGIN, y: 2.2, w: CONTENT_W, h: 0.5,
      fontFace: "Arial", fontSize: fs12(18), color: C.white,
      align: "center", valign: "middle", margin: 0
    });

    // Decorative line
    sl.addShape("rect", {
      x: 3.5, y: 2.85, w: 3.0, h: 0.04,
      fill: { color: C.white }, line: { color: C.white, width: 0 }
    });

    // Bottom info
    sl.addText([
      { text: "작성일: 2026년 4월 18일  |  버전: v1.0  |  스폰서: CEO · CFO · CIO 공동", options: { breakLine: true } },
      { text: "대표 집필: 이서윤 (AM 전략 리드)  |  공동: 한지민 · 박도현 · 정민호 · 최재원 · 윤하늘 · 강연우" }
    ], {
      x: MARGIN, y: 3.9, w: CONTENT_W, h: 0.7,
      fontFace: "Arial", fontSize: fs12(12), color: C.white,
      align: "center", valign: "middle", margin: 0
    });

    addFooter(sl, 1);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — Executive Summary
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "Executive Summary — 한 페이지 브리핑", null, null);

    // Key quote badge
    const qBadgeY = 0.75;
    sl.addShape("roundRect", {
      x: MARGIN, y: qBadgeY, w: CONTENT_W, h: 0.52,
      fill: { color: C.green }, rectRadius: 0.06,
      line: { color: C.green, width: 0 }
    });
    sl.addText(
      "\"AM 전환 없이 AI 투자 ROI는 0. HBT는 3년 403~835억을 투자해 연 1,117~1,708억의 기술부채·AI 기회비용을 상환한다.\"",
      {
        x: MARGIN + 0.12, y: qBadgeY, w: CONTENT_W - 0.24, h: 0.52,
        fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.white,
        align: "center", valign: "middle", margin: 0
      }
    );

    // Main summary table
    const tRows = [
      ["구분", "핵심 메시지", "핵심 수치"],
      ["왜 (WHY)", "Lead Time 22주(글로벌 하위 2%) · IT 운영비 증가율이 매출의 4배 · AI 도구만 도입 시 ROI ≈ 0", "4S+혁신 5개 동인 전부 AM 필수 판정"],
      ["얼마 (BUDGET)", "3년 누적 투자 403~835억 · 기술부채 연 890~1,600억 상환", "BEP 1.8~4.2년 · 5년 ROI 498~593%"],
      ["언제 (WHEN)", "Phase 0~4, 30~42개월 · 파일럿 2개 (DLR-PORTAL 1호 · PROD-CAT 2호)", "게이트 5개, DORA 5메트릭 GO/NO-GO"],
      ["어떻게 (HOW)", "6R 상세(Rearch 6 + Rebuild 3 = 9) AI 7역량 활성화 · 5 회의체 · 6 가드레일", "8 Bounded Context, VSM 22주→1~7일"],
      ["위험 (RISK)", "Top 5 리스크 (BILL-KT의존 · AI Rework · 동시 Rearch · IDP SPOF · AI ROI 스폰서십)", "21개 리스크 매트릭스 · 월간 리뷰"],
    ];
    addTable(sl, tRows, MARGIN, 1.35, CONTENT_W, [1.3, 5.0, 2.9], 0.52, 12);

    // Bottom decisions badge
    addDarkBadge(sl, MARGIN, 4.6, CONTENT_W, 0.38,
      "의사결정 요청: Phase 0 착수 승인  |  CFO 공동 스폰서십 확정  |  리스크·거버넌스 위원회 발족 (2026.05.15 이전)", 12);

    addFooter(sl, 2);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — WHY 1/3 — 5개 동인
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "WHY — 5개 동인 전수 검사 (4S+혁신)", "WHY ①", C.green);

    const cardW = (CONTENT_W - 0.12 * 4) / 5;
    const cardH = 3.6;
    const cards = [
      { title: "Speedy", color: C.pyBlue, lines: ["Lead Time 22주", "(글로벌 하위 2%)", "", "경쟁사 대비", "5~10배 느림", "", "→ 필수"] },
      { title: "Service Always", color: C.dkGreen, lines: ["장애 복구 4.8시간", "CFR 24%", "", "SLA 위반 연 12건", "(DORA 하위 40%)", "", "→ 필수"] },
      { title: "Save Cost", color: C.dkOrange, lines: ["IT 운영비 +7.3%", "매출 증가 +1.8%", "(4배 격차)", "", "3년 후 영업이익률", "-2.1%p 위기", "", "→ 필수"] },
      { title: "Security", color: C.dkTeal, lines: ["CVE 미패치 137건", "SAST 자동화 0%", "", "금감원 2026", "제재 후보", "", "→ 필수"] },
      { title: "혁신 (AI)", color: C.dkRed, lines: ["AI Copilot ROI", "측정 불가 (2025)", "", "AI 투자 자체가", "좌초 위험", "", "→ 필수"] },
    ];
    const cardY = 0.80;
    cards.forEach((card, i) => {
      const x = MARGIN + i * (cardW + 0.12);
      addCard(sl, x, cardY, cardW, cardH, card.title, card.color, card.lines, 12);
    });

    addHighlight(sl, MARGIN, 4.55, CONTENT_W, 0.45,
      ["5개 동인 모두 \"얼마나 빨리 해야 하는가\"의 문제 — 출처: DORA 2025 · 행정안전부 2026.03.11"]);

    addFooter(sl, 3);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — WHY 2/3 — DORA 정량화
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "DORA 2025 — HBT L1 정량 목표 (글로벌 4,997명 기반)", "WHY ②", C.green);

    const tRows = [
      ["지표", "HBT 현재", "Conservative (1년)", "Base (2년)", "Optimistic (3년)", "DORA 글로벌"],
      ["Deployment Freq.", "월 1~2회", "주 1회", "주 3~5회", "일 1회+", "Top 44.6% = 일 1회"],
      ["Lead Time", "22주 (하위 2%)", "4주", "1주", "1일 이내", "Top 24.4% = 1일 이내"],
      ["Recovery Time", "4.8시간", "2시간", "1시간", "30분 이내", "Top 21.3% = 1시간 이내"],
      ["Change Fail Rate", "24%", "15~18%", "10~14%", "8% 이하", "Top 36.2% = 8% 이하"],
      ["Rework Rate", "측정 미흡", "15~20%", "10~14%", "8% 이하", "Top 20.1% = 4% 이하"],
    ];
    addTable(sl, tRows, MARGIN, 0.78, CONTENT_W, [1.8, 1.2, 1.5, 1.2, 1.5, 1.98], 0.56, 12);

    // 3 info cards below
    const cW = (CONTENT_W - 0.2) / 3;
    const cY = 4.15;
    const infoCards = [
      { title: "DORA 2025", color: C.pyBlue, lines: ["4,997명 설문", "속도와 안정성은", "트레이드오프 아님", "(Cluster 6·7 상위 40%)"] },
      { title: "HBT 현재 위치", color: C.dkRed, lines: ["글로벌 하위 2%", "(Lead Time 22주)", "Cluster 2", "Legacy Bottleneck 33%"] },
      { title: "3년 목표", color: C.dkGreen, lines: ["Phase 4 완료 시", "Top 24.4% 진입", "Cluster 6/7", "50% 이상"] },
    ];
    infoCards.forEach((c, i) => {
      addCard(sl, MARGIN + i * (cW + 0.1), cY, cW, 1.1, c.title, c.color, c.lines, 12);
    });

    addFooter(sl, 4);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — WHY 3/3 — 왜 지금인가
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "왜 지금인가 — 연기 비용 > 투자 비용 (2026년부터 영구 성립)", "WHY ③", C.green);

    // Left: flow steps
    const steps = [
      { color: C.green,  text: "AM을 1년 늦출 때마다..." },
      { color: C.step2,  text: "기술부채 연 +10~20% 누증 (AI 시대 +20%)" },
      { color: C.step3,  text: "1년 지연 = 178~240억 손실 (Base 시나리오)" },
      { color: C.step4,  text: "경쟁사 대비 시장점유율 -0.3~-0.7%p/년" },
      { color: C.step5,  text: "\"연기 비용 > 투자 비용\" 2026년부터 영구 성립" },
    ];
    const stepW = 4.55;
    const stepH = 0.52;
    const stepX = MARGIN;
    steps.forEach((s, i) => {
      const sy = 0.82 + i * (stepH + 0.1);
      sl.addShape("roundRect", {
        x: stepX, y: sy, w: stepW, h: stepH,
        fill: { color: s.color }, rectRadius: 0.08,
        line: { color: s.color, width: 0 }
      });
      sl.addText(s.text, {
        x: stepX + 0.12, y: sy, w: stepW - 0.24, h: stepH,
        fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.white,
        valign: "middle", margin: 0
      });
    });

    // Right: Sponsorship table
    const tRows = [
      ["레벨", "스폰서", "역할", "HBT 현황"],
      ["L1", "CEO", "전사 비전·우선순위", "2026.Q1 킥오프 완료"],
      ["L2", "CFO (핵심)", "TCO·BEP 추적", "스폰서십 레터 필요"],
      ["L3", "CIO + 사업부장 4인", "Phase별 실행 승인", "워킹그룹 구성 중"],
    ];
    const tX = MARGIN + stepW + 0.25;
    const tW = CONTENT_W - stepW - 0.25;
    addTable(sl, tRows, tX, 0.82, tW, [0.5, 1.4, 1.6, 1.4], 0.52, 12);

    addHighlight(sl, tX, 3.1, tW, 0.75,
      ["CFO 공동 스폰서십 = 전체 프로그램 최대 성공 변수", "(2022년 디지털혁신 좌초 원인 1위: 재무 본부 미참여)"]);

    // Time cost comparison
    addHighlight(sl, MARGIN, 4.5, stepW, 0.55,
      ["시간 할인 역설: AM 1년 지연 비용 > AM 투자 비용", "3년 기술부채 2,670~4,800억 vs 투자 403~835억"]);

    addFooter(sl, 5);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — 현황 진단 1/3 — 인벤토리 · ABC 등급
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "현황 진단 — 24개 시스템 인벤토리 · A/B/C 등급", "현황 ①", C.teal);

    // 3 KPI cards top
    const kpiW = (CONTENT_W - 0.2) / 3;
    const kpiH = 0.8;
    const kpiY = 0.82;
    const kpis = [
      { label: "총 시스템", val: "24개 · 8 서브도메인" },
      { label: "연 운영비", val: "620억 (인건비 포함)" },
      { label: "Cluster 2 비율", val: "33% — 글로벌 평균 1.5배" },
    ];
    kpis.forEach((k, i) => {
      const kx = MARGIN + i * (kpiW + 0.1);
      sl.addShape("roundRect", {
        x: kx, y: kpiY, w: kpiW, h: kpiH,
        fill: { color: C.tblHdr }, rectRadius: 0.07,
        line: { color: "B8D4EF", width: 1 }
      });
      sl.addText(k.label, {
        x: kx + 0.1, y: kpiY + 0.06, w: kpiW - 0.2, h: 0.3,
        fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.teal,
        valign: "middle", margin: 0
      });
      sl.addText(k.val, {
        x: kx + 0.1, y: kpiY + 0.38, w: kpiW - 0.2, h: 0.38,
        fontFace: "Arial", fontSize: fs12(13), bold: true, color: C.darkBrown,
        valign: "middle", margin: 0
      });
    });

    // ABC table
    const tRows = [
      ["등급", "정의", "시스템 수", "DORA 클러스터"],
      ["A (핵심·긴급)", "비즈니스 Critical + 기술 악화", "12개", "Cluster 2 (Legacy Bottleneck) + Cluster 4"],
      ["B (중요·안정)", "비즈니스 중요 + 기술 양호", "9개", "Cluster 5/6"],
      ["C (저우선)", "비즈니스 저가치 또는 Retire 후보", "3개", "Cluster 1"],
    ];
    addTable(sl, tRows, MARGIN, 1.75, CONTENT_W, [1.5, 2.8, 1.1, 3.78], 0.56, 12);

    // Hotspot card
    const hY = 4.05;
    sl.addShape("rect", {
      x: MARGIN, y: hY, w: CONTENT_W, h: 0.75,
      fill: { color: C.cardBg }, line: { color: C.cardBdr, width: 1 }
    });
    sl.addShape("rect", {
      x: MARGIN, y: hY, w: CONTENT_W, h: 0.28,
      fill: { color: C.dkOrange }, line: { color: C.dkOrange, width: 0 }
    });
    sl.addText("의존성 핫스팟 Top 5 (가장 많은 의존 연결)", {
      x: MARGIN + 0.1, y: hY, w: CONTENT_W - 0.2, h: 0.28,
      fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.white, valign: "middle", margin: 0
    });
    sl.addText("CRM  ·  BILL  ·  IDP  ·  PAY  ·  DW  — 24개 시스템 중 가장 많은 의존 연결 (Rearchitect/Rebuild 우선 대상)", {
      x: MARGIN + 0.1, y: hY + 0.32, w: CONTENT_W - 0.2, h: 0.38,
      fontFace: "Arial", fontSize: fs12(12), color: C.textBody, valign: "middle", margin: 0
    });

    addFooter(sl, 6);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 7 — 현황 진단 2/3 — 건강도 · 기술부채
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "건강도 스코어카드 · 기술부채 연 890~1,600억", "현황 ②", C.teal);

    const leftW = 4.2;
    const rightW = CONTENT_W - leftW - 0.25;
    const startY = 0.82;

    // Left: health card
    sl.addShape("rect", {
      x: MARGIN, y: startY, w: leftW, h: 3.6,
      fill: { color: C.cardBg }, line: { color: C.cardBdr, width: 1 }
    });
    sl.addShape("rect", {
      x: MARGIN, y: startY, w: leftW, h: 0.35,
      fill: { color: C.dkTeal }, line: { color: C.dkTeal, width: 0 }
    });
    sl.addText("건강도 12차원 스코어카드 결과", {
      x: MARGIN + 0.1, y: startY, w: leftW - 0.2, h: 0.35,
      fontFace: "Arial", fontSize: fs12(13), bold: true, color: C.white, valign: "middle", margin: 0
    });

    const scores = [
      { label: "양호 (Green)", count: "5개 시스템", color: "22C55E" },
      { label: "보통 (Yellow)", count: "12개 시스템", color: "EAB308" },
      { label: "취약 (Red)", count: "7개 시스템", color: "EF4444" },
    ];
    scores.forEach((s, i) => {
      const sy = startY + 0.5 + i * 0.62;
      sl.addShape("roundRect", {
        x: MARGIN + 0.15, y: sy, w: 0.4, h: 0.4,
        fill: { color: s.color }, rectRadius: 0.05, line: { color: s.color, width: 0 }
      });
      sl.addText(s.label, {
        x: MARGIN + 0.65, y: sy, w: leftW - 0.8, h: 0.4,
        fontFace: "Arial", fontSize: fs12(13), bold: true, color: C.darkBrown, valign: "middle", margin: 0
      });
      sl.addText(s.count, {
        x: MARGIN + 0.65, y: sy + 0.3, w: leftW - 0.8, h: 0.3,
        fontFace: "Arial", fontSize: fs12(12), color: C.textSec, valign: "middle", margin: 0
      });
    });

    sl.addText([
      { text: "4 기존 차원: 비즈니스 가치·기술 품질·데이터 결합도·운영 안정성", options: { breakLine: true } },
      { text: "DORA 8차원: 7 AI 역량 + 12 플랫폼 특성 집계" }
    ], {
      x: MARGIN + 0.12, y: startY + 2.35, w: leftW - 0.24, h: 0.7,
      fontFace: "Arial", fontSize: fs12(12), color: C.textSec, valign: "top", margin: 0
    });

    // Right: tech debt table
    const tX = MARGIN + leftW + 0.25;
    const tRows = [
      ["기술부채 항목", "연 비용"],
      ["레거시 유지보수 오버헤드", "210~350억"],
      ["장애·SLA 위약금", "430~1,140억"],
      ["보안 취약점 대응 지연", "80~130억"],
      ["신규 기능 기회비용", "150~280억"],
      ["인력 이탈·채용 난항", "70~120억"],
      ["AI ROI 잠금 기회비용", "200~400억 (별도)"],
      ["합 계", "890~1,600억"],
    ];
    addTable(sl, tRows, tX, startY, rightW, [3.3, 1.78], 0.46, 12);

    addHighlight(sl, tX, startY + 3.8, rightW, 0.42,
      ["운영비 620억 대비 기술부채 2.6배 — 운영비보다 기술부채가 더 큰 실제 비용"]);

    addHighlight(sl, MARGIN, startY + 3.72, leftW, 0.52,
      ["Cluster 2 (Legacy Bottleneck) 33%", "DORA 글로벌 평균 대비 1.5배 높음"]);

    addFooter(sl, 7);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 8 — 현황 진단 3/3 — 6R 분포 · Bounded Context
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "6R·TIME 매칭 결과 · 8 Bounded Context", "현황 ③", C.teal);

    const cW = (CONTENT_W - 0.2) / 3;
    const cH = 3.6;
    const cY = 0.82;
    const cards3 = [
      {
        title: "Rearchitect + Rebuild = 9개",
        color: C.dkRed,
        lines: [
          "Rearchitect 6건:", "BILL-MF, CRM, PAY,", "ORD, NMS, DW", "",
          "Rebuild 3건:", "IDP, FLT, STL", "",
          "→ AI 7역량 전체 활성화", "(AI ROI 잠금 해소 최대)"
        ]
      },
      {
        title: "Refactor + Replatform = 9개",
        color: C.dkGreen,
        lines: [
          "Refactor 6건:", "PROD-CAT, MY-APP,", "BI-REP, CNTR-MGT,", "CMP-MGT, CSC-WEB", "",
          "Replatform 3건:", "DLR-PORTAL,", "INV-RES, CC-IVR"
        ]
      },
      {
        title: "Repurchase + Retire + Retain = 6개",
        color: C.pyBlue,
        lines: [
          "Repurchase 1건:", "SFA-ENT (Salesforce)", "",
          "Retire 2건:", "COLL-LGC, IDC-OPS 후속", "",
          "Retain 3건:", "REC-AI, CLD-PLAT, IDC-OPS"
        ]
      },
    ];
    cards3.forEach((c, i) => {
      addCard(sl, MARGIN + i * (cW + 0.1), cY, cW, cH, c.title, c.color, c.lines, 12);
    });

    // 8 BC badges
    const bcY = 4.52;
    sl.addShape("rect", {
      x: MARGIN, y: bcY, w: CONTENT_W, h: 0.38,
      fill: { color: C.darkSlate }, line: { color: C.darkSlate, width: 0 }
    });
    const bcs = ["고객관리", "상품카탈로그", "요금빌링", "결제정산", "네트워크운영", "콜센터VOC", "분석BI", "공통관리"];
    sl.addText("8 Bounded Context:  " + bcs.join("  ·  "), {
      x: MARGIN + 0.1, y: bcY, w: CONTENT_W - 0.2, h: 0.38,
      fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.white,
      align: "center", valign: "middle", margin: 0
    });

    addFooter(sl, 8);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 9 — 전략 6R 1/3 — 매핑 매트릭스
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "6R 전략 매핑 — 24개 시스템 전수", "전략 ①", C.blue);

    const tRows = [
      ["6R", "시스템 수", "AI 7역량 활성화", "대표 시스템", "TIME"],
      ["Rearchitect", "6개", "7/7 전체 (AI ROI 최대)", "BILL-MF, CRM, PAY, ORD, NMS, DW", "Invest"],
      ["Rebuild", "3개", "7/7 전체", "IDP, DW, FLT, STL", "Invest"],
      ["Refactor", "6개", "4~5/7", "PROD-CAT, MY-APP, BI-REP 등", "Invest/Migrate"],
      ["Replatform", "3개", "3~4/7", "DLR-PORTAL, INV-RES, CC-IVR", "Migrate"],
      ["Repurchase", "1개", "SaaS 의존", "SFA-ENT (Salesforce)", "Migrate"],
      ["Retire / Retain", "5개", "0~1/7", "COLL-LGC, IDC-OPS, REC-AI 등", "Eliminate/Tolerate"],
    ];
    addTable(sl, tRows, MARGIN, 0.82, CONTENT_W, [1.5, 1.0, 2.2, 2.9, 1.58], 0.54, 12);

    addHighlight(sl, MARGIN, 4.5, CONTENT_W * 0.62, 0.42,
      ["Rehost 0건 — \"Lift & Shift는 AI ROI 잠금 해소 효과 거의 없음\" (DORA 2025 §06)"]);

    // VSM badge
    addDarkBadge(sl, MARGIN + CONTENT_W * 0.63, 4.5, CONTENT_W * 0.37, 0.42,
      "VSM: 22주 → 1~7일 (-95~99%)", 12);

    addFooter(sl, 9);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 10 — 전략 6R 2/3 — 파일럿 선정
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "Phase 1' 파일럿 2개 선정 — 전환 플레이북 검증", "전략 ②", C.blue);

    const cardW = (CONTENT_W - 0.25) / 2;
    const cH = 3.7;
    const cY = 0.82;

    // Pilot 1: DLR-PORTAL
    addCard(sl, MARGIN, cY, cardW, cH, "파일럿 1호 ⭐ DLR-PORTAL (대리점 포털)", C.green, null, 12);
    const p1Lines = [
      "6R: Refactor  |  기간: 3~5개월",
      "비즈니스 가치 A등급 (BV 5.00)",
      "파일럿 리스크 프로파일 B (이중 축 병기)",
      "독립 DB · 롤백 용이 (Feature Toggle)",
      "대리점 9,500명 + 신규가입 70% 경로",
      "Spring Boot 2.5 + Vue.js 2 · Git운영 중",
      "DORA 5메트릭 베이스라인 측정 가능",
      "→ 8/8 선정 기준 전부 충족",
    ];
    sl.addText(p1Lines.map((l, i) => ({ text: l, options: { breakLine: i < p1Lines.length - 1 } })), {
      x: MARGIN + 0.12, y: cY + 0.45, w: cardW - 0.24, h: cH - 0.57,
      fontFace: "Arial", fontSize: fs12(12), color: C.textSec, valign: "top", margin: 0
    });

    // Pilot 2: PROD-CAT
    addCard(sl, MARGIN + cardW + 0.25, cY, cardW, cH, "파일럿 2호 PROD-CAT (상품 카탈로그)", C.step2, null, 12);
    const p2Lines = [
      "6R: Replatform  |  기간: 2~4개월",
      "B등급 · Cluster 5 Stable · 독립 DB",
      "Oracle → PostgreSQL Blue-Green 가능",
      "신상품 출시 리드 2개월 → 2주 측정 가능",
      "BILL-MF 독립성 확보 (Strangler Fig)",
      "AI 컨텍스트로 즉시 활용 가능",
      "Spring Boot 2.3 이미 현대적",
      "→ 8/8 선정 기준 전부 충족",
    ];
    sl.addText(p2Lines.map((l, i) => ({ text: l, options: { breakLine: i < p2Lines.length - 1 } })), {
      x: MARGIN + cardW + 0.37, y: cY + 0.45, w: cardW - 0.24, h: cH - 0.57,
      fontFace: "Arial", fontSize: fs12(12), color: C.textSec, valign: "top", margin: 0
    });

    addDarkBadge(sl, MARGIN, 4.62, CONTENT_W, 0.4,
      "핫스팟 배제 원칙: CRM·ORD·BILL·STL·PAY·DW → 학습 손실 시 매출 중단 리스크 → Phase 2~3 본격 전환", 12);

    addFooter(sl, 10);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 11 — 전략 6R 3/3 — AI 3-Bucket · 거버넌스
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "AI 정책 3-Bucket · 5 거버넌스 회의체", "전략 ③", C.blue);

    // 3 bucket cards
    const cW = (CONTENT_W - 0.2) / 3;
    const cH = 2.4;
    const cY = 0.82;
    const buckets = [
      {
        title: "Allowed (저위험·고가치) — 15항목",
        color: C.dkGreen,
        lines: ["보일러플레이트 생성", "내부 설계 문서 요약", "테스트 코드 초안 생성", "비독점 데이터 브레인스토밍", "비독점 회의록 요약"]
      },
      {
        title: "Permitted w/ Guardrails (조건부) — 8항목",
        color: C.dkOrange,
        lines: ["사내 AI 도구로만 독점 소스 코드 사용", "AI 생성 코드 human-in-the-loop 필수", "PII 마스킹 후 활용", "PR 라인 수 < 300 강제"]
      },
      {
        title: "Prohibited (금지) — 10항목",
        color: C.dkRed,
        lines: ["고객 PII/영업비밀 공개 AI 입력", "보안 키/비밀번호 프롬프트 포함", "규제 데이터 외부 전송", "KT 표준 프로토콜 변경"]
      },
    ];
    buckets.forEach((b, i) => {
      addCard(sl, MARGIN + i * (cW + 0.1), cY, cW, cH, b.title, b.color, b.lines, 12);
    });

    // Governance table
    const tRows = [
      ["회의체", "주기", "주요 역할"],
      ["Steering", "월 1회", "전략·예산·우선순위·AI 정책 정기 안건"],
      ["Working Group", "주 1회", "실행 조정·VSM 분기 1회 재매핑"],
      ["ARB (Architecture Review Board)", "2주 1회", "아키텍처 승인·12 플랫폼 특성 게이트"],
      ["Risk Committee", "월 1회", "리스크 추적·에스컬레이션·AI 도입 메트릭"],
      ["Cost Committee", "분기 1회", "TCO·BEP 추적·AI 인프라 비용 분리"],
    ];
    addTable(sl, tRows, MARGIN, 3.35, CONTENT_W, [2.8, 1.0, 5.38], 0.44, 12);

    addFooter(sl, 11);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 12 — 로드맵 1/2 — Phase 0~4 간트
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "Phase 0~4 마스터 로드맵 (30~42개월)", "로드맵 ①", C.orange);

    const phases = [
      { label: "Phase 0  분석·기반", period: "2026.05 ~ 2026.09  (4~6개월)", color: C.green,  detail: "12 플랫폼 자가평가 · VSM · 7 AI 역량 베이스라인 · AI 정책 초안 · SonarQube 실측" },
      { label: "Phase 1  Quick Win", period: "2026.08 ~ 2027.04  (6~10개월)", color: C.step2,  detail: "파일럿 2개 + IDP-SSO Replatform + 8개 Quick Win · 플랫폼 MVP 구축" },
      { label: "Phase 2  Core Rearch", period: "2027.01 ~ 2028.06  (14~18개월)", color: C.step3,  detail: "Refactor 3 + Rearchitect 5 + Replace 1 = 9개 시스템 · CRM·ORD·NMS·DW 등" },
      { label: "Phase 3  Rebuild", period: "2027.10 ~ 2029.03  (16~20개월)", color: C.step4,  detail: "FLT-MGT Rebuild + BILL-MF Rebuild (Critical Path 24~36개월) · AI 활성화" },
      { label: "Phase 4  Sustain", period: "2028.09 ~ 2029.09  (10~14개월)", color: C.step5,  detail: "STL-MF Rebuild · 전사 안정화 · AI 7역량 완성 · Cluster 6/7 50% 진입" },
    ];

    phases.forEach((p, i) => {
      const py = 0.82 + i * 0.78;
      const barW = 2.2;
      sl.addShape("roundRect", {
        x: MARGIN, y: py, w: barW, h: 0.55,
        fill: { color: p.color }, rectRadius: 0.07,
        line: { color: p.color, width: 0 }
      });
      sl.addText(p.label, {
        x: MARGIN + 0.08, y: py, w: barW - 0.16, h: 0.55,
        fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.white, valign: "middle", margin: 0
      });
      sl.addText(p.period, {
        x: MARGIN + barW + 0.15, y: py, w: 2.6, h: 0.55,
        fontFace: "Arial", fontSize: fs12(12), color: C.textTert, valign: "middle", margin: 0
      });
      sl.addText(p.detail, {
        x: MARGIN + barW + 2.8, y: py, w: CONTENT_W - barW - 2.95, h: 0.55,
        fontFace: "Arial", fontSize: fs12(12), color: C.textBody, valign: "middle", margin: 0
      });
    });

    addHighlight(sl, MARGIN, 4.72, CONTENT_W, 0.58,
      ["Critical Path: BILL-MF Rebuild (24~36개월) — Phase 0부터 도메인 KT 16주 선행 필수",
       "Phase 1 시스템 수: 파일럿 2개  |  Phase 2: 9개  |  Phase 3: 3개  |  Phase 4: 2개+안정화"]);

    addFooter(sl, 12);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 13 — 로드맵 2/2 — 게이트 조건
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "Phase 게이트 5개 — DORA 5메트릭 GO/NO-GO", "로드맵 ②", C.orange);

    const tRows = [
      ["게이트", "시점", "GO 조건 (AND)", "NO-GO 시 대응"],
      ["G0 → G1", "2026.10", "12 플랫폼 특성 자가평가 완료 + AI 정책 3-Bucket 승인 + VSM 매핑 완료", "Phase 0 연장 2~3개월"],
      ["G1 → G2", "2027.06", "파일럿 2개 DORA 5메트릭 ≥ 1단계 향상 + Rollback 5분 이내 + CFR ≤ 15%", "파일럿 추가 최대 4개"],
      ["G2 → G3", "2028.06", "플랫폼 12특성 평균 \"Moderately\" + BILL-MF 분해 50%+ + 7 AI 역량 베이스라인", "Phase 2 연장 3~6개월 + Critical Path 재설계"],
      ["G3 → G4", "2029.03", "AI 역량 평균 ≥ \"평균\" + AI ROI 측정 가능 + Cluster 6/7 진입 ≥ 30%", "AI 도입 속도 재조정"],
      ["G4 완료", "2029.10", "Cluster 6/7 진입 ≥ 50% + DORA 5메트릭 전 Top 50% + TCO 절감 Base 7%+", "Phase 4 연장 + 근본원인 분석"],
    ];
    addTable(sl, tRows, MARGIN, 0.82, CONTENT_W, [0.9, 0.8, 4.85, 2.63], 0.56, 12);

    // Escalation badges
    const badgeY = 4.56;
    const badgeW = (CONTENT_W - 0.2) / 3;
    const escBadges = [
      { color: "22C55E", text: "Green: 계획대로 → 월간 리뷰만" },
      { color: C.step3,  text: "Yellow: 1~2개 미달 → Working Group 주 1회 집중" },
      { color: C.step4,  text: "Red: 3개+ 미달 → Steering 72시간 이내 소집" },
    ];
    escBadges.forEach((b, i) => {
      sl.addShape("roundRect", {
        x: MARGIN + i * (badgeW + 0.1), y: badgeY, w: badgeW, h: 0.42,
        fill: { color: b.color }, rectRadius: 0.06,
        line: { color: b.color, width: 0 }
      });
      sl.addText(b.text, {
        x: MARGIN + i * (badgeW + 0.1) + 0.08, y: badgeY, w: badgeW - 0.16, h: 0.42,
        fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.white,
        align: "center", valign: "middle", margin: 0
      });
    });

    addFooter(sl, 13);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 14 — TCO/BEP 1/3 — 3 시나리오 투자 규모
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "3년 투자 규모 — 3 시나리오 (Conservative / Base / Optimistic)", "예산 ①", C.gold);

    // Key message badge
    addGreenBadge(sl, MARGIN, 0.82, CONTENT_W, 0.48,
      "3년 기술부채 누적 2,670~4,800억  vs.  AM 전환 투자 403~835억 — 전환 안 하는 비용이 전환 비용의 최대 5.8배",
      C.green, 12);

    const tRows = [
      ["시나리오", "3년 투자 총액", "Phase 0", "Phase 1", "Phase 2", "Phase 3", "Phase 4"],
      ["Conservative", "403억", "35억", "58억", "142억", "112억", "55.7억"],
      ["Base (플래닝 기준)", "620억", "47.5억", "89억", "218.5억", "172.6억", "92억"],
      ["Optimistic", "835억", "60억", "120억", "295억", "233억", "127.4억"],
    ];
    addTable(sl, tRows, MARGIN, 1.42, CONTENT_W, [2.2, 1.4, 0.85, 0.85, 1.2, 1.1, 1.58], 0.56, 12);

    // Usage guide cards
    const cW = (CONTENT_W - 0.2) / 3;
    const cY = 3.22;
    const guidCards = [
      { title: "Conservative", color: C.dkTeal, lines: ["예산 확정 기준", "403억 / BEP 4.2년", "5년 ROI 498%"] },
      { title: "Base (권장)", color: C.dkGreen, lines: ["플래닝 기준 (권장)", "620억 / BEP 2.9년", "5년 ROI 514%"] },
      { title: "Optimistic", color: C.dkOrange, lines: ["성과 압박 기준", "835억 / BEP 1.8년", "5년 ROI 593%"] },
    ];
    guidCards.forEach((c, i) => {
      addCard(sl, MARGIN + i * (cW + 0.1), cY, cW, 1.2, c.title, c.color, c.lines, 13);
    });

    addFooter(sl, 14);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 15 — TCO/BEP 2/3 — As-Is vs To-Be · BEP
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "As-Is vs To-Be TCO · BEP 시점 (3 시나리오)", "예산 ②", C.gold);

    const leftW = 5.1;
    const rightW = CONTENT_W - leftW - 0.25;
    const startY = 0.82;

    // Left: TCO comparison table
    const tRows = [
      ["항목", "As-Is (연간)", "To-Be (연간)", "절감률"],
      ["서버·스토리지", "280억", "45~60억", "-78~83%"],
      ["라이선스", "180억", "70~95억", "-47~61%"],
      ["운영 인건비", "620억", "220~290억", "-53~64%"],
      ["플랫폼 팀 (신규)", "0", "38~62억", "신규"],
      ["AI 도구·인프라 (신규)", "0", "20~40억", "신규"],
      ["장애·SLA 위약금", "430~1,140억", "0~15억", "-99%"],
      ["총 계", "1,510~2,220억", "393~512억", "-74~77%"],
    ];
    addTable(sl, tRows, MARGIN, startY, leftW, [2.0, 1.3, 1.1, 0.72], 0.49, 12);

    // Right: BEP cards
    const bepCards = [
      { title: "Conservative", color: C.dkTeal, lines: ["BEP: 4.2년", "5년 순이익: 2,407억", "5년 ROI: 498%"] },
      { title: "Base (권장)", color: C.dkGreen, lines: ["BEP: 2.9년", "5년 순이익: 3,810억", "5년 ROI: 514%"] },
      { title: "Optimistic", color: C.dkOrange, lines: ["BEP: 1.8년", "5년 순이익: 5,785억", "5년 ROI: 593%"] },
    ];
    const bepCardH = 1.08;
    bepCards.forEach((c, i) => {
      addCard(sl, MARGIN + leftW + 0.25, startY + i * (bepCardH + 0.1), rightW, bepCardH,
        c.title, c.color, c.lines, 13);
    });

    addHighlight(sl, MARGIN, 4.62, CONTENT_W, 0.44,
      ["5년 이내 모든 시나리오 투자 원금 회수 + 순이익 2,407~5,785억  |  행정안전부 7년 18.4% TCO 절감 실증 (공공 기준)"]);

    addFooter(sl, 15);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 16 — TCO/BEP 3/3 — AI ROI 잠금 해소 · 벤치마크
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "AI ROI 잠금 해소 — AM의 핵심 추가 효익 · 외부 벤치마크 3종 검증", "예산 ③", C.gold);

    const leftW = 5.1;
    const rightW = CONTENT_W - leftW - 0.25;
    const startY = 0.82;

    // Left: AI ROI table
    const tRows = [
      ["시나리오", "AI 활용 가능 시스템", "연 추가 효익", "3년 누적"],
      ["Conservative", "9개 (Rearch 6 + Rebuild 3)", "120억", "360억"],
      ["Base", "15개 (+ Refactor 6)", "240억", "720억"],
      ["Optimistic", "22개 (거의 전체)", "360억", "1,080억"],
    ];
    addTable(sl, tRows, MARGIN, startY, leftW, [1.4, 1.9, 0.95, 0.87], 0.56, 12);

    // DORA quote
    sl.addShape("roundRect", {
      x: MARGIN, y: startY + 2.35, w: leftW, h: 1.45,
      fill: { color: C.hlBox }, rectRadius: 0.07,
      line: { color: "99E6D8", width: 1 }
    });
    sl.addText([
      { text: "\"An investment in AI without a corresponding investment in", options: { breakLine: true } },
      { text: "high-quality platforms is unlikely to yield significant returns", options: { breakLine: true } },
      { text: "at the organizational level.\"", options: { breakLine: true } },
      { text: "— DORA 2025 Platform Engineering Chapter (Figure 49)", options: { italic: true } }
    ], {
      x: MARGIN + 0.12, y: startY + 2.45, w: leftW - 0.24, h: 1.25,
      fontFace: "Arial", fontSize: fs12(12), color: C.darkBrown,
      valign: "top", margin: 0
    });

    // Right: Benchmark cards
    const bmCards = [
      { title: "행정안전부 2026.03.11", color: C.dkGreen, lines: ["7년 누적 TCO 18.4% 절감", "장애율 81% 감소", "배포 속도 114% 향상", "출처: 과기관계장관회의 발표"] },
      { title: "근로복지공단 2025.12.23", color: C.pyBlue, lines: ["Lead Time 23배 단축", "HBT 22주→7일 = 22배 (일치)", "출처: 행안부 성과보고회"] },
      { title: "HBT 보수 적용", color: C.dkOrange, lines: ["Base 7~10% × 7년 ≈ 17~20%", "행안부 실증치 이내 (합리적)", "Conservative 절감 ≥ 17% 기대"] },
    ];
    const bmH = 1.25;
    bmCards.forEach((c, i) => {
      addCard(sl, MARGIN + leftW + 0.25, startY + i * (bmH + 0.12), rightW, bmH, c.title, c.color, c.lines, 12);
    });

    addFooter(sl, 16);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 17 — 리스크 1/2 — Top 5 히트맵
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "21개 리스크 · 9셀 매트릭스 · Top 5 심층 분석", "리스크 ①", C.step4);

    // 9-cell risk matrix
    const matX = MARGIN;
    const matY = 0.82;
    const cellW = 2.9;
    const cellH = 0.96;

    // Row labels (impact)
    const rowLabels = ["High (300억+·6M+)", "Med (50~300억·1~6M)", "Low (<50억·<1M)"];
    const colLabels = ["High 확률 (70%+)", "Med 확률 (30~70%)", "Low 확률 (<30%)"];

    // Header row
    sl.addText("영향도 \\ 발생확률", {
      x: matX, y: matY, w: 0.88, h: 0.42,
      fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.darkBrown,
      align: "center", valign: "middle", margin: 0
    });
    colLabels.forEach((c, i) => {
      sl.addShape("rect", {
        x: matX + 0.9 + i * (cellW + 0.04), y: matY, w: cellW, h: 0.42,
        fill: { color: C.tblHdr }, line: { color: C.divider, width: 0.5 }
      });
      sl.addText(c, {
        x: matX + 0.9 + i * (cellW + 0.04), y: matY, w: cellW, h: 0.42,
        fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.darkBrown,
        align: "center", valign: "middle", margin: 0
      });
    });

    // Matrix cells
    const matrixData = [
      // High × High, High × Med, High × Low
      [
        { color: C.step4, items: ["R-P-02 BILL 지식 승계 실패 (가중 9)", "R-D-01 AI Rework 폭증 (가중 9)"] },
        { color: C.step3, items: ["R-T-02 동시Rearch 병목 (가중 8)", "R-D-02 IDP SPOF (가중 8)", "R-B-01 AI ROI 스폰서십 이탈 (가중 8)"] },
        { color: C.gold,  items: ["R-P-01 BILL Critical Path (가중 3)", "R-B-03 매출확정 오류 (가중 3)"] },
      ],
      // Med × High, Med × Med, Med × Low
      [
        { color: C.amber, items: ["R-O-01 18% 이직·채용 실패", "R-T-04 FLT 보안 취약점 노출"] },
        { color: "D1D5DB", items: ["R-T-01 Teradata 락인", "R-T-05 IDP 60+앱 연동 실패", "R-T-06 DW ETL 리드 유지", "R-P-03 파일럿 NO-GO"] },
        { color: "D1FAE5", items: ["R-T-03 Strangler Fig 실패", "R-P-04 COBOL 인력 충돌", "R-O-04 정산사 15개 갱신"] },
      ],
      // Low × High, Low × Med, Low × Low
      [
        { color: "FED7AA", items: ["R-O-03 DORA 설문 저조"] },
        { color: "D1FAE5", items: ["R-P-05 SonarQube 지연", "R-O-02 NOC 변화 저항"] },
        { color: "F0FDF4", items: ["R-B-02 번호이동 유출 지속"] },
      ],
    ];

    matrixData.forEach((row, ri) => {
      // Row label
      sl.addShape("rect", {
        x: matX, y: matY + 0.44 + ri * (cellH + 0.04), w: 0.88, h: cellH,
        fill: { color: C.tblHdr }, line: { color: C.divider, width: 0.5 }
      });
      sl.addText(rowLabels[ri], {
        x: matX, y: matY + 0.44 + ri * (cellH + 0.04), w: 0.88, h: cellH,
        fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.darkBrown,
        align: "center", valign: "middle", margin: 0
      });

      row.forEach((cell, ci) => {
        const cx = matX + 0.9 + ci * (cellW + 0.04);
        const cy = matY + 0.44 + ri * (cellH + 0.04);
        const isDark = [C.step4, C.step3, C.amber, C.step3].includes(cell.color);
        sl.addShape("rect", {
          x: cx, y: cy, w: cellW, h: cellH,
          fill: { color: cell.color }, line: { color: C.divider, width: 0.5 }
        });
        const textItems = cell.items.map((item, idx) => ({
          text: item, options: { breakLine: idx < cell.items.length - 1 }
        }));
        sl.addText(textItems, {
          x: cx + 0.06, y: cy + 0.05, w: cellW - 0.12, h: cellH - 0.1,
          fontFace: "Arial", fontSize: fs12(12),
          color: isDark ? C.white : C.darkBrown,
          valign: "top", margin: 0
        });
      });
    });

    // Phase 1 risk note
    addDarkBadge(sl, MARGIN, 4.68, CONTENT_W, 0.38,
      "Phase 1 가중합 32 (최대) — IDP·파일럿·AI 3대 리스크 동시 착수  |  Phase 1 게이트(2027.04)가 프로그램 전체 운명의 분기점", 12);

    addFooter(sl, 17);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 18 — 리스크 2/2 — 가드레일 6종
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "6 가드레일 · Top 5 리스크 완화 전략", "리스크 ②", C.step4);

    // 6 guardrail cards (2 rows × 3)
    const cW = (CONTENT_W - 0.2) / 3;
    const cH = 1.42;
    const guards = [
      { title: "SAST (정적 보안)", color: C.dkGreen, lines: ["Phase 1: 파일럿 100%", "Phase 2: Phase 2 시스템 100%", "Phase 3+: 전사 지속"] },
      { title: "SCA (오픈소스 취약점)", color: C.dkGreen, lines: ["Phase 1: 파일럿 100%", "Phase 2: Phase 2 시스템 100%", "Phase 3+: 전사 지속"] },
      { title: "회귀 테스트 자동화", color: C.pyBlue, lines: ["Phase 1: 70%+", "Phase 2: 85%+", "Phase 3: 90%+  |  Phase 4: 95%+"] },
      { title: "Contract Test", color: C.pyBlue, lines: ["Phase 1: 파일럿 API 100%", "Phase 2: 핵심 API 100%", "Phase 3+: 전사 지속"] },
      { title: "DAST (동적 보안)", color: C.dkOrange, lines: ["Phase 1: 파일럿 주 1회", "Phase 2: Phase 2 주 1회", "Phase 3+: 전사 지속"] },
      { title: "Chaos Engineering", color: C.dkRed, lines: ["Phase 2: 핵심 시스템부터", "Phase 3: 전사 월 1회", "Phase 4: 주 1회"] },
    ];
    guards.forEach((g, i) => {
      const row = Math.floor(i / 3);
      const col = i % 3;
      addCard(sl, MARGIN + col * (cW + 0.1), 0.82 + row * (cH + 0.1), cW, cH, g.title, g.color, g.lines, 12);
    });

    // Escalation table
    const tRows = [
      ["색", "기준", "조치", "책임자"],
      ["Green", "모든 게이트 조건 충족, 메트릭 계획대로", "월간 리뷰만 유지", "PMO"],
      ["Yellow", "1~2개 메트릭 미달, Phase 내 회복 가능", "Working Group 주 1회 집중 · Risk Committee 보고", "PMO + 리드"],
      ["Red", "3개+ 미달 또는 Critical Path 지연", "Steering 임시 소집 (72시간 이내) · Phase 재수립", "CIO + CFO"],
    ];
    addTable(sl, tRows, MARGIN, 3.14, CONTENT_W, [0.8, 2.8, 3.4, 1.18], 0.48, 12);

    addFooter(sl, 18);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 19 — 변화관리
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "변화관리 — Phase × 6축 매트릭스 · AI Mirror", "변화관리", C.lightBlue);

    const tRows = [
      ["축", "Phase 0", "Phase 1", "Phase 2", "Phase 3", "Phase 4"],
      ["커뮤니케이션", "14 이해관계자 2x2 매핑", "파일럿 성공 스토리 공유", "BILL-MF 분해 주간 공개", "AI Mirror 배포", "Town Hall 분기"],
      ["교육", "DORA 설문·12 플랫폼 워크숍", "Trunk-based·Small Batch 교육", "전사 AI 3-Bucket 교육", "RAG·MCP 활용 교육", "CoP 주도 학습"],
      ["조직", "워킹그룹·CoP 준비", "플랫폼 팀 시드 4명", "플랫폼 팀 4→10명", "4개 CoP 활성화", "페더레이션 모델"],
      ["프로세스", "VSM As-Is 매핑", "GitOps·Feature Toggle", "Contract Test·DAST 전사", "Canary·Blue-Green 표준화", "지속 개선 공정"],
      ["문화", "\"Celebrate Progress\" 선언", "\"Embrace Failure\" 공유", "Hackathon 분기 1회", "Failure Share 월 1회", "3대 원칙 내재화"],
      ["측정", "DORA 5 베이스라인", "파일럿 메트릭 주간", "H.E.A.R.T. 측정", "7 AI 역량 반기 평가", "Cluster 6/7 진입률"],
    ];
    addTable(sl, tRows, MARGIN, 0.82, CONTENT_W, [1.3, 1.6, 1.6, 1.6, 1.3, 1.38], 0.48, 12);

    // AI Mirror quote
    sl.addShape("roundRect", {
      x: MARGIN, y: 4.6, w: CONTENT_W, h: 0.62,
      fill: { color: C.hlBox }, rectRadius: 0.07,
      line: { color: "99E6D8", width: 1 }
    });
    sl.addText([
      { text: "\"AI는 조직의 강점을 증폭하고 약점도 증폭함. ", options: { bold: true } },
      { text: "볼 준비가 된 조직에게 AI는 로드맵이 됨.\" — DORA 2025 The AI Mirror Chapter" }
    ], {
      x: MARGIN + 0.12, y: 4.64, w: CONTENT_W - 0.24, h: 0.54,
      fontFace: "Arial", fontSize: fs12(12), color: C.darkBrown, valign: "middle", margin: 0
    });

    addFooter(sl, 19);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 20 — 결론 1/2 — 의사결정 요청
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "의사결정 요청 — 경영진 5가지 승인 요청", "결론 ①", C.green);

    const cW = (CONTENT_W - 0.4) / 5;
    const cH = 3.55;
    const cY = 0.82;
    const decisions = [
      {
        title: "① Phase 0\n착수 승인",
        color: C.green,
        lines: ["6개월", "35~60억", "2026.05.01~", "2026.10.31", "", "12 플랫폼 특성 자가평가", "DORA 베이스라인 확보"]
      },
      {
        title: "② G0→G1\n자동 승인 조건",
        color: C.step2,
        lines: ["DORA 5메트릭", "베이스라인 완료", "12 플랫폼 특성", "자가평가 완료", "", "G0→G1 게이트 조건", "사전 합의"]
      },
      {
        title: "③ CFO\n공동 스폰서십",
        color: C.step3,
        lines: ["TCO·BEP 추적", "주관", "월간 CFO", "브리핑 정기화", "", "4,500억 예산", "집행 공동 책임"]
      },
      {
        title: "④ 리스크\n위원회 발족",
        color: C.step4,
        lines: ["2026.05.15 이전", "", "5 회의체 체계", "가동", "", "21개 리스크", "정량 트리거 관리"]
      },
      {
        title: "⑤ 변화관리\n예산 신설",
        color: C.step5,
        lines: ["전체의 8~12%", "32~100억", "", "별도 계정 신설", "", "조직 변화관리", "조기 착수"]
      },
    ];
    decisions.forEach((d, i) => {
      const x = MARGIN + i * (cW + 0.1);
      sl.addShape("rect", {
        x, y: cY, w: cW, h: cH,
        fill: { color: C.cardBg }, line: { color: C.cardBdr, width: 1 }, shadow: makeShadow()
      });
      sl.addShape("rect", {
        x, y: cY, w: cW, h: 0.6,
        fill: { color: d.color }, line: { color: d.color, width: 0 }
      });
      sl.addText(d.title, {
        x: x + 0.05, y: cY, w: cW - 0.1, h: 0.6,
        fontFace: "Arial", fontSize: fs12(12), bold: true, color: C.white,
        align: "center", valign: "middle", margin: 0
      });
      sl.addText(d.lines.map((l, idx) => ({ text: l, options: { breakLine: idx < d.lines.length - 1 } })), {
        x: x + 0.07, y: cY + 0.68, w: cW - 0.14, h: cH - 0.78,
        fontFace: "Arial", fontSize: fs12(12), color: C.textSec, valign: "top", margin: 0
      });
    });

    addDarkBadge(sl, MARGIN, 4.47, CONTENT_W, 0.38,
      "2026.05.01 Phase 0 착수  →  2026.10 G0 게이트  →  2027.06 G1 게이트  →  2029.10 프로그램 완료", 12);

    addFooter(sl, 20);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 21 — 결론 2/2 — 최종 선언
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "HBT는 볼 준비가 된 조직", "결론 ②", C.green);

    // Large DORA quote
    sl.addShape("roundRect", {
      x: MARGIN, y: 0.82, w: CONTENT_W, h: 1.9,
      fill: { color: C.hlBox }, rectRadius: 0.1,
      line: { color: "99E6D8", width: 1.5 }
    });
    sl.addText([
      { text: "\"In 2025, the central question for technology leaders is no longer", options: { breakLine: true } },
      { text: "if they should adopt AI, but how to realize its value.", options: { breakLine: true } },
      { text: "AI's primary role in software development is that of an ", options: {} },
      { text: "amplifier", options: { bold: true } },
      { text: ".", options: { breakLine: true } },
      { text: "It magnifies the strengths of high-performing organizations", options: { breakLine: true } },
      { text: "and the dysfunctions of struggling ones.\"", options: { breakLine: true } },
      { text: "— DORA 2025 Executive Summary", options: { italic: true } }
    ], {
      x: MARGIN + 0.2, y: 0.95, w: CONTENT_W - 0.4, h: 1.65,
      fontFace: "Arial", fontSize: fs12(13), color: C.darkBrown,
      align: "center", valign: "middle", margin: 0
    });

    // 3 KPI badges
    const kwW = (CONTENT_W - 0.2) / 3;
    const kwY = 2.85;
    const kws = [
      { label: "투자 규모", val: "403~835억" },
      { label: "BEP", val: "1.8~4.2년" },
      { label: "5년 ROI", val: "498~593%" },
    ];
    kws.forEach((k, i) => {
      sl.addShape("roundRect", {
        x: MARGIN + i * (kwW + 0.1), y: kwY, w: kwW, h: 0.92,
        fill: { color: C.green }, rectRadius: 0.08,
        line: { color: C.green, width: 0 }
      });
      sl.addText(k.label, {
        x: MARGIN + i * (kwW + 0.1) + 0.1, y: kwY + 0.04, w: kwW - 0.2, h: 0.3,
        fontFace: "Arial", fontSize: fs12(12), color: C.white,
        align: "center", valign: "middle", margin: 0
      });
      sl.addText(k.val, {
        x: MARGIN + i * (kwW + 0.1) + 0.1, y: kwY + 0.38, w: kwW - 0.2, h: 0.48,
        fontFace: "Arial", fontSize: fs12(24), bold: true, color: C.white,
        align: "center", valign: "middle", margin: 0
      });
    });

    // Final declaration
    sl.addShape("rect", {
      x: MARGIN, y: 3.95, w: CONTENT_W, h: 0.72,
      fill: { color: C.darkBrown }, line: { color: C.darkBrown, width: 0 }
    });
    sl.addText([
      { text: "\"AM 없는 AI ROI는 0. HBT는 지금 시작함.\"", options: { bold: true, breakLine: true } },
      { text: "— 2026.04.18  |  AM 전략팀 일동  |  근거: DORA 2025 · 행정안전부 2026.03.11 · 근로복지공단 사례" }
    ], {
      x: MARGIN + 0.12, y: 3.98, w: CONTENT_W - 0.24, h: 0.66,
      fontFace: "Arial", fontSize: fs12(12), color: C.white,
      align: "center", valign: "middle", margin: 0
    });

    addFooter(sl, 21);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 22 — 부록 A — DORA 핵심 메시지 5장
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "DORA 2025 경영진 핵심 메시지 5장", "부록 A", C.darkSlate);

    const cW = (CONTENT_W - 0.4) / 5;
    const cH = 3.85;
    const cY = 0.82;
    const doraCards = [
      {
        title: "① 속도·안정성은 트레이드오프 아님",
        color: C.pyBlue,
        lines: ["상위 40%", "(Cluster 6·7)는", "속도와 안정성", "모두 우수함.", "", "DORA 2025", "Cluster 분포"]
      },
      {
        title: "② 20%는 이미 도달",
        color: C.dkGreen,
        lines: ["Harmonious", "high-achiever", "(Cluster 7) —", "글로벌 20%가", "이미 달성.", "", "비현실적 목표 아님"]
      },
      {
        title: "③ AI는 증폭기",
        color: C.dkOrange,
        lines: ["AI magnifies", "the strengths of", "high performers", "and the", "dysfunctions of", "struggling ones.", "— DORA 2025"]
      },
      {
        title: "④ AM 없는 AI = ROI 0",
        color: C.dkRed,
        lines: ["AI without", "high-quality", "platforms unlikely", "to yield returns.", "", "Figure 49", "직접 인용"]
      },
      {
        title: "⑤ AI Mirror — 로드맵",
        color: C.dkTeal,
        lines: ["For organizations", "ready to look,", "the reflection AI", "offers becomes", "a roadmap.", "", "— DORA 2025"]
      },
    ];
    doraCards.forEach((d, i) => {
      addCard(sl, MARGIN + i * (cW + 0.1), cY, cW, cH, d.title, d.color, d.lines, 12);
    });

    // Get better badge
    addGreenBadge(sl, MARGIN, 4.76, CONTENT_W, 0.38,
      "\"Get better at getting better.\" — DORA 핵심 슬로건  |  출처: DORA 2025 State of DevOps Report (dora.dev) · DORA AI Capabilities Model Guide 2025.12",
      C.darkSlate, 12);

    addFooter(sl, 22);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 23 — 부록 B — 용어집 · 참고문헌
  // ════════════════════════════════════════════════════════════════════════════
  {
    const sl = pres.addSlide();
    addBackground(sl);
    addHeader(sl, "주요 용어집 · 참고문헌", "부록 B", C.darkSlate);

    const leftW = 5.5;
    const rightW = CONTENT_W - leftW - 0.25;
    const startY = 0.82;

    // Terms table
    const termRows = [
      ["용어", "정의"],
      ["AM", "Application Modernization — 레거시 시스템을 현대적 아키텍처로 전환"],
      ["6R", "Retain·Rehost·Replatform·Refactor·Rearchitect·Rebuild·Retire"],
      ["DORA 5메트릭", "Deployment Freq. · Lead Time · CFR · Recovery Time · Rework Rate"],
      ["Strangler Fig", "레거시 주변에 새 시스템을 점진 배치 후 대체 (Martin Fowler)"],
      ["BEP", "Break-Even Point — 투자 회수 시점"],
      ["TCO", "Total Cost of Ownership — 총소유비용"],
      ["CoP", "Community of Practice — 실천 커뮤니티"],
      ["RAG/MCP", "Retrieval-Augmented Generation / Model Context Protocol"],
      ["3-Bucket", "Allowed · Permitted with Guardrails · Prohibited (DORA AI 정책)"],
    ];
    addTable(sl, termRows, MARGIN, startY, leftW, [1.35, 4.17], 0.44, 12);

    // References table
    const refRows = [
      ["#", "출처", "발표일"],
      ["1", "DORA 2025 State of DevOps Report (dora.dev)", "2025.10"],
      ["2", "DORA AI Capabilities Model Guide", "2025.12"],
      ["3", "행정안전부 제5회 과학기술관계장관회의 (ddaily.co.kr)", "2026.03.11"],
      ["4", "근로복지공단 AM 사례 성과보고회 (zdnet.co.kr)", "2025.12.23"],
      ["5", "내부 2025 재무제표·IT 성과 리포트", "내부"],
      ["6", "Gartner TIME Matrix / Martin Fowler Strangler Fig", "참고"],
    ];
    addTable(sl, refRows, MARGIN + leftW + 0.25, startY, rightW, [0.3, 2.8, 0.9], 0.44, 12);

    // Review badge
    addHighlight(sl, MARGIN, 4.8, CONTENT_W, 0.38,
      ["검토 결과: APPROVED WITH CONDITIONS (서지환, 전략 감사역) — 보완 2건 반영 완료 · 블로커 0건 · 출처 누락 0건"]);

    addFooter(sl, 23);
  }

  // ─── Write file ──────────────────────────────────────────────────────────────
  const outputPath = "C:\\Users\\hiond\\workshop\\am-strategy\\output\\hbt\\final\\strategy-executive.pptx";
  await pres.writeFile({ fileName: outputPath });
  console.log("SUCCESS: " + outputPath);
}

main().catch(err => { console.error("ERROR:", err); process.exit(1); });
