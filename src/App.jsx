import { useState } from "react";

const speeds = [
  4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
  10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 15, 16, 17, 18, 19, 20
];

function speedToPace(speed) {
  if (!speed || speed <= 0) return null;
  const totalSec = 3600 / speed;
  const min = Math.floor(totalSec / 60);
  const sec = Math.round(totalSec % 60);
  return { min, sec, total: totalSec };
}

function paceToSpeed(min, sec) {
  const totalSec = min * 60 + sec;
  if (!totalSec) return null;
  return (3600 / totalSec).toFixed(2);
}

function formatPace(min, sec) {
  return min + "'" + String(sec).padStart(2, "0") + '"';
}

function getLabel(s) {
  if (s < 6)  return { text: "워킹",   color: "text-green-400" };
  if (s < 8)  return { text: "조깅",   color: "text-teal-400" };
  if (s < 10) return { text: "러닝",   color: "text-blue-400" };
  if (s < 13) return { text: "템포런", color: "text-yellow-400" };
  return       { text: "스피드",       color: "text-red-400" };
}

function CalorieEstimate({ speed }) {
  const met = speed < 8 ? 6 + (speed - 5) * 0.5 : 8 + (speed - 8) * 0.6;
  const cal60 = Math.round(met * 64);
  return (
    <span className="text-xs text-gray-400">
      약 {cal60}kcal/시간 <span className="text-gray-500">(64kg 기준)</span>
    </span>
  );
}

export default function App() {
  const [mode, setMode] = useState("speed");
  const [speedVal, setSpeedVal] = useState("");
  const [paceMin, setPaceMin] = useState("");
  const [paceSec, setPaceSec] = useState("");

  const pace = speedToPace(parseFloat(speedVal));
  const convertedSpeed = paceToSpeed(parseInt(paceMin) || 0, parseInt(paceSec) || 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🏃</div>
          <h1 className="text-2xl font-bold tracking-tight">속도/페이스 변환기</h1>
          <p className="text-gray-400 text-sm mt-1">속도 ↔ 페이스 즉시 변환</p>
        </div>

        <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
          <button
            onClick={() => setMode("speed")}
            className={"flex-1 py-2 rounded-lg text-sm font-semibold transition-all " +
              (mode === "speed" ? "bg-blue-500 text-white shadow" : "text-gray-400")}
          >
            속도 → 페이스
          </button>
          <button
            onClick={() => setMode("pace")}
            className={"flex-1 py-2 rounded-lg text-sm font-semibold transition-all " +
              (mode === "pace" ? "bg-orange-500 text-white shadow" : "text-gray-400")}
          >
            페이스 → 속도
          </button>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 mb-6 shadow-xl border border-gray-800">
          {mode === "speed" ? (
            <>
              <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">속도 입력</label>
              <div className="flex items-center bg-gray-800 rounded-xl px-4 py-3 mb-4">
                <input
                  type="number" min="1" max="30" step="0.1"
                  value={speedVal}
                  onChange={e => setSpeedVal(e.target.value)}
                  placeholder="예: 10.5"
                  className="bg-transparent text-2xl font-bold w-full outline-none placeholder-gray-600"
                />
                <span className="text-gray-400 font-medium ml-2">km/h</span>
              </div>
              {pace ? (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-blue-300 mb-1">페이스</p>
                  <p className="text-4xl font-bold text-blue-400">
                    {formatPace(pace.min, pace.sec)}
                    <span className="text-lg font-normal text-blue-300 ml-1">/ km</span>
                  </p>
                  <div className="mt-2"><CalorieEstimate speed={parseFloat(speedVal)} /></div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-xl p-4 text-center text-gray-600">속도를 입력하세요</div>
              )}
            </>
          ) : (
            <>
              <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">페이스 입력</label>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center bg-gray-800 rounded-xl px-4 py-3 flex-1">
                  <input
                    type="number" min="0" max="59"
                    value={paceMin}
                    onChange={e => setPaceMin(e.target.value)}
                    placeholder="0"
                    className="bg-transparent text-2xl font-bold w-full outline-none placeholder-gray-600"
                  />
                  <span className="text-gray-400 ml-1">분</span>
                </div>
                <div className="flex items-center bg-gray-800 rounded-xl px-4 py-3 flex-1">
                  <input
                    type="number" min="0" max="59"
                    value={paceSec}
                    onChange={e => setPaceSec(e.target.value)}
                    placeholder="0"
                    className="bg-transparent text-2xl font-bold w-full outline-none placeholder-gray-600"
                  />
                  <span className="text-gray-400 ml-1">초</span>
                </div>
              </div>
              {convertedSpeed && parseFloat(convertedSpeed) > 0 ? (
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-orange-300 mb-1">속도</p>
                  <p className="text-4xl font-bold text-orange-400">
                    {convertedSpeed}
                    <span className="text-lg font-normal text-orange-300 ml-1">km/h</span>
                  </p>
                  <div className="mt-2"><CalorieEstimate speed={parseFloat(convertedSpeed)} /></div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-xl p-4 text-center text-gray-600">페이스를 입력하세요</div>
              )}
            </>
          )}
        </div>

        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">📊 속도 / 페이스 참고표</h2>
          <div className="overflow-y-auto max-h-72 rounded-lg">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-900">
                <tr className="text-gray-500 text-xs uppercase">
                  <th className="py-2 text-left pl-2">속도 (km/h)</th>
                  <th className="py-2 text-center">페이스 (분/km)</th>
                  <th className="py-2 text-right pr-2">강도</th>
                </tr>
              </thead>
              <tbody>
                {speeds.map(s => {
                  const p = speedToPace(s);
                  const label = getLabel(s);
                  const highlighted = mode === "speed" && Math.abs(parseFloat(speedVal) - s) < 0.01;
                  return (
                    <tr
                      key={s}
                      onClick={() => {
                        if (mode === "speed") {
                          setSpeedVal(String(s));
                        } else {
                          const p2 = speedToPace(s);
                          setPaceMin(String(p2.min));
                          setPaceSec(String(p2.sec));
                        }
                      }}
                      className={"cursor-pointer border-t border-gray-800 transition-colors hover:bg-gray-800 " +
                        (highlighted ? "bg-blue-500/20" : "")}
                    >
                      <td className="py-2 pl-2 font-bold">{s}</td>
                      <td className="py-2 text-center text-gray-300">{p ? formatPace(p.min, p.sec) : "-"}</td>
                      <td className={"py-2 pr-2 text-right text-xs font-medium " + label.color}>{label.text}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center">표의 행을 클릭하면 자동 입력됩니다</p>
        </div>
      </div>
    </div>
  );
}