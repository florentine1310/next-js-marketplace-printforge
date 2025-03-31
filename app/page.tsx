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

        <div className="carousel flex space-x-4 px-4">
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src="https://res.cloudinary.com/dshcxl5an/image/upload/v1742545792/tsuxkgtgd6c5rvasho5g.webp"
                  alt="Phone Stand"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Phone Stand</h2>
                <p>
                  A sleek and ergonomic 3D-printed phone stand for hands-free
                  use and better viewing angles.
                </p>
                <div className="card-actions">
                  <button className="btn btn-primary">Model Details</button>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src="https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/njmgfshbilzny6okpftm.webp"
                  alt="Spice Jar Holder"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Spice Jar Holder</h2>
                <p>
                  A customizable 3D-printed spice jar holder for neatly
                  organizing kitchen essentials.
                </p>
                <div className="card-actions">
                  <button className="btn btn-primary">Model Details</button>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src="https://res.cloudinary.com/dshcxl5an/image/upload/v1742545793/yaehpu1u4xla30u2dyi5.webp "
                  alt="Wall Hook Organizer"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Wall Hook Organizer </h2>
                <p>
                  A sturdy and stylish 3D-printed wall hook organizer for
                  efficient space management.
                </p>
                <div className="card-actions">
                  <button className="btn btn-primary">Model Details</button>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src="https://res.cloudinary.com/dshcxl5an/image/upload/v1742545792/lwn7jgufluvpdpvkh7z9.webp"
                  alt="Robot"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Articulated Robot</h2>
                <p>
                  A fun, movable 3D-printed robot with articulated joints for
                  endless playtime.
                </p>
                <div className="card-actions">
                  <button className="btn btn-primary">Model Details</button>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src="https://res.cloudinary.com/dshcxl5an/image/upload/v1742545792/xwqe3teynpiqx82hafoj.webp"
                  alt="Car Cup Holder"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Car Cup Holder Insert</h2>
                <p>
                  A universal 3D-printed cup holder insert designed to fit most
                  vehicle cup holders for added stability.
                </p>
                <div className="card-actions">
                  <button className="btn btn-primary">Model Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="divider">Categories</h3>
        <div className="grid grid-cols-2 gap-4  mb-10">
          <div className="flex flex-col gap-3 justify-self-end">
            <div className="card w-96 bg-gray-100 card-lg shadow-sm m-4">
              <div className="card-body">
                <h2 className="card-title">Home</h2>
                <p>
                  Practical 3D-printed items for home organization, storage, and
                  decoration.
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
                  Handy 3D-printed tools and accessories for everyday DIY and
                  repair tasks.
                </p>
                <div className="justify-end card-actions">
                  <button className="btn btn-primary">Go To Category</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="card w-96 bg-gray-100 card-lg shadow-sm m-4">
              <div className="card-body">
                <h2 className="card-title">Toys</h2>
                <p>
                  Fun and creative 3D-printed toys and games for kids and
                  hobbyists.
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
                  Unique 3D-printed gadgets for tech lovers and problem solvers.
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
