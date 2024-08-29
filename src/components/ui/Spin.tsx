export default function Spin() {
  return (
    <div className="none fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/70">
      <div className="relative">
        <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-cyan-900"></div>
        </div>
      </div>
    </div>
  );
}
