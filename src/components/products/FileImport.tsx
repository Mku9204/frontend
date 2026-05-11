import { useRef, useState } from 'react';
import { Box, Button, Typography, LinearProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
  const [dragging, setDragging] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFile = async (file: File | null) => {
    if (!file) return;
    setFileName(file.name);
    setSuccess(false);
    onUploadStart();

    const formData = new FormData();
    formData.append('file', file);

    try {
      await productsApi.importFile(formData);
      setSuccess(true);
      onUploadSuccess();
    } catch (err: any) {
      onUploadError(err.message || 'Import failed');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    handleFile(file);
  };

  return (
    <Box
      id="file-import-panel"
      sx={{
        borderRadius: '18px',
        background: 'rgba(13, 23, 40, 0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #10B981, transparent)',
          opacity: 0.6,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ px: 3, pt: 2.5, pb: 2 }}>
        <Typography
          sx={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 700,
            fontSize: '0.9375rem',
            color: '#F1F5F9',
            mb: 0.25,
          }}
        >
          Import Data
        </Typography>
        <Typography sx={{ fontSize: '0.78125rem', color: '#475569', fontWeight: 400 }}>
          Upload CSV or Excel file
        </Typography>
      </Box>

      <Box sx={{ px: 2.5, pb: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Drop Zone */}
        <Box
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !loading && inputRef.current?.click()}
          sx={{
            border: `2px dashed`,
            borderColor: dragging ? '#7C3AED' : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '14px',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            cursor: loading ? 'not-allowed' : 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s ease',
            background: dragging ? 'rgba(124, 58, 237, 0.06)' : 'rgba(7, 12, 25, 0.4)',
            '&:hover': !loading
              ? {
                  borderColor: 'rgba(124, 58, 237, 0.4)',
                  background: 'rgba(124, 58, 237, 0.04)',
                }
              : {},
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '14px',
              background: 'rgba(124, 58, 237, 0.1)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 26, color: '#8B5CF6' }} />
          </Box>

          <Box>
            <Typography
              sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#CBD5E1', mb: 0.25 }}
            >
              {loading ? 'Uploading…' : 'Drop file here'}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#475569' }}>
              {loading ? 'Please wait' : 'or click to browse'}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: '0.7rem',
              color: '#334155',
              px: 2,
              py: 0.5,
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            CSV, XLSX, XLS
          </Typography>
        </Box>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          hidden
          id="file-import-input"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />

        {/* Selected file */}
        {fileName && !loading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <InsertDriveFileIcon sx={{ fontSize: 18, color: '#34D399', flexShrink: 0 }} />
            <Typography
              sx={{
                fontSize: '0.78125rem',
                color: '#6EE7B7',
                fontWeight: 500,
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {fileName}
            </Typography>
            {success && <CheckCircleIcon sx={{ fontSize: 16, color: '#34D399', flexShrink: 0 }} />}
          </Box>
        )}

        {/* Progress */}
        {loading && <LinearProgress sx={{ borderRadius: '4px' }} />}

        {/* Upload Button */}
        <Button
          id="file-import-btn"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          fullWidth
          sx={{ py: 1.25 }}
        >
          {loading ? 'Importing…' : 'Choose File'}
        </Button>

        {/* Error */}
        {error && !loading && (
          <Alert severity="error" variant="standard" sx={{ mt: 0.5 }}>
            {error}
          </Alert>
        )}

        {/* Info */}
        {!loading && !error && !success && (
          <Alert severity="info" variant="standard" sx={{ mt: 0.5 }}>
            Data will be merged on import.
          </Alert>
        )}

        {success && !loading && (
          <Alert severity="success" variant="standard" sx={{ mt: 0.5 }}>
            Import completed successfully!
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default FileImport;
