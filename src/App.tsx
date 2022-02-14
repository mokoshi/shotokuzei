import {
  CartesianGrid,
  Dot,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tiers = [1950000, 3300000, 6950000, 9000000, 18000000, 40000000];

function shotokuzei(v: number) {
  if (v < tiers[0]) {
    return v * 0.05;
  } else if (v < tiers[1]) {
    return v * 0.1 - 97500;
  } else if (v < tiers[2]) {
    return v * 0.2 - 427500;
  } else if (v < tiers[3]) {
    return v * 0.23 - 636000;
  } else if (v < tiers[4]) {
    return v * 0.33 - 1536000;
  } else if (v < tiers[5]) {
    return v * 0.4 - 2796000;
  } else {
    return v * 0.45 - 4796000;
  }
}

const data = Array(200)
  .fill(0)
  .map((_, i) => ({
    shotoku: i * 50000,
    zei: shotokuzei(i * 50000),
  }));

function formatter(v: number) {
  return `${(v / 10000).toString()}万`;
}

function App() {
  return (
    <div
      className="App"
      style={{
        maxWidth: 600,
        margin: "auto",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ResponsiveContainer width="100%" height="50%">
        <LineChart data={data} margin={{ left: 30, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            label={{
              value: "課税される所得金額",
              position: "insideBottom",
              offset: -20,
            }}
            dataKey="shotoku"
            tickFormatter={formatter}
          />
          <YAxis
            label={{
              value: "所得税",
              position: "insideLeft",
              angle: -90,
              offset: -10,
            }}
            tickFormatter={formatter}
          />
          <Tooltip
            formatter={(v: any) => [formatter(v), "所得税"]}
            labelFormatter={formatter}
          />
          <Line dataKey="zei" stroke="#178fff" dot={<CustomizedDot />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomizedDot = (props: any) => {
  return tiers.find((t) => t === props.payload.shotoku) ? (
    <Dot {...props} />
  ) : null;
};

export default App;
