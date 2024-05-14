import { Editor } from '@tinymce/tinymce-react';

export const TextEditor = () => {
  return (
    <>
      <Editor
        apiKey={'a3y6602vgjj9ashpp5viyohj4sjbbdci6g3aqpaimp4ua8jc'}
        init={{
          height: 500,
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
      />
    </>
  );
};
