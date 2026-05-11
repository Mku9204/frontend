import { useRef, useState } from 'react';
import { Box, Button, Typography, LinearProgress, Alert, Paper, Chip } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { productsApi } from '../../api/productsApi';

interface FileImportProps {
  onUploadStart: () => void;
  onUploadSuccess: () => void;
  onUploadError: (message: string) => void;
  loading: boolean;
  error: string | null;
}

const ACCEPT = '.csv,.xlsx,.xls';

const FileImport = ({ onUploadStart, onUploadSuccess, onUploadError, loading, error }: FileImportProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFile = async (file: File | null) => {
    if (!file) return;
    setFileName(file.name);
    onUploadStart();

    const formData = new FormData();
    formData.append('file', file);

    try {
      await productsApi.importFile(formData);
      onUploadSuccess();
    } catch (err: any) {
      onUploadError(err.message || 'Import failed');
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, borderStyle: 'dashed', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textAlign: 'center' }}>
        <UploadFileIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Import CSV / Excel</Typography>
          <Typography variant="body2" color="text.secondary">
            Upload a .csv, .xlsx, or .xls file to import product data
          </Typography>
        </Box>

        {fileName && <Chip label={fileName} onDelete={() => setFileName('')} color="primary" variant="outlined" />}

        <Button
          variant="contained"
          color="primary"
          startIcon={<UploadFileIcon />}
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          {loading ? 'Importing…' : 'Choose File'}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          hidden
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
        />

        {loading && <LinearProgress sx={{ width: '100%' }} />}

        {!loading && !error && (
          <Alert severity="info" sx={{ width: '100%' }}>
            Upload a file to see updated product and analytics data.
          </Alert>
        )}

        {error && !loading && (
          <Alert severity="error" variant="standard" sx={{ width: '100%' }}>{error}</Alert>
        )}
      </Box>
    </Paper>
  );
};

export default FileImport;
