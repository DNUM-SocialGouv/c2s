import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import SubmitButton from '../submitButton/SubmitButton';
import './TextEditor.css';
import { axiosInstance } from '@/RequestInterceptor';
import {
  ModerateurContent,
  ModerateurContentFromAPI,
} from '@/domain/ModerateurContent';
import { AxiosResponse } from 'axios';
import { ErrorMessage } from '../error/Error';

interface TextEditorProps {
  groupe: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({ groupe }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [value, setValue] = useState(``);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const endpoint = '/moderateur/messages';
  const sizeLimit = 255;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBeforeAddUndo = (evt: any, editor: any) => {
    const length = editor.getContent({ format: 'text' }).length;
    if (length > sizeLimit) {
      evt.preventDefault();
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handelOnSubmit = (event: any) => {
    event.preventDefault();
    setIsDisabled(true);
    const payload: ModerateurContent = {
      contenu: value,
      groupe: groupe,
    };
    axiosInstance
      .post<ModerateurContent>(endpoint, JSON.stringify(payload), {
        withCredentials: true,
      })
      .then((response: AxiosResponse<ModerateurContent>) => {
        setValue(response.data.contenu);
        setIsDisabled(false);
        setError(false);
      })
      .catch((error) => {
        if (error.response.status == 500) {
          setErrorMessage(
            'Vous avez depassé le nombre de caractères authorisés'
          );
          setIsDisabled(false);
          setError(true);
          return;
        }
        setErrorMessage(error.message);
        setError(true);
        setIsDisabled(false);
      });
  };

  useEffect(() => {
    axiosInstance
      .get<ModerateurContentFromAPI>(`/moderateur/messages/${groupe}`, {
        withCredentials: true,
      })
      .then((response) => {
        setValue(response.data.contenu);
      });
  }, [groupe]);

  return (
    <form onSubmit={handelOnSubmit}>
      {error && <ErrorMessage message={errorMessage} />}
      <Editor
        apiKey={'a3y6602vgjj9ashpp5viyohj4sjbbdci6g3aqpaimp4ua8jc'}
        init={{
          height: 250,
          menubar: true,
          plugins: [
            'advlist',
            'anchor',
            'autolink',
            'charmap',
            'code',
            'fullscreen',
            'help',
            'image',
            'insertdatetime',
            'link',
            'lists',
            'media',
            'preview',
            'searchreplace',
            'table',
            'visualblocks',
            'visualchars',
            'wordcount',
          ],
          toolbar:
            'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
          content_style: `
            body {
              font-family: Helvetica, Arial, sans-serif;
              font-size: 14px;
              background-color: #EEEEEE;
            }
          `,
          language: 'fr_FR',
          directionality: 'ltr',
          relative_urls: false,
          convert_urls: false,
          default_link_target: '_blank',
          link_default_protocol: 'https',
        }}
        value={value}
        onInit={(_evt, editor) => {
          setText(editor.getContent({ format: 'html' }));
        }}
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
          setText(editor.getContent({ format: 'html' }));
        }}
        onBeforeAddUndo={handleBeforeAddUndo}
        disabled={isDisabled}
      />
      <p>
        Nombre de caratères restants: {sizeLimit - text.length}/{sizeLimit}
      </p>
      <div className="flex justify-end">
        <SubmitButton isLoadingSubmit={false} buttonLabel={'Enregistrer'} />
      </div>
    </form>
  );
};
