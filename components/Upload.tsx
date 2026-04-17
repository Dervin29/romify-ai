import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { REDIRECT_DELAY_MS, PROGRESS_INTERVAL_MS, PROGRESS_STEP } from "../lib/contasts";

interface AuthContextType {
  isSignedIn: boolean;
}

interface UploadProps {
  onComplete?: (base64Data: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const { isSignedIn } = useOutletContext<AuthContextType>();

  const processFile = (selectedFile: File) => {
    if (!isSignedIn) return;

    setFile(selectedFile);
    setProgress(0);

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += PROGRESS_STEP;
        
        if (currentProgress >= 100) {
          setProgress(100);
          clearInterval(interval);
          
          setTimeout(() => {
            onComplete?.(base64String);
          }, REDIRECT_DELAY_MS);
        } else {
          setProgress(currentProgress);
        }
      }, PROGRESS_INTERVAL_MS);
    };
    
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSignedIn) return;
    
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isSignedIn) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!isSignedIn) return;
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && (droppedFile.type === 'image/jpeg' || droppedFile.type === 'image/png' || droppedFile.name.match(/\.(jpg|jpeg|png)$/i))) {
      processFile(droppedFile);
    }
  };

  return (
    <div className="upload">
      {!file ? (
        <div 
          className={`dropzone ${isDragging ? "is-dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="drop-input"
            accept=".jpg,.jpeg,.png"
            disabled={!isSignedIn}
            onChange={handleFileChange}
          />

          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>
            <p>
              {isSignedIn
                ? "Drag & drop your floor plan here, or click to select a file"
                : "Please sign in to upload your floor plan"}
            </p>
            <p className="help">Max file size is 50MB</p>
          </div>
        </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress === 100 ? (
                <CheckCircle2 className="check" />
              ) : (
                <ImageIcon className="image" />
              )}
            </div>
            <h3>{file.name}</h3>
            <div className="progress">
              <div className="bar" style={{ width: `${progress}%` }} />
              <p className="status-text">
                {progress < 100
                  ? "Analyzing floor plan..."
                  : "Redirecting to editor..."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;