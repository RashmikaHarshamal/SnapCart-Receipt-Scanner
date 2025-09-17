import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle, XCircle, FileText } from 'lucide-react';
import { receiptApi, Receipt } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';

const UploadReceipt: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<Receipt | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadResult(null);

    try {
      const result = await receiptApi.uploadReceipt(file);
      setUploadResult(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to upload receipt');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: false,
  });

  return (
    <div>
      <Header />
        <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Receipt</h1>
        <p className="text-gray-600">
          Drop your receipt image here or click to select a file
        </p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div
          {...getRootProps()}
          className={`p-8 border-2 border-dashed border-gray-300 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive ? 'border-blue-400 bg-blue-50' : 'hover:border-blue-400 hover:bg-blue-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-gray-100 rounded-full">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {isDragActive ? 'Drop your receipt here' : 'Upload Receipt Image'}
              </p>
              <p className="text-gray-500 mt-2">
                Supports JPG, PNG, GIF (Max size: 10MB)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {uploading && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
          <LoadingSpinner />
          <p className="text-gray-600 mt-4">Processing receipt...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <XCircle className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">Upload Failed</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success State */}
      {uploadResult && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">Receipt Processed Successfully!</h3>
              <p className="text-green-700">Extracted {uploadResult.items.length} items</p>
            </div>
          </div>

          {/* Receipt Details */}
          <div className="bg-white rounded-lg border border-green-200 p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{uploadResult.store}</h4>
                <p className="text-gray-600">{new Date(uploadResult.createdDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  ${uploadResult.totalAmount.toFixed(2)}
                </p>
                <p className="text-gray-600">Total Amount</p>
              </div>
            </div>

            {/* Items List */}
            <div>
              <h5 className="text-md font-semibold text-gray-800 mb-3">Extracted Items:</h5>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {uploadResult.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="font-semibold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracted Text Preview */}
            <details className="mt-4">
              <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                <span className="inline-flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>View Extracted Text</span>
                </span>
              </summary>
              <div className="mt-3 p-4 bg-gray-100 rounded-lg">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {uploadResult.extractedText}
                </pre>
              </div>
            </details>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.location.href = '/receipts'}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              View All Receipts
            </button>
            <button
              onClick={() => {
                setUploadResult(null);
                setError(null);
              }}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Upload Another
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default UploadReceipt;