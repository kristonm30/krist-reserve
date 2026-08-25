import { useState, useRef, useEffect } from "react";

const SUGGESTED_STARTERS = [
  "I need a jet from Miami to Aspen next Friday",
  "Looking for a round trip, 6 passengers, NYC to London",
  "What's this going to cost me roughly?",
];

function parseLead(content) {
  const idx = content.indexOf("---\nLEAD SUMMARY");
  if (idx === -1) return null;
  const block = content.slice(idx);
  const lines = block
    .split("\n")
    .filter((l) => l.includes(":") && !l.startsWith("---") && l !== "LEAD SUMMARY");
  const lead = {};
  lines.forEach((line) => {
    const [label, ...rest] = line.split(":");
    lead[label.trim().toLowerCase()] = rest.join(":").trim();
  });
  return lead;
}

export default function KristReserve() {
  const [view, setView] = useState("chat");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Good evening. I'm KRIST, your concierge for Alta Jet Partners. Where would you like to fly?",
    },
  ]);
  const [leads, setLeads] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Calls OUR OWN backend route, not Anthropic directly.
      // The API key never touches the browser.
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      const lead = parseLead(data.text);
      if (lead) {
        setLeads((prev) => [{ ...lead, id: Date.now(), capturedAt: new Date() }, ...prev]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function renderMessageContent(content) {
    const idx = content.indexOf("---\nLEAD SUMMARY");
    if (idx === -1) return <p className="msg-text">{content}</p>;
    const before = content.slice(0, idx).trim();
    const summaryBlock = content.slice(idx);
    const lines = summaryBlock
      .split("\n")
      .filter((l) => l.includes(":") && !l.startsWith("---") && l !== "LEAD SUMMARY");
    return (
      <>
        {before && <p className="msg-text">{before}</p>}
        <div className="summary-card">
          <div className="summary-header">
            <span className="summary-dot" />
            LEAD SUMMARY
          </div>
          {lines.map((line, i) => {
            const [label, ...rest] = line.split(":");
            return (
              <div className="summary-row" key={i}>
                <span className="summary-label">{label.trim()}</span>
                <span className="summary-value">{rest.join(":").trim()}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <div className="kr-root">
      <div className="kr-header">
        <div className="kr-brand">
          <div className="kr-wordmark">
            <span>KRIST</span> <span style={{ fontWeight: 400 }}>Reserve.</span>
          </div>
          <div className="kr-subline">for Alta Jet Partners</div>
        </div>
        <div className="kr-header-right">
          <div className="kr-tabs">
            <button
              className={`kr-tab ${view === "chat" ? "active" : ""}`}
              onClick={() => setView("chat")}
            >
              Concierge
            </button>
            <button
              className={`kr-tab ${view === "dashboard" ? "active" : ""}`}
              onClick={() =>
