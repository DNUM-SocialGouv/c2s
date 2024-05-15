import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import SubmitButton from '../submitButton/SubmitButton';

export const TextEditor = () => {
  const [isDisabled] = useState<boolean>(false);
  const [value, setValue] = useState(`<p>Le mot de l'équipe C2S</p>`);
  const [text, setText] = useState('');
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
    console.log('input text value :', value);
  };

  return (
    <form onSubmit={handelOnSubmit}>
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
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          directionality: 'ltr',
          relative_urls: false,
          convert_urls: false,
          default_link_target: '_blank',
          link_default_protocol: 'https',
        }}
        value={value}
        onInit={(_evt, editor) => {
          setText(editor.getContent({ format: 'text' }));
          editor.getBody().style.backgroundColor = '#dddddd';
        }}
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
          setText(editor.getContent({ format: 'text' }));
        }}
        onBeforeAddUndo={handleBeforeAddUndo}
        disabled={isDisabled}
      />
      <p>Nombre de caratères restants: {sizeLimit - text.length}</p>
      <SubmitButton isLoadingSubmit={false} buttonLabel={'Enregistrer'} />
    </form>
  );
};
