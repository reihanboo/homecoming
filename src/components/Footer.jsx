export default function Footer() {
  return (
    <footer className="bg-primary-900 py-12 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div>
            <span className="text-lg font-bold tracking-wider font-display">
              HOME<span className="text-accent-500">-COMING</span>
            </span>
            <p className="mt-1 text-sm text-white/60">
              The ASEAN Phygital Ecosystem for Diaspora Reconnection
            </p>
          </div>
          <div className="flex gap-6 text-sm text-white/50">
            <span>&copy; {new Date().getFullYear()} HOME-COMING</span>
            <span className="hover:text-accent-500 transition-colors cursor-default">
              Privacy
            </span>
            <span className="hover:text-accent-500 transition-colors cursor-default">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
