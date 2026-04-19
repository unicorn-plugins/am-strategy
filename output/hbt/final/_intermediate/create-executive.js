const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak, LevelFormat,
  ExternalHyperlink, TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

// Color palette
const COLORS = {
  navy:    '1F3864',
  blue:    '2E75B6',
  ltblue:  'D6E4F0',
  teal:    '1B6CA8',
  green:   '375623',
  ltgreen: 'E2EFDA',
  red:     'C00000',
  ltred:   'FFE0E0',
  orange:  'BF8F00',
  ltorange:'FFF2CC',
  gray:    '595959',
  ltgray:  'F2F2F2',
  white:   'FFFFFF',
  black:   '000000',
};

// Border helpers
function border(color = 'AAAAAA', size = 4) {
  return { style: BorderStyle.SINGLE, size, color };
}
function cellBorder(color = 'CCCCCC') {
  const b = border(color, 4);
  return { top: b, bottom: b, left: b, right: b };
}

// Text helpers
function run(text, opts = {}) {
  return new TextRun({
    text,
    font: 'Malgun Gothic',
    size: opts.size || 20,
    bold: opts.bold || false,
    italics: opts.italics || false,
    color: opts.color || COLORS.black,
    ...opts,
  });
}

function boldRun(text, opts = {}) {
  return run(text, { bold: true, ...opts });
}

function para(children, opts = {}) {
  const c = Array.isArray(children) ? children : [run(children, opts)];
  return new Paragraph({
    children: c,
    spacing: { before: opts.spaceBefore || 60, after: opts.spaceAfter || 60 },
    alignment: opts.alignment || AlignmentType.LEFT,
    ...opts,
  });
}

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, font: 'Malgun Gothic', size: 32, bold: true, color: COLORS.white })],
    spacing: { before: 240, after: 120 },
    shading: { fill: COLORS.navy, type: ShadingType.CLEAR },
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, font: 'Malgun Gothic', size: 26, bold: true, color: COLORS.navy })],
    spacing: { before: 200, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.blue, space: 2 } },
  });
}

function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, font: 'Malgun Gothic', size: 22, bold: true, color: COLORS.teal })],
    spacing: { before: 160, after: 80 },
  });
}

function callout(text, color = COLORS.ltblue, borderColor = COLORS.blue) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Malgun Gothic', size: 20, italics: true, color: COLORS.navy })],
    spacing: { before: 80, after: 80 },
    indent: { left: 360 },
    border: {
      left: { style: BorderStyle.THICK, size: 12, color: borderColor, space: 4 },
    },
    shading: { fill: color, type: ShadingType.CLEAR },
  });
}

function noteText(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Malgun Gothic', size: 18, color: COLORS.gray, italics: true })],
    spacing: { before: 40, after: 40 },
    indent: { left: 240 },
  });
}

function bulletPara(text, bold_prefix = '', level = 0) {
  const children = [];
  if (bold_prefix) {
    children.push(new TextRun({ text: bold_prefix, font: 'Malgun Gothic', size: 20, bold: true }));
  }
  children.push(new TextRun({ text: bold_prefix ? text : text, font: 'Malgun Gothic', size: 20 }));
  return new Paragraph({
    numbering: { reference: 'bullets', level },
    children: bold_prefix ? [
      new TextRun({ text: bold_prefix, font: 'Malgun Gothic', size: 20, bold: true }),
      new TextRun({ text, font: 'Malgun Gothic', size: 20 }),
    ] : [new TextRun({ text, font: 'Malgun Gothic', size: 20 })],
    spacing: { before: 40, after: 40 },
  });
}

function numberedPara(text, boldPart = '') {
  return new Paragraph({
    numbering: { reference: 'numbered', level: 0 },
    children: boldPart ? [
      new TextRun({ text: boldPart, font: 'Malgun Gothic', size: 20, bold: true }),
      new TextRun({ text, font: 'Malgun Gothic', size: 20 }),
    ] : [new TextRun({ text, font: 'Malgun Gothic', size: 20 })],
    spacing: { before: 40, after: 40 },
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function spacer(before = 120) {
  return new Paragraph({ children: [new TextRun('')], spacing: { before, after: 0 } });
}

// Table helpers
const CONTENT_WIDTH = 8748; // A4 with 1.26cm margins each side

function makeTable(headers, rows, colWidths, headerBg = COLORS.navy, altBg = COLORS.ltgray) {
  const total = colWidths.reduce((a, b) => a + b, 0);
  const b = cellBorder();

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      borders: cellBorder(COLORS.blue),
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: headerBg, type: ShadingType.CLEAR },
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: h, font: 'Malgun Gothic', size: 18, bold: true, color: COLORS.white })],
        spacing: { before: 0, after: 0 },
      })],
    })),
  });

  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, ci) => {
        const isArr = Array.isArray(cell);
        const cellContent = isArr ? cell : [{ text: cell, bold: false }];
        const bg = ri % 2 === 0 ? COLORS.white : altBg;
        return new TableCell({
          borders: b,
          width: { size: colWidths[ci], type: WidthType.DXA },
          shading: { fill: bg, type: ShadingType.CLEAR },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 60, bottom: 60, left: 120, right: 120 },
          children: [new Paragraph({
            children: cellContent.map(({ text, bold, color, size }) =>
              new TextRun({ text: text || '', font: 'Malgun Gothic', size: size || 18, bold: bold || false, color: color || COLORS.black })
            ),
            spacing: { before: 0, after: 0 },
          })],
        });
      }),
    })
  );

  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

function sectionDivider(label) {
  return [
    spacer(160),
    new Paragraph({
      children: [new TextRun({ text: label, font: 'Malgun Gothic', size: 20, bold: true, color: COLORS.white })],
      shading: { fill: COLORS.teal, type: ShadingType.CLEAR },
      spacing: { before: 100, after: 60 },
      indent: { left: 240 },
    }),
  ];
}

// ─── COVER PAGE ───────────────────────────────────────────────────────────────
function makeCoverPage() {
  return [
    spacer(1440),
    new Paragraph({
      children: [new TextRun({ text: 'HBT AM 전환 전략', font: 'Malgun Gothic', size: 56, bold: true, color: COLORS.navy })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: '경영진 요약 보고서', font: 'Malgun Gothic', size: 40, bold: true, color: COLORS.blue })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 160 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Executive Summary', font: 'Arial', size: 28, color: COLORS.gray })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 480 },
    }),
    // Key message box
    new Table({
      width: { size: CONTENT_WIDTH, type: WidthType.DXA },
      columnWidths: [CONTENT_WIDTH],
      rows: [new TableRow({
        children: [new TableCell({
          borders: cellBorder(COLORS.blue),
          shading: { fill: COLORS.ltblue, type: ShadingType.CLEAR },
          margins: { top: 240, bottom: 240, left: 360, right: 360 },
          children: [
            new Paragraph({
              children: [new TextRun({ text: '"AM 전환 없이 AI 투자 ROI는 0.', font: 'Malgun Gothic', size: 24, bold: true, color: COLORS.navy })],
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 80 },
            }),
            new Paragraph({
              children: [new TextRun({ text: 'HBT는 지금 3년 403~835억을 투자해', font: 'Malgun Gothic', size: 24, bold: true, color: COLORS.navy })],
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 80 },
            }),
            new Paragraph({
              children: [new TextRun({ text: '연 1,117~1,600억의 기술부채·AI 기회비용을 상환하고,', font: 'Malgun Gothic', size: 24, bold: true, color: COLORS.navy })],
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 80 },
            }),
            new Paragraph({
              children: [new TextRun({ text: '24개 시스템을 Cluster 6/7(상위 40%) 궤도로 올린다."', font: 'Malgun Gothic', size: 24, bold: true, color: COLORS.navy })],
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 0 },
            }),
          ],
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        })],
      })],
    }),
    spacer(240),
    new Paragraph({
      children: [new TextRun({ text: 'DORA 2025 Figure 49  ·  행정안전부 2026.03.11  ·  근로복지공단 23배 단축 사례 기반', font: 'Malgun Gothic', size: 18, color: COLORS.gray, italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 480 },
    }),
    spacer(480),
    new Paragraph({
      children: [new TextRun({ text: '문서 버전: v1.0  |  2026-04-18  |  검토 상태: APPROVED WITH CONDITIONS (지환 / 전략 감사역)', font: 'Malgun Gothic', size: 18, color: COLORS.gray })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [new TextRun({ text: '대상: HBT(하이브리지텔레콤) 경영진 (CEO · CFO · CIO · 사업부장)', font: 'Malgun Gothic', size: 18, color: COLORS.gray })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
    }),
    pageBreak(),
  ];
}

// ─── EXECUTIVE SUMMARY (p1) ───────────────────────────────────────────────────
function makeExecSummary() {
  return [
    heading1('1장. Executive Summary — 5단 브리핑'),
    spacer(80),
    makeTable(
      ['구분', '핵심 메시지', '핵심 수치'],
      [
        [
          [{ text: '왜 ', bold: true }, { text: 'WHY' }],
          [{ text: 'Lead Time 22주(글로벌 하위 2%) · IT 운영비 증가율(+7.3%)이 매출 증가율(+1.8%)의 4배 · AI 도구만 도입 시 ROI ≈ 0' }],
          [{ text: '4S+혁신 5개 동인 전부 AM 필수 판정' }],
        ],
        [
          [{ text: '얼마 ', bold: true }, { text: 'BUDGET' }],
          [{ text: '3년 누적 투자 ' }, { text: '403~835억', bold: true }, { text: '(Conservative/Base/Optimistic) · 기술부채 연 890~1,600억 상환 · AI ROI 잠금 해소 연 200~400억' }],
          [{ text: 'BEP 1.8~4.2년 · 5년 ROI 498~593%', bold: true }],
        ],
        [
          [{ text: '언제 ', bold: true }, { text: 'WHEN' }],
          [{ text: 'Phase 0~4, 30~42개월', bold: true }, { text: ' · 파일럿 2개(DLR-PORTAL · PROD-CAT) · BILL-MF Critical Path 24~36개월' }],
          [{ text: '게이트 5개, DORA 5메트릭으로 GO/NO-GO' }],
        ],
        [
          [{ text: '어떻게 ', bold: true }, { text: 'HOW' }],
          [{ text: '6R 상세(Rearch 6 + Rebuild 3 = 9개 AI 7역량 전체 활성화) · 5 회의체 · 6 가드레일 · AI 3-Bucket 정책 · 변화관리 Phase × 6축' }],
          [{ text: '8 Bounded Context, VSM 22주→1~7일' }],
        ],
        [
          [{ text: '위험 ', bold: true }, { text: 'RISK' }],
          [{ text: 'Top 5 리스크(BILL-KT 의존 · AI Rework · 동시 Rearch · IDP SPOF · AI ROI 스폰서십) · Phase 1 가중치 32(최대) · 3-색 에스컬레이션' }],
          [{ text: '21개 리스크 매트릭스 · 월간 리뷰' }],
        ],
      ],
      [1400, 4800, 2548],
    ),
    spacer(120),
    heading3('의사결정 요청 사항 (5건)'),
    numberedPara(' Phase 0 착수 승인 (35~60억, 2026.05.01~2026.10.31)', 'Phase 0 착수 승인'),
    numberedPara(' Phase 0 게이트 통과 시 Phase 1 자동 승인 조건 합의 (DORA 5메트릭 베이스라인 + 12 플랫폼 특성 완료)', 'Phase 1 자동 승인 조건 합의'),
    numberedPara(' CFO 공동 스폰서십 확정 (TCO·BEP 추적 주관)', 'CFO 공동 스폰서십 확정'),
    numberedPara(' 리스크·거버넌스 위원회 2026.05.15 이전 발족', '거버넌스 위원회 발족'),
    numberedPara(' 변화관리 예산 별도 계정 신설 (전체의 8~12%, 32~100억)', '변화관리 예산 신설'),
    pageBreak(),
  ];
}

// ─── WHY (pp 2-3) ─────────────────────────────────────────────────────────────
function makeWhySection() {
  return [
    heading1('2~3장. 왜(WHY) — AM 전환의 불가피성'),
    heading2('2장. 5개 동인 — 구조적 위기 진단'),
    makeTable(
      ['#', '동인', 'HBT 현황', 'DORA 2025 포지션', 'AM 필요성'],
      [
        ['1', [{ text: 'Speedy', bold: true }], [{ text: 'Lead Time ', bold: false }, { text: '평균 22주', bold: true }], '글로벌 하위 2% (98%가 1개월 이내)', [{ text: '필수', bold: true, color: COLORS.red }, { text: ' — 경쟁사 대비 5~10배 느림' }]],
        ['2', [{ text: 'Service Always', bold: true }], [{ text: '장애 복구 ', bold: false }, { text: '4.8시간', bold: true }, { text: ', CFR ', bold: false }, { text: '24%', bold: true }], '하위 40%, CFR 상위 62% 구간', [{ text: '필수', bold: true, color: COLORS.red }, { text: ' — SLA 위반 연 12건' }]],
        ['3', [{ text: 'Save Cost', bold: true }], [{ text: 'IT 운영비 ', bold: false }, { text: '+7.3%', bold: true }, { text: ' vs 매출 ', bold: false }, { text: '+1.8%', bold: true }], '4배 격차 지속 시 3년 후 영업이익률 -2.1%p', [{ text: '필수', bold: true, color: COLORS.red }, { text: ' — 비용 구조 붕괴 임박' }]],
        ['4', [{ text: 'Security', bold: true }], [{ text: 'CVE 미패치 ', bold: false }, { text: '137건', bold: true }, { text: ', SAST ', bold: false }, { text: '0%', bold: true }], '금감원 2026 제재 대상 후보', [{ text: '필수', bold: true, color: COLORS.red }, { text: ' — 규제 리스크 정량화' }]],
        ['5', [{ text: '혁신(AI)', bold: true }], [{ text: 'AI Copilot 파일럿 ', bold: false }, { text: 'ROI 측정 불가', bold: true }, { text: ' (2025)' }], 'Figure 49: 플랫폼 품질 없이 ROI ≈ 0', [{ text: '필수', bold: true, color: COLORS.red }, { text: ' — AI 투자 자체가 좌초' }]],
      ],
      [400, 1200, 2200, 2100, 2848],
    ),
    spacer(80),
    callout('결론: 5개 동인 모두 "AM을 해야 한다 / 안 해야 한다"가 아니라 "얼마나 빨리 해야 하는가"의 문제.', COLORS.ltblue, COLORS.blue),
    spacer(120),
    heading2('3장. 3가지 결정 근거 + DORA 핵심 인용'),
    heading3('① DORA 2025 Figure 49 (4,997명 조사)'),
    callout('"An investment in AI without a corresponding investment in high-quality platforms is unlikely to yield significant returns at the organizational level." — DORA 2025 Platform Engineering Chapter', COLORS.ltorange, COLORS.orange),
    para([run('HBT 2025 AI Copilot 파일럿 결과(ROI 측정 불가)는 '), boldRun('예측된 결과'), run('임. AM = AI ROI의 전제조건.')], { spaceBefore: 80 }),
    heading3('② 행정안전부 2026.03.11 외부 검증'),
    bulletPara('7년 누적 TCO 18.4% 절감 (HBT Base 7~10% × 7년 환산 ≈ 17~20%, 일치)', ''),
    bulletPara('장애율 81% 감소 — HBT SLA 위약금 430~1,140억 → 0~15억 (98~99%)', ''),
    bulletPara('배포 속도 114% 향상 — HBT Lead Time 22주→1~7일 = 2,100~15,400% 향상', ''),
    heading3('③ 근로복지공단 사례'),
    bulletPara('Lead Time 23배 단축 (응답시간 4.44초 → 0.19초)', ''),
    bulletPara('HBT 22주 → 7일 = 22배 단축 목표와 일치', ''),
    spacer(80),
    callout('연기 비용 역설: AM을 1년 늦출 때마다 기술부채 연 +10~15% 누증 → 1년 지연 = 178~240억 손실(Base). "연기 비용 > 투자 비용"이 2026년부터 영구 성립.', COLORS.ltred, COLORS.red),
    pageBreak(),
  ];
}

// ─── BUDGET (pp 4-6) ──────────────────────────────────────────────────────────
function makeBudgetSection() {
  return [
    heading1('4~6장. 얼마(TCO/BEP) — 3년 투자 규모와 회수'),
    heading2('4장. 3년 총투자 — 3 시나리오'),
    makeTable(
      ['시나리오', '3년 투자 총액', 'Phase 0', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'],
      [
        [[{ text: 'Conservative', bold: true }], [{ text: '402.7억', bold: true }], '35억', '58억', '142억', '112억', '55.7억'],
        [[{ text: 'Base', bold: true, color: COLORS.blue }], [{ text: '619.6억', bold: true, color: COLORS.blue }], '47.5억', '89억', '218.5억', '172.6억', '92억'],
        [[{ text: 'Optimistic', bold: true }], [{ text: '835.4억', bold: true }], '60억', '120억', '295억', '233억', '127.4억'],
      ],
      [1200, 1400, 900, 900, 1000, 900, 900],
    ),
    spacer(80),
    noteText('경영진 활용 원칙: Base를 플래닝 기준, Conservative를 예산 확정 기준, Optimistic을 성과 압박 기준으로 사용 권장.'),
    spacer(120),
    heading2('5장. BEP · 5년 ROI'),
    makeTable(
      ['시나리오', 'BEP', '5년 누적 효익', '5년 투자', 'ROI'],
      [
        ['Conservative', [{ text: '4.2년', bold: true }], '2,006억', '403억', [{ text: '498%', bold: true }]],
        [[{ text: 'Base', bold: true, color: COLORS.blue }], [{ text: '2.9년', bold: true, color: COLORS.blue }], '2,854억', '620억', [{ text: '460%', bold: true, color: COLORS.blue }]],
        ['Optimistic', [{ text: '1.8년', bold: true }], '4,112억', '835억', [{ text: '593%', bold: true }]],
      ],
      [1600, 1200, 2200, 1400, 1348],
    ),
    spacer(120),
    heading2('6장. To-Be TCO 절감 효과'),
    makeTable(
      ['항목', 'As-Is (연간)', 'To-Be (연간)', '절감률'],
      [
        ['서버·스토리지 (온프레미스)', '280억', '45~60억', '-78~-83%'],
        ['라이선스 (Oracle·WebLogic 등)', '180억', '70~95억', '-47~-61%'],
        ['운영 인건비', '620억', '220~290억', '-53~-64%'],
        ['장애·SLA 위약금', '430~1,140억', '0~15억', [{ text: '-99%', bold: true, color: COLORS.blue }]],
        [[{ text: '총계', bold: true }], [{ text: '1,510~2,220억', bold: true }], [{ text: '393~512억', bold: true }], [{ text: '-74~-77%', bold: true, color: COLORS.blue }]],
      ],
      [3000, 1800, 1800, 1148],
    ),
    spacer(120),
    heading3('AI ROI 잠금 해소 추가 효익'),
    makeTable(
      ['시나리오', 'AI 활용 가능 시스템 수', '연 추가 효익', '3년 누적'],
      [
        ['Conservative', '9개 (Rearch 6 + Rebuild 3)', '120억', [{ text: '360억', bold: true }]],
        [[{ text: 'Base', bold: true, color: COLORS.blue }], '15개 (+ Refactor 6)', '240억', [{ text: '720억', bold: true, color: COLORS.blue }]],
        ['Optimistic', '22개 (거의 전체)', '360억', [{ text: '1,080억', bold: true }]],
      ],
      [1600, 3000, 1400, 1748],
    ),
    pageBreak(),
  ];
}

// ─── PHASE ROADMAP (pp 7-8) ───────────────────────────────────────────────────
function makePhaseSection() {
  return [
    heading1('7~8장. 언제(Phase) — 로드맵 개요'),
    heading2('7장. Phase 0~4 마스터 로드맵 (30~42개월)'),
    // Timeline visual
    new Table({
      width: { size: CONTENT_WIDTH, type: WidthType.DXA },
      columnWidths: [1600, 1600, 1800, 1900, 1848],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorder(COLORS.blue),
              shading: { fill: COLORS.navy, type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: 'Phase 0', font: 'Malgun Gothic', size: 18, bold: true, color: COLORS.white })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 } }),
                new Paragraph({ children: [new TextRun({ text: '4~6개월', font: 'Malgun Gothic', size: 16, color: COLORS.ltblue })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 } }),
                new Paragraph({ children: [new TextRun({ text: '준비·기반', font: 'Malgun Gothic', size: 16, color: COLORS.white })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } }),
              ],
              width: { size: 1600, type: WidthType.DXA },
            }),
            new TableCell({
              borders: cellBorder(COLORS.blue),
              shading: { fill: COLORS.blue, type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: 'Phase 1 + 1\'', font: 'Malgun Gothic', size: 18, bold: true, color: COLORS.white })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 } }),
                new Paragraph({ children: [new TextRun({ text: '6~10개월', font: 'Malgun Gothic', size: 16, color: COLORS.ltblue })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 } }),
                new Paragraph({ children: [new TextRun({ text: 'Quick Win + 파일럿', font: 'Malgun Gothic', size: 16, color: COLORS.white })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } }),
              ],
              width: { size: 1600, type: WidthType.DXA },
            }),
            new TableCell({
              borders: cellBorder(COLORS.blue),
              shading: { fill: COLORS.teal, type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: 'Phase 2', font: 'Malgun Gothic', size: 18, bold: true, color: COLORS.white })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 } }),
                new Paragraph({ children: [new TextRun({ text: '14~18개월', font: 'Malgun Gothic', size: 16, color: COLORS.ltblue })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 } }),
                new Paragraph({ children: [new TextRun({ text: 'Core Rearch', font: 'Malgun Gothic', size: 16, color: COLORS.white })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } }),
              ],
              width: { size: 1800, type: WidthType.DXA },
            }),
            new TableCell({
              borders: cellBorder(COLORS.blue),
              shading: { fill: '1A5276', type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: 'Phase 3', font: 'Malgun Gothic', size: 18, bold: true, color: COLORS.white })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 } }),
                new Paragraph({ children: [new TextRun({ text: '16~20개월', font: 'Malgun Gothic', size: 16, color: COLORS.ltblue })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 } }),
                new Paragraph({ children: [new TextRun({ text: 'Rebuild 주력', font: 'Malgun Gothic', size: 16, color: COLORS.white })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } }),
              ],
              width: { size: 1900, type: WidthType.DXA },
            }),
            new TableCell({
              borders: cellBorder(COLORS.blue),
              shading: { fill: '154360', type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: 'Phase 4', font: 'Malgun Gothic', size: 18, bold: true, color: COLORS.white })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 } }),
                new Paragraph({ children: [new TextRun({ text: '10~14개월', font: 'Malgun Gothic', size: 16, color: COLORS.ltblue })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 } }),
                new Paragraph({ children: [new TextRun({ text: 'Sustain·안정화', font: 'Malgun Gothic', size: 16, color: COLORS.white })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } }),
              ],
              width: { size: 1848, type: WidthType.DXA },
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorder(COLORS.blue),
              shading: { fill: COLORS.ltgray, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: '2026.05\nG0→', font: 'Malgun Gothic', size: 16, color: COLORS.gray })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } })],
              width: { size: 1600, type: WidthType.DXA },
            }),
            new TableCell({
              borders: cellBorder(COLORS.blue),
              shading: { fill: COLORS.ltgray, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: '2026.10\nG1→', font: 'Malgun Gothic', size: 16, color: COLORS.gray })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } })],
              width: { size: 1600, type: WidthType.DXA },
            }),
            new TableCell({
              borders: cellBorder(COLORS.blue),
              shading: { fill: COLORS.ltgray, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: '2027.06\nG2→', font: 'Malgun Gothic', size: 16, color: COLORS.gray })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } })],
              width: { size: 1800, type: WidthType.DXA },
            }),
            new TableCell({
              borders: cellBorder(COLORS.blue),
              shading: { fill: COLORS.ltgray, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: '2028.06\nG3→', font: 'Malgun Gothic', size: 16, color: COLORS.gray })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } })],
              width: { size: 1900, type: WidthType.DXA },
            }),
            new TableCell({
              borders: cellBorder(COLORS.blue),
              shading: { fill: COLORS.ltgray, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: '2029.10\nG4 완료', font: 'Malgun Gothic', size: 16, color: COLORS.gray })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } })],
              width: { size: 1848, type: WidthType.DXA },
            }),
          ],
        }),
      ],
    }),
    spacer(120),
    heading3('Phase별 시스템 배정 요약'),
    makeTable(
      ['Phase', '시스템 수', '6R 분포', '키 시스템'],
      [
        ['Phase 1\' (파일럿)', '2', 'Refactor 1 + Replatform 1', 'DLR-PORTAL, PROD-CAT'],
        ['Phase 1 (Quick Win)', '8', 'Replatform 4 + Rearch 1 + Refactor 1 + Rehost 1 + Retire 1', 'IDP-SSO, PAY-GW 등'],
        [[{ text: 'Phase 2 (Core Rearch)', bold: true }], [{ text: '10', bold: true }], 'Refactor 4 + Rearchitect 5 + Replace 1', 'BILL-MF 선행, CRM, ORD, NMS 등'],
        ['Phase 3 (Rebuild 주력)', '2', 'Rebuild 2', 'FLT-MGT, BILL-MF 본격'],
        ['Phase 4 (Sustain)', '2', 'Rebuild 1 + Replatform 재평가 1', 'STL-MF, IDC-OPS'],
      ],
      [2000, 900, 3300, 2548],
    ),
    spacer(80),
    noteText('Phase 2 시스템 수: 총 10개 (CNTR·CMP·BI·CSC·SFA·CRM·ORD·NMS·PRV·DW) — reviewer 지환 보완 반영. 24개 총합 유지.'),
    spacer(120),
    heading2('8장. 파일럿 2개 + BILL-MF Critical Path'),
    heading3('파일럿 선정 (2개)'),
    makeTable(
      ['순위', '시스템', '6R', '선정 사유', '기간'],
      [
        [
          [{ text: '1호 ★', bold: true, color: COLORS.blue }],
          [{ text: 'DLR-PORTAL', bold: true }],
          'Refactor',
          [{ text: '비즈니스 가치 A / 파일럿 리스크 B (이중 축)', bold: true }, { text: ' · 롤백 용이 · 독립 DB · 대리점 9,500명 · DORA 5메트릭 측정 가능' }],
          '3~5개월',
        ],
        [
          [{ text: '2호', bold: true }],
          [{ text: 'PROD-CAT', bold: true }],
          'Replatform',
          'B등급(Cluster 5) · 독립 DB · Strangler Fig 적용 가능 · 신상품 출시 리드 2개월→2주',
          '2~4개월',
        ],
      ],
      [900, 1400, 1000, 4000, 1100],
    ),
    spacer(80),
    noteText('DLR-PORTAL 등급 이중 표기: step2/2-abc.md 기준 비즈니스 가치 A (BV 5.00), 파일럿 리스크 프로파일 기준 B (핫스팟 아님, 매출 중단 리스크 낮음, 롤백 용이). 두 기준 병기. (reviewer 지환 권고 반영)'),
    spacer(120),
    heading3('BILL-MF Critical Path (24~36개월)'),
    makeTable(
      ['단계', '기간', '주요 내용', '리스크'],
      [
        ['1. 분해 설계', '6~9개월', 'DDD + Event Storming + KT 기술 합의', [{ text: 'KT 표준 의존', bold: true, color: COLORS.red }]],
        ['2. Strangler Fig 1차', '6~9개월', '비의존 도메인(상품·대리점 정산) 선행', 'KT 공동 변경 관리'],
        ['3. Core 분해', '6~12개월', '요금·빌링 엔진 Rearch', [{ text: '24x7 무중단 SLA 99.95%', bold: true, color: COLORS.red }]],
        ['4. Cutover', '6~9개월', '데이터 마이그레이션 + 병행 운영', '회귀 테스트 100% 요구'],
      ],
      [2000, 1200, 3200, 2348],
    ),
    pageBreak(),
  ];
}

// ─── HOW: ARCHITECTURE (pp 9-12) ─────────────────────────────────────────────
function makeHowSection() {
  return [
    heading1('9~12장. 어떻게(6R·파일럿) — 아키텍처·거버넌스·변화관리'),
    heading2('9장. 6R × AI 7역량 매핑'),
    makeTable(
      ['6R', '시스템 수', 'AI 7역량 활성화', '대표 시스템'],
      [
        [[{ text: 'Rearchitect', bold: true, color: COLORS.blue }], [{ text: '6', bold: true }], [{ text: '7/7 전체 활성화 (AI ROI 최대)', bold: true }], 'BILL-MF, CRM, PAY, ORD, NMS, DW'],
        [[{ text: 'Rebuild', bold: true, color: COLORS.blue }], [{ text: '3', bold: true }], [{ text: '7/7 전체 활성화', bold: true }], 'IDP-SSO, FLT-MGT, STL-MF'],
        ['Refactor', '6', '4~5/7 활성화', 'PROD-CAT, CNTR, CMP, BI, CSC, MY-APP'],
        ['Replatform', '3', '3~4/7 활성화', 'DLR-PORTAL, INV-RES, CC-IVR'],
        ['Repurchase', '1', 'SaaS 의존', 'SFA-ENT (Salesforce)'],
        ['Retire/Rehost', '5', '0~1/7', 'COLL-LGC 등'],
      ],
      [1600, 1000, 3000, 3148],
    ),
    spacer(80),
    noteText('규칙 (DORA 2025 §06): "Rehost(Lift & Shift)는 AI ROI 잠금 해소 효과 거의 없음" → HBT 24개 중 Rehost 전략적 최소화 원칙.'),
    spacer(120),
    heading3('Bounded Context 8개 (DDD + Event Storming)'),
    ...['고객 관리 (CRM · IDP · PORTAL · DLR-PORTAL)', '상품·카탈로그 (PROD-CAT · 상품관리)', '요금·빌링 (BILL-MF · 요금엔진)', '결제·정산 (PAY · 정산)', '네트워크 운영 (NMS · 프로비저닝)', '콜센터·VOC (CCC · VOC)', '분석·BI (DW · 리포팅)', '공통·관리 (인사·전자결재·공통)'].map((t, i) => bulletPara(t, `${i+1}. `)),
    spacer(120),
    heading2('10장. VSM 단축 효과 + 거버넌스 5 회의체'),
    heading3('VSM — As-Is 22주 → To-Be 1~7일'),
    makeTable(
      ['가치 흐름 단계', 'As-Is', 'To-Be (Base)', '단축률'],
      [
        ['요구사항 접수·분석', '4주', '3일', '-93%'],
        ['설계', '3주', '2일', '-90%'],
        ['개발', '6주', '3일', '-93%'],
        ['QA·회귀 테스트', '4주', '자동화(0.5일)', [{ text: '-97%', bold: true, color: COLORS.blue }]],
        ['배포·검증', '3주', '0.5일', [{ text: '-97%', bold: true, color: COLORS.blue }]],
        ['안정화', '2주', '1일', '-93%'],
        [[{ text: 'Total', bold: true }], [{ text: '22주', bold: true }], [{ text: '1~7일', bold: true }], [{ text: '-95~-99%', bold: true, color: COLORS.blue }]],
      ],
      [2800, 1400, 2000, 1548],
    ),
    spacer(120),
    heading3('5 회의체 거버넌스'),
    makeTable(
      ['회의체', '주기', '참여자', '주요 역할'],
      [
        [[{ text: 'Steering', bold: true }], '월 1회', 'CEO·CFO·CIO·사업부장', '전략·예산·우선순위 · AI 정책 정기 안건'],
        [[{ text: 'Working Group', bold: true }], '주 1회', 'PMO + 리드 7인', '실행 조정 · VSM 분기 재매핑'],
        [[{ text: 'ARB', bold: true }], '2주 1회', 'EA·아키텍트', '아키텍처 승인 · 12 플랫폼 특성 게이트'],
        [[{ text: 'Risk Committee', bold: true }], '월 1회', '리스크·보안·법무', '21개 리스크 추적 · 에스컬레이션'],
        [[{ text: 'Cost Committee', bold: true }], '분기 1회', 'CFO·재무·IT 재무', 'TCO·BEP 추적 · AI 인프라 비용 분리'],
      ],
      [1800, 1000, 2400, 3548],
    ),
    pageBreak(),
    heading2('11장. 6 가드레일 + AI 3-Bucket 정책'),
    heading3('6 가드레일 — Phase별 단계적 도입'),
    makeTable(
      ['#', '가드레일', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'],
      [
        ['1', 'SAST (정적 보안)', '파일럿 100%', 'Phase 2 100%', '전사', '지속'],
        ['2', 'SCA (오픈소스 취약점)', '파일럿 100%', 'Phase 2 100%', '전사', '지속'],
        ['3', '회귀 테스트 자동화', '파일럿 70%+', 'Phase 2 85%+', '전사 90%+', '95%+'],
        ['4', 'Contract Test', '파일럿 API 100%', '핵심 API 100%', '전사', '지속'],
        ['5', 'DAST (동적 보안)', '파일럿 주 1회', 'Phase 2 주 1회', '전사', '지속'],
        ['6', 'Chaos Engineering', '—', 'Phase 2 핵심', '전사 월 1회', '주 1회'],
      ],
      [400, 2000, 1500, 1500, 1400, 1200],
    ),
    spacer(120),
    heading3('AI 3-Bucket 정책 (DORA 권장)'),
    makeTable(
      ['Bucket', '항목 수', '예시'],
      [
        [[{ text: 'Allowed', bold: true, color: '375623' }, { text: ' (저위험·고가치)' }], [{ text: '15', bold: true }], '보일러플레이트 생성, 비독점 데이터 브레인스토밍, 테스트 코드 초안 생성'],
        [[{ text: 'Permitted with Guardrails', bold: true, color: COLORS.orange }, { text: ' (조건부)' }], [{ text: '8', bold: true }], '사내 AI 도구로만 독점 소스 코드 사용, AI 생성 코드 human-in-the-loop 필수, PII 마스킹 후 활용'],
        [[{ text: 'Prohibited', bold: true, color: COLORS.red }, { text: ' (금지)' }], [{ text: '10', bold: true }], '고객 PII/영업비밀을 공개 AI 모델 입력, 보안 키/비밀번호 프롬프트 포함, KT 표준 프로토콜 변경'],
      ],
      [2600, 900, 4000],
    ),
    spacer(120),
    heading2('12장. 변화관리 — Phase × 6축 핵심'),
    makeTable(
      ['축', 'Phase 0', 'Phase 1 (파일럿)', 'Phase 2', 'Phase 4'],
      [
        [[{ text: '커뮤니케이션', bold: true }], '14 stakeholder 2x2 매핑', '파일럿 성공 스토리 공유', 'BILL-MF 분해 주간 투명 공개', '전사 Town Hall 분기 1회'],
        [[{ text: '교육', bold: true }], 'DORA 설문·12 플랫폼 특성 워크숍', '파일럿 팀 Trunk-based 교육', '전사 AI 3-Bucket 교육', 'CoP 주도 지속 학습'],
        [[{ text: '조직', bold: true }], '워킹그룹·CoP 준비', '플랫폼 팀 시드 (4명)', '플랫폼 팀 확장 (4→10명)', '페더레이션 모델 전환'],
        [[{ text: '측정', bold: true }], 'DORA 5 베이스라인 + 12 플랫폼 특성', '파일럿 메트릭 주간', 'H.E.A.R.T. 플랫폼 측정', 'Cluster 6/7 진입률 반기'],
      ],
      [1200, 2000, 2000, 2000, 1548],
    ),
    spacer(80),
    callout('"AI shines a light on what\'s working, but it also surfaces what needs to change. For organizations ready to look, the reflection AI offers becomes a roadmap." — DORA 2025 The AI Mirror Chapter (Phase 1 킥오프 슬라이드 1페이지 채택 예정)', COLORS.ltorange, COLORS.orange),
    pageBreak(),
  ];
}

// ─── RISK (pp 13-15) ──────────────────────────────────────────────────────────
function makeRiskSection() {
  return [
    heading1('13~15장. 위험(리스크·가드레일) — Top 5 + 거버넌스'),
    heading2('13장. 21개 리스크 매트릭스 요약'),
    makeTable(
      ['영향 \\ 발생확률', 'Low', 'Med', 'High'],
      [
        [[{ text: 'High', bold: true }], '2건', [{ text: '3건 (R-D-02, R-B-01, R-T-02)', bold: true, color: COLORS.orange }], [{ text: '2건 (R-P-02, R-D-01)', bold: true, color: COLORS.red }]],
        ['Med', '4건', '5건', '3건'],
        ['Low', '1건', '1건', '0건'],
      ],
      [2200, 1800, 2000, 2000],
      COLORS.navy,
    ),
    spacer(80),
    callout('Phase 1 위험 가중치 합계 32 (최대치) — 파일럿 실패 시 전체 프로그램 신뢰도 붕괴 리스크 집중.', COLORS.ltred, COLORS.red),
    spacer(120),
    heading2('14장. Top 5 리스크 심층 — 대응 전략'),

    // R-P-02
    new Paragraph({
      children: [new TextRun({ text: 'R-P-02 (High·High, 가중치 9) — BILL-MF KT 표준 의존', font: 'Malgun Gothic', size: 22, bold: true, color: COLORS.red })],
      spacing: { before: 120, after: 60 },
    }),
    bulletPara('영향: Phase 3 GO/NO-GO에 직접 영향, Critical Path 6~12개월 지연 가능, 예산 55~90억 추가', ''),
    bulletPara('대응: 2026.Q2부터 KT와 분기 1회 기술 공동 회의체 신설 · KT 비의존 도메인 우선 · G2 게이트 조건에 KT 기술 합의서 필수', ''),

    // R-D-01
    new Paragraph({
      children: [new TextRun({ text: 'R-D-01 (High·High, 가중치 9) — AI Rework 폭증', font: 'Malgun Gothic', size: 22, bold: true, color: COLORS.red })],
      spacing: { before: 120, after: 60 },
    }),
    bulletPara('영향: AI Copilot 활성화 후 Rework Rate +40~70% 가능 (DORA 2025 2024 vs 2025 비교) → CFR 악화 → SLA 위반', ''),
    bulletPara('대응: Rework Rate 주간 측정 + 임계치 15% 초과 시 AI 도구 사용 일시 중단 · PR 라인 수 < 300 강제', ''),

    // R-T-02
    new Paragraph({
      children: [new TextRun({ text: 'R-T-02 (Med·High, 가중치 6) — 동시 Rearch 3개 이상', font: 'Malgun Gothic', size: 22, bold: true, color: COLORS.orange })],
      spacing: { before: 120, after: 60 },
    }),
    bulletPara('영향: Phase 2 일정 3~9개월 지연, 인건비 +30~70억', ''),
    bulletPara('대응: ARB에서 Rearch 동시 진행 최대 2개 규칙 확정 · Context Map 기반 의존성 DAG 구축', ''),

    // R-D-02
    new Paragraph({
      children: [new TextRun({ text: 'R-D-02 (Med·High, 가중치 6) — IDP SPOF', font: 'Malgun Gothic', size: 22, bold: true, color: COLORS.orange })],
      spacing: { before: 120, after: 60 },
    }),
    bulletPara('영향: 장애 1건당 30분~4시간 전사 다운, SLA 위약금 10~50억/건', ''),
    bulletPara('대응: Blue-Green 배포 + 5분 내 롤백 의무 · Chaos Engineering IDP 최우선 적용 · 백업 IDP(Keycloak SaaS) Phase 0 조달', ''),

    // R-B-01
    new Paragraph({
      children: [new TextRun({ text: 'R-B-01 (Med·High, 가중치 6) — AI ROI 스폰서십 이탈', font: 'Malgun Gothic', size: 22, bold: true, color: COLORS.orange })],
      spacing: { before: 120, after: 60 },
    }),
    bulletPara('영향: Phase 2 예산 30~50% 삭감, 전체 프로그램 1.5~2년 지연', ''),
    bulletPara('대응: 월간 CFO 브리핑 정기화 · AI ROI 잠금 해소 지표(연 200~400억) 별도 추적 · DORA Figure 49 경영진 핵심 카드 반복 노출', ''),

    spacer(120),
    heading2('15장. 3-색 에스컬레이션 + Phase 게이트 조건'),
    heading3('3-색 에스컬레이션'),
    makeTable(
      ['색', '기준', '조치', '책임자'],
      [
        [[{ text: 'Green', bold: true, color: '375623' }], '모든 게이트 조건 충족, DORA 5메트릭 계획대로', '월간 리뷰만', 'PMO'],
        [[{ text: 'Yellow', bold: true, color: COLORS.orange }], '1~2개 메트릭 미달, Phase 내 회복 가능', 'Working Group 주 1회 집중 리뷰', 'PMO + 리드'],
        [[{ text: 'Red', bold: true, color: COLORS.red }], '3개+ 메트릭 미달 또는 Critical Path 지연', [{ text: 'Steering 임시 소집 (72시간 이내)', bold: true, color: COLORS.red }], 'CIO + CFO'],
      ],
      [800, 2800, 3000, 1148],
    ),
    spacer(120),
    heading3('Phase 게이트 요약 — DORA 5메트릭 GO 조건'),
    makeTable(
      ['게이트', '시점', '핵심 GO 조건'],
      [
        [[{ text: 'G0 → G1', bold: true }], '2026.10', '12 플랫폼 특성 자가평가 완료 + AI 3-Bucket 초안 승인 + VSM 매핑 완료'],
        [[{ text: 'G1 → G2', bold: true }], '2027.06', '파일럿 2개 DORA 5메트릭 ≥ 1단계 향상 + Rollback 5분 이내 + CFR ≤ 15%'],
        [[{ text: 'G2 → G3', bold: true }], '2028.06', '12 플랫폼 특성 평균 "Moderately" 이상 + BILL-MF 분해 50%+ + AI 7역량 베이스라인'],
        [[{ text: 'G3 → G4', bold: true }], '2029.03', 'AI 역량 평균 ≥ "평균" + AI ROI 측정 가능 + Cluster 6/7 ≥ 30%'],
        [[{ text: 'G4 완료', bold: true }], '2029.10', [{ text: 'Cluster 6/7 ≥ 50%', bold: true }, { text: ' + DORA 5메트릭 전 지표 Top 50% + TCO 절감 Base 7% 이상' }]],
      ],
      [1400, 900, 6200],
    ),
    pageBreak(),
  ];
}

// ─── CONCLUSION (pp 16-17) ────────────────────────────────────────────────────
function makeConclusionSection() {
  return [
    heading1('16~17장. 결론 — 의사결정 요청'),
    heading2('16장. 스폰서십 3단계 + 지금 결정해야 하는 이유'),
    heading3('경영진 스폰서십 구조'),
    makeTable(
      ['레벨', '스폰서', '역할', 'HBT 현황'],
      [
        ['L1', 'CEO', '전사 비전·우선순위 결정', '2026.Q1 내부 킥오프 완료'],
        ['L2', [{ text: 'CFO (핵심 게이트키퍼)', bold: true, color: COLORS.blue }], 'TCO·BEP 추적, 예산 집행', [{ text: '공동 스폰서십 레터 필요', bold: true, color: COLORS.red }]],
        ['L3', 'CIO + 사업부장 4인', 'Phase별 실행 승인', 'Phase 0 워킹그룹 구성 중'],
      ],
      [800, 2000, 2800, 3148],
    ),
    spacer(80),
    callout('CFO 공동 스폰서십이 전체 프로그램의 최대 성공 변수 — 2022년 디지털혁신 프로젝트 좌초 원인 1위가 "재무 본부 미참여".', COLORS.ltred, COLORS.red),
    spacer(120),
    heading3('지금 시작해야 하는 이유 — DORA 핵심 메시지'),
    callout('"상위 40%(Cluster 6·7)는 속도와 안정성 모두 우수함." — DORA 2025 Cluster 분포 (§01)', COLORS.ltblue, COLORS.blue),
    callout('"Harmonious high-achiever (Cluster 7) — 20%의 조직이 이미 도달한 안정적이고 빠르며 의미 있는 일상." — DORA 2025 (§06)', COLORS.ltblue, COLORS.blue),
    para([run('Phase 4 목표 = Cluster 6/7 50% 진입 — '), boldRun('비현실적 목표가 아니라 글로벌 20%가 달성한 현실', { color: COLORS.blue })], { spaceBefore: 80 }),
    spacer(120),
    heading2('17장. 최종 의사결정 요청 — 5개 항목'),
    makeTable(
      ['#', '의사결정 항목', '기한', '담당'],
      [
        ['1', [{ text: 'Phase 0 착수 승인', bold: true }, { text: ' (35~60억, 2026.05.01~2026.10.31)' }], '2026.05.01', 'CEO·CFO·CIO'],
        ['2', [{ text: 'Phase 0 게이트 통과 시 Phase 1 자동 승인 조건 합의' }], '2026.05.15', 'CEO·CFO'],
        ['3', [{ text: 'CFO 공동 스폰서십 확정', bold: true }, { text: ' (TCO·BEP 추적 주관)' }], '2026.04.30', 'CEO → CFO'],
        ['4', [{ text: '리스크·거버넌스 위원회 발족' }], '2026.05.15', 'CIO'],
        ['5', [{ text: '변화관리 예산 별도 계정 신설', bold: true }, { text: ' (전체의 8~12%, 32~100억)' }], '2026.05.01', 'CFO'],
      ],
      [400, 4000, 1400, 1500],
    ),
    pageBreak(),
  ];
}

// ─── DORA CARDS + REFERENCES (pp 18-20) ──────────────────────────────────────
function makeDoraAndRefs() {
  return [
    heading1('18~20장. DORA 핵심 인용 5장 + 참고문헌'),
    heading2('18~19장. 경영진 반복 인용용 DORA 카드 5장'),

    heading3('카드 1 — 속도와 안정성은 트레이드오프가 아님'),
    callout('"상위 40%(Cluster 6·Harmonious high-achiever 7)는 속도와 안정성 모두 우수함." — DORA 2025 Cluster 분포 (§01)', COLORS.ltblue, COLORS.blue),
    para([run('HBT 적용: "안정성을 위해 속도를 포기할 수밖에 없다"는 기존 IT 본부 방어 논리 데이터로 ')], { spaceBefore: 60 }),
    bulletPara('반박 가능. 데이터로 "빠르면서 안정적인" 조직이 실존함을 증명.', ''),

    heading3('카드 2 — 20%가 이미 도달한 현실'),
    callout('"Harmonious high-achiever (Cluster 7) — 20%의 조직이 이미 도달한 안정적이고 빠르며 의미 있는 일상." — DORA 2025 (§06)', COLORS.ltblue, COLORS.blue),
    para([run('HBT 적용: 비현실적 목표가 아니라 '), boldRun('글로벌 20%가 달성한 현실'), run('. Phase 4 목표 = Cluster 6/7 50%.')], { spaceBefore: 60 }),

    heading3('카드 3 — AI는 증폭기임'),
    callout('"In 2025, the central question for technology leaders is no longer if they should adopt AI, but how to realize its value. AI\'s primary role in software development is that of an amplifier. It magnifies the strengths of high-performing organizations and the dysfunctions of struggling ones." — DORA 2025 Executive Summary (§06)', COLORS.ltorange, COLORS.orange),
    para([run('HBT 적용: AI는 중립 도구가 아님. '), boldRun('HBT의 현재 기술부채를 증폭', { color: COLORS.red }), run('하기 전에 AM 전환 필수.')], { spaceBefore: 60 }),

    heading3('카드 4 — AM 없는 AI 투자 = ROI 0 (가장 중요)'),
    callout('"An investment in AI without a corresponding investment in high-quality platforms is unlikely to yield significant returns at the organizational level." — DORA 2025 Platform Engineering Chapter (Figure 49)', COLORS.ltred, COLORS.red),
    para([run('HBT 적용: HBT 2025 AI Copilot 파일럿 결과 "ROI 측정 불가"는 '), boldRun('예측된 결과'), run('. AM = AI ROI의 전제조건.')], { spaceBefore: 60 }),

    heading3('카드 5 — AI Mirror'),
    callout('"AI shines a light on what\'s working, accelerating what\'s already in motion, but it also surfaces what needs to change. For organizations ready to look, the reflection AI offers becomes a roadmap." — DORA 2025 The AI Mirror Chapter (§06)', COLORS.ltorange, COLORS.orange),
    para([run('HBT 적용: Phase 1 킥오프 슬라이드 1페이지 채택 — '), boldRun('"HBT는 볼 준비가 된 조직"', { color: COLORS.blue }), run(' 선언.')], { spaceBefore: 60 }),

    spacer(120),
    heading2('20장. 참고문헌 및 내부 근거 자료'),
    heading3('외부 참고문헌'),
    makeTable(
      ['#', '출처', '주요 인용 수치'],
      [
        ['1', [{ text: 'DORA 2025 State of DevOps Report', bold: true }, { text: ' (Google, 응답자 4,997명, 90% AI 사용)' }], 'Lead Time 분포, Figure 49, Cluster 7개'],
        ['2', [{ text: 'DORA AI Capabilities Model Guide', bold: true }, { text: ' (2025.12, 97페이지)' }], 'AI 7역량, 12 플랫폼 특성'],
        ['3', [{ text: '행정안전부 2026.03.11', bold: true }, { text: ' (제5회 과학기술관계장관회의)' }], 'TCO 18.4% 절감, 장애 81% 감소, 배포 114% 향상'],
        ['4', [{ text: '근로복지공단 사례', bold: true }, { text: ' (행안부 2025.12.23 성과보고회)' }], 'Lead Time 23배 단축'],
        ['5', 'Gartner TIME Matrix / Martin Fowler Strangler Fig / AWS·Azure 6R Framework', '방법론 근거'],
      ],
      [400, 3800, 3548],
    ),
    spacer(120),
    heading3('내부 근거 산출물'),
    makeTable(
      ['구분', '파일 경로'],
      [
        ['Step 1 통합 (WHY)', 'output/hbt/step1/why-statement.md'],
        ['Step 2 현황 분석 7건', 'output/hbt/step2/1-inventory.md ~ 7-change-kickoff.md'],
        ['Step 3 전략 6건', 'output/hbt/step3/1-6r-detail.md ~ 6-change-mgmt.md'],
        ['Step 3 통합 보고서', 'output/hbt/step3/strategy-report.md'],
        ['검토 보고서', 'output/hbt/final/review-report.md (APPROVED WITH CONDITIONS)'],
      ],
      [2400, 6100],
    ),
    spacer(240),
    new Paragraph({
      children: [new TextRun({ text: '"AM 없는 AI ROI는 0. HBT는 지금 시작함."', font: 'Malgun Gothic', size: 22, bold: true, italics: true, color: COLORS.navy })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 80 },
    }),
    new Paragraph({
      children: [new TextRun({ text: '— 서윤 (AM 전략 리드), 지민·도현·민호·재원·하늘·연우 공동 · 2026-04-18', font: 'Malgun Gothic', size: 18, color: COLORS.gray })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
    }),
  ];
}

// ─── ASSEMBLE DOCUMENT ────────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: 'Malgun Gothic', size: 20 } },
    },
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 32, bold: true, font: 'Malgun Gothic', color: COLORS.white },
        paragraph: {
          spacing: { before: 240, after: 160 },
          outlineLevel: 0,
          shading: { fill: COLORS.navy, type: ShadingType.CLEAR },
        },
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 26, bold: true, font: 'Malgun Gothic', color: COLORS.navy },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 },
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 22, bold: true, font: 'Malgun Gothic', color: COLORS.teal },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '\u2022',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 260 } } },
        }],
      },
      {
        reference: 'numbered',
        levels: [{
          level: 0,
          format: LevelFormat.DECIMAL,
          text: '%1.',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 260 } } },
        }],
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            new TextRun({ text: 'HBT AM 전환 전략 — 경영진 요약 보고서', font: 'Malgun Gothic', size: 16, color: COLORS.gray }),
            new TextRun({ text: '\t', font: 'Malgun Gothic', size: 16 }),
            new TextRun({ text: 'v1.0 · 2026-04-18 · CONFIDENTIAL', font: 'Malgun Gothic', size: 16, color: COLORS.gray }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.blue, space: 2 } },
          spacing: { before: 0, after: 80 },
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [
            new TextRun({ text: 'am-strategy · HBT 경영진 극비 보고서', font: 'Malgun Gothic', size: 16, color: COLORS.gray }),
            new TextRun({ text: '\t', font: 'Malgun Gothic', size: 16 }),
            new TextRun({ text: '페이지 ', font: 'Malgun Gothic', size: 16, color: COLORS.gray }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Malgun Gothic', size: 16, color: COLORS.gray }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.blue, space: 2 } },
          spacing: { before: 80, after: 0 },
        })],
      }),
    },
    children: [
      ...makeCoverPage(),
      ...makeExecSummary(),
      ...makeWhySection(),
      ...makeBudgetSection(),
      ...makePhaseSection(),
      ...makeHowSection(),
      ...makeRiskSection(),
      ...makeConclusionSection(),
      ...makeDoraAndRefs(),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('C:\\Users\\hiond\\workshop\\am-strategy\\output\\hbt\\final\\strategy-executive.docx', buffer);
  console.log('SUCCESS: strategy-executive.docx created');
}).catch(err => {
  console.error('ERROR:', err);
  process.exit(1);
});
