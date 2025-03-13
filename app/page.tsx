export default function Home() {
  return (
    <div>
      <header
        className="hero min-h-screen"
        style={{
          backgroundImage: 'url(/images/texture.jpeg)',
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">LayerForge</h1>
              <h2 className="mb-5">
                The marketplace to build anything - one layer at a time
              </h2>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <h3>🔥 Hot Picks</h3>
      </main>
    </div>
  );
}
