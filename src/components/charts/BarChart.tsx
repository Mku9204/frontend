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

const COLORS = [
  '#7C3AED', '#4F46E5', '#3B82F6', '#06B6D4', '#10B981',
  '#F59E0B', '#EC4899', '#8B5CF6', '#14B8A6', '#F97316',
];

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
  const color = payload[0].fill;

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
        {label}
      </div>
      <div style={{ color: color, fontWeight: 700, fontSize: 15 }}>
        {formatter ? formatter(val) : val.toLocaleString()}
      </div>
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
  barSize = 20,
}: BarChartProps) => {
  const isVertical = layout === 'vertical';

  if (!data.length) {
    return (
      <div style={{ textAlign: 'center', color: '#475569', padding: '40px 20px', fontSize: 14 }}>
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart
        data={data}
        layout={layout}
        margin={{ top: 8, right: 16, left: isVertical ? 140 : 0, bottom: isVertical ? 4 : 50 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255, 255, 255, 0.04)"
          vertical={!isVertical}
          horizontal={isVertical}
        />
        {isVertical ? (
          <>
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: '#475569' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey={nameKey}
              width={130}
              tick={{ fontSize: 11, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
            />
          </>
        ) : (
          <>
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
          </>
        )}
        <Tooltip content={<CustomTooltip formatter={formatter} />} cursor={{ fill: 'rgba(124, 58, 237, 0.06)' }} />
        <Bar dataKey={valueKey} barSize={barSize} radius={isVertical ? [0, 6, 6, 0] : [6, 6, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} fillOpacity={0.9} />
          ))}
        </Bar>
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
