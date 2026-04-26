import { useState, useEffect, useMemo } from "react";
import { simulado1Questions } from "./data/simulado1.js";
import { simulado2Questions } from "./data/simulado2.js";
import { simulado3Questions } from "./data/simulado3.js";
import { simulado4Questions } from "./data/simulado4.js";

const DOMAIN_COLORS = {
  1: "#FF9900",
  2: "#00A1C9",
  3: "#7B61FF",
  4: "#E63946",
};

const DOMAIN_NAMES = {
  1: "Data Ingestion & Transformation",
  2: "Data Store Management",
  3: "Data Operations & Support",
  4: "Data Security & Governance",
};

const DOMAIN_NAMES_PT = {
  1: "Ingestão e Transformação",
  2: "Gerenciamento de Stores",
  3: "Operações e Suporte",
  4: "Segurança e Governança",
};

const SIMULADOS = [
  {
    id: 1,
    name: "Simulado 1",
    subtitle: "Fundamentos & Conceitos Core",
    description: "Questões essenciais cobrindo os 4 domínios da prova DEA-C01.",
    icon: "🎯",
    questions: simulado1Questions,
    difficulty: "Iniciante → Intermediário",
  },
  {
    id: 2,
    name: "Simulado 2",
    subtitle: "Cenários Reais de Prova",
    description: "Questões baseadas em cenários reais com nuances de prova.",
    icon: "💼",
    questions: simulado2Questions,
    difficulty: "Intermediário",
  },
  {
    id: 3,
    name: "Simulado 3",
    subtitle: "Casos Avançados",
    description: "Casos complexos: Redshift, Glue, Kinesis e otimização.",
    icon: "🚀",
    questions: simulado3Questions,
    difficulty: "Intermediário → Avançado",
  },
  {
    id: 4,
    name: "Simulado 4",
    subtitle: "Tópicos Avançados",
    description: "Iceberg, Hudi, Lake Formation, GDPR, multi-account.",
    icon: "⚡",
    questions: simulado4Questions,
    difficulty: "Avançado",
  },
];

const PASS_SCORE = 720;
const TOTAL_SCORE = 1000;

// === HOME SCREEN ===
function HomeScreen({ onSelectSimulado }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0f1a 0%, #1a1f35 50%, #0d1525 100%)",
        padding: "clamp(20px, 4vw, 40px) clamp(16px, 4vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <header
          style={{
            textAlign: "center",
            marginBottom: 48,
            animation: "fadeIn 0.6s ease-out",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 20px",
              background: "rgba(255, 153, 0, 0.1)",
              border: "1px solid rgba(255, 153, 0, 0.3)",
              borderRadius: 999,
              marginBottom: 24,
              fontSize: 13,
              fontWeight: 600,
              color: "#FF9900",
              letterSpacing: 1,
            }}
          >
            ☁️ AWS CERTIFICATION PREP
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              margin: 0,
              fontWeight: 800,
              background:
                "linear-gradient(135deg, #FF9900 0%, #ffb84d 50%, #FF9900 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            DEA-C01 Simulados
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "#94a3b8",
              marginTop: 16,
              maxWidth: 640,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
            }}
          >
            AWS Certified Data Engineer — Associate. Pratique com{" "}
            <strong style={{ color: "#e2e8f0" }}>260 questões</strong> bilíngues
            (EN/PT) com explicações detalhadas para cada alternativa.
          </p>

          {/* Stats bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap",
              marginTop: 32,
            }}
          >
            {[
              { value: "4", label: "Simulados" },
              { value: "260", label: "Questões" },
              { value: "EN/PT", label: "Bilíngue" },
              { value: "720/1000", label: "Pontuação Mínima" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "12px 20px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 12,
                  minWidth: 100,
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#FF9900",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginTop: 2,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Simulados Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginTop: 16,
          }}
        >
          {SIMULADOS.map((sim, idx) => {
            // Count domains per simulado
            const domainCounts = sim.questions.reduce((acc, q) => {
              acc[q.domain] = (acc[q.domain] || 0) + 1;
              return acc;
            }, {});

            return (
              <div
                key={sim.id}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 16,
                  padding: 28,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  animation: `fadeIn 0.5s ease-out ${idx * 0.1}s backwards`,
                }}
                onClick={() => onSelectSimulado(sim)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 153, 0, 0.4)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(255, 153, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Decorative corner */}
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    background:
                      "radial-gradient(circle, rgba(255,153,0,0.15) 0%, transparent 70%)",
                    borderRadius: "50%",
                  }}
                />

                {/* Icon + Number */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <div style={{ fontSize: 36 }}>{sim.icon}</div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1,
                      padding: "4px 10px",
                      background: "rgba(255, 153, 0, 0.15)",
                      color: "#FF9900",
                      borderRadius: 6,
                      textTransform: "uppercase",
                    }}
                  >
                    {sim.questions.length} questões
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 22,
                    margin: 0,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {sim.name}
                </h3>
                <div
                  style={{
                    fontSize: 14,
                    color: "#FF9900",
                    fontWeight: 600,
                    marginTop: 4,
                    marginBottom: 12,
                  }}
                >
                  {sim.subtitle}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#94a3b8",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {sim.description}
                </p>

                {/* Difficulty */}
                <div
                  style={{
                    fontSize: 12,
                    color: "#cbd5e1",
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "#64748b" }}>Nível:</span>
                  <strong style={{ color: "#e2e8f0" }}>{sim.difficulty}</strong>
                </div>

                {/* Domain bars */}
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    marginTop: 14,
                    height: 6,
                    borderRadius: 3,
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  {[1, 2, 3, 4].map((d) => {
                    const count = domainCounts[d] || 0;
                    const pct = (count / sim.questions.length) * 100;
                    return (
                      <div
                        key={d}
                        style={{
                          flex: pct,
                          background: DOMAIN_COLORS[d],
                          opacity: count > 0 ? 1 : 0.2,
                        }}
                        title={`${DOMAIN_NAMES_PT[d]}: ${count}`}
                      />
                    );
                  })}
                </div>

                {/* Domain legend */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 10,
                  }}
                >
                  {[1, 2, 3, 4].map((d) => (
                    <div
                      key={d}
                      style={{
                        fontSize: 10,
                        color: "#64748b",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 2,
                          background: DOMAIN_COLORS[d],
                        }}
                      />
                      D{d}: {domainCounts[d] || 0}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  style={{
                    marginTop: 20,
                    width: "100%",
                    padding: "12px 20px",
                    background:
                      "linear-gradient(135deg, #FF9900 0%, #e68a00 100%)",
                    color: "#000",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "all 0.2s",
                    letterSpacing: 0.3,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSimulado(sim);
                  }}
                >
                  Começar Simulado →
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: 60,
            padding: "24px 16px",
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#64748b",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "#94a3b8" }}>
              AWS Certified Data Engineer — Associate (DEA-C01)
            </strong>
            <br />
            Pontuação mínima: 720/1000 • Tempo da prova: 130 minutos • 65
            questões
          </div>
        </footer>
      </div>
    </div>
  );
}

// === QUIZ SCREEN ===
function QuizScreen({ simulado, onBack, onFinish }) {
  const questions = simulado.questions;
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);

  const q = questions[currentQ];
  const correctIdx = q.correct;
  const isCorrect = selected === correctIdx;

  // Scroll to top on question change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentQ]);

  // Auto-dismiss toast after 3.5 seconds
  useEffect(() => {
    if (answered) {
      const showTimer = setTimeout(() => setToastVisible(true), 50);
      const hideTimer = setTimeout(() => setToastVisible(false), 3500);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setToastVisible(false);
    }
  }, [answered, currentQ]);

  const submitAnswer = () => {
    if (selected === null) return;
    setAnswered(true);
    setAnswers([
      ...answers,
      {
        questionId: q.id,
        domain: q.domain,
        selected,
        correct: correctIdx,
        isCorrect: selected === correctIdx,
      },
    ]);
    // Scroll to top so user sees the result toast and explanations
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      onFinish(answers);
    }
  };

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const progressPct = ((currentQ + (answered ? 1 : 0)) / questions.length) * 100;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0f1a 0%, #1a1f35 50%, #0d1525 100%)",
        padding: toastVisible
          ? "100px clamp(12px, 3vw, 24px) 20px"
          : "20px clamp(12px, 3vw, 24px)",
        transition: "padding-top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e2e8f0",
              padding: "8px 14px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
          >
            ← Início
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "#94a3b8",
                fontWeight: 600,
              }}
            >
              {simulado.name}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#94a3b8",
              }}
            >
              <strong style={{ color: "#fff" }}>{currentQ + 1}</strong>
              <span style={{ color: "#64748b" }}> / {questions.length}</span>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#22c55e",
                background: "rgba(34, 197, 94, 0.1)",
                padding: "4px 10px",
                borderRadius: 6,
              }}
            >
              ✓ {correctCount}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 999,
            height: 8,
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: `${progressPct}%`,
              height: "100%",
              background:
                "linear-gradient(90deg, #FF9900 0%, #ffb84d 50%, #FF9900 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 3s linear infinite",
              transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: 999,
            }}
          />
        </div>

        {/* Question Card */}
        <div
          key={q.id}
          style={{
            animation: "fadeIn 0.4s ease-out",
          }}
        >
          {/* Domain pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: `${DOMAIN_COLORS[q.domain]}22`,
              border: `1px solid ${DOMAIN_COLORS[q.domain]}66`,
              fontSize: 12,
              fontWeight: 700,
              color: DOMAIN_COLORS[q.domain],
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: DOMAIN_COLORS[q.domain],
              }}
            />
            Domínio {q.domain}: {DOMAIN_NAMES_PT[q.domain]}
          </div>

          {/* Bilingual question cards */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              padding: "20px 22px",
              marginBottom: 12,
              borderLeft: "3px solid rgba(255,255,255,0.3)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#94a3b8",
                marginBottom: 10,
                letterSpacing: 1,
              }}
            >
              🇺🇸 ENGLISH
            </div>
            <div
              style={{
                fontSize: "clamp(15px, 1.6vw, 17px)",
                color: "#f1f5f9",
                lineHeight: 1.65,
              }}
            >
              {q.en}
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 153, 0, 0.06)",
              borderRadius: 12,
              padding: "20px 22px",
              marginBottom: 24,
              borderLeft: `3px solid ${DOMAIN_COLORS[q.domain]}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#FF9900",
                marginBottom: 10,
                letterSpacing: 1,
              }}
            >
              🇧🇷 PORTUGUÊS
            </div>
            <div
              style={{
                fontSize: "clamp(15px, 1.6vw, 17px)",
                color: "#f1f5f9",
                lineHeight: 1.65,
              }}
            >
              {q.pt}
            </div>
          </div>

          {/* Options */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {q.options.map((opt, idx) => {
              const isSelected = selected === idx;
              const isCorrectOption = idx === correctIdx;
              const showAnswer = answered;

              let borderColor = "rgba(255,255,255,0.1)";
              let bgColor = "rgba(255,255,255,0.04)";
              let labelBg = "rgba(255,255,255,0.08)";
              let labelColor = "#94a3b8";

              if (showAnswer) {
                if (isCorrectOption) {
                  borderColor = "#22c55e";
                  bgColor = "rgba(34, 197, 94, 0.08)";
                  labelBg = "#22c55e";
                  labelColor = "#000";
                } else if (isSelected) {
                  borderColor = "#E63946";
                  bgColor = "rgba(230, 57, 70, 0.08)";
                  labelBg = "#E63946";
                  labelColor = "#fff";
                }
              } else if (isSelected) {
                borderColor = "#FF9900";
                bgColor = "rgba(255, 153, 0, 0.08)";
                labelBg = "#FF9900";
                labelColor = "#000";
              }

              const explColor = isCorrectOption
                ? "#bbf7d0"
                : isSelected
                  ? "#fecaca"
                  : "#94a3b8";
              const dividerColor = isCorrectOption
                ? "rgba(34, 197, 94, 0.25)"
                : isSelected
                  ? "rgba(230, 57, 70, 0.25)"
                  : "rgba(255, 255, 255, 0.08)";

              return (
                <button
                  key={idx}
                  onClick={() => !answered && setSelected(idx)}
                  disabled={answered}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: bgColor,
                    border: `2px solid ${borderColor}`,
                    color: "#e2e8f0",
                    padding: showAnswer ? "16px 18px" : "14px 16px",
                    borderRadius: 10,
                    cursor: answered ? "default" : "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    fontSize: "clamp(14px, 1.5vw, 15px)",
                    lineHeight: 1.55,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontFamily: "inherit",
                    boxShadow: showAnswer && isCorrectOption
                      ? "0 4px 16px rgba(34, 197, 94, 0.15)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!answered && !isSelected) {
                      e.currentTarget.style.borderColor =
                        "rgba(255, 153, 0, 0.4)";
                      e.currentTarget.style.background =
                        "rgba(255, 153, 0, 0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!answered && !isSelected) {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.1)";
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";
                    }
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 30,
                      height: 30,
                      borderRadius: 7,
                      background: labelBg,
                      color: labelColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 800,
                      transition: "all 0.2s",
                      boxShadow:
                        showAnswer && isCorrectOption
                          ? "0 2px 8px rgba(34, 197, 94, 0.4)"
                          : "none",
                    }}
                  >
                    {showAnswer
                      ? isCorrectOption
                        ? "✓"
                        : isSelected
                          ? "✗"
                          : String.fromCharCode(65 + idx)
                      : String.fromCharCode(65 + idx)}
                  </div>
                  <div style={{ flex: 1, paddingTop: 4, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: showAnswer && isCorrectOption ? 600 : 400,
                      }}
                    >
                      {opt}
                    </div>
                    {showAnswer && (
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: `1px dashed ${dividerColor}`,
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: explColor,
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          animation: `fadeIn 0.4s ${0.15 + idx * 0.06}s ease-out backwards`,
                        }}
                      >
                        {q.explanations[idx]}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          {!answered ? (
            <button
              onClick={submitAnswer}
              disabled={selected === null}
              style={{
                width: "100%",
                padding: "14px 20px",
                background:
                  selected !== null
                    ? "linear-gradient(135deg, #FF9900 0%, #e68a00 100%)"
                    : "rgba(255,255,255,0.05)",
                color: selected !== null ? "#000" : "#64748b",
                border: "none",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                cursor: selected !== null ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                letterSpacing: 0.3,
              }}
            >
              {selected !== null ? "Confirmar Resposta →" : "Selecione uma opção"}
            </button>
          ) : (
            <>
              {/* Fixed toast at top of viewport - auto-dismisses after 3.5s */}
              <div
                style={{
                  position: "fixed",
                  top: 16,
                  left: "50%",
                  zIndex: 1000,
                  width: "calc(100% - 32px)",
                  maxWidth: 720,
                  opacity: toastVisible ? 1 : 0,
                  transform: toastVisible
                    ? "translate(-50%, 0)"
                    : "translate(-50%, -24px)",
                  transition:
                    "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  pointerEvents: toastVisible ? "auto" : "none",
                }}
              >
                <div
                  style={{
                    background: isCorrect
                      ? "linear-gradient(135deg, rgba(34, 197, 94, 0.98) 0%, rgba(22, 163, 74, 0.98) 100%)"
                      : "linear-gradient(135deg, rgba(230, 57, 70, 0.98) 0%, rgba(193, 18, 31, 0.98) 100%)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    borderRadius: 14,
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    boxShadow: isCorrect
                      ? "0 16px 48px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(34, 197, 94, 0.5)"
                      : "0 16px 48px rgba(230, 57, 70, 0.4), 0 0 0 1px rgba(230, 57, 70, 0.5)",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#fff",
                    }}
                  >
                    {isCorrect ? "✓" : "✗"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: "#fff",
                        letterSpacing: 0.2,
                      }}
                    >
                      {isCorrect ? "Resposta correta!" : "Resposta incorreta"}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "rgba(255, 255, 255, 0.92)",
                        marginTop: 2,
                      }}
                    >
                      {isCorrect
                        ? "Veja as explicações em cada alternativa abaixo."
                        : `A alternativa correta é ${String.fromCharCode(65 + correctIdx)}.`}
                    </div>
                  </div>
                  <button
                    onClick={() => setToastVisible(false)}
                    aria-label="Fechar"
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: "rgba(255, 255, 255, 0.18)",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 16,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.18)";
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              <button
                onClick={nextQuestion}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  background:
                    "linear-gradient(135deg, #FF9900 0%, #e68a00 100%)",
                  color: "#000",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  letterSpacing: 0.3,
                  boxShadow: "0 4px 16px rgba(255, 153, 0, 0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(255, 153, 0, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(255, 153, 0, 0.25)";
                }}
              >
                {currentQ < questions.length - 1
                  ? "Próxima Questão →"
                  : "Ver Resultado Final →"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// === RESULTS SCREEN ===
function ResultsScreen({ simulado, answers, onRestart, onHome }) {
  const totalQuestions = simulado.questions.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const scaledScore = Math.round((correctCount / totalQuestions) * TOTAL_SCORE);
  const passed = scaledScore >= PASS_SCORE;
  const accuracyPct = Math.round((correctCount / totalQuestions) * 100);

  // Domain breakdown
  const domainStats = useMemo(() => {
    const stats = {};
    [1, 2, 3, 4].forEach((d) => {
      const domainAnswers = answers.filter((a) => a.domain === d);
      const correctInDomain = domainAnswers.filter((a) => a.isCorrect).length;
      stats[d] = {
        total: domainAnswers.length,
        correct: correctInDomain,
        pct:
          domainAnswers.length > 0
            ? Math.round((correctInDomain / domainAnswers.length) * 100)
            : 0,
      };
    });
    return stats;
  }, [answers]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0f1a 0%, #1a1f35 50%, #0d1525 100%)",
        padding: "40px clamp(16px, 4vw, 32px)",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        {/* Result Banner */}
        <div
          style={{
            background: passed
              ? "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.04) 100%)"
              : "linear-gradient(135deg, rgba(230,57,70,0.15) 0%, rgba(230,57,70,0.04) 100%)",
            border: `2px solid ${passed ? "#22c55e" : "#E63946"}`,
            borderRadius: 20,
            padding: "32px 28px",
            textAlign: "center",
            marginBottom: 24,
            animation: "fadeIn 0.6s ease-out",
          }}
        >
          <div
            style={{
              fontSize: 60,
              marginBottom: 8,
              animation: passed ? "pulse 2s ease-in-out infinite" : "none",
            }}
          >
            {passed ? "🎉" : "📚"}
          </div>
          <div
            style={{
              fontSize: 14,
              color: passed ? "#22c55e" : "#E63946",
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            {passed ? "Aprovado" : "Continue Estudando"}
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              margin: 0,
              fontWeight: 800,
              color: passed ? "#22c55e" : "#E63946",
              letterSpacing: "-0.02em",
            }}
          >
            {scaledScore} <span style={{ color: "#64748b", fontSize: "0.5em" }}>/ 1000</span>
          </h1>
          <div
            style={{
              fontSize: 16,
              color: "#94a3b8",
              marginTop: 12,
            }}
          >
            <strong style={{ color: "#fff" }}>{correctCount}</strong> de{" "}
            <strong style={{ color: "#fff" }}>{totalQuestions}</strong> corretas
            ({accuracyPct}%)
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              marginTop: 8,
            }}
          >
            Pontuação mínima: <strong style={{ color: "#94a3b8" }}>720/1000</strong>
          </div>
        </div>

        {/* Domain Breakdown */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              marginTop: 0,
              marginBottom: 20,
              letterSpacing: 0.3,
            }}
          >
            📊 Desempenho por Domínio
          </h3>
          {[1, 2, 3, 4].map((d) => {
            const stat = domainStats[d];
            if (stat.total === 0) return null;
            return (
              <div
                key={d}
                style={{
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 3,
                        background: DOMAIN_COLORS[d],
                      }}
                    />
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#e2e8f0",
                      }}
                    >
                      D{d}: {DOMAIN_NAMES_PT[d]}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: stat.pct >= 70 ? "#22c55e" : stat.pct >= 50 ? "#FF9900" : "#E63946",
                    }}
                  >
                    {stat.correct}/{stat.total} ({stat.pct}%)
                  </div>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${stat.pct}%`,
                      height: "100%",
                      background: DOMAIN_COLORS[d],
                      borderRadius: 999,
                      transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <button
            onClick={onHome}
            style={{
              padding: "14px 20px",
              background: "rgba(255,255,255,0.06)",
              color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
          >
            🏠 Outros Simulados
          </button>
          <button
            onClick={onRestart}
            style={{
              padding: "14px 20px",
              background: "linear-gradient(135deg, #FF9900 0%, #e68a00 100%)",
              color: "#000",
              border: "none",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            🔄 Refazer Simulado
          </button>
        </div>
      </div>
    </div>
  );
}

// === MAIN APP ===
export default function App() {
  const [view, setView] = useState("home"); // "home" | "quiz" | "results"
  const [selectedSimulado, setSelectedSimulado] = useState(null);
  const [results, setResults] = useState(null);

  const handleSelectSimulado = (sim) => {
    setSelectedSimulado(sim);
    setView("quiz");
  };

  const handleFinish = (answers) => {
    setResults(answers);
    setView("results");
  };

  const handleRestart = () => {
    setResults(null);
    setView("quiz");
  };

  const handleHome = () => {
    setSelectedSimulado(null);
    setResults(null);
    setView("home");
  };

  if (view === "home") {
    return <HomeScreen onSelectSimulado={handleSelectSimulado} />;
  }

  if (view === "quiz" && selectedSimulado) {
    return (
      <QuizScreen
        simulado={selectedSimulado}
        onBack={handleHome}
        onFinish={handleFinish}
      />
    );
  }

  if (view === "results" && selectedSimulado && results) {
    return (
      <ResultsScreen
        simulado={selectedSimulado}
        answers={results}
        onRestart={handleRestart}
        onHome={handleHome}
      />
    );
  }

  return null;
}
