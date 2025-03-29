export default function Home() {
  return (
    <div>
      <header
        className="hero min-h-110"
        style={{
          backgroundImage: 'url(/images/texture.jpeg)',
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content text-neutral-content place-self-center mt-20">
            <div className="max-w-md text-center place-self-center">
              <h1 className="mb-5 text-5xl font-bold">LayerForge</h1>
              <p className="mb-5">
                The marketplace to build anything - one layer at a time
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <h3 className="divider">🔥 Hot Picks</h3>
        <div className="carousel carousel-center rounded-box">
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
              alt="Pizza"
            />
          </div>
        </div>
        <h3 className="divider">Categories</h3>
        <div className="grid grid-cols-2 gap-4 justify-items-center mb-10">
          <div>
            <div className="card w-96 bg-gray-100 card-lg shadow-sm m-4">
              <div className="card-body">
                <h2 className="card-title">Home</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="justify-end card-actions">
                  <button className="btn btn-primary">Go To Category</button>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-gray-100 card-lg shadow-sm m-4">
              <div className="card-body">
                <h2 className="card-title">Tools</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="justify-end card-actions">
                  <button className="btn btn-primary">Go To Category</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card w-96 bg-gray-100 card-lg shadow-sm m-4">
              <div className="card-body">
                <h2 className="card-title">Toys</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="justify-end card-actions">
                  <button className="btn btn-primary">Go To Category</button>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-gray-100 card-lg shadow-sm m-4">
              <div className="card-body">
                <h2 className="card-title">Gadgets</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="justify-end card-actions">
                  <button className="btn btn-primary">Go To Category</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
