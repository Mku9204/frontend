import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#1976d2', '#388e3c', '#f57c00', '#7b1fa2', '#c62828', '#00838f', '#6d4c41', '#455a64', '#e64a19', '#5c6bc0'];

interface BarChartProps {
  data?: Array<Record<string, any>>;
  nameKey?: string;
  valueKey?: string;
  layout?: 'horizontal' | 'vertical';
  formatter?: (value: number) => string | undefined;
  height?: number;
  barSize?: number;
}

const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;

  return (
    <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: '8px 14px', fontSize: 13 }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ color: payload[0].fill }}>{formatter ? formatter(val) : val.toLocaleString()}</div>
    </div>
  );
};

const BarChart = ({
  data = [],
  nameKey = 'name',
  valueKey = 'value',
  layout = 'horizontal',
  formatter,
  height = 300,
  barSize = 28,
}: BarChartProps) => {
  const isVertical = layout === 'vertical';

  if (!data.length) {
    return <div style={{ textAlign: 'center', color: '#9e9e9e', padding: 40 }}>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart
        data={data}
        layout={layout}
        margin={{ top: 10, right: 20, left: isVertical ? 140 : 5, bottom: isVertical ? 5 : 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        {isVertical ? (
          <>
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey={nameKey} width={130} tick={{ fontSize: 11 }} />
          </>
        ) : (
          <>
            <XAxis dataKey={nameKey} tick={{ fontSize: 11 }} angle={-35} textAnchor="end" interval={0} />
            <YAxis tick={{ fontSize: 12 }} />
          </>
        )}
        <Tooltip content={<CustomTooltip formatter={formatter} />} />
        <Bar dataKey={valueKey} barSize={barSize} radius={[4, 4, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
