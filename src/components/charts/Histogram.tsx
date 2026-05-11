import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface HistogramProps {
  data?: Array<Record<string, any>>;
  nameKey?: string;
  valueKey?: string;
  height?: number;
}

// Gradient from purple to cyan matching our palette
const GRADIENT_COLORS = [
  '#5B21B6', '#6D28D9', '#7C3AED', '#8B5CF6', '#7C3AED',
  '#4F46E5', '#4338CA', '#3B82F6', '#2563EB', '#1D4ED8',
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'rgba(7, 12, 25, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        padding: '10px 14px',
        fontSize: 13,
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ color: '#94A3B8', fontSize: 11, marginBottom: 4, fontWeight: 500 }}>
        Discount: {label}
      </div>
      <div style={{ color: '#A78BFA', fontWeight: 700, fontSize: 15 }}>
        {payload[0].value ? payload[0].value.toLocaleString() : '0'} products
      </div>
    </div>
  );
};

const Histogram = ({ data = [], nameKey = 'bucket', valueKey = 'count', height = 280 }: HistogramProps) => {
  if (!data.length) {
    return (
      <div style={{ textAlign: 'center', color: '#475569', padding: '40px 20px', fontSize: 14 }}>
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.04)" vertical={false} />
        <XAxis
          dataKey={nameKey}
          tick={{ fontSize: 10, fill: '#475569' }}
          angle={-35}
          textAnchor="end"
          interval={0}
          axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#475569' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124, 58, 237, 0.06)' }} />
        <Bar dataKey={valueKey} barSize={22} radius={[6, 6, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={index} fill={GRADIENT_COLORS[index % GRADIENT_COLORS.length]} fillOpacity={0.9} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Histogram;
