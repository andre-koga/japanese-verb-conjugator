export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-1 pt-4 pb-20 text-center">
      <p className="font-bold">日本語動詞活用練習</p>
      <p className="text-sm">
        Created with 🥰 by{" "}
        <a
          href="https://github.com/andre-koga"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Andre Koga
        </a>{" "}
        @ 2025
      </p>
      <p className="text-sm">
        Donate to support the development of this app and other projects!
      </p>
    </footer>
  );
}
