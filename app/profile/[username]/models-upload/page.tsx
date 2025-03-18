'use client';

import React, { useState } from 'react';

export default function ModelsUpload() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [printPrice, setPrintPrice] = useState('');

  /*   async function handleUpload() {} */

  return (
    <div>
      <h3>3D Model Upload</h3>
      <form /* onSubmit={handleUpload} */>
        <label className="fieldset-label">
          Name
          <input
            className="input"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </label>
        <label className="fieldset-label">
          Category
          <input
            className="input"
            value={category}
            onChange={(event) => setCategory(event.currentTarget.value)}
          />
        </label>
        <label className="fieldset-label">
          Description
          <input
            className="input"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </label>
        <label className="fieldset-label">
          Print Price
          <input
            className="input"
            value={printPrice}
            onChange={(event) => setPrintPrice(event.currentTarget.value)}
          />
        </label>
        <button className="btn btn-neutral mt-4 w-full">
          Upload New 3D Model
        </button>
      </form>
    </div>
  );
}
