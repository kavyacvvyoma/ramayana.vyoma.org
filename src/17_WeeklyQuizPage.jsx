import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { C, F } from './01_theme';
import { PageHdr, Btn, Card } from './02_SharedComponents';
import { trackEvent } from './analytics';
import { QUIZ_DB } from './quiz-data';
import { TRACK_DB } from './16_ScheduleData';

export function WeeklyQuizPage() {
  const [searchParams] = useSearchParams();
  let weekParam = searchParams.get('week') || 'week-1';
  
  // Normalize week name (e.g. if we get "s-week-1", map it to "week-1")
  if (weekParam.startsWith('s-')) {
    weekParam = weekParam.slice(2);
  }
  
  const weekId = weekParam;
  const quizData = QUIZ_DB[weekId] || QUIZ_DB["week-1"];
  const questions = quizData ? quizData.questions : [];

  const [currentTime, setCurrentTime] = useState(new Date());

  // Find liveAt with fallback calculation for unreleased/future weeks
  const getQuizLiveAt = (wId) => {
    const weekKey = `s-${wId}`;
    const weekData = TRACK_DB.sankshepa[weekKey];
    if (weekData && weekData.chanting) {
      const quizTrack = weekData.chanting.find(t => t.isQuiz);
      if (quizTrack && quizTrack.liveAt) {
        return quizTrack.liveAt;
      }
    }

    const num = parseInt(wId.replace(/\D/g, ''), 10);
    if (!num || isNaN(num)) return null;
    if (num === 1) return "2026-05-23T20:00:00+05:30";
    if (num === 2) return "2026-05-30T20:00:00+05:30";
    if (num === 3) return "2026-06-06T20:00:00+05:30";

    // Week 4+ start on 2026-06-08 (Mon). Quiz liveAt is Saturday 20:00 IST (5 days after Monday start)
    const weekOffset = num - 4;
    const baseDate = new Date("2026-06-08T20:00:00+05:30");
    baseDate.setDate(baseDate.getDate() + weekOffset * 7 + 5);
    const yyyy = baseDate.getFullYear();
    const mm = String(baseDate.getMonth() + 1).padStart(2, '0');
    const dd = String(baseDate.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T20:00:00+05:30`;
  };

  const liveAt = getQuizLiveAt(weekId);
  const isLocked = liveAt ? currentTime < new Date(liveAt) : false;

  useEffect(() => {
    if (!isLocked) return;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isLocked]);

  const getCountdownString = () => {
    if (!liveAt) return "";
    const diff = new Date(liveAt) - currentTime;
    if (diff <= 0) return "";

    const secs = Math.floor(diff / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours % 24 > 0 || days > 0) parts.push(`${hours % 24}h`);
    if (hours > 0 || mins % 60 > 0) parts.push(`${mins % 60}m`);
    parts.push(`${secs % 60}s`);

    return parts.join(" ");
  };

  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '', phone: '' });
  const [answers, setAnswers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [checkingLead, setCheckingLead] = useState(false);

  const beginQuiz = async (e) => {
    e.preventDefault();
    setCheckingLead(true);
    setErrorMsg("");

    try {
      const apiUrl = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001');
      const res = await fetch(`${apiUrl}/api/quiz/check?week_id=${weekId}&email=${encodeURIComponent(leadInfo.email.trim())}&phone=${encodeURIComponent(leadInfo.phone.trim())}`);
      const data = await res.json();
      
      if (data.exists) {
        setErrorMsg("You have already completed the quiz for this week using this Email or Contact Number.");
        setCheckingLead(false);
        return;
      }
    } catch (err) {
      console.error("Failed to check duplicate submission:", err);
      // Fallback: allow quiz start if server check fails to avoid blocking users
    }

    setCheckingLead(false);
    trackEvent('quiz_start', { 
      week_id: weekId,
      user_name: leadInfo.name, 
      user_email: leadInfo.email 
    });
    setHasStarted(true);
  };

  const handleAnswerOptionClick = (isCorrectOpt, index) => {
    setSelectedOption(index);
    setIsCorrect(isCorrectOpt);

    // Record selected answers details
    setAnswers(prev => {
      const updated = [...prev];
      updated[currentQuestion] = {
        question: questions[currentQuestion].questionText,
        selectedOption: questions[currentQuestion].options[index].answerText,
        selectedLabel: String.fromCharCode(65 + index), // A, B, C, D
        isCorrect: isCorrectOpt,
        correctOption: questions[currentQuestion].options.find(o => o.isCorrect)?.answerText,
        correctLabel: String.fromCharCode(65 + questions[currentQuestion].options.findIndex(o => o.isCorrect))
      };
      return updated;
    });
  };

  const submitScoreToDB = async (finalScore, finalAnswers) => {
    // 1. Send to backend database
    try {
      const apiUrl = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001');
      await fetch(`${apiUrl}/api/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          week_id: weekId,
          name: leadInfo.name,
          email: leadInfo.email,
          phone: leadInfo.phone,
          score: finalScore,
          answers: JSON.stringify(finalAnswers || answers)
        })
      });
    } catch (err) {
      console.error("Failed to save to local DB:", err);
    }

    // 2. Send to Google Analytics
    trackEvent('quiz_completed', { 
      week_id: weekId, 
      score: finalScore, 
      user_name: leadInfo.name, 
      user_email: leadInfo.email, 
      user_phone: leadInfo.phone 
    });
  };

  const handleNext = () => {
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      submitScoreToDB(newScore, answers);
      setShowScore(true);
    }
  };

  if (!quizData) {
    return (
      <div className="pi">
        <PageHdr title="Quiz Not Found" subtitle="Please check the URL or select another week." accentColor={C.orange1} />
        <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
          <Card style={{ padding: "40px" }}>
            <h3 style={{ fontFamily: F.heading, color: C.brown1, fontSize: 20, marginBottom: 24 }}>This quiz is not available.</h3>
            <Btn onClick={() => window.location.hash = "#/dailysatsanga"}>Return to Daily Satsanga</Btn>
          </Card>
        </div>
      </div>
    );
  }

  if (isLocked) {
    const liveDateStr = liveAt ? new Date(liveAt).toLocaleDateString("en-IN", {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    }) : "";
    
    const liveTimeStr = liveAt ? new Date(liveAt).toLocaleTimeString("en-IN", {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
      timeZone: 'Asia/Kolkata'
    }) : "";

    return (
      <div className="pi" style={{ background: C.pageBg, minHeight: "100vh" }}>
        <PageHdr title={quizData.title} subtitle={quizData.subtitle} accentColor={C.orange1} />
        <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
          <Card style={{ 
            padding: "50px 40px", 
            boxShadow: "0 10px 30px rgba(42,26,10,0.06)",
            border: `1px solid ${C.accentSoft}`,
            borderRadius: 12,
            background: C.cardBg
          }}>
            <div style={{ 
              fontSize: 64, 
              marginBottom: 24,
              userSelect: "none"
            }}>🔒</div>
            <h3 style={{ 
              fontFamily: F.heading, 
              color: C.brown1, 
              fontSize: 24, 
              marginBottom: 16,
              fontWeight: 700
            }}>
              This Quiz is Locked
            </h3>
            <p style={{ 
              fontFamily: F.sans, 
              color: C.textLight, 
              fontSize: 16, 
              lineHeight: "1.6",
              marginBottom: 24
            }}>
              This assessment is scheduled to become available on:<br />
              <strong style={{ color: C.accent, fontSize: 18 }}>{liveDateStr}</strong><br />
              at <strong style={{ color: C.accent, fontSize: 18 }}>{liveTimeStr}</strong>
            </p>

            {liveAt && (
              <div style={{
                background: C.surface,
                border: `1px solid ${C.accentSoft}`,
                borderRadius: 8,
                padding: "16px",
                marginBottom: 32,
                display: "inline-block"
              }}>
                <span style={{ 
                  fontFamily: F.sans, 
                  fontSize: 11, 
                  color: C.textMuted, 
                  textTransform: "uppercase", 
                  letterSpacing: "1px",
                  display: "block",
                  marginBottom: 4
                }}>Unlocking In</span>
                <span style={{ 
                  fontFamily: F.heading, 
                  fontSize: 24, 
                  fontWeight: 700, 
                  color: C.accent,
                  letterSpacing: "1px"
                }}>{getCountdownString()}</span>
              </div>
            )}

            <div>
              <Btn onClick={() => window.location.hash = "#/dailysatsanga"}>Return to Daily Satsanga</Btn>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pi" style={{ background: C.pageBg, minHeight: "100vh" }}>
      <PageHdr title={quizData.title} subtitle={quizData.subtitle} accentColor={C.orange1} />
      
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
        
        {!hasStarted ? (
          <Card style={{ padding: "40px 32px", maxWidth: 500, margin: "0 auto", boxShadow: "0 10px 30px rgba(42,26,10,0.06)" }}>
            <h2 style={{ fontFamily: F.heading, color: C.brown1, fontSize: 24, marginBottom: 12, textAlign: "center" }}>Enter Your Details</h2>
            <p style={{ fontFamily: F.sans, color: C.textLight, fontSize: 14, marginBottom: 28, textAlign: "center", lineHeight: "1.5" }}>
              Please provide your information to begin the weekly assessment. Your score will be saved to track progress.
            </p>
            <form onSubmit={beginQuiz} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input 
                type="text" 
                placeholder="Your Name" 
                required 
                value={leadInfo.name} 
                onChange={e => setLeadInfo({...leadInfo, name: e.target.value})} 
                style={{ 
                  padding: "14px 16px", 
                  borderRadius: 8, 
                  border: `1px solid ${C.accentSoft}`, 
                  fontFamily: F.sans,
                  background: C.white,
                  color: C.ink,
                  fontSize: 15,
                  outline: "none"
                }} 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                value={leadInfo.email} 
                onChange={e => setLeadInfo({...leadInfo, email: e.target.value})} 
                style={{ 
                  padding: "14px 16px", 
                  borderRadius: 8, 
                  border: `1px solid ${C.accentSoft}`, 
                  fontFamily: F.sans,
                  background: C.white,
                  color: C.ink,
                  fontSize: 15,
                  outline: "none"
                }} 
              />
              <input 
                type="tel" 
                placeholder="Contact Number" 
                required 
                value={leadInfo.phone} 
                onChange={e => setLeadInfo({...leadInfo, phone: e.target.value})} 
                style={{ 
                  padding: "14px 16px", 
                  borderRadius: 8, 
                  border: `1px solid ${C.accentSoft}`, 
                  fontFamily: F.sans,
                  background: C.white,
                  color: C.ink,
                  fontSize: 15,
                  outline: "none"
                }} 
              />
              {errorMsg && (
                <div style={{ color: "#C62828", fontSize: 13, fontFamily: F.sans, textAlign: "center", background: "#FFEBEE", padding: "10px 14px", borderRadius: 8, border: "1px solid #F44336" }}>
                  {errorMsg}
                </div>
              )}
              <Btn style={{ marginTop: 16, width: "100%", padding: "14px" }} type="submit" disabled={checkingLead}>
                {checkingLead ? "Checking..." : "Start Quiz"}
              </Btn>
            </form>
          </Card>
        ) : showScore ? (
          <Card style={{ textAlign: "center", padding: "60px 40px", maxWidth: 600, margin: "0 auto", boxShadow: "0 10px 30px rgba(42,26,10,0.06)" }}>
            <span style={{ fontSize: 64, display: "block", marginBottom: 24 }}>🏆</span>
            <h2 style={{ fontFamily: F.heading, color: C.brown1, fontSize: 32, marginBottom: 12 }}>Quiz Completed!</h2>
            <p style={{ fontFamily: F.sans, color: C.textLight, fontSize: 18, marginBottom: 8 }}>
              You scored <strong style={{ color: C.accent, fontSize: 24 }}>{score}</strong> out of <strong style={{ fontSize: 20 }}>{questions.length}</strong>
            </p>
            <p style={{ fontFamily: F.sans, color: C.textMuted, fontSize: 14, marginBottom: 36 }}>
              Thank you for participating! Keep learning every day.
            </p>
            <div>
              <Btn onClick={() => window.location.hash = "#/dailysatsanga"}>Return to Daily Satsanga</Btn>
            </div>
          </Card>
        ) : (
          <Card style={{ padding: "clamp(16px, 4vw, 40px)", boxShadow: "0 10px 30px rgba(42,26,10,0.06)" }}>
            
            {/* 1. Explanation & Next button (Moved to the very top!) */}
            {selectedOption !== null && (
              <div className="quiz-explanation-card-header">
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontFamily: F.heading,
                    color: C.accent,
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}>
                    <span>📜</span> Explanation
                  </h4>
                  <p style={{
                    fontFamily: F.sans,
                    color: C.inkMid,
                    fontSize: 13,
                    lineHeight: "1.5",
                    fontStyle: "italic"
                  }}>
                    {questions[currentQuestion].explanation || "No explanation provided."}
                  </p>
                </div>
                <div style={{ flexShrink: 0, marginTop: 4 }}>
                  <Btn onClick={handleNext} style={{ padding: "8px 16px", fontSize: 13 }}>
                    {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </Btn>
                </div>
              </div>
            )}

            {/* 2. Score & Question Bar */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: F.sans, color: C.accent, fontWeight: 700, fontSize: 14 }}>Question {currentQuestion + 1} of {questions.length}</span>
                <span style={{ fontFamily: F.sans, color: C.textMuted, fontSize: 13 }}>Current Score: {score}/{questions.length}</span>
              </div>
              <div style={{ width: "100%", height: 6, background: C.surfaceAlt, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%`, height: "100%", background: C.accent, borderRadius: 3, transition: "width 0.3s ease" }} />
              </div>
            </div>

            {/* 3. Question Text */}
            <h3 style={{ fontFamily: F.heading, color: C.brown1, fontSize: 22, lineHeight: "1.5", marginBottom: 32 }}>
              {questions[currentQuestion].questionText}
            </h3>

            {/* 4. Options stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {questions[currentQuestion].options.map((option, index) => {
                const label = String.fromCharCode(65 + index); // A, B, C, D
                let bgColor = C.white;
                let borderColor = C.accentSoft;
                let textColor = C.ink;
                let fontWeight = 400;
                
                if (selectedOption === index) {
                  if (option.isCorrect) {
                    bgColor = "#E8F5E9"; borderColor = "#2E7D32"; textColor = "#2E7D32"; fontWeight = 700;
                  } else {
                    bgColor = "#FFEBEE"; borderColor = "#C62828"; textColor = "#C62828"; fontWeight = 700;
                  }
                } else if (selectedOption !== null && option.isCorrect) {
                  bgColor = "#E8F5E9"; borderColor = "#4CAF50"; textColor = "#2E7D32"; fontWeight = 700;
                }

                return (
                  <button
                    key={index}
                    onClick={() => selectedOption === null && handleAnswerOptionClick(option.isCorrect, index)}
                    disabled={selectedOption !== null}
                    style={{
                      background: bgColor,
                      border: `2px solid ${borderColor}`,
                      borderRadius: 8,
                      padding: "16px 20px",
                      textAlign: "left",
                      fontFamily: F.sans,
                      fontSize: 16,
                      fontWeight: fontWeight,
                      color: textColor,
                      cursor: selectedOption === null ? "pointer" : "default",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 4px rgba(42,26,10,0.02)",
                      display: "flex",
                      alignItems: "center",
                      gap: 12
                    }}
                    className={selectedOption === null ? "hl" : ""}
                  >
                    <span style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: selectedOption === index ? "transparent" : C.surface,
                      border: `1px solid ${selectedOption === index ? "transparent" : C.accentSoft}`,
                      fontSize: 14,
                      fontWeight: 700,
                      color: selectedOption === index ? "inherit" : C.accent,
                      flexShrink: 0
                    }}>
                      {label}
                    </span>
                    <span style={{ flexGrow: 1 }}>{option.answerText}</span>
                    {selectedOption === index && (
                      <span style={{ fontSize: 18, fontWeight: 700 }}>
                        {option.isCorrect ? "✓" : "✗"}
                      </span>
                    )}
                    {selectedOption !== null && selectedOption !== index && option.isCorrect && (
                      <span style={{ fontSize: 18, color: "#2E7D32", fontWeight: 700 }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
