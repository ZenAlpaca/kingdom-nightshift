import React, { useState, useEffect, useContext, createContext } from "react";

// ─── Language Context & Translations ─────────────────────────────────────────

const LangContext  = createContext("en");
const DeptsContext = createContext([]);

const T = {
  en: {
    appSub: "Staff Scheduling Platform",
    selectProfile: "Select your profile",
    enterPin: "Enter PIN",
    pinError: "Incorrect PIN — try again",
    back: "← Back",
    owner: "Owner",
    // Nav
    schedule: "Schedule", availability: "Availability", timeOff: "Time Off",
    swaps: "Swaps", admin: "Admin",
    // Schedule
    mySchedule: "My Schedule", fullSchedule: "Full Schedule",
    allSchedules: "All Schedules", weekOf: "Week of",
    myShifts: "My Shifts", noShiftsMsg: "No shifts scheduled for you this week",
    switchFull: "Switch to Full Schedule to see who's working",
    off: "Off", giveUp: "Give Up", pendingPickup: "Pending pickup…",
    awaitingCoworker: "Open for pickup — awaiting a coworker",
    // Availability
    availabilityTitle: "Availability", submitAvail: "Submit",
    updateAvail: "Update", noAvailYet: "Nothing submitted yet",
    noAvailSub: "Let the owner know when you're free for an upcoming weekend",
    availSubmitted: "✅ Availability submitted",
    noShowDays: "No upcoming show days have been scheduled yet.",
    noShowDaysSub: "The owner needs to mark show days in the Admin panel first.",
    selectWeekends: "Select the weekend(s) you're submitting for",
    tapWeekend: "Tap a weekend above to fill in your availability",
    allShowNights: "All show nights are included — tap ✕ on any day to skip it",
    yes: "Yes", no: "No", allDay: "All Day",
    from: "From", until: "Until", notes: "Notes (optional)",
    notesPlaceholder: "e.g. Can't arrive before 9pm, leaving early…",
    skipped: "Skipped:", submit: "Submit", cancel: "Cancel",
    showNight: "show night",
    // Time Off
    timeOffTitle: "Time Off", requestTimeAway: "Request time away",
    reviewRequests: "Review staff requests", request: "+ Request",
    noRequests: "No requests", approve: "Approve", deny: "Deny",
    remove: "Remove", keepIt: "Keep it", yesRemove: "Yes, Remove",
    cancelApproval: "Cancel Approval",
    removeConfirm: "Remove this request?",
    removeApprovedConfirm: "This was already approved. Removing it will notify the owner that your plans changed. Are you sure?",
    tapStart: "Tap a start date", tapEnd: "Tap an end date (or submit single day)",
    days: "days", clear: "Clear",
    reason: "Reason (optional)", reasonPlaceholder: "Vacation, appointment, personal…",
    submitRequest: "Submit Request",
    pending: "pending", approved: "approved", denied: "denied",
    // Swaps
    swapsTitle: "Shift Swaps", swapsSub: "Post a shift for pickup or claim one from a coworker",
    availToClaim: "🔄 AVAILABLE TO CLAIM", waitingPickup: "⏳ WAITING FOR PICKUP",
    myShiftsLabel: "MY SHIFTS", noUpcoming: "No upcoming shifts",
    claim: "Claim →", giveUpArrow: "Give Up →",
    coworkersNotified: "Coworkers notified — if no one claims it, it stays yours",
    posted: "Posted", postForPickup: "Post for Pickup",
    giveUpTitle: "Give Up Shift",
    giveUpDesc: "This shift will be posted as",
    openForPickup: "open for pickup",
    giveUpDesc2: ". Every",
    giveUpDesc3: "will be notified and can claim it. If no one takes it,",
    itStaysYours: "it stays yours.",
    noteForCoworkers: "Note for coworkers (optional)",
    noteForCoworkersPlaceholder: "e.g. Have a family event, can swap another night, etc.",
    // Notifications
    notifsTitle: "Notifications", allClear: "All clear",
    // Schedule builder / admin
    publishSchedule: "Publish Schedule", published: "✓ Published",
    schedulePublished: "Schedule published!",
    // Misc
    show: "Show:", today: "Today",
  },
  es: {
    appSub: "Plataforma de Horarios del Personal",
    selectProfile: "Selecciona tu perfil",
    enterPin: "Ingresa tu PIN",
    pinError: "PIN incorrecto — intenta de nuevo",
    back: "← Atrás",
    owner: "Dueño",
    // Nav
    schedule: "Horario", availability: "Disponibilidad", timeOff: "Tiempo Libre",
    swaps: "Cambios", admin: "Admin",
    // Schedule
    mySchedule: "Mi Horario", fullSchedule: "Horario Completo",
    allSchedules: "Todos los Horarios", weekOf: "Semana del",
    myShifts: "Mis Turnos", noShiftsMsg: "No tienes turnos programados esta semana",
    switchFull: "Ver Horario Completo para ver quién trabaja",
    off: "Libre", giveUp: "Ceder", pendingPickup: "Esperando que alguien lo tome…",
    awaitingCoworker: "Disponible para pickup — esperando compañero",
    // Availability
    availabilityTitle: "Disponibilidad", submitAvail: "Enviar",
    updateAvail: "Actualizar", noAvailYet: "Nada enviado todavía",
    noAvailSub: "Dile al dueño cuándo estás libre el próximo fin de semana",
    availSubmitted: "✅ Disponibilidad enviada",
    noShowDays: "No hay días de show programados todavía.",
    noShowDaysSub: "El dueño necesita marcar los días de show en el panel de Admin primero.",
    selectWeekends: "Selecciona el/los fin(es) de semana que quieres enviar",
    tapWeekend: "Toca un fin de semana para completar tu disponibilidad",
    allShowNights: "Todas las noches de show están incluidas — toca ✕ para omitir un día",
    yes: "Sí", no: "No", allDay: "Todo el Día",
    from: "Desde", until: "Hasta", notes: "Notas (opcional)",
    notesPlaceholder: "Ej. No puedo llegar antes de las 9pm, salgo temprano…",
    skipped: "Omitidos:", submit: "Enviar", cancel: "Cancelar",
    showNight: "noche de show",
    // Time Off
    timeOffTitle: "Tiempo Libre", requestTimeAway: "Solicitar tiempo libre",
    reviewRequests: "Revisar solicitudes del personal", request: "+ Solicitar",
    noRequests: "Sin solicitudes", approve: "Aprobar", deny: "Rechazar",
    remove: "Eliminar", keepIt: "Conservar", yesRemove: "Sí, Eliminar",
    cancelApproval: "Cancelar Aprobación",
    removeConfirm: "¿Eliminar esta solicitud?",
    removeApprovedConfirm: "Esta ya fue aprobada. Eliminarla notificará al dueño que tus planes cambiaron. ¿Estás seguro?",
    tapStart: "Toca una fecha de inicio", tapEnd: "Toca una fecha de fin (o envía un solo día)",
    days: "días", clear: "Borrar",
    reason: "Motivo (opcional)", reasonPlaceholder: "Vacaciones, cita médica, personal…",
    submitRequest: "Enviar Solicitud",
    pending: "pendiente", approved: "aprobado", denied: "rechazado",
    // Swaps
    swapsTitle: "Cambios de Turno", swapsSub: "Publica un turno o toma uno de un compañero",
    availToClaim: "🔄 DISPONIBLES PARA TOMAR", waitingPickup: "⏳ ESPERANDO QUE LO TOMEN",
    myShiftsLabel: "MIS TURNOS", noUpcoming: "Sin turnos próximos",
    claim: "Tomar →", giveUpArrow: "Ceder →",
    coworkersNotified: "Compañeros notificados — si nadie lo toma, sigue siendo tuyo",
    posted: "Publicado", postForPickup: "Publicar para Pickup",
    giveUpTitle: "Ceder Turno",
    giveUpDesc: "Este turno se publicará como",
    openForPickup: "disponible para tomar",
    giveUpDesc2: ". Todos los",
    giveUpDesc3: "serán notificados y podrán tomarlo. Si nadie lo toma,",
    itStaysYours: "sigue siendo tuyo.",
    noteForCoworkers: "Nota para compañeros (opcional)",
    noteForCoworkersPlaceholder: "Ej. Tengo un evento familiar, puedo cambiar otra noche, etc.",
    // Notifications
    notifsTitle: "Notificaciones", allClear: "Todo en orden",
    // Schedule builder / admin
    publishSchedule: "Publicar Horario", published: "✓ Publicado",
    schedulePublished: "¡Horario publicado!",
    // Misc
    show: "Ver:", today: "Hoy",
  }
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const USERS = [
  { id: 1, name: "Jordan Rivera", role: "owner", dept: null, pin: "0000", phone: "5551110000", avatar: "JR" },
  { id: 2, name: "Marcus Bell",   role: "employee", dept: "Bartender",         pin: "1111", phone: "5551110001", avatar: "MB" },
  { id: 3, name: "Sienna Walsh",  role: "employee", dept: "Bartender",         pin: "2222", phone: "5551110002", avatar: "SW" },
  { id: 4, name: "Devon Park",    role: "employee", dept: "Security",          pin: "3333", phone: "5551110003", avatar: "DP" },
  { id: 5, name: "Camille Tran",  role: "employee", dept: "Box Office",        pin: "4444", phone: "5551110004", avatar: "CT" },
  { id: 6, name: "Remy Stone",    role: "employee", dept: "Barback",           pin: "5555", phone: "5551110005", avatar: "RS" },
  { id: 7, name: "Nadia Cruz",    role: "employee", dept: "Lighting Director", pin: "6666", phone: "5551110006", avatar: "NC" },
  { id: 8, name: "Theo James",    role: "employee", dept: "Security",          pin: "7777", phone: "5551110007", avatar: "TJ" },
];

const INITIAL_DEPTS = [
  { name: "Box Office",        color: "#a855f7" },
  { name: "Security",          color: "#3b82f6" },
  { name: "Lighting Director", color: "#eab308" },
  { name: "Bartender",         color: "#f97316" },
  { name: "Barback",           color: "#22c55e" },
];

// Helper: resolve color from depts array
function deptColor(depts, name) {
  return (depts.find(d => d.name === name) || {}).color || "#888";
}

const ALL_DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DEFAULT_SHOW_DAYS = [4, 5, 6]; // Thu, Fri, Sat

function getWeekDates(offset = 0) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function fmt(date) { return `${date.getMonth() + 1}/${date.getDate()}`; }

const initialShifts = [
  { id: 1, userId: 2, date: fmt(getWeekDates()[4]), start: "8:00 PM", end: "2:00 AM", role: "Bartender", note: "Main Bar" },
  { id: 2, userId: 3, date: fmt(getWeekDates()[4]), start: "8:00 PM", end: "2:00 AM", role: "Bartender", note: "VIP Bar" },
  { id: 3, userId: 4, date: fmt(getWeekDates()[4]), start: "7:00 PM", end: "3:00 AM", role: "Security", note: "Front Door" },
  { id: 4, userId: 8, date: fmt(getWeekDates()[5]), start: "7:00 PM", end: "3:00 AM", role: "Security", note: "Floor" },
  { id: 5, userId: 5, date: fmt(getWeekDates()[5]), start: "6:00 PM", end: "11:00 PM", role: "Box Office", note: "" },
  { id: 6, userId: 6, date: fmt(getWeekDates()[5]), start: "8:00 PM", end: "2:00 AM", role: "Barback", note: "Main Bar" },
  { id: 7, userId: 7, date: fmt(getWeekDates()[6]), start: "5:00 PM", end: "3:00 AM", role: "Lighting Director", note: "Setup + Show" },
  { id: 8, userId: 2, date: fmt(getWeekDates()[6]), start: "9:00 PM", end: "3:00 AM", role: "Bartender", note: "Main Bar" },
];

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [user, setUser]                   = useState(null);
  const [lang, setLang]                   = useState("en");
  const [depts, setDepts]                 = useState(INITIAL_DEPTS);
  const [allUsers, setAllUsers]           = useState(USERS);
  const [shifts, setShifts]               = useState(initialShifts);
  const [giveupRequests, setGiveupRequests] = useState([]);
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [availability, setAvailability]   = useState({});
  const [notifications, setNotifications] = useState([]);
  const [view, setView]                   = useState("schedule");
  const [weekOffset, setWeekOffset]       = useState(0);
  const [loginStep, setLoginStep]         = useState("select");
  const [selectedUser, setSelectedUser]   = useState(null);
  const [pinInput, setPinInput]           = useState("");
  const [pinError, setPinError]           = useState(false);
  const [modal, setModal]                 = useState(null);
  const [shiftForm, setShiftForm]         = useState({ userId: "", date: "", start: "", end: "", role: "", note: "" });
  const [visibleDays, setVisibleDays]     = useState(DEFAULT_SHOW_DAYS);
  // dayMeta: { "M/D": { doors, close } } — persists after publish so ScheduleView can show it
  const [dayMeta, setDayMeta]             = useState({});
  // showDays: Set of "YYYY-MM-DD" strings representing confirmed show nights
  const [showDays, setShowDays]           = useState(() => {
    // Pre-seed with this week's Thu/Fri/Sat as defaults
    const dates = getWeekDates(0);
    return new Set([4, 5, 6].map(i => {
      const d = dates[i];
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    }));
  });

  const weekDates = getWeekDates(weekOffset);
  const myNotifs  = notifications.filter(n => n.userId === user?.id && !n.read);

  function addNotif(userId, msg, type = "info") {
    setNotifications(prev => [...prev, {
      id: Date.now() + Math.random(), userId, msg, type, read: false,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }]);
  }

  // ─── Telegram ────────────────────────────────────────────────────────────────
  const TG_TOKEN  = "8676807639:AAEKN94cSQT1sbXZfZhx0yUyYJe4Mn3pLRY";
  const TG_CHAT   = "7762560415";

  function sendTelegram(text) {
    fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TG_CHAT, text, parse_mode: "HTML" })
    }).catch(() => {}); // silent fail — in-app notifications always work regardless
  }

  function handleLogin() {
    if (pinInput === selectedUser.pin) {
      setUser(selectedUser); setPinInput(""); setPinError(false); setLoginStep("select");
    } else { setPinError(true); setPinInput(""); }
  }

  function logout() { setUser(null); setView("schedule"); setWeekOffset(0); }

  function postGiveup(shiftId, note = "") {
    const shift = shifts.find(s => s.id === shiftId);
    const req = { id: Date.now(), shiftId, fromUserId: user.id, status: "open", takenBy: null, note };
    setGiveupRequests(prev => [...prev, req]);
    const notifMsg = note
      ? `🔄 ${user.name} is giving up their ${shift.role} shift on ${shift.date} (${shift.start}–${shift.end}). Note: "${note}" — Go to Swaps to claim it!`
      : `🔄 ${user.name} is giving up their ${shift.role} shift on ${shift.date} (${shift.start}–${shift.end}). Go to Swaps to claim it!`;
    allUsers.filter(u => u.role === "employee" && u.dept === shift.role && u.id !== user.id)
      .forEach(u => addNotif(u.id, notifMsg, "swap"));
    const tgMsg = note
      ? `🔄 <b>Shift Available for Pickup</b>\n\n<b>${user.name}</b> is giving up their <b>${shift.role}</b> shift\n📅 ${shift.date} · ${shift.start}–${shift.end}\n💬 "${note}"\n\nOpen Kingdom NightShift to claim it.`
      : `🔄 <b>Shift Available for Pickup</b>\n\n<b>${user.name}</b> is giving up their <b>${shift.role}</b> shift\n📅 ${shift.date} · ${shift.start}–${shift.end}\n\nOpen Kingdom NightShift to claim it.`;
    sendTelegram(tgMsg);
    setModal(null);
  }

  function claimShift(reqId) {
    const req = giveupRequests.find(r => r.id === reqId);
    const shift = shifts.find(s => s.id === req.shiftId);
    const original = allUsers.find(u => u.id === req.fromUserId);
    setGiveupRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: "taken", takenBy: user.id } : r));
    setShifts(prev => prev.map(s => s.id === shift.id ? { ...s, userId: user.id } : s));
    addNotif(req.fromUserId, `✅ ${user.name} claimed your ${shift.role} shift on ${shift.date}. You're free!`, "swap");
    addNotif(user.id, `You claimed ${original.name}'s ${shift.role} shift on ${shift.date} (${shift.start}–${shift.end})`, "swap");
    allUsers.filter(u => u.role === "employee" && u.dept === shift.role && u.id !== user.id && u.id !== req.fromUserId)
      .forEach(u => addNotif(u.id, `The ${shift.role} shift on ${shift.date} was claimed — no longer available.`, "info"));
    sendTelegram(`✅ <b>Shift Claimed</b>\n\n<b>${user.name}</b> picked up <b>${original.name}</b>'s <b>${shift.role}</b> shift\n📅 ${shift.date} · ${shift.start}–${shift.end}`);
  }

  function submitTimeOff(dates, reason) {
    setTimeOffRequests(prev => [...prev, { id: Date.now(), userId: user.id, dates, reason, status: "pending" }]);
    addNotif(1, `🏖 ${user.name} requested time off: ${dates}`);
    sendTelegram(`🏖 <b>Time Off Request</b>\n\n<b>${user.name}</b> has requested time off\n📅 ${dates}${reason ? `\n💬 ${reason}` : ""}\n\nApprove or deny in Kingdom NightShift → Admin → Time Off.`);
    setModal(null);
  }

  function handleTimeOffAction(id, action) {
    const req = timeOffRequests.find(r => r.id === id);
    const emp = allUsers.find(u => u.id === req.userId);
    setTimeOffRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    addNotif(req.userId, `Your time off request was ${action === "approved" ? "✅ approved" : "❌ denied"}.`);
    const emoji = action === "approved" ? "✅" : "❌";
    sendTelegram(`${emoji} <b>Time Off ${action === "approved" ? "Approved" : "Denied"}</b>\n\n<b>${emp?.name}</b>'s request for <b>${req.dates}</b> has been <b>${action}</b>.`);
  }

  function deleteTimeOff(id) {
    const req = timeOffRequests.find(r => r.id === id);
    setTimeOffRequests(prev => prev.filter(r => r.id !== id));
    // notify owner if it was approved so they know plans changed
    if (req?.status === "approved") {
      addNotif(1, `⚠️ ${user.name} cancelled their approved time off: ${req.dates}`);
    }
  }

  function saveShift() {
    if (!shiftForm.userId || !shiftForm.date || !shiftForm.start || !shiftForm.end || !shiftForm.role) return;
    const newShift = { ...shiftForm, id: Date.now(), userId: parseInt(shiftForm.userId) };
    setShifts(prev => [...prev, newShift]);
    addNotif(parseInt(shiftForm.userId), `📅 New shift: ${shiftForm.role} on ${shiftForm.date} (${shiftForm.start}–${shiftForm.end})`);
    setShiftForm({ userId: "", date: "", start: "", end: "", role: "", note: "" });
    setModal(null);
  }

  function saveShiftDirect(shiftData) {
    const newShift = { ...shiftData, id: Date.now() + Math.random() };
    setShifts(prev => [...prev, newShift]);
    addNotif(shiftData.userId, `📅 You've been scheduled: ${shiftData.role} on ${shiftData.date} (${shiftData.start}${shiftData.end ? "–" + shiftData.end : ""})`);
  }

  function saveAvailability(avail) {
    setAvailability(prev => ({ ...prev, [user.id]: avail }));
    addNotif(1, `📋 ${user.name} submitted availability for next week.`);
    sendTelegram(`📋 <b>Availability Submitted</b>\n\n<b>${user.name}</b> has submitted their availability${avail.weekendLabel ? ` for <b>${avail.weekendLabel}</b>` : ""}.`);
    setModal(null);
  }

  function markNotifsRead() {
    setNotifications(prev => prev.map(n => n.userId === user?.id ? { ...n, read: true } : n));
  }

  function toggleDay(idx) {
    setVisibleDays(prev =>
      prev.includes(idx) ? prev.filter(d => d !== idx) : [...prev, idx].sort((a, b) => a - b)
    );
  }

  if (!user) return (
    <LangContext.Provider value={lang}>
    <DeptsContext.Provider value={depts}>
      <LoginScreen users={allUsers} loginStep={loginStep} setLoginStep={setLoginStep}
        selectedUser={selectedUser} setSelectedUser={setSelectedUser}
        pinVal={pinInput} setPinInput={setPinInput}
        pinError={pinError} setPinError={setPinError} onLogin={handleLogin}
        lang={lang} setLang={setLang} />
    </DeptsContext.Provider>
    </LangContext.Provider>
  );

  return (
    <LangContext.Provider value={lang}>
    <DeptsContext.Provider value={depts}>
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e4dc", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a0f; } ::-webkit-scrollbar-thumb { background: #2a2a38; border-radius: 2px; }
        input, select, textarea { font-family: 'DM Sans', sans-serif; }
        .btn { cursor: pointer; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: all 0.15s; }
        .btn:hover { opacity: 0.82; transform: translateY(-1px); }
        .btn:active { transform: scale(0.97); opacity: 1; }
        .pill { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; }
        .fade-in { animation: fadeIn 0.25s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .card { background: #12121a; border: 1px solid #1e1e2e; border-radius: 16px; }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.78); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px); }
        .modal { background: #12121a; border: 1px solid #2a2a3e; border-radius: 20px; padding: 26px; width: 92%; max-width: 500px; max-height: 90vh; overflow-y: auto; }
        .input { background: #0a0a0f; border: 1px solid #2a2a3e; color: #e8e4dc; border-radius: 8px; padding: 9px 13px; width: 100%; font-size: 14px; }
        .input:focus { outline: none; border-color: #f97316; }
        select.input option { background: #12121a; }
        .nav-btn { background: none; border: none; cursor: pointer; padding: 8px 13px; border-radius: 10px; color: #555; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; transition: all 0.15s; display: flex; align-items: center; gap: 5px; }
        .nav-btn.active { background: #1a1a28; color: #f97316; }
        .nav-btn:hover:not(.active) { background: #111118; color: #aaa; }
        .shift-card { background: #13131e; border-radius: 10px; padding: 12px 14px; border-left: 3px solid; margin-bottom: 8px; }
        .day-pill { cursor: pointer; padding: 4px 11px; border-radius: 20px; font-size: 11px; font-weight: 600; border: 1px solid; transition: all 0.15s; background: none; font-family: 'DM Sans', sans-serif; letter-spacing: 0.02em; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#0c0c13", borderBottom: "1px solid #181824", padding: "0 18px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#f97316,#ec4899)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🎵</div>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "-0.03em" }}>Kingdom NightShift</span>
        </div>

        <nav style={{ display: "flex", gap: 1 }}>
          {(() => {
            const tNav = T[lang];
            return [
              { id: "schedule",     label: tNav.schedule,      icon: "📅" },
              { id: "availability", label: tNav.availability,  icon: "🗓" },
              { id: "timeoff",      label: tNav.timeOff,       icon: "🏖" },
              { id: "swaps",        label: tNav.swaps,         icon: "🔄" },
              ...(user.role === "owner" || user.role === "manager" ? [{ id: "admin", label: tNav.admin, icon: "⚙️" }] : []),
            ];
          })().map(v => (
            <button key={v.id} className={`nav-btn ${view === v.id ? "active" : ""}`} onClick={() => setView(v.id)}>
              <span>{v.icon}</span><span>{v.label}</span>
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => { setView("notifs"); markNotifsRead(); }} style={{ background: "none", border: "none", cursor: "pointer", position: "relative", color: "#666", fontSize: 17, lineHeight: 1 }}>
            🔔
            {myNotifs.length > 0 && <span style={{ position: "absolute", top: -4, right: -5, background: "#f97316", color: "#fff", borderRadius: "50%", width: 15, height: 15, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{myNotifs.length}</span>}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }} onClick={logout} title="Tap to log out">
            <div style={{ width: 28, height: 28, background: "#1a1a28", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#f97316" }}>{user.avatar}</div>
            <span style={{ fontSize: 12, color: "#555" }}>{user.name.split(" ")[0]}</span>
          </div>
        </div>
      </div>

      {/* Page */}
      <div style={{ padding: "22px 18px", maxWidth: 1100, margin: "0 auto" }} className="fade-in">
        {view === "schedule"     && <ScheduleView     user={user} shifts={shifts} weekDates={weekDates} weekOffset={weekOffset} setWeekOffset={setWeekOffset} visibleDays={visibleDays} toggleDay={toggleDay} users={allUsers} giveupRequests={giveupRequests} onGiveup={s => setModal({ type: "giveup", shift: s })} dayMeta={dayMeta} depts={depts} />}
        {view === "availability" && <AvailabilityView user={user} availability={availability} onSubmit={() => setModal({ type: "availability" })} />}
        {view === "timeoff"      && <TimeOffView      user={user} requests={timeOffRequests} onRequest={() => setModal({ type: "timeoff" })} onAction={user.role === "owner" || user.role === "manager" ? handleTimeOffAction : null} onDelete={deleteTimeOff} users={allUsers} />}
        {view === "swaps"        && <SwapsView        user={user} shifts={shifts} giveupRequests={giveupRequests} users={allUsers} onGiveup={s => setModal({ type: "giveup", shift: s })} onClaim={claimShift} depts={depts} />}
        {view === "admin" && (user.role === "owner" || user.role === "manager") && <AdminView shifts={shifts} users={allUsers} setUsers={setAllUsers} onAddShift={saveShiftDirect} onDeleteShift={id => setShifts(prev => prev.filter(s => s.id !== id))} weekDates={weekDates} weekOffset={weekOffset} setWeekOffset={setWeekOffset} visibleDays={visibleDays} toggleDay={toggleDay} availability={availability} timeOffRequests={timeOffRequests} onTimeOffAction={handleTimeOffAction} onDeleteTimeOff={deleteTimeOff} showDays={showDays} setShowDays={setShowDays} currentUser={user} dayMeta={dayMeta} setDayMeta={setDayMeta} depts={depts} setDepts={setDepts} sendTelegram={sendTelegram} />}
        {view === "notifs"       && <NotifsView       notifications={notifications.filter(n => n.userId === user.id)} />}
      </div>

      {modal?.type === "giveup"       && <GiveupModal       shift={modal.shift} user={user} onConfirm={postGiveup} onClose={() => setModal(null)} depts={depts} />}
      {modal?.type === "timeoff"      && <TimeOffModal       onConfirm={submitTimeOff} onClose={() => setModal(null)} />}
      {modal?.type === "availability" && <AvailabilityModal  user={user} existing={availability[user.id]} onConfirm={saveAvailability} onClose={() => setModal(null)} showDays={showDays} />}
      {modal?.type === "addshift"     && <AddShiftModal      users={allUsers} form={shiftForm} setForm={setShiftForm} onConfirm={saveShift} onClose={() => setModal(null)} depts={depts} />}
    </div>
    </DeptsContext.Provider>
    </LangContext.Provider>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginScreen({ users, loginStep, setLoginStep, selectedUser, setSelectedUser, pinVal, setPinInput, pinError, setPinError, onLogin, lang, setLang }) {
  useEffect(() => {
    if (pinVal.length === 4) {
      const t = setTimeout(onLogin, 180);
      return () => clearTimeout(t);
    }
  }, [pinVal]);

  function pressKey(k) {
    if (k === "⌫") { setPinInput(p => p.slice(0, -1)); setPinError(false); }
    else if (pinVal.length < 4) { setPinInput(p => p + String(k)); setPinError(false); }
  }

  const t = T[lang];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 24 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        .btn { cursor: pointer; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: all 0.15s; }
        .btn:hover { opacity: 0.82; }
        .btn:active { transform: scale(0.95); }
        .fade-in { animation: fadeIn 0.25s ease; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ width: 54, height: 54, background: "linear-gradient(135deg,#f97316,#ec4899)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 14px" }}>🎵</div>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 30, letterSpacing: "-0.04em", color: "#e8e4dc" }}>Kingdom NightShift</h1>
        <p style={{ color: "#444", marginTop: 5, fontSize: 13 }}>{t.appSub}</p>
      </div>

      {loginStep === "select" && (
        <div className="fade-in" style={{ width: "100%", maxWidth: 420 }}>
          <p style={{ color: "#555", fontSize: 11, marginBottom: 14, textAlign: "center", letterSpacing: "0.06em", textTransform: "uppercase" }}>{t.selectProfile}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {users.map(u => (
              <button key={u.id} className="btn" onClick={() => { setSelectedUser(u); setLoginStep("pin"); setPinInput(""); setPinError(false); }}
                style={{ background: "#111118", border: "1px solid #1c1c2a", padding: "13px 11px", borderRadius: 12, display: "flex", alignItems: "center", gap: 9, color: "#e8e4dc", textAlign: "left" }}>
                <div style={{ width: 34, height: 34, background: "#1a1a28", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#f97316", flexShrink: 0 }}>{u.avatar}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name.split(" ")[0]}</div>
                  <div style={{ fontSize: 10, color: "#444" }}>{u.role === "owner" || u.role === "manager" ? t.owner : u.dept}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {loginStep === "pin" && selectedUser && (
        <div className="fade-in" style={{ width: "100%", maxWidth: 300, textAlign: "center" }}>
          <div style={{ width: 50, height: 50, background: "#1a1a28", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#f97316", margin: "0 auto 10px" }}>{selectedUser.avatar}</div>
          <p style={{ color: "#e8e4dc", fontWeight: 600, marginBottom: 3 }}>{selectedUser.name}</p>
          <p style={{ color: "#444", fontSize: 12, marginBottom: 22 }}>{selectedUser.role === "owner" || selectedUser.role === "manager" ? t.owner : selectedUser.dept}</p>
          <p style={{ color: "#555", fontSize: 11, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.07em" }}>{t.enterPin}</p>

          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 18 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: 46, height: 46, borderRadius: 10, border: `2px solid ${pinError ? "#ef4444" : pinVal.length > i ? "#f97316" : "#1e1e2e"}`, background: "#080810", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#f97316", transition: "border-color 0.15s" }}>
                {pinVal.length > i ? "●" : ""}
              </div>
            ))}
          </div>

          {pinError && <p style={{ color: "#ef4444", fontSize: 12, marginBottom: 10 }}>{t.pinError}</p>}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7, marginBottom: 10 }}>
            {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k, i) => (
              <button key={i} className="btn" onClick={() => k !== "" && pressKey(k)}
                style={{ background: k === "" ? "transparent" : "#171724", border: k === "" ? "none" : "1px solid #222232", color: "#e8e4dc", borderRadius: 10, padding: "13px 0", fontSize: 18, fontWeight: 500, cursor: k === "" ? "default" : "pointer" }}>
                {k}
              </button>
            ))}
          </div>
          <button className="btn" onClick={() => { setLoginStep("select"); setPinInput(""); setPinError(false); }} style={{ background: "none", color: "#444", fontSize: 12 }}>{t.back}</button>
        </div>
      )}

      {/* Language toggle at bottom — hidden on PIN entry so it doesn't cover the Back button */}
      {loginStep === "select" && (
        <div style={{ position: "fixed", bottom: 28, display: "flex", alignItems: "center", gap: 6 }}>
          <button className="btn" onClick={() => setLang("en")}
            style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", background: lang === "en" ? "#f9731618" : "transparent", color: lang === "en" ? "#f97316" : "#444", border: `1px solid ${lang === "en" ? "#f9731640" : "#1a1a28"}` }}>
            🇺🇸 English
          </button>
          <div style={{ width: 1, height: 14, background: "#222" }} />
          <button className="btn" onClick={() => setLang("es")}
            style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", background: lang === "es" ? "#f9731618" : "transparent", color: lang === "es" ? "#f97316" : "#444", border: `1px solid ${lang === "es" ? "#f9731640" : "#1a1a28"}` }}>
            🇲🇽 Español
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Schedule View ────────────────────────────────────────────────────────────

function ScheduleView({ user, shifts, weekDates, weekOffset, setWeekOffset, visibleDays, toggleDay, users, giveupRequests, onGiveup, dayMeta }) {
  const depts = useContext(DeptsContext);
  const DC = n => deptColor(depts, n);
  const lang = useContext(LangContext);
  const t = T[lang];
  const isOwner = user.role === "owner" || user.role === "manager";
  const [schedMode, setSchedMode] = useState("mine");
  const showFull = isOwner || schedMode === "full";

  const myShifts = shifts.filter(s => s.userId === user.id);
  const shownDates = weekDates.filter((_, i) => visibleDays.includes(i));

  // Full grid shared between owner view and employee "full" view
  function FullGrid() {
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: 360 }}>
          <thead>
            {/* Doors/Close row — only shown if any day has meta */}
            {shownDates.some(d => dayMeta?.[fmt(d)]?.doors || dayMeta?.[fmt(d)]?.close) && (
              <tr>
                <th style={{ padding: "5px 10px", borderBottom: "1px solid #111118" }} />
                {shownDates.map((d, i) => {
                  const meta = dayMeta?.[fmt(d)];
                  return (
                    <th key={i} style={{ padding: "5px 6px", borderBottom: "1px solid #111118", textAlign: "left" }}>
                      {(meta?.doors || meta?.close) && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {meta?.doors && <span style={{ fontSize: 9, background: "#22c55e18", color: "#22c55e", borderRadius: 4, padding: "1px 6px", fontWeight: 600 }}>🚪 {meta.doors}</span>}
                          {meta?.close && <span style={{ fontSize: 9, background: "#ef444418", color: "#ef4444", borderRadius: 4, padding: "1px 6px", fontWeight: 600 }}>🔒 {meta.close}</span>}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            )}
            <tr>
              <th style={{ textAlign: "left", padding: "5px 10px", color: "#333", fontSize: 10, fontWeight: 600, width: 120 }}>STAFF</th>
              {shownDates.map((d, i) => {
                const isToday = d.toDateString() === new Date().toDateString();
                return (
                  <th key={i} style={{ textAlign: "left", padding: "5px 6px", color: isToday ? "#f97316" : "#333", fontSize: 10, fontWeight: 600, minWidth: 85 }}>
                    {ALL_DAYS[weekDates.indexOf(d)]}<br />
                    <span style={{ fontSize: 14, color: isToday ? "#f97316" : "#666" }}>{d.getDate()}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {depts.map(({ name: dept, color }) => {
              const deptUsers = users.filter(u => u.role === "employee" && u.dept === dept);
              if (deptUsers.length === 0) return null;
              const colCount = shownDates.length + 1;

              return (
                <React.Fragment key={dept}>
                  {/* Section divider for each dept */}
                  <tr>
                    <td colSpan={colCount} style={{ padding: "8px 10px 4px" }}>
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        background: `${color}12`, border: `1px solid ${color}25`,
                        borderRadius: 20, padding: "3px 12px",
                      }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, opacity: 0.7 }} />
                        <span style={{ fontSize: 9, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.85 }}>
                          {dept}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {deptUsers.map(u => {
                    const isMe = u.id === user.id;
                    return (
                      <tr key={u.id} style={{ borderTop: "1px solid #0e0e18", background: isMe && !isOwner ? "#0f0f1a" : "transparent" }}>
                        <td style={{ padding: "7px 10px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <div style={{ width: 24, height: 24, background: isMe && !isOwner ? "#f9731620" : "#1a1a28", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: isMe && !isOwner ? "#f97316" : (color), flexShrink: 0, border: isMe && !isOwner ? "1px solid #f9731650" : "none" }}>{u.avatar}</div>
                            <div>
                              <div style={{ fontSize: 11, fontWeight: 600, color: isMe && !isOwner ? "#f97316" : "#ccc" }}>
                                {u.name.split(" ")[0]}{isMe && !isOwner ? " (you)" : ""}
                              </div>
                            </div>
                          </div>
                        </td>
                        {shownDates.map((d, i) => {
                          const dayShifts = shifts.filter(s => s.userId === u.id && s.date === fmt(d));
                          return (
                            <td key={i} style={{ padding: "4px 5px", verticalAlign: "top" }}>
                              {dayShifts.map(s => {
                                const givenUp = giveupRequests.find(r => r.shiftId === s.id && r.status === "open");
                                return (
                                  <div key={s.id} style={{ background: isMe && !isOwner ? "#1a1428" : "#181826", borderLeft: `3px solid ${givenUp ? "#555" : (color)}`, borderRadius: 6, padding: "4px 6px", marginBottom: 3, opacity: givenUp ? 0.55 : 1 }}>
                                    <div style={{ fontSize: 10, fontWeight: 600, color }}>{s.start}</div>
                                    <div style={{ fontSize: 9, color: "#555" }}>{s.end}</div>
                                    {givenUp && <div style={{ fontSize: 9, color: "#f97316" }}>open</div>}
                                  </div>
                                );
                              })}
                              {dayShifts.length === 0 && <div style={{ fontSize: 9, color: "#1a1a26", padding: "4px 6px" }}>—</div>}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: "-0.03em" }}>
            {isOwner ? t.allSchedules : schedMode === "mine" ? t.mySchedule : t.fullSchedule}
          </h2>
          <p style={{ color: "#444", fontSize: 12, marginTop: 2 }}>{t.weekOf} {weekDates[0].toLocaleDateString("en-US", { month: "long", day: "numeric" })}</p>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <button className="btn" onClick={() => setWeekOffset(w => w-1)} style={{ background: "#161622", color: "#888", padding: "7px 13px", fontSize: 12 }}>← Prev</button>
          <button className="btn" onClick={() => setWeekOffset(0)}        style={{ background: "#161622", color: "#555", padding: "7px 13px", fontSize: 12 }}>{t.today}</button>
          <button className="btn" onClick={() => setWeekOffset(w => w+1)} style={{ background: "#161622", color: "#888", padding: "7px 13px", fontSize: 12 }}>Next →</button>
        </div>
      </div>

      {/* Employee view toggle */}
      {!isOwner && (
        <div style={{ display: "flex", gap: 3, marginBottom: 16, background: "#0e0e16", padding: 4, borderRadius: 10, width: "fit-content" }}>
          <button className="btn" onClick={() => setSchedMode("mine")}
            style={{ padding: "7px 16px", fontSize: 12, background: schedMode === "mine" ? "#1a1a28" : "none", color: schedMode === "mine" ? "#f97316" : "#555" }}>
            👤 {t.myShifts}
          </button>
          <button className="btn" onClick={() => setSchedMode("full")}
            style={{ padding: "7px 16px", fontSize: 12, background: schedMode === "full" ? "#1a1a28" : "none", color: schedMode === "full" ? "#f97316" : "#555" }}>
            👥 {t.fullSchedule}
          </button>
        </div>
      )}

      {/* Day toggles */}
      <div style={{ display: "flex", gap: 5, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "#333", marginRight: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.show}</span>
        {weekDates.map((d, i) => {
          const active = visibleDays.includes(i);
          const isToday = d.toDateString() === new Date().toDateString();
          return (
            <button key={i} className="day-pill" onClick={() => toggleDay(i)}
              style={{ color: active ? (isToday ? "#f97316" : "#ccc") : "#2a2a3e", borderColor: active ? (isToday ? "#f97316" : "#2a2a3e") : "#191926", background: active ? "#161622" : "transparent" }}>
              {ALL_DAYS[i]} {d.getDate()}
            </button>
          );
        })}
      </div>

      {shownDates.length === 0 ? (
        <div className="card" style={{ padding: 32, textAlign: "center" }}><p style={{ color: "#444" }}>{lang === "es" ? "Ningún día seleccionado — toca un día arriba para mostrarlo" : "No days selected — tap a day above to show it"}</p></div>
      ) : showFull ? (
        <FullGrid />
      ) : (
        /* Employee "My Shifts" view */
        <div>
          {/* Day cards */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(shownDates.length, 3)}, 1fr)`, gap: 8, marginBottom: 20 }}>
            {shownDates.map((d, i) => {
              const dayShifts = myShifts.filter(s => s.date === fmt(d));
              const isToday = d.toDateString() === new Date().toDateString();
              return (
                <div key={i} className="card" style={{ padding: "12px 10px", borderColor: isToday ? "#f9731640" : "#1a1a26" }}>
                  <div style={{ fontSize: 10, color: isToday ? "#f97316" : "#444", fontWeight: 600, marginBottom: 3 }}>{ALL_DAYS[weekDates.indexOf(d)]}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: isToday ? "#f97316" : "#e8e4dc", marginBottom: 6 }}>{d.getDate()}</div>
                  {/* Doors/Close info */}
                  {(dayMeta?.[fmt(d)]?.doors || dayMeta?.[fmt(d)]?.close) && (
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>
                      {dayMeta[fmt(d)]?.doors && <span style={{ fontSize: 8, background: "#22c55e15", color: "#22c55e", borderRadius: 4, padding: "1px 5px", fontWeight: 600 }}>🚪 {dayMeta[fmt(d)].doors}</span>}
                      {dayMeta[fmt(d)]?.close && <span style={{ fontSize: 8, background: "#ef444415", color: "#ef4444", borderRadius: 4, padding: "1px 5px", fontWeight: 600 }}>🔒 {dayMeta[fmt(d)].close}</span>}
                    </div>
                  )}
                  {dayShifts.length > 0 ? dayShifts.map(s => {
                    const givenUp = giveupRequests.find(r => r.shiftId === s.id && r.status === "open");
                    return (
                      <div key={s.id} style={{ background: "#181826", borderRadius: 6, padding: "6px 8px", borderLeft: `3px solid ${givenUp ? "#555" : (DC(s.role))}`, opacity: givenUp ? 0.6 : 1, marginBottom: 4 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: DC(s.role) }}>{s.role}</div>
                        <div style={{ fontSize: 10, color: "#555" }}>{s.start}–{s.end}</div>
                        {givenUp && <div style={{ fontSize: 9, color: "#f97316", marginTop: 2 }}>{t.pendingPickup}</div>}
                        {s.note && <div style={{ fontSize: 9, color: "#444", marginTop: 1 }}>{s.note}</div>}
                      </div>
                    );
                  }) : <div style={{ fontSize: 10, color: "#1e1e28" }}>{t.off}</div>}
                </div>
              );
            })}
          </div>

          {/* Upcoming shifts list with give up */}
          {myShifts.length > 0 ? (
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#555", letterSpacing: "0.04em" }}>{t.myShifts.toUpperCase()}</h3>
              {myShifts.map(s => {
                const givenUp = giveupRequests.find(r => r.shiftId === s.id && r.status === "open");
                return (
                  <div key={s.id} className="shift-card" style={{ borderLeftColor: givenUp ? "#444" : (DC(s.role)), display: "flex", alignItems: "center", justifyContent: "space-between", opacity: givenUp ? 0.6 : 1 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: DC(s.role) }}>{s.role}</div>
                      <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{s.date} · {s.start}–{s.end}{s.note ? ` · ${s.note}` : ""}</div>
                      {givenUp && <div style={{ fontSize: 11, color: "#f97316", marginTop: 3 }}>🔄 {t.awaitingCoworker}</div>}
                    </div>
                    {!givenUp && <button className="btn" onClick={() => onGiveup(s)} style={{ background: "#1a1a28", color: "#666", padding: "6px 12px", fontSize: 12, flexShrink: 0 }}>{t.giveUp}</button>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card" style={{ padding: 32, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
              <p style={{ color: "#555", fontSize: 13 }}>{t.noShiftsMsg}</p>
              <p style={{ color: "#333", fontSize: 12, marginTop: 4 }}>{t.switchFull}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Availability View ────────────────────────────────────────────────────────

function AvailabilityView({ user, availability, onSubmit }) {
  const lang = useContext(LangContext);
  const t = T[lang];
  const myAvail = availability[user.id];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: "-0.03em" }}>{t.availabilityTitle}</h2>
          <p style={{ color: "#444", fontSize: 12, marginTop: 2 }}>{t.noAvailSub}</p>
        </div>
        <button className="btn" onClick={onSubmit} style={{ background: "#f97316", color: "#fff", padding: "9px 18px", fontSize: 13 }}>{myAvail ? t.updateAvail : t.submitAvail}</button>
      </div>

      {myAvail ? (
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <p style={{ color: "#22c55e", fontSize: 12 }}>{t.availSubmitted}</p>
            {myAvail.weekendLabel && <span style={{ fontSize: 12, color: "#f97316" }}>{myAvail.weekendLabel}</span>}
          </div>
          {Object.entries(myAvail.days || {}).map(([day, d]) => (
            <div key={day} style={{ padding: "10px 0", borderBottom: "1px solid #111118" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{day}</span>
                  {d.date && <span style={{ fontSize: 11, color: "#555", marginLeft: 7 }}>{d.date}</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span className="pill" style={{ background: d.available ? "#22c55e18" : "#ef444418", color: d.available ? "#22c55e" : "#ef4444" }}>
                    {d.available ? "✓ Available" : "✗ Not Available"}
                  </span>
                  {d.available && d.allDay && <span style={{ fontSize: 12, color: "#3b82f6" }}>All Day</span>}
                  {d.available && !d.allDay && d.start && <span style={{ fontSize: 12, color: "#666" }}>{d.start} – {d.end}</span>}
                </div>
              </div>
              {d.note && (
                <div style={{ marginTop: 6, fontSize: 12, color: "#666", background: "#0d0d18", borderRadius: 6, padding: "5px 10px", borderLeft: "2px solid #2a2a3e" }}>
                  💬 {d.note}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 34, marginBottom: 10 }}>📅</div>
          <p style={{ color: "#555" }}>Nothing submitted yet</p>
          <p style={{ color: "#333", fontSize: 12, marginTop: 4 }}>Let the owner know when you're free for an upcoming weekend</p>
        </div>
      )}
    </div>
  );
}

// ─── Time Off View ─────────────────────────────────────────────────────────────

function TimeOffView({ user, requests, onRequest, onAction, onDelete, users }) {
  const lang = useContext(LangContext);
  const t = T[lang];
  const isOwner = user.role === "owner" || user.role === "manager";
  const relevant = isOwner ? requests : requests.filter(r => r.userId === user.id);
  const sc = { pending: "#eab308", approved: "#22c55e", denied: "#ef4444" };
  const [confirmDelete, setConfirmDelete] = useState(null);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: "-0.03em" }}>{t.timeOffTitle}</h2>
          <p style={{ color: "#444", fontSize: 12, marginTop: 2 }}>{isOwner ? t.reviewRequests : t.requestTimeAway}</p>
        </div>
        {!isOwner && <button className="btn" onClick={onRequest} style={{ background: "#f97316", color: "#fff", padding: "9px 18px", fontSize: 13 }}>{t.request}</button>}
      </div>

      {relevant.length === 0 ? (
        <div className="card" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 34, marginBottom: 10 }}>🏖</div>
          <p style={{ color: "#555" }}>{t.noRequests}</p>
        </div>
      ) : relevant.map(r => {
        const u = users.find(u => u.id === r.userId);
        const isMyRequest = r.userId === user.id;
        const canDelete = isMyRequest;
        const isConfirming = confirmDelete === r.id;

        return (
          <div key={r.id} className="card" style={{ padding: 16, marginBottom: 8, borderColor: isConfirming ? "#ef444430" : "#1e1e2e" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div style={{ flex: 1 }}>
                {isOwner && <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3 }}>{u?.name} <span style={{ color: "#444", fontWeight: 400 }}>{u?.dept}</span></div>}
                <div style={{ fontSize: 14, color: "#e8e4dc" }}>{r.dates}</div>
                {r.reason && <div style={{ fontSize: 12, color: "#555", marginTop: 3 }}>{r.reason}</div>}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span className="pill" style={{ background: `${sc[r.status]}18`, color: sc[r.status] }}>{t[r.status] || r.status}</span>
                {isOwner && r.status === "pending" && <>
                  <button className="btn" onClick={() => onAction(r.id,"approved")} style={{ background: "#22c55e18", color: "#22c55e", padding: "5px 11px", fontSize: 12 }}>{t.approve}</button>
                  <button className="btn" onClick={() => onAction(r.id,"denied")}   style={{ background: "#ef444418", color: "#ef4444", padding: "5px 11px", fontSize: 12 }}>{t.deny}</button>
                </>}
                {canDelete && !isConfirming && (
                  <button className="btn" onClick={() => setConfirmDelete(r.id)}
                    style={{ background: "#1a1a28", color: "#555", padding: "5px 10px", fontSize: 12, border: "1px solid #2a2a3e" }}>
                    {r.status === "approved" ? t.cancelApproval : t.remove}
                  </button>
                )}
              </div>
            </div>
            {isConfirming && (
              <div style={{ marginTop: 12, background: "#ef444410", border: "1px solid #ef444430", borderRadius: 8, padding: "10px 14px" }}>
                <p style={{ fontSize: 12, color: "#ef4444", marginBottom: 10 }}>
                  {r.status === "approved" ? t.removeApprovedConfirm : t.removeConfirm}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn" onClick={() => setConfirmDelete(null)} style={{ background: "#1a1a28", color: "#666", padding: "6px 14px", fontSize: 12 }}>{t.keepIt}</button>
                  <button className="btn" onClick={() => { onDelete(r.id); setConfirmDelete(null); }}
                    style={{ background: "#ef4444", color: "#fff", padding: "6px 14px", fontSize: 12, fontWeight: 600 }}>{t.yesRemove}</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Swaps View ────────────────────────────────────────────────────────────────

function SwapsView({ user, shifts, giveupRequests, users, onGiveup, onClaim, depts }) {
  const DC = n => deptColor(depts, n);
  const lang = useContext(LangContext);
  const t = T[lang];
  const myShifts = shifts.filter(s => s.userId === user.id);
  const claimable = giveupRequests.filter(r => {
    if (r.status !== "open" || r.fromUserId === user.id) return false;
    const shift = shifts.find(s => s.id === r.shiftId);
    return shift && shift.role === user.dept;
  });
  const myPending = giveupRequests.filter(r => r.fromUserId === user.id && r.status === "open");

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: "-0.03em" }}>{t.swapsTitle}</h2>
        <p style={{ color: "#444", fontSize: 12, marginTop: 2 }}>{t.swapsSub}</p>
      </div>

      {claimable.length > 0 && (
        <div style={{ marginBottom: 26 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#f97316", marginBottom: 10, letterSpacing: "0.03em" }}>{t.availToClaim}</h3>
          {claimable.map(r => {
            const shift = shifts.find(s => s.id === r.shiftId);
            const from = users.find(u => u.id === r.fromUserId);
            if (!shift) return null;
            return (
              <div key={r.id} className="shift-card" style={{ borderLeftColor: DC(shift.role), display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: DC(shift.role) }}>{shift.role}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{shift.date} · {shift.start}–{shift.end}{shift.note ? ` · ${shift.note}` : ""}</div>
                  <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>From {from?.name}</div>
                  {r.note && (
                    <div style={{ fontSize: 11, color: "#888", marginTop: 5, background: "#111118", borderRadius: 6, padding: "4px 8px", borderLeft: "2px solid #2a2a3e" }}>
                      💬 {r.note}
                    </div>
                  )}
                </div>
                <button className="btn" onClick={() => onClaim(r.id)} style={{ background: "#22c55e18", color: "#22c55e", padding: "8px 14px", fontSize: 12, flexShrink: 0 }}>{t.claim}</button>
              </div>
            );
          })}
        </div>
      )}

      {myPending.length > 0 && (
        <div style={{ marginBottom: 26 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#888", marginBottom: 10, letterSpacing: "0.03em" }}>{t.waitingPickup}</h3>
          {myPending.map(r => {
            const shift = shifts.find(s => s.id === r.shiftId);
            if (!shift) return null;
            return (
              <div key={r.id} className="shift-card" style={{ borderLeftColor: "#333", opacity: 0.65 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#777" }}>{shift.role}</div>
                <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{shift.date} · {shift.start}–{shift.end}</div>
                {r.note && (
                  <div style={{ fontSize: 11, color: "#666", marginTop: 5, background: "#111118", borderRadius: 6, padding: "4px 8px", borderLeft: "2px solid #2a2a3e" }}>
                    💬 {r.note}
                  </div>
                )}
                <div style={{ fontSize: 11, color: "#f97316", marginTop: 4 }}>{t.coworkersNotified}</div>
              </div>
            );
          })}
        </div>
      )}

      <h3 style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 10, letterSpacing: "0.03em" }}>{t.myShiftsLabel}</h3>
      {myShifts.length === 0
        ? <div className="card" style={{ padding: 28, textAlign: "center" }}><p style={{ color: "#444" }}>{t.noUpcoming}</p></div>
        : myShifts.map(s => {
            const posted = giveupRequests.find(r => r.shiftId === s.id && r.status === "open");
            return (
              <div key={s.id} className="shift-card" style={{ borderLeftColor: posted ? "#333" : (DC(s.role)), display: "flex", alignItems: "center", justifyContent: "space-between", opacity: posted ? 0.5 : 1 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: posted ? "#555" : DC(s.role) }}>{s.role}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{s.date} · {s.start}–{s.end}</div>
                </div>
                {posted
                  ? <span style={{ fontSize: 11, color: "#444" }}>{t.posted}</span>
                  : <button className="btn" onClick={() => onGiveup(s)} style={{ background: "#f9731618", color: "#f97316", padding: "7px 13px", fontSize: 12, flexShrink: 0 }}>{t.giveUpArrow}</button>
                }
              </div>
            );
          })
      }
    </div>
  );
}

// ─── Admin View ────────────────────────────────────────────────────────────────

function AdminView({ shifts, users, setUsers, onAddShift, onDeleteShift, weekDates, weekOffset, setWeekOffset, visibleDays, toggleDay, availability, timeOffRequests, onTimeOffAction, onDeleteTimeOff, showDays, setShowDays, currentUser, dayMeta, setDayMeta, depts, setDepts, sendTelegram }) {
  const DC = n => deptColor(depts, n);
  const [tab, setTab] = useState("builder");
  const isOwner = currentUser?.role === "owner";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: "-0.03em" }}>Admin Panel</h2>
        {!isOwner && <span className="pill" style={{ background: "#3b82f620", color: "#3b82f6" }}>Manager View</span>}
      </div>

      <div style={{ display: "flex", gap: 3, marginBottom: 20, background: "#0e0e16", padding: 4, borderRadius: 10, width: "fit-content", flexWrap: "wrap" }}>
        {[
          ["builder","📋 Builder"],
          ["showdays","🎶 Show Days"],
          ["staff","👥 Staff"],
          ...(isOwner ? [["setup","⚙️ Setup"]] : []),
          ["availability","🗓 Availability"],
          ["timeoff","🏖 Time Off"]
        ].map(([id,label]) => (
          <button key={id} className="btn" onClick={() => setTab(id)} style={{ padding: "7px 14px", fontSize: 12, background: tab===id ? "#1a1a28" : "none", color: tab===id ? "#f97316" : "#555" }}>{label}</button>
        ))}
      </div>

      {tab === "builder" && (
        <ScheduleBuilder
          shifts={shifts} users={users} weekDates={weekDates}
          weekOffset={weekOffset} setWeekOffset={setWeekOffset}
          onAddShift={onAddShift} onDeleteShift={onDeleteShift}
          availability={availability} timeOffRequests={timeOffRequests}
          dayMeta={dayMeta} setDayMeta={setDayMeta} sendTelegram={sendTelegram}
        />
      )}

      {tab === "showdays" && (
        <ShowDaysCalendar showDays={showDays} setShowDays={setShowDays} />
      )}

      {tab === "staff" && <StaffCSVManager users={users} setUsers={setUsers} />}

      {tab === "setup" && <StaffSetup users={users} setUsers={setUsers} depts={depts} setDepts={setDepts} />}

      {tab === "availability" && (() => {
        // Only show actual employees (not owner/manager)
        const staff = users.filter(u => u.role === "employee");
        const submitted = staff.filter(u => availability[u.id]);
        const notSubmitted = staff.filter(u => !availability[u.id]);
        return (
          <div>
            {/* Submitted */}
            {submitted.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                  ✓ Submitted — {submitted.length} staff
                </div>
                {submitted.map(u => {
                  const avail = availability[u.id];
                  return (
                    <div key={u.id} className="card" style={{ padding: 14, marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                        <div style={{ width: 28, height: 28, background: "#1a1a28", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: DC(u.dept) }}>{u.avatar}</div>
                        <span style={{ fontWeight: 600, fontSize: 13, flex: 1 }}>{u.name}</span>
                        <span style={{ fontSize: 11, color: "#f97316" }}>{avail?.weekendLabel}</span>
                      </div>
                      {avail?.days && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {Object.entries(avail.days).map(([day, d]) => (
                            <div key={day} style={{ background: "#111118", borderRadius: 8, padding: "6px 10px", minWidth: 80, maxWidth: 160 }}>
                              <div style={{ fontSize: 9, color: "#444", marginBottom: 2 }}>{day.slice(0,3).toUpperCase()}{d.date && <span style={{ color: "#333" }}> {d.date}</span>}</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: d.available ? "#22c55e" : "#ef4444" }}>{d.available ? "✓" : "✗"}</div>
                              {d.available && d.allDay && <div style={{ fontSize: 9, color: "#3b82f6", marginTop: 1 }}>All Day</div>}
                              {d.available && !d.allDay && d.start && <div style={{ fontSize: 9, color: "#555", marginTop: 1 }}>{d.start}–{d.end}</div>}
                              {d.note && <div style={{ fontSize: 9, color: "#666", marginTop: 3, borderTop: "1px solid #1a1a28", paddingTop: 3, lineHeight: 1.4 }}>💬 {d.note}</div>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Not yet submitted */}
            {notSubmitted.length > 0 && (
              <div>
                <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                  ✗ Not Yet Submitted — {notSubmitted.length} staff
                </div>
                {notSubmitted.map(u => (
                  <div key={u.id} className="card" style={{ padding: 12, marginBottom: 8, display: "flex", alignItems: "center", gap: 10, opacity: 0.7 }}>
                    <div style={{ width: 28, height: 28, background: "#1a1a28", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: DC(u.dept) }}>{u.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>{u.name}</div>
                      <div style={{ fontSize: 10, color: "#444" }}>{u.dept}</div>
                    </div>
                    <span style={{ fontSize: 11, color: "#333" }}>No submission</span>
                  </div>
                ))}
              </div>
            )}

            {staff.length === 0 && (
              <div className="card" style={{ padding: 28, textAlign: "center" }}><p style={{ color: "#444" }}>No staff added yet</p></div>
            )}
          </div>
        );
      })()}

      {tab === "timeoff" && (
        <AdminTimeOffTab timeOffRequests={timeOffRequests} users={users} onTimeOffAction={onTimeOffAction} onDeleteTimeOff={onDeleteTimeOff} />
      )}
    </div>
  );
}

// ─── Admin Time Off Tab ───────────────────────────────────────────────────────

function AdminTimeOffTab({ timeOffRequests, users, onTimeOffAction, onDeleteTimeOff }) {
  const depts = useContext(DeptsContext); const DC = n => deptColor(depts, n);
  const lang = useContext(LangContext);
  const t = T[lang];
  const [confirmDelete, setConfirmDelete] = useState(null);
  const sc = { pending: "#eab308", approved: "#22c55e", denied: "#ef4444" };

  if (timeOffRequests.length === 0) {
    return <div className="card" style={{ padding: 28, textAlign: "center" }}><p style={{ color: "#444" }}>{t.noRequests}</p></div>;
  }

  return (
    <div>
      {timeOffRequests.map(r => {
        const u = users.find(u => u.id === r.userId);
        const isConfirming = confirmDelete === r.id;
        return (
          <div key={r.id} className="card" style={{ padding: 14, marginBottom: 8, borderColor: isConfirming ? "#ef444430" : "#1e1e2e" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{u?.name} <span style={{ color: "#444", fontWeight: 400, fontSize: 11 }}>{u?.dept}</span></div>
                <div style={{ fontSize: 13, marginTop: 3 }}>{r.dates}</div>
                {r.reason && <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{r.reason}</div>}
              </div>
              <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
                <span className="pill" style={{ background: `${sc[r.status]}18`, color: sc[r.status] }}>{t[r.status] || r.status}</span>
                {r.status === "pending" && <>
                  <button className="btn" onClick={() => onTimeOffAction(r.id,"approved")} style={{ background: "#22c55e18", color: "#22c55e", padding: "5px 10px", fontSize: 12 }}>{t.approve}</button>
                  <button className="btn" onClick={() => onTimeOffAction(r.id,"denied")}   style={{ background: "#ef444418", color: "#ef4444", padding: "5px 10px", fontSize: 12 }}>{t.deny}</button>
                </>}
                {!isConfirming && (
                  <button className="btn" onClick={() => setConfirmDelete(r.id)}
                    style={{ background: "#1a1a28", color: "#555", padding: "5px 9px", fontSize: 11, border: "1px solid #2a2a3e" }}>
                    🗑
                  </button>
                )}
              </div>
            </div>

            {isConfirming && (
              <div style={{ marginTop: 10, background: "#ef444410", border: "1px solid #ef444430", borderRadius: 8, padding: "10px 12px" }}>
                <p style={{ fontSize: 12, color: "#ef4444", marginBottom: 8 }}>
                  {r.status === "approved" ? t.removeApprovedConfirm : t.removeConfirm}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn" onClick={() => setConfirmDelete(null)} style={{ background: "#1a1a28", color: "#666", padding: "5px 12px", fontSize: 12 }}>{t.keepIt}</button>
                  <button className="btn" onClick={() => { onDeleteTimeOff(r.id); setConfirmDelete(null); }}
                    style={{ background: "#ef4444", color: "#fff", padding: "5px 14px", fontSize: 12, fontWeight: 600 }}>{t.yesRemove}</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Dept Manager ─────────────────────────────────────────────────────────────

const PRESET_COLORS = [
  "#f97316","#ef4444","#ec4899","#a855f7","#3b82f6",
  "#06b6d4","#22c55e","#eab308","#f59e0b","#84cc16",
];

function DeptManager({ depts, setDepts, users }) {
  const [adding, setAdding]       = useState(false);
  const [newName, setNewName]     = useState("");
  const [newColor, setNewColor]   = useState("#f97316");
  const [confirmDel, setConfirmDel] = useState(null); // dept name pending delete
  const [editingDept, setEditingDept] = useState(null); // dept name being edited
  const [editColor, setEditColor] = useState("");

  function addDept() {
    const name = newName.trim();
    if (!name || depts.find(d => d.name.toLowerCase() === name.toLowerCase())) return;
    setDepts(prev => [...prev, { name, color: newColor }]);
    setNewName(""); setNewColor("#f97316"); setAdding(false);
  }

  function deleteDept(name) {
    setDepts(prev => prev.filter(d => d.name !== name));
    setConfirmDel(null);
  }

  function saveEditColor(name) {
    setDepts(prev => prev.map(d => d.name === name ? { ...d, color: editColor } : d));
    setEditingDept(null);
  }

  return (
    <div className="card" style={{ marginBottom: 20, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "#111118", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1a1a26" }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14 }}>Departments</div>
          <div style={{ fontSize: 11, color: "#444", marginTop: 1 }}>Manage sections — changes apply everywhere</div>
        </div>
        <button className="btn" onClick={() => { setAdding(true); setNewName(""); setNewColor("#f97316"); }}
          style={{ background: "#f9731618", color: "#f97316", padding: "5px 12px", fontSize: 12, fontWeight: 600, border: "1px solid #f9731630" }}>
          + New Dept
        </button>
      </div>

      {/* Existing depts */}
      {depts.map(({ name, color }) => {
        const staffCount = users.filter(u => u.dept === name).length;
        const isEditing = editingDept === name;
        const isConfirming = confirmDel === name;

        return (
          <div key={name} style={{ borderBottom: "1px solid #0e0e18" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px" }}>
              {/* Color swatch — click to edit color */}
              <button onClick={() => { setEditingDept(isEditing ? null : name); setEditColor(color); }}
                style={{ width: 22, height: 22, borderRadius: "50%", background: color, border: `2px solid ${isEditing ? "#fff" : "transparent"}`, cursor: "pointer", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: "#ddd" }}>{name}</span>
                <span style={{ fontSize: 11, color: "#444", marginLeft: 8 }}>{staffCount} staff</span>
              </div>
              {!isConfirming && (
                <button className="btn" onClick={() => setConfirmDel(name)}
                  style={{ background: "none", color: "#333", padding: "3px 8px", fontSize: 11, border: "1px solid #1e1e2a" }}>
                  Remove
                </button>
              )}
              {isConfirming && (
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {staffCount > 0 && <span style={{ fontSize: 10, color: "#ef4444" }}>{staffCount} staff will lose their dept</span>}
                  <button className="btn" onClick={() => setConfirmDel(null)} style={{ background: "#1a1a28", color: "#666", padding: "3px 10px", fontSize: 11 }}>Cancel</button>
                  <button className="btn" onClick={() => deleteDept(name)} style={{ background: "#ef4444", color: "#fff", padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>Confirm</button>
                </div>
              )}
            </div>

            {/* Inline color editor */}
            {isEditing && (
              <div style={{ padding: "0 16px 12px 50px", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {PRESET_COLORS.map(c => (
                  <button key={c} onClick={() => setEditColor(c)}
                    style={{ width: 22, height: 22, borderRadius: "50%", background: c, border: `2px solid ${editColor === c ? "#fff" : "transparent"}`, cursor: "pointer" }} />
                ))}
                <button className="btn" onClick={() => saveEditColor(name)}
                  style={{ background: editColor, color: "#fff", padding: "3px 12px", fontSize: 11, fontWeight: 600, marginLeft: 4 }}>
                  Save
                </button>
                <button className="btn" onClick={() => setEditingDept(null)}
                  style={{ background: "none", color: "#444", padding: "3px 8px", fontSize: 11 }}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* Add new dept form */}
      {adding && (
        <div style={{ padding: "12px 16px", background: "#0f0f1c", borderTop: "1px solid #111118" }}>
          <div style={{ fontSize: 11, color: "#f97316", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>New Department</div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ fontSize: 9, color: "#555", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>Department Name</label>
              <input
                style={{ background: "#0a0a0f", border: "1px solid #2a2a3e", color: "#e8e4dc", borderRadius: 6, padding: "6px 9px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, width: "100%" }}
                value={newName} onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addDept()}
                placeholder="e.g. Coat Check" autoFocus />
            </div>
            <div>
              <label style={{ fontSize: 9, color: "#555", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>Color</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {PRESET_COLORS.map(c => (
                  <button key={c} onClick={() => setNewColor(c)}
                    style={{ width: 22, height: 22, borderRadius: "50%", background: c, border: `2px solid ${newColor === c ? "#fff" : "transparent"}`, cursor: "pointer" }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button className="btn" onClick={() => setAdding(false)} style={{ background: "#1a1a28", color: "#555", padding: "6px 14px", fontSize: 12 }}>Cancel</button>
            <button className="btn" onClick={addDept}
              style={{ background: newName.trim() ? newColor : "#2a2a3e", color: newName.trim() ? "#fff" : "#444", padding: "6px 16px", fontSize: 12, fontWeight: 600 }}>
              Add Department
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Staff Setup ──────────────────────────────────────────────────────────────


function StaffSetup({ users, setUsers, depts, setDepts }) {
  const DC = n => deptColor(depts, n);
  const [editingId, setEditingId]   = useState(null); // user id being edited
  const [editForm, setEditForm]     = useState({});
  const [addingDept, setAddingDept] = useState(null); // dept name where add row is open
  const [newForm, setNewForm]       = useState({ firstName: "", lastName: "", pin: "", phone: "", dept: "", isManager: false });
  const [saveMsg, setSaveMsg]       = useState("");

  function makeAvatar(name) {
    const parts = name.trim().split(" ");
    return parts.length >= 2 ? (parts[0][0] + parts[parts.length-1][0]).toUpperCase() : name.slice(0,2).toUpperCase();
  }

  function showSave(msg) { setSaveMsg(msg); setTimeout(() => setSaveMsg(""), 2200); }

  function startEdit(u) {
    const [first, ...rest] = u.name.split(" ");
    setEditingId(u.id);
    setEditForm({ firstName: first, lastName: rest.join(" "), pin: u.pin, phone: u.phone, isManager: u.role === "manager" });
  }

  function saveEdit(u) {
    const name = `${editForm.firstName.trim()} ${editForm.lastName.trim()}`.trim();
    if (!name || !/^\d{4}$/.test(editForm.pin)) return;
    setUsers(prev => prev.map(p => p.id === u.id ? {
      ...p,
      name,
      pin: editForm.pin,
      phone: editForm.phone,
      avatar: makeAvatar(name),
      role: editForm.isManager ? "manager" : "employee",
    } : p));
    setEditingId(null);
    showSave("✅ Changes saved");
  }

  function deleteUser(id) {
    setUsers(prev => prev.filter(u => u.id !== id));
    showSave("🗑 Employee removed");
  }

  function openAdd(dept) {
    setAddingDept(dept);
    setNewForm({ firstName: "", lastName: "", pin: "", phone: "", dept, isManager: false });
  }

  function saveNew() {
    const name = `${newForm.firstName.trim()} ${newForm.lastName.trim()}`.trim();
    if (!name || !/^\d{4}$/.test(newForm.pin)) return;
    const newUser = {
      id: Date.now(),
      name,
      role: newForm.isManager ? "manager" : "employee",
      dept: newForm.dept,
      pin: newForm.pin,
      phone: newForm.phone || "",
      avatar: makeAvatar(name),
    };
    setUsers(prev => [...prev, newUser]);
    setAddingDept(null);
    showSave("✅ Employee added");
  }

  const employees = users.filter(u => u.role !== "owner");

  const inputS = {
    background: "#0a0a0f", border: "1px solid #2a2a3e", color: "#e8e4dc",
    borderRadius: 6, padding: "5px 8px", fontFamily: "'DM Sans',sans-serif",
    fontSize: 12, width: "100%",
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Staff Setup</h3>
        <p style={{ color: "#444", fontSize: 12, marginTop: 3 }}>Add or edit staff by department, change PINs, and grant manager access</p>
      </div>

      {saveMsg && (
        <div style={{ background: "#22c55e12", border: "1px solid #22c55e30", borderRadius: 8, padding: "8px 14px", marginBottom: 14, fontSize: 13, color: "#22c55e" }}>
          {saveMsg}
        </div>
      )}

      {/* ── Departments ── */}
      <DeptManager depts={depts} setDepts={setDepts} users={users} />

      {/* Manager access callout */}
      <div style={{ background: "#3b82f610", border: "1px solid #3b82f625", borderRadius: 10, padding: "10px 14px", marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>🔑</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#3b82f6", marginBottom: 2 }}>Manager Access</div>
          <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>
            Toggling <strong style={{ color: "#e8e4dc" }}>Manager</strong> on any employee gives them full admin access — schedule builder, show days, staff CSV, availability overview, and time off approvals. They won't see the Setup page.
          </div>
        </div>
      </div>

      {depts.map(({ name: dept, color }) => {
        const deptEmployees = employees.filter(u => u.dept === dept);

        return (
          <div key={dept} className="card" style={{ marginBottom: 14, overflow: "hidden" }}>
            {/* Dept header */}
            <div style={{ background: `${color}18`, borderBottom: "1px solid #1a1a26", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13, color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{dept}</span>
                <span style={{ fontSize: 11, color: "#444" }}>{deptEmployees.length} staff</span>
              </div>
              <button className="btn" onClick={() => openAdd(dept)}
                style={{ background: `${color}20`, color, padding: "4px 12px", fontSize: 11, fontWeight: 600, border: `1px solid ${color}40` }}>
                + Add
              </button>
            </div>

            {/* Employee rows */}
            {deptEmployees.length === 0 && addingDept !== dept && (
              <div style={{ padding: "12px 16px", fontSize: 12, color: "#333", textAlign: "center" }}>No staff in this department yet</div>
            )}

            {deptEmployees.map(u => (
              <div key={u.id} style={{ borderBottom: "1px solid #111118" }}>
                {editingId === u.id ? (
                  /* ── Edit row ── */
                  <div style={{ padding: "12px 16px", background: "#0f0f1c" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px 1fr", gap: 8, marginBottom: 10 }}>
                      <div>
                        <label style={{ fontSize: 9, color: "#555", display: "block", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>First Name</label>
                        <input style={inputS} value={editForm.firstName} onChange={e => setEditForm(f => ({ ...f, firstName: e.target.value }))} />
                      </div>
                      <div>
                        <label style={{ fontSize: 9, color: "#555", display: "block", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>Last Name</label>
                        <input style={inputS} value={editForm.lastName} onChange={e => setEditForm(f => ({ ...f, lastName: e.target.value }))} />
                      </div>
                      <div>
                        <label style={{ fontSize: 9, color: "#555", display: "block", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>PIN</label>
                        <input style={{ ...inputS, fontFamily: "monospace", letterSpacing: "0.15em" }} value={editForm.pin} onChange={e => setEditForm(f => ({ ...f, pin: e.target.value.replace(/\D/g,"").slice(0,4) }))} maxLength={4} placeholder="4 digits" />
                      </div>
                      <div>
                        <label style={{ fontSize: 9, color: "#555", display: "block", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>Phone</label>
                        <input style={inputS} value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} placeholder="Optional" />
                      </div>
                    </div>

                    {/* Manager toggle */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <button onClick={() => setEditForm(f => ({ ...f, isManager: !f.isManager }))}
                        style={{ width: 36, height: 20, borderRadius: 10, background: editForm.isManager ? "#3b82f6" : "#1a1a28", border: `1px solid ${editForm.isManager ? "#3b82f6" : "#2a2a3e"}`, cursor: "pointer", position: "relative", transition: "all 0.2s", flexShrink: 0 }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: editForm.isManager ? 18 : 2, transition: "left 0.2s" }} />
                      </button>
                      <span style={{ fontSize: 12, color: editForm.isManager ? "#3b82f6" : "#666", fontWeight: editForm.isManager ? 600 : 400 }}>
                        {editForm.isManager ? "🔑 Manager Access" : "Standard Employee"}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn" onClick={() => setEditingId(null)} style={{ background: "#1a1a28", color: "#555", padding: "6px 14px", fontSize: 12 }}>Cancel</button>
                      <button className="btn" onClick={() => saveEdit(u)}
                        style={{ background: editForm.firstName && editForm.lastName && editForm.pin.length === 4 ? "#f97316" : "#2a2a3e", color: editForm.firstName && editForm.lastName && editForm.pin.length === 4 ? "#fff" : "#444", padding: "6px 16px", fontSize: 12, fontWeight: 600 }}>
                        Save Changes
                      </button>
                      <div style={{ flex: 1 }} />
                      <button className="btn" onClick={() => deleteUser(u.id)} style={{ background: "#ef444412", color: "#ef4444", padding: "6px 12px", fontSize: 12 }}>Remove</button>
                    </div>
                  </div>
                ) : (
                  /* ── Display row ── */
                  <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1a1a28", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color, flexShrink: 0 }}>{u.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#ddd" }}>{u.name}</span>
                        {u.role === "manager" && (
                          <span style={{ fontSize: 9, background: "#3b82f620", color: "#3b82f6", borderRadius: 4, padding: "1px 6px", fontWeight: 700, letterSpacing: "0.04em" }}>MANAGER</span>
                        )}
                      </div>
                      <div style={{ fontSize: 10, color: "#444", marginTop: 1 }}>{u.phone || "No phone on file"}</div>
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 13, color: "#333", letterSpacing: "0.15em" }}>{"●●●●"}</div>
                    <button className="btn" onClick={() => startEdit(u)} style={{ background: "#1a1a28", color: "#666", padding: "5px 12px", fontSize: 12, border: "1px solid #2a2a3e" }}>Edit</button>
                  </div>
                )}
              </div>
            ))}

            {/* Add new employee row */}
            {addingDept === dept && (
              <div style={{ padding: "12px 16px", background: "#0f0f1c", borderTop: "1px solid #111118" }}>
                <div style={{ fontSize: 11, color: color, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>New {dept}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px 1fr", gap: 8, marginBottom: 10 }}>
                  <div>
                    <label style={{ fontSize: 9, color: "#555", display: "block", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>First Name</label>
                    <input style={inputS} value={newForm.firstName} onChange={e => setNewForm(f => ({ ...f, firstName: e.target.value }))} placeholder="First" autoFocus />
                  </div>
                  <div>
                    <label style={{ fontSize: 9, color: "#555", display: "block", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>Last Name</label>
                    <input style={inputS} value={newForm.lastName} onChange={e => setNewForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Last" />
                  </div>
                  <div>
                    <label style={{ fontSize: 9, color: "#555", display: "block", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>PIN</label>
                    <input style={{ ...inputS, fontFamily: "monospace", letterSpacing: "0.15em" }} value={newForm.pin} onChange={e => setNewForm(f => ({ ...f, pin: e.target.value.replace(/\D/g,"").slice(0,4) }))} maxLength={4} placeholder="4 digits" />
                  </div>
                  <div>
                    <label style={{ fontSize: 9, color: "#555", display: "block", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>Phone (optional)</label>
                    <input style={inputS} value={newForm.phone} onChange={e => setNewForm(f => ({ ...f, phone: e.target.value }))} placeholder="5551234567" />
                  </div>
                </div>

                {/* Manager toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <button onClick={() => setNewForm(f => ({ ...f, isManager: !f.isManager }))}
                    style={{ width: 36, height: 20, borderRadius: 10, background: newForm.isManager ? "#3b82f6" : "#1a1a28", border: `1px solid ${newForm.isManager ? "#3b82f6" : "#2a2a3e"}`, cursor: "pointer", position: "relative", transition: "all 0.2s", flexShrink: 0 }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: newForm.isManager ? 18 : 2, transition: "left 0.2s" }} />
                  </button>
                  <span style={{ fontSize: 12, color: newForm.isManager ? "#3b82f6" : "#666", fontWeight: newForm.isManager ? 600 : 400 }}>
                    {newForm.isManager ? "🔑 Grant Manager Access" : "Standard Employee"}
                  </span>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn" onClick={() => setAddingDept(null)} style={{ background: "#1a1a28", color: "#555", padding: "6px 14px", fontSize: 12 }}>Cancel</button>
                  <button className="btn" onClick={saveNew}
                    style={{ background: newForm.firstName && newForm.lastName && newForm.pin.length === 4 ? color : "#2a2a3e", color: newForm.firstName && newForm.lastName && newForm.pin.length === 4 ? "#fff" : "#444", padding: "6px 16px", fontSize: 12, fontWeight: 600 }}>
                    Add to {dept}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Show Days Calendar ───────────────────────────────────────────────────────

function toKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

function ShowDaysCalendar({ showDays, setShowDays }) {
  const today = new Date();
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth()); // 0-indexed

  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAY_LABELS  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  // Build calendar grid for current month
  function buildGrid(year, month) {
    const first = new Date(year, month, 1).getDay(); // weekday of 1st
    const days  = new Date(year, month + 1, 0).getDate(); // total days
    const cells = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
    return cells;
  }

  function toggleDate(date) {
    const key = toKey(date);
    setShowDays(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  }

  const grid = buildGrid(calYear, calMonth);
  const showCount = [...showDays].filter(k => k.startsWith(`${calYear}-${String(calMonth+1).padStart(2,'0')}`)).length;

  // Upcoming show days sorted
  const upcomingSorted = [...showDays]
    .map(k => new Date(k + "T12:00:00"))
    .filter(d => d >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    .sort((a, b) => a - b)
    .slice(0, 12);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Show Days</h3>
        <p style={{ color: "#444", fontSize: 12, marginTop: 3 }}>
          Tap dates to mark them as show nights. Staff can only submit availability for marked show days.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>

        {/* Calendar */}
        <div className="card" style={{ padding: 20 }}>
          {/* Month nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <button className="btn" onClick={prevMonth} style={{ background: "#1a1a28", color: "#888", padding: "6px 12px", fontSize: 13 }}>‹</button>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16 }}>{MONTH_NAMES[calMonth]}</div>
              <div style={{ fontSize: 11, color: "#555" }}>{calYear} · {showCount} show {showCount === 1 ? "day" : "days"} marked</div>
            </div>
            <button className="btn" onClick={nextMonth} style={{ background: "#1a1a28", color: "#888", padding: "6px 12px", fontSize: 13 }}>›</button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 6 }}>
            {DAY_LABELS.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 10, color: "#444", fontWeight: 600, padding: "4px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>{d}</div>
            ))}
          </div>

          {/* Date cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
            {grid.map((date, i) => {
              if (!date) return <div key={`blank-${i}`} />;
              const key = toKey(date);
              const isShow = showDays.has(key);
              const isToday = date.toDateString() === today.toDateString();
              const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const dayOfWeek = date.getDay();
              const isWeekend = [4,5,6].includes(dayOfWeek); // Thu/Fri/Sat

              return (
                <button key={key} onClick={() => !isPast && toggleDate(date)}
                  style={{
                    aspectRatio: "1", borderRadius: 8, border: isToday ? "2px solid #f97316" : isShow ? "2px solid #f9731680" : "1px solid #1a1a26",
                    background: isShow ? "linear-gradient(135deg,#f9731630,#ec489918)" : isPast ? "transparent" : isWeekend ? "#111118" : "#0d0d14",
                    color: isShow ? "#f97316" : isPast ? "#2a2a3e" : isToday ? "#f97316" : "#888",
                    fontFamily: "'DM Sans',sans-serif", fontWeight: isShow ? 700 : 400,
                    fontSize: 13, cursor: isPast ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column", gap: 1, padding: 4,
                    transition: "all 0.12s",
                    position: "relative",
                  }}>
                  {date.getDate()}
                  {isShow && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#f97316", marginTop: 1 }} />}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
            {[
              { bg: "linear-gradient(135deg,#f9731630,#ec489918)", border: "2px solid #f9731680", label: "Show Day", color: "#f97316" },
              { bg: "#111118", border: "1px solid #1a1a26", label: "Thu / Fri / Sat", color: "#666" },
              { bg: "#0d0d14", border: "1px solid #1a1a26", label: "Other days", color: "#555" },
            ].map(({ bg, border, label, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: bg, border }} />
                <span style={{ fontSize: 10, color }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming show days sidebar */}
        <div>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Upcoming Show Days</div>
            {upcomingSorted.length === 0 ? (
              <p style={{ color: "#333", fontSize: 12 }}>No show days marked yet</p>
            ) : upcomingSorted.map(d => {
              const key = toKey(d);
              const dayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];
              const isThisPeriod = [4,5,6].includes(d.getDay());
              return (
                <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #111118" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: "#1a1428", border: "1px solid #f9731640", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 8, color: "#f97316", fontWeight: 600, textTransform: "uppercase" }}>{dayName}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#f97316", lineHeight: 1 }}>{d.getDate()}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#ccc" }}>{d.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
                      {isThisPeriod && <div style={{ fontSize: 10, color: "#f9731660", marginTop: 1 }}>Weekend show night</div>}
                    </div>
                  </div>
                  <button className="btn" onClick={() => toggleDate(d)}
                    style={{ background: "#ef444412", color: "#ef4444", padding: "3px 8px", fontSize: 11 }}>✕</button>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 10, background: "#0d0d18", border: "1px solid #1a1a28", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "#f97316", fontWeight: 600, marginBottom: 5 }}>How this works</div>
            <div style={{ fontSize: 11, color: "#444", lineHeight: 1.6 }}>
              When staff submit availability, they can only select dates you've marked here. Dates not marked as show days won't appear in their availability form.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Staff CSV Manager ────────────────────────────────────────────────────────

const CSV_HEADERS = ["name","department","pin","phone"];

function makeAvatar(name) {
  const parts = name.trim().split(" ");
  return parts.length >= 2 ? (parts[0][0] + parts[parts.length-1][0]).toUpperCase() : name.slice(0,2).toUpperCase();
}

function StaffCSVManager({ users, setUsers }) {
  const depts = useContext(DeptsContext); const DC = n => deptColor(depts, n);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview]   = useState(null); // parsed rows before confirm
  const [errors, setErrors]     = useState([]);
  const [success, setSuccess]   = useState("");
  const fileRef = React.useRef();

  // Download the blank template CSV
  function downloadTemplate() {
    const sample = [
      CSV_HEADERS.join(","),
      "Jane Smith,Bartender,1234,5551234567",
      "Alex Jones,Security,5678,5559876543",
      "Sam Lee,Box Office,9012,5554561234",
    ].join("\n");
    const blob = new Blob([sample], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "nightshift_staff_template.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  // Download current staff as CSV
  function downloadCurrent() {
    const rows = [CSV_HEADERS.join(",")];
    users.filter(u => u.role === "employee").forEach(u => {
      rows.push([u.name, u.dept, u.pin, u.phone].join(","));
    });
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "nightshift_staff_export.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  function parseCSV(text) {
    const lines = text.trim().split("\n").map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return { rows: [], errs: ["CSV must have a header row and at least one employee row."] };

    const header = lines[0].split(",").map(h => h.trim().toLowerCase());
    const missingHeaders = CSV_HEADERS.filter(h => !header.includes(h));
    if (missingHeaders.length) return { rows: [], errs: [`Missing columns: ${missingHeaders.join(", ")}. Download the template to see required headers.`] };

    const idx = Object.fromEntries(CSV_HEADERS.map(h => [h, header.indexOf(h)]));
    const rows = []; const errs = [];

    lines.slice(1).forEach((line, i) => {
      const cols = line.split(",").map(c => c.trim());
      const rowNum = i + 2;
      const name = cols[idx.name] || "";
      const dept = cols[idx.department] || "";
      const pin  = cols[idx.pin] || "";
      const phone = cols[idx.phone] || "";

      if (!name) { errs.push(`Row ${rowNum}: Name is required.`); return; }
      if (!depts.map(d=>d.name).includes(dept)) { errs.push(`Row ${rowNum} (${name}): Department "${dept}" is invalid. Must be one of: ${depts.map(d=>d.name).join(", ")}.`); return; }
      if (!/^\d{4}$/.test(pin)) { errs.push(`Row ${rowNum} (${name}): PIN must be exactly 4 digits.`); return; }
      if (!/^\d{7,15}$/.test(phone.replace(/\D/g,""))) { errs.push(`Row ${rowNum} (${name}): Phone number looks invalid.`); return; }

      rows.push({ name, dept, pin, phone: phone.replace(/\D/g,"") });
    });

    return { rows, errs };
  }

  function processFile(file) {
    if (!file || !file.name.endsWith(".csv")) {
      setErrors(["Please upload a .csv file."]); setPreview(null); return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const { rows, errs } = parseCSV(e.target.result);
      setErrors(errs);
      setPreview(rows.length > 0 ? rows : null);
      setSuccess("");
    };
    reader.readAsText(file);
  }

  function handleDrop(e) {
    e.preventDefault(); setDragOver(false);
    processFile(e.dataTransfer.files[0]);
  }

  function confirmImport() {
    if (!preview?.length) return;
    // Keep owner account, replace all employees
    const owner = users.find(u => u.role === "owner");
    const newEmployees = preview.map((row, i) => ({
      id: Date.now() + i,
      name: row.name,
      role: "employee",
      dept: row.dept,
      pin: row.pin,
      phone: row.phone,
      avatar: makeAvatar(row.name),
    }));
    setUsers([owner, ...newEmployees]);
    setSuccess(`✅ ${newEmployees.length} employees imported successfully!`);
    setPreview(null);
    setErrors([]);
  }

  const employees = users.filter(u => u.role === "employee");

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Staff Roster</h3>
          <p style={{ color: "#444", fontSize: 12, marginTop: 2 }}>{employees.length} employees · upload a CSV to add or replace staff</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={downloadTemplate}
            style={{ background: "#1a1a28", color: "#888", padding: "8px 14px", fontSize: 12, display: "flex", alignItems: "center", gap: 6, border: "1px solid #2a2a3e" }}>
            ⬇ Download Template
          </button>
          {employees.length > 0 && (
            <button className="btn" onClick={downloadCurrent}
              style={{ background: "#1a1a28", color: "#888", padding: "8px 14px", fontSize: 12, display: "flex", alignItems: "center", gap: 6, border: "1px solid #2a2a3e" }}>
              ⬇ Export Current Staff
            </button>
          )}
        </div>
      </div>

      {/* Required columns info */}
      <div style={{ background: "#0d0d18", border: "1px solid #1a1a28", borderRadius: 10, padding: "12px 16px", marginBottom: 18 }}>
        <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Required CSV Columns</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { col: "name", desc: "Full name" },
            { col: "department", desc: "Bartender, Security, Box Office, Barback, or Lighting Director" },
            { col: "pin", desc: "4-digit login PIN" },
            { col: "phone", desc: "10-digit phone number" },
          ].map(({ col, desc }) => (
            <div key={col} style={{ background: "#111118", borderRadius: 6, padding: "5px 10px" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#f97316", fontFamily: "monospace" }}>{col}</span>
              <span style={{ fontSize: 10, color: "#444", marginLeft: 6 }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? "#f97316" : "#2a2a3e"}`,
          borderRadius: 14, padding: "32px 20px", textAlign: "center",
          cursor: "pointer", marginBottom: 16, transition: "all 0.2s",
          background: dragOver ? "#f9731608" : "#0d0d18",
        }}>
        <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={e => processFile(e.target.files[0])} />
        <div style={{ fontSize: 28, marginBottom: 8 }}>📂</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: dragOver ? "#f97316" : "#888" }}>
          {dragOver ? "Drop it!" : "Drag & drop your CSV here"}
        </div>
        <div style={{ fontSize: 12, color: "#444", marginTop: 4 }}>or click to browse · .csv files only</div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div style={{ background: "#ef444410", border: "1px solid #ef444430", borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#ef4444", marginBottom: 6 }}>⚠ Fix these issues before importing:</div>
          {errors.map((e, i) => <div key={i} style={{ fontSize: 12, color: "#ef444490", marginBottom: 3 }}>• {e}</div>)}
        </div>
      )}

      {/* Success */}
      {success && (
        <div style={{ background: "#22c55e10", border: "1px solid #22c55e30", borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: "#22c55e" }}>{success}</div>
        </div>
      )}

      {/* Preview before confirm */}
      {preview && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#e8e4dc" }}>Preview — {preview.length} employees found</div>
              <div style={{ fontSize: 11, color: "#f97316", marginTop: 2 }}>⚠ This will replace all current employees. Owner account is preserved.</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn" onClick={() => { setPreview(null); setErrors([]); }} style={{ background: "#1a1a28", color: "#666", padding: "8px 14px", fontSize: 12 }}>Cancel</button>
              <button className="btn" onClick={confirmImport} style={{ background: "#f97316", color: "#fff", padding: "8px 16px", fontSize: 12, fontWeight: 600 }}>Import {preview.length} Staff</button>
            </div>
          </div>
          <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #1a1a28" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#0d0d18" }}>
                  {["Name","Department","PIN","Phone"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 10, color: "#444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #1a1a28" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #0d0d14", background: i % 2 === 0 ? "#0c0c14" : "#0a0a10" }}>
                    <td style={{ padding: "8px 12px", fontSize: 13 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 26, height: 26, background: "#1a1a28", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: DC(row.dept), flexShrink: 0 }}>{makeAvatar(row.name)}</div>
                        {row.name}
                      </div>
                    </td>
                    <td style={{ padding: "8px 12px" }}>
                      <span className="pill" style={{ background: `${DC(row.dept)}18`, color: DC(row.dept), fontSize: 11 }}>{row.dept}</span>
                    </td>
                    <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 13, color: "#666" }}>{"•".repeat(row.pin.length)}</td>
                    <td style={{ padding: "8px 12px", fontSize: 12, color: "#555" }}>{row.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Current staff list */}
      {!preview && (
        <div>
          <div style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Current Staff</div>
          {employees.length === 0 ? (
            <div className="card" style={{ padding: 28, textAlign: "center" }}><p style={{ color: "#444" }}>No employees yet — upload a CSV to get started</p></div>
          ) : (
            <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #1a1a28" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0d0d18" }}>
                    {["Employee","Department","Phone","PIN"].map(h => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 10, color: "#444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #1a1a28" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((u, i) => (
                    <tr key={u.id} style={{ borderBottom: "1px solid #0d0d14", background: i % 2 === 0 ? "#0c0c14" : "#0a0a10" }}>
                      <td style={{ padding: "9px 12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <div style={{ width: 28, height: 28, background: "#1a1a28", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: DC(u.dept), flexShrink: 0 }}>{u.avatar}</div>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "9px 12px" }}>
                        <span className="pill" style={{ background: `${DC(u.dept)}18`, color: DC(u.dept) }}>{u.dept}</span>
                      </td>
                      <td style={{ padding: "9px 12px", fontSize: 12, color: "#555" }}>{u.phone}</td>
                      <td style={{ padding: "9px 12px", fontFamily: "monospace", fontSize: 12, color: "#333" }}>{"•".repeat(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Schedule Builder (Google-Sheet style) ────────────────────────────────────

function parseTimeToMins(t) {
  if (!t || t.trim() === "" || t.toLowerCase() === "close") return null;
  const clean = t.trim().toUpperCase();
  const m = clean.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/);
  if (!m) return null;
  let h = parseInt(m[1]);
  const min = parseInt(m[2] || "0");
  if (m[3] === "PM" && h !== 12) h += 12;
  if (m[3] === "AM" && h === 12) h = 0;
  return h * 60 + min;
}

function calcHours(start, end) {
  if (!start || !end) return null;
  const s = parseTimeToMins(start);
  let e = parseTimeToMins(end);
  if (s === null || e === null) return null;
  if (e <= s) e += 24 * 60; // crosses midnight
  return ((e - s) / 60).toFixed(2);
}

function ScheduleBuilder({ shifts, users, weekDates, weekOffset, setWeekOffset, onAddShift, onDeleteShift, availability, timeOffRequests, dayMeta, setDayMeta, sendTelegram }) {
  const depts = useContext(DeptsContext); const DC = n => deptColor(depts, n);
  const lang = useContext(LangContext);
  const t = T[lang];
  const DEPTS = depts.map(d => d.name);
  const showDates = weekDates.filter((_, i) => [4, 5, 6].includes(i));
  const [published, setPublished] = useState(false);

  // Check if a user has approved time off covering a given date string (M/D)
  function isOnTimeOff(userId, dateStr) {
    if (!timeOffRequests) return false;
    return timeOffRequests.some(r => {
      if (r.userId !== userId || r.status !== "approved") return false;
      // Parse the stored dates string — could be "Mar 15", "Mar 15 – Mar 18 (4 days)", etc.
      // Extract all dates from the range and check if dateStr falls within
      const raw = r.dates;
      // Try to parse a range like "Mar 15 – Mar 18 (4 days)" or "Mar 15"
      const rangeMatch = raw.match(/([A-Za-z]+\s+\d+)\s*[–-]\s*([A-Za-z]+\s+\d+)/);
      const year = new Date().getFullYear();
      if (rangeMatch) {
        const start = new Date(`${rangeMatch[1]} ${year}`);
        const end   = new Date(`${rangeMatch[2]} ${year}`);
        // dateStr is "M/D" — build a comparable Date
        const [m, d] = dateStr.split("/").map(Number);
        const check = new Date(year, m - 1, d);
        return check >= start && check <= end;
      } else {
        // Single day — "Mar 15"
        const single = new Date(`${raw.replace(/\s*\(.*\)/, "").trim()} ${year}`);
        const [m, d] = dateStr.split("/").map(Number);
        const check = new Date(year, m - 1, d);
        return check.toDateString() === single.toDateString();
      }
    });
  }

  // Local editable grid: { [userId_date]: { start, end, oncall } }
  const [cells, setCells] = useState(() => {
    const init = {};
    shifts.forEach(s => {
      const key = `${s.userId}_${s.date}`;
      init[key] = { start: s.start, end: s.end, oncall: false, shiftId: s.id };
    });
    return init;
  });

  // Initialize dayMeta for current show dates if not set
  const localMeta = showDates.reduce((acc, d) => {
    const k = fmt(d);
    acc[k] = dayMeta?.[k] || { doors: "", close: "" };
    return acc;
  }, {});
  function updateDayMeta(date, field, val) {
    setDayMeta(prev => ({ ...prev, [date]: { ...(prev?.[date] || {}), [field]: val } }));
  }

  function getCell(userId, date) {
    return cells[`${userId}_${date}`] || { start: "", end: "", oncall: false };
  }

  function setCell(userId, date, field, val) {
    const key = `${userId}_${date}`;
    setCells(prev => ({ ...prev, [key]: { ...prev[key], [field]: val } }));
  }

  function toggleOnCall(userId, date) {
    const key = `${userId}_${date}`;
    const cur = cells[key] || {};
    setCells(prev => ({ ...prev, [key]: { ...cur, oncall: !cur.oncall } }));
  }

  // Get availability info for a user on a given date
  function getAvailInfo(userId, date) {
    const avail = availability[userId];
    if (!avail?.days) return null;
    const d = new Date(date);
    // match by date string stored in avail
    const entry = Object.entries(avail.days).find(([, v]) => v.date === date);
    if (!entry) return null;
    const [dayName, v] = entry;
    return v;
  }

  // Publish all filled cells as shifts (notify employees)
  function publishSchedule() {
    // Remove all existing shifts for this week's show dates
    showDates.forEach(d => {
      const dateStr = fmt(d);
      shifts.filter(s => s.date === dateStr).forEach(s => onDeleteShift(s.id));
    });
    // Add new shifts from cells
    Object.entries(cells).forEach(([key, cell]) => {
      if (!cell.start && !cell.oncall) return;
      const [userId, date] = key.split("_");
      const u = users.find(u => u.id === parseInt(userId));
      if (!u || !showDates.some(d => fmt(d) === date)) return;
      onAddShift && onAddShift({
        _direct: true,
        userId: parseInt(userId),
        date,
        start: cell.oncall ? "ON CALL" : cell.start,
        end: cell.oncall ? "" : cell.end,
        role: u.dept,
        note: ""
      });
    });
    // Show success toast
    setPublished(true);
    setTimeout(() => setPublished(false), 3500);
    // Telegram notification
    const dateRange = `${showDates[0].toLocaleDateString("en-US",{month:"short",day:"numeric"})} – ${showDates[showDates.length-1].toLocaleDateString("en-US",{month:"short",day:"numeric"})}`;
    const scheduledNames = [...new Set(
      Object.entries(cells)
        .filter(([,c]) => c.start || c.oncall)
        .map(([key]) => { const u = users.find(u => u.id === parseInt(key.split("_")[0])); return u?.name.split(" ")[0]; })
        .filter(Boolean)
    )].join(", ");
    sendTelegram && sendTelegram(`📅 <b>Schedule Published</b>\n\n<b>${dateRange}</b>\n\n${scheduledNames ? `Scheduled: ${scheduledNames}` : "Check Kingdom NightShift for your shifts."}`);
  }

  // Total hours per user across shown days
  function totalHours(userId) {
    let total = 0;
    showDates.forEach(d => {
      const c = getCell(userId, fmt(d));
      const h = calcHours(c.start, c.end);
      if (h) total += parseFloat(h);
    });
    return total > 0 ? total.toFixed(2) : "0.00";
  }

  // Check if a scheduled time is outside the person's stated availability window
  function isOutsideAvail(cellStart, cellEnd, availInfo) {
    if (!availInfo || !availInfo.available) return false; // NA handled separately
    if (availInfo.allDay) return false; // all day = no conflict possible
    if (!cellStart || !cellEnd) return false;
    if (!availInfo.start || !availInfo.end) return false;
    const sched_s = parseTimeToMins(cellStart);
    let sched_e   = parseTimeToMins(cellEnd);
    const avail_s = parseTimeToMins(availInfo.start);
    let avail_e   = parseTimeToMins(availInfo.end);
    if (sched_s === null || sched_e === null || avail_s === null || avail_e === null) return false;
    // Handle midnight crossing for both
    if (sched_e <= sched_s) sched_e += 24 * 60;
    if (avail_e <= avail_s) avail_e += 24 * 60;
    // Conflict: scheduled starts before avail window, or ends after avail window
    return sched_s < avail_s || sched_e > avail_e;
  }

  // Get a compact availability summary for a user across all show dates
  function getAvailSummary(userId) {
    return showDates.map(d => {
      const dateStr = fmt(d);
      const info = getAvailInfo(userId, dateStr);
      const dayLabel = ["Su","Mo","Tu","We","Th","Fr","Sa"][d.getDay()];
      if (!info) return { dateStr, dayLabel, status: "none", info };
      if (!info.available) return { dateStr, dayLabel, status: "na", info };
      if (info.allDay) return { dateStr, dayLabel, status: "allday", info };
      return { dateStr, dayLabel, status: "window", info };
    });
  }

  const inputStyle = {
    background: "transparent", border: "none", color: "#e8e4dc", fontFamily: "'DM Sans',sans-serif",
    fontSize: 11, width: "100%", textAlign: "center", outline: "none", padding: "2px 0"
  };

  const cellStyle = (filled, isAvail) => ({
    background: filled ? "#1a1428" : isAvail === false ? "#1a1010" : "#111118",
    borderBottom: "1px solid #0d0d14", borderRight: "1px solid #0d0d14",
    padding: "5px 4px", verticalAlign: "top", minWidth: 110, position: "relative"
  });

  return (
    <div>
      <style>{`
        .builder-input:focus { background: #1e1e30 !important; }
        .builder-input::placeholder { color: #333; }
      `}</style>

      {/* Week nav + publish */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <button className="btn" onClick={() => setWeekOffset(w => w - 1)} style={{ background: "#161622", color: "#888", padding: "6px 12px", fontSize: 12 }}>← Prev</button>
        <span style={{ color: "#888", fontSize: 13, fontWeight: 600 }}>
          {showDates[0]?.toLocaleDateString("en-US",{month:"short",day:"numeric"})} – {showDates[showDates.length-1]?.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
        </span>
        <button className="btn" onClick={() => setWeekOffset(w => w + 1)} style={{ background: "#161622", color: "#888", padding: "6px 12px", fontSize: 12 }}>Next →</button>
        <div style={{ flex: 1 }} />
        {published && (
          <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#22c55e18", border: "1px solid #22c55e40", borderRadius: 8, padding: "7px 14px", animation: "fadeIn 0.2s ease" }}>
            <span style={{ fontSize: 14 }}>✅</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#22c55e" }}>{t.schedulePublished}</span>
          </div>
        )}
        <button className="btn" onClick={publishSchedule}
          style={{ background: published ? "#22c55e" : "#f97316", color: "#fff", padding: "8px 18px", fontSize: 13, fontWeight: 600, transition: "background 0.3s" }}>
          {published ? t.published : t.publishSchedule}
        </button>
      </div>

      <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid #1a1a26" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 600 }}>
          <thead>
            {/* Ticket sales / Show Day row */}
            <tr style={{ background: "#0d0d18" }}>
              <td style={{ width: 160, padding: "6px 10px", borderBottom: "1px solid #1a1a26", borderRight: "1px solid #1a1a26" }}>
                <div style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.06em" }}>Subject to change</div>
              </td>
              {showDates.map(d => (
                <td key={fmt(d)} colSpan={3} style={{ borderBottom: "1px solid #1a1a26", borderRight: "1px solid #1a1a26", padding: "6px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "#555", marginBottom: 3 }}>Ticket Sales</div>
                  <span style={{ background: "#22c55e20", color: "#22c55e", borderRadius: 6, padding: "2px 10px", fontSize: 10, fontWeight: 700 }}>SHOW DAY</span>
                </td>
              ))}
              <td style={{ borderBottom: "1px solid #1a1a26", width: 50 }} />
            </tr>
            {/* Doors / Close row */}
            <tr style={{ background: "#0d0d18" }}>
              <td style={{ padding: "5px 10px", borderBottom: "1px solid #1a1a26", borderRight: "1px solid #1a1a26" }}>
                <div style={{ fontSize: 9, color: "#333" }}>Doors / Close</div>
              </td>
              {showDates.map(d => {
                const meta = localMeta[fmt(d)] || {};
                return (
                  <td key={fmt(d)} colSpan={3} style={{ borderBottom: "1px solid #1a1a26", borderRight: "1px solid #1a1a26", padding: "4px 6px" }}>
                    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                      <input className="builder-input" style={{ ...inputStyle, width: 70, background: "#181826", border: "1px solid #2a2a3e", borderRadius: 4, padding: "3px 6px" }}
                        value={meta.doors} onChange={e => updateDayMeta(fmt(d), "doors", e.target.value)} placeholder="Doors" />
                      <input className="builder-input" style={{ ...inputStyle, width: 70, background: "#181826", border: "1px solid #2a2a3e", borderRadius: 4, padding: "3px 6px" }}
                        value={meta.close} onChange={e => updateDayMeta(fmt(d), "close", e.target.value)} placeholder="Close" />
                    </div>
                  </td>
                );
              })}
              <td style={{ borderBottom: "1px solid #1a1a26" }} />
            </tr>
            {/* Day name + date row */}
            <tr style={{ background: "#0a0a12" }}>
              <td style={{ padding: "8px 10px", borderBottom: "2px solid #1a1a26", borderRight: "1px solid #1a1a26" }}>
                <div style={{ fontSize: 10, color: "#555", fontWeight: 600 }}>STAFF</div>
              </td>
              {showDates.map((d, i) => {
                const isToday = d.toDateString() === new Date().toDateString();
                return (
                  <td key={fmt(d)} colSpan={3} style={{ borderBottom: "2px solid #1a1a26", borderRight: "1px solid #1a1a26", padding: "6px 10px" }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: isToday ? "#f97316" : "#e8e4dc", lineHeight: 1 }}>
                      {d.toLocaleDateString("en-US",{weekday:"short"})}
                    </div>
                    <div style={{ fontSize: 11, color: isToday ? "#f97316" : "#555", marginTop: 2 }}>
                      {d.toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                    </div>
                  </td>
                );
              })}
              <td style={{ borderBottom: "2px solid #1a1a26", padding: "6px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 9, color: "#444", textTransform: "uppercase" }}>Hrs</div>
              </td>
            </tr>
            {/* Start / End / Hours sub-header */}
            <tr style={{ background: "#0a0a12" }}>
              <td style={{ borderBottom: "1px solid #1a1a26", borderRight: "1px solid #1a1a26" }} />
              {showDates.map(d => (
                <React.Fragment key={fmt(d)}>
                  <td style={{ fontSize: 9, color: "#444", textAlign: "center", padding: "3px 4px", borderBottom: "1px solid #1a1a26", textTransform: "uppercase", letterSpacing: "0.04em" }}>Start</td>
                  <td style={{ fontSize: 9, color: "#444", textAlign: "center", padding: "3px 4px", borderBottom: "1px solid #1a1a26", textTransform: "uppercase", letterSpacing: "0.04em" }}>End</td>
                  <td style={{ fontSize: 9, color: "#444", textAlign: "center", padding: "3px 4px", borderBottom: "1px solid #1a1a26", borderRight: "1px solid #1a1a26", textTransform: "uppercase", letterSpacing: "0.04em" }}>Hrs</td>
                </React.Fragment>
              ))}
              <td style={{ borderBottom: "1px solid #1a1a26" }} />
            </tr>
          </thead>
          <tbody>
            {DEPTS.map(dept => {
              const deptUsers = users.filter(u => u.dept === dept);
              const color = DC(dept) || "#888";
              return (
                <React.Fragment key={dept}>
                  {/* Department header row */}
                  <tr>
                    <td colSpan={showDates.length * 3 + 2} style={{ background: `${color}22`, borderBottom: "1px solid #0d0d14", borderTop: "2px solid " + color + "44", padding: "7px 12px" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: "0.04em", textTransform: "uppercase" }}>{dept}</span>
                    </td>
                  </tr>
                  {/* Each employee in dept */}
                  {deptUsers.map(u => {
                    const hrs = totalHours(u.id);
                    const availSummary = getAvailSummary(u.id);
                    // Check if any scheduled day is outside their avail window
                    const hasAnyConflict = showDates.some(d => {
                      const dateStr = fmt(d);
                      const cell = getCell(u.id, dateStr);
                      const info = getAvailInfo(u.id, dateStr);
                      return !cell.oncall && isOutsideAvail(cell.start, cell.end, info);
                    });

                    return (
                      <tr key={u.id} style={{ background: "#0c0c14" }}>
                        {/* Name cell */}
                        <td style={{ padding: "6px 10px", borderBottom: "1px solid #0d0d14", borderRight: "1px solid #1a1a26", minWidth: 150 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: hasAnyConflict ? "#ef4444" : "#ccc" }}>{u.name}</div>
                          <div style={{ fontSize: 9, color: "#444" }}>{dept}</div>
                          {hasAnyConflict && <div style={{ fontSize: 8, color: "#ef4444", marginTop: 2, fontWeight: 600 }}>⚠ Outside avail</div>}
                        </td>

                        {/* Day cells */}
                        {showDates.map(d => {
                          const dateStr = fmt(d);
                          const cell = getCell(u.id, dateStr);
                          const availInfo = getAvailInfo(u.id, dateStr);
                          const isNA = availInfo?.available === false;
                          const isAvailAllDay = availInfo?.available && availInfo?.allDay;
                          const availStart = availInfo?.start;
                          const availEnd = availInfo?.end;
                          const hrs = calcHours(cell.start, cell.end);
                          const filled = cell.start || cell.oncall;
                          const conflict = !cell.oncall && !isNA && isOutsideAvail(cell.start, cell.end, availInfo);
                          const timeOff = isOnTimeOff(u.id, dateStr); // approved time off

                          // Cell background priority: timeOff > conflict > oncall > na > filled > empty
                          const cellBg = timeOff ? "#120a1e" : isNA ? "#1a1010" : conflict ? "#2a0e0e" : cell.oncall ? "#1a1808" : filled ? "#1a1428" : "#111118";

                          // Reusable "blocked" cell content for both timeOff and isNA
                          const blockedContent = (label, color) => (
                            <div style={{ fontSize: 9, color, textAlign: "center", lineHeight: 1.4, padding: "2px 0", fontWeight: 600 }}>
                              {label}
                            </div>
                          );

                          return (
                            <React.Fragment key={dateStr}>
                              {/* Start time */}
                              <td style={{ ...cellStyle(filled, isNA ? false : null), background: cellBg, outline: conflict ? "1px solid #ef444425" : timeOff ? "1px solid #a855f730" : "none" }}>
                                {timeOff ? blockedContent("TIME\nOFF", "#a855f7") :
                                 isNA ? blockedContent("NOT\nAVAILABLE\nALL DAY", "#555") : (
                                  <div>
                                    {availStart && !isNA && !cell.oncall && (
                                      <div style={{ fontSize: 8, color: conflict ? "#ef444470" : "#60a5fa", textAlign: "center", marginBottom: 1, fontWeight: 600 }}>
                                        {isAvailAllDay ? "all day" : availStart}
                                      </div>
                                    )}
                                    <input className="builder-input" style={{ ...inputStyle, color: conflict ? "#ef4444" : cell.oncall ? "#eab308" : "#e8e4dc" }} value={cell.start}
                                      onChange={e => setCell(u.id, dateStr, "start", e.target.value)}
                                      placeholder="–" />
                                    {cell.oncall && <div style={{ fontSize: 8, fontWeight: 700, color: "#eab308", textAlign: "center", marginTop: 2, letterSpacing: "0.06em" }}>ON CALL</div>}
                                    {conflict && <div style={{ fontSize: 8, color: "#ef4444", textAlign: "center", marginTop: 1 }}>⚠ early</div>}
                                  </div>
                                )}
                              </td>
                              {/* End time */}
                              <td style={{ ...cellStyle(filled, isNA ? false : null), background: cellBg, outline: conflict ? "1px solid #ef444425" : timeOff ? "1px solid #a855f730" : "none" }}>
                                {timeOff ? <div /> :
                                 isNA ? <div /> : (
                                  <div>
                                    {availEnd && !isNA && !isAvailAllDay && !cell.oncall && (
                                      <div style={{ fontSize: 8, color: conflict ? "#ef444470" : "#60a5fa", textAlign: "center", marginBottom: 1, fontWeight: 600 }}>{availEnd}</div>
                                    )}
                                    <input className="builder-input" style={{ ...inputStyle, color: conflict ? "#ef4444" : cell.oncall ? "#eab308" : "#e8e4dc" }} value={cell.end}
                                      onChange={e => setCell(u.id, dateStr, "end", e.target.value)}
                                      placeholder="–" />
                                    {cell.oncall && <div style={{ fontSize: 8, fontWeight: 700, color: "#eab30880", textAlign: "center", marginTop: 2, letterSpacing: "0.06em" }}>ON CALL</div>}
                                    {conflict && <div style={{ fontSize: 8, color: "#ef4444", textAlign: "center", marginTop: 1 }}>⚠ late</div>}
                                  </div>
                                )}
                              </td>
                              {/* Hours + on-call toggle */}
                              <td style={{ ...cellStyle(filled, isNA ? false : null), borderRight: "1px solid #1a1a26", background: cellBg }}>
                                {timeOff ? (
                                  <div style={{ textAlign: "center" }}>
                                    <span style={{ fontSize: 9, color: "#a855f7", fontWeight: 700 }}>🏖</span>
                                  </div>
                                ) : !isNA && (
                                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: conflict ? "#ef4444" : cell.oncall ? "#eab308" : hrs ? "#22c55e" : "#333" }}>
                                      {cell.oncall ? "OC" : hrs || "—"}
                                    </div>
                                    <button onClick={() => toggleOnCall(u.id, dateStr)}
                                      style={{ fontSize: 8, background: cell.oncall ? "#eab30830" : "#1a1a28", color: cell.oncall ? "#eab308" : "#444", border: `1px solid ${cell.oncall ? "#eab30860" : "#222"}`, borderRadius: 3, padding: "1px 4px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: cell.oncall ? 700 : 400 }}>
                                      {cell.oncall ? "✓ OC" : "OC"}
                                    </button>
                                  </div>
                                )}
                              </td>
                            </React.Fragment>
                          );
                        })}
                        {/* Total hours */}
                        <td style={{ padding: "6px 8px", borderBottom: "1px solid #0d0d14", textAlign: "center", verticalAlign: "middle" }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: parseFloat(hrs) > 0 ? "#f97316" : "#333" }}>{hrs}</span>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["#1a1428","Scheduled"],["#1a1010","Not Available"],["#2a0e0e","⚠ Conflict"],["#1a1808","On Call"],["#120a1e","🏖 Time Off"],["#111118","No Input"]].map(([bg, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, background: bg, border: "1px solid #2a2a3e", borderRadius: 2 }} />
              <span style={{ fontSize: 10, color: label.includes("⚠") ? "#ef4444" : "#444" }}>{label}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 10, color: "#60a5fa", fontWeight: 600 }}>blue text above</span>
            <span style={{ fontSize: 10, color: "#444" }}> = submitted avail window</span>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 10, color: "#444" }}>Type start/end times (e.g. 8:00 PM, CLOSE) · OC = On Call</span>
      </div>
    </div>
  );
}

// ─── Notifications ─────────────────────────────────────────────────────────────

function NotifsView({ notifications }) {
  const lang = useContext(LangContext);
  const t = T[lang];
  return (
    <div>
      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: "-0.03em", marginBottom: 18 }}>{t.notifsTitle}</h2>
      {notifications.length === 0
        ? <div className="card" style={{ padding: 40, textAlign: "center" }}><div style={{ fontSize: 34, marginBottom: 10 }}>🔔</div><p style={{ color: "#444" }}>{t.allClear}</p></div>
        : [...notifications].reverse().map(n => (
            <div key={n.id} className="card" style={{ padding: 14, marginBottom: 7, display: "flex", gap: 11, alignItems: "flex-start" }}>
              <div style={{ fontSize: 17, marginTop: 1 }}>{n.type === "swap" ? "🔄" : "📣"}</div>
              <div>
                <div style={{ fontSize: 13 }}>{n.msg}</div>
                <div style={{ fontSize: 11, color: "#333", marginTop: 4 }}>{n.time}</div>
              </div>
            </div>
          ))
      }
    </div>
  );
}

// ─── Modals ────────────────────────────────────────────────────────────────────

function GiveupModal({ shift, onConfirm, onClose }) {
  const depts = useContext(DeptsContext); const DC = n => deptColor(depts, n);
  const lang = useContext(LangContext);
  const t = T[lang];
  const [note, setNote] = useState("");

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal fade-in" onClick={e => e.stopPropagation()}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, marginBottom: 8 }}>{t.giveUpTitle}</h3>
        <p style={{ color: "#666", fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>
          {t.giveUpDesc} <strong style={{ color: "#e8e4dc" }}>{t.openForPickup}</strong>{t.giveUpDesc2} {shift.role} {t.giveUpDesc3} <strong style={{ color: "#e8e4dc" }}>{t.itStaysYours}</strong>
        </p>
        <div style={{ background: "#0e0e16", borderRadius: 10, padding: "13px 14px", marginBottom: 16, borderLeft: `3px solid ${DC(shift.role)}` }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: DC(shift.role) }}>{shift.role}</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{shift.date} · {shift.start} – {shift.end}{shift.note ? ` · ${shift.note}` : ""}</div>
        </div>
        <label style={{ display: "block", fontSize: 11, color: "#555", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.noteForCoworkers}</label>
        <textarea className="input" value={note} onChange={e => setNote(e.target.value)}
          placeholder={t.noteForCoworkersPlaceholder}
          rows={2} style={{ resize: "none", marginBottom: 20, fontSize: 13 }} />
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn" onClick={onClose} style={{ flex: 1, background: "#1a1a28", color: "#555", padding: "10px 0" }}>{t.cancel}</button>
          <button className="btn" onClick={() => onConfirm(shift.id, note)} style={{ flex: 1, background: "#f97316", color: "#fff", padding: "10px 0" }}>{t.postForPickup}</button>
        </div>
      </div>
    </div>
  );
}

function TimeOffModal({ onConfirm, onClose }) {
  const lang = useContext(LangContext);
  const t = T[lang];
  const today = new Date(); today.setHours(0,0,0,0);
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [startDate, setStartDate] = useState(null); // Date object
  const [endDate,   setEndDate]   = useState(null);
  const [hovering,  setHovering]  = useState(null); // Date being hovered
  const [reason, setReason] = useState("");

  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAY_LABELS  = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  function buildGrid(year, month) {
    const first = new Date(year, month, 1).getDay();
    const days  = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
    return cells;
  }

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  }

  function handleDayClick(date) {
    if (date < today) return; // no past dates
    if (!startDate || (startDate && endDate)) {
      // Fresh selection
      setStartDate(date); setEndDate(null);
    } else {
      // Second click — set end (swap if before start)
      if (date < startDate) { setEndDate(startDate); setStartDate(date); }
      else setEndDate(date);
    }
  }

  function inRange(date) {
    if (!startDate) return false;
    const end = endDate || hovering;
    if (!end) return false;
    const lo = startDate < end ? startDate : end;
    const hi = startDate < end ? end : startDate;
    return date > lo && date < hi;
  }

  function isStart(date) { return startDate && date.toDateString() === startDate.toDateString(); }
  function isEnd(date)   { return endDate   && date.toDateString() === endDate.toDateString(); }
  function isPast(date)  { return date < today; }

  function fmtShort(d) {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  function fmtRangeLabel() {
    if (!startDate) return null;
    if (!endDate) return fmtShort(startDate);
    if (startDate.toDateString() === endDate.toDateString()) return fmtShort(startDate);
    return `${fmtShort(startDate)} – ${fmtShort(endDate)}`;
  }

  function countDays() {
    if (!startDate || !endDate) return 1;
    return Math.round((endDate - startDate) / 86400000) + 1;
  }

  const rangeLabel = fmtRangeLabel();
  const canSubmit  = !!startDate;

  function handleSubmit() {
    if (!canSubmit) return;
    const label = endDate && endDate.toDateString() !== startDate.toDateString()
      ? `${fmtShort(startDate)} – ${fmtShort(endDate)} (${countDays()} ${t.days})`
      : fmtShort(startDate);
    onConfirm(label, reason);
  }

  const grid = buildGrid(calYear, calMonth);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: 380 }}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, marginBottom: 4 }}>{t.timeOffTitle}</h3>
        <p style={{ color: "#555", fontSize: 12, marginBottom: 18 }}>
          {!startDate ? t.tapStart : !endDate ? t.tapEnd : `${rangeLabel} · ${countDays()} ${t.days}`}
        </p>

        {/* Calendar */}
        <div style={{ background: "#0d0d18", borderRadius: 12, padding: "14px 12px", marginBottom: 16 }}>
          {/* Month nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <button className="btn" onClick={prevMonth} style={{ background: "#1a1a28", color: "#888", padding: "4px 10px", fontSize: 14 }}>‹</button>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: "#e8e4dc" }}>
              {MONTH_NAMES[calMonth]} {calYear}
            </span>
            <button className="btn" onClick={nextMonth} style={{ background: "#1a1a28", color: "#888", padding: "4px 10px", fontSize: 14 }}>›</button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
            {DAY_LABELS.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 9, color: "#444", fontWeight: 700, padding: "3px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>{d}</div>
            ))}
          </div>

          {/* Date cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
            {grid.map((date, i) => {
              if (!date) return <div key={`blank-${i}`} />;
              const past    = isPast(date);
              const start   = isStart(date);
              const end     = isEnd(date);
              const inR     = inRange(date);
              const isToday = date.toDateString() === today.toDateString();
              const hoverEnd = !endDate && hovering && startDate && (
                date.toDateString() === hovering.toDateString() && date > startDate
              );

              let bg = "transparent";
              let color = past ? "#2a2a3e" : "#888";
              let border = "1px solid transparent";
              let borderRadius = "7px";

              if (start || end) {
                bg = "#f97316"; color = "#fff"; border = "1px solid #f97316";
              } else if (inR) {
                bg = "#f9731620"; color = "#f97316"; border = "1px solid transparent";
                borderRadius = "0";
              } else if (isToday) {
                border = "1px solid #f9731660"; color = "#f97316";
              }

              // Round caps on range edges
              if (inR) {
                const prevDate = new Date(date); prevDate.setDate(date.getDate() - 1);
                const nextDate = new Date(date); nextDate.setDate(date.getDate() + 1);
                const prevInRange = isStart(prevDate) || inRange(prevDate) || isEnd(prevDate);
                const nextInRange = isEnd(nextDate)   || inRange(nextDate) || isStart(nextDate);
                if (!prevInRange) borderRadius = "7px 0 0 7px";
                else if (!nextInRange) borderRadius = "0 7px 7px 0";
              }

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => !past && handleDayClick(date)}
                  onMouseEnter={() => !past && startDate && !endDate && setHovering(date)}
                  onMouseLeave={() => setHovering(null)}
                  style={{
                    background: bg, color, border, borderRadius,
                    padding: "6px 0", fontSize: 12, fontWeight: start || end ? 700 : 400,
                    cursor: past ? "default" : "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    textAlign: "center", lineHeight: 1, transition: "all 0.1s",
                  }}>
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected range display */}
        {rangeLabel && (
          <div style={{ background: "#f9731615", border: "1px solid #f9731630", borderRadius: 8, padding: "8px 14px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f97316" }}>{rangeLabel}</div>
              {endDate && countDays() > 1 && <div style={{ fontSize: 11, color: "#f9731680", marginTop: 1 }}>{countDays()} {t.days}</div>}
            </div>
            <button className="btn" onClick={() => { setStartDate(null); setEndDate(null); }}
              style={{ background: "none", color: "#555", fontSize: 11, padding: "2px 6px" }}>{t.clear}</button>
          </div>
        )}

        {/* Reason */}
        <label style={{ display: "block", fontSize: 11, color: "#555", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.reason}</label>
        <textarea className="input" value={reason} onChange={e => setReason(e.target.value)}
          placeholder={t.reasonPlaceholder} rows={2} style={{ resize: "none", marginBottom: 18 }} />

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn" onClick={onClose} style={{ flex: 1, background: "#1a1a28", color: "#555", padding: "10px 0" }}>{t.cancel}</button>
          <button className="btn" onClick={handleSubmit} disabled={!canSubmit}
            style={{ flex: 1, background: canSubmit ? "#f97316" : "#2a2a3e", color: canSubmit ? "#fff" : "#444", padding: "10px 0", cursor: canSubmit ? "pointer" : "default" }}>
            {t.submitRequest}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Availability Day Card (must be outside AvailabilityModal to preserve input focus) ──

function AvailDayCard({ date, avail, setField, setAllDay, removeDay, fmtKey, fmtDisplay }) {
  const lang = useContext(LangContext);
  const t = T[lang];
  const key = fmtKey(date);
  const DAY_NAMES = lang === "es"
    ? ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dayName = DAY_NAMES[date.getDay()];
  const d = avail[key] || { available: true, allDay: false, start: "", end: "", note: "" };
  const isPrimary = [4, 5, 6].includes(date.getDay());

  return (
    <div style={{ marginBottom: 8, background: "#0d0d18", borderRadius: 10, border: `1px solid ${isPrimary ? "#f9731628" : "#1a1a26"}` }}>
      <div style={{ display: "flex", alignItems: "center", padding: "10px 13px", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#e8e4dc" }}>{dayName}</span>
          <span style={{ fontSize: 11, color: isPrimary ? "#f97316" : "#666", marginLeft: 7 }}>{fmtDisplay(date)}</span>
          {isPrimary && <span style={{ fontSize: 9, color: "#f9731650", marginLeft: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.showNight}</span>}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <button className="btn" onClick={() => setField(key, "available", true)}
            style={{ padding: "4px 10px", fontSize: 11, background: d.available ? "#22c55e20" : "#171724", color: d.available ? "#22c55e" : "#555", border: `1px solid ${d.available ? "#22c55e45" : "#222235"}` }}>{t.yes}</button>
          <button className="btn" onClick={() => { setField(key, "available", false); setAllDay(key, false); }}
            style={{ padding: "4px 10px", fontSize: 11, background: !d.available ? "#ef444418" : "#171724", color: !d.available ? "#ef4444" : "#555", border: `1px solid ${!d.available ? "#ef444440" : "#222235"}` }}>{t.no}</button>
        </div>
        <button className="btn" onClick={() => removeDay(key)} title="Skip this day"
          style={{ width: 22, height: 22, borderRadius: "50%", background: "#1a1a28", color: "#444", border: "1px solid #2a2a3e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, padding: 0, flexShrink: 0 }}>✕</button>
      </div>

      {d.available && (
        <div style={{ padding: "0 13px 0", display: "flex", gap: 7, alignItems: "flex-end" }}>
          <button className="btn" onClick={() => setAllDay(key, !d.allDay)}
            style={{ padding: "6px 11px", fontSize: 11, whiteSpace: "nowrap", background: d.allDay ? "#3b82f620" : "#171724", color: d.allDay ? "#3b82f6" : "#555", border: `1px solid ${d.allDay ? "#3b82f650" : "#222235"}` }}>
            {t.allDay}
          </button>
          {!d.allDay && (
            <>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 9, color: "#444", display: "block", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>{t.from}</label>
                <input className="input" value={d.start} onChange={e => setField(key, "start", e.target.value)} placeholder="7:00 PM" style={{ fontSize: 12, padding: "6px 9px" }} />
              </div>
              <span style={{ color: "#333", paddingBottom: 7, fontSize: 12 }}>–</span>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 9, color: "#444", display: "block", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>{t.until}</label>
                <input className="input" value={d.end} onChange={e => setField(key, "end", e.target.value)} placeholder="3:00 AM" style={{ fontSize: 12, padding: "6px 9px" }} />
              </div>
            </>
          )}
        </div>
      )}

      <div style={{ padding: "8px 13px 11px" }}>
        <label style={{ fontSize: 9, color: "#444", display: "block", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>{t.notes}</label>
        <textarea className="input" value={d.note || ""} onChange={e => setField(key, "note", e.target.value)}
          placeholder={t.notesPlaceholder}
          rows={2} style={{ fontSize: 12, padding: "6px 9px", resize: "none" }} />
      </div>
    </div>
  );
}

function AvailabilityModal({ user, existing, onConfirm, onClose, showDays }) {
  const lang = useContext(LangContext);
  const t = T[lang];
  const DAY_NAMES = lang === "es"
    ? ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const today = new Date(); today.setHours(0,0,0,0);
  const upcomingShowDates = [...(showDays || [])]
    .map(k => { const d = new Date(k + "T12:00:00"); return d; })
    .filter(d => d >= today)
    .sort((a, b) => a - b)
    .slice(0, 28);

  function getWeekKey(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0) ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  const weekGroups = {};
  upcomingShowDates.forEach(d => {
    const wk = getWeekKey(d);
    if (!weekGroups[wk]) weekGroups[wk] = [];
    weekGroups[wk].push(d);
  });
  const weekKeys = Object.keys(weekGroups).sort();

  function weekLabel(wk) {
    const dates = weekGroups[wk];
    if (!dates?.length) return "";
    const first = dates[0]; const last = dates[dates.length - 1];
    if (first.toDateString() === last.toDateString())
      return first.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
    return `${first.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${last.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`.toUpperCase();
  }

  function fmtKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }
  function fmtDisplay(date) {
    return date.toLocaleDateString("en-US", { month: "numeric", day: "numeric" });
  }

  // Which week keys are currently selected/expanded
  const [selectedWeeks, setSelectedWeeks] = useState(() => new Set([weekKeys[0]].filter(Boolean)));

  const [avail, setAvail] = useState(() => {
    const init = {};
    upcomingShowDates.forEach(d => {
      init[fmtKey(d)] = { available: true, allDay: false, start: "", end: "", note: "" };
    });
    return init;
  });
  const [included, setIncluded] = useState(() => {
    const init = {};
    upcomingShowDates.forEach(d => { init[fmtKey(d)] = true; });
    return init;
  });

  function toggleWeek(wk) {
    setSelectedWeeks(prev => {
      const next = new Set(prev);
      next.has(wk) ? next.delete(wk) : next.add(wk);
      return next;
    });
  }

  function setField(key, field, val) {
    setAvail(a => ({ ...a, [key]: { ...a[key], [field]: val } }));
  }
  function setAllDay(key, on) {
    setAvail(a => ({ ...a, [key]: { ...a[key], allDay: on, start: on ? "All Day" : "", end: on ? "All Day" : "" } }));
  }
  function removeDay(key) { setIncluded(prev => ({ ...prev, [key]: false })); }
  function addDay(key)    { setIncluded(prev => ({ ...prev, [key]: true  })); }

  function handleSubmit() {
    const filtered = {};
    // Only submit days in selected weeks
    upcomingShowDates.forEach(d => {
      const k = fmtKey(d);
      if (included[k] && selectedWeeks.has(getWeekKey(d))) {
        const dayName = DAY_NAMES[d.getDay()];
        filtered[dayName + " " + fmtDisplay(d)] = { ...avail[k], date: fmtDisplay(d), dateKey: k };
      }
    });
    const usedWeeks = [...selectedWeeks].map(wk => weekLabel(wk)).filter(Boolean).join(", ");
    onConfirm({ days: filtered, weekendLabel: usedWeeks });
  }

  const anySelected   = selectedWeeks.size > 0;
  const anyIncluded   = anySelected && upcomingShowDates.some(d =>
    included[fmtKey(d)] && selectedWeeks.has(getWeekKey(d))
  );

  if (upcomingShowDates.length === 0) {
    return (
      <div className="overlay" onClick={onClose}>
        <div className="modal fade-in" onClick={e => e.stopPropagation()}>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, marginBottom: 12 }}>{t.availabilityTitle}</h3>
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📅</div>
            <p style={{ color: "#888", fontSize: 14 }}>{t.noShowDays}</p>
            <p style={{ color: "#555", fontSize: 12, marginTop: 6 }}>{t.noShowDaysSub}</p>
          </div>
          <button className="btn" onClick={onClose} style={{ width: "100%", background: "#1a1a28", color: "#666", padding: "10px 0" }}>{t.cancel}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal fade-in" onClick={e => e.stopPropagation()}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, marginBottom: 4 }}>{t.availabilityTitle}</h3>
        <p style={{ color: "#555", fontSize: 12, marginBottom: 16 }}>{t.selectWeekends}</p>

        {/* Week bubbles — styled like the screenshot */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
          {weekKeys.map(wk => {
            const isSelected = selectedWeeks.has(wk);
            return (
              <button key={wk} className="btn" onClick={() => toggleWeek(wk)}
                style={{
                  padding: "9px 18px",
                  borderRadius: 30,
                  border: `1.5px solid ${isSelected ? "#f97316" : "#2a2a3e"}`,
                  background: isSelected ? "transparent" : "transparent",
                  color: isSelected ? "#f97316" : "#555",
                  fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: isSelected ? "0 0 0 1px #f9731640" : "none",
                  transition: "all 0.15s",
                }}>
                {weekLabel(wk)}
              </button>
            );
          })}
        </div>

        {/* Day cards for each selected week */}
        {weekKeys.filter(wk => selectedWeeks.has(wk)).map(wk => {
          const wkDates = weekGroups[wk];
          const activeInWeek  = wkDates.filter(d => included[fmtKey(d)]);
          const removedInWeek = wkDates.filter(d => !included[fmtKey(d)]);

          return (
            <div key={wk} style={{ marginBottom: 20 }}>
              {/* Week label above day cards */}
              {selectedWeeks.size > 1 && (
                <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8, opacity: 0.7 }}>
                  {weekLabel(wk)}
                </div>
              )}
              {activeInWeek.map(date => (
                <AvailDayCard key={fmtKey(date)} date={date} avail={avail} setField={setField} setAllDay={setAllDay} removeDay={removeDay} fmtKey={fmtKey} fmtDisplay={fmtDisplay} />
              ))}
              {removedInWeek.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: "#444" }}>{t.skipped}</span>
                  {removedInWeek.map(date => (
                    <button key={fmtKey(date)} className="btn" onClick={() => addDay(fmtKey(date))}
                      style={{ fontSize: 10, color: "#555", background: "#141420", border: "1px solid #222", borderRadius: 20, padding: "2px 10px" }}>
                      + {DAY_NAMES[date.getDay()].slice(0,3)} {fmtDisplay(date)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {selectedWeeks.size === 0 && (
          <p style={{ color: "#444", fontSize: 12, textAlign: "center", padding: "16px 0" }}>{t.tapWeekend}</p>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button className="btn" onClick={onClose} style={{ flex: 1, background: "#1a1a28", color: "#555", padding: "10px 0" }}>{t.cancel}</button>
          <button className="btn" onClick={handleSubmit} disabled={!anyIncluded}
            style={{ flex: 1, background: anyIncluded ? "#f97316" : "#2a2a3e", color: anyIncluded ? "#fff" : "#444", padding: "10px 0", cursor: anyIncluded ? "pointer" : "default" }}>
            {t.submit}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddShiftModal({ users, form, setForm, onConfirm, onClose, depts }) {
  const ctxDepts = useContext(DeptsContext);
  const allDepts = depts || ctxDepts;
  const valid = form.userId && form.date && form.start && form.end && form.role;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal fade-in" onClick={e => e.stopPropagation()}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, marginBottom: 20 }}>Add Shift</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginBottom: 16 }}>
          {[
            { label: "Staff Member", el: <select className="input" value={form.userId} onChange={e=>setForm(f=>({...f,userId:e.target.value}))}><option value="">Select...</option>{users.filter(u=>u.role==="employee").map(u=><option key={u.id} value={u.id}>{u.name}</option>)}</select> },
            { label: "Role",         el: <select className="input" value={form.role}   onChange={e=>setForm(f=>({...f,role:e.target.value}))}><option value="">Select...</option>{allDepts.map(d=><option key={d.name} value={d.name}>{d.name}</option>)}</select> },
            { label: "Date (M/D)",   el: <input  className="input" value={form.date}   onChange={e=>setForm(f=>({...f,date:e.target.value}))} placeholder="e.g. 3/15" /> },
            { label: "Note",         el: <input  className="input" value={form.note}   onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="e.g. Main Bar" /> },
            { label: "Start Time",   el: <input  className="input" value={form.start}  onChange={e=>setForm(f=>({...f,start:e.target.value}))} placeholder="e.g. 8:00 PM" /> },
            { label: "End Time",     el: <input  className="input" value={form.end}    onChange={e=>setForm(f=>({...f,end:e.target.value}))} placeholder="e.g. 2:00 AM" /> },
          ].map(({ label, el }) => (
            <div key={label}>
              <label style={{ display: "block", fontSize: 10, color: "#555", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
              {el}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn" onClick={onClose}   style={{ flex: 1, background: "#1a1a28", color: "#555", padding: "10px 0" }}>Cancel</button>
          <button className="btn" onClick={onConfirm} style={{ flex: 1, background: valid ? "#f97316" : "#2a2a3e", color: valid ? "#fff" : "#444", padding: "10px 0" }}>Add Shift</button>
        </div>
      </div>
    </div>
  );
}
