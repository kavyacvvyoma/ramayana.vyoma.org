// ════════════════════════════════════════════════════════════════════════════
//  19_AdminDashboard.jsx  —  Admin Portal for Analytics & Quiz Data
// ════════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { C, F } from "./01_theme";
import { PageHdr, Btn, Card } from "./02_SharedComponents";

function parseUTCDate(dateStr) {
  if (!dateStr) return new Date();
  // SQLite CURRENT_TIMESTAMP is in UTC format: "YYYY-MM-DD HH:MM:SS"
  // We convert it to ISO format "YYYY-MM-DDTHH:MM:SSZ" so JS parses it as UTC
  const isoStr = dateStr.replace(" ", "T") + "Z";
  const parsed = new Date(isoStr);
  return isNaN(parsed.getTime()) ? new Date(dateStr) : parsed;
}

export function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [activeTab, setActiveTab] = useState("analytics");
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedWeekFilter, setSelectedWeekFilter] = useState("all");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedSubmission) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedSubmission]);

  // Simple mock authentication
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  // Fetch quiz data from SQLite backend
  useEffect(() => {
    if (isLoggedIn && activeTab === "quiz") {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001');
      fetch(`${apiUrl}/api/quiz`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setQuizData(data);
          } else {
            console.error("Expected array but got:", data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch quiz data:", err);
          setLoading(false);
        });
    }
  }, [isLoggedIn, activeTab]);

  // Compute unique weeks present in data
  const uniqueWeeks = Array.from(new Set(quizData.map(row => row.week_id).filter(Boolean))).sort();

  // Filter data by selected week
  const filteredQuizData = selectedWeekFilter === "all"
    ? quizData
    : quizData.filter(row => row.week_id === selectedWeekFilter);

  const exportToCSV = () => {
    if (filteredQuizData.length === 0) return;
    
    const headers = ["ID", "Week", "Name", "Email", "Phone", "Score", "Date"];
    const csvRows = [headers.join(",")];
    
    filteredQuizData.forEach(row => {
      const values = [
        row.id,
        `"${row.week_id}"`,
        `"${row.name}"`,
        `"${row.email}"`,
        `"${row.phone}"`,
        row.score,
        `"${parseUTCDate(row.submitted_at).toLocaleString()}"`
      ];
      csvRows.push(values.join(","));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ramayana_quiz_leads_${selectedWeekFilter}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderDetailModal = () => {
    if (!selectedSubmission) return null;

    let submissionAnswers = [];
    try {
      if (selectedSubmission.answers) {
        submissionAnswers = JSON.parse(selectedSubmission.answers);
      }
    } catch (e) {
      console.error("Failed to parse submission answers:", e);
    }

    return createPortal(
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(42, 26, 10, 0.4)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }} onClick={() => setSelectedSubmission(null)}>
        <Card 
          style={{ 
            width: "100%", 
            maxWidth: 700, 
            padding: 32, 
            maxHeight: "85vh", 
            overflowY: "auto", 
            boxShadow: "0 20px 50px rgba(42, 26, 10, 0.15)",
            position: "relative",
            animation: "fadeUp 0.3s ease"
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={() => setSelectedSubmission(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "transparent",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              color: C.textLight
            }}
          >
            &times;
          </button>

          <h3 style={{ fontFamily: F.heading, color: C.brown1, fontSize: 24, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <span>📝</span> Quiz Response Details
          </h3>
          <p style={{ fontFamily: F.sans, color: C.textLight, fontSize: 14, marginBottom: 24 }}>
            Submission details for <strong>{selectedSubmission.name}</strong> on {parseUTCDate(selectedSubmission.submitted_at).toLocaleString()}
          </p>

          {/* User info row */}
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap",
            gap: "20px 24px", 
            background: C.surface, 
            padding: "16px 20px", 
            borderRadius: 8, 
            border: `1px solid ${C.orange4}`,
            marginBottom: 28,
            fontFamily: F.sans,
            fontSize: 14
          }}>
            <div style={{ flex: "1 1 200px", minWidth: 0 }}>
              <span style={{ color: C.textLight, fontSize: 12, textTransform: "uppercase" }}>Email</span>
              <div style={{ fontWeight: 600, color: C.brown1, marginTop: 2, wordBreak: "break-all" }}>{selectedSubmission.email}</div>
            </div>
            <div style={{ flex: "1 1 120px" }}>
              <span style={{ color: C.textLight, fontSize: 12, textTransform: "uppercase" }}>Phone</span>
              <div style={{ fontWeight: 600, color: C.brown1, marginTop: 2 }}>{selectedSubmission.phone || "N/A"}</div>
            </div>
            <div style={{ flex: "1 1 100px" }}>
              <span style={{ color: C.textLight, fontSize: 12, textTransform: "uppercase" }}>Week</span>
              <div style={{ fontWeight: 600, color: C.brown1, marginTop: 2 }}>{selectedSubmission.week_id}</div>
            </div>
            <div style={{ flex: "1 1 100px" }}>
              <span style={{ color: C.textLight, fontSize: 12, textTransform: "uppercase" }}>Final Score</span>
              <div style={{ fontWeight: 700, color: C.accent, marginTop: 2, fontSize: 16 }}>{selectedSubmission.score} / {submissionAnswers.length || "?"}</div>
            </div>
          </div>

          {/* Question answers list */}
          <h4 style={{ fontFamily: F.heading, color: C.brown1, fontSize: 16, marginBottom: 16, borderBottom: `1px solid ${C.orange4}`, paddingBottom: 8 }}>
            Detailed Answers
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {submissionAnswers.length === 0 ? (
              <div style={{ padding: "24px 0", textAlign: "center", color: C.textMuted, fontFamily: F.sans, fontSize: 14, fontStyle: "italic" }}>
                No detailed response data available for this legacy submission.
              </div>
            ) : (
              submissionAnswers.map((ans, idx) => (
                <div key={idx} style={{
                  padding: "16px 20px",
                  background: ans.isCorrect ? "#E8F5E930" : "#FFEBEE30",
                  borderLeft: `4px solid ${ans.isCorrect ? "#4CAF50" : "#F44336"}`,
                  borderRadius: "0 8px 8px 0",
                  fontFamily: F.sans,
                  fontSize: 14
                }}>
                  <div style={{ fontWeight: 700, color: C.brown1, marginBottom: 8 }}>
                    Q{idx + 1}. {ans.question}
                  </div>
                  
                  {/* Selected option */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ color: C.textLight }}>Selected Answer:</span>
                    <span style={{ 
                      fontWeight: 600, 
                      color: ans.isCorrect ? "#2E7D32" : "#C62828",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4
                    }}>
                      Option {ans.selectedLabel}: {ans.selectedOption} 
                      <span>{ans.isCorrect ? "✓" : "✗"}</span>
                    </span>
                  </div>

                  {/* Correct answer (if wrong) */}
                  {!ans.isCorrect && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#2E7D32" }}>
                      <span style={{ color: C.textLight }}>Correct Answer:</span>
                      <span style={{ fontWeight: 600 }}>
                        Option {ans.correctLabel}: {ans.correctOption}
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end" }}>
            <Btn onClick={() => setSelectedSubmission(null)} style={{ padding: "10px 24px" }}>Close Details</Btn>
          </div>
        </Card>
      </div>,
      document.body
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="pi" style={{ minHeight: "calc(100svh - 70px)", display: "flex", alignItems: "center", justifyContent: "center", background: C.pageBg }}>
        <Card style={{ padding: "40px 32px", width: "100%", maxWidth: 400 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <i className="ti ti-lock" style={{ fontSize: 40, color: C.orange1, marginBottom: 12 }}></i>
            <h2 style={{ fontFamily: F.heading, color: C.brown1, fontSize: 24 }}>Admin Login</h2>
          </div>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              style={{ padding: "12px", borderRadius: 8, border: `1px solid ${C.orange4}`, fontFamily: F.sans }} 
            />
            {error && <div style={{ color: "red", fontSize: 13, fontFamily: F.sans }}>{error}</div>}
            <Btn type="submit" style={{ width: "100%" }}>Login</Btn>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="pi" style={{ minHeight: "calc(100svh - 70px)", background: C.pageBg, paddingBottom: 60 }}>
      <PageHdr title="Admin Dashboard" subtitle="Manage analytics and view quiz submissions" accentColor={C.orange1} />
      
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", marginTop: 30 }}>
        
        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: 8, borderBottom: `2px solid ${C.orange4}`, marginBottom: 30 }}>
          <button 
            onClick={() => setActiveTab("analytics")}
            style={{
              padding: "12px 24px", background: activeTab === "analytics" ? C.orange5 : "transparent",
              color: activeTab === "analytics" ? C.orange1 : C.textMid, border: "none", cursor: "pointer",
              borderBottom: activeTab === "analytics" ? `3px solid ${C.orange1}` : "3px solid transparent",
              fontFamily: F.sans, fontSize: 16, fontWeight: activeTab === "analytics" ? 600 : 500,
              borderTopLeftRadius: 8, borderTopRightRadius: 8, transition: "all 0.2s"
            }}
          >
            <i className="ti ti-chart-bar" style={{ marginRight: 8 }}></i>
            Analytics Overview
          </button>
          <button 
            onClick={() => setActiveTab("quiz")}
            style={{
              padding: "12px 24px", background: activeTab === "quiz" ? C.orange5 : "transparent",
              color: activeTab === "quiz" ? C.orange1 : C.textMid, border: "none", cursor: "pointer",
              borderBottom: activeTab === "quiz" ? `3px solid ${C.orange1}` : "3px solid transparent",
              fontFamily: F.sans, fontSize: 16, fontWeight: activeTab === "quiz" ? 600 : 500,
              borderTopLeftRadius: 8, borderTopRightRadius: 8, transition: "all 0.2s"
            }}
          >
            <i className="ti ti-users" style={{ marginRight: 8 }}></i>
            Quiz Submissions
          </button>
        </div>

        {/* Tab Content: Analytics */}
        {activeTab === "analytics" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            <Card style={{ padding: 24 }}>
              <div style={{ fontFamily: F.sans, color: C.textMid, fontSize: 14, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Total Video Plays</div>
              <div style={{ fontFamily: F.heading, color: C.brown1, fontSize: 42, display: "flex", alignItems: "center", gap: 12 }}>
                24,192 <span style={{ fontSize: 16, color: "green", fontFamily: F.sans }}>↑ 12%</span>
              </div>
              <p style={{ fontFamily: F.sans, color: C.textLight, fontSize: 13, marginTop: 12 }}>From Google Analytics (yt_video_play)</p>
            </Card>
            <Card style={{ padding: 24 }}>
              <div style={{ fontFamily: F.sans, color: C.textMid, fontSize: 14, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Active Daily Users</div>
              <div style={{ fontFamily: F.heading, color: C.brown1, fontSize: 42, display: "flex", alignItems: "center", gap: 12 }}>
                1,402 <span style={{ fontSize: 16, color: "green", fontFamily: F.sans }}>↑ 5%</span>
              </div>
              <p style={{ fontFamily: F.sans, color: C.textLight, fontSize: 13, marginTop: 12 }}>Estimated via heartbeat tracking</p>
            </Card>
            <Card style={{ padding: 24 }}>
              <div style={{ fontFamily: F.sans, color: C.textMid, fontSize: 14, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Top Chanting vs Explanation</div>
              <div style={{ display: "flex", height: 24, borderRadius: 12, overflow: "hidden", marginTop: 12 }}>
                <div style={{ width: "68%", background: C.orange1, display: "flex", alignItems: "center", paddingLeft: 12, color: "#fff", fontSize: 12, fontFamily: F.sans }}>Chanting 68%</div>
                <div style={{ width: "32%", background: C.orange3, display: "flex", alignItems: "center", paddingLeft: 12, color: C.brown1, fontSize: 12, fontFamily: F.sans }}>Expl. 32%</div>
              </div>
            </Card>
            <Card style={{ padding: 24 }}>
              <div style={{ fontFamily: F.sans, color: C.textMid, fontSize: 14, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Top Script Languages</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { lang: "Devanagari", pct: 45 },
                  { lang: "Kannada", pct: 25 },
                  { lang: "Telugu", pct: 15 },
                  { lang: "Tamil", pct: 10 },
                  { lang: "English", pct: 5 }
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 80, fontFamily: F.sans, fontSize: 13, color: C.brown1 }}>{item.lang}</div>
                    <div style={{ flex: 1, background: C.orange5, height: 8, borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${item.pct}%`, background: C.orange1, height: "100%" }}></div>
                    </div>
                    <div style={{ width: 30, fontFamily: F.sans, fontSize: 12, color: C.textMid, textAlign: "right" }}>{item.pct}%</div>
                  </div>
                ))}
              </div>
            </Card>
            
            <div style={{ gridColumn: "1 / -1", padding: 16, background: "#FFF8E1", border: "1px solid #FFE082", borderRadius: 8, fontFamily: F.sans, fontSize: 14, color: "#795548" }}>
              <strong>Note:</strong> The above charts are visual placeholders. For live real-time analytics data, please log into your Google Analytics (GA4) dashboard.
            </div>
          </div>
        )}

        {/* Tab Content: Quiz Submissions */}
        {activeTab === "quiz" && (
          <Card style={{ padding: "32px 0" }}>
            
            {/* Quick Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32, padding: "0 32px" }}>
              <div style={{ background: C.surface, padding: "16px", borderRadius: 8, border: `1px solid ${C.orange4}` }}>
                <div style={{ fontSize: 12, color: C.textLight, fontFamily: F.sans, textTransform: "uppercase", letterSpacing: 0.5 }}>Submissions Shown</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.brown1, fontFamily: F.heading, marginTop: 4 }}>{filteredQuizData.length}</div>
              </div>
              <div style={{ background: C.surface, padding: "16px", borderRadius: 8, border: `1px solid ${C.orange4}` }}>
                <div style={{ fontSize: 12, color: C.textLight, fontFamily: F.sans, textTransform: "uppercase", letterSpacing: 0.5 }}>Average Score</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.brown1, fontFamily: F.heading, marginTop: 4 }}>
                  {filteredQuizData.length > 0 
                    ? (filteredQuizData.reduce((sum, r) => sum + r.score, 0) / filteredQuizData.length).toFixed(1)
                    : "0.0"
                  }
                </div>
              </div>
              <div style={{ background: C.surface, padding: "16px", borderRadius: 8, border: `1px solid ${C.orange4}`, gridColumn: "span 2" }}>
                <div style={{ fontSize: 12, color: C.textLight, fontFamily: F.sans, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Total Submissions By Week</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {uniqueWeeks.length === 0 ? (
                    <span style={{ fontSize: 12, color: C.textMuted, fontFamily: F.sans }}>No submissions yet.</span>
                  ) : (
                    uniqueWeeks.map(wk => {
                      const count = quizData.filter(r => r.week_id === wk).length;
                      return (
                        <span key={wk} style={{ fontSize: 12, background: C.orange5, color: C.orange1, padding: "4px 10px", borderRadius: 12, fontWeight: 600, fontFamily: F.sans }}>
                          {wk}: <strong>{count}</strong>
                        </span>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <hr style={{ border: "none", borderTop: `1px solid ${C.orange4}`, margin: "0 32px 24px 32px" }} />

            <div style={{ padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
              <h3 style={{ fontFamily: F.heading, color: C.brown1, fontSize: 20, margin: 0 }}>Recent Quiz Completions</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontFamily: F.sans, fontSize: 14, color: C.textMid, fontWeight: 600 }}>Week:</label>
                  <select 
                    value={selectedWeekFilter} 
                    onChange={e => setSelectedWeekFilter(e.target.value)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: `1px solid ${C.orange4}`,
                      fontFamily: F.sans,
                      fontSize: 14,
                      color: C.ink,
                      background: C.white,
                      outline: "none",
                      cursor: "pointer"
                    }}
                  >
                    <option value="all">All Weeks</option>
                    {uniqueWeeks.map(wk => (
                      <option key={wk} value={wk}>{wk}</option>
                    ))}
                  </select>
                </div>
                <Btn onClick={exportToCSV} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px" }}>
                  <i className="ti ti-download"></i> Export CSV
                </Btn>
              </div>
            </div>
            
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.sans, fontSize: 14 }}>
                <thead>
                  <tr style={{ background: C.orange5, borderTop: `1px solid ${C.orange4}`, borderBottom: `1px solid ${C.orange4}` }}>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: C.brown1, fontWeight: 600 }}>Date</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: C.brown1, fontWeight: 600 }}>Week</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: C.brown1, fontWeight: 600 }}>Name</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: C.brown1, fontWeight: 600 }}>Email</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: C.brown1, fontWeight: 600 }}>Phone</th>
                    <th style={{ padding: "12px 16px", textAlign: "center", color: C.brown1, fontWeight: 600 }}>Score</th>
                    <th style={{ padding: "12px 16px", textAlign: "center", color: C.brown1, fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" style={{ padding: "32px", textAlign: "center", color: C.textMid }}>Loading data from server...</td>
                    </tr>
                  ) : filteredQuizData.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ padding: "32px", textAlign: "center", color: C.textMid }}>
                        No quiz submissions found for this selection.
                      </td>
                    </tr>
                  ) : (
                    filteredQuizData.map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.orange5}` }}>
                        <td style={{ padding: "12px 16px", color: C.textMid }}>{parseUTCDate(row.submitted_at).toLocaleDateString()}</td>
                        <td style={{ padding: "12px 16px", color: C.textMid }}>{row.week_id}</td>
                        <td style={{ padding: "12px 16px", color: C.brown1, fontWeight: 500 }}>{row.name}</td>
                        <td style={{ padding: "12px 16px", color: C.textMid }}>{row.email}</td>
                        <td style={{ padding: "12px 16px", color: C.textMid }}>{row.phone}</td>
                        <td style={{ padding: "12px 16px", textAlign: "center", color: C.brown1, fontWeight: 600 }}>
                          <span style={{ background: C.orange5, padding: "4px 8px", borderRadius: 4 }}>{row.score}</span>
                        </td>
                        <td style={{ padding: "12px 16px", textAlign: "center" }}>
                          <Btn 
                            onClick={() => setSelectedSubmission(row)} 
                            style={{ 
                              padding: "6px 12px", 
                              fontSize: 12, 
                              background: C.orange1,
                              color: "#fff",
                              display: "inline-flex", 
                              alignItems: "center", 
                              gap: 4 
                            }}
                          >
                            <i className="ti ti-eye" style={{ fontSize: 14 }}></i> View Answers
                          </Btn>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
      
      {/* Response detail modal */}
      {renderDetailModal()}
    </div>
  );
}
