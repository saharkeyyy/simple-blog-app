import React from 'react'
import ReactQuill from 'react-quill';
function Editore({value, onChange}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  return (
    <div>
          <div className="content">
    <ReactQuill
      value={value}
      theme={'snow'}
      onChange={onChange}
      modules={modules} />
    </div>
    </div>
  )
}

export default Editore
