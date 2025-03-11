import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SubmitButton from '../submitButton/SubmitButton.tsx';
import './TextEditor.css';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import {
  ModerateurContent,
  ModerateurContentFromAPI,
} from '../../../domain/ModerateurContent.ts';
import { Alert } from '../alert/Alert.tsx';
import { COMMON, MODERATOR_CONTENT } from '../../../wording.ts';
import axios from 'axios';

interface TextEditorProps {
  groupe: string;
}

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

const QUILL_FORMATS = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
  'image',
];

const SIZE_LIMIT = 255;
const ENDPOINT = '/moderateur/messages';

export const TextEditor: React.FC<TextEditorProps> = ({ groupe }) => {
  const [value, setValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const quillRef = useRef<ReactQuill | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      const response = await axiosInstance.get<ModerateurContentFromAPI>(
        `${ENDPOINT}/${groupe}`,
        { withCredentials: true }
      );
      setValue(response.data.contenu);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  }, [groupe]);

  useEffect(() => {
    fetchContent();
  }, [groupe, fetchContent]);

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setIsSuccess(false);

    const payload: ModerateurContent = {
      contenu: value,
      groupe,
    };

    try {
      const response = await axiosInstance.post<ModerateurContent>(
        ENDPOINT,
        JSON.stringify(payload),
        { withCredentials: true }
      );
      setValue(response.data.contenu);
      setIsSuccess(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.status === 500
            ? MODERATOR_CONTENT.contentLimitNotice
            : error.response?.data?.message ||
                MODERATOR_CONTENT.unknownErrorNotice
        );
      } else {
        setErrorMessage(MODERATOR_CONTENT.unknownErrorNotice);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (content: string) => {
    const editor = quillRef.current?.getEditor();
    const plainTextLength = editor?.getText().trim().length || 0;

    if (plainTextLength > SIZE_LIMIT) {
      editor?.deleteText(SIZE_LIMIT, plainTextLength - SIZE_LIMIT);
    } else {
      setValue(content);
      if (isSuccess) {
        setIsSuccess(false);
      }
    }
  };

  const remainingCharacters = SIZE_LIMIT - value.replace(/<[^>]+>/g, '').length;

  return (
    <form onSubmit={handleOnSubmit}>
      {errorMessage && <Alert type="error" label={errorMessage} />}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={QUILL_MODULES}
        formats={QUILL_FORMATS}
        readOnly={isSubmitting}
      />
      <p className="mt-2 mb-0">
        Nombre de caractères restants: {remainingCharacters}
      </p>
      <div className="flex justify-end">
        <SubmitButton
          isLoadingSubmit={isSubmitting}
          buttonLabel={COMMON.save}
        />
      </div>
      {isSuccess && (
        <div className="mt-4">
          <Alert type="success" label={MODERATOR_CONTENT.successLabel} />
        </div>
      )}
    </form>
  );
};
