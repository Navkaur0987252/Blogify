import { Alert, Button, FileInput, Select, Spinner, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);

      const formDataImage = new FormData();
      formDataImage.append('image', file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/api/upload');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setImageUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setImageUploadProgress(null);
          setFormData({ ...formData, image: data.url });
          console.log('Image URL:', data);
        } else {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        }
      };

      xhr.onerror = () => {
        setImageUploadError('Something went wrong');
        setImageUploadProgress(null);
      };

      xhr.send(formDataImage);
    } catch (error) {
      console.log(error);
      setImageUploadError('Something went wrong');
      setImageUploadProgress(null);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:3000/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); // Only call this ONCE
      console.log(data);

      console.log('this is form', formData);

      if (!res.ok) {
        console.log('Error: ', data.message);
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
      console.log('Error: ', error);
    }
  }

  return <div className="p-3 max-w-3xl mx-auto min-h-screen">
    <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput
          type='text'
          placeholder='Title'
          required
          id='title'
          className='flex-1'
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <Select
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value='uncategorized'>Select a category</option>
          <option value='javascript'>JavaScript</option>
          <option value='reactjs'>React.js</option>
          <option value='nextjs'>Next.js</option>
        </Select>
      </div>
      <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
        <FileInput
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button
          type='button'
          gradientDuoTone='purpleToBlue'
          size='sm'
          outline
          onClick={handleUpdloadImage}
          disabled={imageUploadProgress}
        >
          {imageUploadProgress ? (
            <Spinner color="purple" aria-label="Uploading..." />
          ) : (
            'Upload Image'
          )}
        </Button>
      </div>
      {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
      {formData.image ? (
        <img
          src={formData.image}
          alt='upload'
          className='w-full h-72 object-cover'
        />
      ) : (
        <div className="w-full h-72 flex items-center justify-center bg-gray-100 text-gray-400">
          No image uploaded
        </div>
      )}
      <ReactQuill
        theme='snow'
        placeholder='Write something...'
        className='h-72 mb-12'
        required
        onChange={(value) => {
          setFormData({ ...formData, content: value });
        }}
      />
      <Button type='submit' gradientDuoTone='purpleToPink'>
        Publish
      </Button>
      {publishError && (
        <Alert className='mt-5' color='failure'>
          {publishError}
        </Alert>
      )}
    </form>
  </div>
}
