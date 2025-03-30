'use client';

import {
  CldImage,
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
} from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { User } from '../../../../migrations/00000-createTableUsers';
import type { ModelUploadResponseBody } from '../../../api/models/route';
import ErrorMessage from '../../../ErrorMessage';

type ResponseError = {
  error: string;
};

export default function ModelsUploadForm({ user }: { user: User }) {
  const router = useRouter();

  const userId = user.id;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [stlUrl, setStlUrl] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [printPrice, setPrintPrice] = useState('');

  const [result, setResult] = useState<CloudinaryUploadWidgetInfo>();
  const [errors, setErrors] = useState<{ message: string }[]>();
  const [successMessage, setSuccessMessage] = useState('');

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stlUrl) {
      setErrors([{ message: 'Please upload an STL file' }]);
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('imageUrl', imageUrl);
    formData.append('printPrice', printPrice);
    formData.append('stlFile', stlUrl);

    const response = await fetch(`/api/models/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData: ResponseError = await response.json();
      setErrors([{ message: errorData.error }]);
      return;
    }

    const data: ModelUploadResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    setSuccessMessage('Model created successfully!');
    router.refresh();

    setName('');
    setCategory('');
    setDescription('');
    setPrintPrice('');
    setStlUrl(null);
    setImageUrl('');
    setResult(undefined);
  }

  return (
    <div className="flex flex-col justify-center items-center pr-20">
      <h3>3D Model Upload</h3>
      <form onSubmit={handleUpload}>
        <fieldset className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box">
          <label className="fieldset-label" htmlFor="name">
            Model Name
          </label>
          <input
            id="name"
            className="input"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />

          <label className="fieldset-label" htmlFor="category">
            Choose a category:{' '}
          </label>
          <select
            id="category"
            className="select validator"
            required
            onChange={(event) => setCategory(event.currentTarget.value)}
          >
            <option disabled defaultValue={category}>
              Choose a category:
            </option>
            <option value="tools">Tools</option>
            <option value="home">Home</option>
            <option value="gadgets">Gadgets</option>
            <option value="toys">Toys</option>
          </select>

          <label className="fieldset-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="textarea"
            placeholder="Write a short description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />

          <label className="fieldset-label" htmlFor="price">
            Print Price{' '}
          </label>
          <input
            id="price"
            className="input"
            value={printPrice}
            onChange={(event) => setPrintPrice(event.currentTarget.value)}
          />

          <label className="fieldset-label" htmlFor="stl-file">
            Upload STL File
          </label>
          <input
            id="stl-file"
            type="file"
            name="stlFile"
            accept=".stl"
            className="file-input"
            onChange={(event) => {
              if (event.currentTarget.files && event.currentTarget.files[0]) {
                setStlUrl(event.currentTarget.files[0]);
              }
            }}
          />
          <p className="fieldset-label">Max size 2MB</p>

          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={(uploadResult) => {
              if (
                uploadResult.event === 'success' &&
                typeof uploadResult.info === 'object' &&
                'secure_url' in uploadResult.info
              ) {
                setResult(uploadResult.info);
                setImageUrl(uploadResult.info.secure_url);
              }
            }}
          >
            {({ open }) => (
              <button className="btn btn-secondary w-xs" onClick={() => open()}>
                Upload an Image
              </button>
            )}
          </CldUploadWidget>
          {result ? (
            <div className="mt-8 justify-self-center">
              <CldImage
                src={result.public_id}
                width={300}
                height={300}
                alt="Uploaded Image"
              />
            </div>
          ) : null}
          <button
            className="btn btn-primary w-xs"
            disabled={
              !name.trim() ||
              !category ||
              !description.trim() ||
              !printPrice.trim() ||
              !stlUrl ||
              !imageUrl
            }
          >
            Upload New 3D Model
          </button>
          {!!successMessage && (
            <p className="alert alert-success">{successMessage}</p>
          )}
          {errors?.map((error) => {
            return (
              <div key={`error-${error.message}-${Math.random()}`}>
                <ErrorMessage>{error.message}</ErrorMessage>
              </div>
            );
          })}
        </fieldset>
      </form>
    </div>
  );
}
