import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import SubmitButton from '../submitButton/SubmitButton';
import './TextEditor.css';
import { axiosInstance } from '@/RequestInterceptor';
import { ModerateurContent } from '@/domain/ModerateurContent';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorMessage } from '../error/Error';

interface TextEditorProps {
  cible: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({ cible }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [value, setValue] = useState(`<p>Le mot de l'équipe C2S</p>`);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const endpoint = '/moderateur/message';
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
      cible: cible,
    };
    axiosInstance
      .post<ModerateurContent>(endpoint, JSON.stringify(payload))
      .then((response: AxiosResponse<ModerateurContent>) => {
        setValue(response.data.contenu);
        setIsDisabled(false);
        setError(false);
      })
      .catch((error: AxiosError) => {
        if (error.code === 'ERR_BAD_RESPONSE') {
          setErrorMessage(
            'Vous avez depassé le nombre de caractères authorisés'
          );
        }
        setErrorMessage(error.message);
        setError(true);
      });
  };

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
          setText(editor.getContent({ format: 'text' }));
        }}
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
          setText(editor.getContent({ format: 'text' }));
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
