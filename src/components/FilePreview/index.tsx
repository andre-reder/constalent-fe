/* eslint-disable no-nested-ternary */
import { ChangeEvent, Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
// import { toast } from 'react-toastify';
import NoData from '../NoData';
import { SecondaryButton } from '../SecondaryButton';
import { Container } from './styles';

interface FilePreviewInterface {
  selectedFile?: string | File | undefined;
  setSelectedFile: Dispatch<SetStateAction<string | File | undefined>>;
  fileType: string;
  noDataLabel: string;
  hideButton?: boolean
}

export default function FilePreview({
  selectedFile, setSelectedFile, fileType, noDataLabel, hideButton,
}: FilePreviewInterface) {
  const [preview, setPreview] = useState<string>();

  const hiddenFileInput = useRef<HTMLInputElement>();
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return undefined;
    }

    if (typeof selectedFile === 'string') {
      setPreview(selectedFile);
    }

    const objectUrl = typeof selectedFile === 'object' && URL.createObjectURL(selectedFile);
    const img = new Image();
    if (fileType === 'image' && typeof selectedFile === 'object' && objectUrl) {
      img.src = objectUrl;
      img.onload = () => {
        // const minWidthAccepted = 1024;
        // const minHeightAccepted = 576;
        // const requiredProportion = Number((minWidthAccepted / minHeightAccepted).toFixed(1));
        // const { width } = img;
        // const { height } = img;
        // const proportion = Number((width / height).toFixed(1));
        // if (width < minWidthAccepted || height < minHeightAccepted) {
        //   setSelectedFile(undefined);
        //   toast.error(`A imagem deve ter dimensão mínima de ${minWidthAccepted}x${minHeightAccepted}px`);
        //   return;
        // }
        // if (proportion != requiredProportion) {
        //   setSelectedFile(undefined);
        //   toast.error(`A imagem deve ter dimensão proporcional a ${minWidthAccepted}x${minHeightAccepted}px`);
        //   return;
        // }
        // URL.revokeObjectURL(img.src);
        setPreview(img.src);
      };
    }

    if (fileType === 'video' && typeof selectedFile === 'object' && objectUrl) {
      setPreview(objectUrl);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      URL.revokeObjectURL(img.src);
    };
  }, [fileType, selectedFile, setSelectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Container>
      {!hideButton && (
      <SecondaryButton type="button" onClick={handleClick}>
        {fileType === 'image'
          ? (preview ? 'Alterar imagem' : 'Escolher imagem')
          : (preview ? 'Alterar vídeo' : 'Escolher vídeo')}
      </SecondaryButton>
      )}
      <input
        type="file"
        onChange={(e) => {
          onSelectFile(e);
        }}
        style={{ display: 'none' }}
        ref={hiddenFileInput as RefObject<HTMLInputElement>}
        accept={fileType === 'image' ? 'image/png, image/jpg, image/jpeg' : 'video/mp4, video/mov'}
      />
      {preview && (
        fileType === 'image'
          ? (
            preview && <img src={preview} alt="activity thumbnail" className="file" />
          )
          : <video src={preview} height="240" controls />
      ) }
      {!preview && (
        <NoData
          icon="emptyBox"
          label={noDataLabel}
        />
      ) }
    </Container>
  );
}
