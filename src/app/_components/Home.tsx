export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row items-center max-w-4xl p-6">
        {/* Image */}
        <img
          src="/IMG_3345.jpg"
          alt="Kirk"
          className="w-64 h-64 object-cover rounded-xl shadow-md mb-6 md:mb-0 md:mr-8"
        />

        {/* Description */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">Hi, I’m Kirk</h1>
          <p className="text-lg text-gray-700">
            I’m a Software Engineer and Entrepreneur.
          </p>
        </div>
      </div>
    </div>
  );
}