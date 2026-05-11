import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface HistogramProps {
  data?: Array<Record<string, any>>;
  nameKey?: string;
  valueKey?: string;
  height?: number;
}

const GRADIENT = ['#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#01579b'];

const Histogram = ({ data = [], nameKey = 'bucket', valueKey = 'count', height = 280 }: HistogramProps) => {
  if (!data.length) {
    return <div style={{ textAlign: 'center', color: '#9e9e9e', padding: 40 }}>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 5, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey={nameKey} tick={{ fontSize: 11 }} angle={-30} textAnchor="end" interval={0} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => [value ? value.toLocaleString() : '0', 'Products']} labelFormatter={(label) => `Discount: ${label}`} />
        <Bar dataKey={valueKey} barSize={30} radius={[4, 4, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={index} fill={GRADIENT[index % GRADIENT.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Histogram;
