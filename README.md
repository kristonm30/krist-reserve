@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

html, body, #__next {
  height: 100%;
  margin: 0;
  padding: 0;
}

.kr-root {
  --navy: #0B1520;
  --navy-2: #101C2B;
  --gold: #C4A46A;
  --gold-soft: #D8C39B;
  --ivory: #EDEAE3;
  --slate: #5C6773;
  --slate-dim: #38424E;
  font-family: 'Inter', sans-serif;
  height: 100vh;
  width: 100%;
  background: radial-gradient(ellipse 120% 80% at 50% -10%, var(--navy-2), var(--navy) 60%);
  display: flex;
  flex-direction: column;
  color: var(--ivory);
  overflow: hidden;
}

.kr-header {
  padding: 22px 28px 18px;
  border-bottom: 1px solid rgba(196, 164, 106, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.kr-brand {
  display: flex;
  flex-direction: column;
}

.kr-wordmark {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--ivory);
}

.kr-wordmark span {
  color: var(--gold);
}

.kr-subline {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--slate);
  margin-top: 3px;
}

.kr-header-right {
  display: flex;
  align-items: center;
  gap: 18px;
}

.kr-tabs {
  display: flex;
  gap: 4px;
  background: rgba(237, 234, 227, 0.05);
  border: 1px solid rgba(196, 164, 106, 0.15);
  border-radius: 20px;
  padding: 3px;
}

.kr-tab {
  background: transparent;
  border: none;
  color: var(--slate);
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  padding: 6px 14px;
  border-radius: 16px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.kr-tab.active {
  background: var(--gold);
  color: var(--navy);
  font-weight: 600;
}

.kr-status {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  color: var(--slate);
  letter-spacing: 0.05em;
}

.kr-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7FBF8F;
  box-shadow: 0 0 6px #7FBF8F;
}

.kr-chat {
  flex: 1;
  overflow-y: auto;
  padding: 28px 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.kr-chat::-webkit-scrollbar { width: 4px; }
.kr-chat::-webkit-scrollbar-thumb { background: var(--slate-dim); border-radius: 4px; }

.msg-row {
  display: flex;
  max-width: 100%;
}

.msg-row.user { justify-content: flex-end; }
.msg-row.assistant { justify-content: flex-start; }

.msg-bubble {
  max-width: 78%;
  padding: 13px 16px;
  border-radius: 14px;
  line-height: 1.5;
  font-size: 14.5px;
}

.msg-row.user .msg-bubble {
  background: var(--gold);
  color: var(--navy);
  border-bottom-right-radius: 3px;
}

.msg-row.assistant .msg-bubble {
  background: rgba(237, 234, 227, 0.06);
  border: 1px solid rgba(196, 164, 106, 0.14);
  color: var(--ivory);
  border-bottom-left-radius: 3px;
}

.msg-text {
  margin: 0;
  white-space: pre-wrap;
}
.msg-text + .msg-text { margin-top: 8px; }

.summary-card {
  margin-top: 12px;
  border: 1px solid rgba(196, 164, 106, 0.35);
  background: rgba(196, 164, 106, 0.06);
  border-radius: 10px;
  padding: 14px 16px;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  color: var(--gold-soft);
  text-transform: uppercase;
  margin-bottom: 10px;
  font-weight: 600;
}

.summary-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gold);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 0;
  font-size: 13px;
  border-bottom: 1px dashed rgba(196, 164, 106, 0.12);
}
.summary-row:last-child { border-bottom: none; }

.summary-label {
  color: var(--slate);
  flex-shrink: 0;
}

.summary-value {
  color: var(--ivory);
  text-align: right;
  font-weight: 500;
}

.kr-thinking {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 4px;
}

.radar {
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(196, 164, 106, 0.3);
}
.radar::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0%, var(--gold) 15%, transparent 30%);
  animation: sweep 1.1s linear infinite;
}
.radar::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: var(--navy);
}

@keyframes sweep {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.kr-thinking-text {
  font-size: 12px;
  color: var(--slate);
  letter-spacing: 0.04em;
}

.kr-starters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 20px 14px;
  flex-shrink: 0;
}

.starter-chip {
  font-size: 12px;
  color: var(--gold-soft);
  background: rgba(196, 164, 106, 0.08);
  border: 1px solid rgba(196, 164, 106, 0.25);
  padding: 7px 13px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease;
  font-family: 'Inter', sans-serif;
}

.starter-chip:hover {
  background: rgba(196, 164, 106, 0.16);
}
.starter-chip:active { transform: scale(0.97); }

.kr-inputbar {
  flex-shrink: 0;
  padding: 14px 16px 20px;
  border-top: 1px solid rgba(196, 164, 106, 0.15);
  display: flex;
  gap: 10px;
  align-items: center;
}

.kr-input {
  flex: 1;
  background: rgba(237, 234, 227, 0.05);
  border: 1px solid rgba(196, 164, 106, 0.2);
  border-radius: 24px;
  padding: 12px 18px;
  color: var(--ivory);
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  outline: none;
}

.kr-input:focus {
  border-color: var(--gold);
}

.kr-input::placeholder { color: var(--slate); }

.kr-send {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--gold);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.1s ease, opacity 0.15s ease;
}

.kr-send:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.kr-send:active:not(:disabled) { transform: scale(0.93); }

.kr-dashboard {
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px 30px;
}

.kr-empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 6px;
  color: var(--slate);
}

.kr-empty-title {
  font-size: 15px;
  color: var(--ivory);
  font-weight: 500;
}

.kr-empty-sub {
  font-size: 13px;
  max-width: 240px;
}

.kr-lead-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.kr-lead-card {
  border: 1px solid rgba(196, 164, 106, 0.2);
  background: rgba(237, 234, 227, 0.04);
  border-radius: 12px;
  padding: 14px 16px;
}

.kr-lead-card.urgent {
  border-color: rgba(196, 108, 90, 0.5);
  background: rgba(196, 108, 90, 0.08);
}

.kr-lead-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.kr-lead-route {
  font-size: 15px;
  font-weight: 600;
  color: var(--ivory);
}

.kr-urgent-tag {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #E8B4A8;
  background: rgba(196, 108, 90, 0.18);
  border: 1px solid rgba(196, 108, 90, 0.4);
  padding: 3px 9px;
  border-radius: 10px;
  font-weight: 600;
}

.kr-lead-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 16px;
}

.kr-lead-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.kr-lead-field.wide {
  grid-column: span 2;
}

.kr-lead-label {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--slate);
}

.kr-lead-value {
  font-size: 13px;
  color: var(--ivory);
}

.kr-lead-time {
  margin-top: 12px;
  font-size: 11px;
  color: var(--slate);
  border-top: 1px dashed rgba(196, 164, 106, 0.12);
  padding-top: 8px;
}

@media (prefers-reduced-motion: reduce) {
  .radar::before { animation: none; }
}
